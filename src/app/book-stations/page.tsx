import type { Metadata } from "next"
import Link from "next/link"
import {
  Monitor,
  Gamepad2,
  Glasses,
  Dice5,
  Clock,
  Wifi,
  Cpu,
  Zap,
  ExternalLink,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { rates } from "@/data/rates"
import { venue } from "@/data/venue"

export const metadata: Metadata = {
  title: "Book Gaming Stations | Bakersfield eSports Center",
  description:
    "Book a gaming station at BEC. Choose from 40 gaming PCs, PS5, Xbox, Switch consoles, VR stations, and tabletop gaming. Walk-ins welcome or reserve online via ggLeap.",
}

const stationTypes = [
  {
    name: "Gaming PCs",
    count: "40 Stations",
    description:
      "High-performance gaming PCs with the latest hardware, peripherals, and a library of popular titles.",
    icon: Monitor,
  },
  {
    name: "Consoles",
    count: "PS5, Xbox, Switch",
    description:
      "Current-generation consoles loaded with top games. Controllers and headsets provided.",
    icon: Gamepad2,
  },
  {
    name: "VR Stations",
    count: "Immersive VR",
    description:
      "Step into virtual reality with our immersive VR stations featuring the latest headsets and experiences.",
    icon: Glasses,
  },
  {
    name: "Tabletop / TCG Area",
    count: "Dedicated Space",
    description:
      "Dedicated area for trading card games (Pokemon, Yu-Gi-Oh!), board games, and tabletop gaming.",
    icon: Dice5,
  },
]

const equipmentSpecs = [
  {
    title: "High-Performance Gaming PCs",
    description: "Latest hardware with top-tier GPUs and high-refresh monitors",
    icon: Cpu,
  },
  {
    title: "High-Speed Fiber Internet",
    description: "Dedicated fiber connection for lag-free online gaming",
    icon: Wifi,
  },
  {
    title: "Next-Gen Consoles",
    description: "PS5, Xbox Series X, and Nintendo Switch with popular titles",
    icon: Gamepad2,
  },
  {
    title: "Immersive VR Stations",
    description:
      "Latest VR headsets with a curated library of experiences and games",
    icon: Glasses,
  },
]

const GGLEAP_PORTAL_URL =
  process.env.GGLEAP_PORTAL_URL || "https://portal.ggleap.com"

export default function BookStationsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-950/50 to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-red-500/20 text-red-300">
            <Zap className="mr-1 h-3 w-3" />
            Reserve Your Spot
          </Badge>
          <h1 className="font-orbitron text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Book Your{" "}
            <span className="text-red-400">Gaming Station</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Choose from 40+ gaming PCs, console stations, VR experiences, and
            tabletop gaming areas. Reserve online or walk in during operating
            hours.
          </p>
        </div>
      </section>

      {/* Station Types */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-orbitron text-3xl font-bold">
            Station Types
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stationTypes.map((station) => {
              const Icon = station.icon
              return (
                <Card
                  key={station.name}
                  className="border-border/50 transition-colors hover:border-red-500/30"
                >
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/20">
                      <Icon className="h-6 w-6 text-red-400" />
                    </div>
                    <CardTitle className="text-lg">{station.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {station.count}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{station.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Rates Grid */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-center font-orbitron text-3xl font-bold">
            Rates
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Flexible pricing options to fit your gaming session
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rates.map((rate) => (
              <Card
                key={rate.id}
                className={
                  rate.popular
                    ? "border-red-500/50 bg-gradient-to-br from-card to-red-950/20"
                    : "border-border/50"
                }
              >
                <CardHeader>
                  {rate.popular && (
                    <Badge className="mb-2 w-fit">Popular</Badge>
                  )}
                  <CardTitle>{rate.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="font-orbitron text-3xl font-bold text-red-400">
                      ${rate.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {rate.unit}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  {rate.description && (
                    <p className="mb-3 text-sm text-muted-foreground">
                      {rate.description}
                    </p>
                  )}
                  {rate.features && (
                    <ul className="space-y-1">
                      {rate.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/rates">View Full Rates & Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Book Online CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-orbitron text-3xl font-bold">Book Online</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Reserve your gaming station in advance through our ggLeap booking
            portal. Pick your station type, choose a time slot, and you are set.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <a
                href={GGLEAP_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Book via ggLeap Portal
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            You can also walk in during operating hours &mdash; no reservation
            required!
          </p>
        </div>
      </section>

      {/* Walk-in Info */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Hours */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-400" />
                  <CardTitle>Operating Hours</CardTitle>
                </div>
                <CardDescription>Walk-ins welcome during all operating hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {venue.hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0"
                    >
                      <span className="font-medium">{h.day}</span>
                      <span className="text-muted-foreground">
                        {h.open} &ndash; {h.close}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Equipment Specs */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-red-400" />
                  <CardTitle>Equipment & Specs</CardTitle>
                </div>
                <CardDescription>
                  Everything you need for an elite gaming experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {equipmentSpecs.map((spec) => {
                    const Icon = spec.icon
                    return (
                      <div key={spec.title} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-500/20">
                          <Icon className="h-4 w-4 text-red-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{spec.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {spec.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {venue.address}, {venue.city}, {venue.state} {venue.zip}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
