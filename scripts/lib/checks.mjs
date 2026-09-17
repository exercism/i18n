// The mechanical checks, in two levels:
//
//   ERROR  a structural fact that is true or false, AND one a correct
//          translation can never have (a unit English has and the locale does
//          not, a plural group missing a category the language's grammar
//          reaches, a changed placeholder, a changed tag, a content file filed
//          under something that is not a blob id). Blocks.
//   WARN   a heuristic that produces false positives BY DESIGN, or a fact a
//          correct translation legitimately CAN have (a key English does not
//          have). There to be read by a human, and never to be promoted.
//
// ## Excess is never an error. Absence always is.
//
// A locale holding something English does not is EXCESS: reported, never fatal.
// The reason is the ordering the whole pipeline is built on. A source repo's PR
// cannot merge until its translations are HERE, so translation deliberately runs
// ahead of English merging, and this repo routinely and correctly holds
// translations of English that is still on an unmerged branch. Read against the
// source repo's main, that correct state looks like extra keys. The same shape
// arrives from the other end too: English drops a key and the translation still
// carries it while the old release is being served.
//
// ## Staleness is a third thing, and it does not block HERE
//
// A unit stamped against older English is neither excess nor absence. In Jiki's
// repo that is an error; here it is a counted STATE (catalogs.mjs `unitState`)
// and never an issue, for the same ordering reason: a translation made against a
// PR's English is "stale" against main until that PR merges, and it is right.
// What holds an English edit to account is the source PR's own completeness
// check, which compares against exactly the English that PR holds.
//
// ## Missing is an error only where somebody is held to it
//
// A young locale legitimately has almost nothing, and a wall of "missing key"
// errors buries the real ones. So a missing unit is a counted state by default
// and an ERROR only when the caller passes `requireComplete`, which validate does
// for production locales and under `--complete`.

import { CATEGORIES, PLURAL_SPELLING, isOptionalCategory, requiredCategories } from "./plurals.mjs";
import { claimedKeys, englishUnits, targetEntries } from "./catalogs.mjs";
import { blobId } from "./git.mjs";

export const ERROR = "ERROR";
export const WARN = "WARN";

// `unit` ties a catalog issue to the unit it is about, so validate can stamp the
// units that passed without being held up by a neighbour that did not.
const issue = (level, message, unit = null) => ({ level, message, unit });

// ------------------------------------------------------------- placeholders --

// Each catalog has ONE interpolation syntax, and it is immutable, inner name
// included. Word order may move a placeholder; nothing else may.
const PLACEHOLDER_PATTERNS = {
  // Rails: `%{name}`, and the rarer sprintf form `%<name>s`.
  backend: [/%\{[\w.]+\}/g, /%<\w+>[-+0 #]*\d*(?:\.\d+)?[a-zA-Z]/g],
  // i18next: `{{name}}`, `{{count, number}}`, and nesting, `$t(other.key)`.
  frontend: [/\{\{\s*-?\s*[\w.]+\s*(?:,[^}]*)?\}\}/g, /\$t\([^)]*\)/g]
};

export function placeholders(kind, value) {
  const found = [];
  for (const pattern of PLACEHOLDER_PATTERNS[kind]) {
    for (const match of String(value).matchAll(pattern)) found.push(match[0].replace(/\s+/g, ""));
  }
  return found.sort();
}

/**
 * Every tag in a value, as `{ name, token }`.
 *
 * Covers both sides' markup with one pattern: real HTML in a Rails `_html` key
 * (`<a href="%{path}" class="...">`), and `<Trans>` component tags in a bundle,
 * which are either indexed (`<0>`, `</0>`) or named (`<strong>`, `<trackTitle>`).
 * The bundles also hold `<0/>` where `</0>` was meant; it is compared by name
 * like anything else, so a translation that reproduces it passes and so does one
 * that writes the closing tag properly.
 */
export function tags(value) {
  return [...String(value).matchAll(/<\/?\s*([A-Za-z0-9][\w-]*)\b[^<>]*>/g)].map((match) => ({ name: match[1], token: match[0] }));
}

const names = (list) => list.map((tag) => tag.name).sort().join("|");
const sameSet = (a, b) => a.size === b.size && [...a].every((item) => b.has(item));

// ----------------------------------------------------------------- catalogs --

function checkValue({ kind, where, source, value, issues, unitId }) {
  if (typeof value !== "string") {
    issues.push(issue(ERROR, `${where}: value is ${value === null ? "null" : typeof value}, expected a string`, unitId));
    return false;
  }
  if (value.trim() === "" && source.trim() !== "") {
    issues.push(issue(ERROR, `${where}: empty value`, unitId));
    return false;
  }
  // English authored with a YAML folded scalar ends in a newline, and some keys
  // carry a deliberate leading or trailing space because they are concatenated
  // in a template. Matching English is the rule, and a mismatch is a WARN: it is
  // usually harmless and occasionally glues two words together.
  const edge = (text) => [text.match(/^\s*/)[0], text.match(/\s*$/)[0]].join("|");
  if (edge(value) !== edge(source)) issues.push(issue(WARN, `${where}: leading or trailing whitespace differs from English`, unitId));
  return true;
}

