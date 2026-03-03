# src — Project scaffold

This directory contains a minimal vanilla HTML/CSS/JS scaffold used by the agent-playground demo.

Files:
- index.html — entry page that imports styles.css and scripts.js (ES module).
- styles.css — project styles; imports design tokens from ../design/tokens.css.
- scripts.js — ES module exposing mountAPI(container, options), mounts a character card using sample-data.json.
- sample-data.json — example character payload used for the demo.
- Placeholder SVG assets are expected under ../art/ (portrait-placeholder.svg provided as a placeholder by the art team).

Usage:
1. Serve the repository over a static file server (recommended) to avoid CORS issues with fetch.
   Example: `npx serve .` or `python -m http.server` from the repository root.
2. Open /src/index.html in a modern browser.
3. The page will import scripts.js as a module and call mountAPI('#app').

Notes:
- No external frameworks used. Keep the scaffold lightweight and modular.
- The scripts use minimal ARIA attributes on stat bars for accessibility.
- Update the README further with project-specific instructions when needed.
