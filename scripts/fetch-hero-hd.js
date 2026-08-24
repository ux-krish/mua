import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

const outputDir = path.resolve('public/assets/images');

// Verified High-Definition Curated Luxury Editorial Beauty & Bridal Images
const heroUrl = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=85&w=1600&auto=format&fit=crop';

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: Status code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(destPath));
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  const tempPath = path.resolve('public/assets/images', 'temp_hero.jpg');
  const finalPath = path.resolve(outputDir, 'hero-bridal.jpg');
  
  try {
    console.log('Downloading Ultra-HD Hero Bridal asset...');
    await downloadImage(heroUrl, tempPath);
    
    await sharp(tempPath)
      .resize(1400, 1750, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
      .toFile(finalPath);
      
    fs.unlinkSync(tempPath);
    console.log('✓ Generated Ultra-HD asset: hero-bridal.jpg');
  } catch (e) {
    console.error('Error processing hero-bridal.jpg:', e.message);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

run();
