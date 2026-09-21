// Where English comes from: which repos, which checkout, which ref.
//
// English is not stored in this repo. It is read from a checkout of the repo
// it is written in, through git objects (scripts/lib/git.mjs), and every
// script that needs a checkout finds it here. See ENGLISH-SOURCE.md.
//
// Exercism's English is spread over many repos: the website, the docs, the
// blog, website-copy, problem-specifications, and one repo per track, around
// eighty in all. So each repo has a kind, the kind decides which content types
// can live in it (content-types.mjs), and every track repo has the same kind.
// There is no list of tracks here, and there should not be one: the website's
// database decides which tracks exist, and a copy would go out of date as soon
// as a track launched.

import fs from "node:fs";
import path from "node:path";
import { SCRIPTS_ROOT, fail } from "./constants.mjs";
import { refExists } from "./git.mjs";

export const REPO_KINDS = {
  website: {
    remote: "exercism/website",
    env: "EXERCISM_WEBSITE_REPO",
    // Only the directories the two catalogs are built from, since the website
    // is large.
    sparse: ["config/locales", "app/javascript/i18n/en"]
  },
  "problem-specifications": { remote: "exercism/problem-specifications", env: "EXERCISM_PROBLEM_SPECIFICATIONS_REPO", sparse: ["exercises"] },
  docs: { remote: "exercism/docs", env: "EXERCISM_DOCS_REPO", sparse: null },
  blog: { remote: "exercism/blog", env: "EXERCISM_BLOG_REPO", sparse: null },
  "website-copy": { remote: "exercism/website-copy", env: "EXERCISM_WEBSITE_COPY_REPO", sparse: ["analyzer-comments"] },
  // Every track repo. `remote` is null because there are eighty of them; a track
  // is always named explicitly, as `--repo=exercism/<slug>` or a path.
  track: { remote: null, env: null, sparse: ["exercises", "concepts", "docs"] }
};

export const REPO_KIND_IDS = Object.keys(REPO_KINDS);

/**
 * The kind of a repo, from its GitHub name.
 *
 * Any repo that is not one of the named single repos is treated as a track,
 * without checking. A tooling repo is therefore called a track, and since no
 * track content type matches its paths, it has nothing to translate, which is
 * correct.
 */
export function kindForRepo(fullName) {
  const name = String(fullName).split("/").pop();
  return name in REPO_KINDS && name !== "track" ? name : "track";
}

export function repoKind(id) {
  const kind = REPO_KINDS[id];
  if (!kind) fail(`unknown repo kind "${id}". Known: ${REPO_KIND_IDS.join(", ")}`);
  return kind;
}

/** Where scripts/source-checkout.mjs puts one source repo, locally and in CI. */
export function checkoutDir(name) {
  return path.join(SCRIPTS_ROOT, ".source", name);
}

const isRepo = (dir) => fs.existsSync(path.join(dir, ".git")) || fs.existsSync(path.join(dir, "HEAD"));

/**
 * Resolve the checkout one singleton repo's English is read from.
 *
 * Order: an explicit path, the kind's env override, the checkout this repo
 * manages at .source/<kind>, then a sibling working copy. `optional` returns null
 * instead of failing, for a caller that can do useful work without it.
 */
export function resolveRepo(kindId, explicit, { optional = false } = {}) {
  const kind = repoKind(kindId);
  const candidates = [explicit, kind.env && process.env[kind.env], checkoutDir(kindId), path.resolve(SCRIPTS_ROOT, "..", kindId)].filter(Boolean);
  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);
    if (isRepo(resolved)) return resolved;
  }
  if (optional) return null;
  fail(
    `no ${kindId} checkout to read English from. This repo holds no English of its own.\n` +
      `  Looked in: ${candidates.map((candidate) => path.resolve(candidate)).join(", ")}\n` +
      `  Fetch one:  pnpm source:checkout --source=${kindId}\n` +
      `  Or point at one you already have:  --source-repo=<path>${kind.env ? `, or ${kind.env}=<path>` : ""}.`
  );
}

/**
 * Which ref to read when the caller names none.
 *
 * `origin/main` when the checkout has one, else `HEAD`. A sibling working copy
 * on a laptop is often on a feature branch, which would report English that has
 * not merged, so the remote-tracking ref comes first. A checkout this repo made
 * (.source/<kind>, or CI's) is a detached fetch with no `origin/main`, and its
 * HEAD is the commit that was asked for.
 */
export function defaultRef(repo) {
  return refExists(repo, "origin/main") ? "origin/main" : "HEAD";
}

/** `--content-repos=a,b` as `[{ dir, kind, ref }]`. `path[:kind][@ref]`, comma separated. */
export function parseContentRepos(value) {
  if (!value || value === true) return [];
  return String(value)
    .split(",")
    .filter(Boolean)
    .map((spec) => {
      const [rest, ref] = spec.split("@");
      const [dir, kind] = rest.split(":");
      const resolved = path.resolve(dir);
      if (!isRepo(resolved)) fail(`--content-repos: ${resolved} is not a git checkout`);
      return { dir: resolved, kind: kind ? (repoKind(kind), kind) : kindForRepo(path.basename(resolved)), ref: ref || defaultRef(resolved) };
    });
}
