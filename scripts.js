// scripts.js
// Responsible for reading sample data, animating stat bars, keyboard support for action buttons

const sampleData = {
  "strength": 72,
  "agility": 54,
  "intelligence": 86
};

document.addEventListener('DOMContentLoaded', ()=>{
  const statBars = document.querySelectorAll('.stat-bar');
  const actions = document.querySelectorAll('.action');

  function animateBar(bar, target){
    // Clamp target
    const t = Math.max(0, Math.min(100, target));
    // Update ARIA attributes and visible value
    bar.setAttribute('aria-valuenow', String(t));
    const statName = bar.dataset.stat;
    const statValueEl = bar.closest('.stat-item').querySelector('.stat-value');
    if(statValueEl) statValueEl.textContent = `${t}%`;

    // Set width using CSS transition. Some browsers need a forced reflow to ensure transition on mount
    // Fallback: if transitions unsupported, set width directly
    try{
      // Force reflow
      // eslint-disable-next-line no-unused-expressions
      bar.offsetWidth;
      bar.style.width = t + '%';
    }catch(e){
      bar.style.width = t + '%';
    }
  }

  // Initialize bars to 0 then animate to target
  statBars.forEach(bar=>{
    bar.style.width = '0%';
    // Set initial aria values
    bar.setAttribute('aria-valuenow', '0');
  });

  // Use requestAnimationFrame minimally to batch updates after paint
  window.requestAnimationFrame(()=>{
    statBars.forEach(bar=>{
      const stat = bar.dataset.stat;
      const value = sampleData[stat];
      if(typeof value === 'number') animateBar(bar, value);
    });
  });

  // Observe future changes to sampleData via a simple API (simulate updates)
  // Expose a global update function for testing
  window.updateStats = function(newData){
    Object.keys(newData).forEach(k=>{
      const nodes = document.querySelectorAll(`.stat-bar[data-stat="${k}"]`);
      nodes.forEach(n=> animateBar(n, newData[k]));
    });
  };

  // Action button keyboard & pointer handling
  actions.forEach(action =>{
    // Click behavior
    action.addEventListener('click', onAction);
    // Keyboard behavior for Enter and Space
    action.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
        e.preventDefault();
        // Toggle pressed state for demo purposes
        const pressed = action.getAttribute('aria-pressed') === 'true';
        action.setAttribute('aria-pressed', String(!pressed));
        action.classList.add('focus');
        onAction(e);
      }else if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
        // move focus to next
        e.preventDefault();
        focusNextAction(action);
      }else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
        e.preventDefault();
        focusPrevAction(action);
      }
    });

    // Ensure accessible pressed state default
    if(!action.hasAttribute('aria-pressed')) action.setAttribute('aria-pressed','false');

    // Focus styling management
    action.addEventListener('focus', ()=> action.classList.add('focused'));
    action.addEventListener('blur', ()=> action.classList.remove('focused'));
  });

  function onAction(e){
    const el = e.currentTarget || e.target;
    const act = el.dataset.action;
    // For demo, we'll log and update aria-live region
    console.log('Action triggered:', act);
    announce(`Action ${act} triggered`);
  }

  // Focus navigation helpers
  function focusNextAction(current){
    const list = Array.from(actions);
    const idx = list.indexOf(current);
    const next = list[(idx + 1) % list.length];
    next.focus();
  }
  function focusPrevAction(current){
    const list = Array.from(actions);
    const idx = list.indexOf(current);
    const prev = list[(idx - 1 + list.length) % list.length];
    prev.focus();
  }

  // Simple SR-only live region for announcements
  let live = document.getElementById('kadi-live');
  if(!live){
    live = document.createElement('div');
    live.id = 'kadi-live';
    live.className = 'sr-only';
    live.setAttribute('aria-live','polite');
    document.body.appendChild(live);
  }
  function announce(msg){
    live.textContent = msg;
    // clear after short delay
    setTimeout(()=>{ live.textContent = ''; }, 2000);
  }

});
