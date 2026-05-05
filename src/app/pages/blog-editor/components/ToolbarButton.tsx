import type { ReactNode } from "react";

export function ToolbarButton({
  children,
  onClick,
  variant = "secondary",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        minHeight: "34px",
        padding: "0 13px",
        borderRadius: "6px",
        border: isPrimary
          ? "1px solid rgba(68,222,211,0.5)"
          : "1px solid rgba(255,255,255,0.14)",
        background: isPrimary
          ? "rgba(68,222,211,0.14)"
          : "rgba(255,255,255,0.055)",
        color: isPrimary ? "#44DED3" : "rgba(255,255,255,0.88)",
        cursor: "pointer",
        fontFamily: "'atyp-bl-variable','atyp-bl',sans-serif",
        fontVariationSettings: "'wght' 600",
        fontSize: "13px",
        whiteSpace: "nowrap",
        boxShadow: isPrimary ? "0 0 24px rgba(68,222,211,0.08)" : "none",
      }}
    >
      {children}
    </button>
  );
}
