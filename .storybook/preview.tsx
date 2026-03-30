import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        dark: { name: "dark", value: "#0a0514" },
        light: { name: "light", value: "#f8f6fc" }
      }
    },
    layout: "fullscreen",
    // Disable CSS transitions for deterministic snapshots (ADR-031)
    chromatic: { disableSnapshot: false },
  },

  initialGlobals: {
    backgrounds: {
      value: "dark"
    }
  }
};

export default preview;
