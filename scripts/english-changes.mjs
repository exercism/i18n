#!/usr/bin/env node
//
// english-changes: which English does one PR's file list touch?
//
// Usage:
//   node scripts/english-changes.mjs --repo=exercism/<name> --pr-files=<json> [--kind=<kind>]
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
import { fragmentFiles, translatableFiles } from "./lib/completeness.mjs";
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

export function summarise(kind, entries) {
  if (kind === "website") {
    const files = entries.filter((entry) => isWebsiteEnglishPath(entry.path));
    return { kind, count: files.length, files: files.map((entry) => ({ type: entry.path.endsWith(".ts") ? "website-frontend" : "website-backend", path: entry.path })), fragments: [] };
  }
  const files = translatableFiles(kind, entries).map((file) => ({ ...file, store: contentRelativePath(file.id, file.extension) }));
  return { kind, count: files.length, files, fragments: fragmentFiles(kind, entries) };
}

export function toMarkdown(summary) {
  const lines = [];
  if (summary.kind === "website") {
    lines.push("| Catalog | English file |", "|---|---|");
    for (const file of summary.files.slice(0, SHOWN)) lines.push(`| ${file.type} | ${code(file.path)} |`);
  } else {
    lines.push("| Type | English file | Translation goes to `locales/<locale>/content/` |", "|---|---|---|");
    for (const file of summary.files.slice(0, SHOWN)) lines.push(`| ${file.type} | ${code(file.path)} | ${code(file.store)} |`);
  }
  // Said out loud, because a silently truncated list reads as the whole scope
  // and the rest of the work never gets done.
  if (summary.files.length > SHOWN) lines.push("", `... and ${summary.files.length - SHOWN} more. The PR's own file list is the full scope.`);
  if (summary.fragments.length > 0) {
    lines.push("", `Also changed, and NOT translatable yet (copy that is not a whole file; how it is keyed is undecided): ${summary.fragments.slice(0, 20).map((file) => code(file.path)).join(", ")}${summary.fragments.length > 20 ? ", ..." : ""}`);
  }
  return `${lines.join("\n")}\n`;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname;
if (isMain) {
  const { flags } = parseArgs(process.argv.slice(2));
  if (typeof flags.repo !== "string" || typeof flags["pr-files"] !== "string") fail("usage: english-changes.mjs --repo=exercism/<name> --pr-files=<json>");
  const kind = typeof flags.kind === "string" ? flags.kind : kindForRepo(flags.repo);
  repoKind(kind);

  const summary = summarise(kind, readPrFiles(fs.readFileSync(path.resolve(flags["pr-files"]), "utf8")));
  if (typeof flags.markdown === "string") fs.writeFileSync(path.resolve(flags.markdown), toMarkdown(summary));
  if (typeof flags.json === "string") fs.writeFileSync(path.resolve(flags.json), `${JSON.stringify(summary, null, 2)}\n`);

  console.log(`${flags.repo} (${kind}): ${summary.count} English file(s) changed, ${summary.fragments.length} not-yet-translatable.`);
  console.log(`count=${summary.count}`);
}
