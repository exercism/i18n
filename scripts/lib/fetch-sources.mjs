// Fetching source repos: one, or all of them at once.
//
// Every repo is fetched the same way, which is what scripts/source-checkout.mjs
// documents: one commit, shallow, blobless, into a bare repository at
// .source/<name> with no working tree. This file holds that sequence once, and
// runs it over many repos at a time.
//
// ## Why they are fetched concurrently
//
// CI fetches a repo for every repo any locale holds a metadata catalog for,
// around 124 of them. Each one is a `git fetch` of a single shallow commit:
// a few hundred kilobytes, and almost all of the wall clock is the round trip
// to github.com. Run one after another that step took about ninety seconds,
// nearly none of it work.
//
// ## Why eight at a time
//
// A GitHub runner is two cores, so the limit is not the runner's CPU, and it
// is not the network either: each fetch is small. The limit that matters is
// github.com's view of us. Eight concurrent fetches of a public repo over
// HTTPS is the kind of load an ordinary `git clone --recurse-submodules` makes,
// and it is well below anything GitHub documents as abusive, whereas a burst
// of 124 at once from one IP is exactly the shape of traffic its abuse
// detection looks for. Being rate limited would fail more repos than the
// serial loop ever did, and a fetch that is refused makes a catalog
// unverified, so the cheap win is not worth the risk. Eight still turns a
// ninety second step into single digit seconds.
//
// ## A repo that cannot be fetched is skipped
//
// One unreachable repo must not stop the others or fail the run: its catalogs
// are then reported as `unv` (unverified) by validate, which is the honest
// answer. A full CI run has already hit a transient DNS failure on three
// repos, so each fetch is retried before it is given up on, and every repo
// given up on is named loudly by the caller.

import fs from "node:fs";
import path from "node:path";
import { SCRIPTS_ROOT } from "./constants.mjs";
import { git, gitAsync, lsTree, prefetchBlobs } from "./git.mjs";
import { checkoutDir, kindForRepo, repoKind } from "./source-repos.mjs";

/** How many repos are fetched at once. See "Why eight at a time" above. */
export const DEFAULT_JOBS = 8;

/** How long to wait before each further attempt at one repo, in milliseconds. */
const RETRY_DELAYS = [2000, 5000];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * One repo to fetch: which remote, and which directory it lands in.
 *
 * `kind` decides the directory name. A singleton repo (the website, docs,
 * blog, problem-specifications, website-copy) is its own kind, while every
 * track repo shares the `track` kind and is named by its own slug.
 */
export function sourceTarget({ kind, repo }) {
  const spec = repoKind(kind);
  const full = repo || spec.remote;
  if (!full) return { error: `--source=${kind} needs --repo=exercism/<slug>: there is one repo per track, and no list of them here.` };
  if (!/^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/.test(full)) return { error: `--repo must be <owner>/<name>, got "${full}"` };
  const name = kind === "track" ? full.split("/")[1] : kind;
  return { name, kind, repo: full, remote: `https://github.com/${full}.git`, dir: checkoutDir(name) };
}

/**
 * The target for a bare repo name, as CI reads them off the metadata catalogs.
 *
 * A name that is not one of the singleton repos is a track under exercism/,
 * which is what kindForRepo already decides for every other caller.
 */
export function targetForName(name, { owner = "exercism" } = {}) {
  const kind = kindForRepo(name);
  return sourceTarget({ kind, repo: kind === "track" ? `${owner}/${name}` : null });
}

/**
 * The `--content-repos` list for some targets: where each landed, sorted.
 *
 * Sorted because the fetches finish in whatever order the network gives them,
 * and the list is an input to validate. Two runs over the same repos have to
 * produce the same bytes.
 */
export function contentReposList(targets) {
  return targets
    .map((target) => path.relative(SCRIPTS_ROOT, target.dir))
    .sort()
    .join(",");
}

/** The commit a checkout is at, or null when there is no usable checkout there. */
function headOf(dir) {
  if (!fs.existsSync(dir)) return null;
  try {
    return git(["rev-parse", "HEAD"], dir).trim();
  } catch {
    return null;
  }
}

/** The fetch itself: a bare repository holding one commit and no file contents. */
async function fetchInto(target, ref) {
  fs.rmSync(target.dir, { recursive: true, force: true });
  fs.mkdirSync(target.dir, { recursive: true });
  await gitAsync(["init", "--quiet", "--bare"], target.dir);
  await gitAsync(["remote", "add", "origin", target.remote], target.dir);
  await gitAsync(["config", "remote.origin.promisor", "true"], target.dir);
  await gitAsync(["config", "remote.origin.partialclonefilter", "blob:none"], target.dir);
  await gitAsync(["fetch", "--quiet", "--depth=1", "--filter=blob:none", "--no-tags", "origin", ref], target.dir);
  await gitAsync(["update-ref", "HEAD", "FETCH_HEAD"], target.dir);

  // The website's catalogs are built from file contents, so its English
  // directories are fetched too, in one request. Every other kind is answered
  // from trees alone.
  const sparse = repoKind(target.kind).sparse;
  if (sparse && target.kind === "website") prefetchBlobs(target.dir, lsTree(target.dir, "HEAD", sparse).map((entry) => entry.id));

  return git(["rev-parse", "HEAD"], target.dir).trim();
}

/**
 * Fetch one repo, retrying a failure before giving up on it.
 *
 * @returns {Promise<{target, head, reused?: true} | {target, error: string}>}
 */
export async function fetchSource(target, { ref = "main", force = false, delays = RETRY_DELAYS } = {}) {
  const held = force ? null : headOf(target.dir);
  if (held) return { target, head: held, reused: true };
  let last = "";
  for (let attempt = 0; attempt <= delays.length; attempt++) {
    if (attempt > 0) await sleep(delays[attempt - 1]);
    try {
      return { target, head: await fetchInto(target, ref) };
    } catch (error) {
      last = error.stderr?.toString().trim() || error.message;
    }
  }
  // A failed fetch leaves a repository holding no commit, and `.source/<name>`
  // is how every other script recognises a checkout (source-repos.mjs). Left
  // there it would be read as English nobody can see, so it goes.
  fs.rmSync(target.dir, { recursive: true, force: true });
  return { target, error: `could not fetch ${target.repo}@${ref} into ${target.dir} (${delays.length + 1} attempt(s)): ${last}` };
}

/**
 * Fetch many repos, at most `jobs` at a time.
 *
 * Results come back in the order the targets were given, never the order the
 * fetches finished, so the same input always produces the same list. `onResult`
 * is called as each one lands, for progress, and is the only thing that sees
 * the finishing order.
 *
 * @returns {Promise<Array<{target, head} | {target, error}>>}
 */
export async function fetchSources(targets, { ref = "main", force = false, jobs = DEFAULT_JOBS, delays = RETRY_DELAYS, onResult = () => {} } = {}) {
  const results = new Array(targets.length);
  let next = 0;
  const worker = async () => {
    for (let index = next++; index < targets.length; index = next++) {
      const result = await fetchSource(targets[index], { ref, force, delays });
      results[index] = result;
      onResult(result);
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, Math.min(jobs, targets.length)) }, worker));
  return results;
}
