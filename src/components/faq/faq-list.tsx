"use client"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import type { FAQ } from "@/types"

interface FAQListProps {
  faqs: FAQ[]
}

const categories = [
  { value: "all", label: "All" },
  { value: "general", label: "General" },
  { value: "events", label: "Events" },
  { value: "parties", label: "Parties" },
  { value: "rates", label: "Rates" },
  { value: "facility", label: "Facility" },
] as const

export function FAQList({ faqs }: FAQListProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredFAQs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory)

  return (
    <div className="space-y-8">
      <Tabs
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="w-full"
      >
        <TabsList className="flex w-full flex-wrap gap-1 bg-transparent">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.value}
              value={cat.value}
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.value} value={cat.value}>
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFAQs.length === 0 && (
              <p className="py-8 text-center text-muted-foreground">
                No questions found in this category.
              </p>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Still have questions CTA */}
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <MessageCircle className="mx-auto mb-4 h-10 w-10 text-red-500" />
        <h3 className="mb-2 text-xl font-semibold">Still have questions?</h3>
        <p className="mb-6 text-muted-foreground">
          We are happy to help. Reach out and our team will get back to you
          within 24-48 hours.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
