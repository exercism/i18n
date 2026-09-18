# Exercism i18n

Exercism's translated output, and the scripts and GitHub Actions that check it.

**Status: a scaffold.** `locales/` is empty and `locales.json` lists no locale yet. The
scripts all run, against nothing here and against a fixture in `scripts/test.mjs`. The
translator repo that would write into `locales/` does not exist yet.
[CLAUDE.md](./CLAUDE.md) says exactly what is real, what is stubbed, and which decisions
are still open.

English is never stored here. It is read from checkouts of the repos it is authored in,
through git objects. See [ENGLISH-SOURCE.md](./ENGLISH-SOURCE.md).

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
```

Content is keyed by the git blob id of its English file, so it has no staleness: an edit to
English is a new blob id, which is a file that does not exist yet. Byte-identical English
across fifty tracks is translated once.

Text that is not a whole file (an exercise's name and blurb, a track's key features, a docs
page's title) is different: the website only ever shows the latest, so it lives in one keyed
catalog per source repo, stamped per unit like the website catalogs. An edited blurb is
detected per key and blocks its PR.

## How the website consumes this repo

Pushing to `main` is the deploy. The website keeps a plain checkout of this repo on its EFS
(at `<efs_repositories_mount_point>/i18n`, on `main`, sparse to the locales it serves),
pulls it on every push through its webhook, and reads `locales/<locale>/...` straight from
that tree, including the frontend catalog, which the website serves itself. The checked-out
HEAD sha is the version it keys its caches on. There is no build, no upload and no copy
in between: the layout above is the served layout.

## Quick start

```bash
pnpm install                                  # one dependency: yaml, to read Rails YAML
pnpm test                                     # 51 assertions, including a fixture run of every script

pnpm source:checkout                          # fetch exercism/website main (blobless, no working tree)
node scripts/build-english.mjs                # flatten its English into .build/english/{backend,frontend}.json
node scripts/validate.mjs all                 # the CI gate
node scripts/coverage.mjs --content-repos=../ruby,../docs
node scripts/completeness.mjs --source-repo=../ruby --locales=<locale>
```

A sibling `../website` is found automatically and read at `origin/main`, never at whatever
branch is checked out. `--source-repo=<path>` and `--source-ref=<ref>` override both.

## How work arrives

A PR in any repo that holds English opens an issue here. That PR's `i18n completeness` check
blocks its merge until this repo holds the translation for every locale in `locales.json`
`productionTargets`, for new text and for edits. Closing the issue re-runs the check. The two
workflows a source repo installs are in
[source-repo-workflows/](./source-repo-workflows/README.md), and are safe for fork PRs.

Nothing under `locales/` is ever deleted: `scripts/no-deletions.mjs` refuses it, and an
`Allow-Deletions: <why>` commit trailer is the override.

`node scripts/<name>.mjs --help` is not implemented. Each script's header comment is its
documentation.
