# Game Character Profile Card — Design Specification

Version: 1.0.0
Last updated: 2026-03-21

This document defines design tokens, responsive breakpoints, spacing, typography, color tokens, component anatomy, interaction states, SVG grouping conventions, and accessibility patterns for the Game Character Profile Card system.

Goals:
- Provide a single source of truth for tokens as CSS variables
- Responsive rules for mobile / tablet / desktop
- Accessible color and typography choices (aiming for WCAG AA/AAA where practical)
- Clear SVG grouping and naming conventions: #head, #body, #weapon, #armor
- ARIA and keyboard interaction patterns for the bio toggle and stat bars

---

## 1. Design Tokens (CSS variable names + example values)

Use the following CSS custom properties at :root (or theme root). Values are expressed as rems where appropriate.

:root tokens (examples)

```css
:root {
  /* COLOR TOKENS (semantic) */
  --color-bg: #0f1724;            /* page background - very dark navy */
  --color-surface: #111827;       /* card surface - near-black */
  --color-card-contrast: #0b1220; /* subtle contrast for card layering */
  --color-text-primary: #e6eef8;  /* primary body text (light) */
  --color-text-secondary: #a9bed6;/* secondary text */
  --color-accent: #7dd3fc;        /* cyan accent (call-to-action) */
  --color-accent-600: #38bdf8;    /* stronger accent */
  --color-success: #22c55e;      /* success/health */
  --color-warning: #f59e0b;      /* warning/stamina */
  --color-danger: #ef4444;       /* damage/debuff */
  --color-muted: #889aa8;        /* disabled/placeholder */
  --color-border: rgba(255,255,255,0.06);

  /* TYPOGRAPHY / SCALE */
  --fs-xxs: 0.625rem; /* 10px */
  --fs-xs: 0.75rem;   /* 12px */
  --fs-sm: 0.875rem;  /* 14px */
  --fs-md: 1rem;      /* 16px base */
  --fs-lg: 1.125rem;  /* 18px */
  --fs-xl: 1.25rem;   /* 20px */
  --fs-2xl: 1.5rem;   /* 24px */
  --fs-3xl: 1.875rem; /* 30px */

  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;

  /* SPACING SCALE (module = 0.25rem) */
  --space-0: 0rem;     /* 0 */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.5rem;   /* 24px */
  --space-6: 2rem;     /* 32px */
  --space-8: 3rem;     /* 48px */

  /* RADIUS / SHADOWS */
  --radius-sm: 0.375rem;  /* 6px */
  --radius-md: 0.5rem;    /* 8px */
  --elevation-1: 0 6px 18px rgba(2,6,23,0.6);

  /* TRANSITIONS */
  --duration-fast: 120ms;
  --duration-medium: 240ms;
  --duration-slow: 360ms;
  --ease-standard: cubic-bezier(.2,.8,.2,1);

  /* BREAKPOINTS (these are helpers; use in media queries) */
  --bp-mobile-max: 599px;
  --bp-tablet-min: 600px;
  --bp-tablet-max: 1023px;
  --bp-desktop-min: 1024px;
}
```

Notes:
- All spacing and type sizes are in rem for scalability.
- Color tokens use semantic naming so implementation can map to light/dark themes.

---

## 2. Responsive Breakpoints

Breakpoints follow common device categories:
- Mobile: up to 599px (single-column card layout)
- Tablet: 600px — 1023px (two-column or denser layout)
- Desktop: 1024px and up (full layout with details visible)

Example media queries:

```css
/* Mobile-specific (default is mobile-first) */
@media (min-width: 600px) {
  /* tablet+ styles */
}

@media (min-width: 1024px) {
  /* desktop+ styles */
}
```

Example responsive card widths to reproduce shown layouts:
- Mobile card width: 100% with max-width: 22rem (352px)
- Tablet card width: 48% (two-up grid) with max-width: 34rem (544px)
- Desktop card width: 28rem (448px) or used within a 3-up grid

---

## 3. Spacing Scale

