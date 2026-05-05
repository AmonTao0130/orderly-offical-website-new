import type { EditorLayoutMode } from "../types";

export function LayoutToggle({
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
