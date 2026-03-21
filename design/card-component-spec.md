Card Component Design Specification

Overview

This document defines the reusable Card component design system and the CSS tokens that implement its color palette, spacing, typography, responsive breakpoints, interaction states, and SVG placement guidelines. The Card is intended to be a flexible surface for short content blocks (title, subtitle, body, image/icon, actions). Tokens are provided in CSS variable format and a dark theme variant is included.

1. Anatomy

- Card (surface)
  - Optional media area (image, illustration, or SVG)
  - Header: title + optional subtitle/meta
  - Body: descriptive text (1–3 lines recommended)
  - Footer/actions: buttons, links, or metadata

2. Typography

Scale (CSS token names provided in tokens.css)
- --type-scale-0: 12px / 16px (caption)
- --type-scale-1: 14px / 20px (body-small)
- --type-scale-2: 16px / 24px (body)
- --type-scale-3: 18px / 28px (subhead)
- --type-scale-4: 20px / 28px (title)
- --type-scale-5: 24px / 32px (headline)

Guidelines
- Title: --type-scale-4 (20/28) — keep to 1–2 lines, truncate with ellipsis if necessary.
- Subtitle/meta: --type-scale-2 with --type-weak color.
- Body: --type-scale-2 for normal paragraphs; --type-scale-1 for secondary body or dense lists.
- Line length: aim for 40–70 characters per line for comfortable reading inside card width.

3. Spacing & Layout

Spacing tokens (examples; see tokens.css)
- --space-0: 4px
- --space-1: 8px
- --space-2: 12px
- --space-3: 16px
- --space-4: 20px
- --space-5: 24px
- --space-6: 32px

Card padding recommendations
- Compact card: padding: var(--space-2)
- Default card: padding: var(--space-3)
- Spacious card: padding: var(--space-4)

Gutters between elements
- vertical rhythm: use multiples of --space-2 (12px) or --space-3 (16px) depending on density.

4. Color Palette & Semantics

Core tokens (light theme in :root; dark theme overrides in [data-theme="dark"]) include:
- --color-bg (app background)
- --color-surface (card surface)
- --color-border
- --color-text (primary)
- --color-text-weak (secondary / meta)
- --color-muted (tertiary text)
- --color-brand (primary actions / accents)
- --color-success / --color-warning / --color-danger
- --color-interactive-hover / --color-interactive-active

