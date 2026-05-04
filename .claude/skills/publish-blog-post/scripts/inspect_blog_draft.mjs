#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const REQUIRED_FIELDS = [
  "slug",
  "title",
  "description",
  "date",
  "category",
  "cover",
];
export const OPTIONAL_DEFAULTS = {
  publicationState: "live",
  author: "Orderly Network",
  pin: false,
};

const PUBLICATION_STATES = new Set(["live", "preview"]);
export const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const ASSET_MD_RE = /!\[[^\]]*]\(\s*<?([^)\s>]+)>?(?:\s+["'][^)]*["'])?\s*\)/g;
const ASSET_HTML_RE = /\b(?:src|href)=["']([^"']+)["']/g;
const SAFE_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function stripQuotes(value) {
  return value.replace(/^["']|["']$/g, "");
}

function parseValue(raw) {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null") return null;
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean);
  }
  return stripQuotes(value);
}

export function parseFrontmatter(markdown) {
  const match = markdown.match(FRONTMATTER_RE);
  if (!match) {
    return {
      frontmatter: {},
      body: markdown,
      error: "Markdown blog post is missing frontmatter",
    };
  }

  const frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const index = trimmed.indexOf(":");
    if (index === -1) {
      return {
        frontmatter,
        body: markdown.slice(match[0].length),
        error: `Invalid frontmatter line: ${line}`,
      };
    }

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1);
    frontmatter[key] = parseValue(value);
  }

  return {
    frontmatter,
    body: markdown.slice(match[0].length),
    error: null,
  };
}

export function normalizePath(value) {
  const parts = [];
  for (const part of value.replace(/\\/g, "/").split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") {
      parts.pop();
      continue;
    }
    parts.push(part);
  }
  return parts.join("/");
}

export function isExternalOrRootPath(value) {
  return (
    value.startsWith("/") ||
    value.startsWith("#") ||
    /^[a-z][a-z0-9+.-]*:/i.test(value)
  );
}

