#!/usr/bin/env node
//
// backfill-index: build one locale's translation index from source history.
//
// Usage:
//   node scripts/backfill-index.mjs <locale> [--sources=<dir>] [--repos=<a,b>] [--ref=<ref>]
//
//   --sources  a directory holding one checkout per source repo, named as the
//              GitHub repo (default: ../translator/.source, where
//              exercism/translator keeps full clones of every source)
//   --repos    only these repos
//   --ref      the ref to read each repo at (default: origin/main, else HEAD)
//
// For each repo, each translatable path at the ref (content-types.mjs), and the
// blob ids that path's English has had over its history, it records the ids
// this locale holds a translation for, newest first, at most six. A path with
// none is listed as missing. Then it writes index/json/<locale>/<repo>.json and
// regenerates the Markdown (scripts/lib/translation-index.mjs).
//
// Re-running it gives the same result. A path an earlier run or a translation
// pass indexed that is no longer in the tree keeps its entry if it has ids.
//
// History is read with one `git log --raw` per repo, without following renames,
// the same way the translator looks for a previous version. The website repo is
// skipped (its strings are catalogs, which the index does not cover), and so is
// a track whose config.json says `"active": false`, because the website does
// not show inactive tracks.

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "./lib/args.mjs";
import { SCRIPTS_ROOT, assertTargetLocale, fail } from "./lib/constants.mjs";
import { git, lsTree, refExists, refReader } from "./lib/git.mjs";
import { REPO_KINDS, isActiveTrack, kindForRepo } from "./lib/source-repos.mjs";
import { translatableFiles } from "./lib/completeness.mjs";
import { metadataPath } from "./lib/metadata.mjs";
import { HISTORY_CAP, displayNames, heldIn, readIndex, saveRepoIndex, syncIndex, writeMarkdown } from "./lib/translation-index.mjs";

/**
 * Every blob id each path has had, newest first, from one `git log`.
 * Commits come in git log's default order, newest first.
 */
export function pathHistory(repo, ref, prefixes, wanted) {
  const out = git(["log", "--raw", "-z", "--no-renames", "--no-abbrev", "--format=", ref, "--", ...prefixes], repo);
  const history = new Map();
  const tokens = out.split("\0");
  for (let i = 0; i < tokens.length; i++) {
    const meta = tokens[i].replace(/^\n+/, "");
    if (!meta.startsWith(":")) continue;
    const file = tokens[++i];
    if (!wanted.has(file)) continue;
    const id = meta.split(" ")[3];
    if (!id || /^0+$/.test(id)) continue;
    if (!history.has(file)) history.set(file, []);
    const ids = history.get(file);
    if (!ids.includes(id)) ids.push(id);
  }
  return history;
}

function main() {
  const { flags, positional } = parseArgs(process.argv.slice(2));
  const locale = positional[0];
  if (!locale) fail("usage: backfill-index.mjs <locale> [--sources=<dir>] [--repos=<a,b>] [--ref=<ref>]");
  assertTargetLocale(locale);

  const sources = path.resolve(typeof flags.sources === "string" ? flags.sources : path.join(SCRIPTS_ROOT, "..", "translator", ".source"));
  if (!fs.existsSync(sources)) fail(`no source checkouts at ${sources}`);
  const only = typeof flags.repos === "string" ? flags.repos.split(",").filter(Boolean) : null;
  const names = fs.readdirSync(sources).filter((name) => !only || only.includes(name)).sort();
  const isHeld = heldIn(locale);

  const totals = { repos: 0, paths: 0, held: 0, missing: 0, behind: 0, ids: 0 };
  const skipped = [];
  for (const name of names) {
    const dir = path.join(sources, name);
    const kind = kindForRepo(name);
    if (kind === "website") {
      skipped.push(`${name} (website strings are catalogs)`);
      continue;
    }
    const ref = typeof flags.ref === "string" ? flags.ref : refExists(dir, "origin/main") ? "origin/main" : "HEAD";
    if (!refExists(dir, ref)) {
      skipped.push(`${name} (no ${ref})`);
      continue;
    }
    const entries = lsTree(dir, ref);
    const read = refReader(dir, ref).readMany;
    if (kind === "track" && !isActiveTrack(entries, read)) {
      skipped.push(`${name} (inactive track)`);
      continue;
    }
    const files = translatableFiles(kind, entries);
    if (files.length === 0) {
      skipped.push(`${name} (nothing translatable)`);
      continue;
    }

    const history = pathHistory(dir, ref, REPO_KINDS[kind].sparse ?? [], new Set(files.map((file) => file.path)));
    const index = readIndex(locale, name, kind);
    for (const file of files) {
      const ids = [file.id, ...(history.get(file.path) ?? []).filter((id) => id !== file.id)];
      index.paths[file.path] = ids.filter((id) => isHeld(id, file.extension)).slice(0, HISTORY_CAP);
    }
    const catalogFile = metadataPath(locale, name);
    const catalog = fs.existsSync(catalogFile) ? JSON.parse(fs.readFileSync(catalogFile, "utf8")) : {};
    syncIndex(index, files, isHeld, displayNames(kind, entries, read, locale, catalog));
    saveRepoIndex(index);

    const counts = { paths: files.length, held: 0, missing: 0, behind: 0, ids: 0 };
    for (const file of files) {
      const ids = index.paths[file.path];
      counts.ids += ids.length;
      if (ids.length === 0) counts.missing += 1;
      else counts.held += 1;
      if (ids.length > 0 && ids[0] !== file.id) counts.behind += 1;
    }
    totals.repos += 1;
    for (const key of ["paths", "held", "missing", "behind", "ids"]) totals[key] += counts[key];
    console.log(`${name.padEnd(24)} ${kind.padEnd(22)} paths ${String(counts.paths).padStart(5)}  with a translation ${String(counts.held).padStart(5)}  missing ${String(counts.missing).padStart(5)}  latest is of older English ${String(counts.behind).padStart(4)}  ids ${String(counts.ids).padStart(5)}`);
  }
  writeMarkdown(locale);

  console.log(`\n${locale}: ${totals.repos} repos, ${totals.paths} paths, ${totals.held} with a translation, ${totals.missing} missing, ${totals.behind} whose latest translation is of older English, ${totals.ids} ids indexed`);
  if (skipped.length > 0) console.log(`skipped ${skipped.length}: ${skipped.join(", ")}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
