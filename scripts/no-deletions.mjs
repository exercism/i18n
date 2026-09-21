#!/usr/bin/env node
//
// no-deletions: fail a change to locales/ that removes a file or a key.
//
// Usage:
//   node scripts/no-deletions.mjs [--base=<ref>] [--head=<ref>]
//
// Defaults: base `origin/main`, head `HEAD`. Both are git refs and the working
// tree is never read, so run it after committing (or against the branch CI
// sees).
//
// ## Why deletions fail
//
// Translation runs ahead of English merging. A source repo's PR opens an issue
// here, the translations land here, and only then can the PR merge, because
// its completeness check looks for them here. Every source repo's `main` is
// held to the same standard. So at any time this repo has to hold translations
// for the English on the main branch of every source repo and on every one of
// their open PRs, around eighty-five repos in all.
//
// A pass that rewrites a catalog to match one PR, dropping the keys that PR
// renamed away, breaks website main as soon as it lands: every other website
// PR fails until that one merges, and a production locale serves a catalog
// missing keys the deployed site still uses. Extra keys are never an error
// here (a key English no longer defines is just unused), so the simple rule
// that keeps everything passing is: add and update, never delete.
//
// Blob-keyed content has even less reason to be removed. A blob id always
// names the same English bytes, some commit of some repo may still hold it,
// and twenty tracks may share it. A content file never goes out of date.
//
// ## Overriding
//
// Some removals are correct: retiring a locale, fixing a file created at the
// wrong path, removing a key that was never English. Add an
// `Allow-Deletions: <why>` trailer to a commit in the range, and the removals
// are listed without failing. The reason stays in the history.

import path from "node:path";
import { execFileSync } from "node:child_process";
import { REPO_ROOT } from "./lib/constants.mjs";

function git(args, cwd = REPO_ROOT) {
  return execFileSync("git", args, { cwd, encoding: "utf8" });
}

/** Dotted paths of every leaf in a catalog, so nested removals are named exactly. */
export function flattenKeys(value, prefix = "") {
  if (value === null || typeof value !== "object" || Array.isArray(value))
    return [prefix];
  return Object.entries(value).flatMap(([key, child]) =>
    flattenKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

/** Keys present in `base` that `head` no longer holds. */
export function missingKeys(base, head) {
  const kept = new Set(flattenKeys(head));
  return flattenKeys(base).filter((key) => !kept.has(key));
}

function readJsonAt(ref, file, cwd) {
  try {
    return JSON.parse(git(["show", `${ref}:${file}`], cwd));
  } catch {
    return null;
  }
}

/**
 * Every removal between two refs under locales/: deleted files, the old path of
 * a rename, and keys dropped from a catalog that still exists. Stamp files
 * (`*.meta.json`) are skipped because they are generated.
 */
export function findDeletions(base, head, { cwd = REPO_ROOT } = {}) {
  const deletions = [];
  const status = git(
    ["diff", "--name-status", "-M", base, head, "--", "locales/"],
    cwd,
  );

  for (const line of status.split("\n").filter(Boolean)) {
    const [code, ...paths] = line.split("\t");
    const kind = code[0];
    const file = paths[0];

    if (kind === "D") {
      deletions.push({ file, what: "file removed" });
    } else if (kind === "R") {
      deletions.push({ file, what: `file moved to ${paths[1]}` });
    } else if (
      kind === "M" &&
      file.endsWith(".json") &&
      !file.endsWith(".meta.json")
    ) {
      const before = readJsonAt(base, file, cwd);
      const after = readJsonAt(head, file, cwd);
      if (before === null || after === null) continue;
      for (const key of missingKeys(before, after))
        deletions.push({ file, what: `key removed: ${key}` });
    }
  }
  return deletions;
}

function allowedBy(base, head) {
  const trailers = git([
    "log",
    "--format=%(trailers:key=Allow-Deletions,valueonly)",
    `${base}..${head}`,
  ]);
  return trailers
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === new URL(import.meta.url).pathname;
if (isMain) {
  const args = Object.fromEntries(
    process.argv.slice(2).map((arg) => {
      const [key, value] = arg.replace(/^--/, "").split("=");
      return [key, value ?? true];
    }),
  );
  const base = args.base ?? "origin/main";
  const head = args.head ?? "HEAD";

  const deletions = findDeletions(base, head);
  if (deletions.length === 0) {
    console.log(
      `no-deletions: nothing removed under locales/ between ${base} and ${head}.`,
    );
    process.exit(0);
  }

  const allowed = allowedBy(base, head);
  console.log(
    `no-deletions: ${deletions.length} removal(s) under locales/ between ${base} and ${head}:`,
  );
  for (const { file, what } of deletions) console.log(`  ${file}: ${what}`);

  if (allowed.length > 0) {
    console.log(`\nAllowed by Allow-Deletions trailer: ${allowed.join("; ")}`);
    process.exit(0);
  }

  console.error(
    `\nTranslation adds and updates; it never deletes. This repo has to hold every key and every\n` +
      `content file that any source repo's main defines AND that each of their open PRs defines,\n` +
      `because each of them checks its PRs against what is here. A key English no longer uses is\n` +
      `harmless; one it still uses, removed here, blocks every other PR and breaks a served locale.\n\n` +
      `Put the file or key back. If the removal is right (a retired locale, a wrong path, a key that\n` +
      `was never English), say why in an \`Allow-Deletions: <reason>\` trailer on the commit.\n`,
  );
  process.exit(1);
}
