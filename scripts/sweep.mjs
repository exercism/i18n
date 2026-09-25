#!/usr/bin/env node
//
// sweep: is every source repo's `main` fully translated for every production
// locale, right now?
//
// Usage:
//   node scripts/sweep.mjs [--repos=<a,b>] [--tracks=<file>] [--locales=<a,b>]
//                          [--shard=<i>/<n>] [--fetch=always|missing|never]
//                          [--out=<dir>] [--full=<dir>]
//   node scripts/sweep.mjs --merge=<dir> [--expected-shards=<n>] [--previous=<file>]
//                          [--body=<file>] [--title=<file>] [--run-url=<url>]
//
// Examples:
//   node scripts/sweep.mjs --repos=exercism/ruby,exercism/docs
//   node scripts/sweep.mjs --tracks=tracks.json --shard=3/8 --out=out
//   node scripts/sweep.mjs --merge=out --body=body.md --expected-shards=8
//
// Exit codes: 0 when the sweep answered for every repo it was given, 1 when it
// could not. An outstanding translation is the answer, not a failure: a red run
// here means the sweep is broken, and a green run with a large backlog means
// the sweep works and there is a backlog. scripts/lib/sweep.mjs says why the
// sweep exists at all.
//
// ## What it runs
//
// scripts/completeness.mjs per repo, with no `--base`, which requires
// everything at `main` rather than only what a PR changed. Running the same
// script the PR check runs is the point: there is one definition of complete,
// and the sweep cannot drift from the gate.
//
// ## What it costs
//
// Per repo: one shallow blobless fetch of `main` (trees, no file contents), then
// `git ls-tree` for the content question, then one blob per metadata file
// (config.json, metadata.toml) fetched in a single request, because names,
// titles and blurbs have to be read to be compared. No working tree is ever
// written, so nothing from a source repo runs. A track costs a few seconds and
// a few megabytes; the whole set is minutes, which is why `--shard` exists.
//
// ## Two phases
//
// A shard writes its own JSON and nothing else, and `--merge` turns every
// shard's JSON into one summary. They are separate so that a shard that fails
// does not take the run's answer with it: the merge reports which shards are
// missing and says plainly that its counts are a floor.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { PRODUCTION_LOCALES, SCRIPTS_ROOT, assertTargetLocale, fail, productionGateNotice } from "./lib/constants.mjs";
import { parseArgs } from "./lib/args.mjs";
import { lsTree, refReader } from "./lib/git.mjs";
import { checkoutDir, isActiveTrack, kindForRepo } from "./lib/source-repos.mjs";
import { lastSweptAt, parseShard, shardOf, summariseRepo, summaryBody, summaryTitle, sweptRepos } from "./lib/sweep.mjs";

const script = (name) => path.join(SCRIPTS_ROOT, "scripts", name);

