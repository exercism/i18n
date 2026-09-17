// Reading a source repo as DATA, through git objects and never through its
// working tree.
//
// Every script that reads English goes through here, for three reasons that all
// point the same way.
//
//  - The git blob id of an English file IS the key its translation is stored
//    under (see content-types.mjs), and `git ls-tree` hands those ids over for a
//    whole tree in one call, without hashing anything and without needing the
//    blobs themselves. A blobless, shallow clone is enough to answer "is this
//    repo completely translated?".
//  - A working tree is whatever branch its owner happens to have checked out. A
//    sibling checkout on a laptop is usually on a feature branch, and a branch
//    reports English that does not exist yet. A ref has no such ambiguity.
//  - A source repo's PR is untrusted input, and most Exercism PRs come from
//    forks. Nothing here checks PR content out, runs a hook, applies a filter or
//    executes a byte of it: `ls-tree` and `cat-file` only ever read objects.
//
// No dependency and no shelling out to anything but `git` itself.

import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

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

// A blobless clone fetches a missing blob the moment anything asks for it, ONE
// blob per round trip. Switched off wherever this file reads blobs, so that a
// missing blob is reported as missing and the fetching is done once, in bulk, by
// `prefetchBlobs`.
const NO_LAZY_FETCH = { GIT_NO_LAZY_FETCH: "1" };

/**
 * The git blob id of some bytes: sha1 over `blob <length>\0` and the content.
 *
 * Computed here rather than asked of git so that it works with no repository at
 * all, which is what lets `validate` notice, from the file alone, a "translation"
 * that is byte-identical to its English: its own blob id equals the id it is
 * filed under.
 *
 * SHA-1 because that is what every Exercism repo's object format is. A repo
 * created with `--object-format=sha256` would have different ids and would need a
 * different store; none exists and nothing here pretends to handle one.
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
 * `-z` because a path may contain anything but NUL, and a track repo is content
 * written by many hands. Symlinks and submodules are dropped: a symlink's blob is
 * its target path rather than English, and a submodule is not a blob at all.
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

/**
 * In a blobless clone, fetch the blobs about to be read, in ONE request.
 *
 * CI clones a source repo with `--filter=blob:none`, because a tree is all the
 * content check needs. The website check does need blobs, a few hundred of them,
 * and git's own lazy fetch would get them one round trip at a time. This is the
 * same request git's promisor code makes, asked once for the whole list.
 *
 * A no-op in an ordinary clone. A failure is swallowed: the blobs then read as
 * missing, and the caller says which file it could not read, which is a better
 * error than a fetch's.
 */
export function prefetchBlobs(repo, ids) {
  let promisor = "";
  try {
    promisor = git(["config", "--get-regexp", "^remote\\..*\\.promisor$"], repo).trim();
  } catch {
    return; // no promisor remote: an ordinary clone, everything is already here
  }
  if (!promisor) return;
  const remote = promisor.split("\n")[0].split(".")[1];

  const check = git(["cat-file", "--batch-check"], repo, { input: `${ids.join("\n")}\n`, env: NO_LAZY_FETCH });
  const missing = check.split("\n").filter((line) => line.endsWith(" missing")).map((line) => line.split(" ")[0]);
  if (missing.length === 0) return;
  try {
    git(["-c", "fetch.negotiationAlgorithm=noop", "fetch", remote, "--no-tags", "--no-write-fetch-head", "--recurse-submodules=no", "--filter=blob:none", "--stdin"], repo, {
      input: `${missing.join("\n")}\n`
    });
  } catch {
    // Reported by the caller as unreadable files.
  }
}

/**
 * The content of many blobs, by id, in one `git cat-file --batch`.
 *
 * One process rather than one per file: the website's English is three hundred
 * files, and a spawn each turns a one second build into half a minute. An id the
 * repo does not hold comes back as `null` rather than throwing, because "is this
 * English in any of the repos I was given?" is a question validate asks on
 * purpose.
 *
 * @returns {Map<string, Buffer|null>}
 */
export function readBlobs(repo, ids, { prefetch = true } = {}) {
  const wanted = [...new Set(ids)];
  const result = new Map();
  if (wanted.length === 0) return result;
  if (prefetch) prefetchBlobs(repo, wanted);

  const out = git(["cat-file", "--batch"], repo, { input: `${wanted.join("\n")}\n`, encoding: "buffer", env: NO_LAZY_FETCH });
  let offset = 0;
  for (const id of wanted) {
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
 * A reader over one repo at one ref: list paths, read files. It is the whole
 * interface the English builders need, which keeps them testable against a plain
 * object in scripts/test.mjs with no repository behind it.
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
