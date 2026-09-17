# Exercism i18n - Agent Instructions

This repo holds **Exercism's translated output**, and the scripts and GitHub Actions that
check and publish it. It was forked, in structure and idiom, from Jiki's `i18n` repo.
Exercism and Jiki are fully separate: nothing is shared, and nothing here should reach for
Jiki's repo, tooling or data.

**Status: a scaffold. `locales/` is empty and `locales.json` lists no locale.** Every script
runs today (against nothing, and against a fixture in `scripts/test.mjs`). Read "What is
real, what is stubbed" before assuming anything works end to end.

## What this repo is

- **The home of every non-English string Exercism ships.** The website's UI strings and
  every piece of git-sourced content (exercises, concepts, track docs, the docs repo, the
  blog, analyzer comments, problem-specifications), in every target locale.
- **The checker of those translations** (`validate`), and the answer to "may this English
  merge yet?" for every source repo (`completeness`).
- **The publisher of those translations to S3**, as far as that can go without a bucket.

## What this repo is not

- **Not the home of English.** English is authored in the source repos and read from
  checkouts of them, through git objects. See [ENGLISH-SOURCE.md](./ENGLISH-SOURCE.md).
- **Not where translation happens.** No script here calls an LLM. DeepSeek translates every
  language, from a separate Exercism translator repo that does not exist yet.
- **Not a review site.** There is no public review site for Exercism. Everything of Jiki's
  that rendered HTML was left behind.

## Directory structure

```
locales.json                     targets, productionTargets (both empty today)
website-exclusions.json          website areas that are never translated
locales/<locale>/
  website/backend.json           Rails strings, nested, no locale root
  website/backend.meta.json      per-unit staleness stamps, written by validate --stamp
  website/frontend.json          i18next strings: { "<namespace>": { "<key>": "..." } }
  website/frontend.meta.json
  content/<ab>/<cd>/<rest>.<ext> one file per English git blob id, source extension kept
scripts/                         see "Scripts"
.github/workflows/               this repo's own workflows
source-repo-workflows/           TEMPLATES a source repo installs; they do not run here
.source/  .build/  dist/         gitignored: source fetches, flattened English, publish output
```

## The two stores

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

## Nothing under `locales/` is ever deleted

`scripts/no-deletions.mjs` and `no-deletions.yml` refuse any removed file or key, on PRs and
on pushes to `main`. This repo must be a superset of every source repo's `main` AND every
one of their open PRs. An `Allow-Deletions: <why>` commit trailer is the override.
Stamp files (`*.meta.json`) are exempt: they are regenerated, not authored.

## Production locales

`locales.json` `productionTargets` is an explicit list. It is what `validate` exits non-zero
on and what `completeness` holds a source repo's PR to. **It is empty: no locale is in
production yet.** Unlike in Jiki's repo an empty list is legitimate here, so every gating
script accepts it and prints `NOTHING GATES` on every run. A missing or malformed list, or
a locale `targets` does not know, is still fatal.

## Scripts

All Node ESM, dependency-free with one exception: `yaml`, loaded lazily and only to read
the website's Rails YAML. The package manager is pnpm, pinned in `package.json`. Each
script's header comment is its documentation; read it before changing one. `--help` is not
implemented.

