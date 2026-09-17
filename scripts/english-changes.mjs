#!/usr/bin/env node
//
// english-changes: which English does one PR's file list touch?
//
// Usage:
//   node scripts/english-changes.mjs --repo=exercism/<name> --pr-files=<json> [--kind=<kind>]
//                                    [--base-tree=<json>] [--blobs-dir=<dir>] [--needs=<out.txt>]
//                                    [--markdown=<out.md>] [--json=<out.json>]
//
// Example (what the queue workflow runs):
//   gh api --paginate "repos/exercism/ruby/pulls/123/files" > files.json
//   node scripts/english-changes.mjs --repo=exercism/ruby --pr-files=files.json --markdown=body.md
//
// Prints `count=<n>` on its last line, which is the workflow's cue to open an
// issue or not. Exits 0 either way: finding no English is a normal answer.
//
// ## Why it takes a FILE LIST and not a checkout
//
// This runs in the one job of the whole loop that holds a secret: the token that
// opens an issue in exercism/i18n. Most Exercism PRs come from forks, so that job
// must never check PR code out, and with this it never needs to. GitHub's "list
// pull request files" API returns each changed file's path AND its git blob sha,
// and a blob id is exactly the key a translation is filed under. So everything
// the issue has to say (which files, which blob ids, which content types) comes
// from an API response, read as data, and the PR's tree is never fetched at all.
//
// The response is still untrusted: a path is whatever the PR author named a file.
// Every entry is shape-checked, a path only ever reaches the output inside a code
// span with its backticks and pipes neutralised, and nothing is interpolated into
// a shell.
//
// ## Metadata: two passes, still no checkout
//
// A changed config.json usually changes no copy at all (a uuid, a file list), and
// an issue for that is a translation run that finds nothing to do. Telling needs
// the file's TEXT, at the head and at the base, which a file list does not carry.
// So the first pass (`--needs`) writes the blob ids it would like, the workflow
// fetches each from GitHub's blob API by id into `--blobs-dir`, and the second
// pass compares the copy in the two versions (scripts/lib/metadata.mjs
// `fileCopy`). `--base-tree` is GitHub's recursive tree of the base commit, which
// is where a changed file's OLD blob id comes from. All of it is API responses
// parsed as JSON. A blob that was not fetched just means the file is reported as
// changed with its keys unknown.
//
// ## One list of patterns
//
// "What counts as English" is scripts/lib/content-types.mjs for content and
// scripts/lib/website-english.mjs for the website, read through here. The
// workflow in a source repo holds NO copy of those patterns. Being too narrow
// fails silently (the job goes green, opens nothing, and the change is never
// translated), so the list must not be able to drift in eighty-five places.

import fs from "node:fs";
import path from "node:path";
import { fail } from "./lib/constants.mjs";
import { parseArgs } from "./lib/args.mjs";
import { BLOB_ID } from "./lib/git.mjs";
import { kindForRepo, repoKind } from "./lib/source-repos.mjs";
import { isWebsiteEnglishPath } from "./lib/website-english.mjs";
import { metadataFiles, translatableFiles } from "./lib/completeness.mjs";
import { changedCopyKeys, fileCopy } from "./lib/metadata.mjs";
import { contentRelativePath } from "./lib/content-types.mjs";

const SHOWN = 100;

/** GitHub's response, or `--paginate`'s concatenation of several, as one clean list. */
export function readPrFiles(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    // `gh api --paginate` writes one JSON array per page, back to back.
    parsed = JSON.parse(`[${raw.trim().replace(/\]\s*\[/g, "],[")}]`);
  }
  const entries = [];
  for (const entry of [parsed].flat(2)) {
    if (!entry || typeof entry.filename !== "string" || entry.filename.length > 1024 || /[\0\n\r]/.test(entry.filename)) continue;
    if (entry.status === "removed") continue; // a deletion requires nothing
    if (typeof entry.sha !== "string" || !BLOB_ID.test(entry.sha)) continue;
    entries.push({ path: entry.filename, id: entry.sha });
  }
  return entries;
}

/** A path, safe inside a Markdown table cell's code span. */
const code = (text) => `\`${String(text).replace(/`/g, "'").replace(/\|/g, "\\|")}\``;

/** More changed metadata files than this and the blobs are not fetched: every one is reported as changed. */
export const MAX_METADATA_FILES = 150;

/**
 * @param {object} [options]
 * @param {Map<string,string>} [options.baseTree]  path -> blob id at the PR's base
 * @param {(id: string) => string|null} [options.readBlob]  a blob's text, when it
 *   was fetched. Without it a changed metadata file is reported with its keys
 *   unknown, which still opens an issue: over-reporting is the safe direction.
 */
