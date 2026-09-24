// The two website catalogs: where they live, how they flatten, what a unit is,
// and how staleness is stamped.
//
// Each locale holds exactly two catalogs, however English is split up:
//
//   locales/<locale>/website/backend.json    from the website's Rails YAML
//   locales/<locale>/website/frontend.json   from its i18next bundles
//
// English stays split over many files in `website` (125 YAML files and about
// 200 TypeScript bundles when this was written). scripts/lib/website-english.mjs
// flattens it into the same two catalogs, and the checker and translation
// passes both work against those, so neither needs to know how the website
// splits its files.
//
// ## On disk
//
// `backend.json` is the Rails tree, nested, without the locale root key: the
// website adds `{ "<locale>": ... }` when it loads the file, so the locale is
// only given by the directory. `frontend.json` is
// `{ "<namespace>": { "<key>": "<value>" } }`, i18next's own resource shape.
// Both are JSON even though Rails uses YAML: Rails' I18n loads `.json`
// natively, and JSON keeps every script here free of a YAML dependency except
// the one that reads English.
//
// ## In memory
//
// Everything is compared flat, as `{ "<flat key>": value }`:
//
//   backend   dotted path                  `tracks.show.slots.filled.one`
//   frontend  `<namespace>:<key>`           `components/donations:form.oneOff`
//
// `:` is i18next's namespace separator, and the English build rejects a
// namespace containing one, so splitting at the first `:` is always safe. A
// frontend key keeps its dots: the bundles use flat dotted keys, and a nested
// object in a bundle is flattened to the same spelling at build time.
//
// A third kind, `metadata`, reuses everything below for the per-repo catalogs
// of names, titles and blurbs. It is flat on disk and never pluralises.
// scripts/lib/metadata.mjs owns its paths, keys and extraction.
//
// ## Units
//
// Parity, staleness, coverage and completeness all count units. A unit is one
// ordinary key, or one whole plural group (see plurals.mjs). A unit's id is the
// flat key for an ordinary key, and `<base>.*` / `<base>_*` for a group, which
// cannot clash with a real key in either catalog.
//
// ## Stamps
//
// A sibling `<catalog>.meta.json` holds `{ "stamps": { "<unit id>": "<hash>" } }`:
// for each unit, the hash of the English it was checked against. Parity checks
// cannot see English being edited after it was translated, and users of a
// production locale should never read outdated text, so this is tracked per
// key. A whole-file hash could not say which of two thousand keys changed.
//
// The hash is the git blob id of the English string (for a group, of the JSON
// of its category/value pairs). Identical English therefore has an identical
// stamp in every catalog that holds it, which lets the translator reuse a
// translation across the per-repo metadata catalogs (scripts/lib/metadata.mjs)
// with a hash lookup. See `stringId`.
//
// Stamps are written by `validate --stamp`, never by hand. A hand-written stamp
// looks like a passed check without being one, and models invent plausible
// hashes. A translation pass stamps what it wrote as it writes it, and CI
// stamps what a change wrote when the change lands on main (see "changed
// units" below, and .github/workflows/stamp.yml).

import fs from "node:fs";
import path from "node:path";
import { LOCALES_DIR, REPO_ROOT } from "./constants.mjs";
import { blobId, git, refExists } from "./git.mjs";
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
      // An array flattens by index, so a list of strings becomes a run of
      // ordinary keys (`perks.0`, `perks.1`). An empty container has no leaves
      // and disappears, which is correct: there is nothing in it to translate.
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
 * arrays in English, so `perks.0` and `perks.1` come back as a list. Otherwise
 * they would be an object with numeric keys, which Rails would render as a hash.
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
 * the backend, when every key under the base is a plural category. The second
 * condition keeps out a hash that happens to have an `other:` entry beside
 * ordinary ones (`reasons: { spam:, abuse:, other: }`).
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
 * A group is looked up by every category, because the target's categories come
 * from its own grammar.
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
 * The hash of one English string: its git blob id.
 *
 * It is only used as a stamp. Filing text that is not a whole file under this id
 * in the content store was considered and rejected (iHiD); that text lives in
 * keyed per-repo catalogs (scripts/lib/metadata.mjs). Using the blob id still
 * means the same English has the same stamp everywhere, so checking whether a
 * sentence has already been translated in any repo's catalog is one lookup.
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

// ------------------------------------------------------------ changed units --
//
// Which units one change wrote. `validate --stamp-changed=<ref>` stamps only
// these, so that CI can stamp a hand edit without inventing anything.
//
// A stamp says a translation was checked against a particular English. Nobody
// can say that about text whose history is unknown, so stamping every unstamped
// unit in the tree would be a guess. The unit a change rewrites is different:
// its author wrote it against the English of the moment, which is the English
// the run resolves. So the change itself is the evidence, and the diff is how
// CI reads it.

/** One catalog as it stood at `ref`, flattened, or null when the ref has no such file. */
function catalogAtRef(kind, file, ref) {
  const relative = path.relative(REPO_ROOT, file);
  // ls-tree first, so a file the ref does not hold is told apart from a git
  // failure. `git show` reports both as an error.
  if (git(["ls-tree", "--name-only", ref, "--", relative], REPO_ROOT).trim() === "") return null;
  return flattenCatalog(kind, JSON.parse(git(["show", `${ref}:${relative}`], REPO_ROOT)));
}

/**
 * The flat keys whose translated value this working tree changed since `ref`.
 *
 * A catalog the ref does not hold counts as wholly written by the change, which
 * is what adding a locale or a metadata catalog is. A removed key is left out:
 * nothing is stamped for text that is no longer there.
 *
 * Invalid JSON at either end throws rather than returning a set, because an
 * unreadable comparison must stop the run and not quietly stamp everything.
 */
export function changedCatalogKeys(kind, file, ref) {
  const now = fs.existsSync(file) ? flattenCatalog(kind, JSON.parse(fs.readFileSync(file, "utf8"))) : {};
  const before = catalogAtRef(kind, file, ref);
  if (before === null) return new Set(Object.keys(now));
  return new Set(Object.keys(now).filter((key) => now[key] !== before[key]));
}

/**
 * Did `changed` touch this unit? A plural group is touched when any of the
 * target's own categories changed, which are not always English's.
 */
export function unitTouched(kind, unit, changed) {
  if (!unit.plural) return changed.has(unit.id);
  return CATEGORIES.some((category) => changed.has(PLURAL_SPELLING[kind].join(unit.base, category, unit.ordinal)));
}

/** A `--stamp-changed` ref this repo does not hold is a mistake, never an empty diff. */
export function assertChangedRef(ref) {
  if (!refExists(REPO_ROOT, ref)) throw new Error(`--stamp-changed="${ref}" is not a commit this repository holds, so there is nothing to compare against.`);
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
 * The caller checks presence (a group missing a category its grammar needs is an
 * ERROR in the checker), so this only tells empty from non-empty.
 */
export function unitState(unit, entries, stamps) {
  if (Object.keys(entries).length === 0) return MISSING;
  const stamp = stamps[unit.id];
  if (!stamp) return UNSTAMPED;
  return stamp === unitHash(unit) ? DONE : STALE;
}
