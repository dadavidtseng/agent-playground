/* Demo script to mount character cards. Dependency-free. */

const cardsRoot = document.getElementById('cards');
const themeToggle = document.getElementById('theme-toggle');
const reducedMotionToggle = document.getElementById('reduced-motion-toggle');

// Example characters — avatarSvg left as placeholder string for Artist later
const EXAMPLE_CHARACTERS = [
  {
    id: 'char-1',
    name: 'Ayla the Swift',
    role: 'Rogue',
    bio: 'A swift scout with a penchant for mischief and keen eyes for treasure.',
    avatarSvg: '',
  },
  {
    id: 'char-2',
    name: 'Borin Stonehelm',
    role: 'Warrior',
    bio: 'A steadfast defender, veteran of many campaigns and a lover of strong ale.',
    avatarSvg: '',
  },
  {
    id: 'char-3',
    name: 'Lirael of the Veil',
    role: 'Mage',
    bio: 'A scholar of forbidden lore who prefers moonlit libraries to crowds.',
    avatarSvg: '',
  }
];

// Mount initial UI
function init() {
  // mount characters
  EXAMPLE_CHARACTERS.forEach(char => {
    const container = document.createElement('article');
    container.className = 'char-card';
    container.setAttribute('role', 'article');
    container.setAttribute('aria-labelledby', `${char.id}-name`);
    container.id = char.id;

    cardsRoot.appendChild(container);
    mountCharCard(container, char);
  });

  // theme toggle
  themeToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  });

  // reduced motion toggle
  reducedMotionToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-reduced-motion', 'true');
    } else {
      document.documentElement.removeAttribute('data-reduced-motion');
    }
  });
}

// Stub: mountCharCard should render the card structure and wire up bio toggle
export function mountCharCard(container, character) {
  // Clear container
  container.innerHTML = '';

  // Visual area with placeholder SVG (Artist will replace avatarSvg later)
  const visual = document.createElement('div');
  visual.className = 'char-visual';
  visual.setAttribute('aria-hidden', 'true');

  // Use provided avatarSvg if present, otherwise simple placeholder
  if (character.avatarSvg) {
    visual.innerHTML = character.avatarSvg; // safe here for demo
  } else {
    visual.innerHTML = `
      <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="currentColor" opacity="0.08"/>
        <circle cx="12" cy="9" r="3" stroke="currentColor" stroke-width="1.2" fill="none" />
        <path d="M4 20c1.5-3 4.5-4 8-4s6.5 1 8 4" stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" />
      </svg>
    `;
  }

  // Meta
  const meta = document.createElement('div');
  meta.className = 'char-meta';

  const name = document.createElement('h2');
  name.className = 'char-name';
  name.id = `${character.id}-name`;
  name.textContent = character.name;

  const role = document.createElement('p');
  role.className = 'char-role';
  role.textContent = character.role;

  const toggle = document.createElement('button');
  toggle.className = 'toggle-bio';
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'Show bio';

  // Bio
  const bio = document.createElement('p');
  bio.className = 'char-bio';
  bio.id = `${character.id}-bio`;
  bio.setAttribute('aria-hidden', 'true');
  bio.textContent = character.bio;

  // Wire toggle
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.textContent = expanded ? 'Show bio' : 'Hide bio';
    bio.setAttribute('aria-hidden', String(expanded));
  });

  meta.appendChild(name);
  meta.appendChild(role);
  meta.appendChild(toggle);

  container.appendChild(visual);
  container.appendChild(meta);
  container.appendChild(bio);
}

// Auto-init
document.addEventListener('DOMContentLoaded', init);
