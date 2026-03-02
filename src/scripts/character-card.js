class CharacterCard extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('character-card-template');
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Initialize animations for stat fills
    this._initStats();

    // Keyboard interactions for stat elements
    this.shadowRoot.querySelectorAll('.stat').forEach(statEl => {
      statEl.addEventListener('keydown', (e) => this._onStatKeydown(e, statEl));
    });
  }

  _initStats() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const statEls = this.shadowRoot.querySelectorAll('.stat');
    statEls.forEach(statEl => {
      const value = Number(statEl.getAttribute('data-value') || statEl.getAttribute('aria-valuenow') || 0);
      const fill = statEl.querySelector('.fill');
      const max = Number(statEl.getAttribute('aria-valuemax') || 100);
      const pct = Math.min(Math.max(value / max, 0), 1);

      // Set ARIA aria-valuenow if missing
      if (!statEl.hasAttribute('aria-valuenow')) {
        statEl.setAttribute('aria-valuenow', String(value));
      }

      // Use transform: scaleX for the animation/hardware acceleration
      // If reduced motion is preferred, don't animate; set final state directly
      if (prefersReduced) {
        fill.style.transition = 'none';
        fill.style.transform = `scaleX(${pct})`;
      } else {
        // Small timeout to allow CSS transitions to run after insertion
        requestAnimationFrame(() => {
          // set initial 0 -> then to pct, use RAF twice to ensure paint
          fill.style.transform = 'scaleX(0)';
          requestAnimationFrame(() => {
            fill.style.transform = `scaleX(${pct})`;
          });
        });
      }

      // Set ARIA attributes on the fill for clarity (not required) and data-stat
      if (fill) {
        const statName = fill.getAttribute('data-stat') || '';
        fill.setAttribute('role', 'presentation');
        fill.setAttribute('aria-hidden', 'true');
      }

    });
  }

  _onStatKeydown(e, statEl) {
    // Allow arrow keys to increase/decrease stat (visual only) and update aria-valuenow
    const key = e.key;
    if (!['ArrowLeft','ArrowRight','ArrowDown','ArrowUp'].includes(key)) return;
    e.preventDefault();
    const delta = (key === 'ArrowRight' || key === 'ArrowUp') ? 1 : -1;
    const min = Number(statEl.getAttribute('aria-valuemin') || 0);
    const max = Number(statEl.getAttribute('aria-valuemax') || 100);
    let val = Number(statEl.getAttribute('aria-valuenow') || 0);
    val = Math.min(max, Math.max(min, val + delta));
    statEl.setAttribute('aria-valuenow', String(val));

    const fill = statEl.querySelector('.fill');
    const pct = val / max;
    fill.style.transform = `scaleX(${pct})`;
  }
}

customElements.define('character-card', CharacterCard);

export default CharacterCard;