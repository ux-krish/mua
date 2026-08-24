export function initMarquee() {
  const track = document.querySelector('.press-marquee-track');
  if (!track) return;

  // Clone groups to guarantee there is never any blank slide on ultra-wide screens (4K / 3840px)
  const groups = track.querySelectorAll('.press-marquee-group');
  if (groups.length === 2) {
    groups.forEach(g => {
      const clone = g.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }
}
