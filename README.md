# Stat Card Component

This project demonstrates a framework-free stat card component with animated stat bars, inline SVG assets, variant modes, keyboard accessibility, and accessible ARIA attributes.

Run locally:

1. Serve the folder with a static file server (required because script fetches design/tokens.json). Examples:
   - Python 3: python -m http.server 8000
   - Node (http-server): npx http-server -c-1

2. Open http://localhost:8000 in your browser.

Notes:
- The component reads design/tokens.json to set CSS variables and stat values.
- Stat bars animate on load with an 80ms stagger between each row. If the user prefers reduced motion, animations are disabled.
- Use the variant selector to switch between compact/default/expanded modes. The card also responds to small screens.
- Progress bars are keyboard-focusable (tab) and support ArrowLeft/ArrowRight to nudge values. ARIA attributes (role="progressbar", aria-valuenow/min/max) are present.
- SVGs are inlined in index.html (from /art) so they can be styled and targeted by CSS/JS.

Restrictions:
- No build steps or frameworks used.
- Keep artist-provided SVG structure intact; only ids/classes were added where necessary.

