import gsap from 'gsap';

export const testimonialData = [
  {
    quote: "Aanya did my bridal makeup and I couldn't have imagined looking more perfect on my big day. She is truly magical!",
    author: "Riddhima S.",
    occasion: "Heritage Udaipur Wedding"
  },
  {
    quote: "From the pre-wedding skin prep to the final mandap reveal, Aanya's calm grace and unmatched artistry made me feel like royalty.",
    author: "Priya M.",
    occasion: "Mumbai Grand Reception"
  },
  {
    quote: "The makeup stayed completely flawless through 8 hours of dancing, tears, and humidity. Truly an elite couture experience.",
    author: "Ananya K.",
    occasion: "Destination Sangeet"
  }
];

export function initTestimonials() {
  const quoteText = document.querySelector('.quote-text');
  const quoteAuthor = document.querySelector('.quote-author');
  const avatarButtons = document.querySelectorAll('.avatar-btn');
  const dotButtons = document.querySelectorAll('.dot-btn');

  let currentIndex = 0;

  function switchTestimonial(index) {
    if (index === currentIndex) return;
    currentIndex = index;

    // Update Avatar active classes
    avatarButtons.forEach((btn, i) => {
      if (i === currentIndex) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    // Update Dot active classes
    dotButtons.forEach((btn, i) => {
      if (i === currentIndex) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });

    const item = testimonialData[currentIndex];

    // Smooth cross-fade text swap
    gsap.timeline()
      .to([quoteText, quoteAuthor], {
        y: -10,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          if (quoteText) quoteText.textContent = `"${item.quote}"`;
          if (quoteAuthor) quoteAuthor.textContent = `— ${item.author.toUpperCase()} (${item.occasion.toUpperCase()})`;
        }
      })
      .fromTo([quoteText, quoteAuthor], {
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

  // Bind avatar clicks
  avatarButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => switchTestimonial(index));
  });

  // Bind dot clicks
  dotButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => switchTestimonial(index));
  });
}
