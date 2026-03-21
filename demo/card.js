// Minimal JS module to create profile cards

const defaultStats = [
  {key:'Health', value:78, max:100, color:'var(--color-success)'},
  {key:'Stamina', value:54, max:100, color:'var(--color-accent)'},
  {key:'Armor', value:32, max:100, color:'#60a5fa'},
];

function clamp(v, a=0, b=100){ return Math.max(a, Math.min(b, v)); }

function createStatRow(stat){
  const row = document.createElement('div');
  row.className = 'stat-row';

  const label = document.createElement('div');
  label.className = 'stat-label';
  label.textContent = stat.key;

  const value = document.createElement('div');
  value.className = 'stat-value';
  value.textContent = `${stat.value}/${stat.max}`;

  const bar = document.createElement('div');
  bar.className = 'stat-bar';
  bar.setAttribute('role','progressbar');
  bar.setAttribute('aria-valuemin','0');
  bar.setAttribute('aria-valuemax',String(stat.max));
  bar.setAttribute('aria-valuenow',String(stat.value));

  const fill = document.createElement('div');
  fill.className = 'stat-fill';
  fill.style.background = stat.color || 'var(--color-accent)';
  fill.style.width = '0%';

  bar.appendChild(fill);
  row.appendChild(label);
  row.appendChild(value);
  row.appendChild(bar);

  return {row, fill, value, bar};
}

export function createProfileCard(container, data = {}){
  const tpl = document.getElementById('profile-card-template');
  if(!tpl) throw new Error('template not found');

  const clone = tpl.content.cloneNode(true);
  const card = clone.querySelector('.profile-card');

  // fill metadata
  const nameEl = card.querySelector('.name');
  const roleEl = card.querySelector('.role');
  const levelEl = card.querySelector('.level-num');
  const statsEl = card.querySelector('.stats');
  const bioToggle = card.querySelector('.bio-toggle');
  const bioText = card.querySelector('.bio');

  nameEl.textContent = data.name || 'Unnamed';
  roleEl.textContent = data.role || 'Adventurer';
  levelEl.textContent = data.level || '1';
  bioText.id = `bio-${Math.random().toString(36).slice(2,9)}`;
  bioToggle.setAttribute('aria-controls', bioText.id);
  bioText.hidden = !data.bio;
  bioText.innerHTML = data.bio ? `<p>${data.bio}</p>` : '';
  bioToggle.textContent = data.bio ? 'Show bio' : 'No bio';

  // stats
  const stats = (data.stats && Array.isArray(data.stats) && data.stats.length) ? data.stats : defaultStats;
  const statNodes = stats.map(s => {
    const parsed = { key: s.key, value: clamp(Number(s.value)||0,0,s.max||100), max: s.max||100, color: s.color };
    const node = createStatRow(parsed);
    statsEl.appendChild(node.row);
    return {meta:parsed, node};
  });

  // attach toggle behavior
  function updateToggle(){
    const expanded = bioToggle.getAttribute('aria-expanded') === 'true';
    bioToggle.setAttribute('aria-expanded', String(!expanded));
    if(expanded){
      bioText.hidden = true;
      bioToggle.textContent = 'Show bio';
    } else {
      bioText.hidden = false;
      bioToggle.textContent = 'Hide bio';
    }
  }
  bioToggle.addEventListener('click', updateToggle);
  bioToggle.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); updateToggle(); }
  });

  // insert into container
  container.appendChild(card);

  // animation: animate fills to target widths, respects reduced-motion
  function animateStats(replay=false){
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    statNodes.forEach(({meta, node})=>{
      const pct = Math.round((meta.value/meta.max)*100);
      node.bar.setAttribute('aria-valuenow', String(meta.value));
      node.value.textContent = `${meta.value}/${meta.max}`;
      if(reduce){ node.fill.style.width = `${pct}%`; }
      else {
        // force reflow if replay
        if(replay){ node.fill.style.transition = 'none'; node.fill.getBoundingClientRect(); }
        node.fill.style.transition = '';
        requestAnimationFrame(()=>{ node.fill.style.width = `${pct}%`; });
      }
    });
  }

  // initial animate
  // slight delay to allow insertion
  setTimeout(()=>animateStats(false), 40);

  function updateStats(newStats){
    if(!newStats || !Array.isArray(newStats)) return;
    // map by key
    newStats.forEach(ns=>{
      const item = statNodes.find(s=>s.meta.key === ns.key);
      if(item){
        item.meta.value = clamp(Number(ns.value)||0,0,ns.meta.max);
      }
    });
    animateStats(true);
  }

  function destroy(){
    bioToggle.removeEventListener('click', updateToggle);
    container.removeChild(card);
  }

  return { updateStats, destroy };
}

// Auto-init examples when script loads in demo
if(typeof window !== 'undefined'){
  const root1 = document.getElementById('card-root-1');
  const root2 = document.getElementById('card-root-2');
  const card1 = createProfileCard(root1, {
    name:'Eira Ravenshade', role:'Wandering Knight', level:12,
    bio:'A stoic knight who travels between kingdoms defending the weak and seeking redemption for past failures.',
    stats: [
      {key:'Health', value:78, max:100, color:'var(--color-success)'},
      {key:'Stamina', value:54, max:100, color:'var(--color-accent)'},
      {key:'Armor', value:32, max:100, color:'#60a5fa'},
    ]
  });

  const card2 = createProfileCard(root2, {
    name:'Mira Swift', role:'Rogue Scout', level:7,
    bio:'Quick and clever, Mira slips past defenses and gathers secrets for allies.',
    stats:[
      {key:'Health', value:46, max:100, color:'var(--color-success)'},
      {key:'Stamina', value:88, max:100, color:'var(--color-accent)'},
      {key:'Armor', value:18, max:100, color:'#60a5fa'},
    ]
  });

  // wire demo controls
  document.getElementById('randomize').addEventListener('click', ()=>{
    const rand = card1 && card2 ? [
      {key:'Health', value: Math.floor(Math.random()*100)},
      {key:'Stamina', value: Math.floor(Math.random()*100)},
      {key:'Armor', value: Math.floor(Math.random()*100)},
    ] : [];
    card1.updateStats(rand);
    card2.updateStats(rand);
  });

  document.getElementById('destroy').addEventListener('click', ()=>{
    card2.destroy();
  });
}
