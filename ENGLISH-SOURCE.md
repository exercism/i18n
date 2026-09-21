# Where English comes from

English is not stored in this repo. The scripts read it from a checkout of the repo where it
is written, and `locales/` holds only target locales. Nothing here writes English, and there
is no English directory under `locales/`.

## Which repos

| Kind | Repo | What is English there |
| --- | --- | --- |
| `website` | `exercism/website` | `config/locales/**/*.yml` (Rails, `en:` root) and `app/javascript/i18n/en/*.ts` (i18next bundles) |
| `track` | every track repo, around eighty | exercise `.docs/`, `concepts/*/about.md` and `introduction.md`, `docs/*.md` |
| `problem-specifications` | `exercism/problem-specifications` | `exercises/*/description.md`, `instructions.md`, `introduction.md` |
| `docs` | `exercism/docs` | Markdown under the five served sections: `using/`, `building/`, `programming/`, `mentoring/`, `community/` |
| `blog` | `exercism/blog` | `posts/*.md`, `stories/*.md` |
| `website-copy` | `exercism/website-copy` | `analyzer-comments/**/*.md` only (mentor notes, `pages/` and the walkthrough are not) |

`REPO_KINDS` in `scripts/lib/source-repos.mjs` lists the kinds, and the content types in
`scripts/lib/content-types.mjs` define the exact paths. There is no list of tracks. A track is
always named explicitly, and any repo that is not one of the named single repos is treated
as a track.

## Read as git objects

Every script reads a source repo with `git ls-tree` and `git cat-file` at a ref
(`scripts/lib/git.mjs`), and never opens files in its working tree. There are three reasons:

- **A content translation is filed under the git blob id of its English file.** `ls-tree`
  lists those ids for a whole tree without hashing anything or needing the blobs, so a
  blobless, shallow fetch of a track (about 100KB) is enough to check whether the repo is
  fully translated.
- **A working tree is on whatever branch its owner has checked out.** A sibling checkout on a
  laptop is often on a feature branch, which would report English that has not merged. With
  no ref given, scripts read `origin/main` if the checkout has it, otherwise `HEAD`.
- **A PR is untrusted input.** Nothing is checked out, no hook or filter runs, and the
  website's YAML and TypeScript are parsed as data and never evaluated
  (`scripts/lib/ts-object.mjs`).

The website is the only repo found automatically. It is looked for in this order:
`--source-repo=`, `EXERCISM_WEBSITE_REPO`, `.source/website`, then a sibling `../website`.
`pnpm source:checkout` fetches one into `.source/`, blobless and without a working tree.
Content repos are always named: `--source-repo=` for `completeness`, `--content-repos=` for
`validate` and `coverage`.

## Three stores

English changes in different ways, so there are three kinds of store.

**Git-sourced content is keyed by blob id**: `locales/<locale>/content/<ab>/<cd>/<rest>.<ext>`.
A blob id always names the same bytes, so a translation filed under it always matches its
English. There is no staleness, no stamp and no `en_md5`. Editing English produces a new blob
id, which has no translation yet. English that is byte-identical in fifty tracks has one blob
id and one translation.

**Names, titles and blurbs are keyed by slug**: `locales/<locale>/metadata/<repo>.json`, one
flat catalog per source repo, extracted from `config.json` and `metadata.toml` by
`scripts/lib/metadata.mjs`. The website copies this text into database columns and shows only
the latest version, so an old version never needs serving. Each unit is stamped the same way
as in the website catalogs.

**Website UI strings are keyed by name**: two catalogs per locale. A key's English can be
edited after it is translated, so each unit has a stamp (in a sibling `.meta.json`) holding
the hash of the English it was checked against. `validate --stamp` writes the stamps.

## Which English a check runs against

**This repo's CI** reads website `main`, which moves. That is safe because nothing a moving
`main` causes is an error here: a translation ahead of `main` shows up as an extra key (a
WARN) or a stale stamp (a counted state). So there is no `English-Ref:` pin and no
baseline-relative gating. Jiki's repo needs both; this one does not.

**A source repo's PR check** reads the PR's merge ref and requires only what differs from its
first parent. This is the check that catches an English edit, because it compares against
exactly the English in the PR.

**A translation pass** must stamp against the same English it translated. Both scripts take a
commit: `build-english.mjs --source-ref=<sha>` and `validate.mjs --stamp --source-ref=<sha>`.

## Where work comes from

No script in this repo calls an LLM. A source repo's PR opens an issue here,
`exercism/translator` translates it with DeepSeek and commits the result to `main` here, and
closing the issue re-runs the PR's check. `source-repo-workflows/README.md` describes the full
loop.

The commit to `main` also deploys: the website keeps a checkout of this repo on its EFS, pulls
it on each push, and reads `locales/` directly from it (see "How the website consumes this
repo" in CLAUDE.md). English is deployed with the website itself.
