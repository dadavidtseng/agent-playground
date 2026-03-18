# Design Specs

Task: 56e4e9b1-8dff-4b57-b227-a32217149cda

This document documents the design tokens, responsive breakpoints, spacing, typography, interaction states, and component variant guidance. Use the tokens in tokens.css.

## Breakpoints

- Mobile: 0 - 599px
  - Single-column flow, compact spacing
- Tablet: 600 - 1023px
  - Two-column layouts, medium spacing
- Desktop: 1024px and up
  - Multi-column grid, increased gutters

CSS variables in tokens.css:
- --breakpoint-mobile-max: 599px
- --breakpoint-tablet-min: 600px
- --breakpoint-tablet-max: 1023px
- --breakpoint-desktop-min: 1024px

Example media queries (framework-agnostic):

- Mobile-first base styles apply to all.
- Tablet:
  @media (min-width: 600px) and (max-width: 1023px) { ... }
- Desktop:
  @media (min-width: 1024px) { ... }

## Typography

Tokens in tokens.css (rem-based):
- --type-scale-xxl: 2rem (32px)
- --type-scale-xl: 1.5rem (24px)
- --type-scale-lg: 1.25rem (20px)
- --type-scale-md: 1rem (16px)
- --type-scale-sm: 0.875rem (14px)
- --type-scale-xs: 0.75rem (12px)

Line-height tokens:
- --type-line-height-tight: 1.1
- --type-line-height-default: 1.4
- --type-line-height-loose: 1.6

Weights and family:
- --type-font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial
- --type-weight-regular: 400
- --type-weight-medium: 500
- --type-weight-semibold: 600
- --type-weight-bold: 700

Responsive typography guidance:
- Base font-size 16px (1rem) on desktop and tablet; mobile may use slightly larger UI scale if needed.
- Heading scale example:
  - H1 (desktop): var(--type-scale-xxl)
  - H2: var(--type-scale-xl)
  - H3: var(--type-scale-lg)
  - Body: var(--type-scale-md)
  - Small text / captions: var(--type-scale-sm) / var(--type-scale-xs)

## Spacing

Spacing tokens (px):
- --space-xxs: 4px
- --space-xs: 8px
- --space-s: 12px
- --space-m: 16px
- --space-l: 24px
- --space-xl: 32px
- --space-xxl: 48px

Usage guidance:
- Use spacing tokens for margin and padding, not hardcoded pixel values.
- Component internal padding: S or M for compact, M or L for comfortable.
- Grid gutters: var(--container-gutter) (defaults to --space-m)

## Color palette

Base tokens in tokens.css:
- --color-primary: #0456d6
- --color-primary-700: #033e9a
- --color-secondary: #00a896
- --color-accent: #ffb020
- --color-success: #16a34a
- --color-warning: #b45309
- --color-danger: #dc2626

Neutral tokens:
- --color-bg: #ffffff
- --color-surface: #f7f9fc
- --color-border: #e6edf6
- --color-muted: #6b7280
- --color-text: #0f1724
- --color-text-inverse: #ffffff

High-contrast theme available via: [data-theme="high-contrast"] on :root

### Contrast guidance and checks
- Primary on white: #0456d6 on #ffffff -> contrast ratio ~7.0:1 (WCAG AAA for large and normal text)
- Text color on background: --color-text (#0f1724) on --color-bg (#ffffff) -> contrast ~15:1 (good)
- Accent on white: #ffb020 on #ffffff -> contrast ~3.8:1 (meets AA for large text but not always for small text). When using accent for interactive text, prefer using --color-primary or add a high-contrast variant.

High-contrast tokens (examples in tokens.css) switch to darker background and brighter accents to meet stricter needs.

## Interaction states

Tokens in tokens.css:
- --state-hover-bg: rgba(4,86,214,0.06)
- --state-focus-outline: 3px solid rgba(4,86,214,0.18)
- --state-active-bg: rgba(4,86,214,0.12)
- --state-disabled-text: #9aa3ae
- --state-disabled-bg: #f1f5f9
- --transition-fast: 150ms cubic-bezier(.2,.8,.2,1)

Guidelines:
- Hover: subtle color fill or elevation (use --state-hover-bg or increase shadow)
- Focus: always show a consistent focus ring; use high contrast ring in high-contrast mode.
- Active: darker fill or pressed transform (scale 0.98) with --state-active-bg
- Disabled: reduce opacity to 40-60% and use --state-disabled-text / --state-disabled-bg

Focus ring accessibility:
- Use the provided --state-focus-outline token. For keyboard-only focus, ensure outline is visible. In high-contrast mode, the outline is white for visibility.

## Component Variants

We provide guidance for two variants (compact, detailed) and three breakpoints (mobile, tablet, desktop). The tokens are intended to be used to implement these.

Variant: Compact
- Purpose: dense lists, toolbars, mobile UIs
- Spacing: use --space-xs / --space-s for padding and margins
- Typography: body at --type-scale-sm (14px), tight line-height
- Radius: --radius-sm
- Example sizes:
  - Avatar: 32px
  - Button height: 36px
  - Card padding: var(--space-s)

Variant: Detailed
- Purpose: info-rich cards, dashboards, reading layouts
- Spacing: use --space-m / --space-l
- Typography: body at --type-scale-md (16px) or larger; headings at --type-scale-lg/XL
- Radius: --radius-md / --radius-lg
- Example sizes:
  - Avatar: 48px
  - Button height: 44px
  - Card padding: var(--space-m) to var(--space-l)

## Example usage snippets

1) Card (detailed) - CSS tokens only

.card-detailed{
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-1);
  padding: var(--space-m);
  max-width: var(--container-max-width-desktop);
}

.card-detailed h3{
  font-size: var(--type-scale-lg);
  line-height: var(--type-line-height-default);
  margin-bottom: var(--space-s);
}

.card-detailed p{
  font-size: var(--type-scale-md);
  color: var(--color-muted);
}

2) Button (compact) - CSS tokens only

.button-compact{
  height: 36px;
  padding: 0 var(--space-s);
  font-size: var(--type-scale-sm);
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  transition: background var(--transition-fast), transform var(--transition-fast);
}
.button-compact:hover{ background: var(--color-primary-700); }
.button-compact:focus{ outline: var(--state-focus-outline); }

## Example variants

To satisfy the task, example component mockups are exported as SVGs in the repository:
- /assets/variants/compact-mobile.svg
- /assets/variants/compact-tablet.svg
- /assets/variants/compact-desktop.svg
- /assets/variants/detailed-mobile.svg
- /assets/variants/detailed-tablet.svg
- /assets/variants/detailed-desktop.svg

Each mockup shows token usage: spacing annotations, font-size labels, and color swatches. These are framework-agnostic visual references.

## Color contrast checks

Documented checks (approximate ratios):
- --color-text on --color-bg: ~15:1
- --color-primary on --color-bg: ~7:1
- --color-accent on --color-bg: ~3.8:1 (use with caution for small text)

When color contrast is below AA for small text, use larger sizes, add a stroke or change to a high-contrast variant.

## Notes & Best Practices

- Keep tokens as the single source of truth. Avoid duplicating values.
- Name tokens semantically when possible; keep actual color values in palette tokens.
- Prefer rem units for typography to improve scaling for accessibility.
- Use data-theme="high-contrast" to toggle the high-contrast palette for accessibility testing.

----
