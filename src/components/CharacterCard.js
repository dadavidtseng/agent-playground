// CharacterCard JS: animate stat bars and provide update API

(function(){
  // Query root element(s) for the demo file
  const root = document.getElementById('character-card-1');
  if(!root) return;

  function animateStats(container, opts={duration:800}){
    const fills = container.querySelectorAll('.stat-fill');
    fills.forEach((fill)=>{
      const target = parseInt(fill.getAttribute('data-value')||0,10);
      // start from 0
      fill.style.width = '0%';
      // ensure parent progressbar aria
      const progress = fill.closest('.stat-bar');
      if(progress){
        progress.setAttribute('aria-valuenow','0');
      }
      // trigger after next frame so transition applies
      requestAnimationFrame(()=>{
        // small timeout to ensure CSS transition
        setTimeout(()=>{
          fill.style.width = Math.max(0,Math.min(100,target)) + '%';
          if(progress){
            progress.setAttribute('aria-valuenow', String(target));
          }
        }, 20);
      });
    });
  }

  // Update stats by passing an object { health: 80, stamina: 60 }
  function updateStats(container, newStats={}){
    const statEls = container.querySelectorAll('.stat');
    statEls.forEach((stat)=>{
      const name = stat.getAttribute('data-stat');
      if(!name) return;
      const newVal = newStats[name];
      if(newVal==null) return; // skip if not provided
      const fill = stat.querySelector('.stat-fill');
      const progress = stat.querySelector('.stat-bar');
      const valLabel = stat.querySelector('.stat-value');
      const constrained = Math.max(0,Math.min(100,Number(newVal)));
      // update data-value
      if(fill){
        fill.setAttribute('data-value', String(constrained));
        // animate width via CSS transition
        // Use requestAnimationFrame to ensure layout
        requestAnimationFrame(()=>{
          fill.style.width = constrained + '%';
        });
      }
      if(progress){
        progress.setAttribute('aria-valuenow', String(constrained));
      }
      if(valLabel){
        valLabel.textContent = String(constrained);
      }
    });
  }

  // Expose functions on the DOM element for easy demo/test
  root.animateStats = function(){ return animateStats(root); };
  root.updateStats = function(newStats){ return updateStats(root, newStats); };

  // Animate on load
  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    setTimeout(()=>root.animateStats(), 120);
  } else {
    document.addEventListener('DOMContentLoaded', ()=>setTimeout(()=>root.animateStats(), 120));
  }

  // For automated tests, attach to window
  window.CharacterCard = window.CharacterCard || {};
  window.CharacterCard['character-card-1'] = { animateStats: root.animateStats, updateStats: root.updateStats };
})();
