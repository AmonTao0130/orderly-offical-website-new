export { DEFAULT_BLOG_PREVIEW_MARKDOWN } from "./preview-config";
import { markdownToHtml } from "./markdown";
import type { BlogPost } from "./types";

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const WORDS_PER_MINUTE = 220;

type MarkdownFrontmatter = {
  slug?: string;
  title?: string;
  description?: string;
  date?: string;
  category?: string;
  publicationState?: string;
  author?: string;
  cover?: string;
  pin?: boolean;
};

export type BlogPreviewAssetContext = {
  filesByPath?: Map<string, File>;
  baseDir?: string;
};

export type BlogPreviewParseResult = {
  post: BlogPost;
  objectUrls: string[];
  warnings: string[];
  frontmatter: MarkdownFrontmatter;
};

export type BlogPreviewDownloadAsset = {
  file?: File;
  publicUrl?: string;
  packagePath: string;
  sourcePath: string;
};

type FileWithRelativePath = File & {
  webkitRelativePath?: string;
};

function stripQuotes(value: string) {
  return value.replace(/^['"]|['"]$/g, "");
}

function parseFrontmatterValue(value: string): unknown {
  const trimmed = value.trim();

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (trimmed === "null") {
    return null;
  }

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean);
  }

  return stripQuotes(trimmed);
}

function parseFrontmatter(markdown: string, sourceName: string) {
  const match = markdown.match(FRONTMATTER_RE);

  if (!match) {
    throw new Error(`Markdown blog post is missing frontmatter: ${sourceName}`);
  }

  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const index = trimmed.indexOf(":");
    if (index === -1) {
      throw new Error(`Invalid frontmatter line in ${sourceName}: ${line}`);
    }

    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1);
    data[key] = parseFrontmatterValue(value);
  }

  return {
    frontmatter: data as MarkdownFrontmatter,
    body: markdown.slice(match[0].length),
  };
}

function assertRequiredFrontmatter(
  frontmatter: MarkdownFrontmatter,
  sourceName: string
) {
  const required: Array<keyof MarkdownFrontmatter> = [
    "slug",
    "title",
    "description",
    "date",
    "category",
  ];

  for (const field of required) {
    if (!frontmatter[field]) {
      throw new Error(`Missing required frontmatter "${field}" in ${sourceName}`);
    }
  }
}

function getFilePath(file: FileWithRelativePath) {
  return normalizePath(file.webkitRelativePath || file.name);
}

function normalizePath(value: string) {
  const parts: string[] = [];

  for (const part of value.replace(/\\/g, "/").split("/")) {
    if (!part || part === ".") {
      continue;
    }

    if (part === "..") {
      parts.pop();
      continue;
    }

    parts.push(part);
  }

  return parts.join("/");
}

export function getPreviewDirname(filePath: string) {
  const normalized = normalizePath(filePath);
  const index = normalized.lastIndexOf("/");
  return index === -1 ? "" : normalized.slice(0, index);
}

function joinPath(baseDir: string, relativePath: string) {
  return normalizePath(baseDir ? `${baseDir}/${relativePath}` : relativePath);
}

function isExternalOrRootPath(value: string) {
  return (
    value.startsWith("/") ||
    value.startsWith("#") ||
    /^[a-z][a-z0-9+.-]*:/i.test(value)
  );
}

