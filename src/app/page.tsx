import Link from 'next/link';
import Image from 'next/image';
import {
  Monitor,
  Zap,
  Shield,
  Trophy,
  PartyPopper,
  Users,
  Gamepad2,
  Calendar,
  Star,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { fallbackEvents } from '@/data/events';
import { rates } from '@/data/rates';
import { partners } from '@/data/partners';
import { EventCard } from '@/components/events/event-card';

export default function HomePage() {
  const upcomingEvents = fallbackEvents.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/30 bg-gradient-to-b from-red-950/40 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,25,77,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-red-500/30 bg-red-500/10 text-red-300">
              <Gamepad2 className="mr-1.5 h-3.5 w-3.5" />
              Bakersfield&apos;s Premier Esports Venue
            </Badge>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Level Up Your{' '}
              <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
                Gaming Experience
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              The Bakersfield eSports Center is a 5,000 sq ft gaming arena with
              40+ high-end gaming stations. Compete in tournaments, host epic
              parties, or just drop in and play.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/events">
                  <Calendar className="mr-2 h-5 w-5" />
                  View Events
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="w-full bg-red-600 text-white hover:bg-red-700 sm:w-auto"
              >
                <Link href="/parties">
                  <PartyPopper className="mr-2 h-5 w-5" />
                  Book a Party
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border/30 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                <Monitor className="h-6 w-6 text-red-400" />
              </div>
              <span className="font-heading text-2xl font-bold text-foreground">
                40+
              </span>
              <span className="text-sm text-muted-foreground">Gaming PCs</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                <Zap className="h-6 w-6 text-red-400" />
              </div>
              <span className="font-heading text-2xl font-bold text-foreground">
                5,000
              </span>
              <span className="text-sm text-muted-foreground">Square Feet</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                <Shield className="h-6 w-6 text-red-400" />
              </div>
              <span className="font-heading text-2xl font-bold text-foreground">
                2021
              </span>
              <span className="text-sm text-muted-foreground">Founded</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                <Trophy className="h-6 w-6 text-red-400" />
              </div>
              <span className="font-heading text-2xl font-bold text-foreground">
                1000+
              </span>
              <span className="text-sm text-muted-foreground">
                Events Hosted
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="border-b border-border/30 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Upcoming Events
              </h2>
              <p className="mt-2 text-muted-foreground">
                Tournaments, weekly meetups, and competitive play
              </p>
            </div>
            <Button
              asChild
              variant="ghost"
              className="hidden text-red-400 hover:text-red-300 sm:flex"
            >
              <Link href="/events">
                View All Events
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} compact />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline" className="border-red-500/30">
              <Link href="/events">
                View All Events
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rates Overview */}
      <section className="border-b border-border/30 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Gaming Rates
            </h2>
            <p className="mt-2 text-muted-foreground">
              Flexible pricing for every gamer
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rates.map((rate) => (
              <Card
                key={rate.id}
                className={cn(
                  'relative flex flex-col border-border/50 bg-background transition-all duration-300 hover:shadow-lg',
                  rate.popular &&
                    'border-red-500/60 shadow-md shadow-red-500/10'
                )}
              >
                {rate.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-red-500 text-white">
                      <Star className="mr-1 h-3 w-3" />
                      Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading text-lg">
                    {rate.name}
                  </CardTitle>
                  {rate.description && (
                    <CardDescription>{rate.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <div className="mb-4">
                    <span className="font-heading text-3xl font-bold text-red-400">
                      ${rate.price}
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      /{rate.unit}
                    </span>
                  </div>
                  {rate.features && (
                    <ul className="space-y-2">
                      {rate.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="border-red-500/30">
              <Link href="/rates">
                View All Rates & Packages
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose BEC */}
      <section className="border-b border-border/30 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Why Choose BEC?
            </h2>
            <p className="mt-2 text-muted-foreground">
              More than just a gaming center
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Trophy,
                title: 'Competitive Gaming',
                description:
                  'Regular tournaments and leagues across fighting games, FPS, and more. Compete locally and climb the ranks.',
              },
              {
                icon: PartyPopper,
                title: 'Party Venue',
                description:
                  'Host unforgettable birthday parties and private events with dedicated party hosts, food, and gaming.',
              },
              {
                icon: Users,
                title: 'Community Hub',
                description:
                  'Weekly meetups, TCG nights, and casual sessions. Find your crew and build lasting friendships.',
              },
              {
                icon: Monitor,
                title: 'Latest Equipment',
                description:
                  'High-end gaming PCs, next-gen consoles, VR headsets, and fighting game setups. Always up to date.',
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="group border-border/50 bg-surface transition-all duration-300 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10"
              >
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 transition-colors group-hover:bg-red-500/20">
                    <feature.icon className="h-6 w-6 text-red-400" />
                  </div>
                  <CardTitle className="font-heading text-lg">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-border/30 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              What Our Community Says
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="border-border/50 bg-background">
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed text-foreground">
                  &ldquo;BEC has become my second home. The weekly tournaments
                  are well-organized, the equipment is top-notch, and the
                  community is incredibly welcoming. Best gaming spot in
                  Bakersfield, hands down.&rdquo;
                </blockquote>
                <div className="mt-4 border-t border-border/30 pt-4">
                  <p className="font-semibold text-foreground">
                    Local Competitive Player
                  </p>
                  <p className="text-sm text-muted-foreground">
                    BEC Community Member
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-background">
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed text-foreground">
                  &ldquo;We hosted my son&apos;s 12th birthday party here and it
                  was amazing. The staff was attentive, the kids had a blast
                  gaming, and the party package made everything so easy. Already
                  planning to come back!&rdquo;
                </blockquote>
                <div className="mt-4 border-t border-border/30 pt-4">
                  <p className="font-semibold text-foreground">
                    Happy Parent
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Birthday Party Host
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-b border-border/30 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Proud Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={cn(
                    'flex h-16 items-center justify-center rounded-lg border border-border/50 bg-surface px-6',
                    partner.tier === 'platinum' && 'border-red-500/30',
                    partner.tier === 'gold' && 'border-amber-500/30'
                  )}
                >
                  {partner.logoUrl ? (
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      width={140}
                      height={48}
                      className="h-10 w-auto object-contain"
                    />
                  ) : (
                    <span
                      className={cn(
                        'font-heading text-sm font-semibold',
                        partner.tier === 'platinum' && 'text-red-300',
                        partner.tier === 'gold' && 'text-amber-300',
                        partner.tier === 'silver' && 'text-muted-foreground'
                      )}
                    >
                      {partner.name}
                    </span>
                  )}
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    'text-[10px]',
                    partner.tier === 'platinum' &&
                      'border-red-500/30 text-red-400',
                    partner.tier === 'gold' &&
                      'border-amber-500/30 text-amber-400',
                    partner.tier === 'silver' &&
                      'border-border/50 text-muted-foreground'
                  )}
                >
                  {partner.tier}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-b from-background to-red-950/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Ready to{' '}
              <span className="bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent">
                Game?
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you&apos;re a competitive player, casual gamer, or looking
              to host an event, BEC has something for you.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/events">
                  <Calendar className="mr-2 h-5 w-5" />
                  Browse Events
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full border-red-500/30 hover:border-red-500 hover:bg-red-500/10 sm:w-auto"
              >
                <Link href="/rates">
                  <Monitor className="mr-2 h-5 w-5" />
                  Book a Station
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
