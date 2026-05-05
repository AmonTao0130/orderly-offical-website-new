import type { ChangeEvent, CSSProperties, ReactNode } from "react";
import { CircleHelp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import blogConfig from "@/content/blog/config/blog.config.json";
import {
  BLOG_DESCRIPTION_MAX_LENGTH,
  BLOG_PUBLICATION_STATES,
} from "../constants";
import type {
  BlogEditorAsset,
  BlogMetadataField,
  BlogMetadataFormValues,
} from "../types";

const METADATA_FIELD_HELP: Record<BlogMetadataField, string> = {
  title: "Blog post title.",
  slug: "URL-safe post slug.",
  description: "Short SEO/social summary.",
  cover: "Cover image path used by the post.",
  category: "Blog category slug.",
  author: "Post author name.",
  publicationState: "Whether the post is live or preview-only.",
  pin: "Whether the post is pinned/featured.",
  date: "Publish date.",
};

function MetadataLabelText({
  children,
  field,
  tooltip,
}: {
  children: ReactNode;
  field: BlogMetadataField;
  tooltip: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        minWidth: 0,
      }}
    >
      <span>{children}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={`${children} metadata help`}
            style={{
              width: "16px",
              height: "16px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              border: 0,
              background: "transparent",
              color: "rgba(255,255,255,0.44)",
              cursor: "help",
            }}
          >
            <CircleHelp size={14} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={8}
          style={{
            maxWidth: "240px",
            border: "1px solid rgba(255,255,255,0.14)",
            background: "#101014",
            color: "rgba(255,255,255,0.86)",
            boxShadow: "0 12px 36px rgba(0,0,0,0.38)",
            fontFamily: "'DM Mono','dm-mono',monospace",
            lineHeight: 1.45,
          }}
        >
          <span style={{ display: "grid", gap: "4px" }}>
            <span>{tooltip}</span>
            <span style={{ color: "rgba(255,255,255,0.56)" }}>
              Updates: {field}
            </span>
          </span>
        </TooltipContent>
      </Tooltip>
    </span>
  );
}