Refer to tokens: --space-1 through --space-8. Guidance for usage:
- Padding inside card: var(--space-4) (1rem)
- Small gaps between elements: var(--space-2) (0.5rem)
- Large separation (card to card): var(--space-6) (2rem)
- Avatar margin: var(--space-3)

Consistency: always use tokens, not raw rem values, for predictable rhythm.

---

## 4. Typography Scale and Usage

Base font-size: 1rem = 16px. Use these illustrative mappings:
- Character name: --fs-2xl (1.5rem) with --fw-semibold
- Role / title: --fs-md (1rem) with --fw-medium and --color-accent
- Stat label: --fs-xs (0.75rem)
- Body / bio: --fs-sm (0.875rem)
- Small meta: --fs-xxs (0.625rem)

Example CSS:

```css
.card__title {
  font-size: var(--fs-2xl);
  font-weight: var(--fw-semibold);
  color: var(--color-text-primary);
}
.card__bio {
  font-size: var(--fs-sm);
  color: var(--color-text-secondary);
  line-height: 1.4;
}
```

Aim for accessible contrast:
- Primary text on surface: contrast target >= 7:1 achieved with --color-text-primary on --color-surface
- Secondary text target >= 4.5:1 (use --color-text-secondary)
- Accent elements must meet 3:1 for non-text UI if used over surface (or 4.5:1 for text on accent)

---

## 5. Color Tokens (Examples and usage)

Semantic tokens are preferred. Example usage mapping:
- Backgrounds: --color-bg
- Card surface: --color-surface
- Text primary: --color-text-primary
- Text secondary: --color-text-secondary
- Accent for buttons/tags: --color-accent
- Health bar: --color-success
- Stamina bar / warning: --color-warning
- Damage / negative: --color-danger
- Borders / dividers: --color-border

Tip: For interactive focus rings, use a saturated accent with adjusted alpha for good contrast (e.g. box-shadow: 0 0 0 3px rgba(56,189,248,0.16)).

---

## 6. Component Anatomy — Character Profile Card

Anatomy (block-naming recommended BEM-ish):

- .card (root)
  - .card__header
    - .card__avatar (SVG grouped with IDs)
    - .card__title (name)
    - .card__role (class/title)
  - .card__body
    - .card__stats (stat bars + icons)
      - .stat (single stat)
        - .stat__label
        - .stat__bar (visual progress)
        - .stat__value (numeric)
    - .card__bio (collapsible bio text)
  - .card__footer
    - .card__actions (buttons: view, equip, etc.)

Example structural CSS snippet:

```css
.card {
  background: linear-gradient(180deg, var(--color-surface), var(--color-card-contrast));
  color: var(--color-text-primary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-1);
  border: 1px solid var(--color-border);
}
.card__header { display:flex; gap:var(--space-3); align-items:center }
.card__avatar { flex: 0 0 auto; width: 4.5rem; height:4.5rem }
.card__body { margin-top: var(--space-3) }
```

---

## 7. Interaction States & Transitions

Transition tokens are available. General rules:
- Hover: elevate shadow and increase contrast slightly
- Focus: visible focus ring with clear contrast, non-conflicting with hover
- Active/pressed: shrink transform: translateY(1px) / scale(0.996)

Tokens in action:
- transition: all var(--duration-medium) var(--ease-standard)

State examples:
```css
.card:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(2,6,23,0.55); }
.button:focus { outline: none; box-shadow: 0 0 0 3px rgba(56,189,248,0.14); border-color: var(--color-accent-600); }
```

---

## 8. SVG Grouping Conventions

All character SVGs MUST follow these grouping and naming conventions at minimum so they can be manipulated by code and themed consistently.

Root structure example (simplified):

```svg
<svg viewBox="0 0 200 200" role="img" aria-labelledby="charName charDesc">
  <title id="charName">Mira Starblade</title>
  <desc id="charDesc">Light-armored scout with a short blade.</desc>
  <g id="avatar-root">
    <g id="head" data-layer="head"> ... </g>
    <g id="body" data-layer="body"> ... </g>
    <g id="weapon" data-layer="weapon"> ... </g>
    <g id="armor" data-layer="armor"> ... </g>
    <!-- additional groups allowed: #cloak, #accessory etc. -->
  </g>
</svg>
```

