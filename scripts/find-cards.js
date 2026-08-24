import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/assets/images');

async function findCards() {
  // In mobile-mockup.png, the 3rd phone canvas (right side) starts at x = 576
  // Portfolio section in 3rd phone:
  // "A Glimpse Of My Work" header is at top ~50
  // Filter tabs ALL, BRIDAL... are at top ~88-102
  // Card 1 (Bridal Kundan): left: 588, top: 108+38 = 146, width: 125, height: 135
  // Card 2 (Editorial Bronze): left: 724, top: 146, width: 125, height: 135
  // Card 3 (Cocktail Glam): left: 588, top: 290, width: 125, height: 135
  // Card 4 (Red Carpet): left: 724, top: 290, width: 125, height: 135
  // Card 5 (Smokey Muhurat): left: 588, top: 435, width: 125, height: 135
  // Card 6 (Rajputana): left: 724, top: 435, width: 125, height: 135

  const cards = [
    { name: 'portfolio-1.jpg', crop: { left: 588, top: 146, width: 125, height: 135 } },
    { name: 'portfolio-2.jpg', crop: { left: 724, top: 146, width: 125, height: 135 } },
    { name: 'portfolio-3.jpg', crop: { left: 588, top: 290, width: 125, height: 135 } },
    { name: 'portfolio-4.jpg', crop: { left: 724, top: 290, width: 125, height: 135 } },
    { name: 'portfolio-5.jpg', crop: { left: 588, top: 435, width: 125, height: 135 } },
    { name: 'portfolio-6.jpg', crop: { left: 724, top: 435, width: 125, height: 135 } },
  ];

  for (const item of cards) {
    await sharp('mobile-mockup.png')
      .extract(item.crop)
      .resize(600, 650, { fit: 'cover' })
      .jpeg({ quality: 95 })
      .toFile(path.join(outDir, item.name));
  }
  console.log('Cards updated.');
}

findCards().catch(console.error);
