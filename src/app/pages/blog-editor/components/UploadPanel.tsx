import { type ChangeEvent, useLayoutEffect, useRef } from "react";
import type { EditorLayoutMode } from "../types";
import { LayoutToggle } from "./LayoutToggle";
import { ToolbarButton } from "./ToolbarButton";

export function UploadPanel({
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
  onLayoutChange,
  onHeightChange,
}: {
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
