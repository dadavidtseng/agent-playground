// scripts.js — ES module exposing mountAPI
// mountAPI(containerSelector, options)
// - containerSelector: DOM selector or Element to mount the UI into
// - options: { dataPath: string } // defaults to './sample-data.json'

export async function mountAPI(container, options = {}) {
  const root = typeof container === 'string' ? document.querySelector(container) : container;
  if (!root) throw new Error('mountAPI: container not found');

  const dataPath = options.dataPath || './sample-data.json';

  // Clear root and show loading
  root.innerHTML = '<p class="notice">Loading character...</p>';

  const data = await fetchJsonSafe(dataPath);
  if (!data) {
    root.innerHTML = '<p class="notice">No character data available.</p>';
    return;
  }

  // Build card
  root.innerHTML = '';
  const card = createCharacterCard(data);
  root.appendChild(card);

  // Animate stat bars
  requestAnimationFrame(() => {
    const fills = card.querySelectorAll('.stat-fill');
    fills.forEach((el) => {
      const value = Number(el.getAttribute('data-value')) || 0;
      const max = Number(el.getAttribute('data-max')) || 100;
      const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
      el.style.width = pct + '%';
      el.setAttribute('aria-valuenow', String(pct));
    });
  });
}

async function fetchJsonSafe(path) {
  try {
    const res = await fetch(path, {cache: 'no-cache'});
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (err) {
    console.warn('fetchJsonSafe failed:', err);
    return null;
  }
}

function createCharacterCard(data) {
  const wrapper = document.createElement('article');
  wrapper.className = 'character-card';
  wrapper.setAttribute('aria-label', data.name || 'Character');

  // Avatar (placeholder SVG from /art/)
  const avatar = document.createElement('div'); avatar.className = 'avatar';
  const img = document.createElement('img');
  img.alt = data.name + ' portrait';
  // Use a local placeholder SVG file (supports variant in data)
  const variant = data.portraitVariant || 'default';
  img.src = `../art/portrait-${variant}.svg`;
  img.loading = 'eager';
  avatar.appendChild(img);

  // Content
  const content = document.createElement('div'); content.className = 'content';

  const heading = document.createElement('div'); heading.className = 'heading';
  const nameEl = document.createElement('div'); nameEl.className = 'name'; nameEl.textContent = data.name || 'Unnamed';
  const levelEl = document.createElement('div'); levelEl.className = 'level'; levelEl.textContent = 'Level ' + (data.level || 1);
  heading.appendChild(nameEl); heading.appendChild(levelEl);

  const statsWrap = document.createElement('div'); statsWrap.className = 'stats';
  const stats = data.stats || {};
  const maxStat = 100; // assume cap
  for (const key of ['HP','STR','DEX','INT']) {
    const val = stats[key] ?? (key === 'HP' ? (data.level ? 20 + data.level * 5 : 20) : 10);
    const stat = document.createElement('div'); stat.className = 'stat';
    const label = document.createElement('div'); label.className = 'stat-label'; label.textContent = key;
    const bar = document.createElement('div'); bar.className = 'stat-bar';
    const fill = document.createElement('div'); fill.className = 'stat-fill';
    fill.setAttribute('role', 'progressbar');
    fill.setAttribute('aria-valuemin', '0');
    fill.setAttribute('aria-valuemax', String(maxStat));
    fill.setAttribute('data-value', String(val));
    fill.setAttribute('data-max', String(maxStat));

    bar.appendChild(fill);
    stat.appendChild(label); stat.appendChild(bar);
    statsWrap.appendChild(stat);
  }

  const bio = document.createElement('p'); bio.className = 'bio'; bio.textContent = data.bio || 'No biography provided.';

  const footer = document.createElement('div'); footer.className = 'footer';
  const btn = document.createElement('button'); btn.type = 'button'; btn.textContent = 'Details'; btn.disabled = true; // placeholder
  footer.appendChild(btn);

  content.appendChild(heading);
  content.appendChild(statsWrap);
  content.appendChild(bio);
  content.appendChild(footer);

  wrapper.appendChild(avatar);
  wrapper.appendChild(content);

  return wrapper;
}

// Export default for convenience
export default { mountAPI };
