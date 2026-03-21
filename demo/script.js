// Small dependency-free JS for demo interactions
(function(){
  const root = document.documentElement;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', ()=>{
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? '': 'dark');
    themeToggle.setAttribute('aria-pressed', String(!isDark));
  });

  // Reduced motion toggle (for demo only) - mirrors prefers-reduced-motion
  const reducedToggle = document.getElementById('reducedMotionToggle');
  reducedToggle.checked = prefersReduced;
  reducedToggle.addEventListener('change', (e)=>{
    document.body.classList.toggle('reduced-motion', e.target.checked);
  });

  // Inline SVG injection: replace .char-card__avatar contents with svg fetched from path
  async function inlineSvgs(){
    const avatars = document.querySelectorAll('.char-card__avatar');
    // fetch SVG once
    const src = avatars[0] && avatars[0].dataset.svgSrc;
    if(!src) return;
    try{
      const res = await fetch(src);
      if(!res.ok) throw new Error('fetch failed');
      const text = await res.text();
      avatars.forEach(el=>{
        // create a container and insert SVG markup
        el.innerHTML = text;
        // ensure the svg isn't aria-hidden if the container has role=img
        const svg = el.querySelector('svg');
        if(svg){
          // remove aria-hidden if present so screen readers can use the container's label
          svg.removeAttribute('aria-hidden');
          svg.setAttribute('focusable','false');
        }
      });
    }catch(err){
      console.error('Could not inline SVGs', err);
    }
  }

  // Stat bar animation
  function animateStats(){
    const bars = document.querySelectorAll('.char-card__stat-bar');
    const reduceClass = document.body.classList.contains('reduced-motion') || prefersReduced;
    bars.forEach((bar, i)=>{
      const value = Number(bar.dataset.value) || 0;
      const final = Math.max(0, Math.min(100, value));
      if(reduceClass){
        bar.style.width = final + '%';
        return;
      }
      // set transition
      bar.style.transition = 'width 700ms ease-out';
      // stagger slightly for nicer effect
      const delay = i * 80;
      setTimeout(()=>{
        bar.style.width = final + '%';
      }, delay);
    });
  }

  // Bio toggle accessibility
  function wireBioToggles(){
    const toggles = document.querySelectorAll('.char-card__bio-toggle');
    toggles.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.getAttribute('aria-controls');
        const panel = document.getElementById(id);
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if(panel){
          if(expanded){
            panel.hidden = true;
            btn.textContent = 'Show bio';
          }else{
            panel.hidden = false;
            btn.textContent = 'Hide bio';
            panel.focus && panel.focus();
          }
        }
      });
      // ensure keyboard space/enter works (button already does by default)
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', async ()=>{
    await inlineSvgs();
    wireBioToggles();
    animateStats();
  });
})();
