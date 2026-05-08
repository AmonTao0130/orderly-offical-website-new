import type { ReactNode } from "react";
import type { EditorLayoutMode } from "../types";

export function PreviewPanel({
  layout,
  panelHeight,
  children,
}: {
  layout: EditorLayoutMode;
  panelHeight: string;
  children: ReactNode;
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
