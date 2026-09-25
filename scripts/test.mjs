#!/usr/bin/env node
//
// test: assertions for the parts of this repo where a mistake would go
// unnoticed until it reached a user.
//
// Usage:
//   node scripts/test.mjs
//
// A plain script with plain assertions, like the rest of scripts/: no
// framework, run with `node scripts/test.mjs`, non-zero exit on failure. To add
// a test, add a `test(name, fn)` block.
//
// ## Two halves
//
// The first half tests pure functions in-process. The second builds a fixture
// in a temp directory (a small `website`, a small track and a small copy of
// this repo with real target locales, all real git repositories) and runs the
// real scripts over it as subprocesses, with EXERCISM_I18N_ROOT pointed at it.
// The fixture controls exactly which locales, catalogs and content exist, so
// the scripts are tested whatever the real `locales.json` and `locales/` hold.

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { SCRIPTS_ROOT, productionLocaleIssue } from "./lib/constants.mjs";
import { blobId, lsTree, readBlobs, refReader } from "./lib/git.mjs";
import { BundleSyntaxError, parseBundle } from "./lib/ts-object.mjs";
import { PLURAL_SPELLING, requiredCategories } from "./lib/plurals.mjs";
import { englishUnits, flattenCatalog, stringId, targetEntries, unflattenCatalog, unitHash, unitState, unitTouched } from "./lib/catalogs.mjs";
import { ERROR, WARN, checkCatalog, checkContentFile, placeholders, tags } from "./lib/checks.mjs";
import { ALLOWLIST_FILE, allowlistIssues, allowlistPath, allows, collapseUnitIds, renderIdentical, summariseIdentical } from "./lib/identical.mjs";
import { countNeverStamped, extraKeyRows, renderExtraKeys, summariseExtraKeys } from "./lib/extra-keys.mjs";
import { CONTENT_TYPES, CONTENT_TYPE_IDS, contentRelativePath, parseContentRelativePath, typeForPath } from "./lib/content-types.mjs";
import { REPO_KINDS, isActiveTrack, kindForRepo } from "./lib/source-repos.mjs";
import { missingContent, missingUnits, requiredContent, requiredUnits, translatableFiles } from "./lib/completeness.mjs";
import { SAMPLE, fixCommand, freshness, lastSweptAt, parseShard, shardOf, singletonRepos, standing, summariseRepo, summaryBody, summaryTitle, sweptRepos } from "./lib/sweep.mjs";
import { buildMetadataEnglish, changedCopyKeys, fileCopy, readTomlStrings } from "./lib/metadata.mjs";
import { buildWebsiteEnglish, globToRegExp, isWebsiteEnglishPath, loadExclusions } from "./lib/website-english.mjs";
import { findDeletions } from "./no-deletions.mjs";
import { HISTORY_CAP, describePath, displayNames, emptyIndex, recordTranslation, renderReadme, renderRepo, serialiseIndex, syncIndex } from "./lib/translation-index.mjs";
import { COMPARE_FILE_CAP, pushChanges, readPaths, readPrFiles, summarise, toMarkdown } from "./english-changes.mjs";
import { KINDS, languageList, marker, readBodies, replyBody, shouldPost } from "./pr-reply.mjs";

let failures = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(`  ok    ${name}`);
  } catch (error) {
    failures += 1;
    console.log(`  FAIL  ${name}\n        ${String(error.message).split("\n").join("\n        ")}`);
  }
}

const errorsOf = (issues) => issues.filter((found) => found.level === ERROR).map((found) => found.message);
const warningsOf = (issues) => issues.filter((found) => found.level === WARN).map((found) => found.message);

// ---------------------------------------------------------------- blob ids --

// The whole content store is addressed by this function. If it differed from
// git by one byte, every translation would be filed under a key nothing looks up.
await test("blobId agrees with git for known bytes", () => {
  assert.equal(blobId(""), "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391");
  assert.equal(blobId("hello\n"), "ce013625030ba8dba906f756967f9e9ca394464a");
  assert.equal(blobId(Buffer.from("héllo\n", "utf8")), execFileSync("git", ["hash-object", "--stdin"], { input: "héllo\n", encoding: "utf8" }).trim());
});

await test("a blob id round-trips through the fan-out path, and nothing else parses as one", () => {
  const id = "ce013625030ba8dba906f756967f9e9ca394464a";
  assert.equal(contentRelativePath(id, ".md"), "ce/01/3625030ba8dba906f756967f9e9ca394464a.md");
  assert.deepEqual(parseContentRelativePath("ce/01/3625030ba8dba906f756967f9e9ca394464a.md"), { id, extension: ".md" });
  assert.equal(parseContentRelativePath("ce/01/two-fer.md"), null);
  assert.equal(parseContentRelativePath("ce013625030ba8dba906f756967f9e9ca394464a.md"), null);
});

// ------------------------------------------------------------ the registry --

await test("every content type names a known repo kind, a unit and a pattern", () => {
  for (const id of CONTENT_TYPE_IDS) {
    const type = CONTENT_TYPES[id];
    assert.ok(type.kind in REPO_KINDS, `${id}: unknown kind ${type.kind}`);
    assert.ok(["file", "metadata"].includes(type.unit), `${id}: unit`);
    assert.ok(type.match instanceof RegExp && type.label, `${id}: match and label`);
  }
});

await test("a track's paths resolve to the right type, and code resolves to none", () => {
  assert.equal(typeForPath("track", "exercises/practice/two-fer/.docs/instructions.md"), "exercise-instructions");
  assert.equal(typeForPath("track", "exercises/concept/lasagna/.docs/instructions.append.md"), "exercise-instructions-append");
  assert.equal(typeForPath("track", "exercises/concept/lasagna/.docs/hints.md"), "exercise-hints");
  assert.equal(typeForPath("track", "concepts/strings/about.md"), "concept-about");
  assert.equal(typeForPath("track", "docs/INSTALLATION.md"), "track-docs");
  assert.equal(typeForPath("track", "exercises/practice/two-fer/two_fer.rb"), null);
  assert.equal(typeForPath("track", "exercises/concept/lasagna/.meta/design.md"), null);
  assert.equal(typeForPath("track", "README.md"), null);
  assert.equal(typeForPath("problem-specifications", "exercises/two-fer/description.md"), "problem-specification");
});

// Paths taken from the real trees these patterns were verified against
// (docs@862f7be0, blog@1df84cc2, website-copy@68cc3fc9), together with how the
// website ingests each. content-types.mjs has the counts and the reasoning.
await test("docs, blog and website-copy: what is served matches, what is not served does not", () => {
  assert.equal(typeForPath("docs", "using/contact.md"), "docs-using");
  assert.equal(typeForPath("docs", "building/tracks/README.md"), "docs-building");
  assert.equal(typeForPath("docs", "mentoring/how_to_give_great_feedback.md"), "docs-mentoring");
  for (const unserved of ["anatomy/tracks/config-json.md", "dev/badges.md", "README.md", "season-of-docs-proposal.md", "reference/templates/ci/ci.yml"]) {
    assert.equal(typeForPath("docs", unserved), null, unserved);
  }
  assert.equal(typeForPath("docs", "building/config.json"), null);
  assert.equal(typeForPath("docs", "building/config.json", { unit: "metadata" }), "docs-metadata");
  assert.equal(typeForPath("docs", "anatomy/config.json", { unit: "metadata" }), null);

  assert.equal(typeForPath("blog", "posts/a-post.md"), "blog-post");
  assert.equal(typeForPath("blog", "stories/a-story.md"), "community-story");
  assert.equal(typeForPath("blog", "posts/nested/x.md"), null);
  assert.equal(typeForPath("blog", "README.md"), null);
  assert.equal(typeForPath("blog", "config.json", { unit: "metadata" }), "blog-metadata");

  assert.equal(typeForPath("website-copy", "analyzer-comments/ruby/general/explicit_return.md"), "analyzer-comments");
  for (const unserved of ["tracks/ruby/exercises/two-fer/mentoring.md", "tracks/ruby/mentoring.md", "pages/about.md", "walkthrough/index.html", "automators.json", "licences/mit.md"]) {
    assert.equal(typeForPath("website-copy", unserved), null, unserved);
    assert.equal(typeForPath("website-copy", unserved, { unit: "metadata" }), null, unserved);
  }
});

// A config.json is never a `file` type (that would mean translating the whole
// file, almost none of which is copy). It always has a metadata type, because it
// is what a repo's metadata catalog is built from.
await test("config.json and metadata.toml are metadata types, never whole files", () => {
  assert.equal(typeForPath("track", "exercises/practice/two-fer/.meta/config.json"), null);
  assert.equal(typeForPath("track", "exercises/practice/two-fer/.meta/config.json", { unit: "metadata" }), "exercise-metadata");
  assert.equal(typeForPath("problem-specifications", "exercises/two-fer/metadata.toml", { unit: "metadata" }), "problem-specification-metadata");
});

// ----------------------------------------------------------------- metadata --

const TRACK_CONFIG = {
  language: "Ruby",
  slug: "ruby",
  blurb: "Ruby is dynamic.",
  tags: ["paradigm/functional"],
  key_features: [{ icon: "fun", title: "Happiness", content: "Ruby is fun." }],
  concepts: [{ uuid: "c1", slug: "strings", name: "Strings" }],
  exercises: {
    concept: [{ uuid: "e1", slug: "lasagna", name: "Lasagna", concepts: ["basics"] }],
    practice: [{ uuid: "e2", slug: "two-fer", name: "Two Fer", difficulty: 1 }]
  }
};
const trackFiles = (config = TRACK_CONFIG) => ({
  "config.json": JSON.stringify(config),
  "docs/config.json": JSON.stringify({ docs: [{ uuid: "d1", slug: "installation", path: "docs/INSTALLATION.md", title: "Installing Ruby", blurb: "How to install." }] }),
  "exercises/practice/two-fer/.meta/config.json": JSON.stringify({ blurb: "Create a sentence.", source: "A pairing session", source_url: "https://example.com", authors: ["x"] }),
  "exercises/concept/lasagna/.meta/config.json": JSON.stringify({ blurb: "Cook.", icon: "lasagna" }),
  "exercises/practice/unlisted/.meta/config.json": JSON.stringify({ blurb: "Never synced." }),
  "concepts/strings/.meta/config.json": JSON.stringify({ blurb: "About strings.", authors: [] })
});
const asTree = (files) => Object.keys(files).map((file) => ({ path: file, id: blobId(files[file]) }));
const asReader = (files) => (entries) => entries.map((entry) => ({ ...entry, text: files[entry.path] ?? null }));

await test("a track's metadata is exactly the copy the website shows, keyed by slug", () => {
  const files = trackFiles();
  const { catalog } = buildMetadataEnglish("track", asTree(files), asReader(files));
  assert.deepEqual(catalog, {
    "track:blurb": "Ruby is dynamic.",
    "key_feature:fun:title": "Happiness",
    "key_feature:fun:content": "Ruby is fun.",
    "exercise:lasagna:name": "Lasagna",
    "exercise:two-fer:name": "Two Fer",
    "concept:strings:name": "Strings",
    "exercise:lasagna:blurb": "Cook.",
    "exercise:two-fer:blurb": "Create a sentence.",
    "exercise:two-fer:source": "A pairing session",
    "concept:strings:blurb": "About strings.",
    "doc:installation:title": "Installing Ruby",
    "doc:installation:blurb": "How to install."
  });
  const text = JSON.stringify(catalog);
  assert.ok(!Object.values(catalog).includes("Ruby"), "the language name is a proper name, not copy");
  for (const data of ["paradigm", "example.com", "lasagna\"}", "Never synced", "INSTALLATION.md", "e1", "d1"]) assert.ok(!text.includes(data), `extracted data: ${data}`);
});

await test("a wip exercise is not translatable English; every other status is", () => {
  const statuses = { active: "Active", beta: "Beta", deprecated: "Deprecated", wip: "Wip", none: "None" };
  const entries = Object.entries(statuses).map(([status, name]) => ({ uuid: `u-${status}`, slug: status, name, ...(status === "none" ? {} : { status }) }));
  const config = { ...TRACK_CONFIG, exercises: { concept: [], practice: entries } };
  const files = { "config.json": JSON.stringify(config) };
  for (const status of Object.keys(statuses)) files[`exercises/practice/${status}/.meta/config.json`] = JSON.stringify({ blurb: `Blurb for ${status}.`, source: `Source for ${status}.` });
  const { catalog } = buildMetadataEnglish("track", asTree(files), asReader(files));

  for (const status of ["active", "beta", "deprecated", "none"]) {
    assert.equal(catalog[`exercise:${status}:name`], statuses[status], `${status} is shown to users, so its name is required`);
    assert.equal(catalog[`exercise:${status}:blurb`], `Blurb for ${status}.`);
    assert.equal(catalog[`exercise:${status}:source`], `Source for ${status}.`);
  }
  for (const field of ["name", "blurb", "source"]) assert.ok(!(`exercise:wip:${field}` in catalog), `wip is unfinished and unreachable, so its ${field} is not English anyone is waiting for`);

  // The queue reads the track's config.json on its own, so it has to agree.
  assert.ok(!("exercise:wip:name" in fileCopy("track-metadata", "config.json", JSON.stringify(config))));

  // A concept entry has no status in any track repo, so every one is required.
  const concepts = { ...TRACK_CONFIG, exercises: { concept: [], practice: [] }, concepts: [{ uuid: "c1", slug: "strings", name: "Strings", status: "wip" }] };
  const conceptFiles = { "config.json": JSON.stringify(concepts), "concepts/strings/.meta/config.json": JSON.stringify({ blurb: "About strings." }) };
  assert.equal(buildMetadataEnglish("track", asTree(conceptFiles), asReader(conceptFiles)).catalog["concept:strings:name"], "Strings");

  // The same exercises' whole files, which the registry matches by path.
  const withDocs = { ...files };
  for (const status of Object.keys(statuses)) withDocs[`exercises/practice/${status}/.docs/instructions.md`] = `# ${statuses[status]}\n`;
  const tree = asTree(withDocs);
  const read = asReader(withDocs);
  const paths = (found) => found.map((file) => file.path).sort();
  assert.deepEqual(
    paths(translatableFiles("track", tree, read)),
    ["active", "beta", "deprecated", "none"].map((status) => `exercises/practice/${status}/.docs/instructions.md`),
    "a wip exercise's instructions are as unreachable as its name"
  );
  assert.ok(paths(translatableFiles("track", tree)).includes("exercises/practice/wip/.docs/instructions.md"), "with no reader there is no config to ask, so every matched file is required");
  const unreadable = { ...withDocs, "config.json": "{nope" };
  assert.ok(paths(translatableFiles("track", asTree(unreadable), asReader(unreadable))).includes("exercises/practice/wip/.docs/instructions.md"), "an unreadable config.json marks nothing as wip");

  // An exercise that leaves wip requires its files: nothing required them before,
  // so nobody has translated them.
  const finished = { ...withDocs, "config.json": JSON.stringify({ ...config, exercises: { concept: [], practice: entries.map((entry) => (entry.slug === "wip" ? { ...entry, status: "active" } : entry)) } }) };
  const required = requiredContent("track", asTree(finished), tree, { read: asReader(finished), baseRead: read });
  assert.deepEqual(required.map((file) => file.path), ["exercises/practice/wip/.docs/instructions.md"]);
});

