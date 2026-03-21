Design System Specification

Overview

This document defines the design tokens, breakpoints, component specifications, interaction states, accessibility guidance, CSS variable examples, and responsive mockups for the KĀDI multi-agent UI components. It is framework-agnostic and intended to be used by product, design, and engineering teams.

Contents
- Design tokens (colors, typography, spacing, elevation)
- Breakpoints
- Component specs: Card, Header, Avatar, StatsList, StatBar, Bio, Actions
- Interaction states (hover, focus, active, disabled)
- Accessibility and ARIA guidance
- CSS variable examples and recommended type scale
- Responsive mockups (SVG) for mobile, tablet, desktop (files included in repo)

Design Tokens

Color tokens (use existing palette names — do not add conflicting tokens)
- --color-primary: #0b63ff  /* primary interactive */
- --color-primary-600: #084fd1
- --color-secondary: #7c3aed
- --color-surface: #ffffff
- --color-bg: #f7fafc
- --color-muted: #6b7280
- --color-text: #111827
- --color-on-primary: #ffffff
- --color-border: #e5e7eb
- --color-danger: #ef4444
- --color-success: #10b981

Notes: The above tokens map to the project's palette names. Do not create new palette entries that conflict with these names. If a token is already defined in your codebase with slightly different hex, prefer the project canonical value.

Typography & Type Scale

Recommended CSS variables and scale (modular scale 1.2):
- --font-family-base: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial
- --font-weight-regular: 400
- --font-weight-medium: 500
- --font-weight-bold: 700
- --type-xs: 12px   /* 0.56rem */
- --type-sm: 14px   /* 0.78rem */
- --type-md: 16px   /* 1rem */
- --type-lg: 18px   /* 1.125rem */
- --type-xl: 20px   /* 1.25rem */
- --type-2xl: 24px  /* 1.5rem */
- --type-3xl: 32px  /* 2rem */

Line heights and letter spacing (examples):
- --leading-tight: 1.15
- --leading-normal: 1.4
- --tracking-normal: 0

Spacing / Layout Tokens
- --space-xxs: 4px
- --space-xs: 8px
- --space-sm: 12px
- --space-md: 16px
- --space-lg: 24px
- --space-xl: 32px
- --space-xxl: 48px

Elevation & Borders
- --radius-sm: 6px
- --radius-md: 12px
- --elevation-1: 0 1px 2px rgba(2,6,23,0.06)
- --elevation-2: 0 4px 12px rgba(2,6,23,0.08)

Breakpoints (responsive)
- mobile: 0 - 599px (base)
- tablet: 600px - 1023px
- desktop: 1024px and up

CSS variable example

:root {
  --color-primary: #0b63ff;
  --color-secondary: #7c3aed;
  --color-surface: #ffffff;
  --color-bg: #f7fafc;
  --color-text: #111827;
  --color-muted: #6b7280;
  --radius-md: 12px;
  --space-md: 16px;
  --type-md: 16px;
  --font-family-base: Inter, system-ui, -apple-system, "Segoe UI", Roboto;
}

Component Specifications

General rules
- All components should be responsive and reflow between breakpoints using the spacing and type tokens above.
- Use CSS variables for colors, spacing, and typography to keep components themeable.
- Keep components semantic (native elements where possible) and provide ARIA guidance below.

1) Card
- Purpose: container for a compact user profile with stats and actions.
- Anatomy: surface background, header row (avatar + title + subtitle), stats area, bio, action row
- Default (desktop): width: 360px (can expand to 100% in responsive contexts), padding: var(--space-md), border-radius: var(--radius-md), background: var(--color-surface), box-shadow: var(--elevation-1)
- Spacing: gap between sections: var(--space-md)
- Typography: title: --type-lg / 600, subtitle: --type-sm / 400
- Border: 1px solid var(--color-border)

States
- hover: elevate to --elevation-2, border-color: rgba(11,99,255,0.12)
- focus (keyboard): outline: 3px solid rgba(11,99,255,0.12) or use an inset focus ring; use :focus-visible for keyboard-only outlines
- active: slightly reduce transform: scale(0.995) and reduce shadow
- disabled: opacity: 0.6, pointer-events: none

Accessibility
- If Card is interactive, use role="button" or an anchor element. Provide aria-label or include accessible text content. Make tab-focusable (tabindex=0) if not a native control.

2) Header
- Purpose: top area for name, role and optional action (e.g., follow)
- Layout: left-aligned avatar (40px mobile, 56px desktop) + content column (title + subtitle) + actions aligned right
- Title: --type-lg / 700, Subtitle: --type-sm / 400, color muted
- Spacing: avatar and text gap: var(--space-sm)

3) Avatar
- Purpose: user identity mark. Prefer SVG assets (do not include raster avatars). Design system must provide mono and colored variants.
- Sizes: mobile: 40px, tablet: 48px, desktop: 56px
- Shape: circle (border-radius: 50%)
- Border: 1px solid var(--color-border) or ring on focus
- Accessibility: include alt text (img alt="Avatar of Jane Doe") or use aria-hidden if decorative. If the avatar is interactive, ensure keyboard focus and aria-label describing action.

