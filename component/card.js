// card.js - simple component renderer for warrior card
// Expects a JSON file 'character.json' in same directory or an object passed to renderCharacter

const defaultData = {
  "name": "Thorn",
  "class": "Warrior",
  "level": 6,
  "hp": 48,
  "attack": 12,
  "defense": 10,
  "bio": "A battle-hardened warrior from the northern marches. Fiercely loyal, Thorn wields a heavy blade and wears a dented helm. He has a knack for surviving impossible odds.",
  "image": "./warrior.png"
};

async function fetchCharacter(path='./character.json'){
  try{
    const res = await fetch(path, {cache: 'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const data = await res.json();
    return data;
  }catch(e){
    console.warn('Failed to load character.json, using defaults.', e);
    return defaultData;
  }
}

function createStatElement(label, value){
  const stat = document.createElement('div');
  stat.className = 'stat';
  stat.setAttribute('role','group');
  stat.setAttribute('aria-label', label + ': ' + value);
  const lbl = document.createElement('span');
  lbl.textContent = label;
  lbl.style.opacity = '0.8';
  const val = document.createElement('b');
  val.textContent = value;
  stat.appendChild(lbl);
  stat.appendChild(val);
  return stat;
}

function renderCharacter(data, container){
  container.innerHTML = '';
  const card = document.createElement('article');
  card.className = 'warrior-card';
  card.setAttribute('role','group');
  card.setAttribute('aria-labelledby','name-'+data.name);

  // art
  const art = document.createElement('div');
  art.className = 'warrior-art';
  const img = document.createElement('img');
  img.src = data.image || defaultData.image;
  img.alt = data.name + ' portrait';
  img.width = 96;
  img.height = 96;
  // ensure crisp scaling by disabling drag and smoothing
  img.draggable = false;
  art.appendChild(img);

  // main
  const main = document.createElement('div');
  main.className = 'warrior-main';

  const header = document.createElement('div');
  header.className = 'warrior-header';
  const name = document.createElement('div');
  name.className = 'warrior-name';
  name.id = 'name-'+data.name;
  name.textContent = data.name;
  const cls = document.createElement('div');
  cls.className = 'warrior-class';
  cls.textContent = data.class;
  header.appendChild(name);
  header.appendChild(cls);

  main.appendChild(header);

  // stats
  const stats = document.createElement('div');
  stats.className = 'warrior-stats';
  stats.appendChild(createStatElement('HP', data.hp));
  stats.appendChild(createStatElement('ATK', data.attack));
  stats.appendChild(createStatElement('DEF', data.defense));

  main.appendChild(stats);

  // bio
  const bio = document.createElement('p');
  bio.className = 'warrior-bio';
  bio.textContent = data.bio;
  main.appendChild(bio);

  // meta
  const meta = document.createElement('div');
  meta.className = 'warrior-meta';
  const level = document.createElement('div');
  level.className = 'level-badge';
  level.textContent = 'Lv ' + data.level;
  const actions = document.createElement('div');
  actions.className = 'actions';
  const btn1 = document.createElement('button');
  btn1.className = 'button';
  btn1.textContent = 'Inspect';
  btn1.setAttribute('aria-label','Inspect '+data.name);
  const btn2 = document.createElement('button');
  btn2.className = 'button';
  btn2.textContent = 'Challenge';
  btn2.setAttribute('aria-label','Challenge '+data.name);
  actions.appendChild(btn1);
  actions.appendChild(btn2);

  meta.appendChild(level);
  meta.appendChild(actions);

  main.appendChild(meta);

  card.appendChild(art);
  card.appendChild(main);
  container.appendChild(card);
}

// Auto-initialize on page load
(async function(){
  const root = document.getElementById('card-root');
  if(!root) return;
  const data = await fetchCharacter();
  renderCharacter(data, root);
})();

export { renderCharacter, fetchCharacter };
