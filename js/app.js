// Lightweight stat bar initialization and update functions

function animateStatBars(root = document){
  // Find all stat-bar elements that have a data-value attribute
  const bars = root.querySelectorAll('.stat-bar[data-value]');
  bars.forEach(bar => {
    const fill = bar.querySelector('.stat-bar-fill');
    const label = bar.querySelector('.stat-value');
    const target = Math.max(0, Math.min(100, Number(bar.getAttribute('data-value') || 0)));
    // Set initial visual state (0)
    requestAnimationFrame(() => {
      // Defer to next frame so CSS transitions animate
      fill.style.width = target + '%';
      // Update textual percent after a small delay to match transition
      // Use setTimeout tuned to CSS transition duration (700ms)
      setTimeout(() => {
        if(label) label.textContent = target + '%';
        bar.setAttribute('aria-valuenow', String(target));
      }, 200);
    });
  });
}

function updateStats(newStats = {}){
  // newStats is an object mapping stat labels (case-insensitive) to values 0-100
  const bars = document.querySelectorAll('.stat-bar[data-value]');
  bars.forEach(bar => {
    const label = bar.getAttribute('aria-label') || '';
    const key = label.toLowerCase();
    if(newStats.hasOwnProperty(key)){
      const value = Math.max(0, Math.min(100, Number(newStats[key]||0)));
      const fill = bar.querySelector('.stat-bar-fill');
      const text = bar.querySelector('.stat-value');
      // Update data-value attribute for persistence
      bar.setAttribute('data-value', String(value));
      // Apply width (CSS handles smooth transition)
      // Use requestAnimationFrame to avoid layout thrash
      requestAnimationFrame(() => {
        fill.style.width = value + '%';
        // Update aria-valuenow immediately for assistive tech
        bar.setAttribute('aria-valuenow', String(value));
      });
      // Update visible percentage after transition completes
      setTimeout(() => {
        if(text) text.textContent = value + '%';
      }, 260);
    }
  });
}

// Hook up demo interactions
document.addEventListener('DOMContentLoaded', () => {
  animateStatBars(document);

  const randomBtn = document.getElementById('randomize');
  const resetBtn = document.getElementById('reset');
  const likeBtn = document.getElementById('likeBtn');

  randomBtn.addEventListener('click', () => {
    const newVals = {};
    document.querySelectorAll('.stat-bar').forEach(bar => {
      const label = (bar.getAttribute('aria-label')||'').toLowerCase();
      newVals[label] = Math.floor(Math.random()*101);
    });
    updateStats(newVals);
  });

  resetBtn.addEventListener('click', () => {
    // Reset to initial data-values stored in markup
    const reset = {};
    document.querySelectorAll('.stat-bar').forEach(bar => {
      const label = (bar.getAttribute('aria-label')||'').toLowerCase();
      reset[label] = Number(bar.getAttribute('data-value') || 0);
    });
    updateStats(reset);
  });

  likeBtn.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    btn.setAttribute('aria-pressed', String(!pressed));
    // simple visual toggle
    btn.classList.toggle('primary');
    // ensure keyboard focus remains visible
    btn.focus();
  });

  // Ensure keyboard accessibility: allow Enter/Space to trigger buttons (native behavior)
});

// Expose API for external use
window.CardStats = {
  animate: animateStatBars,
  update: updateStats
};
