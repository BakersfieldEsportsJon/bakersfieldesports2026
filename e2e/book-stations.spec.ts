import { test, expect } from '@playwright/test';

test.describe('Book Stations Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/book-stations');
  });

  test('page loads with heading and station types', async ({ page }) => {
    // Main heading should be visible
    await expect(page.getByRole('heading', { name: /book your.*gaming station/i }).first()).toBeVisible();

    // Station types section should show cards for each type
    await expect(page.getByRole('heading', { name: /station types/i })).toBeVisible();

    // Individual station types should be listed
    await expect(page.getByText(/gaming pcs/i).first()).toBeVisible();
    await expect(page.getByText(/consoles/i).first()).toBeVisible();
    await expect(page.getByText(/vr stations/i).first()).toBeVisible();
    await expect(page.getByText(/tabletop/i).first()).toBeVisible();
  });

  test('rates section displays pricing', async ({ page }) => {
    // Rates heading should be visible
    await expect(page.getByRole('heading', { name: /^rates$/i })).toBeVisible();

    // Rate cards should have dollar amounts
    const priceElements = page.locator('text=/\\$\\d+/');
    const priceCount = await priceElements.count();
    expect(priceCount).toBeGreaterThan(0);
  });

  test('ggLeap portal link/button is present', async ({ page }) => {
    // The "Book Online" section has a link to ggLeap portal
    await expect(page.getByRole('heading', { name: /book online/i })).toBeVisible();

    const ggLeapButton = page.getByRole('link', { name: /book via ggleap/i });
    await expect(ggLeapButton).toBeVisible();

    // The link should open in a new tab (target="_blank")
    await expect(ggLeapButton).toHaveAttribute('target', '_blank');

    // The link href should point to the ggLeap portal
    const href = await ggLeapButton.getAttribute('href');
    expect(href).toContain('ggleap');
  });

  test('operating hours are displayed', async ({ page }) => {
    // The walk-in info section shows operating hours
    await expect(page.getByText(/operating hours/i).first()).toBeVisible();

    // Should show days of the week
    await expect(page.getByText(/monday/i).first()).toBeVisible();
    await expect(page.getByText(/friday/i).first()).toBeVisible();
    await expect(page.getByText(/saturday/i).first()).toBeVisible();
  });

  test('equipment specs section is visible', async ({ page }) => {
    // Equipment & Specs card should be present
    await expect(page.getByText(/equipment.*specs/i).first()).toBeVisible();

    // Should list key equipment
    await expect(page.getByText(/high-performance gaming pcs/i).first()).toBeVisible();
    await expect(page.getByText(/fiber/i).first()).toBeVisible();
  });

  test('view full rates link navigates to rates page', async ({ page }) => {
    const ratesLink = page.getByRole('link', { name: /view full rates/i });
    await expect(ratesLink).toBeVisible();
    await ratesLink.click();
    await expect(page).toHaveURL(/\/rates/);
  });

  test('venue address is displayed', async ({ page }) => {
    // The location section shows the venue address
    await expect(page.getByText(/7104 golden state/i).first()).toBeVisible();
    await expect(page.getByText(/bakersfield/i).first()).toBeVisible();
  });

  test('walk-in welcome message is present', async ({ page }) => {
    await expect(page.getByText(/walk.?ins? welcome/i).first()).toBeVisible();
  });
});
