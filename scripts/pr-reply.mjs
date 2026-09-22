#!/usr/bin/env node
//
// pr-reply: the replies the translation loop posts on a source PR, so a
// maintainer watching the PR can follow its translation.
//
// Usage:
//   node scripts/pr-reply.mjs <kind> --issue=<n> --out=<file> [--comments=<file>]
//
//   <kind>      started | translated | needs-attention | over-cap
//   --issue     the translation issue's number in exercism/i18n
//   --out       where to write the reply's body
//   --comments  the PR's comment bodies, one JSON string per line, as
//               `gh api --paginate .../comments --jq '.[].body | @json'` prints them
//
// Prints `post=true` or `post=false`. It prints `post=false` when the PR's
// latest loop reply is already this one, so a label added twice or a workflow
// run again does not post twice. It never posts anything itself.
//
// Each workflow posts one reply per event:
//
//   started          source-repo-workflows/i18n-queue.yml, when it opens an
//                    issue here (never when it updates one)
//   translated       .github/workflows/rerun-source-check.yml, when the issue
//                    closes as completed
//   needs-attention  the same workflow, when the translator labels the issue
//                    `needs-attention`
//   over-cap         the same, when the issue also has the `over-cap` label,
//                    which the translator adds first when a change is above its
//                    word cap
//
// The workflows decide the kind from events and labels only, and read nothing
// from the issue but the repo and PR number in its title. The wording lives
// here so the templates installed in every source repo and this repo's own
// workflow cannot drift apart.

import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "./lib/args.mjs";
import { PRODUCTION_LOCALES } from "./lib/constants.mjs";
import { languageName } from "./lib/translation-index.mjs";

export const KINDS = ["started", "translated", "needs-attention", "over-cap"];

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
  const link = `exercism/i18n#${issue}`;
  const lines = {
    started: `Translation started: ${link}. The \`i18n completeness\` check re-runs when the translations land.`,
    translated: "This PR has been translated 🚀",
    "needs-attention": `Translation hit a problem, and we're fixing it: ${link}. The \`i18n completeness\` check re-runs once it's done.`,
    "over-cap": `Translation is waiting for approval, because this PR changes more English than the word limit allows: ${link}. The \`i18n completeness\` check re-runs once it's translated.`
  };
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