Rules & best practices:
- Use the exact IDs #head, #body, #weapon, #armor for core manipulable groups. IDs MUST be unique within the SVG.
- Provide additional data attributes to identify variant (data-variant="light", data-material="leather").
- Keep fill and stroke color values tied to CSS variables where possible using currentColor or style attributes that reference CSS variables. Example: style="fill: var(--color-accent);"
- Ensure the SVG has role="img" and title/desc elements for assistive technologies.
- For decorative-only avatars (no semantic content), use aria-hidden="true".

Examples of targeting in CSS/JS:
```css
/* Change weapon color when equipping an elemental skin */
.card__avatar #weapon { color: var(--color-accent); }

/* Dim armor when damaged */
.card__avatar #armor { opacity: 0.8; filter: grayscale(0.2); }
```

---

## 9. Accessibility: ARIA & Keyboard Interaction Patterns

Two interactive pieces require explicit patterns: the bio toggle (expand/collapse) and stat bars.

### 9.1 Bio Toggle (Collapsible content)

HTML semantics recommended:
- Use a native <button> for the toggle control.
- The toggling region should be an element with role="region" and aria-labelledby linking to the toggle.
- Use aria-expanded on the button to reflect state.

Example HTML:

```html
<header class="card__header">
  <h3 id="name-1" class="card__title">Mira Starblade</h3>
  <button
    id="bio-toggle-1"
    class="card__bio-toggle"
    aria-controls="bio-1"
    aria-expanded="false"
    aria-label="Toggle character bio"
  >
    <span class="visually-hidden">Toggle bio</span>
    <svg class="icon">...</svg>
  </button>
</header>
<section id="bio-1" class="card__bio" role="region" aria-labelledby="bio-toggle-1" hidden>
  <p>Short bio text ...</p>
</section>
```

Behavior & Keyboard:
- The button should be focusable (native <button> does this by default).
- Activation: Space or Enter toggles the panel (native behavior for button).
- When expanded, set aria-expanded="true" and remove hidden attribute from the region (or set aria-hidden="false").
- Provide reduced-motion friendly toggling by checking prefers-reduced-motion.
- If the bio content receives focusable elements, manage focus trap only if the panel acts as a modal (not required for simple collapse).

Animation sample (prefers-reduced-motion aware):
```css
.card__bio {
  transition: max-height var(--duration-medium) var(--ease-standard), opacity var(--duration-medium);
  overflow: hidden;
  max-height: 0;
  opacity: 0;
}
.card__bio[aria-hidden="false"] {
  max-height: 20rem; /* large enough for content, or use JS to set exact height */
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
  .card__bio { transition: none }
}
```

### 9.2 Stat Bars (Read-only and Interactive)

Two modes supported: read-only and interactive (e.g., fine-tuning stat allocation in UI). Both must be accessible.

Common markup for read-only progress:
```html
<div class="stat" role="group" aria-labelledby="stat-attack-label">
  <div id="stat-attack-label" class="stat__label">Attack</div>
  <div
    class="stat__bar"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow="72"
    aria-label="Attack 72 percent"
  >
    <div class="stat__bar-fill" style="width:72%"></div>
  </div>
  <div class="stat__value">72</div>
</div>
```

Accessibility rules for read-only bars:
- role="progressbar" with aria-valuemin/aria-valuemax/aria-valuenow communicates value to screen readers
- Visible text label is required (or aria-label)
- Ensure the contrast of the fill track and background track meets non-text UI contrast of 3:1

Interactive stat bar (keyboard operable):
- If interactive, add tabindex="0" to the element representing the control OR use a semantic control such as a range input with styling.
- Keyboard operations:
  - Left Arrow / Down Arrow: decrement by step (default 1)
  - Right Arrow / Up Arrow: increment by step
  - Home: set to min
  - End: set to max
