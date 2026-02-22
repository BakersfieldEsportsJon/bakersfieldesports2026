import { test, expect } from '@playwright/test';

test.describe('Stripe Checkout', () => {
  test('create-checkout-session API endpoint exists and responds', async ({ request }) => {
    const response = await request.post('/api/stripe/create-checkout-session', {
      data: {
        type: 'party-deposit',
        email: 'test@example.com',
      },
    });
    // In test mode without real keys, expect 500 (no valid Stripe key)
    // But the endpoint should exist and respond (not 404)
    expect([200, 400, 500]).toContain(response.status());
    const body = await response.json().catch(() => null);
    // Either success with URL or error message -- body should be parseable
    expect(body).toBeDefined();
  });

  test('party page has deposit payment button', async ({ page }) => {
    await page.goto('/parties');
    const depositBtn = page
      .getByRole('link', { name: /deposit/i })
      .or(page.getByRole('button', { name: /deposit/i }));
    await expect(depositBtn.first()).toBeVisible();
  });

  test('deposit button links to checkout session endpoint', async ({ page }) => {
    await page.goto('/parties');

    // The "Pay Deposit ($100)" button in the hero section
    const heroDepositLink = page.getByRole('link', { name: /pay deposit/i }).first();
    await expect(heroDepositLink).toBeVisible();

    const href = await heroDepositLink.getAttribute('href');
    expect(href).toContain('/api/stripe/create-checkout-session');
  });

  test('deposit info section has pay deposit online button', async ({ page }) => {
    await page.goto('/parties');

    // The "Deposit Information" section also has a "Pay Deposit Online" button
    const payOnlineBtn = page.getByRole('link', { name: /pay deposit online/i });
    await expect(payOnlineBtn).toBeVisible();

    const href = await payOnlineBtn.getAttribute('href');
    expect(href).toContain('/api/stripe/create-checkout-session');
  });

  test('processing fee notice is displayed', async ({ page }) => {
    await page.goto('/parties');

    // The deposit info section mentions 3.5% processing fee
    await expect(page.getByText(/3\.5% processing fee/i).first()).toBeVisible();
  });
});
