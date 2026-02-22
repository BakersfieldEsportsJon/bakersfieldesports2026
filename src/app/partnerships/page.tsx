import type { Metadata } from "next"
import Image from "next/image"
import {
  Handshake,
  Mail,
  Star,
  Award,
  Shield,
  CheckCircle,
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
import { partners, partnerTiers } from "@/data/partners"

export const metadata: Metadata = {
  title: "Partnerships | Bakersfield eSports Center",
  description:
    "Partner with BEC to support esports and gaming in Bakersfield. Learn about our current partners and partnership tier benefits. Contact us to become a partner.",
}

const tierConfig = [
  {
    tier: "platinum" as const,
    icon: Star,
    color: "bg-slate-300 text-slate-900",
    borderColor: "border-slate-400/50",
    bgGradient: "from-card to-slate-950/20",
    benefits: [
      "Prominent logo placement across all marketing materials",
      "Featured partnership page with dedicated section",
      "Co-branded initiatives and event sponsorship",
      "Social media shout-outs and featured content",
      "Priority event sponsorship opportunities",
      "Dedicated partnership manager",
      "Custom community engagement programs",
    ],
  },
  {
    tier: "gold" as const,
    icon: Award,
    color: "bg-yellow-500 text-yellow-950",
    borderColor: "border-yellow-500/50",
    bgGradient: "from-card to-yellow-950/10",
    benefits: [
      "Logo placement on website and select marketing materials",
      "Featured recognition on partnerships page",
      "Co-branded initiative opportunities",
      "Social media recognition",
      "Event sponsorship opportunities",
      "Quarterly partnership review meetings",
    ],
  },
  {
    tier: "silver" as const,
    icon: Shield,
    color: "bg-gray-400 text-gray-900",
    borderColor: "border-gray-400/50",
    bgGradient: "from-card to-gray-950/10",
    benefits: [
      "Logo placement on partnerships page",
      "Acknowledgment in community events",
      "Social media mentions",
      "Invitation to partner-exclusive events",
      "Annual partnership review",
    ],
  },
]

export default function PartnershipsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-950/50 to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-red-500/20 text-red-300">
            <Handshake className="mr-1 h-3 w-3" />
            Partnerships
          </Badge>
          <h1 className="font-orbitron text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Our <span className="text-red-400">Partners</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            We work with organizations across the Central Valley to bring
            esports, education, and community programming to Bakersfield. Learn
            about our partners and how you can join us.
          </p>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center font-orbitron text-3xl font-bold">
            Current Partners
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {partners.map((partner) => {
              const tierInfo = tierConfig.find((t) => t.tier === partner.tier)
              return (
                <Card
                  key={partner.id}
                  className={`${tierInfo?.borderColor || "border-border/50"} bg-gradient-to-br ${tierInfo?.bgGradient || ""}`}
                >
                  <CardHeader>
                    {partner.logoUrl && (
                      <div className="mb-3 flex h-16 items-center">
                        <Image
                          src={partner.logoUrl}
                          alt={partner.name}
                          width={180}
                          height={60}
                          className="h-12 w-auto object-contain"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">
                        {partner.name}
                      </CardTitle>
                      <Badge
                        className={
                          tierInfo?.color ||
                          "bg-secondary text-secondary-foreground"
                        }
                      >
                        {partner.tier.charAt(0).toUpperCase() +
                          partner.tier.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {partner.description && (
                      <p className="text-muted-foreground">
                        {partner.description}
                      </p>
                    )}
                    {partner.initiative && (
                      <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                        <h4 className="mb-1 text-sm font-semibold text-red-400">
                          Partnership Initiative
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {partner.initiative}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-orbitron text-3xl font-bold">
              Partnership Tiers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the partnership level that fits your organization
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {tierConfig.map((config) => {
              const Icon = config.icon
              const tierData =
                partnerTiers[config.tier]
              return (
                <Card
                  key={config.tier}
                  className={`${config.borderColor} bg-gradient-to-br ${config.bgGradient}`}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-background/50">
                      <Icon className="h-7 w-7 text-red-400" />
                    </div>
                    <Badge className={`mx-auto w-fit ${config.color}`}>
                      {tierData.label}
                    </Badge>
                    <CardDescription className="mt-3">
                      {tierData.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="mb-3 text-sm font-semibold">Benefits</h4>
                    <ul className="space-y-2">
                      {config.benefits.map((benefit, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl border border-red-500/30 bg-gradient-to-br from-card to-red-950/20 p-8 sm:p-12">
            <Handshake className="mx-auto mb-4 h-12 w-12 text-red-400" />
            <h2 className="font-orbitron text-3xl font-bold">
              Become a Partner
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Interested in partnering with the Bakersfield eSports Center? We
              would love to explore how we can work together to strengthen the
              gaming and esports community in the Central Valley.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <a href="mailto:partnerships@bakersfieldesports.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email partnerships@bakersfieldesports.com
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