await test("reordering changes no key; a rename is new keys, and the old ones are simply no longer English", () => {
  const files = trackFiles();
  const before = buildMetadataEnglish("track", asTree(files), asReader(files)).catalog;
  const reordered = trackFiles({ ...TRACK_CONFIG, exercises: { practice: TRACK_CONFIG.exercises.practice, concept: TRACK_CONFIG.exercises.concept } });
  assert.deepEqual(new Set(Object.keys(buildMetadataEnglish("track", asTree(reordered), asReader(reordered)).catalog)), new Set(Object.keys(before)));

  const renamed = trackFiles({ ...TRACK_CONFIG, exercises: { ...TRACK_CONFIG.exercises, practice: [{ uuid: "e2", slug: "one-for-you", name: "Two Fer" }] } });
  renamed["exercises/practice/one-for-you/.meta/config.json"] = renamed["exercises/practice/two-fer/.meta/config.json"];
  const after = buildMetadataEnglish("track", asTree(renamed), asReader(renamed)).catalog;
  assert.deepEqual(requiredUnits("metadata", after, before).map((unit) => unit.id), ["exercise:one-for-you:name", "exercise:one-for-you:blurb", "exercise:one-for-you:source"]);
  const { issues, extra } = checkCatalog(after, before, { kind: "metadata", locale: "hu" });
  assert.deepEqual(errorsOf(issues), []);
  assert.deepEqual(extra, ["exercise:two-fer:name", "exercise:two-fer:blurb", "exercise:two-fer:source"]);
});

await test("an edited blurb is a stale unit, which is what blocks its PR", () => {
  const before = { "exercise:two-fer:blurb": "Create a sentence." };
  const after = { "exercise:two-fer:blurb": "Create a sentence of the form 'One for X'." };
  const required = requiredUnits("metadata", after, before);
  const held = { "exercise:two-fer:blurb": "Alkoss egy mondatot." };
  assert.deepEqual(missingUnits("metadata", required, held, { "exercise:two-fer:blurb": stringId(before["exercise:two-fer:blurb"]) }, "hu"), [{ unit: "exercise:two-fer:blurb", reason: "stale" }]);
});

await test("problem-specifications, docs and blog extract only their copy fields", () => {
  const ps = { "exercises/two-fer/metadata.toml": 'title = "Two Fer"\nblurb = "Create a \\"sentence\\"."\nsource_url = "https://example.com"\ndeep_dive_youtube_id = "abc"\n' };
  assert.deepEqual(buildMetadataEnglish("problem-specifications", asTree(ps), asReader(ps)).catalog, { "exercise:two-fer:title": "Two Fer", "exercise:two-fer:blurb": 'Create a "sentence".' });
  assert.throws(() => readTomlStrings('title = """\nmulti\n"""', ["title"], "x.toml"), /x\.toml:1/);

  const docs = { "using/config.json": JSON.stringify([{ uuid: "u", slug: "tracks/new/a.b", path: "using/a.md", title: "T", blurb: "" }]), "anatomy/config.json": JSON.stringify([{ slug: "x", title: "Never synced" }]) };
  assert.deepEqual(buildMetadataEnglish("docs", asTree(docs), asReader(docs)).catalog, { "using:tracks/new/a.b:title": "T" });

  const blog = { "config.json": JSON.stringify({ posts: [{ uuid: "p", slug: "hello", title: "Hello", marketing_copy: "Read it", author_handle: "iHiD", category: "updates" }], stories: [{ slug: "s", title: "Story", blurb: "B", youtube_id: "y" }] }) };
  assert.deepEqual(buildMetadataEnglish("blog", asTree(blog), asReader(blog)).catalog, { "post:hello:title": "Hello", "post:hello:marketing_copy": "Read it", "story:s:title": "Story", "story:s:blurb": "B" });
  assert.deepEqual(buildMetadataEnglish("website-copy", [], () => []).catalog, {});
});

await test("the queue tells a config.json edit that changes copy from one that does not", () => {
  const path_ = "exercises/practice/two-fer/.meta/config.json";
  const base = JSON.stringify({ blurb: "Old.", authors: ["a"] });
  const dataOnly = JSON.stringify({ blurb: "Old.", authors: ["a", "b"] });
  const copy = JSON.stringify({ blurb: "New.", authors: ["a"] });
  const blobs = new Map([base, dataOnly, copy].map((text) => [blobId(text), text]));
  const run = (head) => summarise("track", [{ path: path_, id: blobId(head) }], { baseTree: new Map([[path_, blobId(base)]]), readBlob: (id) => blobs.get(id) ?? null });
  assert.equal(run(dataOnly).count, 0);
  assert.deepEqual(run(copy).metadata[0].keys, ["exercise:two-fer:blurb"]);
  const blind = summarise("track", [{ path: path_, id: blobId(copy) }], { baseTree: new Map([[path_, blobId(base)]]) });
  assert.equal(blind.count, 1, "without the blobs the file is still reported: over-reporting is the safe direction");
  assert.deepEqual(blind.needs.sort(), [blobId(base), blobId(copy)].sort());
  assert.deepEqual(changedCopyKeys(fileCopy("exercise-metadata", path_, base), fileCopy("exercise-metadata", path_, copy)), ["exercise:two-fer:blurb"]);
  assert.match(toMarkdown(run(copy), { repoName: "ruby" }), /metadata\/ruby\.json.*\n[\s\S]*`exercise:two-fer:blurb`/);
});

await test("a track's own config.json says whether Exercism still runs it, and an unreadable one counts as active", () => {
  const activeWith = (config) => {
    const files = { "config.json": config };
    return isActiveTrack(asTree(files), asReader(files));
  };
  assert.equal(activeWith(JSON.stringify({ language: "Ruby", active: true })), true);
  assert.equal(activeWith(JSON.stringify({ language: "Sather", active: false })), false);
  assert.equal(activeWith(JSON.stringify({ language: "Ruby" })), true, "a config.json with no active key");
  assert.equal(activeWith("{nope"), true, "an unreadable config.json");
  assert.equal(isActiveTrack([], () => []), true, "a repo with no config.json");
});

await test("a repo name maps to its kind, and anything unnamed is a track", () => {
  assert.equal(kindForRepo("exercism/website"), "website");
  assert.equal(kindForRepo("exercism/problem-specifications"), "problem-specifications");
  assert.equal(kindForRepo("exercism/ruby"), "track");
  assert.equal(kindForRepo("exercism/track"), "track");
});

// -------------------------------------------------------- bundles, as data --

await test("a bundle parses without being executed: quotes, escapes, nesting, comments, +", () => {
  const { value } = parseBundle(`// namespace: x\nexport default {\n  'a.b': 'It\\'s {{count}}',\n  "c": "two " +\n    'lines',\n  nested: { d: 'deep', },\n  /* block */ 'e': '\\u00e9',\n}\n`);
  assert.deepEqual(value, { "a.b": "It's {{count}}", c: "two lines", nested: { d: "deep" }, e: "é" });
});

await test("index.ts yields imports and namespace references, shorthand included", () => {
  const { imports, value } = parseBundle(`import aa from './one'\nimport ab from './two.tsx'\nexport default {\n  'components/one': aa,\n  'components/very/long':\n    ab,\n}\n`);
  assert.deepEqual(imports, { aa: "./one", ab: "./two.tsx" });
  assert.deepEqual(value, { "components/one": { $ref: "aa" }, "components/very/long": { $ref: "ab" } });
});

// The parser must fail on anything it does not understand. A skipped construct
// would drop keys from English, and a key English does not list is never
// required.
await test("anything outside the subset is a hard failure naming the line", () => {
  assert.throws(() => parseBundle("export default { a: `template` }", "x.ts"), BundleSyntaxError);
  assert.throws(() => parseBundle("export default { a: t('x') }", "x.ts"), BundleSyntaxError);
  assert.throws(() => parseBundle("export default { ...other }", "x.ts"), BundleSyntaxError);
  assert.throws(() => parseBundle("export default { a: 'x', a: 'y' }", "x.ts"), /duplicate key/);
  assert.throws(() => parseBundle("const x = 1", "x.ts"), /x\.ts:1/);
});

// ------------------------------------------------------------------ plurals --

await test("required categories come from CLDR, per locale", () => {
  assert.deepEqual(requiredCategories("ja"), ["other"]);
  assert.deepEqual(requiredCategories("hu"), ["one", "other"]);
  assert.deepEqual(requiredCategories("pl"), ["one", "few", "many", "other"]);
  assert.deepEqual(requiredCategories("ar"), ["zero", "one", "two", "few", "many", "other"]);
  assert.equal(requiredCategories("xx-not-a-locale"), null);
});

const BACKEND_EN = {
  "nav.home": "Home",
  "slots.filled.one": "1 slot filled",
  "slots.filled.other": "%{count} slots filled",
  "cta_html": 'Or <a href="%{path}" class="link">donate</a> now.',
  "reasons.spam": "Spam",
  "reasons.other": "Other",
  "perks.0": "Dark mode",
  "perks.1": "More slots"
};

await test("a plural group is one unit; a hash that merely contains `other` is not one", () => {
  const units = englishUnits("backend", BACKEND_EN);
  assert.ok(units.get("slots.filled.*").plural);
  assert.deepEqual(units.get("slots.filled.*").keys, ["slots.filled.one", "slots.filled.other"]);
  assert.ok(units.has("reasons.other") && !units.get("reasons.other").plural);
  assert.equal(units.size, 7);
});

await test("frontend groups are suffix-spelled, ordinals are their own group, `step_one` is an ordinary key", () => {
  const flat = { "ns:item_one": "{{count}} item", "ns:item_other": "{{count}} items", "ns:place_ordinal_one": "{{count}}st", "ns:place_ordinal_other": "{{count}}th", "ns:step_one": "Step one" };
  const units = englishUnits("frontend", flat);
  assert.deepEqual([...units.keys()].sort(), ["ns:item_*", "ns:place_ordinal_*", "ns:step_one"]);
  assert.equal(PLURAL_SPELLING.frontend.join("ns:item", "few"), "ns:item_few");
});

// Parity in this repo depends on this: a target language can legitimately hold
// different plural keys from English.
await test("Polish holding one/few/many/other against English's one/other is complete, with no extra keys", () => {
  const target = { ...BACKEND_EN, "slots.filled.one": "1 miejsce", "slots.filled.few": "%{count} miejsca", "slots.filled.many": "%{count} miejsc", "slots.filled.other": "%{count} miejsca" };
  const { issues, missing, extra } = checkCatalog(BACKEND_EN, target, { kind: "backend", locale: "pl" });
  assert.deepEqual(errorsOf(issues), []);
  assert.deepEqual([missing, extra], [[], []]);
});

await test("Japanese holding `other` alone is complete", () => {
  const target = { ...BACKEND_EN };
  delete target["slots.filled.one"];
  assert.deepEqual(errorsOf(checkCatalog(BACKEND_EN, target, { kind: "backend", locale: "ja" }).issues), []);
});

await test("Polish holding only English's two categories is an ERROR naming the ones it lacks", () => {
  const errors = errorsOf(checkCatalog(BACKEND_EN, BACKEND_EN, { kind: "backend", locale: "pl" }).issues);
  assert.equal(errors.length, 2);
  assert.match(errors[0], /missing "few".*slots\.filled\.few/);
});

await test("a category the grammar never reaches is a WARN; `zero` is allowed everywhere", () => {
  const target = { ...BACKEND_EN, "slots.filled.zero": "No slots", "slots.filled.few": "%{count} x" };
  const { issues } = checkCatalog(BACKEND_EN, target, { kind: "backend", locale: "hu" });
  assert.deepEqual(errorsOf(issues), []);
  assert.ok(warningsOf(issues).some((message) => /holds "few"/.test(message)));
  assert.ok(!warningsOf(issues).some((message) => /holds "zero"/.test(message)));
});

await test("a group's category may use any placeholder the English group has, and `other` must keep them all", () => {
  const ok = { ...BACKEND_EN, "slots.filled.one": "%{count} hely" };
  assert.deepEqual(errorsOf(checkCatalog(BACKEND_EN, ok, { kind: "backend", locale: "hu" }).issues), []);
  const dropped = { ...BACKEND_EN, "slots.filled.other": "sok hely" };
  assert.match(errorsOf(checkCatalog(BACKEND_EN, dropped, { kind: "backend", locale: "hu" }).issues)[0], /dropped placeholder.*%\{count\}/);
  const invented = { ...BACKEND_EN, "slots.filled.one": "%{number} hely" };
  assert.match(errorsOf(checkCatalog(BACKEND_EN, invented, { kind: "backend", locale: "hu" }).issues)[0], /no English category has.*%\{number\}/);
});

// ------------------------------------------------- byte-identical reporting --
//
// One editorial fact reported once per catalog per locale drowned the run: 1695
// of 1721 warnings were this one check, and eight exercises' `source` fields
// were most of them. What is checked did not change. The occurrences are
// grouped by the English string, and a string a reviewer has signed off in
// identical-english.json is counted and not printed (scripts/lib/identical.mjs).

const AUTHORS = "Christian Willner, Eric Willigers";
const KATA = "Software Craftsmanship - Coin Change Kata";

// What validate hands the reporting layer: one result per catalog.
const identicalResult = (locale, type, units, text) => ({
  locale,
  type,
  issues: units.map((unit) => ({ level: WARN, message: `${unit}: byte-identical to English (may be untranslated, may be legitimate)`, unit, identical: { id: stringId(text), text } }))
});

await test("a byte-identical warning carries the English string and its blob id, so it can be grouped", () => {
  const english = { "exercise:eliuds-eggs:source": AUTHORS, "exercise:eliuds-eggs:blurb": "Count the eggs in each nest." };
  const { issues } = checkCatalog(english, { ...english, "exercise:eliuds-eggs:blurb": "Számold meg a tojásokat." }, { kind: "metadata", locale: "hu" });
  const identical = issues.filter((found) => found.identical);
  assert.equal(identical.length, 1);
  assert.deepEqual(identical[0].identical, { id: stringId(AUTHORS), text: AUTHORS });
  assert.match(identical[0].message, /^exercise:eliuds-eggs:source: byte-identical/);
});

