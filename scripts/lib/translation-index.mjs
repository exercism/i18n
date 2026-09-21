// The translation index: a browsable map from English source paths to the
// translations this repo holds for them.
//
//   index/json/<locale>/<repo>.json       what the index holds, per source repo
//   index/markdown/<locale>/<repo>.md     generated from that JSON, for reading on GitHub
//   index/markdown/<locale>/README.md     links to every repo's page
//
// The content store (content-types.mjs) is keyed by blob id and records nothing
// about where its English came from, so nobody can find Two Fer's Hungarian
// instructions in it by hand. The index records, for each translatable path of
// a source repo, the blob ids of that path's English this locale holds a
// translation for, newest first and at most HISTORY_CAP of them: the latest,
// then the ones translated before it.
//
// Writers change only the JSON. The Markdown is derived from it by
// `renderRepo` and `renderReadme` and nothing else, so `scripts/build-index.mjs
// --check` can regenerate it in CI and fail on a hand edit. Display names are
// stored in the JSON for that reason: the English name comes from a source
// checkout, which CI does not have, and the localised name from the locale's
// metadata catalog, a snapshot of which is taken when the index is written.
//
// `index/` sits outside `locales/` on purpose. validate treats any file it does
// not expect under `locales/` as an error, the website never reads the index,
// and no-deletions does not apply to it: dropping the oldest id past the cap is
// how the index is meant to change.
//
// Two writers use this module: exercism/translator's translate.mjs, after every
// pass over a source repo (`syncIndex`), and scripts/backfill-index.mjs, which
// rebuilds a locale's index from source history.

import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT } from "./constants.mjs";
import { BLOB_ID } from "./git.mjs";
import { contentPath, contentRelativePath } from "./content-types.mjs";
import { DOCS_SECTIONS, readTomlStrings } from "./metadata.mjs";

export const INDEX_DIR = path.join(REPO_ROOT, "index");
export const HISTORY_CAP = 6;

const NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

export function jsonDir(locale) {
  return path.join(INDEX_DIR, "json", locale);
}

export function markdownDir(locale) {
  return path.join(INDEX_DIR, "markdown", locale);
}

export function jsonPath(locale, repo) {
  if (!NAME.test(repo)) throw new Error(`"${repo}" is not a repository name`);
  return path.join(jsonDir(locale), `${repo}.json`);
}

export function markdownPath(locale, repo) {
  return path.join(markdownDir(locale), `${repo}.md`);
}

export const readmePath = (locale) => path.join(markdownDir(locale), "README.md");

/** The locales that have an index. */
export function indexedLocales() {
  const root = path.join(INDEX_DIR, "json");
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

/** The repo names one locale has an index for. */
export function indexedRepos(locale) {
  const dir = jsonDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".json")).map((file) => file.slice(0, -".json".length)).sort();
}

// -------------------------------------------------------------------- JSON --

export function emptyIndex(locale, repo, kind) {
  return { kind, locale, names: {}, paths: {}, repo };
}

const byCodeUnit = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
const sortedObject = (object) => Object.fromEntries(Object.keys(object).sort(byCodeUnit).map((key) => [key, object[key]]));

/**
 * The file's bytes: keys sorted, and one line per name and per path, so a diff
 * shows exactly which paths changed and git merges changes to different paths.
 */
export function serialiseIndex(index) {
  const block = (object) => {
    const keys = Object.keys(object).sort(byCodeUnit);
    if (keys.length === 0) return "{}";
    const value = (item) => JSON.stringify(Array.isArray(item) ? item : sortedObject(item));
    return `{\n${keys.map((key) => `    ${JSON.stringify(key)}: ${value(object[key])}`).join(",\n")}\n  }`;
  };
  return (
    "{\n" +
    `  "kind": ${JSON.stringify(index.kind)},\n` +
    `  "locale": ${JSON.stringify(index.locale)},\n` +
    `  "names": ${block(index.names)},\n` +
    `  "paths": ${block(index.paths)},\n` +
    `  "repo": ${JSON.stringify(index.repo)}\n` +
    "}\n"
  );
}

