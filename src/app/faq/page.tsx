import type { Metadata } from "next"
import { HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { faqs } from "@/data/faq"
import { FAQList } from "@/components/faq/faq-list"

export const metadata: Metadata = {
  title: "FAQ | Bakersfield eSports Center",
  description:
    "Frequently asked questions about BEC including gaming rates, hours, tournaments, birthday parties, facility equipment, and more. Find answers to your questions here.",
}

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-950/50 to-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-4 bg-red-500/20 text-red-300">
            <HelpCircle className="mr-1 h-3 w-3" />
            Help Center
          </Badge>
          <h1 className="font-orbitron text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Frequently Asked{" "}
            <span className="text-red-400">Questions</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Find answers to common questions about our gaming center, rates,
            events, birthday parties, and facility. Can&apos;t find what you are
            looking for? Contact us directly.
          </p>
        </div>
      </section>

      {/* FAQ List with Tabs */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FAQList faqs={faqs} />
        </div>
      </section>
    </div>
  )
}
