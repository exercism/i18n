// Byte-identical translations: grouped for reading, and signed off once.
//
// `checkCatalog` warns when a translated string is byte for byte its English
// (scripts/lib/checks.mjs). That check earns its keep, because it is how a
// locale that left a prose `source` in English shows up while another locale
// translated it. What it does not do is say the same thing once. A source repo
// syncs one exercise into a hundred-odd tracks, so one editorial fact, "Maud de
// Vries, Erik Schierboom", is reported once per track per locale, and a real
// run prints it hundreds of times. Nobody reads a wall like that, so the check
// stops working.
//
// Two things happen here, both in the reporting layer. What is checked does not
// change, `--json` still carries every occurrence, and nothing here can hide an
// ERROR.
//
//  - Occurrences are grouped by the English string, so one decision prints once
//    with the number of catalogs it was seen in.
//  - A string a reviewer has signed off in identical-english.json is counted
//    and not printed.
//
// ## Content files go through the same two halves
//
// A blob-keyed content file gets its own byte-identical warning (checks.mjs
// `checkContentFile`), and it belongs here for the same reason: a file of one
// `%{comment}` placeholder, and a heading that reads the same in English and
// French, are legitimately identical and warn once per locale for every locale
// that is ever added. An entry keys on the blob id of the file's bytes, which
// for such a file is the id it is filed under, so no second mechanism and no
// second file is needed. `scripts/allow-identical.mjs --file=` writes those.
//
// ## The allowlist is keyed by the blob id of the English string
//
// That is the identifier the stamps already use (scripts/lib/catalogs.mjs
// `stringId`), so an entry is tied to exact bytes. Edit the English and it has
// a new blob id, the entry stops matching it, and the warning comes back, which
// is the behaviour we want: "Maud de Vries, Erik Schierboom" was signed off,
// and a sentence someone later wrote around those names was not.
//
// ## An entry is global unless it names locales
//
// The strings this is for are proper names and titles, and a name is a name in
// every language. An entry per locale would record the same editorial decision
// once per locale, and every new locale would start behind the same wall of
// warnings a reviewer had already cleared. So an entry covers every locale, and
// `locales` narrows it when the decision really is one locale's: a prose source
// that happens to read the same in French is not a fact about German.
//
// ## Entries are written by scripts/allow-identical.mjs
//
// The script takes the English text and computes the blob id itself, so nobody
// types a hash. A hand-written hash looks like a checked fact and is not one,
// which is the same reason stamps are written by `validate --stamp`. The file
// is checked on every validate run (`allowlistIssues`), and a hand edit that
// leaves an id and its text disagreeing stops the run.

import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT, TARGET_LOCALES, fail } from "./constants.mjs";
import { stringId } from "./catalogs.mjs";
import { BLOB_ID } from "./git.mjs";

export const ALLOWLIST_FILE = "identical-english.json";

export function allowlistPath(root = REPO_ROOT) {
  return path.join(root, ALLOWLIST_FILE);
}

const ENTRY_FIELDS = ["text", "reason", "added", "by", "locales"];

/**
 * Everything wrong with a parsed allowlist, as messages.
 *
 * Pure, so the shape rules are tested without a file or a subprocess. The
 * caller decides what a problem costs; `loadAllowlist` makes it fatal, because
 * an allowlist nobody can read silently stops hiding what a reviewer signed
 * off, and an entry whose text and id disagree says a string was reviewed that
 * was not.
 */
export function allowlistIssues(data) {
  const issues = [];
  if (data === null || typeof data !== "object" || Array.isArray(data)) return [`${ALLOWLIST_FILE} must be a JSON object.`];
  const allowed = data.allowed;
  if (allowed === null || typeof allowed !== "object" || Array.isArray(allowed)) return [`${ALLOWLIST_FILE} must have an "allowed" object, keyed by the blob id of the English string.`];

  for (const [id, entry] of Object.entries(allowed)) {
    const at = `${ALLOWLIST_FILE} ${id}`;
    if (!BLOB_ID.test(id)) {
      issues.push(`${at}: not a blob id. Entries are keyed by the git blob id of the English string, which scripts/allow-identical.mjs computes.`);
      continue;
    }
    if (entry === null || typeof entry !== "object" || Array.isArray(entry)) {
      issues.push(`${at}: must be an object with ${ENTRY_FIELDS.join(", ")}.`);
      continue;
    }
    for (const field of ["text", "reason", "added", "by"]) {
      if (typeof entry[field] !== "string" || entry[field].trim() === "") issues.push(`${at}: "${field}" must be a non-empty string.`);
    }
    // A misspelled field would be ignored, and an entry meant for one locale
    // would quietly cover every locale.
    for (const field of Object.keys(entry)) {
      if (!ENTRY_FIELDS.includes(field)) issues.push(`${at}: unknown field "${field}". An entry holds ${ENTRY_FIELDS.join(", ")}.`);
    }
    if (typeof entry.text === "string" && stringId(entry.text) !== id) {
      issues.push(`${at}: "text" hashes to ${stringId(entry.text)}, so the id and the text disagree. One of them was edited by hand. Re-add the string with scripts/allow-identical.mjs.`);
    }
    if (typeof entry.added === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(entry.added)) issues.push(`${at}: "added" must be a YYYY-MM-DD date.`);
    if ("locales" in entry) {
      if (!Array.isArray(entry.locales) || entry.locales.length === 0 || entry.locales.some((locale) => typeof locale !== "string")) {
        issues.push(`${at}: "locales" must be a non-empty array of locale codes. Leave it out to cover every locale.`);
      } else {
        // A code no locale has matches nothing, and an entry that matches
        // nothing reads as a decision that is still in force.
        for (const locale of entry.locales) if (!TARGET_LOCALES.includes(locale)) issues.push(`${at}: "${locale}" is not a target locale (${TARGET_LOCALES.join(", ") || "none"}).`);
      }
    }
  }
  return issues;
}

