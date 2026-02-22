/**
 * ggLeap Integration Adapter
 *
 * IMPORTANT: ggLeap does NOT have a documented public API as of this writing.
 * This adapter provides:
 *   - A portal URL wrapper for linking users to the ggLeap booking portal (REAL)
 *   - A mock station availability interface for development and future API integration (SCAFFOLDED)
 *
 * When ggLeap releases a public API, the `fetchStationAvailability` function
 * should be updated to make real HTTP calls.
 *
 * Environment variables:
 *   GGLEAP_PORTAL_URL  - The ggLeap customer portal URL for your center (default: https://portal.ggleap.com)
 *   GGLEAP_CENTER_NAME - Display name for the center (default: "Bakersfield Esports Center")
 *   GGLEAP_CENTER_ID   - Your ggLeap center ID (default: "bec-bakersfield")
 *   GGLEAP_MODE        - Set to "mock" to return mock station data; otherwise throws an error
 *                         indicating the live API is not yet available
 */

/** Represents a single station (PC, console, or VR setup) in the center. */
export interface GGLeapStation {
  id: string;
  name: string;
  type: 'pc' | 'console' | 'vr';
  status: 'available' | 'occupied' | 'maintenance';
  hourlyRate: number;
}

/** Structured booking link information for the ggLeap portal. */
export interface GGLeapBookingLink {
  /** Full URL to the ggLeap booking portal */
  url: string;
  /** Display name of the center */
  centerName: string;
  /** ggLeap center identifier */
  centerId: string;
}

/**
 * Returns the ggLeap portal URL for the center.
 *
 * This is a REAL integration point -- it simply reads the configured portal URL
 * from the environment or returns the default ggLeap portal URL.
 *
 * @returns The ggLeap portal URL string
 */
export function getPortalUrl(): string {
  return process.env.GGLEAP_PORTAL_URL || 'https://portal.ggleap.com';
}

/**
 * Returns a structured booking link object with center information.
 *
 * This is a REAL integration point -- it packages the portal URL with
 * center metadata for use in UI components and links.
 *
 * @returns A GGLeapBookingLink object with url, centerName, and centerId
 */
export function getBookingLink(): GGLeapBookingLink {
  return {
    url: getPortalUrl(),
    centerName: process.env.GGLEAP_CENTER_NAME || 'Bakersfield Esports Center',
    centerId: process.env.GGLEAP_CENTER_ID || 'bec-bakersfield',
  };
}

/**
 * Fetches station availability from ggLeap.
 *
 * SCAFFOLDED: This function currently only supports mock mode.
 * When ggLeap releases a public API, this should be updated to make real
 * HTTP requests to their endpoint.
 *
 * In mock mode (GGLEAP_MODE=mock), returns a realistic set of stations
 * representing a typical esports center layout:
 *   - 35 PCs (20 available, 15 occupied)
 *   - 5 consoles (3 available, 2 occupied)
 *   - 3 VR stations (1 available, 1 occupied, 1 maintenance)
 *
 * In live mode, throws an error with instructions since the API
 * is not yet publicly available.
 *
 * @returns Promise resolving to an array of GGLeapStation objects
 * @throws Error if GGLEAP_MODE is not "mock" (live API not yet available)
 */
export async function fetchStationAvailability(): Promise<GGLeapStation[]> {
  if (process.env.GGLEAP_MODE === 'mock') {
    return getMockStations();
  }

  throw new Error(
    'ggLeap API is not yet publicly available. ' +
    'To use mock station data for development, set the environment variable GGLEAP_MODE=mock. ' +
    'When ggLeap releases a public API, update this adapter with the appropriate HTTP client calls.'
  );
}

/**
 * Returns mock station data representing a realistic esports center layout.
 *
 * Station breakdown:
 *   - 20 available PCs ($5/hr)
 *   - 15 occupied PCs ($5/hr)
 *   - 3 available consoles ($4/hr)
 *   - 2 occupied consoles ($4/hr)
 *   - 1 available VR station ($8/hr)
 *   - 1 occupied VR station ($8/hr)
 *   - 1 VR station under maintenance ($8/hr)
 */
function getMockStations(): GGLeapStation[] {
  const stations: GGLeapStation[] = [];

  // PCs - 20 available
  for (let i = 1; i <= 20; i++) {
    stations.push({
      id: `pc-${String(i).padStart(3, '0')}`,
      name: `PC ${i}`,
      type: 'pc',
      status: 'available',
      hourlyRate: 5.0,
    });
  }

  // PCs - 15 occupied
  for (let i = 21; i <= 35; i++) {
    stations.push({
      id: `pc-${String(i).padStart(3, '0')}`,
      name: `PC ${i}`,
      type: 'pc',
      status: 'occupied',
      hourlyRate: 5.0,
    });
  }

  // Consoles - 3 available
  for (let i = 1; i <= 3; i++) {
    stations.push({
      id: `console-${String(i).padStart(3, '0')}`,
      name: `Console ${i}`,
      type: 'console',
      status: 'available',
      hourlyRate: 4.0,
    });
  }

  // Consoles - 2 occupied
  for (let i = 4; i <= 5; i++) {
    stations.push({
      id: `console-${String(i).padStart(3, '0')}`,
      name: `Console ${i}`,
      type: 'console',
      status: 'occupied',
      hourlyRate: 4.0,
    });
  }

  // VR - 1 available
  stations.push({
    id: 'vr-001',
    name: 'VR Station 1',
    type: 'vr',
    status: 'available',
    hourlyRate: 8.0,
  });

  // VR - 1 occupied
  stations.push({
    id: 'vr-002',
    name: 'VR Station 2',
    type: 'vr',
    status: 'occupied',
    hourlyRate: 8.0,
  });

  // VR - 1 maintenance
  stations.push({
    id: 'vr-003',
    name: 'VR Station 3',
    type: 'vr',
    status: 'maintenance',
    hourlyRate: 8.0,
  });

  return stations;
}
