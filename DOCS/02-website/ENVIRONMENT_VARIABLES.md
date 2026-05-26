# Environment Variables

## File layout

| File | Committed | Purpose |
|------|-----------|---------|
| `.env.example` | Yes | Template for developers |
| `.env.local` | **No** (gitignored) | Local secrets |

## Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | Yes | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Yes | Contact template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Yes | EmailJS public key |
| `VITE_EMAILJS_PRIVATE_KEY` | Yes | Private key when "Use Private Key" is enabled |

All must be prefixed with `VITE_` to be exposed to the client bundle.

## Local setup

```bash
cp .env.example .env.local
# Edit .env.local with dashboard values
npm run dev
```

## Production (Vercel)

Project → Settings → Environment Variables → add all four for **Production** and **Preview** → redeploy.

## Security notes

- Never commit `.env.local`  
- Private key in browser is acceptable for EmailJS private-key mode; rotate keys if exposed  
- Do not paste keys in issues or public chats  

## Related docs

- [EmailJS setup](EMAILJS_SETUP.md)  
- [Getting started](../03-development/GETTING_STARTED.md)
