// Reads a source repo as data, through git objects, never through its working
// tree.
//
// Every script that reads English goes through here, for three reasons:
//
//  - The git blob id of an English file is the key its translation is stored
//    under (see content-types.mjs), and `git ls-tree` lists those ids for a
//    whole tree in one call, without hashing anything or needing the blobs. A
//    blobless, shallow clone is enough to check whether a repo is fully
//    translated.
//  - A working tree is on whatever branch its owner has checked out. A sibling
//    checkout on a laptop is often on a feature branch, which would report
//    English that has not merged. Reading at a ref avoids that.
//  - A source repo's PR is untrusted input, and most Exercism PRs come from
//    forks. Nothing here checks out PR content, runs a hook, applies a filter
//    or executes any of it: `ls-tree` and `cat-file` only read objects.
//
// No dependencies, and no process is run except `git` itself.

import crypto from "node:crypto";
import { execFile, execFileSync } from "node:child_process";

const MAX_BUFFER = 512 * 1024 * 1024;

export function git(args, cwd, { input, encoding = "utf8", env } = {}) {
  return execFileSync("git", args, {
    cwd,
    input,
    encoding: encoding === "buffer" ? undefined : encoding,
    maxBuffer: MAX_BUFFER,
    stdio: ["pipe", "pipe", "pipe"],
    env: env ? { ...process.env, ...env } : process.env
  });
}

/**
 * The same command, awaited instead of blocked on.
 *
 * One caller needs this: scripts/lib/fetch-sources.mjs fetches a repo per
 * metadata catalog, around 124 of them per CI run, and a fetch is almost
 * entirely time spent waiting for github.com. Run through `git` they would
 * wait one after another.
 *
 * The rejection carries git's stderr on `.stderr`, as execFileSync's does, so
 * a caller reports the same message whichever it used.
 */
export function gitAsync(args, cwd, { input, env } = {}) {
  return new Promise((resolve, reject) => {
    const child = execFile("git", args, { cwd, encoding: "utf8", maxBuffer: MAX_BUFFER, env: env ? { ...process.env, ...env } : process.env }, (error, stdout, stderr) => {
      if (!error) return resolve(stdout);
      error.stderr = stderr;
      reject(error);
    });
    if (input !== undefined) child.stdin.end(input);
  });
}

// A blobless clone fetches a missing blob as soon as anything asks for it, one
// blob per round trip. That is switched off wherever this file reads blobs, so
// a missing blob is reported as missing, and `prefetchBlobs` fetches them once,
// in bulk, or throws.
const NO_LAZY_FETCH = { GIT_NO_LAZY_FETCH: "1" };

/**
 * The git blob id of some bytes: sha1 over `blob <length>\0` and the content.
 *
 * Computed here so it works with no repository at all. That lets `validate`
 * spot, from the file alone, a "translation" that is byte-identical to its
 * English: its own blob id equals the id it is filed under.
 *
 * SHA-1 because every Exercism repo uses that object format. A repo created
 * with `--object-format=sha256` would have different ids and would need a
 * different store. There is no such repo, and nothing here handles one.
 */
export function blobId(content) {
  const bytes = Buffer.isBuffer(content) ? content : Buffer.from(String(content), "utf8");
  return crypto.createHash("sha1").update(`blob ${bytes.length}\0`).update(bytes).digest("hex");
}

export const BLOB_ID = /^[0-9a-f]{40}$/;

