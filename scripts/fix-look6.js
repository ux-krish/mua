import sharp from 'sharp';
import path from 'path';

const outDir = path.resolve('public/assets/images');

async function fixLook6() {
  await sharp('mobile-mockup.png')
    .extract({ left: 725, top: 485, width: 125, height: 175 })
    .resize(600, 800, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile(path.join(outDir, 'portfolio-6.jpg'));
  console.log('Fixed portfolio-6');
}

fixLook6().catch(console.error);
