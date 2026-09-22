# Source-repo workflow templates

These two workflows are installed in every repo that holds English: `website`, `docs`,
`blog`, `website-copy`, `problem-specifications` and every track repo. Each is a few lines
that hold a trigger and job permissions and call a reusable workflow in this repo, where the
logic lives. A change to the loop is therefore a change here, and the installed copies stay
as they are.

| Template | Installs as | Trigger | Calls | Holds a secret | Blocks a merge |
| --- | --- | --- | --- | --- | --- |
| `i18n-queue.yml` | `.github/workflows/i18n-queue.yml` | `pull_request_target` (`labeled`, `unlabeled`, `synchronize`) | `.github/workflows/source-queue.yml` | yes, the Exercism i18n app's private key, through `secrets: inherit` | no |
| `i18n-completeness.yml` | `.github/workflows/i18n-completeness.yml` | `pull_request` | `.github/workflows/source-completeness.yml` | no | yes, once made a required check |

Keep the filenames. `rerun-source-check.yml` in this repo finds a PR's completeness run by the
workflow filename `i18n-completeness.yml`.

The completeness check reports as `i18n / completeness`: the caller's job, then the called
job. That is the status check to require on `main`.

## The Exercism i18n app

The loop acts as the Exercism i18n GitHub App (`exercism-i18n`), installed on every repo in
the `exercism` organisation. It has Actions, Contents, Issues and Pull requests read and
write, and Metadata read. Its id is the organisation variable `EXERCISM_I18N_APP_ID` and its
private key the organisation secret `EXERCISM_I18N_APP_PRIVATE_KEY`, both visible to every
repo.

Each job that needs to act outside its own repo mints a short-lived installation token with
`actions/create-github-app-token`, limited to the repos and permissions that job needs:

| Job | Repo | Permissions | For |
| --- | --- | --- | --- |
| `source-queue.yml` `queue`, `withdraw` | `exercism/i18n` | Issues write | opening, updating and closing the queue issue |
| `translate-on-issue.yml` `dispatch` | `exercism/translator` | Contents write | the `repository_dispatch` |
| `rerun-source-check.yml` `rerun` | the source repo | Actions write, Pull requests read | re-running the completeness check |
| `rerun-source-check.yml` `reply` | the source repo | Pull requests write | "This PR has been translated 🚀" |
| translator `translate-issue.yml` | `exercism/i18n` | Contents write, Issues write | the push to `main`, the comments, labels and close |
| translator `retry-stale-issues.yml` | `exercism/i18n`, then `exercism/translator` | Issues read, then Contents write | listing open issues, then dispatching |

So the queue's issues, their comments, the pushes to `main` here and the reply on the PR are
all by `exercism-i18n[bot]`. Anyone can open an issue in this public repo, so every step that
acts on an issue first checks that `exercism-i18n[bot]` opened it.

Until 2026-09-22 the loop used personal access tokens owned by iHiD, and the queue's issues
were authored by `iHiD`. Every step now accepts only issues opened by `exercism-i18n[bot]`.

## The loop

1. A PR in a source repo changes English. `i18n-completeness.yml` fails because this repo does
   not hold the translations yet. If the check is required, the PR cannot merge.
2. When the copy is final, a maintainer adds the `ready-to-translate` label to the PR. Only
   this label queues a translation, whoever opened the PR.
3. `i18n-queue.yml` opens an issue here (or updates the open one) at the PR's head commit. It
   is titled `Translate exercism/<repo>#<n>: ...`, labelled `translation`, and lists each
   changed English file, its content type and the blob-id path for its translation. For a
   changed `config.json` or `metadata.toml` it also lists the metadata keys whose English
   changed.
4. `.github/workflows/translate-on-issue.yml` dispatches `exercism/translator`, which
   translates for every locale in `locales.json` `productionTargets`, pushes to `main` here
   and closes the issue. The push also deploys: the website pulls its checkout of this repo
   and serves the new files.
5. `rerun-source-check.yml` here re-runs the PR's failed check, which now passes.

The i18n issue is the log of each step: the translator comments when it starts and when it
finishes, and failures, labels and approvals all happen there. The PR gets one reply, only
when translation succeeds: `rerun-source-check.yml` here re-runs the PR's `i18n completeness`
check when the issue closes as completed, then replies "This PR has been translated 🚀", so
the maintainer knows the PR can be merged. `scripts/pr-reply.mjs` holds the wording.

The reply carries a hidden marker, so a re-run of the workflow doesn't post it twice. It is
posted only on an open PR, only for an issue opened by `exercism-i18n[bot]`, and the workflow
reads nothing from the issue but the repo and PR number in its title.

While the label is on, every push to the PR is checked. If a push changes English, whoever
made it, the label is removed, a comment asks a maintainer to add it again once the copy is
final, and the open issue here is closed as "not planned". If a push changes no English, the
label stays and an open issue is updated to the new head, because a rebase or force-push can
remove the old commit from the PR and the translator only accepts commits that are in the
PR. Removing the label by hand closes the issue in the same way. Whether a push changes
English is decided by `scripts/english-changes.mjs --push`, using the same registry as the
issue, and only for files the PR touches, so merging `main` into the branch does not count.

The issue is closed because `exercism/translator`'s retry sweep re-dispatches every open
issue, and it would translate a commit whose English is no longer the PR's. Closing it as
"not planned" separates it from a finished issue, and `rerun-source-check.yml` skips it.
Adding the label again opens a new issue at the new head.

## Fork safety

Most Exercism PRs come from forks. Neither template runs PR code, and neither checks it out.

