import { NextRequest, NextResponse } from 'next/server';
import { fetchTournaments, getMockTournaments } from '@/lib/integrations/startgg';
import type { Tournament } from '@/lib/integrations/startgg';

// Next.js route segment config for caching (5 minutes)
export const revalidate = 300;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let tournaments: Tournament[];

    if (process.env.STARTGG_MODE === 'live') {
      const ownerId = process.env.STARTGG_OWNER_ID;
      if (!ownerId) {
        return NextResponse.json(
          { error: 'Server configuration error: missing STARTGG_OWNER_ID.' },
          { status: 500 }
        );
      }
      tournaments = await fetchTournaments(ownerId);
    } else {
      // Mock mode (default for development)
      tournaments = getMockTournaments();
    }

    // Filter by category (game name) if provided
    if (category) {
      const normalizedCategory = category.toLowerCase();
      tournaments = tournaments.filter((t) =>
        t.game.toLowerCase().includes(normalizedCategory)
      );
    }

    return NextResponse.json(
      {
        events: tournaments,
        total: tournaments.length,
        cached: true,
        revalidateSeconds: revalidate,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate * 2}`,
        },
      }
    );
  } catch (error) {
    console.error('[Events API Error]', error);

    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred.';

    // If it is a start.gg API issue, return 502
    if (message.includes('start.gg') || message.includes('STARTGG')) {
      return NextResponse.json(
        { error: 'Failed to fetch events from tournament provider. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
