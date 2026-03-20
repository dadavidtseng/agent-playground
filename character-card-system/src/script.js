/**
 * Character Card Component - JavaScript
 * Handles stat bar animations using IntersectionObserver API
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    animationDuration: 1500, // 1.5s in milliseconds
    staggerDelay: 200, // 0.2s delay between each stat bar
    observerThreshold: 0.5, // Trigger when 50% of card is visible
    observerRootMargin: '0px'
  };

  /**
   * Initialize the character card component
   */
  function init() {
    const cards = document.querySelectorAll('.character-card');
    
    if (!cards.length) {
      console.warn('No character cards found on the page');
      return;
    }

    // Check for IntersectionObserver support
    if ('IntersectionObserver' in window) {
      setupIntersectionObserver(cards);
    } else {
      // Fallback: Animate immediately if IntersectionObserver is not supported
      console.warn('IntersectionObserver not supported. Animating stats immediately.');
      cards.forEach(card => animateStatBars(card, false));
    }

    // Setup keyboard interaction handlers
    setupKeyboardHandlers(cards);
  }

  /**
   * Setup IntersectionObserver for scroll-triggered animations
   * @param {NodeList} cards - Collection of character card elements
   */
  function setupIntersectionObserver(cards) {
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: CONFIG.observerRootMargin,
      threshold: CONFIG.observerThreshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          // Mark as animated to prevent re-triggering
          entry.target.dataset.animated = 'true';
          animateStatBars(entry.target, true);
          
          // Optional: Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all character cards
    cards.forEach(card => observer.observe(card));
  }

  /**
   * Animate stat bars with staggered timing
   * @param {HTMLElement} card - Character card element
   * @param {boolean} useStagger - Whether to use staggered animation delays
   */
  function animateStatBars(card, useStagger = true) {
    const statBars = card.querySelectorAll('.stat-bar');
    
    statBars.forEach((statBar, index) => {
      const delay = useStagger ? index * CONFIG.staggerDelay : 0;
      
      setTimeout(() => {
        animateSingleStatBar(statBar);
      }, delay);
    });
  }

  /**
   * Animate a single stat bar
   * @param {HTMLElement} statBar - Stat bar element
   */
  function animateSingleStatBar(statBar) {
    const value = parseInt(statBar.dataset.value, 10);
    const statType = statBar.dataset.stat;
    
    if (isNaN(value) || value < 0 || value > 100) {
      console.error(`Invalid stat value for ${statType}:`, value);
      return;
    }

    // Get elements
    const fill = statBar.querySelector('.stat-bar__fill');
    const currentValueSpan = statBar.querySelector('.stat-bar__current');
    const progressBar = statBar.querySelector('.stat-bar__track');

    if (!fill || !currentValueSpan || !progressBar) {
      console.error('Missing stat bar elements');
      return;
    }

    // Add animated class
    statBar.classList.add('is-animated');

    // Animate the fill width using GPU-accelerated transform
    // We use width for the actual animation as it's more semantic for progress bars
    fill.style.width = `${value}%`;

    // Update ARIA attributes
    progressBar.setAttribute('aria-valuenow', value);

    // Animate the number counter
    animateCounter(currentValueSpan, 0, value, CONFIG.animationDuration);
  }

  /**
   * Animate a counter from start to end value
   * @param {HTMLElement} element - Element to update
   * @param {number} start - Starting value
   * @param {number} end - Ending value
   * @param {number} duration - Animation duration in milliseconds
   */
  function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easing function matching CSS cubic-bezier(0.65, 0, 0.35, 1)
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.round(start + (range * easedProgress));
      
      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = end; // Ensure final value is exact
      }
    }

    requestAnimationFrame(updateCounter);
  }

  /**
   * Easing function: ease-out-cubic
   * Approximates cubic-bezier(0.65, 0, 0.35, 1)
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} - Eased value
   */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /**
   * Setup keyboard interaction handlers
   * @param {NodeList} cards - Collection of character card elements
   */
  function setupKeyboardHandlers(cards) {
    cards.forEach(card => {
      card.addEventListener('keydown', (e) => {
        // Handle Enter and Space keys for activation
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardActivation(card);
        }
      });

      // Handle click events
      card.addEventListener('click', () => {
        handleCardActivation(card);
      });
    });
  }

  /**
   * Handle card activation (click or keyboard)
   * @param {HTMLElement} card - Character card element
   */
  function handleCardActivation(card) {
    // Check if card is disabled
    if (card.hasAttribute('disabled') || card.classList.contains('is-disabled')) {
      return;
    }

    // Add visual feedback
    card.classList.add('is-active');
    
    setTimeout(() => {
      card.classList.remove('is-active');
    }, 200);

    // Emit custom event for external listeners
    const event = new CustomEvent('charactercard:activated', {
      detail: {
        name: card.querySelector('.character-card__name')?.textContent,
        stats: getCardStats(card)
      },
      bubbles: true
    });
    card.dispatchEvent(event);
  }

  /**
   * Get stats from a character card
   * @param {HTMLElement} card - Character card element
   * @returns {Object} - Stats object
   */
  function getCardStats(card) {
    const statBars = card.querySelectorAll('.stat-bar');
    const stats = {};

    statBars.forEach(statBar => {
      const statType = statBar.dataset.stat;
      const value = parseInt(statBar.dataset.value, 10);
      stats[statType] = value;
    });

    return stats;
  }

  /**
   * Public API for manual animation triggering
   */
  window.CharacterCard = {
    /**
     * Manually trigger animation for a specific card
     * @param {HTMLElement|string} cardOrSelector - Card element or CSS selector
     */
    animate: function(cardOrSelector) {
      const card = typeof cardOrSelector === 'string' 
        ? document.querySelector(cardOrSelector)
        : cardOrSelector;

      if (card && card.classList.contains('character-card')) {
        card.dataset.animated = 'true';
        animateStatBars(card, true);
      } else {
        console.error('Invalid card element or selector');
      }
    },

    /**
     * Reset animation for a specific card
     * @param {HTMLElement|string} cardOrSelector - Card element or CSS selector
     */
    reset: function(cardOrSelector) {
      const card = typeof cardOrSelector === 'string'
        ? document.querySelector(cardOrSelector)
        : cardOrSelector;

      if (card && card.classList.contains('character-card')) {
        delete card.dataset.animated;
        
        const statBars = card.querySelectorAll('.stat-bar');
        statBars.forEach(statBar => {
          statBar.classList.remove('is-animated');
          const fill = statBar.querySelector('.stat-bar__fill');
          const currentValueSpan = statBar.querySelector('.stat-bar__current');
          const progressBar = statBar.querySelector('.stat-bar__track');
          
          if (fill) fill.style.width = '0%';
          if (currentValueSpan) currentValueSpan.textContent = '0';
          if (progressBar) progressBar.setAttribute('aria-valuenow', '0');
        });
      } else {
        console.error('Invalid card element or selector');
      }
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