await test("occurrences of one English string are one group, however many catalogs and unit ids they came from", () => {
  const results = [
    identicalResult("hu", "metadata/ruby", ["exercise:resistor-color:source", "exercise:resistor-color-duo:source"], AUTHORS),
    identicalResult("hu", "metadata/python", ["exercise:resistor-color:source"], AUTHORS),
    identicalResult("fr", "metadata/ruby", ["exercise:resistor-color:source"], AUTHORS)
  ];
  const { groups } = summariseIdentical(results);
  assert.deepEqual(groups.map((group) => [group.locale, group.catalogs.size, group.occurrences, group.unitId]), [
    ["hu", 2, 3, "exercise:*:source"],
    ["fr", 1, 1, "exercise:resistor-color:source"]
  ]);
  assert.match(renderIdentical({ groups, allowed: [], unmatched: [] }).join("\n"), /hu\s+2 catalog\(s\)\s+exercise:\*:source\s+"Christian Willner, Eric Willigers"/);
});

await test("ids that do not line up segment for segment are not collapsed into a star", () => {
  assert.equal(collapseUnitIds(["exercise:leap:source"]), "exercise:leap:source");
  assert.equal(collapseUnitIds(["exercise:leap:source", "exercise:grains:source"]), "exercise:*:source");
  assert.equal(collapseUnitIds(["exercise:leap:source", "nav.home"]), "exercise:leap:source (+1 more)");
});

await test("a signed-off string is counted and not printed, and editing its English brings it back", () => {
  const allowlist = new Map([[stringId(AUTHORS), { text: AUTHORS, reason: "Attribution.", added: "2026-09-24", by: "iHiD" }]]);
  const results = [identicalResult("hu", "metadata/ruby", ["exercise:eliuds-eggs:source"], AUTHORS)];
  const signed = summariseIdentical(results, allowlist);
  assert.deepEqual(signed.groups, []);
  assert.equal(signed.allowed.length, 1);
  assert.deepEqual(signed.unmatched, []);
  assert.match(renderIdentical(signed).join("\n"), /1 group\(s\) \(1 occurrence\(s\)\) are signed off/);

  // The same names with a sentence around them are a different string, so a
  // different blob id, so nothing signed off covers it.
  const edited = summariseIdentical([identicalResult("hu", "metadata/ruby", ["exercise:eliuds-eggs:source"], `Written by ${AUTHORS}`)], allowlist);
  assert.equal(edited.groups.length, 1);
  assert.equal(edited.allowed.length, 0);
});

await test("an entry covers every locale unless it names some", () => {
  const entry = { text: KATA, reason: "A kata's title.", added: "2026-09-24", by: "iHiD" };
  assert.ok(allows(entry, "hu") && allows(entry, "fr"));
  assert.ok(allows({ ...entry, locales: ["fr"] }, "fr"));
  assert.ok(!allows({ ...entry, locales: ["fr"] }, "hu"));
  assert.ok(!allows(undefined, "hu"));
});

await test("an entry that matched nothing in the run is reported, because it hides nothing", () => {
  const allowlist = new Map([[stringId(KATA), { text: KATA, reason: "A kata's title.", added: "2026-09-24", by: "iHiD" }]]);
  const summary = summariseIdentical([identicalResult("hu", "metadata/ruby", ["exercise:eliuds-eggs:source"], AUTHORS)], allowlist);
  assert.deepEqual(summary.unmatched.map((entry) => entry.text), [KATA]);
  // A run of one locale or one type has been shown nothing about an entry.
  assert.doesNotMatch(renderIdentical(summary).join("\n"), /matched nothing/);
  assert.match(renderIdentical(summary, { reportUnmatched: true }).join("\n"), /1 entry\/entries matched nothing/);
});

await test("the allowlist's shape is checked, so a hand edit cannot quietly hide a different string", () => {
  const entry = { text: AUTHORS, reason: "Attribution.", added: "2026-09-24", by: "iHiD" };
  assert.deepEqual(allowlistIssues({ allowed: { [stringId(AUTHORS)]: entry } }), []);
  assert.deepEqual(allowlistIssues({ allowed: { [stringId(AUTHORS)]: { ...entry, locales: ["hu"] } } }), []);

  const edited = allowlistIssues({ allowed: { [stringId(AUTHORS)]: { ...entry, text: KATA } } });
  assert.equal(edited.length, 1);
  assert.match(edited[0], /the id and the text disagree/);
  assert.match(allowlistIssues({ allowed: { [stringId(AUTHORS)]: { ...entry, locale: "hu" } } })[0], /unknown field "locale"/);
  assert.match(allowlistIssues({ allowed: { [stringId(AUTHORS)]: { ...entry, locales: [] } } })[0], /non-empty array of locale codes/);
  assert.match(allowlistIssues({ allowed: { [stringId(AUTHORS)]: { ...entry, locales: ["xx"] } } })[0], /not a target locale/);
  assert.match(allowlistIssues({ allowed: { "not-a-blob-id": entry } })[0], /not a blob id/);
  assert.match(allowlistIssues({ allowed: { [stringId(AUTHORS)]: { ...entry, reason: "  " } } })[0], /"reason" must be a non-empty string/);
  assert.match(allowlistIssues({ entries: {} })[0], /must have an "allowed" object/);
});

await test("a content file identical to its English carries its own bytes, so the same allowlist covers it", () => {
  // The file's blob id is the id it is filed under, which is what an allowlist
  // entry is keyed by, so nothing about the entry's shape changes for a file.
  const text = "%{comment}\n";
  const id = blobId(text);
  const found = checkContentFile({ id, extension: ".md", bytes: Buffer.from(text, "utf8") });
  const identical = found.filter((one) => one.identical);
  assert.equal(identical.length, 1);
  assert.deepEqual(identical[0].identical, { id, text });
  assert.equal(stringId(text), id);

  // A translated file is not reported at all, so there is nothing to sign off.
  const translated = Buffer.from("# Utasítások\n", "utf8");
  assert.deepEqual(checkContentFile({ id: blobId("# Instructions\n"), extension: ".md", bytes: translated }).filter((one) => one.identical), []);
});

await test("keys English does not have are one line per catalog, with the count as the signal", () => {
  const extra = (locale, type, keys) => ({ locale, type, issues: keys.map((key) => ({ level: WARN, message: `key not in English: ${key} (…)`, extraKey: key })) });
  const groups = summariseExtraKeys([
    extra("hu", "metadata/ruby", ["exercise:lasagna:name"]),
    extra("fr", "website-frontend", ["a.one", "a.two", "a.three"]),
    { locale: "el", type: "content", issues: [{ level: WARN, message: "something else" }] }
  ]);
  assert.deepEqual(groups.map((group) => [group.locale, group.type, group.keys.length]), [
    ["fr", "website-frontend", 3],
    ["hu", "metadata/ruby", 1]
  ]);
  const printed = renderExtraKeys(groups).join("\n");
  assert.match(printed, /Keys not in English: 4 in 2 catalog\(s\) \(fr 3, hu 1\)/);
  assert.match(printed, /website-frontend\s+3 key\(s\)\s+fr/);
  assert.doesNotMatch(printed, /exercise:lasagna:name/, "a group printed the ids it was meant to replace");
  assert.deepEqual(renderExtraKeys([]), []);

  // One upstream rename leaves the same orphans in every locale, so that is one
  // line naming them, and a locale whose set differs still gets its own.
  const shared = extraKeyRows(summariseExtraKeys([
    extra("hu", "metadata/kotlin", ["exercise:lasagna:name", "exercise:lasagna:blurb"]),
    extra("fr", "metadata/kotlin", ["exercise:lasagna:blurb", "exercise:lasagna:name"]),
    extra("el", "metadata/kotlin", ["exercise:lasagna:name", "exercise:pacman:name"])
  ]));
  assert.deepEqual(shared.map((row) => [row.type, row.count, row.locales]), [
    ["metadata/kotlin", 2, ["el"]],
    ["metadata/kotlin", 2, ["fr", "hu"]]
  ]);
});

await test("an extra key that has never been stamped is not grouped away, because one command each ends it", () => {
  // The two cases are opposites: hundreds of stamped orphans nobody acts on key
  // by key, and the rare one that blocks a PR in another repo until it is
  // stamped. Grouping the second would drop the key, locale and type its
  // command is built from.
  const results = [{
    locale: "hu",
    type: "website-backend",
    issues: [
      { level: WARN, message: "key not in English: nav.old (…)", extraKey: "nav.old" },
      { level: WARN, message: "key not in English and never stamped: nav.email_label. … --source-ref=<that PR's head sha>", extraKey: "nav.email_label", neverStamped: true }
    ]
  }];
  const groups = summariseExtraKeys(results);
  assert.deepEqual(groups.map((group) => group.keys), [["nav.old"]]);
  assert.equal(countNeverStamped(results), 1);

  // The block says how many printed their own line, so the two numbers add up
  // to every extra key the run found.
  const printed = renderExtraKeys(groups, { neverStamped: 1 }).join("\n");
  assert.match(printed, /Keys not in English: 1 in 1 catalog\(s\) \(hu 1\)/);
  assert.match(printed, /1 further key\(s\).*never been stamped and one command each ends them/);
  assert.doesNotMatch(renderExtraKeys(groups).join("\n"), /further key\(s\)/);
});

await test("a clause that opens with a comma keeps no leading space, and every other whitespace difference is still reported", () => {
  const english = { "intro.after_link": " built by people from all backgrounds." };
  const warnings = (value) => checkCatalog(english, { "intro.after_link": value }, { kind: "backend", locale: "hu" }).issues.filter((one) => one.level === WARN).map((one) => one.message);

  // hu's real translation: "Exercism, amelyet …". No language writes "Exercism ,".
  assert.deepEqual(warnings(", amelyet emberek építenek."), []);
  assert.deepEqual(warnings(". Emberek építik."), []);
  // A dropped space before a word joins two words together, which is the defect
  // the check is for.
  assert.equal(warnings("amelyet emberek építenek.").length, 1);
  // A colon and a semicolon are not excused: French puts a space before both.
  assert.equal(warnings(": construit par des personnes.").length, 1);
  // A trailing difference is reported whatever the translation opens with, and a
  // plain space where English has a non-breaking one is a difference.
  assert.equal(warnings(", amelyet emberek építenek. ").length, 1);
  const nbsp = { "notice.updated": "This exercise has been updated.\u00a0" };
  assert.equal(checkCatalog(nbsp, { "notice.updated": "Ez a feladat frissült. " }, { kind: "backend", locale: "hu" }).issues.filter((one) => one.level === WARN).length, 1);
});

await test("the allowlist this repo ships is sound", () => {
  const file = allowlistPath(SCRIPTS_ROOT);
  if (!fs.existsSync(file)) return;
  assert.deepEqual(allowlistIssues(JSON.parse(fs.readFileSync(file, "utf8"))), [], ALLOWLIST_FILE);
});

// ------------------------------------------------------------------- parity --

await test("missing is a counted state by default and an ERROR only when required", () => {
  const target = { "nav.home": "Kezdőlap" };
  const relaxed = checkCatalog(BACKEND_EN, target, { kind: "backend", locale: "hu" });
  assert.deepEqual(errorsOf(relaxed.issues), []);
  assert.equal(relaxed.missing.length, 6);
  const strict = checkCatalog(BACKEND_EN, target, { kind: "backend", locale: "hu", requireComplete: true });
  assert.equal(errorsOf(strict.issues).length, 6);
});

await test("an extra key is a WARN that names it, never an error", () => {
  const { issues, extra } = checkCatalog(BACKEND_EN, { ...BACKEND_EN, "nav.early": "Korai" }, { kind: "backend", locale: "hu" });
  assert.deepEqual(errorsOf(issues), []);
  assert.deepEqual(extra, ["nav.early"]);
  assert.ok(warningsOf(issues).some((message) => message.includes("nav.early")));
});

await test("each catalog has its own interpolation syntax, and the other's is just text", () => {
  assert.deepEqual(placeholders("backend", "Hi %{name}, {{not}} %<n>d"), ["%<n>d", "%{name}"]);
  assert.deepEqual(placeholders("frontend", "Hi {{ name }}, %{not} {{count, number}} $t(a.b)"), ["$t(a.b)", "{{count,number}}", "{{name}}"]);
});

await test("a changed placeholder or tag is an ERROR; a changed attribute is a WARN", () => {
  const renamed = checkCatalog(BACKEND_EN, { ...BACKEND_EN, cta_html: 'Vagy <a href="%{url}" class="link">adj</a>.' }, { kind: "backend", locale: "hu" });
  assert.match(errorsOf(renamed.issues)[0], /cta_html: placeholders changed/);
  const stripped = checkCatalog(BACKEND_EN, { ...BACKEND_EN, cta_html: "Vagy adj %{path}." }, { kind: "backend", locale: "hu" });
  assert.match(errorsOf(stripped.issues)[0], /cta_html: tags changed/);
  const restyled = checkCatalog(BACKEND_EN, { ...BACKEND_EN, cta_html: 'Vagy <a href="%{path}">adj</a> most.' }, { kind: "backend", locale: "hu" });
  assert.deepEqual(errorsOf(restyled.issues), []);
  assert.ok(warningsOf(restyled.issues).some((message) => /attributes differ/.test(message)));
});

await test("<Trans> tags are compared by name: indexed, named, and the bundles' own `<0/>`", () => {
  assert.deepEqual(tags("<0>a</0> <strong>b</strong> <1>c<1/>").map((tag) => tag.name), ["0", "0", "strong", "strong", "1", "1"]);
  const english = { "ns:k": "Use <0>{{name}} Dashboard<0/>." };
  assert.deepEqual(errorsOf(checkCatalog(english, { "ns:k": "A <0>{{name}} irányítópult</0>." }, { kind: "frontend", locale: "hu" }).issues), []);
  assert.match(errorsOf(checkCatalog(english, { "ns:k": "A {{name}} irányítópult." }, { kind: "frontend", locale: "hu" }).issues)[0], /tags changed/);
});

await test("catalogs flatten and unflatten to the on-disk shapes, arrays included", () => {
  const tree = { nav: { home: "Home" }, perks: ["a", "b"] };
  const flat = flattenCatalog("backend", tree);
  assert.deepEqual(flat, { "nav.home": "Home", "perks.0": "a", "perks.1": "b" });
  assert.deepEqual(unflattenCatalog("backend", flat, new Set(["perks"])), tree);
  const frontend = { "components/x.tsx": { "a.b": "A" } };
  assert.deepEqual(flattenCatalog("frontend", frontend), { "components/x.tsx:a.b": "A" });
  assert.deepEqual(unflattenCatalog("frontend", { "components/x.tsx:a.b": "A" }), frontend);
});

// -------------------------------------------------------------------- stamps --

