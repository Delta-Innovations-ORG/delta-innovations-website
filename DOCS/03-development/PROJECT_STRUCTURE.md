# Project Structure

```
delta-innovations-website/
├── public/                 # Static assets (logo, images)
├── src/
│   ├── App.tsx             # Routes
│   ├── index.tsx           # React entry
│   ├── index.css           # Tailwind + global styles
│   ├── layouts/            # MainLayout
│   ├── pages/              # Route pages
│   ├── components/         # UI sections
│   ├── content/            # Config & copy
│   ├── hooks/
│   ├── utils/
│   └── config/
├── scripts/                # test-emailjs.mjs
├── DOCS/                   # This documentation hub
├── .env.example
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Conventions

- **Pages** in `src/pages/` — one file per route  
- **Reusable UI** in `src/components/ui/`  
- **Section blocks** in `src/components/home/`, `layout/`, etc.  
- **Copy** in `src/content/` — not hardcoded in JSX when possible  

## Assets

| Asset | Path |
|-------|------|
| Logo | `public/logo10.png` |
| Banner | `public/Group_25.jpg` |

## Related docs

- [Architecture & routes](../02-website/ARCHITECTURE_AND_ROUTES.md)
