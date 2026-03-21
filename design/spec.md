# Game Character Profile Card — Design Specification

Version: 1.0
Date: 2026-03-21
Task ID: 5944013f-1f2e-4ffd-84d1-37f75c3f9ab5

Overview
--------
This document defines tokens, responsive rules, component anatomy, spacing, color palette (with WCAG guidance), interaction states, accessibility notes, and sample markup for the Game Character Profile Card component system. The spec is self-contained and copy/paste-ready.

Design tokens for Game Character Profile Card
--------------------------------------------
This file documents the design tokens used by the demo. Tokens are exported as CSS variables in design/tokens.css. Do not hardcode values in demo styles; use the CSS variables defined below and in design/tokens.css.

Tokens (CSS variables)
----------------------
All tokens are prefixed with --kadi- to avoid collisions in the component library examples. The demo also exposes higher-level/generic token names in design/tokens.css (e.g., --color-bg, --space-1) which map to the component-prefixed tokens. Use :root for global tokens; components may override within their scopes.

:root token examples (copy into your CSS or reference design/tokens.css):

```css
:root {
  /* Typography */
  --kadi-font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  --kadi-font-mono: "SFMono-Regular", Menlo, Monaco, "Roboto Mono", monospace;
  --kadi-type-xxs: 10px;
  --kadi-type-xs: 12px;
  --kadi-type-sm: 14px;
  --kadi-type-md: 16px; /* base */
  --kadi-type-lg: 18px;
  --kadi-type-xl: 20px;
  --kadi-type-xxl: 24px;

  /* Spacing scale (4-point) */
  --kadi-space-0: 0px;
  --kadi-space-1: 4px;
  --kadi-space-2: 8px;
  --kadi-space-3: 12px;
  --kadi-space-4: 16px;
  --kadi-space-5: 20px;
  --kadi-space-6: 24px;
  --kadi-space-7: 32px;
  --kadi-space-8: 40px;

  /* Radii */
  --kadi-radius-sm: 6px;
  --kadi-radius-md: 12px;
  --kadi-radius-lg: 16px;

  /* Elevation (soft shadows) */
  --kadi-elev-0: none;
  --kadi-elev-1: 0 1px 3px rgba(0,0,0,0.08);
  --kadi-elev-2: 0 4px 12px rgba(0,0,0,0.12);
  --kadi-elev-3: 0 12px 40px rgba(0,0,0,0.18);

  /* Motion */
  --kadi-duration-fast: 120ms;
  --kadi-duration-medium: 220ms;
  --kadi-duration-slow: 360ms;
  --kadi-ease: cubic-bezier(.2,.9,.2,1);

  /* Colors (semantic) */
  --kadi-bg: #0f1724; /* dark surface */
  --kadi-surface-1: #0b1220;
  --kadi-surface-2: #111827;
  --kadi-text-primary: #e6eef8; /* on dark bg */
  --kadi-text-secondary: #b7c4d6;
  --kadi-accent: #7dd3fc; /* cyan-300 */
  --kadi-accent-600: #0284c7;
  --kadi-muted: #6b7280;
  --kadi-success: #10b981;
  --kadi-warning: #f59e0b;
  --kadi-danger: #ef4444;

  /* Status surfaces */
  --kadi-tag-bg: rgba(125,211,252,0.08);
  --kadi-tag-text: var(--kadi-accent-600);
}
```

Generic/demo token names exported in design/tokens.css
-----------------------------------------------------
The demo additionally provides generic token names to simplify integration with other systems. These are defined in design/tokens.css and map to the --kadi- tokens above. Do not hardcode values in demo styles; reference these variables.

- Color tokens (examples):
  - --color-bg: background color for the page and card background (maps to --kadi-bg)
  - --color-surface: card surface color (maps to --kadi-surface-2)
  - --color-accent: accent / primary color used for highlights and stat bars (maps to --kadi-accent)
  - --color-muted: subdued text / secondary color (maps to --kadi-muted or --kadi-text-secondary)
  - --color-success: used for health-like stats (maps to --kadi-success)
  - --color-text: primary text color (maps to --kadi-text-primary)

