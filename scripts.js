// scripts.js — Animate stat bars from 0 -> target using requestAnimationFrame

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateProgressBar(progressEl, targetValue) {
    const bar = progressEl.querySelector('.cc-progress__bar');
    if (!bar) return;

    const min = Number(progressEl.getAttribute('aria-valuemin')) || 0;
    const max = Number(progressEl.getAttribute('aria-valuemax')) || 100;
    const start = min;
    const end = Math.max(min, Math.min(max, Number(targetValue)));

    // Update aria-valuenow to reflect current value during animation
    progressEl.setAttribute('aria-valuenow', start);

    if (prefersReducedMotion) {
      // Set final state immediately
      const percent = ((end - min) / (max - min)) * 100;
      bar.style.width = percent + '%';
      progressEl.setAttribute('aria-valuenow', String(end));
      return;
    }

    const duration = 900; // ms
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic approximation
      const eased = 1 - Math.pow(1 - progress, 3);
      const valueNow = Math.round(start + (end - start) * eased);
      const percent = ((valueNow - min) / (max - min)) * 100;
      bar.style.width = percent + '%';
      progressEl.setAttribute('aria-valuenow', String(valueNow));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // ensure final state
        bar.style.width = ((end - min) / (max - min) * 100) + '%';
        progressEl.setAttribute('aria-valuenow', String(end));
      }
    }

    window.requestAnimationFrame(step);
  }

  function init() {
    const progressEls = document.querySelectorAll('.cc-progress[data-target]');
    progressEls.forEach(el => {
      const target = el.getAttribute('data-target');
      // Defer animation slightly to allow render
      setTimeout(() => animateProgressBar(el, target), 80);

      // Keyboard interaction: pressing Enter/Space toggles to full then back (demo)
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          // For accessibility, announce value to screen reader by toggling aria-valuenow to current
          const current = Number(el.getAttribute('aria-valuenow')) || 0;
          // simple flash to indicate interaction
          el.classList.add('cc-progress--active');
          setTimeout(() => el.classList.remove('cc-progress--active'), 200);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
