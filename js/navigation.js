import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initNavigation() {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const indicator = document.querySelector('.nav-active-indicator');
  const drawerToggle = document.querySelector('.btn-drawer-toggle');
  const drawer = document.querySelector('.quick-drawer');
  const drawerClose = document.querySelector('.drawer-close-btn');
  const drawerBackdrop = document.querySelector('.drawer-overlay-backdrop');
  
  const mobileMenuToggle = document.querySelector('.btn-mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Header Scroll State
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Active Section Underline Indicator
  function updateIndicator(link, immediate = false) {
    if (!indicator || !link) return;
    const parentItem = link.parentElement;
    const navList = link.closest('.nav-list');
    if (!navList || !parentItem) return;

    const listRect = navList.getBoundingClientRect();
    const itemRect = parentItem.getBoundingClientRect();

    if (itemRect.width === 0) return;

    const targetX = itemRect.left - listRect.left;
    const targetWidth = itemRect.width;

    if (immediate) {
      gsap.set(indicator, { x: targetX, width: targetWidth });
    } else {
      gsap.to(indicator, {
        x: targetX,
        width: targetWidth,
        duration: 0.35,
        ease: 'power3.out'
      });
    }
  }

  // Set default indicator position
  let currentActiveLink = document.querySelector('.nav-link.active') || navLinks[0];
  if (navLinks.length > 0) {
    setTimeout(() => updateIndicator(currentActiveLink, true), 150);
  }

  window.addEventListener('resize', () => {
    currentActiveLink = document.querySelector('.nav-link.active') || navLinks[0];
    updateIndicator(currentActiveLink, true);
  });

  // ScrollTrigger active section tracking
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const id = section.getAttribute('id');
    const targetLink = document.querySelector(`.nav-link[href="#${id}"]`);
    const targetMobileLink = document.querySelector(`.mobile-nav-link[href="#${id}"]`);

    if (targetLink) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) {
            navLinks.forEach(l => l.classList.remove('active'));
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            targetLink.classList.add('active');
            targetMobileLink?.classList.add('active');
            updateIndicator(targetLink);
          }
        }
      });
    }
  });

  // Quick Drawer Controls
  const openDrawer = () => {
    drawer?.classList.add('is-open');
    drawerBackdrop?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer?.classList.remove('is-open');
    drawerBackdrop?.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  drawerToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  // Mobile Menu Controls
  const openMobileMenu = () => {
    mobileMenu?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    gsap.fromTo('.mobile-nav-item', {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out'
    });
  };

  const closeMobileMenu = () => {
    mobileMenu?.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  mobileMenuToggle?.addEventListener('click', openMobileMenu);
  mobileMenuClose?.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Global Escape Key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeMobileMenu();
    }
  });
}
