import sharp from 'sharp';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** LinkedIn cover editor uses 4:1 (1584x396). */
const WIDTH = 1584;
const HEIGHT = 396;
const NAVY = { r: 15, g: 23, b: 42, alpha: 1 };

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const inputPath = join(root, 'DOCS/05-github-and-growth/assets/linkedin-cover-original.png');
const outputPath = join(root, 'DOCS/05-github-and-growth/assets/linkedin-cover.png');

const { width: srcW = 0, height: srcH = 0 } = await sharp(inputPath).metadata();
if (!srcW || !srcH) {
  throw new Error('Could not read source image dimensions');
}

// One artwork layer — uniform scale by height only (never stretch width/height independently)
const foreground = await sharp(inputPath)
  .resize({ height: HEIGHT })
  .png()
  .toBuffer();

const { width: fgW = 0 } = await sharp(foreground).metadata();
const left = Math.max(0, Math.round((WIDTH - fgW) / 2));

const ambient = await sharp(inputPath)
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
  .blur(22)
  .modulate({ brightness: 0.28, saturation: 1.05 })
  .png()
  .toBuffer();

const base = await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 4, background: NAVY },
})
  .composite([{ input: ambient, blend: 'over' }])
  .png()
  .toBuffer();

await sharp(base)
  .composite([{ input: foreground, left, top: 0 }])
  .png()
  .toFile(outputPath);

console.log(`Wrote ${outputPath} (${WIDTH}x${HEIGHT}) — uniform scale, centred`);
