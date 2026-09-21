# Exercism i18n - Agent Instructions

This repo holds **Exercism's translated output**, and the scripts and GitHub Actions that
check it. It was forked, in structure and idiom, from Jiki's `i18n` repo.
Exercism and Jiki are fully separate: nothing is shared, and nothing here should reach for
Jiki's repo, tooling or data.

**Status: Hungarian (`hu`) is a production target**, holding the website UI catalogs and the
Ruby track; other sources and tracks land as they are translated. Every script runs against
that tree and against a fixture in `scripts/test.mjs`. Read "What is real, what is stubbed"
before assuming anything works end to end.

## What this repo is

- **The home of every non-English string Exercism ships.** The website's UI strings and
  every piece of git-sourced content (exercises, concepts, track docs, the docs repo, the
  blog, analyzer comments, problem-specifications), in every target locale.
- **The checker of those translations** (`validate`), and the answer to "may this English
  merge yet?" for every source repo (`completeness`).
- **What the website serves.** The website reads translations straight from a checkout of
  this repo, so `main` is production. See "How the website consumes this repo".

## What this repo is not

- **Not the home of English.** English is authored in the source repos and read from
  checkouts of them, through git objects. See [ENGLISH-SOURCE.md](./ENGLISH-SOURCE.md).
- **Not where translation happens.** No script here calls an LLM. DeepSeek translates every
  language, from `exercism/translator`, which reads this repo's scripts and writes into
  `locales/`. `.github/workflows/translate-on-issue.yml` is the whole of this side of it:
  one dispatch carrying an issue number.
- **Not a review site.** There is no public review site for Exercism. Everything of Jiki's
  that rendered HTML was left behind.

## Directory structure

```
locales.json                     targets, productionTargets (hu today)
website-exclusions.json          website areas that are never translated
locales/<locale>/
  website/backend.json           Rails strings, nested, no locale root
  website/backend.meta.json      per-unit staleness stamps, written by validate --stamp
  website/frontend.json          i18next strings: { "<namespace>": { "<key>": "..." } }
  website/frontend.meta.json
  metadata/<repo>.json           names, titles, blurbs of ONE source repo, flat, keyed by slug
  metadata/<repo>.meta.json      per-unit stamps, as for the website catalogs
  content/<ab>/<cd>/<rest>.<ext> one file per English git blob id, source extension kept
scripts/                         see "Scripts"
.github/workflows/               this repo's own workflows
source-repo-workflows/           TEMPLATES a source repo installs; they do not run here
.source/  .build/                gitignored: source fetches, flattened English
```

## The three stores

### Website UI strings: exactly two catalogs per locale

English stays as many files in `website` (125 YAML files and about 205 bundles at
`102577eb`). `scripts/lib/website-english.mjs` flattens it into two catalogs, and the
checker and a pass work against those:

| | backend | frontend |
| --- | --- | --- |
| English | `config/locales/**/*.yml`, `en:` root | `app/javascript/i18n/en/*.ts`, mapped by `index.ts` |
| Flat key | `tracks.show.title` | `components/donations:form.oneOff` |
| Interpolation | `%{name}` | `{{name}}`, `$t(key)` |
| Plural group | nested `one:` / `other:` | `_one` / `_other` suffix, `_ordinal_` for ordinals |
| Markup | HTML in `_html` keys | `<Trans>` tags: `<0>`, `<strong>`, `<trackTitle>` |

- **Parity is by UNIT, never by leaf.** A unit is an ordinary key or a whole plural group.
  A target language legitimately holds different plural keys from English: Polish needs
  `one/few/many/other`, Japanese `other` alone. A group is complete when the locale holds
  every category ITS OWN grammar reaches (`Intl.PluralRules`), whatever English holds.
  `zero` is always allowed. There is no per-language table and there must never be one.
- **Excess is never an error; absence always is.** A key English lacks is a WARN that names
  it. Translation runs ahead of English merging, so this repo is routinely a superset.
