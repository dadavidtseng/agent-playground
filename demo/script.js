/* Demo script for character cards
   - Provides CharacterCard.init API
   - Auto-initializes when data-init attribute is present on #character-root
   - Progressive enhancement: if JS disabled, nothing breaks
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

  // Inline placeholder SVG generator (simple avatar shapes)
  function placeholderSVG(title){
    var svg = '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(title||'avatar')+'">'
      + '<rect width="120" height="120" rx="16" fill="rgba(255,255,255,0.04)" />'
      + '<g transform="translate(20,20)" fill="none" stroke="white" stroke-opacity="0.7" stroke-width="6">'
      + '<circle cx="40" cy="28" r="20" stroke-linecap="round" />'
      + '<path d="M6 98c6-18 28-26 34-26s28 8 34 26" stroke-linecap="round" />'
      + '</g>'
      + '</svg>';
    return svg;
  }

  // Build a single card DOM from data
  function buildCard(data){
    var card = el('article','character-card');

    var avatar = el('div','avatar');
    avatar.innerHTML = placeholderSVG(data.avatarTitle || data.name);
    card.appendChild(avatar);

    var body = el('div','card-body');

    var header = el('div','card-header');
    var titleWrap = el('div');
    var title = el('div','card-title'); title.textContent = data.name || 'Unnamed';
    var sub = el('div','card-sub'); sub.textContent = (data.class || 'Adventurer') + ' — Lv ' + (data.level || 1);
    titleWrap.appendChild(title); titleWrap.appendChild(sub);

    header.appendChild(titleWrap);

    var right = el('div','');
    var badge = el('div','card-badge'); badge.textContent = '';
    right.appendChild(badge);
    header.appendChild(right);

    body.appendChild(header);

    var bio = el('div','card-bio'); bio.textContent = data.bio || '';
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
    var btn2 = el('button','btn'); btn2.textContent = 'Challenge';
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
  // This uses a soft max to avoid tiny/huge numbers. Adjust as needed.
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
    // Use requestAnimationFrame for better timing
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

  // DOMContentLoaded or defer script will handle it; also attempt immediate auto-init
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', tryAutoInit);
  } else {
    tryAutoInit();
  }

})(window);
