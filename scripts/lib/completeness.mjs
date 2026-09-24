// What a source repo's change requires of this repo, and what is missing.
//
// Pure functions over plain data, so scripts/test.mjs can test them without a
// repository, and so the two callers (scripts/completeness.mjs, which blocks a
// PR, and scripts/english-changes.mjs, which describes one in an issue) always
// agree on what counts as English.
//
// ## Full, or relative to a base
//
// Both questions below can be asked two ways:
//
//   full       everything English holds at `head` is required, so users of a
//              production locale never see untranslated text.
//   relative   only what differs between `base` and `head` is required: a new
//              file, an edited file (which has a new blob id), a new key, an
//              edited key. This is the work a PR creates.
//
// Once a repo is fully translated, the two give the same result on every PR.
// They only differ while there is a backlog, and then the relative mode stops
// a PR being blocked by English it did not touch. The caller chooses which to
// use; see source-repo-workflows/README.md.

import { CONTENT_TYPES, contentRelativePath, typeForPath, typesForKind } from "./content-types.mjs";
import { wipExerciseDirs } from "./source-repos.mjs";
import { englishUnits, targetEntries, unitHash } from "./catalogs.mjs";
import { requiredCategories } from "./plurals.mjs";

const extensionOf = (file) => {
  const dot = file.lastIndexOf(".");
  return dot === -1 ? "" : file.slice(dot);
};

const EXERCISE_DIR = /^(exercises\/(?:practice|concept)\/[^/]+)\//;

/**
 * The translatable files of one repo kind among some tree entries.
 *
 * The registry matches a path and opens no config, so it cannot tell a live
 * exercise from an unfinished one. `read` is what lets this leave a `wip`
 * exercise's files out, the same exercises whose names and blurbs
 * scripts/lib/metadata.mjs already leaves out of the catalog: with it, the
 * track's own config.json (which must be among `entries`) decides; without it,
 * every matched file is returned. A caller that can read the repo passes it. A
 * caller that cannot, such as scripts/english-changes.mjs, which sees a PR's
 * file list and no tree, requires the files anyway, which costs one translation
 * of text nobody reads and is the safe side of the two.
 *
 * @param {string} kind  a REPO_KINDS id
 * @param {{path, id}[]} entries  `git ls-tree` output, or a PR's file list
 * @param {(entries) => {path,id,text}[]} [read]  reads blobs as text
 * @returns {{ type, path, id, extension }[]}
 */
export function translatableFiles(kind, entries, read = null) {
  const wip = read && kind === "track" ? wipExerciseDirs(entries, read) : null;
  const out = [];
  for (const entry of entries) {
    const type = typeForPath(kind, entry.path);
    if (!type) continue;
    if (wip?.has(EXERCISE_DIR.exec(entry.path)?.[1])) continue;
    out.push({ type, path: entry.path, id: entry.id, extension: extensionOf(entry.path) });
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
 * Compared by blob id, never by path, which handles three cases correctly: a
 * rename requires nothing, a file restored to earlier bytes requires nothing
 * new, and a new track adding two-fer requires nothing if another track's
 * identical instructions were already translated.
 *
 * `read` and `baseRead` read blobs at each of the two refs, and each side's
 * config.json decides which of that side's exercises are `wip`. Both sides are
 * read, so an exercise that leaves `wip` in this change requires its files:
 * they were not required at the base, and nobody has translated them.
 */
export function requiredContent(kind, headEntries, baseEntries = null, { read = null, baseRead = null } = {}) {
  const before = baseEntries === null ? new Set() : new Set(translatableFiles(kind, baseEntries, baseRead).map((file) => file.id));
  return translatableFiles(kind, headEntries, read).filter((file) => !before.has(file.id));
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
 * A unit is satisfied when it is present, complete, and stamped against exactly
 * the English being checked. The stamp is what makes an English edit block: the
 * key still exists and still has a translation, and only the stamp shows that
 * the translation is of a sentence that has since changed.
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
