export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date?: string; // ISO date
  time?: string;
  endDate?: string;
  game?: string;
  category: 'tournament' | 'weekly' | 'league' | 'special';
  entryFee?: number; // 0 = free
  maxParticipants?: number;
  currentParticipants?: number;
  registrationUrl?: string;
  registrationSource?: 'startgg' | 'internal' | 'external';
  isRegistrationOpen?: boolean;
  imageUrl?: string;
  rules?: string;
  ageRestriction?: string;
}

export interface Rate {
  id: string;
  name: string;
  price: number;
  unit: string;
  description?: string;
  features?: string[];
  popular?: boolean;
  stripePriceId?: string;
}

export interface PartyPackage {
  id: string;
  name: string;
  price: number;
  deposit: number;
  includes: string[];
  addOns?: { name: string; price: number }[];
  restrictions?: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'events' | 'parties' | 'rates' | 'facility';
}

export interface VenueInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email?: string;
  coordinates: { lat: number; lng: number };
  hours: { day: string; open: string; close: string }[];
  size: string;
  founded: number;
  socialMedia: { platform: string; url: string; handle?: string }[];
}

export interface Partner {
  id: string;
  name: string;
  tier: 'platinum' | 'gold' | 'silver';
  description?: string;
  initiative?: string;
  logoUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface PartyInquiryData {
  name: string;
  phone: string;
  email: string;
  partyRecipient: string;
  recipientAge: number;
  date: string;
  time: string;
  pizzaReadyTime?: string;
  cheesePizzas: number;
  pepperoniPizzas: number;
  additionalPlayers?: number;
  honeypot?: string;
}
