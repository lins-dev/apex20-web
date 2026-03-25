import { test, expect, type Page } from "@playwright/test";

const IFRAME = "http://localhost:6007/iframe.html";

async function gotoStory(page: Page, id: string) {
  await page.goto(`${IFRAME}?id=${id}&viewMode=story`);
  await page.waitForSelector("#storybook-root > *", { state: "visible" });
}

test.describe("Auth / SignInForm", () => {
  test("en", async ({ page }) => {
    await gotoStory(page, "auth-signinform--default");
    await expect(page).toHaveScreenshot("sign-in-form-en.png");
  });

  test("pt-br", async ({ page }) => {
    await gotoStory(page, "auth-signinform--pt-br");
    await expect(page).toHaveScreenshot("sign-in-form-pt-br.png");
  });

  test("es", async ({ page }) => {
    await gotoStory(page, "auth-signinform--es");
    await expect(page).toHaveScreenshot("sign-in-form-es.png");
  });

  test("fr", async ({ page }) => {
    await gotoStory(page, "auth-signinform--fr");
    await expect(page).toHaveScreenshot("sign-in-form-fr.png");
  });
});

test.describe("Auth / SignUpForm", () => {
  test("en", async ({ page }) => {
    await gotoStory(page, "auth-signupform--default");
    await expect(page).toHaveScreenshot("sign-up-form-en.png");
  });

  test("pt-br", async ({ page }) => {
    await gotoStory(page, "auth-signupform--pt-br");
    await expect(page).toHaveScreenshot("sign-up-form-pt-br.png");
  });

  test("es", async ({ page }) => {
    await gotoStory(page, "auth-signupform--es");
    await expect(page).toHaveScreenshot("sign-up-form-es.png");
  });

  test("fr", async ({ page }) => {
    await gotoStory(page, "auth-signupform--fr");
    await expect(page).toHaveScreenshot("sign-up-form-fr.png");
  });
});
