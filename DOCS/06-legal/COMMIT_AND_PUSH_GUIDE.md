# Commit & Push Guide

Repository: **https://github.com/Delta-Innovations-ORG/delta-innovations-website**

Run these commands from `DeltaInnovations-Website` in **Agent mode** or your terminal after completing non-markdown file updates (see below).

---

## Step A — Files still requiring Agent mode

These cannot be edited in Plan mode:

| File | Action |
|------|--------|
| `LICENSE` | Replace MIT with proprietary text in [PROPRIETARY_LICENSE.md](./06-legal/PROPRIETARY_LICENSE.md) |
| `package.json` | Set `"license": "UNLICENSED"`, `"version": "1.0.0"`, add description |
| `DOCS/_assets/docs-header.svg` | Branded SVG header |
| `.github/ISSUE_TEMPLATE/config.yml` | Issue template config |

---

## Step B — Multi-commit push (recommended)

### 1. License & package metadata

```powershell
git add LICENSE package.json
git commit -m "chore(license): proprietary All Rights Reserved for company website"
```

### 2. Company docs

```powershell
git add DOCS/README.md DOCS/01-company/
git commit -m "docs(company): overview, brand, mission, services, contact"
```

### 3. Website & dev docs

```powershell
git add DOCS/02-website/ DOCS/03-development/
git commit -m "docs(website): features, architecture, EmailJS, deployment, dev guides"
```

### 4. Policies & growth

```powershell
git add DOCS/04-policies/ DOCS/05-github-and-growth/ DOCS/06-legal/
git commit -m "docs(growth): policy index, SEO topics, org checklist, push guide"
```

### 5. Root README & GitHub standards

```powershell
git add README.md CONTRIBUTING.md CODE_OF_CONDUCT.md SECURITY.md EMAILJS_SETUP.md .github/
git commit -m "docs(readme): modernize README and GitHub repo standards"
```

### 6. Website source (first application commit)

```powershell
git add src/ public/ index.html vite.config.ts tailwind.config.js tsconfig.json tsconfig.node.json postcss.config.js .eslintrc.cjs .gitignore .env.example scripts/ package-lock.json
git commit -m "feat(website): Delta Innovations official marketing site"
```

### 7. Push

```powershell
git push -u origin main
```

---

## Step C — GitHub repository settings

After push, in repo **Settings → General**:

| Field | Value |
|-------|--------|
| Description | Official website for Delta Innovations — Pakistan & Egypt digital product engineering. React, TypeScript, Vite. |
| Website | https://deltainnovations.net/ |
| Topics | `delta-innovations` `react` `typescript` `vite` `software-development` `pakistan` `egypt` |
| Social preview | Upload `public/Group_25.jpg` |

Full list: [SEO_TOPICS_AND_DISCOVERABILITY.md](../05-github-and-growth/SEO_TOPICS_AND_DISCOVERABILITY.md)

---

## Verify

- [ ] README renders on GitHub with banner  
- [ ] DOCS hub links work  
- [ ] No `.env.local` in git  
- [ ] LICENSE shows proprietary (not MIT)  
