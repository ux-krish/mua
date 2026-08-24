import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/assets/images');

async function fixCropsPerfect() {
  const desktopCards = [
    { name: 'portfolio-1.jpg', crop: { left: 194, top: 785, width: 145, height: 195 }, title: 'The Royal Kundan Bride', cat: 'bridal' },
    { name: 'portfolio-2.jpg', crop: { left: 45, top: 785, width: 145, height: 195 }, title: 'Editorial Warm Bronze', cat: 'editorial' },
    { name: 'portfolio-3.jpg', crop: { left: 493, top: 785, width: 145, height: 195 }, title: 'Rose Cocktail Glam', cat: 'party' },
    { name: 'portfolio-4.jpg', crop: { left: 344, top: 785, width: 145, height: 195 }, title: 'Sculpted Dewy Glow', cat: 'celebrity' },
    { name: 'portfolio-5.jpg', crop: { left: 642, top: 785, width: 145, height: 195 }, title: 'Golden Hour Radiance', cat: 'party' },
  ];

  for (const item of desktopCards) {
    await sharp('desktop-mockup.png')
      .extract(item.crop)
      .resize(600, 800, { fit: 'cover' })
      .jpeg({ quality: 95 })
      .toFile(path.join(outDir, item.name));
  }

  // Look 6: Heritage Sabyasachi Bride from mobile mockup
  await sharp('mobile-mockup.png')
    .extract({ left: 681, top: 485, width: 146, height: 195 })
    .resize(600, 800, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'portfolio-6.jpg'));

  // Hero Bride clean (cropped to avoid overlapping header elements)
  await sharp('desktop-mockup.png')
    .extract({ left: 400, top: 38, width: 420, height: 420 })
    .resize(840, 840, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'hero-bridal.jpg'));

  console.log('All crops are now pixel-perfect.');
}

fixCropsPerfect().catch(console.error);
