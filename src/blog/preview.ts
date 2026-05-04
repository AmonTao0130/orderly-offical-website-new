import { markdownToHtml } from "./markdown";
import type { BlogPost } from "./types";

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const WORDS_PER_MINUTE = 220;

type MarkdownFrontmatter = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  publicationState?: string;
  author?: string;
  cover: string;
  pin?: boolean;
};

export type BlogPreviewResult = {
  post: BlogPost;
  objectUrls: string[];
  markdownFiles: string[];
  selectedMarkdownPath: string;
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

function parseFrontmatter(markdown: string, filePath: string) {
  const match = markdown.match(FRONTMATTER_RE);

  if (!match) {
    throw new Error(`Markdown blog post is missing frontmatter: ${filePath}`);
  }

  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const index = trimmed.indexOf(":");
    if (index === -1) {
      throw new Error(`Invalid frontmatter line in ${filePath}: ${line}`);
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
  filePath: string
) {
  const required: Array<keyof MarkdownFrontmatter> = [
    "slug",
    "title",
    "description",
    "date",
    "category",
    "cover",
  ];

  for (const field of required) {
    if (!frontmatter[field]) {
      throw new Error(`Missing required frontmatter "${field}" in ${filePath}`);
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

function getDirname(filePath: string) {
  const index = filePath.lastIndexOf("/");
  return index === -1 ? "" : filePath.slice(0, index);
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

function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) {
    return 1;
  }

  return Math.max(1, Math.ceil(text.split(" ").length / WORDS_PER_MINUTE));
}

function makeFileMap(files: FileWithRelativePath[]) {
  const map = new Map<string, File>();
  for (const file of files) {
    const filePath = getFilePath(file);
    map.set(filePath, file);
  }

  return map;
}

function makeObjectUrlResolver(
  filesByPath: Map<string, File>,
  baseDir: string,
  objectUrls: string[]
) {
  const objectUrlByPath = new Map<string, string>();

  return (assetValue: string) => {
    if (isExternalOrRootPath(assetValue)) {
      return assetValue;
    }

    const { assetPath, suffix } = splitAssetSuffix(assetValue);
    const resolvedPath = joinPath(baseDir, assetPath);
    const file = filesByPath.get(resolvedPath);

    if (!file) {
      throw new Error(`Markdown blog asset not found: ${resolvedPath}`);
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

export function findPreviewMarkdownFiles(files: File[]) {
  return files
    .map((file) => getFilePath(file as FileWithRelativePath))
    .filter((filePath) => filePath.toLowerCase().endsWith(".md"))
    .sort((a, b) => a.localeCompare(b));
}

export async function parseBlogPreviewFolder(
  files: File[],
  selectedMarkdownPath?: string
): Promise<BlogPreviewResult> {
  const inputFiles = files as FileWithRelativePath[];
  const markdownFiles = findPreviewMarkdownFiles(files);
  if (markdownFiles.length === 0) {
    throw new Error("No Markdown (.md) file found in the selected folder.");
  }

  const selectedPath = selectedMarkdownPath || markdownFiles[0];
  if (!markdownFiles.includes(selectedPath)) {
    throw new Error(`Selected Markdown file was not found: ${selectedPath}`);
  }

  const filesByPath = makeFileMap(inputFiles);
  const markdownFile = filesByPath.get(selectedPath);
  if (!markdownFile) {
    throw new Error(`Selected Markdown file was not found: ${selectedPath}`);
  }

  const markdown = await markdownFile.text();
  const { frontmatter, body } = parseFrontmatter(markdown, selectedPath);
  assertRequiredFrontmatter(frontmatter, selectedPath);

  const date = new Date(frontmatter.date);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid blog date "${frontmatter.date}" in ${selectedPath}`);
  }

  const objectUrls: string[] = [];

  try {
    const baseDir = getDirname(selectedPath);
    const resolveAssetUrl = makeObjectUrlResolver(filesByPath, baseDir, objectUrls);
    const coverImageUrl = resolveAssetUrl(frontmatter.cover);
    const rewrittenBody = rewriteMarkdownBodyAssetUrls(body, resolveAssetUrl);
    const html = markdownToHtml(rewrittenBody);

    return {
      markdownFiles,
      selectedMarkdownPath: selectedPath,
      objectUrls,
      post: {
        slug: frontmatter.slug,
        title: frontmatter.title,
        description: frontmatter.description,
        html,
        displayTime: date.toISOString(),
        categoryName: frontmatter.category,
        authorName: frontmatter.author || "Orderly Network",
        coverImageUrl,
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
