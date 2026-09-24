// The reconciliation sweep: which repos it asks about, and how its answer reads.
//
// `i18n / completeness` is a per-PR check, evaluated against the world at the
// moment it runs. It cannot stay true until the PR merges. A PR goes green, a
// locale joins `productionTargets`, the PR merges, and English lands with no
// translation for the new locale. A locale sits in `targets` but not in
// `productionTargets` while English keeps changing, and nothing ever asks it
// for the backlog. A PR is merged by an administrator, or was merged before the
// check existed. In each case the English is on `main` untranslated and no
// check anywhere says so, until a user hits it and Sentry reports it.
//
// The sweep asks the question that survives all of that: is each source repo's
// `main` fully translated for every production locale, right now. That is
// scripts/completeness.mjs run with no `--base`, which requires everything at
// `--head` rather than only what changed, pointed at each source repo's `main`
// in turn. The primitive is the same one the PR check uses, so the sweep and
// the gate can never disagree about what "complete" means.
//
// This file holds the pure half: the repo list, the sharding, and the shape of
// the report. scripts/sweep.mjs does the fetching, the running and the writing,
// and scripts/test.mjs tests everything here without a network or a checkout.

import { REPO_KINDS, REPO_KIND_IDS } from "./source-repos.mjs";

/** How many outstanding items a repo shows in the summary before it is cut off. */
export const SAMPLE = 3;

/** How old the last sweep may be before the summary calls itself stale. */
export const STALE_AFTER_HOURS = 72;

/** The line the summary issue carries its own timestamp on, and the pattern that reads it back. */
const SWEPT_AT = /^Last swept: ([0-9T:.Z+-]+)/m;

/**
 * The repos the registry names outright: one per kind, `track` excepted.
 *
 * scripts/lib/source-repos.mjs is the list, and a kind with no `remote` is the
 * track kind, which stands for every track repo and names none of them. So the
 * track names are passed in, from whoever can enumerate them.
 */
export function singletonRepos() {
  return REPO_KIND_IDS.filter((id) => REPO_KINDS[id].remote).map((id) => ({ name: REPO_KINDS[id].remote, kind: id }));
}

const TRACK_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

/**
 * Every repo one sweep covers, in a fixed order.
 *
 * The singletons always, plus a track repo for each name given. Names are
 * checked because they reach a `git fetch` URL, and a name that is already a
 * singleton (a repo called `docs` with the track topic on it, say) keeps its
 * own kind rather than being swept twice as a track.
 *
 * @param {string[]} trackNames  bare repo names, such as `ruby`
 * @returns {{ name: string, kind: string }[]} sorted by name
 */
export function sweptRepos(trackNames = []) {
  const repos = new Map(singletonRepos().map((repo) => [repo.name, repo]));
  for (const name of trackNames) {
    if (!TRACK_NAME.test(name)) throw new Error(`"${name}" is not a repo name`);
    const full = `exercism/${name}`;
    if (!repos.has(full)) repos.set(full, { name: full, kind: "track" });
  }
  return [...repos.values()].sort((a, b) => (a.name < b.name ? -1 : 1));
}

/** `--shard=3/8` as `{ index, total }`, one-based. */
export function parseShard(value) {
  const match = /^([0-9]+)\/([0-9]+)$/.exec(String(value));
  if (!match) throw new Error(`--shard must be <index>/<total>, got "${value}"`);
  const [index, total] = [Number(match[1]), Number(match[2])];
  if (total < 1 || index < 1 || index > total) throw new Error(`--shard=${value} is out of range`);
  return { index, total };
}

/**
 * One shard's repos, dealt round robin.
 *
 * Round robin rather than in blocks because the list is sorted by name and the
 * work per repo varies by two orders of magnitude, from a repo with four pages
 * to a track with a thousand files. Dealing alternately keeps the big ones from
 * landing in one shard and holding the whole run up.
 */
export function shardOf(repos, { index, total }) {
  return repos.filter((_, position) => position % total === index - 1);
}

/**
 * One repo's completeness report, cut down to what the summary needs.
 *
 * The full report lists every outstanding item, and a track with nothing
 * translated lists thousands, so a run over 124 repos would carry tens of
 * megabytes between jobs for no reason. Counts and a few examples are enough to
 * decide what to do, and scripts/sweep.mjs `--full=<dir>` keeps the whole thing
 * for anyone who wants it.
 *
 * `active` is whether Exercism still runs the repo, which scripts/sweep.mjs
 * works out (only a track can be inactive). It rides along here because it
 * decides which half of the summary a repo lands in.
 */
export function summariseRepo(report, locales, { active = true } = {}) {
  const required = Object.values(report.required ?? {}).reduce((total, count) => total + count, 0);
  const entry = { repo: report.repo, kind: report.kind, head: report.head, active, required, locales: {} };
  for (const locale of locales) {
    const lines = report.locales?.[locale] ?? [];
    entry.locales[locale] = { outstanding: lines.length, sample: lines.slice(0, SAMPLE).map((line) => line.what) };
  }
  return entry;
}

