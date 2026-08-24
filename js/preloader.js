import gsap from 'gsap';

export function initPreloader(onCompleteCallback) {
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloader-counter');
  const barFillEl = document.getElementById('preloader-bar-fill');
  const pathEl = document.querySelector('.preloader-logo-svg path');

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasVisited = sessionStorage.getItem('luxe_visited');

  if (prefersReducedMotion || hasVisited) {
    if (preloader) {
      preloader.style.display = 'none';
      preloader.classList.add('is-hidden');
    }
    if (onCompleteCallback) onCompleteCallback();
    return;
  }

  // Set session storage
  sessionStorage.setItem('luxe_visited', 'true');

  // Setup Logo SVG Stroke
  if (pathEl) {
    const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 300;
    gsap.set(pathEl, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1
    });

    gsap.to(pathEl, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: 'power2.inOut'
    });
  }

  // Real Asset Preload Tracking
  const images = Array.from(document.querySelectorAll('img')).slice(0, 8);
  let loadedCount = 0;
  const totalCount = Math.max(images.length, 1);

  const updateProgress = (targetPercent, duration = 0.3) => {
    const currentVal = { val: parseInt(counterEl ? counterEl.textContent : '0', 10) || 0 };
    gsap.to(currentVal, {
      val: targetPercent,
      duration: duration,
      ease: 'power1.out',
      onUpdate: () => {
        const rounded = Math.round(currentVal.val);
        if (counterEl) counterEl.textContent = rounded;
        if (barFillEl) barFillEl.style.width = `${rounded}%`;
      }
    });
  };

  const imagePromises = images.map(img => {
    return new Promise(resolve => {
      if (img.complete) {
        loadedCount++;
        updateProgress(Math.round((loadedCount / totalCount) * 100));
        resolve();
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          updateProgress(Math.round((loadedCount / totalCount) * 100));
          resolve();
        });
        img.addEventListener('error', () => {
          loadedCount++;
          updateProgress(Math.round((loadedCount / totalCount) * 100));
          resolve();
        });
      }
    });
  });

  // Minimum wait time for smooth luxury intro
  const minTimer = new Promise(resolve => setTimeout(resolve, 1400));

  Promise.all([...imagePromises, minTimer]).then(() => {
    updateProgress(100, 0.4);

    setTimeout(() => {
      // Curtain Open Animation (Obsidian panels wipe apart)
      const tl = gsap.timeline({
        onComplete: () => {
          if (preloader) {
            preloader.classList.add('is-hidden');
            preloader.style.display = 'none';
          }
          if (onCompleteCallback) onCompleteCallback();
        }
      });

      tl.to('.preloader-content', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.in'
      })
      .to('.curtain-panel--top', {
        yPercent: -100,
        duration: 1.1,
        ease: 'power4.inOut'
      }, '-=0.2')
      .to('.curtain-panel--bottom', {
        yPercent: 100,
        duration: 1.1,
        ease: 'power4.inOut'
      }, '<');
    }, 450);
  });
}
