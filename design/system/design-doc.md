Design System — Card Component Specification

Overview

This document provides tokens, typography, spacing, breakpoints, interaction states, and accessibility guidance for the Card component. It references the art asset located at assets/svg/warrior.svg as the source illustration used in the card.

Tokens (CSS Variables)

- Colors
  - --accent: #0b74ff
  - --accent-variant: #0a62d6
  - --bg: #f6f8fb
  - --surface: #ffffff
  - --muted: #6b7280
  - --success: #10b981
  - --danger: #ef4444
  - --shadow: rgba(11, 20, 40, 0.08)

- Typography
  - --type-xs: 12px/16px
  - --type-sm: 14px/20px
  - --type-md: 16px/24px
  - --type-lg: 20px/28px
  - --type-xl: 28px/36px
  - --type-weight-regular: 400
  - --type-weight-medium: 500
  - --type-weight-bold: 700

- Layout & Shapes
  - --card-radius: 12px
  - --card-padding: 16px
  - --card-shadow: 0 6px 18px var(--shadow)
  - --gap-xs: 4px
  - --gap-sm: 8px
  - --gap-md: 16px
  - --gap-lg: 24px

Responsive Breakpoints

- --bp-mobile: 0 — 599px
- --bp-tablet: 600px — 1023px
- --bp-desktop: 1024px+

Layout behavior

- Mobile (<= 599px)
  - Card width: 100% of container (with horizontal padding maintained by page layout)
  - Stack: Illustration (top) -> Title -> Body -> CTA (full width)
  - Typography: scale down to --type-sm for body, --type-md for title

- Tablet (600px — 1023px)
  - Card width: max 560px
  - Layout: Illustration to the left (40%), content to the right (60) when screen allows; otherwise stacked
  - Typography: --type-md for body, --type-lg for title

- Desktop (>= 1024px)
  - Card width: content can expand to 720px max
  - Layout: Illustration left or accent art as bleed; content right; CTA aligned to baseline of text
  - Typography: --type-lg for body, --type-xl for title

Interaction States

- Card container
  - Default: background var(--surface), box-shadow var(--card-shadow)
  - Hover: transform: translateY(-4px); box-shadow: 0 12px 28px rgba(11,20,40,0.12); border-color: rgba(11,74,255,0.08)
  - Focus (keyboard): outline: 3px solid color(--accent) with 12% opacity; use outline-offset: 3px; ensure focus-visible
  - Press / Active: transform: translateY(-1px); box-shadow slightly reduced

- CTA Button
  - Default: background: var(--accent); color: #ffffff; padding: 10px 16px; border-radius: 8px
  - Hover: background: var(--accent-variant)
  - Focus: 2px solid rgba(11,116,255,0.16) (use box-shadow for non-layout shift)
  - Disabled: background: #e6eefc; color: #9aa9c7; cursor: not-allowed

Accessibility Guidelines

- Color contrast
  - Text (body) must have at least 4.5:1 contrast against background for normal text. For large headings (>= 18pt/24px bold) a 3:1 ratio is acceptable.
  - Buttons with primary action (--accent) must meet 4.5:1 against text color.

- Focus & Keyboard
  - All interactive elements (card when clickable, CTA) must be reachable by keyboard (tabindex) and show a visible focus indicator (not only color change)
  - Use :focus-visible to show focus ring for keyboard users; avoid removing outline for mouse users

- Semantic HTML
  - Use <article> or <section> for a card; a clickable card should use a button or anchor (<a>) wrapping inner content with aria-label for the action
  - Headings: Use H2/H3 hierarchy depending on page context; don't style non-semantic elements as headings without role.

- Images & Art
  - Use the vector asset at assets/svg/warrior.svg as the card illustration
  - For decorative images, set aria-hidden="true" and role="img" with empty alt attribute if purely decorative
  - For informative illustrations, provide meaningful alt text and consider a longer description on details page

- Motion
  - Avoid excessive motion: reduce transforms if user has prefers-reduced-motion set
  - For hover/press transitions, use 150–200ms duration and ease-out timing for natural feel

Annotations for Developer Handoff

- Provide CSS variables matching the tokens above in the root stylesheet. Example:

:root {
  --accent: #0b74ff;
  --accent-variant: #0a62d6;
  --bg: #f6f8fb;
  --surface: #ffffff;
  --muted: #6b7280;
  --shadow: rgba(11,20,40,0.08);
  --type-md: 16px/24px;
  --card-radius: 12px;
}

- Export: Keep SVG assets as vector (do not rasterize). The card-spec.svg references assets/svg/warrior.svg — use the same vector source for production builds.

- Measurements & Spacing
  - Card internal padding: var(--card-padding) (16px)
  - Title margin-bottom: var(--gap-sm) (8px)
  - Body margin-bottom: var(--gap-md) (16px)
  - CTA aligns to content baseline and has margin-top: var(--gap-md)

Examples

- Mobile example: stacked layout with full-width CTA
- Tablet example: two-column layout with illustration left
- Desktop example: wider card with larger type scale and art bleed option

Assets

- Illustration source: assets/svg/warrior.svg (vector source referenced in designs and in the delivered card-spec SVG)

Accessibility Checklist (to attach to PR)

- [ ] Text contrast checked: body >= 4.5:1
- [ ] Interactive elements keyboard-accessible
- [ ] Focus-visible present for all interactive elements
- [ ] Decorative images marked aria-hidden
- [ ] Prefers-reduced-motion respected
- [ ] Semantic HTML used for headings and card container

Notes

This design document and the accompanying SVG (card-spec.svg) are intended for handoff to engineering. The SVG contains annotated layers and token labels (CSS variable names) to make mapping from design to code straightforward.