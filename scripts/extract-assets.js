import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/assets/images');

async function extractAll() {
  console.log('Extracting high-res slices...');

  // Hero Bride from desktop (clean face area)
  await sharp('desktop-mockup.png')
    .extract({ left: 395, top: 25, width: 438, height: 430 })
    .resize(900, 880, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'hero-bridal-clean.jpg'));

  // Artist B&W
  await sharp('desktop-mockup.png')
    .extract({ left: 390, top: 1070, width: 235, height: 265 })
    .resize(600, 680, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'artist-aanya.jpg'));

  // Booking background
  await sharp('desktop-mockup.png')
    .extract({ left: 0, top: 1610, width: 335, height: 230 })
    .resize(700, 480, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'booking-brushes.jpg'));

  // Portfolio items from mobile mockup (which has 6 high-res clean cards)
  const mobileLooks = [
    { name: 'portfolio-1.jpg', crop: { left: 588, top: 108, width: 132, height: 140 }, title: 'The Royal Kundan Bride', cat: 'bridal' },
    { name: 'portfolio-2.jpg', crop: { left: 724, top: 108, width: 132, height: 140 }, title: 'Editorial Velvet Bronze', cat: 'editorial' },
    { name: 'portfolio-3.jpg', crop: { left: 588, top: 255, width: 132, height: 136 }, title: 'Rose Gold Cocktail Glam', cat: 'party' },
    { name: 'portfolio-4.jpg', crop: { left: 724, top: 255, width: 132, height: 136 }, title: 'Golden Hour Red Carpet', cat: 'celebrity' },
    { name: 'portfolio-5.jpg', crop: { left: 588, top: 400, width: 132, height: 136 }, title: 'Smokey Kajal Muhurat Look', cat: 'bridal' },
    { name: 'portfolio-6.jpg', crop: { left: 724, top: 400, width: 132, height: 136 }, title: 'Heritage Rajputana Elegance', cat: 'bridal' },
  ];

  for (const item of mobileLooks) {
    await sharp('mobile-mockup.png')
      .extract(item.crop)
      .resize(600, 640, { fit: 'cover' })
      .jpeg({ quality: 95 })
      .toFile(path.join(outDir, item.name));
  }

  // Client Testimonials
  await sharp('desktop-mockup.png')
    .extract({ left: 145, top: 1460, width: 95, height: 95 })
    .resize(200, 200, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'client-riddhima.jpg'));

  await sharp('desktop-mockup.png')
    .extract({ left: 50, top: 1465, width: 80, height: 80 })
    .resize(200, 200, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'client-priya.jpg'));

  console.log('Portfolio and assets rendered successfully.');
}

extractAll().catch(console.error);
