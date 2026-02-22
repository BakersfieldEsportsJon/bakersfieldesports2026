/**
 * Integration Adapters - Barrel Export
 *
 * This module re-exports all third-party integration adapters used by the
 * Bakersfield Esports Center site. Each adapter encapsulates communication
 * with an external service and supports mock modes for local development.
 *
 * Adapters:
 *   - stripe   : Payment processing via Stripe Checkout
 *   - startgg  : Tournament data from start.gg GraphQL API
 *   - ggleap   : Station availability and booking links via ggLeap
 */

// Stripe - Payment processing
export {
  getStripe,
  createCheckoutSession,
  constructWebhookEvent,
} from './stripe';
export type { CheckoutSessionParams } from './stripe';

// start.gg - Tournament management
export {
  fetchTournaments,
  fetchTournamentBySlug,
  getMockTournaments,
} from './startgg';
export type { Tournament } from './startgg';

// ggLeap - Station management and booking
export {
  getPortalUrl,
  getBookingLink,
  fetchStationAvailability,
} from './ggleap';
export type { GGLeapStation, GGLeapBookingLink } from './ggleap';
