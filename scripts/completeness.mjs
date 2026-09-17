#!/usr/bin/env node
//
// completeness: does this repo hold every translation one source repo needs?
//
// Usage:
//   node scripts/completeness.mjs --source-repo=<checkout> [--repo=exercism/<name>] [--kind=<kind>]
//                                 [--head=<ref>] [--base=<ref>] [--locales=<a,b>] [--json=<path>]
//
// Examples:
//   node scripts/completeness.mjs --source-repo=../ruby                      # all of ruby main, production locales
//   node scripts/completeness.mjs --source-repo=../ruby --locales=hu         # ...for one named locale
//   node scripts/completeness.mjs --source-repo=pr --repo=exercism/ruby --head=FETCH_HEAD --base=FETCH_HEAD^1
//                                                                            # what a PR check runs
//
// Exit codes: 0 every locale asked about holds everything required, 1 otherwise.
//
// ## This is the blocking check
//
// A production-locale user never sees untranslated text. So every repo that holds
// English runs this on every PR, and the PR cannot merge until it passes: the
// translations have to be HERE first. source-repo-workflows/ has the workflow a
// source repo installs, and that workflow is three lines around this script, so
// that what "complete" means is decided in one place rather than in eighty-five
// copies of a YAML file.
//
// ## Which locales
//
// `productionTargets` from locales.json, unless `--locales` names others. With an
// empty production list (today's state) there is nobody to hold a PR to, so this
// exits 0 and says so, loudly: it is not a pass, it is an absence of a gate.
//
// ## What it reads, and what it never does
//
// The source repo is read through git objects at `--head` (and `--base`), never
// through a working tree: `git ls-tree` for content, which needs no blobs at all,
// and `git cat-file` for the website's YAML and bundles, which are parsed as data
// and never executed. It is safe to point at a fork's PR. See scripts/lib/git.mjs
// and scripts/lib/ts-object.mjs.
//
// ## --base
//
// Without it, everything at `--head` is required. With it, only what changed
// between the two. scripts/lib/completeness.mjs says why both exist. For a PR the
// natural pair is the merge ref and its first parent (`refs/pull/N/merge` and
// `^1`): that diff is exactly what merging would change, with no merge-base
// arithmetic and no history beyond depth 2.
//
// ## What it cannot check yet
//
// Text that is not a whole file (blurbs and titles in config.json, fields of
// metadata.toml). How that is keyed is an open decision, so those files are
// counted and NAMED in the output as unchecked, never silently passed.

import fs from "node:fs";
import path from "node:path";
import { PRODUCTION_LOCALES, assertTargetLocale, fail, productionGateNotice } from "./lib/constants.mjs";
import { parseArgs } from "./lib/args.mjs";
import { lsTree, refReader, resolveSha } from "./lib/git.mjs";
import { kindForRepo, repoKind } from "./lib/source-repos.mjs";
import { buildWebsiteEnglish } from "./lib/website-english.mjs";
import { CATALOG_KINDS, catalogPath, flattenCatalog, readStamps } from "./lib/catalogs.mjs";
import { heldContent } from "./lib/content-store.mjs";
import { REASONS, fragmentFiles, missingContent, missingUnits, requiredContent, requiredUnits } from "./lib/completeness.mjs";

const SHOWN = 40;