export function summarise(kind, entries, { baseTree = null, readBlob = null } = {}) {
  if (kind === "website") {
    const files = entries.filter((entry) => isWebsiteEnglishPath(entry.path));
    return { kind, count: files.length, files: files.map((entry) => ({ type: entry.path.endsWith(".ts") ? "website-frontend" : "website-backend", path: entry.path })), metadata: [], needs: [] };
  }
  const files = translatableFiles(kind, entries).map((file) => ({ ...file, store: contentRelativePath(file.id, file.extension) }));

  const needs = new Set();
  const metadata = [];
  for (const file of metadataFiles(kind, entries)) {
    const baseId = baseTree?.get(file.path) ?? null;
    const head = readBlob?.(file.id) ?? null;
    const base = baseId === null ? "" : (readBlob?.(baseId) ?? null);
    if (head === null || base === null) {
      needs.add(file.id);
      if (baseId) needs.add(baseId);
      metadata.push({ ...file, keys: null });
      continue;
    }
    let keys;
    try {
      keys = changedCopyKeys(base === "" ? {} : fileCopy(file.type, file.path, base), fileCopy(file.type, file.path, head));
    } catch {
      keys = null; // unparseable on one side: say the file changed, and let the blocking check be precise
    }
    if (keys === null || keys.length > 0) metadata.push({ ...file, keys });
  }
  return { kind, count: files.length + metadata.length, files, metadata, needs: [...needs] };
}

export function toMarkdown(summary, { repoName = "<repo>" } = {}) {
  const lines = [];
  if (summary.kind === "website") {
    lines.push("| Catalog | English file |", "|---|---|");
    for (const file of summary.files.slice(0, SHOWN)) lines.push(`| ${file.type} | ${code(file.path)} |`);
  } else if (summary.files.length > 0) {
    lines.push("| Type | English file | Translation goes to `locales/<locale>/content/` |", "|---|---|---|");
    for (const file of summary.files.slice(0, SHOWN)) lines.push(`| ${file.type} | ${code(file.path)} | ${code(file.store)} |`);
  }
  // Said out loud, because a silently truncated list reads as the whole scope
  // and the rest of the work never gets done.
  if (summary.files.length > SHOWN) lines.push("", `... and ${summary.files.length - SHOWN} more. The PR's own file list is the full scope.`);
  if (summary.metadata.length > 0) {
    lines.push("", `Names, titles or blurbs changed. They go to ${code(`locales/<locale>/metadata/${repoName}.json`)}, by key:`, "", "| English file | Keys |", "|---|---|");
    for (const file of summary.metadata.slice(0, SHOWN)) {
      const keys = file.keys === null ? "not inspected: run `completeness.mjs` for the exact keys" : file.keys.slice(0, 12).map(code).join(", ") + (file.keys.length > 12 ? `, ... (${file.keys.length} in all)` : "");
      lines.push(`| ${code(file.path)} | ${keys} |`);
    }
    if (summary.metadata.length > SHOWN) lines.push("", `... and ${summary.metadata.length - SHOWN} more metadata file(s).`);
  }
  return `${lines.join("\n")}\n`;
}

/** GitHub's `git/trees/<sha>?recursive=1` response as path -> blob id. Untrusted, so shape-checked. */
export function readBaseTree(raw) {
  const tree = new Map();
  for (const entry of JSON.parse(raw).tree ?? []) {
    if (entry?.type === "blob" && typeof entry.path === "string" && BLOB_ID.test(entry.sha ?? "")) tree.set(entry.path, entry.sha);
  }
  return tree;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname;
if (isMain) {
  const { flags } = parseArgs(process.argv.slice(2));
  if (typeof flags.repo !== "string" || typeof flags["pr-files"] !== "string") fail("usage: english-changes.mjs --repo=exercism/<name> --pr-files=<json>");
  const kind = typeof flags.kind === "string" ? flags.kind : kindForRepo(flags.repo);
  repoKind(kind);

  const entries = readPrFiles(fs.readFileSync(path.resolve(flags["pr-files"]), "utf8"));
  const baseTree = typeof flags["base-tree"] === "string" ? readBaseTree(fs.readFileSync(path.resolve(flags["base-tree"]), "utf8")) : null;
  const blobsDir = typeof flags["blobs-dir"] === "string" ? path.resolve(flags["blobs-dir"]) : null;
  const readBlob = (id) => {
    const file = blobsDir && BLOB_ID.test(id) ? path.join(blobsDir, id) : null;
    return file && fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  };

  const summary = summarise(kind, entries, { baseTree, readBlob });
  // `--needs` is the first of two passes: it lists the blob ids (40 hex each, and
  // nothing else, so they are safe to put in a URL) whose text would let the
  // second pass say WHICH keys changed. Too many, and it lists none.
  if (typeof flags.needs === "string") fs.writeFileSync(path.resolve(flags.needs), summary.needs.length > MAX_METADATA_FILES * 2 ? "" : summary.needs.map((id) => `${id}\n`).join(""));
  if (typeof flags.markdown === "string") fs.writeFileSync(path.resolve(flags.markdown), toMarkdown(summary, { repoName: flags.repo.split("/").pop().replace(/[^A-Za-z0-9._-]/g, "") }));
  if (typeof flags.json === "string") fs.writeFileSync(path.resolve(flags.json), `${JSON.stringify(summary, null, 2)}\n`);

  console.log(`${flags.repo} (${kind}): ${summary.files.length} whole file(s) and ${summary.metadata.length} metadata file(s) change English.`);
  console.log(`count=${summary.count}`);
}
