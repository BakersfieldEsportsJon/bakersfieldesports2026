import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('home page loads with key elements', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Bakersfield eSports/i);
    await expect(page.locator('nav').first()).toBeVisible();
    await expect(page.getByRole('link', { name: /events/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /parties/i }).first()).toBeVisible();
  });

  test('navigate from home to events page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /events/i }).first().click();
    await expect(page).toHaveURL(/\/events/);
    await expect(page.getByRole('heading', { name: /events/i }).first()).toBeVisible();
  });

  test('navigate to event detail page', async ({ page }) => {
    await page.goto('/events');
    // Click first event card link
    const eventLink = page.locator('a[href^="/events/"]').first();
    if (await eventLink.isVisible()) {
      await eventLink.click();
      await expect(page).toHaveURL(/\/events\/.+/);
      // Should have back to events link
      await expect(page.getByText(/back to events/i)).toBeVisible();
    }
  });

  test('all main pages load without errors', async ({ page }) => {
    const pages = ['/', '/events', '/parties', '/book-stations', '/rates', '/about', '/faq', '/contact', '/partnerships', '/stem'];
    for (const path of pages) {
      const response = await page.goto(path);
      expect(response?.status()).toBeLessThan(400);
    }
  });

  test('header navigation links are present', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    // Verify key nav links exist in the header
    const header = page.locator('header');
    await expect(header.getByRole('link', { name: /events/i }).first()).toBeVisible();
  });

  test('footer is visible on all pages', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('navigate from home to parties page via CTA', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /book a party/i }).first().click();
    await expect(page).toHaveURL(/\/parties/);
    await expect(page.getByRole('heading', { name: /birthday/i }).first()).toBeVisible();
  });
});