- **Missing is an ERROR only for a production locale**, and under `validate --complete`.
  For any other locale it is a counted state.
- **Staleness is per unit and never an error here.** A sibling `.meta.json` stamps each unit
  with the hash of the English it was checked against. The states are `done`, `stale`,
  `unstamped`, `missing`. What holds an English EDIT to account is the source PR's
  completeness check, not this repo's CI.
- **Stamps are written by `validate --stamp`, never by hand.** A hand-written stamp looks
  like a passed check and is not one, and models fabricate plausible hashes. `--stamp`
  stamps unstamped units that passed. A STALE unit is re-stamped only when named in
  `--stamp-units`, because nothing can tell "retranslated" from "untouched".
- **The website's own `hu:` and `nl:` trees are not migrated.** `config/locales/pages/track.yml`
  holds Hungarian and Dutch beside `en:`. The build reads the `en:` root only, and that is
  the decision, not a gap: both languages will be redone from scratch with the current
  engine. Nothing is to be copied from there into `locales/`.
- **Exclusions live in `website-exclusions.json`** and bind on both sides: an excluded key is
  not required, counted or checked.

### Git-sourced content: keyed by the blob id of the English file

`locales/<locale>/content/<ab>/<cd>/<rest-of-blob-id>.<ext>`. One file per locale per blob
id, shared by every track with byte-identical English.

- **There is no staleness, no stamp and no `en_md5`.** A blob id names exact bytes forever.
  `validate` errors on a content file that carries an `en_md5`.
- **Completeness is "does a file exist for this blob id"**, a directory lookup. It needs
  trees only, never English bytes.
- **The path says nothing about where the English came from**, on purpose.
- **A file whose own blob id equals the id it is filed under is copied English.** Exact, and
  needs no source repo. It is a WARN, because a page with nothing to translate is
  legitimately identical.
- **`scripts/lib/content-types.mjs` is the one place a path pattern lives.** A type is a
  pattern within a KIND of repo, so one entry covers all eighty tracks.
- **The `docs`, `blog` and `website-copy` patterns are VERIFIED** against the real trees and
  against how the website ingests each, and the registry records the commit, the match
  counts and what is deliberately left out. `docs` is one type per served section (212
  served pages, plus 3 unlisted files the patterns over-match); `blog` is exact (54 posts,
  13 stories); `analyzer-comments` is exact (519). Analyzer comments carry `%{name}`
  tokens the website interpolates, so `validate` holds a content file to its English's.
  The track and `problem-specifications` patterns have NOT had the same check.

### Names, titles and blurbs: one keyed catalog per source repo

`locales/<locale>/metadata/<repo>.json`, where `<repo>` is the GitHub repo's name (`ruby`,
`problem-specifications`, `docs`, `blog`). This is the text that is NOT a whole file: it
sits inside `config.json` and `metadata.toml` among data. `scripts/lib/metadata.mjs` owns
the extraction, the keys and the reasoning.

- **Keyed, not hashed, and that is decided (iHiD).** The website syncs this text into
  database columns and only ever shows the latest, so an old version never needs serving.
  It is a catalog like the website's: same checker, same per-unit stamps, same four
  states. An EDITED blurb is a stale unit and blocks its PR.
- **Flat on disk**, `{ "<key>": "<translation>" }`, because keys carry slugs and a docs
  slug contains `/`.
- **Keys are slugs, never positions**: `track:blurb`, `key_feature:<icon>:title|content`,
  `exercise:<slug>:name|blurb|source`, `concept:<slug>:name|blurb`, `doc:<slug>:title|blurb`;
  `exercise:<slug>:title|blurb|source|deep_dive_blurb` for problem-specifications;
  `<section>:<slug>:title|blurb` for docs; `post:<slug>:title|description|marketing_copy`
  and `story:<slug>:title|blurb` for the blog. Reordering changes nothing.
