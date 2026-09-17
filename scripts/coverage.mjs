#!/usr/bin/env node
//
// coverage: how much of what exists is translated, per locale.
//
// Usage:
//   node scripts/coverage.mjs [<locale|all>] [--json[=<path>]]
//                             [--source-repo=<website checkout>] [--source-ref=<ref>]
//                             [--content-repos=<path[:kind][@ref]>,...]
//
// Examples:
//   node scripts/coverage.mjs                                         # website catalogs + what the store holds
//   node scripts/coverage.mjs hu --content-repos=../ruby,../docs      # ...and how much of those repos hu covers
//
// It reports and NEVER gates: it exits 0 whatever it finds, and a source it
// cannot read is a row that says so. `validate` is the gate for what is here, and
// `completeness` is the gate for what a source repo needs.
//
// ## The website rows
//
// Counted in UNITS against English's unit set (an ordinary key, or a whole plural
// group: see scripts/lib/catalogs.mjs), so a Polish group holding four categories
// where English holds two is one unit done, never two extra keys. `done` means
// stamped against today's English; `stale`, `unstamped` and `missing` are the
// other three states, and `extra` is reported outside the fraction, because a key
// nobody can work on is neither done nor remaining.
//
// With no website checkout the rows say so and count nothing. That reads as "not
// measured", never as done.
//
// ## The content rows
//
// Content is keyed by blob id, so the store alone can only say how many files a
// locale HOLDS. How many it NEEDS is a fact about source repos, around eighty-five
// of them, and no run has them all. So a denominator appears only for the repos
// named in `--content-repos`, one row per content type per repo, and the bare
// held count is always printed beside them. A file shared by twenty tracks is one
// file held and counts towards all twenty.
//
// ## The metadata rows
//
// One per repo named in `--content-repos`: the names, titles and blurbs extracted
// from its config.json or metadata.toml (scripts/lib/metadata.mjs), counted in
// units with the same four states as the website rows. A metadata catalog a
// locale holds for a repo that was NOT named is listed as held and not measured.

import fs from "node:fs";
import path from "node:path";
import { PRODUCTION_LOCALES, TARGET_LOCALES, assertTargetLocale } from "./lib/constants.mjs";
import { parseArgs } from "./lib/args.mjs";
import { lsTree, refReader, resolveSha } from "./lib/git.mjs";
import { defaultRef, parseContentRepos, resolveRepo } from "./lib/source-repos.mjs";
import { buildWebsiteEnglish } from "./lib/website-english.mjs";
import { CATALOG_KINDS, DONE, MISSING, STALE, UNSTAMPED, catalogPath, claimedKeys, englishUnits, flattenCatalog, readStamps, targetEntries, unitState } from "./lib/catalogs.mjs";
import { heldContent } from "./lib/content-store.mjs";
import { translatableFiles } from "./lib/completeness.mjs";
import { METADATA_KIND, buildMetadataEnglish, heldMetadataRepos, metadataPath } from "./lib/metadata.mjs";

export const pct = (done, total) => (total === 0 ? "n/a" : `${Math.floor((done / total) * 100)}%`);

function catalogCoverage(locale, kind, flatEnglish, file = catalogPath(locale, kind)) {
  const units = englishUnits(kind, flatEnglish);
  const flat = fs.existsSync(file) ? flattenCatalog(kind, JSON.parse(fs.readFileSync(file, "utf8"))) : {};
  const stamps = fs.existsSync(file) ? readStamps(file) : {};
  const counts = { total: units.size, [DONE]: 0, [STALE]: 0, [UNSTAMPED]: 0, [MISSING]: 0, extra: 0 };
  for (const unit of units.values()) counts[unitState(unit, targetEntries(kind, unit, flat), stamps)] += 1;
  const claimed = claimedKeys(kind, units);
  counts.extra = Object.keys(flat).filter((key) => !claimed.has(key)).length;
  return counts;
}

