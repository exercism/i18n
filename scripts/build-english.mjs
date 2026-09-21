#!/usr/bin/env node
//
// build-english: flatten the website's English into the two catalogs.
//
// Usage:
//   node scripts/build-english.mjs [--source-repo=<path>] [--source-ref=<ref>]
//                                  [--out=<dir>] [--kind=backend|frontend] [--quiet]
//   node scripts/build-english.mjs --content-repos=<path[:kind][@ref]>,... [--out=<dir>]
//
// Examples:
//   node scripts/build-english.mjs                         # website origin/main -> .build/english/
//   node scripts/build-english.mjs --source-ref=<sha>      # exactly the English a PR holds
//   node scripts/build-english.mjs --content-repos=../ruby,../problem-specifications
//                                                          # their metadata -> .build/english/metadata/<repo>.json
//
// Website English is spread over many files. This writes the two flat
// catalogs every locale is measured against, `.build/english/backend.json` and
// `frontend.json`, plus `arrays.json` (which backend paths are lists) and
// `source.json` (the commit it was read at). That directory is gitignored, so
// English is never committed here.
//
// With `--content-repos` it instead writes one flat metadata catalog per named
// repo: the names, titles and blurbs in its config.json or metadata.toml
// (scripts/lib/metadata.mjs), which a pass translates into
// `locales/<locale>/metadata/<repo>.json`.
//
// These files are for translation passes, which live in the translator repo
// and write `locales/<locale>/website/<kind>.json`. The scripts in this repo
// do not read them back. They call the same builder
// (scripts/lib/website-english.mjs) directly, so a check never runs against a
// stale `.build/`.
//
// English is read through git objects at a ref (default: `origin/main` if the
// checkout has one, else `HEAD`), never from the working tree, and none of it
// is executed. See scripts/lib/git.mjs.

import fs from "node:fs";
import path from "node:path";
import { SCRIPTS_ROOT } from "./lib/constants.mjs";
import { parseArgs } from "./lib/args.mjs";
import { refReader, resolveSha } from "./lib/git.mjs";
import { defaultRef, resolveRepo } from "./lib/source-repos.mjs";
import { buildWebsiteEnglish } from "./lib/website-english.mjs";
import { CATALOG_KINDS, englishUnits } from "./lib/catalogs.mjs";
import { lsTree } from "./lib/git.mjs";
import { parseContentRepos } from "./lib/source-repos.mjs";
import { buildMetadataEnglish } from "./lib/metadata.mjs";

function buildMetadata(flags, outDir) {
  fs.mkdirSync(path.join(outDir, "metadata"), { recursive: true });
  for (const repo of parseContentRepos(flags["content-repos"])) {
    const name = path.basename(repo.dir);
    const { catalog, notes, files } = buildMetadataEnglish(repo.kind, lsTree(repo.dir, repo.ref), refReader(repo.dir, repo.ref).readMany);
    fs.writeFileSync(path.join(outDir, "metadata", `${name}.json`), `${JSON.stringify(catalog, null, 2)}\n`);
    console.log(`  metadata/${name}: ${repo.kind} @ ${repo.ref} (${resolveSha(repo.dir, repo.ref)}), ${files} file(s) -> ${Object.keys(catalog).length} units`);
    if (!flags.quiet) for (const note of notes) console.log(`    note: ${note}`);
  }
  console.log(`Wrote ${path.relative(process.cwd(), path.join(outDir, "metadata")) || "."}/`);
}

async function main() {
  const { flags } = parseArgs(process.argv.slice(2));
  if (flags["content-repos"]) {
    return buildMetadata(flags, path.resolve(typeof flags.out === "string" ? flags.out : path.join(SCRIPTS_ROOT, ".build", "english")));
  }
  const repo = resolveRepo("website", typeof flags["source-repo"] === "string" ? flags["source-repo"] : undefined);
  const ref = typeof flags["source-ref"] === "string" ? flags["source-ref"] : defaultRef(repo);
  const kinds = typeof flags.kind === "string" ? [flags.kind] : CATALOG_KINDS;
  const outDir = path.resolve(typeof flags.out === "string" ? flags.out : path.join(SCRIPTS_ROOT, ".build", "english"));

  const english = await buildWebsiteEnglish(refReader(repo, ref), { kinds });
  fs.mkdirSync(outDir, { recursive: true });

  const sha = resolveSha(repo, ref);
  console.log(`English: ${repo} @ ${ref} (${sha})`);
  for (const kind of kinds) {
    const { catalog, files, notes } = english[kind];
    const units = englishUnits(kind, catalog);
    const groups = [...units.values()].filter((unit) => unit.plural).length;
    fs.writeFileSync(path.join(outDir, `${kind}.json`), `${JSON.stringify(catalog, null, 2)}\n`);
    console.log(`  ${kind}: ${files} file(s) -> ${Object.keys(catalog).length} keys, ${units.size} units (${groups} plural groups)`);
    if (!flags.quiet) for (const note of notes) console.log(`    note: ${note}`);
  }
  if (english.backend) fs.writeFileSync(path.join(outDir, "arrays.json"), `${JSON.stringify(english.backend.arrays, null, 2)}\n`);
  fs.writeFileSync(path.join(outDir, "source.json"), `${JSON.stringify({ repo: "exercism/website", sha }, null, 2)}\n`);
  console.log(`Wrote ${path.relative(process.cwd(), outDir) || "."}/`);
}

main().catch((error) => {
  console.error(`error: ${error.message}`);
  process.exit(1);
});
