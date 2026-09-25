#!/usr/bin/env node
//
// validate: check every translated file, and stamp the catalog units that pass.
//
// Usage:
//   node scripts/validate.mjs [<locale|all>] [--type=website-backend|website-frontend|metadata|content]
//                             [--complete] [--gate=all] [--json=<path>]
//                             [--stamp] [--stamp-units=<id,id|@file>] [--stamp-changed=<ref>]
//                             [--source-repo=<website checkout>] [--source-ref=<ref>]
//                             [--content-repos=<path[:kind][@ref]>,...]
//
// Examples:
//   node scripts/validate.mjs all                       # the CI gate
//   node scripts/validate.mjs hu --complete             # is hu ready to serve?
//   node scripts/validate.mjs hu --type=website-backend --stamp --source-ref=<sha>
//                                                       # after a pass, against the English it translated
//   node scripts/validate.mjs all --stamp --stamp-changed=origin/main
//                                                       # stamp what this change wrote, and nothing else
//   node scripts/validate.mjs hu --type=content --content-repos=../ruby,../problem-specifications
//                                                       # also compare structure where the English is findable
//
// Exit codes: 0 no gating ERROR, 1 at least one.
//
// ## Errors and warnings
//
// ERROR checks are structural facts. WARN checks are heuristics or judgement
// calls for a person to read, and never fail the run. Do not turn a WARN into
// an ERROR. scripts/lib/checks.mjs lists the level of every check and why.
//
// A warning a person cannot read is a warning nobody reads, so the
// byte-identical warnings are not printed against each catalog. They are
// grouped by the English string into a block at the end of the run, and a
// string signed off in identical-english.json is counted there and not printed.
// scripts/lib/identical.mjs holds both halves and the reasoning. `--json` still
// carries every occurrence.
//
// ## Only production locales gate
//
// Every locale in scope is checked, printed and counted, but only errors in a
// production locale (locales.json `productionTargets`) set the exit code.
// `targets` will include locales at very different stages, and a gate over all
// of them would always fail, so people would stop reading it and miss a real
// regression in a served locale. The summary prints both counts, so a passing
// run still shows how many non-production errors it found. `--gate=all` makes
// every locale in scope count towards the exit code.
//
// `productionTargets` holds `hu`. When it is empty, this script cannot exit 1
// on content without `--gate=all` or `--complete`, and it prints a notice
// saying so on every run.
//
// ## Missing units, and --complete
//
// A unit English has and a locale lacks is counted as `missing` for an
// ordinary locale, since a new language legitimately has very little. It is
// always an ERROR for a production locale, and for any locale `--complete` is
// pointed at. `--complete` asks whether a locale is ready to go live, so it is
// normally used on a locale that is not in `productionTargets` yet.
//
// This covers the two website catalogs, and the metadata catalog of every repo
// named in `--content-repos` (see scripts/lib/metadata.mjs: a catalog whose
// repo is not named is shape-checked and reported as `unv`, unverified, never
// `ok`). A track repo whose own config.json says `"active": false` is left out
// of that requirement, because the website does not show an inactive track and
// nobody has asked for one to be translated. A locale that holds a catalog for
// one anyway is still checked against its English: the exemption decides what a
// locale must hold, never what is checked once it holds it.
//
// This script cannot tell whether a locale holds every content file, because
// that English is spread over eighty repos and a run has at most a few of them.
// `scripts/completeness.mjs` answers that for one source repo at a time.
//
// ## Staleness is counted, never an error
//
// See the staleness section in scripts/lib/checks.mjs. Content has no
// staleness: it is keyed by the blob id of its English.
//
// ## An unstamped unit is an error
//
// Staleness is counted, and an absent stamp is not. A unit with no stamp is
// text that nothing can tie to any English, so completeness.mjs refuses it and
// blocks every source repo PR that touches the same key. That failure surfaces
// in another repo, hours later, reading like something else entirely, which is
// exactly how three of these got in. So a unit held to completeness (a
// production locale, or any locale under `--complete`) that has no stamp is an
// ERROR here, where the change that caused it can still be seen.
//
// The error only fires on a unit CI cannot stamp itself. See below.
//
// ## Stamping
//
// `--stamp` writes `<catalog>.meta.json`. Without it this script writes
// nothing. A unit is stamped with the hash of the English it was just checked
// against when it is present, has no ERROR of its own, and is either unstamped
// or named in `--stamp-units`. A stale unit is not re-stamped just because the
// run passed: the script cannot tell a retranslated unit from an untouched one,
// and stamping an untouched one would mark outdated text as `done`. The pass
// knows which units it rewrote, so it lists them. Unit ids are the ones this
// script prints (a key, or `<base>.*` / `<base>_*` for a plural group).
//
// The English a pass translated and the English `--stamp` hashes must be the
// same bytes. Point both at one commit with `--source-ref=<sha>`.
//
// ## Stamping what a change wrote, which is what CI does
//
// `--stamp-changed=<ref>` narrows stamping to the units whose translated text
// differs from `<ref>`. It is what makes stamping safe to automate: nobody can
// say which English an old unstamped unit was written against, but the unit a
// change rewrites was written against the English of the moment, which is the
// English this run resolves. So the diff is the evidence, and a unit outside it
// is never touched. scripts/lib/catalogs.mjs has the full reasoning.
//
// With `--stamp` the units are stamped. Without it the run is a dry run: those
// units are counted as `stampable` and are not held against the change, because
// .github/workflows/stamp.yml stamps them when it lands on main. Everything
// else with no stamp is the ERROR above.
//
// Nothing is invented. A key English does not have is not a unit at all, so it
// is never stamped (it is the "key not in English and never stamped" WARN, and
// only the source repo PR carrying that English can stamp it). A unit whose
// English moved after it was stamped is stale, and staleness is re-stamped only
// when a pass names the unit in `--stamp-units`. And a unit with an ERROR of its
// own is never stamped, whatever else is true of it.

