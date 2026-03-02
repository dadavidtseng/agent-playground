// Progressive enhancement for stat bar animations
// On mount we read data-value and set widths; update aria-valuenow for screen readers

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const bars = document.querySelectorAll('.stat-bar');

  function setBarWidth(bar, value, animate = true){
    const fill = bar.querySelector('.stat-fill');
    const clamped = Math.max(0, Math.min(100, Number(value) || 0));

    // Set aria-valuenow for assistive tech
    bar.setAttribute('aria-valuenow', String(clamped));

    if(prefersReduced || !animate){
      // No animation: set width immediately
      fill.style.width = clamped + '%';
      return;
    }

    // Force layout then set to target to kick off CSS transition
    requestAnimationFrame(() => {
      // set to 0 first (in case) then next frame to target
      fill.style.width = '0%';
      requestAnimationFrame(() => {
        fill.style.width = clamped + '%';
      });
    });
  }

  bars.forEach(bar => {
    const value = bar.dataset.value;
    // initialize with 0 width for animation
    const fill = bar.querySelector('.stat-fill');
    fill.style.width = '0%';

    // Set after small timeout to stagger
    const delay = Math.random() * 250 + 50;
    setTimeout(() => setBarWidth(bar, value, true), delay);

    // Animate on hover/focus for re-trigger
    const onEnter = () => setBarWidth(bar, bar.dataset.value, true);
    bar.parentElement.addEventListener('mouseenter', onEnter);
    bar.parentElement.addEventListener('focusin', onEnter);
  });

  // Also support a custom event to re-run animation
  document.addEventListener('reanimate-stats', () => {
    bars.forEach(bar => setBarWidth(bar, bar.dataset.value, true));
  });
});
