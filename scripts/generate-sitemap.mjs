import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = (process.env.VITE_SITE_URL || 'https://delta-innovations-website.vercel.app').replace(
  /\/$/,
  '',
);
const lastmod = new Date().toISOString().slice(0, 10);

/** Public routes only — excludes noindex policy pages. */
const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/marketplace', changefreq: 'weekly', priority: '0.9' },
  { path: '/team', changefreq: 'monthly', priority: '0.7' },
  { path: '/reviews', changefreq: 'monthly', priority: '0.7' },
  { path: '/insights', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
  { path: '/requirements', changefreq: 'monthly', priority: '0.7' },
];

const urls = routes
  .map(
    ({ path: routePath, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${routePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`Generated ${outPath} (${routes.length} URLs, lastmod ${lastmod})`);
