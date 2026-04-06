import { test, expect } from "@playwright/test";

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("renders the login form", async ({ page }) => {
    await expect(page.locator("input[type='email']")).toBeVisible();
    await expect(page.getByRole("button", { name: /send|continue|log in/i })).toBeVisible();
  });

  test("shows error when submitting unknown email", async ({ page }) => {
    await page.fill("input[type='email']", "unknown@nobody.com");
    await page.getByRole("button", { name: /send|continue|log in/i }).click();
    // Should show no_account error message
    await expect(page.getByText(/no account|not found|don't have an account/i)).toBeVisible({ timeout: 5000 });
  });

  test("shows password field for admin email", async ({ page }) => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "theolaakomolafe@gmail.com";
    await page.fill("input[type='email']", adminEmail);
    // Admin form shows password field
    await expect(page.locator("input[type='password']")).toBeVisible({ timeout: 2000 });
  });

  test("shows error for admin with wrong password", async ({ page }) => {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "theolaakomolafe@gmail.com";
    await page.fill("input[type='email']", adminEmail);
    await page.fill("input[type='password']", "wrong_password_123");
    await page.getByRole("button", { name: /log in|sign in/i }).click();
    await expect(page.getByText(/incorrect|wrong|invalid/i)).toBeVisible({ timeout: 5000 });
  });

  test("email field is required", async ({ page }) => {
    await page.getByRole("button", { name: /send|continue|log in/i }).click();
    // HTML5 validation prevents submission
    const emailInput = page.locator("input[type='email']");
    const validationMessage = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).not.toBe("");
  });
});

test.describe("404 page", () => {
  test("shows custom not-found page for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-xyz");
    await expect(page.getByText("Page not found")).toBeVisible();
    await expect(page.getByRole("link", { name: /back to home/i })).toBeVisible();
  });

  test("back to home link navigates to /", async ({ page }) => {
    await page.goto("/this-route-is-fake");
    await page.getByRole("link", { name: /back to home/i }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Protected routes", () => {
  test("unauthenticated access to /hub redirects to login", async ({ page }) => {
    await page.goto("/hub");
    // Should redirect somewhere (login or forbidden)
    await expect(page).not.toHaveURL("/hub");
  });

  test("unauthenticated access to /admin redirects", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).not.toHaveURL("/admin");
  });
});
