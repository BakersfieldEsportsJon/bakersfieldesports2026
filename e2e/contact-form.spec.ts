import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('contact page loads with form visible', async ({ page }) => {
    // Heading should be visible
    await expect(page.getByRole('heading', { name: /contact/i }).first()).toBeVisible();

    // The form should be visible
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Key form fields should be present
    await expect(page.locator('#contact-name')).toBeVisible();
    await expect(page.locator('#contact-email')).toBeVisible();
    await expect(page.locator('#contact-subject')).toBeVisible();
    await expect(page.locator('#contact-message')).toBeVisible();
  });

  test('submit empty form shows validation errors', async ({ page }) => {
    // Click submit without filling in any fields
    const submitButton = page.getByRole('button', { name: /send message/i });
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // Validation errors should appear for required fields
    await expect(page.locator('#contact-name-error')).toBeVisible();
    await expect(page.locator('#contact-email-error')).toBeVisible();
    await expect(page.locator('#contact-subject-error')).toBeVisible();
    await expect(page.locator('#contact-message-error')).toBeVisible();

    // Verify specific error messages
    await expect(page.locator('#contact-name-error')).toHaveText(/name must be at least 2 characters/i);
    await expect(page.locator('#contact-email-error')).toHaveText(/valid email/i);
    await expect(page.locator('#contact-subject-error')).toHaveText(/subject must be at least 3 characters/i);
    await expect(page.locator('#contact-message-error')).toHaveText(/message must be at least 10 characters/i);
  });

  test('validation errors clear when field is corrected', async ({ page }) => {
    // Submit empty form to trigger errors
    await page.getByRole('button', { name: /send message/i }).click();

    // Name error should be visible
    await expect(page.locator('#contact-name-error')).toBeVisible();

    // Type valid name
    await page.locator('#contact-name').fill('John Doe');

    // Name error should disappear
    await expect(page.locator('#contact-name-error')).not.toBeVisible();
  });

  test('fill valid data and submit shows success (mock API)', async ({ page }) => {
    // Mock the contact API endpoint to return success
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Thank you for your message. We will get back to you within 24-48 hours.',
        }),
      });
    });

    // Fill in all required fields with valid data
    await page.locator('#contact-name').fill('John Doe');
    await page.locator('#contact-email').fill('john@example.com');
    await page.locator('#contact-subject').fill('General Inquiry');
    await page.locator('#contact-message').fill('I would like to know more about your gaming center and upcoming events.');

    // Submit the form
    await page.getByRole('button', { name: /send message/i }).click();

    // Wait for the success toast notification
    await expect(page.getByText(/message sent/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('honeypot field is hidden from users', async ({ page }) => {
    // The honeypot field should exist in the DOM but not be visible
    const honeypotInput = page.locator('#contact-honeypot');
    await expect(honeypotInput).toBeAttached();

    // It should be positioned off-screen (not visible to real users)
    const honeypotContainer = honeypotInput.locator('..');
    await expect(honeypotContainer).toHaveCSS('opacity', '0');
  });

  test('character counter updates as user types', async ({ page }) => {
    // The message field has a character counter showing X/5000
    const counter = page.getByText(/\/5000 characters/);
    await expect(counter).toBeVisible();

    // Initially should show 0/5000
    await expect(counter).toHaveText('0/5000 characters');

    // Type something and verify counter updates
    await page.locator('#contact-message').fill('Hello world');
    await expect(counter).toHaveText('11/5000 characters');
  });

  test('sidebar contact info is displayed', async ({ page }) => {
    // Phone number should be visible
    await expect(page.getByText(/phone/i).first()).toBeVisible();

    // Address should be visible
    await expect(page.getByText(/address/i).first()).toBeVisible();

    // Hours should be visible
    await expect(page.getByText(/hours/i).first()).toBeVisible();
  });
});
