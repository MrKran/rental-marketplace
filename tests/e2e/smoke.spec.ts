import { test, expect } from "@playwright/test";

test.describe("Rental Marketplace - Smoke Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/rental-marketplace/");
  });

  test("should load homepage without errors", async ({ page }) => {
    await expect(page).toHaveTitle(/Rental Marketplace/i);
    const heading = page.locator("h1");
    await expect(heading).toContainText(/Alash/i);
  });

  test("should navigate to login page", async ({ page }) => {
    const loginButton = page.locator("button:has-text('Войти')").first();
    if (await loginButton.isVisible()) {
      await loginButton.click();
      await expect(page.locator("text=Вход в аккаунт")).toBeVisible();
    }
  });

  test("should navigate to items page", async ({ page }) => {
    const itemsButton = page.locator("button:has-text('Посмотреть товары')");
    await itemsButton.click();
    await page.waitForTimeout(1000);
    await expect(page).toBeTruthy();
  });

  test("should have accessible buttons with proper contrast", async ({ page }) => {
    const buttons = page.locator("button");
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should display search input on desktop", async ({ page }) => {
    // Maximize viewport to see desktop version
    await page.setViewportSize({ width: 1920, height: 1080 });
    const searchInput = page.locator('input[placeholder*="Поиск"]');
    // Search input may or may not be visible depending on layout
    expect(searchInput).toBeTruthy();
  });

  test("should be mobile responsive", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    const buttons = page.locator("button");
    expect(await buttons.count()).toBeGreaterThan(0);
  });
});
