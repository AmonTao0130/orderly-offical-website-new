---
name: orderly-release-tag
description: Use when asked to release, deploy, publish, or create dev/prod environment tags for the Orderly official website. Triggers on dev deploy, prod deploy, release tag, deployment tag, create-dev-tag, create-prod-tag, tag:dev, or tag:prod requests.
---

# Orderly Release Tag

Use this skill to create deployment tags through the project scripts. Do not handwrite tag names or run `git tag` directly for release work.

## Preflight

1. Confirm the target environment is `dev` or `prod`. If the user did not specify it, ask before continuing.
2. Verify the project has the required release scripts by reading `package.json` only. Confirm both keys exist:

   - `scripts["tag:dev"]`
   - `scripts["tag:prod"]`

Do not run `npm run tag:dev` or `npm run tag:prod` as a configuration check. If either script is missing, stop and tell the user the release tag scripts are not configured.
3. Check the worktree before any deployment command:

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

After the commit and push succeed, continue the original `dev` or `prod` deployment workflow.

## Dev Deployment

For `dev`, tell the user this will create and push a real dev tag, then run:

```bash
npm run tag:dev
```

Let `scripts/create-dev-tag.mjs` decide the base version, branch suffix, sequence number, and push behavior.

## Prod Deployment

For `prod`, first check the current branch:

```bash
git rev-parse --abbrev-ref HEAD
```

If the current branch is `main`, tell the user this will create and push a real prod tag, then run:

```bash
npm run tag:prod
```

If the current branch is not `main`, do not run `npm run tag:prod` immediately. Tell the user prod tags must be created from `main`, then offer two choices:

- Stop so the user can merge manually.
- Help merge the current branch into `main`, then continue the prod deployment.

Only continue with the merge path after the user explicitly chooses it.

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
11. Run `npm run tag:prod`.

Before running commands that switch branches, merge, push `main`, create tags, or push tags, clearly tell the user these are real Git changes.

## Reporting

After the command finishes, summarize:

- Environment deployed.
- Branch used.
- Commit SHA from `git rev-parse --short HEAD`.
- Tag created, if visible in the command output.
- Whether the branch and tag were pushed.
- Any failure reason and the next action.