await test("a unit's hash is the blob id of its English, so editing English makes it stale", () => {
  const units = englishUnits("backend", BACKEND_EN);
  const home = units.get("nav.home");
  assert.equal(unitHash(home), stringId("Home"));
  assert.equal(stringId("Home"), blobId("Home"));
  const held = targetEntries("backend", home, { "nav.home": "Kezdőlap" });
  assert.equal(unitState(home, held, {}), "unstamped");
  assert.equal(unitState(home, held, { "nav.home": unitHash(home) }), "done");
  assert.equal(unitState(home, held, { "nav.home": stringId("Homepage") }), "stale");
  assert.equal(unitState(home, {}, { "nav.home": unitHash(home) }), "missing");
  const group = units.get("slots.filled.*");
  const edited = englishUnits("backend", { ...BACKEND_EN, "slots.filled.one": "One slot filled" }).get("slots.filled.*");
  assert.notEqual(unitHash(group), unitHash(edited));
});

await test("a change touches a unit through the target's own keys, categories English has not included", () => {
  const units = englishUnits("backend", BACKEND_EN);
  assert.equal(unitTouched("backend", units.get("nav.home"), new Set(["nav.home"])), true);
  assert.equal(unitTouched("backend", units.get("nav.home"), new Set(["nav.about"])), false);
  const group = units.get("slots.filled.*");
  assert.equal(unitTouched("backend", group, new Set(["slots.filled.other"])), true);
  // Polish writes a category English does not have, and rewriting it is still
  // a change to the group.
  assert.equal(unitTouched("backend", group, new Set(["slots.filled.many"])), true);
  assert.equal(unitTouched("backend", group, new Set(["slots.filled"])), false);
  const frontend = englishUnits("frontend", { "ns:items_one": "1 item", "ns:items_other": "{{count}} items" });
  assert.equal(unitTouched("frontend", frontend.get("ns:items_*"), new Set(["ns:items_many"])), true);
});

// ------------------------------------------------------------- completeness --

const ID_A = blobId("# Two Fer\n");
const ID_B = blobId("# Two Fer, edited\n");

await test("a PR requires the blobs it adds or edits, and nothing it renames or leaves alone", () => {
  const base = [{ path: "exercises/practice/two-fer/.docs/instructions.md", id: ID_A }, { path: "docs/ABOUT.md", id: blobId("about") }];
  const head = [{ path: "exercises/practice/two-fer/.docs/instructions.md", id: ID_B }, { path: "docs/ABOUT-moved.md", id: blobId("about") }, { path: "lib/x.rb", id: blobId("code") }];
  assert.deepEqual(requiredContent("track", head, base).map((file) => file.id), [ID_B]);
  assert.equal(requiredContent("track", head).length, 2);
});

await test("content is complete when a file exists for the blob id with the source's extension", () => {
  const required = requiredContent("track", [{ path: "docs/ABOUT.md", id: ID_A }, { path: "docs/COPY.md", id: ID_A }]);
  assert.equal(missingContent(required, new Map([[ID_A, ".md"]])).length, 0);
  const missing = missingContent(required, new Map([[ID_A, ".json"]]));
  assert.deepEqual(missing.map((file) => file.duplicate), [false, true]);
  assert.equal(missing[0].store, contentRelativePath(ID_A, ".md"));
});

await test("an English EDIT blocks: present and stamped against the old text is not complete", () => {
  const before = { "nav.home": "Home", "nav.about": "About" };
  const after = { "nav.home": "Homepage", "nav.about": "About", "nav.new": "New" };
  const required = requiredUnits("backend", after, before);
  assert.deepEqual(required.map((unit) => unit.id), ["nav.home", "nav.new"]);
  const target = { "nav.home": "Kezdőlap", "nav.about": "Rólunk" };
  const stamps = { "nav.home": stringId("Home"), "nav.about": stringId("About") };
  assert.deepEqual(missingUnits("backend", required, target, stamps, "hu"), [{ unit: "nav.home", reason: "stale" }, { unit: "nav.new", reason: "missing" }]);
  assert.deepEqual(missingUnits("backend", required, { ...target, "nav.new": "Új" }, { ...stamps, "nav.home": stringId("Homepage"), "nav.new": stringId("New") }, "hu"), []);
});

// ---------------------------------------------------------------- the sweep --
//
// The per-PR check is evaluated against the world at check time and cannot stay
// true until the PR merges. The sweep asks the same question of each source
// repo's `main` instead, so these assertions are about covering every repo,
// splitting the work, and an answer that says plainly when it is not one.

const SWEPT_AT = "2026-09-23T05:17:00.000Z";
const entryFor = (repo, kind, required, outstanding, sample = []) => ({ repo, kind, required, head: "0".repeat(40), locales: { hu: { outstanding, sample } } });

await test("sweep: every singleton repo the registry names is covered, plus a repo per track", () => {
  const repos = sweptRepos(["ruby", "python"]);
  const names = repos.map((repo) => repo.name);
  for (const singleton of singletonRepos()) assert.ok(names.includes(singleton.name), `${singleton.name} is not swept`);
  assert.ok(names.includes("exercism/ruby") && names.includes("exercism/python"));
  assert.deepEqual(names, [...names].sort(), "the order is not fixed");
  // A track-topic repo that is already a singleton keeps its own kind, and is swept once.
  const clash = sweptRepos(["docs"]);
  assert.equal(clash.filter((repo) => repo.name === "exercism/docs").length, 1);
  assert.equal(clash.find((repo) => repo.name === "exercism/docs").kind, "docs");
  // The names reach a fetch URL, so they are checked rather than trusted.
  assert.throws(() => sweptRepos(["../../etc"]), /is not a repo name/);
});

await test("sweep: sharding deals every repo exactly once, and a shard outside the run is refused", () => {
  const repos = sweptRepos(Array.from({ length: 119 }, (_, position) => `track-${position}`));
  const total = 8;
  const dealt = Array.from({ length: total }, (_, position) => shardOf(repos, { index: position + 1, total }));
  assert.deepEqual(dealt.flat().map((repo) => repo.name).sort(), repos.map((repo) => repo.name).sort());
  const sizes = dealt.map((shard) => shard.length);
  assert.ok(Math.max(...sizes) - Math.min(...sizes) <= 1, `shards are uneven: ${sizes.join(", ")}`);
  assert.deepEqual(parseShard("3/8"), { index: 3, total: 8 });
  assert.throws(() => parseShard("9/8"), /out of range/);
  assert.throws(() => parseShard("all"), /must be <index>\/<total>/);
});

await test("sweep: a repo's report is cut down to counts and a few examples", () => {
  const lines = Array.from({ length: 12 }, (_, position) => ({ what: `file-${position}.md (exercise-instructions)`, why: "no locales/hu/content/x" }));
  const entry = summariseRepo({ repo: "exercism/ruby", kind: "track", head: "abc", required: { content: 300, metadata: 404 }, locales: { hu: lines } }, ["hu"]);
  assert.equal(entry.required, 704);
  assert.equal(entry.locales.hu.outstanding, 12);
  assert.equal(entry.locales.hu.sample.length, SAMPLE);
  assert.equal(entry.locales.hu.sample[0], "file-0.md (exercise-instructions)");
});

await test("sweep: part translated, not started and nothing to translate are three different answers", () => {
  assert.equal(standing(entryFor("exercism/ruby", "track", 704, 0), "hu"), "complete");
  assert.equal(standing(entryFor("exercism/ruby", "track", 704, 12), "hu"), "started");
  assert.equal(standing(entryFor("exercism/zig", "track", 704, 704), "hu"), "untouched");
  // A repo carrying the track topic that holds no translatable English at all is
  // neither progress nor a gap, and calling it complete would be a lie.
  assert.equal(standing(entryFor("exercism/tooling", "track", 0, 0), "hu"), "empty");
  assert.equal(fixCommand(entryFor("exercism/ruby", "track", 1, 1), "hu"), "node scripts/translate.mjs track ruby hu");
  assert.equal(fixCommand(entryFor("exercism/docs", "docs", 1, 1), "hu"), "node scripts/translate.mjs docs hu");
});

