import { test, expect, type Page } from "@playwright/test";

const IFRAME = "http://localhost:6007/iframe.html";

async function gotoStory(page: Page, id: string) {
  await page.goto(`${IFRAME}?id=${id}&viewMode=story`);
  await page.waitForSelector("#storybook-root > *", { state: "visible" });
}

test.describe("Landing / Systems", () => {
  test("en", async ({ page }) => {
    await gotoStory(page, "landing-systems--default");
    await expect(page).toHaveScreenshot("systems-en.png");
  });

  test("pt-br", async ({ page }) => {
    await gotoStory(page, "landing-systems--pt-br");
    await expect(page).toHaveScreenshot("systems-pt-br.png");
  });
});

test.describe("Landing / CtaBanner", () => {
  test("en", async ({ page }) => {
    await gotoStory(page, "landing-ctabanner--default");
    await expect(page).toHaveScreenshot("cta-banner-en.png");
  });

  test("pt-br", async ({ page }) => {
    await gotoStory(page, "landing-ctabanner--pt-br");
    await expect(page).toHaveScreenshot("cta-banner-pt-br.png");
  });
});

test.describe("Landing / Features", () => {
  test("en", async ({ page }) => {
    await gotoStory(page, "landing-features--default");
    await expect(page).toHaveScreenshot("features-en.png");
  });

  test("pt-br", async ({ page }) => {
    await gotoStory(page, "landing-features--pt-br");
    await expect(page).toHaveScreenshot("features-pt-br.png");
  });
});

test.describe("Landing / Footer", () => {
  test("en", async ({ page }) => {
    await gotoStory(page, "landing-footer--default");
    await expect(page).toHaveScreenshot("footer-en.png");
  });

  test("pt-br", async ({ page }) => {
    await gotoStory(page, "landing-footer--pt-br");
    await expect(page).toHaveScreenshot("footer-pt-br.png");
  });
});
