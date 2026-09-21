// The mechanical checks, at two levels:
//
//   ERROR  a structural fact that a correct translation can never have: a unit
//          English has and the locale does not, a plural group missing a
//          category the language's grammar uses, a changed placeholder, a
//          changed tag, a content file filed under something that is not a
//          blob id. Blocks.
//   WARN   a heuristic that is expected to flag some correct text, or a fact a
//          correct translation can legitimately have (a key English does not
//          have). For a person to read. Never turn one into an ERROR.
//
// ## Extra units are never an error
//
// A locale holding something English does not is reported, never fatal. A
// source repo's PR cannot merge until its translations are here, so
// translation runs ahead of English merging, and this repo often holds
// translations of English that is still on an unmerged branch. Checked against
// the source repo's main, those look like extra keys. It also happens the
// other way round: English drops a key, and the translation still has it while
// the old release is being served.
//
// ## Staleness is counted, and does not block here
//
// A unit stamped against older English is neither extra nor missing. In Jiki's
// repo that is an error. Here it is a counted state (catalogs.mjs `unitState`)
// and is never reported as an issue, for the same reason: a translation made
// against a PR's English is "stale" against main until that PR merges, and it
// is still correct. English edits are caught by the source PR's own
// completeness check, which compares against exactly the English in that PR.
//
// ## Missing units are an error only when required
//
// A new locale legitimately has very little, and hundreds of "missing key"
// errors would hide the real ones. So a missing unit is counted by default and
// is an ERROR only when the caller passes `requireComplete`, which validate
// does for production locales and under `--complete`.

import { CATEGORIES, PLURAL_SPELLING, isOptionalCategory, requiredCategories } from "./plurals.mjs";
import { claimedKeys, englishUnits, targetEntries } from "./catalogs.mjs";
import { blobId } from "./git.mjs";

export const ERROR = "ERROR";
export const WARN = "WARN";

// `unit` links a catalog issue to its unit, so validate can stamp the units that
// passed even when another unit failed.
const issue = (level, message, unit = null) => ({ level, message, unit });

// ------------------------------------------------------------- placeholders --

