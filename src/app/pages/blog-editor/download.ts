import { strToU8, zipSync, type Zippable } from "fflate";
import {
  collectBlogPreviewDownloadAssets,
  getMarkdownDownloadFilename,
  parseBlogPreviewMarkdown,
  type BlogPreviewAssetContext,
} from "@/blog/preview";
import {
  getEditorFrontmatterField,
  isValidBlogSlug,
  normalizeEditorMarkdownAssetPaths,
} from "./editor-markdown";

export type DownloadPlan = {
  packageName: string;
  markdownFilename: string;
};

async function fetchPublicAsset(publicUrl?: string) {
  if (!publicUrl) {
    throw new Error("Download package asset is missing a file source.");
  }

  const response = await fetch(publicUrl);
  if (!response.ok) {
    throw new Error(`Unable to read public asset: ${publicUrl}`);
  }

  return new Uint8Array(await response.arrayBuffer());
}

export function getDownloadPlan(
  markdown: string,
  selectedMarkdownPath: string
): DownloadPlan {
  const markdownFilename = getMarkdownDownloadFilename(
    markdown,
    selectedMarkdownPath
  );
  const packageName =
    markdownFilename.replace(/\.md$/i, "").replace(/[\\/:*?"<>|]+/g, "-") ||
    "blog-draft";

  return {
    markdownFilename,
    packageName,
  };
}

export function getDownloadBlockers({
  markdown,
  selectedMarkdownPath,
  downloadPlan,
  assetContext,
  isCurrentSlugDuplicate,
  isPreservedHistoricalSlug,
}: {
  markdown: string;
  selectedMarkdownPath: string;
  downloadPlan: DownloadPlan;
  assetContext: BlogPreviewAssetContext;
  isCurrentSlugDuplicate: boolean;
  isPreservedHistoricalSlug: boolean;
}) {
  const blockers: string[] = [];
  const slug = getEditorFrontmatterField(markdown, "slug");
  const cover = getEditorFrontmatterField(markdown, "cover");

  try {
    const result = parseBlogPreviewMarkdown(markdown, {
      sourceName: selectedMarkdownPath || downloadPlan.markdownFilename,
      assetContext,
    });
    for (const warning of result.warnings) {
      if (warning.includes("asset not found")) {
        blockers.push(warning);
      }
    }
  } catch (error) {
    blockers.push(
      error instanceof Error
        ? error.message
        : "Unable to parse selected blog draft."
    );
  }

  if (!slug) {
    blockers.push('Missing required frontmatter "slug".');
  } else if (!isValidBlogSlug(slug)) {
    blockers.push(
      `Slug "${slug}" is not URL-safe. Use lowercase letters, numbers, and hyphens only.`
    );
  }

  if (isCurrentSlugDuplicate && !isPreservedHistoricalSlug) {
    blockers.push(
      `Slug "${slug}" already exists in historical blog posts. Please choose a unique slug before downloading.`
    );
  }

  if (!cover) {
    blockers.push('Missing required frontmatter "cover".');
  }

  return Array.from(new Set(blockers));
}

export async function downloadBlogEditorZip({
  markdown,
  selectedMarkdownPath,
  assetContext,
  downloadPlan,
}: {
  markdown: string;
  selectedMarkdownPath: string;
  assetContext: BlogPreviewAssetContext;
  downloadPlan: DownloadPlan;
}) {
  const { markdownFilename, packageName } = downloadPlan;
  const sourceName = selectedMarkdownPath || markdownFilename;
  const assets = collectBlogPreviewDownloadAssets(
    markdown,
    assetContext,
    sourceName
  );
  const packageMarkdown = normalizeEditorMarkdownAssetPaths(markdown);
  const zipEntries: Zippable = {
    [`${packageName}/${markdownFilename}`]: strToU8(packageMarkdown),
  };

  for (const asset of assets) {
    const bytes = asset.file
      ? new Uint8Array(await asset.file.arrayBuffer())
      : await fetchPublicAsset(asset.publicUrl);
    zipEntries[`${packageName}/${asset.packagePath}`] = [
      bytes,
      {
        level: 0,
        mtime: asset.file ? new Date(asset.file.lastModified) : new Date(),
      },
    ];
  }

  const zipped = zipSync(zipEntries, {
    level: 6,
    mtime: new Date(),
  });
  const zipBuffer = new ArrayBuffer(zipped.byteLength);
  new Uint8Array(zipBuffer).set(zipped);
  const blob = new Blob([zipBuffer], { type: "application/zip" });
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = `${packageName}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}