export function readIndex(locale, repo, kind) {
  const file = jsonPath(locale, repo);
  if (!fs.existsSync(file)) return emptyIndex(locale, repo, kind);
  const index = JSON.parse(fs.readFileSync(file, "utf8"));
  return { ...emptyIndex(locale, repo, kind ?? index.kind), names: index.names ?? {}, paths: index.paths ?? {} };
}

/** Writes the JSON if its bytes changed. Returns whether it did. */
export function writeIndex(index) {
  const file = jsonPath(index.locale, index.repo);
  const text = serialiseIndex(index);
  if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === text) return false;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
  return true;
}

/**
 * Puts `id` first in one path's list, removing it from anywhere further down
 * and dropping whatever falls past the cap. Returns whether the list changed.
 */
export function recordTranslation(index, file, id) {
  if (!BLOB_ID.test(id)) throw new Error(`"${id}" is not a blob id`);
  const before = index.paths[file] ?? null;
  const after = [id, ...(before ?? []).filter((one) => one !== id)].slice(0, HISTORY_CAP);
  index.paths[file] = after;
  return before === null || before.join() !== after.join();
}

/**
 * Brings one repo's index up to date with a tree of that repo, as a translation
 * pass leaves it.
 *
 * Every translatable path whose current English the locale holds records that
 * blob id as its latest, including English translated earlier from another repo
 * with identical bytes. A path with nothing held is listed with no ids, which
 * the Markdown shows as missing. A listed path that has no ids and is no longer
 * in the tree is dropped; one with ids is kept, since its translations still
 * exist.
 *
 * @param {{path, id, extension}[]} files  completeness.translatableFiles output
 * @param {(id, extension) => boolean} isHeld
 * @param {object} names  from `displayNames`, merged over the names already held
 */
export function syncIndex(index, files, isHeld, names = {}) {
  const present = new Set(files.map((file) => file.path));
  for (const [file, ids] of Object.entries(index.paths)) if (ids.length === 0 && !present.has(file)) delete index.paths[file];
  for (const file of files) {
    if (isHeld(file.id, file.extension)) recordTranslation(index, file.path, file.id);
    else index.paths[file.path] ??= [];
  }
  const groups = new Set(Object.keys(index.paths).map((file) => describePath(index.kind, file).group));
  index.names = sortedObject({ ...index.names, ...Object.fromEntries(Object.entries(names).filter(([group]) => groups.has(group))) });
  return index;
}

/** A file in a locale's content store exists for this blob id. */
export const heldIn = (locale) => (id, extension) => fs.existsSync(contentPath(locale, id, extension));

// ------------------------------------------------------------------- names --

/**
 * English and localised display names for the groups of one repo's tree, keyed
 * by group (see `describePath`): `{ "<group>": { en, <locale>? } }`.
 *
 * The English is read from the source files the website takes each name from
 * (scripts/lib/metadata.mjs lists them), and the translation from the locale's
 * metadata catalog under the same key. A group with no name falls back to its
 * slug when rendered.
 *
 * @param {(entries) => {path,id,text}[]} read  reads blobs as text
 * @param {object} catalog  the locale's flat metadata catalog for this repo, or {}
 */
