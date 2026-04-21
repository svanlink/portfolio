/**
 * main.js — Sebastian Van Eickelen Portfolio
 * Stub file with implementation hooks for future development.
 * All sections are clearly commented and ready to wire up.
 */

(function () {
  'use strict';

  // ─── VIMEO: Hero background video ────────────────────────────────────────
  // Target: [data-vimeo-id] inside .js-hero-media
  //
  // Implementation plan:
  //   1. Dynamically load https://player.vimeo.com/api/player.js
  //   2. Find .js-vimeo-target inside .js-hero-media
  //   3. Read data-vimeo-id and data-vimeo-params attributes
  //   4. Instantiate Vimeo.Player with { id, autoplay: true, loop: true, muted: true,
  //      background: true, dnt: true, controls: false }
  //   5. On player.ready → add class .player-ready to parent, hide .js-video-fallback
  //   6. On player error → leave fallback visible
  //
  // function initHeroVideo() {
  //   const target = document.querySelector('.js-hero-media .js-vimeo-target');
  //   if (!target) return;
  //   // ... Vimeo Player API init
  // }


  // ─── VIMEO: Cinematic section video ──────────────────────────────────────
  // Target: [data-vimeo-id] inside .js-cinematic-media
  //
  // Same pattern as hero video above.
  // The cinematic section video is lower priority — initialize after hero.
  //
  // function initCinematicVideo() {
  //   const target = document.querySelector('.js-cinematic-media .js-vimeo-target');
  //   if (!target) return;
  //   // ... Vimeo Player API init
  // }


  // ─── SELECTED WORK: Preview transitions ──────────────────────────────────
  // Targets: .js-work-list items, .js-preview-plate
  //
  // Implementation plan:
  //   1. Cache all .work-item elements and the .js-preview-plate
  //   2. On mouseenter of a .work-item:
  //      a. Remove .is-active from all items
  //      b. Add .is-active to hovered item
  //      c. Read data-preview-src attribute from item
  //      d. Fade out .preview-plate__image (opacity → 0, duration: 150ms)
  //      e. Swap src, then fade back in (opacity → 0.85, duration: 300ms)
  //      f. Update caption bar text from data attributes
  //   3. Use transform: translateY(6px) → translateY(0) for entry motion
  //
  // function initWorkPreview() {
  //   const list = document.querySelector('.js-work-list');
  //   const plate = document.querySelector('.js-preview-plate');
  //   if (!list || !plate) return;
  //   // ... hover wiring
  // }


  // ─── HERO: Entrance animation ─────────────────────────────────────────────
  // Targets: .js-hero-kicker, .js-hero-rule
  //
  // Implementation plan:
  //   1. On DOMContentLoaded: set initial state (opacity: 0, translateY: 12px)
  //   2. After short delay (300ms for kicker, 450ms for rule), transition in
  //   3. If video initializes, trigger after player.ready for tighter sync
  //   4. Respect prefers-reduced-motion: skip transforms if reduced
  //
  // function initHeroEntrance() {
  //   const kicker = document.querySelector('.js-hero-kicker');
  //   const rule = document.querySelector('.js-hero-rule');
  //   if (!kicker) return;
  //   // ... staggered reveal
  // }


  // ─── SERVICES: Hover behavior ─────────────────────────────────────────────
  // Target: .service-plate
  //
  // Implementation plan:
  //   1. On mouseenter: ember color shifts are handled in CSS.
  //      JS adds .has-hover class for more complex transitions (arrow reveal).
  //   2. On each plate, append a hidden ember arrow span ".service-plate__arrow"
  //      positioned bottom-right of the description text
  //   3. On mouseenter: translateX(0) + opacity 1; on mouseleave: translateX(-6px) + opacity 0
  //
  // function initServicesHover() {
  //   document.querySelectorAll('.service-plate').forEach(plate => {
  //     // ... arrow injection and hover handlers
  //   });
  // }


  // ─── CINEMATIC: Parallax ──────────────────────────────────────────────────
  // Target: .js-cinematic-media (media layer inside cinematic section)
  //
  // Implementation plan:
  //   1. Use IntersectionObserver to activate only when section is in viewport
  //   2. On scroll: read window.scrollY, calculate parallax offset
  //      (travel: ~80px, direction: up as user scrolls down)
  //   3. Apply: `transform: translateY(${offset}px)` using requestAnimationFrame
  //   4. Clamp offset to [-80, 0] to avoid overscrolling gaps
  //   5. Respect prefers-reduced-motion: disable if reduced
  //
  // let cinematicActive = false;
  // function initCinematicParallax() {
  //   const media = document.querySelector('.js-cinematic-media');
  //   if (!media) return;
  //   // ... IntersectionObserver + rAF scroll handler
  // }


  // ─── CONTACT: Focus states ────────────────────────────────────────────────
  // Target: .js-contact-form .form-field
  //
  // Implementation plan:
  //   1. On focus of any .form-field__input:
  //      a. Add .is-focused to parent .form-field
  //      b. CSS handles label color shift and rule ember color (via :focus-within)
  //   2. On blur of .form-field__input:
  //      a. If input has value: keep .has-value class (label stays up)
  //      b. If empty: remove .has-value
  //   3. On form submit: basic client-side validation
  //      a. Highlight empty required fields with .is-error
  //      b. Show .form-error-message (aria-live region)
  //
  // function initContactForm() {
  //   const form = document.querySelector('.js-contact-form');
  //   if (!form) return;
  //   // ... focus/blur handlers + validation
  // }


  // ─── SCROLL REVEAL: IntersectionObserver ─────────────────────────────────
  // Targets: [data-reveal] elements across all sections
  //
  // Implementation plan:
  //   1. Query all [data-reveal] on DOMContentLoaded
  //   2. Create IntersectionObserver with threshold: 0.12, rootMargin: '0px 0px -60px 0px'
  //   3. When element enters viewport: add .is-visible (CSS handles the transition)
  //   4. Disconnect observer after reveal (once: true behavior)
  //   5. Stagger with data-reveal-delay attribute (0, 100, 200ms increments)
  //
  // function initScrollReveal() {
  //   const items = document.querySelectorAll('[data-reveal]');
  //   if (!items.length) return;
  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         const delay = entry.target.dataset.revealDelay || 0;
  //         setTimeout(() => entry.target.classList.add('is-visible'), delay);
  //         observer.unobserve(entry.target);
  //       }
  //     });
  //   }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  //   items.forEach(el => observer.observe(el));
  // }


  // ─── INIT ─────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {

    // initHeroEntrance();
    // initHeroVideo();
    // initWorkPreview();
    // initServicesHover();
    // initCinematicVideo();
    // initCinematicParallax();
    // initContactForm();
    // initScrollReveal();

    // Active nav link based on scroll position (future: IntersectionObserver per section)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    // Placeholder: keep #work active by default (set in HTML)
    // Future: wire up scroll-spy here

  });

})();
