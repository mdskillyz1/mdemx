# MDemx Website

Production-ready business website for **MDemx**, a London-based web design, development, SEO, QR ordering, hosting support, branding, and digital systems studio for small businesses.

The site is designed to convert visitors into enquiries through a clear service journey, strong CTAs, a quick quote form, free consultation flow, WhatsApp/call/email contact routes, SEO metadata, and future-ready integration placeholders.

## Technologies Used

- Next.js App Router
- TypeScript
- Tailwind CSS
- lucide-react icons
- Next Metadata API
- Route Handler API for lead submissions
- Client brief submission API
- Username/password admin login with email 2FA
- GitHub Actions CI
- Vercel deployment configuration

## Project Structure

```txt
src/app/                  App Router pages, SEO routes, and API routes
src/components/           Reusable UI, forms, CTA, cookie, analytics components
src/lib/site.ts           Shared editable business content and lead options
.github/workflows/ci.yml  Lint and build validation
vercel.json               Vercel project build settings
.env.example              Environment variable template
```

## Installation

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and update the placeholders:

```bash
cp .env.example .env.local
```

Key variables:

- `NEXT_PUBLIC_SITE_URL` - production site URL
- `NEXT_PUBLIC_CONTACT_EMAIL` - public MDemx email
- `NEXT_PUBLIC_CONTACT_PHONE` - click-to-call phone number
- `NEXT_PUBLIC_WHATSAPP_URL` - WhatsApp contact link
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics placeholder
- `NEXT_PUBLIC_CLARITY_PROJECT_ID` - Microsoft Clarity placeholder
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Search Console verification
- `NEXT_PUBLIC_BING_SITE_VERIFICATION` - Bing Webmaster Tools verification
- `EMAIL_PROVIDER_API_KEY` - future email notification integration
- `RESEND_API_KEY` - sends admin 2FA codes and optional brief/lead notification emails
- `ADMIN_USERNAME` - admin dashboard username
- `ADMIN_PASSWORD` - admin dashboard password
- `ADMIN_AUTH_SECRET` - long random secret for signing admin challenge/session cookies
- `ADMIN_2FA_EMAIL` - email address that receives admin verification codes
- `ADMIN_EMAIL_FROM` - optional verified Resend sender for admin verification emails
- `BRIEF_EMAIL_TO` - optional recipient for client brief notification emails
- `BRIEF_EMAIL_FROM` - optional verified Resend sender for client brief notifications
- `BRIEF_WEBHOOK_URL` - optional webhook for sending submitted briefs to automation/database tools
- `CRM_API_KEY` - future CRM integration
- `DATABASE_URL` - future lead storage or client portal database
- `LEAD_WEBHOOK_URL` - future automation webhook
- `RATE_LIMIT_SECRET` - future production rate limiting provider key

## Validation

```bash
npm run lint
npm run build
```

The production build uses `next build --webpack` for reliable local and CI builds in restricted environments.

## Deployment

### Vercel Dashboard

1. Create or import a Vercel project from the GitHub repository.
2. Framework preset: `Next.js`.
3. Build command: `npm run build`.
4. Install command: `npm install`.
5. Output directory: leave default.
6. Add production environment variables from `.env.example`.
7. Deploy.

### Vercel CLI

```bash
vercel link
vercel pull --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
```

## SEO

Included:

- Page-level titles and descriptions
- Open Graph metadata
- Twitter card metadata
- LocalBusiness schema markup
- Sitemap at `/sitemap.xml`
- Robots at `/robots.txt`
- Google Search Console placeholder
- Bing Webmaster Tools placeholder
- Local SEO keywords for web design London, QR ordering systems, and small business websites

## Lead Generation

Included contact paths:

- Floating WhatsApp button
- Floating call button
- Floating email button
- Floating quick quote button
- Contact form
- Quick quote form fields
- Book a Free Consultation journey
- Start Your Website Brief multi-step form at `/client-brief`
- CTA sections throughout the site

The lead API currently logs a clean structured object and includes placeholders for:

- Email notifications
- CRM sync
- Analytics conversion events
- Database storage
- Rate limiting provider integration

The client brief API accepts structured requirements for one or multiple websites. It is ready to connect to:

- Resend for email notifications
- `BRIEF_WEBHOOK_URL` for Zapier/Make/n8n/CRM automation
- A durable database through `DATABASE_URL`

## Admin Dashboard

The admin dashboard is available at `/admin/briefs`.

Protection flow:

- Username and password are checked first.
- A six-digit 2FA code is emailed to `ADMIN_2FA_EMAIL`.
- After verification, a signed HTTP-only session cookie protects the dashboard APIs.

Required production variables:

```bash
ADMIN_USERNAME=
ADMIN_PASSWORD=
ADMIN_AUTH_SECRET=
ADMIN_2FA_EMAIL=
RESEND_API_KEY=
ADMIN_EMAIL_FROM=
```

Use a long random value for `ADMIN_AUTH_SECRET`. In production, the admin login fails closed if the required auth/email settings are missing.

## Security And Spam Protection

Current safeguards:

- Required server-side validation
- Email format validation
- URL validation
- Honeypot field
- Minimum completion-time check
- In-memory rate limiting placeholder
- Security headers
- Safe error responses

Recommended production additions:

- Durable rate limiting through Upstash Redis, Vercel KV, or a WAF rule
- CAPTCHA or Turnstile only if spam becomes a real issue
- Persist leads in a database
- Send transactional notifications through Resend/Postmark
- Add CRM automation through HubSpot, Pipedrive, Airtable, Notion, or GoHighLevel

## Future Improvements

- Client portal with login and project status tracking
- Case study detail pages
- Blog or insights section for SEO growth
- Online booking calendar integration
- Payments/deposits for project retainers
- Admin dashboard for leads and enquiries
- CMS-backed portfolio and service pages
- A/B testing for CTA copy and lead form steps