function MetadataFieldLabel({
  children,
  field,
  tooltip,
  aside,
}: {
  children: ReactNode;
  field: BlogMetadataField;
  tooltip: string;
  aside?: ReactNode;
}) {
  return (
    <label
      style={{
        display: "grid",
        gap: "8px",
        color: "rgba(255,255,255,0.74)",
        fontFamily: "'DM Mono','dm-mono',monospace",
        fontSize: "12px",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <MetadataLabelText field={field} tooltip={tooltip}>
          {children}
        </MetadataLabelText>
        {aside && (
          <span style={{ color: "rgba(255,255,255,0.42)" }}>{aside}</span>
        )}
      </span>
    </label>
  );
}

function metadataInputStyle(multiline?: boolean): CSSProperties {
  return {
    width: "100%",
    minHeight: multiline ? "86px" : "38px",
    boxSizing: "border-box",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.13)",
    background: "rgba(0,0,0,0.22)",
    color: "rgba(255,255,255,0.86)",
    padding: multiline ? "10px 12px" : "0 12px",
    outline: "none",
    fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
    fontSize: "13px",
    lineHeight: 1.5,
    resize: multiline ? "vertical" : undefined,
  };
}

function MetadataSegmentedControl({
  label,
  field,
  tooltip,
  value,
  options,
  onChange,
}: {
  label: string;
  field: BlogMetadataField;
  tooltip: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div style={{ display: "grid", gap: "8px" }}>
      <div
        style={{
          color: "rgba(255,255,255,0.74)",
          fontFamily: "'DM Mono','dm-mono',monospace",
          fontSize: "12px",
        }}
      >
        <MetadataLabelText field={field} tooltip={tooltip}>
          {label}
        </MetadataLabelText>
      </div>
      <div
        role="group"
        aria-label={label}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
          gap: "4px",
          minHeight: "38px",
          padding: "4px",
          borderRadius: "7px",
          border: "1px solid rgba(255,255,255,0.13)",
          background: "rgba(0,0,0,0.22)",
        }}
      >
        {options.map((option) => {
          const isActive = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option)}
              style={{
                border: "0",
                borderRadius: "5px",
                background: isActive ? "rgba(68,222,211,0.16)" : "transparent",
                color: isActive ? "#44DED3" : "rgba(255,255,255,0.66)",
                cursor: "pointer",
                fontFamily: "'DM Mono','dm-mono',monospace",
                fontSize: "12px",
                textTransform: "uppercase",
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function MetadataPanel({
  values,
  assets,
  isCollapsed,
  slugError,
  descriptionError,
  onToggleCollapsed,
  onMetadataChange,
  onRegenerateSlug,
  onAssetUpload,
}: {
  values: BlogMetadataFormValues;
  assets: BlogEditorAsset[];
  isCollapsed: boolean;
  slugError: string;
  descriptionError: string;
  onToggleCollapsed: () => void;
  onMetadataChange: (field: BlogMetadataField, value: string) => void;
  onRegenerateSlug: () => void;
  onAssetUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  const imageAssets = assets.filter((asset) => asset.isImage);
  const descriptionLength = values.description.length;
  const descriptionOverLimit = Boolean(descriptionError);

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
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
          padding: "0 14px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.018)",
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
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: "10px",
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
              flex: "0 0 auto",
            }}
          >
            Metadata
          </span>
          {isCollapsed && (
            <span
              style={{
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "rgba(255,255,255,0.48)",
                fontFamily: "'DM Mono','dm-mono',monospace",
                fontSize: "12px",
              }}
            >
              {[values.title || "Untitled", values.category]
                .filter(Boolean)
                .join(" · ")}
            </span>
          )}
          <span
            aria-hidden="true"
            style={{
              color: "rgba(255,255,255,0.42)",
              fontFamily: "'DM Mono','dm-mono',monospace",
              fontSize: "14px",
              flex: "0 0 auto",
            }}
          >
            {isCollapsed ? "▾" : "▴"}
          </span>
        </button>
        <span
          style={{
            color: "rgba(255,255,255,0.44)",
            fontFamily: "'DM Mono','dm-mono',monospace",
            fontSize: "12px",
          }}
        >
          frontmatter
        </span>
      </div>

      {!isCollapsed && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            alignItems: "start",
            gap: "14px",
            padding: "14px",
          }}
        >
          <div style={{ display: "grid", gap: "8px" }}>
            <MetadataFieldLabel
              field="title"
              tooltip={METADATA_FIELD_HELP.title}
            >
              Title
            </MetadataFieldLabel>
            <input
              value={values.title}
              onChange={(event) =>
                onMetadataChange("title", event.target.value)
              }
              style={metadataInputStyle()}
            />
          </div>

          <div style={{ display: "grid", gap: "8px" }}>
            <MetadataFieldLabel field="slug" tooltip={METADATA_FIELD_HELP.slug}>
              Slug
            </MetadataFieldLabel>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                alignItems: "stretch",
                borderRadius: "6px",
                border: slugError
                  ? "1px solid rgba(255,88,88,0.62)"
                  : "1px solid rgba(255,255,255,0.13)",
                background: "rgba(0,0,0,0.22)",
                overflow: "hidden",
              }}
            >
              <input
                value={values.slug}
                onChange={(event) =>
                  onMetadataChange("slug", event.target.value)
                }
                style={{
                  ...metadataInputStyle(),
                  border: "0",
                  background: "transparent",
                }}
              />
              <button
                type="button"
                aria-label="Regenerate slug"
                title="Regenerate slug"
                onClick={onRegenerateSlug}
                style={{
                  minHeight: "38px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  padding: 0,
                  border: "0",
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.035)",
                  color: "#6B63FF",
                  cursor: "pointer",
                  fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-block",
                    fontFamily: "'DM Mono','dm-mono',monospace",
                    fontSize: "18px",
                    lineHeight: 1,
                  }}
                >
                  ↻
                </span>
              </button>
            </div>
            {slugError && (
              <div
                style={{
                  color: "#ff9a9a",
                  fontFamily: "'DM Mono','dm-mono',monospace",
                  fontSize: "11px",
                  lineHeight: 1.45,
                }}
              >
                {slugError}
              </div>
            )}
          </div>

          <div style={{ display: "grid", gap: "8px" }}>
            <MetadataFieldLabel
              field="description"
              tooltip={METADATA_FIELD_HELP.description}
              aside={`${descriptionLength}/${BLOG_DESCRIPTION_MAX_LENGTH}`}
            >
              Description
            </MetadataFieldLabel>
            <textarea
              value={values.description}
              onChange={(event) =>
                onMetadataChange("description", event.target.value)
              }
              style={{
                ...metadataInputStyle(true),
                borderColor: descriptionOverLimit
                  ? "rgba(255,193,112,0.48)"
                  : "rgba(255,255,255,0.13)",
              }}
            />
            {descriptionError && (
              <div
                style={{
                  color: "#ffd59a",
                  fontFamily: "'DM Mono','dm-mono',monospace",
                  fontSize: "11px",
                  lineHeight: 1.45,
                }}
              >
                {descriptionError}
              </div>
            )}
          </div>

          <div style={{ display: "grid", gap: "8px" }}>
            <MetadataFieldLabel
              field="cover"
              tooltip={METADATA_FIELD_HELP.cover}
            >
              Cover
            </MetadataFieldLabel>
            <input
              value={values.cover}
              onChange={(event) =>
                onMetadataChange("cover", event.target.value)
              }
              placeholder="./thumbnail.jpg"
              style={metadataInputStyle()}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px",
              }}
            >
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
                Upload cover
                <input
                  type="file"
                  accept="image/*"
                  onChange={onAssetUpload}
                  style={{ display: "none" }}
                />
              </label>
              {imageAssets.length === 0 ? (
                <span
                  style={{
                    color: "rgba(255,255,255,0.42)",
                    fontFamily: "'DM Mono','dm-mono',monospace",
                    fontSize: "11px",
                  }}
                >
                  No uploaded images yet
                </span>
              ) : (
                imageAssets.map((asset) => (
                  <button
                    key={asset.path}
                    type="button"
                    onClick={() =>
                      onMetadataChange("cover", asset.markdownPath)
                    }
                    title={asset.markdownPath}
                    style={{
                      width: "32px",
                      height: "32px",
                      padding: 0,
                      borderRadius: "6px",
                      overflow: "hidden",
                      border:
                        values.cover === asset.markdownPath
                          ? "1px solid rgba(68,222,211,0.72)"
                          : "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(0,0,0,0.22)",
                      cursor: "pointer",
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
                          display: "block",
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "'DM Mono','dm-mono',monospace",
                          fontSize: "9px",
                        }}
                      >
                        IMG
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          <div style={{ display: "grid", gap: "8px" }}>
            <MetadataFieldLabel
              field="category"
              tooltip={METADATA_FIELD_HELP.category}
            >
              Category
            </MetadataFieldLabel>
            <select
              value={values.category}
              onChange={(event) =>
                onMetadataChange("category", event.target.value)
              }
              style={metadataInputStyle()}
            >
              {blogConfig.categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "grid", gap: "8px" }}>
            <MetadataFieldLabel
              field="author"
              tooltip={METADATA_FIELD_HELP.author}
            >
              Author
            </MetadataFieldLabel>
            <select
              value={values.author}
              onChange={(event) =>
                onMetadataChange("author", event.target.value)
              }
              style={metadataInputStyle()}
            >
              {blogConfig.authors.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          <MetadataSegmentedControl
            label="Publication state"
            field="publicationState"
            tooltip={METADATA_FIELD_HELP.publicationState}
            value={values.publicationState}
            options={BLOG_PUBLICATION_STATES}
            onChange={(value) => onMetadataChange("publicationState", value)}
          />

          <MetadataSegmentedControl
            label="Pin"
            field="pin"
            tooltip={METADATA_FIELD_HELP.pin}
            value={values.pin}
            options={["false", "true"]}
            onChange={(value) => onMetadataChange("pin", value)}
          />

          <div style={{ display: "grid", gap: "8px" }}>
            <MetadataFieldLabel field="date" tooltip={METADATA_FIELD_HELP.date}>
              Date
            </MetadataFieldLabel>
            <input
              type="date"
              value={values.date}
              onChange={(event) => onMetadataChange("date", event.target.value)}
              style={{
                ...metadataInputStyle(),
                colorScheme: "dark",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
