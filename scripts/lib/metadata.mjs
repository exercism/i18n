// Text that is not a whole file: titles, names and blurbs inside config.json
// and metadata.toml. One keyed catalog per source repo per locale.
//
//   locales/<locale>/metadata/<repo>.json        { "<key>": "<translation>" }
//   locales/<locale>/metadata/<repo>.meta.json   per-unit stamps, as for the website
//
// `<repo>` is the GitHub repository's name: `ruby`, `problem-specifications`,
// `docs`, `blog`. The catalog is flat on disk because its keys contain slugs,
// and a docs slug contains `/` and may contain `.`, so no separator is safe to
// nest on. Outside this file a key is treated as an opaque string.
//
// ## Keyed by slug
//
// Whole files are filed under the blob id of their English because an old
// version of an exercise is still served to people solving it, so a
// translation has to match exactly those bytes. That does not apply to this
// text: the website copies it into database columns (tracks.blurb,
// exercises.title, exercises.blurb, documents.title, ...) and only shows the
// latest. So it works like the website's own catalogs: a key names a slot, the
// slot's English can be edited, and the per-unit stamp (catalogs.mjs) detects
// the edit. An edited blurb is a stale unit, and the source PR's completeness
// check blocks on it just as it does on an edited website key.
//
// ## Keys are slugs, never positions
//
//   track                     track:blurb
//                             key_feature:<icon>:title | content
//                             exercise:<slug>:name | blurb | source
//                             concept:<slug>:name | blurb
//                             doc:<slug>:title | blurb
//   problem-specifications    exercise:<slug>:title | blurb | source | deep_dive_blurb
//   docs                      <section>:<slug>:title | blurb
//   blog                      post:<slug>:title | description | marketing_copy
//                             story:<slug>:title | blurb
//
// So reordering config.json changes nothing. A renamed exercise has a new
// slug, so new keys, which are required like any new text; the old keys stay
// in every locale's catalog, unused, reported as "key not in English". The
// same applies to a removed exercise. Nothing is ever deleted from a locale's
// catalog (scripts/no-deletions.mjs), and there is no need to: an unused key
// costs nothing.
//
// A key feature has no slug. Its `icon` is the closest thing to an identity,
// so that is its key. When two features share an icon, the later one gets
// `<icon>~2`, which depends on position and is reported in `notes`.
//
// ## Only what a user is shown
//
// Every field below was traced through the website's ingest at origin/main.
// Everything else in these files is data and is never extracted: uuids, slugs,
// paths, file lists, prerequisites, difficulty, status, authors, icons, URLs.
//
//   config.json (track)       app/commands/git/sync_track.rb, app/models/git/track.rb
//     blurb                   -> tracks.blurb (cut to 350 characters)
//     key_features[].title, .content
//                             -> tracks/about/_key_features.html.haml (first 6)
//     exercises.concept[] and .practice[] .name
//                             -> exercises.title. Not an entry whose `status` is
//                                "wip": the website does not show it and nobody
//                                can read it, so its copy is not English anyone
//                                is waiting for. Every other status is included.
//                                `isWipExercise` in source-repos.mjs is the rule,
//                                shared with the content half.
//     concepts[].name         -> concepts.name
//     Not `language`: it becomes tracks.title, and "Ruby" is a proper name.
//     Not `tags`: they are codes ("paradigm/functional"). The words a user reads
//       come from Track::TAGS in the website's own Ruby, which is website copy.
//   exercises/<type>/<slug>/.meta/config.json       app/models/git/exercise.rb
//     blurb                   -> exercises.blurb
//     source                  -> tracks/exercises/show/_instructions.html.haml
//     Not `source_url`. Only for exercises the track's config.json lists: the
//       website never syncs a directory the config does not name.
//   concepts/<slug>/.meta/config.json               app/models/git/concept.rb
//     blurb                   -> concepts.blurb. Listed concepts only.
//   docs/config.json (track)  app/commands/git/sync_track_docs.rb, sync_doc.rb
//     docs[].title, .blurb    -> documents.title, documents.blurb
//   exercises/<slug>/metadata.toml  app/models/git/problem_specifications/exercise.rb
//     title, blurb, source, deep_dive_blurb
//                             -> generic_exercises (app/commands/git/sync_problem_specifications.rb)
//     Not `source_url`, `deep_dive_youtube_id`.
//   <section>/config.json (docs)    app/commands/git/sync_main_docs.rb, sync_doc.rb
//     [].title, [].blurb      -> documents.title, documents.blurb. The five
//                                synced sections only.
//   config.json (blog)        app/commands/git/sync_blog.rb
//     posts[].title, .description, .marketing_copy
//     stories[].title, .blurb
//
// ## Identical English across tracks
//
// "Two Fer" and its blurb appear byte for byte in dozens of tracks' catalogs.
// Deduplicating them is left to the translator at translate time and is not
// built here. The format makes it cheap: a unit's stamp is the git blob id of
// its English string (catalogs.mjs `stringId`), so checking whether any repo's
// catalog has already translated this exact English is a lookup of one hash
// across a locale's `*.meta.json` files.