function splitAssetSuffix(value: string) {
  const match = value.match(/^([^?#]+)([?#].*)?$/);
  return {
    assetPath: match?.[1] || value,
    suffix: match?.[2] || "",
  };
}

function getEditorPublicAssetFallback(assetPath: string) {
  const normalized = normalizePath(
    assetPath.startsWith("/") ? assetPath.slice(1) : assetPath
  );

  return normalized === "thumbnail.jpg" ? "/thumbnail.jpg" : "";
}

function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) {
    return 1;
  }

  return Math.max(1, Math.ceil(text.split(" ").length / WORDS_PER_MINUTE));
}

export function makePreviewFileMap(files: File[]) {
  const map = new Map<string, File>();
  for (const file of files as FileWithRelativePath[]) {
    const filePath = getFilePath(file);
    map.set(filePath, file);
  }

  return map;
}

function makeObjectUrlResolver(
  assetContext: BlogPreviewAssetContext,
  objectUrls: string[],
  warnings: string[]
) {
  const objectUrlByPath = new Map<string, string>();
  const filesByPath = assetContext.filesByPath || new Map<string, File>();
  const baseDir = assetContext.baseDir || "";

  return (assetValue: string, options?: { required?: boolean }) => {
    if (!assetValue || isExternalOrRootPath(assetValue)) {
      return assetValue;
    }

    const { assetPath, suffix } = splitAssetSuffix(assetValue);
    const resolvedPath = joinPath(baseDir, assetPath);
    const file = filesByPath.get(resolvedPath);

    if (!file) {
      const publicFallback = getEditorPublicAssetFallback(assetPath);
      if (publicFallback) {
        return `${publicFallback}${suffix}`;
      }

      warnings.push(`Markdown blog asset not found: ${resolvedPath}`);
      return options?.required ? "" : assetValue;
    }

    let objectUrl = objectUrlByPath.get(resolvedPath);
    if (!objectUrl) {
      objectUrl = URL.createObjectURL(file);
      objectUrlByPath.set(resolvedPath, objectUrl);
      objectUrls.push(objectUrl);
    }

    return `${objectUrl}${suffix}`;
  };
}

function rewriteMarkdownBodyAssetUrls(
  body: string,
  resolveAssetUrl: (assetValue: string) => string
) {
  return body
    .replace(/(!?\[[^\]]*]\()([^)\s]+)(\))/g, (match, start, url, end) => {
      if (isExternalOrRootPath(url)) {
        return match;
      }

      return `${start}${resolveAssetUrl(url)}${end}`;
    })
    .replace(/\b(src|href)=["']([^"']+)["']/g, (match, attr, url) => {
      if (isExternalOrRootPath(url)) {
        return match;
      }

      return `${attr}="${resolveAssetUrl(url)}"`;
    });
}

function addDownloadAsset(
  assetsByPackagePath: Map<string, BlogPreviewDownloadAsset>,
  assetValue: string | undefined,
  assetContext: BlogPreviewAssetContext
) {
  if (!assetValue || assetValue.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(assetValue)) {
    return;
  }

  const filesByPath = assetContext.filesByPath || new Map<string, File>();
  const baseDir = assetContext.baseDir || "";
  const { assetPath } = splitAssetSuffix(assetValue);
  const isRootPath = assetPath.startsWith("/");
  const packagePath = normalizePath(isRootPath ? assetPath.slice(1) : assetPath);
  const sourcePath = isRootPath ? packagePath : joinPath(baseDir, assetPath);

  if (!packagePath) {
    return;
  }

  const file = filesByPath.get(sourcePath);

  if (!file) {
    const publicUrl = getEditorPublicAssetFallback(assetPath);
    if (!publicUrl) {
      return;
    }

    assetsByPackagePath.set(packagePath, {
      publicUrl,
      packagePath,
      sourcePath,
    });
    return;
  }

  assetsByPackagePath.set(packagePath, {
    file,
    packagePath,
    sourcePath,
  });
}

export function collectBlogPreviewDownloadAssets(
  markdown: string,
  assetContext: BlogPreviewAssetContext,
  sourceName = "blog-draft.md"
) {
  const assetsByPackagePath = new Map<string, BlogPreviewDownloadAsset>();
  let body = markdown;

  try {
    const parsed = parseFrontmatter(markdown, sourceName);
    body = parsed.body;
    addDownloadAsset(assetsByPackagePath, parsed.frontmatter.cover, assetContext);
  } catch {
    // Download should still work while the draft is structurally invalid.
  }

  body.replace(/!\[[^\]]*]\(\s*<?([^)\s>]+)>?(?:\s+["'][^)]*["'])?\s*\)/g, (
    _match,
    url: string
  ) => {
    addDownloadAsset(assetsByPackagePath, url, assetContext);
    return _match;
  });

  body.replace(/\bsrc=["']([^"']+)["']/g, (_match, url: string) => {
    addDownloadAsset(assetsByPackagePath, url, assetContext);
    return _match;
  });

  return Array.from(assetsByPackagePath.values()).sort((a, b) =>
    a.packagePath.localeCompare(b.packagePath)
  );
}

