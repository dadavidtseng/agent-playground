Character Card Demo

This demo showcases a reusable, framework-agnostic Character Card component implemented with vanilla HTML, CSS, and JS.

Files created:
- index.html: Demo page, includes a <template> used to mount cards and a noscript fallback.
- styles.css: Component and demo styles consuming design tokens from design/tokens.css.
- scripts.js: Exports mountCards(container, data, options) and auto-mounts demo/data/characters.json.
- data/characters.json: Sample data with 3 characters showing various stat values.

Usage:
- Open demo/index.html in a browser.
- The script auto-mounts the cards from ./data/characters.json and animates the stat bars.

API:
- mountCards(containerSelectorOrNode, data, options)
  - containerSelectorOrNode: selector string or DOM node where to mount
  - data: array of character objects or URL string to fetch JSON from
  - options: { animate: boolean } (default animate true)

Accessibility:
- Stat bars use role="progressbar" and aria-valuemin/aria-valuemax/aria-valuenow.
- Visual labels are present and numeric values are visible.
- Prefers-reduced-motion is honored.

Notes:
- No external frameworks used. Component is designed for progressive enhancement: with JS disabled, the <noscript> markup provides a static sample.