import fs from "node:fs";
import path from "node:path";
import { LOCALES_DIR, fail } from "./constants.mjs";
import { isWipExercise } from "./source-repos.mjs";

export const METADATA_KIND = "metadata";
export const METADATA_TYPE_ID = "metadata";

/** The repo kinds that have a metadata catalog. The website's copy is its two catalogs. */
export const METADATA_REPO_KINDS = ["track", "problem-specifications", "docs", "blog"];

export const DOCS_SECTIONS = ["using", "building", "programming", "mentoring", "community"];

const REPO_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

export function metadataRoot(locale) {
  return path.join(LOCALES_DIR, locale, "metadata");
}

export function metadataPath(locale, repoName) {
  if (!REPO_NAME.test(repoName) || repoName.endsWith(".meta")) fail(`"${repoName}" is not a repository name a metadata catalog can be filed under`);
  return path.join(metadataRoot(locale), `${repoName}.json`);
}

/** The repo names one locale holds a metadata catalog for. */
export function heldMetadataRepos(locale) {
  const root = metadataRoot(locale);
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root)
    .filter((file) => file.endsWith(".json") && !file.endsWith(".meta.json"))
    .map((file) => file.slice(0, -".json".length))
    .sort();
}

// --------------------------------------------------------------------- TOML --

/**
 * The string values of a flat TOML file, for the keys asked for.
 *
 * Deliberately not a full TOML parser. Every metadata.toml in
 * problem-specifications@7c8c837f (151 of them) contains only
 * `key = "basic string"` lines, and a basic string's escapes are the same as
 * JSON's. A wanted key with any other kind of value (a multi-line string, a
 * literal string, a table) fails with an error naming the file: skipping it
 * would drop a title from English, and text English does not list is never
 * required to be translated.
 */
export function readTomlStrings(text, wanted, file = "<toml>") {
  const out = {};
  for (const [index, raw] of text.split(/\r?\n/).entries()) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#")) continue;
    const match = /^([A-Za-z0-9_-]+)\s*=\s*(.*)$/.exec(line);
    if (!match || !wanted.includes(match[1])) continue;
    const value = /^("(?:[^"\\]|\\.)*")\s*(?:#.*)?$/.exec(match[2]);
    if (!value || match[2].startsWith('"""')) throw new Error(`${file}:${index + 1}: ${match[1]} is not a single-line basic string, which is the only shape this reads`);
    try {
      out[match[1]] = JSON.parse(value[1]);
    } catch {
      throw new Error(`${file}:${index + 1}: ${match[1]} has an escape this cannot read`);
    }
  }
  return out;
}

// --------------------------------------------------------------- extraction --

function parseJson(entry) {
  if (entry.text === null) throw new Error(`${entry.path}: could not read this file`);
  try {
    return JSON.parse(entry.text);
  } catch (error) {
    throw new Error(`${entry.path}: invalid JSON, ${error.message}`);
  }
}

/** Set `catalog[key]` when the value is a non-blank string. Anything else is not copy. */
function put(catalog, key, value) {
  if (typeof value === "string" && value.trim() !== "") catalog[key] = value;
}

// A slug containing `:` would make a key ambiguous, and an entry with no slug
// has no stable identity. Text English does not list is never required, so
// neither is dropped without a note.
function slugOk(slug, notes, where) {
  if (typeof slug === "string" && slug !== "" && !slug.includes(":")) return true;
  notes.push(`${where}: an entry with the slug ${JSON.stringify(slug ?? null)} was skipped (a slug must be a non-empty string without ":")`);
  return false;
}

