# Getting Started

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- Git

## Clone & install

```bash
git clone https://github.com/Delta-Innovations-ORG/delta-innovations-website.git
cd delta-innovations-website
npm install
```

## Environment

```bash
cp .env.example .env.local
```

Fill EmailJS values — see [EmailJS setup](../02-website/EMAILJS_SETUP.md).

## Run development server

```bash
npm run dev
```

Open http://localhost:5173

## Common commands

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

## First-time checklist

- [ ] Dependencies installed  
- [ ] `.env.local` configured  
- [ ] Home, contact, and one policy page load  
- [ ] Custom cursor visible on desktop (≥768px)  

## Related docs

- [Project structure](PROJECT_STRUCTURE.md)  
- [Scripts & quality](SCRIPTS_AND_QUALITY.md)
