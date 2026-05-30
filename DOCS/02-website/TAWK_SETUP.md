# Tawk.to Setup

Live chat loads on every page visit (functional/essential). Analytics cookies remain consent-gated separately.

## Default widget IDs

| Variable | Default |
|----------|---------|
| `VITE_TAWK_PROPERTY_ID` | `6a19f7b6bfd8e61c339dc6b9` |
| `VITE_TAWK_WIDGET_ID` | `1jpqmv8b7` |

Override in `.env.local` or Vercel if you create a new widget in the Tawk dashboard.

## Behavior

- Component: `src/components/chat/TawkWidget.tsx`
- Mounted from `ConsentManager` with `enabled` always true (not tied to analytics consent).
- Script injection is deferred briefly (`requestIdleCallback` with ~1.2s timeout, or ~800ms fallback) so marketplace and page content load first.
- When a user is signed in with Clerk, `Tawk_API.setAttributes` runs inside `onLoad` (wrapped in try/catch).
- Script load is guarded with `window.__tawkScriptAdded` / `window.__tawkLoaded` to avoid duplicate embeds in React Strict Mode.
- Chat elements get `data-cursor="none"` to avoid conflicting with the custom delta cursor.
- Widget CSS uses `z-index: 100000` so the bubble sits above the custom cursor layer (`99999`).

## Content Security Policy (allowed domains)

Configured in [`vercel.json`](../../vercel.json). Tawk requires:

| CSP directive | Tawk-related origins |
|---------------|---------------------|
| `script-src` | `https://embed.tawk.to`, `https://*.tawk.to`, `https://cdn.jsdelivr.net` |
| `style-src` | `https://embed.tawk.to`, `https://*.tawk.to` |
| `connect-src` | `https://embed.tawk.to`, `https://va.tawk.to`, `https://*.tawk.to`, `wss://*.tawk.to` |
| `frame-src` | `https://embed.tawk.to`, `https://*.tawk.to` |
| `media-src` | `https://embed.tawk.to`, `https://*.tawk.to` |

Full breakdown: [CSP_AND_THIRD_PARTIES.md](CSP_AND_THIRD_PARTIES.md).

**Important:** `ERR_BLOCKED_BY_CLIENT` on `va.tawk.to/log-performance` is **not** CSP or CORS — it is an ad blocker or browser privacy feature. Chat still works if `va.tawk.to/v1/session/start` succeeds.

## Console messages (usually harmless)

These are **not** site bugs:

- `POST https://va.tawk.to/log-performance/v3` blocked (`ERR_BLOCKED_BY_CLIENT` or **CORS policy**) — optional Tawk telemetry; Tawk’s server does not allow this from all origins. Chat still works if `session/start` succeeds.
- `Tracking Prevention blocked access to storage` for emojione CDN — Edge/Safari privacy features
- `Clerk: development keys` — expected locally
- Chrome extension `listener indicated an asynchronous response` — extension scripts, not this site
- Occasional Tawk `clientHeight` errors during iframe layout — mitigated by deferred load and `onLoad` guards

## Cookie policy

The site Cookie Policy describes Tawk.to under third-party cookies. Update copy in `src/content/policies.ts` if your data processing changes.

## Testing

1. Open any page (no cookie accept required).
2. Confirm the Tawk widget appears in the bottom-right within ~1–2 seconds.
3. In DevTools → Network, confirm `POST …/v1/session/start` returns 200.
4. Sign in with Clerk and verify visitor attributes in the Tawk dashboard (if enabled).
5. If the bubble is missing, disable ad blockers on your domain and hard-refresh (`Ctrl+Shift+R`).

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Bubble not visible, `session/start` OK | Disable ad blocker; check z-index in `src/index.css` |
| `log-performance` blocked | Ignore — or whitelist `*.tawk.to` in uBlock |
| Widget never loads | Confirm `npm run dev:api` (not plain `npm run dev`); check CSP in Network → response headers |
| Emoji picker odd in Edge | Tracking prevention on jsDelivr — expected, chat still works |