| Script | What it does |
| --- | --- |
| `build-english.mjs` | The flattening step. Writes `.build/english/{backend,frontend,arrays,source}.json` for a pass to read. The other scripts call the same builder directly and never read those files. |
| `validate.mjs` | The checker. Catalog unit parity, plural groups, placeholders, tags, whitespace; content path shape, UTF-8, JSON, no stamps, copied English, and structure against English when `--content-repos` can find it. Stamps with `--stamp`. Exits 1 on an ERROR in a production locale; `--gate=all` and `--complete` widen that. Exercises the S3 key guard on every run. |
| `completeness.mjs` | The blocking check for ONE source repo: full, or relative to `--base`. Content by blob id, website by unit and stamp. Names the fragment files it cannot check yet. |
| `english-changes.mjs` | The queue's reader: turns GitHub's PR file list (paths and blob shas) into the issue's table. Takes a file list, never a checkout. |
| `coverage.mjs` | Per-locale unit counts and blob coverage for the repos named. Reports, never gates, always exits 0. |
| `no-deletions.mjs` | Refuses a removed file or key under `locales/` between two refs. |
| `publish.mjs` | Builds `dist/`: content-hashed catalog artifacts, a pointer beside each, content under its blob-id path, `manifest.json`, `sync.sh`. `--upload` refuses without `EXERCISM_I18N_BUCKET`. Needs no English. |
| `source-checkout.mjs` | Fetches a source repo into `.source/`, shallow, blobless, no working tree. |
| `test.mjs` | Plain `node:assert`. Pure assertions, then a fixture of real git repos that every script is run over. |

- **Errors block; warnings never do.** WARN checks are heuristics that false-positive by
  design. Read one; never promote one.
- **`EXERCISM_I18N_ROOT`** points the scripts at another tree. It exists for `test.mjs`.

## Publishing

Immutable, content-hashed artifacts plus tiny per-locale pointers for the two catalogs:
`i18n/website/<locale>/<kind>-<hash>.json` and `<kind>.current.json` (`{ "hash": ... }`).
Artifact before pointer, one writer per pointer (`publish.yml`, serialised). Content is
published as-is at `i18n/content/<locale>/<ab>/<cd>/<rest>.<ext>`, which is a STABLE path
whose object can be corrected, so it is never cached as immutable. The backend artifact is
wrapped as `{ "<locale>": ... }`, which Rails' I18n loads from `.json`.

Every key goes through `assertPublishableKey()`: under `i18n/`, no English segment, and a
locale `locales.json` lists. It throws; it never skips.

## What is real, what is stubbed

Real and exercised: everything in the Scripts table, against a fixture and (read-only)
against the real `website`, `ruby`, `docs` and `problem-specifications`; the blobless fetch
of `exercism/website` and of a real PR's merge ref.

Stubbed or absent:

- **Upload to S3.** `dist/` is built; nothing is uploaded. `publish.yml`'s upload step is
  off until an `I18N_BUCKET` repository variable exists.
- **The workflows have never run.** They parse as YAML and their data paths were rehearsed
  locally. The secrets they name do not exist.
- **Fragment content types** are declared and inert.
- **No translation pass exists** for this repo, so nothing has ever written to `locales/`.

## Open questions (do not answer these by accident)

Each is marked `TODO(iHiD): OPEN` where the code would change.

1. **How text that is not a whole file is keyed** (config.json blurbs and titles,
   metadata.toml fields). Candidate: the blob id of the string itself, which
   `stringId()` in `scripts/lib/catalogs.mjs` already computes (it is used today only as
   the stamp hash, which commits to nothing). The types are in `content-types.mjs` with
   `unit: "fragment"`, skipped everywhere and named in output.
2. **What runs the S3 to EFS mirror.** Nothing here knows about EFS.
3. **Whether a runner here translates automatically on issue-open.** Nothing does.
4. **Who may trigger an issue.** `i18n-queue.yml` ships a placeholder gate.
5. **Whether a human-navigable symlink tree exists beside the blob-id store.** None does.
6. **Which content types and locales are in scope for launch.** Every `unit: "file"` type is
   live; both locale lists are empty.
7. **Bucket names, credentials and IAM.** No bucket is named anywhere.

## House rules

- **No em dashes** in prose, here or in translated content.
- Refer to the owner as **iHiD** in code, comments and commit messages.
- **Never hand-write a stamp.** `validate --stamp` writes them.
- **Never delete under `locales/`.** Add and update.
- **Never make a warning an error.**
- **Never store English here**, including as filler for an untranslated key. A missing
  unit is simply missing.