function extractTrack(byPath, read, notes) {
  const catalog = {};
  const configEntry = byPath.get("config.json");
  if (!configEntry) return { catalog, used: [] };
  const used = ["config.json"];
  const config = parseJson(read([configEntry])[0]);

  put(catalog, "track:blurb", config.blurb);

  const icons = new Map();
  for (const feature of config.key_features ?? []) {
    const icon = typeof feature?.icon === "string" && feature.icon !== "" && !feature.icon.includes(":") ? feature.icon : "feature";
    const seen = (icons.get(icon) ?? 0) + 1;
    icons.set(icon, seen);
    if (seen > 1) notes.push(`config.json: two key features share the icon "${icon}"; the later one is keyed by position (${icon}~${seen})`);
    const id = seen > 1 ? `${icon}~${seen}` : icon;
    put(catalog, `key_feature:${id}:title`, feature?.title);
    put(catalog, `key_feature:${id}:content`, feature?.content);
  }

  const wanted = [];
  for (const type of ["concept", "practice"]) {
    for (const exercise of config.exercises?.[type] ?? []) {
      if (!slugOk(exercise?.slug, notes, "config.json exercises")) continue;
      if (isWipExercise(exercise)) continue;
      put(catalog, `exercise:${exercise.slug}:name`, exercise.name);
      wanted.push({ file: `exercises/${type}/${exercise.slug}/.meta/config.json`, prefix: `exercise:${exercise.slug}`, fields: ["blurb", "source"] });
    }
  }
  for (const concept of config.concepts ?? []) {
    if (!slugOk(concept?.slug, notes, "config.json concepts")) continue;
    put(catalog, `concept:${concept.slug}:name`, concept.name);
    wanted.push({ file: `concepts/${concept.slug}/.meta/config.json`, prefix: `concept:${concept.slug}`, fields: ["blurb"] });
  }

  const present = wanted.filter((want) => byPath.has(want.file));
  const absent = wanted.length - present.length;
  if (absent > 0) notes.push(`${absent} listed exercise(s) or concept(s) have no .meta/config.json at this commit`);
  const texts = read(present.map((want) => byPath.get(want.file)));
  present.forEach((want, index) => {
    const meta = parseJson(texts[index]);
    for (const field of want.fields) put(catalog, `${want.prefix}:${field}`, meta[field]);
    used.push(want.file);
  });

  const docsEntry = byPath.get("docs/config.json");
  if (docsEntry) {
    used.push("docs/config.json");
    for (const doc of parseJson(read([docsEntry])[0]).docs ?? []) {
      if (!slugOk(doc?.slug, notes, "docs/config.json")) continue;
      put(catalog, `doc:${doc.slug}:title`, doc.title);
      put(catalog, `doc:${doc.slug}:blurb`, doc.blurb);
    }
  }
  return { catalog, used };
}

function extractProblemSpecifications(byPath, read) {
  const catalog = {};
  const entries = [...byPath.values()].filter((entry) => /^exercises\/[^/]+\/metadata\.toml$/.test(entry.path));
  for (const entry of read(entries)) {
    if (entry.text === null) throw new Error(`${entry.path}: could not read this file`);
    const slug = entry.path.split("/")[1];
    const fields = readTomlStrings(entry.text, ["title", "blurb", "source", "deep_dive_blurb"], entry.path);
    for (const [field, value] of Object.entries(fields)) put(catalog, `exercise:${slug}:${field}`, value);
  }
  return { catalog, used: entries.map((entry) => entry.path) };
}

function extractDocs(byPath, read, notes) {
  const catalog = {};
  const entries = DOCS_SECTIONS.map((section) => byPath.get(`${section}/config.json`)).filter(Boolean);
  for (const entry of read(entries)) {
    const section = entry.path.split("/")[0];
    const parsed = parseJson(entry);
    for (const doc of Array.isArray(parsed) ? parsed : (parsed.docs ?? [])) {
      if (!slugOk(doc?.slug, notes, entry.path)) continue;
      put(catalog, `${section}:${doc.slug}:title`, doc.title);
      put(catalog, `${section}:${doc.slug}:blurb`, doc.blurb);
    }
  }
  return { catalog, used: entries.map((entry) => entry.path) };
}

