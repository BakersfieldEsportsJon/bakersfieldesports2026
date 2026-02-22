import { NextRequest, NextResponse } from 'next/server';
import { checkoutSessionSchema } from '@/lib/validation';
import { createCheckoutSession } from '@/lib/integrations/stripe';

const PRODUCT_CONFIG = {
  'party-deposit': {
    amount: 10000, // $100.00
    productName: 'Party Deposit',
  },
  'day-pass': {
    amount: parseInt(process.env.DAY_PASS_AMOUNT_CENTS || '3500', 10), // $35.00 default
    productName: 'Day Pass',
  },
  membership: {
    amount: parseInt(process.env.MEMBERSHIP_AMOUNT_CENTS || '25000', 10), // $250.00 default
    productName: 'Unlimited Monthly Membership',
  },
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const result = checkoutSessionSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten();
      return NextResponse.json(
        { error: 'Validation failed', details: errors.fieldErrors },
        { status: 400 }
      );
    }

    const { type, email, metadata } = result.data;

    const config = PRODUCT_CONFIG[type];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await createCheckoutSession({
      amount: config.amount,
      productName: config.productName,
      customerEmail: email,
      successUrl: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${siteUrl}/checkout/cancel`,
      metadata: {
        type,
        ...metadata,
      },
    });

    return NextResponse.json(
      {
        sessionId: session.sessionId,
        url: session.url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Stripe Checkout API Error]', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body.' },
        { status: 400 }
      );
    }

    // Check for Stripe-specific errors
    if (error instanceof Error && error.message.includes('Stripe')) {
      return NextResponse.json(
        { error: 'Payment service error. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: 'An internal server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
