// Demo script for CharacterProfileCard interactions and stat animations

document.addEventListener('DOMContentLoaded', () => {
  const sampleData = {
    name: "Thora Ironhand",
    class: "Warrior",
    level: 7,
    stats: { Strength: 78, Agility: 62, Intellect: 45 },
    equipment: ["Iron Axe","Chainmail","Heater Shield"],
    location: "Frostford",
    backstory: "Once a blacksmith's daughter, Thora rose through battlefields to protect her clan."
  };

  // Populate sample data JSON area
  const pre = document.getElementById('sample-data');
  pre.textContent = JSON.stringify(sampleData, null, 2);

  // Initialize stat bars on cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    animateStats(card);

    // Expand/collapse buttons
    const expandBtn = card.querySelector('.expand-btn');
    if (expandBtn) {
      const targetId = expandBtn.getAttribute('aria-controls');
      const details = targetId ? document.getElementById(targetId) : card.querySelector('.card-details');

      // If card has class expanded, ensure details visible and aria-expanded true
      if (card.classList.contains('expanded')) {
        if (details) details.hidden = false;
        expandBtn.setAttribute('aria-expanded', 'true');
      }

      expandBtn.addEventListener('click', () => {
        const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
        expandBtn.setAttribute('aria-expanded', String(!isExpanded));
        if (details) details.hidden = isExpanded;
        card.classList.toggle('expanded', !isExpanded);
        // re-run stat animation when expanding
        if (!isExpanded) animateStats(card, {reset:false});
      });

      // keyboard: Enter/Space to toggle
      expandBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          expandBtn.click();
        }
      });
    }

    // Action buttons keyboard accessibility: ensure they are focusable and active on Enter/Space
    const actions = card.querySelectorAll('.btn');
    actions.forEach(btn => {
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  });

  // Function to animate stat bars within a card
  function animateStats(card, opts={reset:true}){
    const statEls = card.querySelectorAll('.stat');
    statEls.forEach(el => {
      const value = Number(el.dataset.value) || 0;
      const max = Number(el.dataset.max) || 100;
      const pct = Math.round((value / max) * 100);
      const fill = el.querySelector('.stat-fill');
      const progressbar = el.querySelector('.stat-bar');

      if (opts.reset) {
        // start from 0 for animation
        fill.style.width = '0%';
        progressbar.setAttribute('aria-valuenow', '0');
        // small delay to allow transition
        setTimeout(() => {
          fill.style.width = pct + '%';
          progressbar.setAttribute('aria-valuenow', String(value));
        }, 60);
      } else {
        fill.style.width = pct + '%';
        progressbar.setAttribute('aria-valuenow', String(value));
      }
    });
  }

});
