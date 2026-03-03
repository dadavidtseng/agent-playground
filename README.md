Character Profile Card Component — Demo

Files created:
- src/index.html — demo page with 3 sample character cards
- src/styles/styles.css — component and demo styles with design tokens
- src/scripts/script.js — initialization, stat animations, expand/collapse, update API
- assets/svg/portrait1.svg, portrait2.svg, portrait3.svg — fallback SVGs

How to verify (smoke test):
1. Open src/index.html in a browser (double-click or serve with a simple static server).
2. Confirm three character cards appear. Resize the window to see responsive behavior (1 column small, 2 columns medium, 3 columns wide).
3. On load, watch stat bars animate from 0 to their values. Click "Animate stats" to replay.
4. Click a "Read more" button to expand the bio. The button is keyboard-focusable; press Enter/Space to toggle. aria-expanded updates accordingly.
5. To programmatically update stats from the console: CharacterCard.updateStats(document.getElementById('char-1'), {strength:40, agility:50, intellect:90});

Notes:
- Uses CSS variables for tokens; respects prefers-reduced-motion.
- Accessibility: role=group, aria-labelledby, aria-live on stats, keyboard handlers on toggles.
