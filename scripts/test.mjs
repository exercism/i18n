#!/usr/bin/env node
//
// test: the assertions that guard the parts of this repo a mistake in would be
// invisible until it reached a user.
//
// Usage:
//   node scripts/test.mjs
//
// Deliberately a plain script with plain assertions, matching the rest of
// scripts/: no framework, `node scripts/test.mjs` and a non-zero exit on failure.
// Add a `test(name, fn)` block, not a dependency.
//
// ## Two halves
//
// The first half asserts pure functions in-process. The second builds a FIXTURE
// in a temp directory (a tiny `website`, a tiny track, and a tiny copy of this
// repo with real target locales, all of them real git repositories) and runs the
// real scripts over it as subprocesses, with EXERCISM_I18N_ROOT pointed at it.
// That half exists because the real `locales.json` lists no locale yet, so
// without it the checker, the completeness check and the publisher would only
// ever be run against nothing.

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { SCRIPTS_ROOT, productionLocaleIssue } from "./lib/constants.mjs";
import { blobId, lsTree, readBlobs, refReader } from "./lib/git.mjs";
import { BundleSyntaxError, parseBundle } from "./lib/ts-object.mjs";
import { PLURAL_SPELLING, requiredCategories } from "./lib/plurals.mjs";
import { englishUnits, flattenCatalog, stringId, targetEntries, unflattenCatalog, unitHash, unitState } from "./lib/catalogs.mjs";
import { ERROR, WARN, checkCatalog, checkContentFile, placeholders, tags } from "./lib/checks.mjs";
import { CONTENT_TYPES, CONTENT_TYPE_IDS, contentRelativePath, parseContentRelativePath, typeForPath } from "./lib/content-types.mjs";
import { REPO_KINDS, kindForRepo } from "./lib/source-repos.mjs";
import { missingContent, missingUnits, requiredContent, requiredUnits } from "./lib/completeness.mjs";
import { buildWebsiteEnglish, globToRegExp, isWebsiteEnglishPath, loadExclusions } from "./lib/website-english.mjs";
import { GuardViolation, assertPublishableKey } from "./lib/guard.mjs";
import { findDeletions } from "./no-deletions.mjs";
import { readPrFiles, summarise, toMarkdown } from "./english-changes.mjs";
import { catalogArtifacts } from "./publish.mjs";

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

// The whole content store is addressed by this one function. If it disagrees
// with git by a byte, every translation is filed under a key nothing asks for.
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
    assert.ok(["file", "fragment"].includes(type.unit), `${id}: unit`);
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
  assert.equal(typeForPath("docs", "building/config.json", { unit: "fragment" }), "docs-metadata");
  assert.equal(typeForPath("docs", "anatomy/config.json", { unit: "fragment" }), null);

  assert.equal(typeForPath("blog", "posts/a-post.md"), "blog-post");
  assert.equal(typeForPath("blog", "stories/a-story.md"), "community-story");
  assert.equal(typeForPath("blog", "posts/nested/x.md"), null);
  assert.equal(typeForPath("blog", "README.md"), null);
  assert.equal(typeForPath("blog", "config.json", { unit: "fragment" }), "blog-metadata");

  assert.equal(typeForPath("website-copy", "analyzer-comments/ruby/general/explicit_return.md"), "analyzer-comments");
  for (const unserved of ["tracks/ruby/exercises/two-fer/mentoring.md", "tracks/ruby/mentoring.md", "pages/about.md", "walkthrough/index.html", "automators.json", "licences/mit.md"]) {
    assert.equal(typeForPath("website-copy", unserved), null, unserved);
    assert.equal(typeForPath("website-copy", unserved, { unit: "fragment" }), null, unserved);
  }
});

