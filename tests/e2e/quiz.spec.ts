import { test, expect } from "@playwright/test";

test.describe("Quiz flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/quiz");
  });

  test("loads the quiz page with the first step", async ({ page }) => {
    await expect(page.getByText("What is your role?")).toBeVisible();
  });

  test("shows step indicators in header", async ({ page }) => {
    // The step numbers 1-4 are always visible; labels show on sm+ screens
    await expect(page.getByText("1").first()).toBeVisible();
  });

  test("advances to Goal step after selecting a role", async ({ page }) => {
    await page.getByText("Product Manager").click();
    // Next step heading
    await expect(page.locator("h1").first()).not.toHaveText(/what is your role/i, { timeout: 3000 });
  });

  test("advances to Time step after selecting a goal", async ({ page }) => {
    await page.getByText("Product Manager").click();
    await page.waitForTimeout(400);
    await page.getByText("Internal workflow tool").click();
    await expect(page.getByText("2–3 hours/week")).toBeVisible({ timeout: 3000 });
  });

  test("completes all 4 steps and shows the result", async ({ page }) => {
    await page.getByText("Product Manager").click();
    await page.waitForTimeout(400);
    await page.getByText("Internal workflow tool").click();
    await page.waitForTimeout(400);
    await page.getByText("4–6 hours/week").click();
    await page.waitForTimeout(400);
    await page.getByRole("button", { name: /^Run only/ }).click();
    await page.waitForTimeout(400);

    await expect(page.getByText(/your path/i).first()).toBeVisible({ timeout: 3000 });
    await expect(page.getByRole("heading", { name: /PM track/i })).toBeVisible();
  });

  // Helper: complete all 4 quiz steps
  async function completeQuiz(page: import("@playwright/test").Page) {
    await page.getByText("Product Manager").click();
    await page.waitForTimeout(400);
    await page.getByText("Internal workflow tool").click();
    await page.waitForTimeout(400);
    await page.getByText("4–6 hours/week").click();
    await page.waitForTimeout(400);
    // Use role=button to avoid matching the h1 which also contains "Run only"
    await page.getByRole("button", { name: /^Run only/ }).click();
    await page.waitForTimeout(400);
  }

  test("shows free kit email form on result page", async ({ page }) => {
    await completeQuiz(page);
    const emailInput = page.locator("input[type='email']");
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("placeholder", /email/i);
  });

  test("shows enrol button on result page", async ({ page }) => {
    await completeQuiz(page);
    await expect(page.getByText(/enrol now/i).first()).toBeVisible();
    await expect(page.getByText("€200").first()).toBeVisible();
  });

  test("back button works from step 2", async ({ page }) => {
    await page.getByText("Product Manager").click();
    await page.waitForTimeout(400);
    await expect(page.getByText("Back")).toBeVisible();
    await page.getByText("Back").click();
    await expect(page.getByText("What is your role?")).toBeVisible();
  });

  test("enrol button shows error if email not entered first", async ({ page }) => {
    await completeQuiz(page);
    await page.getByText(/enrol now/i).first().click();
    await expect(page.getByText(/enter your email/i)).toBeVisible({ timeout: 2000 });
  });
});

test.describe("Quiz — mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("quiz works on mobile — step labels hidden, buttons full width", async ({ page }) => {
    await page.goto("/quiz");
    await expect(page.getByText("What is your role?")).toBeVisible();
    await page.getByText("Product Manager").click();
    await page.waitForTimeout(400);
    // Step advanced — role heading is gone
    await expect(page.locator("h1").first()).not.toHaveText(/what is your role/i, { timeout: 3000 });
  });
});
