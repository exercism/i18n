#!/usr/bin/env node
//
// publish: build what S3 serves from locales/, and (one day) upload it.
//
// Usage:
//   node scripts/publish.mjs [<locale|all>] [--changed-since=<ref>] [--upload] [--out=<dir>]
//
// Examples:
//   node scripts/publish.mjs all                          # build dist/, upload nothing
//   node scripts/publish.mjs all --changed-since=<sha>    # ...content files changed since <sha> only
//   EXERCISM_I18N_BUCKET=<bucket> node scripts/publish.mjs all --upload
//
// ## What it builds
//
//   dist/i18n/website/<locale>/backend-<hash>.json      immutable, content-hashed
//   dist/i18n/website/<locale>/backend.current.json     the pointer: { "hash": "..." }
//   dist/i18n/website/<locale>/frontend-<hash>.json
//   dist/i18n/website/<locale>/frontend.current.json
//   dist/i18n/metadata/<locale>/<repo>-<hash>.json      one keyed catalog per source repo
//   dist/i18n/metadata/<locale>/<repo>.current.json     ...and its pointer
//   dist/i18n/content/<locale>/<ab>/<cd>/<rest>.<ext>   as-is, under its blob-id path
//   dist/manifest.json, dist/sync.sh                    a record, and the upload plan
//
// The hash is the first 12 hex characters of the SHA-256 of the exact bytes
// written. For a catalog those bytes are `JSON.stringify` of the parsed tree, so
// source formatting cannot move a hash.
//
// The backend artifact is `{ "<locale>": { ...tree } }`, which is the shape Rails'
// I18n loads from a `.json` file. The frontend artifact is the tree as stored,
// `{ "<namespace>": { "<key>": "..." } }`, which is i18next's resource shape.
//
// ## Artifact before pointer, one writer per pointer
//
// A catalog goes live by rewriting one ~24 byte pointer, never by redeploying the
// website. Artifacts are uploaded first and pointers second, so a pointer never
// names an object that is not there yet. Each pointer has exactly ONE writer, and
// it is this script run by publish.yml, whose `concurrency` group serialises runs:
// two runs flipping a pointer in either order could leave it naming an older
// artifact than the commit that ran last. English has no pointer at all. It is
// deployed with the website.
//
// ## Content is NOT immutable, and is cached accordingly
//
// A content path is stable: the blob id of the ENGLISH. The translation stored
// there can be corrected, so unlike a hashed catalog the object at that key can
// change, and it gets a short cache lifetime, not an immutable one.
//
// ## Publishing is unconditional
//
// This ships whatever is on `main`, for every target locale, complete or not.
// Strictness lives elsewhere: `validate` gates what may land for a production
// locale, the source repos' completeness check gates what English may merge, and
// the website decides which locales it serves. It needs NO English and no source
// checkout: nothing here is compared against anything.
//
// The one thing it refuses is a key the guard rejects (scripts/lib/guard.mjs),
// and that has no override.
//
// ## What is not built yet
//
// TODO(iHiD): OPEN. Bucket names, credentials and IAM are undecided. `--upload`
// refuses to run without EXERCISM_I18N_BUCKET, the cache lifetimes below are
// placeholders, and publish.yml's upload step is disabled until the repo has a
// bucket variable. Everything up to `dist/` is real.
// TODO(iHiD): OPEN. What mirrors S3 to EFS for Rails is undecided. Nothing here
// knows about EFS. The contract this script offers a mirror is the layout above:
// read `<kind>.current.json`, fetch the artifact it names, and only then swap, so
// Rails never loads a catalog the mirror has half written.

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { REPO_ROOT, S3_BUCKET_ENV, S3_PREFIX, SCRIPTS_ROOT, TARGET_LOCALES, assertTargetLocale, fail } from "./lib/constants.mjs";
import { parseArgs } from "./lib/args.mjs";
import { git } from "./lib/git.mjs";
import { CATALOG_KINDS, catalogPath } from "./lib/catalogs.mjs";
import { CONTENT_EXTENSIONS, contentRelativePath } from "./lib/content-types.mjs";
import { listContentFiles } from "./lib/content-store.mjs";
import { heldMetadataRepos, metadataPath } from "./lib/metadata.mjs";
import { assertPublishableKey } from "./lib/guard.mjs";

let DIST = path.join(SCRIPTS_ROOT, "dist");

export const contentHash = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex").slice(0, 12);

/** The bytes and key of one catalog artifact, and of the pointer beside it. */
export function catalogArtifacts(locale, kind, tree) {
  const bytes = Buffer.from(JSON.stringify(kind === "backend" ? { [locale]: tree } : tree), "utf8");
  const hash = contentHash(bytes);
  return {
    artifact: { key: `${S3_PREFIX}/website/${locale}/${kind}-${hash}.json`, bytes },
    pointer: { key: `${S3_PREFIX}/website/${locale}/${kind}.current.json`, bytes: Buffer.from(JSON.stringify({ hash }), "utf8") },
    hash
  };
}

function emit(written, key, bytes, locales) {
  // Through the guard on the way to disk, every time, with no way round it.
  const safe = assertPublishableKey(key, { locales });
  const file = path.join(DIST, safe);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, bytes);
  written.push(safe);
}

function changedContent(ref) {
  const out = git(["diff", "--name-only", "-z", ref, "HEAD", "--", "locales/"], REPO_ROOT);
  return new Set(out.split("\0").filter(Boolean).map((file) => path.join(REPO_ROOT, file)));
}

