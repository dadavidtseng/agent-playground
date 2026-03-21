// Vanilla JS for Card demo: animate stat bars, bio toggle with keyboard support, randomize stats

document.addEventListener('DOMContentLoaded', () => {
  const statBars = Array.from(document.querySelectorAll('.stat-bar'));
  const toggleBtn = document.getElementById('toggle-bio');
  const bio = document.getElementById('bio');
  const randomizeBtn = document.getElementById('randomize');

  // animate bars on load
  function animateBars() {
    statBars.forEach((bar, idx) => {
      const fill = bar.querySelector('.stat-fill');
      const value = Number(bar.dataset.value) || 0;
      // staggered animation
      setTimeout(() => {
        fill.style.width = value + '%';
        bar.setAttribute('aria-valuenow', String(value));
        const valueText = bar.parentElement.querySelector('.stat-value');
        if(valueText) valueText.textContent = String(value);
      }, 120 * idx);
    });
  }

  animateBars();

  // Randomize stats (demo of updating bars and re-animating)
  function randomize() {
    statBars.forEach((bar, idx) => {
      const newVal = Math.floor(Math.random() * 80) + 10; // 10..89
      bar.dataset.value = String(newVal);
      bar.setAttribute('aria-valuenow', String(newVal));
      const fill = bar.querySelector('.stat-fill');
      const valueText = bar.parentElement.querySelector('.stat-value');
      // animate from 0 to newVal
      fill.style.width = '0%';
      if(valueText) valueText.textContent = '...';
      setTimeout(() => {
        fill.style.width = newVal + '%';
        if(valueText) valueText.textContent = String(newVal);
      }, 50 + idx * 80);
    });
  }

  randomizeBtn.addEventListener('click', randomize);

  // Accessible toggle for bio: supports click, Enter, Space
  function setToggleState(open) {
    toggleBtn.setAttribute('aria-expanded', String(open));
    if(open){
      bio.hidden = false;
      toggleBtn.textContent = 'Hide bio';
      // focus the bio for screen readers
      bio.setAttribute('tabindex','-1');
      bio.focus();
    } else {
      bio.hidden = true;
      toggleBtn.textContent = 'Show bio';
      bio.removeAttribute('tabindex');
    }
  }

  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    setToggleState(!expanded);
  });

  toggleBtn.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      toggleBtn.click();
    }
  });

  // Ensure stat bars are announced when updated
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      if(m.attributeName === 'data-value'){
        const bar = m.target;
        const val = bar.dataset.value;
        bar.setAttribute('aria-valuenow', val);
      }
    });
  });

  statBars.forEach(bar => observer.observe(bar, {attributes:true}));

  // Keyboard: allow focus on stat bars and press R to randomize when focused
  statBars.forEach(bar => {
    bar.tabIndex = 0;
    bar.addEventListener('keydown', (e) => {
      if(e.key.toLowerCase() === 'r'){
        randomize();
      }
    });
  });
});
