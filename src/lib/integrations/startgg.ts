/**
 * start.gg (formerly smash.gg) Integration Adapter
 *
 * Provides access to tournament data from the start.gg GraphQL API.
 * Supports both live API calls and a mock mode for local development.
 *
 * Environment variables:
 *   STARTGG_API_TOKEN  - Bearer token for the start.gg GraphQL API
 *   STARTGG_MODE       - Set to "mock" to use mock data instead of live API
 */

export interface Tournament {
  id: string;
  name: string;
  slug: string;
  startAt: string; // ISO 8601 date string
  endAt: string; // ISO 8601 date string
  game: string;
  entrants: number;
  maxEntrants: number | null;
  isOnline: boolean;
  registrationClosesAt: string | null;
  url: string; // start.gg link
  images: string[];
  description: string;
}

const STARTGG_API_URL = 'https://api.start.gg/gql/alpha';

const TOURNAMENTS_BY_OWNER_QUERY = `
  query TournamentsByOwner($ownerId: ID!, $perPage: Int) {
    tournaments(query: {
      perPage: $perPage,
      filter: { ownerId: $ownerId }
    }) {
      nodes {
        id
        name
        slug
        startAt
        endAt
        numAttendees
        isOnline
        isRegistrationOpen
        images(type: "profile") {
          url
        }
        events {
          id
          name
          videogame {
            displayName
            images {
              url
            }
          }
        }
      }
    }
  }
`;

const TOURNAMENT_BY_SLUG_QUERY = `
  query TournamentBySlug($slug: String!) {
    tournament(slug: $slug) {
      id
      name
      slug
      startAt
      endAt
      numAttendees
      isOnline
      isRegistrationOpen
      images(type: "profile") {
        url
      }
      events {
        id
        name
        videogame {
          displayName
          images {
            url
          }
        }
      }
    }
  }
`;

/**
 * Transforms a raw start.gg API tournament node into our Tournament interface.
 */
function transformTournament(node: any): Tournament {
  const primaryEvent = node.events?.[0];
  const gameName = primaryEvent?.videogame?.displayName || 'Multiple Games';
  const imageUrls = (node.images || []).map((img: any) => img.url);

  return {
    id: String(node.id),
    name: node.name,
    slug: node.slug,
    startAt: node.startAt ? new Date(node.startAt * 1000).toISOString() : '',
    endAt: node.endAt ? new Date(node.endAt * 1000).toISOString() : '',
    game: gameName,
    entrants: node.numAttendees || 0,
    maxEntrants: null,
    isOnline: node.isOnline ?? false,
    registrationClosesAt: null,
    url: `https://www.start.gg/${node.slug}`,
    images: imageUrls,
    description: '',
  };
}

/**
 * Makes an authenticated GraphQL request to the start.gg API.
 */
async function startggGraphQL(query: string, variables: Record<string, any>): Promise<any> {
  const token = process.env.STARTGG_API_TOKEN;
  if (!token) {
    throw new Error(
      'STARTGG_API_TOKEN is not set. Please provide a valid start.gg API token in your environment variables.'
    );
  }

  const response = await fetch(STARTGG_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(
      `start.gg API request failed with status ${response.status}: ${response.statusText}`
    );
  }

  const json = await response.json();

  if (json.errors && json.errors.length > 0) {
    const messages = json.errors.map((e: any) => e.message).join('; ');
    throw new Error(`start.gg GraphQL errors: ${messages}`);
  }

  return json.data;
}

/**
 * Fetches tournaments from the start.gg API by owner ID.
 * If STARTGG_MODE is "mock", returns mock data instead.
 *
 * @param ownerId - The start.gg owner/organizer ID. Optional when in mock mode.
 */
export async function fetchTournaments(ownerId?: string): Promise<Tournament[]> {
  if (process.env.STARTGG_MODE === 'mock') {
    return getMockTournaments();
  }

  if (!ownerId) {
    throw new Error('ownerId is required when not in mock mode.');
  }

  const data = await startggGraphQL(TOURNAMENTS_BY_OWNER_QUERY, {
    ownerId,
    perPage: 25,
  });

  const nodes = data?.tournaments?.nodes || [];
  return nodes.map(transformTournament);
}

/**
 * Fetches a single tournament by its slug from the start.gg API.
 * If STARTGG_MODE is "mock", searches mock data by slug.
 *
 * @param slug - The tournament slug (e.g., "tournament/bec-friday-night-magic-42")
 */
export async function fetchTournamentBySlug(slug: string): Promise<Tournament | null> {
  if (process.env.STARTGG_MODE === 'mock') {
    const mockTournaments = getMockTournaments();
    return mockTournaments.find((t) => t.slug === slug) || null;
  }

  const data = await startggGraphQL(TOURNAMENT_BY_SLUG_QUERY, { slug });

  if (!data?.tournament) {
    return null;
  }

  return transformTournament(data.tournament);
}

/**
 * Returns realistic mock tournament data for Bakersfield Esports Center (BEC).
 * Used for local development and testing when STARTGG_MODE is "mock".
 */
