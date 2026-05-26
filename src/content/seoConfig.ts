import { siteConfig } from './siteConfig';

const DEFAULT_SITE_URL = 'https://delta-innovations-website.vercel.app';

export const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');

export const siteName = siteConfig.name;

export const defaultOgImage = '/logo10.png';

export const seoLocale = 'en_US';

export const organizationSameAs = [
  siteConfig.social.linkedin,
  'https://github.com/Delta-Innovations-ORG',
].filter(Boolean);
