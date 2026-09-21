// The registry of what is translatable and where its translation lives.
//
// There are two families of content, stored differently because they change
// differently.
//
// ## 1. The website catalogs (`website-backend`, `website-frontend`)
//
// UI strings, keyed by name. Two catalogs per locale, at
// `locales/<locale>/website/<kind>.json`. A key's English can be edited after
// it is translated, so these have per-unit staleness stamps.
// scripts/lib/catalogs.mjs handles all of it.
//
// ## 2. Git-sourced content (everything in CONTENT_TYPES below)
//
// Whole files written in a git repo: exercise instructions, concept pages,
// track docs, the docs repo, the blog, analyzer comments,
// problem-specifications. They are keyed by the git blob id of the English
// file:
//
//   locales/<locale>/content/<ab>/<cd>/<remaining 36 hex>.<ext>
//
// One translated file per locale per blob id. The path does not record which
// repo, track or exercise the English came from. This is deliberate: two-fer's
// instructions are byte-identical across dozens of tracks, so they have one
// blob id, are translated once, and serve every track that has them. The
// source extension is kept, so Markdown and JSON files can be told apart
// without opening them.
//
// A blob id always names the same bytes, so a translation filed under it
// always matches that text, and there is no staleness: no `en_md5`, no stamp,
// no sidecar. Editing the English produces a new blob id, which has no file
// yet. Checking whether a locale is complete means checking that a file exists
// for every blob id in the tree, a directory lookup per file that needs no
// English bytes.
//
// The `ab/cd/` fan-out is there because a flat directory of a few hundred
// thousand files is slow for git, GitHub's UI and filesystem tools.
//
// ## A type is a path pattern within a kind of repo
//
// `kind` is one of REPO_KINDS in scripts/lib/source-repos.mjs, and every track
// repo has the same kind, so a type is declared once for all eighty tracks.
// `match` is tested against a repo-relative path. A path that no type matches
// is not translatable.
//
// Adding a content type means adding one entry here. No script needs to
// change, and the source-repo workflow templates read this list through
// scripts/english-changes.mjs and have no copy of the patterns.
//
// TODO(iHiD): OPEN. Which content types are in scope for launch is undecided.
// Every type below is live today, so the completeness check requires all of
// them for a production locale. If launch is narrower, add `launch: false` to
// a type and filter on it in `typesForKind`. The field is left out until that
// is decided.

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
  // Verified against exercism/docs@862f7be0 and the website's ingest
  // (app/commands/git/sync_main_docs.rb, sync_doc.rb, app/models/document.rb).
  //
  // The website serves exactly the pages listed in five section manifests,
  // `<section>/config.json` for using, building, programming, mentoring and
  // community, and reads each page's Markdown from the entry's `path`. At that
  // commit the manifests list 212 pages, all of which exist inside their own
  // section's directory, so the five patterns below match all 212. They also
  // match three files no manifest lists (building/product/experience.md,
  // building/tracks/stories/ast.top-secret.md,
  // building/tracks/stories/errors.new-passport.md), which the website never
  // serves. A pattern cannot read a manifest, so those three are required
  // anyway: translated but never shown. That is the safe side to err on.
  //
  // TODO(iHiD): if requiring extra files ever matters, membership has to come
  // from the manifest instead of a pattern. The same applies to `track-docs`
  // above: a track's served docs are the `path`s in its docs/config.json, and
  // exercism/ruby has docs/24pullrequests.md, which that manifest omits.
  //
  // One type per section, so changing the scope is a one-line change.
  //
  // TODO(iHiD): OPEN. `building/` is 155 of the 212 pages and is written for
  // contributors and maintainers, and `mentoring/` is written for mentors. Both
  // are live below, because they are served to signed-in users like any other
  // page, and leaving them out quietly would be making the decision. To drop
  // one from launch, remove (or flag) its entry.
  //
  // Not translatable, on purpose:
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
  // Verified against exercism/blog@1df84cc2 and the website's ingest
  // (app/commands/git/sync_blog.rb, app/models/git/blog.rb).
  //
  // config.json lists posts and stories by slug, and the website reads
  // `posts/<slug>.md` and `stories/<slug>.md`. At that commit it lists 54 posts
  // and 13 stories, all 67 files exist, the two directories hold nothing else,
  // and nothing is nested. So these two patterns match exactly: 54 and 13.
  //
  // Not translatable, on purpose: README.md, CODE_OF_CONDUCT.md, bin/*.sh,
  // config.json.schema.json (about the repo), and config.json itself (its
  // titles, descriptions, marketing copy and blurbs go in the metadata catalog,
  // see below).
  "blog-post": { label: "blog post", kind: "blog", unit: "file", match: /^posts\/[^/]+\.md$/ }, // 54
  "community-story": { label: "community story", kind: "blog", unit: "file", match: /^stories\/[^/]+\.md$/ }, // 13

  // ----------------------------------------------------------- website-copy --
  //
  // Verified against exercism/website-copy@68cc3fc9 and the website's ingest
  // (app/models/git/website_copy.rb, app/models/submission/analysis.rb).
  //
  // An analyzer emits a comment code such as `ruby.two-fer.splat_args`; the
  // website turns the dots into slashes, reads `analyzer-comments/<code>.md`,
  // and fills `%{name}` parameters into the Markdown (with `%%` as a literal
  // percent). At that commit the directory holds 519 files across 15 tracks,
  // all `.md`, with no README or other stray files, so the pattern matches
  // exactly the 519 files a code can point to. The `%{name}` tokens are why
  // scripts/lib/checks.mjs checks a content file's placeholders against its
  // English.
  //
  // Not translatable, on purpose:
  //   tracks/**/mentoring.md (291) and the 3 other files under tracks/
  //                                 mentor notes, read by mentors and never by
  //                                 learners
  //   automators.json               usernames and track slugs: data
  //   pages/*.md (24), licences/*   not read by the website at all. Nothing in
  //                                 Git::WebsiteCopy opens them; they are left
  //                                 over from an earlier version of the site
  //   walkthrough/index.html        TODO(iHiD): OPEN. This one is learner-facing:
  //                                 it is the CLI walkthrough modal
  //                                 (app/assemblers/assemble_cli_walkthrough.rb),
  //                                 served after a `[CONFIGURE_COMMAND]` token
  //                                 is substituted. But it is one 37KB HTML
  //                                 document, and the store does not take
  //                                 `.html`, so it is left out until someone
  //                                 decides how to support it.
  "analyzer-comments": {
    label: "analyzer comment",
    kind: "website-copy",
    unit: "file",
    match: /^analyzer-comments\/.+\.md$/ // 519
  },

  // ---------------------------------------------------------------------------
  // Text that is not a whole file: `unit: "metadata"`.
  //
  // An exercise's blurb sits inside `.meta/config.json` beside its file lists; a
  // track's blurb, its exercise and concept names and its key features are in
  // config.json; a specification's title and blurb are in metadata.toml; a docs
  // page's and a blog post's are in a manifest. Translating those files whole
  // would be wrong, since almost none of each is copy, so the copy is extracted
  // into one keyed catalog per source repo. scripts/lib/metadata.mjs owns the
  // extraction, the keys and the file format, and says which fields are copy and
  // how each was verified against the website.
  //
  // This file only holds the path patterns: which files a metadata catalog is
  // built from. english-changes uses them to tell that a PR touched one, and no
  // translation is filed under these paths. `fields` documents what
  // metadata.mjs extracts from each, and no code reads it.
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
    // Verified: five manifests, entries of { uuid, slug, path, title, blurb }
    // (mentoring's and using's also carry `section`). 212 titles and blurbs.
    label: "docs titles and blurbs",
    kind: "docs",
    unit: "metadata",
    fields: ["[].title", "[].blurb"],
    match: /^(?:using|building|programming|mentoring|community)\/config\.json$/
  },
  "blog-metadata": {
    // Verified: posts carry { title, marketing_copy } and, per sync_blog.rb, an
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
 * The one place the fan-out is spelled out. The website reads the store directly
 * from its checkout of this repo, so this is the layout it serves.
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

// To find a translation by its English path, use the translation index
// (scripts/lib/translation-index.mjs), which lives in index/, outside this
// store. iHiD agreed its design, and there is no symlink tree.
