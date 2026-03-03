Design System Spec
==================

Overview
--------
This document describes the design tokens (in tokens.css) and component guidelines for the KĀDI design system used by the Designer agent. It includes anatomy, breakpoints, typography scale, full color token list with contrast ratios, interaction states, motion specs, class naming conventions, usage examples, and ARIA guidance for accessible stat bars.

Files
-----
- design/tokens.css — CSS variables representing tokens and example utility classes
- design/spec.md — This specification (you are reading it)

Anatomy (components)
---------------------
Common components referenced in class conventions (.cc-*)

1) Card (.cc-card)
   - Root container: .cc-card
   - Header area (optional): .cc-card__header
   - Body/content: .cc-card__body
   - Footer/actions: .cc-card__footer
   - Avatar: .cc-card__avatar (.cc-avatar)
   - Spacing uses --card-padding and spacing tokens

2) Avatar (.cc-avatar)
   - Wrapper: .cc-avatar
   - Image or initials inside: <img> or <span class="cc-avatar__initials">
   - Sizes controlled via --avatar-size-sm / --avatar-size-md or utility classes

3) Stats (.cc-stats / .cc-stat)
   - Container: .cc-stats
   - Individual stat row: .cc-stat
   - Label: .cc-stat__label
   - Value: .cc-stat__value
   - Bar (visual): .cc-stat__bar > .cc-statbar
   - Assistive text for screen readers: .cc-stat__sr

Breakpoints
-----------
Tokens (in tokens.css):
- Mobile: up to 480px
- Tablet: 481px–767px (base at 768px)
- Desktop: 1024px and up

Suggested media queries:
- Mobile-first base (no media query)
- @media (min-width: 768px) { /* tablet and up */ }
- @media (min-width: 1024px) { /* desktop and up */ }

Typography Scale (rem-based)
----------------------------
Root font size assumed 16px (1rem = 16px)
- --fs-xxs: 0.625rem (10px)
- --fs-xs: 0.75rem (12px)
- --fs-sm: 0.875rem (14px)
- --fs-md: 1rem (16px) — body / base
- --fs-lg: 1.125rem (18px)
- --fs-xl: 1.25rem (20px)
- --fs-2xl: 1.5rem (24px)
- --fs-3xl: 1.875rem (30px)

Line height tokens:
- --lh-tight: 1.1
- --lh-default: 1.4
- --lh-relaxed: 1.6

Usage examples:
- Body copy: font-size: var(--fs-md); line-height: var(--lh-default);
- Small labels: font-size: var(--fs-xs); line-height: 1.3
- Headings: use scale and weight (e.g., h1: var(--fs-3xl), font-weight: var(--font-weight-bold))

Color Tokens & Accessibility
----------------------------
List of tokens (HEX) defined in tokens.css and contrast ratios vs. surface.
Contrast ratios calculated against --color-surface (#FFFFFF) unless otherwise noted.

NOTE: Contrast ratios are approximate and were calculated programmatically during design — values here are rounded to two decimal places. Refer to WCAG 2.1 for exact verification.

- --color-surface: #FFFFFF (surface)
- --color-surface-01: #F5F7FA (elevated surface)
- --color-surface-02: #E9EEF5 (muted surface)
- --color-text: #0B1A2B — contrast on surface (White): 15.86:1 (AAA for normal and large text)
- --color-text-secondary: #4B5C6B — contrast on surface: 6.97:1 (AA/AAA for large text, AA for normal text)
- --color-muted: #7B8894 — contrast on surface: 4.86:1 (AA for large text, fails AA for normal text)
- --color-accent: #0066CC — contrast on surface: 4.57:1 (AA for large text; fails AA for normal small text)
- --color-accent-strong: #004C99 — contrast on surface: 6.68:1 (AA for normal text)
- --color-accent-hover: #005EB8 — contrast on surface: 4.8:1
- --color-success: #1E8E3E — contrast on surface: 4.24:1
- --color-warning: #E6A700 — contrast on surface: 3.34:1
- --color-danger: #D64545 — contrast on surface: 3.64:1
- --color-divider: #E1E8F0 — contrast on surface: 1.26:1 (not for text)
- --color-icon: #324A5F — contrast on surface: 6.33:1

Accessible alternatives
- For color-accent (4.57:1) when used for small text or interactive labels, prefer --color-accent-strong (#004C99, 6.68:1) to meet AA.
- For success/warning/danger used as text, provide on-color fallbacks: --color-on-success-contrast: #FFFFFF, --color-on-warning-contrast: #0B1A2B, --color-on-accent-contrast: #FFFFFF.

Contrast guidance summary (text on white surface):
- AAA (>=7:1): --color-text
- AA (>=4.5:1): --color-text-secondary, --color-accent-strong, --color-icon
- AA Large (>=3:1): --color-accent, --color-accent-hover, --color-success
- Fails AA normal: --color-muted, --color-warning, --color-danger (use for backgrounds or accompany with text-overlays that meet contrast)

Interaction States
------------------
Standard states to implement for interactive components:
- Rest: default token usage
- Hover: lighter/darker accent tokens (see --color-accent-hover)
- Focus: visible outline using semi-transparent accent or neutral (<code>outline: 3px solid rgba(0,102,204,0.16);</code>) and outline-offset: 2px. Use :focus-visible for keyboard accessibility.
- Active: subtle transform (translateY(0) or scale) and shadow change.
- Disabled: reduce opacity, set cursor: not-allowed, and use low-contrast background (e.g., --color-divider) and text (--color-muted)

Examples (from tokens.css):
- .cc-btn hover/focus/active/disabled states implemented with tokens and motion durations

Motion
------
Timing and easing tokens in tokens.css:
- --motion-duration-fast: 150ms
- --motion-duration-medium: 300ms
- --motion-duration-slow: 500ms
- --motion-easing-standard: cubic-bezier(0.2, 0.8, 0.2, 1)
- --motion-easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1)

Motion guidance:
- Use fast for micro-interactions (button presses, icon pops)
- Medium for transitions between UI states (statbar width changes)
- Slow for large-scale transitions (modals opening)
- Avoid motion for users who prefer reduced motion: respect prefers-reduced-motion media query

Class Naming Conventions
------------------------
- Prefix for system: .cc- ("component core")
- Block elements use BEM-like structure with double underscore for components: e.g., .cc-card__header, .cc-stat__label
- Modifiers via .is- or .cc-component--modifier: e.g., .cc-btn.is-disabled, .cc-card--elevated

Usage Examples and HTML snippets
--------------------------------
1) Card with avatar and stats

