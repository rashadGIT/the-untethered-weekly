import { test, expect } from "@playwright/test";

/**
 * E2E: FEARX speaker and panelist application flows
 *
 * All API calls are intercepted so tests are deterministic and independent
 * of the external n8n webhook.
 */

const SPEAKER_FORM_SELECTOR = "#speaker-form, section:has(#speaker-firstName)";
const PANELIST_FORM_SELECTOR = "#panelist-form, section:has(#panelist-firstName)";

test.describe("FEARX speaker application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/fearx");
  });

  test("/fearx page loads with a heading", async ({ page }) => {
    await expect(page.getByRole("heading").first()).toBeVisible();
  });

  test("speaker apply form is visible on the FEARX page", async ({ page }) => {
    await expect(page.locator("#speaker-firstName")).toBeVisible();
  });

  test("submitting a valid speaker application shows success message", async ({ page }) => {
    await page.route("/api/fearx-apply", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator("#speaker-firstName").scrollIntoViewIfNeeded();
    await page.locator("#speaker-firstName").fill("Jane");
    await page.locator("#speaker-email").fill("jane@example.com");
    await page.locator("#speaker-role").fill("Sales Director");
    await page.locator("#speaker-years").selectOption("5-10");
    await page.locator("#speaker-story").fill(
      "For years I let fear dictate my sales calls. One day I chose courage over comfort and everything changed. That moment transformed my entire career and I want to share it."
    );

    await page.getByRole("button", { name: /apply to become a fearx speaker/i }).click();

    await expect(page.getByText(/application received/i)).toBeVisible({ timeout: 8000 });
  });

  test("speaker success message contains the applicant's first name", async ({ page }) => {
    await page.route("/api/fearx-apply", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator("#speaker-firstName").scrollIntoViewIfNeeded();
    await page.locator("#speaker-firstName").fill("Maria");
    await page.locator("#speaker-email").fill("maria@example.com");
    await page.locator("#speaker-story").fill(
      "My courage story spans fifteen years of overcoming rejection and choosing to persist through every fear in my sales career."
    );

    await page.getByRole("button", { name: /apply to become a fearx speaker/i }).click();

    await expect(page.getByText(/Maria/)).toBeVisible({ timeout: 8000 });
  });

  test("speaker form shows loading state during submission", async ({ page }) => {
    await page.route("/api/fearx-apply", async (route) => {
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator("#speaker-firstName").scrollIntoViewIfNeeded();
    await page.locator("#speaker-firstName").fill("Jane");
    await page.locator("#speaker-email").fill("jane@example.com");
    await page.locator("#speaker-story").fill("A detailed courage story about overcoming fear in sales across many years.");

    await page.getByRole("button", { name: /apply to become a fearx speaker/i }).click();

    await expect(page.getByText(/submitting/i).first()).toBeVisible({ timeout: 3000 });
  });

  test("speaker form shows error alert on API failure", async ({ page }) => {
    await page.route("/api/fearx-apply", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Submission failed. Please try again." }),
      });
    });

    await page.locator("#speaker-firstName").scrollIntoViewIfNeeded();
    await page.locator("#speaker-firstName").fill("Jane");
    await page.locator("#speaker-email").fill("jane@example.com");
    await page.locator("#speaker-story").fill("My courage story in detail spanning many paragraphs and years of experience.");

    await page.getByRole("button", { name: /apply to become a fearx speaker/i }).click();

    await expect(page.getByRole("alert").first()).toBeVisible({ timeout: 8000 });
  });
});

test.describe("FEARX panelist application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/fearx");
  });

  test("panelist apply form is visible on the FEARX page", async ({ page }) => {
    await expect(page.locator("#panelist-firstName")).toBeVisible();
  });

  test("submitting a valid panelist application shows success message", async ({ page }) => {
    await page.route("/api/fearx-apply", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator("#panelist-firstName").scrollIntoViewIfNeeded();
    await page.locator("#panelist-firstName").fill("Sarah");
    await page.locator("#panelist-email").fill("sarah@example.com");
    await page.locator("#panelist-role").fill("Account Executive");
    await page.locator("#panelist-years").selectOption("10+");
    await page.locator("#panelist-story").fill(
      "Over 10 years in sales I have learned that courage is the foundation of every great deal. I have stories of transformation I am eager to share with the FEARX audience."
    );

    await page.getByRole("button", { name: /apply to become a fearx panelist/i }).click();

    await expect(page.getByText(/application received/i)).toBeVisible({ timeout: 8000 });
  });

  test("panelist success message mentions 'FEARX Panelist'", async ({ page }) => {
    await page.route("/api/fearx-apply", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator("#panelist-firstName").scrollIntoViewIfNeeded();
    await page.locator("#panelist-firstName").fill("Lisa");
    await page.locator("#panelist-email").fill("lisa@example.com");
    await page.locator("#panelist-story").fill(
      "My decade-long sales career taught me courage is the only tool that works when everything else fails in a high-stakes closing situation."
    );

    await page.getByRole("button", { name: /apply to become a fearx panelist/i }).click();

    await expect(page.getByText(/fearx panelist/i)).toBeVisible({ timeout: 8000 });
  });
});
