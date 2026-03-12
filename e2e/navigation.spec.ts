import { test, expect } from "@playwright/test";

/**
 * E2E: Navigation journeys
 *
 * Verifies that clicking each nav link loads the correct page and that
 * the mobile hamburger menu works at 375px viewport width.
 */

const NAV_LINKS = [
  { label: "Home", href: "/", headingPattern: /shannon muruli|courage/i },
  { label: "About", href: "/about", headingPattern: /about|shannon/i },
  { label: "Work With Me", href: "/work-with-me", headingPattern: /work with me|coaching/i },
  { label: "Results", href: "/client-results", headingPattern: /results|clients/i },
  { label: "Resources", href: "/resources", headingPattern: /resources/i },
  { label: "FEARX", href: "/fearx", headingPattern: /fearx|fear/i },
];

test.describe("Desktop navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  for (const { label, href } of NAV_LINKS) {
    test(`clicking '${label}' navigates to ${href}`, async ({ page }) => {
      // Use the first matching link (there may be desktop + mobile)
      const link = page.getByRole("link", { name: label }).first();
      await link.click();
      await expect(page).toHaveURL(href);
      // Confirm some content rendered on the target page
      await expect(page.getByRole("heading").first()).toBeVisible();
    });
  }

  test("logo link navigates back to the homepage", async ({ page }) => {
    await page.goto("/about");
    const logo = page.getByRole("link", { name: /shannon muruli/i }).first();
    await logo.click();
    await expect(page).toHaveURL("/");
  });

  test("active nav link has aria-current='page' for the current route", async ({ page }) => {
    await page.goto("/about");
    const aboutLink = page.getByRole("link", { name: "About" }).first();
    await expect(aboutLink).toHaveAttribute("aria-current", "page");
  });
});

test.describe("Mobile navigation (375 px viewport)", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("desktop nav links are not visible at mobile width", async ({ page }) => {
    // Desktop nav container is hidden on mobile via md:flex
    const desktopNav = page.locator("nav .hidden.md\\:flex");
    await expect(desktopNav).toBeHidden();
  });

  test("hamburger button is visible on mobile", async ({ page }) => {
    const hamburger = page.getByRole("button", { name: /open menu/i });
    await expect(hamburger).toBeVisible();
  });

  test("mobile menu is hidden before hamburger click", async ({ page }) => {
    const mobileMenu = page.locator("#mobile-menu");
    await expect(mobileMenu).not.toBeVisible();
  });

  test("mobile menu opens when hamburger is clicked", async ({ page }) => {
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
  });

  test("mobile menu closes when hamburger is clicked again", async ({ page }) => {
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.getByRole("button", { name: /close menu/i }).click();
    await expect(page.locator("#mobile-menu")).not.toBeVisible();
  });

  test("clicking a link in the mobile menu navigates and closes the menu", async ({ page }) => {
    await page.getByRole("button", { name: /open menu/i }).click();
    const mobileMenu = page.locator("#mobile-menu");
    await mobileMenu.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(mobileMenu).not.toBeVisible();
  });

  test("Escape key closes the mobile menu", async ({ page }) => {
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).not.toBeVisible();
  });
});
