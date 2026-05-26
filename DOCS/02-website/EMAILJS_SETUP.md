# EmailJS Setup Guide

Contact form emails are sent via [EmailJS](https://www.emailjs.com) from the browser using your dashboard credentials (no Gmail password in the website code).

## Current Delta Innovations config

| Setting | Value |
|---------|--------|
| Service ID | `service_mvp30ck` |
| Template ID | `template_td3uvm9` (Contact Us) |
| To Email | `daltainnovations.co@gmail.com` |
| CC (optional) | `insider.daltainnovations@gmail.com` |

## 1. Create account

Sign up at https://www.emailjs.com (free tier available).

## 2. Connect email service

Dashboard → **Email Services** → Add **Gmail** → connect `daltainnovations.co@gmail.com`.

## 3. Email template settings

Dashboard → **Email Templates** → **Contact Us**:

| Field | Value |
|-------|--------|
| To Email | `daltainnovations.co@gmail.com` |
| From Name | `Delta Innovations Website` |
| Reply To | `{{client_email}}` |
| Subject | `New Project Inquiry — {{client_name}} ({{project_type}})` |

For both inboxes, use comma-separated To Email:

```
daltainnovations.co@gmail.com, insider.daltainnovations@gmail.com
```

**HTML body** (paste in template editor):

```html
<h2>New Project Inquiry</h2>
<p><strong>From:</strong> {{client_name}} &lt;{{client_email}}&gt;</p>
<p><strong>Phone/WhatsApp:</strong> {{client_phone}}</p>
<p><strong>Company:</strong> {{client_company}}</p>
<p><strong>Country:</strong> {{client_country}}</p>
<hr/>
<p><strong>Project Type:</strong> {{project_type}}</p>
<p><strong>Budget:</strong> {{budget_range}}</p>
<p><strong>Timeline:</strong> {{timeline}}</p>
<hr/>
<h3>Project Description</h3>
<p>{{message}}</p>
<hr/>
<p><em>Sent via Delta Innovations contact form</em></p>
```

## 4. Copy IDs and keys

- **Service ID** — Email Services
- **Template ID** — must match `.env.local` exactly (e.g. `template_td3uvm9` — copy from dashboard, do not retype)
- **Public Key** — Account → API Keys
- **Private Key** — Account → API Keys (required when **Use Private Key** is enabled under Security)

## 5. Security settings (free plan)

Account → **Security**:

1. Enable **Use Private Key (recommended)** — the contact form sends `accessToken` with each request.
2. **Allowed Origins** is a paid feature — you do **not** need it when private key mode is on.
3. Optional: enable **Allow EmailJS API for non-browser applications** if you later move the key to a serverless function.

## 6. Local environment

Copy `.env.example` to `.env.local`:

```
VITE_EMAILJS_SERVICE_ID=service_mvp30ck
VITE_EMAILJS_TEMPLATE_ID=template_td3uvm9
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_PRIVATE_KEY=your_private_key
```

Restart `npm run dev` after changing env vars. In development, the contact form shows a small line confirming which Service ID and Template ID Vite loaded.

## Troubleshooting: "The template ID not found" (400)

Usually means a typo in `.env.local` — Template ID, Public Key, or Private Key must match the EmailJS dashboard **character for character** (use Copy buttons).

1. **Template ID** — Email Templates → Contact Us (e.g. `template_td3uvm9`, not `template_td3uvm`).
2. **Public + Private keys** — Account → API Keys → use **Copy** on each field.
3. Confirm **Use Private Key** is checked under Account → Security.
4. Restart dev server and hard refresh (Ctrl+Shift+R).

## 7. Production deploy

Add all four `VITE_EMAILJS_*` variables in Vercel/Netlify → Environment Variables, then redeploy.

## 8. Test

Submit the contact form on `/contact`. Network tab should show **200 OK** (not 400). Check `daltainnovations.co@gmail.com` inbox and spam. Reply should go to the client's email via Reply-To.

## Code reference

- [`src/utils/email.ts`](../../src/utils/email.ts)
- [`src/config/emailJs.config.ts`](../../src/config/emailJs.config.ts)
- [`scripts/test-emailjs.mjs`](../../scripts/test-emailjs.mjs)
