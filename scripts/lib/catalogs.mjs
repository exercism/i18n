// The two website catalogs: where they live, how they flatten, what a UNIT is,
// and how staleness is stamped.
//
// Each locale holds exactly two catalogs, whatever shape English is authored in:
//
//   locales/<locale>/website/backend.json    from the website's Rails YAML
//   locales/<locale>/website/frontend.json   from its i18next bundles
//
// English stays as many files in `website` (125 YAML files and 200-odd TypeScript
// bundles when this was written). scripts/lib/website-english.mjs flattens it
// into the same two catalogs, and the checker and a translation pass both work
// against those, so neither ever needs to know how the website splits its files.
//
// ## On disk
//
// `backend.json` is the Rails tree, nested, WITHOUT the locale root key: publish
// adds `{ "<locale>": ... }` on the way out, so the locale is said once, by the
// directory. `frontend.json` is `{ "<namespace>": { "<key>": "<value>" } }`,
// which is i18next's own resource shape. Both are JSON even though Rails authors
// YAML: Rails' I18n loads `.json` natively, and JSON keeps every script here free
// of a YAML dependency except the one that reads English.
//
// ## In memory
//
// Everything is compared FLAT, as `{ "<flat key>": value }`:
//
//   backend   dotted path                  `tracks.show.slots.filled.one`
//   frontend  `<namespace>:<key>`           `components/donations:form.oneOff`
//
// `:` is i18next's own namespace separator, and the English build refuses a
// namespace containing one, so the split at the first `:` is never ambiguous. A
// frontend key keeps its dots: the bundles author flat dotted keys, and a nested
// object in a bundle is flattened to the same spelling at build time.
//
// ## Units
//
// A UNIT is what parity, staleness, coverage and completeness all count: one
// ordinary key, or one whole plural group (see plurals.mjs). Unit ids are the
// flat key for an ordinary key, and `<base>.*` / `<base>_*` for a group, which
// cannot collide with a real key in either catalog.
//
// ## Stamps
//
// A sibling `<catalog>.meta.json` holds `{ "stamps": { "<unit id>": "<hash>" } }`:
// for each unit, the hash of the ENGLISH it was checked against. English being
// edited under a translation is the one failure parity cannot see, and the
// promise that a production-locale user never reads outdated text needs it seen,
// per key, because a whole-file hash cannot say which of two thousand keys moved.
//
// The hash is the git blob id of the English string (for a group, of the JSON of
// its category/value pairs). That is deliberate: the open question of how text
// that is not a whole file gets keyed has "the blob id of the string itself" as
// its candidate answer, and stamping with the same function means that answer
// would need no second hash. See `stringId`.
//
// Stamps are written by `validate --stamp` and never by hand. A hand-written
// stamp looks like a passed check and is not one, and models fabricate plausible
// hashes.

import fs from "node:fs";
import path from "node:path";
import { LOCALES_DIR } from "./constants.mjs";
import { blobId } from "./git.mjs";
import { CATEGORIES, PLURAL_SPELLING } from "./plurals.mjs";

export const CATALOG_KINDS = ["backend", "frontend"];

export function catalogPath(locale, kind) {
  return path.join(LOCALES_DIR, locale, "website", `${kind}.json`);
}

export function metaPath(catalogFile) {
  return catalogFile.replace(/\.json$/, ".meta.json");
}

// ------------------------------------------------------------------ flatten --

function flattenTree(tree, prefix, out) {
  for (const [key, value] of Object.entries(tree)) {
    const flatKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object") {
      // An array flattens by index, so a list of strings is a run of ordinary
      // keys (`perks.0`, `perks.1`). An EMPTY container has no leaves and so
      // vanishes, which is right: there is nothing in it to translate.
      flattenTree(value, flatKey, out);
    } else {
      out[flatKey] = value;
    }
  }
  return out;
}

/** The on-disk tree of one catalog kind, as a flat map. */
export function flattenCatalog(kind, tree) {
  // A metadata catalog is flat on disk already: see scripts/lib/metadata.mjs.
  if (kind === "metadata") return { ...tree };
  if (kind === "backend") return flattenTree(tree, "", {});
  const out = {};
  for (const [namespace, keys] of Object.entries(tree)) {
    for (const [key, value] of Object.entries(flattenTree(keys ?? {}, "", {}))) out[`${namespace}:${key}`] = value;
  }
  return out;
}

/**
 * A flat map back to the on-disk tree. `arrays` names the flat paths that were
 * arrays in ENGLISH, so `perks.0` and `perks.1` come back as a list rather than
 * as an object with numeric keys, which Rails would render as a hash.
 */
export function unflattenCatalog(kind, flat, arrays = new Set()) {
  if (kind === "metadata") return { ...flat };
  const root = {};
  for (const [flatKey, value] of Object.entries(flat)) {
    let segments;
    if (kind === "frontend") {
      const colon = flatKey.indexOf(":");
      segments = [flatKey.slice(0, colon), flatKey.slice(colon + 1)];
    } else {
      segments = flatKey.split(".");
    }
    let node = root;
    segments.forEach((segment, index) => {
      if (index === segments.length - 1) node[segment] = value;
      else node = node[segment] ??= {};
    });
  }
  if (kind === "backend") arrayify(root, "", arrays);
  return root;
}

