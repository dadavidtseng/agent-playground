// Minimal JS to drive stat bar animations and accessibility

(function(){
  const card = document.getElementById('warrior-card');
  const live = document.getElementById('stat-live');
  const btn = document.getElementById('randomize');

  function setStatBarsFromData(attrs){
    const stats = attrs || card.dataset && card.dataset.stats ? JSON.parse(card.dataset.stats) : {};
    const items = card.querySelectorAll('.stat');
    items.forEach(li => {
      const key = li.getAttribute('data-stat').toLowerCase();
      const target = parseInt(li.getAttribute('data-value') || (stats[key] || 0),10);
      const bar = li.querySelector('.stat-bar');
      const valueEl = li.querySelector('.stat-value');

      // Update aria and label
      li.setAttribute('aria-valuenow', target);
      valueEl.textContent = target;

      // animate (set width after a tick to allow transition)
      requestAnimationFrame(()=>{
        // clamp 0-100
        const pct = Math.max(0, Math.min(100, target));
        bar.style.width = pct + '%';
      });
    });

    // Announce aggregate update
    const announcement = `Stats updated. HP ${stats.hp || card.querySelector('[data-stat="HP"]').getAttribute('data-value')}, Attack ${stats.attack || card.querySelector('[data-stat="Attack"]').getAttribute('data-value')}, Defense ${stats.defense || card.querySelector('[data-stat="Defense"]').getAttribute('data-value')}, Speed ${stats.speed || card.querySelector('[data-stat="Speed"]').getAttribute('data-value')}`;
    live.textContent = announcement;
  }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', ()=>{
    // If data-stats exists on card, ensure each .stat's data-value matches it for consistency
    if(card.dataset && card.dataset.stats){
      try{
        const stats = JSON.parse(card.dataset.stats);
        Object.keys(stats).forEach(k=>{
          const sel = `[data-stat="${k.charAt(0).toUpperCase()+k.slice(1)}"]`;
          const el = card.querySelector(sel);
          if(el) el.setAttribute('data-value', stats[k]);
        });
      }catch(e){/* ignore */}
    }
    setStatBarsFromData();
  });

  // Allow updating when data attributes change
  const observer = new MutationObserver(muts=>{
    muts.forEach(m=>{
      if(m.type === 'attributes' && (m.attributeName === 'data-value' || m.attributeName === 'data-stats')){
        setStatBarsFromData();
      }
    });
  });

  const items = card.querySelectorAll('.stat');
  items.forEach(i=>observer.observe(i,{attributes:true}));
  observer.observe(card,{attributes:true,attributeFilter:['data-stats']});

  // keyboard: Enter or Space on stat toggles a quick focus pulse (demo interaction)
  items.forEach(li=>{
    li.addEventListener('keydown', e=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        li.classList.add('focused-pulse');
        setTimeout(()=>li.classList.remove('focused-pulse'), 300);
      }
    });
  });

  // Randomize button to demonstrate updating
  btn.addEventListener('click', ()=>{
    const newStats = {
      hp: Math.floor(50 + Math.random()*50),
      attack: Math.floor(40 + Math.random()*60),
      defense: Math.floor(30 + Math.random()*70),
      speed: Math.floor(20 + Math.random()*80)
    };
    card.dataset.stats = JSON.stringify(newStats);
    // Also update individual data-value attributes for MutationObserver to pick up
    Object.keys(newStats).forEach(k=>{
      const sel = `[data-stat="${k.charAt(0).toUpperCase()+k.slice(1)}"]`;
      const el = card.querySelector(sel);
      if(el) el.setAttribute('data-value', newStats[k]);
    });
  });

})();
