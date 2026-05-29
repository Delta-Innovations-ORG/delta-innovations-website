const SITE_URL = (process.env.VITE_SITE_URL || 'https://delta-innovations-website.vercel.app').replace(
  /\/$/,
  '',
);

const checks = [
  { path: '/sitemap.xml', type: 'xml' },
  { path: '/robots.txt', type: 'text' },
];

async function verify(path, type) {
  const url = `${SITE_URL}${path}`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)' },
    redirect: 'follow',
  });

  const body = await response.text();
  const contentType = response.headers.get('content-type') || '';

  if (!response.ok) {
    throw new Error(`${path}: HTTP ${response.status}`);
  }

  if (type === 'xml') {
    if (!contentType.includes('xml')) {
      throw new Error(`${path}: expected XML content-type, got ${contentType}`);
    }
    if (!body.trimStart().startsWith('<?xml')) {
      throw new Error(`${path}: body is not XML (starts with ${body.slice(0, 40)})`);
    }
    if (body.includes('<!DOCTYPE html') || body.includes('<html')) {
      throw new Error(`${path}: received HTML instead of sitemap XML`);
    }
  }

  if (type === 'text' && !body.includes('Sitemap:')) {
    throw new Error(`${path}: robots.txt missing Sitemap directive`);
  }

  console.log(`OK ${path} (${response.status}, ${contentType.split(';')[0]})`);
}

let failed = false;
for (const check of checks) {
  try {
    await verify(check.path, check.type);
  } catch (error) {
    failed = true;
    console.error(`FAIL ${check.path}:`, error.message);
  }
}

if (failed) process.exit(1);
console.log('All SEO file checks passed.');
