import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/assets/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function prepareAssets() {
  console.log('Generating final asset library...');

  // 1. Hero Bridal Portrait
  await sharp('mobile-mockup.png')
    .extract({ left: 100, top: 35, width: 172, height: 320 })
    .resize(750, 1000, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'hero-bridal.jpg'));

  // 2. Artist Aanya (B&W)
  await sharp('desktop-mockup.png')
    .extract({ left: 390, top: 1070, width: 235, height: 265 })
    .resize(600, 700, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'artist-aanya.jpg'));

  // 3. Booking Brushes
  await sharp('desktop-mockup.png')
    .extract({ left: 0, top: 1610, width: 335, height: 230 })
    .resize(700, 500, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'booking-brushes.jpg'));

  // 4. Portfolio items
  const portfolioItems = [
    { file: 'portfolio-1.jpg', crop: { left: 194, top: 785, width: 145, height: 195 }, src: 'desktop-mockup.png' },
    { file: 'portfolio-2.jpg', crop: { left: 45, top: 785, width: 145, height: 195 }, src: 'desktop-mockup.png' },
    { file: 'portfolio-3.jpg', crop: { left: 493, top: 785, width: 145, height: 195 }, src: 'desktop-mockup.png' },
    { file: 'portfolio-4.jpg', crop: { left: 344, top: 785, width: 145, height: 195 }, src: 'desktop-mockup.png' },
    { file: 'portfolio-5.jpg', crop: { left: 642, top: 785, width: 145, height: 195 }, src: 'desktop-mockup.png' },
    { file: 'portfolio-6.jpg', crop: { left: 681, top: 485, width: 146, height: 195 }, src: 'mobile-mockup.png' }
  ];

  for (const item of portfolioItems) {
    await sharp(item.src)
      .extract(item.crop)
      .resize(600, 800, { fit: 'cover' })
      .jpeg({ quality: 95 })
      .toFile(path.join(outDir, item.file));
  }

  // 5. Client Testimonial Avatars
  await sharp('desktop-mockup.png')
    .extract({ left: 145, top: 1460, width: 95, height: 95 })
    .resize(240, 240, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'client-riddhima.jpg'));

  await sharp('desktop-mockup.png')
    .extract({ left: 50, top: 1465, width: 80, height: 80 })
    .resize(240, 240, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'client-priya.jpg'));

  // 3rd client avatar from portfolio 4
  await sharp('desktop-mockup.png')
    .extract({ left: 360, top: 800, width: 100, height: 100 })
    .resize(240, 240, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'client-ananya.jpg'));

  console.log('All image assets created successfully.');
}

prepareAssets().catch(console.error);
