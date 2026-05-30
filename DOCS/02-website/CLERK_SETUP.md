# Clerk Setup

Delta Innovations uses [Clerk](https://clerk.com) for sign-in, sign-up, and account management.

## Dashboard steps

1. Create an application at [dashboard.clerk.com](https://dashboard.clerk.com).
2. Enable **Email** (and optional OAuth) sign-in methods.
3. Under **API Keys**, copy:
   - **Publishable key** → `VITE_CLERK_PUBLISHABLE_KEY`
   - **Secret key** → `CLERK_SECRET_KEY` (server only, never prefix with `VITE_`)

## Local development

```bash
cp .env.example .env.local
# Add VITE_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY
npm run dev:api
```

Restart the dev server after changing env vars.

## Routes & navigation

| URL | Component |
|-----|-----------|
| `/sign-in` | `SignInPage` |
| `/sign-up` | `SignUpPage` |
| `/account` | `AccountPage` + subscription placeholder |

Clerk components use `routing="path"` with matching paths in `App.tsx`.

**Navbar auth:** Sign in / Sign up link to dedicated pages (`/sign-in`, `/sign-up`) — not modal overlays. This keeps history clean for the global Back button and avoids color clashes with page content.

## Appearance

Brand styling lives in [`src/config/clerkAppearance.ts`](../../src/config/clerkAppearance.ts) (navy background, cyan primary, dark inputs).

Additional CSS overrides for Clerk internal classes are in [`src/index.css`](../../src/index.css) (`.cl-formFieldInput`, `.cl-socialButtonsBlockButton`, etc.).

**Development mode:** Clerk shows an orange “Development mode” footer on localhost. This disappears in production with live keys.

**Console:** `Fetch failed loading: POST https://clerk-telemetry.com/v1/event` may appear with ad blockers or private browsing. CSP allows `clerk-telemetry.com` in `connect-src`; blocking is client-side, not a site bug.

## Provider wiring

```text
index.tsx
  BrowserRouter
    layouts/RootLayout (ClerkProvider + useNavigate router)
      App (Routes only)
```

Do not pass `publishableKey` manually — Clerk reads `VITE_CLERK_PUBLISHABLE_KEY` from the Vite environment.

## Production (Vercel)

Add both keys under Project → Settings → Environment Variables for Production and Preview, then redeploy.

## Checkout API

`/api/checkout/create-session` expects `Authorization: Bearer <session_token>` from a signed-in user. Configure `CLERK_SECRET_KEY` on Vercel for token verification.

## Related docs

- [CSP & third parties](CSP_AND_THIRD_PARTIES.md)
