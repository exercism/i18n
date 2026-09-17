// The single source of truth for "what is translatable, and where does its
// translation live".
//
// There are two families of content here, and they are stored differently
// because they change differently.
//
// ## 1. The website catalogs (`website-backend`, `website-frontend`)
//
// UI strings, keyed by NAME. Two catalogs per locale, at
// `locales/<locale>/website/<kind>.json`. A key's English can be edited under its
// translation, so these carry per-unit staleness stamps. scripts/lib/catalogs.mjs
// owns all of it.
//
// ## 2. Git-sourced content (everything in CONTENT_TYPES below)
//
// Whole files authored in a git repo: exercise instructions, concept pages, track
// docs, the docs repo, the blog, analyzer comments, problem-specifications. These
// are keyed by the GIT BLOB ID of the English file:
//
//   locales/<locale>/content/<ab>/<cd>/<remaining 36 hex>.<ext>
//
// One translated file per locale per blob id. The path says nothing about which
// repo, track or exercise the English came from, on purpose: two-fer's
// instructions are byte-identical across dozens of tracks, so they have one blob
// id, are translated once, and serve every track that holds them. The source
// extension is kept, so a Markdown file and a JSON file are told apart without
// opening them.
//
// A blob id names exactly one sequence of bytes, forever. So a translation here
// is a translation of exactly that text forever, and THERE IS NO STALENESS: no
// `en_md5`, no stamp, no sidecar. Editing the English produces a new blob id,
// which is simply a file that does not exist yet. "Is this locale complete?"
// reduces to "does a file exist for every blob id in the tree?", which is a
// directory lookup per file and needs no English bytes at all.
//
// The fan-out (`ab/cd/`) is there because a flat directory of a few hundred
// thousand files is unkind to git, to GitHub's UI and to every filesystem tool.
//
// ## A type is a path pattern within a KIND of repo
//
// `kind` is one of scripts/lib/source-repos.mjs REPO_KINDS, and every track repo
// is the same kind, so a type is declared once for all eighty tracks. `match` is
// tested against a repo-relative path. A path no type matches is not
// translatable, and that is the default for everything.
//
// Adding a content type is adding one entry here. Nothing else changes, in any
// script, and the source-repo workflow templates read this list through
// scripts/english-changes.mjs rather than holding a copy of the patterns.
//
// TODO(iHiD): OPEN. Which content types are in scope for LAUNCH is undecided.
// Every `unit: "file"` type below is live in the scripts today, which makes the
// completeness check require all of them of a production locale. If launch is
// narrower, add `launch: false` to a type and filter on it in `typesForKind`;
// the field is deliberately absent rather than guessed.

import path from "node:path";
import { LOCALES_DIR, fail } from "./constants.mjs";
import { BLOB_ID } from "./git.mjs";

const EXERCISE = "exercises/(?:practice|concept)/[^/]+";

