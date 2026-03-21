// Basic interactive behavior for demo
window.addEventListener('DOMContentLoaded', ()=>{
  // Animate stat fills based on data-target
  document.querySelectorAll('.stat-fill').forEach(el=>{
    const target = parseInt(el.getAttribute('data-target')) || 0;
    // set width using percent to keep crispness; will animate via CSS transition
    requestAnimationFrame(()=>{
      el.style.width = target + '%';
    });
  });

  // Bio toggle
  const btn = document.getElementById('bio-toggle');
  const bio = document.getElementById('bio-text');
  if (btn && bio){
    btn.addEventListener('click', ()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (bio.hasAttribute('hidden')) bio.removeAttribute('hidden'); else bio.setAttribute('hidden','');
      btn.textContent = expanded ? 'Show bio' : 'Hide bio';
    });
  }
});
