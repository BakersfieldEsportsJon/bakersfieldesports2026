"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface PartyFormData {
  name: string
  phone: string
  email: string
  partyRecipient: string
  recipientAge: string
  date: string
  time: string
  pizzaReadyTime: string
  cheesePizzas: string
  pepperoniPizzas: string
  additionalPlayers: string
  honeypot: string
}

const initialFormData: PartyFormData = {
  name: "",
  phone: "",
  email: "",
  partyRecipient: "",
  recipientAge: "",
  date: "",
  time: "",
  pizzaReadyTime: "",
  cheesePizzas: "1",
  pepperoniPizzas: "1",
  additionalPlayers: "0",
  honeypot: "",
}

interface FieldError {
  [key: string]: string
}

export function PartyForm() {
  const [formData, setFormData] = useState<PartyFormData>(initialFormData)
  const [errors, setErrors] = useState<FieldError>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  function validate(): boolean {
    const newErrors: FieldError = {}

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters."
    }
    if (!/^\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number."
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address."
    }
    if (formData.partyRecipient.trim().length < 2) {
      newErrors.partyRecipient = "Recipient name must be at least 2 characters."
    }
    const age = parseInt(formData.recipientAge, 10)
    if (isNaN(age) || age < 1 || age > 120) {
      newErrors.recipientAge = "Please enter a valid age."
    }
    if (!formData.date) {
      newErrors.date = "Please select a date."
    } else {
      const selectedDate = new Date(formData.date)
      const now = new Date()
      now.setHours(0, 0, 0, 0)
      const minDate = new Date(now)
      minDate.setDate(minDate.getDate() + 2)
      const maxDate = new Date(now)
      maxDate.setMonth(maxDate.getMonth() + 6)
      if (selectedDate < minDate) {
        newErrors.date = "Date must be at least 48 hours from now."
      } else if (selectedDate > maxDate) {
        newErrors.date = "Date must be within 6 months."
      }
    }
    if (!formData.time) {
      newErrors.time = "Please select a time."
    }
    const cheese = parseInt(formData.cheesePizzas, 10)
    if (isNaN(cheese) || cheese < 0 || cheese > 10) {
      newErrors.cheesePizzas = "Must be between 0 and 10."
    }
    const pepperoni = parseInt(formData.pepperoniPizzas, 10)
    if (isNaN(pepperoni) || pepperoni < 0 || pepperoni > 10) {
      newErrors.pepperoniPizzas = "Must be between 0 and 10."
    }
    const additional = parseInt(formData.additionalPlayers, 10)
    if (isNaN(additional) || additional < 0 || additional > 50) {
      newErrors.additionalPlayers = "Must be between 0 and 50."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        partyRecipient: formData.partyRecipient.trim(),
        recipientAge: parseInt(formData.recipientAge, 10),
        date: formData.date,
        time: formData.time,
        pizzaReadyTime: formData.pizzaReadyTime || undefined,
        cheesePizzas: parseInt(formData.cheesePizzas, 10),
        pepperoniPizzas: parseInt(formData.pepperoniPizzas, 10),
        additionalPlayers: parseInt(formData.additionalPlayers, 10) || undefined,
        honeypot: formData.honeypot,
      }

      const response = await fetch("/api/party-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Submission Failed",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Inquiry Submitted!",
        description:
          data.message ||
          "We will contact you within 24 hours to confirm availability.",
      })

      setFormData(initialFormData)
    } catch {
      toast({
        title: "Network Error",
        description:
          "Could not connect to the server. Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot field - hidden from real users */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <Label htmlFor="honeypot">Do not fill this field</Label>
        <Input
          id="honeypot"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Contact Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Your Name *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="(661) 555-1234"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-sm text-destructive">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@example.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        {/* Party Recipient */}
        <div className="space-y-2">
          <Label htmlFor="partyRecipient">Birthday Person{"'"}s Name *</Label>
          <Input
            id="partyRecipient"
            name="partyRecipient"
            type="text"
            required
            placeholder="Alex"
            value={formData.partyRecipient}
            onChange={handleChange}
            aria-invalid={!!errors.partyRecipient}
            aria-describedby={
              errors.partyRecipient ? "partyRecipient-error" : undefined
            }
          />
          {errors.partyRecipient && (
            <p id="partyRecipient-error" className="text-sm text-destructive">
              {errors.partyRecipient}
            </p>
          )}
        </div>

        {/* Recipient Age */}
        <div className="space-y-2">
          <Label htmlFor="recipientAge">Birthday Person{"'"}s Age *</Label>
          <Input
            id="recipientAge"
            name="recipientAge"
            type="number"
            required
            min={1}
            max={120}
            placeholder="10"
            value={formData.recipientAge}
            onChange={handleChange}
            aria-invalid={!!errors.recipientAge}
            aria-describedby={
              errors.recipientAge ? "recipientAge-error" : undefined
            }
          />
          {errors.recipientAge && (
            <p id="recipientAge-error" className="text-sm text-destructive">
              {errors.recipientAge}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Preferred Date *</Label>
          <Input
            id="date"
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={handleChange}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
          {errors.date && (
            <p id="date-error" className="text-sm text-destructive">
              {errors.date}
            </p>
          )}
        </div>

        {/* Time */}
        <div className="space-y-2">
          <Label htmlFor="time">Preferred Start Time *</Label>
          <Input
            id="time"
            name="time"
            type="text"
            required
            placeholder="2:00 PM"
            value={formData.time}
            onChange={handleChange}
            aria-invalid={!!errors.time}
            aria-describedby={errors.time ? "time-error" : undefined}
          />
          <p className="text-xs text-muted-foreground">
            Party hours: 12:00 PM - 8:00 PM
          </p>
          {errors.time && (
            <p id="time-error" className="text-sm text-destructive">
              {errors.time}
            </p>
          )}
        </div>

        {/* Pizza Ready Time */}
        <div className="space-y-2">
          <Label htmlFor="pizzaReadyTime">
            Preferred Pizza Ready Time (optional)
          </Label>
          <Input
            id="pizzaReadyTime"
            name="pizzaReadyTime"
            type="text"
            placeholder="3:00 PM"
            value={formData.pizzaReadyTime}
            onChange={handleChange}
          />
        </div>

        {/* Cheese Pizzas */}
        <div className="space-y-2">
          <Label htmlFor="cheesePizzas">Cheese Pizzas</Label>
          <Input
            id="cheesePizzas"
            name="cheesePizzas"
            type="number"
            min={0}
            max={10}
            value={formData.cheesePizzas}
            onChange={handleChange}
            aria-invalid={!!errors.cheesePizzas}
            aria-describedby={
              errors.cheesePizzas ? "cheesePizzas-error" : undefined
            }
          />
          {errors.cheesePizzas && (
            <p id="cheesePizzas-error" className="text-sm text-destructive">
              {errors.cheesePizzas}
            </p>
          )}
        </div>

        {/* Pepperoni Pizzas */}
        <div className="space-y-2">
          <Label htmlFor="pepperoniPizzas">Pepperoni Pizzas</Label>
          <Input
            id="pepperoniPizzas"
            name="pepperoniPizzas"
            type="number"
            min={0}
            max={10}
            value={formData.pepperoniPizzas}
            onChange={handleChange}
            aria-invalid={!!errors.pepperoniPizzas}
            aria-describedby={
              errors.pepperoniPizzas ? "pepperoniPizzas-error" : undefined
            }
          />
          {errors.pepperoniPizzas && (
            <p id="pepperoniPizzas-error" className="text-sm text-destructive">
              {errors.pepperoniPizzas}
            </p>
          )}
        </div>

        {/* Additional Players */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="additionalPlayers">
            Additional Players (beyond 10 included)
          </Label>
          <Input
            id="additionalPlayers"
            name="additionalPlayers"
            type="number"
            min={0}
            max={50}
            value={formData.additionalPlayers}
            onChange={handleChange}
            aria-invalid={!!errors.additionalPlayers}
            aria-describedby={
              errors.additionalPlayers ? "additionalPlayers-error" : undefined
            }
          />
          <p className="text-xs text-muted-foreground">
            $10 per additional player
          </p>
          {errors.additionalPlayers && (
            <p
              id="additionalPlayers-error"
              className="text-sm text-destructive"
            >
              {errors.additionalPlayers}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Party Inquiry"
        )}
      </Button>
    </form>
  )
}
