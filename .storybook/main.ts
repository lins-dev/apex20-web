import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), "src"),
          "@contracts": path.resolve(process.cwd(), "contracts/gen/ts"),
          "next/link": path.resolve(process.cwd(), "src/__mocks__/next-link.tsx"),
        },
      },
    });
  },
};

export default config;
