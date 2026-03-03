Design Document — Character Profile Card

Task ID: f336c36b-013c-49fb-9930-9556b7a187fb

Overview
--------
This document defines a set of framework-agnostic design tokens (CSS variables), responsive breakpoints, spacing and typography scales, color palette, component states, accessibility guidance, and example markup for a Character Profile Card component.

Files created
- tokens.css — contains CSS variable tokens, responsive adjustments, utility classes, and example component styles.
- design.md — this design document (you are reading it).

Tokens (CSS variables)
----------------------
Required tokens included in tokens.css:
- Type sizes: --type-xs, --type-sm, --type-md, --type-lg
- Color variables: --color-bg, --color-surface, --color-primary, --color-accent, --color-text, --color-muted, etc.
- Spacing variables: --space-0 through --space-8
- Breakpoints: --bp-mobile (480px), --bp-tablet (900px), --bp-desktop (901px)
- Interaction/State tokens: --focus-ring, --opacity-disabled, --opacity-hover

Responsive breakpoints
----------------------
- Mobile: viewport width <= 480px
- Tablet: 481px — 900px
- Desktop: >900px

Media queries are provided in tokens.css and adjust typography and avatar sizes.

Spacing system
--------------
- 4px base unit (0.25rem). Scale provided as --space-1 ... --space-8.
- Encouraged usage: use these tokens for margin/padding/gaps to ensure rhythm.

Typography scale
----------------
- --type-xs: 0.75rem (12px)
- --type-sm: 0.875rem (14px)
- --type-md: 1rem (16px)
- --type-lg: 1.25rem (20px)

Line height tokens are included: --lh-xs, --lh-sm, --lh-md, --lh-lg.

Color palette
-------------
- Dark theme base (designed for dark UIs): --color-bg, --color-surface, --color-card-contrast
- Accent and semantic colors: --color-primary, --color-accent, --color-success, --color-warning, --color-danger
- Text and muted text tokens: --color-text, --color-muted

Component states
----------------
Defined tokens and behaviors include:
- Hover: slight lift (transform translateY) and reduced opacity using --opacity-hover
- Active: small translateY for pressed effect
- Focus: outline replaced by focus-visible box-shadow using --focus-ring
- Disabled: opacity reduced to --opacity-disabled and pointer events are not allowed on interactive elements

Accessibility
-------------
- Use :focus-visible to show the focus ring for keyboard users; ensure contrast between focus ring and background.
- Color contrast: primary text --color-text on --color-surface meets WCAG AA for large text; for smaller text, test and adjust if needed.
- Provide aria-labels on interactive controls and use role="button" only if not using a native button element.
- Avatars should include alt text: <img alt="Character name avatar"> or use aria-hidden for purely decorative SVGs.

ARIA patterns for Character Profile Card
----------------------------------------
- Card as a region: <article class="card-character" aria-labelledby="char-name-1"> ... </article>
- Action buttons: native <button> elements with aria-pressed when toggleable
- If the card is selectable, use role="button" and tabindex="0" with keyboard handlers, and aria-pressed or aria-selected as appropriate.

Example markup
--------------
Paste into HTML to preview the component (uses tokens.css):

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="tokens.css">
  <title>Character Profile Card — Example</title>
  <style>
    body{ background: var(--color-bg); font-family: var(--font-sans); padding: var(--space-6); color: var(--color-text); }
    .container{ max-width: 680px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="container">
    <article class="card-character" aria-labelledby="char-name-1" role="article">
      <div class="card-avatar" aria-hidden="true">
        <!-- Placeholder for avatar SVGs. Use provided SVG guidelines for source icons. -->
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="24" height="24" rx="4" fill="rgba(255,255,255,0.02)" />
          <circle cx="12" cy="10" r="3.5" fill="rgba(255,255,255,0.06)" />
          <path d="M4 20c1.5-3 4.5-4 8-4s6.5 1 8 4" stroke="rgba(255,255,255,0.04)" stroke-width="1.2" stroke-linecap="round" />
        </svg>
      </div>

      <div class="card-content">
        <h3 id="char-name-1" class="card-title truncate">Aurelia Sunstrider</h3>
        <p class="card-subtitle truncate">Ranger • Level 7 • Wanderer of the Green Expanse</p>
        <div style="display:flex;gap:var(--space-2);align-items:center;margin-top:var(--space-2);">
          <span style="font-size:var(--type-sm);color:var(--color-muted);">HP: 58</span>
          <span style="font-size:var(--type-sm);color:var(--color-muted);">Mana: 22</span>
        </div>
      </div>

      <div class="card-actions" role="group" aria-label="Character actions">
        <button class="button" aria-label="View details">Details</button>
        <button class="button" aria-label="Send message">Message</button>
      </div>
    </article>
  </div>
</body>
</html>

Interaction states (spec)
-------------------------
- Hover: .card-character:hover -> transform and elevated shadow
- Button hover: background tint and slight color change
- Focus: :focus-visible uses --focus-ring; ensure 3px ring thickness for keyboard users
- Disabled: add disabled attribute to buttons; reduce opacity and set cursor: not-allowed

SVG guidelines for artists
--------------------------
- File format: SVG 1.1 or 2, optimized (svgo recommended)
- Max file size: 20 KB per SVG (prefer <10 KB for icons); for full avatar illustrations allow up to 150 KB but prefer vector-only content.
- Variants required: supply avatar/icon in these sizes: 32px, 64px, 128px. Provide each as separate SVG file and as a single master SVG using symbol/defs for sprites.
- Grouping rules: use a top-level <g id="main"> wrapper for primary shapes; use semantic IDs like "hair", "face", "accessory" for easier styling and animation hooks.
- ViewBox: ensure viewBox is set consistently (e.g., 0 0 24 24 for icons, or 0 0 128 128 for avatars).
- Colors: provide a monochrome (single-colour) mask variant and a colored variant. Use currentColor for stroke/fill where possible to allow CSS colorization.
- Animation guidance: provide optional animation-friendly layers and keep transformations isolated to grouped elements. For entrance/hover animations prefer CSS transform/opacity on group wrappers. Avoid animating complex path d attributes; provide morph targets separately if needed.

Accessibility & performance notes
---------------------------------
- Prefer SVG over raster images to keep crispness across densities and small size.
- Use alt text for meaningful images; if decorative, use aria-hidden="true".
- Ensure text contrast on top of gradients; consider a subtle overlay to keep readability.

How to use tokens
-----------------
- Reference variables in component styles: color: var(--color-text); padding: var(--space-4);
- For theming, override :root variables at a higher specificity or within a [data-theme="light"] scope.

Appendix: Example ARIA pattern for selectable card
--------------------------------------------------
<article class="card-character" role="button" tabindex="0" aria-pressed="false" aria-labelledby="char-name-1">
  <!-- card contents -->
</article>

Keyboard behavior:
- Enter/Space toggles selection or activates primary action
- Arrow keys optionally move focus between cards in a list (explicit roving-tabindex pattern)

End of document
