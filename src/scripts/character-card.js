/* character-card.js
   Exports initCharacterCard(rootEl, options) API which inserts a skeleton card into the given root element.
   This is a stubbed implementation for scaffolding and demo purposes. Keep modular and commented.
*/

export function initCharacterCard(rootEl, options = {}) {
  if (!(rootEl instanceof HTMLElement)) {
    console.warn('initCharacterCard: rootEl must be an HTMLElement');
    return null;
  }

  const opts = Object.assign({
    name: 'Unknown',
    role: 'Unknown role'
  }, options);

  // Create the card element
  const card = document.createElement('article');
  card.className = 'character-card';

  // Media placeholder
  const media = document.createElement('div');
  media.className = 'character-card__media';
  media.textContent = 'Media Placeholder';
  card.appendChild(media);

  // Body container
  const body = document.createElement('div');
  body.className = 'character-card__body';

  const title = document.createElement('h2');
  title.className = 'character-card__title';
  title.textContent = opts.name;

  const subtitle = document.createElement('p');
  subtitle.className = 'character-card__subtitle';
  subtitle.textContent = opts.role;

  body.appendChild(title);
  body.appendChild(subtitle);

  // Stats skeleton
  const stats = document.createElement('div');
  stats.className = 'character-card__stats';

  ['STR', 'DEX', 'INT'].forEach((label) => {
    const stat = document.createElement('div');
    stat.className = 'character-card__stat';

    const amount = document.createElement('span');
    amount.className = 'character-card__stat-amount';
    amount.textContent = '--';

    const statLabel = document.createElement('small');
    statLabel.textContent = label;
    statLabel.style.display = 'block';
    statLabel.style.color = 'var(--color-muted)';

    stat.appendChild(amount);
    stat.appendChild(statLabel);
    stats.appendChild(stat);
  });

  body.appendChild(stats);
  card.appendChild(body);

  // Insert into root
  rootEl.appendChild(card);

  // Return an API object to allow future interactions (stubbed)
  return {
    root: rootEl,
    card,
    updateName: (newName) => { title.textContent = newName; },
    updateRole: (newRole) => { subtitle.textContent = newRole; }
  };
}
