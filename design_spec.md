Design Specification — KĀDI Designer Agent Deliverable

Task ID: 6989487c-69d7-4c88-9a45-49bc63e76efc

Overview

This document provides a framework-agnostic design specification and token reference for use by developers. It contains:
- CSS variable token table (all variables use --cc- prefix)
- Spacing scale (8px multiples)
- Typography scale
- Color palette with semantic tokens
- Responsive layout rules for three breakpoints (mobile / tablet / desktop)
- Interaction state visuals (hover, active, disabled, focus)
- Example snippets showing how to consume tokens using BEM conventions
- Links to static mockups (assets/mockups)

Note: All token names are prefixed with "--cc-" to match the project verification checklist.

1) CSS Variable Token Table (summary)

Colors (semantic)
- --cc-color-primary: #0A84FF           /* Primary brand color */
- --cc-color-primary-contrast: #FFFFFF  /* Text/icon contrast on primary */
- --cc-color-secondary: #5E5CE6         /* Secondary brand color */
- --cc-color-accent: #FF6B6B            /* Accent/alerts */
- --cc-color-background: #F7F8FA        /* App background */
- --cc-color-surface: #FFFFFF           /* Cards, surfaces */
- --cc-color-border: #E6E7EB            /* Dividers */
- --cc-color-text: #0B1220              /* Primary text */
- --cc-color-text-muted: #6B7280        /* Muted text */
- --cc-color-success: #22C55E
- --cc-color-warning: #F59E0B
- --cc-color-danger: #EF4444
- --cc-color-focus: #B6D4FF             /* Focus ring color */
- --cc-color-disabled: #CBD5E1

Spacing scale (8px multiples)
- --cc-space-0: 0px
- --cc-space-1: 8px
- --cc-space-2: 16px
- --cc-space-3: 24px
- --cc-space-4: 32px
- --cc-space-5: 40px
- --cc-space-6: 48px
- --cc-space-7: 64px
- --cc-space-8: 96px

Typography (base: 16px)
- --cc-font-family-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial
- --cc-font-weight-regular: 400
- --cc-font-weight-medium: 500
- --cc-font-weight-semibold: 600
- --cc-font-size-xxs: 0.625rem   /* 10px */
- --cc-font-size-xs: 0.75rem     /* 12px */
- --cc-font-size-sm: 0.875rem    /* 14px */
- --cc-font-size-md: 1rem        /* 16px */
- --cc-font-size-lg: 1.125rem    /* 18px */
- --cc-font-size-xl: 1.25rem     /* 20px */
- --cc-font-size-2xl: 1.5rem     /* 24px */
- --cc-line-height-sm: 1.2
- --cc-line-height-md: 1.4
- --cc-line-height-lg: 1.6

Radii & elevations
- --cc-radius-sm: 4px
- --cc-radius-md: 8px
- --cc-radius-lg: 16px
- --cc-elevation-1: 0 1px 2px rgba(11,18,32,0.04)
- --cc-elevation-2: 0 4px 12px rgba(11,18,32,0.08)

2) Responsive breakpoints & layout rules

Breakpoints (three primary):
- mobile: up to 599px                 (mobile-first)
- tablet: 600px to 1023px
- desktop: 1024px and up

CSS variable names for breakpoints:
- --cc-breakpoint-mobile: 599px
- --cc-breakpoint-tablet: 1023px
- --cc-breakpoint-desktop: 1024px

Container width guidance (max widths for central content):
- mobile: 100% (fluid)
- tablet: max-width 720px (centered; margin: 0 auto)
- desktop: max-width 1120px (centered)

Layout spacing rules
- Base gutter (horizontal) = --cc-space-2 (16px) on mobile; increases to --cc-space-3 (24px) on tablet and --cc-space-4 (32px) on desktop.
- Column system: use a flexible 12-column grid at >= tablet; on mobile prefer single column.
- Vertical rhythm: use multiples of the spacing scale for stacking components (16px/24px/32px).

