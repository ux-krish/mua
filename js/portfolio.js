import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { isHighEndDevice } from './adaptive-media.js';

gsap.registerPlugin(Flip);

const base = import.meta.env.BASE_URL || '/';
const asset = (p) => `${base.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;

// Comprehensive Portfolio Case Study Data — Dual Media (MP4 for high-end CPU/bandwidth, GIF for low-speed/low-CPU)
export const portfolioData = [
  {
    id: 'look-1',
    title: 'The Royal Kundan & Polki Bride',
    category: 'bridal',
    categoryLabel: 'Royal Bridal',
    imageBase: asset('/assets/images/48495647-woman-9419481'),
    image: asset('/assets/images/48495647-woman-9419481-md.webp'),
    video: asset('/assets/videos/show_a_smile_1080p_202608240523_480p.mp4'),
    gif: asset('/assets/videos/show_a_smile_1080p_202608240523.gif'),
    story: 'Designed for a regal heritage palace wedding in Udaipur. Features an incandescent dewy base, smokey almond-eye contour, and bespoke crimson lip framing an authentic Sabyasachi zardozi drape.',
    skinFinish: 'Luminous 24K Polki HD Glow',
    jewellery: 'Heritage Uncut Polki Matha Patti & Choker',
    hair: 'Crimson Rose Sculpted Low Bridal Bun',
    products: 'Pat McGrath Sublime Skin, Charlotte Tilbury, Tom Ford'
  },
  {
    id: 'look-2',
    title: 'Antique Champagne Gold Maharani',
    category: 'bridal',
    categoryLabel: 'Royal Bridal',
    imageBase: asset('/assets/images/48495647-bride-9414692_1920'),
    image: asset('/assets/images/48495647-bride-9414692_1920-md.webp'),
    video: asset('/assets/videos/smile_her_1080p_202608240531_480p.mp4'),
    gif: asset('/assets/videos/smile_her_1080p_202608240531.gif'),
    story: 'Crafted for a majestic evening varmala ceremony in Jaipur. Warm molten-gold eyeshadow, defined graphic wing, and sculpted velvet nude-rose lips complementing antique gold zardozi.',
    skinFinish: 'Micro-Dew Velvet Satin Base',
    jewellery: 'Grand Kundan Waterfall Choker & Borla Tikka',
    hair: 'Royal Middle-Parted Dupatta Crown Bun',
    products: 'Dior Backstage, NARS Radiant Longwear, Huda Beauty'
  },
  {
    id: 'look-3',
    title: 'Pastel Diamond & Rose Quartz Glam',
    category: 'party',
    categoryLabel: 'Sangeet & Reception',
    imageBase: asset('/assets/images/48495647-woman-9417377'),
    image: asset('/assets/images/48495647-woman-9417377-md.webp'),
    video: asset('/assets/videos/smile_her_202608240536_480p.mp4'),
    gif: asset('/assets/videos/smile_her_202608240536.gif'),
    story: 'A modern fairytale look designed for an extravagant Mumbai reception. Soft frosted rose eyelids with delicate silver micro-shimmer, glowing glass skin, and glossy terracotta blush.',
    skinFinish: 'Glass Skin Radiance with Rose Quartz Illuminator',
    jewellery: 'Tiered Rose-Cut Diamond Collar & Chandelier Earrings',
    hair: 'Soft Romantic Face-Framing Waves',
    products: 'Westman Atelier, Hourglass Ambient Lighting, Rare Beauty'
  },
  {
    id: 'look-4',
    title: 'Velvet Wine & Emerald Sangeet Soirée',
    category: 'party',
    categoryLabel: 'Sangeet & Reception',
    imageBase: asset('/assets/images/48495647-bride-9417324_1920'),
    image: asset('/assets/images/48495647-bride-9417324_1920-md.webp'),
    video: asset('/assets/videos/smile_her_1080p_202608240532_480p.mp4'),
    gif: asset('/assets/videos/smile_her_1080p_202608240532.gif'),
    story: 'Created for a high-energy celebrity Sangeet night. Features multi-dimensional copper-bronze foil lids, smudged kohl waterline, and a deep berry velvet matte lip paired with emerald polki.',
    skinFinish: 'Sweat-Resistant 16-Hour HD Matte Finish',
    jewellery: 'Emerald Drop Polki Choker & Maang Tikka',
    hair: 'Glossy Hollywood Waves with Emerald Clips',
    products: 'Estée Lauder Double Wear, Patrick Ta, Danessa Myricks'
  },
  {
    id: 'look-5',
    title: 'Sculpted Sunset Bronze & Rose Gold',
    category: 'celebrity',
    categoryLabel: 'Celebrity & Red Carpet',
    imageBase: asset('/assets/images/48495647-woman-9417380_1920'),
    image: asset('/assets/images/48495647-woman-9417380_1920-md.webp'),
    video: asset('/assets/videos/smile_her_1080p_202608240529_480p.mp4'),
    gif: asset('/assets/videos/smile_her_1080p_202608240529.gif'),
    story: 'Featured on the red carpet and bridal fashion week. Bronzed cheekbone sculpting, warm gold halo eyes, and crisp lip architecture with high-shine peach-nude gloss.',
    skinFinish: 'HD 4K Camera-Ready Radiance',
    jewellery: 'Rose Gold Temple Choker & Filigree Chaandbalis',
    hair: 'Sleek Editorial Crown Bun with Gold Pins',
    products: 'Fenty Beauty, Anastasia Beverly Hills, MAC Studio Fix'
  },
  {
    id: 'look-6',
    title: 'South Indian Temple Gold & Silk Heritage',
    category: 'bridal',
    categoryLabel: 'Royal Bridal',
    imageBase: asset('/assets/images/iqraagrapix-wedding-9589653_1920'),
    image: asset('/assets/images/iqraagrapix-wedding-9589653_1920-md.webp'),
    video: asset('/assets/videos/smile_her_1080p_202608240530_480p.mp4'),
    gif: asset('/assets/videos/smile_her_1080p_202608240530.gif'),
    story: 'A magnificent heritage South Indian bridal look in ivory and gold Kanjivaram silk, layered 22K antique temple jewellery, and sculpted winged eyes with radiant coral lips.',
    skinFinish: 'Traditional Illuminated Dewy Finish',
    jewellery: '22K Antique Temple Gold Choker, Kasu Mala & Maang Tikka',
    hair: 'Classic Low Bun with Fresh Mogra Garland',
    products: 'Kryolan HD, Charlotte Tilbury, Urban Decay All Nighter'
  },
  {
    id: 'look-7',
    title: 'Crimson Navratan Zardozi Splendor',
    category: 'bridal',
    categoryLabel: 'Royal Bridal',
    imageBase: asset('/assets/images/48495647-bride-9414715_1920'),
    image: asset('/assets/images/48495647-bride-9414715_1920-md.webp'),
    video: asset('/assets/videos/smile_her_202608240537_480p.mp4'),
    gif: asset('/assets/videos/smile_her_202608240537.gif'),
    story: 'A showstopping North Indian bridal look featuring hand-cut Navratan gemstones, graphic winged liner with double cut crease, and rich crimson lip contour designed for 4K video.',
    skinFinish: 'Ultra-Flawless Camera-Proof HD Base',
    jewellery: 'Multicolor Gemstone Navratan Polki Choker & Oversized Nath',
    hair: 'Royal Traditional Dupatta Draped Bun',
    products: 'Pat McGrath Mothership, Dior Forever, Huda Beauty'
  },
  {
    id: 'look-8',
    title: 'Silver Starlight Cut-Crease Editorial',
    category: 'editorial',
    categoryLabel: 'Fashion Editorial',
    imageBase: asset('/assets/images/magicalbrushes-indian-woman-7137926_1920'),
    image: asset('/assets/images/magicalbrushes-indian-woman-7137926_1920-md.webp'),
    video: asset('/assets/videos/smile_her_202608240535_480p.mp4'),
    gif: asset('/assets/videos/smile_her_202608240535.gif'),
    story: 'An avant-garde high-fashion editorial look featuring high-impact silver foil pigments, warm sunset transition shading, glowing strobed cheekbones, and hot pink velvet pout.',
    skinFinish: 'Editorial Strobe & High-Gloss Finish',
    jewellery: 'Delicate Pearl Choker & Kundan Nath Ring',
    hair: 'Textured Runway Tresses with Tendrils',
    products: 'Danessa Myricks ColorFix, Natasha Denona, NARS'
  },
  {
    id: 'look-9',
    title: 'Traditional Bengali Chandan Heritage',
    category: 'bridal',
    categoryLabel: 'Royal Bridal',
    imageBase: asset('/assets/images/magicalbrushes-woman-6555890_1920'),
    image: asset('/assets/images/magicalbrushes-woman-6555890_1920-md.webp'),
    video: asset('/assets/videos/smile_her_202608240547_480p.mp4'),
    gif: asset('/assets/videos/smile_her_202608240547.gif'),
    story: 'A timeless cultural ode honoring classic Bengali bridal beauty. Handcrafted chandan sandalwood forehead artwork, bold winged eyes, radiant blush, and vibrant bridal sindoor.',
    skinFinish: 'Traditional Illuminated Dewy Finish',
    jewellery: '22K Heritage Gold Sita Haar & Mukut Tikka',
    hair: 'Classic Top Bun with Fresh White Mogra Garland',
    products: 'Kryolan HD, Charlotte Tilbury, Urban Decay All Nighter'
  }
];

export function initPortfolio() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = Array.from(document.querySelectorAll('.portfolio-card'));
  const emptyState = document.querySelector('.portfolio-empty-state');
  const showingCountEl = document.getElementById('portfolio-showing-count');
  const totalCountEl = document.getElementById('portfolio-total-count');

  const modal = document.getElementById('case-study-modal');
  const modalCloseBtn = document.querySelector('.case-study-modal .modal-close-btn');
  const watchShowreelBtns = document.querySelectorAll('.btn-play-showreel, [data-action="showreel"]');


  let currentFilter = 'all';
  let isFiltering = false;
  let lastFocusedElement = null;

  function updateCounts(visibleCount) {
    if (showingCountEl) showingCountEl.textContent = visibleCount;
    if (totalCountEl) totalCountEl.textContent = cards.length;
  }

  // Initial count setup
  updateCounts(cards.length);

  // --- Butter-Smooth GSAP Grid Filter Animation (Zero Layout Jump) ---
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      if (filter === currentFilter || isFiltering) return;

      isFiltering = true;
      currentFilter = filter;

      // Stop any playing card videos before filtering
      cards.forEach(card => {
        card.classList.remove('is-playing');
        const v = card.querySelector('.card-video');
        if (v) { try { v.pause(); v.currentTime = 0; } catch (e) {} }
      });

      // Update active filter button state
      filterButtons.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      const cardsToHide = [];
      const cardsToShow = [];

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const matches = filter === 'all' || cat === filter;
        const isCurrentlyHidden = card.classList.contains('is-hidden');

        if (matches && isCurrentlyHidden) {
          // Need to reveal
          cardsToShow.push(card);
        } else if (!matches && !isCurrentlyHidden) {
          // Need to hide
          cardsToHide.push(card);
        }
      });

      function revealCards() {
        // Make cards visible in DOM before animating in
        cardsToShow.forEach(c => {
          c.classList.remove('is-hidden');
          c.classList.add('is-filtering');
        });

        // Count visible cards for footer
        const visibleCards = cards.filter(c => !c.classList.contains('is-hidden'));
        updateCounts(visibleCards.length);

        if (emptyState) {
          emptyState.classList.toggle('is-visible', visibleCards.length === 0);
        }

        if (cardsToShow.length > 0) {
          // Force a reflow so display:none->block registers before GSAP runs
          cardsToShow.forEach(c => c.offsetHeight);

          gsap.fromTo(cardsToShow, {
            opacity: 0,
            y: 30,
            scale: 0.94,
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.055,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            onComplete: () => {
              cardsToShow.forEach(c => c.classList.remove('is-filtering'));
              isFiltering = false;
            }
          });
        } else {
          isFiltering = false;
        }
      }

      // Animate out hidden cards, then collapse them from grid, then reveal new ones
      if (cardsToHide.length > 0) {
        cardsToHide.forEach(c => c.classList.add('is-filtering'));
        gsap.to(cardsToHide, {
          opacity: 0,
          y: -15,
          scale: 0.92,
          duration: 0.28,
          ease: 'power2.in',
          onComplete: () => {
            cardsToHide.forEach(c => {
              c.classList.add('is-hidden');
              c.classList.remove('is-filtering');
              gsap.set(c, { clearProps: 'all' });
            });
            revealCards();
          }
        });
      } else {
        revealCards();
      }
    });
  });

  // --- Portfolio Card Media Skeleton & Loading Handler ---
  cards.forEach(card => {
    const media = card.querySelector('.card-media');
    if (!media) return;

    // Ensure skeleton exists
    let skeleton = media.querySelector('.card-skeleton');
    if (!skeleton) {
      skeleton = document.createElement('div');
      skeleton.className = 'card-skeleton';
      skeleton.setAttribute('aria-hidden', 'true');
      skeleton.innerHTML = `
        <div class="skeleton-pill"></div>
        <div class="skeleton-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
      `;
      media.prepend(skeleton);
    }

    const img = media.querySelector('.card-img');
    if (img) {
      if (img.complete && img.naturalHeight !== 0) {
        media.classList.add('is-loaded');
      } else {
        img.addEventListener('load', () => {
          media.classList.add('is-loaded');
        }, { once: true });
        img.addEventListener('error', () => {
          media.classList.add('is-loaded');
        }, { once: true });
      }
    }
  });

  const isHighEnd = isHighEndDevice();

  // --- Lazy Dual-Layer Adaptive Media Setup (Hydrates only on scroll proximity for 95%+ PageSpeed) ---
  const mediaObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const projectId = card.getAttribute('data-project-id');
        const data = portfolioData.find(item => item.id === projectId);
        const media = card.querySelector('.card-media');
        if (media && data) {
          // 1. Lazy instantiate GIF element
          let gif = media.querySelector('.card-gif');
          if (!gif) {
            gif = document.createElement('img');
            gif.className = 'card-gif';
            gif.alt = `${data.title} motion`;
            gif.loading = 'lazy';
            gif.decoding = 'async';
            gif.src = data.gif;
            media.appendChild(gif);
          }

          // 2. Lazy instantiate Video element
          let video = media.querySelector('.card-video');
          if (!video) {
            video = document.createElement('video');
            video.className = 'card-video';
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'none';
            video.src = data.video;
            media.appendChild(video);
          }
        }
        observer.unobserve(card);
      }
    });
  }, { rootMargin: '300px 0px' });

  cards.forEach(card => mediaObserver.observe(card));

  // --- Efficient Card Hover & Touch Event Listeners (Shows GIF instantly until Video is ready) ---
  cards.forEach(card => {
    let isHovered = false;

    function startCardAnimation() {
      isHovered = true;
      const video = card.querySelector('.card-video');

      // 1. Instantly start playing state (shows the GIF immediately)
      card.classList.add('is-playing');

      // 2. If video element is present, initiate playback and promote to video when ready
      if (video) {
        if (video.readyState >= 3) {
          card.classList.add('video-ready');
          try {
            video.currentTime = 0;
            video.muted = true;
            video.volume = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) playPromise.catch(() => {});
          } catch (e) {}
        } else {
          const onCanPlay = () => {
            if (isHovered) {
              card.classList.add('video-ready');
            }
          };

          video.addEventListener('playing', onCanPlay, { once: true });
          video.addEventListener('canplay', onCanPlay, { once: true });

          try {
            video.currentTime = 0;
            video.muted = true;
            video.volume = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.then(() => {
                if (isHovered) card.classList.add('video-ready');
              }).catch(() => {});
            }
          } catch (e) {}
        }
      }
    }

    function stopCardAnimation() {
      isHovered = false;
      card.classList.remove('is-playing', 'video-ready');

      const video = card.querySelector('.card-video');
      if (video) {
        video.pause();
        try { video.currentTime = 0; } catch (e) {}
      }
    }

    card.addEventListener('mouseenter', startCardAnimation);
    card.addEventListener('mouseleave', stopCardAnimation);

    // Touch support for mobile devices
    card.addEventListener('touchstart', () => {
      // Pause other cards if any
      cards.forEach(c => {
        if (c !== card) {
          c.classList.remove('is-playing', 'video-ready');
          const v = c.querySelector('.card-video');
          if (v) { v.pause(); v.currentTime = 0; }
        }
      });
      if (card.classList.contains('is-playing')) {
        stopCardAnimation();
      } else {
        startCardAnimation();
      }
    }, { passive: true });

    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      openCaseStudy(projectId, card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = card.getAttribute('data-project-id');
        openCaseStudy(projectId, card);
      }
    });
  });

  // --- Case Study Modal: Instant GIF preview with video promotion ---
  const modalMedia = document.getElementById('modal-case-media');
  const modalBody = document.querySelector('.case-study-body');
  const modalImage = document.getElementById('modal-case-image');
  const modalVideo = document.getElementById('modal-case-video');
  const modalGif = document.getElementById('modal-case-gif');
  const modalMotionText = document.querySelector('.modal-motion-text');

  function startModalAnimation() {
    if (!modalMedia) return;
    if (modalMotionText) modalMotionText.textContent = 'Live Motion';

    // Show GIF immediately
    modalMedia.classList.add('is-playing');

    if (modalVideo) {
      if (modalVideo.readyState >= 3) {
        modalMedia.classList.add('video-ready');
        try {
          modalVideo.currentTime = 0;
          modalVideo.muted = true;
          modalVideo.volume = 0;
          const p = modalVideo.play();
          if (p !== undefined) p.catch(() => {});
        } catch (e) {}
      } else {
        const onModalCanPlay = () => {
          if (modalMedia.classList.contains('is-playing')) {
            modalMedia.classList.add('video-ready');
          }
        };
        modalVideo.addEventListener('playing', onModalCanPlay, { once: true });
        modalVideo.addEventListener('canplay', onModalCanPlay, { once: true });

        try {
          modalVideo.currentTime = 0;
          modalVideo.muted = true;
          modalVideo.volume = 0;
          const p = modalVideo.play();
          if (p !== undefined) {
            p.then(() => {
              if (modalMedia.classList.contains('is-playing')) {
                modalMedia.classList.add('video-ready');
              }
            }).catch(() => {});
          }
        } catch (e) {}
      }
    }
  }

  function stopModalAnimation() {
    if (!modalMedia) return;
    modalMedia.classList.remove('is-playing', 'video-ready');
    if (modalMotionText) modalMotionText.textContent = 'Hover / Tap for Motion';
    if (modalVideo) {
      modalVideo.pause();
      try { modalVideo.currentTime = 0; } catch (e) {}
    }
  }

  // Hover or touch left image -> start motion
  modalMedia?.addEventListener('mouseenter', startModalAnimation);
  modalMedia?.addEventListener('mouseleave', stopModalAnimation);
  modalMedia?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (modalMedia.classList.contains('is-playing')) {
      stopModalAnimation();
    } else {
      startModalAnimation();
    }
  });

  // Touch or hover right side -> stop motion
  modalBody?.addEventListener('mouseenter', stopModalAnimation);
  modalBody?.addEventListener('click', stopModalAnimation);
  modalBody?.addEventListener('touchstart', stopModalAnimation, { passive: true });

  function openCaseStudy(projectId, triggeringEl) {
    const data = portfolioData.find(item => item.id === projectId) || portfolioData[0];
    lastFocusedElement = triggeringEl;

    const modalCategory = document.getElementById('modal-case-category');
    const modalTitle = document.getElementById('modal-case-title');
    const modalStory = document.getElementById('modal-case-story');
    const modalSkin = document.getElementById('modal-case-skin');
    const modalJewellery = document.getElementById('modal-case-jewellery');
    const modalHair = document.getElementById('modal-case-hair');
    const modalProducts = document.getElementById('modal-case-products');
    const modalWaBtn = document.getElementById('modal-case-wa-btn');

    if (modalImage) {
      modalImage.src = `${data.imageBase}-md.webp`;
      modalImage.srcset = `${data.imageBase}-sm.webp 360w, ${data.imageBase}-md.webp 720w, ${data.imageBase}-lg.webp 1200w`;
      modalImage.alt = data.title;
    }

    if (modalGif) {
      modalGif.style.display = 'block';
      modalGif.src = data.gif;
    }

    if (modalVideo) {
      modalVideo.style.display = 'block';
      modalVideo.src = data.video;
      modalVideo.muted = true;
      modalVideo.volume = 0;
      modalVideo.load();
    }

    stopModalAnimation();

    if (modalCategory) modalCategory.textContent = data.categoryLabel;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalStory) modalStory.textContent = data.story;
    if (modalSkin) modalSkin.textContent = data.skinFinish;
    if (modalJewellery) modalJewellery.textContent = data.jewellery;
    if (modalHair) modalHair.textContent = data.hair;
    if (modalProducts) modalProducts.textContent = data.products;

    if (modalWaBtn) {
      const message = encodeURIComponent(`Hi Aanya, I was admiring "${data.title}" in your portfolio and would love to check availability for a similar look!`);
      modalWaBtn.href = `https://wa.me/919876543210?text=${message}`;
    }

    if (modal) {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      modalCloseBtn?.focus();

      gsap.fromTo('.case-study-modal', {
        y: 40,
        opacity: 0,
        scale: 0.96
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out'
      });
    }
  }

  function closeCaseStudy() {
    stopModalAnimation();

    if (modal && modal.classList.contains('is-active')) {
      gsap.to('.case-study-modal', {
        y: 30,
        opacity: 0,
        scale: 0.96,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          modal.classList.remove('is-active');
          document.body.style.overflow = '';
          lastFocusedElement?.focus();
        }
      });
    }
  }

  modalCloseBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeCaseStudy();
  });
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeCaseStudy();
  });

  // =====================================================
  // Reel Viewer — WhatsApp Status Style Controller
  // =====================================================

  const reelBackdrop  = document.getElementById('showreel-modal');
  const reelVideo     = document.getElementById('reel-video');
  const reelRail      = document.getElementById('reel-progress-rail');
  const reelCaptNum   = document.getElementById('reel-caption-num');
  const reelCaptTitle = document.getElementById('reel-caption-title');
  const reelCaptCat   = document.getElementById('reel-caption-cat');
  const reelCloseBtn  = document.getElementById('reel-close-btn');
  const reelPrevBtn   = document.getElementById('reel-tap-prev');
  const reelNextBtn   = document.getElementById('reel-tap-next');

  let reelIndex        = 0;
  let reelRafId        = null;
  let reelSegFills     = [];
  let reelActive       = false;

  // Build progress segment elements
  function buildReelRail() {
    if (!reelRail) return;
    reelRail.innerHTML = '';
    reelSegFills = portfolioData.map((_, i) => {
      const seg = document.createElement('div');
      seg.className = 'reel-seg';
      seg.setAttribute('data-idx', i);
      const fill = document.createElement('div');
      fill.className = 'reel-seg-fill';
      seg.appendChild(fill);
      // Click on segment to jump
      seg.addEventListener('click', (e) => {
        e.stopPropagation();
        loadReel(i);
      });
      reelRail.appendChild(seg);
      return fill;
    });
  }

  // Update progress bar fills
  function updateReelProgress(progress) {
    reelSegFills.forEach((fill, i) => {
      const seg = fill.parentElement;
      if (i < reelIndex) {
        seg.classList.add('is-done');
        fill.style.width = '100%';
      } else if (i === reelIndex) {
        seg.classList.remove('is-done');
        fill.style.width = `${progress * 100}%`;
      } else {
        seg.classList.remove('is-done');
        fill.style.width = '0%';
      }
    });
  }

  // rAF-driven progress ticker
  function tickReelProgress() {
    if (!reelVideo || !reelActive) return;
    const dur = reelVideo.duration;
    if (dur && isFinite(dur)) {
      const prog = reelVideo.currentTime / dur;
      updateReelProgress(prog);
    }
    reelRafId = requestAnimationFrame(tickReelProgress);
  }

  // Load and play a reel by index
  function loadReel(idx) {
    if (!reelVideo) return;
    cancelAnimationFrame(reelRafId);

    reelIndex = Math.max(0, Math.min(idx, portfolioData.length - 1));
    const look = portfolioData[reelIndex];

    // Fade out
    reelVideo.classList.add('reel-fade-out');

    setTimeout(() => {
      reelVideo.src = videoBlobCache.get(look.video) || look.video;
      reelVideo.muted = true;
      reelVideo.volume = 0;
      reelVideo.load();

      // Update caption
      const num = String(reelIndex + 1).padStart(2, '0');
      const total = String(portfolioData.length).padStart(2, '0');
      if (reelCaptNum)   reelCaptNum.textContent   = `${num} / ${total}`;
      if (reelCaptTitle) reelCaptTitle.textContent  = look.title;
      if (reelCaptCat)   reelCaptCat.textContent    = look.categoryLabel;

      // Fade in & play
      reelVideo.classList.remove('reel-fade-out');
      reelVideo.play().catch(() => {});
      reelRafId = requestAnimationFrame(tickReelProgress);
    }, 200);
  }

  // Auto-advance when video ends
  function onReelVideoEnded() {
    if (reelIndex < portfolioData.length - 1) {
      loadReel(reelIndex + 1);
    } else {
      // Finished all — close
      closeReel();
    }
  }

  // Open reel viewer
  function openReel(startIndex = 0) {
    if (!reelBackdrop) return;
    reelActive = true;
    buildReelRail();
    reelBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    loadReel(startIndex);
    reelCloseBtn?.focus();
  }

  // Close reel viewer
  function closeReel() {
    if (!reelBackdrop) return;
    reelActive = false;
    cancelAnimationFrame(reelRafId);
    reelBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
    if (reelVideo) {
      reelVideo.pause();
      reelVideo.src = '';
    }
  }

  // Wire events
  reelVideo?.addEventListener('ended', onReelVideoEnded);
  reelCloseBtn?.addEventListener('click', closeReel);
  reelPrevBtn?.addEventListener('click', () => loadReel(reelIndex - 1));
  reelNextBtn?.addEventListener('click', () => {
    if (reelIndex < portfolioData.length - 1) loadReel(reelIndex + 1);
    else closeReel();
  });
  reelBackdrop?.addEventListener('click', (e) => {
    if (e.target === reelBackdrop) closeReel();
  });

  // Watch Showreel buttons open the reel at index 0
  watchShowreelBtns.forEach(btn => btn.addEventListener('click', () => openReel(0)));

  window.addEventListener('keydown', (e) => {
    if (!reelActive) return;
    if (e.key === 'Escape')      closeReel();
    if (e.key === 'ArrowRight')  reelNextBtn?.click();
    if (e.key === 'ArrowLeft')   reelPrevBtn?.click();
  });

  // Also handle Escape for case-study modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !reelActive) closeCaseStudy();
  });
}

// Global In-Memory Video Blob Cache for Zero-Latency Playback
export const videoBlobCache = new Map();

/**
 * Fetches and converts a video URL into a local in-memory Blob URL
 */
export async function preloadVideoBlob(url) {
  if (!url) return url;
  if (videoBlobCache.has(url)) return videoBlobCache.get(url);

  try {
    const res = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) return url;
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    videoBlobCache.set(url, blobUrl);
    return blobUrl;
  } catch (err) {
    return url;
  }
}
