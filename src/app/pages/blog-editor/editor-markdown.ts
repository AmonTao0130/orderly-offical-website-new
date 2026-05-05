import { DEFAULT_BLOG_DRAFT_MARKDOWN } from "@/blog/preview";
import { slugifyTitle } from "@/blog/slug";
import blogConfig from "@/content/blog/config/blog.config.json";
import { BLOG_METADATA_FIELDS, EDITOR_FRONTMATTER_RE } from "./constants";
import type {
  BlogMetadataField,
  BlogMetadataFormValues,
  EditorMarkdownChange,
  EditorSelection,
  SlugSyncState,
} from "./types";

export const DEFAULT_EDITOR_MARKDOWN = normalizeEditorMarkdownAssetPaths(
  DEFAULT_BLOG_DRAFT_MARKDOWN
);

export function normalizeEditorMarkdownAssetPaths(markdown: string) {
  return markdown
    .replace(
      /^(cover:\s*)(["']?)\/thumbnail\.jpg\2(\s*)$/m,
      (_match, start: string, quote: string, end: string) =>
        `${start}${quote}./thumbnail.jpg${quote}${end}`
    )
    .replace(/(!\[[^\]]*]\()\s*\/thumbnail\.jpg(\s*\))/g, "$1./thumbnail.jpg$2")
    .replace(
      /\bsrc=(["'])\/thumbnail\.jpg\1/g,
      (_match, quote: string) => `src=${quote}./thumbnail.jpg${quote}`
    );
}

export function getEditorPublicAssetFallback(assetPath: string) {
  const normalized = normalizeEditorAssetPath(
    assetPath.startsWith("/") ? assetPath.slice(1) : assetPath
  );

  return normalized === "thumbnail.jpg" ? "/thumbnail.jpg" : "";
}

export function normalizeEditorAssetPath(value: string) {
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

export function joinEditorAssetPath(baseDir: string, relativePath: string) {
  return normalizeEditorAssetPath(
    baseDir ? `${baseDir}/${relativePath}` : relativePath
  );
}

export function isExternalOrRootEditorAssetPath(value: string) {
  return (
    value.startsWith("/") ||
    value.startsWith("#") ||
    /^[a-z][a-z0-9+.-]*:/i.test(value)
  );
}

export function splitEditorAssetSuffix(value: string) {
  const match = value.match(/^([^?#]+)([?#].*)?$/);
  return {
    assetPath: match?.[1] || value,
    suffix: match?.[2] || "",
  };
}

export function getUploadedAssetPath(
  fileName: string,
  filesByPath: Map<string, File>,
  baseDir: string
) {
  const normalizedName =
    normalizeEditorAssetPath(fileName).split("/").pop() || "asset";
  const dotIndex = normalizedName.lastIndexOf(".");
  const name =
    dotIndex > 0 ? normalizedName.slice(0, dotIndex) : normalizedName;
  const ext = dotIndex > 0 ? normalizedName.slice(dotIndex) : "";
  let index = 1;
  let candidateName = normalizedName;
  let candidatePath = joinEditorAssetPath(baseDir, candidateName);

  while (filesByPath.has(candidatePath)) {
    index += 1;
    candidateName = `${name}-${index}${ext}`;
    candidatePath = joinEditorAssetPath(baseDir, candidateName);
  }

  return candidatePath;
}

export function getMarkdownAssetPath(assetPath: string, baseDir: string) {
  const normalizedPath = normalizeEditorAssetPath(assetPath);
  if (baseDir && normalizedPath.startsWith(`${baseDir}/`)) {
    return `./${normalizedPath.slice(baseDir.length + 1)}`;
  }

  return `./${normalizedPath.split("/").pop() || normalizedPath}`;
}

export function getFileTypeLabel(file: File) {
  const ext = file.name.split(".").pop();
  if (ext && ext !== file.name) {
    return ext.slice(0, 5).toUpperCase();
  }

  return (file.type.split("/")[1] || file.type || "FILE")
    .slice(0, 5)
    .toUpperCase();
}

export function getFileSizeLabel(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 102.4) / 10} KB`;
  }

  return `${Math.round(size / (1024 * 102.4)) / 10} MB`;
}

export function collectReferencedAssetPaths(markdown: string, baseDir: string) {
  const referenced = new Set<string>();
  const addAsset = (url: string) => {
    if (!url || isExternalOrRootEditorAssetPath(url)) {
      return;
    }

    const { assetPath } = splitEditorAssetSuffix(url);
    referenced.add(joinEditorAssetPath(baseDir, assetPath));
  };

  markdown.replace(
    /!\[[^\]]*]\(\s*<?([^)\s>]+)>?(?:\s+["'][^)]*["'])?\s*\)/g,
    (_match, url: string) => {
      addAsset(url);
      return _match;
    }
  );

  markdown.replace(/\bsrc=["']([^"']+)["']/g, (_match, url: string) => {
    addAsset(url);
    return _match;
  });

  const cover = getEditorFrontmatterField(markdown, "cover");
  addAsset(cover);

  return referenced;
}

export function stripEditorFrontmatterQuotes(value: string) {
  return value.trim().replace(/^['"]|['"]$/g, "");
}

export function getEditorFrontmatterContent(markdown: string) {
  const match = markdown.match(EDITOR_FRONTMATTER_RE);
  return match ? match[1] : "";
}

export function getEditorFrontmatterFields(markdown: string) {
  const values: Record<string, string> = {};
  const content = getEditorFrontmatterContent(markdown);

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const field = trimmed.slice(0, separatorIndex).trim();
    values[field] = stripEditorFrontmatterQuotes(
      trimmed.slice(separatorIndex + 1)
    );
  }

  return values;
}

export function getEditorFrontmatterField(markdown: string, field: string) {
  return getEditorFrontmatterFields(markdown)[field] || "";
}

export function getEditorMetadataFormValues(markdown: string): BlogMetadataFormValues {
  const frontmatter = getEditorFrontmatterFields(markdown);

  return {
    slug: frontmatter.slug || "",
    title: frontmatter.title || "",
    description: frontmatter.description || "",
    date: frontmatter.date || "",
    category: frontmatter.category || "",
    publicationState:
      frontmatter.publicationState || blogConfig.defaultPublicationState,
    author: frontmatter.author || blogConfig.defaultAuthor,
    cover: frontmatter.cover || "",
    pin: frontmatter.pin || "false",
  };
}

export function escapeEditorFrontmatterString(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function formatEditorFrontmatterValue(field: BlogMetadataField, value: string) {
  if (field === "pin") {
    return value === "true" ? "true" : "false";
  }

  return `"${escapeEditorFrontmatterString(value)}"`;
}

export function makeEditorFrontmatterLine(field: BlogMetadataField, value: string) {
  return `${field}: ${formatEditorFrontmatterValue(field, value)}`;
}

export function replaceOrInsertEditorFrontmatterField(
  markdown: string,
  field: BlogMetadataField,
  value: string
) {
  const frontmatterMatch = markdown.match(EDITOR_FRONTMATTER_RE);
  const line = makeEditorFrontmatterLine(field, value);

  if (!frontmatterMatch) {
    return `---\n${line}\n---\n\n${markdown}`;
  }

  const frontmatterStart = frontmatterMatch.index || 0;
  const fullFrontmatter = frontmatterMatch[0];
  const content = frontmatterMatch[1];
  const contentStart = frontmatterStart + fullFrontmatter.indexOf(content);
  const escapedField = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const fieldMatch = content.match(
    new RegExp(`^(\\s*)${escapedField}\\s*:\\s*.*?(\\s*)$`, "m")
  );

  if (fieldMatch) {
    const replacementStart = contentStart + (fieldMatch.index || 0);
    const replacement = `${fieldMatch[1]}${line}${fieldMatch[2]}`;
    return `${markdown.slice(
      0,
      replacementStart
    )}${replacement}${markdown.slice(replacementStart + fieldMatch[0].length)}`;
  }

  const existingFields = BLOG_METADATA_FIELDS.filter(
    (candidate) =>
      candidate !== field &&
      new RegExp(`^\\s*${candidate}\\s*:`, "m").test(content)
  );
  const fieldIndex = BLOG_METADATA_FIELDS.indexOf(field);
  const previousField = existingFields
    .filter((candidate) => BLOG_METADATA_FIELDS.indexOf(candidate) < fieldIndex)
    .pop();

  if (previousField) {
    const previousMatch = content.match(
      new RegExp(`^\\s*${previousField}\\s*:.*?$`, "m")
    );
    if (previousMatch) {
      const insertionStart =
        contentStart + (previousMatch.index || 0) + previousMatch[0].length;
      return `${markdown.slice(0, insertionStart)}\n${line}${markdown.slice(
        insertionStart
      )}`;
    }
  }

  return `${markdown.slice(0, contentStart)}${line}\n${markdown.slice(
    contentStart
  )}`;
}

export function adjustSelectionForReplacement(
  selection: EditorSelection | undefined,
  replacementStart: number,
  replacedLength: number,
  replacementLength: number
) {
  if (!selection) {
    return undefined;
  }

  const replacementEnd = replacementStart + replacedLength;
  const delta = replacementLength - replacedLength;
  const adjustPosition = (position: number) => {
    if (position > replacementEnd) {
      return position + delta;
    }

    if (position >= replacementStart) {
      return replacementStart + replacementLength;
    }

    return position;
  };

  return {
    start: adjustPosition(selection.start),
    end: adjustPosition(selection.end),
  };
}

export function replaceOrInsertEditorSlug(
  markdown: string,
  slug: string,
  selection?: EditorSelection
): EditorMarkdownChange {
  const frontmatterMatch = markdown.match(EDITOR_FRONTMATTER_RE);
  if (!frontmatterMatch) {
    return { markdown, selection };
  }

  const frontmatterStart = frontmatterMatch.index || 0;
  const fullFrontmatter = frontmatterMatch[0];
  const content = frontmatterMatch[1];
  const contentStart = frontmatterStart + fullFrontmatter.indexOf(content);
  const slugMatch = content.match(/^(\s*slug\s*:\s*)(.*?)(\s*)$/m);

  if (slugMatch) {
    const replacementStart = contentStart + (slugMatch.index || 0);
    const replacement = `${slugMatch[1]}"${slug}"${slugMatch[3]}`;
    return {
      markdown: `${markdown.slice(
        0,
        replacementStart
      )}${replacement}${markdown.slice(
        replacementStart + slugMatch[0].length
      )}`,
      selection: adjustSelectionForReplacement(
        selection,
        replacementStart,
        slugMatch[0].length,
        replacement.length
      ),
    };
  }

  const insertion = `slug: "${slug}"\n`;
  return {
    markdown: `${markdown.slice(0, contentStart)}${insertion}${markdown.slice(
      contentStart
    )}`,
    selection: adjustSelectionForReplacement(
      selection,
      contentStart,
      0,
      insertion.length
    ),
  };
}

export function getInitialSlugSyncState(markdown: string): SlugSyncState {
  return {
    lastAutoSlug: getEditorFrontmatterField(markdown, "slug"),
    lastTitle: getEditorFrontmatterField(markdown, "title"),
    manualOverride: false,
    preservedSlug: "",
  };
}

export function isValidBlogSlug(slug: string) {
  return slug === slugifyTitle(slug) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
