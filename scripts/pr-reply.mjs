#!/usr/bin/env node
//
// pr-reply: the one reply the translation loop posts on a source PR, once
// its translations have landed and its completeness check has re-run, so the
// maintainer knows the PR can be merged. Every other step is recorded on the
// i18n issue only.
//
// Usage:
//   node scripts/pr-reply.mjs translated --issue=<n> --out=<file> [--comments=<file>]
//
//   --issue     the translation issue's number in exercism/i18n
//   --out       where to write the reply's body
//   --comments  the PR's comment bodies, one JSON string per line, as
//               `gh api --paginate .../comments --jq '.[].body | @json'` prints them
//
// Prints `post=true` or `post=false`. It prints `post=false` when the PR's
// latest loop reply is already this one, so a workflow run again does not post
// twice. It never posts anything itself. .github/workflows/rerun-source-check.yml
// calls it when an issue closes as completed.

import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "./lib/args.mjs";
import { PRODUCTION_LOCALES } from "./lib/constants.mjs";
import { languageName } from "./lib/translation-index.mjs";

export const KINDS = ["translated"];

const MARKER = /<!-- exercism-i18n-reply: ([a-z-]+ exercism\/i18n#[0-9]+) -->/;

/** The hidden line that identifies a reply, so a later run can see it was posted. */
export function marker(kind, issue) {
  return `<!-- exercism-i18n-reply: ${kind} exercism/i18n#${issue} -->`;
}

/** "Hungarian", "Hungarian and German", "Hungarian, German and French". */
export function languageList(locales) {
  const names = locales.map(languageName);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** The reply's Markdown. Pure. */
export function replyBody(kind, issue, locales = []) {
  if (!KINDS.includes(kind)) throw new Error(`"${kind}" is not one of ${KINDS.join(", ")}`);
  if (!/^[1-9][0-9]*$/.test(String(issue))) throw new Error(`"${issue}" is not an issue number`);
  const lines = { translated: "This PR has been translated 🚀" };
  return `${lines[kind]}\n\n${marker(kind, issue)}\n`;
}

/**
 * Whether to post: false only when the latest loop reply among `bodies` (oldest
 * first) is this same reply. Pure.
 */
export function shouldPost(bodies, kind, issue) {
  const wanted = marker(kind, issue).match(MARKER)[1];
  for (let i = bodies.length - 1; i >= 0; i -= 1) {
    const found = String(bodies[i] ?? "").match(MARKER);
    if (found) return found[1] !== wanted;
  }
  return true;
}

/** Comment bodies from `--jq '.[].body | @json'` output. Lines that are not JSON strings are skipped. */
export function readBodies(text) {
  const bodies = [];
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue;
    try {
      const value = JSON.parse(line);
      if (typeof value === "string") bodies.push(value);
    } catch {
      // Not a body. Skipping it can only lead to posting, never to losing a reply.
    }
  }
  return bodies;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === new URL(import.meta.url).pathname;
if (isMain) {
  const { flags, positional } = parseArgs(process.argv.slice(2));
  const [kind] = positional;
  if (!KINDS.includes(kind) || typeof flags.issue !== "string" || typeof flags.out !== "string") {
    console.error(`usage: pr-reply.mjs <${KINDS.join("|")}> --issue=<n> --out=<file> [--comments=<file>]`);
    process.exit(2);
  }
  fs.writeFileSync(flags.out, replyBody(kind, flags.issue, PRODUCTION_LOCALES));
  const bodies = typeof flags.comments === "string" ? readBodies(fs.readFileSync(flags.comments, "utf8")) : [];
  console.log(`post=${shouldPost(bodies, kind, flags.issue)}`);
}
