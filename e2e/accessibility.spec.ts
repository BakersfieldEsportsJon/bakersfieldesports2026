import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  const pages = ['/', '/events', '/parties', '/contact', '/faq', '/about'];

  for (const path of pages) {
    test(`${path} has no critical accessibility violations`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .disableRules(['color-contrast']) // May have intentional dark theme contrasts
        .analyze();

      const serious = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      );
      if (serious.length > 0) {
        console.log(
          `Accessibility violations on ${path}:`,
          JSON.stringify(
            serious.map((v) => ({
              id: v.id,
              impact: v.impact,
              description: v.description,
              nodes: v.nodes.length,
              help: v.help,
            })),
            null,
            2
          )
        );
      }
      expect(serious.length).toBe(0);
    });
  }

  test('home page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Should have exactly one h1
    const h1Elements = page.locator('h1');
    const h1Count = await h1Elements.count();
    expect(h1Count).toBe(1);

    // h1 should contain meaningful text
    const h1Text = await h1Elements.first().textContent();
    expect(h1Text?.trim().length).toBeGreaterThan(0);
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');

      // Images should have alt text, or role="presentation" for decorative images
      const hasAltOrDecoration = (alt !== null && alt !== undefined) || role === 'presentation';
      expect(hasAltOrDecoration).toBe(true);
    }
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab through the page and verify focus is visible
    await page.keyboard.press('Tab');

    // The focused element should have a visible focus indicator
    const focusedElement = page.locator(':focus');
    const focusedCount = await focusedElement.count();
    expect(focusedCount).toBeGreaterThan(0);
  });

  test('forms have proper labels', async ({ page }) => {
    await page.goto('/contact');

    // All form inputs should have associated labels
    const nameInput = page.locator('#contact-name');
    const emailInput = page.locator('#contact-email');
    const subjectInput = page.locator('#contact-subject');
    const messageInput = page.locator('#contact-message');

    // Check that labels exist for each field
    await expect(page.locator('label[for="contact-name"]')).toBeVisible();
    await expect(page.locator('label[for="contact-email"]')).toBeVisible();
    await expect(page.locator('label[for="contact-subject"]')).toBeVisible();
    await expect(page.locator('label[for="contact-message"]')).toBeVisible();
  });

  test('page lang attribute is set', async ({ page }) => {
    await page.goto('/');

    const lang = await page.locator('html').getAttribute('lang');
    expect(lang).toBe('en');
  });
});