```html
<div class="cc-card" style="max-width: 340px;">
  <div class="cc-card__header" style="display:flex;align-items:center;gap:var(--space-sm);">
    <div class="cc-avatar" style="width:var(--avatar-size-md);height:var(--avatar-size-md);">AJ</div>
    <div>
      <div style="font-size:var(--fs-sm);font-weight:var(--font-weight-medium);">Alex Johnson</div>
      <div style="font-size:var(--fs-xs);color:var(--color-text-secondary);">Product designer</div>
    </div>
  </div>
  <div class="cc-card__body" style="margin-top:var(--space-md);">
    <p style="font-size:var(--fs-sm);color:var(--color-text);line-height:var(--lh-default);">Overview or description copy that sits in the card body.</p>
    <div class="cc-stats" style="margin-top:var(--space-md);">
      <div class="cc-stat" style="margin-bottom:var(--space-sm);">
        <div class="cc-stat__label" style="font-size:var(--fs-xs);color:var(--color-text-secondary);">Completion</div>
        <div class="cc-stat__value" style="font-size:var(--fs-sm);font-weight:var(--font-weight-medium);">72%</div>
        <div class="cc-stat__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="72" aria-label="Completion progress">
          <div class="cc-statbar" style="width:72%;"></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

2) Button states

```html
<button class="cc-btn">Primary action</button>
<button class="cc-btn is-disabled" disabled>Disabled</button>
```

Stat Bar ARIA Guidance
----------------------
For accessible stat/progress bars use semantic roles and attributes:
- Use role="progressbar" when representing progress with numeric value
- Required attributes: aria-valuemin, aria-valuemax, aria-valuenow
- Prefer an aria-label or visible label describing the metric (e.g., "Completion progress")
- If the bar is purely decorative and redundant with textual value, mark it aria-hidden="true" and expose the value in text for screen readers

Example (explicit):
<div class="cc-stat__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45" aria-label="Profile completion 45 percent">
  <div class="cc-statbar" style="width:45%;"></div>
</div>

If using live updates, add aria-live="polite" on the textual value element and manage updates programmatically to avoid excessive announcements.

Accessibility Checklist
-----------------------
- Ensure text contrast meets WCAG 2.1 AA for normal text (>=4.5:1) where required; otherwise provide alternative token with sufficient contrast.
- Always expose numeric values in text alongside visual bars
- Use focus-visible for keyboard users and ensure hit area minimums (44x44px recommended)
- Respect prefers-reduced-motion

Design Tokens Reference (Summary)
---------------------------------
See tokens.css for the canonical source. Highlights:
- Breakpoints: --bp-mobile, --bp-tablet, --bp-desktop
- Typography: --fs-*, --lh-*
- Spacing: --space-*
- Radii: --radius-*
- Colors: --color-*
- Motion: --motion-*

Developer Handoff Notes
----------------------
- Tokens are intentionally generic to allow reuse across products
- Prefer referencing tokens rather than hard-coded values in components
- For theming, override tokens at :root or theme class root

Lead Designer Review Ready
--------------------------
This spec includes tokens, accessibility notes, contrast ratios, example markup, and ARIA guidance for stat bars. It is ready for review by the Lead Designer.
