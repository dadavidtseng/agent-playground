// Module for character card interactions
const statTimeout = 600; // ms - should match CSS transition duration

function queryStatElement(statName){
  return document.querySelector(`.char-card .stat[data-stat="${statName}"]`);
}

function setStat(statName, value){
  const stat = queryStatElement(statName);
  if(!stat) return false;
  const bar = stat.querySelector('.stat-bar');
  const fill = stat.querySelector('.stat-fill');
  const valueEl = stat.querySelector('.stat-value');
  const clamped = Math.max(0, Math.min(100, Number(value)||0));

  // Update accessible attributes
  bar.setAttribute('aria-valuenow', String(clamped));
  // Update visible text
  valueEl.textContent = String(clamped);
  // Trigger layout and update width for animation
  requestAnimationFrame(()=>{
    fill.style.width = clamped + '%';
  });
  return true;
}

function toggleBio(){
  const btn = document.querySelector('.char-card .bio-toggle');
  const content = document.getElementById(btn.getAttribute('aria-controls'));
  if(!btn || !content) return false;
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  const willExpand = !expanded;
  btn.setAttribute('aria-expanded', String(willExpand));
  // Manage visibility for progressive enhancement
  if(willExpand){
    content.hidden = false;
    // focus the content for screen readers
    content.setAttribute('tabindex', '-1');
    content.focus();
  } else {
    content.hidden = true;
    content.removeAttribute('tabindex');
  }
  return willExpand;
}

function onBioKey(e){
  // support Enter/Space
  if(e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
    e.preventDefault();
    toggleBio();
  }
}

function init(){
  const card = document.querySelector('.char-card');
  if(!card) return;

  // Wire up bio toggle
  const btn = card.querySelector('.bio-toggle');
  const content = document.getElementById(btn.getAttribute('aria-controls'));
  if(btn && content){
    // Ensure ARIA state matches initial DOM
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    if(!expanded){
      content.hidden = true;
    } else {
      content.hidden = false;
    }

    btn.addEventListener('click', toggleBio);
    btn.addEventListener('keydown', onBioKey);
  }

  // Expose API on the element for integration without module import
  card.setStat = setStat;
  card.toggleBio = toggleBio;

  // Initialize stat fills from aria-valuenow
  const bars = card.querySelectorAll('.stat-bar');
  bars.forEach(bar => {
    const value = bar.getAttribute('aria-valuenow') || '0';
    const fill = bar.querySelector('.stat-fill');
    // set initial width without transition if CSS not yet loaded
    fill.style.width = value + '%';
  });
}

// Auto-init when DOM is ready
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

export { setStat, toggleBio };

// For non-module consumers, attach to window
window.CharCard = window.CharCard || {};
window.CharCard.setStat = setStat;
window.CharCard.toggleBio = toggleBio;
