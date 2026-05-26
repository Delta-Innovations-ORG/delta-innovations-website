# Deployment

## Recommended: Vercel

1. Push this repository to GitHub (`Delta-Innovations-ORG/delta-innovations-website`).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Vite**
4. Build settings:

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

5. **Environment variables** (Production + Preview):

```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
VITE_EMAILJS_PRIVATE_KEY
```

6. Deploy → assign custom domain `deltainnovations.net` in Vercel DNS.

## Pre-deploy checklist

- [ ] `npm run build` succeeds locally  
- [ ] No secrets in git (`.env.local` is gitignored)  
- [ ] Contact form returns 200 on production `/contact`  
- [ ] All policy routes load  
- [ ] Favicon and OG meta in `index.html` are correct  

## Preview locally

```bash
npm run build
npm run preview
```

Opens production build (default port from Vite preview).

## Related docs

- [Environment variables](ENVIRONMENT_VARIABLES.md)  
- [EmailJS setup](EMAILJS_SETUP.md)