function arrayify(node, prefix, arrays) {
  for (const [key, value] of Object.entries(node)) {
    if (value === null || typeof value !== "object") continue;
    const flatKey = prefix ? `${prefix}.${key}` : key;
    arrayify(value, flatKey, arrays);
    if (arrays.has(flatKey)) {
      node[key] = Object.keys(value)
        .sort((a, b) => Number(a) - Number(b))
        .map((index) => value[index]);
    }
  }
}

// -------------------------------------------------------------------- units --

/**
 * English's units: every ordinary key, and every plural group as one entry.
 *
 * A key is part of a group only when English holds the group's `other` and, for
 * the backend, when EVERY key under the base is a plural category. The second
 * half keeps a hash that merely happens to contain an `other:` entry beside
 * ordinary ones (`reasons: { spam:, abuse:, other: }`) out of it.
 *
 * @returns {Map<string, { id, plural, base?, ordinal?, keys: string[], entries: Record<string,string> }>}
 */
export function englishUnits(kind, flatEnglish) {
  const spelling = PLURAL_SPELLING[kind];
  const units = new Map();
  const keys = Object.keys(flatEnglish);

  const childrenOf = new Map();
  if (kind === "backend") {
    for (const key of keys) {
      const dot = key.lastIndexOf(".");
      if (dot === -1) continue;
      const parent = key.slice(0, dot);
      if (!childrenOf.has(parent)) childrenOf.set(parent, []);
      childrenOf.get(parent).push(key.slice(dot + 1));
    }
  }

  for (const key of keys) {
    const parsed = spelling.split(key);
    const isPlural =
      parsed !== null &&
      spelling.join(parsed.base, "other", parsed.ordinal) in flatEnglish &&
      (kind !== "backend" || childrenOf.get(parsed.base).every((child) => CATEGORIES.includes(child)));

    if (!isPlural) {
      units.set(key, { id: key, plural: false, keys: [key], entries: { "": flatEnglish[key] } });
      continue;
    }
    const id = spelling.unitId(parsed.base, parsed.ordinal);
    if (!units.has(id)) units.set(id, { id, plural: true, base: parsed.base, ordinal: parsed.ordinal, keys: [], entries: {} });
    units.get(id).keys.push(key);
    units.get(id).entries[parsed.category] = flatEnglish[key];
  }
  return units;
}

/**
 * What a target catalog holds for one English unit: `{ "": value }` for an
 * ordinary key, `{ one: ..., few: ... }` for a group, `{}` when it holds nothing.
 * A group is looked up by EVERY category, because the target's categories are its
 * own grammar's and not English's.
 */
export function targetEntries(kind, unit, flatTarget) {
  if (!unit.plural) return unit.id in flatTarget ? { "": flatTarget[unit.id] } : {};
  const entries = {};
  for (const category of CATEGORIES) {
    const key = PLURAL_SPELLING[kind].join(unit.base, category, unit.ordinal);
    if (key in flatTarget) entries[category] = flatTarget[key];
  }
  return entries;
}

/** Every target key that belongs to some English unit, for finding the extras. */
export function claimedKeys(kind, units) {
  const claimed = new Set();
  for (const unit of units.values()) {
    if (!unit.plural) claimed.add(unit.id);
    else for (const category of CATEGORIES) claimed.add(PLURAL_SPELLING[kind].join(unit.base, category, unit.ordinal));
  }
  return claimed;
}

// ------------------------------------------------------------------- stamps --

/**
 * The id of a piece of text that is not a whole file: its git blob id.
 *
 * TODO(iHiD): OPEN. How text that is not a whole file is keyed (config.json
 * blurbs and titles, metadata.toml fields) is undecided, and the candidate is
 * exactly this. It is used today ONLY as the staleness hash for a catalog unit,
 * which commits to nothing: a stamp is private to this repo and can be recomputed
 * wholesale. If the answer is yes, fragment translations are filed under this id
 * in the content store and no second hash exists. If it is no, this stays a
 * stamp function and nothing else changes.
 */
export function stringId(text) {
  return blobId(Buffer.from(String(text), "utf8"));
}

/** The hash a unit is stamped with: of its one string, or of its whole group. */
export function unitHash(unit) {
  if (!unit.plural) return stringId(unit.entries[""]);
  const pairs = CATEGORIES.filter((category) => category in unit.entries).map((category) => [category, unit.entries[category]]);
  return stringId(JSON.stringify(pairs));
}

export function readStamps(catalogFile) {
  const file = metaPath(catalogFile);
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8")).stamps ?? {};
}

export function writeStamps(catalogFile, stamps) {
  const sorted = Object.fromEntries(Object.entries(stamps).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)));
  fs.writeFileSync(metaPath(catalogFile), `${JSON.stringify({ stamps: sorted }, null, 2)}\n`);
}

export const DONE = "done";
export const STALE = "stale";
export const UNSTAMPED = "unstamped";
export const MISSING = "missing";

/**
 * One unit's state in one locale.
 *
 *   missing    the locale holds nothing for it
 *   unstamped  translated, never checked against any English
 *   stale      checked against English that has since been edited
 *   done       checked against exactly this English
 *
 * Presence is decided by the caller (a group missing a category its grammar needs
 * is an ERROR there, not a state here), so this only ever sees "has something".
 */
export function unitState(unit, entries, stamps) {
  if (Object.keys(entries).length === 0) return MISSING;
  const stamp = stamps[unit.id];
  if (!stamp) return UNSTAMPED;
  return stamp === unitHash(unit) ? DONE : STALE;
}
