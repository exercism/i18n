# Where English comes from

English is not stored in this repo, in any form. It is read from a checkout of the repo it
is authored in, and `locales/` holds nothing but target locales. Nothing here writes
English, and nothing here can: there is no English directory under `locales/` to write to.

## Which repos

| Kind | Repo | What is English there |
| --- | --- | --- |
| `website` | `exercism/website` | `config/locales/**/*.yml` (Rails, `en:` root) and `app/javascript/i18n/en/*.ts` (i18next bundles) |
| `track` | every track repo, around eighty | exercise `.docs/`, `concepts/*/about.md` and `introduction.md`, `docs/*.md` |
| `problem-specifications` | `exercism/problem-specifications` | `exercises/*/description.md`, `instructions.md`, `introduction.md` |
| `docs` | `exercism/docs` | Markdown under the five served sections: `using/`, `building/`, `programming/`, `mentoring/`, `community/` |
| `blog` | `exercism/blog` | `posts/*.md`, `stories/*.md` |
| `website-copy` | `exercism/website-copy` | `analyzer-comments/**/*.md` only (mentor notes, `pages/` and the walkthrough are not) |

The kinds are `REPO_KINDS` in `scripts/lib/source-repos.mjs`. The exact paths are the
content types in `scripts/lib/content-types.mjs`. There is no list of tracks here and there
must not be one: a track is always named explicitly, and any repo that is not one of the
named singletons is treated as a track.

## Read as git objects, never as a working tree

Every script reads a source repo through `git ls-tree` and `git cat-file` at a ref
(`scripts/lib/git.mjs`), and never opens a file in its working tree. Three reasons:

- **The blob id is the key.** A content translation is filed under the git blob id of its
  English file, and `ls-tree` lists those ids for a whole tree without hashing anything
  and without needing the blobs. A blobless, shallow fetch of a track is about 100KB and
  answers "is this repo completely translated?".
- **A working tree is whatever branch its owner has checked out.** A sibling checkout on a
  laptop is usually on a feature branch, and a branch reports English that does not exist
  yet. With no ref given, scripts read `origin/main` where the checkout has one, else `HEAD`.
- **A PR is untrusted input.** Nothing is checked out, no hook or filter runs, and the
  website's YAML and TypeScript are parsed as data, never evaluated
  (`scripts/lib/ts-object.mjs`).

Resolution order for the website, the one repo resolved implicitly: `--source-repo=`,
`EXERCISM_WEBSITE_REPO`, `.source/website`, then a sibling `../website`.
`pnpm source:checkout` fetches one into `.source/`, blobless and with no working tree.
Content repos are always named: `--source-repo=` for `completeness`, `--content-repos=`
for `validate` and `coverage`.

## Three stores, because English changes in different ways

**Git-sourced content is keyed by blob id**: `locales/<locale>/content/<ab>/<cd>/<rest>.<ext>`.
A blob id names one sequence of bytes forever, so a translation is of exactly that text
forever. There is no staleness, no stamp and no `en_md5`. Editing English produces a new
blob id, which is a file that does not exist yet. Byte-identical English in fifty tracks is
one blob id and one translation.

**Names, titles and blurbs are keyed by slug**: `locales/<locale>/metadata/<repo>.json`, one
flat catalog per source repo, extracted from `config.json` and `metadata.toml` by
`scripts/lib/metadata.mjs`. The website syncs this text into database columns and shows only
the latest, so there is no old version to keep serving, and it is stamped per unit exactly
as the website catalogs are.

**Website UI strings are keyed by name**: two catalogs per locale. A key's English can be
edited under its translation, so each unit carries a stamp (in a sibling `.meta.json`)
holding the hash of the English it was checked against. `validate --stamp` writes it.

## Which English a check runs against

**This repo's own CI** reads website `main`. It floats, and that is safe because nothing a
floating `main` can cause is an error here: a translation ahead of `main` is an extra key
(WARN) or a stale stamp (a counted state). There is no `English-Ref:` pin and no
baseline-relative gating, both of which Jiki's repo needs and this one does not.

**A source repo's PR check** reads that PR's merge ref, and requires only the difference
between it and its first parent. That is the check that holds an English edit to account,
because it compares against exactly the English the PR holds.

**A translation pass** must stamp against the same English it translated. Both take a
commit: `build-english.mjs --source-ref=<sha>` and `validate.mjs --stamp --source-ref=<sha>`.

## Where work comes from

Translation does not run here. No script in this repo calls an LLM. A source repo's PR opens
an issue here (issues are the queue), the translator repo does the translating with
DeepSeek, the result is committed to `main` here, and closing the issue re-runs the PR's
check. `source-repo-workflows/README.md` has the loop in full.

TODO(iHiD): the translator repo for Exercism does not exist yet, so steps 3 and 4 of that
loop are manual today. Whether a runner here translates automatically on issue-open is an
open decision.
