const DATA_URL = '../mock-data/characters.json';

async function fetchData(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error('Failed to load data: '+res.status);
  return res.json();
}

function createAvatarSVG(subject){
  // Placeholder: try to return embedded SVG if available, otherwise initials
  if(subject.avatarSvg){
    const wrapper = document.createElement('div');
    wrapper.className = 'avatar';
    wrapper.innerHTML = subject.avatarSvg; // trust the data for demo
    return wrapper;
  }
  const el = document.createElement('div');
  el.className = 'avatar';
  const initials = (subject.name || '')
    .split(' ')
    .map(s=>s[0])
    .slice(0,2)
    .join('')
    .toUpperCase();
  el.textContent = initials;
  return el;
}

function createCard(item){
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('role','article');

  // Avatar
  const avatarNode = createAvatarSVG(item);

  // Body
  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = item.name || 'Unnamed';

  const sub = document.createElement('p');
  sub.className = 'card-sub';
  sub.textContent = item.role || '';

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.textContent = item.location || '';

  body.appendChild(title);
  body.appendChild(sub);
  body.appendChild(meta);

  card.appendChild(avatarNode);
  card.appendChild(body);

  return card;
}

async function renderGrid(){
  const grid = document.getElementById('grid');
  try{
    const data = await fetchData(DATA_URL);
    if(!Array.isArray(data)) throw new Error('Expected array');
    data.forEach(item=>{
      const c = createCard(item);
      grid.appendChild(c);
    });
  }catch(err){
    console.error(err);
    grid.innerHTML = `<p style="color:var(--color-danger)">Failed to load data</p>`;
  }
}

// Auto-run when module loaded
renderGrid();

export { fetchData, createCard };
