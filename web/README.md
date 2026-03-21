CharacterCard Component — Web Demo

Overview

This folder contains a lightweight, accessible CharacterCard component demo using vanilla HTML, CSS, and JS.

Files
- index.html — sample page with three card variants: compact, default, expanded.
- styles.css — CSS with design tokens (CSS variables), responsive breakpoints, variants, and stat bar styles.
- script.js — Minimal JS to load inline SVG avatars, manage expand/collapse interactions, animate stat bars on reveal, and keyboard accessibility behaviors.
- assets/ — place SVG assets here (avatar-hero.svg, avatar-rogue.svg, avatar-mage.svg). If assets are missing, the component uses the inline fallback SVG present in each avatar container.

Usage
1. Serve this folder as static files (e.g., open web/index.html in a browser or serve via simple HTTP server).
2. Ensure SVGs are available at web/assets/*.svg or rely on the fallback inline SVGs.
3. Interact with cards: click "Details" to expand/collapse, or focus a card and press Enter/Space to toggle.

Accessibility & ARIA
- Cards use semantic <article> with role="group" and have aria-labelledby linking to the name.
- Expand buttons use aria-expanded and aria-controls.
- Stat bars use role="progressbar" with aria-valuemin, aria-valuemax, and aria-valuenow updated during animation.
- Keyboard: cards are focusable and support Enter/Space to toggle; Escape collapses details.
- Focus-visible class provided; native :focus-visible is also respected.

Animation & prefers-reduced-motion
- Stat bars animate from 0->value over ~800ms via CSS transition when the stat bar enters the viewport (IntersectionObserver).
- If the user prefers reduced motion (prefers-reduced-motion), animations are disabled and bars render to their final value immediately.

Responsiveness & Variants
- Variants implemented: compact (small avatar, condensed layout), default, expanded (starts opened).
- Breakpoints: mobile (<600px), tablet (601–900px), desktop (>900px). The layout adapts: single column on mobile, grid on larger screens.

Integration notes
- The JS attempts to fetch and inline SVGs from data-src on .avatar elements. This allows CSS styling of SVG internals. If the fetch fails or assets are not yet provided by the Artist, the inline fallback SVG remains and serves as a placeholder.
- To export/import the component: copy the CSS variables and the .card structure. Ensure script.js is included to maintain interactivity and animation.

Testing checklist
- [ ] Compact/default/expanded variants show as expected across breakpoints.
- [ ] Stat bars animate on reveal (or appear immediately with reduced-motion enabled).
- [ ] Keyboard navigation: Tab to card, press Enter/Space to toggle, Escape to collapse.
- [ ] ARIA attributes present: aria-expanded, aria-controls, role=progressbar with correct values.
- [ ] If SVGs missing, confirm inline fallback is visible.

Size note
- CSS and JS are intentionally lightweight and contain no frameworks. Combined size (unminified) is small; minify for production if needed. Keep under 30KB combined when minified (SVGs excluded).

Fallback behavior when Artist assets delayed
- The component renders a neutral inline SVG placeholder. When assets arrive, place them under web/assets/ and the script will inline them (fetch on load). This ensures no visual breakage while waiting for final artwork.
