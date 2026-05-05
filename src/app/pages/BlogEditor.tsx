"use client";

import BlogPost from "./BlogPost";
import {
  BLOG_EDITOR_CONTENT_MAX_WIDTH,
  BLOG_EDITOR_SPLIT_GAP,
} from "./blog-editor/constants";
import { EditorPanel, PreviewPanel, UploadPanel } from "./blog-editor/components";
import { useBlogEditor } from "./blog-editor/useBlogEditor";

export default function BlogEditor() {
  const editor = useBlogEditor();
  const post = editor.post;

  return (
    <>
      <UploadPanel {...editor.uploadPanelProps} />

      <main
        style={{
          minHeight: editor.effectiveLayout === "split" ? undefined : "100vh",
          height: editor.effectiveLayout === "split" ? "100vh" : undefined,
          background: "#000",
          color: "white",
          padding: `${editor.workspaceTopPadding}px 24px 24px`,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxSizing: "border-box",
          overflow: editor.effectiveLayout === "split" ? "hidden" : undefined,
        }}
      >
        <div
          style={{
            width: `min(100%, ${editor.workspaceMaxWidth}px)`,
            margin: "0 auto",
            display: editor.effectiveLayout === "split" ? "grid" : "block",
            gridTemplateColumns:
              editor.effectiveLayout === "split"
                ? `minmax(0, ${BLOG_EDITOR_CONTENT_MAX_WIDTH}px) minmax(0, ${editor.previewPanelMaxWidth}px)`
                : undefined,
            alignItems: "start",
            justifyContent:
              editor.effectiveLayout === "split" ? "center" : undefined,
            gap:
              editor.effectiveLayout === "split"
                ? `${BLOG_EDITOR_SPLIT_GAP}px`
                : undefined,
          }}
        >
          <EditorPanel {...editor.editorPanelProps} />

          <PreviewPanel {...editor.previewPanelProps}>
            <BlogPost
              slug={post?.slug || "blog-draft"}
              post={post}
              latestPosts={[]}
              hideChrome
              previewMode="editor"
            />
          </PreviewPanel>
        </div>
      </main>
    </>
  );
}
