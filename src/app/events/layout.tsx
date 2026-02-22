import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events & Tournaments | Bakersfield eSports Center',
  description:
    'Browse upcoming tournaments, weekly meetups, competitive leagues, and special events at the Bakersfield eSports Center. Join the community and compete in Tekken, Street Fighter, Smash Bros, and more.',
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
