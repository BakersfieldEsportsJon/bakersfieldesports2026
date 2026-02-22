import { Event } from '@/types';

/**
 * Static fallback events data.
 * These are verified events from the site audit and serve as fallback
 * content when the start.gg API is unavailable or during static builds.
 *
 * In production, live event data is fetched from the start.gg API
 * and merged/overridden with this fallback data.
 */
export const fallbackEvents: Event[] = [
  // Weekly recurring events
  {
    id: 'weekly-tekken',
    slug: 'tuesday-night-tekken',
    title: 'Tuesday Night Tekken',
    description:
      'Weekly Tekken 8 tournament and casual sessions every Tuesday night. All skill levels welcome.',
    game: 'Tekken 8',
    category: 'weekly',
    entryFee: 0,
    isRegistrationOpen: true,
    registrationSource: 'internal',
  },
  {
    id: 'weekly-sf6',
    slug: 'wednesday-night-fights',
    title: 'Wednesday Night Fights',
    description:
      'Weekly Street Fighter 6 competitive sessions every Wednesday. Come test your skills against local players.',
    game: 'Street Fighter 6',
    category: 'weekly',
    entryFee: 0,
    isRegistrationOpen: true,
    registrationSource: 'internal',
  },
  {
    id: 'weekly-smash',
    slug: 'bakersfield-brawls',
    title: 'Bakersfield Brawls',
    description:
      'Weekly Super Smash Bros. Ultimate tournament series. Brackets and friendlies for competitors of all levels.',
    game: 'Super Smash Bros. Ultimate',
    category: 'weekly',
    entryFee: 0,
    isRegistrationOpen: true,
    registrationSource: 'internal',
  },
  {
    id: 'weekly-tcg',
    slug: 'tcg-meetup',
    title: 'Trading Card Game Meetup',
    description:
      'Weekly meetup for Trading Card Game players. Bring your Pokemon or Yu-Gi-Oh! decks for casual play and trades.',
    game: 'TCG (Pokemon / Yu-Gi-Oh!)',
    category: 'weekly',
    entryFee: 0,
    isRegistrationOpen: true,
    registrationSource: 'internal',
  },

  // Verified tournament events from audit
  {
    id: 'bec-mvc-fc',
    slug: 'bec-marvel-vs-capcom-fighting-collection',
    title: 'BEC Marvel vs. Capcom Fighting Collection Tournament',
    description:
      'Competitive Marvel vs. Capcom Fighting Collection tournament at the Bakersfield eSports Center. Bracket-style elimination.',
    game: 'Marvel vs. Capcom Fighting Collection',
    category: 'tournament',
    registrationSource: 'startgg',
    isRegistrationOpen: false,
  },
  {
    id: 'bec-dbsz',
    slug: 'bec-dragon-ball-sparking-zero',
    title: 'BEC Dragon Ball Sparking! Zero Tournament',
    description:
      'Dragon Ball Sparking! Zero tournament. Compete in high-energy matches at the Bakersfield eSports Center.',
    game: 'Dragon Ball Sparking! Zero',
    category: 'tournament',
    registrationSource: 'startgg',
    isRegistrationOpen: false,
  },
  {
    id: 'bec-sf6-tournament',
    slug: 'bec-street-fighter-6-tournament',
    title: 'BEC Street Fighter 6 Tournament',
    description:
      'Official Street Fighter 6 tournament at BEC. Bracket play with prizes for top finishers.',
    game: 'Street Fighter 6',
    category: 'tournament',
    registrationSource: 'startgg',
    isRegistrationOpen: false,
  },
  {
    id: 'bec-tekken8-tournament',
    slug: 'bec-tekken-8-tournament',
    title: 'BEC Tekken 8 Tournament',
    description:
      'Tekken 8 tournament at the Bakersfield eSports Center. Compete against the best local players.',
    game: 'Tekken 8',
    category: 'tournament',
    registrationSource: 'startgg',
    isRegistrationOpen: false,
  },
  {
    id: 'bec-ssbu-tournament',
    slug: 'bec-super-smash-bros-ultimate-tournament',
    title: 'BEC Super Smash Bros. Ultimate Tournament',
    description:
      'Super Smash Bros. Ultimate tournament. Singles bracket competition at the Bakersfield eSports Center.',
    game: 'Super Smash Bros. Ultimate',
    category: 'tournament',
    registrationSource: 'startgg',
    isRegistrationOpen: false,
  },
];

/**
 * Helper to get events by category.
 */
export function getEventsByCategory(
  category: Event['category'],
  events: Event[] = fallbackEvents
): Event[] {
  return events.filter((event) => event.category === category);
}

/**
 * Helper to get a single event by slug.
 */
export function getEventBySlug(
  slug: string,
  events: Event[] = fallbackEvents
): Event | undefined {
  return events.find((event) => event.slug === slug);
}
