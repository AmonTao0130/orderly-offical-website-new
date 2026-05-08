import { type ChangeEvent, useLayoutEffect, useRef, useState } from "react";
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
  shouldConfirmNewDraft,
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
  shouldConfirmNewDraft: boolean;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onMarkdownChange: (markdownPath: string) => void;
  onNewDraft: () => void;
  onDownload: () => void;
  onLayoutChange: (layout: EditorLayoutMode) => void;
  onHeightChange: (height: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isNewDraftConfirmOpen, setIsNewDraftConfirmOpen] = useState(false);

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

  function handleNewDraftClick() {
    if (shouldConfirmNewDraft) {
      setIsNewDraftConfirmOpen(true);
      return;
    }

    onNewDraft();
  }

  function handleConfirmNewDraft() {
    setIsNewDraftConfirmOpen(false);
    onNewDraft();
  }

  return (
    <>
      <div
        ref={panelRef}
        style={{
          position: "fixed",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1200,
          width: "min(calc(100vw - 32px), 1180px)",
          padding: "8px 10px",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "8px",
          background:
            "linear-gradient(180deg, rgba(13,13,17,0.88), rgba(8,8,10,0.84))",
          boxShadow: "0 12px 36px rgba(0,0,0,0.32)",
          backdropFilter: "blur(14px)",
          color: "white",
          fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px 10px",
          }}
        >
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "34px",
              padding: "0 13px",
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

          <ToolbarButton onClick={handleNewDraftClick}>New draft</ToolbarButton>
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
                minHeight: "34px",
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
                flex: "1 1 180px",
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
                (hasFiles
                  ? "No Markdown selected"
                  : "Editing a new local draft")}
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

      {isNewDraftConfirmOpen && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsNewDraftConfirmOpen(false);
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1300,
            display: "grid",
            placeItems: "center",
            padding: "24px",
            background: "rgba(0,0,0,0.62)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="new-draft-confirm-title"
            aria-describedby="new-draft-confirm-description"
            style={{
              width: "min(100%, 380px)",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "#101014",
              boxShadow: "0 24px 70px rgba(0,0,0,0.48)",
              color: "white",
              fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
              padding: "18px",
            }}
          >
            <h2
              id="new-draft-confirm-title"
              style={{
                margin: 0,
                fontSize: "18px",
                lineHeight: 1.25,
                fontVariationSettings: "'wght' 650",
              }}
            >
              Start a new draft?
            </h2>
            <p
              id="new-draft-confirm-description"
              style={{
                margin: "10px 0 0",
                color: "rgba(255,255,255,0.68)",
                fontSize: "13px",
                lineHeight: 1.5,
              }}
            >
              Your current edits will be replaced by a blank draft.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "18px",
              }}
            >
              <ToolbarButton onClick={() => setIsNewDraftConfirmOpen(false)}>
                Cancel
              </ToolbarButton>
              <ToolbarButton onClick={handleConfirmNewDraft} variant="primary">
                New draft
              </ToolbarButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
