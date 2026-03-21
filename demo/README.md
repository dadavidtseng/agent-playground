Integration notes

This demo shows character cards which inline an external SVG at runtime, animate stat bars on mount, provide a keyboard-accessible bio toggle, and simple theme/reduced-motion controls.

How it works

- The avatar containers (.char-card__avatar) have a data-svg-src attribute pointing to /art/warrior-avatar.svg. On DOMContentLoaded the script fetches that file and inserts its SVG markup into each avatar container. This ensures an inline SVG is present in the DOM for each card (required for styling/accessibility).

- Stat bars (.char-card__stat-bar) start with width:0 and a data-value attribute. On load the script animates width to the provided percentage over 700ms. If the user or system requests reduced motion (prefers-reduced-motion or the demo "Reduce motion" checkbox), the bars are set to their final widths instantly without transition.

- Bio toggles are simple button elements with aria-expanded and aria-controls attributes. Buttons toggle the associated panel's hidden attribute and update aria-expanded accordingly. Buttons are native <button> elements so they work with keyboard by default.

Usage

1. Open demo/index.html in a browser (served by a static file server or file:// may work for some browsers).
2. Use the Theme toggle to switch between light/dark appearance.
3. Use the Reduce motion checkbox to force reduced motion for testing.

Accessibility notes

- The svg that is fetched has aria-hidden removed so assistive tech will rely on the container's role="img" and aria-label.
- Bio toggles expose aria-expanded and aria-controls and manage the hidden attribute on the target region.
- Stat bars are decorative (aria-hidden) and present visual information only; if these need to be exposed to assistive tech consider adding aria-valuenow and role="progressbar".

Files added/changed

- /art/warrior-avatar.svg — artwork used for inline avatars
- /demo/index.html — demo page
- /demo/style.css — styles
- /demo/script.js — JS
- /demo/README.md — integration notes
