import type { VercelRequest, VercelResponse } from '@vercel/node';

const SITE_URL = (process.env.VITE_SITE_URL || 'https://delta-innovations-website.vercel.app').replace(
  /\/$/,
  '',
);

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
  { path: '/requirements', changefreq: 'monthly', priority: '0.7' },
];

function buildSitemapXml(): string {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map(
      ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.status(200).send(buildSitemapXml());
}
