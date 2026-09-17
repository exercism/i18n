// What a source repo's change REQUIRES of this repo, and what is missing.
//
// Pure functions over plain data, so scripts/test.mjs can assert them without a
// repository, and so the two callers (scripts/completeness.mjs, which blocks a
// PR, and scripts/english-changes.mjs, which describes one in an issue) cannot
// disagree about what counts as English.
//
// ## Full, or relative to a base
//
// Both questions below can be asked two ways.
//
//   FULL       everything English holds at `head` is required. This is the
//              promise itself: a production-locale user never sees untranslated
//              text.
//   RELATIVE   only what differs between `base` and `head` is required: a new
//              file, an edited file (which is a new blob id), a new key, an
//              edited key. This is "what work does this PR create?".
//
// Once a repo is completely translated the two give the same verdict on every
// PR. They differ only while a backlog exists, and there RELATIVE is what keeps a
// PR from being blocked by English it never touched. Which one a PR check uses is
// the caller's decision; see source-repo-workflows/README.md.

import { CONTENT_TYPES, contentRelativePath, typeForPath, typesForKind } from "./content-types.mjs";
import { englishUnits, targetEntries, unitHash } from "./catalogs.mjs";
import { requiredCategories } from "./plurals.mjs";

const extensionOf = (file) => {
  const dot = file.lastIndexOf(".");
  return dot === -1 ? "" : file.slice(dot);
};

/**
 * The translatable files of one repo kind among some tree entries.
 *
 * @param {string} kind  a REPO_KINDS id
 * @param {{path, id}[]} entries  `git ls-tree` output, or a PR's file list
 * @returns {{ type, path, id, extension }[]}
 */
export function translatableFiles(kind, entries) {
  const out = [];
  for (const entry of entries) {
    const type = typeForPath(kind, entry.path);
    if (type) out.push({ type, path: entry.path, id: entry.id, extension: extensionOf(entry.path) });
  }
  return out;
}

/** The files of a tree that a metadata catalog is built from (scripts/lib/metadata.mjs). */
export function metadataFiles(kind, entries) {
  return entries.map((entry) => ({ type: typeForPath(kind, entry.path, { unit: "metadata" }), path: entry.path, id: entry.id })).filter((entry) => entry.type);
}

/**
 * The content one change requires: every translatable file at `head`, less (when
 * a base is given) every blob id `base` already held.
 *
 * Compared by BLOB ID and never by path, which gets three cases right for free:
 * a rename requires nothing, a file restored to bytes it once had requires
 * nothing new, and a new track adding two-fer requires nothing if any other
 * track's identical instructions were already translated.
 */
export function requiredContent(kind, headEntries, baseEntries = null) {
  const before = baseEntries === null ? new Set() : new Set(translatableFiles(kind, baseEntries).map((file) => file.id));
  return translatableFiles(kind, headEntries).filter((file) => !before.has(file.id));
}

/**
 * Which required files a locale does not hold.
 *
 * @param {Map<string,string>} held  blob id -> extension (content-store.mjs)
 */
export function missingContent(required, held) {
  const seen = new Set();
  const missing = [];
  for (const file of required) {
    if (held.get(file.id) === file.extension) continue;
    const key = `${file.id}${file.extension}`;
    // One blob id is one file to translate, however many paths share it.
    const first = !seen.has(key);
    seen.add(key);
    missing.push({ ...file, store: contentRelativePath(file.id, file.extension), duplicate: !first });
  }
  return missing;
}

/**
 * The catalog units one change requires: every unit at `head`, less (when a base
 * is given) every unit whose English is unchanged from `base`.
 */
export function requiredUnits(kind, flatHead, flatBase = null) {
  const head = englishUnits(kind, flatHead);
  if (flatBase === null) return [...head.values()];
  const base = englishUnits(kind, flatBase);
  return [...head.values()].filter((unit) => !base.has(unit.id) || unitHash(base.get(unit.id)) !== unitHash(unit));
}

export const REASONS = {
  missing: "missing",
  incomplete: "plural group is short of a category this locale needs",
  unstamped: "translated but never checked against this English (run validate --stamp)",
  stale: "translated from older English"
};

/**
 * Which required units a locale does not satisfy, and why.
 *
 * A unit is satisfied when it is present, whole, AND stamped against exactly the
 * English that is asking. The third part is what makes an English EDIT block: the
 * key is still there and still has a translation, and only the stamp says that
 * translation is of a sentence that no longer exists.
 */
export function missingUnits(kind, units, flatTarget, stamps, locale) {
  const out = [];
  for (const unit of units) {
    const entries = targetEntries(kind, unit, flatTarget);
    if (Object.keys(entries).length === 0) {
      out.push({ unit: unit.id, reason: "missing" });
      continue;
    }
    if (unit.plural) {
      const required = requiredCategories(locale, { ordinal: unit.ordinal }) ?? ["other"];
      if (required.some((category) => !(category in entries))) {
        out.push({ unit: unit.id, reason: "incomplete" });
        continue;
      }
    }
    const stamp = stamps[unit.id];
    if (!stamp) out.push({ unit: unit.id, reason: "unstamped" });
    else if (stamp !== unitHash(unit)) out.push({ unit: unit.id, reason: "stale" });
  }
  return out;
}

/** A one-line description of every live content type of a kind, for output. */
export function describeTypes(kind) {
  return typesForKind(kind).map((id) => `${id} (${CONTENT_TYPES[id].label})`);
}