import fs from "node:fs";
import path from "node:path";
import { PRODUCTION_LOCALES, REPO_ROOT, TARGET_LOCALES, assertTargetLocale, fail, productionGateNotice } from "./lib/constants.mjs";
import { parseArgs } from "./lib/args.mjs";
import { lsTree, readBlobs, refReader, resolveSha } from "./lib/git.mjs";
import { defaultRef, isActiveTrack, parseContentRepos, resolveRepo } from "./lib/source-repos.mjs";
import { buildWebsiteEnglish } from "./lib/website-english.mjs";
import { CATALOG_KINDS, DONE, MISSING, STALE, UNSTAMPED, assertChangedRef, catalogPath, changedCatalogKeys, englishUnits, flattenCatalog, readStamps, targetEntries, unitHash, unitState, unitTouched, writeStamps } from "./lib/catalogs.mjs";
import { CATALOG_TYPE_IDS, CONTENT_EXTENSIONS, CONTENT_TYPE_ID } from "./lib/content-types.mjs";
import { listContentFiles } from "./lib/content-store.mjs";
import { METADATA_KIND, METADATA_REPO_KINDS, METADATA_TYPE_ID, buildMetadataEnglish, heldMetadataRepos, metadataPath } from "./lib/metadata.mjs";
import { ERROR, WARN, checkCatalog, checkContentFile } from "./lib/checks.mjs";
import { loadAllowlist, renderIdentical, summariseIdentical } from "./lib/identical.mjs";
import { countNeverStamped, extraKeyRows, renderExtraKeys, summariseExtraKeys } from "./lib/extra-keys.mjs";

function parseStampUnits(value) {
  if (typeof value !== "string") return new Set();
  const text = value.startsWith("@") ? fs.readFileSync(path.resolve(value.slice(1)), "utf8") : value;
  const trimmed = text.trim();
  const list = trimmed.startsWith("[") ? JSON.parse(trimmed) : trimmed.split(/[\n,]/);
  return new Set(list.map((id) => String(id).trim()).filter(Boolean));
}

