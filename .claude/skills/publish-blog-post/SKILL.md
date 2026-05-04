---
name: publish-blog-post
description: Publish a local Markdown blog draft, or a folder containing Markdown plus assets, into the Orderly website blog. Use when asked to add, publish, stage, validate, prepare a PR for, or move a Markdown article into the site blog under src/content/blog/posts with its images and resources.
---

# Publish Blog Post

## Workflow

Use this skill to publish Markdown drafts into the local blog system. The site reads posts from:

```text
src/content/blog/posts/<slug>/<slug>.md
```

Keep assets next to the Markdown file using relative paths such as `./thumbnail.jpg` or `./images/chart.png`. The existing blog loader copies those assets to `public/uploads/blog/<slug>/...` during build.

1. Inspect first:

```bash
node .claude/skills/publish-blog-post/scripts/inspect_blog_draft.mjs <md-or-folder>
```

2. If the JSON report has `requires_user_input: true`, ask the user for the missing or invalid information before staging.
3. Stage only after the report is clean:

```bash
node .claude/skills/publish-blog-post/scripts/stage_blog_post.mjs <md-or-folder>
```

4. Verify with:

```bash
npm run build
```

For local visual review, run `npm run dev` and check `/blog` plus `/blog/<slug>`.

## Frontmatter Contract

Use `src/blog/default-preview-markdown.ts` as the writing reference and the loader rules in `src/blog/data-source/local-blog-source.ts` as the source of truth.

Required fields:

- `slug`
- `title`
- `description`
- `date`
- `category`
- `cover`

Optional fields and defaults:

- `publicationState`: default `live`; allowed values are `live` and `preview`.
- `author`: default `Orderly Network`.
- `pin`: default `false`.

Validation rules:

- `slug` must be a safe URL slug and must match both folder name and Markdown file name after staging.
- `slug` must not conflict with existing Markdown posts or legacy Strapi export slugs.
- `description` must not exceed `descriptionMaxLength` from `src/content/blog/config/blog.config.json`.
- `category` must match a configured category slug.
- `author` must match a configured author name.
- `cover` must point to an existing local file unless it is an external or root-relative URL.
- `date` must parse as a valid date; prefer `YYYY-MM-DD`.

## When To Ask The User

Do not guess when any of these occur:

- A required frontmatter field is missing.
- Multiple Markdown files are present and no specific file was selected.
- `slug` is unsafe, missing, or conflicts with an existing post.
- `category` or `author` is not configured.
- `cover` is missing or points to a missing file.
- `description` is over the configured limit and needs rewriting.
- `publicationState` is not `live` or `preview`.

Do not modify `src/content/blog/config/blog.config.json` unless the user explicitly asks to add a new category or author.

## Staging Rules

The staging script writes only into the target post directory:

```text
src/content/blog/posts/<slug>/
```

It creates `<slug>.md`, copies referenced local assets, and preserves their relative paths. It does not run git commands, does not create commits, and does not open pull requests.

Before staging, check `git status --short` and avoid overwriting unrelated user changes. If the target post directory already exists, ask the user before using `--force`.

## PR Preparation

After staging and validation, summarize:

- Blog URL: `/blog/<slug>`
- Target Markdown path.
- Copied asset paths.
- Frontmatter values.
- Build result.
- Suggested commit title, for example: `Add blog post: <title>`.

Only create a branch, commit, push, or PR when the user explicitly asks.