// Each catalog has one interpolation syntax. A translation must keep every
// placeholder exactly, including its name, but may move it.
const PLACEHOLDER_PATTERNS = {
  // Rails: `%{name}`, and the rarer sprintf form `%<name>s`.
  backend: [/%\{[\w.]+\}/g, /%<\w+>[-+0 #]*\d*(?:\.\d+)?[a-zA-Z]/g],
  // Metadata is plain prose and Markdown: the website interpolates nothing into it.
  metadata: [],
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
 * One pattern covers both sides' markup: real HTML in a Rails `_html` key
 * (`<a href="%{path}" class="...">`), and `<Trans>` component tags in a bundle,
 * which are either indexed (`<0>`, `</0>`) or named (`<strong>`, `<trackTitle>`).
 * The bundles also contain `<0/>` where `</0>` was meant. Tags are compared by
 * name, so a translation passes whether it copies `<0/>` or writes the closing
 * tag correctly.
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
  // English written as a YAML folded scalar ends in a newline, and some keys have
  // a deliberate leading or trailing space because they are joined in a
  // template. Translations should match English. A mismatch is a WARN, because
  // it is usually harmless but occasionally joins two words together.
  const edge = (text) => [text.match(/^\s*/)[0], text.match(/\s*$/)[0]].join("|");
  if (edge(value) !== edge(source)) issues.push(issue(WARN, `${where}: leading or trailing whitespace differs from English`, unitId));
  return true;
}

/**
 * One catalog against its English. Both arguments are flat maps.
 *
 * Parity is counted by unit (see plurals.mjs and catalogs.mjs): an ordinary key
 * is present or absent, and a plural group is present when the locale holds
 * every category its own grammar uses, whatever English holds.
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

    // A plural group. The categories that matter are the locale's. Rails raises
    // I18n::InvalidPluralizationData when the category a count resolves to is
    // missing, and i18next renders the raw key. So a group missing a category
    // its grammar uses is broken for some counts only, which is easy to miss
    // when looking at a page.
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

  // Extra keys are treated differently from missing ones (see the header): a
  // catalog is expected to hold more than English for a while. The WARN names
  // every key, since that is the only way to tell a key that arrived ahead of
  // its English from one left over from old English. A misspelled key is still
  // caught: the key the translator meant is then missing, which is reported
  // above.
  const claimed = claimedKeys(kind, units);
  const extra = Object.keys(flatTarget).filter((key) => !claimed.has(key));
  for (const key of extra) issues.push(issue(WARN, `key not in English: ${key} (fine while English catches up; stale if English never had it)`));

  return { issues, missing, extra };
}

/**
 * Placeholders and tags of one translated value against its English.
 *
 * `sources` is one string for an ordinary key and every category's string for a
 * plural group, because the categories do not line up: English's `one` is often
 * "1 slot filled" with no `%{count}`, while a Polish `few`, which has no English
 * equivalent, must include the number. So a group's value may use any
 * placeholder that any English category uses, and only `other`, which every
 * language has, must include everything English's `other` does (`mustCover`).
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
    // Same tags with different attributes (a class, an href, a target).
    // Attributes hold no copy, so a difference nearly always means a model
    // rewrote the HTML.
    const tokens = (list) => list.map((tag) => tag.token.replace(/\s+/g, " ")).sort().join("|");
    if (tokens(tags(match)) !== tokens(valueTags)) issues.push(issue(WARN, `${where}: a tag's attributes differ from English`, unitId));
  }
}

// ------------------------------------------------------------------ content --

const decoder = new TextDecoder("utf-8", { fatal: true });

/**
 * One blob-keyed content file, checked from its bytes and where it is filed.
 *
 * Almost none of these checks need English, which is what the store is designed
 * for. The one that does is structural, runs only when the caller found the
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

  // Exact, and needs no English: a file whose own blob id is the id it is filed
  // under is the English file itself. It would pass every structural check, so
  // it gets a check of its own. It is a WARN, because a file with nothing to
  // translate (a page that is one code block) is legitimately identical.
  if (blobId(bytes) === id) issues.push(issue(WARN, "byte-identical to its English (copied, not translated; legitimate only if there is nothing to translate)"));

  if (extension === ".json") {
    try {
      JSON.parse(text);
    } catch (error) {
      issues.push(issue(ERROR, `invalid JSON: ${error.message}`));
    }
  }

  if (extension === ".md") {
    // Content has no staleness, so a stamp means a pass built for Jiki's repo
    // wrote this file, and it may have added frontmatter to a document whose
    // English has none.
    if (/^---\n[\s\S]*?\ben_md5\s*:/.test(text)) issues.push(issue(ERROR, "carries an `en_md5` stamp: blob-keyed content has no staleness and no stamp"));

    if (english !== null) {
      const source = english.toString("utf8");
      const count = (body, pattern) => (body.match(pattern) ?? []).length;
      // A difference in either direction is an error. Unlike a catalog, a content
      // file cannot be ahead of English: different English has a different blob
      // id, so this file translates exactly these bytes.
      for (const [what, pattern] of [
        ["fenced code block fences", /^\s*(?:```|~~~)/gm],
        ["headings", /^#{1,6}\s/gm]
      ]) {
        const [en, target] = [count(source, pattern), count(text, pattern)];
        if (en !== target) issues.push(issue(ERROR, `${what}: English has ${en}, translation has ${target}`));
      }
      // The website fills `%{name}` into an analyzer comment when rendering it
      // (website: app/models/submission/analysis.rb), and a renamed or dropped
      // token renders as a gap in a sentence. The blob id does not say which
      // content type a file is, so the rule applies to every file whose English
      // has these tokens. In other documents they sit in code, which a
      // translation copies anyway.
      const tokens = (body) => new Set(body.match(/%\{\w+\}/g) ?? []);
      const [enTokens, targetTokens] = [tokens(source), tokens(text)];
      const changed = [...enTokens].filter((token) => !targetTokens.has(token)).concat([...targetTokens].filter((token) => !enTokens.has(token)));
      if (changed.length > 0) issues.push(issue(ERROR, `\`%{...}\` placeholders differ from English: ${changed.join(" ")}`));

      const links = (body) => new Set([...body.matchAll(/\]\((\S+?)(?:\s+"[^"]*")?\)/g)].map((match) => match[1]));
      const [enLinks, targetLinks] = [links(source), links(text)];
      const lost = [...enLinks].filter((url) => !targetLinks.has(url));
      if (lost.length > 0) issues.push(issue(WARN, `link target(s) in English and not in the translation: ${lost.slice(0, 3).join(", ")}${lost.length > 3 ? ", ..." : ""}`));
    }
  }

  return issues;
}
