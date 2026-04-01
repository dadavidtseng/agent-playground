/* CharCard - framework-agnostic Web Component
API: Pass object to el.data = {name, level, bio, stats:[{label,value,max}], badges:[], variant:'compact'|'default'|'expanded'}
Supports: stat animations, bio toggle, keyboard accessibility
*/

class CharCard extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this._data = null;
    this._reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this._root = document.createElement('div');
    this._root.className = 'char-card';
    // include style
    const link = document.createElement('style');
    link.textContent = `@import "./char-card.css";`;
    this.shadowRoot.append(link, this._root);
    this._onToggleKey = this._onToggleKey.bind(this);
  }

  connectedCallback(){
    if(!this.hasAttribute('role')) this.setAttribute('role','group');
    if(this.hasAttribute('variant')) this._applyVariant(this.getAttribute('variant'));
    this.render();
  }

  set data(v){
    this._data = v;
    this.render();
    // animate stats if present
    this._animateStats();
  }
  get data(){ return this._data }

  static get observedAttributes(){ return ['variant'] }
  attributeChangedCallback(name,oldV,newV){ if(name==='variant') this._applyVariant(newV) }

  _applyVariant(v){
    this._root.classList.remove('compact','expanded');
    if(v==='compact') this._root.classList.add('compact');
    else if(v==='expanded') this._root.classList.add('expanded');
  }

  _onToggleKey(e){
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      e.currentTarget.click();
    }
  }

  _animateStats(){
    if(!this._data || !this.shadowRoot) return;
    if(this._reduced) return; // skip animation
    const fills = this.shadowRoot.querySelectorAll('.stat__fill');
    fills.forEach(el => {
      const target = Number(el.getAttribute('data-target')||0);
      // animate using requestAnimationFrame for smoothness across browsers
      const duration = parseInt(getComputedStyle(this).getPropertyValue('--transition-duration')) || 500;
      const start = performance.now();
      const initial = Number(el.getAttribute('data-current')) || 0;
      const delta = target - initial;
      function step(now){
        const t = Math.min(1, (now-start)/duration);
        const eased = t; // linear for simplicity
        const value = initial + delta*eased;
        el.style.width = Math.max(0, Math.min(100, value)) + '%';
        if(t < 1) requestAnimationFrame(step);
        else el.setAttribute('data-current', target);
      }
      requestAnimationFrame(step);
    });
  }

  render(){
    const d = this._data || this._example();
    // build markup
    this._root.innerHTML = `
      <div class="char-card__portrait" aria-hidden="true">
        ${this._inlinePortraitSVG()}
      </div>
      <div class="char-card__content">
        <div class="char-card__header">
          <div style="display:flex;align-items:center;gap:8px">
            <div class="char-card__title">${this._escape(d.name)} <span class="char-card__meta">Lv ${this._escape(String(d.level||1))}</span></div>
            <div class="char-card__badges">${(d.badges||[]).map(b=>`<span class="badge" title="${this._escape(b)}">${this._escape(b)}</span>`).join('')}</div>
          </div>
          <div class="char-card__meta">${this._escape(d.role||'Adventurer')}</div>
        </div>
        <div class="char-card__stats" aria-hidden="false">
          ${(d.stats||[]).map(s => `
            <div class="stat" data-label="${this._escape(s.label)}">
              <div class="stat__label">${this._escape(s.label)}</div>
              <div class="stat__bar" role="progressbar" aria-valuemin="0" aria-valuemax="${s.max||100}" aria-valuenow="${s.value||0}" aria-label="${this._escape(s.label)}">
                <div class="stat__fill" data-target="${Math.round(((s.value||0)/(s.max||100))*100)}" data-current="0" style="width:0%"></div>
              </div>
              <div style="width:36px;text-align:right;color:var(--muted);font-size:0.8rem">${this._escape(s.value||0)}</div>
            </div>
          `).join('')}
        </div>
        <div class="char-card__bio" id="bio-${this._uid()}">${this._escape(d.bio||'No biography available.')}</div>
        <div class="char-card__actions">
          <button class="toggle-bio" aria-expanded="false" aria-controls="bio-${this._uid(0)}">Read more</button>
        </div>
      </div>
    `;

    // wire toggle
    const btn = this.shadowRoot.querySelector('.toggle-bio');
    const bio = this.shadowRoot.querySelector('.char-card__bio');
    if(btn && bio){
      btn.removeEventListener('keydown', this._onToggleKey);
      btn.addEventListener('keydown', this._onToggleKey);
      btn.addEventListener('click', ()=>{
        const expanded = bio.classList.toggle('expanded');
        btn.setAttribute('aria-expanded', expanded?'true':'false');
        btn.textContent = expanded? 'Show less' : 'Read more';
      });
    }
    // apply variant class if attribute set
    const v = this.getAttribute('variant');
    if(v) this._applyVariant(v);
  }

  // tiny helper to avoid collisions for bio id
  _uid(seed=1){
    // deterministic per instance
    if(!this._id) this._id = Math.floor(Math.random()*1e6);
    return this._id + seed;
  }

  _escape(s){
    return String(s||'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  }

  _inlinePortraitSVG(){
    // Simple placeholder SVG (artist assets could be more complex). Inlined to avoid remote fetch.
    return `
      <svg width="100%" height="100%" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stop-color="#60a5fa" />
            <stop offset="1" stop-color="#5eead4" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="120" height="120" rx="12" fill="url(#g1)" opacity="0.12" />
        <g transform="translate(30,20)" fill="none" stroke="white" stroke-opacity="0.9">
          <circle cx="30" cy="24" r="20" fill="rgba(255,255,255,0.06)" />
          <path d="M0 90c10-30 50-30 60 0" stroke-width="3" stroke-linecap="round"/>
        </g>
      </svg>
    `;
  }

  _example(){
    return {
      name:'Aria Nightwind', level:12, role:'Ranger',
      badges:['Sharpshooter','Beastfriend'],
      stats:[{label:'HP',value:84,max:120},{label:'ATK',value:58,max:80},{label:'DEF',value:41,max:60}],
      bio:'Aria is a scout from the highlands, known for her keen eyes and companionship with a hawk named Soot. She left home at a young age to pursue the sky and the secrets it holds.'
    }
  }
}

customElements.define('char-card', CharCard);

// Expose global helper to mount from JSON data for demo convenience
window.CharCardMount = function(container, dataArray){
  container.innerHTML = '';
  dataArray.forEach((d, i)=>{
    const el = document.createElement('char-card');
    if(d.variant) el.setAttribute('variant', d.variant);
    el.data = d;
    container.appendChild(el);
  });
}
