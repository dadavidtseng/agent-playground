Character Card Component

Files created:
- src/index.html: standalone example of the card component using semantic HTML and ARIA attributes.
- src/styles.css: styles using CSS custom properties (colors, spacing, typography). Includes prefers-reduced-motion support.
- src/app.js: JavaScript that reads data-value on stat bars and animates widths on mount/hover. Updates aria-valuenow for accessibility.
- demo/index.html: demo page that inlines an avatar SVG (artist asset path referenced as assets/character/warrior.svg) and loads src assets.

Integration steps:
1. Ensure the repository contains the artist-provided SVG at: assets/character/warrior.svg. The demo references this path in comments and expects the asset to be present for the canonical visual. For now the demo includes a lightweight inline fallback svg so it renders even if the asset is missing.

2. Open demo/index.html from the repository root in a browser (file:///.../agent-playground-programmer/demo/index.html) to view the card demo.

3. To change token values (colors/spacing/typography), edit the CSS custom properties at the top of src/styles.css.

Accessibility notes:
- Stat bars are role="progressbar" with aria-valuemin, aria-valuemax and aria-valuenow updated by JavaScript.
- Animations are disabled when the user sets prefers-reduced-motion to reduce motion.

No build step required; files are static and can be served directly.
