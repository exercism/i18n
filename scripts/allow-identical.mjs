#!/usr/bin/env node
//
// allow-identical: sign off an English string that a translation deliberately
// leaves as it is, so validate stops reporting it.
//
// Usage:
//   node scripts/allow-identical.mjs --reason="<why>" [--locale=<code>] [--by=<name>] <the English text>
//   node scripts/allow-identical.mjs --reason="<why>" [--locale=<code>] --stdin < file
//
// Examples:
//   node scripts/allow-identical.mjs --reason="Attribution: the exercise's authors." "Maud de Vries, Erik Schierboom"
//   node scripts/allow-identical.mjs --reason="A trademark French keeps." --locale=fr "Some Product Name"
//
// ## Why a script and not a hand-edited file
//
// The entry is keyed by the git blob id of the English string, and this script
// computes that id from the text. Nobody types a hash, and a typed hash is
// exactly the failure this repo has already had once: a hand-written stamp
// looks like a checked fact without being one, and a model will invent a
// plausible hash. The text is stored beside its id so the file reads as
// English, and validate checks on every run that the two still agree
// (scripts/lib/identical.mjs `allowlistIssues`), so a hand edit to either side
// stops the run instead of silently hiding a different string.
//
// ## What it will not do
//
// It refuses a string of 24 characters or fewer, because the check itself
// ignores those, so the entry could never match anything. It refuses a text
// already in the file, unless `--locale` widens an entry that names locales.

import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { REPO_ROOT, TARGET_LOCALES, fail } from "./lib/constants.mjs";
import { parseArgs } from "./lib/args.mjs";
import { stringId } from "./lib/catalogs.mjs";
import { ALLOWLIST_FILE, allowlistIssues, allowlistPath } from "./lib/identical.mjs";

const IDENTICAL_MINIMUM = 25;

function whoami() {
  try {
    return execFileSync("git", ["config", "user.name"], { cwd: REPO_ROOT, encoding: "utf8" }).trim() || null;
  } catch {
    return null;
  }
}

const COMMENT = [
  "English strings a translation deliberately leaves as they are.",
  "",
  "Each entry is keyed by the git blob id of the English string, which is what",
  "the staleness stamps use too. Edit the English and it has a new id, this",
  "entry stops matching, and validate reports the string again.",
  "",
  "An entry covers every locale unless it lists `locales`. Add one with",
  "scripts/allow-identical.mjs, never by hand: the script computes the id from",
  "the text, and validate stops the run if an id and its text disagree."
];

function read(file) {
  if (!fs.existsSync(file)) return { $comment: COMMENT, allowed: {} };
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const issues = allowlistIssues(data);
  if (issues.length > 0) fail(`${ALLOWLIST_FILE} is not sound, so nothing was added:\n       ${issues.join("\n       ")}`);
  return data;
}

function write(file, data) {
  const allowed = Object.fromEntries(Object.entries(data.allowed).sort(([a], [b]) => (a < b ? -1 : 1)));
  fs.writeFileSync(file, `${JSON.stringify({ $comment: data.$comment ?? COMMENT, allowed }, null, 2)}\n`);
}

function main() {
  const { flags, positional } = parseArgs(process.argv.slice(2));
  const reason = typeof flags.reason === "string" ? flags.reason.trim() : "";
  if (reason === "") fail(`--reason="<why this string is deliberately identical>" is required. It is what a future reader has instead of a guess.`);

  const fromStdin = Boolean(flags.stdin);
  if (fromStdin === (positional.length > 0)) fail("give the English text as arguments, or pass --stdin and feed it in, and not both.");
  // A shell adds a newline that the English string does not have, and one byte
  // is a different blob id, so the entry would match nothing.
  const text = fromStdin ? fs.readFileSync(0, "utf8").replace(/\n$/, "") : positional.join(" ");
  if (text.trim() === "") fail("the English text is empty.");
  if (text.length < IDENTICAL_MINIMUM) {
    fail(`"${text}" is ${text.length} characters, and the check ignores anything shorter than ${IDENTICAL_MINIMUM}, so this entry would never match. Nothing to sign off.`);
  }

  const locale = typeof flags.locale === "string" ? flags.locale : null;
  if (locale !== null && !TARGET_LOCALES.includes(locale)) fail(`unknown target locale "${locale}". Known: ${TARGET_LOCALES.join(", ") || "(none)"}`);
  const by = typeof flags.by === "string" ? flags.by : whoami();
  if (!by) fail("--by=<name> is required here, because git config user.name is not set.");

  const file = allowlistPath();
  const data = read(file);
  const id = stringId(text);
  const existing = data.allowed[id];

  if (existing && (existing.locales === undefined || locale === null)) {
    console.log(`Already allowed: ${id} ${JSON.stringify(text)} (added ${existing.added} by ${existing.by}, ${existing.locales ? existing.locales.join(" ") : "every locale"}). Nothing written.`);
    return;
  }
  if (existing) {
    if (existing.locales.includes(locale)) {
      console.log(`Already allowed for ${locale}: ${id}. Nothing written.`);
      return;
    }
    existing.locales = [...existing.locales, locale].sort();
    write(file, data);
    console.log(`Widened ${id} ${JSON.stringify(text)} to ${existing.locales.join(" ")} in ${ALLOWLIST_FILE}.`);
    return;
  }

  data.allowed[id] = { text, reason, added: new Date().toISOString().slice(0, 10), by, ...(locale ? { locales: [locale] } : {}) };
  write(file, data);
  console.log(`Allowed ${id} ${JSON.stringify(text)} for ${locale ?? "every locale"} in ${ALLOWLIST_FILE}.`);
}

main();
