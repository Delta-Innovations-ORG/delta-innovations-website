# Scripts & Quality

## npm scripts

Defined in [`package.json`](../../package.json):

| Script | Command | Use |
|--------|---------|-----|
| `dev` | `npx vite` | Local development |
| `build` | `npx vite build` | Production bundle |
| `preview` | `npx vite preview` | Test production build |
| `lint` | `eslint . --ext .js,.jsx,.ts,.tsx` | Code quality |

## ESLint

Config: [`.eslintrc.cjs`](../../.eslintrc.cjs)

Run before commits:

```bash
npm run lint
```

## TypeScript

- [`tsconfig.json`](../../tsconfig.json) — app sources  
- [`tsconfig.node.json`](../../tsconfig.node.json) — Vite config  

## Internal commit guidelines

- Use clear prefixes: `feat:`, `fix:`, `docs:`, `style:`, `chore:`  
- Never commit `.env.local` or API keys  
- Update `src/content/` when changing visible copy  

## Related docs

- [Getting started](GETTING_STARTED.md)
