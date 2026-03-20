// demo/scripts.js
// Exports a simple API mountCards(container, data)
// Animates stat bars using requestAnimationFrame with a 600ms duration and 80ms stagger.

const DEFAULT_DURATION = 600; // ms
const STAGGER = 80; // ms between stat starts

function createStatElement(name, value){
  const li = document.createElement('li');
  li.className = 'stat';

  const label = document.createElement('div');
  label.className = 'stat-label';
  label.textContent = name;

  const track = document.createElement('div');
  track.className = 'stat-track';

  const bar = document.createElement('div');
  bar.className = 'stat-bar';
  // initial ARIA values
  bar.setAttribute('role','progressbar');
  bar.setAttribute('aria-valuemin','0');
  bar.setAttribute('aria-valuemax','100');
  bar.setAttribute('aria-valuenow','0');
  bar.setAttribute('data-target', String(value));

  const val = document.createElement('div');
  val.className = 'stat-value';
  val.textContent = String(value);

  track.appendChild(bar);
  li.appendChild(label);
  li.appendChild(track);
  li.appendChild(val);
  return li;
}

function mountCardFromTemplate(template, container, character){
  const tpl = template.content.cloneNode(true);
  const article = tpl.querySelector('article.card');
  const nameEl = tpl.querySelector('.character-name');
  const roleEl = tpl.querySelector('.character-role');
  const avatarEl = tpl.querySelector('.avatar');
  const statsList = tpl.querySelector('.stats');

  nameEl.textContent = character.name;
  roleEl.textContent = character.role || '';

  // Avatar injection: support SVG string or img url
  if (character.avatarSvg){
    // inline SVG injection
    avatarEl.innerHTML = character.avatarSvg;
  } else if (character.avatar){
    const img = document.createElement('img');
    img.src = character.avatar;
    img.alt = character.name + " avatar";
    avatarEl.innerHTML = ''; avatarEl.appendChild(img);
  } else {
    // fallback initials
    const initials = character.name.split(' ').map(s=>s[0]||'').slice(0,2).join('');
    avatarEl.textContent = initials.toUpperCase();
  }

  // Build stats; allow for progressive enhancement: show numeric values even without JS (but JS will add bars)
  (character.stats || []).forEach(stat=>{
    const statEl = createStatElement(stat.label, stat.value);
    statsList.appendChild(statEl);
  });

  container.appendChild(tpl);

  return article; // not appended node; but helpful if needed
}

function animateBars(container){
  // find all bars in the container
  const bars = Array.from(container.querySelectorAll('.stat-bar'));
  const startTime = performance.now();

  function tick(now){
    const elapsed = now - startTime;
    bars.forEach((bar, idx) =>{
      const target = Number(bar.getAttribute('data-target') || 0);
      const delay = STAGGER * idx; // stagger by index for a simple effect
      const localElapsed = Math.max(0, elapsed - delay);
      const progress = Math.min(1, localElapsed / DEFAULT_DURATION);
      const widthPct = Math.round(progress * target);
      bar.style.width = widthPct + '%';
      bar.setAttribute('aria-valuenow', String(widthPct));
    });

    // continue until all bars reach their target
    const allDone = bars.every(bar => Number(bar.getAttribute('aria-valuenow')) >= Number(bar.getAttribute('data-target')));
    if (!allDone){
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

// Public API: mountCards
// Parameters:
// - containerSelectorOrNode: selector string or DOM node where cards will be mounted
// - data: array of character objects or URL string to fetch JSON
// - options: { animate: boolean }
export async function mountCards(containerSelectorOrNode, data, options = {}){
  const container = typeof containerSelectorOrNode === 'string'
    ? document.querySelector(containerSelectorOrNode)
    : containerSelectorOrNode;
  if (!container) throw new Error('Container not found');

  let characters = data;
  if (typeof data === 'string'){
    const res = await fetch(data);
    if (!res.ok) throw new Error('Failed to fetch data: ' + res.status);
    characters = await res.json();
  }

  const template = document.getElementById('character-card-template');
  if (!template) throw new Error('Template not found');

  // Clear container
  container.innerHTML = '';

  // Mount each character
  characters.forEach((ch) => {
    mountCardFromTemplate(template, container, ch);
  });

  // Run animations if enabled
  const shouldAnimate = options.animate !== false && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (shouldAnimate){
    animateBars(container);
  } else {
    // If not animating, set bars to their values immediately
    container.querySelectorAll('.stat-bar').forEach(bar =>{
      const target = Number(bar.getAttribute('data-target')||0);
      bar.style.width = target + '%';
      bar.setAttribute('aria-valuenow', String(target));
    });
  }
}

// Auto-mount when module loads for demo convenience
(async function autoMount(){
  try{
    const container = document.getElementById('character-cards');
    if (!container) return;
    await mountCards(container, './data/characters.json');
  }catch(e){
    // log but don't break the page
    console.error('Auto-mount failed:', e);
  }
})();