export const CONTENT_TYPES = {
  // ------------------------------------------------------------ track repos --
  "exercise-instructions": {
    label: "exercise instructions",
    kind: "track",
    unit: "file",
    match: new RegExp(`^${EXERCISE}/\\.docs/instructions\\.md$`)
  },
  "exercise-instructions-append": {
    label: "exercise instructions append",
    kind: "track",
    unit: "file",
    match: new RegExp(`^${EXERCISE}/\\.docs/instructions\\.append\\.md$`)
  },
  "exercise-introduction": {
    label: "exercise introduction",
    kind: "track",
    unit: "file",
    match: new RegExp(`^${EXERCISE}/\\.docs/introduction\\.md$`)
  },
  "exercise-introduction-append": {
    label: "exercise introduction append",
    kind: "track",
    unit: "file",
    match: new RegExp(`^${EXERCISE}/\\.docs/introduction\\.append\\.md$`)
  },
  "exercise-hints": {
    label: "exercise hints",
    kind: "track",
    unit: "file",
    match: new RegExp(`^${EXERCISE}/\\.docs/hints\\.md$`)
  },
  "exercise-shared-docs": {
    // help.md, tests.md, debug.md: appended to every exercise's README and shown
    // on the website beside it.
    label: "shared exercise docs",
    kind: "track",
    unit: "file",
    match: /^exercises\/shared\/\.docs\/[^/]+\.md$/
  },
  "concept-about": {
    label: "concept about page",
    kind: "track",
    unit: "file",
    match: /^concepts\/[^/]+\/about\.md$/
  },
  "concept-introduction": {
    label: "concept introduction",
    kind: "track",
    unit: "file",
    match: /^concepts\/[^/]+\/introduction\.md$/
  },
  "track-docs": {
    // ABOUT, INSTALLATION, LEARNING, RESOURCES, TESTS and whatever else a track's
    // docs/config.json lists. SNIPPET.txt is code and is not here.
    label: "track docs",
    kind: "track",
    unit: "file",
    match: /^docs\/.+\.md$/
  },

  // ------------------------------------------------ problem-specifications --
  "problem-specification": {
    // description.md is the older single-file form of instructions + introduction;
    // all three are what a track syncs its own .docs/ from.
    label: "problem specification",
    kind: "problem-specifications",
    unit: "file",
    match: /^exercises\/[^/]+\/(?:description|instructions|introduction)\.md$/
  },

  // ------------------------------------------------------------- docs, blog --
  docs: {
    label: "docs page",
    kind: "docs",
    unit: "file",
    // Every Markdown page in a section directory. The repo's own top-level files
    // (README, CODE_OF_CONDUCT, a proposal) are about the repo, not served.
    match: /^[^/]+\/.+\.md$/
  },
  blog: {
    label: "blog post",
    kind: "blog",
    unit: "file",
    match: /^(?:posts|stories)\/.+\.md$/
  },

  // ----------------------------------------------------------- website-copy --
  "analyzer-comments": {
    label: "analyzer comment",
    kind: "website-copy",
    unit: "file",
    match: /^analyzer-comments\/.+\.md$/
  },

  // ---------------------------------------------------------------------------
  // TODO(iHiD): OPEN. Text that is NOT a whole file.
  //
  // An exercise's blurb and title live inside `.meta/config.json` beside its file
  // lists; a track's and a concept's live in config.json; a specification's live
  // in metadata.toml; a docs page's title and blurb live in the docs config.json.
  // Translating the whole file is wrong (almost none of it is copy, and the rest
  // changes constantly), so these need keying per STRING, and how is undecided.
  // The candidate is the blob id of the string itself, filed in the same content
  // store, which `stringId` in catalogs.mjs already computes.
  //
  // Until that is settled these types are DECLARED and INERT: `unit: "fragment"`
  // is skipped by completeness, coverage and the queue, each of which says so
  // rather than silently reading "0 missing". They are listed so that the paths
  // are recorded in the one place a path belongs, and so that settling the
  // question is filling in an extractor, not rediscovering where the copy is.
  // `fields` is INDICATIVE: no script reads it, and it has not been checked
  // against each repo's schema. Verify it when the extractor is written.
  // ---------------------------------------------------------------------------
  "exercise-metadata": {
    label: "exercise blurb",
    kind: "track",
    unit: "fragment",
    fields: ["blurb"],
    match: new RegExp(`^${EXERCISE}/\\.meta/config\\.json$`)
  },
  "concept-metadata": {
    label: "concept blurb",
    kind: "track",
    unit: "fragment",
    fields: ["blurb"],
    match: /^concepts\/[^/]+\/\.meta\/config\.json$/
  },
  "track-metadata": {
    label: "track blurb, exercise and concept names, key features",
    kind: "track",
    unit: "fragment",
    fields: ["blurb", "exercises.*[].name", "concepts[].name", "key_features[].title", "key_features[].content"],
    match: /^config\.json$/
  },
  "track-docs-metadata": {
    label: "track docs titles and blurbs",
    kind: "track",
    unit: "fragment",
    fields: ["docs[].title", "docs[].blurb"],
    match: /^docs\/config\.json$/
  },
  "problem-specification-metadata": {
    label: "problem specification title and blurb",
    kind: "problem-specifications",
    unit: "fragment",
    fields: ["title", "blurb"],
    match: /^exercises\/[^/]+\/metadata\.toml$/
  },
  "docs-metadata": {
    label: "docs titles and blurbs",
    kind: "docs",
    unit: "fragment",
    fields: ["[].title", "[].blurb"],
    match: /^[^/]+\/config\.json$/
  },
  "blog-metadata": {
    label: "blog post titles and marketing copy",
    kind: "blog",
    unit: "fragment",
    fields: ["posts[].title", "posts[].marketing_copy"],
    match: /^config\.json$/
  }
};

export const CONTENT_TYPE_IDS = Object.keys(CONTENT_TYPES);

/** The two catalog types, named so `--type=` has one vocabulary across scripts. */
export const CATALOG_TYPE_IDS = ["website-backend", "website-frontend"];
export const CONTENT_TYPE_ID = "content";

/** The extensions a content file may carry: the English file's own. */
export const CONTENT_EXTENSIONS = [".md", ".json"];

export function typesForKind(kind, { unit = "file" } = {}) {
  return CONTENT_TYPE_IDS.filter((id) => CONTENT_TYPES[id].kind === kind && CONTENT_TYPES[id].unit === unit);
}

/** The content type one repo-relative path belongs to, or null. First match wins. */
export function typeForPath(kind, file, { unit = "file" } = {}) {
  return typesForKind(kind, { unit }).find((id) => CONTENT_TYPES[id].match.test(file)) ?? null;
}

/**
 * `<ab>/<cd>/<rest>.<ext>` for one blob id, relative to a locale's content root.
 *
 * The one place the fan-out is spelled. Publish uses the same relative path as
 * the S3 key, so the store on disk and the store a browser reads are one layout.
 */
export function contentRelativePath(id, extension) {
  if (!BLOB_ID.test(id)) fail(`"${id}" is not a 40-character git blob id`);
  if (!CONTENT_EXTENSIONS.includes(extension)) fail(`content may be ${CONTENT_EXTENSIONS.join(" or ")}, not "${extension}"`);
  return `${id.slice(0, 2)}/${id.slice(2, 4)}/${id.slice(4)}${extension}`;
}

export function contentRoot(locale) {
  return path.join(LOCALES_DIR, locale, "content");
}

export function contentPath(locale, id, extension) {
  return path.join(contentRoot(locale), contentRelativePath(id, extension));
}

const CONTENT_RELATIVE = /^([0-9a-f]{2})\/([0-9a-f]{2})\/([0-9a-f]{36})(\.[A-Za-z0-9]+)$/;

/** The reverse: `{ id, extension }` from a path relative to the content root, or null. */
export function parseContentRelativePath(relative) {
  const match = CONTENT_RELATIVE.exec(relative.split(path.sep).join("/"));
  return match ? { id: `${match[1]}${match[2]}${match[3]}`, extension: match[4] } : null;
}

// TODO(iHiD): OPEN. Whether a human-navigable symlink tree exists alongside the
// blob-id store (`by-path/<repo>/<path> -> ../../content/ab/cd/...`) is undecided.
// Nothing here creates one. If it lands it must live OUTSIDE `content/` so that a
// walk of the store never meets it, and it would be derived from a source
// checkout by a script, never hand-maintained: `contentRelativePath` is the only
// thing it would need from this file.
