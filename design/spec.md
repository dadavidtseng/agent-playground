Design System Spec — KĀDI Designer Agent

Task: Visual tokens, breakpoints, component anatomy, variants, interaction states, CSS variable examples, usage snippets, and accessibility guidance for integrating with the programmer's demo.

Overview
--------
This spec describes a small, framework-agnostic design system for a "Stat Card / Stat Bar" component family used in the KĀDI demo. All styles are plain CSS and CSS variables. Examples are self-contained and require no external fonts or frameworks.

1 — Design Tokens (CSS variables)
---------------------------------
:root {
  /* Color palette */
  --color-bg: 255 255 255; /* RGB space for use with color() or rgba() via var() */
  --color-surface: 250 250 252;
  --color-muted: 101 116 131;
  --color-primary: 17 94 255; /* primary blue */
  --color-success: 22 163 74; /* green */
  --color-warning: 255 159 67; /* orange */
  --color-danger: 220 38 38; /* red */

  /* Semantic foreground using HSL/RGB tokens */
  --fg-default: 23 23 23;
  --fg-inverse: 255 255 255;

  /* Spacing (base = 4px) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* Elevation (shadow) */
  --shadow-sm: 0 1px 2px rgba(16, 24, 40, 0.05);
  --shadow-md: 0 8px 24px rgba(16, 24, 40, 0.08);

  /* Type scale */
  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-md: 15px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;

  /* Component-specific tokens for Stat Card */
  --stat-card-bg: hsl(var(--color-surface) / 1);
  --stat-card-border: rgba(16,24,40,0.06);
  --stat-card-padding: var(--space-md);

  /* Stat bar specifics */
  --stat-bar-height: 10px;
  --stat-bar-radius: 999px;
  --stat-bar-bg: rgba(16,24,40,0.06);
}

Token usage notes
- Colors are declared as RGB triples where appropriate to make it easy to compose with alpha (e.g., background: rgb(var(--color-primary) / 0.08)).
- Prefer semantic tokens (e.g., --fg-default, --color-primary) when consuming styles. Override tokens at a root or component scope to theme.

2 — Breakpoints
----------------
Declare breakpoints as CSS custom properties (useful for container-queries or media queries):

:root {
  --bp-xs: 360px;  /* tiny devices */
  --bp-sm: 640px;  /* phone */
  --bp-md: 900px;  /* tablet */
  --bp-lg: 1200px; /* desktop */
}

Example media query usage:
@media (min-width: var(--bp-md)) { /* larger layout rules */ }

3 — Component anatomy: Stat Card
--------------------------------
Anatomy (top-down):
- container: .stat-card (root)
  - header: .stat-card__header (title, subtitle optional)
  - value: .stat-card__value (primary numeric/stat)
  - meta: .stat-card__meta (delta, icon)
  - stat bar: .stat-card__bar (visual progress representation)

Visual relationships:
- The card provides a neutral surface with subtle border and shadow.
- The value is prominent (larger type); meta is smaller and may use color cues.
- The stat bar fills horizontally to indicate percent/ratio.

4 — CSS variable examples & overrides
------------------------------------
You can theme local instances by overriding tokens on the component element.

Example: light/dark override
.stat-card.theme-dark {
  --stat-card-bg: rgb(17 24 39 / 1);
  --fg-default: 255 255 255;
  --stat-card-border: rgba(255,255,255,0.04);
}

Example: emphasize primary accent
.stat-card.accent-primary {
  --stat-accent: rgb(var(--color-primary) / 1);
  --stat-accent-weak: rgb(var(--color-primary) / 0.12);
}

Usage notes:
- Override only what's necessary: background, accent tokens, or text color.
- Keep spacing and radii consistent by reusing base tokens.

5 — Component variants (compact | regular | expanded)
-----------------------------------------------------
Common base styles (used by all variants):

/* Base stat-card CSS (example) */
.stat-card {
  display: inline-block;
  background: var(--stat-card-bg);
  color: rgb(var(--fg-default));
  border: 1px solid var(--stat-card-border);
  border-radius: var(--radius-md);
  padding: var(--stat-card-padding);
  box-shadow: var(--shadow-sm);
  min-width: 160px;
}

