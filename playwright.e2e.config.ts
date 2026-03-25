import { defineConfig, devices } from "@playwright/test";

/**
 * E2E tests for the Apex20 web app (Next.js).
 * Runs against the running dev server (Docker: http://localhost:3020).
 *
 * To run: npm run test:e2e
 * To run against a local dev server: npm run test:e2e:local
 */
export default defineConfig({
  testDir: "./playwright/e2e",
  timeout: 60000,

  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3020",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
