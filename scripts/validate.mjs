#!/usr/bin/env node
//
// validate: check every translated file, and stamp the catalog units that pass.
//
// Usage:
//   node scripts/validate.mjs [<locale|all>] [--type=website-backend|website-frontend|content]
//                             [--complete] [--gate=all] [--json=<path>]
//                             [--stamp] [--stamp-units=<id,id|@file>]
//                             [--source-repo=<website checkout>] [--source-ref=<ref>]
//                             [--content-repos=<path[:kind][@ref]>,...]
//
// Examples:
//   node scripts/validate.mjs all                       # the CI gate
//   node scripts/validate.mjs hu --complete             # would hu be fit to serve?
//   node scripts/validate.mjs hu --type=website-backend --stamp --source-ref=<sha>
//                                                       # after a pass, against the English it translated
//   node scripts/validate.mjs hu --type=content --content-repos=../ruby,../problem-specifications
//                                                       # also compare structure where the English is findable
//
// Exit codes: 0 no gating ERROR, 1 at least one.
//
// ## Errors block, warnings never do
//
// ERROR checks are structural facts, WARN checks are heuristics and judgements a
// human has to make. A WARN is printed to be read, never to gate. Do not promote
// one. scripts/lib/checks.mjs has the level of every check and the reasoning.
//
// ## The gate is scoped to production locales
//
// Every locale in scope is checked, printed and counted. What decides the exit
// code is errors in a PRODUCTION locale (locales.json `productionTargets`).
// `targets` will span locales at wildly different stages, and one gate over all
// of them is permanently red, which is the same as no gate: it stops being read,
// and the first real regression in a served locale lands underneath the noise.
// The summary prints both counts side by side, so a green run says out loud how
// many non-production errors it found. `--gate=all` widens the exit code to every
// locale in scope.
//
// `productionTargets` is EMPTY today, which means this script cannot currently
// exit 1 on content without `--gate=all` or `--complete`. It says so on every run.
//
// ## Missing, and --complete
//
// A unit English has and a locale does not is a counted state, `missing`, for an
// ordinary locale: a young language legitimately has almost nothing. It is an
// ERROR for a production locale, always, and for whatever locale `--complete` is
// pointed at, production or not. `--complete` is the go-live question, and a
// locale being asked it is by definition not in `productionTargets` yet.
//
// That covers the two website catalogs only. Whether a locale holds every CONTENT
// file is not something this script can know: the English is spread over eighty
// repos and this run has, at best, a few of them. `scripts/completeness.mjs`
// answers it for one source repo at a time, which is how it is asked in practice.
//
// ## Staleness is counted, never an error
//
// See "Staleness is a third thing" in scripts/lib/checks.mjs. Content has no
// staleness at all: it is keyed by the blob id of its English.
//
// ## Stamping
//
// `--stamp` writes `<catalog>.meta.json`. Without it this script writes nothing.
// A unit is stamped with the hash of the English it was just checked against when
// it is present, has no ERROR of its own, and is either not stamped yet or named
// in `--stamp-units`. A STALE unit is never re-stamped merely because the run
// passed: nothing here can tell "retranslated" from "untouched", and stamping the
// second would launder outdated text into `done`. The pass knows which units it
// rewrote, so it says so. Unit ids are the ones this script prints (a key, or
// `<base>.*` / `<base>_*` for a plural group).
//
// The English a pass translated and the English `--stamp` hashes MUST be the same
// bytes. Point both at one commit with `--source-ref=<sha>`.
//
// CI never stamps. A stamp asserts a translation matches its English, and nothing
// automated except the pass that wrote the words should be able to claim that.

