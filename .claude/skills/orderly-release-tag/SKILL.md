---
name: orderly-release-tag
description: Use when asked to release, deploy, publish, or create dev/qa/prod environment tags for the current project through its configured release scripts. Triggers on dev deploy, qa deploy, prod deploy, release tag, deployment tag, release:dev, release:qa, or release:prod requests.
---

# Orderly Release Tag

Use this skill to create deployment tags through the repository release scripts, which invoke the `orderly-release-tag` CLI. Do not handwrite tag names or run `git tag` directly for release work.

## Preflight

1. Confirm the target environment is `dev`, `qa`, or `prod`. If the user did not specify it, ask before continuing.
2. For `prod` only, resolve the DevOps service name by reading `.gitlab-ci.yml` only. Use the top-level `variables.SERVICE_NAME` value as `SERVICE_NAME`. Do not use job-level `variables.SERVICE_NAME`, `IMAGE_NAME`, `package.json` `name`, or any fallback config. If top-level `variables.SERVICE_NAME` is missing for a `prod` release, stop and ask the user for the service name before continuing. Do not require `SERVICE_NAME` for `dev` or `qa` releases.
3. Understand the release tag mode. The skill must run releases through `npm run release:dev`, `npm run release:qa`, or `npm run release:prod`; those scripts invoke `orderly-release-tag`, which loads `.env.local`, resolves `RELEASE_TAG_MODE`, and chooses either direct Git tag creation or the GitLab trigger pipeline.

`RELEASE_TAG_MODE` supports these values inside the wrapper:

- `auto` (default): use trigger mode when a GitLab project id is available and `GITLAB_TRIGGER_TOKEN` is present; otherwise use local mode.
- `trigger`: force trigger mode. If either the GitLab project id or `GITLAB_TRIGGER_TOKEN` is missing, stop and tell the user which required value is missing. Do not fall back to local mode.
- `local`: force local mode, even if trigger environment variables are present.

If `RELEASE_TAG_MODE` is unset, treat it as `auto`. If it is set to any other value, stop and ask the user to set it to `auto`, `trigger`, or `local`.

Trigger mode reads the project id from `--project-id` first, then `GITLAB_PROJECT_ID`. This repository's `package.json` release scripts pass `--project-id 52443474`, so run the release through those npm scripts instead of repeating the CLI arguments manually.

Use `GITLAB_PROJECT_ID` only as a local override when running `orderly-release-tag` directly without `--project-id`. The normal workflow should use `npm run release:dev`, `npm run release:qa`, or `npm run release:prod`. Never commit `GITLAB_TRIGGER_TOKEN`; put it in the local shell environment or in `.env.local`, which `orderly-release-tag` loads automatically when present.

Trigger mode uses these fixed environment variable names inside the wrapper and trigger script:

- `GITLAB_PROJECT_ID`
- `GITLAB_TRIGGER_TOKEN`
- `RELEASE_TAG_BRANCH` (optional; if unset, `orderly-release-tag` uses the current Git branch)

Do not require the user to set `RELEASE_TAG_ENV`; the wrapper passes the target environment with `--env dev`, `--env qa`, or `--env prod`.

Both local mode and trigger mode validate that the local `HEAD` matches `origin/<branch>` before creating a tag or triggering GitLab. If the wrapper reports that local and remote SHAs differ, stop and tell the user to push or fast-forward pull the branch first. Do not bypass the wrapper by running the trigger script or tag script directly.

4. Verify the project has the required release scripts by reading `package.json` only. Confirm all required keys exist:

   - `scripts["release:dev"]`
   - `scripts["release:qa"]`
   - `scripts["release:prod"]`

Do not run `npm run release:dev`, `npm run release:qa`, or `npm run release:prod` as a configuration check. If any script is missing, stop and tell the user the release tag scripts are not configured.

5. Verify the project depends on the release tag CLI by reading `package.json` only. Confirm this key exists in either `dependencies` or `devDependencies`:

- `dependencies["@orderly.network/release-tag"]`
- `devDependencies["@orderly.network/release-tag"]`

If the dependency is missing, stop and tell the user the release tag package is not configured.

6. Check the worktree before any deployment command:

```bash
git status --short
```

If the worktree is clean, continue with the target environment workflow. If there are uncommitted changes, ask the user to choose one of these options before continuing:

- Commit all current changes, push the branch, then deploy.
- Deploy directly without committing current changes.

If the user deploys directly, clearly warn that the uncommitted changes will not be included in the commit pointed to by the deployment tag.

For a `prod` deployment from a non-`main` branch, do not switch branches or start assisted merge while there are uncommitted changes. The user must either commit and push the current changes first, deploy directly without assisted merge, or stop and handle the worktree manually.

## Commit Before Deployment

Use this flow only when the user chooses to commit before deployment:

1. Tell the user this will run real Git changes: `git add -A`, `git commit`, and `git push`.
2. Inspect the changes enough to write a concise commit message:

```bash
git diff --stat
git diff --name-status
```

3. Generate a short commit message from the diff summary.
4. Stage all current changes:

```bash
git add -A
```

5. Commit with the generated message:

```bash
git commit -m "<generated message>"
```

6. Push the current branch:

```bash
git push
```

If the branch has no upstream, use:

```bash
git push -u origin HEAD
```

After the commit and push succeed, continue the original `dev`, `qa`, or `prod` deployment workflow using the selected release tag mode.

## Dev Deployment