/**
 * Where one repo stands for one locale.
 *
 * `empty` is a repo with no translatable English at all, which is what a
 * tooling repo carrying a track topic looks like. It is not progress and not a
 * gap, so it is reported separately and never as "complete".
 */
export function standing(entry, locale) {
  const { outstanding } = entry.locales[locale] ?? { outstanding: 0 };
  if (entry.required === 0) return "empty";
  if (outstanding === 0) return "complete";
  return outstanding < entry.required ? "started" : "untouched";
}

/**
 * Whether a repo's gaps gate anything, which is whether Exercism still runs it.
 *
 * An inactive track is one the website no longer shows, so nobody can reach its
 * English and a missing translation of it is text no user will ever see.
 * scripts/validate.mjs already stops requiring their metadata catalogs. An
 * entry that predates the flag (an older shard's JSON) counts as gated, because
 * treating an unknown as out of scope is the error that hides work.
 */
export function gated(entry) {
  return entry.active !== false;
}

/** The command in exercism/translator that translates one repo into one locale in full. */
export function fixCommand(entry, locale) {
  const name = entry.repo.split("/").pop();
  return `node scripts/translate.mjs ${entry.kind === "track" ? `track ${name}` : entry.kind} ${locale}`;
}

const count = (n) => n.toLocaleString("en-US");

function table(entries, locales) {
  const lines = [`| Repo | ${locales.map((locale) => `${locale} outstanding`).join(" | ")} | Translate with |`, `|---|${locales.map(() => "---:").join("|")}|---|`];
  for (const entry of entries) {
    const cells = locales.map((locale) => {
      const { outstanding } = entry.locales[locale];
      return outstanding === 0 ? "ok" : `${count(outstanding)} of ${count(entry.required)}`;
    });
    lines.push(`| \`${entry.repo}\` | ${cells.join(" | ")} | ${locales.map((locale) => `\`${fixCommand(entry, locale)}\``).join("<br>")} |`);
  }
  return lines.join("\n");
}

/**
 * One group of repos sorted into the four answers a repo can give.
 *
 * The split between "part translated" and "not started" is the useful one: a
 * handful of items in an otherwise complete repo is drift, and a whole
 * untranslated repo is backlog. It applies inside each group rather than across
 * the report, so an inactive track's backlog never sits next to an active
 * track's drift.
 */
function byStanding(group, locales) {
  const of = (name) => group.filter((entry) => locales.some((locale) => standing(entry, locale) === name));
  const started = of("started");
  return {
    started,
    untouched: of("untouched").filter((entry) => !started.includes(entry)),
    complete: group.filter((entry) => entry.required > 0 && locales.every((locale) => standing(entry, locale) === "complete")),
    empty: group.filter((entry) => entry.required === 0)
  };
}

/** How many translations a group of repos is missing for one locale. */
const outstandingIn = (group, locale) => group.reduce((sum, entry) => sum + entry.locales[locale].outstanding, 0);

/** One group's outstanding count per locale, as `hu: 4, fr: 0`. */
function totalsOf(group, locales) {
  return locales.map((locale) => `${locale}: ${count(outstandingIn(group, locale))}`).join(", ");
}

/**
 * The summary issue's body.
 *
 * One issue, edited in place on every run, so the sweep can never spam and two
 * runs that find the same thing leave the same body. The body opens with when
 * it last ran, because the failure this sweep is least able to report is its
 * own: a schedule that quietly stops leaves a body that still reads as an
 * answer. A date at the top, and `stale` when that date is old, is what makes a
 * sweep that stopped look different from a sweep that found nothing.
 *
 * ## Why the headline leaves the inactive tracks out
 *
 * A headline is a number somebody acts on. Counting the inactive tracks made it
 * one nobody would: of the 3,109 outstanding a full run measured on 2026-09-24,
 * 3,083 were in tracks Exercism no longer shows, and the 26 that anyone would
 * act on (drift in `go` and `swift`, both otherwise complete) sat in the same
 * list as `haxe` at 460. So the headline counts the repos whose English a
 * reader can reach, and the rest keep their own section, with their own counts,
 * at the end.
 *
 * @param {object} run  `{ sweptAt, previousSweptAt, runUrl, shards, failures }`
 */
export function summaryBody({ entries, locales, sweptAt, previousSweptAt = null, runUrl = null, failures = [], incomplete = [] }) {
  const age = freshness(previousSweptAt, sweptAt);
  const active = entries.filter(gated);
  const inactive = entries.filter((entry) => !gated(entry));
  const { started, untouched, complete, empty } = byStanding(active, locales);

  const body = [
    `Last swept: ${sweptAt}${runUrl ? ` ([run](${runUrl}))` : ""}`,
    "",
    "This issue is written by `.github/workflows/sweep.yml` and rewritten in place on every run, so it is always the current answer and never a thread. Do not close it: an open issue with a recent date is how anyone can see the sweep is still running.",
    ""
  ];

  if (age.stale) {
    body.push(`> [!WARNING]`, `> The sweep before this one ran ${age.days} days ago, which is longer than the ${STALE_AFTER_HOURS} hours it allows itself. Its schedule stopped and started again, so anything that landed in between went unchecked.`, "");
  }
  if (failures.length > 0 || incomplete.length > 0) {
    const missed = [...incomplete.map((shard) => `shard ${shard} did not finish`), ...failures.map((failure) => `\`${failure.repo}\`: ${failure.error}`)];
    body.push(`> [!CAUTION]`, `> This run is incomplete, so the counts below are a floor and not an answer: ${missed.join("; ")}.`, "");
  }

  body.push(
    `${count(active.length)} active source repo(s) read at \`main\`, against ${locales.join(", ")}. Outstanding translations, ${totalsOf(active, locales)}.`,
    "",
    "Each row is one repo's `main` measured in full, which is `scripts/completeness.mjs` with no `--base`. A PR's `i18n / completeness` check asks the same question of one PR's changes, so anything here is English that is already merged and still untranslated, whatever the checks said at the time.",
    ""
  );
  if (inactive.length > 0) {
    body.push(`The sweep also read ${count(inactive.length)} track repo(s) Exercism no longer runs, holding ${totalsOf(inactive, locales)}. That count is deliberately not in the line above: nobody can reach those pages, so the work is not gated and not urgent. It is kept under "Inactive tracks" below.`, "");
  }

  if (started.length > 0) {
    body.push(`## Part translated (${started.length})`, "", "These have translations and are missing some. They are the ones to finish first: the locale already serves these repos, so a gap here is text a user can reach today.", "", table(started, locales), "");
    for (const entry of started.slice(0, 10)) {
      const examples = locales.flatMap((locale) => entry.locales[locale].sample.map((what) => `${locale}: ${what}`));
      if (examples.length > 0) body.push(`- \`${entry.repo}\`: ${examples.join("; ")}`);
    }
    body.push("");
  }
  if (untouched.length > 0) {
    body.push(`## Not started (${untouched.length})`, "", "No production locale holds any of these. They are a backlog rather than a regression, and they are listed so the total is honest.", "", "<details><summary>Show</summary>", "", table(untouched, locales), "", "</details>", "");
  }
  if (complete.length > 0) body.push(`## Complete (${complete.length})`, "", complete.map((entry) => `\`${entry.repo}\``).join(", "), "");
  if (empty.length > 0) body.push(`## Nothing to translate (${empty.length})`, "", "The registry matches no file in these, so they are repos the topic search finds and the sweep has no question about.", "", empty.map((entry) => `\`${entry.repo}\``).join(", "), "");

  if (inactive.length > 0) {
    const dormant = byStanding(inactive, locales);
    body.push(
      `## Inactive tracks (${inactive.length})`,
      "",
      'Each of these tracks says `"active": false` in its own `config.json`, so the website no longer shows it and a reader cannot reach the English. `scripts/validate.mjs` already stops requiring their metadata catalogs. The sweep still reads them, so a track that is switched back on shows up here the next morning rather than whenever somebody thinks to look, and it keeps them out of the headline so the headline is work somebody would do.',
      "",
      `Outstanding translations, ${totalsOf(inactive, locales)}.`,
      "",
      "<details><summary>Show</summary>",
      ""
    );
    if (dormant.started.length > 0) body.push(`### Part translated (${dormant.started.length})`, "", table(dormant.started, locales), "");
    if (dormant.untouched.length > 0) body.push(`### Not started (${dormant.untouched.length})`, "", table(dormant.untouched, locales), "");
    if (dormant.complete.length > 0) body.push(`### Complete (${dormant.complete.length})`, "", dormant.complete.map((entry) => `\`${entry.repo}\``).join(", "), "");
    if (dormant.empty.length > 0) body.push(`### Nothing to translate (${dormant.empty.length})`, "", dormant.empty.map((entry) => `\`${entry.repo}\``).join(", "), "");
    body.push("</details>", "");
  }

  return `${body.join("\n").trimEnd()}\n`;
}

