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
//
// Two things a track says about itself are read from its own config.json and
// live here rather than in the registry: whether the track is still active, and
// which of its exercises are unfinished. The registry maps a path to a content
// type and opens no config, so a caller that can read the repo asks here, and a
// caller that cannot (a PR file list, one file on its own) requires the text
// anyway.

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

/**
 * Whether a track repo is one Exercism still runs, read from its own config.json.
 *
 * A track's top-level config.json carries `"active": false` once the site stops
 * showing it, and that flag is Exercism's own definition of the distinction
 * (glennj, "FYI: List of inactive track repositories",
 * https://forum.exercism.org/t/85471). Reading it from the tree at the ref
 * being processed keeps the answer in the same place as the English it goes
 * with, and needs no network call, no credential and no list of tracks kept
 * here. exercism.org's /api/v2/tracks answers the same question, but it sits
 * behind Cloudflare and returns 403 to a script.
 *
 * A config.json that is missing or unreadable counts as active. A half-fetched
 * repo or a config that moves then makes a caller do more work, which someone
 * notices, instead of quietly dropping a live track out of a check.
 *
 * @param {{path,id}[]} entries  the repo's tree (`git ls-tree`)
 * @param {(entries) => {path,id,text}[]} read  reads blobs as text
 */
export function isActiveTrack(entries, read) {
  const config = entries.find((entry) => entry.path === "config.json");
  if (!config) return true;
  try {
    return JSON.parse(read([config])[0].text).active !== false;
  } catch {
    return true;
  }
}

/**
 * Whether a track's config.json entry says the exercise is unfinished.
 *
 * `status` is absent on most entries and is otherwise "active", "beta",
 * "deprecated" or "wip" (all 123 track repos, 2026-09-24). Only "wip" is
 * excluded. A beta exercise is live on the website, and a deprecated one is
 * still served to everyone who has already started it, so skipping either would
 * leave a reader in English with nothing reporting it. A wip exercise is not
 * shown to anyone, and exercism/pony's config.json holds one called "test"
 * whose two keys gated every PR in this repo once uk became a production
 * target.
 *
 * Excluding only this one value is the safe side: a status nobody here has seen
 * is included, which costs one translation, where a wrong exclusion costs a
 * reader English text.
 */
export const isWipExercise = (exercise) => exercise?.status === "wip";

/**
 * The exercise directories a track's config.json marks `wip`, as
 * `exercises/<concept|practice>/<slug>`.
 *
 * The exercise's own files say nothing about this: `.docs/instructions.md`
 * looks the same whether the exercise is live or half-written, and the registry
 * (content-types.mjs) matches it by path and opens no config. So the track's
 * config.json is the only place the answer exists, and this reads it from the
 * tree at the ref being processed, next to `isActiveTrack` and for the same
 * reasons.
 *
 * A config.json that is missing, unreadable or unparseable marks nothing as
 * wip. The caller then requires an unfinished exercise's files, which costs one
 * translation, where guessing the other way would leave a reader in English
 * with nothing reporting it.
 *
 * @param {{path,id}[]} entries  the repo's tree (`git ls-tree`)
 * @param {(entries) => {path,id,text}[]} read  reads blobs as text
 * @returns {Set<string>}
 */
export function wipExerciseDirs(entries, read) {
  const dirs = new Set();
  const config = entries.find((entry) => entry.path === "config.json");
  if (!config) return dirs;
  let parsed;
  try {
    parsed = JSON.parse(read([config])[0].text);
  } catch {
    return dirs;
  }
  for (const type of ["concept", "practice"]) {
    for (const exercise of parsed?.exercises?.[type] ?? []) {
      if (isWipExercise(exercise) && typeof exercise.slug === "string" && exercise.slug !== "") dirs.add(`exercises/${type}/${exercise.slug}`);
    }
  }
  return dirs;
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
