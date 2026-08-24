import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initKajalLines() {
  const kajalPaths = document.querySelectorAll('.kajal-svg path');

  kajalPaths.forEach(pathEl => {
    const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 300;

    gsap.set(pathEl, {
      strokeDasharray: length,
      strokeDashoffset: length,
      fill: 'transparent'
    });

    ScrollTrigger.create({
      trigger: pathEl,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(pathEl, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.out'
        });
      }
    });
  });
}
