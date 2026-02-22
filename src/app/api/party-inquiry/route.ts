import { NextRequest, NextResponse } from 'next/server';
import { partyInquirySchema } from '@/lib/validation';
import { rateLimit } from '@/lib/rate-limit';

// Blackout dates when parties cannot be booked (month is 0-indexed)
const BLACKOUT_DATES = [
  { month: 3, day: 20 },  // April 20
  { month: 3, day: 26 },  // April 26
  { month: 10, day: 27 }, // November 27
  { month: 11, day: 25 }, // December 25
];

// Party hours: 12 PM (noon) to 8 PM
const PARTY_HOUR_START = 12;
const PARTY_HOUR_END = 20;

function isBlackoutDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  return BLACKOUT_DATES.some(
    (blackout) => date.getMonth() === blackout.month && date.getDate() === blackout.day
  );
}

function isWithinPartyHours(timeStr: string): boolean {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
  if (!match) return false;

  let hours = parseInt(match[1], 10);
  const period = match[3].toUpperCase();

  if (period === 'AM' && hours === 12) {
    hours = 0;
  } else if (period === 'PM' && hours !== 12) {
    hours += 12;
  }

  return hours >= PARTY_HOUR_START && hours < PARTY_HOUR_END;
}

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
    const result = partyInquirySchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten();
      return NextResponse.json(
        { error: 'Validation failed', details: errors.fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check - if filled, silently accept but do nothing
    if (data.honeypot) {
      return NextResponse.json(
        { success: true, message: 'Party inquiry submitted successfully.' },
        { status: 200 }
      );
    }

    // Check blackout dates
    if (isBlackoutDate(data.date)) {
      return NextResponse.json(
        {
          error: 'The selected date is unavailable for party bookings. Please choose a different date.',
          code: 'BLACKOUT_DATE',
        },
        { status: 422 }
      );
    }

    // Check party hours
    if (!isWithinPartyHours(data.time)) {
      return NextResponse.json(
        {
          error: 'Parties can only be scheduled between 12:00 PM and 8:00 PM.',
          code: 'OUTSIDE_PARTY_HOURS',
        },
        { status: 422 }
      );
    }

    // In production, this would create a record in the database and send notification emails
    console.log('[Party Inquiry Submission]', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      partyRecipient: data.partyRecipient,
      recipientAge: data.recipientAge,
      date: data.date,
      time: data.time,
      cheesePizzas: data.cheesePizzas,
      pepperoniPizzas: data.pepperoniPizzas,
      additionalPlayers: data.additionalPlayers ?? 0,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          'Your party inquiry has been submitted! We will contact you within 24 hours to confirm availability and finalize details.',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error('[Party Inquiry API Error]', error);

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