/**
 * One catalog against its English. Both arguments are FLAT maps.
 *
 * Parity is by UNIT (see plurals.mjs and catalogs.mjs): an ordinary key is
 * present or absent, and a plural group is present when the locale holds every
 * category ITS OWN grammar reaches, whatever English holds.
 *
 * @param {object} options
 * @param {"backend"|"frontend"} options.kind
 * @param {string} options.locale  decides which plural categories are required
 * @param {boolean} options.requireComplete  a missing unit is an ERROR
 * @returns {{ issues, missing: string[], extra: string[] }}
 */
export function checkCatalog(flatEnglish, flatTarget, { kind, locale, requireComplete = false }) {
  const issues = [];
  const units = englishUnits(kind, flatEnglish);
  const spelling = PLURAL_SPELLING[kind];
  const missing = [];

  for (const unit of units.values()) {
    const entries = targetEntries(kind, unit, flatTarget);

    if (Object.keys(entries).length === 0) {
      missing.push(unit.id);
      if (requireComplete) issues.push(issue(ERROR, `missing: ${unit.id}`, unit.id));
      continue;
    }

    if (!unit.plural) {
      const source = unit.entries[""];
      const value = entries[""];
      if (!checkValue({ kind, where: unit.id, source, value, issues, unitId: unit.id })) continue;
      compareMarkup({ kind, where: unit.id, sources: [source], value, issues, unitId: unit.id });
      if (value === source && source.length > 24) issues.push(issue(WARN, `${unit.id}: byte-identical to English (may be untranslated, may be legitimate)`, unit.id));
      continue;
    }

    // A plural group. The categories that matter are the LOCALE's. Rails raises
    // I18n::InvalidPluralizationData when the category a count resolves to is
    // absent, and i18next renders the raw key, so a group short of a category its
    // grammar reaches is broken for some counts and fine for others, which is
    // exactly the kind of bug nobody finds by looking at a page.
    const required = requiredCategories(locale, { ordinal: unit.ordinal });
    if (required === null) {
      issues.push(issue(ERROR, `${unit.id}: cannot tell which plural categories "${locale}" needs (no CLDR data for it in this runtime)`, unit.id));
    } else {
      for (const category of required) {
        if (!(category in entries)) issues.push(issue(ERROR, `${unit.id}: plural group is missing "${category}", which ${locale} needs (${spelling.join(unit.base, category, unit.ordinal)})`, unit.id));
      }
      for (const category of Object.keys(entries)) {
        if (!required.includes(category) && !isOptionalCategory(category, { ordinal: unit.ordinal })) {
          issues.push(issue(WARN, `${unit.id}: holds "${category}", which ${locale}'s grammar never reaches`, unit.id));
        }
      }
    }

    const sources = Object.values(unit.entries);
    for (const category of CATEGORIES) {
      if (!(category in entries)) continue;
      const where = spelling.join(unit.base, category, unit.ordinal);
      const source = unit.entries[category] ?? unit.entries.other;
      if (!checkValue({ kind, where, source, value: entries[category], issues, unitId: unit.id })) continue;
      compareMarkup({ kind, where, sources, value: entries[category], issues, unitId: unit.id, mustCover: category === "other" ? unit.entries.other : null });
    }
  }

  // An EXTRA key is not the mirror image of a missing one. See the header: a
  // catalog is meant to be a superset for a while. The WARN names every key,
  // because that is the only thing that tells a key landing ahead of its English
  // from one left over from a shape nobody has used in a year. A MISSPELLED key
  // is not lost by this: the key the translator meant is then absent, which is
  // the missing unit above.
  const claimed = claimedKeys(kind, units);
  const extra = Object.keys(flatTarget).filter((key) => !claimed.has(key));
  for (const key of extra) issues.push(issue(WARN, `key not in English: ${key} (fine while English catches up; stale if English never had it)`));

  return { issues, missing, extra };
}

/**
 * Placeholders and tags of one translated value against its English.
 *
 * `sources` is one string for an ordinary key and EVERY category's string for a
 * plural group, because the categories do not line up: English's `one` is often
 * "1 slot filled" with no `%{count}`, and the Polish `few` it has no counterpart
 * for must say the number. So a group's value may use any placeholder any English
 * category uses, and only `other`, which every language has, must carry
 * everything English's `other` does (`mustCover`).
 */
