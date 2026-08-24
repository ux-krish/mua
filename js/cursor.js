import gsap from 'gsap';

export function initCursor() {
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouch || prefersReducedMotion) return;

  const dot = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.cursor-follower');
  const cursorText = document.querySelector('.cursor-text');

  if (!dot || !follower) return;

  // Set centered origin and hide until first mouse interaction
  gsap.set([dot, follower], {
    xPercent: -50,
    yPercent: -50,
    opacity: 0,
    pointerEvents: 'none'
  });

  // quickTo physics for ultra smooth tracking
  const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
  const followerX = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power3.out' });
  const followerY = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power3.out' });

  let hasMoved = false;

  window.addEventListener('mousemove', (e) => {
    if (!hasMoved) {
      hasMoved = true;
      gsap.to([dot, follower], { opacity: 1, duration: 0.3 });
    }
    dotX(e.clientX);
    dotY(e.clientY);
    followerX(e.clientX);
    followerY(e.clientY);
  });

  document.documentElement.addEventListener('mouseleave', () => {
    gsap.to([dot, follower], { opacity: 0, duration: 0.3 });
  });

  document.documentElement.addEventListener('mouseenter', () => {
    if (hasMoved) {
      gsap.to([dot, follower], { opacity: 1, duration: 0.3 });
    }
  });

  // State Triggers
  const viewElements = document.querySelectorAll('[data-cursor="view"]');
  viewElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.classList.add('is-hovering-view');
      if (cursorText) cursorText.textContent = 'VIEW';
    });
    el.addEventListener('mouseleave', () => {
      follower.classList.remove('is-hovering-view');
      if (cursorText) cursorText.textContent = '';
    });
  });

  const linkElements = document.querySelectorAll('a, button, .service-card, .timeline-step-card, .why-card');
  linkElements.forEach(el => {
    if (!el.hasAttribute('data-cursor')) {
      el.addEventListener('mouseenter', () => {
        follower.classList.add('is-hovering-link');
      });
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('is-hovering-link');
      });
    }
  });

  // Magnetic CTAs (only for fine pointer devices like mouse, not touch)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    magneticButtons.forEach(btn => {
      const textEl = btn.querySelector('.btn-text') || btn;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;

        gsap.to(textEl, {
          x: relX * 0.35,
          y: relY * 0.35,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(textEl, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });
  }
}
