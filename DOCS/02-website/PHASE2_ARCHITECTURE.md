# Phase 2 Architecture

Phase 2 extends the Delta Innovations website with authentication, marketplace, content sections, secure APIs, live chat, and billing stubs.

## High-level layout

```mermaid
flowchart TB
  subgraph client [Vite React Client]
    index[index.tsx BrowserRouter]
    root[RootLayout ClerkProvider]
    app[App.tsx Routes]
    main[MainLayout DeltaCursor]
  end
  subgraph apis [Vercel Serverless]
    contact[/api/contact]
    github[/api/catalog/github]
    checkout[/api/checkout/create-session]
    stripe[/api/webhooks/stripe]
  end
  index --> root --> app --> main
  app --> contact
  app --> github
  app --> checkout
  stripe --> stripe
```

## Routing

| Path | Page | Notes |
|------|------|-------|
| `/` | Home | Tech stack marquee, team preview, reviews |
| `/marketplace` | Marketplace | Product catalog + GitHub metadata |
| `/marketplace/:slug` | Product detail | Contact-first CTA |
| `/team`, `/reviews`, `/insights` | Content | Druporia-style sections |
| `/insights/:slug` | Article detail | Static content from `insights.ts` |
| `/sign-in`, `/sign-up`, `/account` | Clerk auth | Lazy-loaded |
| `/workplace-policy` | Policy | `noindex` |

Heavy routes use `React.lazy` in `App.tsx`.

## Authentication

- `BrowserRouter` wraps `RootLayout` in `index.tsx` (not `App.tsx`).
- `ClerkProvider` reads `VITE_CLERK_PUBLISHABLE_KEY` automatically (no manual `publishableKey` prop).
- Navigation uses `routerPush` / `routerReplace` via `useNavigate`.
- Navbar uses `Show`, `SignInButton`, `SignUpButton`, `UserButton` from `@clerk/react`.

## Contact & email

- `ContactForm` POSTs to `/api/contact` with Zod validation, honeypot (`website`), and in-memory rate limiting.
- `EMAILJS_PRIVATE_KEY` is server-only; never bundled in the client.

## Marketplace & GitHub

- Config: `src/content/marketplace.ts` (`githubUsername`, `excludeRepos`)
- `/api/catalog/github` lists repos from `sureshbarach2001` using `GITHUB_TOKEN` (paginated)
- `/api/catalog/github/readme?repo=name` returns raw README markdown for detail pages

## Consent & third parties

- Cookie banner gates Vercel Analytics only.
- Tawk.to live chat loads on every visit (`TawkWidget`).
- Signed-in Clerk users get name/email/id set on Tawk when chat loads.

## Stripe (stub)

- `/api/checkout/create-session` requires Clerk Bearer token; returns `501` if `STRIPE_SECRET_KEY` is missing.
- `/api/webhooks/stripe` verifies Stripe signature pattern when `STRIPE_WEBHOOK_SECRET` is set.

## Security headers

[`vercel.json`](../../vercel.json) sets CSP allowing Clerk, Tawk.to (including `va.tawk.to`, WebSockets, chat audio, jsDelivr emojis), EmailJS, and GitHub API connect targets.

See [CSP & third parties](CSP_AND_THIRD_PARTIES.md) for the full directive table and troubleshooting (`ERR_BLOCKED_BY_CLIENT` vs real CSP blocks).

## Related docs

- [Environment variables](ENVIRONMENT_VARIABLES.md)
- [Clerk setup](CLERK_SETUP.md)
- [Tawk setup](TAWK_SETUP.md)
- [CSP & third parties](CSP_AND_THIRD_PARTIES.md)