Variant: compact
-----------------
Description: minimal, fits tight rows. Small padding, smaller typography.

HTML + CSS example (self-contained):

<!-- Compact variant -->
<div class="stat-card compact" role="group" aria-label="CPU usage">
  <div class="stat-card__header">CPU</div>
  <div class="stat-card__value">68%</div>
  <div class="stat-card__meta">+4% vs 1h</div>
  <div class="stat-card__bar" aria-hidden="true">
    <div class="stat-card__bar-fill" style="width:68%"></div>
  </div>
</div>

<style>
.stat-card.compact {
  padding: var(--space-sm);
  font-size: var(--font-size-sm);
}
.stat-card.compact .stat-card__value {
  font-size: var(--font-size-lg);
  font-weight: 600;
}
.stat-card__bar {
  height: var(--stat-bar-height);
  background: var(--stat-bar-bg);
  border-radius: var(--stat-bar-radius);
  margin-top: var(--space-sm);
  overflow: hidden;
}
.stat-card__bar-fill {
  height: 100%;
  background: rgb(var(--color-primary));
  border-radius: var(--stat-bar-radius);
}
</style>

Variant: regular
-----------------
Description: default. Balanced padding and typography.

<!-- Regular variant -->
<div class="stat-card regular" role="group" aria-label="Active users">
  <div class="stat-card__header">Active Users</div>
  <div class="stat-card__value">1,420</div>
  <div class="stat-card__meta">+8% week-over-week</div>
  <div class="stat-card__bar" aria-hidden="true">
    <div class="stat-card__bar-fill" style="width:42%"></div>
  </div>
</div>

<style>
.stat-card.regular { font-size: var(--font-size-md); }
.stat-card.regular .stat-card__value { font-size: var(--font-size-xl); font-weight:700; }
</style>

Variant: expanded
------------------
Description: emphasis mode with large value, extra description text, and accessible labels for the stat bar. Useful for feature pages or dashboards where a single metric is prominent.

<!-- Expanded variant -->
<div class="stat-card expanded" role="region" aria-labelledby="sales-title">
  <div id="sales-title" class="stat-card__header">Monthly Sales</div>
  <div class="stat-card__value">$84,300</div>
  <div class="stat-card__meta">+12% vs last month</div>
  <div class="stat-card__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="76" aria-valuetext="76 percent of target reached">
    <div class="stat-card__bar-fill" style="width:76%"></div>
  </div>
  <div class="stat-card__description">Goal: $110,000</div>
</div>

<style>
.stat-card.expanded { padding: var(--space-lg); font-size: var(--font-size-lg); }
.stat-card.expanded .stat-card__value { font-size: 34px; font-weight:800; }
.stat-card__description { margin-top: var(--space-sm); color: rgb(var(--color-muted)); font-size: var(--font-size-sm); }
</style>

6 — Interaction states & rules
------------------------------
Principles:
- Use subtle elevation and color changes for hover.
- Always surface focus with an accessible outline (not only color) to support keyboard users.

State rules (apply to .stat-card and interactive sub-elements):
- default: background var(--stat-card-bg), border var(--stat-card-border)
- hover: increase shadow and optionally slightly lift border color
  .stat-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
- focus-visible: use a 3px focus ring derived from accent color for keyboard focus
  .stat-card:focus-visible { outline: 3px solid rgb(var(--color-primary) / 0.14); outline-offset: 3px; }
- active: quick press state — reduce shadow and slightly scale down
  .stat-card:active { box-shadow: var(--shadow-sm); transform: translateY(0); }
- disabled: reduce opacity, disable pointer events
  .stat-card[aria-disabled="true"] { opacity: 0.6; pointer-events: none; }

Bar fill states:
- success, warning, danger classes can change bar-fill color
  .stat-card__bar-fill.success { background: rgb(var(--color-success)); }
  .stat-card__bar-fill.warning { background: rgb(var(--color-warning)); }
  .stat-card__bar-fill.danger { background: rgb(var(--color-danger)); }