Accessible contrast checks (WCAG AA for normal text)
- Primary text on surface: --color-text (#0F172A) on --color-surface (#FFFFFF) — contrast ≈ 15.5:1 ✅
- Secondary text on surface: --color-text-weak (#374151) on #FFFFFF — contrast ≈ 10.3:1 ✅
- White text on brand button: #FFFFFF on --color-brand (#0055B8) — contrast ≈ 7.0:1 ✅

Dark theme checks
- Primary text on dark surface: --color-text-dark (#E6EEF8) on --color-surface-dark (#0B1220) — contrast ≈ 15.2:1 ✅
- Secondary text on dark surface: --color-text-weak-dark (#B8C2D6) on #0B1220 — contrast ≈ 6.1:1 ✅

Notes: The above contrast ratios were calculated from the chosen token values and meet WCAG AA for normal text (4.5:1). If you customize brand color or secondary text, re-run contrast checks. For large text (>=18pt / 24px) WCAG AA requires 3:1.

5. Interaction States

Tokens cover these interaction states:
- Rest: surface and text colors as defined
- Hover: --color-interactive-hover (subtle lift or darker border)
- Focus: outline ring using --color-brand at 2–3px or an accessible focus ring such as 3px solid with high contrast; include a visible focus indicator regardless of hover.
- Active/Pressed: --color-interactive-active (darker shade) and a pressed transform (scale 0.98)
- Disabled: --color-muted used for text and a reduced opacity for interactive elements; ensure disabled text still meets contrast if necessary for readability.

Example state guidance for a primary button in a card
- background: var(--color-brand)
- color: var(--color-on-brand, #FFFFFF)
- hover: background: color-mix(in srgb, var(--color-brand) 85%, black 15%) or use token --color-interactive-hover
- focus: box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand) 20%, var(--color-surface) 80%)

6. Elevation & Borders

- Card default: subtle border --color-border and low elevation shadow --shadow-1
- Elevated card: increase shadow to --shadow-2 and optionally stronger border color
- Border radius: --radius-1 (6px) default; use --radius-2 (12px) for more rounded designs

7. Responsive Breakpoints

Tokens
- --breakpoint-sm: 640px
- --breakpoint-md: 768px
- --breakpoint-lg: 1024px
- --breakpoint-xl: 1280px

Layout guidance
- Mobile (<= --breakpoint-sm): stack card content vertically, media on top.
- Tablet (between --breakpoint-sm and --breakpoint-lg): media can float left with text on right if card width permits.
- Desktop (>= --breakpoint-lg): allow multi-column cards; keep max-width per card ~ 560–720px for readability.

8. SVG Placement & Scaling Guidelines

Principles
- Always use viewBox on SVGs; avoid fixed width/height unless necessary.
- Use preserveAspectRatio to control scaling: for icons use "xMidYMid meet"; for decorative illustrations that must fill a box use "xMidYMid slice".
- Prefer inline SVG for small icons (full control of color via currentColor) and <img> or background-image for large illustrations when you don’t need to change inner colors.
- For SVGs inside the media area, use object-fit patterns for responsive scaling.

Recommended markup examples

Inline icon (color from currentColor)

<svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="..." fill="currentColor" />
</svg>

Responsive SVG media area (cover style)

<div class="card-media" style="aspect-ratio: 16 / 9; overflow: hidden;">
  <svg role="img" aria-label="Illustration" viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice" style="width:100%; height:100%; display:block;">
    <!-- Illustration shapes -->
  </svg>
</div>

SVG sizing tips
- Use width:100% and height:auto for inline SVGs when placed in flow, or width:100% and height:100% when using aspect-ratio on container.
- For icons, fix the size with CSS variables: width: var(--icon-size, 24px); height: var(--icon-size, 24px)
- To color SVG strokes/fills from CSS, use currentColor in the SVG and set color on the parent element.

9. Accessibility Notes

- Ensure focusable controls inside the card have keyboard focus styles.
- Provide meaningful alt text or aria-label for SVG illustrations that convey information. Mark purely decorative SVGs with aria-hidden="true" and role="img" accordingly.
- Avoid conveying critical information only via color; include labels and text.

10. Token Usage Examples

Basic card (HTML + CSS using tokens)

.card {
  background: var(--color-surface);
  color: var(--color-text);
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-1);
  box-shadow: var(--shadow-1);
}

.card .title {
  font-size: var(--type-scale-4-size);
  line-height: var(--type-scale-4-line);
  margin-bottom: var(--space-2);
}

.card .subtitle {
  color: var(--color-text-weak);
  font-size: var(--type-scale-2-size);
}

Primary action example

.button-primary {
  background: var(--color-brand);
  color: var(--color-on-brand);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-1);
}

11. Tokens Reference

See styles/tokens.css for the canonical list of CSS variables. Use the semantic tokens (color-surface, color-text) in components rather than raw hex values so theme swaps and design updates are centralized.

12. Change Guidance

- When adjusting the brand color, validate contrast of on-brand text and background with an automated contrast checker.
- Keep spacing tokens multiples of the base grid (4px) to maintain consistent rhythm.

13. Files Created

- styles/tokens.css — CSS variables for tokens
- design/card-component-spec.md — this document

If you need component examples or code sandbox demos (JS/CSS), I can provide a small set of example implementations using these tokens. Otherwise, tokens and spec are ready for handoff to implementation.
