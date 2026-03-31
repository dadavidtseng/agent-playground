/* Demo script for character cards
   - Provides CharacterCard.init API
   - Auto-initializes when data-init attribute is present on #character-root
   - Progressive enhancement: if JS disabled, nothing breaks
   - Uses optimized inline SVG snippets for characters
*/

(function(global){
  'use strict';

  // Basic helper: create element with class and optional attrs
  function el(tag, cls, attrs){
    var node = document.createElement(tag);
    if(cls) node.className = cls;
    if(attrs){
      Object.keys(attrs).forEach(function(k){
        node.setAttribute(k, attrs[k]);
      });
    }
    return node;
  }

  // Optimized inline SVG snippets for characters. Kept minimal and accessible.
  var SVG_ASSETS = {
    Ranger: '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">'
      + '<rect width="120" height="120" rx="16" fill="none" />'
      + '<g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="translate(12,10)">'
      + '<path d="M36 10c-6 0-10 4-10 10s4 10 10 10 10-4 10-10-4-10-10-10z" fill="currentColor" opacity="0.12"/>'
      + '<path d="M36 36c-14 0-26 8-26 18v8h52v-8c0-10-12-18-26-18z" fill="currentColor" opacity="0.06"/>'
      + '<path d="M8 70c10-8 28-12 44-12s34 4 44 12" stroke="currentColor" opacity="0.14" />'
      + '</g>'
      + '</svg>',

    Warrior: '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">'
      + '<rect width="120" height="120" rx="16" fill="none" />'
      + '<g transform="translate(10,8)" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">'
      + '<circle cx="44" cy="24" r="12" fill="currentColor" opacity="0.14"/>'
      + '<path d="M10 70c8-14 30-20 44-20s36 6 44 20" stroke="currentColor" opacity="0.12"/>'
      + '<rect x="24" y="42" width="40" height="10" rx="4" fill="currentColor" opacity="0.06" />'
      + '</g>'
      + '</svg>',

    Mage: '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="false">'
      + '<rect width="120" height="120" rx="16" fill="none" />'
      + '<g transform="translate(14,12)" fill="none" stroke="currentColor" stroke-width="2.5">'
      + '<path d="M36 14c-6 0-10 4-10 10s4 10 10 10 10-4 10-10-4-10-10-10z" fill="currentColor" opacity="0.12"/>'
      + '<path d="M18 58c8-10 20-16 36-16s28 6 36 16" stroke="currentColor" opacity="0.14"/>'
      + '<path d="M36 36c-6 4-12 8-18 12" stroke="currentColor" opacity="0.08"/>'
      + '</g>'
      + '</svg>'
  };

  // Choose appropriate SVG based on class or name heuristics
  function chooseSVG(data){
    var cls = (data.class || '').toLowerCase();
    if(cls.indexOf('ranger') !== -1) return SVG_ASSETS.Ranger;
    if(cls.indexOf('warrior') !== -1) return SVG_ASSETS.Warrior;
    if(cls.indexOf('mage') !== -1) return SVG_ASSETS.Mage;
    // fallback by name
    var name = (data.name || '').toLowerCase();
    if(name.indexOf('mira') !== -1 || name.indexOf('mage') !== -1) return SVG_ASSETS.Mage;
    if(name.indexOf('kor') !== -1 || name.indexOf('war') !== -1) return SVG_ASSETS.Warrior;
    return SVG_ASSETS.Ranger;
  }

  // Build a single card DOM from data
  function buildCard(data){
    var card = el('article','character-card', { 'tabindex': '0', 'role': 'button', 'aria-expanded': 'false' });

    var avatar = el('div','avatar');
    var svg = chooseSVG(data);
    // Provide a descriptive title for screen readers
    var title = data.avatarTitle || data.name || 'Avatar';
    // Inject svg and ensure it has aria-label
    // Some SVGs include aria-hidden; ensure accessible label via aria-label on container
    avatar.innerHTML = svg;
    avatar.setAttribute('aria-label', title);
    avatar.setAttribute('role','img');
    card.appendChild(avatar);

    var body = el('div','card-body');

    var header = el('div','card-header');
    var titleWrap = el('div');
    var titleEl = el('div','card-title'); titleEl.textContent = data.name || 'Unnamed';
    var sub = el('div','card-sub'); sub.textContent = (data.class || 'Adventurer') + ' — Lv ' + (data.level || 1);
    titleWrap.appendChild(titleEl); titleWrap.appendChild(sub);

    header.appendChild(titleWrap);

    var right = el('div','');
    var badge = el('div','card-badge'); badge.textContent = '';
    right.appendChild(badge);
    header.appendChild(right);

    body.appendChild(header);

    var bio = el('div','card-bio'); bio.textContent = data.bio || '';
    bio.setAttribute('data-hidden','false');
    body.appendChild(bio);

    // Stats
    var statsWrap = el('div','stats');
    var stats = data.stats || {};

    Object.keys(stats).forEach(function(key){
      var row = el('div','stat-row');
      var label = el('div','stat-label'); label.textContent = key;
      var bar = el('div','stat-bar');
      var fill = el('div','stat-fill');
      // store target value as data attribute for JS animation
      var val = stats[key];
      fill.style.width = '0%';
      fill.setAttribute('data-target', String(val));

      bar.appendChild(fill);
      var value = el('div','stat-value'); value.textContent = val;

      row.appendChild(label); row.appendChild(bar); row.appendChild(value);
      statsWrap.appendChild(row);
    });

    body.appendChild(statsWrap);

    // Actions
    var actions = el('div','actions');
    var btn1 = el('button','btn'); btn1.textContent = 'Inspect';
    btn1.setAttribute('aria-label','Inspect ' + (data.name || 'character'));
    var btn2 = el('button','btn'); btn2.textContent = 'Challenge';
    btn2.setAttribute('aria-label','Challenge ' + (data.name || 'character'));
    actions.appendChild(btn1); actions.appendChild(btn2);

    body.appendChild(actions);

    card.appendChild(body);
    return card;
  }

  // Animate stat fills from 0 to percentage based on a simple normalization.
  function animateStats(root){
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      // Respect preference: set final widths immediately
      var fills = root.querySelectorAll('.stat-fill');
      fills.forEach(function(f){
        var target = parseFloat(f.getAttribute('data-target')) || 0;
        var pct = normalizeToPercent(target);
        f.style.width = pct + '%';
      });
      return;
    }

    var fills = root.querySelectorAll('.stat-fill');
    fills.forEach(function(f, i){
      var target = parseFloat(f.getAttribute('data-target')) || 0;
      var pct = normalizeToPercent(target);
      // Staggered animation using timeout
      setTimeout(function(){ f.style.width = pct + '%'; }, 80 * i);
    });
  }

  // Normalize numeric stat into a 0-100 percent for the bar.
  function normalizeToPercent(value){
    var max = 140; // placeholder cap representing "max expected stat"
    var pct = Math.max(0, Math.min(100, (value / max) * 100));
    return Math.round(pct);
  }

  // Main initializer: accepts root element (or selector) and data array
  function init(opts){
    opts = opts || {};
    var root = null;
    if(opts.root){
      root = (typeof opts.root === 'string') ? document.querySelector(opts.root) : opts.root;
    } else {
      root = document.getElementById('character-root');
    }
    if(!root) throw new Error('CharacterCard: root not found');

    var data = opts.data;
    if(!data){
      // Look for inline JSON script
      var script = root.querySelector('#demo-sample-data');
      if(script){
        try{ data = JSON.parse(script.textContent); }catch(e){ console.warn('CharacterCard: invalid sample data'); data = []; }
      }
    }

    // If still no data, check data-source attr (not implemented remote fetching here)
    if(!Array.isArray(data)) data = [];

    // Clear root and render
    root.innerHTML = '';
    data.forEach(function(item){
      var node = buildCard(item);
      root.appendChild(node);
    });

    // Trigger animations after it's inserted into DOM
    requestAnimationFrame(function(){ animateStats(root); });

    return { root: root, count: data.length };
  }

  // Auto-init when data-init attribute is present
  function tryAutoInit(){
    var root = document.getElementById('character-root');
    if(!root) return;
    var v = root.getAttribute('data-init');
    if(v === 'true' || v === '1'){
      try{
        init({ root: root });
      }catch(e){ console.error(e); }
    }
  }

  // Export public API
  global.CharacterCard = {
    init: init
  };

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', tryAutoInit);
  } else {
    tryAutoInit();
  }

})(window);
