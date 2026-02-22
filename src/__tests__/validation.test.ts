import { describe, it, expect } from 'vitest';
import {
  contactFormSchema,
  partyInquirySchema,
  checkoutSessionSchema,
} from '@/lib/validation';

describe('contactFormSchema', () => {
  const validContact = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'General Inquiry',
    message: 'I would like to know more about your esports center.',
  };

  it('should pass with valid data', () => {
    const result = contactFormSchema.safeParse(validContact);
    expect(result.success).toBe(true);
  });

  it('should pass with valid data and empty honeypot', () => {
    const result = contactFormSchema.safeParse({ ...validContact, honeypot: '' });
    expect(result.success).toBe(true);
  });

  it('should fail when name is missing', () => {
    const { name, ...rest } = validContact;
    const result = contactFormSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('should fail when email is missing', () => {
    const { email, ...rest } = validContact;
    const result = contactFormSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('should fail when subject is missing', () => {
    const { subject, ...rest } = validContact;
    const result = contactFormSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('should fail when message is missing', () => {
    const { message, ...rest } = validContact;
    const result = contactFormSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('should fail when honeypot is filled (bot detection)', () => {
    const result = contactFormSchema.safeParse({
      ...validContact,
      honeypot: 'spam-bot-value',
    });
    expect(result.success).toBe(false);
  });

  it('should fail with an invalid email format', () => {
    const result = contactFormSchema.safeParse({
      ...validContact,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('should fail when name is too short (min 2)', () => {
    const result = contactFormSchema.safeParse({
      ...validContact,
      name: 'J',
    });
    expect(result.success).toBe(false);
  });

  it('should fail when subject is too short (min 3)', () => {
    const result = contactFormSchema.safeParse({
      ...validContact,
      subject: 'Hi',
    });
    expect(result.success).toBe(false);
  });

  it('should fail when message is too short (min 10)', () => {
    const result = contactFormSchema.safeParse({
      ...validContact,
      message: 'Short',
    });
    expect(result.success).toBe(false);
  });

  it('should fail when name exceeds max length (100)', () => {
    const result = contactFormSchema.safeParse({
      ...validContact,
      name: 'A'.repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it('should fail when message exceeds max length (5000)', () => {
    const result = contactFormSchema.safeParse({
      ...validContact,
      message: 'A'.repeat(5001),
    });
    expect(result.success).toBe(false);
  });
});

describe('partyInquirySchema', () => {
  // Build a date 7 days from now to satisfy the 48-hour minimum + within 6 months
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  const futureDateStr = futureDate.toISOString().split('T')[0];

  const validParty = {
    name: 'Jane Smith',
    phone: '(661) 555-1234',
    email: 'jane@example.com',
    partyRecipient: 'Billy',
    recipientAge: 10,
    date: futureDateStr,
    time: '2:00 PM',
    cheesePizzas: 2,
    pepperoniPizzas: 3,
  };

  it('should pass with valid data', () => {
    const result = partyInquirySchema.safeParse(validParty);
    expect(result.success).toBe(true);
  });

  it('should pass with optional fields included', () => {
    const result = partyInquirySchema.safeParse({
      ...validParty,
      pizzaReadyTime: '3:00 PM',
      additionalPlayers: 5,
      honeypot: '',
    });
    expect(result.success).toBe(true);
  });

  it('should fail with invalid phone format', () => {
    const result = partyInquirySchema.safeParse({
      ...validParty,
      phone: '12345',
    });
    expect(result.success).toBe(false);
  });

  it('should accept phone without parentheses', () => {
    const result = partyInquirySchema.safeParse({
      ...validParty,
      phone: '661-555-1234',
    });
    expect(result.success).toBe(true);
  });

  it('should accept phone with dots', () => {
    const result = partyInquirySchema.safeParse({
      ...validParty,
      phone: '661.555.1234',
    });
    expect(result.success).toBe(true);
  });

  it('should fail when date is too soon (less than 48 hours)', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = partyInquirySchema.safeParse({
      ...validParty,
      date: tomorrow.toISOString().split('T')[0],
    });
    expect(result.success).toBe(false);
  });

  it('should fail when date is too far in the future (more than 6 months)', () => {
    const tooFar = new Date();
    tooFar.setMonth(tooFar.getMonth() + 7);
    const result = partyInquirySchema.safeParse({
      ...validParty,
      date: tooFar.toISOString().split('T')[0],
    });
    expect(result.success).toBe(false);
  });

  it('should fail with invalid time format', () => {
    const result = partyInquirySchema.safeParse({
      ...validParty,
      time: '14:00',
    });
    expect(result.success).toBe(false);
  });

  it('should accept valid 12-hour time formats', () => {
    for (const time of ['1:00 PM', '12:30 AM', '9:45 pm']) {
      const result = partyInquirySchema.safeParse({ ...validParty, time });
      expect(result.success).toBe(true);
    }
  });

  it('should fail when cheese pizzas exceed max (10)', () => {
    const result = partyInquirySchema.safeParse({
      ...validParty,
      cheesePizzas: 11,
    });
    expect(result.success).toBe(false);
  });

  it('should fail when pepperoni pizzas are negative', () => {
    const result = partyInquirySchema.safeParse({
      ...validParty,
      pepperoniPizzas: -1,
    });
    expect(result.success).toBe(false);
  });

  it('should fail when recipientAge is out of range', () => {
    const resultTooLow = partyInquirySchema.safeParse({
      ...validParty,
      recipientAge: 0,
    });
    expect(resultTooLow.success).toBe(false);

    const resultTooHigh = partyInquirySchema.safeParse({
      ...validParty,
      recipientAge: 121,
    });
    expect(resultTooHigh.success).toBe(false);
  });
});

describe('checkoutSessionSchema', () => {
  it('should pass with valid type "party-deposit"', () => {
    const result = checkoutSessionSchema.safeParse({ type: 'party-deposit' });
    expect(result.success).toBe(true);
  });

  it('should pass with valid type "day-pass"', () => {
    const result = checkoutSessionSchema.safeParse({ type: 'day-pass' });
    expect(result.success).toBe(true);
  });

  it('should pass with valid type "membership"', () => {
    const result = checkoutSessionSchema.safeParse({ type: 'membership' });
    expect(result.success).toBe(true);
  });

  it('should fail with an invalid type', () => {
    const result = checkoutSessionSchema.safeParse({ type: 'invalid-type' });
    expect(result.success).toBe(false);
  });

  it('should pass with optional email provided', () => {
    const result = checkoutSessionSchema.safeParse({
      type: 'day-pass',
      email: 'user@example.com',
    });
    expect(result.success).toBe(true);
  });

  it('should pass without email (it is optional)', () => {
    const result = checkoutSessionSchema.safeParse({ type: 'day-pass' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBeUndefined();
    }
  });

  it('should fail with invalid email format', () => {
    const result = checkoutSessionSchema.safeParse({
      type: 'day-pass',
      email: 'not-email',
    });
    expect(result.success).toBe(false);
  });

  it('should pass with optional metadata', () => {
    const result = checkoutSessionSchema.safeParse({
      type: 'membership',
      metadata: { tier: 'gold', source: 'website' },
    });
    expect(result.success).toBe(true);
  });

  it('should fail when type is missing', () => {
    const result = checkoutSessionSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
