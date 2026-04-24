/* ==========================================================================
   motion.js — GSAP scroll reveals for Selected Work and Services sections
   Interaction motion (hover swap, accordion) lives in main.js.
   ========================================================================== */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.registerPlugin(ScrollTrigger);


  function revealSection(section, labelEls, contentEls, opts) {
    const label   = labelEls.filter(Boolean);
    const content = contentEls.filter(Boolean);
    const all     = [].concat(label, content);
    if (!all.length) return;

    if (prefersReducedMotion) {
      gsap.set(all, { autoAlpha: 1 });
      return;
    }

    gsap.set(all, { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: (opts && opts.start) || 'top 85%',
        once: true
      }
    });

    if (label.length) {
      tl.fromTo(label,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: (opts && opts.labelDuration) || 0.5, ease: 'power2.out' }
      );
    }

    if (content.length) {
      tl.fromTo(content,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: (opts && opts.contentDuration) || 0.7,
          ease: 'power2.out',
          stagger: (opts && opts.stagger) || 0.07
        },
        label.length ? '-=0.3' : 0
      );
    }
  }


  function initWorkReveal() {
    const section = document.querySelector('.section-work');
    if (!section) return;

    const heading = section.querySelector('.work-heading');
    const list    = section.querySelector('.work-list');
    const player  = section.querySelector('.work-player');

    revealSection(section, [heading], [list, player]);
  }


  function initServicesReveal() {
    const section = document.querySelector('.section-services');
    if (!section) return;

    const heading = section.querySelector('.services-heading');
    const list    = section.querySelector('.services-list');
    const close   = section.querySelector('.services-list__closing-rule');

    revealSection(section, [heading], [list, close]);
  }


  function init() {
    initWorkReveal();
    initServicesReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
