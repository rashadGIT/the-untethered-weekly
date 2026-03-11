import { test, expect } from "@playwright/test";

/**
 * E2E: Newsletter signup flow
 *
 * Covers the happy path and error path for the newsletter form on the homepage.
 * The API call to /api/newsletter is intercepted so tests are deterministic
 * and do not depend on the external n8n webhook.
 */

test.describe("Newsletter signup flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Scroll the newsletter section into view
    await page.locator("#newsletter").scrollIntoViewIfNeeded();
  });

  test("newsletter section is visible on the homepage", async ({ page }) => {
    await expect(page.locator("#newsletter")).toBeVisible();
  });

  test("email and first-name inputs are present", async ({ page }) => {
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(page.getByLabel(/first name/i)).toBeVisible();
  });

  test("successful signup shows success confirmation", async ({ page }) => {
    // Intercept the API and return a mocked success response
    await page.route("/api/newsletter", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Welcome to the tribe!" }),
      });
    });

    await page.getByLabel(/email address/i).fill("shannon@example.com");
    await page.getByLabel(/first name/i).fill("Shannon");
    await page.getByRole("button", { name: /subscribe to the untethered weekly/i }).click();

    await expect(page.getByText(/you're in/i)).toBeVisible({ timeout: 8000 });
  });

  test("shows the custom message returned from the API on success", async ({ page }) => {
    await page.route("/api/newsletter", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: "Welcome to the tribe!" }),
      });
    });

    await page.getByLabel(/email address/i).fill("test@example.com");
    await page.getByRole("button", { name: /subscribe to the untethered weekly/i }).click();

    await expect(page.getByText(/welcome to the tribe/i)).toBeVisible({ timeout: 8000 });
  });

  test("shows an error alert when the API returns an error", async ({ page }) => {
    await page.route("/api/newsletter", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ error: "Email is required" }),
      });
    });

    // Submit with no email to trigger our mocked error
    await page.getByRole("button", { name: /subscribe to the untethered weekly/i }).click();
    // Browser validation will block an empty required field, so fill a value and let the mock return 400
    await page.getByLabel(/email address/i).fill("bad@domain.com");
    await page.getByRole("button", { name: /subscribe to the untethered weekly/i }).click();

    await expect(page.getByRole("alert")).toBeVisible({ timeout: 8000 });
  });

  test("submit button shows loading state", async ({ page }) => {
    // Delay the API response so we can observe the loading state
    await page.route("/api/newsletter", async (route) => {
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, message: null }),
      });
    });

    await page.getByLabel(/email address/i).fill("test@example.com");
    await page.getByRole("button", { name: /subscribe to the untethered weekly/i }).click();

    await expect(page.getByText(/subscribing/i)).toBeVisible({ timeout: 3000 });
  });
});
