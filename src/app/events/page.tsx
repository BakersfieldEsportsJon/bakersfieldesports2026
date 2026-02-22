import { Calendar, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { fallbackEvents } from '@/data/events';
import { EventFilters } from '@/components/events/event-filters';

export default function EventsPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="border-b border-border/30 bg-gradient-to-b from-red-950/30 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 border-red-500/30 bg-red-500/10 text-red-300">
              <Trophy className="mr-1.5 h-3.5 w-3.5" />
              Compete &amp; Connect
            </Badge>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Events &amp; Tournaments
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Join us for exciting tournaments, weekly meetups, and competitive
              leagues. From fighting games to TCG, there&apos;s something for
              every gamer.
            </p>
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <EventFilters events={fallbackEvents} />

          {/* API Note */}
          <div className="mt-12 rounded-lg border border-border/30 bg-surface/50 p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-red-400" />
              <span>
                Live event data is powered by{' '}
                <a
                  href="https://start.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 underline underline-offset-2 hover:text-red-300"
                >
                  start.gg
                </a>
                . Check back often for the latest schedules and registration
                links.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
