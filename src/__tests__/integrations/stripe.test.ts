import { describe, it, expect, vi, beforeEach } from 'vitest';

// Use vi.hoisted so mock functions are available when vi.mock factory runs (it gets hoisted)
const { mockSessionCreate, mockConstructEvent } = vi.hoisted(() => ({
  mockSessionCreate: vi.fn(),
  mockConstructEvent: vi.fn(),
}));

vi.mock('stripe', () => {
  const MockStripe = function (this: any) {
    this.checkout = {
      sessions: {
        create: mockSessionCreate,
      },
    };
    this.webhooks = {
      constructEvent: mockConstructEvent,
    };
  };
  return { default: MockStripe };
});

import { createCheckoutSession, constructWebhookEvent } from '@/lib/integrations/stripe';

describe('Stripe adapter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createCheckoutSession', () => {
    it('should call stripe.checkout.sessions.create with correct params when using priceId', async () => {
      mockSessionCreate.mockResolvedValue({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/session/cs_test_123',
      });

      const params = {
        priceId: 'price_abc123',
        productName: 'Day Pass',
        customerEmail: 'user@example.com',
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
        metadata: { source: 'website' },
      };

      const result = await createCheckoutSession(params);

      expect(mockSessionCreate).toHaveBeenCalledTimes(1);
      expect(mockSessionCreate).toHaveBeenCalledWith({
        payment_method_types: ['card'],
        line_items: [{ price: 'price_abc123', quantity: 1 }],
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        customer_email: 'user@example.com',
        metadata: { source: 'website' },
      });

      expect(result).toEqual({
        sessionId: 'cs_test_123',
        url: 'https://checkout.stripe.com/session/cs_test_123',
      });
    });

    it('should use price_data when priceId is not provided', async () => {
      mockSessionCreate.mockResolvedValue({
        id: 'cs_test_456',
        url: 'https://checkout.stripe.com/session/cs_test_456',
      });

      const params = {
        amount: 2500,
        productName: 'Party Deposit',
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      };

      await createCheckoutSession(params);

      expect(mockSessionCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: { name: 'Party Deposit' },
                unit_amount: 2500,
              },
              quantity: 1,
            },
          ],
        })
      );
    });

    it('should pass customer_email as undefined when not provided', async () => {
      mockSessionCreate.mockResolvedValue({
        id: 'cs_test_789',
        url: 'https://checkout.stripe.com/session/cs_test_789',
      });

      const params = {
        priceId: 'price_xyz',
        productName: 'Membership',
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      };

      await createCheckoutSession(params);

      expect(mockSessionCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          customer_email: undefined,
        })
      );
    });

    it('should return sessionId and url from the created session', async () => {
      mockSessionCreate.mockResolvedValue({
        id: 'cs_live_abc',
        url: 'https://checkout.stripe.com/session/cs_live_abc',
      });

      const result = await createCheckoutSession({
        priceId: 'price_123',
        productName: 'Test Product',
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      });

      expect(result.sessionId).toBe('cs_live_abc');
      expect(result.url).toBe('https://checkout.stripe.com/session/cs_live_abc');
    });

    it('should always set mode to "payment"', async () => {
      mockSessionCreate.mockResolvedValue({ id: 'cs_test', url: 'https://example.com' });

      await createCheckoutSession({
        priceId: 'price_123',
        productName: 'Test',
        successUrl: 'https://example.com/s',
        cancelUrl: 'https://example.com/c',
      });

      expect(mockSessionCreate).toHaveBeenCalledWith(
        expect.objectContaining({ mode: 'payment' })
      );
    });

    it('should always set payment_method_types to ["card"]', async () => {
      mockSessionCreate.mockResolvedValue({ id: 'cs_test', url: 'https://example.com' });

      await createCheckoutSession({
        priceId: 'price_123',
        productName: 'Test',
        successUrl: 'https://example.com/s',
        cancelUrl: 'https://example.com/c',
      });

      expect(mockSessionCreate).toHaveBeenCalledWith(
        expect.objectContaining({ payment_method_types: ['card'] })
      );
    });
  });

  describe('constructWebhookEvent', () => {
    it('should call stripe.webhooks.constructEvent with correct arguments', async () => {
      const mockEvent = { id: 'evt_123', type: 'checkout.session.completed' };
      mockConstructEvent.mockReturnValue(mockEvent);

      const payload = '{"id":"evt_123"}';
      const sig = 'whsec_signature_value';

      const result = await constructWebhookEvent(payload, sig);

      expect(mockConstructEvent).toHaveBeenCalledTimes(1);
      expect(mockConstructEvent).toHaveBeenCalledWith(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      expect(result).toEqual(mockEvent);
    });

    it('should propagate errors from Stripe webhook verification', async () => {
      mockConstructEvent.mockImplementation(() => {
        throw new Error('Webhook signature verification failed');
      });

      await expect(
        constructWebhookEvent('bad-payload', 'bad-sig')
      ).rejects.toThrow('Webhook signature verification failed');
    });
  });
});
