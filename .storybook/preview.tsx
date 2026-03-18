import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0a0514" },
        { name: "light", value: "#f8f6fc" },
      ],
    },
    layout: "fullscreen",
    // Disable CSS transitions for deterministic snapshots (ADR-031)
    chromatic: { disableSnapshot: false },
  },
};

export default preview;
