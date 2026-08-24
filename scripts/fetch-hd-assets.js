import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

const outputDir = path.resolve('public/assets/images');

// High-Definition Curated Luxury Editorial Beauty & Bridal Images from Unsplash
const imageSources = {
  'hero-bridal.jpg': 'https://images.unsplash.com/photo-1595955793665-c18c0c09d226?q=85&w=1600&auto=format&fit=crop',
  'artist-aanya.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=85&w=1600&auto=format&fit=crop',
  'portfolio-1.jpg': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=85&w=1600&auto=format&fit=crop',
  'portfolio-2.jpg': 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=85&w=1600&auto=format&fit=crop',
  'portfolio-3.jpg': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=85&w=1600&auto=format&fit=crop',
  'portfolio-4.jpg': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=85&w=1600&auto=format&fit=crop',
  'portfolio-5.jpg': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=85&w=1600&auto=format&fit=crop',
  'portfolio-6.jpg': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=85&w=1600&auto=format&fit=crop',
  'booking-brushes.jpg': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=85&w=1600&auto=format&fit=crop',
  'client-riddhima.jpg': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=85&w=600&auto=format&fit=crop',
  'client-priya.jpg': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=85&w=600&auto=format&fit=crop',
  'client-ananya.jpg': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=85&w=600&auto=format&fit=crop'
};

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Follow redirect
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
  console.log('Fetching and processing ultra-HD curated fashion assets...');
  
  for (const [filename, url] of Object.entries(imageSources)) {
    const tempPath = path.resolve('public/assets/images', `temp_${filename}`);
    const finalPath = path.resolve(outputDir, filename);
    
    try {
      console.log(`Downloading HD asset for ${filename}...`);
      await downloadImage(url, tempPath);
      
      // Process with sharp for high-resolution clarity and crisp color profiling
      let transform = sharp(tempPath);
      
      if (filename === 'artist-aanya.jpg') {
        transform = transform.grayscale().modulate({ brightness: 1.05, contrast: 1.15 });
      }
      
      if (filename.startsWith('client-')) {
        await transform
          .resize(600, 600, { fit: 'cover', position: 'center' })
          .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
          .toFile(finalPath);
      } else if (filename === 'booking-brushes.jpg') {
        await transform
          .resize(1600, 1200, { fit: 'cover', position: 'center' })
          .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
          .toFile(finalPath);
      } else {
        await transform
          .resize(1400, 1750, { fit: 'cover', position: 'center' })
          .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
          .toFile(finalPath);
      }
      
      fs.unlinkSync(tempPath);
      console.log(`✓ Generated HD asset: ${filename}`);
    } catch (e) {
      console.error(`Error processing ${filename}:`, e.message);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }
  console.log('All HD images updated successfully!');
}

run();
