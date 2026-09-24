# Exercism i18n - Agent Instructions

This repo holds Exercism's translations, and the scripts and GitHub Actions that check them.
Its structure and conventions were copied from Jiki's `i18n` repo, but the two are fully
separate: nothing here should use Jiki's repo, tooling or data.

Hungarian (`hu`) is a production target. `locales/hu/` holds the website UI catalogs and the
Ruby track, and other sources and tracks are added as they are translated. Every script runs
against that tree and against a fixture in `scripts/test.mjs`. Read "What is real, what is
stubbed" before assuming anything works end to end.

## What this repo does

- **Holds every non-English string Exercism ships**: the website's UI strings and all
  git-sourced content (exercises, concepts, track docs, the docs repo, the blog, analyzer
  comments, problem-specifications), for every target locale.
- **Checks those translations** (`validate`), and tells each source repo whether a PR's
  English may merge yet (`completeness`).
- **Supplies the website's translations.** The website reads them directly from a checkout of
  this repo, so `main` is production. See "How the website consumes this repo".

## What this repo does not do

- **Store English.** English is written in the source repos and read from checkouts of them
  as git objects. See [ENGLISH-SOURCE.md](./ENGLISH-SOURCE.md).
- **Translate.** No script here calls an LLM. DeepSeek translates every language from
  `exercism/translator`, which uses this repo's scripts and writes into `locales/`. On this
  side, `.github/workflows/translate-on-issue.yml` sends it one dispatch per issue, carrying
  the issue number.
- **Host a review site.** Exercism has no public review site, and none of Jiki's HTML
  rendering was brought over.

## Directory structure

```
locales.json                     targets, productionTargets (hu today)
website-exclusions.json          website areas that are never translated
locales/<locale>/
  website/backend.json           Rails strings, nested, no locale root
  website/backend.meta.json      per-unit staleness stamps, written by validate --stamp
  website/frontend.json          i18next strings: { "<namespace>": { "<key>": "..." } }
  website/frontend.meta.json
  metadata/<repo>.json           names, titles, blurbs of one source repo, flat, keyed by slug
  metadata/<repo>.meta.json      per-unit stamps, as for the website catalogs
  content/<ab>/<cd>/<rest>.<ext> one file per English git blob id, source extension kept
index/json/<locale>/<repo>.json  the translation index: held blob ids per source path
index/markdown/<locale>/         generated from that JSON: one page per repo, and README.md
scripts/                         see "Scripts"
.github/workflows/               this repo's own workflows, and source-queue.yml and
                                 source-completeness.yml, which source repos call
source-repo-workflows/           the short callers installed in source repos
.source/  .build/                gitignored: source fetches, flattened English
```

## The three stores

### Website UI strings: two catalogs per locale

English stays split over many files in `website` (125 YAML files and about 205 bundles at
`102577eb`). `scripts/lib/website-english.mjs` flattens it into two catalogs, and the checker
and translation passes work against those:

| | backend | frontend |
| --- | --- | --- |
| English | `config/locales/**/*.yml`, `en:` root | `app/javascript/i18n/en/*.ts`, mapped by `index.ts` |
| Flat key | `tracks.show.title` | `components/donations:form.oneOff` |
| Interpolation | `%{name}` | `{{name}}`, `$t(key)` |
| Plural group | nested `one:` / `other:` | `_one` / `_other` suffix, `_ordinal_` for ordinals |
| Markup | HTML in `_html` keys | `<Trans>` tags: `<0>`, `<strong>`, `<trackTitle>` |

- **Parity is counted by unit.** A unit is an ordinary key or a whole plural group. A target
  language often needs different plural keys from English: Polish needs `one/few/many/other`,
  Japanese only `other`. A group is complete when the locale holds every category its own
  grammar uses (`Intl.PluralRules`), whatever English holds. `zero` is always allowed. There
  is no per-language table, and one should not be added.
- **Extra keys are never an error.** A key English does not have is a WARN that names it.
  Translation runs ahead of English merging, so this repo often holds keys English does not
  have yet.
- **A missing unit is an error only for a production locale**, or under `validate
  --complete`. For any other locale it is counted.
- **Staleness is counted per unit and is never an error here.** A sibling `.meta.json` stamps
  each unit with the hash of the English it was checked against. The states are `done`,
  `stale`, `unstamped` and `missing`. English edits are caught by the source PR's completeness
  check, outside this repo's CI.