4) StatsList
- Purpose: show small key-value statistics (e.g., Followers, Following, Posts)
- Layout: horizontal list on desktop, wrap into 2+ rows on mobile if needed
- Item typography: value: --type-md / 600, label: --type-sm / 400, color-muted
- Spacing: gap: var(--space-sm)

5) StatBar
- Purpose: visual representation (progress-like) for a stat (e.g., completion)
- Size: height: 8px (--space-xs), border-radius: 999px for pill
- Background: var(--color-border), fill: var(--color-primary)
- Accessibility: include aria-valuenow, aria-valuemin, aria-valuemax on the outer element (role="progressbar" or an HTML progress element). Also include an accessible text label.

6) Bio
- Purpose: short descriptive text
- Typography: --type-sm, leading: --leading-normal
- Truncation: allow two lines by default with an option to expand; if truncating, provide an accessible "Read more" control (aria-controls + aria-expanded)

7) Actions
- Primary action button (Follow / Message): background: var(--color-primary), color: var(--color-on-primary), padding: 8px 16px, border-radius: 8px, font-weight: 600
- Secondary action: outline button: background: transparent, border: 1px solid var(--color-border), color: var(--color-text)
- Icon-only actions: 40px touch target at minimum (WAI-ARIA touch target guidance)
- Spacing: actions gap: var(--space-sm)

Interaction states (buttons & interactive elements)
- Hover: for primary, background: var(--color-primary-600); for outline, border-color: rgba(17,24,39,0.08) and background: rgba(17,24,39,0.02)
- Focus: 3px ring with high contrast (use color derived from --color-primary with 12% alpha) and visible focus indicator for keyboard users
- Active: translateY(1px) or scale(0.995), reduce shadow
- Disabled: opacity: 0.48, pointer-events: none, cursor: not-allowed

Accessibility & ARIA Patterns
- Keyboard navigation: All interactive elements must be reachable via Tab and actionable via Enter/Space. Use :focus-visible to show focus styles only for keyboard users.
- Roles and states:
  - Buttons: use <button> or role="button" with tabindex=0. Use aria-pressed for toggle buttons.
  - StatBar: role="progressbar" with aria-valuemin="0", aria-valuemax="100", aria-valuenow="X"
  - Collapsible Bio: button that toggles content must have aria-controls="#bio-details" and aria-expanded="false|true"
  - Avatar as link: if avatar links to profile, use <a href> with descriptive link text or aria-label
- Color contrast: Ensure text contrast ratios meet WCAG AA (4.5:1 for normal text, 3:1 for large text). Use color tokens that satisfy these ratios. For small text on colored backgrounds use higher contrast or increase size/weight.
- Motion: respect prefers-reduced-motion. Avoid heavy parallax/scroll-based animations; for transitions use prefers-reduced-motion: reduce to zero-duration or simple cross-fade.

Reduced-motion suggestion
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
}

Accessibility testing checklist
- Tab order is logical and predictable
- All non-decorative images have alt text
- Focus states visible and meet contrast
- Contrast ratios verified for all text sizes
- ARIA attributes used only when necessary and tested with a screen reader

SVG assets and rules
- Provide monochrome and colored variants for each avatar/icon.
- Prefer viewBox-based SVGs and avoid hard-coded width/height unless needed for pixel-accurate export.
- Use consistent naming conventions and include metadata in SVG title/desc tags.

Mockups and Wireframes (in repo)
- mockups/mockup-mobile.svg
- mockups/mockup-tablet.svg
- mockups/mockup-desktop.svg

Each mockup includes layout annotations for spacing and typography. They are vector SVG files so they can be scaled and inspected.

Developer Handoff Tips
- Export tokens as CSS variables or as JSON for design-tool integrations (Figma tokens plugin) and ensure variable names match the codebase tokens where possible.
- For theme overrides (dark mode), map variables to alternative values rather than creating entirely new components.
- Provide example HTML structure for Card (non-framework):

<div class="card" role="article" aria-label="Profile card for Jane Doe">
  <header class="card__header">
    <img src="/icons/avatar-jane.svg" alt="Jane Doe" class="avatar">
    <div class="card__title">Jane Doe</div>
    <div class="card__subtitle">Product Designer</div>
    <div class="card__actions">...</div>
  </header>
  <section class="card__stats">...</section>
  <section class="card__bio" id="bio-details">Short bio text...</section>
  <footer class="card__footer">Action buttons</footer>
</div>

Tokens Summary Table (reference)
- Colors: primary, secondary, surface, bg, text, muted, border, on-primary, danger, success
- Typography: type-xs..3xl, leading-normal, font-family-base
- Spacing: --space-xxs..xxl
- Radius & elevation: --radius-sm, --radius-md, --elevation-1..2

Files added
- design-spec.md (this document)
- svg-guidelines.md (SVG export & artist guidance)
- mockups/mockup-mobile.svg
- mockups/mockup-tablet.svg
- mockups/mockup-desktop.svg

If you need additional component states, interactive prototypes, or Figma tokens export, I can prepare those next.
