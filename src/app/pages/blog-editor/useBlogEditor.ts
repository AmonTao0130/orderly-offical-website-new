import { type ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  findPreviewMarkdownFiles,
  makePreviewFileMap,
  parseBlogPreviewMarkdown,
  readPreviewMarkdownFile,
  type BlogPreviewAssetContext,
} from "@/blog/preview";
import { makeUniqueSlug } from "@/blog/slug";
import {
  BLOG_EDITOR_CONTENT_MAX_WIDTH,
  BLOG_EDITOR_SCROLLBAR_WIDTH,
  BLOG_EDITOR_SPLIT_GAP,
  BLOG_EDITOR_SPLIT_MIN_WIDTH,
  BLOG_DESCRIPTION_MAX_LENGTH,
  DRAFT_SAVE_DEBOUNCE_MS,
  PREVIEW_PARSE_DEBOUNCE_MS,
} from "./constants";
import {
  downloadBlogEditorZip,
  getDownloadBlockers,
  getDownloadPlan,
} from "./download";
import {
  collectReferencedAssetPaths,
  DEFAULT_EDITOR_MARKDOWN,
  getEditorFrontmatterField,
  getEditorMetadataFormValues,
  getEditorPublicAssetFallback,
  getFileSizeLabel,
  getFileTypeLabel,
  getInitialSlugSyncState,
  getMarkdownAssetPath,
  getUploadedAssetPath,
  isValidBlogSlug,
  normalizeEditorMarkdownAssetPaths,
  replaceOrInsertEditorFrontmatterField,
  replaceOrInsertEditorSlug,
} from "./editor-markdown";
import {
  readEditorDraftState,
  readEditorLayoutPreference,
  saveEditorDraftState,
  saveEditorLayoutPreference,
} from "./storage";
import type {
  BlogEditorAsset,
  BlogMetadataField,
  EditorLayoutMode,
  EditorMarkdownChange,
  EditorSelection,
  PreviewState,
  SlugSyncState,
} from "./types";

