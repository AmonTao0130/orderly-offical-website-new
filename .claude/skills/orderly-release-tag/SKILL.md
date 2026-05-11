---
name: orderly-release-tag
description: Use when asked to release, deploy, publish, or create dev/prod environment tags for the Orderly official website. Triggers on dev deploy, prod deploy, release tag, deployment tag, release:dev, or release:prod requests.
---

# Orderly Release Tag

Use this skill to create deployment tags through the release tag wrapper script. Do not handwrite tag names or run `git tag` directly for release work.

## Preflight

1. Confirm the target environment is `dev` or `prod`. If the user did not specify it, ask before continuing.
2. Understand the release tag mode. The skill must always run `scripts/release/release-tag.mjs`; that wrapper loads `.env.local`, reads the skill config, resolves `ORDERLY_RELEASE_TAG_MODE`, and chooses either direct Git tag creation or the GitLab trigger pipeline.

`ORDERLY_RELEASE_TAG_MODE` supports these values inside the wrapper:

- `auto` (default): use trigger mode when a trigger project id is available and `TRIGGER_PIPELINE_TOKEN` is present; otherwise use local mode.
- `trigger`: force trigger mode. If either the trigger project id or `TRIGGER_PIPELINE_TOKEN` is missing, stop and tell the user which required value is missing. Do not fall back to local mode.
- `local`: force local mode, even if trigger environment variables are present.

If `ORDERLY_RELEASE_TAG_MODE` is unset, treat it as `auto`. If it is set to any other value, stop and ask the user to set it to `auto`, `trigger`, or `local`.

Trigger mode reads the project id from `.claude/skills/orderly-release-tag/config.json`:

```json
{
  "triggerPipelineProjectId": "52443474"
}
```

Use `TRIGGER_PIPELINE_PROJECT_ID` only as a local override or fallback if the config file is missing. Never commit `TRIGGER_PIPELINE_TOKEN`; put it in the local shell environment or in `.env.local`, which `scripts/release/release-tag.mjs` loads automatically when present.

The wrapper resolves the trigger project id as:

1. `TRIGGER_PIPELINE_PROJECT_ID` when it is set locally.
2. Otherwise `.claude/skills/orderly-release-tag/config.json` `triggerPipelineProjectId`, currently `52443474`.

Trigger mode uses these fixed environment variable names inside the wrapper and trigger script:

- `TRIGGER_PIPELINE_PROJECT_ID`
- `TRIGGER_PIPELINE_TOKEN`
- `TRIGGER_PIPELINE_BRANCH` (optional; if unset, `scripts/release/trigger-create-tag-pipeline.mjs` uses the current Git branch)

Do not require the user to set `TRIGGER_PIPELINE_TAG_ENV`; the wrapper passes the target environment with `--env dev` or `--env prod`.
3. Verify the project has the required release scripts by reading `package.json` only. Confirm both keys exist:

   - `scripts["release:dev"]`
   - `scripts["release:prod"]`

Do not run `npm run release:dev` or `npm run release:prod` as a configuration check. If either script is missing, stop and tell the user the release tag scripts are not configured.
4. Verify the wrapper and trigger scripts exist before continuing:

```text
scripts/release/release-tag.mjs
scripts/release/create-git-tag.mjs
scripts/release/trigger-create-tag-pipeline.mjs
```

If either script is missing, stop and tell the user the release tag scripts are not configured.
5. Check the worktree before any deployment command:

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

After the commit and push succeed, continue the original `dev` or `prod` deployment workflow using the selected release tag mode.

## Dev Deployment

For `dev`, tell the user this will create and push a real dev tag using the configured release tag mode, then run:

```bash
node scripts/release/release-tag.mjs --env dev
```

Let `scripts/release/release-tag.mjs` decide whether to run `scripts/release/create-git-tag.mjs --env dev` or trigger the GitLab pipeline.

## Prod Deployment

Prod release here means **only creating and pushing the prod tag**. Local mode does **not** trigger deployment by itself. Trigger mode triggers the GitLab pipeline that runs the `create_tag` job; the tag is created by that job.

For `prod`, first check the current branch:

```bash
git rev-parse --abbrev-ref HEAD
```

If the current branch is `main`, tell the user this will create and push a real prod tag using the configured release tag mode, then run:

```bash
node scripts/release/release-tag.mjs --env prod
```

If the current branch is not `main`, do not run the prod tag command immediately. Tell the user prod tags must be created from `main`, then offer two choices:

- Stop so the user can merge manually.
- Help merge the current branch into `main`, then continue the prod deployment.

Only continue with the merge path after the user explicitly chooses it.

### After prod local tag succeeds (manual DevOps deploy request)

When `npm run release:prod` completes successfully in local mode, the user must **manually** ask DevOps to deploy. There is no automated deploy step in this workflow.

Use this exact message format (replace `<tag>` with the tag name from the script output, including the `v` prefix if present):

```text
official-website prod <tag>
```

Example:

```text
official-website prod v0.1.59
```

After tagging, remind the user to send that request to DevOps if deployment is needed.

### After prod trigger pipeline succeeds

When `node scripts/release/release-tag.mjs --env prod` completes successfully in trigger mode, report the pipeline id and URL from the script output. The actual prod tag is created later by the GitLab pipeline `create_tag` job, so do not invent or guess a tag name.

Tell the user to wait for the pipeline to finish, then use the prod tag generated by that pipeline in the DevOps request:

```text
official-website prod <pipeline-created-tag>
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
    - Run `node scripts/release/release-tag.mjs --env prod`.

Before running commands that switch branches, merge, push `main`, create tags, or push tags, clearly tell the user these are real Git changes.

## Reporting

After the command finishes, summarize:

- Environment deployed.
- Release tag mode used: `local` or `trigger`.
- Branch used.
- Commit SHA from `git rev-parse --short HEAD`.
- Local mode: tag created, if visible in the command output.
- Trigger mode: pipeline id and URL, if visible in the command output; explain that the tag will be created by the GitLab pipeline `create_tag` job.
- Whether the branch was pushed. In local mode, also report whether the tag was pushed.
- Any failure reason and the next action.

For **`prod`** only in local mode, when tagging succeeded, also include the DevOps request line the user should send:

```text
official-website prod <actual-tag>
```

So they can copy-paste it (same format as under **After prod local tag succeeds** in Prod Deployment).

For **`prod`** only in trigger mode, when the pipeline was triggered successfully, remind the user to wait for the pipeline-created tag and then send:

```text
official-website prod <pipeline-created-tag>
```
