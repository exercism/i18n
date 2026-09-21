// Flattens the website's English: many files in `website`, two catalogs out.
//
// English for the website's UI is written where it is rendered and stays there:
//
//   config/locales/**/*.yml           Rails YAML, under an `en:` root key
//   app/javascript/i18n/en/*.ts       i18next bundles, mapped to namespaces by
//                                     app/javascript/i18n/en/index.ts
//
// This flattens each side into one flat catalog (see catalogs.mjs for the key
// format), minus the areas website-exclusions.json marks as never translated.
// The checker, coverage, completeness and translation passes all read English
// through here, so none of them depends on how the website splits its files,
// and the website can move them freely.
//
// It reads through a `reader` (scripts/lib/git.mjs `refReader`, or a plain
// object in the tests), never the filesystem, so the same code reads website
// main, a PR's head or a fixture, and never executes any of it.
//
// ## What is not English
//
//  - Any root key other than `en`. At 102577eb config/locales/pages/track.yml
//    has `hu:` and `nl:` roots beside `en:`, translations older than this
//    repo. Ignoring them is deliberate (decided by iHiD): those two trees will
//    not be migrated here, and Hungarian and Dutch are translated again from
//    scratch with the current engine, like every other locale. They are still
//    reported in `notes`, so a new non-English root in the website gets
//    noticed.
//  - A leaf that is not a string (a number, a boolean, null). There is nothing
//    to translate, so it never becomes a key. Counted in `notes`.
//  - A bundle file index.ts does not import. i18next never loads it, so
//    requiring a translation of it would block PRs on text no user can see.

import fs from "node:fs";
import path from "node:path";
import { REPO_ROOT, fail } from "./constants.mjs";
import { parseBundle } from "./ts-object.mjs";

export const BACKEND_DIR = "config/locales";
export const FRONTEND_DIR = "app/javascript/i18n/en";
export const FRONTEND_INDEX = `${FRONTEND_DIR}/index.ts`;

/** Whether a change to this path can change website English. Used by the queue. */
export function isWebsiteEnglishPath(file) {
  return (file.startsWith(`${BACKEND_DIR}/`) && /\.ya?ml$/.test(file)) || (file.startsWith(`${FRONTEND_DIR}/`) && file.endsWith(".ts"));
}

// --------------------------------------------------------------- exclusions --

/** `*` within a segment, `**` across segments. Nothing else is special. */
export function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const pattern = escaped.split("**").map((part) => part.replace(/\*/g, "[^/]*")).join(".*");
  return new RegExp(`^${pattern}$`);
}

export function loadExclusions(root = REPO_ROOT) {
  const file = path.join(root, "website-exclusions.json");
  const areas = fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, "utf8")).areas ?? {}) : {};
  const collect = (field) => Object.values(areas).flatMap((area) => area[field] ?? []);
  return {
    backendFiles: collect("backendFiles").map(globToRegExp),
    backendKeys: collect("backendKeys"),
    frontendNamespaces: collect("frontendNamespaces").map(globToRegExp)
  };
}

const excludedKey = (key, prefixes) => prefixes.some((prefix) => key === prefix || key.startsWith(`${prefix}.`));

// ------------------------------------------------------------------ backend --

let yamlModule = null;

/**
 * The one dependency in this repo, loaded only by the code that reads Rails
 * YAML. The website's files use folded scalars, multi-line plain scalars,
 * anchors and various quoting rules, and a hand-written reader that got one of
 * them subtly wrong would produce English different from what Rails renders,
 * without anyone noticing. Everything else here runs on plain `node`.
 */
async function yaml() {
  if (yamlModule) return yamlModule;
  try {
    yamlModule = await import("yaml");
  } catch {
    fail("reading the website's Rails YAML needs the `yaml` package. Run `pnpm install` first.");
  }
  return yamlModule;
}

function walkLeaves(node, prefix, visit, arrays) {
  if (Array.isArray(node)) arrays.add(prefix);
  if (node !== null && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) walkLeaves(value, prefix ? `${prefix}.${key}` : String(key), visit, arrays);
  } else {
    visit(prefix, node);
  }
}

