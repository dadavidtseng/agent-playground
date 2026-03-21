Character Profile Card component

This small component renders a character profile card using design tokens and inline SVG avatars.

Files
- index.html — demo page showing the card at three breakpoints (mobile/tablet/desktop).
- styles/tokens.css — design tokens (colors, spacing, typography). The component reads CSS variables only.
- styles/card.css — component styles built using tokens.
- scripts/components/card.js — vanilla JS module exporting Card.init(container, data, tokens).

Usage
1. Include tokens.css and card.css on your page.
2. Include the module script: <script type="module" src="scripts/components/card.js"></script>
3. Call Card.init(containerElement, data, tokens?) where:
   - containerElement: DOM node to render the card into.
   - data: object with shape { name, title, avatar (string SVG), bio, stats: {hp, atk, def, spd} }
   - tokens: optional (not used directly) — the component reads tokens from CSS variables.

Accessibility
- Bio is a collapsible region with aria-expanded toggles and keyboard support. The card itself is focusable and supports Enter/Space to toggle the bio.
- Stat bars use role="progressbar" and aria-valuenow/min/max attributes.
- Prefers-reduced-motion is respected: CSS and JS skip animations when user requests reduced motion.

Notes
- Do not hardcode colors; use the CSS variables in tokens.css if customizing.
- The demo in index.html uses a simple placeholder SVG. Replace with final avatars by passing data.avatar as an inline SVG string.

API
Card.init(container, data, tokens)
- container: Element
- data: Object (see shape above)
- tokens: optional

Example
import { Card } from './scripts/components/card.js';
Card.init(document.getElementById('card'), sampleData);
