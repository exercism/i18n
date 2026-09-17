// Where English comes from: which repos, which checkout, which ref.
//
// English is not stored in this repo. It is read from a checkout of the repo it
// is authored in, through git objects (scripts/lib/git.mjs), and every script
// that needs one resolves it here and nowhere else. See ENGLISH-SOURCE.md.
//
// Exercism's English is spread over far more repos than Jiki's: the website, the
// docs, the blog, website-copy, problem-specifications, and one repo per track,
// around eighty of them. So a repo has a KIND, the kind decides which content
// types can live in it (content-types.mjs), and every track repo is the same
// kind. There is no list of tracks here and there must not be one: the website's
// database is the authority on which tracks exist, and a copy would be stale the
// day a track launched.

import fs from "node:fs";
import path from "node:path";
import { SCRIPTS_ROOT, fail } from "./constants.mjs";
import { refExists } from "./git.mjs";

export const REPO_KINDS = {
  website: {
    remote: "exercism/website",
    env: "EXERCISM_WEBSITE_REPO",
    // Only what the two catalogs are built from. The website is large.
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
 * Anything that is not one of the named singletons is a track. That is a
 * default, not a detection: pointing this at a tooling repo calls it a track, and
 * a track's content types then simply match none of its paths, which reads as
 * "nothing to translate" and is the right answer.
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

/** Where scripts/source-checkout.mjs and a CI checkout step put one source repo. */
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
 * `origin/main` when the checkout has one, else `HEAD`. A sibling working copy on
 * a laptop is usually on a feature branch, and a branch reports English that does
 * not exist yet, so the remote-tracking ref is preferred over whatever is checked
 * out. A checkout this repo made (.source/<kind>, or CI's) is a detached fetch
 * with no `origin/main` at all, and its HEAD is exactly the commit that was asked
 * for.
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