import fs from "node:fs";
import path from "node:path";
import { PRODUCTION_LOCALES, REPO_ROOT, TARGET_LOCALES, assertTargetLocale, fail, productionGateNotice } from "./lib/constants.mjs";
import { parseArgs } from "./lib/args.mjs";
import { readBlobs, refReader, resolveSha } from "./lib/git.mjs";
import { defaultRef, parseContentRepos, resolveRepo } from "./lib/source-repos.mjs";
import { buildWebsiteEnglish } from "./lib/website-english.mjs";
import { CATALOG_KINDS, DONE, MISSING, STALE, UNSTAMPED, catalogPath, englishUnits, flattenCatalog, readStamps, targetEntries, unitHash, unitState, writeStamps } from "./lib/catalogs.mjs";
import { CATALOG_TYPE_IDS, CONTENT_EXTENSIONS, CONTENT_TYPE_ID } from "./lib/content-types.mjs";
import { listContentFiles } from "./lib/content-store.mjs";
import { ERROR, WARN, checkCatalog, checkContentFile } from "./lib/checks.mjs";
import { GuardViolation, assertPublishableKey } from "./lib/guard.mjs";

/** The guard is exercised on every run: see scripts/lib/guard.mjs. */
function checkGuards() {
  const problems = [];
  const locale = TARGET_LOCALES[0] ?? "xx";
  const locales = [locale];
  const refuses = (key) => {
    try {
      assertPublishableKey(key, { locales });
      problems.push(`the S3 key guard PERMITTED "${key}"`);
    } catch (error) {
      if (!(error instanceof GuardViolation)) throw error;
    }
  };
  for (const english of ["en", "en-US", "en-GB", "source", "default"]) refuses(`i18n/website/${english}/backend-000000000000.json`);
  refuses(`static/website/${locale}/backend-000000000000.json`);
  refuses(`i18n/website/not-a-locale/backend-000000000000.json`);
  refuses(`i18n/content/${locale}/../en/ab/cd/x.md`);
  try {
    assertPublishableKey(`i18n/content/${locale}/ab/cd/${"0".repeat(36)}.md`, { locales });
  } catch {
    problems.push("the S3 key guard REFUSED a legitimate key");
  }
  return problems;
}

function parseStampUnits(value) {
  if (typeof value !== "string") return new Set();
  const text = value.startsWith("@") ? fs.readFileSync(path.resolve(value.slice(1)), "utf8") : value;
  const trimmed = text.trim();
  const list = trimmed.startsWith("[") ? JSON.parse(trimmed) : trimmed.split(/[\n,]/);
  return new Set(list.map((id) => String(id).trim()).filter(Boolean));
}

function validateCatalog({ locale, kind, english, requireComplete, stamp, stampUnits }) {
  const file = catalogPath(locale, kind);
  const units = englishUnits(kind, english.catalog);
  const result = { locale, type: `website-${kind}`, issues: [], counts: { total: units.size, [DONE]: 0, [STALE]: 0, [UNSTAMPED]: 0, [MISSING]: 0, extra: 0 }, stamped: 0 };

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
  const checked = checkCatalog(english.catalog, flatTarget, { kind, locale, requireComplete });
  result.issues = checked.issues;
  result.counts.extra = checked.extra.length;

  const failedUnits = new Set(checked.issues.filter((found) => found.level === ERROR && found.unit).map((found) => found.unit));
  const stamps = readStamps(file);
  let changed = false;

  for (const unit of units.values()) {
    const entries = targetEntries(kind, unit, flatTarget);
    let state = unitState(unit, entries, stamps);
    const eligible = state === UNSTAMPED || (state === STALE && stampUnits.has(unit.id));
    if (stamp && eligible && !failedUnits.has(unit.id)) {
      stamps[unit.id] = unitHash(unit);
      state = DONE;
      changed = true;
      result.stamped += 1;
    }
    result.counts[state] += 1;
  }
  if (changed) writeStamps(file, stamps);
  return result;
}

