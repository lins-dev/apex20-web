import { test, expect, type Page } from "@playwright/test";

const IFRAME = "http://localhost:6007/iframe.html";

async function gotoStory(page: Page, id: string) {
  await page.goto(`${IFRAME}?id=${id}&viewMode=story`);
  await page.waitForSelector("#storybook-root > *", { state: "visible" });
}

test.describe("Button", () => {
  const stories = [
    { name: "primary", id: "web-ui-button--primary" },
    { name: "destructive", id: "web-ui-button--destructive" },
    { name: "outline", id: "web-ui-button--outline" },
    { name: "ghost", id: "web-ui-button--ghost" },
  ];

  for (const story of stories) {
    test(`variant: ${story.name}`, async ({ page }) => {
      await gotoStory(page, story.id);
      await expect(page).toHaveScreenshot(`button-${story.name}.png`);
    });
  }
});

test.describe("Design Tokens", () => {
  test("colors", async ({ page }) => {
    await gotoStory(page, "design-tokens--colors");
    await expect(page).toHaveScreenshot("tokens-colors.png");
  });

  test("typography", async ({ page }) => {
    await gotoStory(page, "design-tokens--typography");
    await expect(page).toHaveScreenshot("tokens-typography.png");
  });

  test("spacing", async ({ page }) => {
    await gotoStory(page, "design-tokens--spacing");
    await expect(page).toHaveScreenshot("tokens-spacing.png");
  });
});
