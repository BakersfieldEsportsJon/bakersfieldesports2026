# Bakersfield eSports Center - Site Rebuild Runbook

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy env file and configure
cp .env.example .env.local
# Edit .env.local with your keys (mock mode works without real keys)

# 3. Run development server
pnpm dev
# Open http://localhost:3000

# 4. Run tests
pnpm test          # Unit tests (Vitest)
pnpm test:e2e      # E2E tests (Playwright) - requires `pnpm build && pnpm start` first

# 5. Build for production
pnpm build

# 6. Start production server
pnpm start
```

---

## Environment Variables

All variables are documented in `.env.example`. Copy it to `.env.local` for local development.

### Required for Production

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL | Your hosting provider |
| `STRIPE_SECRET_KEY` | Stripe secret key | [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | [Stripe Webhooks](https://dashboard.stripe.com/webhooks) |

### Optional / Feature Flags

| Variable | Description | Default |
|----------|-------------|---------|
| `STARTGG_API_TOKEN` | start.gg API bearer token | None (uses mock data) |
| `STARTGG_MODE` | `live` or `mock` | `mock` |
| `GGLEAP_MODE` | `live` or `mock` | `mock` |
| `GGLEAP_CENTER_ID` | ggLeap center identifier | None |
| `GGLEAP_PORTAL_URL` | ggLeap player portal URL | `https://portal.ggleap.com` |
| `CONTACT_EMAIL` | Email for form submissions | None (logged to console) |
| `RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key | None (honeypot only) |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key | None |

### Test Mode

The `.env.local` file ships with `STARTGG_MODE=mock` and `GGLEAP_MODE=mock` so the site works fully without any external API keys. Stripe requires test keys for checkout flow testing.

---

## Integration Setup

### Stripe

1. Create a [Stripe account](https://stripe.com) or use existing one
2. Get API keys from [Dashboard > Developers > API keys](https://dashboard.stripe.com/apikeys)
3. For testing, use `sk_test_...` and `pk_test_...` keys
4. Set up webhook endpoint:
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`
6. Product/price IDs: Configure in the checkout session route or use ad-hoc pricing (current default)

### start.gg

1. Create account at [start.gg](https://start.gg)
2. Generate API token at [Developer Settings](https://start.gg/admin/profile/developer)
3. Set `STARTGG_API_TOKEN` in `.env.local`
4. Set `STARTGG_MODE=live` to use real API data
5. The adapter fetches tournaments and displays them on the Events page

### ggLeap

**Current Status:** ggLeap does not have a documented public API. The integration provides:
- A structured "Book Stations" page with portal link
- Mock station availability data for development
- Adapter layer ready for future API integration

**To configure:**
1. Set `GGLEAP_PORTAL_URL` to your center's ggLeap player portal URL
2. Set `GGLEAP_CENTER_ID` to your center ID
3. When/if ggLeap releases a public API, update `src/lib/integrations/ggleap.ts`

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (port 3000) |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run Vitest unit tests |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm test:e2e` | Run Playwright E2E tests |

---

## Project Structure

```
bec-site-rebuild/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes (Stripe, contact, events)
│   │   ├── events/             # Events hub + detail pages
│   │   ├── parties/            # Party booking page
│   │   ├── book-stations/      # ggLeap integration page
│   │   ├── rates/              # Pricing page
│   │   ├── about/              # About/facility page
│   │   ├── faq/                # FAQ page
│   │   ├── contact/            # Contact form page
│   │   ├── partnerships/       # Partners page
│   │   └── stem/               # STEM programs page
│   ├── components/
│   │   ├── ui/                 # shadcn/ui-style components
│   │   ├── layout/             # Header, footer, section
│   │   ├── events/             # Event card, filters
│   │   ├── parties/            # Party form
│   │   ├── contact/            # Contact form
│   │   └── faq/                # FAQ list
│   ├── lib/
│   │   ├── integrations/       # Stripe, start.gg, ggLeap adapters
│   │   ├── validation.ts       # Zod schemas
│   │   ├── rate-limit.ts       # Rate limiter
│   │   └── utils.ts            # Utility functions
│   ├── data/                   # Static content (venue, rates, events, FAQ)
│   ├── types/                  # TypeScript interfaces
│   └── hooks/                  # React hooks (useToast)
├── e2e/                        # Playwright E2E tests
├── .env.example                # Environment variable template
├── .env.local                  # Local environment (gitignored)
├── next.config.ts              # Next.js config with security headers
├── tailwind.config.ts          # Tailwind CSS config
├── vitest.config.ts            # Vitest config
└── playwright.config.ts        # Playwright config
```

---

## Deployment

### Recommended: Vercel

1. Push to GitHub repository
2. Connect to [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Vercel auto-deploys on push to main

### Alternative: Docker / Node Host

```bash
# Build
pnpm build

# Start (requires Node.js 20+)
PORT=3000 pnpm start
```

### Rollback Plan

- **Vercel:** Instant rollback to any previous deployment via dashboard
- **Docker:** Re-deploy previous image tag
- **DNS:** Keep old site accessible at a subdomain during transition

---

## Security Notes

- Security headers configured in `next.config.ts` (CSP, HSTS, X-Frame-Options, etc.)
- All form inputs validated server-side with Zod
- Rate limiting on public API endpoints (5 req/min per IP)
- Honeypot anti-spam on all forms
- Stripe webhook signature verification
- No secrets committed (all via environment variables)
- API tokens server-side only (never exposed to client)
