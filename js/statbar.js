(function(){
  'use strict';

  // Utility: detect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Animate stat fills using transform (scaleX) to avoid layout thrash
  function animateStats(root=document){
    const fills = Array.from(root.querySelectorAll('.stat-fill'));
    fills.forEach(fill=>{
      const value = Number(fill.getAttribute('data-value')) || 0;
      const pct = Math.max(0, Math.min(100, value));
      // set aria-valuenow and visible value
      fill.setAttribute('aria-valuenow', String(pct));
      const statValueEl = fill.closest('.stat').querySelector('.stat-value');
      if(statValueEl){ statValueEl.textContent = pct + '%'; }

      // Use transform for animation: scaleX(0) -> scaleX(pct/100)
      const finalScale = pct/100;
      // If reduced motion is requested, apply final state immediately
      if(prefersReduced){
        fill.style.transform = `scaleX(${finalScale})`;
        fill.style.width = `${pct}%`; // fallback
        return;
      }

      // For animation use Web Animations API if available
      const useWA = typeof fill.animate === 'function';
      if(useWA){
        fill.style.transform = 'scaleX(0)';
        fill.animate([
          { transform: 'scaleX(0)', opacity: 0.85 },
          { transform: `scaleX(${finalScale})`, opacity: 1 }
        ],{
          duration: 800 + (200 * Math.random()),
          easing: 'cubic-bezier(.2,.9,.2,1)',
          fill: 'forwards'
        });
      } else {
        // Fallback to CSS transition on transform
        fill.style.transform = `scaleX(${finalScale})`;
      }
    });
  }

  // Toggle bio collapsed state
  function setupBioToggle(){
    const btn = document.getElementById('showMoreBtn');
    const bio = document.getElementById('bio');
    if(!btn || !bio) return;

    function updateButton(collapsed){
      btn.setAttribute('aria-expanded', String(!collapsed));
      btn.textContent = collapsed ? 'Show more' : 'Show less';
    }

    // keyboard operability already provided by <button>
    btn.addEventListener('click', ()=>{
      const collapsed = bio.getAttribute('data-collapsed') === 'true';
      const newState = !collapsed;
      bio.setAttribute('data-collapsed', String(!newState));
      // set max-height to auto when expanded to allow smooth transitions
      if(newState){
        // expand: remove max-height to let content size naturally; but transition needs a fixed value
        const prev = bio.style.maxHeight;
        bio.style.maxHeight = bio.scrollHeight + 'px';
        // after transition, clear inline max-height
        const onTransitionEnd = ()=>{ bio.style.maxHeight = ''; bio.removeEventListener('transitionend', onTransitionEnd); };
        bio.addEventListener('transitionend', onTransitionEnd);
      } else {
        // collapse
        bio.style.maxHeight = bio.scrollHeight + 'px';
        // force reflow
        void bio.offsetHeight;
        bio.style.maxHeight = '80px';
      }
      updateButton(!newState);
      // move focus back to button for accessibility
      btn.focus();
    });

    // Initialize state
    const initialCollapsed = bio.getAttribute('data-collapsed') === 'true';
    updateButton(initialCollapsed);

    // Ensure keyboard-visible focus styles
    btn.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        // let default button behavior handle it
      }
    });
  }

  // Add keyboard focus styles to stat rows (make them focusable)
  function makeStatRowsInteractive(){
    const rows = Array.from(document.querySelectorAll('.stat-row'));
    rows.forEach(row=>{
      // ensure label and value are focusable if action is desired; for now make row tabbable to show focus-within effects
      row.tabIndex = 0;
      row.setAttribute('role','group');
      // Improve screen reader semantics
      const label = row.querySelector('.stat-label')?.textContent?.trim() || '';
      const fill = row.querySelector('.stat-fill');
      if(fill){
        fill.setAttribute('aria-label', label + ' skill level');
      }

      // keyboard interaction: Enter/Space toggles a subtle active state
      row.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          row.classList.add('activated');
          setTimeout(()=>row.classList.remove('activated'),120);
        }
      });
    });
  }

  // Initialize when DOM is ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{ animateStats(); setupBioToggle(); makeStatRowsInteractive(); });
  } else {
    animateStats(); setupBioToggle(); makeStatRowsInteractive();
  }

})();