- **Stamps are written by `validate --stamp`, never by hand.** A hand-written stamp looks like
  a passed check without being one, and models invent plausible hashes. `--stamp` stamps
  unstamped units that pass. A stale unit is only re-stamped when it is listed in
  `--stamp-units`, because the script cannot tell a retranslated unit from an untouched one.
- **The website's own `hu:` and `nl:` trees are not migrated.** `config/locales/pages/track.yml`
  holds Hungarian and Dutch beside `en:`. The build reads only the `en:` root. This is
  deliberate: both languages will be translated again from scratch with the current engine,
  so nothing from those trees is copied into `locales/`.
- **Exclusions live in `website-exclusions.json`** and apply to both sides: an excluded key is
  not required, counted or checked.

### Git-sourced content: keyed by the blob id of the English file

`locales/<locale>/content/<ab>/<cd>/<rest-of-blob-id>.<ext>`. One file per locale per blob
id, shared by every track with byte-identical English.

- **No staleness, no stamp and no `en_md5`.** A blob id always names the same bytes.
  `validate` errors on a content file that has an `en_md5`.
- **Completeness is a directory lookup**: does a file exist for this blob id? It needs trees
  only, never English bytes.
- **The path does not record where the English came from.** This is deliberate, so that
  identical English in different repos shares one file.
- **A file whose own blob id equals the id it is filed under is copied English.** The check is
  exact and needs no source repo. It is a WARN, because a page with nothing to translate is
  legitimately identical.
- **`scripts/lib/content-types.mjs` holds every path pattern.** A type is a pattern within a
  kind of repo, so one entry covers all eighty tracks.
- **A `wip` exercise's files are not required either.** The registry matches
  `exercises/practice/two-fer/.docs/instructions.md` by path and opens no config, so it cannot
  tell a finished exercise from a half-written one. `wipExerciseDirs`
  (`scripts/lib/source-repos.mjs`) reads the track's own `config.json` at the ref being
  processed, next to `isActiveTrack` and for the same reasons, and
  `translatableFiles(kind, entries, read)` leaves those directories out. The same `status`
  rule decides this and the metadata catalog below, so a wip exercise is absent from both.
  A caller that passes no `read` gets every matched file, which is what
  `scripts/english-changes.mjs` does: it sees a PR's file list and no tree, so it cannot ask
  the config, and requiring the file costs one translation nobody reads where the other
  mistake costs a reader English text. `scripts/completeness.mjs` makes the final decision, as
  it does for the metadata half.
- **The `docs`, `blog` and `website-copy` patterns have been verified** against the real trees
  and against how the website loads each, and the registry records the commit, the match
  counts and what is left out on purpose. `docs` has one type per served section (212 served
  pages, plus 3 unlisted files the patterns also match); `blog` is exact (54 posts, 13
  stories); `analyzer-comments` is exact (519). Analyzer comments contain `%{name}` tokens that
  the website fills in, so `validate` checks that a content file keeps its English's tokens.
  The track and `problem-specifications` patterns have not been checked this way.

### Names, titles and blurbs: one keyed catalog per source repo

`locales/<locale>/metadata/<repo>.json`, where `<repo>` is the GitHub repo's name (`ruby`,
`problem-specifications`, `docs`, `blog`). This is text that sits among data inside
`config.json` and `metadata.toml`, so it is not a whole file. `scripts/lib/metadata.mjs` owns
the extraction, the keys and the reasoning.

- **Keyed by slug (decided by iHiD).** The website copies this text into database columns and
  only shows the latest version, so an old version never needs serving. It works like the
  website catalogs: same checker, same per-unit stamps, same four states. An edited blurb is a
  stale unit and blocks its PR.
- **Flat on disk**, `{ "<key>": "<translation>" }`, because keys contain slugs and a docs slug
  can contain `/`.
- **Keys are slugs, never positions**: `track:blurb`, `key_feature:<icon>:title|content`,
  `exercise:<slug>:name|blurb|source`, `concept:<slug>:name|blurb`, `doc:<slug>:title|blurb`;
  `exercise:<slug>:title|blurb|source|deep_dive_blurb` for problem-specifications;
  `<section>:<slug>:title|blurb` for docs; `post:<slug>:title|description|marketing_copy`
  and `story:<slug>:title|blurb` for the blog. Reordering a file changes nothing.
