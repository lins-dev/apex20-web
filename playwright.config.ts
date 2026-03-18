import { defineConfig, devices } from "@playwright/test";

/**
 * ADR-031: Testes de Regressão Visual via Playwright
 *
 * - Todos os snapshots são tirados com animações desabilitadas para determinismo.
 * - Threshold de 0.2 para ignorar variações de sub-pixel.
 * - Para atualizar snapshots: npm run test:visual:update
 * - Em CI, os snapshots são gerados dentro do container Docker oficial do Playwright.
 */
export default defineConfig({
  testDir: "./playwright/visual",

  // Snapshots são commitados no repositório para rastreabilidade via Git (ADR-031)
  snapshotDir: "./playwright/snapshots",
  snapshotPathTemplate: "{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{arg}{ext}",

  expect: {
    toHaveScreenshot: {
      // Tolerância para variações de sub-pixel entre máquinas (ADR-031)
      threshold: 0.2,
      animations: "disabled",
    },
  },

  use: {
    baseURL: "http://localhost:6007",
    // Desabilita transições CSS para determinismo dos snapshots (ADR-031)
    reducedMotion: "reduce",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npm run storybook -- --ci --quiet",
    url: "http://localhost:6007",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