export function getMockTournaments(): Tournament[] {
  const now = new Date();

  // Helper to get the next occurrence of a given weekday (0=Sun, 1=Mon, ..., 5=Fri)
  function nextWeekday(day: number): Date {
    const result = new Date(now);
    const diff = (day - now.getDay() + 7) % 7 || 7;
    result.setDate(result.getDate() + diff);
    result.setHours(18, 0, 0, 0);
    return result;
  }

  const nextFriday = nextWeekday(5);
  const nextThursday = nextWeekday(4);
  const nextSunday = nextWeekday(0);
  const nextSaturday = nextWeekday(6);
  const twoWeeksOut = new Date(now);
  twoWeeksOut.setDate(twoWeeksOut.getDate() + 14);
  twoWeeksOut.setHours(12, 0, 0, 0);

  return [
    {
      id: 'mock-fnm-001',
      name: 'Friday Night Magic',
      slug: 'tournament/bec-friday-night-magic',
      startAt: nextFriday.toISOString(),
      endAt: new Date(nextFriday.getTime() + 4 * 60 * 60 * 1000).toISOString(),
      game: 'Magic: The Gathering',
      entrants: 12,
      maxEntrants: 32,
      isOnline: false,
      registrationClosesAt: new Date(nextFriday.getTime() - 60 * 60 * 1000).toISOString(),
      url: 'https://www.start.gg/tournament/bec-friday-night-magic',
      images: ['/images/mock/mtg-banner.jpg'],
      description:
        'Weekly Friday Night Magic at Bakersfield Esports Center. All formats welcome. Free entry with promo pack prizes for top finishers.',
    },
    {
      id: 'mock-pokemon-002',
      name: 'Pokemon TCG Thursday',
      slug: 'tournament/bec-pokemon-tcg-thursday',
      startAt: nextThursday.toISOString(),
      endAt: new Date(nextThursday.getTime() + 3 * 60 * 60 * 1000).toISOString(),
      game: 'Pokemon TCG',
      entrants: 8,
      maxEntrants: 24,
      isOnline: false,
      registrationClosesAt: new Date(nextThursday.getTime() - 60 * 60 * 1000).toISOString(),
      url: 'https://www.start.gg/tournament/bec-pokemon-tcg-thursday',
      images: ['/images/mock/pokemon-tcg-banner.jpg'],
      description:
        'Weekly Pokemon TCG tournament every Thursday at BEC. Free entry. Standard format. Prizes for top 4.',
    },
    {
      id: 'mock-digimon-003',
      name: 'Digimon TCG Sunday Tournament',
      slug: 'tournament/bec-digimon-tcg-sunday',
      startAt: nextSunday.toISOString(),
      endAt: new Date(nextSunday.getTime() + 4 * 60 * 60 * 1000).toISOString(),
      game: 'Digimon Card Game',
      entrants: 10,
      maxEntrants: 24,
      isOnline: false,
      registrationClosesAt: new Date(nextSunday.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      url: 'https://www.start.gg/tournament/bec-digimon-tcg-sunday',
      images: ['/images/mock/digimon-tcg-banner.jpg'],
      description:
        'Weekly Digimon TCG tournament every Sunday at Bakersfield Esports Center. $6 entry fee. Store credit prizes.',
    },
    {
      id: 'mock-ssbu-004',
      name: 'Super Smash Bros Ultimate Tournament',
      slug: 'tournament/bec-smash-ultimate-monthly',
      startAt: nextSaturday.toISOString(),
      endAt: new Date(nextSaturday.getTime() + 6 * 60 * 60 * 1000).toISOString(),
      game: 'Super Smash Bros. Ultimate',
      entrants: 28,
      maxEntrants: 64,
      isOnline: false,
      registrationClosesAt: new Date(nextSaturday.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      url: 'https://www.start.gg/tournament/bec-smash-ultimate-monthly',
      images: ['/images/mock/ssbu-banner.jpg'],
      description:
        'Monthly Super Smash Bros. Ultimate tournament at BEC. $20 entry fee. Double elimination bracket. Cash prizes for top 3.',
    },
    {
      id: 'mock-lol-005',
      name: 'League of Legends 1v1',
      slug: 'tournament/bec-lol-1v1',
      startAt: twoWeeksOut.toISOString(),
      endAt: new Date(twoWeeksOut.getTime() + 5 * 60 * 60 * 1000).toISOString(),
      game: 'League of Legends',
      entrants: 16,
      maxEntrants: 32,
      isOnline: false,
      registrationClosesAt: new Date(twoWeeksOut.getTime() - 48 * 60 * 60 * 1000).toISOString(),
      url: 'https://www.start.gg/tournament/bec-lol-1v1',
      images: ['/images/mock/lol-banner.jpg'],
      description:
        'League of Legends 1v1 tournament at Bakersfield Esports Center. $20 entry fee. Howling Abyss, first blood or first tower wins. Prize pool based on entrants.',
    },
    {
      id: 'mock-fortnite-006',
      name: 'NOR Fortnite League',
      slug: 'tournament/bec-nor-fortnite-league',
      startAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      endAt: new Date(now.getTime() + 56 * 24 * 60 * 60 * 1000).toISOString(),
      game: 'Fortnite',
      entrants: 42,
      maxEntrants: 100,
      isOnline: false,
      registrationClosesAt: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      url: 'https://www.start.gg/tournament/bec-nor-fortnite-league',
      images: ['/images/mock/fortnite-league-banner.jpg'],
      description:
        'NOR Fortnite League - 8-week competitive league at Bakersfield Esports Center. $150 entry fee covers all weeks. Weekly point accumulation with grand finals. Major prize pool for top finishers.',
    },
  ];
}