async function main() {
  const { flags, positional } = parseArgs(process.argv.slice(2));
  const scope = positional[0] ?? "all";
  if (scope !== "all") assertTargetLocale(scope);
  const locales = scope === "all" ? TARGET_LOCALES : [scope];

  const report = { english: null, locales: {}, repos: [] };

  let english = null;
  const website = resolveRepo("website", typeof flags["source-repo"] === "string" ? flags["source-repo"] : undefined, { optional: true });
  if (website) {
    try {
      const ref = typeof flags["source-ref"] === "string" ? flags["source-ref"] : defaultRef(website);
      english = await buildWebsiteEnglish(refReader(website, ref));
      report.english = { repo: "exercism/website", sha: resolveSha(website, ref) };
    } catch (error) {
      report.englishError = error.message;
    }
  }

  // Each content repo's translatable files are a fact about that repo alone.
  const repos = parseContentRepos(flags["content-repos"]).map((repo) => {
    const entries = lsTree(repo.dir, repo.ref);
    let metadata = null;
    try {
      metadata = buildMetadataEnglish(repo.kind, entries, refReader(repo.dir, repo.ref).readMany).catalog;
    } catch (error) {
      console.error(`note: ${path.basename(repo.dir)}: metadata not measured (${error.message})`);
    }
    return { ...repo, name: path.basename(repo.dir), files: translatableFiles(repo.kind, entries), metadata };
  });

  for (const locale of locales) {
    const held = heldContent(locale);
    const row = (report.locales[locale] = { production: PRODUCTION_LOCALES.includes(locale), website: {}, contentHeld: held.size, repos: {}, metadata: {}, metadataHeld: heldMetadataRepos(locale) });
    for (const kind of CATALOG_KINDS) row.website[kind] = english ? catalogCoverage(locale, kind, english[kind].catalog) : null;
    for (const repo of repos) {
      const byType = {};
      for (const file of repo.files) {
        const counts = (byType[file.type] ??= { total: 0, done: 0 });
        counts.total += 1;
        if (held.get(file.id) === file.extension) counts.done += 1;
      }
      row.repos[repo.name] = byType;
      if (repo.metadata && Object.keys(repo.metadata).length > 0) row.metadata[repo.name] = catalogCoverage(locale, METADATA_KIND, repo.metadata, metadataPath(locale, repo.name));
    }
  }
  report.repos = repos.map((repo) => ({ name: repo.name, kind: repo.kind, ref: repo.ref, files: repo.files.length, metadataUnits: repo.metadata ? Object.keys(repo.metadata).length : null }));

  if (flags.json) {
    const text = `${JSON.stringify(report, null, 2)}\n`;
    if (typeof flags.json === "string") fs.writeFileSync(path.resolve(flags.json), text);
    else process.stdout.write(text);
    return;
  }

  console.log(report.english ? `English: exercism/website @ ${report.english.sha}` : `English: no website checkout readable${report.englishError ? ` (${report.englishError})` : ""}, so the website rows are NOT MEASURED.`);
  for (const repo of report.repos) console.log(`Content: ${repo.name} (${repo.kind}) @ ${repo.ref}: ${repo.files} translatable file(s), ${repo.metadataUnits ?? "unmeasured"} metadata unit(s)`);
  if (locales.length === 0) console.log(`\nlocales.json "targets" is empty, so there is no locale to report on yet.`);

  for (const locale of locales) {
    const row = report.locales[locale];
    console.log(`\n${locale}${row.production ? "  (production)" : ""}`);
    for (const kind of CATALOG_KINDS) {
      const counts = row.website[kind];
      if (!counts) console.log(`  website-${kind.padEnd(9)} not measured`);
      else {
        console.log(
          `  website-${kind.padEnd(9)} ${String(counts[DONE]).padStart(5)}/${counts.total} ${pct(counts[DONE], counts.total).padStart(4)}   ` +
            `stale ${counts[STALE]}, unstamped ${counts[UNSTAMPED]}, missing ${counts[MISSING]}${counts.extra ? `  (+${counts.extra} extra, outside the fraction)` : ""}`
        );
      }
    }
    for (const [name, counts] of Object.entries(row.metadata)) {
      console.log(
        `  metadata/${name.padEnd(24)} ${String(counts[DONE]).padStart(5)}/${counts.total} ${pct(counts[DONE], counts.total).padStart(4)}   ` +
          `stale ${counts[STALE]}, unstamped ${counts[UNSTAMPED]}, missing ${counts[MISSING]}${counts.extra ? `  (+${counts.extra} extra)` : ""}`
      );
    }
    const unmeasured = row.metadataHeld.filter((name) => !(name in row.metadata));
    if (unmeasured.length > 0) console.log(`  metadata held, not measured (no checkout named): ${unmeasured.join(", ")}`);
    console.log(`  content            ${String(row.contentHeld).padStart(5)} file(s) held`);
    for (const [name, byType] of Object.entries(row.repos)) {
      for (const [type, counts] of Object.entries(byType)) {
        console.log(`    ${name}: ${type.padEnd(30)} ${String(counts.done).padStart(5)}/${counts.total} ${pct(counts.done, counts.total).padStart(4)}`);
      }
    }
  }
}

main().catch((error) => {
  // Coverage never gates, and that includes on its own bugs being survivable in
  // CI: say what happened, exit 0.
  console.error(`coverage could not complete: ${error.message}`);
});
