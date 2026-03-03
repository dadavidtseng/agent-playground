// character-card.js
// Handles stat bar animations using Intersection Observer and keyboard accessibility

(function () {
  function animateBar(bar, value) {
    bar.style.setProperty('--bar-target', value + '%');
    // ensure aria attributes are updated progressively for assistive tech
    const start = 0;
    const end = value;
    const duration = 800; // ms
    const stepTime = 20;
    const steps = Math.max(1, Math.floor(duration / stepTime));
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.round((currentStep / steps) * (end - start) + start);
      bar.setAttribute('aria-valuenow', progress);
      if (currentStep >= steps) {
        clearInterval(interval);
        bar.setAttribute('aria-valuenow', end);
      }
    }, stepTime);
  }

  function revealOnIntersect(entries, obs) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const value = parseInt(bar.getAttribute('data-value'), 10);
        bar.classList.add('animating');
        animateBar(bar, value);
        // expand width CSS-driven
        bar.style.width = value + '%';
        obs.unobserve(bar);
      }
    });
  }

  function init() {
    const bars = document.querySelectorAll('.stat-bar');
    if (!bars.length) return;

    // set initial styles
    bars.forEach((bar) => {
      bar.style.width = '0%';
      bar.addEventListener('keydown', (e) => {
        // allow arrow keys to adjust value for demo accessibility
        const key = e.key;
        if (!['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(key)) return;
        e.preventDefault();
        const cur = parseInt(bar.getAttribute('aria-valuenow') || '0', 10);
        const step = 5;
        let next = cur;
        if (key === 'ArrowRight' || key === 'ArrowUp') next = Math.min(100, cur + step);
        if (key === 'ArrowLeft' || key === 'ArrowDown') next = Math.max(0, cur - step);
        bar.setAttribute('aria-valuenow', next);
        bar.style.width = next + '%';
      });
    });

    // use intersection observer when available
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(revealOnIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      });
      bars.forEach((bar) => io.observe(bar));
    } else {
      // fallback: animate on load
      window.addEventListener('load', () => {
        bars.forEach((bar) => {
          const value = parseInt(bar.getAttribute('data-value'), 10) || 0;
          animateBar(bar, value);
          bar.style.width = value + '%';
        });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
