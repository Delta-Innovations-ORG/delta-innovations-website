# SEO Guide — Delta Innovations Website

Technical SEO, GitHub discoverability, and Google Search Console setup.

**Canonical URL (current):** `https://delta-innovations-website.vercel.app`  
**Config:** `VITE_SITE_URL` in Vercel and `.env.local`

---

## GitHub repository details (copy-paste)

**Settings → General → Edit repository details** on `Delta-Innovations-ORG/delta-innovations-website`.

### Description

```
Official website for Delta Innovations — Pakistan & Egypt digital product engineering. Web, mobile, AI, cloud, DevOps & cybersecurity. Built with React, TypeScript, Vite. Live: delta-innovations-website.vercel.app
```

### Website

```
https://delta-innovations-website.vercel.app
```

### Topics

```
delta-innovations
software-development
web-development
mobile-app-development
react
typescript
vite
tailwindcss
digital-agency
software-company
pakistan
egypt
cybersecurity
devops
ai-ml
company-website
portfolio-website
startup
full-stack
```

### Home page checkboxes

| Checkbox | Recommendation |
|----------|----------------|
| Releases | ON — shows version tags (e.g. v1.0.0) |
| Deployments | ON — shows Vercel production status |
| Packages | OFF for website-only repo (see below) |

### Social preview

Upload `public/logo10.png` under repository **Social preview**.

---

## Packages vs Releases

| Feature | Use for this repo? |
|---------|-------------------|
| **Releases** | Yes — version history (`v1.0.0`) |
| **Deployments** | Yes — Vercel status |
| **Packages** | No — only if you publish npm/Docker libraries from a separate codebase |

**Packages** are for publishing installable code (e.g. `@your-org/ui-kit`). This marketing site does not need a GitHub Package.

---

## What is implemented in code

| File | Purpose |
|------|---------|
| [`src/content/seoConfig.ts`](../../src/content/seoConfig.ts) | `siteUrl`, OG image, locale |
| [`src/content/routeSeo.ts`](../../src/content/routeSeo.ts) | Per-route title, description, keywords, `noindex` |
| [`src/hooks/useSeo.ts`](../../src/hooks/useSeo.ts) | Updates title, meta, OG, Twitter, canonical |
| [`src/components/seo/SeoStructuredData.tsx`](../../src/components/seo/SeoStructuredData.tsx) | JSON-LD Organization, WebSite, ProfessionalService |
| [`src/layouts/MainLayout.tsx`](../../src/layouts/MainLayout.tsx) | Runs `useSeo()` on every route change |
| [`public/robots.txt`](../../public/robots.txt) | Crawler rules + sitemap URL |
| [`public/sitemap.xml`](../../public/sitemap.xml) | All public routes |
| [`index.html`](../../index.html) | Fallback meta before React loads |

### Adding a new route

1. Add route in [`src/App.tsx`](../../src/App.tsx)
2. Add entry in [`src/content/routeSeo.ts`](../../src/content/routeSeo.ts)
3. Add URL in [`public/sitemap.xml`](../../public/sitemap.xml) (or automate later with a build script)
4. Push to `main` — Vercel auto-deploys

### Switching to custom domain

1. Point `deltainnovations.net` in Vercel **Domains**
2. Set `VITE_SITE_URL=https://deltainnovations.net` in Vercel env
3. Update `public/robots.txt` and `public/sitemap.xml` host URLs (or regenerate)
4. Update GitHub repo **Website** field
5. Redeploy

---

## Google Search Console (Week 1)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: **URL prefix** → `https://delta-innovations-website.vercel.app`
3. Verify ownership (both methods are configured in this repo):
   - **HTML tag** — in `index.html` `<head>`:
     ```html
     <meta name="google-site-verification" content="vTRXpdx3a-8Mhs_YKCtk0XdsJUB3xzVi-k1CMoDF08s" />
     ```
   - **HTML file** — `public/googlec3d73e12911e409b.html` →  
     `https://delta-innovations-website.vercel.app/googlec3d73e12911e409b.html`
   - Or use DNS verification when on custom domain