- **A renamed or removed exercise deletes nothing.** A rename creates new keys, required like
  any new text. The old keys stay in every locale, unused, reported as "key not in English".
- **Only text a user sees.** Each field was traced through the website's ingest at
  `origin/main` and is listed in `metadata.mjs`. Uuids, slugs, paths, URLs, authors, icons and
  file lists are never extracted. Neither is the track's `language` (a proper name) or its
  `tags` (codes; the words come from `Track::TAGS` in the website's Ruby). Only exercises and
  concepts listed in the track's `config.json` are included, because the website syncs
  nothing else.
- **A `wip` exercise is left out.** A track's `config.json` gives an exercise entry a `status`
  of `active`, `beta`, `deprecated` or `wip`, or none at all. Only `wip` is excluded, because
  the website shows nobody a work-in-progress exercise. A `beta` exercise is live and a
  `deprecated` one is still served to everyone who has already started it, so both are
  required like any other. Concept entries carry no `status` and are all required. The rule is
  `isWipExercise` in `scripts/lib/source-repos.mjs`, and it covers the exercise's `.docs/*.md`
  files too (see "A `wip` exercise's files" above).
- **English lives in the source repo**, so `validate` checks `metadata/ruby.json` against
  English only when `--content-repos` names a checkout called `ruby`. Otherwise the catalog is
  shape-checked and reported as `unv` (unverified), never `ok`. CI fetches each repo that some
  locale holds a catalog for.
- **Deduplication across tracks is left to the translator.** 323 of ruby's 427 units have
  English that also appears in problem-specifications. A stamp is the blob id of the English
  string, so identical English has the same stamp in every `*.meta.json`, which makes reuse a
  hash lookup.
- **Sizes** (2026-09): ruby 427 units from 155 files, problem-specifications 439 from 151,
  docs 259 from 5, blog 134 from 1.

## The translation index

The content store records nothing about where its English came from, so `index/` maps it
back. `index/json/<locale>/<repo>.json` lists, for each translatable path of a source repo,
the blob ids of that path's English the locale holds, newest first and at most six (the
latest and up to five before it), plus English and localised display names. A path with no
ids is shown as missing. `index/markdown/<locale>/<repo>.md` and `README.md` are generated
from the JSON alone, for browsing on GitHub, with relative links into `locales/`.

- **Only the JSON is written.** `exercism/translator`'s `translate.mjs` updates a repo's JSON
  after every pass over it and regenerates that repo's page and the README, and
  `run-issue.mjs` commits `index/` with `locales/`. `scripts/backfill-index.mjs` rebuilds a
  locale from source history. Both use `scripts/lib/translation-index.mjs`.
- **CI fails on a hand edit.** `node scripts/build-index.mjs all --check` (in `validate.yml`)
  fails when a page differs from what its JSON generates, or when the JSON lists an id with
  no file under `locales/`. After changing the JSON by hand, run
  `node scripts/build-index.mjs` to regenerate the pages.
- **It lives outside `locales/`** because validate rejects unexpected files there. The
  website never reads it, and `no-deletions` does not cover it: dropping the oldest id past
  the cap is how it is meant to change.
- **Inactive tracks are not indexed** by the backfill, since the website does not show them.
- **Metadata catalogs are not indexed.** They are the source of the localised names only.

## Nothing under `locales/` is deleted

`scripts/no-deletions.mjs` and `no-deletions.yml` fail on any removed file or key, on PRs and
on pushes to `main`. This repo has to hold everything needed by every source repo's `main`
and by all of their open PRs. An `Allow-Deletions: <why>` commit trailer overrides the check.
Stamp files (`*.meta.json`) are exempt because they are generated.

## Production locales

