import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getPortalUrl,
  getBookingLink,
  fetchStationAvailability,
} from '@/lib/integrations/ggleap';
import type { GGLeapStation, GGLeapBookingLink } from '@/lib/integrations/ggleap';

describe('ggLeap adapter', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('getPortalUrl', () => {
    it('should return the default portal URL when no env is set', () => {
      vi.stubEnv('GGLEAP_PORTAL_URL', '');
      const url = getPortalUrl();
      expect(url).toBe('https://portal.ggleap.com');
    });

    it('should return the env portal URL when GGLEAP_PORTAL_URL is set', () => {
      vi.stubEnv('GGLEAP_PORTAL_URL', 'https://custom-portal.example.com');
      const url = getPortalUrl();
      expect(url).toBe('https://custom-portal.example.com');
    });
  });

  describe('getBookingLink', () => {
    it('should return structured booking data with defaults', () => {
      vi.stubEnv('GGLEAP_PORTAL_URL', '');
      vi.stubEnv('GGLEAP_CENTER_NAME', '');
      vi.stubEnv('GGLEAP_CENTER_ID', '');

      const link: GGLeapBookingLink = getBookingLink();
      expect(link).toHaveProperty('url');
      expect(link).toHaveProperty('centerName');
      expect(link).toHaveProperty('centerId');
      expect(link.url).toBe('https://portal.ggleap.com');
      expect(link.centerName).toBe('Bakersfield Esports Center');
      expect(link.centerId).toBe('bec-bakersfield');
    });

    it('should use environment variables when set', () => {
      vi.stubEnv('GGLEAP_PORTAL_URL', 'https://custom.example.com');
      vi.stubEnv('GGLEAP_CENTER_NAME', 'Custom Center');
      vi.stubEnv('GGLEAP_CENTER_ID', 'custom-center-1');

      const link = getBookingLink();
      expect(link.url).toBe('https://custom.example.com');
      expect(link.centerName).toBe('Custom Center');
      expect(link.centerId).toBe('custom-center-1');
    });

    it('should return url that matches getPortalUrl output', () => {
      vi.stubEnv('GGLEAP_PORTAL_URL', 'https://matched-url.com');
      const link = getBookingLink();
      const portalUrl = getPortalUrl();
      expect(link.url).toBe(portalUrl);
    });
  });

  describe('fetchStationAvailability', () => {
    it('should return stations in mock mode', async () => {
      vi.stubEnv('GGLEAP_MODE', 'mock');
      const stations = await fetchStationAvailability();
      expect(Array.isArray(stations)).toBe(true);
      expect(stations.length).toBeGreaterThan(0);
    });

    it('should return the correct total number of stations (43)', async () => {
      vi.stubEnv('GGLEAP_MODE', 'mock');
      const stations = await fetchStationAvailability();
      // 35 PCs + 5 consoles + 3 VR = 43
      expect(stations).toHaveLength(43);
    });

    it('should have stations with correct shape', async () => {
      vi.stubEnv('GGLEAP_MODE', 'mock');
      const stations = await fetchStationAvailability();
      for (const station of stations) {
        expect(station).toHaveProperty('id');
        expect(station).toHaveProperty('name');
        expect(station).toHaveProperty('type');
        expect(station).toHaveProperty('status');
        expect(station).toHaveProperty('hourlyRate');
        expect(typeof station.id).toBe('string');
        expect(typeof station.name).toBe('string');
        expect(typeof station.hourlyRate).toBe('number');
      }
    });

    it('should have stations with valid type values', async () => {
      vi.stubEnv('GGLEAP_MODE', 'mock');
      const stations = await fetchStationAvailability();
      const validTypes = ['pc', 'console', 'vr'];
      for (const station of stations) {
        expect(validTypes).toContain(station.type);
      }
    });

    it('should have stations with valid status values', async () => {
      vi.stubEnv('GGLEAP_MODE', 'mock');
      const stations = await fetchStationAvailability();
      const validStatuses = ['available', 'occupied', 'maintenance'];
      for (const station of stations) {
        expect(validStatuses).toContain(station.status);
      }
    });

    it('should include at least one station in maintenance', async () => {
      vi.stubEnv('GGLEAP_MODE', 'mock');
      const stations = await fetchStationAvailability();
      const maintenanceStations = stations.filter((s) => s.status === 'maintenance');
      expect(maintenanceStations.length).toBeGreaterThanOrEqual(1);
    });

    it('should have correct station type breakdown', async () => {
      vi.stubEnv('GGLEAP_MODE', 'mock');
      const stations = await fetchStationAvailability();
      const pcs = stations.filter((s) => s.type === 'pc');
      const consoles = stations.filter((s) => s.type === 'console');
      const vr = stations.filter((s) => s.type === 'vr');
      expect(pcs).toHaveLength(35);
      expect(consoles).toHaveLength(5);
      expect(vr).toHaveLength(3);
    });

    it('should throw an error when not in mock mode', async () => {
      vi.stubEnv('GGLEAP_MODE', '');
      await expect(fetchStationAvailability()).rejects.toThrow(
        'ggLeap API is not yet publicly available'
      );
    });
  });
});