7 — Accessibility checklist
--------------------------
Contrast
- Text contrast must follow WCAG 2.1 AA at minimum for body text (4.5:1) and large text (3:1).
- Example recommended pairings:
  - Primary body: rgb(var(--fg-default)) on var(--stat-card-bg) should be >= 4.5:1
  - Muted text: rgb(var(--color-muted)) on var(--stat-card-bg) should be checked — avoid < 3:1 for anything smaller than large text.

ARIA guidance for stat bars & progress
- Use role="progressbar" for an progress/stat bar that represents a numeric fraction.
- Provide aria-valuemin, aria-valuemax (default 0–100), and aria-valuenow with the numeric percentage.
- Provide aria-valuetext for a readable textual description (e.g., "76 percent of target reached").
- If the stat bar is purely decorative, hide from assistive tech via aria-hidden="true".

Keyboard & focus
- Ensure interactive cards or clickable regions are focusable (tabindex or native button/a element).
- Use :focus-visible styles that are high-contrast and don't rely on color alone.

Motion
- Avoid large motion on hover; prefer small lifts. Respect users' reduced-motion preference:
  @media (prefers-reduced-motion: reduce) { .stat-card { transition: none; transform: none; } }

Semantic labels
- If the card has multiple values, use aria-labelledby to point at the title and aria-describedby for additional context.

8 — Migration notes for programmer demo
--------------------------------------
Goal: integrate the CSS variables and component markup into the programmer's demo without framework lock-in.

Steps:
1. Copy design/spec.md CSS variables (the :root tokens) into the demo's global stylesheet. If the demo uses theming, map the tokens to existing theme variables.
2. Include the component-level CSS (base styles and interactions) into the demo's stylesheet. Because these are plain CSS classes, they can be scoped under a namespace if needed (e.g., .kadi .stat-card).
3. For dynamic widths of the .stat-card__bar-fill, the demo should set inline style widths or update styles via JS (style.width = `${value}%`) and set the associated ARIA attributes: aria-valuenow and aria-valuetext.

Example JS snippet for updating progress (not framework specific):
// element is the .stat-card__bar element
const fill = element.querySelector('.stat-card__bar-fill');
function setProgress(pct){
  pct = Math.max(0, Math.min(100, Math.round(pct)));
  fill.style.width = pct + '%';
  element.setAttribute('aria-valuenow', String(pct));
  element.setAttribute('aria-valuetext', `${pct} percent of target reached`);
}

9 — Example variable overrides for theming
-----------------------------------------
/* Example: apply a warm theme per-card */
.stat-card.warm-theme {
  --color-primary: 255 110 64; /* warm coral */
  --stat-card-bg: rgb(255 249 240 / 1);
  --fg-default: 34 20 12;
}

10 — Notes & rationale
----------------------
- Keep CSS variables semantic so the team can theme by changing only a handful of values.
- Avoid framework-specific constructs to maximize portability.
- Accessibility prioritized for interactive controls and progress representations.

Appendix: Quick copy-paste minimal demo
--------------------------------------
<html>
  <body>
    <div class="stat-card expanded" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="76" aria-valuetext="76%">
      <div class="stat-card__header">Demo metric</div>
      <div class="stat-card__value">76%</div>
      <div class="stat-card__bar" aria-hidden="false">
        <div class="stat-card__bar-fill" style="width:76%"></div>
      </div>
    </div>
    <style>
      /* Minimal required tokens for demo */
      :root { --color-primary: 17 94 255; --fg-default: 23 23 23; --stat-card-bg: #fff; --stat-bar-bg: rgba(16,24,40,0.06); --stat-bar-height: 10px; --radius-md: 12px; }
      .stat-card { padding: 16px; background: var(--stat-card-bg); border-radius: var(--radius-md); color: rgb(var(--fg-default)); width: 320px; }
      .stat-card__value { font-size: 28px; font-weight:700; }
      .stat-card__bar { background: var(--stat-bar-bg); height: var(--stat-bar-height); border-radius: 999px; margin-top:8px; }
      .stat-card__bar-fill { height: 100%; background: rgb(var(--color-primary)); border-radius: 999px; }
    </style>
  </body>
</html>


----
End of design/spec.md