await test("sweep: the body carries the date it was written, and warns when the sweep before it is old", () => {
  const entries = [entryFor("exercism/ruby", "track", 704, 12, ["docs/ABOUT.md (track-docs)"]), entryFor("exercism/zig", "track", 500, 500)];
  const body = summaryBody({ entries, locales: ["hu"], sweptAt: SWEPT_AT });
  assert.equal(lastSweptAt(body), SWEPT_AT, "the body does not say when it was written");
  assert.match(body, /## Part translated \(1\)/);
  assert.match(body, /## Not started \(1\)/);
  assert.match(body, /node scripts\/translate\.mjs track ruby hu/);
  assert.ok(!/WARNING/.test(body), "a healthy run warns about nothing");

  // A schedule that stopped and started again leaves a gap, and the run that
  // finds it is the only thing that can report it.
  const stale = summaryBody({ entries, locales: ["hu"], sweptAt: SWEPT_AT, previousSweptAt: "2026-09-13T05:17:00.000Z" });
  assert.match(stale, /\[!WARNING\][\s\S]*ran 10 days ago/);
  assert.deepEqual(freshness(null, SWEPT_AT), { hours: null, days: null, stale: false });
  assert.equal(freshness("2026-09-22T05:17:00.000Z", SWEPT_AT).stale, false);
  assert.equal(freshness("2026-09-19T05:17:00.000Z", SWEPT_AT).stale, true);
});

await test("sweep: a run that could not read everything says its counts are a floor", () => {
  const entries = [entryFor("exercism/ruby", "track", 704, 12)];
  const body = summaryBody({ entries, locales: ["hu"], sweptAt: SWEPT_AT, failures: [{ repo: "exercism/nim", error: "could not fetch" }], incomplete: [4] });
  assert.match(body, /\[!CAUTION\][\s\S]*counts below are a floor/);
  assert.match(body, /shard 4 did not finish/);
  assert.match(body, /exercism\/nim`: could not fetch/);
  // The title carries the headline, so a summary nobody has rewritten looks old
  // in a list of issues without anyone opening it.
  assert.match(summaryTitle(entries, ["hu"], SWEPT_AT), /^Translation sweep: 12 outstanding across 1 source repo\(s\), as of 2026-09-23$/);
});

// --------------------------------------------------------------- the queue --

await test("the PR file list is untrusted: bad shapes are dropped, deletions require nothing", () => {
  const raw = JSON.stringify([
    { filename: "docs/ABOUT.md", sha: ID_A, status: "modified" },
    { filename: "docs/GONE.md", sha: ID_B, status: "removed" },
    { filename: "docs/BAD.md", sha: "not-a-sha", status: "added" },
    { filename: "docs/new\nline.md", sha: ID_B, status: "added" },
    { sha: ID_B }
  ]);
  assert.deepEqual(readPrFiles(raw), [{ path: "docs/ABOUT.md", id: ID_A }]);
  assert.equal(readPrFiles(`${raw}${raw}`).length, 2, "gh --paginate concatenates one array per page");
});

await test("the issue body neutralises a hostile path and says what it truncated or could not translate", () => {
  const summary = summarise("track", [{ path: "docs/a`|b.md", id: ID_A }, { path: "config.json", id: ID_B }]);
  assert.equal(summary.count, 2);
  const markdown = toMarkdown(summary);
  assert.ok(markdown.includes("`docs/a'\\|b.md`"));
  assert.ok(markdown.includes("not inspected") && markdown.includes("`config.json`"));
  assert.ok(isWebsiteEnglishPath("config/locales/views/x.yml") && isWebsiteEnglishPath("app/javascript/i18n/en/a.ts") && !isWebsiteEnglishPath("app/javascript/i18n/i18n.ts"));
});

await test("a push takes the label off only when it changes the PR's own English", () => {
  const cfg = "exercises/practice/two-fer/.meta/config.json";
  const about = "concepts/strings/about.md";
  const text = { base: JSON.stringify({ blurb: "Old.", authors: ["a"] }), data: JSON.stringify({ blurb: "Old.", authors: ["a", "b"] }), copy: JSON.stringify({ blurb: "New.", authors: ["a"] }) };
  const blobs = new Map(Object.values(text).map((one) => [blobId(one), one]));
  const readBlob = (id) => blobs.get(id) ?? null;
  const tree = (entries) => new Map(Object.entries(entries));
  const before = tree({ [cfg]: blobId(text.base), [about]: ID_A, "lib/x.rb": ID_A, "docs/MAIN.md": ID_A });
  const push = (after, scope = new Set([cfg, about, "lib/x.rb"])) => pushChanges("track", { scope, beforeTree: before, afterTree: tree({ ...Object.fromEntries(before), ...after }), readBlob });

  assert.equal(push({ "lib/x.rb": ID_B }).count, 0, "code only");
  assert.equal(push({ [cfg]: blobId(text.data) }).count, 0, "config.json data only");
  assert.deepEqual(push({ [cfg]: blobId(text.copy) }).metadata[0].keys, ["exercise:two-fer:blurb"]);
  assert.equal(push({ [about]: ID_B }).files[0].path, about);
  assert.equal(push({ "docs/MAIN.md": ID_B }).count, 0, "English a merge of main brought in is not the PR's");
  assert.equal(push({ "docs/MAIN.md": ID_B }, null).count, 1, "an unknown scope widens to the whole push");
  const dropped = pushChanges("track", { scope: new Set([about]), beforeTree: before, afterTree: tree({ [cfg]: blobId(text.base) }), readBlob });
  assert.deepEqual(dropped.removed, [about], "English the PR dropped counts");
  assert.equal(push({ [cfg]: blobId(text.copy) }, new Set([cfg])).needs.length, 0, "fetched blobs leave nothing needed");
  assert.equal(pushChanges("track", { scope: new Set([cfg]), beforeTree: before, afterTree: tree({ [cfg]: blobId(text.copy) }) }).count, 1, "without the blobs a config.json change counts");

  const compare = JSON.stringify({ files: [{ filename: "b.md", previous_filename: "a.md", status: "renamed" }, { filename: "c\nd.md" }, { filename: 7 }] });
  assert.deepEqual([...readPaths(compare)].sort(), ["a.md", "b.md"]);
  assert.deepEqual([...readPaths(`[{"filename":"x"}][{"filename":"y","status":"removed"}]`)], ["x", "y"]);
  assert.equal(COMPARE_FILE_CAP, 300);
});

// ------------------------------------------------------- replies on the PR --

await test("pr-reply: the translated reply, with its marker", () => {
  assert.match(replyBody("translated", 12), /^This PR \[has been translated\]\(https:\/\/github\.com\/exercism\/i18n\/issues\/12\) 🚀\n/);
  for (const kind of KINDS) assert.ok(replyBody(kind, 12).includes(marker(kind, 12)), kind);
  assert.equal(languageList(["hu", "de", "fr"]), "Hungarian, German and French");
  assert.equal(languageList(["hu", "de"]), "Hungarian and German");
  assert.throws(() => replyBody("started", 12), /not one of/);
  assert.throws(() => replyBody("translated", "12; rm"), /not an issue number/);
});

await test("pr-reply: it skips a reply the PR already has, and posts another issue's", () => {
  const done = replyBody("translated", 12);
  assert.equal(shouldPost([], "translated", 12), true);
  assert.equal(shouldPost([done, "a maintainer's comment"], "translated", 12), false);
  assert.equal(shouldPost([replyBody("translated", 11)], "translated", 12), true);
  assert.deepEqual(readBodies(`${JSON.stringify(done)}\nnot json\n42\n\n`), [done]);
});

// ---------------------------------------------------------- locales.json ----

await test("an empty production list is legitimate here; a missing, malformed or stray one is not", () => {
  assert.equal(productionLocaleIssue([], []), null);
  assert.equal(productionLocaleIssue(["hu"], ["hu", "pl"]), null);
  assert.match(productionLocaleIssue(undefined, ["hu"]), /missing/);
  assert.match(productionLocaleIssue("hu", ["hu"]), /not an array/);
  assert.match(productionLocaleIssue(["pt-br"], ["pt-BR"]), /pt-br/);
  assert.match(productionLocaleIssue([], ["en"]), /English/);
});

await test("the real locales.json and website-exclusions.json load, and the globs mean what they say", () => {
  const exclusions = loadExclusions(SCRIPTS_ROOT);
  assert.ok(exclusions.backendFiles.some((pattern) => pattern.test("views/courses/pay.yml")));
  assert.ok(globToRegExp("views/courses/**").test("views/courses/a/b.yml"));
  assert.ok(!globToRegExp("views/*.yml").test("views/courses/pay.yml"));
  assert.ok(globToRegExp("components/test").test("components/test") && !globToRegExp("components/test").test("components/testimonials"));
});

// ------------------------------------------------------- translation index --

const hex = (n) => blobId(`version ${n}\n`);

await test("index: a new id goes first, a repeated one moves to the front, and the list stops at six", () => {
  const index = emptyIndex("hu", "ruby", "track");
  const file = "exercises/practice/two-fer/.docs/instructions.md";
  assert.equal(recordTranslation(index, file, hex(1)), true);
  for (let n = 2; n <= 8; n++) recordTranslation(index, file, hex(n));
  assert.equal(HISTORY_CAP, 6);
  assert.deepEqual(index.paths[file], [8, 7, 6, 5, 4, 3].map(hex));
  assert.equal(recordTranslation(index, file, hex(5)), true);
  assert.deepEqual(index.paths[file], [5, 8, 7, 6, 4, 3].map(hex));
  assert.equal(recordTranslation(index, file, hex(5)), false, "recording the latest again changes nothing");
  assert.throws(() => recordTranslation(index, file, "abc"), /not a blob id/);
});

await test("index: the JSON is sorted, one line per path, and the same index always gives the same bytes", () => {
  const a = { ...emptyIndex("hu", "ruby", "track"), paths: { "b.md": [hex(1)], "a.md": [] }, names: { x: { hu: "Iksz", en: "Ex" } } };
  const b = { ...emptyIndex("hu", "ruby", "track"), paths: { "a.md": [], "b.md": [hex(1)] }, names: { x: { en: "Ex", hu: "Iksz" } } };
  const text = serialiseIndex(a);
  assert.equal(text, serialiseIndex(b));
  assert.equal(serialiseIndex(JSON.parse(text)), text);
  assert.deepEqual(text.split("\n").filter((line) => line.startsWith("    ")), ['    "x": {"en":"Ex","hu":"Iksz"}', '    "a.md": [],', `    "b.md": ["${hex(1)}"]`]);
});

await test("index: a sync records held English as latest, lists the rest as missing, and a second sync changes nothing", () => {
  const index = { ...emptyIndex("hu", "ruby", "track"), paths: { "exercises/practice/gone/.docs/instructions.md": [], "docs/OLD.md": [hex(9)] } };
  const files = [
    { path: "exercises/practice/two-fer/.docs/instructions.md", id: hex(1), extension: ".md" },
    { path: "exercises/practice/two-fer/.docs/hints.md", id: hex(2), extension: ".md" }
  ];
  const held = new Set([hex(1)]);
  syncIndex(index, files, (id) => held.has(id), { "exercises/practice/two-fer": { en: "Two Fer", hu: "Kettő" }, "exercises/practice/unused": { en: "Unused" } });
  assert.deepEqual(index.paths, { "exercises/practice/two-fer/.docs/instructions.md": [hex(1)], "exercises/practice/two-fer/.docs/hints.md": [], "docs/OLD.md": [hex(9)] });
  assert.deepEqual(Object.keys(index.names), ["exercises/practice/two-fer"]);
  const before = serialiseIndex(index);
  syncIndex(index, files, (id) => held.has(id), {});
  assert.equal(serialiseIndex(index), before);
});

await test("index: paths are grouped by exercise, concept or page, with the file as the label", () => {
  assert.deepEqual(describePath("track", "exercises/practice/two-fer/.docs/instructions.append.md"), { section: "Practice exercises", group: "exercises/practice/two-fer", label: "instructions.append.md" });
  assert.deepEqual(describePath("track", "concepts/strings/about.md"), { section: "Concepts", group: "concepts/strings", label: "about.md" });
  assert.deepEqual(describePath("track", "docs/TESTS.md"), { section: "Track docs", group: "docs/TESTS.md", label: "TESTS.md" });
  assert.deepEqual(describePath("problem-specifications", "exercises/bob/description.md"), { section: "Exercises", group: "exercises/bob", label: "description.md" });
  assert.deepEqual(describePath("docs", "using/settings/pronouns.md"), { section: "Using", group: "using/settings/pronouns.md", label: "pronouns.md" });
  assert.deepEqual(describePath("website-copy", "analyzer-comments/ruby/two-fer/splat_args.md"), { section: "Analyzer comments", group: "analyzer-comments/ruby", label: "two-fer/splat_args.md" });
});

await test("index: display names come from the source's own files, and the translation from the metadata catalog", () => {
  const files = {
    "config.json": JSON.stringify({ exercises: { practice: [{ slug: "two-fer", name: "Two Fer" }], concept: [] }, concepts: [{ slug: "strings", name: "Strings" }] }),
    "docs/config.json": JSON.stringify({ docs: [{ slug: "tests", path: "docs/TESTS.md", title: "Testing" }] })
  };
  const names = displayNames("track", asTree(files), asReader(files), "hu", { "exercise:two-fer:name": "Kettő", "doc:tests:title": "Tesztelés" });
  assert.deepEqual(names, { "exercises/practice/two-fer": { en: "Two Fer", hu: "Kettő" }, "concepts/strings": { en: "Strings" }, "docs/TESTS.md": { en: "Testing", hu: "Tesztelés" } });
});

await test("index: a page links the latest and earlier translations relative to itself, and marks a file with none as missing", () => {
  const index = {
    ...emptyIndex("hu", "ruby", "track"),
    names: { "exercises/practice/two-fer": { en: "Two Fer", hu: "Kettő neked" } },
    paths: { "exercises/practice/two-fer/.docs/instructions.md": [hex(2), hex(1)], "exercises/practice/two-fer/.docs/hints.md": [], "concepts/strings/about.md": [hex(3)] }
  };
  const page = renderRepo(index);
  assert.ok(page.indexOf("## Practice exercises") < page.indexOf("## Concepts"));
  assert.match(page, /### Two Fer \(Kettő neked\)\n\n- `instructions\.md` \(\[English\]\(https:\/\/github\.com\/exercism\/ruby\/blob\/main\/exercises\/practice\/two-fer\/\.docs\/instructions\.md\)\): \[Latest\]\(\.\.\/\.\.\/\.\.\/locales\/hu\/content\//);
  assert.ok(page.includes(`[Latest](../../../locales/hu/content/${contentRelativePath(hex(2), ".md")})\n  - [\`${hex(1).slice(0, 10)}\`](../../../locales/hu/content/${contentRelativePath(hex(1), ".md")})`));
  assert.match(page, /- `hints\.md` \(\[English\]\([^)]+\)\): missing/);
  assert.match(page, /### strings\n/);
  assert.ok(!page.includes("—"), "no em dashes");
  const readme = renderReadme("hu", [index, emptyIndex("hu", "docs", "docs")]);
  assert.match(readme, /^# Hungarian translation index/);
  assert.ok(readme.indexOf("[exercism/docs](docs.md)") < readme.indexOf("## Tracks") && readme.includes("[exercism/ruby](ruby.md)"));
});

// ------------------------------------------------------------ content files --

await test("a content file is checked from its bytes alone, and against English when it is findable", () => {
  const english = Buffer.from("# Title\n\n```ruby\nputs 1\n```\n\n[docs](https://exercism.org/docs)\n");
  const id = blobId(english);
  const good = Buffer.from("# Cím\n\n```ruby\nputs 1\n```\n\n[dokumentáció](https://exercism.org/docs)\n");
  assert.deepEqual(checkContentFile({ id, extension: ".md", bytes: good }, english), []);
  assert.match(warningsOf(checkContentFile({ id, extension: ".md", bytes: english }))[0], /byte-identical/);
  assert.match(errorsOf(checkContentFile({ id, extension: ".md", bytes: Buffer.from("# Cím\n\nszöveg\n") }, english))[0], /fenced code block/);
  const comment = Buffer.from("Use `%{method}` instead of `%{other}`. 100%% sure.\n");
  assert.deepEqual(checkContentFile({ id: blobId(comment), extension: ".md", bytes: Buffer.from("Használd a `%{method}` metódust a `%{other}` helyett. 100%% biztos.\n") }, comment), []);
  assert.match(errorsOf(checkContentFile({ id: blobId(comment), extension: ".md", bytes: Buffer.from("Használd a `%{metódus}` metódust a `%{other}` helyett.\n") }, comment))[0], /placeholders differ.*%\{method\}/);
  assert.match(errorsOf(checkContentFile({ id, extension: ".md", bytes: Buffer.from("---\nen_md5: abc\n---\n# Cím\n") }))[0], /en_md5/);
  assert.match(errorsOf(checkContentFile({ id, extension: ".json", bytes: Buffer.from("{nope") }))[0], /invalid JSON/);
  assert.deepEqual(errorsOf(checkContentFile({ id, extension: ".md", bytes: Buffer.from([0xff, 0xfe, 0x00]) })), ["not valid UTF-8"]);
  assert.deepEqual(errorsOf(checkContentFile({ id, extension: ".md", bytes: Buffer.from("  \n") })), ["empty file"]);
  assert.deepEqual(errorsOf(checkContentFile({ id: "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391", extension: ".md", bytes: Buffer.alloc(0) })), []);
  assert.deepEqual(errorsOf(checkContentFile({ id: "e69de29bb2d1d6434b8b29ae775ad8c2e48c5391", extension: ".md", bytes: Buffer.from("\n") })), ["empty file"]);
});

await test("headings are counted as the renderer sees them: behind a byte order mark, and indented up to three spaces", () => {
  // phix/docs/ABOUT.md carries a mark its author's editor left there in 2024.
  const marked = Buffer.from("\uFEFF# About\n\nText.\n\n## More\n\nMore text.\n");
  const id = blobId(marked);
  assert.deepEqual(checkContentFile({ id, extension: ".md", bytes: Buffer.from("\uFEFF# À propos\n\nTexte.\n\n## Plus\n\nPlus de texte.\n") }, marked), []);
  // The translation may carry no mark, or a leading space in place of one, and
  // still have the two headings the English has.
  assert.deepEqual(checkContentFile({ id, extension: ".md", bytes: Buffer.from("# À propos\n\nTexte.\n\n## Plus\n\nPlus de texte.\n") }, marked), []);
  assert.deepEqual(checkContentFile({ id, extension: ".md", bytes: Buffer.from(" # À propos\n\nTexte.\n\n## Plus\n\nPlus de texte.\n") }, marked), []);
  assert.match(errorsOf(checkContentFile({ id, extension: ".md", bytes: Buffer.from("\uFEFF# À propos\n\nTexte.\n") }, marked))[0], /headings: English has 2, translation has 1/);

  // CommonMark renders a heading indented by up to three spaces, and stops at four.
  const indented = Buffer.from("# Title\n\n   ## Indented\n\nText.\n");
  const indentedId = blobId(indented);
  assert.deepEqual(checkContentFile({ id: indentedId, extension: ".md", bytes: Buffer.from("# Cím\n\n   ## Behúzva\n\nSzöveg.\n") }, indented), []);
  assert.match(errorsOf(checkContentFile({ id: indentedId, extension: ".md", bytes: Buffer.from("# Cím\n\n    ## Behúzva\n\nSzöveg.\n") }, indented))[0], /headings: English has 2, translation has 1/);
});

// =================================================================== fixture ==
//
// Everything below runs the real scripts, as subprocesses, over real git repos.

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "exercism-i18n-test-"));
const gitIn = (dir, ...args) => execFileSync("git", args, { cwd: dir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

function writeTree(dir, files) {
  for (const [file, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
    fs.writeFileSync(path.join(dir, file), content);
  }
}

function commitAll(dir, message, { allowEmpty = false } = {}) {
  gitIn(dir, "add", "-A");
  gitIn(dir, "-c", "user.name=test", "-c", "user.email=test@example.com", "commit", "--quiet", ...(allowEmpty ? ["--allow-empty"] : []), "-m", message);
  return gitIn(dir, "rev-parse", "HEAD").trim();
}

function makeRepo(name, files) {
  const dir = path.join(TMP, name);
  fs.mkdirSync(dir, { recursive: true });
  gitIn(dir, "init", "--quiet", "-b", "main");
  writeTree(dir, files);
  commitAll(dir, "initial");
  return dir;
}

const WEBSITE = makeRepo("website", {
  "config/locales/views/nav.yml": 'en:\n  nav:\n    home: Home\n    slots:\n      one: 1 slot\n      other: "%{count} slots"\n    cta_html: >\n      Or <a href="%{path}">donate</a>.\n    enabled: true\nhu:\n  nav:\n    home: Kezdőlap\n',
  "config/locales/views/courses/pay.yml": "en:\n  courses:\n    pay: Pay now\n",
  "app/javascript/i18n/en/index.ts": "import aa from './components-nav'\nimport ab from './components-test'\n\nexport default {\n  'components/nav': aa,\n  'components/test': ab,\n}\n",
  "app/javascript/i18n/en/components-nav.ts": "// namespace: components/nav\nexport default {\n  'menu.open': 'Open menu',\n  'items_one': '{{count}} item',\n  'items_other': '{{count}} items',\n}\n",
  "app/javascript/i18n/en/components-test.ts": "export default { 'x': 'Never translated' }\n",
  "app/javascript/i18n/en/orphan.ts": "export default { 'y': 'Imported by nothing' }\n"
});

const TRACK = makeRepo("ruby", {
  "exercises/practice/two-fer/.docs/instructions.md": "# Instructions\n\nSay `One for you`.\n",
  "config.json": JSON.stringify({ language: "Ruby", slug: "ruby", blurb: "Ruby is dynamic.", exercises: { practice: [{ uuid: "u1", slug: "two-fer", name: "Two Fer" }] } }),
  "exercises/practice/two-fer/.meta/config.json": '{ "blurb": "Create a sentence." }\n',
  "exercises/practice/two-fer/two_fer.rb": "puts 1\n",
  "docs/ABOUT.md": "# About\n\nRuby is nice.\n"
});

await test("fixture: git objects are read without a working tree being involved", () => {
  const entries = lsTree(TRACK, "HEAD");
  const instructions = entries.find((entry) => entry.path.endsWith("instructions.md"));
  assert.equal(instructions.id, blobId("# Instructions\n\nSay `One for you`.\n"));
  const blobs = readBlobs(TRACK, [instructions.id, "0".repeat(40)]);
  assert.equal(blobs.get(instructions.id).toString(), "# Instructions\n\nSay `One for you`.\n");
  assert.equal(blobs.get("0".repeat(40)), null);
});

function bloblessClone(source, name) {
  gitIn(source, "config", "uploadpack.allowFilter", "true");
  gitIn(source, "config", "uploadpack.allowAnySHA1InWant", "true");
  const dir = path.join(TMP, name);
  gitIn(TMP, "clone", "--quiet", "--bare", "--filter=blob:none", `file://${source}`, dir);
  return dir;
}
const heldObjects = (repo) => gitIn(repo, "cat-file", "--batch-all-objects", "--batch-check=%(objectname)").split("\n");

await test("blobless clone: the blobs a caller reads are fetched in one request, then read", () => {
  const clone = bloblessClone(TRACK, "ruby-blobless");
  const entries = lsTree(clone, "HEAD");
  assert.ok(!entries.some((entry) => heldObjects(clone).includes(entry.id)));
  const blobs = readBlobs(clone, entries.map((entry) => entry.id), { delays: [] });
  assert.equal(blobs.get(blobId("# About\n\nRuby is nice.\n")).toString(), "# About\n\nRuby is nice.\n");
  assert.ok(entries.every((entry) => blobs.get(entry.id) !== null));
});

await test("blobless clone: an id the remote does not hold is a fetch error, unless the caller asked not to fetch", () => {
  const clone = bloblessClone(TRACK, "ruby-blobless-unknown");
  assert.throws(() => readBlobs(clone, ["0".repeat(40)], { delays: [] }), /could not fetch 1 blob\(s\)[\s\S]*git said: /);
  assert.equal(readBlobs(clone, ["0".repeat(40)], { prefetch: false }).get("0".repeat(40)), null);
});

await test("blobless clone: an unreachable remote is retried, then stops the run with git's error", () => {
  const clone = bloblessClone(TRACK, "ruby-blobless-offline");
  gitIn(clone, "remote", "set-url", "origin", `file://${path.join(TMP, "nowhere")}`);
  const [entry] = lsTree(clone, "HEAD");
  assert.throws(() => readBlobs(clone, [entry.id], { delays: [0, 0] }), (error) => {
    assert.match(error.message, /could not fetch 1 blob\(s\) from "origin" .*\(3 attempts\)/);
    assert.match(error.message, /git said: .*nowhere/);
    return true;
  });
  assert.equal(readBlobs(clone, [entry.id], { prefetch: false }).get(entry.id), null);
});

let ENGLISH;
await test("fixture: the website flattens to two catalogs, minus exclusions, other roots and orphans", async () => {
  ENGLISH = await buildWebsiteEnglish(refReader(WEBSITE, "HEAD"), { exclusions: loadExclusions(SCRIPTS_ROOT) });
  assert.deepEqual(ENGLISH.backend.catalog, { "nav.home": "Home", "nav.slots.one": "1 slot", "nav.slots.other": "%{count} slots", "nav.cta_html": 'Or <a href="%{path}">donate</a>.\n' });
  assert.deepEqual(Object.keys(ENGLISH.frontend.catalog), ["components/nav:menu.open", "components/nav:items_one", "components/nav:items_other"]);
  assert.ok(ENGLISH.backend.notes.some((note) => /non-English root key\(s\) hu/.test(note)));
  assert.ok(ENGLISH.frontend.notes.some((note) => /orphan\.ts/.test(note)));
});

// The fixture copy of this repo: real locales, one of them production.
const INSTRUCTIONS_ID = blobId("# Instructions\n\nSay `One for you`.\n");
const ABOUT_ID = blobId("# About\n\nRuby is nice.\n");
const ROOT = makeRepo("i18n", {
  "locales.json": JSON.stringify({ targets: ["hu", "pl"], productionTargets: ["hu"], plannedTargets: [] }),
  "website-exclusions.json": fs.readFileSync(path.join(SCRIPTS_ROOT, "website-exclusions.json"), "utf8"),
  "locales/hu/website/backend.json": JSON.stringify({ nav: { home: "Kezdőlap", slots: { one: "1 hely", other: "%{count} hely" }, cta_html: 'Vagy <a href="%{path}">adományozz</a>.\n' } }, null, 2),
  "locales/hu/website/frontend.json": JSON.stringify({ "components/nav": { "menu.open": "Menü megnyitása", items_one: "{{count}} elem", items_other: "{{count}} elem" } }, null, 2),
  [`locales/hu/content/${contentRelativePath(INSTRUCTIONS_ID, ".md")}`]: "# Utasítások\n\nMondd: `One for you`.\n",
  "locales/pl/website/backend.json": JSON.stringify({ nav: { home: "Start", slots: { one: "1 miejsce", other: "%{count} miejsc" } } }, null, 2)
});

function run(script, args, { root = ROOT } = {}) {
  const result = spawnSync(process.execPath, [path.join(SCRIPTS_ROOT, "scripts", script), ...args], {
    encoding: "utf8",
    env: { ...process.env, EXERCISM_I18N_ROOT: root, EXERCISM_WEBSITE_REPO: WEBSITE }
  });
  return { status: result.status, out: `${result.stdout}${result.stderr}` };
}

await test("fixture: validate passes a good production locale, and reports (without gating on) pl's short plural group", () => {
  const { status, out } = run("validate.mjs", ["all"]);
  assert.equal(status, 0, out);
  assert.match(out, /ok\s+hu\s+website-backend\s+total 3, done 0, stale 0, unstamped 3, missing 0/);
  assert.match(out, /FAIL pl\s+website-backend/);
  assert.match(out, /plural group is missing "few"/);
  assert.match(out, /Other locales: 2 error\(s\).*NOT gating/);
  assert.equal(run("validate.mjs", ["all", "--gate=all"]).status, 1);
});

await test("fixture: a run writes nothing without --stamp, and --stamp stamps exactly the units that passed", () => {
  const meta = path.join(ROOT, "locales/hu/website/backend.meta.json");
  assert.ok(!fs.existsSync(meta), "a plain validate run wrote a stamp file");
  const { status, out } = run("validate.mjs", ["hu", "--stamp"]);
  assert.equal(status, 0, out);
  assert.match(out, /website-backend\s+total 3, done 3,.*stamped 3/);
  const stamps = JSON.parse(fs.readFileSync(meta, "utf8")).stamps;
  assert.deepEqual(Object.keys(stamps), ["nav.cta_html", "nav.home", "nav.slots.*"]);
  assert.equal(stamps["nav.home"], stringId("Home"));
});

await test("fixture: a production locale missing a unit FAILS validate; an ordinary one only counts it", () => {
  const file = path.join(ROOT, "locales/hu/website/frontend.json");
  const original = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, JSON.stringify({ "components/nav": { "menu.open": "Menü megnyitása" } }));
  const { status, out } = run("validate.mjs", ["hu"]);
  fs.writeFileSync(file, original);
  assert.equal(status, 1, out);
  assert.match(out, /ERROR missing: components\/nav:items_\*/);
  const pl = run("validate.mjs", ["pl", "--type=website-frontend"]);
  assert.equal(pl.status, 0, pl.out);
  assert.match(pl.out, /miss pl\s+website-frontend\s+total 2,.*missing 2/);
});

await test("fixture: content is validated from the store alone, and a stray file is an ERROR", () => {
  const stray = path.join(ROOT, "locales/hu/content/two-fer.md");
  fs.writeFileSync(stray, "nope");
  const bad = run("validate.mjs", ["hu", "--type=content"]);
  fs.rmSync(stray);
  assert.equal(bad.status, 1, bad.out);
  assert.match(bad.out, /content\/two-fer\.md: not a blob-id path/);
  const good = run("validate.mjs", ["hu", "--type=content", `--content-repos=${TRACK}:track@HEAD`]);
  assert.equal(good.status, 0, good.out);
  assert.match(good.out, /ok\s+hu\s+content\s+total 1, verified 1, copied 0/);
});

await test("fixture: completeness blocks a track until every production locale holds every blob AND every name and blurb", () => {
  const before = run("completeness.mjs", [`--source-repo=${TRACK}`, "--repo=exercism/ruby"]);
  assert.equal(before.status, 1, before.out);
  assert.match(before.out, /requires 3 metadata unit\(s\)/);
  assert.match(before.out, /FAIL hu: 4 translation\(s\) outstanding \(1 content file\(s\), 3 metadata unit\(s\)\)/);
  assert.match(before.out, /docs\/ABOUT\.md \(track-docs\)/);
  assert.match(before.out, /metadata\/ruby\.json: exercise:two-fer:blurb: missing/);

  writeTree(ROOT, {
    [`locales/hu/content/${contentRelativePath(ABOUT_ID, ".md")}`]: "# Rólunk\n\nA Ruby szép.\n",
    "locales/hu/metadata/ruby.json": JSON.stringify({ "track:blurb": "A Ruby dinamikus.", "exercise:two-fer:name": "Two Fer", "exercise:two-fer:blurb": "Alkoss egy mondatot." }, null, 2)
  });
  const unstamped = run("completeness.mjs", [`--source-repo=${TRACK}`, "--repo=exercism/ruby"]);
  assert.match(unstamped.out, /track:blurb: translated but never checked/, unstamped.out);

  // No checkout named: the catalog is shape-checked and reported as `unv`, never `ok`.
  assert.match(run("validate.mjs", ["hu", "--type=metadata"]).out, /unv\s+hu\s+metadata\/ruby\s+total 3, unverified 3/);
  const stamped = run("validate.mjs", ["hu", "--type=metadata", `--content-repos=${TRACK}:track@HEAD`, "--stamp"]);
  assert.match(stamped.out, /metadata\/ruby\s+total 3, done 3,.*stamped 3/, stamped.out);

  const after = run("completeness.mjs", [`--source-repo=${TRACK}`, "--repo=exercism/ruby"]);
  assert.equal(after.status, 0, after.out);
  assert.match(after.out, /ok\s+hu/);
});

// CI names every repo any locale holds a catalog for, so without this one
// locale translating an inactive track would require every other locale to
// translate it too. That is what failed the run on the French PR: 37 tracks
// nobody can reach were suddenly required of Hungarian.
await test("fixture: a production locale must hold a catalog for an active track and for a non-track repo, never for an inactive track", () => {
  const awake = makeRepo("awake", { "config.json": JSON.stringify({ language: "Awake", active: true, blurb: "Awake is served." }) });
  const dozing = makeRepo("dozing", { "config.json": JSON.stringify({ language: "Dozing", active: false, blurb: "Dozing is retired." }) });
  const blog = makeRepo("blog", { "config.json": JSON.stringify({ posts: [{ uuid: "p", slug: "hello", title: "Hello" }] }) });
  const repos = [`${awake}:track@HEAD`, `${dozing}:track@HEAD`, `${blog}:blog@HEAD`].join(",");

  const { status, out } = run("validate.mjs", ["hu", "--type=metadata", `--content-repos=${repos}`]);
  assert.equal(status, 1, out);
  assert.match(out, /ERROR no locales\/hu\/metadata\/awake\.json: 1 units missing/);
  assert.match(out, /ERROR no locales\/hu\/metadata\/blog\.json: 1 units missing/);
  assert.doesNotMatch(out, /metadata\/dozing/, "an inactive track was required of a production locale");

  // pl is neither a production locale nor under --complete, so it is required
  // to hold nothing, and the active track is not reported for it either.
  const other = run("validate.mjs", ["pl", "--type=metadata", `--content-repos=${repos}`]);
  assert.equal(other.status, 0, other.out);
  assert.doesNotMatch(other.out, /metadata\/awake/);

  // The exemption decides what a locale must hold. A locale that holds an
  // inactive track's catalog anyway is checked against its English as usual.
  writeTree(ROOT, { "locales/hu/metadata/dozing.json": "{}" });
  const held = run("validate.mjs", ["hu", "--type=metadata", `--content-repos=${repos}`]);
  fs.rmSync(path.join(ROOT, "locales/hu/metadata/dozing.json"));
  assert.equal(held.status, 1, held.out);
  assert.match(held.out, /FAIL hu\s+metadata\/dozing/, held.out);
  assert.match(held.out, /ERROR missing: track:blurb/, held.out);
});

// A source repo syncs one exercise into a hundred-odd tracks, so one author
// line was reported a hundred-odd times per locale. That is what took a real
// run to 1695 byte-identical warnings and made the run unreadable.
await test("fixture: byte-identical warnings are grouped by English string, and a signed-off one is counted and not printed", () => {
  const authors = "Christian Willner, Eric Willigers";
  const track = (language, slug, name) => ({
    "config.json": JSON.stringify({ language, active: true, blurb: `${language} is served.`, exercises: { practice: [{ uuid: slug, slug, name }] } }),
    [`exercises/practice/${slug}/.meta/config.json`]: JSON.stringify({ blurb: `Solve ${name}.`, source: authors })
  });
  const alpha = makeRepo("alpha", track("Alpha", "eliuds-eggs", "Eliud's Eggs"));
  const beta = makeRepo("beta", track("Beta", "resistor-color", "Resistor Color"));
  const repos = [`${alpha}:track@HEAD`, `${beta}:track@HEAD`].join(",");
  const catalog = (language, slug, name) => JSON.stringify({ "track:blurb": `${language}-t kiszolgáljuk.`, [`exercise:${slug}:name`]: name, [`exercise:${slug}:blurb`]: `Oldd meg: ${name}.`, [`exercise:${slug}:source`]: authors }, null, 2);
  const files = { "locales/hu/metadata/alpha.json": catalog("Alpha", "eliuds-eggs", "Eliud's Eggs"), "locales/hu/metadata/beta.json": catalog("Beta", "resistor-color", "Resistor Color") };
  writeTree(ROOT, files);
  const validate = () => run("validate.mjs", ["hu", "--type=metadata", `--content-repos=${repos}`]);

  // Two catalogs, two unit ids, one editorial decision, one line.
  const grouped = validate();
  assert.equal(grouped.status, 0, grouped.out);
  assert.doesNotMatch(grouped.out, /WARN\s+exercise:.*byte-identical/, grouped.out);
  assert.match(grouped.out, /hu\s+2 catalog\(s\)\s+exercise:\*:source\s+"Christian Willner, Eric Willigers"/, grouped.out);

  const signOff = run("allow-identical.mjs", ["--by=test", "--reason=Attribution: the people who wrote the exercise.", authors]);
  assert.equal(signOff.status, 0, signOff.out);
  const quiet = validate();
  assert.equal(quiet.status, 0, quiet.out);
  assert.doesNotMatch(quiet.out, /exercise:\*:source/, quiet.out);
  assert.match(quiet.out, /1 group\(s\) \(2 occurrence\(s\)\) are signed off/, quiet.out);

  // The English is edited, so it has a new blob id, so the sign-off no longer
  // covers it and the string is reported again.
  const credited = `Written by ${authors}`;
  writeTree(alpha, { "exercises/practice/eliuds-eggs/.meta/config.json": JSON.stringify({ blurb: "Solve Eliud's Eggs.", source: credited }) });
  commitAll(alpha, "credit the authors in a sentence");
  writeTree(ROOT, { "locales/hu/metadata/alpha.json": catalog("Alpha", "eliuds-eggs", "Eliud's Eggs").replace(authors, credited) });
  const again = validate();
  assert.match(again.out, /hu\s+1 catalog\(s\)\s+exercise:eliuds-eggs:source\s+"Written by Christian Willner, Eric Willigers"/, again.out);
  assert.match(again.out, /1 group\(s\) \(1 occurrence\(s\)\) are signed off/, again.out);

  // An entry that matches nothing hides nothing, and says a decision applies
  // that no longer does. A whole run is the only one that can tell.
  const gone = "A string every locale has since translated.";
  run("allow-identical.mjs", ["--by=test", "--reason=No longer anywhere.", gone]);
  assert.doesNotMatch(validate().out, /matched nothing/, "a run of one type reported an entry as dead");
  const whole = run("validate.mjs", ["all", `--content-repos=${repos}`]);
  assert.match(whole.out, /identical-english\.json: 1 entry\/entries matched nothing in this run/, whole.out);
  assert.match(whole.out, /"A string every locale has since translated\."/, whole.out);

  for (const file of [...Object.keys(files), "identical-english.json"]) fs.rmSync(path.join(ROOT, file));
});

// A file with nothing to translate warns once per locale, for every locale
// there will ever be, so it is signed off like a catalog string and by the same
// file. The allowlist is keyed by the blob id of the English, which for such a
// file is the id it is already filed under.
await test("fixture: a content file identical to its English is signed off by path, and one that is not cannot be", () => {
  const placeholder = "%{comment}\n";
  const id = blobId(placeholder);
  const relative = `locales/hu/content/${contentRelativePath(id, ".md")}`;
  writeTree(ROOT, { [relative]: placeholder });

  const reported = run("validate.mjs", ["hu", "--type=content"]);
  assert.equal(reported.status, 0, reported.out);
  assert.match(reported.out, new RegExp(`hu\\s+1 catalog\\(s\\)\\s+content/${contentRelativePath(id, ".md")}`), reported.out);
  assert.match(reported.out, /--file=locales\/<locale>\/<the path above>/, reported.out);

  const signOff = run("allow-identical.mjs", ["--by=test", "--reason=One placeholder, nothing to translate.", `--file=${path.join(ROOT, relative)}`]);
  assert.equal(signOff.status, 0, signOff.out);
  const quiet = run("validate.mjs", ["hu", "--type=content"]);
  assert.equal(quiet.status, 0, quiet.out);
  assert.doesNotMatch(quiet.out, /byte-identical/, quiet.out);
  assert.match(quiet.out, /1 group\(s\) \(1 occurrence\(s\)\) are signed off/, quiet.out);

  // A translated file is not what the warning is about, and an entry for it
  // would match nothing, so the script refuses it rather than writing a
  // decision that reads as being in force.
  const translated = run("allow-identical.mjs", ["--by=test", "--reason=Not identical.", `--file=${path.join(ROOT, "locales/hu/content", contentRelativePath(INSTRUCTIONS_ID, ".md"))}`]);
  assert.equal(translated.status, 1, translated.out);
  assert.match(translated.out, /not byte-identical to its English/, translated.out);

  fs.rmSync(path.join(ROOT, relative));
  fs.rmSync(path.join(ROOT, "identical-english.json"));
});

// 333 of these in a real run, one line each, burying the eighteen warnings that
// were about something. The count per catalog is what a person acts on: a rise
// means English renamed or removed a key.
await test("fixture: stamped orphans print as one line per catalog, an unstamped one keeps its own, and no key is deleted", () => {
  const file = path.join(ROOT, "locales/hu/website/backend.json");
  const meta = path.join(ROOT, "locales/hu/website/backend.meta.json");
  const original = fs.readFileSync(file, "utf8");
  const heldMeta = fs.existsSync(meta) ? fs.readFileSync(meta, "utf8") : null;
  const held = JSON.parse(original);
  fs.writeFileSync(file, JSON.stringify({ ...held, gone: { first: "Egy", second: "Kettő" }, ahead: { of_english: "Három" } }, null, 2));

  // Every real orphan was stamped while English still had the key, and became an
  // orphan when English renamed or dropped it, so the two that stand for those
  // carry the stamp of the string in the catalog. The third has never been
  // stamped, which is the key-ahead-of-English case.
  const stamps = heldMeta === null ? { stamps: {} } : JSON.parse(heldMeta);
  stamps.stamps = { ...stamps.stamps, "gone.first": stringId("Egy"), "gone.second": stringId("Kettő") };
  fs.writeFileSync(meta, `${JSON.stringify(stamps, null, 2)}\n`);

  const { status, out } = run("validate.mjs", ["hu", "--type=website-backend"]);
  fs.writeFileSync(file, original);
  if (heldMeta === null) fs.rmSync(meta);
  else fs.writeFileSync(meta, heldMeta);

  assert.equal(status, 0, out);
  assert.doesNotMatch(out, /WARN\s+key not in English: gone\./, out);
  assert.match(out, /Keys not in English: 2 in 1 catalog\(s\) \(hu 2\)/, out);
  assert.match(out, /website-backend\s+2 key\(s\)\s+hu/, out);
  assert.match(out, /Nothing here is deleted/, out);

  // The unstamped one is what a person has to act on, so it is printed in full
  // with the command that ends it, and the block says it was.
  assert.match(out, /WARN\s+key not in English and never stamped: ahead\.of_english\..*--source-ref=/, out);
  assert.match(out, /1 further key\(s\).*never been stamped/, out);

  // Every key is still in the catalog: this is reporting, not a prune.
  assert.deepEqual(JSON.parse(fs.readFileSync(file, "utf8")), held);
});

await test("fixture: an edit is a new blob and an edited blurb a stale unit, so both block again; --base scopes it to the PR", () => {
  writeTree(TRACK, {
    "exercises/practice/two-fer/.docs/instructions.md": "# Instructions\n\nSay `One for you, one for me`.\n",
    "exercises/practice/two-fer/.meta/config.json": '{ "blurb": "Create a sentence, for two." }\n',
    "docs/TESTS.md": "# Tests\n"
  });
  commitAll(TRACK, "edit");
  const { status, out } = run("completeness.mjs", [`--source-repo=${TRACK}`, "--repo=exercism/ruby", "--head=HEAD", "--base=HEAD^1"]);
  assert.equal(status, 1, out);
  assert.match(out, /requires 2 content file/);
  assert.match(out, /requires 1 metadata unit\(s\).*from 1 changed file/);
  assert.match(out, /FAIL hu: 3 translation/);
  assert.match(out, /exercise:two-fer:blurb: translated from older English/);
});

await test("fixture: the website check passes when stamped, and blocks on a new key and on an EDITED one", () => {
  run("validate.mjs", ["hu", "--stamp"]);
  const clean = run("completeness.mjs", [`--source-repo=${WEBSITE}`, "--repo=exercism/website"]);
  assert.equal(clean.status, 0, clean.out);

  writeTree(WEBSITE, { "config/locales/views/nav.yml": 'en:\n  nav:\n    home: Homepage\n    about: About\n    slots:\n      one: 1 slot\n      other: "%{count} slots"\n    cta_html: >\n      Or <a href="%{path}">donate</a>.\n' });
  commitAll(WEBSITE, "edit English");
  const { status, out } = run("completeness.mjs", [`--source-repo=${WEBSITE}`, "--repo=exercism/website", "--head=HEAD", "--base=HEAD^1"]);
  assert.equal(status, 1, out);
  assert.match(out, /requires 2 backend unit/);
  assert.match(out, /nav\.home: translated from older English/);
  assert.match(out, /nav\.about: missing/);
});

await test("fixture: a stale unit is re-stamped only when the pass names it", () => {
  const file = path.join(ROOT, "locales/hu/website/backend.json");
  const tree = JSON.parse(fs.readFileSync(file, "utf8"));
  tree.nav.home = "Főoldal";
  tree.nav.about = "Rólunk";
  fs.writeFileSync(file, JSON.stringify(tree, null, 2));

  const plain = run("validate.mjs", ["hu", "--type=website-backend", "--stamp"]);
  assert.match(plain.out, /done 3, stale 1, unstamped 0, missing 0.*stamped 1/, plain.out);
  const named = run("validate.mjs", ["hu", "--type=website-backend", "--stamp-units=nav.home"]);
  assert.match(named.out, /done 4, stale 0/, named.out);
  const complete = run("completeness.mjs", [`--source-repo=${WEBSITE}`, "--repo=exercism/website", "--head=HEAD", "--base=HEAD^1"]);
  assert.equal(complete.status, 0, complete.out);
});

// The three occurrences this was written for were all hand edits: text arrived
// with no stamp, CI was green, and the failure surfaced hours later as a red
// check on somebody's pull request in another repo.
await test("fixture: a hand edit stamps the units it wrote, and the ones it did not write are an ERROR", () => {
  const backend = path.join(ROOT, "locales/hu/website/backend.json");
  const meta = path.join(ROOT, "locales/hu/website/backend.meta.json");
  const base = commitAll(ROOT, "before a hand edit");

  // One unit reworded and left unstamped, which is what a person editing a
  // wording by hand leaves behind, and one unit whose stamp is missing for
  // reasons this change knows nothing about.
  const tree = JSON.parse(fs.readFileSync(backend, "utf8"));
  tree.nav.home = "Kezdőoldal";
  fs.writeFileSync(backend, JSON.stringify(tree, null, 2));
  const stamps = JSON.parse(fs.readFileSync(meta, "utf8")).stamps;
  const [before, untouched] = [stamps["nav.home"], stamps["nav.about"]];
  delete stamps["nav.home"];
  delete stamps["nav.about"];
  fs.writeFileSync(meta, JSON.stringify({ stamps }, null, 2));

  // The pull request: nothing is written, and the unit the change wrote is
  // reported as one CI will stamp when it lands, so it is held against nobody.
  const dry = run("validate.mjs", ["hu", "--type=website-backend", `--stamp-changed=${base}`]);
  assert.equal(dry.status, 1, dry.out);
  assert.match(dry.out, /unstamped 2.*stampable 1/);
  assert.match(dry.out, /ERROR 1 unit\(s\) translated but never checked against any English: nav\.about/);
  assert.doesNotMatch(dry.out, /nav\.home/);
  assert.equal(JSON.parse(fs.readFileSync(meta, "utf8")).stamps["nav.home"], undefined, "a run without --stamp wrote a stamp");

  // The push to main: the unit the change wrote is stamped, against exactly
  // the English it was checked against, and the other one is still an error.
  const stamped = run("validate.mjs", ["hu", "--type=website-backend", "--stamp", `--stamp-changed=${base}`]);
  assert.equal(stamped.status, 1, stamped.out);
  assert.match(stamped.out, /stamped 1/);
  assert.match(stamped.out, /ERROR 1 unit\(s\) translated but never checked against any English: nav\.about/);
  const written = JSON.parse(fs.readFileSync(meta, "utf8")).stamps;
  assert.equal(written["nav.home"], before, "the stamp is not the one the English gives");
  assert.equal(written["nav.about"], undefined, "a unit this change never wrote was stamped anyway");

  // The way out, for a unit nobody can date: check it against English and stamp
  // it deliberately, which is what iHiD did by hand in b306ed0c5.
  const deliberate = run("validate.mjs", ["hu", "--type=website-backend", "--stamp"]);
  assert.equal(deliberate.status, 0, deliberate.out);
  assert.equal(JSON.parse(fs.readFileSync(meta, "utf8")).stamps["nav.about"], untouched);
});

// The case that must never be guessed. exercism/website#9693 carried the
// English for four Hungarian strings dem4ron had already written, so the keys
// were in this repo and in no English this run can read.
await test("fixture: a key English has not got is never stamped, and the WARN says who can stamp it", () => {
  const backend = path.join(ROOT, "locales/hu/website/backend.json");
  const meta = path.join(ROOT, "locales/hu/website/backend.meta.json");
  const original = fs.readFileSync(backend, "utf8");
  const base = commitAll(ROOT, "before a key arrives ahead of its English");
  const tree = JSON.parse(original);
  tree.nav.email_label = "E-mail";
  fs.writeFileSync(backend, JSON.stringify(tree, null, 2));

  const { status, out } = run("validate.mjs", ["hu", "--type=website-backend", "--stamp", `--stamp-changed=${base}`]);
  assert.equal(status, 0, out);
  assert.match(out, /WARN\s+key not in English and never stamped: nav\.email_label.*--source-ref=/);
  assert.equal(JSON.parse(fs.readFileSync(meta, "utf8")).stamps["nav.email_label"], undefined, "a key with no English was stamped anyway");
  fs.writeFileSync(backend, original);
});

await test("fixture: --stamp-changed refuses a ref this repository does not hold, rather than comparing against nothing", () => {
  const { status, out } = run("validate.mjs", ["hu", "--type=website-backend", "--stamp", "--stamp-changed=no-such-ref"]);
  assert.equal(status, 1, out);
  assert.match(out, /not a commit this repository holds/);
});

await test("fixture: coverage reports units and blob coverage, and never gates", () => {
  const { status, out } = run("coverage.mjs", ["all", `--content-repos=${TRACK}:track@HEAD`]);
  assert.equal(status, 0, out);
  assert.match(out, /hu\s+\(production\)/);
  assert.match(out, /website-backend\s+4\/4 100%/);
  assert.match(out, /ruby: track-docs\s+1\/2/);
  assert.match(out, /metadata\/ruby\s+2\/3\s+66%\s+stale 1/);
});

await test("fixture: no-deletions names a removed file and a removed key, and ignores stamp files", () => {
  // Allowed to be empty: the stamping tests above commit the fixture tree, so
  // there is not always something outstanding to commit here.
  const base = commitAll(ROOT, "translations", { allowEmpty: true });
  const file = path.join(ROOT, "locales/hu/website/backend.json");
  const tree = JSON.parse(fs.readFileSync(file, "utf8"));
  delete tree.nav.about;
  fs.writeFileSync(file, JSON.stringify(tree, null, 2));
  fs.rmSync(path.join(ROOT, "locales/hu/content", contentRelativePath(ABOUT_ID, ".md")));
  fs.writeFileSync(path.join(ROOT, "locales/hu/website/backend.meta.json"), JSON.stringify({ stamps: {} }));
  commitAll(ROOT, "a pass that deletes");

  assert.deepEqual(findDeletions(base, "HEAD", { cwd: ROOT }), [
    { file: `locales/hu/content/${contentRelativePath(ABOUT_ID, ".md")}`, what: "file removed" },
    { file: "locales/hu/website/backend.json", what: "key removed: nav.about" }
  ]);
  const refused = run("no-deletions.mjs", [`--base=${base}`, "--head=HEAD"]);
  assert.equal(refused.status, 1, refused.out);

  gitIn(ROOT, "-c", "user.name=test", "-c", "user.email=test@example.com", "commit", "--quiet", "--allow-empty", "-m", "why\n\nAllow-Deletions: fixture");
  const allowed = run("no-deletions.mjs", [`--base=${base}`, "--head=HEAD"]);
  assert.equal(allowed.status, 0, allowed.out);
  assert.match(allowed.out, /Allowed by Allow-Deletions trailer: fixture/);
});

await test("fixture: backfill indexes each path's held versions newest first, and the check catches a hand edit", () => {
  const v1 = "# Instructions\n\nFirst.\n";
  const v2 = "# Instructions\n\nSecond.\n";
  const v3 = "# Instructions\n\nThird.\n";
  const track = makeRepo("sources/lisp", { "config.json": JSON.stringify({ active: true, exercises: { practice: [{ slug: "two-fer", name: "Two Fer" }] } }), "exercises/practice/two-fer/.docs/instructions.md": v1, "exercises/practice/two-fer/.docs/hints.md": "# Hints\n" });
  writeTree(track, { "exercises/practice/two-fer/.docs/instructions.md": v2 });
  commitAll(track, "v2");
  writeTree(track, { "exercises/practice/two-fer/.docs/instructions.md": v3 });
  commitAll(track, "v3");
  makeRepo("sources/sleepy", { "config.json": JSON.stringify({ active: false }), "exercises/practice/two-fer/.docs/instructions.md": v1 });
  for (const text of [v1, v3]) writeTree(ROOT, { [`locales/hu/content/${contentRelativePath(blobId(text), ".md")}`]: `${text.replace("Instructions", "Utasítások")}` });
  writeTree(ROOT, { "locales/hu/metadata/lisp.json": JSON.stringify({ "exercise:two-fer:name": "Kettő" }) });

  const sources = path.join(TMP, "sources");
  const first = run("backfill-index.mjs", ["hu", `--sources=${sources}`]);
  assert.equal(first.status, 0, first.out);
  assert.match(first.out, /1 repos, 2 paths, 1 with a translation, 1 missing/);
  assert.match(first.out, /sleepy \(inactive track\)/);
  const jsonFile = path.join(ROOT, "index/json/hu/lisp.json");
  const json = JSON.parse(fs.readFileSync(jsonFile, "utf8"));
  assert.deepEqual(json.paths["exercises/practice/two-fer/.docs/instructions.md"], [blobId(v3), blobId(v1)]);
  assert.deepEqual(json.paths["exercises/practice/two-fer/.docs/hints.md"], []);
  assert.deepEqual(json.names["exercises/practice/two-fer"], { en: "Two Fer", hu: "Kettő" });
  const page = fs.readFileSync(path.join(ROOT, "index/markdown/hu/lisp.md"), "utf8");
  assert.match(page, /### Two Fer \(Kettő\)/);
  assert.match(fs.readFileSync(path.join(ROOT, "index/markdown/hu/README.md"), "utf8"), /\[exercism\/lisp\]\(lisp\.md\)/);

  const snapshot = fs.readFileSync(jsonFile, "utf8") + page;
  assert.equal(run("backfill-index.mjs", ["hu", `--sources=${sources}`]).status, 0);
  assert.equal(fs.readFileSync(jsonFile, "utf8") + fs.readFileSync(path.join(ROOT, "index/markdown/hu/lisp.md"), "utf8"), snapshot, "a second backfill changed something");

  assert.equal(run("build-index.mjs", ["all", "--check"]).status, 0);
  fs.appendFileSync(path.join(ROOT, "index/markdown/hu/lisp.md"), "\nA note.\n");
  const edited = run("build-index.mjs", ["all", "--check"]);
  assert.equal(edited.status, 1, edited.out);
  assert.match(edited.out, /lisp\.md: differs from what its JSON generates/);
  assert.equal(run("build-index.mjs", ["hu"]).status, 0);
  assert.equal(run("build-index.mjs", ["all", "--check"]).status, 0);
  fs.writeFileSync(jsonFile, fs.readFileSync(jsonFile, "utf8").replace(blobId(v1), blobId(v2)));
  assert.match(run("build-index.mjs", ["all", "--check"]).out, /which has no file under locales\/hu\/content/);
});

await test("fixture: the sweep merges its shards, and a missing shard makes it exit non-zero", () => {
  const dir = path.join(TMP, "sweep");
  fs.mkdirSync(dir, { recursive: true });
  const shardFile = (index, total, entries, failures = []) =>
    fs.writeFileSync(path.join(dir, `sweep-${index}-of-${total}.json`), JSON.stringify({ sweptAt: "2026-09-23T05:17:00.000Z", shard: { index, total }, locales: ["hu"], entries, failures }));
  shardFile(1, 2, [{ repo: "exercism/ruby", kind: "track", head: "a", required: 704, locales: { hu: { outstanding: 0, sample: [] } } }]);
  shardFile(2, 2, [{ repo: "exercism/zig", kind: "track", head: "b", required: 500, locales: { hu: { outstanding: 500, sample: ["docs/ABOUT.md (track-docs)"] } } }]);

  const body = path.join(dir, "body.md");
  const merged = run("sweep.mjs", [`--merge=${dir}`, `--body=${body}`, "--expected-shards=2"]);
  assert.equal(merged.status, 0, merged.out);
  assert.match(merged.out, /Merged 2 shard\(s\), 2 repo\(s\), 0 failure\(s\), 0 shard\(s\) missing/);
  const text = fs.readFileSync(body, "utf8");
  assert.match(text, /## Not started \(1\)/);
  assert.match(text, /## Complete \(1\)/);
  assert.match(text, /node scripts\/translate\.mjs track zig hu/);

  // A shard that never wrote a report is the case the summary must not hide:
  // it would otherwise read as "those repos are complete".
  const short = run("sweep.mjs", [`--merge=${dir}`, `--body=${body}`, "--expected-shards=3"]);
  assert.equal(short.status, 1, short.out);
  assert.match(fs.readFileSync(body, "utf8"), /\[!CAUTION\][\s\S]*shard 3 did not finish/);

  // Nothing at all is a hard failure, never an empty summary.
  const nothing = run("sweep.mjs", [`--merge=${path.join(TMP, "sweep-empty")}`]);
  assert.equal(nothing.status, 1, nothing.out);
  assert.match(nothing.out, /no shard reports/);
});

// The real repo: every production locale is a target, and coverage runs.
await test("the real repo: its locales are consistent and coverage runs", () => {
  const real = { root: SCRIPTS_ROOT };
  const locales = JSON.parse(fs.readFileSync(path.join(SCRIPTS_ROOT, "locales.json"), "utf8"));
  for (const locale of locales.productionTargets) assert.ok(locales.targets.includes(locale), `${locale} is a production target but not a target`);
  for (const locale of locales.targets) assert.ok(fs.existsSync(path.join(SCRIPTS_ROOT, "locales", locale)), `locales/${locale} is missing`);
  assert.equal(run("coverage.mjs", [], real).status, 0);
  const index = run("build-index.mjs", ["all", "--check"], real);
  assert.equal(index.status, 0, index.out);
});

// The workflows: the loop acts as the Exercism i18n app, and source repos only
// call the reusable workflows here.
const WORKFLOWS = path.join(SCRIPTS_ROOT, ".github", "workflows");
const TEMPLATES = path.join(SCRIPTS_ROOT, "source-repo-workflows");
const readWorkflow = (dir, name) => fs.readFileSync(path.join(dir, name), "utf8");

await test("each source-repo template is a caller of a reusable workflow here, with no steps of its own", () => {
  const calls = { "i18n-queue.yml": "source-queue.yml", "i18n-completeness.yml": "source-completeness.yml" };
  for (const [template, called] of Object.entries(calls)) {
    const text = readWorkflow(TEMPLATES, template);
    assert.ok(text.includes(`uses: exercism/i18n/.github/workflows/${called}@main`), `${template} does not call ${called}`);
    assert.ok(!/^\s+steps:/m.test(text), `${template} has steps of its own`);
    assert.ok(!/actions\/checkout/.test(text), `${template} checks something out`);
    assert.match(readWorkflow(WORKFLOWS, called), /^on:\n  workflow_call:/m, `${called} is not a reusable workflow`);
  }
  // The job names make the status context `i18n / completeness`, the one to require.
  assert.match(readWorkflow(TEMPLATES, "i18n-completeness.yml"), /^jobs:\n  i18n:\n/m);
  assert.match(readWorkflow(WORKFLOWS, "source-completeness.yml"), /^jobs:\n  completeness:\n/m);
  // The queue needs the app's private key, which only reaches it through the caller.
  assert.match(readWorkflow(TEMPLATES, "i18n-queue.yml"), /^    secrets: inherit$/m);
});

await test("the loop's workflows use the app's tokens, each limited to named repos and permissions", () => {
  const names = ["source-queue.yml", "translate-on-issue.yml", "rerun-source-check.yml"];
  for (const name of names) {
    const text = readWorkflow(WORKFLOWS, name);
    assert.ok(!/secrets\.EXERCISM_[A-Z_]*_PAT\b/.test(text), `${name} still uses a personal access token`);
    const mints = text.split("uses: actions/create-github-app-token@").slice(1).map((rest) => rest.split(/\n\s*\n/)[0]);
    assert.ok(mints.length > 0, `${name} mints no app token`);
    for (const mint of mints) {
      assert.match(mint, /app-id: \$\{\{ vars\.EXERCISM_I18N_APP_ID \}\}/, name);
      assert.match(mint, /private-key: \$\{\{ secrets\.EXERCISM_I18N_APP_PRIVATE_KEY \}\}/, name);
      assert.match(mint, /owner: exercism/, name);
      assert.match(mint, /repositories: \S+/, `${name} mints a token for every repo`);
      assert.match(mint, /permission-[a-z-]+: (read|write)/, `${name} mints a token with every permission`);
    }
  }
});

await test("the sweep runs on a schedule, reports whatever its shards did, and queues nothing", () => {
  const text = readWorkflow(WORKFLOWS, "sweep.yml");
  assert.match(text, /^on:\n  schedule:\n    - cron: "[0-9 *\/,-]+"\n  workflow_dispatch:/m, "the sweep has no schedule, so nothing runs it");
  assert.match(text, /fail-fast: false/, "one failing shard would cancel the others");
  // The summary has to be written even when shards failed, or a broken run
  // leaves yesterday's answer in place with nothing saying so.
  assert.match(text, /^  report:\n    needs: \[plan, sweep\]\n    if: always\(\)$/m);
  assert.match(text, /--expected-shards=/, "the merge cannot tell a missing shard from a complete run");
  // It writes one issue and rewrites it. Opening a translation issue per repo
  // would spam, and the queue's issues are scoped to a pull request a sweep has not got.
  assert.ok(text.includes("gh issue edit"), "the sweep never updates an issue in place");
  assert.equal((text.match(/gh issue create/g) ?? []).length, 1);
  assert.ok(!/gh issue comment/.test(text), "the sweep comments, so a daily run would be a thread");
  assert.ok(!/--label translation/.test(text), "a sweep issue labelled `translation` would reach the queue's machinery");
});

// A hand edit either stamps itself or fails loudly, and the two halves are in
// two workflows: one writes, the other reports.
await test("stamp.yml stamps only what a push wrote, and validate.yml never stamps", () => {
  const stamp = readWorkflow(WORKFLOWS, "stamp.yml");
  assert.match(stamp, /^on:\n  push:\n    branches: \[main\]/m, "stamping runs somewhere other than a push to main");
  assert.match(stamp, /--stamp --stamp-changed="\$BASE"/, "stamp.yml stamps something other than what the push wrote");
  assert.match(stamp, /^permissions:\n  contents: write$/m);
  // The app's token would start another run of this workflow with its own
  // commit. GITHUB_TOKEN cannot, which is what stops it triggering itself.
  assert.ok(!/create-github-app-token/.test(stamp), "stamp.yml pushes as the app, which retriggers workflows");
  assert.ok(/grep -v '\\.meta\\.json\$'/.test(stamp), "stamp.yml commits whatever it finds, not only stamps");

  // Comments dropped: the flags a workflow runs with are what matters here,
  // and both files discuss the ones they do not use.
  const validate = readWorkflow(WORKFLOWS, "validate.yml").split("\n").filter((line) => !/^\s*#/.test(line)).join("\n");
  assert.ok(!/--stamp(?![-\w])/.test(validate), "validate.yml writes stamps");
  assert.match(validate, /--stamp-changed=/, "validate.yml cannot tell a stampable unit from an unstampable one");
  assert.match(validate, /^permissions:\n  contents: read$/m);
});

await test("only issues opened by the app are dispatched or replied to", () => {
  const guard = "github.event.issue.user.login == 'exercism-i18n[bot]'";
  assert.ok(readWorkflow(WORKFLOWS, "translate-on-issue.yml").includes(`if: \${{ ${guard} && `));
  assert.ok(readWorkflow(WORKFLOWS, "rerun-source-check.yml").includes(` && ${guard} && github.event.issue.state_reason == 'completed'`));
  for (const name of ["translate-on-issue.yml", "rerun-source-check.yml", "source-queue.yml"]) {
    assert.ok(!/login == 'iHiD'/.test(readWorkflow(WORKFLOWS, name)), `${name} still trusts iHiD`);
  }
  // The queue only finds and edits issues the app opened.
  const queue = readWorkflow(WORKFLOWS, "source-queue.yml");
  assert.equal((queue.match(/gh issue list [^\n]*--author "\$APP_AUTHOR"/g) ?? []).length, 2);
  assert.equal((queue.match(/APP_AUTHOR: app\/exercism-i18n$/gm) ?? []).length, 2);
});

fs.rmSync(TMP, { recursive: true, force: true });

// ------------------------------------------------------------------- result

console.log(failures === 0 ? "\ntest: all assertions passed.\n" : `\ntest: ${failures} FAILED.\n`);
process.exit(failures === 0 ? 0 : 1);
