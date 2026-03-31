// Sample data (could be fetched from a server)
const SAMPLE_DATA = {
  id: 'rurik-001',
  name: 'Rurik the Valiant',
  class: 'Warrior',
  level: 7,
  stats: { strength: 86, agility: 62, endurance: 74 }
};

function prefersReducedMotion(){
  try{
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }catch(e){
    return false;
  }
}

function animateStats(root = document){
  if(prefersReducedMotion()) return; // respect user preference

  const card = root.querySelector('.cc-card');
  if(!card) return;

  // Ensure fills start at 0 width, then transition to value
  const fills = card.querySelectorAll('.cc-stat__fill');
  fills.forEach(fill => {
    const value = Number(fill.dataset.value) || 0;
    // Start at 0 (no inline style) to allow animation from 0 to target
    fill.style.width = '0%';
    // Force layout
    void fill.offsetWidth;
    // Add animate class to parent to enable transition rules
    card.classList.add('cc-card--animate');
    // set final width
    requestAnimationFrame(()=>{
      fill.style.width = `${value}%`;
    });
  });
}

// Toggle compact mode for demo (updates aria-pressed)
function initToggle(){
  const btn = document.getElementById('toggle-compact');
  if(!btn) return;
  const card = document.querySelector('.cc-card');
  btn.addEventListener('click', ()=>{
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', String(!pressed));
    card.classList.toggle('cc-card--compact');
  });
}

// On DOM ready animate
document.addEventListener('DOMContentLoaded', ()=>{
  animateStats(document);
  initToggle();
});

// Expose for debugging/demo
window._cc = { animateStats, SAMPLE_DATA };
