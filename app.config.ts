import { defineConfig } from "@tanstack/start/config";

export default defineConfig({
  tsr: {
    routesDirectory: "./src/routes",
    generatedRouteTree: "./src/routeTree.gen.ts",
  },
  vite: {
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
        "@contracts": new URL("./contracts/gen/ts", import.meta.url).pathname,
      },
    },
  },
  server: {
    routeRules: {
      "/connect/**": {
        proxy: `${process.env["VITE_API_URL"] ?? "http://localhost:8787"}/**`,
      },
    },
  },
});
