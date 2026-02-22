"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot: string
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
}

interface FieldError {
  [key: string]: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<FieldError>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  function validate(): boolean {
    const newErrors: FieldError = {}

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters."
    }
    if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be 100 characters or fewer."
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address."
    }
    if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters."
    }
    if (formData.subject.trim().length > 200) {
      newErrors.subject = "Subject must be 200 characters or fewer."
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters."
    }
    if (formData.message.trim().length > 5000) {
      newErrors.message = "Message must be 5000 characters or fewer."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
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
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        honeypot: formData.honeypot,
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({
          title: "Message Not Sent",
          description: data.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Message Sent!",
        description:
          data.message ||
          "Thank you for your message. We will get back to you within 24-48 hours.",
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
        <Label htmlFor="contact-honeypot">Do not fill this field</Label>
        <Input
          id="contact-honeypot"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={handleChange}
        />
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="contact-name">Name *</Label>
        <Input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-sm text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="contact-email">Email *</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="contact-subject">Subject *</Label>
        <Input
          id="contact-subject"
          name="subject"
          type="text"
          required
          placeholder="How can we help?"
          value={formData.subject}
          onChange={handleChange}
          aria-invalid={!!errors.subject}
          aria-describedby={
            errors.subject ? "contact-subject-error" : undefined
          }
        />
        {errors.subject && (
          <p id="contact-subject-error" className="text-sm text-destructive">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message *</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us more about your question or inquiry..."
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
        />
        <p className="text-xs text-muted-foreground">
          {formData.message.length}/5000 characters
        </p>
        {errors.message && (
          <p id="contact-message-error" className="text-sm text-destructive">
            {errors.message}
          </p>
        )}
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
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
