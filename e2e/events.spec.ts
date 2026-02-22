import { test, expect } from '@playwright/test';

test.describe('Events Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/events');
  });

  test('events page shows heading and event cards', async ({ page }) => {
    // Page heading should be visible
    await expect(page.getByRole('heading', { name: /events.*tournaments/i }).first()).toBeVisible();

    // Event cards should be present (they are rendered within the EventFilters component)
    const eventCards = page.locator('[class*="card"]').filter({ has: page.locator('h3') });
    const cardCount = await eventCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('filter tabs are visible and clickable', async ({ page }) => {
    // The EventFilters component uses Tabs with TabsTriggers
    const allTab = page.getByRole('tab', { name: /all events/i });
    const tournamentsTab = page.getByRole('tab', { name: /tournaments/i });
    const weeklyTab = page.getByRole('tab', { name: /weekly/i });
    const leaguesTab = page.getByRole('tab', { name: /leagues/i });

    // Verify tabs are visible
    await expect(allTab).toBeVisible();
    await expect(tournamentsTab).toBeVisible();
    await expect(weeklyTab).toBeVisible();
    await expect(leaguesTab).toBeVisible();

    // Click tournaments tab and verify it becomes active
    await tournamentsTab.click();
    await expect(tournamentsTab).toHaveAttribute('data-state', 'active');

    // Click weekly tab and verify it becomes active
    await weeklyTab.click();
    await expect(weeklyTab).toHaveAttribute('data-state', 'active');

    // Click back to all tab
    await allTab.click();
    await expect(allTab).toHaveAttribute('data-state', 'active');
  });

  test('event cards have required info (title, category badge)', async ({ page }) => {
    // Each event card should have a title (h3) and a category badge
    const firstCard = page.locator('[class*="card"]').filter({ has: page.locator('h3') }).first();

    if (await firstCard.isVisible()) {
      // Title should be present
      const title = firstCard.locator('h3');
      await expect(title).toBeVisible();
      const titleText = await title.textContent();
      expect(titleText?.trim().length).toBeGreaterThan(0);

      // Category badge should be present (Tournament, Weekly, League, or Special Event)
      const badge = firstCard.getByText(/tournament|weekly|league|special event/i).first();
      await expect(badge).toBeVisible();
    }
  });

  test('event cards have links to detail pages', async ({ page }) => {
    const detailLinks = page.locator('a[href^="/events/"]');
    const linkCount = await detailLinks.count();

    // There should be at least one detail link
    expect(linkCount).toBeGreaterThan(0);

    // First link should point to a valid slug path
    const firstHref = await detailLinks.first().getAttribute('href');
    expect(firstHref).toMatch(/^\/events\/[a-z0-9-]+$/);
  });

  test('event detail page shows registration CTA', async ({ page }) => {
    // Navigate to the first event detail page
    const detailLink = page.locator('a[href^="/events/"]').first();

    if (await detailLink.isVisible()) {
      const href = await detailLink.getAttribute('href');
      await page.goto(href!);

      // The detail page should show a registration CTA section
      // It shows "Ready to Compete?", "Registration Coming Soon", or "Join Us!"
      const ctaHeading = page
        .getByRole('heading', { name: /ready to compete|registration coming soon|join us/i })
        .first();
      await expect(ctaHeading).toBeVisible();
    }
  });

  test('start.gg attribution note is visible', async ({ page }) => {
    // The events page has a note about start.gg powering live event data
    await expect(page.getByText(/start\.gg/i).first()).toBeVisible();
  });
});
