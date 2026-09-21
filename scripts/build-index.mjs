#!/usr/bin/env node
//
// build-index: generate the translation index's Markdown from its JSON.
//
// Usage:
//   node scripts/build-index.mjs [<locale>|all] [--check]
//
// Writes index/markdown/<locale>/<repo>.md for every index/json/<locale>/<repo>.json,
// and index/markdown/<locale>/README.md. With --check it writes nothing, and
// exits 1 if the JSON is malformed or not in canonical form, lists an id the
// locale's content store has no file for, or if any page differs from what its
// JSON generates. CI runs the check, so a hand edit to a page fails.
//
// The JSON is written by exercism/translator after each pass and by
// scripts/backfill-index.mjs. scripts/lib/translation-index.mjs describes the
// format.

import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "./lib/args.mjs";
import { REPO_ROOT } from "./lib/constants.mjs";
import { INDEX_DIR, checkIndex, indexedLocales, writeMarkdown } from "./lib/translation-index.mjs";

const { flags, positional } = parseArgs(process.argv.slice(2));
const wanted = positional[0] ?? "all";

const markdownLocales = fs.existsSync(path.join(INDEX_DIR, "markdown")) ? fs.readdirSync(path.join(INDEX_DIR, "markdown")) : [];
const locales = wanted === "all" ? [...new Set([...indexedLocales(), ...markdownLocales])].sort() : [wanted];

if (flags.check) {
  let problems = 0;
  for (const locale of locales) {
    const found = checkIndex(locale);
    problems += found.length;
    for (const problem of found) console.log(`  ERROR ${problem}`);
    console.log(`${found.length === 0 ? "ok  " : "FAIL"} ${locale} index`);
  }
  if (locales.length === 0) console.log("no index yet: nothing to check");
  process.exit(problems === 0 ? 0 : 1);
}

for (const locale of locales) {
  const changed = writeMarkdown(locale);
  console.log(`${locale}: ${changed.length} page(s) written`);
  for (const file of changed) console.log(`  ${path.relative(REPO_ROOT, file)}`);
}
