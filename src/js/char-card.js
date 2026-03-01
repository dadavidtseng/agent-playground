/*
 Lightweight vanilla JS module to animate character stat bars when .char-card
 elements enter the viewport. Designed for progressive enhancement: if JS is
 disabled, the page should retain its static fallback stat bar widths.

 Features:
 - Reads data attributes (data-hp, data-attack, data-defense, data-speed)
   from each .char-card element
 - Uses IntersectionObserver to detect when a card becomes visible and then
   animates stat bar fills (via CSS transitions where available)
 - Toggles `is-visible` class on the card and `is-idle` on inline SVG parts
   (elements with an id inside the card) so SVG parts can be animated by CSS
 - Exposes a small public API: CharCard.init() to scan/re-scan dynamically
   added cards

 Usage (basic):
 - Include this script on the page. It will auto-init on DOMContentLoaded.
 - Mark up each card like:
     <div class="char-card" data-hp="75" data-attack="40" data-defense="60" data-speed="25">
       <div class="stat stat-hp" data-stat="hp"><div class="stat-fill"></div></div>
       <div class="stat stat-attack" data-stat="attack"><div class="stat-fill"></div></div>
       ...
       <!-- inline SVG targetable by id -->
       <svg> <g id="sword">...</g> </svg>
     </div>
 - The script will find .stat elements by looking for an element inside the
   card matching one of these selectors (in order):
     [data-stat="hp"] .stat-fill, [data-stat="hp"], .stat-hp .stat-fill, .stat-hp
   and set the width of the fill element to the percentage read from the
   card's data attributes when the card becomes visible.

 Notes on progressive enhancement:
 - If JS is disabled, this script won't run and any server/CSS-provided static
   widths will remain visible. This script only enhances the experience by
   animating from 0 to the target widths.
*/
(function (global) {
  'use strict';

  var STATS = ['hp', 'attack', 'defense', 'speed'];
  var DEFAULT_DURATION = 800; // ms for JS-driven fallback animation

  // Keep track of observed cards to avoid double-observing
  var observed = new WeakSet();
  var observer = null;

  // Helper: clamp number 0-100
  function clampPercent(v) {
    v = Number(v) || 0;
    if (v < 0) return 0;
    if (v > 100) return 100;
    return Math.round(v);
  }

  // Find the element that represents the fill for a given stat inside a card.
  // Tries multiple common selectors for robustness.
  function findFillElement(card, stat) {
    var selCandidates = [
      '[data-stat="' + stat + '"] .stat-fill',
      '[data-stat="' + stat + '"]',
      '.stat-' + stat + ' .stat-fill',
      '.stat-' + stat,
      '.stat-' + stat + '__fill'
    ];

    for (var i = 0; i < selCandidates.length; i++) {
      var el = card.querySelector(selCandidates[i]);
      if (el) return el;
    }
    return null;
  }

  // Apply width using CSS transition if available, otherwise use rAF-based.
  function animateToWidth(el, percent) {
    if (!el) return;
    // If already animated once, skip
    if (el.__charcard_animated) return;

    // Ensure the element has an explicit box-sizing and display suitable for width.
    // The page's CSS should handle this; we only set inline width & transition.

    // Try CSS transition: set a width and let CSS animate it
    try {
      // Provide a short inline transition in case author didn't provide one
      if (!el.style.transition) {
        el.style.transition = 'width ' + DEFAULT_DURATION + 'ms ease-out';
      }
      // Force layout then set width
      el.style.willChange = 'width';
      el.getBoundingClientRect();
      el.style.width = percent + '%';
      el.__charcard_animated = true;
    } catch (e) {
      // Fallback to rAF animation
      rAFAnimateWidth(el, percent);
    }
  }

  function rAFAnimateWidth(el, targetPercent) {
    var start = null;
    var from = 0;
    // parse current width as percent if available
    var cur = parseFloat(el.style.width);
    if (!isNaN(cur)) from = cur;
    var delta = targetPercent - from;
    var duration = DEFAULT_DURATION;

    function step(ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - t, 3);
      var value = from + delta * eased;
      el.style.width = value + '%';
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        el.__charcard_animated = true;
      }
    }
    requestAnimationFrame(step);
  }

  // When a card becomes visible, animate all stat fills based on the card's data-
  // attributes. Also toggle classes for SVG parts.
  function revealCard(card) {
    if (!card || card.__charcard_revealed) return;
    card.__charcard_revealed = true;
    card.classList.add('is-visible');

    STATS.forEach(function (stat) {
      var val = clampPercent(card.dataset[stat]);
      var fill = findFillElement(card, stat);
      if (fill) {
        // If the author set a fallback static width in markup (for no-JS), we
        // override it to start from 0 so an animation is visible. If the
        // fallback relies on the element keeping its width when JS is disabled,
        // it will remain since this code won't run when JS is disabled.
        // Ensure starting point is minimal so CSS transition runs.
        fill.style.width = '0%';
        // Trigger layout before animating
        fill.getBoundingClientRect();
        // animate to target
        animateToWidth(fill, val);
      }
    });

    // Toggle idle class on inline SVG parts: any element inside the card with an
    // id attribute (e.g., <g id="sword">) will receive the 'is-idle' class so
    // authors can write CSS animations targeting #sword.is-idle or similar.
    try {
      var svgParts = card.querySelectorAll('svg [id]');
      svgParts.forEach(function (el) {
        el.classList.add('is-idle');
      });
    } catch (e) {
      // ignore
    }
  }

  // Observe a card element if not already observed
  function observeCard(card) {
    if (observed.has(card)) return;
    observed.add(card);

    if ('IntersectionObserver' in window) {
      if (!observer) {
        observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              revealCard(entry.target);
              // Unobserve after reveal to avoid repeated work
              if (observer) observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
      }
      observer.observe(card);
    } else {
      // No IntersectionObserver - reveal immediately
      revealCard(card);
    }
  }

  // Scan the DOM for .char-card elements and set them up
  function scanAndObserve(root) {
    root = root || document;
    var cards = Array.prototype.slice.call(root.querySelectorAll('.char-card'));
    cards.forEach(function (card) {
      // don't clobber cards that are already revealed/observed
      observeCard(card);
    });
  }

  // Public API
  function init(context) {
    // Allows passing a context element to scan only that subtree.
    scanAndObserve(context || document);
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
    });
  } else {
    // already ready
    init();
  }

  // Export to global namespace as CharCard with a small API
  global.CharCard = global.CharCard || {};
  global.CharCard.init = init;

})(typeof window !== 'undefined' ? window : this);
