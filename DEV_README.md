Character Card Component — DEV_README

Overview

This small demo implements a character profile card component (.cc-card) using plain HTML, CSS, and JavaScript. It demonstrates:

- Inline SVG avatar integration (assets/cat_pixel_inline.svg content is inlined in index.html)
- Usage of design tokens via tokens.css (CSS variables for colors, spacing, typography)
- Accessible, keyboard-focusable card layout following BEM-like classnames: .cc-card, .cc-card__header, .cc-stats, .cc-progress, etc.
- Animated stat bars (progress bars) that animate from 0 to target using requestAnimationFrame, with reduced-motion support
- Semantic HTML and ARIA attributes for assistive technologies

Files

- index.html — Demo page. Contains the inlined SVG avatar and the card markup.
- styles.css — Component-specific styles that import tokens.css and implement responsive layout and visual styles.
- tokens.css — Design tokens provided by the designer (colors, spacing, typography). Imported by styles.css and linked in index.html.
- scripts.js — JS that animates progress bars from 0 to the data-target value using requestAnimationFrame. Honors prefers-reduced-motion.

Assets

- assets/cat_pixel_inline.svg — Provided by the artist. The SVG is inlined into index.html for crisp rendering and easy styling. The original source is present in the designer/artist branch; for the demo it is embedded directly to meet the integration requirement.

Integration Notes

To integrate this component into a larger project:

1. Include tokens.css early (global tokens). You can link it from index.html or import it into your main stylesheet.

   <link rel="stylesheet" href="path/to/tokens.css">

2. Add styles.css to bring in component-specific styles. It imports tokens.css by default; if your build system handles tokens globally, you can remove the import at the top of styles.css.

   <link rel="stylesheet" href="path/to/styles.css">

3. Inline or reference the avatar SVG. Inlining allows you to add accessible attributes (title/desc) and style the SVG via CSS. If you prefer an <img>, ensure alt text is present and set appropriate role attributes.

4. Include scripts.js to enable stat animations. It respects the user's prefers-reduced-motion and will set final values immediately if reduced motion is enabled.

ARIA & Accessibility

- The progress bars use role="progressbar" and include aria-valuemin, aria-valuemax and aria-valuenow.
- The card container is keyboard-focusable with tabindex="0" to allow keyboard users to focus the card as a unit. You may adjust this based on your app semantics.
- Buttons include aria-labels for clarity.

Customization

- Tokens in tokens.css can be adjusted to change colors, spacing, typography, and breakpoints.
- The animation duration and easing are in scripts.js and can be tuned or replaced with CSS-only transitions if desired.

Development

- No build step is required — files are plain HTML/CSS/JS.
- Keep tokens.css as the single source of design variables for consistent theming.

Notes

- This demo is intentionally framework-free and minimal for easy integration into different stacks.
- The SVG provided by the artist is in assets/ and has been embedded inline in index.html to satisfy the task requirement.

Contact

If you need help adapting the component to your codebase or integrating with your design system, include details about your build stack and desired behavior and a developer can assist further.
