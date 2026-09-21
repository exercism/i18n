#!/usr/bin/env node
//
// source-checkout: fetch a source repo into .source/<name>, so the scripts here
// have English to read.
//
// Usage:
//   node scripts/source-checkout.mjs [--source=<kind>] [--repo=<owner/name>] [--ref=<sha|branch>] [--force]
//
// Examples:
//   node scripts/source-checkout.mjs                                   # exercism/website main
//   node scripts/source-checkout.mjs --source=docs
//   node scripts/source-checkout.mjs --source=track --repo=exercism/ruby
//   node scripts/source-checkout.mjs --ref=<sha>                       # one exact commit
//
// ## Shallow and blobless, with no working tree
//
// Every script here reads English through git objects (scripts/lib/git.mjs),
// so this fetches one commit with no history and no working tree. A track repo
// needs nothing more, because `git ls-tree` answers the content question from
// trees alone. For the website, the blobs under the two English directories
// are then fetched in one request, because the catalogs are built from their
// contents.
//
// With no working tree, no file from the source repo is written to disk, which
// is the same property the PR check relies on for fork safety.
//
// ## Where it is used
//
// validate.yml runs this script in CI. The PR check in a source repo
// (source-repo-workflows/i18n-completeness.yml) does its own fetch of the PR's
// merge ref into a bare repository and passes it with `--source-repo`. The
// scripts look for a checkout made by this script at `.source/<name>`
// (scripts/lib/source-repos.mjs).

import fs from "node:fs";
import path from "node:path";
import { fail } from "./lib/constants.mjs";
import { parseArgs } from "./lib/args.mjs";
import { git, lsTree, prefetchBlobs } from "./lib/git.mjs";
import { checkoutDir, repoKind } from "./lib/source-repos.mjs";

function main() {
  const { flags } = parseArgs(process.argv.slice(2));
  const kindId = typeof flags.source === "string" ? flags.source : "website";
  const kind = repoKind(kindId);
  const repo = typeof flags.repo === "string" ? flags.repo : kind.remote;
  if (!repo) fail(`--source=${kindId} needs --repo=exercism/<slug>: there is one repo per track, and no list of them here.`);
  if (!/^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/.test(repo)) fail(`--repo must be <owner>/<name>, got "${repo}"`);

  const ref = typeof flags.ref === "string" ? flags.ref : "main";
  const dir = checkoutDir(kindId === "track" ? repo.split("/")[1] : kindId);

  if (fs.existsSync(dir) && !flags.force) {
    console.log(`${dir} already exists at ${git(["rev-parse", "HEAD"], dir).trim()}. Re-run with --force to replace it.`);
    return;
  }
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  try {
    git(["init", "--quiet", "--bare"], dir);
    git(["remote", "add", "origin", `https://github.com/${repo}.git`], dir);
    git(["config", "remote.origin.promisor", "true"], dir);
    git(["config", "remote.origin.partialclonefilter", "blob:none"], dir);
    git(["fetch", "--quiet", "--depth=1", "--filter=blob:none", "--no-tags", "origin", ref], dir);
    git(["update-ref", "HEAD", "FETCH_HEAD"], dir);
    if (kind.sparse && kindId === "website") prefetchBlobs(dir, lsTree(dir, "HEAD", kind.sparse).map((entry) => entry.id));
  } catch (error) {
    fail(`could not fetch ${repo}@${ref} into ${dir}: ${error.stderr?.toString().trim() || error.message}`);
  }

  console.log(`Fetched ${repo}@${git(["rev-parse", "HEAD"], dir).trim()} into ${path.relative(process.cwd(), dir)} (no working tree).`);
}

main();
