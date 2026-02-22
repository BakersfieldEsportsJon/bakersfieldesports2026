import { NextRequest, NextResponse } from 'next/server';
import { constructWebhookEvent } from '@/lib/integrations/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header.' },
        { status: 400 }
      );
    }

    let event;
    try {
      event = await constructWebhookEvent(body, signature);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('[Stripe Webhook] Signature verification failed:', message);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${message}` },
        { status: 400 }
      );
    }

    // Handle specific event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('[Stripe Webhook] Checkout session completed:', {
          sessionId: session.id,
          customerEmail: session.customer_email,
          amountTotal: session.amount_total,
          metadata: session.metadata,
          timestamp: new Date().toISOString(),
        });
        // In production: update database, send confirmation email, trigger fulfillment
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        console.log('[Stripe Webhook] Payment intent succeeded:', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          metadata: paymentIntent.metadata,
          timestamp: new Date().toISOString(),
        });
        // In production: update payment record in database
        break;
      }

      case 'payment_intent.payment_failed': {
        const failedPayment = event.data.object;
        console.error('[Stripe Webhook] Payment intent failed:', {
          paymentIntentId: failedPayment.id,
          amount: failedPayment.amount,
          lastPaymentError: failedPayment.last_payment_error?.message,
          metadata: failedPayment.metadata,
          timestamp: new Date().toISOString(),
        });
        // In production: update payment record, notify customer, alert staff
        break;
      }

      default: {
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
      }
    }

    return NextResponse.json(
      { received: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Stripe Webhook Error]', error);
    return NextResponse.json(
      { error: 'Webhook handler failed.' },
      { status: 500 }
    );
  }
}
