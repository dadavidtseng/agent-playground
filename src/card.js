const DEFAULT_STATS = { Strength: 50, Agility: 50, Intelligence: 50 };

function createAvatarSVG(variant, label) {
  // Simple placeholder inline SVGs. Integration point for final assets.
  const colors = {
    warrior: ['#FDE68A', '#F59E0B'],
    mage: ['#E9D5FF', '#7C3AED'],
    rogue: ['#BBF7D0', '#059669']
  };
  const [bg, fg] = colors[variant] || ['#E6F4FF', '#3B82F6'];

  return `
  <svg role="img" aria-label="${label}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="${bg}" rx="8" />
    <g transform="translate(12,12)">
      <circle cx="38" cy="24" r="14" fill="${fg}" opacity="0.95" />
      <rect x="6" y="44" width="64" height="28" rx="6" fill="${fg}" opacity="0.15" />
      <path d="M8 64c8-6 20-8 30-8s22 2 30 8" stroke="${fg}" stroke-width="3" fill="none" stroke-linecap="round" />
    </g>
  </svg>`;
}

function buildCard(container, data) {
  const d = Object.assign({}, { name: 'Unknown', title: '', variant: 'default', avatarLabel: 'avatar' }, data);
  d.stats = Object.assign({}, DEFAULT_STATS, d.stats || {});

  const card = document.createElement('section');
  card.className = `char-card variant-${d.variant}`;
  card.setAttribute('role', 'region');
  card.setAttribute('aria-label', `${d.name} profile`);

  card.innerHTML = `
    <div class="header">
      <div class="avatar">${createAvatarSVG(d.variant, d.avatarLabel)}</div>
      <div class="title">
        <div class="name">${escapeHtml(d.name)}</div>
        <div class="role">${escapeHtml(d.title || '')}</div>
      </div>
    </div>
    <div class="stats" data-live="${d.name}-live">
      ${Object.keys(d.stats).map(k => {
        const val = clamp(Math.round(d.stats[k]), 0, 100);
        return `
        <div class="stat" data-stat-name="${escapeHtml(k)}">
          <div class="label">${escapeHtml(k)}</div>
          <div class="bar-wrap" aria-hidden="false">
            <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" style="width:0%"></div>
          </div>
          <div class="value" aria-hidden="true">${val}</div>
        </div>`;
      }).join('')}
    </div>
    <div class="vh" aria-live="polite" aria-atomic="true">Ready</div>
  `;

  container.innerHTML = '';
  container.appendChild(card);
  // store data on container for easy lookup
  container.__charData = d;

  // Animate bars after mount
  requestAnimationFrame(() => animateBars(card, d.stats));

  return card;
}

function animateBars(card, stats) {
  const statNodes = card.querySelectorAll('.stat');
  statNodes.forEach(node => {
    const name = node.getAttribute('data-stat-name');
    const target = clamp(Math.round(stats[name] || 0), 0, 100);
    const bar = node.querySelector('.bar');
    const valueNode = node.querySelector('.value');
    // Set to zero first (already zero), then to target to trigger transition
    requestAnimationFrame(() => {
      bar.style.width = target + '%';
      bar.setAttribute('aria-valuenow', String(target));
      if (valueNode) valueNode.textContent = String(target);
    });
  });
}

function updateStats(container, newStats) {
  if (!container || !container.__charData) return;
  const d = container.__charData;
  d.stats = Object.assign({}, d.stats, newStats);

  const card = container.querySelector('.char-card');
  if (!card) return;

  // Update each stat: if exists update value and animate width
  Object.keys(d.stats).forEach(name => {
    const statNode = card.querySelector(`.stat[data-stat-name="${cssEscape(name)}"]`);
    const target = clamp(Math.round(d.stats[name] || 0), 0, 100);
    if (statNode) {
      const bar = statNode.querySelector('.bar');
      const valueNode = statNode.querySelector('.value');
      // Animate: set width and aria
      // Force reflow to ensure transition happens on repeated same-value updates
      bar.style.width = bar.style.width; // no-op but ensures style access
      requestAnimationFrame(() => {
        bar.style.width = target + '%';
        bar.setAttribute('aria-valuenow', String(target));
        if (valueNode) valueNode.textContent = String(target);
      });
    } else {
      // If new stat, add a new DOM node
      const statsWrap = card.querySelector('.stats');
      const stat = document.createElement('div');
      stat.className = 'stat';
      stat.setAttribute('data-stat-name', name);
      stat.innerHTML = `
        <div class="label">${escapeHtml(name)}</div>
        <div class="bar-wrap"><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" style="width:0%"></div></div>
        <div class="value">${clamp(d.stats[name],0,100)}</div>
      `;
      statsWrap.appendChild(stat);
      requestAnimationFrame(() => animateBars(card, d.stats));
    }
  });

  // Announce update via live region
  const live = card.querySelector('[aria-live]');
  if (live) {
    live.textContent = `Stats updated for ${d.name}`;
  }
}

function init(container, data) {
  if (!container) throw new Error('Container element required');
  return buildCard(container, data);
}

// small helpers
function clamp(n, a, b) { return Math.min(b, Math.max(a, n)); }
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]); }
function cssEscape(s) { return s.replace(/(["'\\])/g, '\\$1'); }

export { init, updateStats };

// If loaded directly in a non-module script tag fallback (not used in demo) -- keep modular only.