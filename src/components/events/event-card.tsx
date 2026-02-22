import Link from 'next/link';
import { Calendar, Clock, Gamepad2, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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

interface EventCardProps {
  event: Event;
  compact?: boolean;
}

export function EventCard({ event, compact = false }: EventCardProps) {
  const category = categoryConfig[event.category];

  return (
    <Card
      className={cn(
        'group flex flex-col overflow-hidden border-border/50 bg-surface transition-all duration-300 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10',
        compact && 'h-full'
      )}
    >
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge className={cn('shrink-0', category.className)}>
            {category.label}
          </Badge>
          {event.entryFee !== undefined && (
            <span className="text-sm font-semibold text-red-400">
              {event.entryFee === 0 ? 'Free' : `$${event.entryFee}`}
            </span>
          )}
        </div>
        <h3
          className={cn(
            'font-heading font-bold leading-tight text-foreground',
            compact ? 'text-base' : 'text-lg'
          )}
        >
          {event.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pb-3">
        {event.game && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Gamepad2 className="h-4 w-4 shrink-0 text-red-400" />
            <span>{event.game}</span>
          </div>
        )}

        {event.date && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0 text-red-400" />
            <span>
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        )}

        {event.time && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0 text-red-400" />
            <span>{event.time}</span>
          </div>
        )}

        {event.maxParticipants && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 shrink-0 text-red-400" />
            <span>
              {event.currentParticipants ?? 0}/{event.maxParticipants} players
            </span>
          </div>
        )}

        {!compact && event.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex items-center gap-2 pt-0">
        {event.registrationUrl ? (
          <>
            <Button asChild size="sm" className="flex-1">
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Register on start.gg
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href={`/events/${event.slug}`}>
                Details
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </>
        ) : (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full border-red-500/30 hover:border-red-500 hover:bg-red-500/10"
          >
            <Link href={`/events/${event.slug}`}>
              View Details
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
