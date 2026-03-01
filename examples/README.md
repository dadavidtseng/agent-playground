Examples README

This folder contains a small static demo used for visual QA and to demonstrate token variations and component variants.

Files
- index.html — static demo page with Buttons, Badges, Cards, and Token swatches.
- styles.css — minimal CSS with tokens (custom properties) and component styles.

How to run
1. Open examples/index.html directly in your browser (file://...) — should work for static HTML/CSS.
2. Recommended: serve with a local static server:
   - Python 3: python -m http.server --directory examples 8000
   - Node: npx http-server examples -c-1 -p 8000

What to test
- Visual layout at breakpoints: 320, 375, 768, 1024, 1440
- Keyboard navigation: tab through buttons, ensure focus styles visible
- Color contrast: check badges, especially the muted badge token

Notes
- This is a static example to aid manual QA. If Storybook is added to the project later, consider porting these examples as stories with controls for tokens and variants.