function validateCatalog({ locale, kind, english, requireComplete, stamp, stampUnits, changedRef = null, file = catalogPath(locale, kind), type = `website-${kind}` }) {
  const units = englishUnits(kind, english.catalog);
  const result = { locale, type, issues: [], counts: { total: units.size, [DONE]: 0, [STALE]: 0, [UNSTAMPED]: 0, [MISSING]: 0, extra: 0 }, stamped: 0 };

  if (!fs.existsSync(file)) {
    result.counts[MISSING] = units.size;
    result.absent = true;
    if (requireComplete) result.issues.push({ level: ERROR, message: `no ${path.relative(REPO_ROOT, file)}: ${units.size} units missing` });
    return result;
  }

  let tree;
  try {
    tree = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    result.issues.push({ level: ERROR, message: `invalid JSON: ${error.message}` });
    return result;
  }

  const flatTarget = flattenCatalog(kind, tree);
  const stamps = readStamps(file);
  const checked = checkCatalog(english.catalog, flatTarget, { kind, locale, requireComplete, stamps });
  result.issues = checked.issues;
  result.counts.extra = checked.extra.length;

  const failedUnits = new Set(checked.issues.filter((found) => found.level === ERROR && found.unit).map((found) => found.unit));
  let changed = false;

  // With --stamp-changed, only the units this change wrote may be stamped, and
  // the rest are left exactly as they are. See "changed units" in
  // scripts/lib/catalogs.mjs for why the diff is what makes the stamp true.
  const changedKeys = changedRef === null ? null : changedCatalogKeys(kind, file, changedRef);
  const stampable = [];
  const unstamped = [];

  for (const unit of units.values()) {
    const entries = targetEntries(kind, unit, flatTarget);
    let state = unitState(unit, entries, stamps);
    const written = changedKeys === null || unitTouched(kind, unit, changedKeys);
    const eligible = written && (state === UNSTAMPED || (state === STALE && stampUnits.has(unit.id))) && !failedUnits.has(unit.id);
    if (stamp && eligible) {
      stamps[unit.id] = unitHash(unit);
      state = DONE;
      changed = true;
      result.stamped += 1;
    } else if (state === UNSTAMPED) {
      // Without --stamp this is a dry run: a unit a stamping run would stamp is
      // reported as stampable and is not held against the change, because CI
      // stamps it on the way in.
      (eligible ? stampable : unstamped).push(unit.id);
    }
    result.counts[state] += 1;
  }
  if (changed) writeStamps(file, stamps);
  if (stampable.length > 0) result.counts.stampable = stampable.length;

  // An unstamped unit is text nothing can tie to any English, so completeness
  // refuses it and blocks every source repo PR that touches the same key, in a
  // repo whose author never sees this run. It has to fail here instead.
  if (requireComplete && unstamped.length > 0) {
    const shown = unstamped.slice(0, 10).join(", ");
    const typeFlag = kind === "metadata" ? METADATA_TYPE_ID : `website-${kind}`;
    const fix =
      changedRef === null
        ? `Check that text against English and stamp it: node scripts/validate.mjs ${locale} --type=${typeFlag} --stamp`
        : `This change did not write that text, so nothing here can say which English it was translated from. Someone has to check it against English and stamp it deliberately: node scripts/validate.mjs ${locale} --type=${typeFlag} --stamp`;
    result.issues.push({
      level: ERROR,
      message:
        `${unstamped.length} unit(s) translated but never checked against any English: ${shown}${unstamped.length > 10 ? `, and ${unstamped.length - 10} more` : ""}. ` +
        `A stamp records which English a unit was checked against, and completeness.mjs blocks a source repo's PR on a unit that has none. ${fix}`
    });
  }
  return result;
}