- `i18n-queue.yml` holds a secret and a token that can write to pull requests, so it runs on
  `pull_request_target`, and neither it nor `source-queue.yml` checks out the source repo. It reads what changed from
  GitHub's "list pull request files" and compare APIs, which give each file's path and git
  blob sha, plus commit trees and the two versions of each changed metadata file, fetched by
  blob id through the blob API. `scripts/english-changes.mjs` treats all of it as untrusted
  data and parses it only as JSON or flat TOML. Nothing is cloned. The GITHUB_TOKEN is scoped
  per job. `hold` has `pull-requests: write` to remove the label and comment. Every other
  job can only read. Only the steps that write the issue here mint the app's token, and it
  covers issues on this repo and nothing else.
- `i18n-completeness.yml` holds no secret and runs on `pull_request` with a read-only token.
  It fetches the PR's merge ref as git objects into a bare repository with no working tree,
  and reads it with `git ls-tree` and `git cat-file`. Website YAML and TypeScript bundles are
  parsed as data and never evaluated.
- The only code either one runs is this repo's reusable workflows and `scripts/`, at `main`.

Neither template has its own list of what counts as English. That list is
`scripts/lib/content-types.mjs` and `scripts/lib/website-english.mjs`, read through the
scripts, so the eighty-five installed copies cannot drift apart.

## Where they run

`website`, `docs`, `blog`, `website-copy` and `problem-specifications` run both callers, and
each requires `i18n / completeness` on `main`. `exercism/org-wide-files` still holds the old
self-contained templates under `tracks-files/.github/workflows/`, so it needs the callers
before its sync to the track repos is turned back on. No track repo has either workflow yet.

The loop was first tested on `exercism/website-copy`, with the old templates and a required
`completeness` check on its `main`. The whole loop was tested there live on
2026-09-21 with a fork PR (`exercism/website-copy#2409`, closed unmerged):

- With no label, nothing was queued.
- Adding the label opened an issue, which was translated, pushed and closed, and the PR's
  check went green.
- A push that changed no English (including a rebase, a force-push, and a merge of `main`
  bringing in English the PR does not touch) kept the label and moved the open issue to the
  new head.
- A push that changed English, or removing the label by hand, closed the open issue as not
  planned and re-ran nothing.
- Adding the label again completed the loop again.

It was tested again on 2026-09-22 with the thin callers and the app, with a fork PR
(`exercism/website-copy#2420`, closed unmerged). The check failed, and adding the label
opened `exercism/i18n#8` as `exercism-i18n[bot]`. The app commented, pushed the translation to
`main` here as `exercism-i18n[bot]` and closed the issue. `i18n / completeness` re-ran green,
and the app replied "This PR has been translated 🚀" on the PR.

A run that fails pushes nothing and leaves the issue open. When another run would fail the
same way (items the checker rejects every time, checker errors, the word cap, deletions), the
translator labels the issue `needs-attention`, and the PR gets a reply saying so. Its retry
sweep skips a labelled issue, and the translation team fixes the rejected files by hand,
commits them to `main` here, and runs the issue again, which closes it and removes the label.
An outage leaves the issue unlabelled, and the sweep retries it.

No other source repo has either template yet.

## Before installing

- [x] Create the `translation` label in `exercism/i18n`. `gh issue create --label` fails
      without it.
- [x] Create the `needs-attention` label in `exercism/i18n`. The translator adds it to an
      issue a person has to fix.
- [x] Create the `over-cap` label in `exercism/i18n`. The translator adds it, with
      `needs-attention`, to an issue above its word cap, so the issue shows it is waiting for
      approval.
- [x] Credentials. The Exercism i18n app is installed on every repo in the organisation, and
      its id and private key are organisation-wide (see "The Exercism i18n app"). A source
      repo added later needs nothing more.
- [x] Decided: who may trigger an issue. Whoever adds the `ready-to-translate` label to the
      PR, which needs triage rights on the source repo. Every PR needs it, maintainers' own
      included.
- [ ] Create the `ready-to-translate` label in each source repo. Without it nobody can apply
      it and nothing is queued. It belongs in the label list in `exercism/org-wide-files`,
      which the org-wide label sync applies to every repo. That sync also removes labels it
      does not list, so a label created by hand in one repo can be removed until it is listed
      there. `exercism/website-copy` has a hand-created one, so it is in that state.
- [x] Answered: a runner translates automatically when an issue opens, in
      `exercism/translator`. `.github/workflows/translate-on-issue.yml` in this repo sends it
      one `repository_dispatch` carrying the issue number, and that repo translates, pushes to
      `main` here and closes the issue. No script here calls an LLM. The dispatch uses the
      app's token, limited to Contents write on `exercism/translator`.
- [ ] Decide how the templates reach the track repos. Exercism already syncs shared files to
      every track from `exercism/org-wide-files`, which is the obvious route, and the "do not
      edit a copy" header on each template assumes something like it.
- [x] Make `i18n / completeness` a required status check on `main` in each source repo. Done
      in `website`, `docs`, `blog`, `website-copy` and `problem-specifications`. A track repo
      needs it too once it has the callers.
- [ ] `productionTargets` holds `hu`, so once installed the completeness check fails on every
      PR that changes English until the Hungarian translation lands here. It only blocks the
      merge once it is a required check; until then it shows as a failed check on the PR.

## Checking a whole repo

The PR check only requires what the PR adds or edits, so a PR is never blocked by a backlog
it did not create. To check whether a whole repo is translated, run
`node scripts/completeness.mjs --source-repo=<checkout>` with no `--base`. That is what to run
on a schedule, or before adding a locale to `productionTargets`. No workflow does this yet.
