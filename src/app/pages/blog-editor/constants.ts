import blogConfig from "@/content/blog/config/blog.config.json";
import type { BlogMetadataField } from "./types";

export const BLOG_EDITOR_DRAFT_STORAGE_KEY = "orderly_blog_editor_draft_v1";
export const BLOG_EDITOR_LAYOUT_STORAGE_KEY = "orderly_blog_editor_layout_v1";
export const BLOG_EDITOR_SPLIT_MIN_WIDTH = 1024;
export const BLOG_EDITOR_CONTENT_MAX_WIDTH = 740;
export const BLOG_EDITOR_SPLIT_GAP = 18;
export const BLOG_EDITOR_SCROLLBAR_WIDTH = 10;
export const EDITOR_FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;
export const PREVIEW_PARSE_DEBOUNCE_MS = 180;
export const DRAFT_SAVE_DEBOUNCE_MS = 500;
export const BLOG_DESCRIPTION_MAX_LENGTH =
  typeof blogConfig.descriptionMaxLength === "number"
    ? blogConfig.descriptionMaxLength
    : 80;
export const BLOG_PUBLICATION_STATES = ["live", "preview"];
export const BLOG_METADATA_FIELDS: BlogMetadataField[] = [
  "slug",
  "title",
  "description",
  "date",
  "category",
  "publicationState",
  "author",
  "cover",
  "pin",
];