- Spacing & sizing:
  - --space-1 .. --space-6: spacing scale (map to --kadi-space-1 .. --kadi-space-6)
  - --radius-1: border-radius for cards and buttons (map to --kadi-radius-md or -sm)
  - --card-width: preferred card max width (optional token in design/tokens.css)

- Typography:
  - --font-sans: system UI stack for headings and body (maps to --kadi-font-sans)
  - --font-mono: monospace font for stat numbers (maps to --kadi-font-mono)
  - --font-size-base: base font-size (maps to --kadi-type-md)
  - --font-size-sm: small font-size (maps to --kadi-type-sm)
  - --line-height-base: base line height

- Motion:
  - --motion-fast: short animation duration (maps to --kadi-duration-fast)
  - --motion-medium: medium animation duration (maps to --kadi-duration-medium)

Token values are defined in design/tokens.css and consumed by demo/styles.css. The component examples in this spec use the --kadi- prefix to show clear semantic intent and avoid collisions; map or alias these as needed at build time or in a theme layer.

Responsive breakpoints
----------------------
Use these breakpoints to control layout and sizing.

- Small: --kadi-bp-sm: up to 480px (mobile)
- Medium: --kadi-bp-md: 481px to 1024px (tablet)
- Large: --kadi-bp-lg: greater than 1024px (desktop)

Example CSS media queries:

```css
/* small (mobile) */
@media (max-width: 480px) { /* styles */ }

/* medium (tablet) */
@media (min-width: 481px) and (max-width: 1024px) { /* styles */ }

/* large (desktop) */
@media (min-width: 1025px) { /* styles */ }
```

Component: Game Character Profile Card — Anatomy
-----------------------------------------------
The card surfaces character information in a compact visual module.
Anatomy (top to bottom / left to right):
- Card container (role="group" aria-labelledby)
  - Media area (portrait SVG/IMG) — optional decorative badge (status)
  - Header row: character name, level/role tag
  - Meta row: class, faction, power rating
  - Stats grid: HP, Attack, Defense, Speed
  - Actions row: primary action (e.g., "View"), secondary (e.g., "Equip")

Spacing and layout tokens used inside the component:
- padding: var(--kadi-space-4) (or --space-4 via demo token)
- gap between elements: var(--kadi-space-3)
- avatar size: small 48px / medium 64px / large 96px (responsive)

Sample CSS block for the component using tokens:

```css
.kadi-card {
  font-family: var(--kadi-font-sans);
  background: linear-gradient(180deg, var(--kadi-surface-2), var(--kadi-surface-1));
  color: var(--kadi-text-primary);
  border-radius: var(--kadi-radius-md);
  box-shadow: var(--kadi-elev-2);
  padding: var(--kadi-space-4);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--kadi-space-3);
}

.kadi-avatar {
  width: 64px; height: 64px; border-radius: 12px; overflow: hidden;
  background: linear-gradient(135deg, rgba(125,211,252,0.08), rgba(2,132,199,0.06));
  display: inline-flex; align-items: center; justify-content: center;
}

.kadi-name { font-size: var(--kadi-type-lg); font-weight: 700; }
.kadi-sub { font-size: var(--kadi-type-sm); color: var(--kadi-text-secondary); }

/* responsive avatar sizes */
@media (max-width:480px) { .kadi-avatar{ width:48px;height:48px } .kadi-card{ padding:var(--kadi-space-3) } }
@media (min-width:1025px){ .kadi-avatar{ width:96px;height:96px } }
```

Sample markup (copy/paste-ready HTML)
------------------------------------
Includes ARIA for accessibility. Replace SVG placeholders with real art as needed.

