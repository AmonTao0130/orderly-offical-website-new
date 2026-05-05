import { type ChangeEvent, useLayoutEffect, useRef } from "react";
import type {
  BlogEditorAsset,
  BlogMetadataField,
  BlogMetadataFormValues,
  EditorLayoutMode,
  EditorMarkdownChange,
  EditorSelection,
} from "../types";
import { AssetPanel } from "./AssetPanel";
import { MetadataPanel } from "./MetadataPanel";

export function EditorPanel({
  markdown,
  metadataValues,
  layout,
  panelHeight,
  assets,
  isAssetsCollapsed,
  isMetadataCollapsed,
  slugError,
  descriptionError,
  copiedAssetPath,
  copyWarning,
  selectionToRestore,
  onMarkdownChange,
  onMetadataChange,
  onRegenerateSlug,
  onToggleAssetsCollapsed,
  onToggleMetadataCollapsed,
  onAssetUpload,
  onCopyAssetPath,
}: {
  markdown: string;
  metadataValues: BlogMetadataFormValues;
  layout: EditorLayoutMode;
  panelHeight: string;
  assets: BlogEditorAsset[];
  isAssetsCollapsed: boolean;
  isMetadataCollapsed: boolean;
  slugError: string;
  descriptionError: string;
  copiedAssetPath: string;
  copyWarning: string;
  selectionToRestore: EditorSelection | null;
  onMarkdownChange: (change: EditorMarkdownChange) => void;
  onMetadataChange: (field: BlogMetadataField, value: string) => void;
  onRegenerateSlug: () => void;
  onToggleAssetsCollapsed: () => void;
  onToggleMetadataCollapsed: () => void;
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
            layout === "split"
              ? "auto auto auto minmax(360px, 1fr)"
              : undefined,
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
          isCollapsed={isAssetsCollapsed}
          copiedAssetPath={copiedAssetPath}
          copyWarning={copyWarning}
          onToggleCollapsed={onToggleAssetsCollapsed}
          onAssetUpload={onAssetUpload}
          onCopyAssetPath={onCopyAssetPath}
        />
        <MetadataPanel
          values={metadataValues}
          assets={assets}
          isCollapsed={isMetadataCollapsed}
          slugError={slugError}
          descriptionError={descriptionError}
          onToggleCollapsed={onToggleMetadataCollapsed}
          onMetadataChange={onMetadataChange}
          onRegenerateSlug={onRegenerateSlug}
          onAssetUpload={onAssetUpload}
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
