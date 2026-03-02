/* CharacterCard behavior
   - Animates stat fills on load and when randomized
   - Respects prefers-reduced-motion
   - Provides keyboard accessibility for controls
*/
(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setStatFill(fillEl, value){
    const pct = Math.max(0, Math.min(100, value));
    // update aria-valuenow on parent .stat-bar
    const bar = fillEl.closest('.stat-bar');
    if(bar){
      bar.setAttribute('aria-valuenow', String(pct));
    }
    // animate unless reduced
    if(prefersReduced){
      fillEl.style.width = pct + '%';
    }else{
      // trigger layout then set width to animate
      requestAnimationFrame(()=>{ fillEl.style.width = pct + '%'; });
    }
  }

  function parseStatText(text){
    // expecting format like '78/100'
    const m = String(text).match(/(\d+)\s*\/\s*(\d+)/);
    if(m){ return Math.round((Number(m[1]) / Number(m[2])) * 100); }
    // fallback if single number
    const n = Number(text);
    if(!isNaN(n)) return Math.round(Math.max(0, Math.min(100,n)));
    return 0;
  }

  function init(){
    const fills = document.querySelectorAll('.stat-fill');
    fills.forEach(f=> f.style.width = '0%');

    // initial animate from DOM values
    setTimeout(()=>{
      fills.forEach(fill=>{
        const stat = fill.dataset.stat;
        const valueEl = document.getElementById((stat==='hp'?'hp':'') + (stat==='atk'?'atk':'') + (stat==='def'?'def':''));
        // fallback: find nearby .stat-value
        const row = fill.closest('.stat-row');
        const valueTextEl = row ? row.querySelector('.stat-value') : null;
        const text = valueTextEl ? valueTextEl.textContent : '0/100';
        const pct = parseStatText(text);
        setStatFill(fill, pct);
      });
    }, 80);

    // Randomize button for demo
    const randBtn = document.getElementById('randomize-btn');
    randBtn.addEventListener('click', ()=>{
      const rows = document.querySelectorAll('.stat-row');
      rows.forEach(row=>{
        const valEl = row.querySelector('.stat-value');
        const max = 100;
        const newVal = Math.floor(Math.random() * (max+1));
        valEl.textContent = `${newVal}/${max}`;
        const fill = row.querySelector('.stat-fill');
        setStatFill(fill, newVal);
      });
    });

    // Make buttons keyboard-operable (they already are), ensure focus styles
    const viewBtn = document.getElementById('view-btn');
    viewBtn.addEventListener('click', ()=>{
      viewBtn.classList.add('activated');
      setTimeout(()=> viewBtn.classList.remove('activated'), 350);
      // in integrated use, this could open a detail view; here we simulate
      viewBtn.setAttribute('aria-pressed','true');
      setTimeout(()=> viewBtn.setAttribute('aria-pressed','false'), 700);
    });

    // Ensure stat bars have appropriate roles and keyboard focus
    const statBars = document.querySelectorAll('.stat-bar');
    statBars.forEach(bar=>{
      bar.tabIndex = 0; // focusable
      bar.addEventListener('keydown', e=>{
        const fill = bar.querySelector('.stat-fill');
        const step = e.shiftKey ? 10 : 1;
        let cur = Number(bar.getAttribute('aria-valuenow') || 0);
        if(e.key === 'ArrowRight' || e.key === 'ArrowUp'){
          cur = Math.min(100, cur + step);
          setStatFill(fill, cur);
          const valEl = bar.closest('.stat-row').querySelector('.stat-value');
          valEl.textContent = `${cur}/100`;
          e.preventDefault();
        }else if(e.key === 'ArrowLeft' || e.key === 'ArrowDown'){
          cur = Math.max(0, cur - step);
          setStatFill(fill, cur);
          const valEl = bar.closest('.stat-row').querySelector('.stat-value');
          valEl.textContent = `${cur}/100`;
          e.preventDefault();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
