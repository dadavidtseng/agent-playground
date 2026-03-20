// Minimal vanilla JS component for profile card
(function(global){
  const instances = new WeakMap();

  function createMarkup(options){
    const name = options.name || '';
    const title = options.title || '';
    const stats = options.stats || {};
    const bio = options.bio || '';

    const container = document.createElement('div');
    container.className = 'profile-card';
    container.innerHTML = `
      <div class="profile-header">
        <div class="avatar" aria-hidden="true"></div>
        <div class="meta">
          <div class="name">${escapeHtml(name)}</div>
          <div class="title">${escapeHtml(title)}</div>
        </div>
      </div>
      <div class="stats">
        ${Object.keys(stats).map(k => `<div class="stat" data-stat="${escapeHtml(k)}"><div class="stat-value">${escapeHtml(String(stats[k]))}</div><div class="stat-key">${escapeHtml(k)}</div></div>`).join('')}
      </div>
      <div class="bio" hidden>${escapeHtml(bio)}</div>
    `;
    return container;
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, function(c){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }

  function init(root, options){
    if(!root || !root.appendChild) throw new Error('container element required');
    const opts = Object.assign({}, options || {});
    const markup = createMarkup(opts);
    // clear root
    root.innerHTML = '';
    root.appendChild(markup);

    const instance = {
      root: root,
      container: markup,
      options: opts,
      setStat(statName, value){
        const el = markup.querySelector(`.stat[data-stat="${statName}"] .stat-value`);
        if(!el) return false;
        if(typeof value !== 'number'){
          const n = Number(value);
          if(Number.isNaN(n)) return false;
          value = n;
        }
        el.textContent = String(value);
        return true;
      },
      toggleBio(show){
        const bio = markup.querySelector('.bio');
        if(!bio) return false;
        const isHidden = bio.hasAttribute('hidden');
        const target = (typeof show === 'boolean') ? !show : isHidden;
        if(target) bio.removeAttribute('hidden'); else bio.setAttribute('hidden','');
        return !bio.hasAttribute('hidden');
      }
    };

    instances.set(root, instance);
    return instance;
  }

  // Global API that proxies to the first instance when not using createInstance
  let primaryInstance = null;

  global.MyProfileCard = {
    init(container, options){
      primaryInstance = init(container, options);
    },
    setStat(statName, value){
      if(!primaryInstance) return false;
      return primaryInstance.setStat(statName, value);
    },
    toggleBio(show){
      if(!primaryInstance) return false;
      return primaryInstance.toggleBio(show);
    },
    createInstance(container, options){
      return init(container, options);
    }
  };

})(window);
