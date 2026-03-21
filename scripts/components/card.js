const MAX_STAT = 100;

function createStatElement(label, value, type){
  const stat = document.createElement('div');
  stat.className = 'stat';
  stat.setAttribute('data-type', type);

  const lbl = document.createElement('div');
  lbl.className = 'stat-label';
  lbl.textContent = label;

  const track = document.createElement('div');
  track.className = 'stat-track';
  track.setAttribute('role', 'progressbar');
  track.setAttribute('aria-valuemin', '0');
  track.setAttribute('aria-valuemax', String(MAX_STAT));
  track.setAttribute('aria-valuenow', String(value));

  const fill = document.createElement('div');
  fill.className = 'stat-fill';
  fill.style.width = '0%';
  fill.setAttribute('data-value', String(value));

  const val = document.createElement('div');
  val.className = 'stat-value';
  val.textContent = String(value);

  track.appendChild(fill);
  stat.appendChild(lbl);
  stat.appendChild(track);
  stat.appendChild(val);

  // Hover animation: increase slightly via transform
  track.addEventListener('mouseenter', ()=>{
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(prefersReduced) return;
    fill.style.transition = 'width 220ms ease, transform 220ms ease, filter 220ms';
    fill.style.transform = 'scaleY(1.05)';
  });
  track.addEventListener('mouseleave', ()=>{
    fill.style.transform = 'scaleY(1)';
    fill.style.transition = '';
  });

  return stat;
}

function setStatFill(statEl){
  const fill = statEl.querySelector('.stat-fill');
  const value = Number(fill.getAttribute('data-value')) || 0;
  const percent = Math.max(0, Math.min(100, Math.round((value / MAX_STAT) * 100)));
  // animate width
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(prefersReduced){
    fill.style.width = percent + '%';
  } else {
    // small timeout to stagger animations
    setTimeout(()=>{
      fill.style.width = percent + '%';
    }, 60);
  }
}

export const Card = {
  init(container, data, tokens){
    if(!container) return;
    // create card
    const card = document.createElement('article');
    card.className = 'char-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');

    // top
    const top = document.createElement('div');
    top.className = 'char-top';

    const avatarWrap = document.createElement('div');
    avatarWrap.className = 'avatar';
    // Insert avatar SVG (already a string)
    avatarWrap.innerHTML = data.avatar || '';
    avatarWrap.setAttribute('aria-hidden','true');

    const meta = document.createElement('div');
    meta.className = 'meta';

    const name = document.createElement('h3');
    name.className = 'name';
    name.textContent = data.name || 'Unnamed';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = data.title || '';

    meta.appendChild(name);
    meta.appendChild(title);

    top.appendChild(avatarWrap);
    top.appendChild(meta);

    // stats
    const stats = document.createElement('div');
    stats.className = 'stats';

    const hp = createStatElement('HP', data.stats?.hp ?? 0, 'hp');
    const atk = createStatElement('Attack', data.stats?.atk ?? 0, 'atk');
    const def = createStatElement('Defense', data.stats?.def ?? 0, 'def');
    const spd = createStatElement('Speed', data.stats?.spd ?? 0, 'spd');

    stats.appendChild(hp);
    stats.appendChild(atk);
    stats.appendChild(def);
    stats.appendChild(spd);

    // bio
    const bio = document.createElement('div');
    bio.className = 'bio';

    const toggle = document.createElement('button');
    toggle.className = 'bio-toggle';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'bio-content');

    const tlabel = document.createElement('div');
    tlabel.textContent = 'Bio';

    const ticon = document.createElement('div');
    ticon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    toggle.appendChild(tlabel);
    toggle.appendChild(ticon);

    const bioContent = document.createElement('div');
    bioContent.className = 'bio-content';
    bioContent.id = 'bio-content';
    const p = document.createElement('p');
    p.textContent = data.bio || '';
    bioContent.appendChild(p);

    // toggle behaviors
    function setExpanded(exp){
      card.setAttribute('aria-expanded', String(exp));
      toggle.setAttribute('aria-expanded', String(exp));
      if(exp){
        bioContent.style.maxHeight = bioContent.scrollHeight + 'px';
      } else {
        bioContent.style.maxHeight = '0px';
      }
    }

    toggle.addEventListener('click', ()=>{
      const cur = toggle.getAttribute('aria-expanded') === 'true';
      setExpanded(!cur);
    });

    // keyboard support: Enter/Space on the button will activate by default; ensure card is focusable and pressing Enter toggles too
    card.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){
        // don't handle if focus is inside input or button
        const active = document.activeElement;
        if(active && (active.tagName === 'BUTTON' || active.tagName === 'A')) return;
        e.preventDefault();
        const cur = toggle.getAttribute('aria-expanded') === 'true';
        toggle.click();
      }
    });

    bio.appendChild(toggle);
    bio.appendChild(bioContent);

    card.appendChild(top);
    card.appendChild(stats);
    card.appendChild(bio);

    container.appendChild(card);

    // set stat fills on next frame for animation
    requestAnimationFrame(()=>{
      [hp,atk,def,spd].forEach(setStatFill);
    });

  }
};
