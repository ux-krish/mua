import '../scss/main.scss';

import {
  createIcons,
  Crown,
  Sparkles,
  Flame,
  Scissors,
  GraduationCap,
  Star,
  Heart,
  Award,
  Check,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  X,
  Menu,
  Camera,
  Gem,
  ShieldCheck
} from 'lucide';

import { initPreloader } from './preloader.js';
import { initCursor } from './cursor.js';
import { initKajalLines } from './kajal-line.js';
import { initNavigation } from './navigation.js';
import { initServices } from './services.js';
import { initPortfolio } from './portfolio.js';
import { initTestimonials } from './testimonials.js';
import { initMarquee } from './marquee.js';
import { initBooking } from './booking.js';
import { initScrollReveals } from './reveal.js';
import { initHeroVideo } from './hero-video.js';

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize Lucide Icons library
  createIcons({
    icons: {
      Crown,
      Sparkles,
      Flame,
      Scissors,
      GraduationCap,
      Star,
      Heart,
      Award,
      Check,
      CheckCircle2,
      MapPin,
      Phone,
      Mail,
      Calendar,
      Clock,
      ArrowRight,
      ChevronRight,
      ChevronDown,
      Play,
      Pause,
      X,
      Menu,
      Camera,
      Gem,
      ShieldCheck
    }
  });
  // 1. Initialize custom cursor & physics
  initCursor();

  // 2. Initialize Navigation & Active section triggers
  initNavigation();

  // 3. Initialize Interactive Components
  initHeroVideo();
  initServices();
  initPortfolio();
  initTestimonials();
  initMarquee();
  initBooking();

  // 4. Initialize Preloader & Orchestrated load sequence
  initPreloader(() => {
    // Post-curtain reveal triggers
    initKajalLines();
    initScrollReveals();
  });
});
