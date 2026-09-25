#!/usr/bin/env node
//
// allow-identical: sign off an English string that a translation deliberately
// leaves as it is, so validate stops reporting it.
//
// Usage:
//   node scripts/allow-identical.mjs --reason="<why>" [--locale=<code>] [--by=<name>] <the English text>
//   node scripts/allow-identical.mjs --reason="<why>" [--locale=<code>] --stdin < file
//   node scripts/allow-identical.mjs --reason="<why>" [--locale=<code>] --file=<a content file>
//
// Examples:
//   node scripts/allow-identical.mjs --reason="Attribution: the exercise's authors." "Maud de Vries, Erik Schierboom"
//   node scripts/allow-identical.mjs --reason="A trademark French keeps." --locale=fr "Some Product Name"
//   node scripts/allow-identical.mjs --reason="One placeholder." --file=locales/fr/content/23/f5/b9b8...md
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
// It refuses a string of 24 characters or fewer, because the catalog check
// itself ignores those, so the entry could never match anything. It refuses a
// text already in the file, unless `--locale` widens an entry that names
// locales.
//
// ## Signing off a content file
//
// A blob-keyed content file gets the same warning when its own blob id is the
// id it is filed under, and the same allowlist covers it, because that id is
// the blob id of the file's bytes, which is what this script computes. So
// `--file=<the translated file>` signs one off, and it reads the bytes as they
// are: `--stdin` drops a trailing newline that a shell added, and a file's own
// trailing newline is part of it. There is no minimum length, because the
// content check has none, and the file is checked against the path it sits in,
// so a file that is not identical to its English cannot be signed off by
// mistake.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { REPO_ROOT, TARGET_LOCALES, fail } from "./lib/constants.mjs";
import { parseArgs } from "./lib/args.mjs";
import { stringId } from "./lib/catalogs.mjs";
import { BLOB_ID } from "./lib/git.mjs";
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
  const fromFile = typeof flags.file === "string" ? flags.file : null;
  const sources = [fromStdin, fromFile !== null, positional.length > 0].filter(Boolean).length;
  if (sources !== 1) fail("give the English text as arguments, or pass --stdin and feed it in, or pass --file=<a content file>. Exactly one of the three.");

  // A shell adds a newline that the English string does not have, and one byte
  // is a different blob id, so the entry would match nothing. A file's own
  // trailing newline is part of the file, so --file keeps it.
  const text = fromFile !== null ? fs.readFileSync(fromFile, "utf8") : fromStdin ? fs.readFileSync(0, "utf8").replace(/\n$/, "") : positional.join(" ");
  if (text.trim() === "") fail("the English text is empty.");
  // The catalog check ignores a short string, so an entry for one would match
  // nothing. The content check has no minimum, so a file is exempt.
  if (fromFile === null && text.length < IDENTICAL_MINIMUM) {
    fail(`"${text}" is ${text.length} characters, and the check ignores anything shorter than ${IDENTICAL_MINIMUM}, so this entry would never match. Nothing to sign off.`);
  }
  // A content file is filed under the blob id of its English, so a file worth
  // signing off hashes to the id in its own path. One that does not is a
  // translated file, which the check never reports.
  if (fromFile !== null) {
    const filed = path.basename(path.dirname(path.dirname(fromFile))) + path.basename(path.dirname(fromFile)) + path.basename(fromFile).replace(/\.[^.]+$/, "");
    if (!BLOB_ID.test(filed)) fail(`--file=${fromFile} is not a blob-keyed content path (<ab>/<cd>/<36 hex>.<ext>), so there is nothing for an entry to match.`);
    if (stringId(text) !== filed) fail(`--file=${fromFile} hashes to ${stringId(text)} and sits under ${filed}, so it is not byte-identical to its English. The check does not report it, and nothing needs signing off.`);
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