4. Submit **only** this sitemap (full URL, not `/contact` or verification HTML):
   - `https://delta-innovations-website.vercel.app/sitemap.xml`
   - In GSC **Sitemaps**, enter exactly: `sitemap.xml` → **Submit**
5. If status stays **Couldn't fetch** or **Sitemap could not be read** after deploy:
   - Open `https://delta-innovations-website.vercel.app/sitemap.xml` in an **Incognito** window (must show XML, not the React app).
   - In GSC, open the `/sitemap.xml` row → **⋮** → **Delete sitemap**, wait 1–2 minutes, submit `sitemap.xml` again.
   - Status can take **24–48 hours** to change from red to **Success** after the server returns stable `200` + `Content-Type: application/xml`.
   - Do **not** submit `/services`, `/contact`, or `googlec3d73e12911e409b.html` in the Sitemaps section — use **URL inspection** for individual pages.
6. **URL inspection** → request indexing for:
   - `/`
   - `/services`
   - `/contact`
   - `/about`

### GSC “Couldn't fetch” — root cause (May 2026)

| Symptom in GSC | What Googlebot was getting | Fix |
|----------------|---------------------------|-----|
| **Couldn't fetch**, Type **Unknown**, Last read empty | **401/403** from **Vercel Deployment Protection** (auth wall), or intermittent **5xx** while misconfigured | Turn **Deployment Protection** off for Production (Vercel → Project → Settings → Deployment Protection). Redeploy. |
| **Sitemap is HTML** | SPA rewrite sent `index.html` instead of `public/sitemap.xml` | [`vercel.json`](../../vercel.json) uses `routes`: `{ "handle": "filesystem" }` then SPA fallback — static `dist/sitemap.xml` is always served first. Build runs `scripts/generate-sitemap.mjs` so `dist/sitemap.xml` exists. |
| Still red after server is fixed | GSC cached the failed fetch | Delete sitemap in GSC → wait 1–2 min → submit **`sitemap.xml` only** again. |

**Verify before resubmitting** (curl or browser Incognito):

- `GET /sitemap.xml` → **200**, `Content-Type: application/xml`, body starts with `<?xml` (not `<!DOCTYPE html>`).
- `GET /robots.txt` → **200**, includes `Sitemap: https://delta-innovations-website.vercel.app/sitemap.xml`.

Custom domain (`deltainnovations.net`) must resolve in DNS and be assigned in Vercel before using that host in GSC or sitemap `<loc>` URLs.

---

## Off-page SEO (ranking growth)

Technical SEO alone does not guarantee top rankings. Also do:

| Action | Why |
|--------|-----|
| Google Business Profile (PK / EG) | Local searches |
| LinkedIn → website link | Brand + traffic |
| Clutch, GoodFirms, directories | Backlinks |
| Case studies / blog posts | Long-tail keywords |
| Client portfolio with live URLs | Trust signals |

### Target keywords

- software development company Pakistan  
- software development company Egypt  
- hire React development team  
- custom web application development  
- mobile app development outsourcing  
- DevOps and cloud deployment services  

---

## Verification checklist

- [ ] `https://delta-innovations-website.vercel.app/robots.txt` loads
- [ ] `https://delta-innovations-website.vercel.app/sitemap.xml` loads
- [ ] DevTools → Elements → `<head>` shows correct `title`, `description`, `canonical`, `og:*` per page
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) — Organization / WebSite detected
- [ ] Lighthouse SEO score 90+ on home and services
- [ ] GSC sitemap submitted, no critical errors
- [ ] GitHub description, website, topics saved

---

## Related docs

- [Deployment & CI/CD](DEPLOYMENT.md)
- [Environment variables](ENVIRONMENT_VARIABLES.md)
- [SEO topics (GitHub)](../../05-github-and-growth/SEO_TOPICS_AND_DISCOVERABILITY.md)