function node(args) {
  return spawnSync(process.execPath, args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
}

/** The bare track names to sweep, from a JSON array, a JSON search result, or one name per line. */
function readTracks(file) {
  const text = fs.readFileSync(path.resolve(file), "utf8").trim();
  if (!text) return [];
  if (!text.startsWith("[")) return text.split("\n").map((line) => line.trim()).filter(Boolean);
  return JSON.parse(text).map((entry) => (typeof entry === "string" ? entry : entry.name));
}

/**
 * Fetch one repo's `main` as git objects, unless the caller asked not to.
 *
 * `always` is the default because a sweep that reads yesterday's checkout
 * answers yesterday's question, which is the failure it exists to catch. The
 * other two modes are for working locally, where refetching 124 repos to change
 * one line of output is a waste.
 */
function checkout(repo, mode) {
  const dir = checkoutDir(repo.kind === "track" ? repo.name.split("/").pop() : repo.kind);
  const present = fs.existsSync(dir);
  if (mode === "never" || (mode === "missing" && present)) {
    if (!present) throw new Error(`no checkout at ${path.relative(SCRIPTS_ROOT, dir)} and --fetch=${mode}`);
    return dir;
  }
  const result = node([script("source-checkout.mjs"), `--source=${repo.kind}`, `--repo=${repo.name}`, "--force"]);
  if (result.status !== 0) throw new Error(`could not fetch ${repo.name}: ${`${result.stdout}${result.stderr}`.trim().split("\n").pop()}`);
  return dir;
}

/**
 * Whether Exercism still runs this repo, from the track's own config.json.
 *
 * Only a track can be inactive. The sweep asks the question rather than
 * scripts/completeness.mjs, which every source repo runs on every pull request:
 * whether a repo holds its translations does not change with the track's
 * status, so the gate is left exactly as it was, and it is the sweep, which has
 * to decide what goes in a headline, that asks. It costs no extra traffic: a
 * track's config.json is one of the metadata files, so the run has already
 * fetched that blob and this read comes out of the local object store.
 */
function isActive(repo, dir) {
  if (repo.kind !== "track") return true;
  return isActiveTrack(lsTree(dir, "HEAD"), refReader(dir, "HEAD").readMany);
}

function sweepOne(repo, locales, { fetch, full }) {
  const dir = checkout(repo, fetch);
  const json = path.join(fs.mkdtempSync(path.join(process.env.RUNNER_TEMP ?? "/tmp", "sweep-")), "report.json");
  const result = node([script("completeness.mjs"), `--source-repo=${dir}`, `--repo=${repo.name}`, `--kind=${repo.kind}`, `--locales=${locales.join(",")}`, `--json=${json}`]);
  // completeness exits 1 when a locale is incomplete, which is the answer here
  // and not an error. Only a missing report means it could not answer.
  if (!fs.existsSync(json)) throw new Error(`completeness wrote no report: ${`${result.stdout}${result.stderr}`.trim().split("\n").pop()}`);
  const report = JSON.parse(fs.readFileSync(json, "utf8"));
  if (full) fs.writeFileSync(path.join(full, `${repo.name.split("/").pop()}.json`), `${JSON.stringify(report, null, 2)}\n`);
  return summariseRepo(report, locales, { active: isActive(repo, dir) });
}

function sweep(flags) {
  const locales = typeof flags.locales === "string" ? flags.locales.split(",").filter(Boolean) : PRODUCTION_LOCALES;
  locales.forEach(assertTargetLocale);
  const notice = productionGateNotice();
  if (notice) console.log(notice);

  const named = typeof flags.repos === "string" ? flags.repos.split(",").filter(Boolean) : null;
  const all = named
    ? named.map((name) => ({ name: name.includes("/") ? name : `exercism/${name}`, kind: kindForRepo(name) }))
    : sweptRepos(typeof flags.tracks === "string" ? readTracks(flags.tracks) : []);
  const shard = flags.shard ? parseShard(flags.shard) : { index: 1, total: 1 };
  const repos = shardOf(all, shard);

  const full = typeof flags.full === "string" ? path.resolve(flags.full) : null;
  if (full) fs.mkdirSync(full, { recursive: true });
  const fetch = typeof flags.fetch === "string" ? flags.fetch : "always";
  if (!["always", "missing", "never"].includes(fetch)) fail(`--fetch must be always, missing or never, got "${fetch}"`);

  console.log(`Sweeping ${repos.length} of ${all.length} repo(s) (shard ${shard.index}/${shard.total}) against ${locales.join(", ") || "(no locale)"}.`);

  const entries = [];
  const failures = [];
  for (const [position, repo] of repos.entries()) {
    const started = Date.now();
    try {
      const entry = sweepOne(repo, locales, { fetch, full });
      entries.push(entry);
      const outstanding = locales.map((locale) => `${locale} ${entry.locales[locale].outstanding}`).join(", ");
      console.log(`  ${position + 1}/${repos.length} ${repo.name}${entry.active ? "" : " (inactive)"}: ${entry.required} required, outstanding ${outstanding || "(nothing asked)"} (${Math.round((Date.now() - started) / 1000)}s)`);
    } catch (error) {
      failures.push({ repo: repo.name, error: error.message });
      console.log(`  ${position + 1}/${repos.length} ${repo.name}: FAILED, ${error.message}`);
    }
  }

  const out = typeof flags.out === "string" ? path.resolve(flags.out) : null;
  if (out) {
    fs.mkdirSync(out, { recursive: true });
    const file = path.join(out, `sweep-${shard.index}-of-${shard.total}.json`);
    fs.writeFileSync(file, `${JSON.stringify({ sweptAt: new Date().toISOString(), shard, locales, entries, failures }, null, 2)}\n`);
    console.log(`Wrote ${path.relative(process.cwd(), file)}.`);
  }

  if (failures.length > 0) {
    console.log(`\n${failures.length} repo(s) could not be swept. The sweep did not answer for them, so this run is incomplete.`);
    process.exit(1);
  }
}

function merge(flags) {
  const dir = path.resolve(flags.merge);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir, { recursive: true }).map((entry) => path.join(dir, String(entry))).filter((file) => file.endsWith(".json") && fs.statSync(file).isFile()) : [];
  const shards = files.map((file) => JSON.parse(fs.readFileSync(file, "utf8")));
  if (shards.length === 0) fail(`no shard reports under ${dir}. Nothing was swept, so there is nothing to report.`);

  const locales = shards[0].locales;
  const entries = [...new Map(shards.flatMap((s) => s.entries).map((entry) => [entry.repo, entry])).values()].sort((a, b) => (a.repo < b.repo ? -1 : 1));
  const failures = shards.flatMap((s) => s.failures);
  const expected = typeof flags["expected-shards"] === "string" ? Number(flags["expected-shards"]) : shards.length;
  const ran = new Set(shards.map((s) => s.shard.index));
  const incomplete = Array.from({ length: expected }, (_, position) => position + 1).filter((index) => !ran.has(index));

  const sweptAt = new Date().toISOString();
  const previous = typeof flags.previous === "string" && fs.existsSync(flags.previous) ? lastSweptAt(fs.readFileSync(flags.previous, "utf8")) : null;
  const body = summaryBody({ entries, locales, sweptAt, previousSweptAt: previous, runUrl: typeof flags["run-url"] === "string" ? flags["run-url"] : null, failures, incomplete });
  const title = summaryTitle(entries, locales, sweptAt);

  if (typeof flags.body === "string") fs.writeFileSync(path.resolve(flags.body), body);
  else console.log(body);
  if (typeof flags.title === "string") fs.writeFileSync(path.resolve(flags.title), `${title}\n`);
  console.log(`title=${title}`);
  console.log(`Merged ${shards.length} shard(s), ${entries.length} repo(s), ${failures.length} failure(s), ${incomplete.length} shard(s) missing.`);

  if (failures.length > 0 || incomplete.length > 0) process.exit(1);
}

const { flags } = parseArgs(process.argv.slice(2));
try {
  if (typeof flags.merge === "string") merge(flags);
  else sweep(flags);
} catch (error) {
  fail(error.message);
}