/**
 * The allowlist as a Map of blob id to entry.
 *
 * An absent file is an empty allowlist, so a fresh checkout and the test
 * fixture both work without one. A file that is there and wrong stops the run.
 */
export function loadAllowlist(root = REPO_ROOT) {
  const file = allowlistPath(root);
  if (!fs.existsSync(file)) return new Map();
  let data = null;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail(`${ALLOWLIST_FILE} is not valid JSON: ${error.message}`);
  }
  const issues = allowlistIssues(data);
  if (issues.length > 0) fail(issues.join("\n       "));
  return new Map(Object.entries(data.allowed));
}

/** Whether an entry covers one locale. No `locales` means every locale. */
export function allows(entry, locale) {
  if (!entry) return false;
  return entry.locales === undefined || entry.locales.includes(locale);
}

/**
 * The unit ids of one group as one id, with the segments that differ starred.
 *
 * A group is one English string, and the same string is often the `source` of
 * several exercises, so `exercise:*:source` says what the group is about in the
 * width of one id. Ids that do not divide into the same number of segments are
 * left alone, because a star would then line up with nothing.
 */
export function collapseUnitIds(ids) {
  const unique = [...new Set(ids)].sort();
  if (unique.length === 1) return unique[0];
  const parts = unique.map((id) => id.split(":"));
  if (!parts.every((one) => one.length === parts[0].length)) return `${unique[0]} (+${unique.length - 1} more)`;
  return parts[0].map((segment, index) => (parts.every((one) => one[index] === segment) ? segment : "*")).join(":");
}

/**
 * Every byte-identical warning in a run, grouped by locale and English string.
 *
 * @param {Array} results  validate's per-catalog results
 * @param {Map} allowlist  from `loadAllowlist`
 * @returns {{ groups, allowed, unmatched }} `groups` are the ones to print,
 *   the heaviest first; `allowed` the ones a reviewer signed off; `unmatched`
 *   the allowlist entries this run saw nothing of.
 */
export function summariseIdentical(results, allowlist = new Map()) {
  const groups = new Map();
  for (const result of results) {
    for (const found of result.issues) {
      if (!found.identical) continue;
      const key = `${result.locale}\u0000${found.identical.id}`;
      const group = groups.get(key) ?? { locale: result.locale, id: found.identical.id, text: found.identical.text, units: new Set(), catalogs: new Set(), occurrences: 0 };
      group.units.add(found.unit);
      group.catalogs.add(result.type);
      group.occurrences += 1;
      groups.set(key, group);
    }
  }

  const order = (a, b) => b.occurrences - a.occurrences || (a.locale < b.locale ? -1 : a.locale > b.locale ? 1 : 0) || (a.id < b.id ? -1 : 1);
  const all = [...groups.values()].map((group) => ({ ...group, unitId: collapseUnitIds([...group.units]) })).sort(order);
  const signedOff = (group) => allows(allowlist.get(group.id), group.locale);
  const matched = new Set(all.filter(signedOff).map((group) => group.id));

  return {
    groups: all.filter((group) => !signedOff(group)),
    allowed: all.filter(signedOff),
    unmatched: [...allowlist.entries()].filter(([id]) => !matched.has(id)).map(([id, entry]) => ({ id, ...entry }))
  };
}

const total = (groups) => groups.reduce((sum, group) => sum + group.occurrences, 0);

/**
 * The summary block, as lines.
 *
 * `reportUnmatched` is false for a partial run. An entry that matches nothing
 * in a run of one locale, or of one type, has not been shown to be dead.
 */
export function renderIdentical({ groups, allowed, unmatched }, { reportUnmatched = false } = {}) {
  const lines = [];
  if (groups.length > 0) {
    lines.push("", `Byte-identical to English, grouped by English string (${groups.length} group(s), ${total(groups)} occurrence(s)):`);
    for (const group of groups) {
      lines.push(`  ${group.locale.padEnd(6)} ${String(group.catalogs.size).padStart(4)} catalog(s)  ${group.unitId}  ${JSON.stringify(group.text)}`);
    }
    lines.push(`  Legitimate? Sign one off with: node scripts/allow-identical.mjs --reason="..." <the English text>`);
    // A content group's unit is the file, and a file is signed off by path, so
    // that its bytes are read as they are.
    if (groups.some((group) => group.unitId.startsWith("content/"))) {
      lines.push(`  A content file: node scripts/allow-identical.mjs --reason="..." --file=locales/<locale>/<the path above>`);
    }
  }
  if (allowed.length > 0) {
    lines.push("", `${allowed.length} group(s) (${total(allowed)} occurrence(s)) are signed off in ${ALLOWLIST_FILE} and were not printed.`);
  }
  if (reportUnmatched && unmatched.length > 0) {
    lines.push("", `${ALLOWLIST_FILE}: ${unmatched.length} entry/entries matched nothing in this run, so they hide nothing and record a decision that no longer applies:`);
    for (const entry of unmatched) lines.push(`  ${entry.id.slice(0, 12)} ${JSON.stringify(entry.text)} (added ${entry.added} by ${entry.by})`);
    lines.push(`  Delete them, unless a repo they belong to could not be fetched for this run.`);
  }
  return lines;
}
