import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/assets/images');
const sourceImg = path.resolve('desktop-mockup.png');

async function run() {
  console.log('Extracting HD assets from desktop-mockup.png...');

  // 1. Hero Bridal
  await sharp(sourceImg)
    .extract({ left: 395, top: 0, width: 438, height: 470 })
    .resize(1600, 1750, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1, m1: 1, m2: 2 })
    .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'hero-bridal.jpg'));
    
  // 2. Artist Aanya (B&W)
  await sharp(sourceImg)
    .extract({ left: 390, top: 1070, width: 235, height: 265 })
    .resize(800, 900, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1 })
    .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'artist-aanya.jpg'));
    
  // 3. Booking Brushes
  await sharp(sourceImg)
    .extract({ left: 0, top: 1610, width: 335, height: 230 })
    .resize(1200, 800, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1 })
    .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'booking-brushes.jpg'));

  // 4. Testimonials
  await sharp(sourceImg)
    .extract({ left: 145, top: 1460, width: 95, height: 95 })
    .resize(400, 400, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.5 })
    .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'client-riddhima.jpg'));

  await sharp(sourceImg)
    .extract({ left: 50, top: 1465, width: 80, height: 80 })
    .resize(400, 400, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.5 })
    .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'client-priya.jpg'));
    
  // Duplicate one of them for ananya (since she's in the HTML)
  await sharp(sourceImg)
    .extract({ left: 145, top: 1460, width: 95, height: 95 })
    .resize(400, 400, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .flip() // just to make it slightly different
    .sharpen({ sigma: 0.5 })
    .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
    .toFile(path.join(outDir, 'client-ananya.jpg'));

  // 5. Portfolio Images (Estimated coordinates based on 833 width)
  // Let's refine the y-coordinate. A Glimpse of my work text is ~y=680. Cards start ~720, height ~230.
  const pTop = 730;
  const pHeight = 230;
  const pWidth = 140;
  
  const portfolios = [
    { name: 'portfolio-1.jpg', left: 47 },
    { name: 'portfolio-2.jpg', left: 196 },
    { name: 'portfolio-3.jpg', left: 345 },
    { name: 'portfolio-4.jpg', left: 495 },
    { name: 'portfolio-5.jpg', left: 644 },
    { name: 'portfolio-6.jpg', left: 47 } // Fallback to 1 for 6
  ];
  
  for (const item of portfolios) {
    try {
      await sharp(sourceImg)
        .extract({ left: item.left, top: pTop, width: pWidth, height: pHeight })
        .resize(1000, 1400, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
        .sharpen({ sigma: 1 })
        .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
        .toFile(path.join(outDir, item.name));
    } catch (e) {
       console.error("Error cropping", item.name, e);
    }
  }

  console.log('All HD images extracted from desktop-mockup.png successfully!');
}

run().catch(console.error);
