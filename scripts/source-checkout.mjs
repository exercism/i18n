#!/usr/bin/env node
//
// source-checkout: fetch a source repo into .source/<name>, so the scripts here
// have English to read.
//
// Usage:
//   node scripts/source-checkout.mjs [--source=<kind>] [--repo=<owner/name>] [--ref=<sha|branch>] [--force]
//   node scripts/source-checkout.mjs --repos=<name,name,...> [--jobs=<n>] [--list=<file>] [--ref=<ref>] [--force]
//
// Examples:
//   node scripts/source-checkout.mjs                                   # exercism/website main
//   node scripts/source-checkout.mjs --source=docs
//   node scripts/source-checkout.mjs --source=track --repo=exercism/ruby
//   node scripts/source-checkout.mjs --ref=<sha>                       # one exact commit
//   node scripts/source-checkout.mjs --repos=ruby,docs --list=repos.txt # many at once
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
// ## One repo, or all of them
//
// `--source`/`--repo` names one repo, and a repo that cannot be fetched fails
// the run. `--repos` takes the bare names CI reads off the metadata catalogs
// (`ruby`, `docs`, ...), fetches them several at a time, and treats a repo it
// cannot fetch as a skip: the others are still fetched, the run stays green,
// and validate reports the skipped repo's catalogs as `unv` (unverified).
// This script works out which name takes which form of `--source`, so the
// caller passes names and nothing else. scripts/lib/fetch-sources.mjs says why
// the fetches run concurrently and why eight at a time.
//
// `--list=<file>` writes the `--content-repos` list for the repos that were
// fetched, sorted by name, so two runs over the same names write the same
// bytes however the fetches interleaved.
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
import { DEFAULT_JOBS, contentReposList, fetchSource, fetchSources, sourceTarget, targetForName } from "./lib/fetch-sources.mjs";

const relative = (dir) => path.relative(process.cwd(), dir);

async function one(flags, ref) {
  const kindId = typeof flags.source === "string" ? flags.source : "website";
  const target = sourceTarget({ kind: kindId, repo: typeof flags.repo === "string" ? flags.repo : null });
  if (target.error) fail(target.error);

  const result = await fetchSource(target, { ref, force: Boolean(flags.force) });
  if (result.error) fail(result.error);
  if (result.reused) {
    console.log(`${target.dir} already exists at ${result.head}. Re-run with --force to replace it.`);
    return;
  }
  console.log(`Fetched ${target.repo}@${result.head} into ${relative(target.dir)} (no working tree).`);
}

async function many(flags, ref) {
  const names = [...new Set(String(flags.repos).split(",").map((name) => name.trim()).filter(Boolean))];
  // These names are read off filenames and end up in a shell variable and then
  // on a command line, so anything that is not a plain repo name stops the run
  // rather than being fetched or quietly dropped.
  const bad = names.filter((name) => !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(name));
  if (bad.length > 0) fail(`--repos: not a repo name: ${bad.join(", ")}`);

  const targets = names.map((name) => targetForName(name));
  const jobs = Number(flags.jobs ?? DEFAULT_JOBS);
  if (!Number.isInteger(jobs) || jobs < 1) fail(`--jobs must be a positive whole number, got "${flags.jobs}"`);

  const started = Date.now();
  let done = 0;
  const results = await fetchSources(targets, {
    ref,
    force: Boolean(flags.force),
    jobs,
    onResult: (result) => console.log(`  ${++done}/${targets.length} ${result.error ? `FAILED ${result.target.name}` : `${result.target.name}@${result.head.slice(0, 8)}`}`)
  });

  const fetched = results.filter((result) => !result.error).map((result) => result.target);
  const failed = results.filter((result) => result.error);
  console.log(`Fetched ${fetched.length} of ${targets.length} repo(s), ${jobs} at a time, in ${Math.round((Date.now() - started) / 1000)}s.`);

  // A skipped repo must never look like one that was never asked for. The
  // shorter list is this run's answer, so say out loud which repos are missing
  // from it and what that costs: their catalogs cannot be checked against
  // English.
  if (failed.length > 0) {
    console.log(`\nWARNING: ${failed.length} repo(s) could not be fetched. Their catalogs are reported as unverified, and the run is not failed for it:`);
    for (const result of failed) console.log(`  ${result.target.name}: ${result.error}`);
    console.log("");
  }

  if (typeof flags.list === "string") {
    fs.writeFileSync(path.resolve(flags.list), `${contentReposList(fetched)}\n`);
    console.log(`Wrote ${fetched.length} path(s) to ${relative(path.resolve(flags.list))}.`);
  }
}

async function main() {
  const { flags } = parseArgs(process.argv.slice(2));
  const ref = typeof flags.ref === "string" ? flags.ref : "main";
  if (typeof flags.repos === "string") await many(flags, ref);
  else await one(flags, ref);
}

await main();