export function displayNames(kind, entries, read, locale, catalog = {}) {
  const byPath = new Map(entries.map((entry) => [entry.path, entry]));
  const readJson = (file) => {
    const entry = byPath.get(file);
    if (!entry) return null;
    const [{ text }] = read([entry]);
    try {
      return text === null ? null : JSON.parse(text);
    } catch {
      return null;
    }
  };
  const names = {};
  const put = (group, english, key) => {
    if (typeof english !== "string" || english.trim() === "") return;
    names[group] = { en: english };
    if (typeof catalog[key] === "string" && catalog[key].trim() !== "") names[group][locale] = catalog[key];
  };
  const docsManifest = (manifest, section, keyOf) => {
    for (const doc of Array.isArray(manifest) ? manifest : (manifest?.docs ?? [])) {
      if (typeof doc?.path === "string" && typeof doc?.slug === "string") put(doc.path, doc.title, keyOf(doc.slug, section));
    }
  };

  if (kind === "track") {
    const config = readJson("config.json") ?? {};
    for (const type of ["practice", "concept"]) {
      for (const exercise of config.exercises?.[type] ?? []) {
        if (typeof exercise?.slug === "string") put(`exercises/${type}/${exercise.slug}`, exercise.name, `exercise:${exercise.slug}:name`);
      }
    }
    for (const concept of config.concepts ?? []) {
      if (typeof concept?.slug === "string") put(`concepts/${concept.slug}`, concept.name, `concept:${concept.slug}:name`);
    }
    docsManifest(readJson("docs/config.json"), null, (slug) => `doc:${slug}:title`);
  } else if (kind === "docs") {
    for (const section of DOCS_SECTIONS) docsManifest(readJson(`${section}/config.json`), section, (slug) => `${section}:${slug}:title`);
  } else if (kind === "blog") {
    const config = readJson("config.json") ?? {};
    for (const post of config.posts ?? []) if (typeof post?.slug === "string") put(`posts/${post.slug}.md`, post.title, `post:${post.slug}:title`);
    for (const story of config.stories ?? []) if (typeof story?.slug === "string") put(`stories/${story.slug}.md`, story.title, `story:${story.slug}:title`);
  } else if (kind === "problem-specifications") {
    const tomls = entries.filter((entry) => /^exercises\/[^/]+\/metadata\.toml$/.test(entry.path));
    for (const entry of read(tomls)) {
      if (entry.text === null) continue;
      const slug = entry.path.split("/")[1];
      try {
        put(`exercises/${slug}`, readTomlStrings(entry.text, ["title"], entry.path).title, `exercise:${slug}:title`);
      } catch {
        // A title that cannot be read falls back to the slug.
      }
    }
  }
  return names;
}

// ---------------------------------------------------------------- Markdown --

const SECTIONS = {
  track: ["Practice exercises", "Concept exercises", "Concepts", "Track docs", "Shared exercise docs"],
  "problem-specifications": ["Exercises"],
  docs: DOCS_SECTIONS.map((section) => section[0].toUpperCase() + section.slice(1)),
  blog: ["Posts", "Stories"],
  "website-copy": ["Analyzer comments"]
};

/**
 * Where one path is shown: its section, the group it is listed under, and its
 * label within that group. A group is an exercise's or concept's directory, or
 * the file itself when a page stands alone, and it is also the key its display
 * name is stored under.
 */
