import { test, expect } from "@playwright/test";

const TEST_EMAIL = "e2e@apex20.dev";
const TEST_PASSWORD = "senha1234";
const TEST_NAME = "E2E User";

test.describe("Auth — Route Guards (middleware)", () => {
  test("redirects unauthenticated user from /campaigns to /login", async ({ page }) => {
    await page.goto("/campaigns");
    await expect(page).toHaveURL(/\/login/);
  });

  test("redirects unauthenticated user from /dashboard to /login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("allows unauthenticated access to /login", async ({ page }) => {
    await page.goto("/login");
    await expect(page).not.toHaveURL(/\/login.*login/);
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("allows unauthenticated access to /signup", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
  });
});

test.describe("Auth — SignIn Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("renders email, password fields and submit button", async ({ page }) => {
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("shows validation error for empty email", async ({ page }) => {
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("shows validation error for short password", async ({ page }) => {
    await page.getByLabel(/email/i).fill(TEST_EMAIL);
    await page.getByLabel(/password/i).fill("short");
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByText(/8 characters/i)).toBeVisible();
  });

  test("link to signup page navigates correctly", async ({ page }) => {
    await page.getByRole("link", { name: /create one/i }).click();
    await expect(page).toHaveURL(/\/signup/);
  });
});

test.describe("Auth — SignUp Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  test("renders name, email, password fields and submit button", async ({ page }) => {
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /create account/i })).toBeVisible();
  });

  test("shows validation error for short name", async ({ page }) => {
    await page.getByLabel(/name/i).fill("A");
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page.getByText(/2 characters/i)).toBeVisible();
  });

  test("shows validation error for invalid email", async ({ page }) => {
    await page.getByLabel(/name/i).fill(TEST_NAME);
    await page.getByLabel(/email/i).fill("not-an-email");
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("link to signin page navigates correctly", async ({ page }) => {
    await page.getByRole("link", { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/login/);
  });
});

test.describe("Auth — Full Flow (requires backend)", () => {
  test("shows error on invalid credentials (unknown email)", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel(/email/i).fill("ghost@apex20.dev");
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByText(/invalid email or password/i)).toBeVisible({ timeout: 5000 });
  });

  test("signup creates account and redirects", async ({ page }) => {
    const uniqueEmail = `e2e-${Date.now()}@apex20.dev`;

    await page.goto("/signup");
    await page.getByLabel(/name/i).fill(TEST_NAME);
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /create account/i }).click();

    await expect(page).not.toHaveURL(/\/signup/, { timeout: 5000 });
  });

  test("signin with valid credentials redirects", async ({ page }) => {
    const uniqueEmail = `e2e-signin-${Date.now()}@apex20.dev`;

    // Signup first
    await page.goto("/signup");
    await page.getByLabel(/name/i).fill(TEST_NAME);
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page).not.toHaveURL(/\/signup/, { timeout: 5000 });

    // Clear cookie and signin
    await page.context().clearCookies();
    await page.goto("/login");
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /sign in/i }).click();

    await expect(page).not.toHaveURL(/\/login/, { timeout: 5000 });
  });

  test("authenticated user is redirected away from /login", async ({ page }) => {
    const uniqueEmail = `e2e-redir-${Date.now()}@apex20.dev`;

    await page.goto("/signup");
    await page.getByLabel(/name/i).fill(TEST_NAME);
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/password/i).fill(TEST_PASSWORD);
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page).not.toHaveURL(/\/signup/, { timeout: 5000 });

    // Tenta ir para /login autenticado — deve redirecionar
    await page.goto("/login");
    await expect(page).not.toHaveURL(/\/login/);
  });
});
