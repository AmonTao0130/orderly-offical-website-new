"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import BlogPost from "./BlogPost";
import {
  findPreviewMarkdownFiles,
  parseBlogPreviewFolder,
  type BlogPreviewResult,
} from "@/blog/preview";

type PreviewState = {
  status: "idle" | "loading" | "ready" | "error";
  error: string | null;
  result: BlogPreviewResult | null;
};

const initialState: PreviewState = {
  status: "idle",
  error: null,
  result: null,
};

function UploadPanel({
  status,
  error,
  markdownFiles,
  selectedMarkdownPath,
  hasFiles,
  onFileChange,
  onMarkdownChange,
}: {
  status: PreviewState["status"];
  error: string | null;
  markdownFiles: string[];
  selectedMarkdownPath: string;
  hasFiles: boolean;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMarkdownChange: (markdownPath: string) => void;
}) {
  const statusLabel = {
    idle: "Waiting for folder",
    loading: "Parsing preview",
    ready: "Preview ready",
    error: "Preview error",
  }[status];

  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1200,
        width: "min(calc(100vw - 24px), 920px)",
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
            {selectedMarkdownPath || (hasFiles ? "No Markdown selected" : "Select a folder such as src/content/blog/posts/example-markdown-draft")}
          </span>
        )}
      </div>

      {error && (
        <div
          style={{
            marginTop: "10px",
            color: "#ffb3b3",
            fontFamily: "'DM Mono','dm-mono',monospace",
            fontSize: "12px",
            lineHeight: 1.5,
            overflowWrap: "anywhere",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

function EmptyPreview() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#000",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 20px 48px",
        boxSizing: "border-box",
        fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
      }}
    >
      <div style={{ width: "min(100%, 640px)", textAlign: "center" }}>
        <h1
          style={{
            margin: "0 0 16px",
            fontVariationSettings: "'wght' 700",
            fontSize: "clamp(30px,5vw,52px)",
            lineHeight: 1.08,
          }}
        >
          Blog preview
        </h1>
        <p
          style={{
            margin: 0,
            color: "rgba(255,255,255,0.58)",
            fontSize: "16px",
            lineHeight: 1.65,
          }}
        >
          Choose a folder that contains one Markdown draft and its local assets.
          The files stay in this browser session and are rendered with the
          production article layout.
        </p>
      </div>
    </main>
  );
}

export default function BlogPreview() {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedMarkdownPath, setSelectedMarkdownPath] = useState("");
  const [state, setState] = useState<PreviewState>(initialState);
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
    if (files.length === 0) {
      return;
    }

    let cancelled = false;

    async function parsePreview() {
      for (const objectUrl of objectUrlsRef.current) {
        URL.revokeObjectURL(objectUrl);
      }
      objectUrlsRef.current = [];

      setState((current) => ({
        ...current,
        status: "loading",
        error: null,
      }));

      try {
        const result = await parseBlogPreviewFolder(
          files,
          selectedMarkdownPath || undefined
        );

        if (cancelled) {
          for (const objectUrl of result.objectUrls) {
            URL.revokeObjectURL(objectUrl);
          }
          return;
        }

        objectUrlsRef.current = result.objectUrls;
        setSelectedMarkdownPath(result.selectedMarkdownPath);
        setState({
          status: "ready",
          error: null,
          result,
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        setState({
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "Unable to parse selected blog folder.",
          result: null,
        });
      }
    }

    parsePreview();

    return () => {
      cancelled = true;
    };
  }, [files, selectedMarkdownPath]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFiles = Array.from(event.target.files || []);
    setFiles(nextFiles);
    const nextMarkdownFiles = findPreviewMarkdownFiles(nextFiles);
    setSelectedMarkdownPath(nextMarkdownFiles[0] || "");
    setState({
      status: nextFiles.length > 0 ? "loading" : "idle",
      error: null,
      result: null,
    });
    event.target.value = "";
  }

  function handleMarkdownChange(markdownPath: string) {
    setSelectedMarkdownPath(markdownPath);
  }

  return (
    <>
      <UploadPanel
        status={state.status}
        error={state.error}
        markdownFiles={markdownFiles}
        selectedMarkdownPath={selectedMarkdownPath}
        hasFiles={files.length > 0}
        onFileChange={handleFileChange}
        onMarkdownChange={handleMarkdownChange}
      />

      {state.result?.post ? (
        <BlogPost
          slug={state.result.post.slug}
          post={state.result.post}
          latestPosts={[]}
        />
      ) : (
        <EmptyPreview />
      )}
    </>
  );
}
