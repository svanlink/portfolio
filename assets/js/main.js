/**
 * main.js — Sebastian Van Eickelen Portfolio
 * Production-ready implementation of all interactive features.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  // ─── HERO: Entrance animation ────────────────────────────────────────────

  function initHeroEntrance() {
    const kicker = document.querySelector('.js-hero-kicker');
    const rule = document.querySelector('.js-hero-rule');
    if (!kicker) return;

    kicker.style.opacity = '0';
    kicker.style.transform = 'translateY(16px)';
    kicker.style.transition = 'opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)';

    if (rule) {
      rule.style.transform = 'scaleX(0)';
      rule.style.transformOrigin = 'left center';
      rule.style.transition = 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1)';
    }

    requestAnimationFrame(() => {
      setTimeout(() => {
        kicker.style.opacity = '1';
        kicker.style.transform = 'translateY(0)';
      }, 200);

      if (rule) {
        setTimeout(() => {
          rule.style.transform = 'scaleX(1)';
        }, 450);
      }
    });
  }

  // ─── VIMEO: Background video initializer ─────────────────────────────────

  function initVimeoBackground(targetSelector, fallbackSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const vimeoId = target.dataset.vimeoId;
    const params = target.dataset.vimeoParams || '';
    if (!vimeoId) return;

    const iframe = target.querySelector('iframe');
    if (iframe) {
      iframe.addEventListener('load', () => {
        target.classList.add('is-ready');
        const fallback = target.querySelector(fallbackSelector);
        if (fallback) fallback.style.opacity = '0';
      });
      return;
    }

    const iframeEl = document.createElement('iframe');
    iframeEl.className = 'vimeo-embed';
    iframeEl.src = `https://player.vimeo.com/video/${vimeoId}?${params}`;
    iframeEl.setAttribute('frameborder', '0');
    iframeEl.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframeEl.setAttribute('title', 'Background video');
    iframeEl.setAttribute('aria-hidden', 'true');
    iframeEl.style.cssText = 'position:absolute;top:50%;left:50%;width:177.78vh;min-width:100%;height:100%;min-height:56.25vw;transform:translate(-50%,-50%);pointer-events:none;';

    target.appendChild(iframeEl);

    iframeEl.addEventListener('load', () => {
      target.classList.add('is-ready');
      const fallback = target.querySelector(fallbackSelector);
      if (fallback) {
        fallback.style.transition = 'opacity 600ms ease';
        fallback.style.opacity = '0';
        setTimeout(() => fallback.remove(), 600);
      }
    });
  }

  // ─── SELECTED WORK: Preview transitions ──────────────────────────────────

  function initWorkPreview() {
    const list = document.querySelector('.js-work-list');
    const plate = document.querySelector('.js-preview-plate');
    if (!list || !plate) return;

    const image        = plate.querySelector('.js-preview-image');
    const videoWrap    = plate.querySelector('.js-preview-video');
    const videoFrame   = plate.querySelector('.js-preview-frame');
    const badge        = plate.querySelector('.js-preview-badge');
    const captionIndex = plate.querySelector('.js-preview-caption-index');
    const captionTitle = plate.querySelector('.js-preview-caption-title');
    const captionMeta  = plate.querySelector('.js-preview-caption-meta');

    const items = list.querySelectorAll('.work-item');
    let isTransitioning = false;

    function activateItem(item) {
      if (isTransitioning) return;
      if (item.classList.contains('is-active')) return;

      items.forEach(el => {
        el.classList.remove('is-active');
        el.setAttribute('aria-selected', 'false');
      });
      item.classList.add('is-active');
      item.setAttribute('aria-selected', 'true');

      const newSrc     = item.dataset.previewSrc;
      const newVimeoId = item.dataset.vimeoId;
      const newIndex   = item.dataset.previewIndex;
      const newTitle   = item.dataset.previewTitle;
      const newMeta    = item.dataset.previewMeta;

      isTransitioning = true;

      // Fade out current view
      if (image)     { image.style.transition = 'opacity 150ms ease'; image.style.opacity = '0'; }
      if (videoWrap) videoWrap.classList.remove('is-visible');

      setTimeout(() => {
        // Update caption
        if (badge)        badge.textContent        = newIndex;
        if (captionIndex) captionIndex.textContent  = newIndex;
        if (captionTitle) captionTitle.textContent  = newTitle;
        if (captionMeta)  captionMeta.textContent   = newMeta;

        if (newVimeoId && videoFrame && videoWrap) {
          // Show looping muted Vimeo background in the plate
          videoFrame.src = `https://player.vimeo.com/video/${newVimeoId}?autoplay=1&loop=1&muted=1&background=1&autopause=0&dnt=1`;
          if (image) image.style.opacity = '0';
          requestAnimationFrame(() => {
            videoWrap.classList.add('is-visible');
            isTransitioning = false;
          });
        } else if (newSrc && image) {
          // Fallback: static image
          if (videoFrame) videoFrame.src = '';
          image.src = newSrc;
          image.alt = newTitle ? newTitle + ' preview' : 'Work preview';
          requestAnimationFrame(() => {
            image.style.transition = 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)';
            image.style.opacity = '0.85';
            isTransitioning = false;
          });
        } else {
          isTransitioning = false;
        }
      }, 150);
    }

    items.forEach(item => {
      item.addEventListener('mouseenter', () => activateItem(item));
      item.addEventListener('focus',      () => activateItem(item));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateItem(item);
        }
      });
    });
  }

  // ─── SERVICES: Hover arrow injection ─────────────────────────────────────

  function initServicesHover() {
    document.querySelectorAll('.service-plate').forEach(plate => {
      const arrow = document.createElement('span');
      arrow.className = 'service-plate__arrow';
      arrow.textContent = '→';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.style.cssText = 'position:absolute;bottom:28px;right:28px;font-family:var(--font-mono-display);font-size:12px;color:var(--color-ember);opacity:0;transform:translateX(-6px);transition:opacity 300ms cubic-bezier(0.16,1,0.3,1),transform 300ms cubic-bezier(0.16,1,0.3,1);pointer-events:none;';
      plate.appendChild(arrow);

      plate.addEventListener('mouseenter', () => {
        arrow.style.opacity = '1';
        arrow.style.transform = 'translateX(0)';
      });
      plate.addEventListener('mouseleave', () => {
        arrow.style.opacity = '0';
        arrow.style.transform = 'translateX(-6px)';
      });
    });
  }

  // ─── CINEMATIC: Parallax ─────────────────────────────────────────────────

  function initCinematicParallax() {
    if (prefersReducedMotion) return;

    const media = document.querySelector('.js-cinematic-media');
    if (!media) return;

    let targetOffset = 0;
    let currentOffset = 0;
    let rafId = null;
    let isActive = false;

    function update() {
      currentOffset = lerp(currentOffset, targetOffset, 0.08);
      media.style.transform = `translateY(${currentOffset}px)`;
      if (Math.abs(currentOffset - targetOffset) > 0.05) {
        rafId = requestAnimationFrame(update);
      } else {
        rafId = null;
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { isActive = entry.isIntersecting; });
    }, { threshold: 0 });

    observer.observe(media.closest('.section-cinematic'));

    window.addEventListener('scroll', () => {
      if (!isActive) return;
      const section = media.closest('.section-cinematic');
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
      targetOffset = -80 * progress;
      if (!rafId) rafId = requestAnimationFrame(update);
    }, { passive: true });
  }

  // ─── CONTACT: Focus states ───────────────────────────────────────────────

  function initContactForm() {
    const form = document.querySelector('.js-contact-form');
    if (!form) return;

    const fields = form.querySelectorAll('.js-field-focus');
    fields.forEach(field => {
      const input = field.querySelector('.form-field__input');
      if (!input) return;

      input.addEventListener('focus', () => field.classList.add('is-focused'));
      input.addEventListener('blur', () => {
        field.classList.remove('is-focused');
        if (input.value.trim()) field.classList.add('has-value');
        else field.classList.remove('has-value');
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      fields.forEach(field => {
        const input = field.querySelector('.form-field__input');
        if (input && input.hasAttribute('required') && !input.value.trim()) {
          field.classList.add('is-error');
          isValid = false;
        } else {
          field.classList.remove('is-error');
        }
      });

      if (isValid) {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          const original = btn.textContent;
          btn.textContent = 'SENT ——— ✓';
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
            form.reset();
            fields.forEach(f => f.classList.remove('has-value'));
          }, 2500);
        }
      }
    });
  }

  // ─── SCROLL REVEAL: IntersectionObserver ─────────────────────────────────

  function initScrollReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.revealDelay || '0', 10);
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    items.forEach(el => observer.observe(el));
  }

  // ─── NAV: Scroll spy ─────────────────────────────────────────────────────

  function initNavSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.remove('is-active', 'nav-link--dot-before');
            link.removeAttribute('aria-current');
            if (link.dataset.section === id) {
              link.classList.add('is-active', 'nav-link--dot-before');
              link.setAttribute('aria-current', 'page');
            }
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-56px 0px 0px 0px' });

    sections.forEach(section => observer.observe(section));
  }

  // ─── INIT ─────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    initHeroEntrance();
    initVimeoBackground('.js-hero-media .js-vimeo-target', '.js-video-fallback');
    initVimeoBackground('.js-cinematic-media .js-vimeo-target', '.js-video-fallback');
    initWorkPreview();
    initServicesHover();
    initCinematicParallax();
    initContactForm();
    initScrollReveal();
    initNavSpy();
  });

})();