export function findPreviewMarkdownFiles(files: File[]) {
  return files
    .map((file) => getFilePath(file as FileWithRelativePath))
    .filter((filePath) => filePath.toLowerCase().endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));
}

export function parseBlogPreviewMarkdown(
  markdown: string,
  options?: {
    sourceName?: string;
    assetContext?: BlogPreviewAssetContext;
  }
): BlogPreviewParseResult {
  const sourceName = options?.sourceName || "blog-draft.md";
  const { frontmatter, body } = parseFrontmatter(markdown, sourceName);
  assertRequiredFrontmatter(frontmatter, sourceName);

  const date = new Date(frontmatter.date || "");
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid blog date "${frontmatter.date}" in ${sourceName}`);
  }

  const objectUrls: string[] = [];
  const warnings: string[] = [];

  try {
    const resolveAssetUrl = makeObjectUrlResolver(
      options?.assetContext || {},
      objectUrls,
      warnings
    );
    const coverImageUrl = frontmatter.cover
      ? resolveAssetUrl(frontmatter.cover, { required: true })
      : "";
    const rewrittenBody = rewriteMarkdownBodyAssetUrls(body, resolveAssetUrl);
    const html = markdownToHtml(rewrittenBody);

    return {
      objectUrls,
      warnings,
      frontmatter,
      post: {
        slug: frontmatter.slug || "blog-draft",
        title: frontmatter.title || "Blog Draft",
        description: frontmatter.description || "",
        html,
        displayTime: date.toISOString(),
        categoryName: frontmatter.category || "Announcements",
        authorName: frontmatter.author || "Orderly Network",
        coverImageUrl: coverImageUrl || undefined,
        readTime: estimateReadTime(html),
      },
    };
  } catch (error) {
    for (const objectUrl of objectUrls) {
      URL.revokeObjectURL(objectUrl);
    }

    throw error;
  }
}

export async function readPreviewMarkdownFile(
  files: File[],
  selectedMarkdownPath?: string
) {
  const markdownFiles = findPreviewMarkdownFiles(files);
  if (markdownFiles.length === 0) {
    throw new Error("No Markdown (.md) file found in the selected folder.");
  }

  const selectedPath = selectedMarkdownPath || markdownFiles[0];
  if (!markdownFiles.includes(selectedPath)) {
    throw new Error(`Selected Markdown file was not found: ${selectedPath}`);
  }

  const filesByPath = makePreviewFileMap(files);
  const markdownFile = filesByPath.get(selectedPath);
  if (!markdownFile) {
    throw new Error(`Selected Markdown file was not found: ${selectedPath}`);
  }

  return {
    markdown: await markdownFile.text(),
    markdownFiles,
    selectedMarkdownPath: selectedPath,
    filesByPath,
    baseDir: getPreviewDirname(selectedPath),
  };
}

export function getMarkdownDownloadFilename(
  markdown: string,
  fallbackFilename?: string
) {
  try {
    const { frontmatter } = parseFrontmatter(markdown, fallbackFilename || "blog-draft.md");
    if (frontmatter.slug) {
      return `${frontmatter.slug}.md`;
    }
  } catch {
    // Download should remain available even while the draft has parse errors.
  }

  if (fallbackFilename) {
    const basename = fallbackFilename.split("/").pop();
    if (basename?.toLowerCase().endsWith(".md")) {
      return basename;
    }
  }

  return "blog-draft.md";
}
