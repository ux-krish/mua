export function initHeroVideo() {
  const frame = document.getElementById('hero-interactive-frame');
  if (!frame) return;

  const video = frame.querySelector('.hero-frame-video');
  const badgeText = frame.querySelector('.motion-badge-text');
  if (!video) return;

  // Ensure muted & loop for smooth autoplay
  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  let playPromise = null;

  const playVideo = () => {
    // Reset to beginning on each hover to ensure perfect image-to-video sync
    try {
      video.currentTime = 0;
    } catch (e) {
      // Ignored
    }

    frame.classList.add('is-playing');
    if (badgeText) badgeText.textContent = 'Live Motion';

    try {
      playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy fallback
        });
      }
    } catch (e) {
      // Ignored
    }
  };

  const pauseVideo = () => {
    frame.classList.remove('is-playing');
    if (badgeText) badgeText.textContent = 'Hover for Motion';

    if (playPromise !== undefined) {
      playPromise.then(() => {
        video.pause();
        try { video.currentTime = 0; } catch (e) {}
      }).catch(() => {
        video.pause();
        try { video.currentTime = 0; } catch (e) {}
      });
    } else {
      video.pause();
      try { video.currentTime = 0; } catch (e) {}
    }
  };

  frame.addEventListener('mouseenter', playVideo);
  frame.addEventListener('mouseleave', pauseVideo);

  // Mobile / Touch click toggle
  frame.addEventListener('click', () => {
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });
}
