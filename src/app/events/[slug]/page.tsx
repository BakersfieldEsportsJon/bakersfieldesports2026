import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Gamepad2,
  MapPin,
  Shield,
  Trophy,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { fallbackEvents, getEventBySlug } from '@/data/events';
import { EventCard } from '@/components/events/event-card';
import type { Event } from '@/types';

const categoryConfig: Record<
  Event['category'],
  { label: string; className: string }
> = {
  tournament: {
    label: 'Tournament',
    className: 'bg-red-600/90 text-white border-red-500',
  },
  weekly: {
    label: 'Weekly',
    className: 'bg-emerald-600/90 text-white border-emerald-500',
  },
  league: {
    label: 'League',
    className: 'bg-blue-600/90 text-white border-blue-500',
  },
  special: {
    label: 'Special Event',
    className: 'bg-amber-600/90 text-white border-amber-500',
  },
};

export function generateStaticParams() {
  return fallbackEvents.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Not Found | Bakersfield eSports Center',
    };
  }

  return {
    title: `${event.title} | Bakersfield eSports Center`,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const category = categoryConfig[event.category];

  // Get related events: same category, excluding current, max 3
  const relatedEvents = fallbackEvents
    .filter((e) => e.category === event.category && e.id !== event.id)
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Back Link */}
      <div className="border-b border-border/30 bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-red-400"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
            Back to Events
          </Link>
        </div>
      </div>

      {/* Event Header */}
      <section className="border-b border-border/30 bg-gradient-to-b from-red-950/20 to-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <Badge className={cn(category.className)}>
                {category.label}
              </Badge>
              {event.isRegistrationOpen && (
                <Badge
                  variant="outline"
                  className="border-emerald-500/50 text-emerald-400"
                >
                  Registration Open
                </Badge>
              )}
            </div>

            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>

            {event.game && (
              <div className="mt-4 flex items-center gap-2 text-lg text-muted-foreground">
                <Gamepad2 className="h-5 w-5 text-red-400" />
                <span>{event.game}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Info Grid */}
            <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Card className="border-border/50 bg-surface">
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <Calendar className="h-5 w-5 text-red-400" />
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Date
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {event.date
                      ? new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })
                      : event.category === 'weekly'
                        ? 'Every Week'
                        : 'TBA'}
                  </span>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-surface">
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <Clock className="h-5 w-5 text-red-400" />
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Time
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {event.time ?? 'See Details'}
                  </span>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-surface">
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <Trophy className="h-5 w-5 text-red-400" />
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Entry Fee
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {event.entryFee !== undefined
                      ? event.entryFee === 0
                        ? 'Free'
                        : `$${event.entryFee}`
                      : 'TBA'}
                  </span>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-surface">
                <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                  <Users className="h-5 w-5 text-red-400" />
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Participants
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {event.maxParticipants
                      ? `${event.currentParticipants ?? 0}/${event.maxParticipants}`
                      : 'Open'}
                  </span>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="mb-4 font-heading text-xl font-bold text-foreground">
                About This Event
              </h2>
              <div className="rounded-lg border border-border/30 bg-surface p-6">
                <p className="leading-relaxed text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="mb-10">
              <div className="flex items-center gap-2 rounded-lg border border-border/30 bg-surface p-4">
                <MapPin className="h-5 w-5 shrink-0 text-red-400" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Bakersfield eSports Center
                  </p>
                  <p className="text-sm text-muted-foreground">
                    7104 Golden State Hwy, Bakersfield, CA 93308
                  </p>
                </div>
              </div>
            </div>

            {/* Rules */}
            {event.rules && (
              <div className="mb-10">
                <h2 className="mb-4 font-heading text-xl font-bold text-foreground">
                  Rules
                </h2>
                <div className="rounded-lg border border-border/30 bg-surface p-6">
                  <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                    {event.rules}
                  </p>
                </div>
              </div>
            )}

            {/* Age Restriction */}
            {event.ageRestriction && (
              <div className="mb-10 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div>
                  <p className="text-sm font-semibold text-amber-300">
                    Age Restriction
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {event.ageRestriction}
                  </p>
                </div>
              </div>
            )}

            {/* Registration CTA */}
            <div className="mb-10 rounded-xl border border-border/30 bg-gradient-to-r from-red-950/30 to-surface p-8 text-center">
              {event.registrationUrl ? (
                <>
                  <h3 className="mb-2 font-heading text-xl font-bold text-foreground">
                    Ready to Compete?
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    Register now to secure your spot in {event.title}.
                  </p>
                  <Button asChild size="lg">
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Register on start.gg
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </>
              ) : event.registrationSource === 'startgg' ? (
                <>
                  <h3 className="mb-2 font-heading text-xl font-bold text-foreground">
                    Registration Coming Soon
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    Registration for this event will be available on start.gg.
                    Follow us on social media for announcements.
                  </p>
                  <Button variant="outline" size="lg" disabled>
                    Registration Coming Soon
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="mb-2 font-heading text-xl font-bold text-foreground">
                    {event.isRegistrationOpen
                      ? 'Join Us!'
                      : 'Registration Coming Soon'}
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    {event.isRegistrationOpen
                      ? 'This event is open for registration. Drop in at BEC to sign up!'
                      : 'Stay tuned for registration details. Follow our social media for updates.'}
                  </p>
                  <Button
                    asChild
                    variant={
                      event.isRegistrationOpen ? 'default' : 'outline'
                    }
                    size="lg"
                  >
                    <Link href="/contact">
                      {event.isRegistrationOpen
                        ? 'Contact Us to Register'
                        : 'Get Notified'}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="border-t border-border/30 bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Related Events
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  More {category.label.toLowerCase()} events you might enjoy
                </p>
              </div>
              <Button
                asChild
                variant="ghost"
                className="hidden text-red-400 hover:text-red-300 sm:flex"
              >
                <Link href="/events">
                  All Events
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedEvents.map((relatedEvent) => (
                <EventCard key={relatedEvent.id} event={relatedEvent} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