export function useBlogEditor() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedMarkdownPath, setSelectedMarkdownPath] = useState("");
  const [markdown, setMarkdown] = useState(DEFAULT_EDITOR_MARKDOWN);
  const [previewMarkdown, setPreviewMarkdown] = useState(
    DEFAULT_EDITOR_MARKDOWN
  );
  const [selectionToRestore, setSelectionToRestore] =
    useState<EditorSelection | null>(null);
  const [toolbarHeight, setToolbarHeight] = useState(62);
  const [assetContext, setAssetContext] = useState<BlogPreviewAssetContext>({});
  const [existingSlugs, setExistingSlugs] = useState<string[]>([]);
  const [slugLoadWarning, setSlugLoadWarning] = useState("");
  const [slugSyncVersion, setSlugSyncVersion] = useState(0);
  const [copyAssetWarning, setCopyAssetWarning] = useState("");
  const [copiedAssetPath, setCopiedAssetPath] = useState("");
  const [layoutPreference, setLayoutPreference] =
    useState<EditorLayoutMode>("split");
  const [canUseSplitLayout, setCanUseSplitLayout] = useState(true);
  const [isAssetsCollapsed, setIsAssetsCollapsed] = useState(true);
  const [isMetadataCollapsed, setIsMetadataCollapsed] = useState(false);
  const [hasEditedCurrentDraft, setHasEditedCurrentDraft] = useState(false);
  const [state, setState] = useState<PreviewState>({
    status: "loading",
    error: null,
    warnings: [],
    result: null,
  });
  const [isDraftReady, setIsDraftReady] = useState(false);
  const objectUrlsRef = useRef<string[]>([]);
  const assetPreviewUrlsRef = useRef<Map<string, string>>(new Map());
  const loadedSourceSlugRef = useRef("");
  const slugSyncRef = useRef<SlugSyncState>(
    getInitialSlugSyncState(DEFAULT_EDITOR_MARKDOWN)
  );

  const markdownFiles = useMemo(() => findPreviewMarkdownFiles(files), [files]);
  const currentSlug = getEditorFrontmatterField(markdown, "slug");
  const preservedSlug = slugSyncRef.current.preservedSlug;
  const isPreservedHistoricalSlug =
    Boolean(currentSlug) &&
    Boolean(preservedSlug) &&
    currentSlug.toLowerCase() === preservedSlug.toLowerCase();
  const isCurrentSlugDuplicate =
    Boolean(currentSlug) &&
    existingSlugs.some(
      (slug) => slug.toLowerCase() === currentSlug.toLowerCase()
    );
  const isCurrentSlugInvalid =
    Boolean(currentSlug) && !isValidBlogSlug(currentSlug);
  const downloadPlan = useMemo(
    () => getDownloadPlan(markdown, selectedMarkdownPath),
    [markdown, selectedMarkdownPath]
  );
  const metadataValues = useMemo(
    () => getEditorMetadataFormValues(markdown),
    [markdown]
  );
  const slugFormatWarning =
    currentSlug && isCurrentSlugInvalid
      ? `Slug "${currentSlug}" is not URL-safe. Use lowercase letters, numbers, and hyphens only.`
      : "";
  const duplicateSlugWarning = useMemo(() => {
    if (!currentSlug || !isCurrentSlugDuplicate || isPreservedHistoricalSlug) {
      return "";
    }

    return `Slug "${currentSlug}" already exists in historical blog posts. Please choose a unique slug before publishing.`;
  }, [
    currentSlug,
    isCurrentSlugDuplicate,
    isPreservedHistoricalSlug,
    slugSyncVersion,
  ]);
  const slugInputError = slugFormatWarning || duplicateSlugWarning;
  const descriptionInputError =
    metadataValues.description.length > BLOG_DESCRIPTION_MAX_LENGTH
      ? `Description is ${metadataValues.description.length} characters; max is ${BLOG_DESCRIPTION_MAX_LENGTH}.`
      : "";
  const toolbarWarnings = useMemo(
    () =>
      [...state.warnings, slugLoadWarning, copyAssetWarning].filter(Boolean),
    [copyAssetWarning, slugLoadWarning, state.warnings]
  );
  const [assetPreviewVersion, setAssetPreviewVersion] = useState(0);

  useEffect(() => {
    const filesByPath = assetContext.filesByPath || new Map<string, File>();
    let didChangePreviewUrls = false;

    for (const [path, objectUrl] of assetPreviewUrlsRef.current.entries()) {
      if (!filesByPath.has(path)) {
        URL.revokeObjectURL(objectUrl);
        assetPreviewUrlsRef.current.delete(path);
        didChangePreviewUrls = true;
      }
    }

    for (const [path, file] of filesByPath.entries()) {
      if (
        path.toLowerCase().endsWith(".md") ||
        !file.type.startsWith("image/") ||
        assetPreviewUrlsRef.current.has(path)
      ) {
        continue;
      }

      assetPreviewUrlsRef.current.set(path, URL.createObjectURL(file));
      didChangePreviewUrls = true;
    }

    if (didChangePreviewUrls) {
      setAssetPreviewVersion((version) => version + 1);
    }
  }, [assetContext]);

  const editorAssets = useMemo(() => {
    const filesByPath = assetContext.filesByPath || new Map<string, File>();
    const baseDir = assetContext.baseDir || "";
    const referencedAssetPaths = collectReferencedAssetPaths(markdown, baseDir);
    const localAssets = Array.from(filesByPath.entries())
      .filter(([path]) => !path.toLowerCase().endsWith(".md"))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, file]) => {
        const isImage = file.type.startsWith("image/");
        const previewUrl = isImage
          ? assetPreviewUrlsRef.current.get(path)
          : undefined;

        return {
          file,
          name: file.name,
          path,
          markdownPath: getMarkdownAssetPath(path, baseDir),
          sizeLabel: getFileSizeLabel(file.size),
          typeLabel: getFileTypeLabel(file),
          isImage,
          isUsed: referencedAssetPaths.has(path),
          previewUrl,
        };
      });

    const fallbackAssets = Array.from(referencedAssetPaths).reduce<
      BlogEditorAsset[]
    >((assets, path) => {
      if (filesByPath.has(path)) {
        return assets;
      }

      const publicUrl = getEditorPublicAssetFallback(path);
      if (!publicUrl) {
        return assets;
      }

      assets.push({
        name: path.split("/").pop() || path,
        path,
        markdownPath: getMarkdownAssetPath(path, baseDir),
        sizeLabel: "public",
        typeLabel: "IMG",
        isImage: true,
        isUsed: true,
        previewUrl: publicUrl,
        publicUrl,
      });

      return assets;
    }, []);

    return [...localAssets, ...fallbackAssets].sort((a, b) =>
      a.path.localeCompare(b.path)
    );
  }, [assetContext, assetPreviewVersion, markdown]);

  function resetSlugSync(
    nextMarkdown: string,
    options?: { preserveCurrentSlug?: boolean }
  ) {
    slugSyncRef.current = getInitialSlugSyncState(nextMarkdown);
    if (options?.preserveCurrentSlug) {
      const currentSlug = getEditorFrontmatterField(nextMarkdown, "slug");
      loadedSourceSlugRef.current = currentSlug;
      slugSyncRef.current.manualOverride = true;
      slugSyncRef.current.preservedSlug = currentSlug;
    }
    setSlugSyncVersion((version) => version + 1);
    setSelectionToRestore(null);
  }

  function clearAssetPreviewUrls() {
    for (const objectUrl of assetPreviewUrlsRef.current.values()) {
      URL.revokeObjectURL(objectUrl);
    }
    assetPreviewUrlsRef.current.clear();
  }

  function applyTitleSlugSync(
    nextMarkdown: string,
    options?: { force?: boolean; selection?: EditorSelection }
  ): EditorMarkdownChange {
    const title = getEditorFrontmatterField(nextMarkdown, "title");
    if (!title) {
      return { markdown: nextMarkdown, selection: options?.selection };
    }

    const currentSlug = getEditorFrontmatterField(nextMarkdown, "slug");
    const syncState = slugSyncRef.current;
    const titleChanged = title !== syncState.lastTitle;
    if (
      currentSlug &&
      syncState.lastAutoSlug &&
      currentSlug !== syncState.lastAutoSlug
    ) {
      syncState.manualOverride = true;
      if (syncState.preservedSlug !== currentSlug) {
        syncState.preservedSlug = "";
      }
      syncState.lastTitle = title;
      return { markdown: nextMarkdown, selection: options?.selection };
    }

    if (syncState.manualOverride) {
      if (syncState.preservedSlug !== currentSlug) {
        syncState.preservedSlug = "";
      }
      syncState.lastTitle = title;
      return { markdown: nextMarkdown, selection: options?.selection };
    }

    if (!titleChanged && !options?.force) {
      return { markdown: nextMarkdown, selection: options?.selection };
    }

    const nextSlug = makeUniqueSlug(title, existingSlugs);
    syncState.lastAutoSlug = nextSlug;
    syncState.lastTitle = title;
    syncState.preservedSlug = "";

    if (currentSlug === nextSlug) {
      return { markdown: nextMarkdown, selection: options?.selection };
    }

    return replaceOrInsertEditorSlug(
      nextMarkdown,
      nextSlug,
      options?.selection
    );
  }

  useEffect(() => {
    const draft = readEditorDraftState();
    setLayoutPreference(readEditorLayoutPreference());
    if (draft) {
      setMarkdown(draft.markdown);
      setPreviewMarkdown(draft.markdown);
      setSelectedMarkdownPath(draft.selectedMarkdownPath);
      setHasEditedCurrentDraft(
        draft.markdown !== DEFAULT_EDITOR_MARKDOWN ||
          Boolean(draft.selectedMarkdownPath)
      );
      resetSlugSync(draft.markdown);
    }
    setIsDraftReady(true);
  }, []);

  useEffect(() => {
    const query = window.matchMedia(
      `(min-width: ${BLOG_EDITOR_SPLIT_MIN_WIDTH}px)`
    );
    const updateCanUseSplitLayout = () => {
      setCanUseSplitLayout(query.matches);
    };

    updateCanUseSplitLayout();
    query.addEventListener("change", updateCanUseSplitLayout);

    return () => {
      query.removeEventListener("change", updateCanUseSplitLayout);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadExistingSlugs() {
      try {
        const response = await fetch("/api/blog/editor/slugs", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Unable to load existing blog slugs.");
        }

        const payload = (await response.json()) as { slugs?: unknown };
        const slugs = Array.isArray(payload.slugs)
          ? payload.slugs.filter(
              (slug): slug is string => typeof slug === "string"
            )
          : [];

        if (isMounted) {
          setExistingSlugs(slugs);
          setSlugLoadWarning("");
        }
      } catch {
        if (isMounted) {
          setSlugLoadWarning(
            "Unable to load existing blog slugs. Generated slugs may need a duplicate check before publishing."
          );
        }
      }
    }

    loadExistingSlugs();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setState((current) => ({
      ...current,
      status: "loading",
      error: null,
    }));

    const timeout = window.setTimeout(() => {
      setPreviewMarkdown(markdown);
    }, PREVIEW_PARSE_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [markdown]);

  useEffect(() => {
    return () => {
      for (const objectUrl of objectUrlsRef.current) {
        URL.revokeObjectURL(objectUrl);
      }
      for (const objectUrl of assetPreviewUrlsRef.current.values()) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);


  useEffect(() => {
    for (const objectUrl of objectUrlsRef.current) {
      URL.revokeObjectURL(objectUrl);
    }
    objectUrlsRef.current = [];

    setState((current) => ({
      ...current,
      status: "loading",
      error: null,
      warnings: [],
    }));

    try {
      const result = parseBlogPreviewMarkdown(previewMarkdown, {
        sourceName: selectedMarkdownPath || "blog-draft.md",
        assetContext,
      });
      objectUrlsRef.current = result.objectUrls;
      setState({
        status: "ready",
        error: null,
        warnings: result.warnings,
        result,
      });
    } catch (error) {
      setState((current) => ({
        status: "error",
        error:
          error instanceof Error
            ? error.message
            : "Unable to parse selected blog draft.",
        warnings: [],
        result: current.result,
      }));
    }
  }, [assetContext, previewMarkdown, selectedMarkdownPath]);

  useEffect(() => {
    if (!isDraftReady) {
      return;
    }

    const timeout = window.setTimeout(() => {
      saveEditorDraftState(markdown, selectedMarkdownPath);
    }, DRAFT_SAVE_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [isDraftReady, markdown, selectedMarkdownPath]);

  async function loadMarkdownFromFiles(
    nextFiles: File[],
    markdownPath?: string
  ) {
    const loaded = await readPreviewMarkdownFile(nextFiles, markdownPath);
    const normalizedMarkdown = normalizeEditorMarkdownAssetPaths(
      loaded.markdown
    );
    clearAssetPreviewUrls();
    resetSlugSync(normalizedMarkdown, { preserveCurrentSlug: true });
    setMarkdown(normalizedMarkdown);
    setPreviewMarkdown(normalizedMarkdown);
    setSelectedMarkdownPath(loaded.selectedMarkdownPath);
    setHasEditedCurrentDraft(false);
    setAssetContext({
      filesByPath: loaded.filesByPath,
      baseDir: loaded.baseDir,
    });
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFiles = Array.from(event.target.files || []);
    event.target.value = "";
    setFiles(nextFiles);

    if (nextFiles.length === 0) {
      return;
    }

    try {
      await loadMarkdownFromFiles(nextFiles);
      setCopyAssetWarning("");
      setCopiedAssetPath("");
    } catch (error) {
      loadedSourceSlugRef.current = "";
      clearAssetPreviewUrls();
      setCopyAssetWarning("");
      setCopiedAssetPath("");
      setAssetContext({
        filesByPath: makePreviewFileMap(nextFiles),
        baseDir: "",
      });
      setSelectedMarkdownPath("");
      setState((current) => ({
        status: "error",
        error:
          error instanceof Error
            ? error.message
            : "Unable to read selected blog folder.",
        warnings: [],
        result: current.result,
      }));
    }
  }

  async function handleMarkdownChange(markdownPath: string) {
    setSelectedMarkdownPath(markdownPath);

    try {
      await loadMarkdownFromFiles(files, markdownPath);
      setCopyAssetWarning("");
      setCopiedAssetPath("");
    } catch (error) {
      setState((current) => ({
        status: "error",
        error:
          error instanceof Error
            ? error.message
            : "Unable to read selected Markdown file.",
        warnings: [],
        result: current.result,
      }));
    }
  }

  function handleAssetUpload(event: ChangeEvent<HTMLInputElement>) {
    const uploadedFiles = Array.from(event.target.files || []);
    event.target.value = "";
    if (uploadedFiles.length === 0) {
      return;
    }

    const editableFiles = uploadedFiles.filter(
      (file) => !file.name.toLowerCase().endsWith(".md")
    );
    if (editableFiles.length === 0) {
      return;
    }

    setHasEditedCurrentDraft(true);
    setAssetContext((currentContext) => {
      const baseDir = currentContext.baseDir || "";
      const filesByPath = new Map(
        currentContext.filesByPath || new Map<string, File>()
      );
      for (const file of editableFiles) {
        const assetPath = getUploadedAssetPath(file.name, filesByPath, baseDir);
        filesByPath.set(assetPath, file);
      }

      return {
        ...currentContext,
        filesByPath,
        baseDir,
      };
    });
  }

  async function handleCopyAssetPath(asset: BlogEditorAsset) {
    setCopyAssetWarning("");
    try {
      await navigator.clipboard.writeText(asset.markdownPath);
      setCopiedAssetPath(asset.path);
      window.setTimeout(() => {
        setCopiedAssetPath((currentPath) =>
          currentPath === asset.path ? "" : currentPath
        );
      }, 1400);
    } catch {
      setCopyAssetWarning(
        `Unable to copy ${asset.markdownPath}. Select the path manually.`
      );
    }
  }

  function handleMetadataChange(field: BlogMetadataField, value: string) {
    setSelectionToRestore(null);
    setHasEditedCurrentDraft(true);

    if (field === "slug") {
      slugSyncRef.current.manualOverride = true;
      slugSyncRef.current.lastAutoSlug = value;
      slugSyncRef.current.preservedSlug =
        value && value === loadedSourceSlugRef.current ? value : "";
      setSlugSyncVersion((version) => version + 1);
    }

    setMarkdown((currentMarkdown) => {
      const nextMarkdown = normalizeEditorMarkdownAssetPaths(
        replaceOrInsertEditorFrontmatterField(currentMarkdown, field, value)
      );

      return nextMarkdown;
    });
  }

  function handleNewDraft() {
    setFiles([]);
    setSelectedMarkdownPath("");
    setAssetContext({});
    clearAssetPreviewUrls();
    setCopyAssetWarning("");
    setCopiedAssetPath("");
    loadedSourceSlugRef.current = "";
    resetSlugSync(DEFAULT_EDITOR_MARKDOWN);
    setMarkdown(DEFAULT_EDITOR_MARKDOWN);
    setPreviewMarkdown(DEFAULT_EDITOR_MARKDOWN);
    setHasEditedCurrentDraft(false);
    saveEditorDraftState(DEFAULT_EDITOR_MARKDOWN, "");
  }

  function handleRegenerateSlug() {
    setHasEditedCurrentDraft(true);
    slugSyncRef.current.manualOverride = false;
    slugSyncRef.current.preservedSlug = "";
    const change = applyTitleSlugSync(markdown, { force: true });
    setSelectionToRestore(null);
    setSlugSyncVersion((version) => version + 1);
    setMarkdown(change.markdown);
  }

  function handleLayoutChange(layout: EditorLayoutMode) {
    if (layout === "split" && !canUseSplitLayout) {
      return;
    }

    setLayoutPreference(layout);
    saveEditorLayoutPreference(layout);
  }

  async function handleDownload() {
    const blockers = getDownloadBlockers({
      markdown,
      selectedMarkdownPath,
      downloadPlan,
      assetContext,
      isCurrentSlugDuplicate,
      isPreservedHistoricalSlug,
    });
    if (blockers.length > 0) {
      setState((current) => ({
        ...current,
        status: "error",
        error: `Fix these issues before downloading: ${blockers.join(" ")}`,
      }));
      return;
    }

    try {
      await downloadBlogEditorZip({
        markdown,
        selectedMarkdownPath,
        assetContext,
        downloadPlan,
      });
    } catch (error) {
      setState((current) => ({
        ...current,
        status: "error",
        error:
          error instanceof Error
            ? error.message
            : "Unable to create blog download package.",
      }));
    }
  }

  const post = state.result?.post || null;
  const effectiveLayout: EditorLayoutMode = canUseSplitLayout
    ? layoutPreference
    : "stack";
  const workspaceTopPadding = Math.max(86, toolbarHeight + 32);
  const splitPanelHeight = `calc(100vh - ${workspaceTopPadding + 20}px)`;
  const workspaceMaxWidth =
    effectiveLayout === "split"
      ? BLOG_EDITOR_CONTENT_MAX_WIDTH * 2 +
        BLOG_EDITOR_SCROLLBAR_WIDTH +
        BLOG_EDITOR_SPLIT_GAP
      : 1280;
  const previewPanelMaxWidth =
    BLOG_EDITOR_CONTENT_MAX_WIDTH + BLOG_EDITOR_SCROLLBAR_WIDTH;

  function handleEditorMarkdownChange(change: EditorMarkdownChange) {
    const normalizedMarkdown = normalizeEditorMarkdownAssetPaths(
      change.markdown
    );
    setSelectionToRestore(change.selection || null);
    setHasEditedCurrentDraft(true);
    setMarkdown(normalizedMarkdown);
  }

  return {
    post,
    effectiveLayout,
    workspaceTopPadding,
    workspaceMaxWidth,
    previewPanelMaxWidth,
    splitPanelHeight,
    uploadPanelProps: {
      error: state.error,
      warnings: toolbarWarnings,
      layoutPreference,
      effectiveLayout,
      canUseSplitLayout,
      markdownFiles,
      selectedMarkdownPath,
      hasFiles: files.length > 0,
      shouldConfirmNewDraft: hasEditedCurrentDraft,
      onFileChange: handleFileChange,
      onMarkdownChange: handleMarkdownChange,
      onNewDraft: handleNewDraft,
      onDownload: handleDownload,
      onLayoutChange: handleLayoutChange,
      onHeightChange: setToolbarHeight,
    },
    editorPanelProps: {
      markdown,
      metadataValues,
      layout: effectiveLayout,
      panelHeight: splitPanelHeight,
      assets: editorAssets,
      isAssetsCollapsed,
      isMetadataCollapsed,
      slugError: slugInputError,
      descriptionError: descriptionInputError,
      copiedAssetPath,
      copyWarning: copyAssetWarning,
      selectionToRestore,
      onMarkdownChange: handleEditorMarkdownChange,
      onMetadataChange: handleMetadataChange,
      onRegenerateSlug: handleRegenerateSlug,
      onToggleAssetsCollapsed: () =>
        setIsAssetsCollapsed((isCollapsed) => !isCollapsed),
      onToggleMetadataCollapsed: () =>
        setIsMetadataCollapsed((isCollapsed) => !isCollapsed),
      onAssetUpload: handleAssetUpload,
      onCopyAssetPath: handleCopyAssetPath,
    },
    previewPanelProps: {
      layout: effectiveLayout,
      panelHeight: splitPanelHeight,
    },
  };
}
