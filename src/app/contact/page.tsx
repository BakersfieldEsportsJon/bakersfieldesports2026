import type { Metadata } from "next"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { venue } from "@/data/venue"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Bakersfield eSports Center",
  description:
    "Get in touch with BEC. Contact us about events, parties, partnerships, or general inquiries. Call (661) 529-7447 or fill out our contact form.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-950/50 to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-red-500/20 text-red-300">
            <MessageSquare className="mr-1 h-3 w-3" />
            Get in Touch
          </Badge>
          <h1 className="font-orbitron text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Contact <span className="text-red-400">Us</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Have a question, want to book an event, or interested in
            partnering with us? We would love to hear from you. Fill out the
            form or reach out directly.
          </p>
        </div>
      </section>

      {/* Contact Form + Sidebar */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we will get back to you within
                    24-48 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
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

              {/* Hours */}
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                      <Clock className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Hours</h3>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {venue.hours.map((h) => (
                      <div
                        key={h.day}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{h.day}</span>
                        <span>
                          {h.open} &ndash; {h.close}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                      <Mail className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Connect With Us</h3>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {venue.socialMedia.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-red-500/50 hover:text-red-400"
                      >
                        {social.platform}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="flex min-h-[300px] items-center justify-center rounded-xl border border-border bg-card"
            aria-label={`Map showing location of ${venue.name} at ${venue.address}, ${venue.city}, ${venue.state} ${venue.zip}`}
          >
            <div className="text-center">
              <MapPin className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-lg font-semibold">{venue.name}</p>
              <p className="mt-1 text-muted-foreground">
                {venue.address}, {venue.city}, {venue.state} {venue.zip}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${venue.address}, ${venue.city}, ${venue.state} ${venue.zip}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-red-400 hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
