import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero headline", async ({ page }) => {
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("has the correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Torvi/);
  });

  test("navbar shows Take the quiz CTA", async ({ page }) => {
    const quizLink = page.getByRole("link", { name: /quiz/i }).first();
    await expect(quizLink).toBeVisible();
  });

  test("pricing section is present", async ({ page }) => {
    await page.locator("#pricing").scrollIntoViewIfNeeded();
    await expect(page.locator("#pricing")).toBeVisible();
    // Exact match to avoid strict-mode violations with multiple €200 occurrences
    await expect(page.locator("#pricing").getByText("€200").first()).toBeVisible();
    await expect(page.locator("#pricing").getByText("€79").first()).toBeVisible();
  });

  test("FAQ section is visible", async ({ page }) => {
    // FAQ label is an uppercase <p> tag in the FAQ section
    const faq = page.locator("p").filter({ hasText: /^FAQ$/ }).first();
    await faq.scrollIntoViewIfNeeded();
    await expect(faq).toBeVisible();
  });

  test("Get your free role kit CTA navigates to /quiz", async ({ page }) => {
    const link = page.getByRole("link", { name: /get your free role kit/i }).first();
    await expect(link).toHaveAttribute("href", "/quiz");
  });

  test("footer is present", async ({ page }) => {
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  });
});

test.describe("Landing page — mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("renders without horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("mobile nav hamburger is visible and opens menu", async ({ page }) => {
    await page.goto("/");
    const hamburger = page.locator("[aria-label='Open menu']");
    await expect(hamburger).toBeVisible({ timeout: 5000 });
    await hamburger.click();
    await expect(page.locator("[aria-label='Close menu']")).toBeVisible();
  });
});
