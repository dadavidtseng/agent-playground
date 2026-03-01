Character Profile Card — Component Specification

Overview

This document describes the design system and component spec for the Character Profile Card used across the product. It includes tokens, anatomy, breakpoints, responsive rules, interaction states, accessibility notes and example usage for handoff to engineering and art.

Files
- tokens.css — CSS variables for typography, spacing, colors, motion, and component-level tokens.
- examples/character-card.css — example component CSS that consumes tokens.
- examples/character-card.html — HTML snippets for single card and responsive grid (mobile/tablet/desktop).

Anatomy

Card (root) — .char-card
- Surface: visual container with background, border, radius, shadow.
- Header row: contains Avatar + primary info
  - Avatar: circular SVG or inline <svg> (use color tokens, no raster)
  - Name: primary title
  - Role / Tagline: secondary text
- Body: stats + description
  - Stat rows: visual bars + numeric values
    - HP, Attack, Defense, Speed — each with a label, a stat bar, and a numeric value.
    - Data attributes: data-hp, data-attack, data-defense, data-speed on .char-card element (normalized to 0-100 scale recommended)
  - Description: short paragraph (flavor text)
- Footer (actions): CTA buttons (primary) and tertiary actions

Class & data-attribute schema

.char-card (role="group")
  data-hp="82" data-attack="64" data-defense="48" data-speed="95"

.child elements
- .char-avatar
- .char-name
- .char-role
- .char-stats
  - .char-stat (modifier: --hp, --attack, --defense, --speed)
    - [.char-stat__label]
    - [.char-stat__bar]
    - [.char-stat__value]
- .char-desc
- .char-actions

Breakpoints

Breakpoint tokens (logical):
- Mobile: 0 — 599px (default stacked layout)
- Tablet: 600px — 1023px (two-column-ish / medium avatar)
- Desktop: 1024px+ (compact, horizontal layout, larger avatar)

Responsive rules
- Mobile: card width: 100% (max-width: var(--card-max-width) if constrained by container), vertical stack. Avatar centered.
- Tablet: card uses grid with header columns: avatar (left) + info (right). Avatar medium size (--avatar-size-md).
- Desktop: horizontal layout with actions aligned right; avatar large (--avatar-size-lg); stats shown inline or with compact spacing.

Interaction states

Card-level
- Default: background var(--color-surface), border var(--color-border), radius var(--radius-md), shadow var(--elevation-1)
- Hover: translateY(-4px), box-shadow increases to var(--elevation-2), border-color shifts to --color-accent-300
- Focus (keyboard accessible): outline: 3px solid color-accent (use outline-offset), or focus ring using box-shadow with --color-accent
- Active (mouse down): translateY(0) scale down slightly (0.995), shadow reduces
- Disabled: reduced opacity (0.6), pointer-events: none, border color --color-disabled, background --color-muted

Button states (primary/tertiary)
- Hover: background shade darken by using --color-accent-600 for primary
- Focus: 2px ring in --color-accent-300
- Disabled: background --color-disabled; text muted

Stat bars
- Use background track: var(--color-muted) or rgba for subtle
- Fill bar uses semantic color --color-hp, --color-attack, etc.
- Fill transition: width ease var(--motion-medium) and gentle color transition

Accessibility & Contrast
- Body text token --color-text (#0B1A2A) on --color-bg (#FFFFFF) yields contrast ≈ 15.5:1 (meets WCAG AAA for normal text)
- Secondary text --color-text-muted (#475569) on white ≈ 6.6:1 (meets WCAG AA)
- Stat bar clear labeling: include aria-labels on stat bar containers and numeric values. Example: <div class="char-stat" role="group" aria-label="HP: 82">.
- Provide text alternatives for decorative SVGs (aria-hidden) and ensure interactive elements have keyboard focus states.

Implementation details

- Data attributes: store raw stat numbers 0-100 for each stat on the .char-card: data-hp, data-attack, data-defense, data-speed. CSS width for stat fill is applied inline with style="width: 82%" or via small JS that reads data attributes and sets :style on .char-stat__fill. Keep CSS-only fallback: show numeric values besides bars.

- Prefer using CSS variables for colors and sizes. Avoid hard-coded hexes in components; instead reference tokens in tokens.css.

Example token usage

:root { --avatar-size-md: 84px; }
.char-avatar { width: var(--avatar-size-md); height: var(--avatar-size-md); }

File: examples/character-card.css
- Example styling that consumes tokens (keeps plain CSS)

File: examples/character-card.html
- Snippets for single card (mobile) and responsive grid (3 columns desktop, 2 tablet)
- Data attribute usage example

WCAG Contrast notes
- All primary body text tokens were chosen to meet at least WCAG AA (4.5:1). The token list in tokens.css documents calculated approximate ratios. Designers and engineers should verify with updated palette changes.

Handoff checklist
- tokens.css included
- component-spec.md (this document)
- example code (CSS + HTML) placed in examples/ folder
- Post-handoff: engineering to implement small JS to map data attributes to stat-bar widths; artists to provide SVG avatar components using color tokens for fills/strokes

Design Rationale
- Modular scales and 8px spacing ensure rhythm and predictable layouts.
- Semantic color tokens for stats allow consistent mapping across UI and animations.
- Accessibility-first token choices (high contrast defaults) to reduce rework.

Contact
- Design Lead: @design-lead (review & signoff required)