For `dev`, tell the user this will create and push a real dev tag using the configured release tag mode, then run:

```bash
npm run release:dev
```

Let `orderly-release-tag` decide whether to create the local tag or trigger the GitLab pipeline.

Dev tag names intentionally use only the final branch path segment:

- `feat/deploy` -> `deploy`
- `feature/foo` -> `foo`

Do not rewrite dev tag branch names to include the full branch path.

## QA Deployment

For `qa`, tell the user this will create and push a real QA tag using the configured release tag mode, then run:

```bash
npm run release:qa
```

Let `orderly-release-tag` decide whether to create the local tag or trigger the GitLab pipeline.

QA follows the same branch rules as dev: it can be created from any branch, and trigger mode must pass the local `HEAD` versus `origin/<branch>` validation. Do not bypass the wrapper by running the trigger or tag scripts directly.

QA tag names intentionally use only the final branch path segment:

- `feat/deploy` -> `deploy`
- `feature/foo` -> `foo`

QA tags use the format `v<base>-<branchTail>-qa-<n>` for non-`main` branches, and `v<base>-qa-<n>` for `main`.

## Dry Run

Use dry run when the user wants to validate the release path before creating a tag or triggering GitLab:

```bash
npm run release:dev -- --dry-run
npm run release:qa -- --dry-run
npm run release:prod -- --dry-run
```

In local mode, dry run calculates and prints the tag that would be created, but does not create or push it. In trigger mode, dry run performs the same branch safety checks, including local `HEAD` versus `origin/<branch>`, but does not trigger the GitLab pipeline.

## Prod Deployment

Prod release here means **only creating and pushing the prod tag**. Local mode does **not** trigger deployment by itself. Trigger mode triggers the GitLab pipeline that runs the `release_tag` job; the tag is created by that job.

For `prod`, first check the current branch:

```bash
git rev-parse --abbrev-ref HEAD
```

If the current branch is `main`, tell the user this will create and push a real prod tag using the configured release tag mode, then run:

```bash
npm run release:prod
```

The CLI also enforces this `main` branch rule. If the CLI rejects a prod release from a non-`main` branch, do not manually create tags or trigger GitLab to bypass it.

If the current branch is not `main`, do not run the prod tag command immediately. Tell the user prod tags must be created from `main`, then offer two choices:

- Stop so the user can merge manually.
- Help merge the current branch into `main`, then continue the prod deployment.

Only continue with the merge path after the user explicitly chooses it.

### After prod local tag succeeds (manual DevOps deploy request)

When `npm run release:prod` completes successfully in local mode, the user must **manually** ask DevOps to deploy. There is no automated deploy step in this workflow.

Use this exact message format (replace `<SERVICE_NAME>` with the top-level `.gitlab-ci.yml` `variables.SERVICE_NAME` value, and replace `<tag>` with the tag name from the script output, including the `v` prefix if present):

```text
<SERVICE_NAME> prod <tag>
```

Example:

```text
official-website prod v0.1.59
```

After tagging, remind the user to send that request to DevOps if deployment is needed.

### After prod trigger pipeline succeeds

When `npm run release:prod` completes successfully in trigger mode, report the pipeline id and URL from the script output. The actual prod tag is created later by the GitLab pipeline `release_tag` job, so do not invent or guess a tag name.

Tell the user to wait for the pipeline to finish, then use the prod tag generated by that pipeline in the DevOps request:

```text
<SERVICE_NAME> prod <pipeline-created-tag>
```

## Assisted Prod Merge

When the user chooses assisted merge:

1. Save the current branch name.
2. Run `git status --short`. If the worktree is not clean, stop and return to the Preflight dirty-worktree choice. Do not switch branches with uncommitted changes.
3. Run `git fetch origin`.
4. Run `git switch main`.
5. Run `git pull --ff-only origin main`.
6. Run `git merge <original-branch>`.
7. If there are conflicts, stop and tell the user to resolve them before continuing.
8. After the merge succeeds, run `git status --short`. If the worktree is not clean, stop and report the unexpected state before tagging.
9. Do not run `npm run build` before the prod tag by default. Assume commit hooks already handled build verification unless the user explicitly asks for another build.
10. Run `git push origin main`.
11. Continue the prod deployment using the selected release tag mode:
    - Run `npm run release:prod`.

Before running commands that switch branches, merge, push `main`, create tags, or push tags, clearly tell the user these are real Git changes.

## Reporting

After the command finishes, summarize:

- Environment deployed.
- Release tag mode used: `local` or `trigger`.
- Branch used.
- Commit SHA from `git rev-parse --short HEAD`.
- Local mode: tag created, if visible in the command output.
- Trigger mode: pipeline id and URL, if visible in the command output; explain that the tag will be created by the GitLab pipeline `release_tag` job.
- Whether the branch was pushed. In local mode, also report whether the tag was pushed.
- Any failure reason and the next action.

For **`prod`** only in local mode, when tagging succeeded, also include the DevOps request line the user should send. Build it from the top-level `.gitlab-ci.yml` `variables.SERVICE_NAME` value and the actual tag:

```text
<SERVICE_NAME> prod <actual-tag>
```

So they can copy-paste it (same format as under **After prod local tag succeeds** in Prod Deployment).

For **`prod`** only in trigger mode, when the pipeline was triggered successfully, remind the user to wait for the pipeline-created tag and then send:

```text
<SERVICE_NAME> prod <pipeline-created-tag>
```