function compareMarkup({ kind, where, sources, value, issues, unitId, mustCover = null }) {
  const allowed = new Set(sources.flatMap((source) => placeholders(kind, source)));
  const used = placeholders(kind, value);
  const usedSet = new Set(used);

  if (sources.length === 1) {
    if (!sameSet(allowed, usedSet)) {
      issues.push(issue(ERROR, `${where}: placeholders changed (English: ${[...allowed].join(" ") || "none"}, translation: ${[...usedSet].join(" ") || "none"})`, unitId));
    } else if (placeholders(kind, sources[0]).join("|") !== used.join("|")) {
      issues.push(issue(WARN, `${where}: a placeholder is used a different number of times than in English`, unitId));
    }
  } else {
    const invented = [...usedSet].filter((item) => !allowed.has(item));
    if (invented.length > 0) issues.push(issue(ERROR, `${where}: placeholder(s) no English category has: ${invented.join(" ")}`, unitId));
    if (mustCover !== null) {
      const dropped = placeholders(kind, mustCover).filter((item) => !usedSet.has(item));
      if (dropped.length > 0) issues.push(issue(ERROR, `${where}: dropped placeholder(s) English's "other" has: ${[...new Set(dropped)].join(" ")}`, unitId));
    }
  }

  const valueTags = tags(value);
  const match = sources.find((source) => names(tags(source)) === names(valueTags));
  if (match === undefined) {
    issues.push(issue(ERROR, `${where}: tags changed (English: ${names(tags(sources[0])) || "none"}, translation: ${names(valueTags) || "none"})`, unitId));
  } else {
    // Same tags, different attributes: a class, an href, a target. Nothing in an
    // attribute is copy, so a difference is nearly always a model "tidying" HTML.
    const tokens = (list) => list.map((tag) => tag.token.replace(/\s+/g, " ")).sort().join("|");
    if (tokens(tags(match)) !== tokens(valueTags)) issues.push(issue(WARN, `${where}: a tag's attributes differ from English`, unitId));
  }
}

// ------------------------------------------------------------------ content --

const decoder = new TextDecoder("utf-8", { fatal: true });

/**
 * One blob-keyed content file, from its bytes and where it is filed.
 *
 * Almost everything here needs NO English: that is the point of the store. The
 * one check that uses English is structural, runs only when the caller found the
 * English blob in a checkout it was given, and is skipped otherwise.
 *
 * @param {object} file  `{ id, extension, bytes }`, `id` being the blob id the
 *   path claims.
 * @param {Buffer|null} english  the English bytes, when known.
 */
export function checkContentFile({ id, extension, bytes }, english = null) {
  const issues = [];

  let text;
  try {
    text = decoder.decode(bytes);
  } catch {
    return [issue(ERROR, "not valid UTF-8")];
  }
  if (text.trim() === "") return [issue(ERROR, "empty file")];

  // Exact, and needs no English at all: a file whose own blob id is the id it is
  // filed under IS the English file. It satisfies every structural check there
  // could ever be, which is why it gets one of its own. A WARN and not an ERROR
  // because a file with nothing in it to translate (a page that is one code
  // block) is legitimately identical.
  if (blobId(bytes) === id) issues.push(issue(WARN, "byte-identical to its English (copied, not translated; legitimate only if there is nothing to translate)"));

  if (extension === ".json") {
    try {
      JSON.parse(text);
    } catch (error) {
      issues.push(issue(ERROR, `invalid JSON: ${error.message}`));
    }
  }

  if (extension === ".md") {
    // There is no staleness here by construction, so a stamp is a sign that a
    // pass built for Jiki's repo wrote this file, and that it may have written
    // frontmatter into a document whose English has none.
    if (/^---\n[\s\S]*?\ben_md5\s*:/.test(text)) issues.push(issue(ERROR, "carries an `en_md5` stamp: blob-keyed content has no staleness and no stamp"));

    if (english !== null) {
      const source = english.toString("utf8");
      const count = (body, pattern) => (body.match(pattern) ?? []).length;
      // Both directions are errors. "More headings than English" cannot be an
      // ahead-of-merge translation here: a different English is a different blob
      // id, so this file is a translation of exactly these bytes or of nothing.
      for (const [what, pattern] of [
        ["fenced code block fences", /^\s*(?:```|~~~)/gm],
        ["headings", /^#{1,6}\s/gm]
      ]) {
        const [en, target] = [count(source, pattern), count(text, pattern)];
        if (en !== target) issues.push(issue(ERROR, `${what}: English has ${en}, translation has ${target}`));
      }
      const links = (body) => new Set([...body.matchAll(/\]\((\S+?)(?:\s+"[^"]*")?\)/g)].map((match) => match[1]));
      const [enLinks, targetLinks] = [links(source), links(text)];
      const lost = [...enLinks].filter((url) => !targetLinks.has(url));
      if (lost.length > 0) issues.push(issue(WARN, `link target(s) in English and not in the translation: ${lost.slice(0, 3).join(", ")}${lost.length > 3 ? ", ..." : ""}`));
    }
  }

  return issues;
}
