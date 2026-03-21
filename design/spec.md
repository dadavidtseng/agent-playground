Design tokens for Game Character Profile Card

This file documents the design tokens used by the demo. Tokens are exported as CSS variables in design/tokens.css. Do not hardcode values in demo styles; use the CSS variables below.

Color tokens

- --color-bg: background color for the page and card background
- --color-surface: card surface color
- --color-accent: accent / primary color used for highlights and stat bars
- --color-muted: subdued text / secondary color
- --color-success: used for health-like stats
- --color-text: primary text color

Spacing & sizing

- --space-1 .. --space-6: spacing scale
- --radius-1: border-radius for cards and buttons
- --card-width: preferred card max width

Typography

- --font-sans: system UI stack for headings and body
- --font-mono: monospace font for stat numbers
- --font-size-base: base font-size
- --font-size-sm: small font-size
- --line-height-base: base line height

Motion

- --motion-fast: short animation duration
- --motion-medium: medium animation duration

Token values are defined in design/tokens.css and consumed by demo/styles.css.
