export function initHeroVideo() {
  const frame = document.getElementById('hero-interactive-frame');
  if (!frame) return;

  const video = frame.querySelector('.hero-frame-video');
  const gif = frame.querySelector('.hero-frame-gif');
  const badgeText = frame.querySelector('.motion-badge-text');
  const img = frame.querySelector('.hero-frame-img');

  if (video) {
    video.muted = true;
    video.volume = 0;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
  }

  const markLoaded = () => {
    frame.classList.add('is-loaded');
  };

  if (img) {
    if (img.complete && img.naturalHeight !== 0) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded, { once: true });
      img.addEventListener('error', markLoaded, { once: true });
    }
  }

  let isHeroHovered = false;

  const playHeroMotion = () => {
    isHeroHovered = true;
    if (badgeText) badgeText.textContent = 'Live Motion';

    // 1. Show GIF instantly with zero latency
    frame.classList.add('is-playing');

    // 2. Play video and promote when buffered
    if (video) {
      if (video.readyState >= 3) {
        frame.classList.add('video-ready');
        try {
          video.currentTime = 0;
          const p = video.play();
          if (p !== undefined) p.catch(() => {});
        } catch (e) {}
      } else {
        const onHeroPlaying = () => {
          if (isHeroHovered) {
            frame.classList.add('video-ready');
          }
        };

        video.addEventListener('playing', onHeroPlaying, { once: true });
        video.addEventListener('canplay', onHeroPlaying, { once: true });

        try {
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              if (isHeroHovered) frame.classList.add('video-ready');
            }).catch(() => {});
          }
        } catch (e) {}
      }
    }
  };

  const pauseHeroMotion = () => {
    isHeroHovered = false;
    frame.classList.remove('is-playing', 'video-ready');
    if (badgeText) badgeText.textContent = 'Hover for Motion';

    if (video) {
      video.pause();
      try { video.currentTime = 0; } catch (e) {}
    }
  };

  frame.addEventListener('mouseenter', playHeroMotion);
  frame.addEventListener('mouseleave', pauseHeroMotion);

  // Mobile / Touch click toggle
  frame.addEventListener('click', () => {
    if (frame.classList.contains('is-playing')) {
      pauseHeroMotion();
    } else {
      playHeroMotion();
    }
  });

  // Auto-pause motion when scrolled past the hero section (Saves mobile battery, CPU & GPU)
  const heroSection = document.getElementById('hero') || frame;
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && frame.classList.contains('is-playing')) {
        pauseHeroMotion();
      }
    });
  }, {
    threshold: 0.15
  });

  heroObserver.observe(heroSection);
}