3) Interaction states (visuals)

Design tokens for states
- --cc-state-hover: rgba(10,132,255,0.08)    /* subtle overlay for hover */
- --cc-state-active: rgba(10,132,255,0.12)   /* active overlay */
- --cc-state-focus-ring: 2px solid var(--cc-color-focus)
- --cc-state-disabled: var(--cc-color-disabled)

Button example visuals
- Default: background: var(--cc-color-primary); color: var(--cc-color-primary-contrast)
- Hover: background: color-mix(in srgb, var(--cc-color-primary) 85%, black 15%) OR overlay using --cc-state-hover
- Active: background: color-mix(in srgb, var(--cc-color-primary) 75%, black 25%) OR overlay using --cc-state-active
- Disabled: background: var(--cc-color-disabled); color: var(--cc-color-text-muted); pointer-events: none; opacity: 0.6
- Focus: add outline: var(--cc-state-focus-ring) and box-shadow: 0 0 0 4px rgba(11,122,255,0.12)

Input / focus rules
- Input border: 1px solid var(--cc-color-border)
- Input focus: border-color: var(--cc-color-primary); box-shadow: 0 0 0 4px rgba(10,132,255,0.12)
- Validation states: success border: var(--cc-color-success), danger: var(--cc-color-danger)

4) Example consumption snippets (BEM naming)

Example — button (BEM):

Block: cc-button
- .cc-button { display: inline-flex; align-items: center; justify-content: center; gap: var(--cc-space-1); padding: var(--cc-space-1) var(--cc-space-2); border-radius: var(--cc-radius-md); font-family: var(--cc-font-family-sans); font-weight: var(--cc-font-weight-medium); font-size: var(--cc-font-size-md); }
- .cc-button--primary { background: var(--cc-color-primary); color: var(--cc-color-primary-contrast); border: none; }
- .cc-button--primary:hover { background: color-mix(in srgb, var(--cc-color-primary) 88%, black 12%); }
- .cc-button--primary:active { transform: translateY(1px); }
- .cc-button--disabled { background: var(--cc-color-disabled); color: var(--cc-color-text-muted); pointer-events: none; opacity: 0.7; }
- .cc-button:focus { outline: none; box-shadow: 0 0 0 4px rgba(11,122,255,0.12); }

Example — card (BEM):
- .cc-card { background: var(--cc-color-surface); border-radius: var(--cc-radius-md); box-shadow: var(--cc-elevation-1); padding: var(--cc-space-3); border: 1px solid var(--cc-color-border); }

5) Tokens CSS (reference):
See tokens.css in the repository root. It contains the authoritative :root variables and a few helper classes for reference and visual tests.

6) Accessibility notes
- Maintain contrast ratios: primary text on surface should meet WCAG AA where possible (>= 4.5:1 for small text). Adjust color tokens as needed.
- Focus rings must be visible for keyboard users; do not remove outlines without replacing them with visible focus styles.
- Disabled controls should be perceivable: use both reduced contrast and aria-disabled for assistive tech.

7) Mockups (static assets)
- assets/mockups/mockup-mobile.svg  — annotated mobile layout (375x812)
- assets/mockups/mockup-tablet.svg  — annotated tablet layout (768x1024)
- assets/mockups/mockup-desktop.svg — annotated desktop layout (1366x768)

Each mockup shows a simple app header, primary card list, and a footer/action area. They are intentionally minimal and annotated so developers can replicate spacing and component scale.

8) Verification checklist (for reviewers)
- design_spec.md contains CSS variable table with --cc- tokens for colors, spacing, and typography.  — yes
- tokens.css file is present and valid CSS with default values.  — yes
- Mockups/screenshots for mobile, tablet, and desktop are included under assets/mockups.  — yes
- Interaction state examples are present in the Interaction section and tokens.css.  — yes

If you need alternate color variants (dark theme) or additional component specs (forms, tables, toast system), request a follow-up task and I will extend the token set and add dark-mode tokens (--cc-dark-...).

End of document.
