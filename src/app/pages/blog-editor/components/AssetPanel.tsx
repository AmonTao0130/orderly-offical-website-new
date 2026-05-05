import type { ChangeEvent } from "react";
import type { BlogEditorAsset } from "../types";

export function AssetPanel({
  assets,
  isCollapsed,
  copiedAssetPath,
  copyWarning,
  onToggleCollapsed,
  onAssetUpload,
  onCopyAssetPath,
}: {
  assets: BlogEditorAsset[];
  isCollapsed: boolean;
  copiedAssetPath: string;
  copyWarning: string;
  onToggleCollapsed: () => void;
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
        onClick={onToggleCollapsed}
        style={{
          minHeight: "44px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          padding: "0 14px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          cursor: "pointer",
        }}
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleCollapsed();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            minWidth: 0,
            border: "0",
            background: "transparent",
            padding: 0,
            cursor: "pointer",
            textAlign: "left",
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
          <span
            aria-hidden="true"
            style={{
              color: "rgba(255,255,255,0.42)",
              fontFamily: "'DM Mono','dm-mono',monospace",
              fontSize: "14px",
            }}
          >
            {isCollapsed ? "▾" : "▴"}
          </span>
        </button>

        <label
          onClick={(event) => event.stopPropagation()}
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

      {!isCollapsed && copyWarning && (
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

      {!isCollapsed && assets.length === 0 ? (
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
      ) : !isCollapsed ? (
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
      ) : null}
    </div>
  );
}