function validateContent({ locale, contentRepos }) {
  const files = listContentFiles(locale);
  const result = { locale, type: CONTENT_TYPE_ID, issues: [], counts: { total: files.length, verified: 0, copied: 0 } };
  const at = (entry, found) => ({ ...found, message: `content/${entry.relative}: ${found.message}` });

  // English is looked up BY BLOB ID in whichever checkouts the caller offered.
  // No path, no repo name and no registry is involved: the id is the key, so "is
  // the English for this file in that repo?" is one `cat-file` for the lot.
  const english = new Map();
  for (const repo of contentRepos) {
    const wanted = files.filter((entry) => entry.id && !english.has(entry.id)).map((entry) => entry.id);
    for (const [id, bytes] of readBlobs(repo.dir, wanted)) if (bytes !== null) english.set(id, bytes);
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
    // One blob id is one English file, which had one extension.
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

  const types = typeof flags.type === "string" ? [flags.type] : [...CATALOG_TYPE_IDS, CONTENT_TYPE_ID];
  for (const type of types) if (![...CATALOG_TYPE_IDS, CONTENT_TYPE_ID].includes(type)) fail(`unknown --type "${type}". Known: ${[...CATALOG_TYPE_IDS, CONTENT_TYPE_ID].join(", ")}`);
  const kinds = CATALOG_KINDS.filter((kind) => types.includes(`website-${kind}`));

  const gateAll = flags.gate === "all";
  const complete = Boolean(flags.complete);
  const stampUnits = parseStampUnits(flags["stamp-units"]);
  const stamp = Boolean(flags.stamp) || stampUnits.size > 0;
  const requiresComplete = (locale) => complete || PRODUCTION_LOCALES.includes(locale);

  const guardProblems = checkGuards();
  for (const problem of guardProblems) console.log(`ERROR guard: ${problem}`);

  const notice = productionGateNotice();
  if (notice) console.log(notice);
  if (locales.length === 0) console.log(`note: locales.json "targets" is empty, so there is nothing to validate yet.`);

  // English is resolved only when something will be compared against it, so a
  // run over an empty `locales/` needs no website checkout at all.
  const needsEnglish = kinds.length > 0 && locales.some((locale) => requiresComplete(locale) || kinds.some((kind) => fs.existsSync(catalogPath(locale, kind))));
  let english = null;
  if (needsEnglish) {
    const repo = resolveRepo("website", typeof flags["source-repo"] === "string" ? flags["source-repo"] : undefined);
    const ref = typeof flags["source-ref"] === "string" ? flags["source-ref"] : defaultRef(repo);
    english = await buildWebsiteEnglish(refReader(repo, ref), { kinds });
    console.log(`English: ${repo} @ ${ref} (${resolveSha(repo, ref)})`);
  }

  const contentRepos = parseContentRepos(flags["content-repos"]);
  const results = [];
  for (const locale of locales) {
    for (const kind of kinds) {
      results.push(validateCatalog({ locale, kind, english: english[kind], requireComplete: requiresComplete(locale), stamp, stampUnits }));
    }
    if (types.includes(CONTENT_TYPE_ID)) results.push(validateContent({ locale, contentRepos }));
  }

  const totals = { production: { errors: 0, warnings: 0 }, other: { errors: 0, warnings: 0 } };
  for (const result of results) {
    const errors = result.issues.filter((found) => found.level === ERROR);
    const warnings = result.issues.filter((found) => found.level === WARN);
    const bucket = PRODUCTION_LOCALES.includes(result.locale) ? totals.production : totals.other;
    bucket.errors += errors.length;
    bucket.warnings += warnings.length;

    const status = errors.length > 0 ? "FAIL" : result.absent ? "miss" : warnings.length > 0 ? "warn" : "ok";
    const counts = Object.entries(result.counts).map(([name, value]) => `${name} ${value}`).join(", ");
    console.log(`${status.padEnd(4)} ${result.locale.padEnd(7)} ${result.type.padEnd(16)} ${counts}${result.stamped ? `, stamped ${result.stamped}` : ""}`);
    for (const found of [...errors, ...warnings]) console.log(`       ${found.level.padEnd(5)} ${found.message}`);
  }

  if (typeof flags.json === "string") fs.writeFileSync(path.resolve(flags.json), `${JSON.stringify({ results, totals }, null, 2)}\n`);

  const gating = guardProblems.length + totals.production.errors + (gateAll || complete ? totals.other.errors : 0);
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
