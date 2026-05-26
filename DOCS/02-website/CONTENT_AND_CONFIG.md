# Content & Configuration

Centralized content keeps the site consistent and easy to update.

## `siteConfig.ts`

Path: [`src/content/siteConfig.ts`](../../src/content/siteConfig.ts)

| Section | Contents |
|---------|----------|
| `name`, `tagline`, `logo` | Brand identity |
| `emails` | contact, projects |
| `phones` | Pakistan & Egypt call/WhatsApp |
| `locations` | Pakistan, Egypt |
| `social` | LinkedIn, GitHub |
| `navLinks` | Main navigation |
| `footerPolicyLinks` | Footer legal links |
| `heroContent` | Hero badge, headline, CTAs |
| `trustBarItems` | Trust strip on home |
| `howWeWorkSteps` | 5-step process |
| `whyChooseUs` | Value proposition cards |
| `stats` | Homepage stats |
| `aboutContent` | About page copy |

## Other content modules

| File | Purpose |
|------|---------|
| [`services.ts`](../../src/content/services.ts) | Service cards for `/services` |
| [`portfolio.ts`](../../src/content/portfolio.ts) | Portfolio projects carousel |
| [`policies.ts`](../../src/content/policies.ts) | Legal page body content |
| [`formOptions.ts`](../../src/content/formOptions.ts) | Contact form dropdowns |

## Editing workflow

1. Update the relevant `src/content/*.ts` file  
2. Run `npm run dev` and verify the page  
3. Commit with a clear message, e.g. `content: update hero headline`  

## Brand consistency

When changing copy, align with:

- [Brand & positioning](../01-company/BRAND_AND_POSITIONING.md)  
- Tagline: *Engineering digital products with clarity, security, and scale.*

## Related docs

- [Site features](SITE_FEATURES.md)
