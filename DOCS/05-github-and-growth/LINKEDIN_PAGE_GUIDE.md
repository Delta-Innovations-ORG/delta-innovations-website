# LinkedIn Company Page Guide

Step-by-step checklist to refresh the [Delta Innovations LinkedIn page](https://www.linkedin.com/company/deltainnovations/).

**Admin URL:** `https://www.linkedin.com/company/106582630/admin/dashboard/`

All profile updates are **manual in LinkedIn** — there is no API in this repo. Use the copy blocks below.

---

## Assets (upload from this repo)

| Asset | File | LinkedIn use |
|-------|------|--------------|
| Logo | [`assets/linkedin-logo.png`](assets/linkedin-logo.png) (copy of `public/logo10.png`) | Edit Page → Page info → Logo (min ~300×300 px) |
| Cover (primary) | [`assets/linkedin-cover.png`](assets/linkedin-cover.png) | **Upload this** — resized from original to **1128×191** (no LinkedIn crop needed) |
| Cover (LinkedIn-safe) | [`assets/linkedin-cover-fixed.png`](assets/linkedin-cover-fixed.png) | Compact SVG-based alternate |
| Cover (full-res backup) | [`assets/linkedin-cover-original.png`](assets/linkedin-cover-original.png) | Original artwork — do not delete |
| Cover (SVG source) | [`assets/linkedin-cover.svg`](assets/linkedin-cover.svg) | Compact layout; `npm run assets:linkedin-cover` → `linkedin-cover-fixed.png` |

**Regenerate primary cover from original:**

```bash
npm run assets:linkedin-cover:from-original
```

**Brand colors:** Navy `#0F172A` · Cyan `#22D3EE` · Emerald `#10B981` · Light `#F8FAFC`

**Cover upload tips**

- `linkedin-cover.png` is **1584×396** (4:1) — matches LinkedIn’s crop editor. Regenerate with `npm run assets:linkedin-cover:from-original` (proportional scale, no text stretch).

---

## Phase 1 — Navigation

1. Open admin dashboard → left sidebar → **Edit Page**
2. After each section, click **View as member** to verify the public page
3. Order: visuals → basics → about → locations → buttons → services

---

## Phase 2 — Copy-paste fields

### Tagline

```
Engineering digital products with clarity, security, and scale.
```

### Website

```
https://delta-innovations-website.vercel.app
```

> When `deltainnovations.net` DNS is live and Google Search Console is migrated, switch the Website field to the custom domain only.

### Industry / size / type / founded

| Field | Value |
|-------|-------|
| Industry | Software Development |
| Company size | 2–10 employees |
| Type | Partnership (or Privately Held) |
| Founded | 2025 |

### About

```
Delta Innovations is a Pakistan and Egypt-based software development company helping startups and growing businesses build scalable, secure, and user-focused digital products.

We design, build, deploy, and support web and mobile applications, backend systems and APIs, cloud and DevOps pipelines, AI/ML solutions, data analytics, cybersecurity improvements, and UI/UX — with clear written requirements before development starts.

How we work:
• Written requirements and scope before code
• Milestone-based delivery with transparent timelines
• Security-focused engineering (HTTPS, env-based secrets, least privilege)
• GitHub-based workflow with review and traceable delivery
• Post-launch support and maintenance

Whether you need an MVP, a product rebuild, or ongoing engineering capacity, we focus on practical solutions — not over-engineering.

Website: https://delta-innovations-website.vercel.app
Contact: deltainnovations.co@gmail.com
Projects: insider.daltainnovations@gmail.com
GitHub: https://github.com/Delta-Innovations-ORG
```

### Specialties

Add or replace with:

- Custom Software Development
- Web Application Development
- Mobile App Development
- UI/UX Design
- API Development & Integration
- Cloud Computing & Deployment
- DevOps & CI/CD
- AI & Machine Learning Solutions
- Data Analytics & Visualization
- Cybersecurity
- SaaS Product Development
- MVP Development for Startups
- Digital Transformation
- Full-Stack Development
- PostgreSQL / MongoDB / Database Architecture
- SEO & Web Performance Optimization

### Locations

| Location | Details |
|----------|---------|
| **Primary** | Faisalabad, Punjab, Pakistan |
| **Add second** | Egypt — your operating city (e.g. Cairo) |

---

## Phase 3 — Custom buttons

Edit Page → **Buttons**:

| Button label | URL |
|--------------|-----|
| Visit website | `https://delta-innovations-website.vercel.app` |
| Contact us | `https://delta-innovations-website.vercel.app/contact` |
| Project requirements (optional) | `https://delta-innovations-website.vercel.app/requirements` |

---

## Phase 4 — Services cards (if enabled)

Add 3–6 service cards mirroring the website. Suggested copy:

### Web Development

Business websites, landing pages, dashboards, SaaS frontends, and responsive web apps built with React, TypeScript, and SEO-ready architecture.

**Link:** `https://delta-innovations-website.vercel.app/services`

### Mobile App Development

Android, iOS, and cross-platform apps for customers, operations, booking, and internal tools — with app store deployment support.

**Link:** `https://delta-innovations-website.vercel.app/contact`

### DevOps, Docker & Cloud

Docker setup, CI/CD pipelines, VPS and cloud deployment, SSL, monitoring, and production support.

**Link:** `https://delta-innovations-website.vercel.app/services`

### AI & Machine Learning

Prediction systems, chatbots, automation workflows, and AI integration into web and mobile products.

**Link:** `https://delta-innovations-website.vercel.app/contact`

### Data Analytics

KPI dashboards, reports, data visualization, and business insights for decision-makers.

**Link:** `https://delta-innovations-website.vercel.app/contact`

### Cybersecurity

Security audits, authentication hardening, API review, backup planning, and secure development practices.

**Link:** `https://delta-innovations-website.vercel.app/security`

---

## Phase 5 — Featured & team

**Featured / Life**

- Pin: live website, GitHub org, one portfolio highlight
- Custom link: `https://github.com/Delta-Innovations-ORG`

**People**

- Founders and engineers should list **Delta Innovations** as current employer
- Ask team to follow the company page

---

## Phase 6 — Dashboard growth (optional)

| Suggestion | Action |
|------------|--------|
| Content sharing | Share website updates manually until RSS is set up |
| Add competitor | Optional — 2–3 regional dev shops for benchmarks |
| Insight Tag | Skip until you run LinkedIn ads |
| Premium Page | Skip unless running paid campaigns |

---

## Phase 7 — Starter posts (copy-paste)

**Cadence:** 2 posts/week for 4 weeks, then 1/week.

### Post 1 — Profile refresh

```
We've refreshed our Delta Innovations company profile to reflect who we are today: a Pakistan and Egypt-based engineering team focused on clear requirements, secure delivery, and scalable digital products.

What we build:
• Web and mobile applications
• Backend APIs and cloud deployment
• AI, data, and cybersecurity solutions

Explore our updated site: https://delta-innovations-website.vercel.app

Questions or a project in mind? deltainnovations.co@gmail.com

#DeltaInnovations #SoftwareDevelopment #Pakistan #Egypt #WebDevelopment
```

### Post 2 — Services overview

```
From MVPs to production systems — Delta Innovations delivers full-cycle engineering with written scope before code.

Our core services:
• Web Development — React, TypeScript, SEO-ready sites
• Mobile Apps — Android, iOS, cross-platform
• Cloud & DevOps — Docker, CI/CD, deployment
• AI/ML, Data Analytics, Cybersecurity

See the full list: https://delta-innovations-website.vercel.app/services
Start a conversation: https://delta-innovations-website.vercel.app/contact

#SoftwareEngineering #DevOps #AI #DeltaInnovations
```

### Post 3 — GitHub & portfolio

```
Transparent engineering is part of our process. We use GitHub for version control, code review, and traceable delivery.

Explore our organization: https://github.com/Delta-Innovations-ORG

Our company website is open source in the org — built with React, TypeScript, and Vite.

Want to collaborate or see how we work? Reach out: insider.daltainnovations@gmail.com

#OpenSource #GitHub #FullStack #DeltaInnovations
```

### Post 4 — How to start a project

```
Starting a software project? At Delta Innovations, we capture goals, features, and constraints in writing before any code is written.

Our 5-step process:
1. Requirement collection
2. Scope and proposal
3. Design and development
4. Testing and deployment
5. Support and maintenance

Submit your project requirements: https://delta-innovations-website.vercel.app/requirements

#ProjectManagement #MVP #StartupTech #DeltaInnovations
```

### Reusable post template

```
At Delta Innovations, we [one clear insight].

• [Bullet point 1]
• [Bullet point 2]
• [Bullet point 3]

Explore our services: https://delta-innovations-website.vercel.app/services
Start a project: deltainnovations.co@gmail.com

#SoftwareDevelopment #WebDevelopment #DeltaInnovations
```

---

## Verification checklist

- [ ] View as member: tagline, about, website, locations match brand
- [ ] Website button opens Vercel site (not broken domain)
- [ ] Logo and cover look correct on mobile
- [ ] Specialties reflect current services
- [ ] At least one new post published with updated email/URL
- [ ] Team profiles linked to company page
- [ ] Website footer LinkedIn link matches `https://www.linkedin.com/company/deltainnovations`

---

## Repo alignment

| Item | Location |
|------|----------|
| LinkedIn URL in code | `src/content/siteConfig.ts` → `social.linkedin` |
| Contact emails | `deltainnovations.co@gmail.com`, `insider.daltainnovations@gmail.com` |
| Brand copy source | `DOCS/01-company/BRAND_AND_POSITIONING.md` |

**Canonical LinkedIn slug:** `https://www.linkedin.com/company/deltainnovations`

---

## Related docs

- [Brand & positioning](../01-company/BRAND_AND_POSITIONING.md)
- [Contact & presence](../01-company/CONTACT_AND_PRESENCE.md)
- [Org profile checklist](ORG_PROFILE_CHECKLIST.md)
- [Services catalog](../01-company/SERVICES_CATALOG.md)
