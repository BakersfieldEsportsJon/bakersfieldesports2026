import { Partner } from '@/types';

/**
 * Partnership tier definitions:
 * - Platinum: Major sponsor with prominent branding, featured in marketing materials,
 *   dedicated partnership initiatives, and top-level visibility across the site.
 * - Gold: Significant sponsor with logo placement, co-branded initiatives,
 *   and featured recognition on the site.
 * - Silver: Supporting sponsor with logo placement and acknowledgment
 *   on the partnerships page.
 */
export const partnerTiers = {
  platinum: {
    label: 'Platinum Partner',
    description: 'Major sponsor with prominent branding and dedicated partnership initiatives.',
  },
  gold: {
    label: 'Gold Partner',
    description: 'Significant sponsor with co-branded initiatives and featured recognition.',
  },
  silver: {
    label: 'Silver Partner',
    description: 'Supporting sponsor with logo placement and acknowledgment.',
  },
} as const;

export const partners: Partner[] = [
  {
    id: 'valley-strong',
    name: 'Valley Strong Credit Union',
    tier: 'platinum',
    logoUrl: '/images/partners/valley-strong.png',
    description:
      'Valley Strong Credit Union is a leading financial institution in the Central Valley and the primary partner of the Bakersfield eSports Center.',
    initiative:
      'Valley Strong supports BEC through community-focused gaming initiatives, STEM education programs, and financial literacy outreach within the esports community.',
  },
  {
    id: 'visit-bakersfield',
    name: 'Visit Bakersfield',
    tier: 'gold',
    logoUrl: '/images/partners/visit-bakersfield.jpg',
    description:
      'Visit Bakersfield is the official destination marketing organization for Bakersfield and Kern County, promoting tourism and local attractions.',
    initiative:
      'Visit Bakersfield partners with BEC to promote esports tourism and position Bakersfield as a destination for competitive gaming events.',
  },
  {
    id: 'innovative-advantage',
    name: 'Innovative Advantage',
    tier: 'silver',
    logoUrl: '/images/partners/innovative-advantage.png',
    description:
      'Innovative Advantage provides technology solutions and IT services to businesses in the Bakersfield area.',
  },
  {
    id: 'fox-theater',
    name: 'Bakersfield Fox Theater',
    tier: 'silver',
    logoUrl: '/images/partners/fox-theater.png',
    description:
      'The historic Bakersfield Fox Theater is a premier entertainment venue in downtown Bakersfield, hosting live events, concerts, and community programming.',
  },
];
