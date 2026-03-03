// Load tokens and stats from local tokens.json (no frameworks, fetch)
(async function(){
  const tokensRes = await fetch('design/tokens.json');
  const tokens = await tokensRes.json();

  // apply tokens to root as CSS vars (ensure design tokens are source of truth)
  const root = document.documentElement;
  const set = (k,v) => root.style.setProperty(k,v);
  set('--color-bg', tokens.colors.bg);
  set('--color-card-bg', tokens.colors.cardBg);
  set('--color-muted', tokens.colors.muted);
  set('--color-accent', tokens.colors.accent);
  set('--color-accent-dark', tokens.colors.accentDark);
  set('--color-stat-bg', tokens.colors.statBg);
  set('--space-gutter', tokens.space.gutter);
  set('--space-card-padding', tokens.space.cardPadding);
  set('--font-family', tokens.typography.fontFamily);
  set('--font-size', tokens.typography.fontSize);
  set('--heading-size', tokens.typography.headingSize);

  const statsContainer = document.getElementById('stats');

  // create stat rows
  tokens.stats.forEach((s, idx) => {
    const row = document.createElement('div');
    row.className = 'stat-row';
    row.setAttribute('role','listitem');

    const label = document.createElement('div');
    label.className = 'stat-label';
    label.textContent = s.label;

    const track = document.createElement('div');
    track.className = 'stat-track';
    track.setAttribute('role','progressbar');
    track.setAttribute('aria-label', s.label + ' stat');
    track.setAttribute('aria-valuemin','0');
    track.setAttribute('aria-valuemax','100');
    track.setAttribute('aria-valuenow', String(s.value));
    track.tabIndex = 0; // keyboard focusable

    const fill = document.createElement('div');
    fill.className = 'stat-fill';
    fill.id = 'fill-'+s.id; // allow CSS/JS selection
    fill.setAttribute('data-value', String(s.value));

    // accessible fallback text inside track for ATs
    const sr = document.createElement('span');
    sr.className = 'visually-hidden';
    sr.textContent = s.value + ' percent';

    const value = document.createElement('div');
    value.className = 'stat-value';
    value.textContent = s.value + '%';

    track.appendChild(fill);
    track.appendChild(sr);
    row.appendChild(label);
    row.appendChild(track);
    row.appendChild(value);
    statsContainer.appendChild(row);
  });

  // animate fills with stagger of 80ms between each
  const fills = Array.from(document.querySelectorAll('.stat-fill'));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animate() {
    fills.forEach((el, i) => {
      const v = Number(el.getAttribute('data-value'));
      const delay = i * 80; // 80ms stagger
      if(prefersReduced){
        el.style.width = v + '%';
      } else {
        // set initial width to 0 to ensure transition
        el.style.width = '0%';
        setTimeout(()=>{
          el.style.width = v + '%';
          // update aria-valuenow on parent track
          const track = el.parentElement;
          if(track) track.setAttribute('aria-valuenow', String(v));
        }, delay);
      }
    });
  }

  // Variant toggle handling
  const select = document.getElementById('variant-select');
  const card = document.querySelector('.stat-card');
  select.addEventListener('change', (e)=>{
    card.setAttribute('data-variant', e.target.value);
  });

  // keyboard: allow left/right arrows to nudge focused progressbar
  document.addEventListener('keydown', (e)=>{
    const el = document.activeElement;
    if(el && el.classList && el.classList.contains('stat-track')){
      const fill = el.querySelector('.stat-fill');
      if(!fill) return;
      let v = Number(fill.getAttribute('data-value'));
      if(e.key === 'ArrowLeft'){
        v = Math.max(0, v - 1);
      } else if(e.key === 'ArrowRight'){
        v = Math.min(100, v + 1);
      } else return;
      fill.setAttribute('data-value', String(v));
      // update visible width immediately
      fill.style.width = v + '%';
      el.setAttribute('aria-valuenow', String(v));
      const valDiv = el.parentElement.querySelector('.stat-value');
      if(valDiv) valDiv.textContent = v + '%';
      e.preventDefault();
    }
  });

  // run animation after small delay to allow DOM & CSS to settle
  window.requestAnimationFrame(()=>{
    setTimeout(animate, 100);
  });

  // expose for testing
  window.__STAT_FILLERS = fills;
})();
