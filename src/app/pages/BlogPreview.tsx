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
import { makeUniqueSlug, slugifyTitle } from "@/blog/slug";

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
  preservedSlug: string;
};

type EditorSelection = {
  start: number;
  end: number;
};

type EditorMarkdownChange = {
  markdown: string;
  selection?: EditorSelection;
};

type SlugStatus = "auto" | "manual" | "duplicate" | "invalid";
type EditorLayoutMode = "split" | "stack";

type DownloadPlan = {
  packageName: string;
  markdownFilename: string;
};

type BlogEditorAsset = {
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

const BLOG_EDITOR_DRAFT_STORAGE_KEY = "orderly_blog_editor_draft_v1";
const BLOG_EDITOR_LAYOUT_STORAGE_KEY = "orderly_blog_editor_layout_v1";
const BLOG_EDITOR_SPLIT_MIN_WIDTH = 1024;
const BLOG_EDITOR_CONTENT_MAX_WIDTH = 740;
const BLOG_EDITOR_SPLIT_GAP = 18;
const BLOG_EDITOR_SCROLLBAR_WIDTH = 10;
const EDITOR_FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/;
const PREVIEW_PARSE_DEBOUNCE_MS = 180;
const DRAFT_SAVE_DEBOUNCE_MS = 500;
const DEFAULT_EDITOR_MARKDOWN = normalizeEditorMarkdownAssetPaths(
  DEFAULT_BLOG_DRAFT_MARKDOWN
);

function SlugStatusPill({ status }: { status: SlugStatus }) {
  const config = {
    auto: {
      label: "Slug auto",
      background: "rgba(68,222,211,0.14)",
      color: "#44DED3",
    },
    manual: {
      label: "Slug manual",
      background: "rgba(255,255,255,0.08)",
      color: "rgba(255,255,255,0.74)",
    },
    duplicate: {
      label: "Slug duplicate",
      background: "rgba(255,193,112,0.15)",
      color: "#ffd59a",
    },
    invalid: {
      label: "Slug invalid",
      background: "rgba(255,88,88,0.15)",
      color: "#ff9a9a",
    },
  }[status];

  return (
    <span
      style={{
        minHeight: "28px",
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "999px",
        padding: "0 10px",
        background: config.background,
        color: config.color,
        fontFamily: "'DM Mono','dm-mono',monospace",
        fontSize: "12px",
      }}
    >
      {config.label}
    </span>
  );
}

function LayoutToggle({
  layoutPreference,
  effectiveLayout,
  canUseSplitLayout,
  onLayoutChange,
}: {
  layoutPreference: EditorLayoutMode;
  effectiveLayout: EditorLayoutMode;
  canUseSplitLayout: boolean;
  onLayoutChange: (layout: EditorLayoutMode) => void;
}) {
  const options: Array<{
    value: EditorLayoutMode;
    label: string;
    ariaLabel: string;
  }> = [
    { value: "split", label: "Split", ariaLabel: "Split layout" },
    { value: "stack", label: "Stack", ariaLabel: "Stack layout" },
  ];

  return (
    <div
      role="group"
      aria-label="Editor layout"
      style={{
        display: "inline-flex",
        alignItems: "center",
        minHeight: "38px",
        padding: "3px",
        borderRadius: "7px",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.045)",
      }}
    >
      {options.map((option) => {
        const isDisabled = option.value === "split" && !canUseSplitLayout;
        const isActive = effectiveLayout === option.value;
        const savedSplitOnSmallScreen =
          option.value === "split" &&
          layoutPreference === "split" &&
          !canUseSplitLayout;

        return (
          <button
            key={option.value}
            type="button"
            aria-label={option.ariaLabel}
            aria-pressed={isActive}
            title={option.ariaLabel}
            disabled={isDisabled}
            onClick={() => onLayoutChange(option.value)}
            style={{
              minHeight: "30px",
              padding: "0 11px",
              border: "0",
              borderRadius: "5px",
              background: isActive ? "rgba(68,222,211,0.16)" : "transparent",
              color: isActive
                ? "#44DED3"
                : isDisabled
                ? "rgba(255,255,255,0.32)"
                : "rgba(255,255,255,0.68)",
              cursor: isDisabled ? "not-allowed" : "pointer",
              fontFamily: "'DM Mono','dm-mono',monospace",
              fontSize: "12px",
              opacity: savedSplitOnSmallScreen ? 0.62 : 1,
              whiteSpace: "nowrap",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  variant = "secondary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: "38px",
        padding: "0 16px",
        borderRadius: "6px",
        border: isPrimary
          ? "1px solid rgba(68,222,211,0.5)"
          : "1px solid rgba(255,255,255,0.14)",
        background: isPrimary
          ? "rgba(68,222,211,0.14)"
          : "rgba(255,255,255,0.055)",
        color: isPrimary ? "#44DED3" : "rgba(255,255,255,0.88)",
        cursor: "pointer",
        fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
        fontVariationSettings: "'wght' 600",
        fontSize: "13px",
        whiteSpace: "nowrap",
        boxShadow: isPrimary ? "0 0 24px rgba(68,222,211,0.08)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function MetaChip({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <span
      style={{
        minWidth: 0,
        maxWidth: "100%",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        minHeight: "30px",
        padding: "0 10px",
        borderRadius: "6px",
        border: accent
          ? "1px solid rgba(68,222,211,0.22)"
          : "1px solid rgba(255,255,255,0.1)",
        background: accent
          ? "rgba(68,222,211,0.08)"
          : "rgba(255,255,255,0.045)",
        color: accent ? "#44DED3" : "rgba(255,255,255,0.74)",
        fontFamily: "'DM Mono','dm-mono',monospace",
        fontSize: "12px",
        overflow: "hidden",
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.42)", flex: "0 0 auto" }}>
        {label}
      </span>
      <span
        style={{
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </span>
  );
}

function AssetPanel({
  assets,
  copiedAssetPath,
  copyWarning,
  onAssetUpload,
  onCopyAssetPath,
}: {
  assets: BlogEditorAsset[];
  copiedAssetPath: string;
  copyWarning: string;
  onAssetUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onCopyAssetPath: (asset: BlogEditorAsset) => void;
}) {
  const usedCount = assets.filter((asset) => asset.isUsed).length;

  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.035)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          minHeight: "44px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          padding: "0 14px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            minWidth: 0,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.86)",
              fontVariationSettings: "'wght' 700",
              fontSize: "14px",
            }}
          >
            Assets
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.46)",
              fontFamily: "'DM Mono','dm-mono',monospace",
              fontSize: "12px",
            }}
          >
            {assets.length} files · {usedCount} used
          </span>
        </div>

        <label
          style={{
            minHeight: "30px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 10px",
            borderRadius: "6px",
            border: "1px solid rgba(68,222,211,0.28)",
            background: "rgba(68,222,211,0.08)",
            color: "#44DED3",
            cursor: "pointer",
            fontVariationSettings: "'wght' 600",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          Upload assets
          <input
            type="file"
            multiple
            onChange={onAssetUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {copyWarning && (
        <div
          style={{
            padding: "8px 14px 0",
            color: "#ffd59a",
            fontFamily: "'DM Mono','dm-mono',monospace",
            fontSize: "12px",
            lineHeight: 1.5,
          }}
        >
          {copyWarning}
        </div>
      )}

      {assets.length === 0 ? (
        <div
          style={{
            padding: "14px",
            color: "rgba(255,255,255,0.46)",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          No local assets yet. Upload files here, then copy their paths into the
          Markdown when you need them.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "8px",
            padding: "10px",
          }}
        >
          {assets.map((asset) => (
            <div
              key={asset.path}
              style={{
                minWidth: 0,
                display: "grid",
                gridTemplateColumns: "44px minmax(0, 1fr) auto",
                alignItems: "center",
                gap: "10px",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(0,0,0,0.18)",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.045)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.56)",
                  fontFamily: "'DM Mono','dm-mono',monospace",
                  fontSize: "10px",
                }}
              >
                {asset.previewUrl ? (
                  <img
                    src={asset.previewUrl}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  asset.typeLabel
                )}
              </div>

              <div style={{ minWidth: 0, display: "grid", gap: "4px" }}>
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "rgba(255,255,255,0.82)",
                    fontFamily: "'DM Mono','dm-mono',monospace",
                    fontSize: "12px",
                  }}
                  title={asset.path}
                >
                  {asset.markdownPath}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "rgba(255,255,255,0.44)",
                    fontFamily: "'DM Mono','dm-mono',monospace",
                    fontSize: "11px",
                  }}
                >
                  <span>{asset.sizeLabel}</span>
                  <span>{asset.isUsed ? "Used" : "Unused"}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onCopyAssetPath(asset)}
                style={{
                  minHeight: "30px",
                  padding: "0 9px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background:
                    asset.path === copiedAssetPath
                      ? "rgba(68,222,211,0.12)"
                      : "rgba(255,255,255,0.045)",
                  color:
                    asset.path === copiedAssetPath
                      ? "#44DED3"
                      : "rgba(255,255,255,0.72)",
                  cursor: "pointer",
                  fontFamily: "'DM Mono','dm-mono',monospace",
                  fontSize: "11px",
                  whiteSpace: "nowrap",
                }}
              >
                {asset.path === copiedAssetPath ? "Copied" : "Copy path"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UploadPanel({
  status,
  slugStatus,
  currentSlug,
  downloadPlan,
  error,
  warnings,
  layoutPreference,
  effectiveLayout,
  canUseSplitLayout,
  markdownFiles,
  selectedMarkdownPath,
  hasFiles,
  onFileChange,
  onMarkdownChange,
  onNewDraft,
  onDownload,
  onKeepSlug,
  onRegenerateSlug,
  onLayoutChange,
  onHeightChange,
}: {
  status: PreviewState["status"];
  slugStatus: SlugStatus;
  currentSlug: string;
  downloadPlan: DownloadPlan;
  error: string | null;
  warnings: string[];
  layoutPreference: EditorLayoutMode;
  effectiveLayout: EditorLayoutMode;
  canUseSplitLayout: boolean;
  markdownFiles: string[];
  selectedMarkdownPath: string;
  hasFiles: boolean;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMarkdownChange: (markdownPath: string) => void;
  onNewDraft: () => void;
  onDownload: () => void;
  onKeepSlug: () => void;
  onRegenerateSlug: () => void;
  onLayoutChange: (layout: EditorLayoutMode) => void;
  onHeightChange: (height: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const updateHeight = () => onHeightChange(panel.offsetHeight);
    updateHeight();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(panel);

    return () => observer.disconnect();
  }, [onHeightChange]);

  return (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1200,
        width: "min(calc(100vw - 48px), 1280px)",
        padding: "14px 16px",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "10px",
        background:
          "linear-gradient(180deg, rgba(13,13,17,0.94), rgba(8,8,10,0.92))",
        boxShadow: "0 18px 60px rgba(0,0,0,0.38)",
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
          gap: "10px 12px",
        }}
      >
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "38px",
            padding: "0 16px",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.055)",
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
        <ToolbarButton onClick={onDownload} variant="primary">
          Download ZIP
        </ToolbarButton>
        <SlugStatusPill status={slugStatus} />
        <LayoutToggle
          layoutPreference={layoutPreference}
          effectiveLayout={effectiveLayout}
          canUseSplitLayout={canUseSplitLayout}
          onLayoutChange={onLayoutChange}
        />

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
              marginLeft: "auto",
            }}
          >
            {selectedMarkdownPath ||
              (hasFiles ? "No Markdown selected" : "Editing a new local draft")}
          </span>
        )}
      </div>

      <div
        style={{
          marginTop: "12px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
          color: "rgba(255,255,255,0.58)",
          fontFamily: "'DM Mono','dm-mono',monospace",
          fontSize: "12px",
          lineHeight: 1.5,
        }}
      >
        <MetaChip label="slug" value={currentSlug || "missing"} accent />
        <MetaChip
          label="ZIP"
          value={`${downloadPlan.packageName}/${downloadPlan.markdownFilename}`}
        />
        <button
          type="button"
          onClick={onKeepSlug}
          style={{
            border: "0",
            padding: "0 6px",
            minHeight: "30px",
            background: "transparent",
            color: "rgba(255,255,255,0.76)",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "12px",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          Keep current slug
        </button>
        <button
          type="button"
          onClick={onRegenerateSlug}
          style={{
            border: "0",
            padding: "0 6px",
            minHeight: "30px",
            background: "transparent",
            color: "#44DED3",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "12px",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          Regenerate slug
        </button>
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
  layout,
  panelHeight,
  assets,
  copiedAssetPath,
  copyWarning,
  selectionToRestore,
  onMarkdownChange,
  onAssetUpload,
  onCopyAssetPath,
}: {
  markdown: string;
  layout: EditorLayoutMode;
  panelHeight: string;
  assets: BlogEditorAsset[];
  copiedAssetPath: string;
  copyWarning: string;
  selectionToRestore: EditorSelection | null;
  onMarkdownChange: (change: EditorMarkdownChange) => void;
  onAssetUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onCopyAssetPath: (asset: BlogEditorAsset) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (
      !selectionToRestore ||
      !textarea ||
      document.activeElement !== textarea
    ) {
      return;
    }

    textarea.setSelectionRange(
      selectionToRestore.start,
      selectionToRestore.end
    );
  }, [markdown, selectionToRestore]);

  return (
    <section
      className={layout === "split" ? "blog-editor-scroll-panel" : undefined}
      style={{
        color: "white",
        fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
        minWidth: 0,
        height: layout === "split" ? panelHeight : undefined,
        boxSizing: "border-box",
        overflowY: layout === "split" ? "auto" : undefined,
        paddingRight: layout === "split" ? "4px" : undefined,
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "18px",
          gridTemplateRows:
            layout === "split" ? "auto auto minmax(360px, 1fr)" : undefined,
          minHeight: layout === "split" ? "100%" : undefined,
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
        <AssetPanel
          assets={assets}
          copiedAssetPath={copiedAssetPath}
          copyWarning={copyWarning}
          onAssetUpload={onAssetUpload}
          onCopyAssetPath={onCopyAssetPath}
        />
        <div
          className="blog-editor-markdown-shell"
          style={{
            width: "100%",
            boxSizing: "border-box",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.13)",
            background: "#0f0f12",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            overflow: "hidden",
            display: layout === "split" ? "flex" : undefined,
            flexDirection: layout === "split" ? "column" : undefined,
            minHeight: 0,
          }}
        >
          <div
            style={{
              minHeight: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              padding: "0 16px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.025)",
              color: "rgba(255,255,255,0.58)",
              fontFamily: "'DM Mono','dm-mono',monospace",
              fontSize: "12px",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.78)" }}>Markdown</span>
            <span>{markdown.length.toLocaleString()} chars</span>
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
              minHeight: layout === "split" ? "360px" : "420px",
              height: layout === "split" ? "auto" : undefined,
              flex: layout === "split" ? "1 1 auto" : undefined,
              resize: layout === "split" ? "none" : "vertical",
              boxSizing: "border-box",
              border: "0",
              background: "transparent",
              color: "rgba(255,255,255,0.86)",
              padding: "16px",
              fontFamily: "'DM Mono','dm-mono',monospace",
              fontSize: "13px",
              lineHeight: 1.62,
              outline: "none",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function PreviewPanel({
  layout,
  panelHeight,
  children,
}: {
  layout: EditorLayoutMode;
  panelHeight: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        minWidth: 0,
        height: layout === "split" ? panelHeight : undefined,
        boxSizing: "border-box",
        overflow: layout === "split" ? "hidden" : undefined,
        border: layout === "split" ? "1px solid rgba(255,255,255,0.12)" : "0",
        borderRadius: layout === "split" ? "10px" : 0,
        background: "#000",
        marginTop: layout === "stack" ? "28px" : undefined,
      }}
    >
      {layout === "split" && (
        <div
          style={{
            minHeight: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(10,10,12,0.92)",
            backdropFilter: "blur(12px)",
            color: "rgba(255,255,255,0.78)",
            fontFamily: "'DM Mono','dm-mono',monospace",
            fontSize: "12px",
          }}
        >
          <span>Preview</span>
          <span style={{ color: "rgba(68,222,211,0.78)" }}>Live</span>
        </div>
      )}
      <div
        className={layout === "split" ? "blog-editor-scroll-panel" : undefined}
        style={{
          height: layout === "split" ? "calc(100% - 42px)" : undefined,
          overflowY: layout === "split" ? "auto" : undefined,
          boxSizing: "border-box",
        }}
      >
        {children}
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

function getEditorPublicAssetFallback(assetPath: string) {
  const normalized = normalizeEditorAssetPath(
    assetPath.startsWith("/") ? assetPath.slice(1) : assetPath
  );

  return normalized === "thumbnail.jpg" ? "/thumbnail.jpg" : "";
}

function normalizeEditorAssetPath(value: string) {
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

function joinEditorAssetPath(baseDir: string, relativePath: string) {
  return normalizeEditorAssetPath(
    baseDir ? `${baseDir}/${relativePath}` : relativePath
  );
}

function isExternalOrRootEditorAssetPath(value: string) {
  return (
    value.startsWith("/") ||
    value.startsWith("#") ||
    /^[a-z][a-z0-9+.-]*:/i.test(value)
  );
}

function splitEditorAssetSuffix(value: string) {
  const match = value.match(/^([^?#]+)([?#].*)?$/);
  return {
    assetPath: match?.[1] || value,
    suffix: match?.[2] || "",
  };
}

function getUploadedAssetPath(
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

function getMarkdownAssetPath(assetPath: string, baseDir: string) {
  const normalizedPath = normalizeEditorAssetPath(assetPath);
  if (baseDir && normalizedPath.startsWith(`${baseDir}/`)) {
    return `./${normalizedPath.slice(baseDir.length + 1)}`;
  }

  return `./${normalizedPath.split("/").pop() || normalizedPath}`;
}

function getFileTypeLabel(file: File) {
  const ext = file.name.split(".").pop();
  if (ext && ext !== file.name) {
    return ext.slice(0, 5).toUpperCase();
  }

  return (file.type.split("/")[1] || file.type || "FILE")
    .slice(0, 5)
    .toUpperCase();
}

function getFileSizeLabel(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${Math.round(size / 102.4) / 10} KB`;
  }

  return `${Math.round(size / (1024 * 102.4)) / 10} MB`;
}

function collectReferencedAssetPaths(markdown: string, baseDir: string) {
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
  const match = content.match(
    new RegExp(`^\\s*${escapedField}\\s*:\\s*(.*?)\\s*$`, "m")
  );
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

function getInitialSlugSyncState(markdown: string): SlugSyncState {
  return {
    lastAutoSlug: getEditorFrontmatterField(markdown, "slug"),
    lastTitle: getEditorFrontmatterField(markdown, "title"),
    manualOverride: false,
    preservedSlug: "",
  };
}

function isValidBlogSlug(slug: string) {
  return slug === slugifyTitle(slug) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function getDownloadPlan(
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

function readEditorLayoutPreference(): EditorLayoutMode {
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

function saveEditorLayoutPreference(layout: EditorLayoutMode) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(BLOG_EDITOR_LAYOUT_STORAGE_KEY, layout);
  } catch {
    // The layout should still switch even when storage is unavailable.
  }
}

export default function BlogPreview() {
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
  const slugStatus: SlugStatus = isCurrentSlugInvalid
    ? "invalid"
    : isCurrentSlugDuplicate && !isPreservedHistoricalSlug
    ? "duplicate"
    : slugSyncRef.current.manualOverride
    ? "manual"
    : "auto";
  const downloadPlan = useMemo(
    () => getDownloadPlan(markdown, selectedMarkdownPath),
    [markdown, selectedMarkdownPath]
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
  const toolbarWarnings = useMemo(
    () =>
      [
        ...state.warnings,
        slugLoadWarning,
        slugFormatWarning,
        duplicateSlugWarning,
        copyAssetWarning,
      ].filter(Boolean),
    [
      copyAssetWarning,
      duplicateSlugWarning,
      slugFormatWarning,
      slugLoadWarning,
      state.warnings,
    ]
  );
  const editorAssets = useMemo(() => {
    const filesByPath = assetContext.filesByPath || new Map<string, File>();
    const baseDir = assetContext.baseDir || "";
    const referencedAssetPaths = collectReferencedAssetPaths(markdown, baseDir);
    const localAssets = Array.from(filesByPath.entries())
      .filter(([path]) => !path.toLowerCase().endsWith(".md"))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, file]) => {
        const isImage = file.type.startsWith("image/");
        let previewUrl = assetPreviewUrlsRef.current.get(path);
        if (isImage && !previewUrl) {
          previewUrl = URL.createObjectURL(file);
          assetPreviewUrlsRef.current.set(path, previewUrl);
        }

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
  }, [assetContext, markdown]);

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
    setMarkdown((currentMarkdown) => {
      const change = applyTitleSlugSync(currentMarkdown, { force: true });
      return change.markdown;
    });
  }, [existingSlugs]);

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
    const filesByPath = assetContext.filesByPath || new Map<string, File>();
    for (const [path, objectUrl] of assetPreviewUrlsRef.current.entries()) {
      if (!filesByPath.has(path)) {
        URL.revokeObjectURL(objectUrl);
        assetPreviewUrlsRef.current.delete(path);
      }
    }
  }, [assetContext]);

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

    setAssetContext((currentContext) => {
      const baseDir = currentContext.baseDir || "";
      const filesByPath = new Map(
        currentContext.filesByPath || new Map<string, File>()
      );
      for (const file of uploadedFiles) {
        if (file.name.toLowerCase().endsWith(".md")) {
          continue;
        }

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
    saveEditorDraftState(DEFAULT_EDITOR_MARKDOWN, "");
  }

  function handleKeepSlug() {
    const slug = getEditorFrontmatterField(markdown, "slug");
    slugSyncRef.current.manualOverride = true;
    slugSyncRef.current.preservedSlug =
      slug && slug === loadedSourceSlugRef.current ? slug : "";
    slugSyncRef.current.lastAutoSlug = slug;
    setSlugSyncVersion((version) => version + 1);
  }

  function handleRegenerateSlug() {
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

  function getDownloadBlockers() {
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

  async function handleDownload() {
    const blockers = getDownloadBlockers();
    if (blockers.length > 0) {
      setState((current) => ({
        ...current,
        status: "error",
        error: `Fix these issues before downloading: ${blockers.join(" ")}`,
      }));
      return;
    }

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
  const effectiveLayout: EditorLayoutMode = canUseSplitLayout
    ? layoutPreference
    : "stack";
  const workspaceTopPadding = Math.max(116, toolbarHeight + 52);
  const splitPanelHeight = `calc(100vh - ${workspaceTopPadding + 28}px)`;
  const workspaceMaxWidth =
    effectiveLayout === "split"
      ? BLOG_EDITOR_CONTENT_MAX_WIDTH * 2 +
        BLOG_EDITOR_SCROLLBAR_WIDTH +
        BLOG_EDITOR_SPLIT_GAP
      : 1280;
  const previewPanelMaxWidth =
    BLOG_EDITOR_CONTENT_MAX_WIDTH + BLOG_EDITOR_SCROLLBAR_WIDTH;

  return (
    <>
      <UploadPanel
        status={state.status}
        slugStatus={slugStatus}
        currentSlug={currentSlug}
        downloadPlan={downloadPlan}
        error={state.error}
        warnings={toolbarWarnings}
        layoutPreference={layoutPreference}
        effectiveLayout={effectiveLayout}
        canUseSplitLayout={canUseSplitLayout}
        markdownFiles={markdownFiles}
        selectedMarkdownPath={selectedMarkdownPath}
        hasFiles={files.length > 0}
        onFileChange={handleFileChange}
        onMarkdownChange={handleMarkdownChange}
        onNewDraft={handleNewDraft}
        onDownload={handleDownload}
        onKeepSlug={handleKeepSlug}
        onRegenerateSlug={handleRegenerateSlug}
        onLayoutChange={handleLayoutChange}
        onHeightChange={setToolbarHeight}
      />

      <main
        style={{
          minHeight: effectiveLayout === "split" ? undefined : "100vh",
          height: effectiveLayout === "split" ? "100vh" : undefined,
          background: "#000",
          color: "white",
          padding: `${workspaceTopPadding}px 24px 28px`,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxSizing: "border-box",
          overflow: effectiveLayout === "split" ? "hidden" : undefined,
        }}
      >
        <div
          style={{
            width: `min(100%, ${workspaceMaxWidth}px)`,
            margin: "0 auto",
            display: effectiveLayout === "split" ? "grid" : "block",
            gridTemplateColumns:
              effectiveLayout === "split"
                ? `minmax(0, ${BLOG_EDITOR_CONTENT_MAX_WIDTH}px) minmax(0, ${previewPanelMaxWidth}px)`
                : undefined,
            alignItems: "start",
            justifyContent: effectiveLayout === "split" ? "center" : undefined,
            gap: effectiveLayout === "split" ? `${BLOG_EDITOR_SPLIT_GAP}px` : undefined,
          }}
        >
          <EditorPanel
            markdown={markdown}
            layout={effectiveLayout}
            panelHeight={splitPanelHeight}
            assets={editorAssets}
            copiedAssetPath={copiedAssetPath}
            copyWarning={copyAssetWarning}
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
            onAssetUpload={handleAssetUpload}
            onCopyAssetPath={handleCopyAssetPath}
          />

          <PreviewPanel layout={effectiveLayout} panelHeight={splitPanelHeight}>
            <BlogPost
              slug={post?.slug || "blog-draft"}
              post={post}
              latestPosts={[]}
              hideChrome
            />
          </PreviewPanel>
        </div>
      </main>
    </>
  );
}
