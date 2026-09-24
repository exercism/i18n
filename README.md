# Exercism i18n

Exercism's translations, and the scripts and GitHub Actions that check them.

Hungarian (`hu`) is in production. `locales/hu/` holds the website UI catalogs and the Ruby
track, and more sources and tracks are added as they are translated. The scripts run against
that tree and against a fixture in `scripts/test.mjs`. Translations are written by
`exercism/translator`. [CLAUDE.md](./CLAUDE.md) describes what works today, what is stubbed,
and which decisions are still open.

English is not stored here. The scripts read it as git objects from checkouts of the repos
where it is written. See [ENGLISH-SOURCE.md](./ENGLISH-SOURCE.md).

## Layout

```
locales/<locale>/website/backend.json     Rails UI strings         (+ backend.meta.json stamps)
locales/<locale>/website/frontend.json    i18next UI strings       (+ frontend.meta.json stamps)
locales/<locale>/metadata/<repo>.json     names, titles, blurbs of one source repo, keyed by
                                          slug (+ <repo>.meta.json stamps)
locales/<locale>/content/<ab>/<cd>/<rest>.<ext>
                                          one file per English git blob id: exercises,
                                          concepts, track docs, docs, blog, analyzer
                                          comments, problem-specifications
index/json/<locale>/<repo>.json          which blob ids each source path has translations for
index/markdown/<locale>/<repo>.md        generated from that JSON, for browsing
```

Content is keyed by the git blob id of its English file. Editing the English gives it a new
blob id, so a translation never goes stale: the new blob id simply has no translation yet.
English that is byte-identical across fifty tracks is translated once.

Text that is not a whole file (an exercise's name and blurb, a track's key features, a docs
page's title) is stored differently. The website only shows its latest version, so it lives
in one keyed catalog per source repo, stamped per unit like the website catalogs. An edited
blurb is detected per key and blocks its PR.

To find a translation, start at [index/markdown/hu/README.md](./index/markdown/hu/README.md).
Each source repo has a page listing its translatable files, each linked to its latest
translation and up to five earlier ones. The pages are generated from `index/json/` by
`scripts/build-index.mjs`, and CI fails if one is edited by hand.

## How the website consumes this repo

A push to `main` deploys. The website keeps a plain checkout of this repo on its EFS (at
`<efs_repositories_mount_point>/i18n`, on `main`, sparse to the locales it serves), pulls it
through a webhook on every push, and reads `locales/<locale>/...` directly from that
checkout, including the frontend catalog, which the website serves itself. It keys its
caches on the checked-out HEAD sha. There is no build, upload or copy step, so the layout
above is exactly what the website reads.

## Quick start

```bash
pnpm install                                  # one dependency: yaml, to read Rails YAML
pnpm test                                     # the tests, including a fixture run of every script

pnpm source:checkout                          # fetch exercism/website main (blobless, no working tree)
node scripts/build-english.mjs                # flatten its English into .build/english/{backend,frontend}.json
node scripts/validate.mjs all                 # the CI gate
node scripts/coverage.mjs --content-repos=../ruby,../docs
node scripts/completeness.mjs --source-repo=../ruby --locales=<locale>
node scripts/sweep.mjs --repos=exercism/ruby,exercism/docs   # the same question of main
```

A sibling `../website` checkout is found automatically and read at `origin/main`, whichever
branch it has checked out. `--source-repo=<path>` and `--source-ref=<ref>` override both.

## How work arrives

When a maintainer adds the `ready-to-translate` label to a PR in a repo that holds English,
an issue is opened here. The PR's `i18n completeness` check blocks its merge until this repo
holds the translation for every locale in `locales.json` `productionTargets`, for new and
edited text. Closing the issue re-runs the check. The two workflows a source repo installs
are in [source-repo-workflows/](./source-repo-workflows/README.md). Each is a short caller
of a reusable workflow in `.github/workflows/` here (`source-queue.yml` and
`source-completeness.yml`), so the loop's logic changes here only, and both are safe for
fork PRs.

The loop acts as the Exercism i18n GitHub App. It opens the issues, comments on them, pushes
translations to `main` here and replies on the PR, all as `exercism-i18n[bot]`, with
short-lived tokens that each job mints for the repos it touches. See "The Exercism i18n app"
in [source-repo-workflows/README.md](./source-repo-workflows/README.md).

## What the per-PR check cannot catch

`i18n / completeness` is evaluated when it runs, against the world as it is then, and a PR
merges later. A locale can join `productionTargets` after a PR has gone green, an
administrator can merge a PR whose check failed, and a PR can predate the check. Each of
those leaves English on `main` with no translation and nothing reporting it.

`.github/workflows/sweep.yml` runs `scripts/sweep.mjs` every day and asks the question those
races cannot beat: is each source repo's `main` fully translated for every production
locale, right now. It is the same `scripts/completeness.mjs`, run with no `--base` so that
everything at the ref is required rather than only what changed, against every repo the
registry knows and every track repo in the organisation. It writes one issue, labelled
`sweep`, and rewrites that issue in place on every run, so it never spams and never turns
into a thread. Each row names the command in `exercism/translator` that translates that repo
into that locale. The headline counts the repos Exercism still runs; a track that has been
switched off is swept and reported in its own section, so a reactivated one is still noticed
and a backlog nobody intends to translate does not drown the drift that matters.

`.github/workflows/translate-on-issue.yml` sends each new or updated issue to
[`exercism/translator`](https://github.com/exercism/translator) as a `repository_dispatch`
carrying the issue number. That repo translates, pushes here and closes the issue. No script
in this repo calls an LLM. A run that fails in a way another run would repeat labels the
issue `needs-attention`, and the translation team fixes it by hand and runs it again. The PR
gets one reply, "This PR has been translated 🚀", once the translations have landed and its
check has re-run, with wording from `scripts/pr-reply.mjs`.

Nothing under `locales/` is deleted. `scripts/no-deletions.mjs` fails on any removal unless a
commit in the range has an `Allow-Deletions: <why>` trailer.

The scripts have no `--help`. Each script's header comment is its documentation.
