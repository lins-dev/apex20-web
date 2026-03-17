/**
 * Apex20 Design Tokens - Colors 🎨
 * Based on the Linear-style VTT Wireframe (deep purple aesthetic)
 */

export const colors = {
  // Dark Mode (Default)
  dark: {
    bg: {
      base: "#0a0514",
      surface: "#110a20",
      elevated: "#1a1030",
      overlay: "rgba(10, 5, 20, 0.85)",
      hover: "rgba(139, 92, 246, 0.08)",
      active: "rgba(139, 92, 246, 0.14)",
    },
    border: {
      subtle: "rgba(139, 92, 246, 0.10)",
      default: "rgba(139, 92, 246, 0.18)",
      strong: "rgba(139, 92, 246, 0.30)",
    },
    text: {
      primary: "#ede9f6",
      secondary: "#9b8ec4",
      tertiary: "#675b85",
      disabled: "#4a3d6a",
    },
    accent: {
      base: "#8b5cf6",
      hover: "#a78bfa",
      muted: "rgba(139, 92, 246, 0.20)",
      glow: "rgba(139, 92, 246, 0.35)",
    },
  },

  // Light Mode (Accessible)
  light: {
    bg: {
      base: "#f8f6fc",
      surface: "#ffffff",
      elevated: "#f0ecf9",
      overlay: "rgba(248, 246, 252, 0.90)",
      hover: "rgba(139, 92, 246, 0.06)",
      active: "rgba(139, 92, 246, 0.10)",
    },
    border: {
      subtle: "rgba(139, 92, 246, 0.10)",
      default: "rgba(139, 92, 246, 0.18)",
      strong: "rgba(139, 92, 246, 0.28)",
    },
    text: {
      primary: "#1a1028",
      secondary: "#5b4f78",
      tertiary: "#8a7faa",
      disabled: "#b8b0cc",
    },
    accent: {
      base: "#7c3aed",
      hover: "#6d28d9",
      muted: "rgba(124, 58, 237, 0.12)",
      glow: "rgba(124, 58, 237, 0.15)",
    },
  },
};
