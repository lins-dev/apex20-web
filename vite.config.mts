import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import path from "path";

const apiUrl = process.env["VITE_API_URL"] ?? "http://localhost:8787";

export default defineConfig({
  plugins: [
    tanstackStart({
      router: {
        routesDirectory: "./src/routes",
        generatedRouteTree: "./src/routeTree.gen.ts",
      },
    }),
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@contracts": path.resolve(__dirname, "./contracts/gen/ts"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/connect": {
        target: apiUrl,
        changeOrigin: true,
      },
    },
  },
});