/** The `Last swept:` timestamp of a previous body, or null if it has none. */
export function lastSweptAt(body) {
  return SWEPT_AT.exec(body ?? "")?.[1] ?? null;
}

/**
 * How long ago the previous sweep ran, and whether that is too long.
 *
 * A first run has nothing to compare against and is never stale.
 */
export function freshness(previous, now, { staleAfterHours = STALE_AFTER_HOURS } = {}) {
  if (!previous) return { hours: null, days: null, stale: false };
  const hours = (Date.parse(now) - Date.parse(previous)) / 3_600_000;
  if (!Number.isFinite(hours)) return { hours: null, days: null, stale: false };
  return { hours, days: Math.round(hours / 24), stale: hours > staleAfterHours };
}

/**
 * The title, which carries the headline count so a stale sweep shows in a list of issues.
 *
 * It counts the active repos only, for the reason summaryBody gives, and says
 * "active" so that the difference from the number the body's last section
 * carries is on the face of the title rather than a surprise inside it.
 */
export function summaryTitle(entries, locales, sweptAt) {
  const active = entries.filter(gated);
  const total = locales.reduce((sum, locale) => sum + outstandingIn(active, locale), 0);
  return `Translation sweep: ${count(total)} outstanding across ${active.length} active source repo(s), as of ${sweptAt.slice(0, 10)}`;
}
