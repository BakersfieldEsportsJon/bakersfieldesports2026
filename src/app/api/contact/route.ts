import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validation';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
    const rateLimitResult = rateLimit(ip, 5, 60000);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          },
        }
      );
    }

    const body = await request.json();

    // Validate with Zod schema
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten();
      return NextResponse.json(
        { error: 'Validation failed', details: errors.fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, subject, message, honeypot } = result.data;

    // Honeypot check - if filled, silently accept but do nothing
    if (honeypot) {
      return NextResponse.json(
        { success: true, message: 'Message sent successfully.' },
        { status: 200 }
      );
    }

    // In production, this would send an email via a service like SendGrid, Resend, etc.
    // For now, log the contact form submission
    console.log('[Contact Form Submission]', {
      name,
      email,
      subject,
      message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you within 24-48 hours.',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error('[Contact API Error]', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An internal server error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
