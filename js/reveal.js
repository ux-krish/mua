import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveals() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Set dynamic year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.style.opacity = '1';
      el.style.clipPath = 'none';
      el.style.transform = 'none';
    });
    return;
  }

  // Consistent, buttery-smooth Scroll-Reveal
  const revealElements = gsap.utils.toArray('[data-reveal]');
  revealElements.forEach(el => {
    gsap.fromTo(el,
      {
        y: 24,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        }
      }
    );
  });

  // Image subtle scale settle (1.04 -> 1)
  const revealImages = gsap.utils.toArray('[data-reveal-image]');
  revealImages.forEach(img => {
    gsap.fromTo(img,
      { scale: 1.04, opacity: 0.85 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: img,
          start: 'top 88%',
          once: true
        }
      }
    );
  });

  // Stat Counter Tweens (§4.8)
  const statElements = document.querySelectorAll('[data-counter-target]');
  statElements.forEach(el => {
    const target = parseInt(el.getAttribute('data-counter-target'), 10) || 0;
    const suffix = el.getAttribute('data-counter-suffix') || '+';
    const counterObj = { count: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(counterObj, {
          count: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(counterObj.count)}${suffix}`;
          }
        });
      }
    });
  });

  // Artist Portrait Mobile Tap Toggle
  const aboutCard = document.querySelector('.about-image-card');
  if (aboutCard) {
    aboutCard.addEventListener('click', () => {
      aboutCard.classList.toggle('is-hovered');
    });
  }
}