// The open question must stay visibly open: a fragment file is never a `file`
// type (which would require translating a whole config.json) and never nothing
// (which would let it vanish from every report).
await test("config.json and metadata.toml are fragment types, inert but named", () => {
  assert.equal(typeForPath("track", "exercises/practice/two-fer/.meta/config.json"), null);
  assert.equal(typeForPath("track", "exercises/practice/two-fer/.meta/config.json", { unit: "fragment" }), "exercise-metadata");
  assert.equal(typeForPath("problem-specifications", "exercises/two-fer/metadata.toml", { unit: "fragment" }), "problem-specification-metadata");
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

// Too narrow must be loud. A construct the parser skipped would drop keys from
// English, and a key English does not list is a key nothing requires.
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

// THE decision this repo's parity is built on: a target language legitimately
// holds different plural keys from English.
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
  assert.equal(summary.count, 1);
  const markdown = toMarkdown(summary);
  assert.ok(markdown.includes("`docs/a'\\|b.md`"));
  assert.ok(markdown.includes("NOT translatable yet") && markdown.includes("`config.json`"));
  assert.ok(isWebsiteEnglishPath("config/locales/views/x.yml") && isWebsiteEnglishPath("app/javascript/i18n/en/a.ts") && !isWebsiteEnglishPath("app/javascript/i18n/i18n.ts"));
});

// ----------------------------------------------------------------- the guard --

await test("the S3 key guard refuses English, a foreign prefix, a traversal and an unknown locale", () => {
  const locales = ["hu"];
  for (const key of ["i18n/website/en/backend-0.json", "i18n/website/en-US/x.json", "static/website/hu/x.json", "i18n/content/hu/../en/x.md", "i18n/website/undefined/x.json", "i18n/website/pl/x.json"]) {
    assert.throws(() => assertPublishableKey(key, { locales }), GuardViolation, key);
  }
  assert.equal(assertPublishableKey("/i18n/website/hu/backend-0123456789ab.json", { locales }), "i18n/website/hu/backend-0123456789ab.json");
});

