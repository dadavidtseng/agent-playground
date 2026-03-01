// Minimal modular JS for the stat bar animations and interactions
const STAT_SELECTOR = '.stat-bar';
const UPDATE_BTN_SELECTOR = '.btn.update';

function prefersReducedMotion(){
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setBarValue(bar, value, duration){
  const clamped = Math.max(0, Math.min(100, Number(value)));
  const el = bar;
  // Set aria attributes
  el.setAttribute('aria-valuenow', String(clamped));
  // Use inline style to trigger transition (width)
  // If reduced motion, set immediately
  if(prefersReducedMotion()){
    el.style.transition = 'none';
    el.style.width = clamped + '%';
    return;
  }
  // Apply custom duration if provided
  if(duration){
    el.style.transition = `width ${duration}ms cubic-bezier(.2,.9,.2,1)`;
  }
  requestAnimationFrame(()=>{
    el.style.width = clamped + '%';
  });
}

function initStatBars(root = document){
  const bars = Array.from(root.querySelectorAll(STAT_SELECTOR));
  bars.forEach(bar => {
    const val = bar.dataset.value || bar.getAttribute('aria-valuenow') || 0;
    const durAttr = bar.dataset.animDuration;
    const duration = durAttr ? Number(durAttr) : undefined;
    // initialize width at 0 for animation
    bar.style.width = '0%';
    // ensure aria role and values
    if(!bar.hasAttribute('role')){
      bar.setAttribute('role','progressbar');
    }
    bar.setAttribute('aria-valuemin','0');
    bar.setAttribute('aria-valuemax','100');

    // Defer to next frame for load animation
    window.setTimeout(()=> setBarValue(bar, val, duration), 60);
  });
}

function randomizeStats(container){
  const bars = Array.from(container.querySelectorAll(STAT_SELECTOR));
  bars.forEach(bar => {
    const random = Math.floor(Math.random()*46) + 50; // 50..95
    bar.dataset.value = String(random);
    setBarValue(bar, random, Number(bar.dataset.animDuration || 600));
    // update visible number if present
    const statVal = bar.closest('dd')?.querySelector('.stat-value');
    if(statVal) statVal.textContent = String(random);
  });
}

function setupInteractions(){
  document.querySelectorAll(UPDATE_BTN_SELECTOR).forEach(btn => {
    btn.addEventListener('click', e => {
      const card = btn.closest('.profile-card');
      if(card) randomizeStats(card);
      btn.focus();
    });

    // keyboard activation
    btn.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        btn.click();
      }
    });
  });

  // make profile cards keyboard-focusable and actionable via Enter
  document.querySelectorAll('.profile-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if(e.key === 'Enter'){
        // focus first button
        const btn = card.querySelector('.btn');
        if(btn) btn.focus();
      }
    });
  });
}

// Auto-init on DOM ready
window.addEventListener('DOMContentLoaded', ()=>{
  initStatBars(document);
  setupInteractions();
});

export { initStatBars, setBarValue, randomizeStats };