export function refExists(repo, ref) {
  try {
    git(["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], repo);
    return true;
  } catch {
    return false;
  }
}

export function resolveSha(repo, ref) {
  return git(["rev-parse", "--verify", `${ref}^{commit}`], repo).trim();
}

/**
 * Every blob under some paths at one ref, as { path, id }.
 *
 * `-z` because a path may contain any character except NUL, and track repos are
 * written by many people. Symlinks and submodules are skipped: a symlink's blob
 * is its target path, and a submodule is not a blob.
 */
export function lsTree(repo, ref, prefixes = []) {
  const out = git(["ls-tree", "-r", "-z", ref, "--", ...prefixes], repo);
  const entries = [];
  for (const record of out.split("\0")) {
    if (!record) continue;
    const tab = record.indexOf("\t");
    const [mode, type, id] = record.slice(0, tab).split(" ");
    if (type !== "blob" || mode === "120000") continue;
    entries.push({ path: record.slice(tab + 1), id });
  }
  return entries;
}

/** Every object id in a promisor (blobless) clone's store, or null for an ordinary clone. */
function localObjects(repo) {
  let promisor = "";
  try {
    promisor = git(["config", "--get-regexp", "^remote\\..*\\.promisor$"], repo).trim();
  } catch {
    return null;
  }
  if (!promisor) return null;
  return new Set(git(["cat-file", "--batch-all-objects", "--batch-check=%(objectname)", "--unordered"], repo).split("\n"));
}

const pause = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

/**
 * In a blobless clone, fetch the blobs about to be read, in one request.
 *
 * CI clones source repos with `--filter=blob:none`, because the content check
 * only needs trees. The website check does need blobs, a few hundred of them,
 * and git's lazy fetch would get them one round trip at a time. This makes the
 * same request git's promisor code makes, once for the whole list.
 *
 * Every id passed here must be one the remote holds, such as an id `lsTree`
 * listed. A failed fetch is retried after each of `delays` (milliseconds), and
 * if any blob is still missing after the last attempt this throws with git's
 * own error. A network drop then stops the whole run, instead of surfacing
 * later as a list of files whose English could not be read.
 *
 * Does nothing in an ordinary clone.
 */
export function prefetchBlobs(repo, ids, { delays = [2000, 5000, 15000] } = {}) {
  let promisor = "";
  try {
    promisor = git(["config", "--get-regexp", "^remote\\..*\\.promisor$"], repo).trim();
  } catch {
    return; // no promisor remote: an ordinary clone, everything is already here
  }
  if (!promisor) return;
  const remote = promisor.split("\n")[0].split(".")[1];

  // List what the object store already holds. Asking about the wanted ids
  // (`--batch-check` on stdin) would trigger the one-at-a-time fetch this
  // function avoids, on any git older than 2.45 (which added GIT_NO_LAZY_FETCH).
  const stillMissing = () => {
    const local = new Set(git(["cat-file", "--batch-all-objects", "--batch-check=%(objectname)", "--unordered"], repo).split("\n"));
    return [...new Set(ids)].filter((id) => !local.has(id));
  };
  let missing = stillMissing();
  let lastError = "";
  for (let attempt = 0; missing.length > 0 && attempt <= delays.length; attempt++) {
    if (attempt > 0) pause(delays[attempt - 1]);
    try {
      git(["-c", "fetch.negotiationAlgorithm=noop", "fetch", remote, "--no-tags", "--no-write-fetch-head", "--recurse-submodules=no", "--filter=blob:none", "--stdin"], repo, {
        input: `${missing.join("\n")}\n`
      });
      lastError = "";
    } catch (error) {
      lastError = error.stderr?.toString().trim() || error.message;
    }
    missing = stillMissing();
  }
  if (missing.length === 0) return;
  const tries = delays.length + 1;
  throw new Error(
    `could not fetch ${missing.length} blob(s) from "${remote}" into the blobless clone ${repo} (${tries} attempt${tries === 1 ? "" : "s"}), first ${missing[0]}.\n` +
      (lastError ? `git said: ${lastError}` : "git fetch reported success, but the blobs are still not in the object store.")
  );
}

/**
 * The content of many blobs, by id, from one `git cat-file --batch`.
 *
 * One process for all of them: the website's English is three hundred files,
 * and one process each turns a one-second build into half a minute. An id the
 * repo does not hold comes back as `null` without throwing, because validate
 * deliberately asks whether some English is in any of the repos it was given.
 * Such a caller passes `prefetch: false`. With the default, every id is one the
 * caller knows the repo holds, and a blob that cannot be fetched throws (see
 * `prefetchBlobs`).
 *
 * @returns {Map<string, Buffer|null>}
 */
export function readBlobs(repo, ids, { prefetch = true, delays } = {}) {
  const wanted = [...new Set(ids)];
  const result = new Map();
  if (wanted.length === 0) return result;
  if (prefetch) prefetchBlobs(repo, wanted, { delays });

  // Git before 2.45 ignores GIT_NO_LAZY_FETCH, and in a blobless clone each id
  // that is not here would be fetched from the remote one at a time. Checking
  // what the object store holds first answers the misses locally on any git.
  const local = localObjects(repo);
  const here = local ? wanted.filter((id) => local.has(id)) : wanted;
  for (const id of wanted) if (local && !local.has(id)) result.set(id, null);
  if (here.length === 0) return result;

  const out = git(["cat-file", "--batch"], repo, { input: `${here.join("\n")}\n`, encoding: "buffer", env: NO_LAZY_FETCH });
  let offset = 0;
  for (const id of here) {
    const lineEnd = out.indexOf(0x0a, offset);
    const header = out.subarray(offset, lineEnd).toString("utf8");
    offset = lineEnd + 1;
    if (header.endsWith(" missing")) {
      result.set(id, null);
      continue;
    }
    const size = Number(header.split(" ")[2]);
    result.set(id, Buffer.from(out.subarray(offset, offset + size)));
    offset += size + 1; // the content, then the newline git appends after it
  }
  return result;
}

/**
 * A reader over one repo at one ref, which lists paths and reads files. It is all
 * the English builders need, so they can be tested against a plain object in
 * scripts/test.mjs with no repository.
 */
export function refReader(repo, ref) {
  return {
    describe: `${repo} @ ${ref}`,
    list: (prefix) => lsTree(repo, ref, [prefix]),
    readMany(entries) {
      const blobs = readBlobs(repo, entries.map((entry) => entry.id));
      return entries.map((entry) => ({ ...entry, text: blobs.get(entry.id)?.toString("utf8") ?? null }));
    }
  };
}