await test("a catalog artifact is hashed from its bytes, wrapped for Rails, with a pointer naming it", () => {
  const built = catalogArtifacts("hu", "backend", { nav: { home: "Kezdőlap" } });
  assert.deepEqual(JSON.parse(built.artifact.bytes), { hu: { nav: { home: "Kezdőlap" } } });
  assert.match(built.artifact.key, /^i18n\/website\/hu\/backend-[0-9a-f]{12}\.json$/);
  assert.deepEqual(JSON.parse(built.pointer.bytes), { hash: built.hash });
  assert.equal(built.pointer.key, "i18n/website/hu/backend.current.json");
  assert.deepEqual(JSON.parse(catalogArtifacts("hu", "frontend", { ns: { k: "v" } }).artifact.bytes), { ns: { k: "v" } });
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

function commitAll(dir, message) {
  gitIn(dir, "add", "-A");
  gitIn(dir, "-c", "user.name=test", "-c", "user.email=test@example.com", "commit", "--quiet", "-m", message);
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

let ENGLISH;
await test("fixture: the website flattens to two catalogs, minus exclusions, other roots and orphans", async () => {
  ENGLISH = await buildWebsiteEnglish(refReader(WEBSITE, "HEAD"), { exclusions: loadExclusions(SCRIPTS_ROOT) });
  assert.deepEqual(ENGLISH.backend.catalog, { "nav.home": "Home", "nav.slots.one": "1 slot", "nav.slots.other": "%{count} slots", "nav.cta_html": 'Or <a href="%{path}">donate</a>.\n' });
  assert.deepEqual(Object.keys(ENGLISH.frontend.catalog), ["components/nav:menu.open", "components/nav:items_one", "components/nav:items_other"]);
  assert.ok(ENGLISH.backend.notes.some((note) => /non-English root key\(s\) hu/.test(note)));
  assert.ok(ENGLISH.frontend.notes.some((note) => /orphan\.ts/.test(note)));
});

// The fixture copy of THIS repo: real locales, one of them production.
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

await test("fixture: CI never stamps, and --stamp stamps exactly the units that passed", () => {
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

await test("fixture: completeness blocks a track until every production locale holds every blob", () => {
  const before = run("completeness.mjs", [`--source-repo=${TRACK}`, "--repo=exercism/ruby"]);
  assert.equal(before.status, 1, before.out);
  assert.match(before.out, /FAIL hu: 1 translation\(s\) outstanding/);
  assert.match(before.out, /docs\/ABOUT\.md \(track-docs\)/);
  assert.match(before.out, /NOT CHECKED: 1 file/);

  writeTree(ROOT, { [`locales/hu/content/${contentRelativePath(ABOUT_ID, ".md")}`]: "# Rólunk\n\nA Ruby szép.\n" });
  const after = run("completeness.mjs", [`--source-repo=${TRACK}`, "--repo=exercism/ruby"]);
  assert.equal(after.status, 0, after.out);
  assert.match(after.out, /ok\s+hu/);
});

await test("fixture: an edit to English is a new blob, so it blocks again, and --base scopes it to the PR", () => {
  writeTree(TRACK, { "exercises/practice/two-fer/.docs/instructions.md": "# Instructions\n\nSay `One for you, one for me`.\n", "docs/TESTS.md": "# Tests\n" });
  commitAll(TRACK, "edit");
  const { status, out } = run("completeness.mjs", [`--source-repo=${TRACK}`, "--repo=exercism/ruby", "--head=HEAD", "--base=HEAD^1"]);
  assert.equal(status, 1, out);
  assert.match(out, /requires 2 content file/);
  assert.match(out, /FAIL hu: 2 translation/);
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

await test("fixture: publish builds artifact, pointer and blob-path content, and a plan that uploads pointers last", () => {
  const out = path.join(TMP, "dist");
  const result = run("publish.mjs", ["all", `--out=${out}`]);
  assert.equal(result.status, 0, result.out);
  const manifest = JSON.parse(fs.readFileSync(path.join(out, "manifest.json"), "utf8"));
  const hash = manifest.locales.hu.website.backend;
  assert.ok(fs.existsSync(path.join(out, `i18n/website/hu/backend-${hash}.json`)));
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(out, "i18n/website/hu/backend.current.json"), "utf8")), { hash });
  assert.ok(fs.existsSync(path.join(out, "i18n/content/hu", contentRelativePath(INSTRUCTIONS_ID, ".md"))));
  const plan = fs.readFileSync(path.join(out, "sync.sh"), "utf8");
  assert.ok(plan.indexOf("immutable") < plan.indexOf("*.current.json"), "pointers must come after artifacts");
  assert.equal(run("publish.mjs", ["all", `--out=${out}`, "--upload"]).status, 1, "--upload must refuse without a bucket");
});

await test("fixture: coverage reports units and blob coverage, and never gates", () => {
  const { status, out } = run("coverage.mjs", ["all", `--content-repos=${TRACK}:track@HEAD`]);
  assert.equal(status, 0, out);
  assert.match(out, /hu\s+\(production\)/);
  assert.match(out, /website-backend\s+4\/4 100%/);
  assert.match(out, /ruby: track-docs\s+1\/2/);
});

await test("fixture: no-deletions names a removed file and a removed key, and ignores stamp files", () => {
  const base = commitAll(ROOT, "translations");
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

// The state this repo is actually in today. Every script must run, exit 0 and
// SAY that it checked nothing, because a silent green over an empty gate is the
// failure the whole `productionTargets` design exists to prevent.
await test("the real, empty repo: every script runs, exits 0, and says nothing gates", () => {
  const real = { root: SCRIPTS_ROOT };
  const validate = run("validate.mjs", ["all"], real);
  assert.equal(validate.status, 0, validate.out);
  assert.match(validate.out, /NOTHING GATES/);
  const complete = run("completeness.mjs", [`--source-repo=${TRACK}`, "--repo=exercism/ruby"], real);
  assert.equal(complete.status, 0, complete.out);
  assert.match(complete.out, /NOTHING GATES/);
  assert.equal(run("publish.mjs", ["all", `--out=${path.join(TMP, "dist-real")}`], real).status, 0);
  assert.equal(run("coverage.mjs", [], real).status, 0);
});

fs.rmSync(TMP, { recursive: true, force: true });

// ------------------------------------------------------------------- result

console.log(failures === 0 ? "\ntest: all assertions passed.\n" : `\ntest: ${failures} FAILED.\n`);
process.exit(failures === 0 ? 0 : 1);