function extractBlog(byPath, read, notes) {
  const catalog = {};
  const entry = byPath.get("config.json");
  if (!entry) return { catalog, used: [] };
  const config = parseJson(read([entry])[0]);
  for (const post of config.posts ?? []) {
    if (!slugOk(post?.slug, notes, "config.json posts")) continue;
    for (const field of ["title", "description", "marketing_copy"]) put(catalog, `post:${post.slug}:${field}`, post[field]);
  }
  for (const story of config.stories ?? []) {
    if (!slugOk(story?.slug, notes, "config.json stories")) continue;
    for (const field of ["title", "blurb"]) put(catalog, `story:${story.slug}:${field}`, story[field]);
  }
  return { catalog, used: ["config.json"] };
}

const EXTRACTORS = { track: extractTrack, "problem-specifications": extractProblemSpecifications, docs: extractDocs, blog: extractBlog };

/**
 * One source repo's English metadata catalog.
 *
 * @param {string} kind  a REPO_KINDS id
 * @param {{path,id}[]} entries  the repo's tree (`git ls-tree`)
 * @param {(entries) => {path,id,text}[]} read  reads blobs as text (as data)
 * @returns {{ catalog, notes, files }} `files` is how many files were read.
 *   A kind with no metadata (the website, website-copy) is an empty catalog.
 */
export function buildMetadataEnglish(kind, entries, read) {
  const extractor = EXTRACTORS[kind];
  if (!extractor) return { catalog: {}, notes: [], files: 0 };
  const notes = [];
  const byPath = new Map(entries.map((entry) => [entry.path, entry]));
  const { catalog, used } = extractor(byPath, read, notes);
  return { catalog, notes, files: used.length };
}

/** The field of a key: what follows its last `:`. For reports. */
export const keyField = (key) => key.slice(key.lastIndexOf(":") + 1);

// ------------------------------------------------------- one file on its own --

/**
 * The copy one metadata source file holds, under the same keys the catalog uses.
 *
 * `buildMetadataEnglish` needs a whole tree, because the track's config.json
 * decides which exercises count. The queue has no tree: it has a PR's file list
 * and, at most, the two versions of each changed file. This answers the one
 * question the queue asks, "did this change touch any copy in this file?", by
 * comparing the result for the two versions. Most config.json edits touch no
 * copy (a uuid, a file list, a prerequisite), and an issue for those would be a
 * translation run with nothing to do.
 *
 * It can only differ from the catalog in one way: it reports the blurb of an
 * exercise the track's config does not list. That over-reports, which is the
 * safe side for a queue, and the completeness check makes the final decision.
 *
 * @param {string} typeId  the file's content type (content-types.mjs)
 */
export function fileCopy(typeId, file, text) {
  const notes = [];
  const one = (entryPath) => new Map([[entryPath, { path: entryPath, id: null }]]);
  const read = (entries) => entries.map((entry) => ({ ...entry, text }));
  const catalog = {};
  switch (typeId) {
    case "track-metadata":
      return extractTrack(one("config.json"), read, notes).catalog;
    case "blog-metadata":
      return extractBlog(one("config.json"), read, notes).catalog;
    case "docs-metadata":
      return extractDocs(one(file), read, notes).catalog;
    case "problem-specification-metadata":
      return extractProblemSpecifications(one(file), read, notes).catalog;
    case "exercise-metadata": {
      const meta = parseJson({ path: file, text });
      for (const field of ["blurb", "source"]) put(catalog, `exercise:${file.split("/")[2]}:${field}`, meta[field]);
      return catalog;
    }
    case "concept-metadata":
      put(catalog, `concept:${file.split("/")[1]}:blurb`, parseJson({ path: file, text }).blurb);
      return catalog;
    case "track-docs-metadata":
      for (const doc of parseJson({ path: file, text }).docs ?? []) {
        if (!slugOk(doc?.slug, notes, file)) continue;
        put(catalog, `doc:${doc.slug}:title`, doc.title);
        put(catalog, `doc:${doc.slug}:blurb`, doc.blurb);
      }
      return catalog;
    default:
      return catalog;
  }
}

/** The keys whose English is new or different in `after`. A removed key requires nothing. */
export function changedCopyKeys(before, after) {
  return Object.keys(after).filter((key) => before[key] !== after[key]);
}
