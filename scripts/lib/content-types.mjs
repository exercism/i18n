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
// Every type below is live in the scripts today, which makes the
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

  // ------------------------------------------------------------------- docs --
  //
  // VERIFIED against exercism/docs@862f7be0 and the website's ingest
  // (app/commands/git/sync_main_docs.rb, sync_doc.rb, app/models/document.rb).
  //
  // The website serves exactly the pages listed in FIVE section manifests,
  // `<section>/config.json` for using, building, programming, mentoring and
  // community, and reads each page's Markdown from the manifest entry's `path`.
  // At that commit the manifests list 212 pages, every one of them exists, and
  // every one is inside its own section's directory, so the five patterns below
  // match all 212. They also match THREE files no manifest lists
  // (building/product/experience.md, building/tracks/stories/ast.top-secret.md,
  // building/tracks/stories/errors.new-passport.md), which the website never
  // serves. A pattern cannot see a manifest's contents, so those three are
  // over-required: translated and never shown. That errs in the safe direction.
  //
  // TODO(iHiD): if over-requiring ever matters, membership has to come from the
  // manifest and not from a pattern. The same is true of `track-docs` above:
  // a track's served docs are the `path`s in its docs/config.json, and
  // exercism/ruby holds docs/24pullrequests.md, which that manifest omits.
  //
  // One type PER SECTION, so that scope is a one-line change.
  //
  // TODO(iHiD): DECISION NEEDED, not made here. `building/` is 155 of the 212
  // pages and is written for contributors and maintainers, not learners, and
  // `mentoring/` is written for mentors. Both are live below, because they are
  // served to signed-in users like any other page and leaving them out silently
  // would be deciding. Dropping one from launch is removing (or flagging) its
  // entry.
  //
  // Deliberately NOT translatable, and why:
  //   anatomy/**, dev/**            not a synced section: never served
  //   reference/*.yml               data, not prose
  //   README.md, CODE_OF_CONDUCT.md, season-of-docs-proposal.md
  //                                 about the repo itself
  //   <section>/config.json         titles and blurbs: the metadata catalog, see below
  "docs-using": { label: "docs page (using)", kind: "docs", unit: "file", match: /^using\/.+\.md$/ }, // 36
  "docs-building": { label: "docs page (building, contributor-facing)", kind: "docs", unit: "file", match: /^building\/.+\.md$/ }, // 158, of which 155 served
  "docs-programming": { label: "docs page (programming)", kind: "docs", unit: "file", match: /^programming\/.+\.md$/ }, // 3
  "docs-mentoring": { label: "docs page (mentoring, mentor-facing)", kind: "docs", unit: "file", match: /^mentoring\/.+\.md$/ }, // 8
  "docs-community": { label: "docs page (community)", kind: "docs", unit: "file", match: /^community\/.+\.md$/ }, // 10

  // ------------------------------------------------------------------- blog --
  //
  // VERIFIED against exercism/blog@1df84cc2 and the website's ingest
  // (app/commands/git/sync_blog.rb, app/models/git/blog.rb).
  //
  // config.json lists posts and stories by slug, and the website reads
  // `posts/<slug>.md` and `stories/<slug>.md`. At that commit it lists 54 posts
  // and 13 stories; all 67 files exist, the two directories hold nothing else,
  // and nothing is nested. So these two patterns are EXACT: 54 and 13.
  //
  // Deliberately NOT translatable: README.md, CODE_OF_CONDUCT.md, bin/*.sh,
  // config.json.schema.json (about the repo), and config.json itself (titles,
  // descriptions, marketing copy, blurbs: the metadata catalog, see below).
  "blog-post": { label: "blog post", kind: "blog", unit: "file", match: /^posts\/[^/]+\.md$/ }, // 54
  "community-story": { label: "community story", kind: "blog", unit: "file", match: /^stories\/[^/]+\.md$/ }, // 13

  // ----------------------------------------------------------- website-copy --
  //
  // VERIFIED against exercism/website-copy@68cc3fc9 and the website's ingest
  // (app/models/git/website_copy.rb, app/models/submission/analysis.rb).
  //
  // An analyzer emits a comment CODE such as `ruby.two-fer.splat_args`; the
  // website turns the dots into slashes and reads
  // `analyzer-comments/<code>.md`, then interpolates `%{name}` parameters into
  // the Markdown (and `%%` as a literal percent). At that commit the directory
  // holds 519 files across 15 tracks, every one of them `.md`, with no README
  // or other stray among them, so the pattern matches exactly the 519 files a
  // code can resolve to. The `%{name}` tokens are why scripts/lib/checks.mjs
  // holds a content file to its English's placeholders.
  //
  // Deliberately NOT translatable, and why:
  //   tracks/**/mentoring.md (291) and the 3 other files under tracks/
  //                                 mentor notes: read by mentors, never by a
  //                                 learner
  //   automators.json               usernames and track slugs: data
  //   pages/*.md (24), licences/*   NOT READ BY THE WEBSITE AT ALL. Nothing in
  //                                 Git::WebsiteCopy opens them; they are left
  //                                 over from an earlier version of the site
  //   walkthrough/index.html        TODO(iHiD): DECISION NEEDED. This one IS
  //                                 learner-facing: it is the CLI walkthrough
  //                                 modal (app/assemblers/assemble_cli_walkthrough.rb),
  //                                 served after a `[CONFIGURE_COMMAND]` token
  //                                 is substituted. But it is one 37KB HTML
  //                                 document, not Markdown, and `.html` is not
  //                                 an extension the store takes. Left out
  //                                 rather than half-supported.
  "analyzer-comments": {
    label: "analyzer comment",
    kind: "website-copy",
    unit: "file",
    match: /^analyzer-comments\/.+\.md$/ // 519
  },

  // ---------------------------------------------------------------------------
  // Text that is NOT a whole file: `unit: "metadata"`.
  //
  // An exercise's blurb lives inside `.meta/config.json` beside its file lists; a
  // track's blurb, its exercise and concept names and its key features live in
  // config.json; a specification's title and blurb live in metadata.toml; a docs
  // page's and a blog post's live in a manifest. Translating those files whole is
  // wrong (almost none of each is copy), so the copy is EXTRACTED into one keyed
  // catalog per source repo: scripts/lib/metadata.mjs owns the extraction, the
  // keys and the on-disk shape, and says which fields are copy and how each was
  // verified against the website.
  //
  // What lives HERE is only the path patterns: which files a metadata catalog is
  // built from. english-changes uses them to tell that a PR touched one, and
  // nothing files a translation under these paths. `fields` is documentation of
  // what metadata.mjs extracts from each, and is read by nothing.
  // ---------------------------------------------------------------------------
  "exercise-metadata": {
    label: "exercise blurb",
    kind: "track",
    unit: "metadata",
    fields: ["blurb", "source"],
    match: new RegExp(`^${EXERCISE}/\\.meta/config\\.json$`)
  },
  "concept-metadata": {
    label: "concept blurb",
    kind: "track",
    unit: "metadata",
    fields: ["blurb"],
    match: /^concepts\/[^/]+\/\.meta\/config\.json$/
  },
  "track-metadata": {
    label: "track blurb, exercise and concept names, key features",
    kind: "track",
    unit: "metadata",
    fields: ["blurb", "exercises.concept[].name", "exercises.practice[].name", "concepts[].name", "key_features[].title", "key_features[].content"],
    match: /^config\.json$/
  },
  "track-docs-metadata": {
    label: "track docs titles and blurbs",
    kind: "track",
    unit: "metadata",
    fields: ["docs[].title", "docs[].blurb"],
    match: /^docs\/config\.json$/
  },
  "problem-specification-metadata": {
    label: "problem specification title and blurb",
    kind: "problem-specifications",
    unit: "metadata",
    fields: ["title", "blurb", "source", "deep_dive_blurb"],
    match: /^exercises\/[^/]+\/metadata\.toml$/
  },
  "docs-metadata": {
    // VERIFIED: five manifests, entries of { uuid, slug, path, title, blurb }
    // (mentoring's and using's also carry `section`). 212 titles and blurbs.
    label: "docs titles and blurbs",
    kind: "docs",
    unit: "metadata",
    fields: ["[].title", "[].blurb"],
    match: /^(?:using|building|programming|mentoring|community)\/config\.json$/
  },
  "blog-metadata": {
    // VERIFIED: posts carry { title, marketing_copy } and, per sync_blog.rb, an
    // optional `description`; stories carry { title, blurb }.
    label: "blog post and story titles, descriptions, marketing copy, blurbs",
    kind: "blog",
    unit: "metadata",
    fields: ["posts[].title", "posts[].description", "posts[].marketing_copy", "stories[].title", "stories[].blurb"],
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
