import gsap from 'gsap';

export function initMarquee() {
  const track = document.querySelector('.press-marquee-track');
  if (!track) return;

  const tween = gsap.to(track, {
    xPercent: -50,
    duration: 25,
    ease: 'none',
    repeat: -1
  });

  track.addEventListener('mouseenter', () => tween.pause());
  track.addEventListener('mouseleave', () => tween.play());
}
