# Environment Variables

## File layout

| File | Committed | Purpose |
|------|-----------|---------|
| `.env.example` | Yes | Template for developers |
| `.env.local` | **No** (gitignored) | Local secrets |

## Client (VITE_ prefix)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SITE_URL` | Recommended | Canonical URL for SEO, sitemap, Open Graph |
| `VITE_CLERK_PUBLISHABLE_KEY` | For auth | Clerk publishable key |
| `VITE_EMAILJS_SERVICE_ID` | For contact API | EmailJS service ID (also used server-side) |
| `VITE_EMAILJS_TEMPLATE_ID` | For contact API | Contact template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | For contact API | EmailJS public key |
| `VITE_TAWK_PROPERTY_ID` | Optional | Tawk.to property ID (has default) |
| `VITE_TAWK_WIDGET_ID` | Optional | Tawk.to widget ID (has default) |

**Never** set `VITE_EMAILJS_PRIVATE_KEY` or any `VITE_` prefix on server secrets — the EmailJS private key must only exist as `EMAILJS_PRIVATE_KEY` on the server.

## Server (Vercel / API routes)

| Variable | Required | Description |
|----------|----------|-------------|
| `CLERK_SECRET_KEY` | For auth API | Clerk secret key |
| `EMAILJS_PRIVATE_KEY` | For contact | EmailJS private key |
| `EMAILJS_SERVICE_ID` | Optional alias | Overrides VITE_ value on server |
| `EMAILJS_TEMPLATE_ID` | Optional alias | Overrides VITE_ value on server |
| `EMAILJS_PUBLIC_KEY` | Optional alias | Overrides VITE_ value on server |
| `GITHUB_TOKEN` | For marketplace | GitHub PAT to list `sureshbarach2001` repos and fetch READMEs server-side (`public_repo` or `repo` scope) |
| `STRIPE_SECRET_KEY` | Phase 2B | Checkout (stub returns 501 until configured) |
| `STRIPE_WEBHOOK_SECRET` | Phase 2B | Stripe webhook signature verification |

## GITHUB_TOKEN setup (marketplace)

Required in **both** places:

1. **Local:** `.env.local` → `GITHUB_TOKEN=ghp_...`
2. **Vercel Dashboard:** Project → Settings → Environment Variables → add `GITHUB_TOKEN` for **Development** and **Production** → redeploy for production

Create the PAT at GitHub → Settings → Developer settings → Personal access tokens. Use `public_repo` scope (or `repo` for private repos). **Rotate immediately** if a token was shared in chat, logs, or a screenshot.

After changing `.env.local` or Vercel env vars, **fully restart** local API dev:

```bash
# Ctrl+C to stop, then:
npm run dev:api
```

Vite may restart when `.env.local` changes, but **serverless API routes do not hot-reload env** until `vercel dev` restarts.

Verify: open `http://localhost:3000/api/catalog/github` — response should include `"repos": [...]`, not `"warning": "GITHUB_TOKEN not configured"`.

## Local setup

```bash
cp .env.example .env.local
# Edit .env.local (set GITHUB_TOKEN, Clerk, EmailJS, etc.)
npm run dev          # UI only — /api/* routes not available
npm run dev:api      # Vercel dev — marketplace + contact APIs work locally
```

For API routes locally, use `npm run dev:api` so `/api/contact`, `/api/catalog/github`, and `/api/catalog/github/readme` are available.

**Important:** When `vercel dev` asks `Found existing file ".env.local". Do you want to overwrite?`, answer **No**. Overwriting replaces your local Clerk, EmailJS, and GitHub keys with only Vercel CLI tokens.

To pull remote Vercel env vars without losing local edits, use a separate file:

```bash
npx vercel env pull .env.vercel --environment=development
# Merge needed lines into .env.local manually
```

For UI-only work (no marketplace/contact API), `npm run dev` on http://localhost:5173 is enough.

## Production (Vercel)

Project → Settings → Environment Variables → add variables for **Production**, **Preview**, and **Development** → redeploy.

Minimum for marketplace on the live site: `GITHUB_TOKEN` in Production (and Preview if you test preview URLs).

## Security notes

- Never commit `.env.local`
- Never expose `EMAILJS_PRIVATE_KEY`, `CLERK_SECRET_KEY`, `GITHUB_TOKEN`, or Stripe secrets in the client bundle
- Do not use `VITE_` prefix for any secret — only `VITE_*` vars are bundled into the browser
- Rotate keys if exposed in logs, chat, or public repos

## Related docs

- [Phase 2 architecture](PHASE2_ARCHITECTURE.md)
- [Clerk setup](CLERK_SETUP.md)
- [Tawk setup](TAWK_SETUP.md)
- [CSP & third parties](CSP_AND_THIRD_PARTIES.md)
- [EmailJS setup](EMAILJS_SETUP.md)
