# Architecture & Routes

## High-level structure

```mermaid
flowchart TB
  index[index.tsx] --> App[App.tsx]
  App --> Router[BrowserRouter]
  Router --> MainLayout[MainLayout]
  MainLayout --> Navbar[Navbar]
  MainLayout --> Outlet[Outlet pages]
  MainLayout --> Footer[Footer]
  MainLayout --> Cursor[DeltaCursor portal]
```

## Key directories

```
src/
├── App.tsx                 # Route definitions
├── layouts/MainLayout.tsx  # Shell: nav, footer, cursor, scroll-to-top
├── pages/                  # Route-level pages
├── components/
│   ├── home/               # Hero, portfolio, CTA, trust bar
│   ├── layout/             # Navbar, footer
│   ├── contact/            # Contact form, phone input
│   ├── cursor/             # Custom cursor
│   ├── motion/             # Reveal animations
│   └── ui/                 # Buttons, cards, policy layout
├── content/                # siteConfig, services, portfolio, policies
├── hooks/                  # useDeltaCursor, usePageTitle, useTiltHover
├── utils/                  # email, phone helpers
└── config/                 # EmailJS config
```

## Routing (`App.tsx`)

All routes nest under `MainLayout` except none — single layout wrapper.

| Path | Component |
|------|-----------|
| `/` | `HomePage` |
| `/about` | `AboutPage` |
| `/services` | `ServicesPage` |
| `/contact` | `ContactPage` |
| `/privacy` | `PrivacyPage` |
| `/terms` | `TermsPage` |
| `/refund` | `RefundPage` |
| `/cookies` | `CookiePage` |
| `/security` | `SecurityPage` |
| `/code-of-conduct` | `CodeOfConductPage` |
| `/change-requests` | `ChangeRequestPage` |
| `/requirements` | `RequirementsPage` |

## Contact form flow

```mermaid
sequenceDiagram
  participant User
  participant Form as ContactForm
  participant API as EmailJS REST
  participant Inbox as Gmail

  User->>Form: Submit
  Form->>API: POST with public key + accessToken
  API->>Inbox: Template email
  Form->>User: Success / error UI
```

Implementation: [`src/utils/email.ts`](../../src/utils/email.ts) — direct `fetch` to EmailJS API (private key mode).

## Related docs

- [Content & config](CONTENT_AND_CONFIG.md)  
- [EmailJS setup](EMAILJS_SETUP.md)
