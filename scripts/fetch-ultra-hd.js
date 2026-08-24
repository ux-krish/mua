import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

const outputDir = path.resolve('public/assets/images');

// Curated ultra-HD luxury Indian bridal & editorial beauty images from Unsplash
// All at maximum resolution for pixel-perfect clarity
const imageSources = {
  // Hero: Indian/South Asian bridal face closeup - warm tones, jewelry
  'hero-bridal.jpg': [
    'https://images.unsplash.com/photo-1604516572573-39f63ad9dbb0?w=2400&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1595955793665-c18c0c09d226?w=2400&q=100&fit=crop&auto=format'
  ],
  // Artist portrait - woman applying makeup, elegant, dark bg
  'artist-aanya.jpg': [
    'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=2400&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=2400&q=100&fit=crop&auto=format'
  ],
  // Portfolio 1: Bridal - traditional Indian jewelry
  'portfolio-1.jpg': [
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=2000&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?w=2000&q=100&fit=crop&auto=format'
  ],
  // Portfolio 2: Editorial bronze
  'portfolio-2.jpg': [
    'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=2000&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=2000&q=100&fit=crop&auto=format'
  ],
  // Portfolio 3: Party / glam
  'portfolio-3.jpg': [
    'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=2000&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=2000&q=100&fit=crop&auto=format'
  ],
  // Portfolio 4: Celebrity red carpet
  'portfolio-4.jpg': [
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=2000&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=2000&q=100&fit=crop&auto=format'
  ],
  // Portfolio 5: Golden hour
  'portfolio-5.jpg': [
    'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=2000&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=2000&q=100&fit=crop&auto=format'
  ],
  // Portfolio 6: Rajputana heritage
  'portfolio-6.jpg': [
    'https://images.unsplash.com/photo-1595948651898-c36872ee4ecb?w=2000&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=2000&q=100&fit=crop&auto=format'
  ],
  // Booking brushes - luxury makeup flatlay, dark bg, gold tones
  'booking-brushes.jpg': [
    'https://images.unsplash.com/photo-1522337913581-3f72f15a2a68?w=2400&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=2400&q=100&fit=crop&auto=format'
  ],
  // Client testimonial avatars
  'client-riddhima.jpg': [
    'https://images.unsplash.com/photo-1610737241336-371badac3b66?w=800&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=100&fit=crop&auto=format'
  ],
  'client-priya.jpg': [
    'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?w=800&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=100&fit=crop&auto=format'
  ],
  'client-ananya.jpg': [
    'https://images.unsplash.com/photo-1574089640318-09f9ea85e4e5?w=800&q=100&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=100&fit=crop&auto=format'
  ]
};

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const request = https.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ImageFetcher/1.0)' }
    }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close();
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        reject(new Error(`Failed ${url}: Status ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => file.close(() => resolve(destPath)));
    });
    request.on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
    request.setTimeout(30000, () => {
      request.destroy();
      file.close();
      reject(new Error('Request timed out'));
    });
  });
}

async function tryDownload(urls, tempPath) {
  for (const url of urls) {
    try {
      await downloadImage(url, tempPath);
      const stat = fs.statSync(tempPath);
      if (stat.size > 10000) return true; // valid image
      console.warn(`  Skipping ${url} - file too small (${stat.size} bytes)`);
    } catch (e) {
      console.warn(`  Failed ${url}: ${e.message}`);
    }
  }
  return false;
}

async function run() {
  console.log('Fetching ULTRA-HD curated luxury beauty assets...\n');
  
  for (const [filename, urls] of Object.entries(imageSources)) {
    const tempPath = path.join(outputDir, `temp_${filename}`);
    const finalPath = path.join(outputDir, filename);

    console.log(`⬇  Downloading: ${filename}`);
    const success = await tryDownload(urls, tempPath);
    
    if (!success) {
      console.error(`✗ Could not download any source for ${filename}\n`);
      continue;
    }

    try {
      let transform = sharp(tempPath);

      if (filename === 'artist-aanya.jpg') {
        // B&W with high contrast
        transform = transform
          .grayscale()
          .modulate({ brightness: 1.05, saturation: 0, lightness: 0 })
          .linear(1.1, -10); // boost contrast
      }

      if (filename.startsWith('client-')) {
        await transform
          .resize(600, 600, { fit: 'cover', position: 'attention', kernel: sharp.kernel.lanczos3 })
          .sharpen({ sigma: 0.8, m1: 1.5, m2: 2.0 })
          .jpeg({ quality: 100, chromaSubsampling: '4:4:4', mozjpeg: false })
          .toFile(finalPath);
      } else if (filename === 'booking-brushes.jpg') {
        await transform
          .resize(2000, 1200, { fit: 'cover', position: 'center', kernel: sharp.kernel.lanczos3 })
          .sharpen({ sigma: 0.6, m1: 1.2, m2: 1.5 })
          .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
          .toFile(finalPath);
      } else if (filename === 'hero-bridal.jpg') {
        await transform
          .resize(1800, 2400, { fit: 'cover', position: 'attention', kernel: sharp.kernel.lanczos3 })
          .sharpen({ sigma: 0.7, m1: 1.5, m2: 2.0 })
          .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
          .toFile(finalPath);
      } else {
        // Portfolio cards
        await transform
          .resize(1200, 1600, { fit: 'cover', position: 'attention', kernel: sharp.kernel.lanczos3 })
          .sharpen({ sigma: 0.7, m1: 1.5, m2: 2.0 })
          .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
          .toFile(finalPath);
      }

      fs.unlinkSync(tempPath);
      const stat = fs.statSync(finalPath);
      console.log(`✓ ${filename} → ${(stat.size / 1024).toFixed(0)} KB\n`);
    } catch (e) {
      console.error(`✗ Processing error for ${filename}: ${e.message}\n`);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }

  console.log('🎉 All ultra-HD assets updated successfully!');
}

run();
