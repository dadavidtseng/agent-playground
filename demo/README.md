Game Character Profile Card — Demo

This small vanilla HTML/CSS/JS demo shows a self-contained profile card component using design tokens and inline SVG.

Files
- index.html — demo page (single-file demo with template)
- styles.css — component styles (consumes design/tokens.css variables)
- card.js — ES module exposing createProfileCard(container, data)
- design/tokens.css — design tokens (CSS variables)

Usage
1. Open demo/index.html in a browser (served from local file or simple static server).
2. The page auto-initializes two example cards.

API
import { createProfileCard } from './card.js';

createProfileCard(container, data) -> { updateStats, destroy }
- container: DOM element to append the card to
- data: { name, role, level, bio, stats }
  - stats: [{key, value, max, color}, ...]

Returned object
- updateStats(newStats): newStats = [{key, value}, ...] — updates values and replays stat animations
- destroy(): removes card from DOM and cleans up listeners

Accessibility & Notes
- Bio toggle is keyboard accessible (Enter/Space) and uses aria-expanded + aria-controls
- Stat bars are rendered as progress regions (role=progressbar) with aria-valuenow
- Animations respect prefers-reduced-motion

Verification
- On load the stat bars animate to their values (unless prefers-reduced-motion)
- Clicking "Show bio" toggles bio content and updates aria-expanded
- Calling updateStats updates values and replays the bar animation

Integration
- Include design/tokens.css and demo/styles.css in your page to inherit tokens
- Use the template in index.html as a reference for markup if you want to inline the component

License: MIT
