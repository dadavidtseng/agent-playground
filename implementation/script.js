// script.js - Minimal Card API scaffold

/*
  Card API:
    - Card.createFrom(data): creates a Card instance from a JSON object
    - Card.render(root): render the card into a DOM root element
    - Card.initAnimations(): placeholder to initialise animations

  Note: Placeholder tokens (TOKEN: ...) are left where design tokens or SVGs should be integrated.
*/

const Card = (function(){
  // Private helper to create element with classes
  function el(tag, cls, text){
    const e = document.createElement(tag);
    if(cls) e.className = cls;
    if(text !== undefined) e.textContent = text;
    return e;
  }

  class CardInstance{
    constructor(data = {}){
      this.data = data;
      // placeholder for parsed tokens
      this.tokens = {
        accent: 'var(--accent)', // TOKEN: REPLACE_WITH_DESIGN_TOKEN
      };
    }

    createElement(){
      const wrapper = el('article','card');

      const art = el('div','card__art');
      // Placeholder SVG usage - replace with final SVG or <use xlink:href="#card-frame"> when available
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('class','placeholder');
      svg.setAttribute('viewBox','0 0 120 160');
      svg.innerHTML = `\n        <!-- TOKEN: INSERT_ART_SVG_HERE - use /art/placeholders/ assets -->\n        <rect x="10" y="10" width="100" height="70" rx="6" fill="${this.tokens.accent}" opacity="0.12" />\n        <rect x="20" y="92" width="80" height="6" rx="3" fill="rgba(0,0,0,0.08)" />\n        <rect x="20" y="104" width="60" height="6" rx="3" fill="rgba(0,0,0,0.06)" />\n      `;
      art.appendChild(svg);

      const content = el('div','card__content');
      const title = el('div','card__title', this.data.name || 'Placeholder Name');
      const subtitle = el('div','card__subtitle', this.data.type || 'Placeholder Type');

      const attributes = el('div','card__attributes');

      // Render fields if provided in data.fields or fallback to placeholders
      const fields = this.data.fields || [
        {k:'Power', v:'--'},
        {k:'Cost', v:'--'},
        {k:'Rarity', v:'Common'}
      ];
      fields.forEach(f => {
        const a = el('div','card__attr', `${f.k}: ${f.v}`);
        attributes.appendChild(a);
      });

      content.appendChild(title);
      content.appendChild(subtitle);
      content.appendChild(attributes);

      wrapper.appendChild(art);
      wrapper.appendChild(content);

      // attach for later reference
      this.el = wrapper;
      return wrapper;
    }

    // Simple mount
    render(root){
      if(!this.el) this.createElement();
      root.appendChild(this.el);
    }
  }

  return {
    createFrom(data){
      return new CardInstance(data);
    },

    // Render a card or array of cards into root selector or element
    render(rootSelector, cards){
      const root = (typeof rootSelector === 'string') ? document.querySelector(rootSelector) : rootSelector;
      if(!root) throw new Error('Root element not found for Card.render');

      // Accept either a single card instance or data object/array
      const items = Array.isArray(cards) ? cards : [cards];
      items.forEach(item => {
        let instance = null;
        if(item && typeof item.render === 'function'){
          instance = item;
        } else {
          instance = Card.createFrom(item || {});
        }
        instance.render(root);
      });
    },

    initAnimations(){
      // Placeholder: implement entrance/hover animations later
      // TOKEN: INIT_ANIMATIONS_HERE
      console.log('Card.initAnimations() called - animations not yet implemented');
    }
  };
})();

// Auto-boot: load sample data and render
window.addEventListener('DOMContentLoaded', async () => {
  const root = document.querySelector('.card-root');
  try{
    const res = await fetch('sample-character.json');
    if(!res.ok) throw new Error('Sample JSON not found');
    const data = await res.json();
    // support array or single
    const items = Array.isArray(data) ? data : [data];
    Card.render(root, items.map(d => Card.createFrom(d)));
  }catch(err){
    console.warn('Could not load sample-character.json, rendering default placeholder', err);
    Card.render(root, Card.createFrom({}));
  }

  Card.initAnimations();
});
