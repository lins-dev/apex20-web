/**
 * Apex20 Design Tokens - Typography ✍️
 * Based on the Linear-style VTT Wireframe
 */

export const typography = {
  fontFamily: {
    sans: [
      "'Inter'",
      "-apple-system",
      "BlinkMacSystemFont",
      "'Segoe UI'",
      "system-ui",
      "sans-serif",
    ],
    mono: ["'JetBrains Mono'", "monospace"],
  },
  fontSize: {
    xs: "0.6875rem", // 11px
    sm: "0.75rem", // 12px
    base: "0.8125rem", // 13px
    md: "0.875rem", // 14px
    lg: "1rem", // 16px
    xl: "1.125rem", // 18px
    "2xl": "1.25rem", // 20px
    "3xl": "1.5rem", // 24px
  },
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    none: "1",
    tight: "1.2",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
};
