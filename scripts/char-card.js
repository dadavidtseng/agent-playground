/* char-card.js - implements CharCard as a lightweight Web Component (ES Module)

API (component properties):
- data (Object): { name, class, level, bio, stats: {hp,attack,defense,speed}, avatarSvg (string), variant }
- Alternatively, set attributes: name, class, level, bio, avatar-svg (not required)

Usage:
  <char-card></char-card>
  document.querySelector('char-card').data = { name: 'X', class:'Y', level:3, bio:'..', stats:{hp:90,...}, avatarSvg: '<svg>...</svg>' }

Accessible stat bars: role="progressbar" aria-valuenow/min/max
*/

const template = document.createElement('template');
template.innerHTML = `
  <style>:host{display:block}</style>
  <article class="char-card" tabindex="0">
    <div class="avatar" part="avatar" aria-hidden="true"></div>
    <div class="meta">
      <div class="row">
        <div>
          <div class="name" part="name"></div>
          <div class="class-level" part="classLevel"></div>
        </div>
      </div>
      <p class="bio" part="bio"></p>

      <div class="stats" part="stats">
        <div class="stat hp">
          <div class="stat__label"><span>HP</span><span class="stat__value" data-key="hp"></span></div>
          <div class="stat__bar" data-key="hp" tabIndex="0" role="progressbar" aria-valuemin="0" aria-valuemax="100">
            <div class="stat__fill" data-key="hp"></div>
          </div>
        </div>

        <div class="stat attack">
          <div class="stat__label"><span>Attack</span><span class="stat__value" data-key="attack"></span></div>
          <div class="stat__bar" data-key="attack" tabIndex="0" role="progressbar" aria-valuemin="0" aria-valuemax="100">
            <div class="stat__fill" data-key="attack"></div>
          </div>
        </div>

        <div class="stat defense">
          <div class="stat__label"><span>Defense</span><span class="stat__value" data-key="defense"></span></div>
          <div class="stat__bar" data-key="defense" tabIndex="0" role="progressbar" aria-valuemin="0" aria-valuemax="100">
            <div class="stat__fill" data-key="defense"></div>
          </div>
        </div>

        <div class="stat speed">
          <div class="stat__label"><span>Speed</span><span class="stat__value" data-key="speed"></span></div>
          <div class="stat__bar" data-key="speed" tabIndex="0" role="progressbar" aria-valuemin="0" aria-valuemax="100">
            <div class="stat__fill" data-key="speed"></div>
          </div>
        </div>
      </div>
    </div>
  </article>
`;

class CharCard extends HTMLElement{
  constructor(){
    super();
    this._shadow = this.attachShadow({mode:'open'});
    this._shadow.appendChild(template.content.cloneNode(true));

    // link external stylesheet from demo (host page) — prefer global styles but also allow fallback
    const link = document.createElement('link');
    link.setAttribute('rel','stylesheet');
    link.setAttribute('href','../styles/char-card.css');
    this._shadow.appendChild(link);

    this.$ = {
      host: this._shadow.querySelector('.char-card'),
      avatar: this._shadow.querySelector('.avatar'),
      name: this._shadow.querySelector('.name'),
      classLevel: this._shadow.querySelector('.class-level'),
      bio: this._shadow.querySelector('.bio'),
      stats: this._shadow.querySelector('.stats')
    };

    this._data = null;
    this._animated = false;
  }

  static get observedAttributes(){ return ['name','class','level','bio','variant']; }

  attributeChangedCallback(name, oldVal, newVal){
    if(!this._data) this._data = {};
    if(name==='class') name = 'className';
    this._data[name] = newVal;
    this.render();
  }

  set data(obj){
    this._data = Object.assign({}, obj);
    // normalize keys
    if(this._data['class']){ this._data.className = this._data['class']; }
    this.render();
    // trigger animation after next paint
    requestAnimationFrame(()=> requestAnimationFrame(()=> this._runStatAnimation()));
  }
  get data(){ return this._data; }

  connectedCallback(){
    // attempt render from attributes
    if(!this._data){
      const name = this.getAttribute('name');
      if(name){ this._data = { name }; }
    }
    this.render();
    // If data present on connect run animation
    requestAnimationFrame(()=> this._runStatAnimation());
  }

  render(){
    const d = this._data || {};
    this.$.name.textContent = d.name || 'Unnamed';
    const cls = d.className || d.class || '';
    const lvl = (d.level!=null) ? ` — Lv ${d.level}` : '';
    this.$.classLevel.textContent = `${cls}${lvl}`.trim();
    this.$.bio.textContent = d.bio || '';

    // avatar
    if(d.avatarSvg){
      // set raw SVG in avatar container (inline)
      this.$.avatar.innerHTML = d.avatarSvg;
      // ensure svg scales crisply
      const svg = this.$.avatar.querySelector('svg');
      if(svg){
        svg.setAttribute('width','100%');
        svg.setAttribute('height','100%');
        svg.setAttribute('preserveAspectRatio','xMidYMid meet');
        svg.style.display = 'block';
      }
    }

    // stats
    const stats = (d.stats) ? d.stats : {};
    ['hp','attack','defense','speed'].forEach(key => {
      const val = Math.max(0, Math.min(100, Number(stats[key] ?? 0)));
      const valueEl = this._shadow.querySelector(`.stat__value[data-key="${key}"]`);
      const bar = this._shadow.querySelector(`.stat__bar[data-key="${key}"]`);
      const fill = this._shadow.querySelector(`.stat__fill[data-key="${key}"]`);
      if(valueEl) valueEl.textContent = val;
      if(bar) bar.setAttribute('aria-valuenow', String(val));
      if(fill) {
        fill.style.transform = 'scaleX(0)';
        fill.dataset.target = String(val/100);
      }
    });
  }

  _runStatAnimation(){
    if(this._animated) return; // only animate once on mount
    // respect prefers-reduced-motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fills = Array.from(this._shadow.querySelectorAll('.stat__fill'));
    if(reduce){
      fills.forEach(f => {
        const t = Number(f.dataset.target || 0);
        f.style.transform = `scaleX(${t})`;
      });
      this._animated = true;
      return;
    }

    // stagger animation slightly
    fills.forEach((f,i) => {
      const t = Number(f.dataset.target || 0);
      // set transition in JS to ensure timing
      f.style.transition = 'transform 700ms cubic-bezier(0.2,0.8,0.2,1)';
      // stagger via timeout
      setTimeout(()=> {
        f.style.transform = `scaleX(${t})`;
      }, i * 80);
    });
    this._animated = true;
  }
}

customElements.define('char-card', CharCard);

export default CharCard;