```html
<article class="kadi-card" role="group" aria-labelledby="char-arthas-name" aria-describedby="char-arthas-desc">
  <div class="kadi-avatar" aria-hidden="true">
    <!-- Inline SVG placeholder for portrait -->
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Character portrait placeholder">
      <rect width="100" height="100" fill="#072033" />
      <text x="50" y="55" font-size="10" fill="#7dd3fc" text-anchor="middle" font-family="sans-serif">Portrait</text>
    </svg>
  </div>

  <div class="kadi-body">
    <header>
      <h3 id="char-arthas-name" class="kadi-name">Arthas, Lich Prince</h3>
      <div class="kadi-tags" aria-hidden="false">
        <span class="kadi-tag" role="status" aria-label="Level 45">Lv. 45</span>
        <span class="kadi-tag" role="note" aria-label="Class: Death Knight">Death Knight</span>
      </div>
    </header>

    <p id="char-arthas-desc" class="kadi-sub">Frost-favored commander of the northern wastes — high area control and crowd manipulation.</p>

    <dl class="kadi-stats" role="list">
      <div><dt>HP</dt><dd>3,200</dd></div>
      <div><dt>Attack</dt><dd>210</dd></div>
      <div><dt>Defense</dt><dd>185</dd></div>
      <div><dt>Speed</dt><dd>78</dd></div>
    </dl>

    <div class="kadi-actions">
      <button class="kadi-btn kadi-btn-primary" aria-label="View character details for Arthas">View</button>
      <button class="kadi-btn" aria-label="Equip Arthas">Equip</button>
    </div>
  </div>
</article>
```

Tags, badges and microcopy
--------------------------
Use subtle backgrounds and small-caps or compact typography. Tokens:

```css
.kadi-tag { font-size: var(--kadi-type-xs); padding: 2px 8px; border-radius: 999px; background: var(--kadi-tag-bg); color: var(--kadi-tag-text); }
```

Interaction state visuals
-------------------------
Define states using tokens and accessible visual differences.

- Default: background var(--kadi-surface-2), text var(--kadi-text-primary)
- Hover (pointer devices): slightly raise elevation and shift background tint
- Focus: 3px outline using a high-contrast ring, visible for keyboard users
- Active: brief scale down (0.98) and darker tint
- Disabled: reduce opacity to 0.48, disable pointer events where appropriate

Example CSS for buttons:

```css
.kadi-btn {
  background: transparent; color: var(--kadi-text-primary); border: 1px solid rgba(255,255,255,0.06);
  padding: 8px 12px; border-radius: var(--kadi-radius-sm); transition: transform var(--kadi-duration-fast) var(--kadi-ease), box-shadow var(--kadi-duration-fast) var(--kadi-ease), background var(--kadi-duration-fast) var(--kadi-ease);
}
.kadi-btn-primary { background: linear-gradient(180deg,var(--kadi-accent),var(--kadi-accent-600)); color: #022136; font-weight:600 }
.kadi-btn:hover { box-shadow: var(--kadi-elev-1); transform: translateY(-2px); }
.kadi-btn:active { transform: scale(0.98); }
.kadi-btn:focus { outline: 3px solid rgba(125,211,252,0.24); outline-offset: 2px; }
.kadi-btn[disabled], .kadi-btn[aria-disabled="true"] { opacity: 0.48; pointer-events: none; }
```

Motion preferences guidance
---------------------------
Respect user system preferences for reduced motion.

```css
@media (prefers-reduced-motion: reduce) {
  :root{ --kadi-duration-fast: 0ms; --kadi-duration-medium: 0ms; --kadi-duration-slow: 0ms }
  .kadi-btn, .kadi-card { transition: none !important; }
}
```

Color palette and WCAG guidance
-------------------------------
Primary surface: var(--kadi-surface-2) -> #111827
Primary text: var(--kadi-text-primary) -> #e6eef8
Accent: var(--kadi-accent) -> #7dd3fc

Contrast guidance (measured approximations):
- Primary text on surface: #e6eef8 on #111827 ≈ 13.5:1 (AAA for normal and large text)
- Secondary text on surface: #b7c4d6 on #111827 ≈ 6.5:1 (AA for normal)
- Accent on surface: #7dd3fc on #111827 ≈ 4.5:1 (meets AA for large text; for small text pair with a heavier accent or add chiaroscuro background)
- Small tag text (on tag-bg): #0284c7 on rgba(125,211,252,0.08) -> insufficient for small text; use darker accent or increase opacity of tag background. Example accessible tag combo: color: #0369a1 on tag-bg with opacity 0.14 yields ~4.6:1.

