# Content Security Policy & third-party services

Production and local `npm run dev:api` responses include a **Content-Security-Policy** header from [`vercel.json`](../../vercel.json). This document lists every allowed third party and how to troubleshoot console noise.

## CSP by directive

| Directive | Allowed origins (summary) |
|-----------|---------------------------|
| `script-src` | `'self'`, Clerk, Cloudflare Turnstile, `embed.tawk.to`, `*.tawk.to`, `cdn.jsdelivr.net` (Tawk emoji picker) |
| `style-src` | `'self'`, `'unsafe-inline'`, Google Fonts, `embed.tawk.to`, `*.tawk.to` |
| `font-src` | `'self'`, Google Fonts, `data:` |
| `img-src` | `'self'`, `data:`, `https:`, `blob:` |
| `media-src` | `'self'`, `embed.tawk.to`, `*.tawk.to` (chat notification sounds) |
| `connect-src` | `'self'`, EmailJS, GitHub API, Clerk, `clerk-telemetry.com`, `embed.tawk.to`, `va.tawk.to`, `*.tawk.to`, `wss://*.tawk.to`, `cdn.jsdelivr.net` |
| `frame-src` | Clerk, Cloudflare, `embed.tawk.to`, `*.tawk.to` (chat widget iframe) |
| `worker-src` | `'self'`, `blob:` |

Full policy string lives in `vercel.json` → `headers` → `Content-Security-Policy`.

## Tawk.to — telemetry CORS (not a site bug)

You may see either:

```text
POST https://va.tawk.to/log-performance/v3 net::ERR_BLOCKED_BY_CLIENT
```

or:

```text
Access to fetch at 'https://va.tawk.to/log-performance/v3' from origin 'http://localhost:3000'
has been blocked by CORS policy
```

Both refer to **optional Tawk performance telemetry**, not the chat widget. Tawk’s server does not allow that endpoint from all origins (including `localhost`). **We cannot fix this from `vercel.json`.**

**Chat is working when you see:**

```text
POST https://va.tawk.to/v1/session/start  → finished loading
GET  https://embed.tawk.to/_s/v4/assets/audio/chat_sound.mp3 → finished loading
```

The bubble should appear bottom-right. Disable uBlock/Brave Shields on `localhost` or your production domain if you want zero Tawk console noise while testing.

### Edge / Safari tracking prevention

```text
Tracking Prevention blocked access to storage for https://cdn.jsdelivr.net/emojione/...
```

Tawk loads emojione from jsDelivr for emoji in chat. Edge/Safari may block **third-party storage** for that script. Chat still works; emoji picker may be limited. Our CSP already allows `cdn.jsdelivr.net` in `script-src` and `connect-src`.

## Clerk telemetry

```text
Fetch failed loading: POST https://clerk-telemetry.com/v1/event
```

Clerk product analytics. This is now **disabled at the source** via `telemetry={false}` on `<ClerkProvider>` in [`src/layouts/RootLayout.tsx`](../../src/layouts/RootLayout.tsx), so these requests should no longer fire. If you re-enable telemetry, the request is still allowed in CSP via `connect-src https://clerk-telemetry.com` and any failures (ad blockers / private browsing) are harmless for auth.

## Other console messages (harmless)

| Message | Cause |
|---------|--------|
| `Clerk: development keys` | Expected on localhost |
| `Input elements should have autocomplete attributes` | Clerk renders its own sign-in/sign-up inputs; we do not control their markup. Harmless, cannot be fixed from our code. |
| `va.tawk.to/log-performance/v3` CORS / `ERR_BLOCKED_BY_CLIENT` | Optional Tawk telemetry; Tawk's server has no CORS headers for it. Not our CSP. Chat still works (see Tawk section). |
| `A listener indicated an asynchronous response…` | Chrome extension (not this repo) |
| `Fetch failed loading: GET /api/catalog/github` during Vite HMR | API route recompiling; refresh page or wait for retry |
| `ERR_BLOCKED_BY_CLIENT` on Vercel Analytics | Ad blocker after cookie consent |

## Changing CSP

1. Edit `vercel.json` → `Content-Security-Policy` value.
2. Redeploy (production) or restart `npm run dev:api` (local).
3. Update [TAWK_SETUP.md](TAWK_SETUP.md) or this file if you add a new integration.

## Related docs

- [Tawk setup](TAWK_SETUP.md)
- [Deployment](DEPLOYMENT.md)
- [Phase 2 architecture](PHASE2_ARCHITECTURE.md)