`locales.json` `productionTargets` is an explicit list. `validate` exits non-zero on errors in
these locales, and `completeness` holds source repo PRs to them. It currently holds `hu`. An
empty list is allowed here (unlike in Jiki's repo; this list was empty until `hu` was added),
and every gating script accepts it and prints `NOTHING GATES` when it is empty. A missing or
malformed list, or a locale that `targets` does not include, is still fatal.

## Scripts

All Node ESM with no dependencies except `yaml`, which is loaded lazily and only to read the
website's Rails YAML. The package manager is pnpm, pinned in `package.json`. Each script's
header comment is its documentation, so read it before changing the script. There is no
`--help`.

| Script | What it does |
| --- | --- |
| `build-english.mjs` | Flattens the website's English. Writes `.build/english/{backend,frontend,arrays,source}.json` for a translation pass to read, or with `--content-repos` one `.build/english/metadata/<repo>.json` per repo. The other scripts call the same builder directly and do not read these files. |
| `validate.mjs` | The checker. Catalogs: unit parity, plural groups, placeholders, tags, whitespace. Content: path shape, UTF-8, JSON, no stamps, copied English, and structure against English when `--content-repos` provides it. Writes stamps with `--stamp`. Exits 1 on an ERROR in a production locale; `--gate=all` and `--complete` widen that. |
| `completeness.mjs` | The blocking check for one source repo, in full or relative to `--base`. Content is checked by blob id, website and metadata units by presence and stamp, so an edited key or blurb blocks. |
| `sweep.mjs` | The daily reconciliation: `completeness.mjs` with no `--base` against every source repo's `main`, sharded, merged into one standing summary issue. It answers what the per-PR check cannot, because that check is evaluated before the PR merges. |
| `english-changes.mjs` | Used by the queue. Turns GitHub's PR file list (paths and blob shas) into the issue's table. For a changed `config.json` or `metadata.toml` it lists the keys whose English changed, using both versions of the file fetched by blob id. With `--push` it reports whether one push to a queued PR changed the PR's English, using the two commits' trees. It reads API responses, never a checkout. |
| `coverage.mjs` | Per-locale unit counts (website and metadata) and blob coverage for the named repos. Reports only, and always exits 0. |
| `no-deletions.mjs` | Fails on a removed file or key under `locales/` between two refs. |
| `source-checkout.mjs` | Fetches a source repo into `.source/`: shallow, blobless, no working tree. |
| `build-index.mjs` | Generates `index/markdown/` from `index/json/`. With `--check` it writes nothing and fails on a page that differs, an id with no file, or JSON not in canonical form. |
| `backfill-index.mjs` | Builds one locale's index from the full history of every source checkout (default `../translator/.source`), at `origin/main`. Re-runnable. |
| `pr-reply.mjs` | The wording of the one reply the loop posts on a source PR ("This PR has been translated 🚀"), and whether a PR already has it. Used by `rerun-source-check.yml`. Posts nothing itself. |
| `test.mjs` | Plain `node:assert`. Unit assertions, then a fixture of real git repos that every script is run against. |

- **Errors block; warnings never do.** WARN checks are heuristics and are expected to flag
  some correct text. Read them, and never turn one into an error.
- **`EXERCISM_I18N_ROOT`** points the scripts at another tree. It exists for `test.mjs`.

## The sweep

`i18n / completeness` is per-PR and is evaluated against the world at check time, so it
cannot stay true until the PR merges. A locale joining `productionTargets` after a PR goes
green, an administrator merging past a red check, and a PR that predates the check all leave
untranslated English on `main` with nothing reporting it. A locale in `targets` but not in
`productionTargets` is never asked for anything at all, so it rots while English changes.

`.github/workflows/sweep.yml` runs `scripts/sweep.mjs` daily and on demand. It covers every
repo kind in `scripts/lib/source-repos.mjs` plus every track repo the `exercism-track` topic
finds, against every locale in `productionTargets`, and it reports rather than queues.

- **It reports into one issue**, labelled `sweep`, rewritten in place on every run. Nothing
  is ever posted twice and the issue is not a thread. Do not close it.
- **It opens no translation issues.** The queue's issues are scoped to a pull request
  (`exercism/translator`'s `run-issue.mjs` derives a run's scope from a PR's diff), and a
  sweep has no PR. What it finds is a whole-repo pass, which is
  `node scripts/translate.mjs <source> <locale>` over there and needs no issue. Each row
  prints that command.
- **A red run means the sweep is broken, not that there is a backlog.** Outstanding
  translations are the measurement. `sweep.mjs` exits non-zero only when it could not answer.
- **It reports its own silence.** The issue carries the date it was last written in its title
  and its first line, a failed scheduled run mails the repo's admins, and the next run that
  works compares its timestamp with the one it overwrites and warns when the gap is too long.

## How the website consumes this repo

**A push to `main` deploys.** The website keeps a plain checkout of this repo on its EFS, at
`<efs_repositories_mount_point>/i18n`, on `main` and sparse to the locales it serves. Its
webhook pulls that checkout on every push here, and it reads `locales/<locale>/...` directly
from it, including the frontend catalog. The website keys its caches on the checked-out HEAD
sha. There is no build step, upload or intermediate copy, so the layout under `locales/` (see
"Directory structure") is exactly what the website reads. Moving a file or changing a file's
shape needs a matching change in the website.

Everything on `main` is deployed, for every locale, complete or not. The checks sit
elsewhere: `validate` controls what may land for a production locale, each source repo's
completeness check controls what English may merge, and the website decides which locales it
serves.

## What is real, what is stubbed

Working and tested: everything in the Scripts table, against a fixture and (read-only)
against the real `website`, `ruby`, `docs` and `problem-specifications`; the blobless fetch of
`exercism/website` and of a real PR's merge ref.

`sweep.mjs` has been run for real over 20 source repos, `website`, `docs`, `blog`,
`website-copy`, `problem-specifications` and 15 tracks, and found a real gap in
`exercism/go`. Its workflow has not run in CI yet, so the first scheduled run is the thing to
watch.

Not done yet:

- **The loop runs as a GitHub App in the five non-track source repos, and in no track yet.**
  `website`, `docs`, `blog`, `website-copy` and `problem-specifications` call the reusable
  workflows (`source-queue.yml`, `source-completeness.yml`) through the short callers in
  `source-repo-workflows/`, and each requires `i18n / completeness` on `main`. The loop acts as the Exercism i18n app
  (`exercism-i18n[bot]`), whose id and private key are an organisation variable
  (`EXERCISM_I18N_APP_ID`) and secret (`EXERCISM_I18N_APP_PRIVATE_KEY`); each job mints a
  token limited to the repos and permissions it needs. Only issues opened by
  `exercism-i18n[bot]` are acted on. `exercism/org-wide-files` still holds the old
  self-contained templates for the tracks, and needs the callers before its sync is turned
  back on. The whole loop, the reply on the PR included, was
  tested live as the app on 2026-09-22 (`exercism/website-copy#2420`).

## Open questions

Do not settle these as a side effect of other work. Each is marked `TODO(iHiD): OPEN` in the
code it would change.

1. ~~Whether a runner here translates automatically on issue-open.~~ Answered: yes, and the
   runner is in `exercism/translator`. `translate-on-issue.yml` sends it the issue number
   with one `repository_dispatch`, and it translates, pushes here and closes the issue. No
   script here calls an LLM. The dispatch only happens for an issue opened by
   `exercism-i18n[bot]`, with
   the `translation` label and a title starting `Translate exercism/`, and the translator repo
   checks all of that again itself.
2. ~~Who may trigger an issue.~~ Answered: whoever adds the `ready-to-translate` label to the
   source PR, which needs triage rights there. Every PR needs it, including maintainers' own.
   A later push that changes English removes the label and closes the issue as not planned.
   See `source-repo-workflows/README.md`.
3. ~~Whether a human-navigable symlink tree should exist beside the blob-id store.~~
   Answered: there is no symlink tree. Use the translation index (`index/`, see above) to
   find a file's translations.
4. Which content types and locales are in scope for launch. Every content type is live, and
   `hu` is the only locale so far. Two scope decisions are flagged in `content-types.mjs` and
   left open: whether the contributor-facing `building/` docs (155 of 212 pages) and the
   mentor-facing `mentoring/` docs are translated, and whether the learner-facing CLI
   walkthrough (`website-copy` `walkthrough/index.html`, which is HTML) is.

(The PATs are settled: see "What is real, what is stubbed".)

## House rules

- **No em dashes** in prose, here or in translated content.
- Refer to the owner as **iHiD** in code, comments and commit messages.
- **Never hand-write a stamp.** `validate --stamp` writes them.
- **Never delete under `locales/`.** Add and update.
- **Never turn a warning into an error.**
- **Never store English here**, including as filler for an untranslated key. A missing unit
  stays missing.
