import gsap from 'gsap';

export function initServices() {
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    const iconSvgPaths = card.querySelectorAll('.service-icon-wrap svg path');

    card.addEventListener('mouseenter', () => {
      iconSvgPaths.forEach(path => {
        gsap.to(path, {
          strokeWidth: 2,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });

    card.addEventListener('mouseleave', () => {
      iconSvgPaths.forEach(path => {
        gsap.to(path, {
          strokeWidth: 1.5,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  });
}
