import { test, expect } from '@playwright/test';

test.describe('Party Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/parties');
  });

  test('party page loads with heading and package info', async ({ page }) => {
    // Main heading should be visible
    await expect(page.getByRole('heading', { name: /gaming.*birthday/i }).first()).toBeVisible();

    // Package card should show the party package name
    await expect(page.getByText(/standard party package/i).first()).toBeVisible();

    // Package includes section should be visible
    await expect(page.getByText(/package includes/i).first()).toBeVisible();
  });

  test('deposit amount of $100 is displayed', async ({ page }) => {
    // The $100 deposit is mentioned in the hero CTA and in the deposit info section
    const depositText = page.getByText(/\$100/);
    const depositCount = await depositText.count();
    expect(depositCount).toBeGreaterThan(0);

    // Specifically check the deposit information section
    await expect(page.getByText(/deposit information/i)).toBeVisible();
    await expect(page.getByText(/\$100 deposit/i).first()).toBeVisible();
  });

  test('deposit payment button is visible', async ({ page }) => {
    // The hero section has a "Pay Deposit ($100)" link/button
    const depositBtn = page.getByRole('link', { name: /pay deposit/i }).first();
    await expect(depositBtn).toBeVisible();
  });

  test('party inquiry form is visible', async ({ page }) => {
    // Scroll to the inquiry form section
    await page.locator('#inquiry-form').scrollIntoViewIfNeeded();

    // The form heading should be visible
    await expect(page.getByRole('heading', { name: /inquire about booking/i })).toBeVisible();

    // Key form fields should be present
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#phone')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#partyRecipient')).toBeVisible();
    await expect(page.locator('#recipientAge')).toBeVisible();
    await expect(page.locator('#date')).toBeVisible();
    await expect(page.locator('#time')).toBeVisible();
  });

  test('party form validation works for empty submission', async ({ page }) => {
    // Scroll to form
    await page.locator('#inquiry-form').scrollIntoViewIfNeeded();

    // Submit empty form
    const submitButton = page.getByRole('button', { name: /submit party inquiry/i });
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // Validation errors should appear
    await expect(page.locator('#name-error')).toBeVisible();
    await expect(page.locator('#phone-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#partyRecipient-error')).toBeVisible();
    await expect(page.locator('#recipientAge-error')).toBeVisible();
    await expect(page.locator('#date-error')).toBeVisible();
    await expect(page.locator('#time-error')).toBeVisible();
  });

  test('party form validates invalid phone number', async ({ page }) => {
    // Scroll to form
    await page.locator('#inquiry-form').scrollIntoViewIfNeeded();

    // Fill in an invalid phone number
    await page.locator('#phone').fill('123');

    // Fill other required fields to isolate phone validation
    await page.locator('#name').fill('Jane Doe');
    await page.locator('#email').fill('jane@example.com');
    await page.locator('#partyRecipient').fill('Alex');
    await page.locator('#recipientAge').fill('10');

    // Set a valid future date (at least 48 hours from now)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const dateStr = futureDate.toISOString().split('T')[0];
    await page.locator('#date').fill(dateStr);
    await page.locator('#time').fill('2:00 PM');

    // Submit form
    await page.getByRole('button', { name: /submit party inquiry/i }).click();

    // Phone error should appear
    await expect(page.locator('#phone-error')).toBeVisible();
    await expect(page.locator('#phone-error')).toHaveText(/valid phone number/i);
  });

  test('party form submits successfully with valid data (mock API)', async ({ page }) => {
    // Mock the party inquiry API endpoint
    await page.route('/api/party-inquiry', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'We will contact you within 24 hours to confirm availability.',
        }),
      });
    });

    // Scroll to form
    await page.locator('#inquiry-form').scrollIntoViewIfNeeded();

    // Fill in all required fields
    await page.locator('#name').fill('Jane Doe');
    await page.locator('#phone').fill('(661) 555-1234');
    await page.locator('#email').fill('jane@example.com');
    await page.locator('#partyRecipient').fill('Alex');
    await page.locator('#recipientAge').fill('10');

    // Set a valid future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const dateStr = futureDate.toISOString().split('T')[0];
    await page.locator('#date').fill(dateStr);
    await page.locator('#time').fill('2:00 PM');

    // Submit form
    await page.getByRole('button', { name: /submit party inquiry/i }).click();

    // Wait for success toast
    await expect(page.getByText(/inquiry submitted/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('what to expect timeline is displayed', async ({ page }) => {
    // The "What to Expect" section shows a 5-step timeline
    await expect(page.getByRole('heading', { name: /what to expect/i })).toBeVisible();

    // Verify timeline steps are visible
    await expect(page.getByText('Book').first()).toBeVisible();
    await expect(page.getByText('Arrive').first()).toBeVisible();
    await expect(page.getByText('Game').first()).toBeVisible();
    await expect(page.getByText('Celebrate').first()).toBeVisible();
  });

  test('important information section is visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /important information/i })).toBeVisible();
    await expect(page.getByText(/booking requirements/i).first()).toBeVisible();
  });

  test('honeypot field in party form is hidden', async ({ page }) => {
    // The honeypot field should exist in the DOM but not be visible
    const honeypotInput = page.locator('#honeypot');
    await expect(honeypotInput).toBeAttached();

    const honeypotContainer = honeypotInput.locator('..');
    await expect(honeypotContainer).toHaveCSS('opacity', '0');
  });
});
