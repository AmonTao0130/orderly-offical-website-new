"use client";

import { strToU8, zipSync, type Zippable } from "fflate";
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BlogPost from "./BlogPost";
import {
  collectBlogPreviewDownloadAssets,
  DEFAULT_BLOG_DRAFT_MARKDOWN,
  findPreviewMarkdownFiles,
  getMarkdownDownloadFilename,
  makePreviewFileMap,
  parseBlogPreviewMarkdown,
  readPreviewMarkdownFile,
  type BlogPreviewAssetContext,
  type BlogPreviewParseResult,
} from "@/blog/preview";
import { makeUniqueSlug } from "@/blog/slug";

type PreviewState = {
  status: "loading" | "ready" | "error";
  error: string | null;
  warnings: string[];
  result: BlogPreviewParseResult | null;
};

type EditorDraftState = {
  markdown: string;
  selectedMarkdownPath: string;
  updatedAt: number;
};

type SlugSyncState = {
  lastAutoSlug: string;
  lastTitle: string;
  manualOverride: boolean;
};

type EditorSelection = {
  start: number;
  end: number;
};

type EditorMarkdownChange = {
  markdown: string;
  selection?: EditorSelection;
};

const BLOG_EDITOR_DRAFT_STORAGE_KEY = "orderly_blog_editor_draft_v1";
const EDITOR_FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;
const DEFAULT_EDITOR_MARKDOWN = normalizeEditorMarkdownAssetPaths(
  DEFAULT_BLOG_DRAFT_MARKDOWN
);

function StatusPill({ status }: { status: PreviewState["status"] }) {
  const statusLabel = {
    loading: "Parsing preview",
    ready: "Preview ready",
    error: "Preview error",
  }[status];

  return (
    <span
      style={{
        minHeight: "28px",
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "999px",
        padding: "0 10px",
        background:
          status === "error"
            ? "rgba(255,88,88,0.15)"
            : status === "ready"
            ? "rgba(68,222,211,0.14)"
            : "rgba(255,255,255,0.08)",
        color:
          status === "error"
            ? "#ff9a9a"
            : status === "ready"
            ? "#44DED3"
            : "rgba(255,255,255,0.72)",
        fontFamily: "'DM Mono','dm-mono',monospace",
        fontSize: "12px",
      }}
    >
      {statusLabel}
    </span>
  );
}

function ToolbarButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: "38px",
        padding: "0 14px",
        borderRadius: "6px",
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.08)",
        color: "white",
        cursor: "pointer",
        fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
        fontVariationSettings: "'wght' 600",
        fontSize: "13px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function UploadPanel({
  status,
  error,
  warnings,
  markdownFiles,
  selectedMarkdownPath,
  hasFiles,
  onFileChange,
  onMarkdownChange,
  onNewDraft,
  onDownload,
}: {
  status: PreviewState["status"];
  error: string | null;
  warnings: string[];
  markdownFiles: string[];
  selectedMarkdownPath: string;
  hasFiles: boolean;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMarkdownChange: (markdownPath: string) => void;
  onNewDraft: () => void;
  onDownload: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1200,
        width: "min(calc(100vw - 24px), 1080px)",
        padding: "12px",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "8px",
        background: "rgba(8,8,10,0.92)",
        boxShadow: "0 18px 70px rgba(0,0,0,0.45)",
        backdropFilter: "blur(18px)",
        color: "white",
        fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "38px",
            padding: "0 14px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.08)",
            cursor: "pointer",
            fontVariationSettings: "'wght' 600",
            fontSize: "13px",
            whiteSpace: "nowrap",
          }}
        >
          Choose folder
          <input
            type="file"
            multiple
            onChange={onFileChange}
            style={{ display: "none" }}
            {...{ webkitdirectory: "", directory: "" }}
          />
        </label>

        <ToolbarButton onClick={onNewDraft}>New draft</ToolbarButton>
        <ToolbarButton onClick={onDownload}>Download ZIP</ToolbarButton>
        <StatusPill status={status} />

        {markdownFiles.length > 1 ? (
          <select
            value={selectedMarkdownPath}
            onChange={(event) => onMarkdownChange(event.target.value)}
            style={{
              flex: "1 1 240px",
              minWidth: 0,
              minHeight: "38px",
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "#111114",
              color: "white",
              padding: "0 10px",
              fontSize: "13px",
              fontFamily: "'DM Mono','dm-mono',monospace",
            }}
          >
            {markdownFiles.map((filePath) => (
              <option key={filePath} value={filePath}>
                {filePath}
              </option>
            ))}
          </select>
        ) : (
          <span
            style={{
              flex: "1 1 220px",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'DM Mono','dm-mono',monospace",
              fontSize: "12px",
            }}
          >
            {selectedMarkdownPath ||
              (hasFiles ? "No Markdown selected" : "Editing a new local draft")}
          </span>
        )}
      </div>

      {(error || warnings.length > 0) && (
        <div
          style={{
            marginTop: "10px",
            display: "grid",
            gap: "4px",
            fontFamily: "'DM Mono','dm-mono',monospace",
            fontSize: "12px",
            lineHeight: 1.5,
            overflowWrap: "anywhere",
          }}
        >
          {error && <div style={{ color: "#ffb3b3" }}>{error}</div>}
          {warnings.map((warning) => (
            <div key={warning} style={{ color: "#ffd59a" }}>
              {warning}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EditorPanel({
  markdown,
  hasToolbarMessages,
  selectionToRestore,
  onMarkdownChange,
}: {
  markdown: string;
  hasToolbarMessages: boolean;
  selectionToRestore: EditorSelection | null;
  onMarkdownChange: (change: EditorMarkdownChange) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!selectionToRestore || !textarea || document.activeElement !== textarea) {
      return;
    }

    textarea.setSelectionRange(selectionToRestore.start, selectionToRestore.end);
  }, [markdown, selectionToRestore]);

  return (
    <section
      style={{
        background: "#000",
        color: "white",
        padding: `${hasToolbarMessages ? 156 : 104}px 16px 28px`,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
      }}
    >
      <div
        style={{
          width: "min(100%, 1120px)",
          margin: "0 auto",
          display: "grid",
          gap: "14px",
        }}
      >
        <div>
          <h1
            style={{
              margin: "0 0 6px",
              fontSize: "24px",
              lineHeight: 1.2,
              fontVariationSettings: "'wght' 700",
            }}
          >
            Blog editor
          </h1>
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.58)",
              fontSize: "14px",
              lineHeight: 1.55,
            }}
          >
            Edit the full Markdown file below. The article preview updates as
            you type.
          </p>
        </div>
        <textarea
          ref={textareaRef}
          className="blog-editor-markdown-input"
          value={markdown}
          onChange={(event) =>
            onMarkdownChange({
              markdown: event.target.value,
              selection: {
                start: event.target.selectionStart,
                end: event.target.selectionEnd,
              },
            })
          }
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: "420px",
            resize: "vertical",
            boxSizing: "border-box",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.13)",
            background: "#0f0f12",
            color: "rgba(255,255,255,0.88)",
            padding: "18px",
            fontFamily: "'DM Mono','dm-mono',monospace",
            fontSize: "13px",
            lineHeight: 1.6,
            outline: "none",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        />
      </div>
    </section>
  );
}

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