/**
 * One locale's metadata catalogs, one per source repo (scripts/lib/metadata.mjs).
 *
 * The English for `metadata/ruby.json` is in the ruby repo, so a catalog is
 * checked against English only when `--content-repos` names a checkout called
 * `ruby`. Without one it is still read and shape-checked, and reported as
 * unverified, never `ok`, because this run has not seen its English.
 */
function validateMetadata({ locale, contentRepos, requireComplete, stamp, stampUnits, changedRef }) {
  const results = [];
  const repos = new Map(contentRepos.map((repo) => [path.basename(repo.dir), repo]));

  // Each repo's tree is listed once and shared by the two things that read it:
  // deciding whether the track is still active, and building its English.
  const trees = new Map();
  const treeOf = (repo) => {
    if (!trees.has(repo)) trees.set(repo, lsTree(repo.dir, repo.ref));
    return trees.get(repo);
  };

  // CI passes every repo any locale holds a catalog for, so one locale
  // translating an inactive track would otherwise require every other locale to
  // translate it too. `isActiveTrack` reads the track's own config.json at the
  // ref already being validated.
  const mustHold = (name) => {
    const repo = repos.get(name);
    if (!METADATA_REPO_KINDS.includes(repo.kind)) return false;
    return repo.kind !== "track" || isActiveTrack(treeOf(repo), refReader(repo.dir, repo.ref).readMany);
  };
  const names = new Set([...heldMetadataRepos(locale), ...(requireComplete ? [...repos.keys()].filter(mustHold) : [])]);

  for (const name of [...names].sort()) {
    const file = metadataPath(locale, name);
    const type = `metadata/${name}`;
    const repo = repos.get(name);
    if (repo) {
      const english = buildMetadataEnglish(repo.kind, treeOf(repo), refReader(repo.dir, repo.ref).readMany);
      results.push(validateCatalog({ locale, kind: METADATA_KIND, english, requireComplete, stamp, stampUnits, changedRef, file, type }));
      continue;
    }
    const result = { locale, type, issues: [], counts: { total: 0, unverified: 0 }, unverified: true };
    try {
      const tree = JSON.parse(fs.readFileSync(file, "utf8"));
      result.counts.total = result.counts.unverified = Object.keys(tree).length;
      for (const [key, value] of Object.entries(tree)) {
        if (typeof value !== "string" || value.trim() === "") result.issues.push({ level: ERROR, message: `${key}: value must be a non-empty string` });
      }
    } catch (error) {
      result.issues.push({ level: ERROR, message: `invalid JSON: ${error.message}` });
    }
    results.push(result);
  }
  return results;
}

function validateContent({ locale, contentRepos }) {
  const files = listContentFiles(locale);
  const result = { locale, type: CONTENT_TYPE_ID, issues: [], counts: { total: files.length, verified: 0, copied: 0 } };
  // `unit` is what the grouping layer names a byte-identical warning by, and for
  // a content file the file is the unit.
  const at = (entry, found) => ({ ...found, unit: `content/${entry.relative}`, message: `content/${entry.relative}: ${found.message}` });

  // English is looked up by blob id in whichever checkouts the caller passed.
  // No path, repo name or registry is needed, so one `cat-file` per repo finds
  // all of it.
  const english = new Map();
  for (const repo of contentRepos) {
    const wanted = files.filter((entry) => entry.id && !english.has(entry.id)).map((entry) => entry.id);
    for (const [id, bytes] of readBlobs(repo.dir, wanted, { prefetch: false })) if (bytes !== null) english.set(id, bytes);
  }

  const seen = new Map();
  for (const entry of files) {
    if (entry.id === null) {
      result.issues.push(at(entry, { level: ERROR, message: "not a blob-id path (expected <ab>/<cd>/<36 hex>.<ext>)" }));
      continue;
    }
    if (!CONTENT_EXTENSIONS.includes(entry.extension)) {
      result.issues.push(at(entry, { level: ERROR, message: `extension "${entry.extension}" is not one content may carry (${CONTENT_EXTENSIONS.join(", ")})` }));
      continue;
    }
    // A blob id is one English file with one extension, so it has at most one
    // translation file.
    if (seen.has(entry.id)) result.issues.push(at(entry, { level: ERROR, message: `a second file for blob ${entry.id} (also content/${seen.get(entry.id)})` }));
    seen.set(entry.id, entry.relative);

    const source = english.get(entry.id) ?? null;
    if (source !== null) result.counts.verified += 1;
    const found = checkContentFile({ id: entry.id, extension: entry.extension, bytes: fs.readFileSync(entry.file) }, source);
    if (found.some((one) => one.message.startsWith("byte-identical"))) result.counts.copied += 1;
    result.issues.push(...found.map((one) => at(entry, one)));
  }
  return result;
}