- **A renamed or removed exercise deletes nothing.** A rename is new keys, required like any
  new text. The old keys stay in every locale, inert, reported as "key not in English".
- **Only what a user is shown**, each field traced through the website's ingest at
  `origin/main` and listed in `metadata.mjs`. Never uuids, slugs, paths, URLs, authors,
  icons or file lists. Not the track's `language` (a proper name) and not its `tags`
  (codes; the words come from `Track::TAGS` in the website's own Ruby). Only exercises and
  concepts the track's `config.json` LISTS, because the website syncs nothing else.
- **English lives in that repo**, so `validate` checks `metadata/ruby.json` against English
  only when `--content-repos` names a checkout called `ruby`. Otherwise the catalog is
  shape-checked and reported `unv` (unverified), never `ok`. CI fetches each repo some
  locale holds a catalog for.
- **Deduplication across tracks is the translator's job, not this repo's.** 323 of ruby's
  427 units have English that also appears in problem-specifications. The format makes
  reuse cheap: a stamp is the blob id of the English string, so identical English has an
  identical stamp in every `*.meta.json`.
- **Real sizes** (2026-09): ruby 427 units from 155 files, problem-specifications 439 from
  151, docs 259 from 5, blog 134 from 1.

## Nothing under `locales/` is ever deleted

`scripts/no-deletions.mjs` and `no-deletions.yml` refuse any removed file or key, on PRs and
on pushes to `main`. This repo must be a superset of every source repo's `main` AND every
one of their open PRs. An `Allow-Deletions: <why>` commit trailer is the override.
Stamp files (`*.meta.json`) are exempt: they are regenerated, not authored.

## Production locales

`locales.json` `productionTargets` is an explicit list. It is what `validate` exits non-zero
on and what `completeness` holds a source repo's PR to. **It holds `hu`.** Unlike in Jiki's
repo an empty list is legitimate here (it was, until hu went in), so every gating script
accepts it and prints `NOTHING GATES` when it is. A missing or malformed list, or
a locale `targets` does not know, is still fatal.

## Scripts

All Node ESM, dependency-free with one exception: `yaml`, loaded lazily and only to read
the website's Rails YAML. The package manager is pnpm, pinned in `package.json`. Each
script's header comment is its documentation; read it before changing one. `--help` is not
implemented.

| Script | What it does |
| --- | --- |
| `build-english.mjs` | The flattening step. Writes `.build/english/{backend,frontend,arrays,source}.json` for a pass to read, or with `--content-repos` one `.build/english/metadata/<repo>.json` per repo. The other scripts call the same builder directly and never read those files. |
| `validate.mjs` | The checker. Catalog unit parity, plural groups, placeholders, tags, whitespace; content path shape, UTF-8, JSON, no stamps, copied English, and structure against English when `--content-repos` can find it. Stamps with `--stamp`. Exits 1 on an ERROR in a production locale; `--gate=all` and `--complete` widen that. |
| `completeness.mjs` | The blocking check for ONE source repo: full, or relative to `--base`. Content by blob id; website and metadata by unit and stamp, so an edited key or blurb blocks. |
| `english-changes.mjs` | The queue's reader: turns GitHub's PR file list (paths and blob shas) into the issue's table. For a changed `config.json` or `metadata.toml` it names the KEYS whose English changed, from the two versions of that file fetched by blob id. With `--push`, says whether one push to a queued PR changed the PR's English, from the two commits' trees. Takes API responses, never a checkout. |
| `coverage.mjs` | Per-locale unit counts (website and metadata) and blob coverage for the repos named. Reports, never gates, always exits 0. |
| `no-deletions.mjs` | Refuses a removed file or key under `locales/` between two refs. |
| `source-checkout.mjs` | Fetches a source repo into `.source/`, shallow, blobless, no working tree. |
| `test.mjs` | Plain `node:assert`. Pure assertions, then a fixture of real git repos that every script is run over. |

- **Errors block; warnings never do.** WARN checks are heuristics that false-positive by
  design. Read one; never promote one.
- **`EXERCISM_I18N_ROOT`** points the scripts at another tree. It exists for `test.mjs`.

## How the website consumes this repo

**Pushing to `main` is the deploy.** The website keeps a plain checkout of this repo on its
EFS, at `<efs_repositories_mount_point>/i18n`, on `main` and sparse to the locales it
serves. Its webhook pulls that checkout on every push here, and it reads
`locales/<locale>/...` straight from the tree. The frontend catalog is served by the
website from that tree too. The checked-out HEAD sha is the version the website keys its
caches on. There is no build step, no upload and no intermediate copy: the on-disk layout
under `locales/` (see "Directory structure") IS the served layout, which is why nothing
here may move a file or change a shape without the website changing with it.

Nothing is deployed selectively. Whatever is on `main` is what the website has, for every
locale, complete or not. Strictness lives elsewhere: `validate` gates what may land for a
production locale, the source repos' completeness check gates what English may merge, and
the website decides which locales it serves.

## What is real, what is stubbed

Real and exercised: everything in the Scripts table, against a fixture and (read-only)
against the real `website`, `ruby`, `docs` and `problem-specifications`; the blobless fetch
of `exercism/website` and of a real PR's merge ref.

Stubbed or absent:

- **The loop runs in one source repo.** `exercism/website-copy` has both templates
  installed and `completeness` required on `main`; the full loop (queue, translate-on-issue,
  the translator, rerun-source-check, and every label and push path) was piloted there live
  on 2026-09-21. Every other source repo has neither template. All three secrets exist:
  `EXERCISM_I18N_ISSUES_PAT` (an organisation secret, Issues read/write on this repo only,
  owned by iHiD, so queue issues are authored by `iHiD`), `EXERCISM_SOURCE_REPOS_ACTIONS_PAT`
  (a secret on this repo, Actions read/write and Pull requests read on the source repos) and
  `EXERCISM_TRANSLATOR_DISPATCH_PAT` (Contents read/write on `exercism/translator`).

## Open questions (do not answer these by accident)

Each is marked `TODO(iHiD): OPEN` where the code would change.

1. ~~**Whether a runner here translates automatically on issue-open.**~~ **Answered: yes,
   and the runner is not here.** `translate-on-issue.yml` hands the issue number to
   `exercism/translator` with one `repository_dispatch`, and that repo translates, pushes
   here and closes the issue. No script here calls an LLM, and the gate is unchanged: the
   issue must be opened by `iHiD`, carry the `translation` label and be titled
   `Translate exercism/...`. The translator repo verifies all of it again for itself.
2. ~~**Who may trigger an issue.**~~ **Answered: whoever adds the `ready-to-translate`
   label to the source PR**, which takes triage rights there, on every PR including
   maintainers' own. A later push that changes English takes the label off and closes the
   issue as not planned. See `source-repo-workflows/README.md`.
3. **Whether a human-navigable symlink tree exists beside the blob-id store.** None does.
4. **Which content types and locales are in scope for launch.** Every content type is
   live; `hu` is the one locale so far. Two scope calls are flagged in `content-types.mjs` and
   deliberately not made: whether contributor-facing `building/` docs (155 of 212 pages)
   and mentor-facing `mentoring/` docs are translated, and whether the learner-facing CLI
   walkthrough (`website-copy` `walkthrough/index.html`, HTML not Markdown) is.

(The two GitHub PATs are settled: see "What is real, what is stubbed".)

## House rules

- **No em dashes** in prose, here or in translated content.
- Refer to the owner as **iHiD** in code, comments and commit messages.
- **Never hand-write a stamp.** `validate --stamp` writes them.
- **Never delete under `locales/`.** Add and update.
- **Never make a warning an error.**
- **Never store English here**, including as filler for an untranslated key. A missing
  unit is simply missing.
