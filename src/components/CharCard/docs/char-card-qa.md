CharCard Component — QA & Accessibility Checklist

Files:
- char-card.js
- char-card.css
- index.html (demo)
- data/example-data.json

Manual QA Checklist
1. Demo loads locally: open src/components/CharCard/index.html in a browser.
2. Three cards render: compact, default, expanded.
3. Stat bars animate on initial render and after simulated update (1.2s) for 500ms.
4. Bio read-more toggle: focusable via Tab, activated with Enter/Space; toggles aria-expanded and shows/hides extra content.
5. Keyboard navigation: Tab order should reach toggle buttons; buttons show focus rings.
6. Reduced motion: enable OS 'reduce motion' to confirm animations are disabled.
7. Responsive: Resize window to confirm compact visuals.
8. Ensure no external images are loaded for portraits (SVGs are inlined).

Automated notes (axe-core suggestions)
- role=group added on host element; ensure meaningful labeling if used in isolation.
- Stat bars have role=progressbar and aria-valuenow/aria-valuemin/aria-valuemax set.
- Buttons have aria-expanded and aria-controls to reference bio region.

Sample axe run (recommended commands):
- Install: npm i -g axe-cli
- Run: axe --driver=puppeteer file:///absolute/path/to/src/components/CharCard/index.html

Known issues / TODOs
- For screenreader clarity, consider giving the host a more descriptive aria-label or aria-labelledby when used in lists.
- Tests implemented here are manual; integrate automated jest+axe checks in future.

Quick Test Cases
- Toggle bio with keyboard: Tab to button -> press Space -> content expands and aria-expanded="true".
- Update stats via JS: modify el.data.stats[n].value and reassign el.data = el.data -> fill animates to new width.

