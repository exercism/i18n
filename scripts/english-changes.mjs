#!/usr/bin/env node
//
// english-changes: which English does one PR's file list touch?
//
// Usage:
//   node scripts/english-changes.mjs --repo=exercism/<name> --pr-files=<json> [--kind=<kind>]
//                                    [--base-tree=<json>] [--blobs-dir=<dir>] [--needs=<out.txt>]
//                                    [--markdown=<out.md>] [--json=<out.json>]
//   node scripts/english-changes.mjs --push --repo=exercism/<name> --pr-files=<json>
//                                    --before-files=<json> --before-tree=<json> --after-tree=<json>
//                                    [--blobs-dir=<dir>] [--needs=<out.txt>] [--json=<out.json>]
//
// Example (what the queue workflow runs):
//   gh api --paginate "repos/exercism/ruby/pulls/123/files" > files.json
//   node scripts/english-changes.mjs --repo=exercism/ruby --pr-files=files.json --markdown=body.md
//
// Prints `count=<n>` on its last line, which tells the workflow whether to open
// an issue. Exits 0 either way, since finding no English is a normal result.
//
// ## Why it takes a file list
//
// This runs in the only job of the loop that holds a secret: the token that
// opens an issue in exercism/i18n. Most Exercism PRs come from forks, so that
// job must never check out PR code, and with this script it does not need to.
// GitHub's "list pull request files" API returns each changed file's path and
// its git blob sha, and translations are filed under blob ids. So everything
// the issue needs (which files, which blob ids, which content types) comes
// from an API response read as data, and the PR's tree is never fetched.
//
// The response is still untrusted, since a path is whatever the PR author
// named a file. Every entry is shape-checked, a path only reaches the output
// inside a code span with backticks and pipes escaped, and nothing is
// interpolated into a shell.
//
// ## Metadata: two passes
//
// Most config.json changes touch no copy (a uuid, a file list), and an issue
// for one of those is a translation run with nothing to do. Telling the
// difference needs the file's text at the head and at the base, which a file
// list does not include. So the first pass (`--needs`) writes the blob ids it
// wants, the workflow fetches each from GitHub's blob API into `--blobs-dir`,
// and the second pass compares the copy in the two versions
// (scripts/lib/metadata.mjs `fileCopy`). `--base-tree` is GitHub's recursive
// tree of the base commit, which gives a changed file's old blob id. All of it
// is API responses parsed as JSON. If a blob was not fetched, its file is
// reported as changed with its keys unknown.
//
// ## `--push`: did one push to a queued PR change English?
//
// The `ready-to-translate` label means "this English is final". A push that
// changes English removes the label; a push that changes none leaves it. This
// mode answers that for one push, `before` to `after`, using only the two
// commits' trees (GitHub's recursive tree API). A path counts when its blob
// differs between the two trees and the PR touches it, either now
// (`--pr-files`) or at `before` (`--before-files`, the files in the compare
// from the PR's base to `before`). The second condition means merging `main`
// into the branch does not count, because English that `main` brought in is
// not the PR's. A path the PR has dropped still counts, because the English
// the label approved is gone. A config.json or metadata.toml counts only if
// its copy changed, found with the same two-pass blob fetch, using `before` in
// place of the base.
//
// ## One list of patterns
//
// What counts as English is defined in scripts/lib/content-types.mjs for
// content and scripts/lib/website-english.mjs for the website, and read
// through this script. The source repo workflow has no copy of those patterns.
// If a copy were too narrow, the job would pass without opening an issue and
// the change would never be translated, so the list is kept in one place
// instead of eighty-five.

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

/**
 * Every path a PR file list or a compare's `files` names, including removed
 * and renamed-from paths. Used only as a scope: these strings are only looked
 * up in the two trees.
 */
export function readPaths(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = JSON.parse(`[${raw.trim().replace(/\]\s*\[/g, "],[")}]`);
  }
  const paths = new Set();
  const ok = (name) => typeof name === "string" && name.length > 0 && name.length <= 1024 && !/[\0\n\r]/.test(name);
  for (const entry of [parsed?.files ?? parsed].flat(2)) {
    if (ok(entry?.filename)) paths.add(entry.filename);
    if (ok(entry?.previous_filename)) paths.add(entry.previous_filename);
  }
  return paths;
}

/** GitHub's compare API lists at most this many files, so a list this long may be incomplete. */
export const COMPARE_FILE_CAP = 300;

