Design System Spec — Task 03be9069-ec81-4f9e-a6a1-57ea81c5bbe5

Overview

This document summarizes the core design tokens, breakpoints, grid, spacing, typography, color tokens (light + dark), interaction states, motion, accessibility guidance, and component variants for the project. All token names use a simple, consistent naming scheme suitable for translation into CSS custom properties, JSON tokens, or your favorite design token tooling.

Font stack

System UI stack (use exactly):
- -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"

Summary for engineers

- Breakpoints: mobile-first. Tokens: bp-xs, bp-sm, bp-md, bp-lg, bp-xl.
- Grid: 12-column responsive grid with gutter tokens.
- Spacing: spacing-1..spacing-8 (scale 4px base)
- Typography: type-xxs..type-hero with sizes & line-heights as tokens
- Colors: semantic tokens (primary, background, surface, text, muted, success, danger, warning) with light/dark variants. All hex values are listed in the tokens table below.

Breakpoints

- bp-xs: 0px (base / mobile)
- bp-sm: 480px (small phones)
- bp-md: 768px (tablets)
- bp-lg: 1024px (desktop)
- bp-xl: 1280px (large screens)

Designer notes: use mobile-first responsive CSS. Where necessary, collapse complex chrome at bp-md and above.

Grid

- Columns: 12
- Container max-widths:
  - bp-sm: 100% (fluid)
  - bp-md: 720px
  - bp-lg: 1024px
  - bp-xl: 1280px
- Gutter (horizontal spacing between columns): grid-gutter: 16px (spacing-4)
- Column gap: grid-column-gap: 16px
- Side padding on container: container-padding: 16px (spacing-4) mobile, 24px (spacing-6) at bp-md+

Spacing tokens (4px base)

- spacing-1: 4px
- spacing-2: 8px
- spacing-3: 12px
- spacing-4: 16px
- spacing-5: 24px
- spacing-6: 32px
- spacing-7: 48px
- spacing-8: 64px

Typography scale (system UI stack)

- type-xxs: 10px / 14px (line-height)
- type-xs: 12px / 16px
- type-sm: 14px / 20px
- type-base: 16px / 24px
- type-lg: 18px / 28px
- type-xl: 20px / 30px
- type-2xl: 24px / 34px
- type-3xl: 32px / 42px
- type-hero: 40px / 52px

Token examples for typography:
- font-family-system: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
- font-weight-regular: 400
- font-weight-medium: 500
- font-weight-bold: 700

Color tokens

We provide semantic tokens with hex values for light and dark modes. Token names follow: color.<semantic>.<mode> where mode is light or dark. Additionally, a neutral scale is provided for surfaces and text.

Colors table (tokens, hex, contrast notes)

| Token name | Hex value | Contrast notes |
|------------|----------:|----------------|
| color.primary.light | #0B63FF | 4.9:1 against white? (use on white surface as primary button fill) |
| color.primary.dark  | #66A3FF | 3.8:1 against #0B63FF (use for highlights in dark mode) |
| color.background.light | #FFFFFF | base background — AA compliant with text-primary at >= 4.5:1 |
| color.background.dark  | #0B0B0D | base dark background |
| color.surface.light    | #F5F7FA | card and surface background — contrast vs text-primary: 15.8:1 |
| color.surface.dark     | #111215 | surface dark — use elevated surfaces with subtle borders |
| color.text.primary.light | #0B1225 | primary text on light surfaces — 15.3:1 on #FFFFFF |
| color.text.primary.dark  | #E6EDF3 | primary text on dark surfaces — 14.6:1 on #0B0B0D |
| color.text.muted.light   | #5B6776 | secondary/muted text on light surfaces |
| color.text.muted.dark    | #9AA6B2 | muted text on dark surfaces |
| color.success.light      | #0F9D58 | success / positive state |
| color.success.dark       | #34BA7B |
| color.danger.light       | #D64545 | error / critical |
| color.danger.dark        | #FF7B7B |
| color.warning.light      | #FFB020 | warning / caution |
| color.warning.dark       | #FFCF66 |
| color.border.light       | #E6EAF0 | dividers, subtle borders |
| color.border.dark        | #1C2329 |
| color.focus.light        | #0066FF | use for focus ring on light mode (4px outline recommended) |
| color.focus.dark         | #66A3FF | focus ring in dark mode |

Contrast notes: primary text tokens listed above meet WCAG AA on their intended backgrounds. For any new color usage, verify with contrast-check tooling.

Interaction states (tokens)

