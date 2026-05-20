/* ============================================================
   MikuHost — script.js
   Loader · Navbar · Scroll Reveal · Tilt · Smooth Scroll
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   Utility
---------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ----------------------------------------------------------
   1. Loader
---------------------------------------------------------- */
(function initLoader() {
  const loader = $('#loader');
  if (!loader) return;

  // Hide loader after bar animation completes (~1.8s total)
  setTimeout(() => {
    loader.classList.add('done');
    document.body.style.overflow = '';
  }, 1900);

  // Prevent scroll flash during load
  document.body.style.overflow = 'hidden';
})();

/* ----------------------------------------------------------
   2. Navbar — transparent → frosted on scroll
---------------------------------------------------------- */
(function initNavbar() {
  const nav = $('#navbar');
  if (!nav) return;

  let lastY = 0;
  let ticking = false;

  function onScroll() {
    lastY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        if (lastY > 60) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // set initial state
})();

/* ----------------------------------------------------------
   3. Scroll Reveal — Intersection Observer
---------------------------------------------------------- */
(function initReveal() {
  const els = $$('.reveal-up');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  els.forEach(el => observer.observe(el));
})();

/* ----------------------------------------------------------
   4. Subtle Tilt Effect on Project Card
---------------------------------------------------------- */
(function initTilt() {
  const card = $('#project-tilt');
  if (!card) return;

  const MAX_TILT = 4; // degrees — very subtle
  let bounds;

  function refreshBounds() {
    bounds = card.getBoundingClientRect();
  }

  window.addEventListener('resize', refreshBounds, { passive: true });

  card.addEventListener('mouseenter', () => {
    refreshBounds();
  });

  card.addEventListener('mousemove', (e) => {
    if (!bounds) refreshBounds();
    const x = (e.clientX - bounds.left) / bounds.width - 0.5;
    const y = (e.clientY - bounds.top)  / bounds.height - 0.5;
    const rotX = -(y * MAX_TILT * 2);
    const rotY =   x * MAX_TILT * 2;
    card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
    card.style.transition = 'transform .08s linear';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    card.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1)';
  });
})();

/* ----------------------------------------------------------
   5. Smooth Anchor Scroll
---------------------------------------------------------- */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ----------------------------------------------------------
   6. Floating Card — Parallax on mouse move
---------------------------------------------------------- */
(function initCardParallax() {
  const card = $('.float-card');
  if (!card) return;

  // Only on desktop
  if (window.innerWidth < 1024) return;

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx; // -1 to 1
    const dy = (e.clientY - cy) / cy;

    const moveX = dx * 8;
    const moveY = dy * 5;

    // Blend with existing float animation by applying via CSS custom props
    card.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    card.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1)';
  });
})();

/* ----------------------------------------------------------
   7. Hero Video fallback — use CSS animation if no src
---------------------------------------------------------- */
(function initVideoFallback() {
  const video = $('#hero-video');
  if (!video) return;

  const src = video.querySelector('source')?.getAttribute('src');
  if (!src) {
    // No video source — the CSS gradient fallback is already in place.
    // Add a slow animated gradient shift for cinematic feel
    const wrap = video.closest('.hero-video-wrap') || video.parentElement;
    if (wrap) {
      wrap.style.background = `
        radial-gradient(ellipse 90% 70% at 55% 35%, #1e1a2e 0%, #0c0c0e 55%)
      `;
      // Subtle animated shift
      let t = 0;
      function animateBg() {
        t += 0.003;
        const x = 55 + Math.sin(t) * 8;
        const y = 35 + Math.cos(t * 0.7) * 6;
        wrap.style.background = `
          radial-gradient(ellipse 90% 70% at ${x}% ${y}%, #201b30 0%, #0c0c0e 58%)
        `;
        requestAnimationFrame(animateBg);
      }
      animateBg();
    }
    // Hide the empty video element
    video.style.display = 'none';
  }
})();

/* ----------------------------------------------------------
   8. Active nav link highlight on scroll
---------------------------------------------------------- */
(function initNavHighlight() {
  const sections = $$('section[id], footer[id]');
  const links    = $$('.nav-links a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${id}`
              ? 'var(--text)'
              : '';
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => observer.observe(s));
})();

/* ----------------------------------------------------------
   9. Section entrance timing — stagger children lightly
---------------------------------------------------------- */
(function initSectionStagger() {
  // Skill cards get slightly increasing delay
  $$('.skill-card').forEach((card, i) => {
    card.style.setProperty('--delay', `${0.06 + i * 0.08}s`);
  });
})();