Character Card Component - Testing Guidance

This file contains suggested unit and visual/manual tests to verify the Character Profile Card component.

Files under test:
- src/styles/character-card.css
- src/js/characterCardAPI.js
- demo/index.html

Goals:
- Ensure cards render with inline SVGs
- Stat bars animate on load and update via setStats
- Accessibility attributes (progressbar aria) present and updated
- Responsive layout across breakpoints
- Keyboard interactions work for stat bars and controls

Manual/Visual Tests

1) Demo render
- Open demo/index.html in a browser (live server or file://). You should see three character cards in a responsive grid. Avatars should display initials rendered from inline SVGs.
- On first load the stat bars should animate from 0% to their configured values.

2) Interactive controls
- Use the sliders above and click "Apply to first card". The first card's stat bars and numeric labels should update and the aria-valuenow attributes should reflect new values.
- Use left/right arrow keys when a stat bar is focused to decrement/increment the stat by 1.

3) Accessibility checks
- Inspect a stat bar element: it should have role="progressbar" and attributes aria-valuemin="0", aria-valuemax="100", and aria-valuenow matching the displayed percent.
- The card should have role="region" and a descriptive aria-label.

4) Responsive layout
- Resize the browser to narrow widths (<640px) and wide widths (>900px). The layout should stack on narrow screens and become horizontal on wide screens.

Automated/Unit tests (suggested)

- Unit: createCard returns an HTMLElement
  - Call CharacterCardAPI.createCard with sample data and assert the return value is an HTMLElement and contains .character-card class.

- Unit: setStats updates DOM
  - Create card with stats, call setStats(card, {str:10}), assert that the corresponding .stat-bar has aria-valuenow="10" and the .stat-bar__fill has style.width === '10%'.

- Integration: animation class applied
  - After createCard, ensure card contains class animate-stats (or that .stat-bar__fill has transitioned width set via style).

- Accessibility: ARIA attributes
  - Verify presence and correctness of role and aria attributes.

Notes

- These tests can be executed with any JS test runner (Jest, Mocha) by spinning a DOM environment (jsdom) and importing the script. For visual testing use storybook or Playwright/Puppeteer to assert render and transitions.

- The demo uses only vanilla JS/CSS and includes keyboard handlers for stat bars to support accessible increment/decrement.