export async function buildBackendEnglish(reader, exclusions) {
  const { parse } = await yaml();
  const notes = [];
  const catalog = {};
  const arrays = new Set();
  const origin = {};
  let nonString = 0;

  const files = reader
    .list(BACKEND_DIR)
    .filter((entry) => /\.ya?ml$/.test(entry.path))
    .sort((a, b) => (a.path < b.path ? -1 : 1));

  for (const entry of reader.readMany(files)) {
    const relative = entry.path.slice(BACKEND_DIR.length + 1);
    if (exclusions.backendFiles.some((pattern) => pattern.test(relative))) continue;
    if (entry.text === null) throw new Error(`${entry.path}: could not read this file from ${reader.describe ?? "the checkout"}`);

    let document;
    try {
      // `merge: true` for `<<:` keys, which Rails' own loader (Psych) honours.
      document = parse(entry.text, { merge: true });
    } catch (error) {
      throw new Error(`${entry.path}: invalid YAML, ${error.message}`);
    }
    if (document === null || typeof document !== "object") continue;

    const otherRoots = Object.keys(document).filter((root) => root !== "en");
    if (otherRoots.length > 0) notes.push(`${entry.path}: ignored non-English root key(s) ${otherRoots.join(", ")}`);
    if (!("en" in document)) continue;

    walkLeaves(
      document.en,
      "",
      (key, value) => {
        if (typeof value !== "string") {
          nonString += 1;
          return;
        }
        if (excludedKey(key, exclusions.backendKeys)) return;
        // Rails deep-merges its load path and the last file wins. Two files
        // defining one key differently is almost always a mistake in the website,
        // and which one Rails picks depends on a load order this repo cannot
        // see, so it is reported in `notes` (here the later file wins).
        if (key in catalog && catalog[key] !== value) notes.push(`${key}: defined differently in ${origin[key]} and ${entry.path}; the later file wins here`);
        catalog[key] = value;
        origin[key] = entry.path;
      },
      arrays
    );
  }

  if (nonString > 0) notes.push(`${nonString} non-string leaf value(s) skipped (numbers, booleans, null): nothing to translate`);
  return { catalog, arrays: [...arrays].sort(), files: files.length, notes };
}

// ----------------------------------------------------------------- frontend --

function flattenBundle(node, prefix, out, file) {
  for (const [key, value] of Object.entries(node)) {
    const flatKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") out[flatKey] = value;
    else if (value && typeof value === "object" && !("$ref" in value)) flattenBundle(value, flatKey, out, file);
    else throw new Error(`${file}: ${flatKey} is a reference to another module, which a bundle may not contain`);
  }
  return out;
}

export function buildFrontendEnglish(reader, exclusions) {
  const notes = [];
  const catalog = {};

  const files = reader.list(FRONTEND_DIR).filter((entry) => entry.path.endsWith(".ts"));
  const byPath = new Map(reader.readMany(files).map((entry) => [entry.path, entry]));
  for (const entry of byPath.values()) {
    if (entry.text === null) throw new Error(`${entry.path}: could not read this file from ${reader.describe ?? "the checkout"}`);
  }

  const index = byPath.get(FRONTEND_INDEX);
  if (!index) throw new Error(`no ${FRONTEND_INDEX}: the namespace map is what says which bundles i18next loads`);
  const { imports, value: namespaces } = parseBundle(index.text, FRONTEND_INDEX);

  const used = new Set([FRONTEND_INDEX]);
  for (const [namespace, reference] of Object.entries(namespaces)) {
    if (!reference || typeof reference !== "object" || !("$ref" in reference)) throw new Error(`${FRONTEND_INDEX}: namespace ${namespace} is not an import`);
    const specifier = imports[reference.$ref];
    if (!specifier) throw new Error(`${FRONTEND_INDEX}: namespace ${namespace} names ${reference.$ref}, which is never imported`);
    if (namespace.includes(":")) throw new Error(`${FRONTEND_INDEX}: namespace ${JSON.stringify(namespace)} contains ":", the namespace separator`);

    const file = path.posix.join(FRONTEND_DIR, `${specifier}.ts`);
    const bundle = byPath.get(file);
    if (!bundle) throw new Error(`${FRONTEND_INDEX}: namespace ${namespace} imports ${specifier}, and there is no ${file}`);
    used.add(file);
    if (exclusions.frontendNamespaces.some((pattern) => pattern.test(namespace))) continue;

    const flat = flattenBundle(parseBundle(bundle.text, file).value, "", {}, file);
    for (const [key, text] of Object.entries(flat)) catalog[`${namespace}:${key}`] = text;
  }

  const unused = files.map((entry) => entry.path).filter((file) => !used.has(file));
  if (unused.length > 0) notes.push(`${unused.length} bundle file(s) not imported by index.ts, so not English: ${unused.map((file) => path.posix.basename(file)).join(", ")}`);

  return { catalog, arrays: [], files: files.length, notes };
}

/** Both catalogs, as `{ backend: { catalog, arrays, files, notes }, frontend: ... }`. */
export async function buildWebsiteEnglish(reader, { exclusions = loadExclusions(), kinds = ["backend", "frontend"] } = {}) {
  const out = {};
  if (kinds.includes("backend")) out.backend = await buildBackendEnglish(reader, exclusions);
  if (kinds.includes("frontend")) out.frontend = buildFrontendEnglish(reader, exclusions);
  return out;
}