/**
 * The English one push changed, in the PR's own files.
 *
 * @param {Set<string>|null} scope  paths the PR touches, at `before` or now. Null
 *   when the scope is unknown (a compare that hit its cap). Every path the push
 *   changed is then used, since over-reporting is safer.
 * @param {Map<string,string>} beforeTree  path -> blob id at `before`
 * @param {Map<string,string>} afterTree   path -> blob id at `after`
 */
export function pushChanges(kind, { scope, beforeTree, afterTree, readBlob = null }) {
  const paths = scope ?? new Set([...beforeTree.keys(), ...afterTree.keys()]);
  const entries = [];
  const removed = [];
  for (const file of paths) {
    const before = beforeTree.get(file) ?? null;
    const after = afterTree.get(file) ?? null;
    if (before === after) continue;
    if (after === null) removed.push({ path: file, id: before });
    else entries.push({ path: file, id: after });
  }
  const summary = summarise(kind, entries, { baseTree: beforeTree, readBlob });
  const english = (entry) => (kind === "website" ? isWebsiteEnglishPath(entry.path) : translatableFiles(kind, [entry]).length + metadataFiles(kind, [entry]).length > 0);
  const gone = removed.filter(english).map((entry) => entry.path);
  return { ...summary, removed: gone, count: summary.count + gone.length };
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
 *   unknown, which still opens an issue, since over-reporting is safer.
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
      keys = null; // unparseable on one side: report the file as changed and leave the exact keys to the completeness check
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
  // Say when the list is cut short. Otherwise it would look like the whole
  // scope, and the rest would never be translated.
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
  const blobsDir = typeof flags["blobs-dir"] === "string" ? path.resolve(flags["blobs-dir"]) : null;
  const readBlob = (id) => {
    const file = blobsDir && BLOB_ID.test(id) ? path.join(blobsDir, id) : null;
    return file && fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  };
  const read = (flag) => fs.readFileSync(path.resolve(flags[flag]), "utf8");
  const writeNeeds = (needs) => {
    if (typeof flags.needs === "string") fs.writeFileSync(path.resolve(flags.needs), needs.length > MAX_METADATA_FILES * 2 ? "" : needs.map((id) => `${id}\n`).join(""));
  };

  if (flags.push === true) {
    for (const flag of ["before-files", "before-tree", "after-tree"]) if (typeof flags[flag] !== "string") fail(`--push needs --${flag}=<json>`);
    const before = readPaths(read("before-files"));
    const scope = before.size >= COMPARE_FILE_CAP ? null : new Set([...before, ...readPaths(read("pr-files"))]);
    const summary = pushChanges(kind, { scope, beforeTree: readBaseTree(read("before-tree")), afterTree: readBaseTree(read("after-tree")), readBlob });
    writeNeeds(summary.needs);
    if (typeof flags.json === "string") fs.writeFileSync(path.resolve(flags.json), `${JSON.stringify(summary, null, 2)}\n`);
    console.log(`${flags.repo} (${kind}): this push changes ${summary.files.length} whole file(s), ${summary.metadata.length} metadata file(s) and removes ${summary.removed.length} English file(s)${scope === null ? ", counted over the whole tree" : ""}.`);
    console.log(`count=${summary.count}`);
    process.exit(0);
  }

  const entries = readPrFiles(fs.readFileSync(path.resolve(flags["pr-files"]), "utf8"));
  const baseTree = typeof flags["base-tree"] === "string" ? readBaseTree(read("base-tree")) : null;

  const summary = summarise(kind, entries, { baseTree, readBlob });
  // `--needs` is the first of two passes. It lists the blob ids (40 hex
  // characters each, so safe to put in a URL) whose text lets the second pass
  // work out which keys changed. If there are too many, it lists none.
  writeNeeds(summary.needs);
  if (typeof flags.markdown === "string") fs.writeFileSync(path.resolve(flags.markdown), toMarkdown(summary, { repoName: flags.repo.split("/").pop().replace(/[^A-Za-z0-9._-]/g, "") }));
  if (typeof flags.json === "string") fs.writeFileSync(path.resolve(flags.json), `${JSON.stringify(summary, null, 2)}\n`);

  console.log(`${flags.repo} (${kind}): ${summary.files.length} whole file(s) and ${summary.metadata.length} metadata file(s) change English.`);
  console.log(`count=${summary.count}`);
}
