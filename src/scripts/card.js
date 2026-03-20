// Minimal ES module to animate stat bars and update ARIA

export function animateStatBars(root = document){
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const statContainers = Array.from(root.querySelectorAll('.card__stats'));
  statContainers.forEach(container => {
    const stats = Array.from(container.querySelectorAll('.stat'));
    stats.forEach(stat => {
      const percent = Number(stat.getAttribute('data-stat-percent')) || 0;
      const fill = stat.querySelector('.stat__fill');
      // Apply width (use requestAnimationFrame for layout)
      if(prefersReduced){
        // No animation: set width immediately and update aria
        if(fill) fill.style.width = `${percent}%`;
        stat.setAttribute('aria-valuenow', String(percent));
      } else {
        // Start from 0 (already in CSS). Force layout then set width to trigger transition.
        if(fill){
          // ensure starting at 0
          fill.style.width = '0%';
          // avoid measuring in same frame
          requestAnimationFrame(() => {
            // small delay to stagger
            const delay = Math.min(300, Math.random() * 300);
            setTimeout(() => {
              fill.style.width = `${percent}%`;
            }, delay);
          });
        }
        // Update aria-valuenow when transition ends
        const onTransitionEnd = (e) => {
          if(e.target !== fill) return;
          stat.setAttribute('aria-valuenow', String(percent));
          fill.removeEventListener('transitionend', onTransitionEnd);
        };
        if(fill) fill.addEventListener('transitionend', onTransitionEnd);
      }
    });
  });
}

// Auto-run on DOMContentLoaded
if(typeof window !== 'undefined'){
  window.addEventListener('DOMContentLoaded', () => {
    // run for the demo
    animateStatBars(document);
  });
}

// Small smoke test helper for Node (exposed via module.exports in CommonJS environment)
if(typeof module !== 'undefined' && module.exports){
  module.exports.animateStatBars = animateStatBars;
}
