// Lightweight JS for CharacterCard interactions
(function(){
  'use strict';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Load inline SVG if external asset is provided, otherwise keep fallback
  function loadAvatars(){
    document.querySelectorAll('.avatar[data-src]').forEach(el=>{
      const src = el.getAttribute('data-src');
      if(!src) return;
      fetch(src).then(r=>{
        if(!r.ok) throw new Error('no svg');
        return r.text();
      }).then(text=>{
        // try to parse and insert inline
        const wrapper = document.createElement('div');
        wrapper.innerHTML = text;
        const svg = wrapper.querySelector('svg');
        if(svg){
          svg.setAttribute('focusable','false');
          svg.setAttribute('aria-hidden','true');
          // clear existing children, append svg
          while(el.firstChild) el.removeChild(el.firstChild);
          el.appendChild(svg);
        }
      }).catch(()=>{
        // leave fallback
      });
    });
  }

  // Toggle details when clicking expand buttons or pressing Enter/Space when focused on card
  function initExpand(){
    document.querySelectorAll('.card').forEach(card=>{
      const btn = card.querySelector('.expand-btn');
      const detailsId = btn ? btn.getAttribute('aria-controls') : null;
      const details = detailsId ? document.getElementById(detailsId) : card.querySelector('.details');

      // If card has expanded class, ensure aria reflects it
      if(btn){
        const expanded = card.classList.contains('expanded');
        btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        if(expanded){ details && (details.hidden = false); }
      }

      if(btn && details){
        btn.addEventListener('click', ()=> toggle());
        btn.addEventListener('keydown', (e)=>{
          if(e.key==='Enter' || e.key===' '){ e.preventDefault(); toggle(); }
        });
      }

      // keyboard: Enter or Space on card toggles if button isn't present
      card.addEventListener('keydown', (e)=>{
        if(e.target!==card) return;
        if(e.key==='Enter' || e.key===' '){ e.preventDefault(); if(btn) btn.click(); else toggle(); }

        // collapse with Escape
        if(e.key==='Escape'){ if(details){ details.hidden=true; if(btn) btn.setAttribute('aria-expanded','false'); card.classList.remove('expanded'); } }
      });

      function toggle(){
        const is = btn.getAttribute('aria-expanded')==='true';
        btn.setAttribute('aria-expanded', is? 'false':'true');
        if(details){ details.hidden = is; }
        card.classList.toggle('expanded', !is);
        // announce via aria-live? keep minimal: set aria-hidden on details
        if(details){ details.setAttribute('aria-hidden', is? 'true':'false'); }
      }
    });
  }

  // Animate stat bars when revealed using IntersectionObserver
  function initStats(){
    const stats = Array.from(document.querySelectorAll('.stat-bar'));
    if(stats.length===0) return;

    function revealBar(bar){
      const value = Number(bar.getAttribute('data-value')||0);
      const fill = bar.querySelector('.stat-fill');
      const clamped = Math.max(0, Math.min(100, value));
      if(prefersReduced){
        fill.style.width = clamped + '%';
        bar.setAttribute('aria-valuenow', String(clamped));
        return;
      }
      // animate via setting width; transition is in CSS
      requestAnimationFrame(()=>{
        fill.style.width = clamped + '%';
        bar.setAttribute('aria-valuenow', String(clamped));
      });
    }

    if('IntersectionObserver' in window && !prefersReduced){
      const io = new IntersectionObserver((entries, obs)=>{
        entries.forEach(en=>{
          if(en.isIntersecting){
            revealBar(en.target);
            obs.unobserve(en.target);
          }
        });
      },{threshold:0.25});
      stats.forEach(s=> io.observe(s));
    }else{
      // reveal all immediately
      stats.forEach(revealBar);
    }
  }

  // Basic keyboard focus visible polyfill
  function initFocusVisible(){
    let hadKeyboard = false;
    window.addEventListener('keydown', (e)=>{ if(e.key==='Tab') hadKeyboard=true; }, true);
    window.addEventListener('mousedown', ()=> hadKeyboard=false, true);
    document.addEventListener('focusin', (e)=>{
      if(hadKeyboard) e.target.classList.add('focus-visible');
    });
    document.addEventListener('focusout', (e)=>{ e.target.classList.remove('focus-visible'); });
  }

  // init
  document.addEventListener('DOMContentLoaded', ()=>{
    loadAvatars();
    initExpand();
    initStats();
    initFocusVisible();
  });
})();
