/* characterCardAPI.js
 * Exposes two functions:
 * - createCard(data): returns HTMLElement for a character card
 * - setStats(cardEl, stats): updates the stat bars and aria-valuenow
 *
 * Data shape for createCard:
 * {
 *   name: string,
 *   class: string,
 *   level: number,
 *   hp: {current:number, max:number},
 *   mp: {current:number, max:number},
 *   stats: {str:number,dex:number,int:number,cha:number} // 0-100
 * }
 */

(function(global){
  // Helper to create elements
  function el(tag, attrs, children){
    const e = document.createElement(tag);
    if(attrs){
      Object.keys(attrs).forEach(k=>{
        if(k === 'class') e.className = attrs[k];
        else if(k === 'dataset'){
          Object.entries(attrs[k]).forEach(([dkey,dval])=>e.dataset[dkey]=dval);
        }
        else if(k === 'html') e.innerHTML = attrs[k];
        else if(k === 'aria'){
          Object.entries(attrs[k]).forEach(([akey,aval])=>e.setAttribute('aria-'+akey,aval));
        }
        else e.setAttribute(k, attrs[k]);
      })
    }
    if(children){
      children.forEach(c=>{
        if(typeof c === 'string') e.appendChild(document.createTextNode(c));
        else if(c instanceof Node) e.appendChild(c);
      })
    }
    return e;
  }

  // Inline SVG avatar placeholder generator (simple stylized mask)
  function avatarSVG(name){
    // Use initials
    const initials = (name||'??').split(' ').map(s=>s[0]||'').slice(0,2).join('').toUpperCase();
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Avatar for ${name}">
        <defs>
          <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stop-color="#7c3aed" />
            <stop offset="1" stop-color="#06b6d4" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="14" fill="url(#g1)" />
        <g fill="rgba(255,255,255,0.95)" font-family="sans-serif" font-weight="700" font-size="36" text-anchor="middle">
          <text x="50" y="58">${initials}</text>
        </g>
      </svg>
    `
  }

  function createCard(data){
    const card = el('article', {class:'character-card', role:'region', tabindex:'0', 'aria-label': `Character card for ${data.name || 'Unknown'}`} );

    // Header
    const header = el('div',{class:'character-card__header'});
    const avatar = el('div',{class:'character-card__avatar', html: avatarSVG(data.name || 'Unknown')});
    const meta = el('div',{class:'character-card__meta'});
    const metaLeft = el('div',{class:'character-card__meta-left'});
    const name = el('div',{class:'character-card__name'},[data.name || 'Unknown']);
    const cls = el('div',{class:'character-card__class'},[data.class || 'Adventurer']);
    metaLeft.appendChild(name);
    metaLeft.appendChild(cls);

    const metaRight = el('div',{class:'character-card__meta-right'});
    const level = el('div',{class:'character-card__level'},['Lv ' + (data.level||1)]);
    metaRight.appendChild(level);

    meta.appendChild(metaLeft);
    meta.appendChild(metaRight);

    const pills = el('div',{class:'character-card__pills'});
    const hpPill = el('div',{class:'pill pill--hp','aria-label':'Health points'},[ `${data.hp?data.hp.current:0}/${data.hp?data.hp.max:0} HP`]);
    const mpPill = el('div',{class:'pill pill--mp','aria-label':'Mana points'},[ `${data.mp?data.mp.current:0}/${data.mp?data.mp.max:0} MP`]);
    pills.appendChild(hpPill);
    pills.appendChild(mpPill);

    header.appendChild(avatar);
    header.appendChild(meta);
    header.appendChild(pills);

    // Stats
    const statsWrap = el('div',{class:'character-card__stats'});
    const stats = data.stats || {str:50,dex:50,int:50,cha:50};
    // build rows
    Object.entries(stats).forEach(([key,val])=>{
      const row = el('div',{class:'stat-row'});
      const info = el('div',{class:'stat-info'});
      const label = el('div',{class:'stat-label'},[key.toUpperCase()]);
      const value = el('div',{class:'stat-value'},[String(val)]);
      info.appendChild(label);
      info.appendChild(value);

      const bar = el('div',{class:'stat-bar', role:'progressbar', 'aria-valuemin':0, 'aria-valuemax':100, 'aria-valuenow':val, 'data-stat':key, tabindex:0});
      const fill = el('div',{class:'stat-bar__fill', 'data-fill-for':key, style:'width:0%'},[String(val)+'%']);
      bar.appendChild(fill);

      row.appendChild(info);
      row.appendChild(bar);
      statsWrap.appendChild(row);
    });

    card.appendChild(header);
    card.appendChild(statsWrap);

    // Add class to enable animation on next tick
    requestAnimationFrame(()=>{
      card.classList.add('animate-stats');
      // Set initial widths based on data.stats
      setStats(card, data.stats || {});
    });

    return card;
  }

  function setStats(cardEl, stats){
    if(!cardEl) return;
    const statKeys = Object.keys(stats||{});
    statKeys.forEach(k=>{
      const bar = cardEl.querySelector(`.stat-bar[data-stat="${k}"]`);
      const fill = cardEl.querySelector(`.stat-bar__fill[data-fill-for="${k}"]`);
      if(bar && fill){
        let v = Number(stats[k]);
        if(isNaN(v)) v = 0;
        v = Math.max(0, Math.min(100, v));
        // Update numeric label inside small left value as well
        const valEl = bar.parentElement.querySelector('.stat-value');
        if(valEl) valEl.textContent = String(v);
        // width
        fill.style.width = v + '%';
        // textual percent inside fill
        fill.textContent = v + '%';
        // aria
        bar.setAttribute('aria-valuenow', String(v));
        // Add positive/negative classes for visual cue (example: >75 positive, <30 negative)
        fill.classList.remove('positive','negative');
        if(v>=75) fill.classList.add('positive');
        else if(v<=30) fill.classList.add('negative');
      }
    });
  }

  // Export to global
  global.CharacterCardAPI = {
    createCard,
    setStats
  };

})(window);
