# GitHub Repository Setup Guide

Step-by-step for **Delta-Innovations-ORG/delta-innovations-website** (already created).

## Repository profile (GitHub UI)

| Field | Recommended value |
|-------|-------------------|
| **Owner** | `Delta-Innovations-ORG` |
| **Name** | `delta-innovations-website` |
| **Description** | Official website for Delta Innovations — Pakistan & Egypt digital product engineering: web, mobile, AI, cloud, DevOps & cybersecurity. Built with React, TypeScript, and Vite. |
| **Website** | https://deltainnovations.net/ |
| **Topics** | See [SEO & topics](SEO_TOPICS_AND_DISCOVERABILITY.md) |
| **License (GitHub UI)** | **None** — proprietary [`LICENSE`](../../LICENSE) in repo |

## Social preview image

Settings → General → **Social preview** → upload `public/Group_25.jpg` or `public/logo10.png`.

## Push workflow (multi-commit strategy)

Use **logical commits** so history is readable for clients and search engines.

### Commit 1 — License & metadata

```bash
git add LICENSE package.json
git commit -m "chore(license): replace MIT with proprietary All Rights Reserved

- Delta Innovations owns website code, design, and content
- No redistribution or modification without written permission
- Mark package.json as UNLICENSED / private"
```

### Commit 2 — Company documentation

```bash
git add DOCS/README.md DOCS/01-company/
git commit -m "docs(company): add branded company documentation hub

- Company overview, brand positioning, mission/vision/values
- Services catalog and contact/presence guide
- Aligns with siteConfig and brand strategy packs"
```

### Commit 3 — Website & development docs

```bash
git add DOCS/02-website/ DOCS/03-development/
git commit -m "docs(website): architecture, features, EmailJS, and dev guides

- Site features, routes, content config, custom cursor
- EmailJS setup, deployment, environment variables
- Getting started, project structure, scripts"
```

### Commit 4 — Policies index & growth guides

```bash
git add DOCS/04-policies/ DOCS/05-github-and-growth/
git commit -m "docs(growth): policy index, SEO topics, and org checklist

- Maps live policy routes to policies.ts
- GitHub discoverability and org profile checklist"
```

### Commit 5 — Root README & GitHub standards

```bash
git add README.md CONTRIBUTING.md CODE_OF_CONDUCT.md SECURITY.md EMAILJS_SETUP.md .github/
git commit -m "docs(readme): modernize root README and GitHub repo standards

- Company + website overview with badges and route table
- Internal contributing policy, conduct, security reporting
- EmailJS_SETUP stub points to DOCS/02-website/"
```

### Commit 6 — Application source (if not yet committed)

```bash
git add src/ public/ index.html vite.config.ts tailwind.config.js tsconfig.json tsconfig.node.json postcss.config.js .eslintrc.cjs .gitignore .env.example scripts/ package-lock.json
git commit -m "feat(website): Delta Innovations official marketing site

- React 18, TypeScript, Vite 5, Tailwind, Framer Motion
- Multi-page routes, portfolio, EmailJS contact, policy pages
- Custom delta cursor, 3D hero logo, compact footer"
```

### Push

```bash
git branch -M main
git push -u origin main
```

## After push

1. Pin repository on org profile  
2. Link from LinkedIn company page  
3. Add repo URL to website footer (already in `siteConfig.social.github` if updated)  
4. Deploy to Vercel — see [Deployment](../02-website/DEPLOYMENT.md)  

## Remote URL

```
https://github.com/Delta-Innovations-ORG/delta-innovations-website.git
```

## Related docs

- [SEO & topics](SEO_TOPICS_AND_DISCOVERABILITY.md)  
- [Org profile checklist](ORG_PROFILE_CHECKLIST.md)
