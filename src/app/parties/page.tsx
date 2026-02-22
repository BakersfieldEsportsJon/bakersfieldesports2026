import type { Metadata } from "next"
import Link from "next/link"
import {
  PartyPopper,
  Gift,
  Clock,
  Users,
  Pizza,
  Gamepad2,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  CalendarDays,
  Star,
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
import { partyPackage } from "@/data/rates"
import { PartyForm } from "@/components/parties/party-form"

export const metadata: Metadata = {
  title: "Birthday Parties | Bakersfield eSports Center",
  description:
    "Host the ultimate gaming birthday party at BEC. Our Standard Party Package includes 2 hours of gameplay for 10 players, a dedicated party host, pizza, drinks, and more. Book today!",
}

const timeline = [
  {
    step: "1",
    title: "Book",
    description:
      "Fill out our inquiry form or call us to reserve your date. Pay a $100 deposit to secure your booking.",
    icon: CalendarDays,
  },
  {
    step: "2",
    title: "Arrive",
    description:
      "Show up on party day and meet your dedicated party host who will handle everything.",
    icon: Users,
  },
  {
    step: "3",
    title: "Game",
    description:
      "Enjoy 2 hours of gaming across PCs, consoles, and VR stations with all your friends.",
    icon: Gamepad2,
  },
  {
    step: "4",
    title: "Celebrate",
    description:
      "Head to the dedicated party area for pizza, drinks, cake, and presents.",
    icon: PartyPopper,
  },
  {
    step: "5",
    title: "Take Home Memories",
    description:
      "An unforgettable birthday experience that every gamer will talk about for months.",
    icon: Gift,
  },
]

export default function PartiesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-950/50 to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-red-500/20 text-red-300">
            <PartyPopper className="mr-1 h-3 w-3" />
            Birthday Parties
          </Badge>
          <h1 className="font-orbitron text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The Ultimate Gaming{" "}
            <span className="text-red-400">Birthday Party</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Give your child an unforgettable birthday experience with
            high-performance gaming PCs, consoles, VR, a dedicated party host,
            and everything they need for the best day ever.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/api/stripe/create-checkout-session">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Deposit ($100)
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#inquiry-form">Inquire About Booking</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Package Card */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Card className="border-red-500/30 bg-gradient-to-br from-card to-red-950/20">
              <CardHeader className="text-center">
                <Badge className="mx-auto mb-2 w-fit">Most Popular</Badge>
                <CardTitle className="font-orbitron text-3xl">
                  {partyPackage.name}
                </CardTitle>
                <CardDescription className="text-lg">
                  Everything you need for an amazing party
                </CardDescription>
                <div className="mt-4">
                  <span className="font-orbitron text-5xl font-bold text-red-400">
                    ${partyPackage.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    Package Includes
                  </h3>
                  <ul className="space-y-2">
                    {partyPackage.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add-ons */}
                {partyPackage.addOns && partyPackage.addOns.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Add-Ons</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {partyPackage.addOns.map((addon, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-3"
                        >
                          <span>{addon.name}</span>
                          <Badge variant="secondary">+${addon.price}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Expect Timeline */}
      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-orbitron text-3xl font-bold sm:text-4xl">
              What to Expect
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From booking to the big day, here is how it works
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              {timeline.map((step, index) => {
                const Icon = step.icon
                return (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white">
                        {step.step}
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="mt-2 h-full w-px bg-red-500/30" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-red-400" />
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Important Info */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center font-orbitron text-3xl font-bold">
              Important Information
            </h2>

            <Card className="border-amber-500/30 bg-amber-950/10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                  <div>
                    <h3 className="mb-3 font-semibold text-amber-400">
                      Booking Requirements & Restrictions
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {partyPackage.restrictions?.map((restriction, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                          <span>{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 rounded-xl border border-border bg-card p-6 text-center">
              <CreditCard className="mx-auto mb-3 h-8 w-8 text-red-400" />
              <h3 className="text-lg font-semibold">Deposit Information</h3>
              <p className="mt-2 text-muted-foreground">
                A <strong className="text-foreground">$100 deposit</strong> is
                required to secure your party booking. A{" "}
                <strong className="text-foreground">
                  3.5% processing fee
                </strong>{" "}
                applies to all card transactions.
              </p>
              <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/api/stripe/create-checkout-session">
                    Pay Deposit Online
                  </Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  or call{" "}
                  <a
                    href="tel:+16615297447"
                    className="font-medium text-red-400 hover:underline"
                  >
                    (661) 529-7447
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signal / Testimonial */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Star className="mx-auto mb-4 h-8 w-8 text-yellow-500" />
          <blockquote className="text-xl italic text-muted-foreground">
            &ldquo;My son had the best birthday ever at BEC! The staff was
            amazing, the kids had a blast gaming, and I did not have to worry
            about a thing. Highly recommend for any gaming fan!&rdquo;
          </blockquote>
          <p className="mt-4 font-medium text-foreground">
            &mdash; Local Parent
          </p>
        </div>
      </section>

      {/* Party Inquiry Form */}
      <section id="inquiry-form" className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-orbitron text-3xl font-bold">
              Inquire About Booking
            </h2>
            <p className="mt-4 text-muted-foreground">
              Fill out the form below and we will contact you within 24 hours to
              confirm availability and finalize details.
            </p>
          </div>

          <Card>
            <CardContent className="relative pt-6">
              <PartyForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
