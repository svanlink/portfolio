/* ==========================================================================
   motion.js — GSAP motion system, Phase 1 + Phase 2
   Ambient motion: hero entrance · work reveal · cinematic parallax + card
                   about reveal · client strip · services · contact
   Interaction motion (crossfade, focus mode, accordion): handled in main.js
   Blueprint: motion-blueprint v0.2 with restraint filter applied
   ========================================================================== */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.registerPlugin(ScrollTrigger);


  // ─── HERO ENTRANCE ─────────────────────────────────────────────────────────
  //
  // Restraint filter applied:
  //   - Footer strip no longer has its own final beat; it arrives with the
  //     kicker and rule as one quiet cluster.
  //   - No y-movement on secondary or tertiary layers — only the name moves.
  //
  // Sequence:
  //   1. Name   — primary, arrives with vertical weight (900ms, power3.out)
  //   2. Sub    — pure opacity, overlaps with name end (600ms, power2.out)
  //   3. Kicker + rule + footer strip — arrive together as one cluster
  //              (500ms, power2.out, no y offset)

  function initHeroEntrance() {
    const name   = document.querySelector('.hero-headline__name');
    const sub    = document.querySelector('.hero-headline__sub');
    const kicker = document.querySelector('.hero-kicker');
    const rule   = document.querySelector('.hero-thin-rule');
    const strip  = document.querySelector('.hero-footer-strip');

    if (!name) return;

    if (prefersReducedMotion) {
      gsap.set([name, sub, kicker, rule, strip].filter(Boolean), { autoAlpha: 1, y: 0 });
      return;
    }

    // Hide immediately — prevents flash of content before the timeline begins
    gsap.set([name, sub, kicker, rule, strip].filter(Boolean), { autoAlpha: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    // Name: primary element, vertical weight signals importance
    tl.fromTo(name,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }
    );

    // Sub: pure opacity only — movement would promote its hierarchy
    tl.fromTo(sub,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.65'
    );

    // Kicker cluster + rule + footer strip: one quiet arrival, no stagger
    tl.fromTo([kicker, rule, strip].filter(Boolean),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );
  }


  // ─── WORK SECTION REVEAL ───────────────────────────────────────────────────
  //
  // Restraint filter applied:
  //   - Header cluster (label + archive) arrives first as one beat.
  //   - List and preview arrive as a composed pair, not independently.
  //   - No per-item row stagger — section arrives, it doesn't perform.
  //
  // Trigger: top of section at 85% of viewport height (15% visible).

  function initWorkReveal() {
    const section    = document.querySelector('.section-work');
    if (!section) return;

    const label      = section.querySelector('.work-section-label');
    const archive    = section.querySelector('.work-archive-link');
    const listCol    = section.querySelector('.work-list-column');
    const previewCol = section.querySelector('.work-preview-column');

    const allEls = [label, archive, listCol, previewCol].filter(Boolean);
    if (!allEls.length) return;

    if (prefersReducedMotion) {
      gsap.set(allEls, { autoAlpha: 1 });
      return;
    }

    gsap.set(allEls, { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true
      }
    });

    // Header cluster: section identifies itself quietly
    tl.fromTo([label, archive].filter(Boolean),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }
    );

    // Content pair: list and preview as a unit, minimal stagger
    tl.fromTo([listCol, previewCol].filter(Boolean),
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.7, ease: 'power2.out', stagger: 0.08 },
      '-=0.3'
    );
  }


  // ─── CINEMATIC: PARALLAX ───────────────────────────────────────────────────
  //
  // ScrollTrigger scrub replaces the rAF/lerp implementation.
  // scrub: 1.5 adds cinematic lag — motion feels heavier than 1:1 scroll.
  // Max translation: 60px. Beyond 0.2× scroll ratio, parallax becomes the story.
  //
  // The cinematic-media element has top: -80px / bottom: -80px overscan in CSS,
  // providing room for the 60px translation without revealing edges.

  function initCinematicParallax() {
    const section = document.querySelector('.section-cinematic');
    const media   = section && section.querySelector('.js-cinematic-media');
    const veil    = section && section.querySelector('.cinematic-veil');
    const grain   = section && section.querySelector('.cinematic-grain');
    const card    = section && section.querySelector('.js-card-reveal');
    const caption = section && section.querySelector('.cinematic-caption-bar');

    if (!media || prefersReducedMotion) return;

    gsap.to(media, {
      y: -72,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    if (veil) {
      gsap.to(veil, {
        y: -22,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8
        }
      });
    }

    if (grain) {
      gsap.to(grain, {
        y: -10,
        opacity: 0.042,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2.1
        }
      });
    }

    if (card) {
      gsap.to(card, {
        y: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.7
        }
      });
    }

    if (caption) {
      gsap.to(caption, {
        autoAlpha: 0.82,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          end: 'bottom top',
          scrub: 1.4
        }
      });
    }
  }


  // ─── CINEMATIC: CARD REVEAL ────────────────────────────────────────────────
  //
  // Card arrives with weight as the primary element.
  // Inner text reveals behind the card with a short stagger.
  // Section index and caption bar arrive last — most tertiary layer.
  //
  // Trigger: top of section at 70% of viewport height — lets the video
  // atmosphere establish before the card appears.

  function initCinematicCard() {
    const section    = document.querySelector('.section-cinematic');
    const card       = section && section.querySelector('.js-card-reveal');
    if (!card) return;

    const utilBar    = card.querySelector('.cinematic-card__utility-bar');
    const headline   = card.querySelector('.cinematic-card__headline');
    const statement  = card.querySelector('.cinematic-card__statement');
    const cta        = card.querySelector('.cta-ghost-button');
    const sectionIdx = section.querySelector('.cinematic-section-index');
    const captionBar = section.querySelector('.cinematic-caption-bar');

    if (prefersReducedMotion) {
      gsap.set(
        [card, utilBar, headline, statement, cta, sectionIdx, captionBar].filter(Boolean),
        { autoAlpha: 1, y: 0 }
      );
      return;
    }

    // Set initial states
    gsap.set(card, { autoAlpha: 0, y: 24 });
    gsap.set([utilBar, statement, cta].filter(Boolean), { autoAlpha: 0 });
    if (headline) gsap.set(headline, { autoAlpha: 0, y: 8 });
    gsap.set([sectionIdx, captionBar].filter(Boolean), { autoAlpha: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        once: true
      }
    });

    // Card: primary arrival with deliberate weight
    tl.to(card,
      { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }
    );

    // Utility bar: appears inside the settled card
    if (utilBar) {
      tl.to(utilBar,
        { autoAlpha: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.6'
      );
    }

    // Headline: slight vertical lift, secondary to card
    if (headline) {
      tl.to(headline,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.45'
      );
    }

    // Statement: pure opacity, no movement
    if (statement) {
      tl.to(statement,
        { autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // CTA: functional element, arrives quietly
    if (cta) {
      tl.to(cta,
        { autoAlpha: 1, duration: 0.4, ease: 'power2.out' },
        '-=0.35'
      );
    }

    // Section index + caption bar: most tertiary, power1 for the quietest arrival
    const tertiaryEls = [sectionIdx, captionBar].filter(Boolean);
    if (tertiaryEls.length) {
      tl.to(tertiaryEls,
        { autoAlpha: 1, duration: 0.5, ease: 'power1.out' },
        '-=0.25'
      );
    }
  }


  // ─── SHARED: SECTION REVEAL UTILITY ───────────────────────────────────────
  //
  // Two-beat sequence: label cluster → content cluster, pure opacity throughout.
  // No y-movement — secondary elements carry no vertical hierarchy.
  //
  // @param {Element}   section     ScrollTrigger trigger
  // @param {Element[]} labelEls    First beat (section index + title)
  // @param {Element[]} contentEls  Second beat (body content, as a composed unit)
  // @param {Object}   [opts]       start, labelDuration, contentDuration, stagger

  function revealSection(section, labelEls, contentEls, opts) {
    const label   = labelEls.filter(Boolean);
    const content = contentEls.filter(Boolean);
    const all     = [...label, ...content];
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


  // ─── ABOUT REVEAL ──────────────────────────────────────────────────────────
  //
  // Label block arrives first. Text and portrait arrive as a composed pair —
  // slight stagger reads as columns, not as a list.
  // Trigger: top of section at 85% viewport height.

  function initAboutReveal() {
    const section     = document.querySelector('.section-about');
    if (!section) return;

    const labelBlock  = section.querySelector('.section-label-block');
    const textCol     = section.querySelector('.about-text-column');
    const portraitCol = section.querySelector('.about-portrait-column');

    revealSection(section, [labelBlock], [textCol, portraitCol]);
  }


  // ─── CLIENT STRIP REVEAL ───────────────────────────────────────────────────
  //
  // All logos arrive as one block — no per-logo stagger.
  // A stagger here would make logos feel like a list; they are a single signal.
  // start: 90% — strip is small, trigger it slightly earlier in the viewport.

  function initClientStripReveal() {
    const section = document.querySelector('.section-worked-with');
    if (!section) return;

    const logos = section.querySelector('.worked-with-logos');
    if (!logos) return;

    if (prefersReducedMotion) {
      gsap.set(logos, { autoAlpha: 1 });
      return;
    }

    gsap.set(logos, { autoAlpha: 0 });

    gsap.to(logos, {
      autoAlpha: 1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        once: true
      }
    });
  }


  // ─── SERVICES REVEAL ───────────────────────────────────────────────────────
  //
  // Label block arrives first. Services list arrives as a single composed unit —
  // no per-row stagger; the section announces itself, it does not perform.
  // Expanded-content fade is handled in main.js (interaction motion).

  function initServicesReveal() {
    const section      = document.querySelector('.section-services');
    if (!section) return;

    const labelBlock   = section.querySelector('.section-label-block');
    const servicesList = section.querySelector('.services-list');

    revealSection(section, [labelBlock], [servicesList]);
  }


  // ─── CONTACT REVEAL ────────────────────────────────────────────────────────
  //
  // No label-block in this section — left column carries the heading.
  // Two-column arrival: left (heading, statement, contact info) then right (form).
  // Slight stagger reads as layout columns arriving, not a list.
  // start: 80% — contact sits at page bottom, give it a slightly earlier trigger.

  function initContactReveal() {
    const section  = document.querySelector('.section-contact');
    if (!section) return;

    const leftCol  = section.querySelector('.contact-left');
    const rightCol = section.querySelector('.contact-right');

    revealSection(section, [], [leftCol, rightCol], { start: 'top 80%', stagger: 0.09 });
  }


  // ─── INIT ──────────────────────────────────────────────────────────────────

  function init() {
    initHeroEntrance();
    initWorkReveal();
    initCinematicParallax();
    initCinematicCard();
    initAboutReveal();
    initClientStripReveal();
    initServicesReveal();
    initContactReveal();
  }

  // Deferred scripts run with readyState 'interactive' — call init directly.
  // If somehow loading before parse completes, wait for DOMContentLoaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
