import {
  BLOG_EDITOR_DRAFT_STORAGE_KEY,
  BLOG_EDITOR_LAYOUT_STORAGE_KEY,
} from "./constants";
import { normalizeEditorMarkdownAssetPaths } from "./editor-markdown";
import type { EditorDraftState, EditorLayoutMode } from "./types";

export function readEditorDraftState(): EditorDraftState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawDraft = window.localStorage.getItem(BLOG_EDITOR_DRAFT_STORAGE_KEY);
    if (!rawDraft) {
      return null;
    }

    const draft = JSON.parse(rawDraft) as Partial<EditorDraftState>;
    if (typeof draft.markdown !== "string") {
      return null;
    }

    return {
      markdown: normalizeEditorMarkdownAssetPaths(draft.markdown),
      selectedMarkdownPath:
        typeof draft.selectedMarkdownPath === "string"
          ? draft.selectedMarkdownPath
          : "",
      updatedAt: typeof draft.updatedAt === "number" ? draft.updatedAt : 0,
    };
  } catch {
    return null;
  }
}

export function saveEditorDraftState(markdown: string, selectedMarkdownPath: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const draft: EditorDraftState = {
      markdown,
      selectedMarkdownPath,
      updatedAt: Date.now(),
    };
    window.localStorage.setItem(
      BLOG_EDITOR_DRAFT_STORAGE_KEY,
      JSON.stringify(draft)
    );
  } catch {
    // Browsers can block storage; editing should continue without persistence.
  }
}

export function readEditorLayoutPreference(): EditorLayoutMode {
  if (typeof window === "undefined") {
    return "split";
  }

  try {
    const storedLayout = window.localStorage.getItem(
      BLOG_EDITOR_LAYOUT_STORAGE_KEY
    );
    return storedLayout === "stack" || storedLayout === "split"
      ? storedLayout
      : "split";
  } catch {
    return "split";
  }
}

export function saveEditorLayoutPreference(layout: EditorLayoutMode) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(BLOG_EDITOR_LAYOUT_STORAGE_KEY, layout);
  } catch {
    // The layout should still switch even when storage is unavailable.
  }
}