- Maintain aria-valuenow updates and visually update .stat__bar-fill width.

Interactive markup example (div-based):
```html
<div
  class="stat__bar interactive"
  role="slider"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="48"
  tabindex="0"
  aria-label="Allocate points to defense"
>
  <div class="stat__bar-fill" style="width:48%"></div>
</div>
```

Implementation notes:
- Use role="slider" for keyboard interaction semantics if using div. Otherwise, prefer native <input type="range"> and style it accessibly.
- Ensure touch targets / handles are at least 44x44px when interactive.
- Provide live-region feedback for assistive tech if changes happen via non-keyboard interactions (aria-live="polite" container with the new value text).

---

## 10. Example CSS Variables Snippet (Quick copy)

```css
:root {
  --color-bg: #0f1724;
  --color-surface: #111827;
  --color-text-primary: #e6eef8;
  --color-text-secondary: #a9bed6;
  --color-accent: #7dd3fc;
  --space-4: 1rem; --fs-md: 1rem; --fs-2xl: 1.5rem;
  --duration-medium: 240ms; --ease-standard: cubic-bezier(.2,.8,.2,1);
}
```

---

## 11. Example Card Layouts (Mobile / Tablet / Desktop)

All examples are simplified layouts showing how tokens are applied. Values use rem and CSS variables.

Mobile (single-column)

```html
<div class="card" style="max-width:22rem; width:100%">
  <div class="card__header">
    <div class="card__avatar">[SVG]</div>
    <div>
      <h3 class="card__title">Mira Starblade</h3>
      <div class="card__role" style="color:var(--color-accent)">Scout</div>
    </div>
    <button class="card__bio-toggle">...</button>
  </div>
  <div class="card__body">
    <!-- stats stacked -->
    <div class="card__stats">
      <!-- stat items -->
    </div>
    <section class="card__bio">Short bio ...</section>
  </div>
</div>
```

Tablet (two-column, grid-like)

```html
<div class="card" style="display:grid; grid-template-columns: 6.5rem 1fr; gap:var(--space-3); max-width:34rem;">
  <div class="card__avatar">[SVG]</div>
  <div>
    <h3 class="card__title">Mira Starblade</h3>
    <div class="card__role">Scout</div>
    <div class="card__stats"> ... horizontal or stacked depending on width ...</div>
  </div>
  <div class="card__bio" style="grid-column: 1 / -1">Full bio text ...</div>
</div>
```

Desktop (denser, more metadata & actions visible)

```html
<div class="card" style="max-width:28rem; display:flex; gap:var(--space-4);">
  <div class="card__avatar" style="width:6.5rem;">[SVG]</div>
  <div style="flex:1">
    <div style="display:flex; justify-content:space-between; align-items:start">
      <div>
        <h3 class="card__title">Mira Starblade</h3>
        <div class="card__role">Scout • Level 12</div>
      </div>
      <div class="card__actions">[Buttons]</div>
    </div>
    <div class="card__stats">[stat bars inline]</div>
    <div class="card__bio">Expanded bio visible by default on wide screens</div>
  </div>
</div>
```

Notes on rendering:
- Use the CSS variable tokens to style color, spacing, and type. Example: .card { padding: var(--space-4); }
- In all breakpoints, ensure touch and focus targets meet 44px comfortable guidelines.

---

## 12. Tokens mapping & theme switching

To support a light theme, map semantic tokens at the theme level, e.g., .theme--light { --color-surface: #ffffff; --color-text-primary: #041224; }

---

## 13. Developer handoff checklist

- Provide SVGs that conform to the grouping conventions (#head, #body, #weapon, #armor)
- Provide at least one avatar SVG with title/desc for accessibility
- Implement tokens as CSS variables and avoid hard-coded values in components
- Verify color contrast using automated tooling and ensure primary text meets contrast targets
- Test keyboard interactions for bio toggle and interactive stat bars with assistive tech where possible

---

If anything in this spec needs to be adjusted for your design system (brand colors or font stack), update the semantic token values rather than component styles.

End of spec