export function splitAssetSuffix(value) {
  const match = value.match(/^([^?#]+)([?#].*)?$/);
  return {
    assetPath: match?.[1] || value,
    suffix: match?.[2] || "",
  };
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function findMarkdownFiles(source) {
  if (!fs.existsSync(source)) return [];
  const stat = fs.statSync(source);
  if (stat.isFile()) return source.toLowerCase().endsWith(".md") ? [source] : [];
  if (!stat.isDirectory()) return [];

  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(entryPath);
      if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
        files.push(entryPath);
      }
    }
  };
  walk(source);
  return files.sort((a, b) => a.localeCompare(b));
}

function loadBlogConfig(repoRoot) {
  const configPath = path.join(
    repoRoot,
    "src",
    "content",
    "blog",
    "config",
    "blog.config.json"
  );
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function loadLegacySlugs(repoRoot) {
  const slugs = new Set();
  const entitiesPath = path.join(
    repoRoot,
    "src",
    "content",
    "blog",
    "legacy-strapi-export",
    "entities_00001.jsonl"
  );
  if (!fs.existsSync(entitiesPath)) return slugs;

  for (const line of fs.readFileSync(entitiesPath, "utf8").split(/\r?\n/)) {
    if (!line.trim()) continue;
    const entity = JSON.parse(line);
    if (entity.type === "api::article.article" && entity.data?.slug) {
      slugs.add(entity.data.slug);
    }
  }
  return slugs;
}

function loadMarkdownSlugs(repoRoot) {
  const postsRoot = path.join(repoRoot, "src", "content", "blog", "posts");
  if (!fs.existsSync(postsRoot)) return new Set();
  return new Set(
    fs
      .readdirSync(postsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
  );
}

function collectAssetRefs(frontmatter, body) {
  const refs = [];
  if (frontmatter.cover) {
    refs.push({ kind: "cover", value: String(frontmatter.cover) });
  }
  for (const match of body.matchAll(ASSET_MD_RE)) {
    refs.push({ kind: "markdown-image", value: match[1] });
  }
  for (const match of body.matchAll(ASSET_HTML_RE)) {
    refs.push({ kind: "html-asset", value: match[1] });
  }
  return refs;
}

function resolveAsset(markdownFile, value) {
  const { assetPath, suffix } = splitAssetSuffix(value);
  const result = {
    value,
    asset_path: assetPath,
    suffix,
    is_local: !isExternalOrRootPath(value),
    exists: null,
    resolved_path: null,
    package_path: null,
  };

  if (result.is_local) {
    const packagePath = normalizePath(assetPath);
    const resolvedPath = path.resolve(path.dirname(markdownFile), packagePath);
    result.exists = fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile();
    result.resolved_path = resolvedPath;
    result.package_path = packagePath;
  }
  return result;
}

function validDate(value) {
  if (!value) return false;
  return !Number.isNaN(new Date(String(value)).getTime());
}

function parseArgs(argv) {
  const args = {
    source: null,
    repoRoot: ".",
    markdown: null,
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
    "Usage: node .claude/skills/publish-blog-post/scripts/inspect_blog_draft.mjs <md-or-folder> [--repo-root <path>] [--markdown <path>]",
    "",
    "Inspect an Orderly website Markdown blog draft without writing files.",
  ].join("\n");
}

export function inspectBlogDraft(sourceInput, options = {}) {
  const source = path.resolve(sourceInput);
  const repoRoot = path.resolve(options.repoRoot || ".");
  const markdownFiles = findMarkdownFiles(source).map((file) => path.resolve(file));
  const errors = [];
  const warnings = [];

  let selectedFile = null;
  if (options.markdown) {
    const selectedCandidate = fs.existsSync(source) && fs.statSync(source).isDirectory()
      ? path.resolve(source, options.markdown)
      : path.resolve(options.markdown);
    if (markdownFiles.includes(selectedCandidate)) {
      selectedFile = selectedCandidate;
    } else {
      errors.push(`Selected Markdown file was not found: ${selectedCandidate}`);
    }
  } else if (markdownFiles.length === 1) {
    selectedFile = markdownFiles[0];
  } else if (markdownFiles.length === 0) {
    errors.push("No Markdown (.md) file found in the source path");
  } else {
    errors.push("Multiple Markdown files found; ask the user which one to publish");
  }

  const config = loadBlogConfig(repoRoot);
  const categories = (config.categories || []).map((item) => item.slug);
  const authors = (config.authors || []).map((item) => item.name);
  const descriptionMax = Number(config.descriptionMaxLength || 80);
  const markdownSlugs = loadMarkdownSlugs(repoRoot);
  const legacySlugs = loadLegacySlugs(repoRoot);

  let frontmatter = {};
  let body = "";
  if (selectedFile) {
    const markdown = fs.readFileSync(selectedFile, "utf8");
    const parsed = parseFrontmatter(markdown);
    frontmatter = parsed.frontmatter;
    body = parsed.body;
    if (parsed.error) errors.push(parsed.error);
  }

  const missingFields = REQUIRED_FIELDS.filter((field) => !frontmatter[field]);
  for (const field of missingFields) {
    errors.push(`Missing required frontmatter "${field}"`);
  }

  let candidateSlug = String(frontmatter.slug || "");
  if (!candidateSlug && frontmatter.title) candidateSlug = slugify(String(frontmatter.title));
  if (!candidateSlug && selectedFile) candidateSlug = slugify(path.basename(selectedFile, ".md"));

  if (candidateSlug && !SAFE_SLUG_RE.test(candidateSlug)) {
    errors.push(`Unsafe slug "${candidateSlug}"; use lowercase letters, digits, and hyphens`);
  }
  if (candidateSlug && markdownSlugs.has(candidateSlug)) {
    errors.push(`Markdown blog slug already exists: ${candidateSlug}`);
  }
  if (candidateSlug && legacySlugs.has(candidateSlug)) {
    errors.push(`Markdown blog slug conflicts with legacy export: ${candidateSlug}`);
  }

  const category = frontmatter.category;
  if (category && !categories.includes(category)) {
    errors.push(`Invalid blog category "${category}"; ask before changing config`);
  }

  const author = frontmatter.author || config.defaultAuthor || OPTIONAL_DEFAULTS.author;
  if (author && !authors.includes(author)) {
    errors.push(`Invalid blog author "${author}"; ask before changing config`);
  }

  const publicationState =
    frontmatter.publicationState ||
    config.defaultPublicationState ||
    OPTIONAL_DEFAULTS.publicationState;
  if (!PUBLICATION_STATES.has(publicationState)) {
    errors.push(`Invalid blog publicationState "${publicationState}"; allowed values: live, preview`);
  }

  if (frontmatter.description && String(frontmatter.description).length > descriptionMax) {
    errors.push(
      `Blog description is ${String(frontmatter.description).length} characters; max is ${descriptionMax}`
    );
  }

  if (frontmatter.date && !validDate(frontmatter.date)) {
    errors.push(`Invalid blog date "${frontmatter.date}"`);
  }

  const assets = collectAssetRefs(frontmatter, body).map((ref) => {
    const resolved = selectedFile ? resolveAsset(selectedFile, ref.value) : { value: ref.value };
    const item = { ...ref, ...resolved };
    if (item.is_local && !item.exists) {
      errors.push(`Markdown blog asset not found: ${item.resolved_path}`);
    }
    return item;
  });

  const targetDir = candidateSlug
    ? path.join(repoRoot, "src", "content", "blog", "posts", candidateSlug)
    : null;
  const targetMarkdown = targetDir && candidateSlug
    ? path.join(targetDir, `${candidateSlug}.md`)
    : null;

  const appliedDefaults = {};
  const defaults = {
    publicationState,
    author,
    pin: frontmatter.pin ?? OPTIONAL_DEFAULTS.pin,
  };
  for (const [key, value] of Object.entries(defaults)) {
    if (!(key in frontmatter)) appliedDefaults[key] = value;
  }

  return {
    source,
    selected_markdown: selectedFile,
    markdown_files: markdownFiles,
    frontmatter,
    applied_defaults: appliedDefaults,
    missing_fields: missingFields,
    candidate_slug: candidateSlug,
    target_dir: targetDir,
    target_markdown: targetMarkdown,
    allowed_categories: categories,
    allowed_authors: authors,
    description_max_length: descriptionMax,
    assets,
    errors,
    warnings,
    requires_user_input: errors.length > 0,
    can_stage: Boolean(selectedFile && candidateSlug && errors.length === 0),
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
    const report = inspectBlogDraft(args.source, {
      repoRoot: args.repoRoot,
      markdown: args.markdown,
    });
    console.log(JSON.stringify(report, null, 2));
    return report.requires_user_input ? 1 : 0;
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
