# Contributing — Delta Innovations (Internal)

This repository contains the **official Delta Innovations website**. It is **proprietary** and not open source.

## Who may contribute

Only **authorized Delta Innovations team members** with explicit permission from leadership.

## Rules

- Do **not** commit secrets (`.env.local`, API keys, passwords)  
- Open an internal task/issue before large changes  
- Keep pull requests focused and documented  
- Run `npm run lint` and `npm run build` before requesting review  
- Update [`src/content/`](./src/content/) when changing visible copy  
- Update [DOCS/](./DOCS/) when changing architecture, env vars, or setup  

## Pull request checklist

- [ ] Builds successfully (`npm run build`)  
- [ ] No secrets in diff  
- [ ] Documentation updated if behavior or setup changed  
- [ ] Tested contact form locally (if email-related)  
- [ ] Tested on mobile and desktop breakpoints  

## Public contributions

We do **not** accept unsolicited pull requests from the public. For business inquiries, use the [contact form](https://deltainnovations.net/contact) or email **deltainnovations.co@gmail.com**.

## License

All contributions are owned by **Delta Innovations** under the [LICENSE](./LICENSE).
