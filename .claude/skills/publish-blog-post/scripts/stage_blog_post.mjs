#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  FRONTMATTER_RE,
  OPTIONAL_DEFAULTS,
  inspectBlogDraft,
  isExternalOrRootPath,
  normalizePath,
  parseFrontmatter,
  splitAssetSuffix,
} from "./inspect_blog_draft.mjs";

function parseArgs(argv) {
  const args = {
    source: null,
    repoRoot: ".",
    markdown: null,
    force: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--repo-root") {
      args.repoRoot = argv[++index];
      continue;
    }
    if (arg === "--markdown") {
      args.markdown = argv[++index];
      continue;
    }
    if (arg === "--force") {
      args.force = true;
      continue;
    }
    if (arg === "-h" || arg === "--help") {
      args.help = true;
      continue;
    }
    if (!args.source) {
      args.source = arg;
      continue;
    }
    throw new Error(`Unexpected argument: ${arg}`);
  }
  return args;
}

function usage() {
  return [
    "Usage: node .claude/skills/publish-blog-post/scripts/stage_blog_post.mjs <md-or-folder> [--repo-root <path>] [--markdown <path>] [--force]",
    "",
    "Stage a validated Markdown blog draft into src/content/blog/posts.",
  ].join("\n");
}

function renderFrontmatterValue(value) {
  if (typeof value === "boolean") return value ? "true" : "false";
  return JSON.stringify(value);
}

function updateFrontmatter(markdown, defaults) {
  const match = markdown.match(FRONTMATTER_RE);
  if (!match) return markdown;

  const parsed = parseFrontmatter(markdown);
  const lines = match[1].split(/\r?\n/);
  for (const [key, value] of Object.entries(defaults)) {
    if (key in parsed.frontmatter) continue;
    lines.push(`${key}: ${renderFrontmatterValue(value)}`);
  }

  return `---\n${lines.join("\n").trimEnd()}\n---\n${parsed.body}`;
}

function copyAsset(markdownFile, targetDir, value) {
  if (isExternalOrRootPath(value)) return null;

  const { assetPath } = splitAssetSuffix(value);
  const packagePath = normalizePath(assetPath);
  if (!packagePath) return null;

  const sourcePath = path.resolve(path.dirname(markdownFile), packagePath);
  const destinationPath = path.join(targetDir, packagePath);
  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
  return destinationPath;
}

export function stageBlogPost(source, options = {}) {
  const repoRoot = path.resolve(options.repoRoot || ".");
  const report = inspectBlogDraft(source, {
    repoRoot,
    markdown: options.markdown,
  });

  if (report.requires_user_input) {
    return {
      staged: false,
      reason: "inspect_failed",
      inspect: report,
    };
  }

  const targetDir = report.target_dir;
  const targetMarkdown = report.target_markdown;
  if (fs.existsSync(targetDir) && !options.force) {
    return {
      staged: false,
      reason: "target_exists",
      message: `Target post directory already exists: ${targetDir}. Ask before rerunning with --force.`,
      inspect: report,
    };
  }

  if (fs.existsSync(targetDir) && options.force) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }
  fs.mkdirSync(targetDir, { recursive: true });

  const defaults = {};
  for (const [key, value] of Object.entries(OPTIONAL_DEFAULTS)) {
    if (!(key in report.frontmatter)) defaults[key] = value;
  }

  const sourceMarkdown = fs.readFileSync(report.selected_markdown, "utf8");
  fs.writeFileSync(targetMarkdown, updateFrontmatter(sourceMarkdown, defaults), "utf8");

  const copiedAssets = [];
  const seenValues = new Set();
  for (const asset of report.assets) {
    const value = String(asset.value || "");
    if (!value || seenValues.has(value)) continue;
    seenValues.add(value);
    const copied = copyAsset(report.selected_markdown, targetDir, value);
    if (copied) copiedAssets.push(copied);
  }

  return {
    staged: true,
    slug: report.candidate_slug,
    blog_url: `/blog/${report.candidate_slug}`,
    target_markdown: targetMarkdown,
    target_dir: targetDir,
    copied_assets: copiedAssets,
    frontmatter: report.frontmatter,
    applied_defaults: defaults,
    next_steps: [
      "Run npm run build",
      `Review /blog/${report.candidate_slug} locally if needed`,
      "Prepare a PR with the staged Markdown and assets",
    ],
  };
}

function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      console.log(usage());
      return 0;
    }
    if (!args.source) {
      console.error(usage());
      return 2;
    }
    const result = stageBlogPost(args.source, {
      repoRoot: args.repoRoot,
      markdown: args.markdown,
      force: args.force,
    });
    console.log(JSON.stringify(result, null, 2));
    return result.staged ? 0 : 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return 2;
  }
}

const isDirectRun = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isDirectRun) {
  process.exitCode = main();
}
