import { describe, it, expect } from 'vitest';
import {
  fallbackEvents,
  getEventsByCategory,
  getEventBySlug,
} from '@/data/events';

const validCategories = ['tournament', 'weekly', 'league', 'special'] as const;

describe('fallbackEvents data', () => {
  it('should export a non-empty array of events', () => {
    expect(Array.isArray(fallbackEvents)).toBe(true);
    expect(fallbackEvents.length).toBeGreaterThan(0);
  });

  it('should have each event with required fields: id, slug, title, description, category', () => {
    for (const event of fallbackEvents) {
      expect(event).toHaveProperty('id');
      expect(event).toHaveProperty('slug');
      expect(event).toHaveProperty('title');
      expect(event).toHaveProperty('description');
      expect(event).toHaveProperty('category');
      expect(typeof event.id).toBe('string');
      expect(typeof event.slug).toBe('string');
      expect(typeof event.title).toBe('string');
      expect(typeof event.description).toBe('string');
      expect(event.id.length).toBeGreaterThan(0);
      expect(event.slug.length).toBeGreaterThan(0);
      expect(event.title.length).toBeGreaterThan(0);
      expect(event.description.length).toBeGreaterThan(0);
    }
  });

  it('should have valid categories for all events', () => {
    for (const event of fallbackEvents) {
      expect(validCategories).toContain(event.category);
    }
  });

  it('should have unique ids across all events', () => {
    const ids = fallbackEvents.map((e) => e.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have unique slugs across all events', () => {
    const slugs = fallbackEvents.map((e) => e.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('should include both weekly and tournament events', () => {
    const categories = new Set(fallbackEvents.map((e) => e.category));
    expect(categories.has('weekly')).toBe(true);
    expect(categories.has('tournament')).toBe(true);
  });
});

describe('getEventBySlug', () => {
  it('should return the correct event for a known slug', () => {
    const event = getEventBySlug('tuesday-night-tekken');
    expect(event).toBeDefined();
    expect(event!.id).toBe('weekly-tekken');
    expect(event!.title).toBe('Tuesday Night Tekken');
  });

  it('should return undefined for an unknown slug', () => {
    const event = getEventBySlug('nonexistent-slug');
    expect(event).toBeUndefined();
  });

  it('should find tournament-category events by slug', () => {
    const event = getEventBySlug('bec-street-fighter-6-tournament');
    expect(event).toBeDefined();
    expect(event!.category).toBe('tournament');
  });

  it('should accept a custom events array', () => {
    const customEvents = [
      {
        id: 'custom-1',
        slug: 'custom-event',
        title: 'Custom Event',
        description: 'A custom event',
        category: 'special' as const,
      },
    ];
    const event = getEventBySlug('custom-event', customEvents);
    expect(event).toBeDefined();
    expect(event!.id).toBe('custom-1');
  });

  it('should return undefined from custom events when slug not found', () => {
    const customEvents = [
      {
        id: 'custom-1',
        slug: 'custom-event',
        title: 'Custom Event',
        description: 'A custom event',
        category: 'weekly' as const,
      },
    ];
    const event = getEventBySlug('not-here', customEvents);
    expect(event).toBeUndefined();
  });
});

describe('getEventsByCategory', () => {
  it('should return only weekly events when category is "weekly"', () => {
    const weeklyEvents = getEventsByCategory('weekly');
    expect(weeklyEvents.length).toBeGreaterThan(0);
    for (const event of weeklyEvents) {
      expect(event.category).toBe('weekly');
    }
  });

  it('should return only tournament events when category is "tournament"', () => {
    const tournamentEvents = getEventsByCategory('tournament');
    expect(tournamentEvents.length).toBeGreaterThan(0);
    for (const event of tournamentEvents) {
      expect(event.category).toBe('tournament');
    }
  });

  it('should return an empty array for a category with no events', () => {
    const leagueEvents = getEventsByCategory('league');
    expect(Array.isArray(leagueEvents)).toBe(true);
    expect(leagueEvents).toHaveLength(0);
  });

  it('should accept a custom events array', () => {
    const customEvents = [
      {
        id: '1',
        slug: 'a',
        title: 'A',
        description: 'Desc',
        category: 'special' as const,
      },
      {
        id: '2',
        slug: 'b',
        title: 'B',
        description: 'Desc',
        category: 'weekly' as const,
      },
    ];
    const specials = getEventsByCategory('special', customEvents);
    expect(specials).toHaveLength(1);
    expect(specials[0].id).toBe('1');
  });
});
