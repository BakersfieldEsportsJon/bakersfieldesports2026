import type { Metadata } from "next"
import Link from "next/link"
import {
  MapPin,
  Phone,
  Clock,
  Monitor,
  Gamepad2,
  Glasses,
  Wifi,
  Users,
  GraduationCap,
  Trophy,
  Heart,
  Building2,
  Handshake,
  Briefcase,
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
import { venue } from "@/data/venue"
import { partners } from "@/data/partners"

export const metadata: Metadata = {
  title: "About Us | Bakersfield eSports Center",
  description:
    "Learn about BEC, Bakersfield's premier 5,000 sq ft esports venue. Founded in 2021, we offer gaming PCs, consoles, VR, tournaments, STEM programs, and community events.",
}

const facilitySpecs = [
  { label: "Gaming PCs", value: "40", icon: Monitor },
  { label: "Console Stations", value: "PS5, Xbox, Switch", icon: Gamepad2 },
  { label: "VR Stations", value: "Immersive VR", icon: Glasses },
  { label: "Fiber Internet", value: "High-Speed", icon: Wifi },
]

const communityImpact = [
  {
    title: "Tournaments",
    description:
      "Hosting competitive events that attract participants from across California, building a thriving fighting game community.",
    icon: Trophy,
  },
  {
    title: "STEM Programs",
    description:
      "Partnering with schools and organizations to deliver game-based STEM education to youth in the Bakersfield community.",
    icon: GraduationCap,
  },
  {
    title: "Charity Events",
    description:
      "Organizing charity gaming marathons and fundraising events to give back to the Bakersfield community.",
    icon: Heart,
  },
  {
    title: "Youth Activities",
    description:
      "Providing a safe, supervised space for young gamers to play, learn, and connect with peers.",
    icon: Users,
  },
  {
    title: "Job Opportunities",
    description:
      "Creating local employment opportunities in the esports and gaming industry for Bakersfield residents.",
    icon: Briefcase,
  },
]

const stats = [
  { value: "1,000+", label: "Students Reached" },
  { value: "15+", label: "School Partnerships" },
  { value: "30+", label: "STEM Programs Delivered" },
  { value: "5,000", label: "Sq Ft Facility" },
]

const tierColors: Record<string, string> = {
  platinum: "bg-slate-300 text-slate-900",
  gold: "bg-yellow-500 text-yellow-950",
  silver: "bg-gray-400 text-gray-900",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-950/50 to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-red-500/20 text-red-300">
            <Building2 className="mr-1 h-3 w-3" />
            About Us
          </Badge>
          <h1 className="font-orbitron text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Bakersfield{" "}
            <span className="text-red-400">eSports Center</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
            Our mission is to build and empower the gaming community in
            Bakersfield through competitive esports, inclusive events, STEM
            education, and a world-class gaming facility that welcomes everyone.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-orbitron text-3xl font-bold">Our Story</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Founded in{" "}
              <strong className="text-foreground">{venue.founded}</strong>, the
              Bakersfield eSports Center grew from a small gaming cafe concept
              into a{" "}
              <strong className="text-foreground">{venue.size}</strong>{" "}
              facility that serves as the hub for competitive gaming and
              community events in the Central Valley. What started as a passion
              project has evolved into Bakersfield&apos;s premier esports
              destination, hosting tournaments, STEM programs, birthday parties,
              and weekly community gatherings.
            </p>
          </div>
        </div>
      </section>

      {/* Facility Specs */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-orbitron text-3xl font-bold">
            Our Facility
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facilitySpecs.map((spec) => {
              const Icon = spec.icon
              return (
                <Card
                  key={spec.label}
                  className="border-border/50 text-center"
                >
                  <CardContent className="pt-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/20">
                      <Icon className="h-7 w-7 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold">{spec.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {spec.value}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground">
            Our facility also includes a streaming setup for live broadcasts,
            dedicated party rooms for private events, and a tabletop gaming
            area for TCG and board game enthusiasts.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-orbitron text-4xl font-bold text-red-400">
                  {stat.value}
                </div>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-orbitron text-3xl font-bold">
              Community Impact
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              More than a gaming center &mdash; we are building community
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {communityImpact.map((item) => {
              const Icon = item.icon
              return (
                <Card key={item.title} className="border-border/50">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
                      <Icon className="h-5 w-5 text-red-400" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-orbitron text-3xl font-bold">Our Team</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            The Bakersfield eSports Center is run by a passionate team of gamers,
            community builders, and educators who believe in the power of
            esports to bring people together. From our dedicated party hosts
            to our tournament organizers and STEM educators, every team member
            shares a commitment to creating a welcoming, inclusive gaming
            environment for everyone in the Central Valley.
          </p>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
              <Handshake className="h-6 w-6 text-red-400" />
            </div>
            <h2 className="font-orbitron text-3xl font-bold">Our Partners</h2>
            <p className="mt-4 text-muted-foreground">
              Working together to strengthen the gaming community
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {partners.map((partner) => (
              <Card key={partner.id} className="border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <Badge
                      className={
                        tierColors[partner.tier] || "bg-secondary text-secondary-foreground"
                      }
                    >
                      {partner.tier.charAt(0).toUpperCase() +
                        partner.tier.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {partner.description && (
                    <p className="text-sm text-muted-foreground">
                      {partner.description}
                    </p>
                  )}
                  {partner.initiative && (
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Initiative:</strong>{" "}
                      {partner.initiative}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/partnerships">View All Partnerships</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-orbitron text-3xl font-bold">
            Visit Us
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Address */}
            <Card className="border-border/50">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                  <MapPin className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {venue.address}
                    <br />
                    {venue.city}, {venue.state} {venue.zip}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="border-border/50">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                  <Phone className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a
                    href="tel:+16615297447"
                    className="mt-1 block text-sm text-muted-foreground hover:text-red-400"
                  >
                    {venue.phone}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="border-border/50">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                  <Clock className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold">Hours</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sun&ndash;Thu: 12:00 PM &ndash; 11:00 PM
                    <br />
                    Fri&ndash;Sat: 12:00 PM &ndash; 12:00 AM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media */}
          <div className="mt-8 text-center">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {venue.socialMedia.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-red-500/50 hover:text-red-400"
                >
                  {social.platform}
                  {social.handle && (
                    <span className="ml-1 text-xs">({social.handle})</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
