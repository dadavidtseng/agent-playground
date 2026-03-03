KĀDI Design Tokens

Overview

This file documents the machine-readable design tokens used by projects within the KĀDI system. The canonical JSON tokens live in tokens.json at the same location (/design/tokens.json). Use these tokens to keep colors, typography, breakpoints, and motion consistent across applications.

Structure

- colors: Contains light and dark palettes. Keys are CSS variable names (for example --color-primary-500) and values are hex colors.
- typography: Maps token names (--type-xs .. --type-xxl) to font-size, line-height, and font-weight.
- breakpoints: Device breakpoints and CSS variable names for responsive rules.
- motion: Durations and easing curves for animations.

Usage

CSS / SCSS

Import tokens.json into your build system, or copy variables into a :root block.

Example (CSS variables):

:root {
  --color-primary-500: #0B5FFF;
  --color-background: #FFFFFF;
  --type-md-font-size: 16px;
}

[data-theme="dark"] {
  --color-primary-500: #4DA0FF; /* dark variant */
  --color-background: #0B0F14;
}

Typography

Tokens: --type-xs, --type-sm, --type-md, --type-lg, --type-xl, --type-xxl
Each token contains fontSize, lineHeight, and fontWeight. Use them in CSS like:

.example-text {
  font-size: var(--type-md-font-size, 16px);
  line-height: var(--type-md-line-height, 24px);
  font-weight: var(--type-md-font-weight, 400);
}

Breakpoints

Tokens: --breakpoint-mobile (480px), --breakpoint-tablet (768px), --breakpoint-desktop (1024px)
Use in media queries:

@media (min-width: 768px) {
  .layout { padding: 24px; }
}

Motion

Duration tokens: --motion-duration-fast (150ms), --motion-duration-medium (300ms), --motion-duration-slow (500ms)
Easing tokens: --motion-ease-standard, --motion-ease-decelerate, --motion-ease-accelerate
Use in transitions:

.element { transition: opacity var(--motion-duration-medium) var(--motion-ease-standard); }

Notes & Conventions

- Token names in tokens.json match the names referenced in the project spec (spec.md). Colors include both light and dark variants; preference is to define a [data-theme] or .theme--dark selector to swap values.
- The JSON file is intended to be consumed by build tools (style-dictionary, tokens-transform) or imported directly in JS/TS to map to CSS variables at runtime.
- Keep tokens stable; if changing token names, update spec.md references to maintain verification.

Reference

Canonical machine file: /design/tokens.json
Spec source: ./spec.md
