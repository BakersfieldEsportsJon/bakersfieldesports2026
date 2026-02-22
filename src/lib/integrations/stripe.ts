import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-18.acacia' as any,
});

export interface CheckoutSessionParams {
  priceId?: string;
  amount?: number; // in cents
  productName: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export async function createCheckoutSession(params: CheckoutSessionParams) {
  const lineItems = params.priceId
    ? [{ price: params.priceId, quantity: 1 }]
    : [{
        price_data: {
          currency: 'usd',
          product_data: { name: params.productName },
          unit_amount: params.amount!,
        },
        quantity: 1,
      }];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    customer_email: params.customerEmail,
    metadata: params.metadata,
  });

  return { sessionId: session.id, url: session.url };
}

export async function constructWebhookEvent(payload: string | Buffer, sig: string) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  return stripe.webhooks.constructEvent(payload, sig, webhookSecret);
}

export { stripe };
