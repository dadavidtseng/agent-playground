/* Card component JS API
   Exports functions to create and control card instances.
   Functions:
     createCard(options) -> HTMLElement
     setStats(cardElement, stats) -> void
     animateStats(cardElement) -> Promise
     toggleBio(cardElement, expand) -> void

   Behavior:
     - Animated stat bars on load and on setStats
     - Keyboard accessible bio toggle
     - Updates aria-valuenow on progressbars
*/
(function(global){
  // Utility: deep clone template and replace placeholder IDs
  function _cloneTemplate(){
    const tpl = document.getElementById('kadi-card-template');
    if(!tpl) throw new Error('kadi-card-template not found. Ensure src/components/Card.html is included.');
    const content = tpl.content.cloneNode(true);
    // create unique id suffix
    const uid = Math.random().toString(36).slice(2,9);
    // replace placeholders in id attributes
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_ELEMENT, null, false);
    while(walker.nextNode()){
      const el = walker.currentNode;
      if(el.id) el.id = el.id.replace('__ID__', uid);
      // attributes referencing ids (aria-controls) may contain placeholders
      for(const attr of ['aria-controls','aria-labelledby']){
        if(el.hasAttribute(attr)){
          el.setAttribute(attr, el.getAttribute(attr).replace('__ID__', uid));
        }
      }
    }
    return content;
  }

  function createCard(options = {}){
    // options: name, title, bio, stats {strength,agility,endurance}, classes
    const content = _cloneTemplate();
    const article = content.querySelector('.kadi-card');
    if(options.classes) article.classList.add(...options.classes.split(' '));
    const nameEl = article.querySelector('.card-name');
    const titleEl = article.querySelector('.card-title');
    const bioText = article.querySelector('.bio-text');

    if(options.name) nameEl.textContent = options.name;
    if(options.title) titleEl.textContent = options.title;
    if(options.bio) bioText.textContent = options.bio;

    // attach behavior: bio toggle
    const toggle = article.querySelector('.bio-toggle');
    const bio = article.querySelector('.bio-content');
    toggle.addEventListener('click', ()=> toggleBio(article));
    toggle.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggle.click();
      }
    });

    // prepare stats
    const defaultStats = { strength:0, agility:0, endurance:0 };
    const stats = Object.assign({}, defaultStats, options.stats || {});
    setStats(article, stats, {animate:false});

    // return an element (fragment may contain template nodes so find article)
    // content is a DocumentFragment, article is still in it. We need to return the article node.
    return article;
  }

  function _getStatRow(card, key){
    return card.querySelector(`.stat[data-stat-key="${key}"]`);
  }

  function setStats(cardElement, stats = {}, opts = { animate:true }){
    // stats: {strength: number, agility:number, endurance:number}
    const keys = Object.keys(stats);
    keys.forEach(k => {
      const row = _getStatRow(cardElement, k);
      if(!row) return;
      const val = Math.max(0, Math.min(100, Number(stats[k]) || 0));
      const fill = row.querySelector('.fill');
      const bar = row.querySelector('.stat-bar');
      const valueEl = row.querySelector('.stat-value');
      // set aria
      bar.setAttribute('aria-valuenow', String(val));
      bar.setAttribute('aria-label', row.querySelector('.stat-label').textContent + ' ' + val);
      valueEl.textContent = String(val);
      if(opts.animate){
        // trigger layout so transition applies
        requestAnimationFrame(()=>{
          fill.style.width = val + '%';
        });
      } else {
        fill.style.transition = 'none';
        fill.style.width = val + '%';
        // force reflow then restore
        void fill.offsetWidth;
        fill.style.transition = '';
      }
    });
  }

  function animateStats(cardElement){
    // animate from 0 to current values. Reset fills to 0 then animate
    const rows = cardElement.querySelectorAll('.stat');
    const promises = [];
    rows.forEach((row, i)=>{
      const fill = row.querySelector('.fill');
      const bar = row.querySelector('.stat-bar');
      const valueEl = row.querySelector('.stat-value');
      const target = Number(bar.getAttribute('aria-valuenow')) || 0;
      // set to zero first
      fill.style.transition = 'none';
      fill.style.width = '0%';
      valueEl.textContent = '0';
      // small stagger
      const p = new Promise(resolve => {
        setTimeout(()=>{
          fill.style.transition = '';
          // animate width and increment numeric value using requestAnimationFrame
          const duration = 800;
          const start = performance.now();
          function tick(now){
            const t = Math.min(1, (now-start)/duration);
            const eased = t; // linear; could apply easing
            const cur = Math.round(eased * target);
            fill.style.width = cur + '%';
            valueEl.textContent = cur;
            if(t < 1) requestAnimationFrame(tick);
            else resolve();
          }
          requestAnimationFrame(tick);
        }, i*120);
      });
      promises.push(p);
    });
    return Promise.all(promises);
  }

  function toggleBio(cardElement, expand){
    const toggle = cardElement.querySelector('.bio-toggle');
    const bio = cardElement.querySelector('.bio-content');
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    const shouldExpand = typeof expand === 'boolean' ? expand : !isExpanded;
    toggle.setAttribute('aria-expanded', shouldExpand ? 'true' : 'false');
    if(shouldExpand){
      bio.hidden = false;
      toggle.textContent = 'Hide Bio';
      // focus management: move focus to bio on expand
      bio.setAttribute('tabindex','-1');
      bio.focus({preventScroll:true});
    } else {
      bio.hidden = true;
      toggle.textContent = 'Show Bio';
      toggle.focus({preventScroll:true});
    }
  }

  // Expose API
  global.KadiCard = {
    createCard,
    setStats,
    animateStats,
    toggleBio,
  };

})(window);