export function describePath(kind, file) {
  const parts = file.split("/");
  const within = (depth) => ({ group: parts.slice(0, depth).join("/"), label: parts.slice(depth).join("/").replace(/^\.docs\//, "") });
  const alone = (section) => ({ section, group: file, label: parts[parts.length - 1] });
  if (kind === "track") {
    if (parts[0] === "exercises" && parts[1] === "practice") return { section: "Practice exercises", ...within(3) };
    if (parts[0] === "exercises" && parts[1] === "concept") return { section: "Concept exercises", ...within(3) };
    if (parts[0] === "exercises" && parts[1] === "shared") return alone("Shared exercise docs");
    if (parts[0] === "concepts") return { section: "Concepts", ...within(2) };
    if (parts[0] === "docs") return alone("Track docs");
  } else if (kind === "problem-specifications") {
    if (parts[0] === "exercises") return { section: "Exercises", ...within(2) };
  } else if (kind === "docs") {
    if (DOCS_SECTIONS.includes(parts[0])) return alone(parts[0][0].toUpperCase() + parts[0].slice(1));
  } else if (kind === "blog") {
    if (parts[0] === "posts") return alone("Posts");
    if (parts[0] === "stories") return alone("Stories");
  } else if (kind === "website-copy") {
    if (parts[0] === "analyzer-comments" && parts.length > 2) return { section: "Analyzer comments", ...within(2) };
  }
  return alone("Other files");
}

const FILE_ORDER = ["instructions.md", "instructions.append.md", "introduction.md", "introduction.append.md", "hints.md", "description.md", "about.md"];
const fileRank = (label) => (FILE_ORDER.includes(label) ? FILE_ORDER.indexOf(label) : FILE_ORDER.length);

const escapeText = (text) => String(text).replace(/\s+/g, " ").trim().replace(/([\\`*_[\]<>#|])/g, "\\$1");

export function languageName(locale) {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(locale) ?? locale;
  } catch {
    return locale;
  }
}

const repoLabel = (repo) => `exercism/${repo}`;

/** A link from index/markdown/<locale>/ to a file in the locale's content store. */
const storeLink = (locale, id, file) => `../../../locales/${locale}/content/${contentRelativePath(id, path.extname(file))}`;
const englishLink = (repo, file) => `https://github.com/exercism/${repo}/blob/main/${file.split("/").map(encodeURIComponent).join("/")}`;

/** One repo's page, from its index alone. */
export function renderRepo(index) {
  const { locale, repo, kind } = index;
  const language = languageName(locale);
  const sections = new Map();
  for (const [file, ids] of Object.entries(index.paths)) {
    const where = describePath(kind, file);
    if (!sections.has(where.section)) sections.set(where.section, new Map());
    const groups = sections.get(where.section);
    if (!groups.has(where.group)) groups.set(where.group, []);
    groups.get(where.group).push({ file, ids, label: where.label });
  }

  const order = [...(SECTIONS[kind] ?? []), "Other files"];
  const lines = [
    `# ${repoLabel(repo)} in ${language}`,
    "",
    `[All repositories](README.md)`,
    "",
    `Each English file is linked to its latest ${language} translation, followed by up to ${HISTORY_CAP - 1} earlier ones, newest first. ` +
      "Earlier translations are named by the start of the git blob id of the English they translate. " +
      "A file marked missing has no translation yet.",
    "",
    "This page is generated from " + `[the index](../../json/${locale}/${repo}.json)` + " by `scripts/build-index.mjs`. Edits made here are overwritten.",
    ""
  ];
  if (sections.size === 0) lines.push("Nothing from this repository is indexed yet.", "");

  for (const section of [...sections.keys()].sort((a, b) => order.indexOf(a) - order.indexOf(b) || byCodeUnit(a, b))) {
    lines.push(`## ${section}`, "");
    const groups = [...sections.get(section).entries()].map(([group, files]) => {
      const names = index.names[group] ?? {};
      const english = names.en ?? group.split("/").pop();
      return { group, files, english, local: names[locale] };
    });
    groups.sort((a, b) => byCodeUnit(a.english.toLowerCase(), b.english.toLowerCase()) || byCodeUnit(a.group, b.group));
    for (const { files, english, local } of groups) {
      lines.push(`### ${escapeText(english)}${local && local !== english ? ` (${escapeText(local)})` : ""}`, "");
      files.sort((a, b) => fileRank(a.label) - fileRank(b.label) || byCodeUnit(a.label, b.label));
      for (const { file, ids, label } of files) {
        const head = `- \`${label}\` ([English](${englishLink(repo, file)}))`;
        if (ids.length === 0) {
          lines.push(`${head}: missing`);
          continue;
        }
        lines.push(`${head}: [Latest](${storeLink(locale, ids[0], file)})`);
        for (const id of ids.slice(1)) lines.push(`  - [\`${id.slice(0, 10)}\`](${storeLink(locale, id, file)})`);
      }
      lines.push("");
    }
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

/** The locale's front page: a link to every indexed repo. */
export function renderReadme(locale, indexes) {
  const language = languageName(locale);
  const link = (index) => `- [${repoLabel(index.repo)}](${index.repo}.md)`;
  const sorted = [...indexes].sort((a, b) => byCodeUnit(a.repo, b.repo));
  const lines = [
    `# ${language} translation index`,
    "",
    `Exercism's ${language} translations, listed by the English file they translate. ` +
      `Each repository's page links every translatable file to its latest ${language} translation and up to ${HISTORY_CAP - 1} earlier ones.`,
    "",
    "Generated by `scripts/build-index.mjs` from `index/json/`. Edits made here are overwritten.",
    ""
  ];
  const singles = sorted.filter((index) => index.kind !== "track");
  const tracks = sorted.filter((index) => index.kind === "track");
  if (singles.length > 0) lines.push("## Exercism", "", ...singles.map(link), "");
  if (tracks.length > 0) lines.push("## Tracks", "", ...tracks.map(link), "");
  return `${lines.join("\n").trimEnd()}\n`;
}

/**
 * The Markdown files one locale's JSON produces, as `{ absolute path: text }`.
 * `repos` limits the repo pages to those named; the README is always included.
 */
export function expectedMarkdown(locale, repos = null) {
  const indexes = indexedRepos(locale).map((repo) => readIndex(locale, repo));
  const out = {};
  for (const index of indexes) if (!repos || repos.includes(index.repo)) out[markdownPath(locale, index.repo)] = renderRepo(index);
  out[readmePath(locale)] = renderReadme(locale, indexes);
  return out;
}

/** Writes one locale's Markdown (all of it, or the named repos and the README). Returns the files that changed. */
export function writeMarkdown(locale, repos = null) {
  const changed = [];
  for (const [file, text] of Object.entries(expectedMarkdown(locale, repos))) {
    if (fs.existsSync(file) && fs.readFileSync(file, "utf8") === text) continue;
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, text);
    changed.push(file);
  }
  return changed;
}

/** Saves one repo's index and regenerates its page and the README. Returns the files written. */
export function saveRepoIndex(index) {
  const written = writeIndex(index) ? [jsonPath(index.locale, index.repo)] : [];
  return [...written, ...writeMarkdown(index.locale, [index.repo])];
}

// ------------------------------------------------------------------- check --

/**
 * What is wrong with one locale's index: JSON that is malformed or not in its
 * canonical form, an id with no file in the store, a stray or hand-edited page.
 */
export function checkIndex(locale) {
  const problems = [];
  const repos = indexedRepos(locale);
  for (const repo of repos) {
    const file = path.relative(REPO_ROOT, jsonPath(locale, repo));
    let raw;
    try {
      raw = JSON.parse(fs.readFileSync(jsonPath(locale, repo), "utf8"));
    } catch (error) {
      problems.push(`${file}: not valid JSON (${error.message})`);
      continue;
    }
    if (raw.repo !== repo || raw.locale !== locale) problems.push(`${file}: names repo "${raw.repo}" and locale "${raw.locale}", but is filed as ${locale}/${repo}`);
    if (typeof raw.kind !== "string") problems.push(`${file}: has no kind`);
    for (const [source, ids] of Object.entries(raw.paths ?? {})) {
      if (!Array.isArray(ids) || ids.some((id) => !BLOB_ID.test(id))) {
        problems.push(`${file}: ${source} is not a list of blob ids`);
        continue;
      }
      if (ids.length > HISTORY_CAP) problems.push(`${file}: ${source} lists ${ids.length} ids, more than ${HISTORY_CAP}`);
      if (new Set(ids).size !== ids.length) problems.push(`${file}: ${source} lists an id twice`);
      for (const id of ids) {
        if (!fs.existsSync(contentPath(locale, id, path.extname(source)))) problems.push(`${file}: ${source} lists ${id}, which has no file under locales/${locale}/content/`);
      }
    }
    if (serialiseIndex(readIndex(locale, repo)) !== fs.readFileSync(jsonPath(locale, repo), "utf8")) problems.push(`${file}: not in canonical form (run node scripts/build-index.mjs ${locale})`);
  }
  const expected = expectedMarkdown(locale);
  for (const [file, text] of Object.entries(expected)) {
    const relative = path.relative(REPO_ROOT, file);
    if (!fs.existsSync(file)) problems.push(`${relative}: missing (run node scripts/build-index.mjs ${locale})`);
    else if (fs.readFileSync(file, "utf8") !== text) problems.push(`${relative}: differs from what its JSON generates (run node scripts/build-index.mjs ${locale})`);
  }
  if (fs.existsSync(markdownDir(locale))) {
    for (const name of fs.readdirSync(markdownDir(locale))) {
      const file = path.join(markdownDir(locale), name);
      if (!(file in expected)) problems.push(`${path.relative(REPO_ROOT, file)}: no JSON generates this file`);
    }
  }
  return problems;
}
