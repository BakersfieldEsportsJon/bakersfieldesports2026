import { VenueInfo } from '@/types';

export const venue: VenueInfo = {
  name: 'Bakersfield eSports Center',
  address: '7104 Golden State Hwy',
  city: 'Bakersfield',
  state: 'CA',
  zip: '93308',
  phone: '(661) 529-7447',
  email: 'partnerships@bakersfieldesports.com',
  coordinates: { lat: 35.3733, lng: -119.0694 },
  hours: [
    { day: 'Sunday', open: '12:00 PM', close: '11:00 PM' },
    { day: 'Monday', open: '12:00 PM', close: '11:00 PM' },
    { day: 'Tuesday', open: '12:00 PM', close: '11:00 PM' },
    { day: 'Wednesday', open: '12:00 PM', close: '11:00 PM' },
    { day: 'Thursday', open: '12:00 PM', close: '11:00 PM' },
    { day: 'Friday', open: '12:00 PM', close: '12:00 AM' },
    { day: 'Saturday', open: '12:00 PM', close: '12:00 AM' },
  ],
  size: '5,000 sq ft',
  founded: 2021,
  socialMedia: [
    {
      platform: 'Facebook',
      url: 'https://facebook.com/Bakersfield-ESports-104418741131608',
      handle: 'Bakersfield eSports',
    },
    {
      platform: 'X',
      url: 'https://twitter.com/Bak_eSports',
      handle: '@Bak_eSports',
    },
    {
      platform: 'Instagram',
      url: 'https://instagram.com/bakersfieldesports',
      handle: '@bakersfieldesports',
    },
    {
      platform: 'TikTok',
      url: 'https://tiktok.com/@bakersfieldesportscenter',
      handle: '@bakersfieldesportscenter',
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/channel/UCZvHOMf6jzLVp4Rf3A_fd1A',
    },
    {
      platform: 'Twitch',
      url: 'https://twitch.tv/bakersfieldesportscenter',
      handle: 'bakersfieldesportscenter',
    },
    {
      platform: 'Discord',
      url: 'https://discord.gg/jbzWH3ZvRp',
    },
  ],
};