function normalizeEditorMarkdownAssetPaths(markdown: string) {
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

function stripEditorFrontmatterQuotes(value: string) {
  return value.trim().replace(/^['"]|['"]$/g, "");
}

function getEditorFrontmatterContent(markdown: string) {
  const match = markdown.match(EDITOR_FRONTMATTER_RE);
  return match ? match[1] : "";
}

function getEditorFrontmatterField(markdown: string, field: string) {
  const content = getEditorFrontmatterContent(markdown);
  const escapedField = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = content.match(new RegExp(`^\\s*${escapedField}\\s*:\\s*(.*?)\\s*$`, "m"));
  return match ? stripEditorFrontmatterQuotes(match[1]) : "";
}

function adjustSelectionForReplacement(
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

function replaceOrInsertEditorSlug(
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
      markdown: `${markdown.slice(0, replacementStart)}${replacement}${markdown.slice(
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

function getInitialSlugSyncState(markdown: string): SlugSyncState {
  return {
    lastAutoSlug: getEditorFrontmatterField(markdown, "slug"),
    lastTitle: getEditorFrontmatterField(markdown, "title"),
    manualOverride: false,
  };
}

function readEditorDraftState(): EditorDraftState | null {
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

function saveEditorDraftState(markdown: string, selectedMarkdownPath: string) {
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

export default function BlogPreview() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedMarkdownPath, setSelectedMarkdownPath] = useState("");
  const [markdown, setMarkdown] = useState(DEFAULT_EDITOR_MARKDOWN);
  const [selectionToRestore, setSelectionToRestore] =
    useState<EditorSelection | null>(null);
  const [assetContext, setAssetContext] = useState<BlogPreviewAssetContext>({});
  const [existingSlugs, setExistingSlugs] = useState<string[]>([]);
  const [slugLoadWarning, setSlugLoadWarning] = useState("");
  const [state, setState] = useState<PreviewState>({
    status: "loading",
    error: null,
    warnings: [],
    result: null,
  });
  const [isDraftReady, setIsDraftReady] = useState(false);
  const objectUrlsRef = useRef<string[]>([]);
  const slugSyncRef = useRef<SlugSyncState>(
    getInitialSlugSyncState(DEFAULT_EDITOR_MARKDOWN)
  );

  const markdownFiles = useMemo(() => findPreviewMarkdownFiles(files), [files]);
  const duplicateSlugWarning = useMemo(() => {
    if (!slugSyncRef.current.manualOverride) {
      return "";
    }

    const currentSlug = getEditorFrontmatterField(markdown, "slug");
    if (!currentSlug) {
      return "";
    }

    const normalizedSlug = currentSlug.toLowerCase();
    const isDuplicate = existingSlugs.some(
      (slug) => slug.toLowerCase() === normalizedSlug
    );

    return isDuplicate
      ? `Slug "${currentSlug}" already exists in historical blog posts. Please choose a unique slug before publishing.`
      : "";
  }, [existingSlugs, markdown]);
  const toolbarWarnings = useMemo(
    () =>
      [
        ...state.warnings,
        slugLoadWarning,
        duplicateSlugWarning,
      ].filter(Boolean),
    [duplicateSlugWarning, slugLoadWarning, state.warnings]
  );

  function resetSlugSync(nextMarkdown: string) {
    slugSyncRef.current = getInitialSlugSyncState(nextMarkdown);
    setSelectionToRestore(null);
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
      syncState.lastTitle = title;
      return { markdown: nextMarkdown, selection: options?.selection };
    }

    if (syncState.manualOverride) {
      syncState.lastTitle = title;
      return { markdown: nextMarkdown, selection: options?.selection };
    }

    if (!titleChanged && !options?.force) {
      return { markdown: nextMarkdown, selection: options?.selection };
    }

    const nextSlug = makeUniqueSlug(title, existingSlugs);
    syncState.lastAutoSlug = nextSlug;
    syncState.lastTitle = title;

    if (currentSlug === nextSlug) {
      return { markdown: nextMarkdown, selection: options?.selection };
    }

    return replaceOrInsertEditorSlug(nextMarkdown, nextSlug, options?.selection);
  }

  useEffect(() => {
    const draft = readEditorDraftState();
    if (draft) {
      setMarkdown(draft.markdown);
      setSelectedMarkdownPath(draft.selectedMarkdownPath);
      resetSlugSync(draft.markdown);
    }
    setIsDraftReady(true);
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
          ? payload.slugs.filter((slug): slug is string => typeof slug === "string")
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
    setMarkdown((currentMarkdown) => {
      const change = applyTitleSlugSync(currentMarkdown, { force: true });
      return change.markdown;
    });
  }, [existingSlugs]);

  useEffect(() => {
    return () => {
      for (const objectUrl of objectUrlsRef.current) {
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
      const result = parseBlogPreviewMarkdown(markdown, {
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
  }, [assetContext, markdown, selectedMarkdownPath]);

  useEffect(() => {
    if (!isDraftReady) {
      return;
    }

    saveEditorDraftState(markdown, selectedMarkdownPath);
  }, [isDraftReady, markdown, selectedMarkdownPath]);

  async function loadMarkdownFromFiles(
    nextFiles: File[],
    markdownPath?: string
  ) {
    const loaded = await readPreviewMarkdownFile(nextFiles, markdownPath);
    const normalizedMarkdown = normalizeEditorMarkdownAssetPaths(loaded.markdown);
    resetSlugSync(normalizedMarkdown);
    setMarkdown(normalizedMarkdown);
    setSelectedMarkdownPath(loaded.selectedMarkdownPath);
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
    } catch (error) {
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

  function handleNewDraft() {
    setFiles([]);
    setSelectedMarkdownPath("");
    setAssetContext({});
    resetSlugSync(DEFAULT_EDITOR_MARKDOWN);
    setMarkdown(DEFAULT_EDITOR_MARKDOWN);
    saveEditorDraftState(DEFAULT_EDITOR_MARKDOWN, "");
  }

  async function handleDownload() {
    const markdownFilename = getMarkdownDownloadFilename(
      markdown,
      selectedMarkdownPath
    );
    const packageName =
      markdownFilename.replace(/\.md$/i, "").replace(/[\\/:*?"<>|]+/g, "-") ||
      "blog-draft";
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

    try {
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

  return (
    <>
      <UploadPanel
        status={state.status}
        error={state.error}
        warnings={toolbarWarnings}
        markdownFiles={markdownFiles}
        selectedMarkdownPath={selectedMarkdownPath}
        hasFiles={files.length > 0}
        onFileChange={handleFileChange}
        onMarkdownChange={handleMarkdownChange}
        onNewDraft={handleNewDraft}
        onDownload={handleDownload}
      />

      <EditorPanel
        markdown={markdown}
        hasToolbarMessages={Boolean(state.error || toolbarWarnings.length > 0)}
        selectionToRestore={selectionToRestore}
        onMarkdownChange={(change) => {
          const normalizedMarkdown = normalizeEditorMarkdownAssetPaths(
            change.markdown
          );
          const syncedChange = applyTitleSlugSync(normalizedMarkdown, {
            selection: change.selection,
          });
          setSelectionToRestore(syncedChange.selection || null);
          setMarkdown(syncedChange.markdown);
        }}
      />

      <BlogPost
        slug={post?.slug || "blog-draft"}
        post={post}
        latestPosts={[]}
      />
    </>
  );
}
