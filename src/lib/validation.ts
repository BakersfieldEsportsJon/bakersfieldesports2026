import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export const partyInquirySchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  partyRecipient: z.string().min(2).max(100),
  recipientAge: z.number().int().min(1).max(120),
  date: z.string().refine((val) => {
    const d = new Date(val);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const minDate = new Date(now);
    minDate.setDate(minDate.getDate() + 2); // 48 hour minimum
    const maxDate = new Date(now);
    maxDate.setMonth(maxDate.getMonth() + 6);
    return d >= minDate && d <= maxDate;
  }, 'Date must be at least 48 hours from now and within 6 months'),
  time: z.string().regex(/^(1[0-2]|[1-9]):[0-5][0-9]\s?(AM|PM)$/i, 'Invalid time format'),
  pizzaReadyTime: z.string().optional(),
  cheesePizzas: z.number().int().min(0).max(10),
  pepperoniPizzas: z.number().int().min(0).max(10),
  additionalPlayers: z.number().int().min(0).max(50).optional(),
  honeypot: z.string().max(0).optional(),
});

export const checkoutSessionSchema = z.object({
  type: z.enum(['party-deposit', 'day-pass', 'membership']),
  email: z.string().email().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type PartyInquiryInput = z.infer<typeof partyInquirySchema>;
export type CheckoutSessionInput = z.infer<typeof checkoutSessionSchema>;
