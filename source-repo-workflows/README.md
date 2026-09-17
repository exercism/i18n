# Source-repo workflow templates

These two workflows do not run in this repo. They are the half of the translation loop that
lives in every repo that holds English: `website`, `docs`, `blog`, `website-copy`,
`problem-specifications`, and every track repo. They are kept here because they are part of
the same loop as this repo's own workflows, call this repo's scripts, and have nowhere else
to live yet.

| Template | Installs as | Trigger | Holds a secret | Blocks a merge |
| --- | --- | --- | --- | --- |
| `i18n-queue.yml` | `.github/workflows/i18n-queue.yml` | `pull_request_target` | yes, `I18N_ISSUES_TOKEN` | no |
| `i18n-completeness.yml` | `.github/workflows/i18n-completeness.yml` | `pull_request` | no | yes, once made a required check |

Keep the filenames. `rerun-source-check.yml` in this repo finds a PR's completeness run by
the workflow filename `i18n-completeness.yml`.

## The loop

1. A PR in a source repo changes English.
2. `i18n-queue.yml` opens (or rewrites) an issue here: `Translate exercism/<repo>#<n>: ...`,
   labelled `translation`, listing each changed English file, its content type and the
   blob-id path its translation goes to.
3. `i18n-completeness.yml` fails on that PR, because this repo does not hold the
   translations yet. With the check required, the PR cannot merge.
4. Translations land on `main` here, for every locale in `locales.json` `productionTargets`.
   The issue is closed.
5. `rerun-source-check.yml` here re-runs the PR's failed check, which now passes.

## Fork safety

Most Exercism PRs come from forks, so both templates are written to one rule: **no job that
holds a secret checks out or executes PR code, and no job executes PR code at all.**

- `i18n-queue.yml` holds a secret, so it runs on `pull_request_target` and contains no
  checkout of the source repo at any ref. It learns what changed from GitHub's "list pull
  request files" API, which returns each file's path and git blob sha. That response is
  treated as untrusted data by `scripts/english-changes.mjs`.
- `i18n-completeness.yml` holds no secret and runs on `pull_request` with a read-only token.
  It fetches the PR's merge ref as git objects into a bare repository, with no working tree,
  and reads it with `git ls-tree` and `git cat-file`. Website YAML and TypeScript bundles are
  parsed as data and never evaluated.
- The only code either one executes is this repo's `scripts/`, at `main`.

Both templates hold no list of "what counts as English". That is
`scripts/lib/content-types.mjs` and `scripts/lib/website-english.mjs`, read through the
scripts, so the patterns cannot drift across eighty-five installed copies.

## Rehearsed, not run

Neither template has run in GitHub Actions: no source repo has them installed and the
secrets do not exist. What has been rehearsed locally, against a real public PR
(`exercism/ruby#1809`), is each template's data path: the blobless bare fetch of
`refs/pull/<n>/merge` followed by `completeness.mjs --head=FETCH_HEAD --base=FETCH_HEAD^1`,
and `gh api --paginate .../pulls/<n>/files` followed by `english-changes.mjs`. Both found
the same five English files.

## Before installing

- [ ] Create the `translation` label in `exercism/i18n`. `gh issue create --label` fails
      without it.
- [ ] TODO(iHiD): credentials. `I18N_ISSUES_TOKEN` (issues: write on `exercism/i18n`) as an
      organisation secret visible to every source repo, and `SOURCE_REPOS_ACTIONS_TOKEN`
      (actions: write, pull requests: read on every source repo) as a secret here. One
      org-wide GitHub App can mint both.
- [ ] TODO(iHiD): OPEN. Who may trigger an issue. `i18n-queue.yml` ships with a placeholder
      gate (the PR author is an owner, member or collaborator). See the TODO in its header.
- [ ] TODO(iHiD): OPEN. Whether a runner in this repo translates automatically when an
      issue opens. Nothing here does. If one is added it belongs in this repo's
      `.github/workflows/`, triggered by `issues: opened` with the `translation` label, and
      it calls the translator repo: no script here calls an LLM.
- [ ] Decide how the templates reach the track repos. Exercism already syncs shared files
      to every track from `exercism/org-wide-files`; that is the natural carrier, and the
      "do not edit a copy" header on each template assumes something like it.
- [ ] Make `completeness` a required status check on `main` in each source repo. Until it
      is required it informs and does not block.
- [ ] While `productionTargets` is empty the completeness check passes, saying loudly that
      nothing gates. Installing early is therefore safe.

## A full sweep is a separate question

The PR check is relative: it requires what the PR adds or edits, so a PR is never blocked
by a backlog it did not create. Whether a whole repo is translated is
`node scripts/completeness.mjs --source-repo=<checkout>` with no `--base`, which is the
right thing to run on a schedule, or before adding a locale to `productionTargets`. No
workflow does that yet.
