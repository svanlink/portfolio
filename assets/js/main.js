/**
 * main.js — Sebastian Van Eickelen Portfolio
 * Production-ready implementation of all interactive features.
 * Motion: hero entrance, parallax, and work reveal handled in motion.js via GSAP.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── VIMEO: Background video initializer ─────────────────────────────────

  function initVimeoBackground(targetSelector, fallbackSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    const vimeoId = target.dataset.vimeoId;
    const params = target.dataset.vimeoParams || '';
    if (!vimeoId) return;

    // Fallback lives as a sibling in the parent container (.hero-media / .cinematic-media)
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
    if (iframe) {
      // Use Vimeo Player API play event — only hides fallback when video actually starts.
      // Falls back to iframe load event if Vimeo API is unavailable.
      if (typeof window.Vimeo !== 'undefined') {
        try {
          var player = new window.Vimeo.Player(iframe);
          var played = false;
          player.on('play', function () {
            if (!played) { played = true; hideFallback(); }
          });
        } catch (e) {
          iframe.addEventListener('load', hideFallback);
        }
      } else {
        iframe.addEventListener('load', hideFallback);
      }
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

    iframeEl.addEventListener('load', function () {
      if (typeof window.Vimeo !== 'undefined') {
        try {
          var player = new window.Vimeo.Player(iframeEl);
          var played = false;
          player.on('play', function () {
            if (!played) { played = true; hideFallback(); }
          });
        } catch (e) {
          hideFallback();
        }
      } else {
        hideFallback();
      }
    });
  }

  // ─── VIMEO: Thumbnail fetcher ─────────────────────────────────────────────

  var thumbCache = {};

  function fetchVimeoThumb(vimeoId) {
    if (thumbCache[vimeoId]) return Promise.resolve(thumbCache[vimeoId]);
    return fetch(
      'https://vimeo.com/api/oembed.json?url=' + encodeURIComponent('https://vimeo.com/' + vimeoId) + '&width=1280',
      { mode: 'cors' }
    )
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var url = data.thumbnail_url || null;
        thumbCache[vimeoId] = url;
        return url;
      })
      .catch(function () { return null; });
  }

  // ─── SELECTED WORK: Preview transitions ──────────────────────────────────

  function initWorkPreview() {
    const list  = document.querySelector('.js-work-list');
    const plate = document.querySelector('.js-preview-plate');
    if (!list || !plate) return;

    const image        = plate.querySelector('.js-preview-image');
    const videoWrap    = plate.querySelector('.js-preview-video');
    const videoFrame   = plate.querySelector('.js-preview-frame');
    const captionLeft  = plate.querySelector('.preview-plate__caption-left');
    const captionTitle = plate.querySelector('.js-preview-caption-title');
    const captionMeta  = plate.querySelector('.js-preview-caption-meta');

    const overlay      = document.querySelector('.js-work-focus');
    const focusClose   = document.querySelector('.js-work-focus-close');
    const focusFrame   = document.querySelector('.js-work-focus-frame');
    const focusMedia   = overlay && overlay.querySelector('.work-focus-media');
    const focusCaption = overlay && overlay.querySelector('.work-focus-caption');
    const focusControls = overlay && overlay.querySelector('.js-work-focus-controls');
    const focusTitle   = document.querySelector('.js-focus-title');
    const focusMeta    = document.querySelector('.js-focus-meta');
    const focusPlay    = document.querySelector('.js-focus-play');
    const focusMute    = document.querySelector('.js-focus-mute');
    const focusPrev    = document.querySelector('.js-focus-prev');
    const focusNext    = document.querySelector('.js-focus-next');
    const focusScrub   = document.querySelector('.js-focus-scrub');
    const focusCurrent = document.querySelector('.js-focus-current');
    const focusDurationEl = document.querySelector('.js-focus-duration');

    if (typeof gsap !== 'undefined') {
      if (overlay)       gsap.set(overlay, { autoAlpha: 0 });
      if (focusMedia)    gsap.set(focusMedia, { autoAlpha: 0 });
      if (focusCaption)  gsap.set(focusCaption, { autoAlpha: 0 });
      if (focusClose)    gsap.set(focusClose, { autoAlpha: 0 });
      if (focusControls) gsap.set(focusControls, { autoAlpha: 1 });
    }

    const items = Array.from(list.querySelectorAll('.work-item'));
    const useGsap = typeof gsap !== 'undefined' && !prefersReducedMotion;
    let isTransitioning = false;
    let activeRequestId = 0;
    let queuedItem      = null;
    let focusOpen       = false;
    let currentFocusIndex = 0;
    let focusPlayer     = null;
    let focusDuration   = 0;
    let focusIsPaused   = true;
    let focusIsMuted    = false;
    let isScrubbing     = false;
    let controlsIdleTimer = null;
    let scrubCommitTimer = null;
    let focusLoadToken  = 0;

    if (focusFrame) {
      focusFrame.addEventListener('load', function () {
        if (!focusOpen || !focusMedia) return;
        if (typeof window.Vimeo === 'undefined') {
          focusMedia.classList.add('is-ready');
        }
      });
    }

    function getPreviewElements() {
      return [captionLeft, captionMeta].filter(Boolean);
    }

    function formatTime(seconds) {
      const safe = Math.max(0, Math.floor(seconds || 0));
      const mins = Math.floor(safe / 60);
      const secs = safe % 60;
      return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    }

    function updateScrubVisual(value) {
      if (!focusScrub) return;
      const numeric = Number(value) || 0;
      const progress = Math.max(0, Math.min(100, (numeric / 1000) * 100));
      focusScrub.style.setProperty('--focus-scrub-progress', progress + '%');
    }

    function updateFocusTimeline(current, duration) {
      const total = duration || focusDuration || 0;
      const seconds = Math.max(0, current || 0);

      if (focusCurrent) focusCurrent.textContent = formatTime(seconds);
      if (focusDurationEl) focusDurationEl.textContent = formatTime(total);

      if (!focusScrub) return;

      const ratio = total > 0 ? Math.min(1, seconds / total) : 0;
      const value = Math.round(ratio * 1000);
      focusScrub.value = String(value);
      focusScrub.disabled = total <= 0;
      focusScrub.setAttribute('aria-valuetext', formatTime(seconds) + ' of ' + formatTime(total));
      updateScrubVisual(value);
    }

    function setPlayButtonState(paused) {
      focusIsPaused = paused;
      if (!focusPlay) return;
      focusPlay.textContent = paused ? 'Play' : 'Pause';
      focusPlay.setAttribute('aria-label', paused ? 'Play video' : 'Pause video');
    }

    function setMuteButtonState(muted) {
      focusIsMuted = muted;
      if (!focusMute) return;
      focusMute.textContent = muted ? 'Unmute' : 'Mute';
      focusMute.setAttribute('aria-label', muted ? 'Unmute video' : 'Mute video');
    }

    function clearControlsTimer() {
      if (controlsIdleTimer) {
        clearTimeout(controlsIdleTimer);
        controlsIdleTimer = null;
      }
    }

    function scheduleControlsHide() {
      clearControlsTimer();
      if (!overlay || !focusOpen || isScrubbing || focusIsPaused) return;
      controlsIdleTimer = setTimeout(function () {
        overlay.classList.remove('is-controls-visible');
      }, 1800);
    }

    function showControls(persist) {
      if (!overlay) return;
      overlay.classList.add('is-controls-visible');
      clearControlsTimer();
      if (!persist) scheduleControlsHide();
    }

    function updateFocusNav() {
      if (focusPrev) focusPrev.disabled = currentFocusIndex <= 0;
      if (focusNext) focusNext.disabled = currentFocusIndex >= items.length - 1;
    }

    function isCurrentFocusLoad(loadToken) {
      return loadToken === focusLoadToken && focusOpen;
    }

    function completeTransition() {
      isTransitioning = false;
      if (queuedItem && !queuedItem.classList.contains('is-active')) {
        const nextItem = queuedItem;
        queuedItem = null;
        activateItem(nextItem);
      } else {
        queuedItem = null;
      }
    }

    function setPreviewCopy(index, title, meta) {
      if (captionTitle) captionTitle.textContent = title;
      if (captionMeta)  captionMeta.textContent  = meta;
    }

    function getPosterForItem(item) {
      if (!item) return Promise.resolve(null);
      const previewSrc = item.dataset.previewSrc;
      const vimeoId = item.dataset.vimeoId;
      if (!vimeoId) return Promise.resolve(previewSrc || null);
      return fetchVimeoThumb(vimeoId).then(function (thumbUrl) {
        return thumbUrl || previewSrc || null;
      });
    }

    function getFocusPosterSource(item) {
      if (!item) return '';
      if (item.classList.contains('is-active') && image) {
        return image.currentSrc || image.src || item.dataset.previewSrc || '';
      }
      return item.dataset.previewSrc || '';
    }

    function revealInlineVideo(vimeoId) {
      if (!videoFrame || !videoWrap || !vimeoId) {
        completeTransition();
        return;
      }

      videoFrame.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0&autopause=0&dnt=1`;
      videoWrap.classList.add('is-visible');

      if (useGsap) {
        gsap.fromTo(videoWrap,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.42,
            ease: 'power2.out',
            overwrite: true,
            onComplete: completeTransition
          }
        );
      } else {
        videoWrap.style.opacity = '1';
        completeTransition();
      }
    }

    function getFocusTargetRect() {
      const gutter = 88;
      const maxWidth = 1220;
      let width = Math.min(window.innerWidth - (gutter * 2), maxWidth);
      let height = width * (9 / 16);

      const maxHeight = window.innerHeight - 156;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * (16 / 9);
      }

      return {
        top: Math.round((window.innerHeight - height) / 2),
        left: Math.round((window.innerWidth - width) / 2),
        width: Math.round(width),
        height: Math.round(height)
      };
    }

    function buildFocusPlayerUrl(vimeoId) {
      return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=0&controls=0&title=0&byline=0&portrait=0&autopause=0&dnt=1`;
    }

    function syncFocusPlayerState() {
      if (!focusPlayer) return Promise.resolve();

      return Promise.all([
        focusPlayer.getDuration().catch(function () { return 0; }),
        focusPlayer.getCurrentTime().catch(function () { return 0; }),
        focusPlayer.getPaused().catch(function () { return true; }),
        focusPlayer.getMuted().catch(function () { return false; })
      ]).then(function (values) {
        focusDuration = values[0] || 0;
        updateFocusTimeline(values[1] || 0, focusDuration);
        setPlayButtonState(Boolean(values[2]));
        setMuteButtonState(Boolean(values[3]));
      });
    }

    function attachFocusPlayerEvents(player) {
      if (!player) return;

      player.on('timeupdate', function (data) {
        if (!focusOpen) return;
        if (data && data.duration) focusDuration = data.duration;
        if (!isScrubbing) {
          updateFocusTimeline(data.seconds || 0, data.duration || focusDuration);
        }
      });

      player.on('play', function () {
        if (!focusOpen) return;
        focusMedia.classList.add('is-ready');
        setPlayButtonState(false);
        showControls(false);
      });

      player.on('pause', function () {
        if (!focusOpen) return;
        setPlayButtonState(true);
        showControls(true);
      });

      player.on('ended', function () {
        if (!focusOpen) return;
        setPlayButtonState(true);
        showControls(true);
      });

      player.on('volumechange', function (data) {
        if (!focusOpen) return;
        const muted = Boolean(data && (data.muted || data.volume === 0));
        setMuteButtonState(muted);
      });
    }

    function createFocusPlayer(vimeoId, loadToken) {
      if (!focusFrame || typeof window.Vimeo === 'undefined' || !vimeoId) return Promise.resolve();

      focusFrame.src = buildFocusPlayerUrl(vimeoId);
      focusPlayer = new window.Vimeo.Player(focusFrame);
      attachFocusPlayerEvents(focusPlayer);

      return focusPlayer.ready()
        .then(function () {
          if (!isCurrentFocusLoad(loadToken)) return null;
          return syncFocusPlayerState();
        })
        .then(function () {
          if (!isCurrentFocusLoad(loadToken)) return null;
          return focusPlayer.play().catch(function () {});
        })
        .then(function () {
          if (!isCurrentFocusLoad(loadToken)) return null;
          return syncFocusPlayerState();
        });
    }

    function loadFocusVideo(vimeoId, loadToken) {
      if (!focusFrame || !vimeoId) return Promise.resolve();

      if (typeof window.Vimeo === 'undefined') {
        focusFrame.src = buildFocusPlayerUrl(vimeoId);
        return Promise.resolve();
      }

      if (!focusPlayer) {
        return createFocusPlayer(vimeoId, loadToken);
      }

      return focusPlayer.loadVideo(Number(vimeoId))
        .then(function () {
          if (!isCurrentFocusLoad(loadToken)) return null;
          return focusPlayer.setMuted(false).catch(function () {});
        })
        .then(function () {
          if (!isCurrentFocusLoad(loadToken)) return null;
          return focusPlayer.play().catch(function () {});
        })
        .then(function () {
          if (!isCurrentFocusLoad(loadToken)) return null;
          return syncFocusPlayerState();
        });
    }

    function setActiveItemState(item) {
      items.forEach(function (el) {
        el.classList.remove('is-active');
        el.setAttribute('aria-selected', 'false');
      });
      item.classList.add('is-active');
      item.setAttribute('aria-selected', 'true');
    }

    function activateItem(item) {
      if (isTransitioning) {
        queuedItem = item;
        return;
      }
      if (item.classList.contains('is-active')) return;

      setActiveItemState(item);

      const newSrc     = item.dataset.previewSrc;
      const newVimeoId = item.dataset.vimeoId;
      const newIndex   = item.dataset.previewIndex;
      const newTitle   = item.dataset.previewTitle;
      const newMeta    = item.dataset.previewCaptionMeta || item.dataset.previewMeta;
      const previewEls = getPreviewElements();
      const requestId  = ++activeRequestId;

      isTransitioning = true;

      if (useGsap) {
        gsap.killTweensOf([image, videoWrap].filter(Boolean));
        gsap.killTweensOf(previewEls);

        gsap.to(image, {
          opacity: 0.14,
          duration: 0.18,
          ease: 'power2.in',
          overwrite: true
        });

        if (videoWrap) {
          gsap.to(videoWrap, {
            opacity: 0,
            duration: 0.18,
            ease: 'power2.in',
            overwrite: true,
            onComplete: function () {
              videoWrap.classList.remove('is-visible');
            }
          });
        }

        if (previewEls.length) {
          gsap.to(previewEls, {
            autoAlpha: 0.24,
            duration: 0.16,
            ease: 'power1.in',
            stagger: 0.04,
            overwrite: true
          });
        }
      } else {
        if (image) image.style.opacity = '0.14';
        if (videoWrap) {
          videoWrap.classList.remove('is-visible');
          videoWrap.style.opacity = '0';
        }
      }

      getPosterForItem(item).then(function (posterSrc) {
        if (requestId !== activeRequestId) return;

        if (videoFrame && !newVimeoId) {
          videoFrame.src = '';
        }

        setPreviewCopy(newIndex, newTitle, newMeta);

        if (image && (posterSrc || newSrc)) {
          image.src = posterSrc || newSrc;
          image.alt = newTitle ? newTitle + ' preview' : 'Work preview';
        }

        if (useGsap) {
          gsap.to(image, {
            opacity: 0.88,
            duration: 0.32,
            ease: 'power2.out',
            overwrite: true
          });

          if (previewEls.length) {
            gsap.to(previewEls, {
              autoAlpha: 1,
              duration: 0.28,
              ease: 'power2.out',
              stagger: 0.05,
              overwrite: true
            });
          }
        } else if (image) {
          image.style.opacity = '0.88';
        }

        if (newVimeoId) {
          const revealDelay = useGsap ? 0.12 : 120;
          if (useGsap) {
            gsap.delayedCall(revealDelay, function () {
              if (requestId === activeRequestId) revealInlineVideo(newVimeoId);
            });
          } else {
            setTimeout(function () {
              if (requestId === activeRequestId) revealInlineVideo(newVimeoId);
            }, revealDelay);
          }
        } else {
          completeTransition();
        }
      }).catch(function () {
        completeTransition();
      });
    }

    function setFocusCopyFromItem(item) {
      if (!item) return;
      currentFocusIndex = Math.max(items.indexOf(item), 0);
      updateFocusNav();

      if (focusTitle) focusTitle.textContent = item.dataset.previewTitle || '';
      if (focusMeta)  focusMeta.textContent  = item.dataset.previewMeta || '';

      focusDuration = 0;
      updateFocusTimeline(0, 0);
      setPlayButtonState(true);
      setMuteButtonState(false);

      const immediatePoster = getFocusPosterSource(item);
      focusMedia.classList.remove('is-ready');
      focusMedia.style.backgroundImage = immediatePoster ? `url("${immediatePoster}")` : '';

      getPosterForItem(item).then(function (posterSrc) {
        if (!focusOpen || items[currentFocusIndex] !== item || !posterSrc) return;
        focusMedia.style.backgroundImage = `url("${posterSrc}")`;
      });
    }

    function commitScrubValue(rawValue) {
      if (!focusPlayer || !focusDuration) return;
      const ratio = (Number(rawValue) || 0) / 1000;
      const targetSeconds = ratio * focusDuration;
      focusPlayer.setCurrentTime(targetSeconds).catch(function () {});
    }

    function queueScrubCommit(rawValue) {
      if (scrubCommitTimer) clearTimeout(scrubCommitTimer);
      scrubCommitTimer = setTimeout(function () {
        commitScrubValue(rawValue);
      }, 80);
    }

    function showFocusItem(item, options) {
      if (!overlay || !focusMedia) return;

      const config = options || {};
      const preserveOverlay = Boolean(config.preserveOverlay);
      const fromRect = plate.getBoundingClientRect();
      const toRect = getFocusTargetRect();
      const loadToken = ++focusLoadToken;

      setFocusCopyFromItem(item);

      if (!preserveOverlay) {
        overlay.setAttribute('aria-hidden', 'false');
        overlay.classList.add('is-open', 'is-controls-visible');
        document.body.style.overflow = 'hidden';
        focusOpen = true;
      } else {
        overlay.classList.add('is-controls-visible');
      }

      if (videoFrame) videoFrame.src = '';
      if (videoWrap) {
        videoWrap.classList.remove('is-visible');
        videoWrap.style.opacity = '0';
      }

      const loadVideoPromise = loadFocusVideo(item.dataset.vimeoId, loadToken).catch(function () {});

      if (preserveOverlay) {
        if (useGsap && focusCaption) {
          gsap.fromTo(focusCaption,
            { autoAlpha: 0.34 },
            { autoAlpha: 1, duration: 0.24, ease: 'power2.out', overwrite: true }
          );
        }
        showControls(true);
        return loadVideoPromise;
      }

      if (!useGsap) {
        focusMedia.style.top = toRect.top + 'px';
        focusMedia.style.left = toRect.left + 'px';
        focusMedia.style.width = toRect.width + 'px';
        focusMedia.style.height = toRect.height + 'px';
        return loadVideoPromise;
      }

      gsap.killTweensOf([overlay, focusMedia, focusCaption, focusClose].filter(Boolean));

      const tl = gsap.timeline();

      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(focusMedia, {
        autoAlpha: 1,
        top: fromRect.top,
        left: fromRect.left,
        width: fromRect.width,
        height: fromRect.height,
        borderRadius: 8
      });
      if (focusCaption) gsap.set(focusCaption, { autoAlpha: 0 });
      if (focusClose) gsap.set(focusClose, { autoAlpha: 0 });

      tl.to(overlay, {
        autoAlpha: 1,
        duration: 0.28,
        ease: 'power2.out'
      }, 0);

      tl.to(focusMedia, {
        top: toRect.top,
        left: toRect.left,
        width: toRect.width,
        height: toRect.height,
        borderRadius: 18,
        duration: 0.56,
        ease: 'power3.inOut'
      }, 0.02);

      if (focusCaption) {
        tl.to(focusCaption, {
          autoAlpha: 1,
          duration: 0.22,
          ease: 'power2.out'
        }, 0.26);
      }

      if (focusClose) {
        tl.to(focusClose, {
          autoAlpha: 1,
          duration: 0.24,
          ease: 'power2.out'
        }, 0.24);
      }

      return loadVideoPromise;
    }

    function openFocus(item) {
      if (!item) return;
      activateItem(item);
      showFocusItem(item, { preserveOverlay: focusOpen });
    }

    function openFocusByIndex(index) {
      const item = items[index];
      if (!item) return;
      openFocus(item);
    }

    function closeFocus() {
      if (!overlay || !focusMedia) return;

      focusOpen = false;
      focusLoadToken += 1;
      clearControlsTimer();
      if (scrubCommitTimer) {
        clearTimeout(scrubCommitTimer);
        scrubCommitTimer = null;
      }
      isScrubbing = false;
      const returnRect = plate.getBoundingClientRect();

      if (focusPlayer) {
        focusPlayer.pause().catch(function () {});
        focusPlayer.unload().catch(function () {});
      }

      overlay.classList.remove('is-controls-visible');
      focusDuration = 0;
      updateFocusTimeline(0, 0);
      setPlayButtonState(true);
      setMuteButtonState(false);

      if (!useGsap) {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        focusMedia.classList.remove('is-ready');
        focusMedia.style.backgroundImage = '';
        return;
      }

      gsap.killTweensOf([overlay, focusMedia, focusCaption, focusClose].filter(Boolean));

      const tl = gsap.timeline({
        onComplete: function () {
          overlay.classList.remove('is-open');
          overlay.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
          focusMedia.classList.remove('is-ready');
          focusMedia.style.backgroundImage = '';
          gsap.set(focusMedia, { autoAlpha: 0 });
          if (focusCaption) gsap.set(focusCaption, { autoAlpha: 0 });
          if (focusClose) gsap.set(focusClose, { autoAlpha: 0 });
        }
      });

      const fadeOutEls = [focusCaption, focusClose].filter(Boolean);
      if (fadeOutEls.length) {
        tl.to(fadeOutEls, { autoAlpha: 0, duration: 0.15, ease: 'power1.in' });
      }

      tl.to(focusMedia, {
        top: returnRect.top,
        left: returnRect.left,
        width: returnRect.width,
        height: returnRect.height,
        borderRadius: 8,
        duration: 0.38,
        ease: 'power2.inOut'
      }, '-=0.03');

      tl.to(overlay, {
        autoAlpha: 0,
        duration: 0.28,
        ease: 'power2.in'
      }, '-=0.22');
    }

    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () { activateItem(item); });
      item.addEventListener('focus', function () { activateItem(item); });
      item.addEventListener('click', function () { openFocus(item); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          openFocus(item);
        }
        if (e.key === ' ') {
          e.preventDefault();
          activateItem(item);
        }
      });
    });

    if (focusClose) {
      focusClose.addEventListener('click', closeFocus);
    }

    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeFocus();
      });

      ['mousemove', 'mouseenter', 'focusin'].forEach(function (eventName) {
        overlay.addEventListener(eventName, function () {
          showControls(false);
        });
      });
    }

    if (focusPlay) {
      focusPlay.addEventListener('click', function () {
        if (!focusPlayer) return;
        showControls(true);
        if (focusIsPaused) {
          focusPlayer.play().catch(function () {});
        } else {
          focusPlayer.pause().catch(function () {});
        }
      });
    }

    if (focusMute) {
      focusMute.addEventListener('click', function () {
        if (!focusPlayer) return;
        showControls(true);
        focusPlayer.setMuted(!focusIsMuted).catch(function () {});
      });
    }

    if (focusPrev) {
      focusPrev.addEventListener('click', function () {
        if (currentFocusIndex > 0) openFocusByIndex(currentFocusIndex - 1);
      });
    }

    if (focusNext) {
      focusNext.addEventListener('click', function () {
        if (currentFocusIndex < items.length - 1) openFocusByIndex(currentFocusIndex + 1);
      });
    }

    if (focusScrub) {
      updateScrubVisual(focusScrub.value);

      focusScrub.addEventListener('pointerdown', function () {
        isScrubbing = true;
        showControls(true);
      });

      focusScrub.addEventListener('focus', function () {
        isScrubbing = true;
        showControls(true);
      });

      focusScrub.addEventListener('input', function (e) {
        const rawValue = e.target.value;
        const previewTime = focusDuration ? (Number(rawValue) / 1000) * focusDuration : 0;
        updateFocusTimeline(previewTime, focusDuration);
        queueScrubCommit(rawValue);
      });

      focusScrub.addEventListener('change', function (e) {
        commitScrubValue(e.target.value);
        isScrubbing = false;
        scheduleControlsHide();
      });

      focusScrub.addEventListener('blur', function () {
        isScrubbing = false;
        scheduleControlsHide();
      });
    }

    document.addEventListener('pointerup', function () {
      if (!isScrubbing) return;
      isScrubbing = false;
      scheduleControlsHide();
    });

    document.addEventListener('pointercancel', function () {
      if (!isScrubbing) return;
      isScrubbing = false;
      scheduleControlsHide();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && focusOpen) closeFocus();
    });

    var initialItem = list.querySelector('.work-item.is-active');
    if (initialItem && image) {
      getPosterForItem(initialItem).then(function (thumbUrl) {
        if (thumbUrl) { image.src = thumbUrl; }
      });
    }

    window.setTimeout(function () {
      items.forEach(function (item) {
        if (item.dataset.vimeoId) fetchVimeoThumb(item.dataset.vimeoId);
      });
    }, 500);

    window.addEventListener('resize', function () {
      if (!focusOpen || !focusMedia || !useGsap) return;
      const rect = getFocusTargetRect();
      gsap.set(focusMedia, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    });
  }

  // ─── SERVICES: Click accordion ───────────────────────────────────────────

  function initServicesAccordion() {
    const rows = Array.from(document.querySelectorAll('.service-row'));
    if (!rows.length) return;

    const useGsap = typeof gsap !== 'undefined' && !prefersReducedMotion;

    if (useGsap) {
      rows.forEach(row => {
        const desc = row.querySelector('.service-row__desc');
        const ext = row.querySelector('.service-row__extended');
        if (desc) gsap.set(desc, { autoAlpha: 1 });
        if (ext) gsap.set(ext, { autoAlpha: 0 });
      });
    }

    function closeRow(row) {
      const desc = row.querySelector('.service-row__desc');
      const ext = row.querySelector('.service-row__extended');

      row.classList.remove('is-open');
      row.setAttribute('aria-expanded', 'false');

      if (!useGsap) return;

      gsap.killTweensOf([desc, ext].filter(Boolean));
      if (ext) {
        gsap.to(ext, {
          autoAlpha: 0,
          duration: 0.14,
          ease: 'power1.in',
          overwrite: true
        });
      }
      if (desc) {
        gsap.to(desc, {
          autoAlpha: 1,
          duration: 0.18,
          ease: 'power2.out',
          overwrite: true
        });
      }
    }

    rows.forEach(row => {
      const detail = row.querySelector('.service-row__detail');
      if (!detail) return;

      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');
      row.setAttribute('aria-expanded', 'false');

      function toggle() {
        const isOpen = row.classList.contains('is-open');
        const desc = row.querySelector('.service-row__desc');
        const ext = row.querySelector('.service-row__extended');

        rows.forEach(closeRow);

        if (isOpen) {
          return;
        }

        row.classList.add('is-open');
        row.setAttribute('aria-expanded', 'true');

        if (!useGsap) return;

        gsap.killTweensOf([desc, ext].filter(Boolean));

        const tl = gsap.timeline();

        if (desc) {
          tl.to(desc, {
            autoAlpha: 0.52,
            duration: 0.18,
            ease: 'power1.out'
          }, 0);
        }

        if (ext) {
          tl.fromTo(ext,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.34, ease: 'power2.out' },
            0.16
          );
        }
      }

      row.addEventListener('click', toggle);
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
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

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  // ─── CONTACT: Focus states ───────────────────────────────────────────────

  function initContactForm() {
    const form = document.querySelector('.js-contact-form');
    if (!form) return;

    const fields = form.querySelectorAll('.js-field-focus');
    const status = form.querySelector('.js-contact-form-status');
    const btn = form.querySelector('button[type="submit"]');
    const submitLabel = btn ? btn.textContent : '';

    function showStatus(message, state) {
      if (!status) return;
      status.hidden = false;
      status.textContent = message;
      status.dataset.state = state;
    }

    function clearStatus() {
      if (!status) return;
      status.hidden = true;
      status.textContent = '';
      delete status.dataset.state;
    }

    fields.forEach(field => {
      const input = field.querySelector('.form-field__input');
      if (!input) return;

      input.addEventListener('focus', () => field.classList.add('is-focused'));
      input.addEventListener('input', () => {
        field.classList.remove('is-error');
        clearStatus();
      });
      input.addEventListener('blur', () => {
        field.classList.remove('is-focused');
        if (input.value.trim()) field.classList.add('has-value');
        else field.classList.remove('has-value');
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;
      fields.forEach(field => {
        const input = field.querySelector('.form-field__input');
        if (input && !input.checkValidity()) {
          field.classList.add('is-error');
          isValid = false;
        } else {
          field.classList.remove('is-error');
        }
      });

      if (!isValid) {
        showStatus('Please complete the required fields before sending your enquiry.', 'error');
        return;
      }

      clearStatus();

      if (!btn) return;

      btn.disabled = true;
      btn.textContent = 'SENDING ———';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            Accept: 'application/json'
          }
        });

        const result = await response.json().catch(function () { return {}; });

        if (!response.ok || result.success === false) {
          throw new Error('Submission failed');
        }

        showStatus('Inquiry sent. Sebastian will reply by email once it arrives in the inbox.', 'success');
        btn.textContent = 'SENT ——— ✓';
        form.reset();
        fields.forEach(f => {
          f.classList.remove('has-value', 'is-focused', 'is-error');
        });
      } catch (error) {
        showStatus('Submission is unavailable right now. Please use the email address on the left.', 'error');
        btn.textContent = submitLabel;
      } finally {
        btn.disabled = false;
      }
    });
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
    initNavHide();
    initVimeoBackground('.js-hero-media .js-vimeo-target', '.js-video-fallback');
    initVimeoBackground('.js-cinematic-media .js-vimeo-target', '.js-video-fallback');
    initWorkPreview();
    initServicesAccordion();
    initContactForm();
    initNavSpy();
  });

})();