async function main() {
  const { flags, positional } = parseArgs(process.argv.slice(2));
  const scope = positional[0] ?? "all";
  const locales = scope === "all" ? TARGET_LOCALES : [scope];
  if (scope !== "all") assertTargetLocale(scope);

  const known = [...CATALOG_TYPE_IDS, METADATA_TYPE_ID, CONTENT_TYPE_ID];
  const types = typeof flags.type === "string" ? [flags.type] : known;
  for (const type of types) if (!known.includes(type)) fail(`unknown --type "${type}". Known: ${known.join(", ")}`);
  const kinds = CATALOG_KINDS.filter((kind) => types.includes(`website-${kind}`));

  const gateAll = flags.gate === "all";
  const complete = Boolean(flags.complete);
  const stampUnits = parseStampUnits(flags["stamp-units"]);
  const stamp = Boolean(flags.stamp) || stampUnits.size > 0;
  const changedRef = typeof flags["stamp-changed"] === "string" ? flags["stamp-changed"] : null;
  if (flags["stamp-changed"] === true) fail(`--stamp-changed needs a ref to compare against, as --stamp-changed=origin/main.`);
  if (changedRef !== null) assertChangedRef(changedRef);
  const requiresComplete = (locale) => complete || PRODUCTION_LOCALES.includes(locale);

  const notice = productionGateNotice();
  if (notice) console.log(notice);
  if (locales.length === 0) console.log(`note: locales.json "targets" is empty, so there is nothing to validate yet.`);

  // English is required only when something will be compared against it: an
  // existing catalog, or a locale held to completeness. Otherwise it is used if
  // a checkout is available (so an absent catalog can report how many units it
  // is missing), and skipped with a message if not. So a run over an empty
  // `locales/` needs no website checkout.
  const needsEnglish = kinds.length > 0 && locales.some((locale) => requiresComplete(locale) || kinds.some((kind) => fs.existsSync(catalogPath(locale, kind))));
  let english = null;
  if (kinds.length > 0 && locales.length > 0) {
    const repo = resolveRepo("website", typeof flags["source-repo"] === "string" ? flags["source-repo"] : undefined, { optional: !needsEnglish });
    if (repo) {
      const ref = typeof flags["source-ref"] === "string" ? flags["source-ref"] : defaultRef(repo);
      english = await buildWebsiteEnglish(refReader(repo, ref), { kinds });
      console.log(`English: ${repo} @ ${ref} (${resolveSha(repo, ref)})`);
    } else {
      console.log("skip: no website checkout, and no locale in scope holds a website catalog, so the website types were not checked.");
    }
  }

  const contentRepos = parseContentRepos(flags["content-repos"]);
  const results = [];
  for (const locale of locales) {
    for (const kind of english ? kinds : []) {
      results.push(validateCatalog({ locale, kind, english: english[kind], requireComplete: requiresComplete(locale), stamp, stampUnits, changedRef }));
    }
    if (types.includes(METADATA_TYPE_ID)) results.push(...validateMetadata({ locale, contentRepos, requireComplete: requiresComplete(locale), stamp, stampUnits, changedRef }));
    if (types.includes(CONTENT_TYPE_ID)) results.push(validateContent({ locale, contentRepos }));
  }

  // Grouped and signed off before anything is printed, so the per-catalog
  // lines, the status letters and the totals all mean the same thing: what a
  // person is being asked to read.
  const identical = summariseIdentical(results, loadAllowlist());
  const shownIdentical = new Set(identical.groups.map((group) => `${group.locale}\u0000${group.id}`));
  const extraKeys = summariseExtraKeys(results);
  const neverStamped = countNeverStamped(results);

  const totals = { production: { errors: 0, warnings: 0 }, other: { errors: 0, warnings: 0 } };
  for (const result of results) {
    const errors = result.issues.filter((found) => found.level === ERROR);
    const warnings = result.issues.filter((found) => found.level === WARN && !found.identical && (!found.extraKey || found.neverStamped));
    const bucket = PRODUCTION_LOCALES.includes(result.locale) ? totals.production : totals.other;
    bucket.errors += errors.length;
    bucket.warnings += warnings.length;

    const grouped = result.issues.some((found) => (found.extraKey !== undefined && !found.neverStamped) || (found.identical && shownIdentical.has(`${result.locale}\u0000${found.identical.id}`)));
    const status = errors.length > 0 ? "FAIL" : result.absent ? "miss" : result.unverified ? "unv" : warnings.length > 0 || grouped ? "warn" : "ok";
    const counts = Object.entries(result.counts).map(([name, value]) => `${name} ${value}`).join(", ");
    console.log(`${status.padEnd(4)} ${result.locale.padEnd(7)} ${result.type.padEnd(16)} ${counts}${result.stamped ? `, stamped ${result.stamped}` : ""}`);
    for (const found of [...errors, ...warnings]) console.log(`       ${found.level.padEnd(5)} ${found.message}`);
  }

  // An entry that matches nothing is a defect, but only a run that covered
  // every locale and every type has been shown anything about it.
  const wholeRun = scope === "all" && typeof flags.type !== "string";
  for (const line of renderIdentical(identical, { reportUnmatched: wholeRun })) console.log(line);
  for (const line of renderExtraKeys(extraKeys, { neverStamped })) console.log(line);
  // A group is one warning, whatever its weight, which is the point of grouping:
  // the totals count what a person is asked to read. An extra-key row covers
  // every locale that holds the same orphans, and it is a production locale's
  // warning if any of them is one.
  for (const group of identical.groups) {
    const bucket = PRODUCTION_LOCALES.includes(group.locale) ? totals.production : totals.other;
    bucket.warnings += 1;
  }
  for (const row of extraKeyRows(extraKeys)) {
    const bucket = row.locales.some((locale) => PRODUCTION_LOCALES.includes(locale)) ? totals.production : totals.other;
    bucket.warnings += 1;
  }

  if (typeof flags.json === "string") {
    const plain = (group) => ({ ...group, units: [...group.units], catalogs: [...group.catalogs] });
    const report = { results, totals, identical: { ...identical, groups: identical.groups.map(plain), allowed: identical.allowed.map(plain) }, extraKeys };
    fs.writeFileSync(path.resolve(flags.json), `${JSON.stringify(report, null, 2)}\n`);
  }

  const gating = totals.production.errors + (gateAll || complete ? totals.other.errors : 0);
  console.log(
    `\n${results.length} item(s) checked. Production locales: ${totals.production.errors} error(s), ${totals.production.warnings} warning(s). ` +
      `Other locales: ${totals.other.errors} error(s), ${totals.other.warnings} warning(s)${gateAll || complete ? " (gating)" : totals.other.errors > 0 ? " (NOT gating: --gate=all to hold them to it)" : ""}.`
  );
  process.exit(gating > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(`error: ${error.message}`);
  process.exit(1);
});
