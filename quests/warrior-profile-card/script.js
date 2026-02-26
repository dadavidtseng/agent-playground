const statsPath = './data/stats.json';

const imgEl = document.getElementById('warrior-img');
const btn = document.getElementById('toggle-size');
let usingLarge = false;

async function loadStats(){
  try{
    const res = await fetch(statsPath);
    if(!res.ok) throw new Error(`Failed to load ${statsPath}: ${res.status}`);
    const data = await res.json();

    // Documented expected format (in data/stats.json):
    // { "name": "Thorin", "class": "Warrior", "hp": 120, "attack": 18, "defense": 12, "level": 5 }

    document.getElementById('warrior-name').textContent = data.name || 'Unknown';
    document.getElementById('warrior-class').textContent = `Class: ${data.class || '—'}`;
    document.getElementById('stat-hp').textContent = data.hp ?? '—';
    document.getElementById('stat-attack').textContent = data.attack ?? '—';
    document.getElementById('stat-defense').textContent = data.defense ?? '—';
    document.getElementById('stat-level').textContent = data.level ?? '—';
    document.getElementById('warrior-bio').textContent = data.bio || document.getElementById('warrior-bio').textContent;

    // If JSON supplies asset paths, use them
    if(data.assets){
      const small = data.assets.small;
      const large = data.assets.large;
      // prefer small by default
      if(small) imgEl.src = small;
      imgEl.dataset.small = small || imgEl.dataset.small || '';
      imgEl.dataset.large = large || imgEl.dataset.large || '';
    }
  }catch(err){
    console.warn(err);
  }
}

function toggleSize(){
  usingLarge = !usingLarge;
  btn.setAttribute('aria-pressed', String(usingLarge));

  const smallSrc = imgEl.dataset.small || 'assets/warrior_64.png';
  const largeSrc = imgEl.dataset.large || 'assets/warrior_128.png';

  const target = usingLarge ? largeSrc : smallSrc;

  // Attempt to set src, but gracefully fall back if not present
  imgEl.src = target;

  // Adjust display size for large vs small so pixel scaling is crisp
  if(usingLarge){
    imgEl.style.width = '128px';
    imgEl.style.height = '128px';
  }else{
    imgEl.style.width = '128px';
    imgEl.style.height = '128px';
  }
}

// wire events
btn.addEventListener('click', toggleSize);

// load on start
loadStats();

// Expose for testing
window.__warriorProfile = { loadStats, toggleSize };
