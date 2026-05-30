import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = join(root, 'DOCS/05-github-and-growth/assets/linkedin-cover.svg');
const outPath = join(root, 'DOCS/05-github-and-growth/assets/linkedin-cover-fixed.png');

const svg = readFileSync(svgPath, 'utf8');
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1128 },
  background: '#0F172A',
});

writeFileSync(outPath, resvg.render().asPng());
console.log(`Wrote ${outPath} (1128x191) — does not overwrite linkedin-cover.png`);
