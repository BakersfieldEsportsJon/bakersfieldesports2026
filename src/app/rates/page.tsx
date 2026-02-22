import type { Metadata } from "next"
import Link from "next/link"
import {
  DollarSign,
  CheckCircle,
  Star,
  PartyPopper,
  ArrowRight,
  CreditCard,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { rates, partyPackage } from "@/data/rates"

export const metadata: Metadata = {
  title: "Rates & Pricing | Bakersfield eSports Center",
  description:
    "Gaming rates at BEC: $7/hour drop-in, $24 4-hour package, $35 weekday day pass, $40 weekend day pass, $14 night pass, $250/month unlimited. Birthday party packages available.",
}

export default function RatesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-950/50 to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-red-500/20 text-red-300">
            <DollarSign className="mr-1 h-3 w-3" />
            Transparent Pricing
          </Badge>
          <h1 className="font-orbitron text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Rates & <span className="text-red-400">Pricing</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Flexible pricing options for every gamer. From quick hourly sessions
            to unlimited monthly access, find the plan that fits your play
            style.
          </p>
        </div>
      </section>

      {/* Rates Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rates.map((rate) => (
              <Card
                key={rate.id}
                className={
                  rate.popular
                    ? "relative border-red-500/50 bg-gradient-to-br from-card to-red-950/20"
                    : "border-border/50"
                }
              >
                {rate.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="shadow-lg">
                      <Star className="mr-1 h-3 w-3" />
                      Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{rate.name}</CardTitle>
                  <div className="mt-2 flex items-baseline justify-center gap-1">
                    <span className="font-orbitron text-4xl font-bold text-red-400">
                      ${rate.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{rate.unit}
                    </span>
                  </div>
                  {rate.description && (
                    <CardDescription className="mt-2">
                      {rate.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {rate.features && (
                    <ul className="space-y-2">
                      {rate.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter className="justify-center">
                  {rate.id === "monthly" ? (
                    <Button asChild className="w-full">
                      <Link href="/api/stripe/create-checkout-session">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Subscribe Monthly
                      </Link>
                    </Button>
                  ) : rate.id === "weekday-pass" ||
                    rate.id === "weekend-pass" ? (
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/api/stripe/create-checkout-session">
                        Purchase Day Pass
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/book-stations">Book Station</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Party Package Callout */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="border-red-500/30 bg-gradient-to-r from-card to-red-950/20">
            <CardContent className="flex flex-col items-center gap-6 p-8 sm:flex-row">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-500/20">
                <PartyPopper className="h-8 w-8 text-red-400" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold">Birthday Party Package</h3>
                <p className="mt-2 text-muted-foreground">
                  Host the ultimate gaming birthday party! Our{" "}
                  <strong className="text-foreground">
                    {partyPackage.name}
                  </strong>{" "}
                  starts at{" "}
                  <strong className="text-red-400">
                    ${partyPackage.price}
                  </strong>{" "}
                  and includes a dedicated party host, 2 hours of gameplay for
                  10 players, pizza, drinks, and more.
                </p>
              </div>
              <Button asChild className="shrink-0">
                <Link href="/parties">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Walk-in Note */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl border border-border bg-card p-8">
            <Info className="mx-auto mb-4 h-8 w-8 text-red-400" />
            <h3 className="text-xl font-semibold">Walk-Ins Welcome</h3>
            <p className="mt-3 text-muted-foreground">
              No reservation required for hourly, 4-hour, or day pass sessions.
              Simply walk in during operating hours and start gaming. All
              equipment and peripherals are provided &mdash; just show up and
              play!
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="outline">
                <Link href="/book-stations">Book a Station Online</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/about">View Operating Hours</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
