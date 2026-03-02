// CharacterCard behavior: animate stat bars on mount while respecting prefers-reduced-motion
// and update ARIA attributes for progressbar elements.

const AUTO_INIT_SELECTOR = '.character-card';

function animateStatBars(root = document) {
  const cards = root.querySelectorAll(AUTO_INIT_SELECTOR);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cards.forEach(card => {
    const stats = card.querySelectorAll('.stat');
    stats.forEach(stat => {
      const meter = stat.querySelector('.stat__meter');
      const bar = stat.querySelector('.stat__bar');
      const value = parseInt(stat.getAttribute('data-value') || '0', 10);
      const target = Math.max(0, Math.min(100, value));

      // set target as CSS variable for width
      bar.style.setProperty('--target', `${target}%`);

      // Update progressbar ARIA now to final value when animation completes.
      const progress = meter;
      if (progress) {
        progress.setAttribute('aria-valuenow', '0');
        // On reduced motion, set immediately
        if (reduceMotion) {
          bar.style.width = `${target}%`;
          progress.setAttribute('aria-valuenow', String(target));
          stat.setAttribute('data-animated', '');
        } else {
          // Trigger layout then set attribute to allow CSS transition
          // Use requestAnimationFrame twice to ensure transition
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              stat.setAttribute('data-animated', '');
              // After transition duration, set aria-valuenow to final value
              const computedDuration = 900; // ms matches CSS
              setTimeout(() => {
                progress.setAttribute('aria-valuenow', String(target));
              }, computedDuration);
            });
          });
        }
      }
    });
  });
}

// Auto-init on DOMContentLoaded
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => animateStatBars(document));
}

export { animateStatBars };
