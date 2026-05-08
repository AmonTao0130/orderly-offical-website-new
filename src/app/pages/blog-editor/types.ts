import type { BlogPreviewParseResult } from "@/blog/preview";

export type PreviewState = {
  status: "loading" | "ready" | "error";
  error: string | null;
  warnings: string[];
  result: BlogPreviewParseResult | null;
};

export type EditorDraftState = {
  markdown: string;
  selectedMarkdownPath: string;
  updatedAt: number;
};

export type SlugSyncState = {
  lastAutoSlug: string;
  lastTitle: string;
  manualOverride: boolean;
  preservedSlug: string;
};

export type EditorSelection = {
  start: number;
  end: number;
};

export type EditorMarkdownChange = {
  markdown: string;
  selection?: EditorSelection;
};

export type EditorLayoutMode = "split" | "stack";

export type BlogMetadataField =
  | "slug"
  | "title"
  | "description"
  | "date"
  | "category"
  | "publicationState"
  | "author"
  | "cover"
  | "pin";

export type BlogMetadataFormValues = Record<BlogMetadataField, string>;

export type BlogEditorAsset = {
  file?: File;
  name: string;
  path: string;
  markdownPath: string;
  sizeLabel: string;
  typeLabel: string;
  isImage: boolean;
  isUsed: boolean;
  previewUrl?: string;
  publicUrl?: string;
};
