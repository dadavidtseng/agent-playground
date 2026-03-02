CharacterCard component

Files added:
- src/components/character-card.html
- src/components/character-card.css
- src/components/character-card.js

Overview

This component provides a responsive, accessible character card with animated stat bars. It relies on design tokens defined in src/styles/design-tokens.css (do not duplicate token variables here).

Integration / Preview

1. Ensure design tokens are loaded in the page (required):
   <link rel="stylesheet" href="/src/styles/design-tokens.css">

2. Include the component styles and script in your HTML page (order matters: design tokens first):
   <link rel="stylesheet" href="/src/components/character-card.css">
   <script type="module" src="/src/components/character-card.js"></script>

3. Add the markup where you want the card to appear or open src/components/character-card.html directly in the browser.

Notes on assets

- The avatar references assets/characters/warrior.svg via relative path ../../assets/characters/warrior.svg. If your server serves files differently, adjust the path or inline the SVG into the HTML for tighter styling control.

Accessibility

- The card uses semantic article, header, section, and footer elements.
- The stat meters use role="progressbar" and set aria-valuemin/aria-valuemax/aria-valuenow. aria-valuenow updates after animation; reduced motion users receive the final value immediately.
- The card is keyboard-focusable (tabindex="0") and provides a visible focus ring via design token --focus.

Animation and reduced motion

- Stat bars animate from 0% to their target value on mount. The animation duration matches the CSS transition (900ms).
- Users who have prefers-reduced-motion: reduce will see immediate, non-animated bars.

Merge conflict handling for design-tokens.css

The Designer will modify src/styles/design-tokens.css. When you pull or merge those changes, follow this recommended workflow to avoid conflicts and preserve tokens:

1. Create a feature branch for your work before making changes:
   git checkout -b feat/character-card-1474be5c

2. When designer updates arrive on main (or target branch), rebase or merge carefully:
   git fetch origin
   git checkout feat/character-card-1474be5c
   git rebase origin/main

3. If design-tokens.css has conflicts during rebase/merge:
   - Open src/styles/design-tokens.css and look for conflict markers <<<<<<<, =======, >>>>>>>.
   - Determine which token values are authoritative. Prefer the designer's change for visual tokens unless the developer intentionally needs to adjust.
   - If both sets of changes are valid, reconcile by keeping new tokens and adding any missing variables from your branch.
   - After editing, run a quick visual smoke test (open a page that imports design-tokens.css and components) to ensure no regressions.

4. After resolving conflicts:
   git add src/styles/design-tokens.css
   git rebase --continue   (or git commit if merging)

5. Push with force-if-rebasing, or normally if merge:
   git push origin feat/character-card-1474be5c --force-with-lease

Testing / Validation

- Open src/components/character-card.html directly in a browser (ensure design-tokens.css is accessible) to preview.
- Verify CSS variables from design-tokens.css are applied by inspecting computed styles (e.g., --accent).
- Verify stat bars animate on load. Toggle OS "reduce motion" setting to confirm reduced-motion behavior.
- Use keyboard to tab to the card and buttons to verify focus states.

Programmatic usage

You can initialize/animate stat bars for dynamically inserted content by importing the module and calling animateStatBars(root):

import { animateStatBars } from '/src/components/character-card.js';
// After inserting DOM nodes
animateStatBars(containerElement);

