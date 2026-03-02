// Minimal vanilla JS to initialize stat bar animation and set ARIA attributes.
(function(){
  function animateStats(root) {
    var stats = root.querySelectorAll('.stat');
    stats.forEach(function(stat, i){
      var fill = stat.querySelector('.stat-fill');
      var value = parseInt(stat.getAttribute('data-stat-value') || '0', 10);
      // Set ARIA attributes
      fill.setAttribute('aria-valuenow', '0');
      fill.setAttribute('aria-valuemin', '0');
      fill.setAttribute('aria-valuemax', '100');

      // Delay each stat a bit for staggered animation
      var delay = 120 * i;
      setTimeout(function(){
        // Use CSS transition where possible by setting width
        var width = Math.max(0, Math.min(100, value));
        fill.style.width = width + '%';
        fill.setAttribute('aria-valuenow', String(width));
      }, delay + 50);

      // Fallback: if transitions not supported, animate via JS
      if (!('transition' in document.documentElement.style)) {
        // simple linear JS animation over 600ms
        var start = null;
        var duration = 600;
        function step(ts){
          start = start || ts;
          var progress = Math.min(1, (ts - start) / duration);
          var current = Math.round(progress * value);
          fill.style.width = current + '%';
          fill.setAttribute('aria-valuenow', String(current));
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    });
    // Mark mounted for potential CSS-only behaviors
    root.classList.add('mounted');
  }

  // Auto-initialize when this script loads in the context of the component DOM
  document.addEventListener('DOMContentLoaded', function(){
    var card = document.querySelector('.character-card');
    if (card) animateStats(card);
  });

  // Also expose a manual initializer
  window.CharacterCard = window.CharacterCard || {};
  window.CharacterCard.init = function(root){
    root = root || document.querySelector('.character-card');
    if (!root) return;
    animateStats(root);
  };
})();
