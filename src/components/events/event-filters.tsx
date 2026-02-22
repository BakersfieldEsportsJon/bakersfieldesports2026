'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventCard } from '@/components/events/event-card';
import type { Event } from '@/types';

interface EventFiltersProps {
  events: Event[];
}

export function EventFilters({ events }: EventFiltersProps) {
  const allEvents = events;
  const tournaments = events.filter((e) => e.category === 'tournament');
  const weekly = events.filter((e) => e.category === 'weekly');
  const leagues = events.filter((e) => e.category === 'league');

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-8 flex w-full flex-wrap justify-start gap-1 bg-surface-light p-1">
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
        >
          All Events ({allEvents.length})
        </TabsTrigger>
        <TabsTrigger
          value="tournaments"
          className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
        >
          Tournaments ({tournaments.length})
        </TabsTrigger>
        <TabsTrigger
          value="weekly"
          className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
        >
          Weekly Events ({weekly.length})
        </TabsTrigger>
        <TabsTrigger
          value="leagues"
          className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
        >
          Leagues ({leagues.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <EventGrid events={allEvents} />
      </TabsContent>

      <TabsContent value="tournaments">
        {tournaments.length > 0 ? (
          <EventGrid events={tournaments} />
        ) : (
          <EmptyState message="No tournaments scheduled at this time. Check back soon!" />
        )}
      </TabsContent>

      <TabsContent value="weekly">
        {weekly.length > 0 ? (
          <EventGrid events={weekly} />
        ) : (
          <EmptyState message="No weekly events listed. Check back soon!" />
        )}
      </TabsContent>

      <TabsContent value="leagues">
        {leagues.length > 0 ? (
          <EventGrid events={leagues} />
        ) : (
          <EmptyState message="No leagues are running at the moment. Stay tuned for upcoming seasons!" />
        )}
      </TabsContent>
    </Tabs>
  );
}

function EventGrid({ events }: { events: Event[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-border/50 bg-surface/50 p-8">
      <p className="text-center text-muted-foreground">{message}</p>
    </div>
  );
}