async function main() {
  const { flags } = parseArgs(process.argv.slice(2));
  if (typeof flags["source-repo"] !== "string") fail("--source-repo=<checkout> is required: the repo whose English is being asked about.");
  const repo = path.resolve(flags["source-repo"]);
  const name = typeof flags.repo === "string" ? flags.repo : `exercism/${path.basename(repo)}`;
  const kind = typeof flags.kind === "string" ? flags.kind : kindForRepo(name);
  repoKind(kind);

  const head = typeof flags.head === "string" ? flags.head : "HEAD";
  const base = typeof flags.base === "string" ? flags.base : null;
  const locales = typeof flags.locales === "string" ? flags.locales.split(",").filter(Boolean) : PRODUCTION_LOCALES;
  locales.forEach(assertTargetLocale);

  console.log(`${name} (${kind}) @ ${resolveSha(repo, head)}${base ? `, relative to ${resolveSha(repo, base)}` : ", in full"}`);

  const report = { repo: name, kind, head: resolveSha(repo, head), base: base ? resolveSha(repo, base) : null, locales: {}, unchecked: [] };

  // What is required is a fact about the source repo alone, computed once.
  let content = [];
  let website = null;
  if (kind === "website") {
    const englishHead = await buildWebsiteEnglish(refReader(repo, head));
    const englishBase = base ? await buildWebsiteEnglish(refReader(repo, base)) : null;
    website = Object.fromEntries(CATALOG_KINDS.map((catalog) => [catalog, requiredUnits(catalog, englishHead[catalog].catalog, englishBase?.[catalog].catalog ?? null)]));
    for (const catalog of CATALOG_KINDS) console.log(`  requires ${website[catalog].length} ${catalog} unit(s)`);
  } else {
    const headEntries = lsTree(repo, head);
    const baseEntries = base ? lsTree(repo, base) : null;
    content = requiredContent(kind, headEntries, baseEntries);
    console.log(`  requires ${content.length} content file(s), ${new Set(content.map((file) => file.id)).size} distinct`);

    const before = baseEntries === null ? null : new Map(baseEntries.map((entry) => [entry.path, entry.id]));
    const now = new Map(headEntries.map((entry) => [entry.path, entry.id]));
    report.unchecked = fragmentFiles(kind, headEntries).filter((file) => before === null || before.get(file.path) !== now.get(file.path));
    if (report.unchecked.length > 0) {
      console.log(`  NOT CHECKED: ${report.unchecked.length} file(s) holding copy that is not a whole file (blurbs, titles). How that is keyed is undecided.`);
      for (const file of report.unchecked.slice(0, 5)) console.log(`    ${file.path} (${file.type})`);
      if (report.unchecked.length > 5) console.log(`    ... and ${report.unchecked.length - 5} more`);
    }
  }

  const notice = productionGateNotice();
  if (locales.length === 0) {
    console.log(notice ?? "no locales to check.");
    console.log("Nothing is required of anyone, so nothing can be missing. Exiting 0.");
    if (typeof flags.json === "string") fs.writeFileSync(path.resolve(flags.json), `${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  let incomplete = 0;
  for (const locale of locales) {
    const lines = [];
    if (website) {
      for (const catalog of CATALOG_KINDS) {
        const file = catalogPath(locale, catalog);
        const flat = fs.existsSync(file) ? flattenCatalog(catalog, JSON.parse(fs.readFileSync(file, "utf8"))) : {};
        for (const found of missingUnits(catalog, website[catalog], flat, fs.existsSync(file) ? readStamps(file) : {}, locale)) {
          lines.push({ what: `website-${catalog}: ${found.unit}`, why: REASONS[found.reason], ...found, catalog });
        }
      }
    } else {
      for (const file of missingContent(content, heldContent(locale))) {
        if (!file.duplicate) lines.push({ what: `${file.path} (${file.type})`, why: `no locales/${locale}/content/${file.store}`, ...file });
      }
    }

    report.locales[locale] = lines;
    if (lines.length === 0) {
      console.log(`ok   ${locale}`);
      continue;
    }
    incomplete += 1;
    console.log(`FAIL ${locale}: ${lines.length} translation(s) outstanding`);
    for (const line of lines.slice(0, SHOWN)) console.log(`       ${line.what}: ${line.why}`);
    if (lines.length > SHOWN) console.log(`       ... and ${lines.length - SHOWN} more (--json=<path> for the full list)`);
  }

  if (typeof flags.json === "string") fs.writeFileSync(path.resolve(flags.json), `${JSON.stringify(report, null, 2)}\n`);

  if (incomplete > 0) {
    console.log(
      `\n${incomplete} locale(s) incomplete. Translations live in exercism/i18n and land there BEFORE this English merges.\n` +
        `A translation issue for this change is open there; this check is re-run when it is closed.`
    );
    process.exit(1);
  }
  console.log(`\nEvery locale asked about (${locales.join(", ")}) holds everything this requires.`);
}

main().catch((error) => {
  console.error(`error: ${error.message}`);
  process.exit(1);
});
