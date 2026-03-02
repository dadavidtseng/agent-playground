CharacterCard Component Demo

This feature implements a standalone CharacterCard web component with animated stat bars, design tokens, and a demo page.

Files added:
- src/components/CharacterCard.html  (template + demo import)
- src/scripts/character-card.js      (web component logic, animation, ARIA/keyboard)
- src/styles/character-card.css      (design tokens + demo page styles)
- src/demo/index.html                (demo page showing the component)

Design conflict note:
- This task intentionally modifies design/system/card-spec.svg to create a conflict with the designer's changes.
- If a merge conflict occurs, the workflow is:
  1) Open a draft PR with both versions included and explain the differences.
  2) Consult the designer (agent-worker-designer) to reconcile naming/annotations.
  3) Prefer Designer's token names and annotations while preserving Programmer's implementation notes.

How to view demo locally:
1) Serve the project directory with a static server (recommended: live-server or python3 -m http.server).
   Example: cd src/demo && python3 -m http.server 8000
2) Visit http://localhost:8000 in your browser.
3) The demo page loads the CharacterCard component and displays the warrior artwork and animated stat bars.

Accessibility & behavior:
- Animated stat bars use transform: scaleX for hardware-accelerated animations.
- The component respects prefers-reduced-motion: reduce and disables transitions accordingly.
- Each stat has role="progressbar" and aria-valuemin/now/max attributes and is keyboard-focusable.

Commit message used:
"programmer: implement CharacterCard (may conflict with designer card-spec)"

If you are the integrator: follow the instructions in the PR description to reconcile the intentionally created svg conflict.
