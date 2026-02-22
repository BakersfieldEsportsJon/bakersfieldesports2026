import { Rate, PartyPackage } from '@/types';

export const rates: Rate[] = [
  {
    id: 'hourly',
    name: 'Hourly Rate',
    price: 7,
    unit: 'per hour',
    description: 'Drop in and play',
    features: ['Access to all gaming stations', 'PC, console, or VR'],
  },
  {
    id: '4hour',
    name: '4-Hour Package',
    price: 24,
    unit: 'flat',
    description: 'Extended gaming session',
    features: ['4 hours of play', 'Save vs hourly rate'],
    popular: true,
  },
  {
    id: 'weekday-pass',
    name: 'Weekday Day Pass',
    price: 35,
    unit: 'Mon-Fri',
    description: 'Full day gaming',
    features: ['Up to 12 hours of play', 'Monday through Friday'],
  },
  {
    id: 'weekend-pass',
    name: 'Weekend Day Pass',
    price: 40,
    unit: 'Sat-Sun',
    description: 'Full day weekend gaming',
    features: ['Up to 12 hours of play', 'Saturday and Sunday'],
  },
  {
    id: 'night-pass',
    name: 'Night Pass',
    price: 14,
    unit: 'flat',
    description: 'Late night gaming',
    features: [
      'Final 3 operating hours',
      'Sun-Thu 8-11PM, Fri-Sat 9PM-12AM',
    ],
  },
  {
    id: 'monthly',
    name: 'Unlimited Monthly',
    price: 250,
    unit: 'per month',
    description: 'Unlimited access',
    features: [
      'Unlimited gaming all month',
      'All stations and platforms',
      'Best value for regulars',
    ],
    popular: true,
  },
];

export const partyPackage: PartyPackage = {
  id: 'standard',
  name: 'Standard Party Package',
  price: 295,
  deposit: 100,
  includes: [
    'Dedicated party host',
    '2 hours of gameplay for 10 players',
    '1 hour in dedicated party area',
    'Drinks included',
    '2 large pizzas (cheese or pepperoni)',
  ],
  addOns: [
    { name: 'Additional player', price: 10 },
    { name: 'Additional pizza', price: 20 },
  ],
  restrictions: [
    'Minimum 48-hour advance booking required',
    'Party hours: 12:00 PM to 8:00 PM only',
    'Maximum booking window: approximately 6 months ahead',
    '3.5% processing fee applies',
    'Unavailable dates: April 20, April 26, November 27, December 25',
  ],
};