function main() {
  const { flags, positional } = parseArgs(process.argv.slice(2));
  const scope = positional[0] ?? "all";
  if (scope !== "all") assertTargetLocale(scope);
  const locales = scope === "all" ? TARGET_LOCALES : [scope];
  const changed = typeof flags["changed-since"] === "string" ? changedContent(flags["changed-since"]) : null;

  // `--out` exists for scripts/test.mjs, which must not wipe a real dist/.
  if (typeof flags.out === "string") DIST = path.resolve(flags.out);
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  const manifest = { prefix: S3_PREFIX, locales: {} };
  const artifacts = [];
  const pointers = [];
  const content = [];

  for (const locale of locales) {
    const record = (manifest.locales[locale] = { website: {}, metadata: {}, content: 0 });

    for (const kind of CATALOG_KINDS) {
      const file = catalogPath(locale, kind);
      if (!fs.existsSync(file)) continue;
      const built = catalogArtifacts(locale, kind, JSON.parse(fs.readFileSync(file, "utf8")));
      emit(artifacts, built.artifact.key, built.artifact.bytes, locales);
      emit(pointers, built.pointer.key, built.pointer.bytes, locales);
      record.website[kind] = built.hash;
    }

    // One keyed catalog per source repo, shipped exactly as the website catalogs
    // are: hashed artifact, pointer beside it. The website reads it to fill the
    // columns it syncs titles and blurbs into (scripts/lib/metadata.mjs).
    for (const name of heldMetadataRepos(locale)) {
      const bytes = Buffer.from(JSON.stringify(JSON.parse(fs.readFileSync(metadataPath(locale, name), "utf8"))), "utf8");
      const hash = contentHash(bytes);
      emit(artifacts, `${S3_PREFIX}/metadata/${locale}/${name}-${hash}.json`, bytes, locales);
      emit(pointers, `${S3_PREFIX}/metadata/${locale}/${name}.current.json`, Buffer.from(JSON.stringify({ hash }), "utf8"), locales);
      record.metadata[name] = hash;
    }

    for (const entry of listContentFiles(locale)) {
      // A stray file is validate's to report. Publish only ever ships a
      // well-formed blob-id path, and rebuilds the key from the id so that the
      // key cannot be anything the fan-out function would not have produced.
      if (entry.id === null || !CONTENT_EXTENSIONS.includes(entry.extension)) continue;
      if (changed !== null && !changed.has(entry.file)) continue;
      emit(content, `${S3_PREFIX}/content/${locale}/${contentRelativePath(entry.id, entry.extension)}`, fs.readFileSync(entry.file), locales);
      record.content += 1;
    }
  }

  fs.writeFileSync(path.join(DIST, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

  // Up to three passes, in this order. `sync` is used nowhere: dist/ is rebuilt on
  // every run so every file is newer than its object, and `--size-only` would
  // skip a corrected translation that happens to be the same length.
  //
  // TODO(iHiD): the cache lifetimes are placeholders pending the bucket decision.
  const bucket = `s3://\${${S3_BUCKET_ENV}:?set ${S3_BUCKET_ENV} to the bucket name}`;
  const plan = [];
  if (artifacts.length > 0) {
    plan.push(
      `# Immutable catalog artifacts. Content-hashed, so an upload is always an add.`,
      ...["website", "metadata"].map((area) => `aws s3 cp ${S3_PREFIX}/${area} ${bucket}/${S3_PREFIX}/${area} --recursive --exclude '*' --include '*-????????????.json' --cache-control 'public, max-age=31536000, immutable'`)
    );
  }
  if (content.length > 0) {
    plan.push(
      `# Content, at stable blob-id paths. A translation can be corrected, so never immutable.`,
      `aws s3 cp ${S3_PREFIX}/content ${bucket}/${S3_PREFIX}/content --recursive --cache-control 'public, max-age=300'`
    );
  }
  if (pointers.length > 0) {
    plan.push(
      `# Pointers, LAST, so none ever names an artifact that is not there yet.`,
      ...["website", "metadata"].map((area) => `aws s3 cp ${S3_PREFIX}/${area} ${bucket}/${S3_PREFIX}/${area} --recursive --exclude '*' --include '*.current.json' --cache-control 'public, max-age=30'`)
    );
  }
  fs.writeFileSync(path.join(DIST, "sync.sh"), `#!/usr/bin/env bash\nset -euo pipefail\ncd "$(dirname "$0")"\n\n${plan.join("\n")}\n`, { mode: 0o755 });

  console.log(`Built ${artifacts.length} catalog artifact(s), ${pointers.length} pointer(s) and ${content.length} content file(s) for ${locales.length} locale(s) into dist/.`);
  if (locales.length === 0) console.log(`note: locales.json "targets" is empty, so there is nothing to publish yet. This is a green no-op, not a failure.`);

  if (!flags.upload) {
    console.log("Nothing uploaded. Re-run with --upload once a bucket exists, or read dist/sync.sh.");
    return;
  }
  if (!process.env[S3_BUCKET_ENV]) fail(`--upload needs ${S3_BUCKET_ENV}. No bucket is configured in this repo on purpose: bucket names, credentials and IAM are an open decision.`);
  if (artifacts.length + content.length === 0) {
    console.log("Nothing to upload.");
    return;
  }
  execFileSync("bash", [path.join(DIST, "sync.sh")], { stdio: "inherit" });
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname;
if (isMain) main();
