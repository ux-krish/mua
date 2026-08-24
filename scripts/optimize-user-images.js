import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imgDir = path.resolve('public/assets/images');

const largeImages = [
  '48495647-woman-9419481.jpg',
  '48495647-woman-9417377.jpg'
];

async function optimizeImages() {
  for (const filename of largeImages) {
    const filePath = path.join(imgDir, filename);
    if (!fs.existsSync(filePath)) continue;

    const fileBuffer = fs.readFileSync(filePath);
    const meta = await sharp(fileBuffer).metadata();
    console.log(`Processing ${filename}: currently ${meta.width}x${meta.height}, ${(fileBuffer.length / 1024 / 1024).toFixed(2)} MB`);

    if (meta.width > 2000 || meta.height > 2000) {
      const buffer = await sharp(fileBuffer)
        .resize({
          width: meta.width > meta.height ? 2000 : undefined,
          height: meta.height >= meta.width ? 2400 : undefined,
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 90, mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(filePath, buffer);
      console.log(`Optimized ${filename}: new size ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
    }
  }
  console.log('Image optimization complete.');
}

optimizeImages().catch(console.error);