- state.hover.background: slightly darkened/brightened version of the fill token (suggest 8-12% shift)
- state.active.background: stronger shift (12-18%)
- state.focus.outline: color.focus (see tokens) with 3-4px visible ring on focus
- state.disabled.opacity: 0.32 (apply to foreground elements) and color.border.disabled: color.border.light with higher transparency

Examples (button primary):
- color.button.primary.bg: color.primary.light
- color.button.primary.bg.hover: #074fdb (approx darken 10%)
- color.button.primary.text: #FFFFFF
- color.button.primary.bg.disabled: rgba(11,99,255,0.24)

Motion and transitions

Motion tokens:
- motion.duration.fast: 120ms
- motion.duration.normal: 240ms
- motion.duration.slow: 360ms
- motion.easing.standard: cubic-bezier(0.2, 0.8, 0.2, 1)
- motion.easing.enter: cubic-bezier(0, 0, 0.2, 1)
- motion.easing.exit: cubic-bezier(0.4, 0, 1, 1)

Usage guidance: keep motion subtle; prefer opacity + translateY in entrance animations for performance. Respect user preferences for reduced motion (prefers-reduced-motion: reduce should map durations to 0 and avoid translations).

Accessibility notes

Keyboard navigation
- All interactive components must be reachable by Tab order. Use logical DOM order.
- Visible focus states required: 3-4px ring using color.focus tokens. Do not rely on outline: none without replacement.
- For composite widgets (menus, tabs, dialogs) implement arrow key navigation where applicable and document behavior in component spec.

ARIA recommendations
- Buttons: role="button" only if not native <button>. Prefer native <button>.
- Dialogs: role="dialog" and aria-modal="true" for modal dialogs and aria-labelledby pointing to the dialog title.
- Forms: use aria-invalid="true" on invalid inputs and associate error text through aria-describedby.
- Landmarks: use <main>, <nav>, <header>, <footer>, and complementary roles for assistive tech.

Color & contrast
- Small text must meet 4.5:1 contrast ratio with its background. Large text (>= 18pt/24px regular or 14pt/18.66px bold) must meet 3:1.
- Provide additional visible affordances (icons, patterns) for color-only states (e.g., validation success/error) to avoid color dependence.

Focus management
- When opening modal content, trap focus within modal and restore focus to the triggering control on close.
- On route/page change, move focus to the page heading and provide skip links for screen reader users.

Component variants

1) Button
- Variants: primary, secondary, ghost
- States: default, hover, active, focus, disabled
- Tokens used: color.button.<variant>.bg, color.button.<variant>.text, state.hover.background, state.active.background, state.focus.outline

2) Card
- Variants: default, compact, featured
- Tokens: color.surface, color.border, spacing-4..spacing-6, elevation (use subtle shadow in light mode, slight brightness in dark mode)

3) Input
- Variants: default, error, disabled
- Tokens: color.border, color.text.primary, color.text.muted, state.focus.outline, spacing-3
- ARIA: associate label with input via for/id; use aria-invalid and aria-describedby for errors

4) Navigation / Header
- Variants: mobile (hamburger), desktop (top nav), sticky
- Use bp-md breakpoint to switch from mobile to desktop layout

Mockups (references)

Simple placeholder mockups are included in /design/mockups/ as SVGs for quick review and implementation reference:
- design/mockups/mobile.svg — mobile layout example
- design/mockups/tablet.svg — tablet layout example
- design/mockups/desktop.svg — desktop layout example

Each is a simple wireframe showing header, content card, and a primary CTA button.

Developer tokens table (JSON-like reference)

- breakpoints:
  - bp-xs: 0
  - bp-sm: 480px
  - bp-md: 768px
  - bp-lg: 1024px
  - bp-xl: 1280px

- colors (summary):
  - color.primary.light: #0B63FF
  - color.primary.dark:  #66A3FF
  - color.background.light: #FFFFFF
  - color.background.dark: #0B0B0D
  - color.surface.light: #F5F7FA
  - color.surface.dark:  #111215
  - color.text.primary.light: #0B1225
  - color.text.primary.dark:  #E6EDF3
  - color.text.muted.light: #5B6776
  - color.text.muted.dark:  #9AA6B2
  - color.border.light: #E6EAF0
  - color.border.dark:  #1C2329
  - color.focus.light: #0066FF
  - color.focus.dark:  #66A3FF

Notes and next steps

- Validate all color contrast with up-to-date tools.
- Convert tokens into the project token format (JSON, CSS variables, or a tokens tool) before implementing components.
- Designers: produce high-fidelity mockups for each variant and state following these tokens.

End of spec
