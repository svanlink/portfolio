/**
 * main.js — Sebastian Van Eickelen Portfolio
 * Interactive behaviours for the three-section portfolio.
 * Motion reveals live in motion.js.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── VIMEO: Background video initializer ─────────────────────────────────

  function initVimeoBackground(targetSelector, fallbackSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const container = target.parentElement || target;

    function hideFallback() {
      target.classList.add('is-ready');
      const fallback = container.querySelector(fallbackSelector);
      if (fallback) {
        fallback.style.transition = 'opacity 600ms ease';
        fallback.style.opacity = '0';
        setTimeout(function () {
          if (fallback.parentNode) fallback.parentNode.removeChild(fallback);
        }, 620);
      }
    }

    const iframe = target.querySelector('iframe');
    if (!iframe) return;

    if (typeof window.Vimeo !== 'undefined') {
      try {
        const player = new window.Vimeo.Player(iframe);
        let played = false;
        player.on('play', function () {
          if (!played) { played = true; hideFallback(); }
        });
        return;
      } catch (e) {
        // fall through to load-event
      }
    }
    iframe.addEventListener('load', hideFallback);
  }

  // ─── SELECTED WORK: Row hover swaps the player ───────────────────────────

  function initWorkPreview() {
    const list  = document.querySelector('.js-work-list');
    const plate = document.querySelector('.js-preview-plate');
    if (!list || !plate) return;

    const image        = plate.querySelector('.js-preview-image');
    const videoWrap    = plate.querySelector('.js-preview-video');
    const videoFrame   = plate.querySelector('.js-preview-frame');
    const captionTitle = plate.querySelector('.js-preview-caption-title');
    const captionMeta  = plate.querySelector('.js-preview-caption-meta');

    const rows = Array.from(list.querySelectorAll('.work-row'));
    if (!rows.length) return;

    let activeRow = null;
    let clearFrameTimer = 0;

    function buildPreviewUrl(vimeoId) {
      return 'https://player.vimeo.com/video/' + vimeoId +
        '?autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0&autopause=0&dnt=1';
    }

    function clearPreview() {
      if (captionTitle) captionTitle.textContent = '';
      if (captionMeta) captionMeta.textContent = '';
      if (videoWrap) videoWrap.classList.remove('is-visible');
      plate.classList.remove('has-preview');

      if (clearFrameTimer) window.clearTimeout(clearFrameTimer);
      clearFrameTimer = window.setTimeout(function () {
        if (!activeRow && videoFrame) videoFrame.src = '';
      }, 320);
    }

    function deactivate(row) {
      if (row && activeRow !== row) return;

      activeRow = null;
      list.classList.remove('has-active');
      rows.forEach(function (r) {
        r.classList.remove('is-active');
        r.setAttribute('aria-expanded', 'false');
      });
      clearPreview();
    }

    function activate(row) {
      if (activeRow === row) return;

      activeRow = row;
      list.classList.add('has-active');

      rows.forEach(function (r) {
        const active = r === row;
        r.classList.toggle('is-active', active);
        r.setAttribute('aria-expanded', active ? 'true' : 'false');
      });

      const vimeoId = row.dataset.previewVimeoId;
      const title   = row.dataset.previewTitle || '';
      const meta    = row.dataset.previewMeta  || '';

      if (captionTitle) captionTitle.textContent = title;
      if (captionMeta)  captionMeta.textContent  = meta;
      plate.classList.add('has-preview');

      if (videoFrame && vimeoId) {
        if (clearFrameTimer) window.clearTimeout(clearFrameTimer);
        videoFrame.src = buildPreviewUrl(vimeoId);
        if (videoWrap) videoWrap.classList.add('is-visible');
      } else if (videoFrame) {
        videoFrame.src = '';
        if (videoWrap) videoWrap.classList.remove('is-visible');
      }
    }

    rows.forEach(function (row) {
      row.addEventListener('mouseenter', function () { activate(row); });
      row.addEventListener('mouseleave', function () { deactivate(row); });
      row.addEventListener('focus',      function () { activate(row); });
      row.addEventListener('blur',       function () { deactivate(row); });
      row.addEventListener('click',      function () { activate(row); });
      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate(row);
        }
      });
    });

    deactivate();
  }

  // ─── SERVICES: Click to expand ───────────────────────────────────────────

  function initServicesAccordion() {
    const rows = Array.from(document.querySelectorAll('.service-row'));
    if (!rows.length) return;

    function setActive(target) {
      rows.forEach(function (r) {
        const active = r === target;
        r.classList.toggle('is-active', active);
        r.setAttribute('aria-expanded', active ? 'true' : 'false');
      });
    }

    rows.forEach(function (row) {
      row.addEventListener('click', function () { setActive(row); });
      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActive(row);
        }
      });
    });
  }

  // ─── NAV: Hide on scroll down, reveal on scroll up ───────────────────────

  function initNavHide() {
    const nav = document.querySelector('.site-nav');
    if (!nav || prefersReducedMotion) return;

    let lastScrollY = window.scrollY;
    let ticking     = false;

    function update() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 80) {
        nav.classList.remove('is-hidden');
      } else if (currentScrollY > lastScrollY + 4) {
        nav.classList.add('is-hidden');
      } else if (currentScrollY < lastScrollY - 4) {
        nav.classList.remove('is-hidden');
      }

      lastScrollY = currentScrollY;
      ticking     = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  // ─── NAV: Scroll spy ─────────────────────────────────────────────────────

  function initNavSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
            if (link.dataset.section === id) {
              link.classList.add('is-active');
              link.setAttribute('aria-current', 'page');
            }
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-56px 0px 0px 0px' });

    sections.forEach(function (section) { observer.observe(section); });
  }

  // ─── INIT ─────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', function () {
    initNavHide();
    initVimeoBackground('.js-hero-media .js-vimeo-target', '.js-video-fallback');
    initWorkPreview();
    initServicesAccordion();
    initNavSpy();
  });

})();
