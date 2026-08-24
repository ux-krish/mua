import gsap from 'gsap';

export const testimonialData = [
  {
    quote: "Aanya did my bridal makeup and I couldn't have imagined looking more perfect on my big day. She is truly magical!",
    author: "Riddhima Sharma",
    occasion: "Heritage Udaipur Wedding · Lake Palace",
    look: "Royal Kundan & Polki Bridal",
    rating: 5,
    avatar: "/assets/images/client-riddhima-md.webp",
    avatarSm: "/assets/images/client-riddhima-sm.webp",
    avatarLg: "/assets/images/client-riddhima-lg.webp"
  },
  {
    quote: "From the pre-wedding skin prep to the final mandap reveal, Aanya's calm grace and unmatched artistry made me feel like royalty.",
    author: "Priya Mathur",
    occasion: "Mumbai Grand Reception · The St. Regis",
    look: "Champagne Gold Maharani",
    rating: 5,
    avatar: "/assets/images/client-priya-md.webp",
    avatarSm: "/assets/images/client-priya-sm.webp",
    avatarLg: "/assets/images/client-priya-lg.webp"
  },
  {
    quote: "The makeup stayed completely flawless through 8 hours of dancing, tears, and humidity. Truly an elite couture experience.",
    author: "Ananya Kapoor",
    occasion: "Destination Sangeet · Goa Coastal Soirée",
    look: "Velvet Wine & Rose Gold Glam",
    rating: 5,
    avatar: "/assets/images/client-ananya-md.webp",
    avatarSm: "/assets/images/client-ananya-sm.webp",
    avatarLg: "/assets/images/client-ananya-lg.webp"
  }
];

export function initTestimonials() {
  const quoteText = document.querySelector('.quote-text');
  const brideName = document.querySelector('.spotlight-bride-name');
  const weddingDetails = document.querySelector('.spotlight-wedding-details');
  const lookTag = document.querySelector('.spotlight-look-tag');
  const brideAvatar = document.querySelector('.spotlight-bride-avatar img');
  const selectorCards = document.querySelectorAll('.bride-selector-card');
  const dotButtons = document.querySelectorAll('.dot-btn');
  const prevBtn = document.getElementById('testimonials-prev-btn');
  const nextBtn = document.getElementById('testimonials-next-btn');

  let currentIndex = 0;

  function switchTestimonial(index) {
    if (index < 0) index = testimonialData.length - 1;
    if (index >= testimonialData.length) index = 0;
    if (index === currentIndex && quoteText && quoteText.textContent.trim().length > 0) {
      // Just update UI state if needed
    }
    currentIndex = index;

    // Update selector card active classes
    selectorCards.forEach((card, i) => {
      if (i === currentIndex) {
        card.classList.add('is-active');
        card.setAttribute('aria-selected', 'true');
      } else {
        card.classList.remove('is-active');
        card.setAttribute('aria-selected', 'false');
      }
    });

    // Update dot indicators
    dotButtons.forEach((btn, i) => {
      if (i === currentIndex) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    const item = testimonialData[currentIndex];
    const animatedElements = [quoteText, brideName, weddingDetails, lookTag, brideAvatar].filter(Boolean);

    // Smooth cross-fade transition
    gsap.timeline()
      .to(animatedElements, {
        y: -8,
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          if (quoteText) quoteText.textContent = `"${item.quote}"`;
          if (brideName) brideName.textContent = item.author;
          if (weddingDetails) weddingDetails.textContent = item.occasion;
          if (lookTag) lookTag.textContent = item.look;
          if (brideAvatar) {
            brideAvatar.src = item.avatar;
            brideAvatar.srcset = `${item.avatarSm} 360w, ${item.avatar} 720w, ${item.avatarLg} 1200w`;
            brideAvatar.alt = item.author;
          }
        }
      })
      .fromTo(animatedElements, {
        y: 10,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      });
  }

  // Bind selector card clicks
  selectorCards.forEach((card, index) => {
    card.addEventListener('click', () => switchTestimonial(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        switchTestimonial(index);
      }
    });
  });

  // Bind dot clicks
  dotButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => switchTestimonial(index));
  });

  // Bind prev / next buttons
  if (prevBtn) prevBtn.addEventListener('click', () => switchTestimonial(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => switchTestimonial(currentIndex + 1));
}
