"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import BlogPost from "./BlogPost";
import {
  DEFAULT_BLOG_PREVIEW_MARKDOWN,
  findPreviewMarkdownFiles,
  getMarkdownDownloadFilename,
  makePreviewFileMap,
  parseBlogPreviewMarkdown,
  readPreviewMarkdownFile,
  type BlogPreviewAssetContext,
  type BlogPreviewParseResult,
} from "@/blog/preview";

type PreviewState = {
  status: "loading" | "ready" | "error";
  error: string | null;
  warnings: string[];
  result: BlogPreviewParseResult | null;
};

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
        <ToolbarButton onClick={onDownload}>Download .md</ToolbarButton>
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
  onMarkdownChange,
}: {
  markdown: string;
  onMarkdownChange: (markdown: string) => void;
}) {
  return (
    <section
      style={{
        background: "#000",
        color: "white",
        padding: "104px 16px 28px",
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
            Edit the full Markdown file below. The production article preview
            updates as you type.
          </p>
        </div>
        <textarea
          value={markdown}
          onChange={(event) => onMarkdownChange(event.target.value)}
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

export default function BlogPreview() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedMarkdownPath, setSelectedMarkdownPath] = useState("");
  const [markdown, setMarkdown] = useState(DEFAULT_BLOG_PREVIEW_MARKDOWN);
  const [assetContext, setAssetContext] = useState<BlogPreviewAssetContext>({});
  const [state, setState] = useState<PreviewState>({
    status: "loading",
    error: null,
    warnings: [],
    result: null,
  });
  const objectUrlsRef = useRef<string[]>([]);

  const markdownFiles = useMemo(() => findPreviewMarkdownFiles(files), [files]);

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

  async function loadMarkdownFromFiles(
    nextFiles: File[],
    markdownPath?: string
  ) {
    const loaded = await readPreviewMarkdownFile(nextFiles, markdownPath);
    setMarkdown(loaded.markdown);
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
    setMarkdown(DEFAULT_BLOG_PREVIEW_MARKDOWN);
  }

  function handleDownload() {
    const filename = getMarkdownDownloadFilename(
      markdown,
      selectedMarkdownPath
    );
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  }

  const post = state.result?.post || null;

  return (
    <>
      <UploadPanel
        status={state.status}
        error={state.error}
        warnings={state.warnings}
        markdownFiles={markdownFiles}
        selectedMarkdownPath={selectedMarkdownPath}
        hasFiles={files.length > 0}
        onFileChange={handleFileChange}
        onMarkdownChange={handleMarkdownChange}
        onNewDraft={handleNewDraft}
        onDownload={handleDownload}
      />

      <EditorPanel markdown={markdown} onMarkdownChange={setMarkdown} />

      <BlogPost
        slug={post?.slug || "blog-draft"}
        post={post}
        latestPosts={[]}
      />
    </>
  );
}