WCAG actionables:
- Always aim for >=4.5:1 for body text size (>=14px) and >=3.0:1 for large text (>=18pt/24px + bold adjustments). Use token pairs intended for small text with contrast adjustments.
- For icon-only buttons, provide a visible focus ring even if the icon color contrast is low.

Accessibility checklist
-----------------------
- [x] All interactive elements must be reachable by keyboard (tab order sensible)
- [x] Buttons include aria-labels where the visible text isn’t sufficiently descriptive
- [x] role attributes: use role="group" and aria-labelledby for card grouping
- [x] Images include alt text or aria-hidden when decorative
- [x] Use prefers-reduced-motion to disable animations for those who opt out
- [x] Provide sufficient color contrast; test with tools (axe, Lighthouse, WCAG contrast checkers)
- [x] Use semantic HTML: article, header, dl for stats, buttons for actions

Accessibility notes and examples
--------------------------------
- Decorative SVG: role="img" with aria-hidden="true" if decorative, or provide aria-label/alt text when informative.
- Keyboard focus: ensure focus order goes Avatar -> Name -> Actions. If using non-button elements for actions, add role and keyboard handlers (not covered here per restriction).
- Screen reader: give the card a concise accessible name via aria-labelledby and longer description via aria-describedby.

Sample component mockups (inline SVG placeholders)
--------------------------------------------------
Below are minimal mockups embedded as inline SVG placeholders. Replace with art assets in production.

Card compact (mobile) placeholder:

```html
<!-- Compact card SVG preview (placeholder) -->
<svg width="320" height="120" viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Compact card mockup">
  <rect x="0" y="0" width="320" height="120" rx="12" fill="#0b1220" />
  <rect x="12" y="12" width="64" height="64" rx="8" fill="#072033" />
  <rect x="88" y="18" width="220" height="18" rx="3" fill="#e6eef8" opacity="0.12" />
  <rect x="88" y="44" width="140" height="12" rx="3" fill="#b7c4d6" opacity="0.12" />
  <rect x="88" y="68" width="58" height="14" rx="8" fill="#075985" opacity="0.14" />
</svg>
```

Design tokens usage examples
---------------------------
- Use var(--kadi-type-md) for body copy inside cards.
- Use var(--kadi-space-4) for main padding and var(--kadi-space-3) for gaps between rows.
- Use var(--kadi-elev-2) for floating card shadows; reduce to elev-1 for smaller elements.
- For demo-level integration, use the generic names from design/tokens.css (e.g., --color-accent, --space-4) which are aliased to the --kadi- tokens.

Developer handoff notes
-----------------------
- Provide exported SVG portraits with accessible titles/desc when they convey additional meaning.
- Offer both light and dark themes by mapping tokens to light equivalents in a .theme-light selector.
- Keep interactions CSS-only; complex interactions should degrade gracefully when CSS not available.
- Token values live in design/tokens.css — consume those variables in demo/styles.css and avoid hardcoding color/spacing values in component styles.

Example light theme token overrides (optional):

```css
.theme-light { --kadi-bg: #f8fafc; --kadi-surface-2: #ffffff; --kadi-text-primary: #0b1220; --kadi-text-secondary: #374151; }
```

Versioning and maintenance
--------------------------
- Update tokens centrally in :root or in design/tokens.css.
- When adding new semantic colors, map to neutral base colors and provide WCAG pairings.
- Keep token aliases in design/tokens.css up-to-date to ensure other projects can consume generic token names (--color-*, --space-*) while the component library maintains its --kadi- namespace.

Appendix: Example token map (summary)
------------------------------------
- Typography: --kadi-font-sans, --kadi-type-md (alias: --font-sans, --font-size-base)
- Spacing: --kadi-space-1..8 (alias: --space-1..6)
- Color: --kadi-bg, --kadi-surface-2, --kadi-text-primary, --kadi-accent (alias: --color-bg, --color-surface, --color-text, --color-accent)
- Motion: --kadi-duration-fast/medium/slow, --kadi-ease (alias: --motion-fast, --motion-medium)
- Elevation: --kadi-elev-0/1/2/3

End of specification.