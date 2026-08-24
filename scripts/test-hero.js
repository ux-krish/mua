import sharp from 'sharp';
import path from 'path';

const outDir = path.resolve('public/assets/images');

async function testHeroMobile() {
  await sharp('mobile-mockup.png')
    .extract({ left: 110, top: 40, width: 170, height: 320 })
    .resize(700, 900, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'hero-bridal-clean.jpg'));
  console.log('Done mobile hero crop');
}

testHeroMobile().catch(console.error);
