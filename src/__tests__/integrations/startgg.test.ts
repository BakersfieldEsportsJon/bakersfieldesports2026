import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  fetchTournaments,
  fetchTournamentBySlug,
  getMockTournaments,
} from '@/lib/integrations/startgg';
import type { Tournament } from '@/lib/integrations/startgg';

describe('start.gg adapter', () => {
  beforeEach(() => {
    vi.stubEnv('STARTGG_MODE', 'mock');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('getMockTournaments', () => {
    it('should return an array of mock tournaments', () => {
      const tournaments = getMockTournaments();
      expect(Array.isArray(tournaments)).toBe(true);
      expect(tournaments.length).toBeGreaterThan(0);
    });

    it('should return 6 mock tournaments', () => {
      const tournaments = getMockTournaments();
      expect(tournaments).toHaveLength(6);
    });

    it('should have tournaments with correct shape', () => {
      const tournaments = getMockTournaments();
      for (const t of tournaments) {
        expect(t).toHaveProperty('id');
        expect(t).toHaveProperty('name');
        expect(t).toHaveProperty('slug');
        expect(t).toHaveProperty('startAt');
        expect(t).toHaveProperty('endAt');
        expect(t).toHaveProperty('game');
        expect(t).toHaveProperty('entrants');
        expect(t).toHaveProperty('maxEntrants');
        expect(t).toHaveProperty('isOnline');
        expect(t).toHaveProperty('url');
        expect(t).toHaveProperty('images');
        expect(t).toHaveProperty('description');
      }
    });

    it('should have string ids, names, and slugs', () => {
      const tournaments = getMockTournaments();
      for (const t of tournaments) {
        expect(typeof t.id).toBe('string');
        expect(typeof t.name).toBe('string');
        expect(typeof t.slug).toBe('string');
        expect(t.id.length).toBeGreaterThan(0);
        expect(t.name.length).toBeGreaterThan(0);
        expect(t.slug.length).toBeGreaterThan(0);
      }
    });

    it('should have valid ISO date strings for startAt and endAt', () => {
      const tournaments = getMockTournaments();
      for (const t of tournaments) {
        expect(new Date(t.startAt).toISOString()).toBe(t.startAt);
        expect(new Date(t.endAt).toISOString()).toBe(t.endAt);
      }
    });

    it('should have all tournaments set as offline (isOnline = false)', () => {
      const tournaments = getMockTournaments();
      for (const t of tournaments) {
        expect(t.isOnline).toBe(false);
      }
    });
  });

  describe('fetchTournaments', () => {
    it('should return mock tournaments when STARTGG_MODE is mock', async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-03-01T12:00:00.000Z'));
      const tournaments = await fetchTournaments();
      expect(tournaments.length).toBeGreaterThan(0);
      expect(tournaments).toEqual(getMockTournaments());
      vi.useRealTimers();
    });

    it('should not require ownerId in mock mode', async () => {
      await expect(fetchTournaments()).resolves.toBeDefined();
    });
  });

  describe('fetchTournamentBySlug', () => {
    it('should return the correct tournament for a known slug', async () => {
      const slug = 'tournament/bec-friday-night-magic';
      const tournament = await fetchTournamentBySlug(slug);
      expect(tournament).not.toBeNull();
      expect(tournament!.slug).toBe(slug);
      expect(tournament!.name).toBe('Friday Night Magic');
    });

    it('should return null for an unknown slug', async () => {
      const tournament = await fetchTournamentBySlug('tournament/does-not-exist');
      expect(tournament).toBeNull();
    });

    it('should return a tournament with all expected fields', async () => {
      const slug = 'tournament/bec-smash-ultimate-monthly';
      const tournament = await fetchTournamentBySlug(slug);
      expect(tournament).not.toBeNull();
      expect(tournament!.id).toBe('mock-ssbu-004');
      expect(tournament!.game).toBe('Super Smash Bros. Ultimate');
      expect(tournament!.entrants).toBe(28);
      expect(tournament!.maxEntrants).toBe(64);
      expect(tournament!.url).toContain('start.gg');
    });

    it('should return a tournament whose images array is non-empty', async () => {
      const slug = 'tournament/bec-friday-night-magic';
      const tournament = await fetchTournamentBySlug(slug);
      expect(tournament).not.toBeNull();
      expect(Array.isArray(tournament!.images)).toBe(true);
      expect(tournament!.images.length).toBeGreaterThan(0);
    });
  });
});
