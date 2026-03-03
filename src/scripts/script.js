// Character Profile Card behavior
document.addEventListener('DOMContentLoaded',()=>{
  const cards = Array.from(document.querySelectorAll('.card'));

  function animateStatFill(fillEl, value){
    // value is like "78%" or "92%"
    const numeric = parseInt(String(value).replace('%',''),10) || 0;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(prefersReduced){
      fillEl.style.setProperty('--anim-width', `${numeric}%`);
      return;
    }

    // animate from 0 to value using requestAnimationFrame
    let start = null; const duration = 900;
    const from = 0; const to = numeric;
    function step(timestamp){
      if(!start) start = timestamp;
      const elapsed = Math.min((timestamp - start), duration);
      const progress = elapsed / duration;
      const eased = easeOutCubic(progress);
      const current = Math.round(from + (to - from) * eased);
      fillEl.style.setProperty('--anim-width', `${current}%`);
      if(elapsed < duration) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function easeOutCubic(t){return 1 - Math.pow(1 - t, 3)}

  function animateAll(){
    const fills = document.querySelectorAll('.stat__fill');
    fills.forEach(f=>{
      const v = f.getAttribute('style')?.match(/--value:\s*([0-9]+%)/)?.[1] || '0%';
      // reset to 0 first for visible animation
      f.style.setProperty('--anim-width','0%');
      // allow layout to settle
      requestAnimationFrame(()=>animateStatFill(f,v));
    });
  }

  // Initialize bio toggles
  cards.forEach(card=>{
    const toggle = card.querySelector('.bio__toggle');
    const bio = card.querySelector('.bio__text');
    if(!toggle || !bio) return;
    toggle.addEventListener('click', ()=>{
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      if(!expanded){
        bio.classList.add('expanded');
        toggle.textContent = 'Show less';
      } else {
        bio.classList.remove('expanded');
        toggle.textContent = 'Read more';
      }
    });

    // keyboard support
    toggle.addEventListener('keydown',(e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggle.click();
      }
    });
  });

  // Expose update API
  window.CharacterCard = {
    updateStats: function(cardEl, newStats){
      // newStats: {strength: 50, agility:80, intellect: 20}
      const statEls = Array.from(cardEl.querySelectorAll('.stat'));
      statEls.forEach(stat=>{
        const key = stat.dataset.statKey;
        if(!key || newStats[key] == null) return;
        const value = Math.max(0, Math.min(100, Number(newStats[key])));
        const fill = stat.querySelector('.stat__fill');
        const valLabel = stat.querySelector('.stat__value');
        fill.setAttribute('style', `--value: ${value}%`);
        if(valLabel) valLabel.textContent = String(value);
      });
      // animate changed fills
      animateAll();
    },
    animateAll: animateAll
  }

  // Initial animation
  animateAll();

  // Refresh control
  const refreshBtn = document.getElementById('refresh-stats');
  if(refreshBtn) refreshBtn.addEventListener('click', ()=>animateAll());
});
