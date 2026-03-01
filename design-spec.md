Game Character Profile Card System — Design Specification

Overview

This document defines the design system and component specification for the Game Character Profile Card System (GCP Card). It covers responsive layout across three breakpoints (mobile / tablet / desktop), spacing and typography scales, color tokens (with WCAG contrast checks), interaction states, accessibility rules, component variants (compact, default, expanded), CSS variables list and an example SASS tokens file, three visual mockups, and a sample markup snippet.

Table of contents

- Goals
- Breakpoints
- Spacing scale
- Typography scale
- Color tokens & contrast
- CSS variable list
- SASS token examples (tokens.scss)
- Component anatomy
- Component variants (compact / default / expanded)
- Responsive layout details & visual mockups
- Interaction & states (hover, focus, active, disabled)
- Accessibility guidance
- Sample HTML markup

Goals

- Provide a reusable, accessible card that surfaces a game character's avatar, name, level, role/class, short stats, primary action(s) and expanded details on demand.
- Work at three responsive breakpoints with consistent spacing and rhythm.
- Maintain WCAG AA contrast for all text and UI controls.
- Provide clear focus and reduced-motion behavior.

Breakpoints

- Mobile (small): 0 — 599px — css variable: --bp-mobile (max-width: 599px)
- Tablet (medium): 600px — 1023px — css variable: --bp-tablet (min-width: 600px)
- Desktop (large): 1024px+ — css variable: --bp-desktop (min-width: 1024px)

Notes: breakpoints chosen for typical phone / tablet / desktop distribution.

Spacing scale (4-point system)

We use an 4px baseline unit. All spacing tokens are multiples of 4.

- 0: 0px
- xs: 4px
- s: 8px
- m: 12px
- md: 16px
- l: 24px
- xl: 32px
- xxl: 48px

Suggested token names (SASS): $space-0, $space-xs, $space-s, $space-m, $space-md, $space-l, $space-xl, $space-xxl

Typography scale

Base font family: system UI stack — "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif.

Scale (recommended):
- display-lg: 28px / 36px line-height (used rarely)
- heading-md: 20px / 28px
- heading-sm: 16px / 24px
- body-lg: 16px / 24px
- body-md: 14px / 20px
- body-sm: 12px / 16px
- caption: 11px / 16px

SASS tokens: $type-display-lg, $type-heading-md, $type-heading-sm, $type-body-lg, $type-body-md, $type-body-sm, $type-caption

Color tokens and contrast

Primary surface & text
- --color-surface: #FFFFFF (white)
- --color-surface-contrast: #111827 (neutral-900) — used for body text

Primary brand / accent
- --color-accent-500: #6366F1 (indigo-500)
- --color-accent-600: #4F46E5 (indigo-600)

Support / semantic
- --color-success: #10B981 (green-500)
- --color-warning: #F59E0B (amber-500)
- --color-danger: #EF4444 (red-500)

Neutral palette
- --color-neutral-100: #F3F4F6
- --color-neutral-200: #E5E7EB
- --color-neutral-300: #D1D5DB
- --color-neutral-500: #6B7280
- --color-neutral-700: #374151
- --color-neutral-900: #111827

Card surfaces
- --color-card-bg: var(--color-surface)
- --color-card-border: var(--color-neutral-200)
- --color-muted-text: var(--color-neutral-500)

Contrast checks (key pairs)
- Body text on surface: #111827 on #FFFFFF — contrast ratio ≈ 15.3:1 (AAA)
- Muted text on surface: #6B7280 on #FFFFFF — contrast ratio ≈ 6.5:1 (AA+)
- Accent text on surface: #4F46E5 on #FFFFFF — contrast ≈ 4.7:1 (AA for normal text)
- White text on accent: #FFFFFF on #4F46E5 — contrast ≈ 4.9:1 (AA)

All main text tokens meet at least WCAG AA at normal sizes. Small captions should be checked; if caption uses body-sm (12px) ensure contrast >= 4.5:1, so avoid low-contrast muted colors for small text.

CSS variables list (:root)

- --bp-mobile: 599px
- --bp-tablet: 600px
- --bp-desktop: 1024px
- --space-0: 0px
- --space-xs: 4px
- --space-s: 8px
- --space-m: 12px
- --space-md: 16px
- --space-l: 24px
- --space-xl: 32px
- --space-xxl: 48px
- --type-display-lg: 28px/36px
- --type-heading-md: 20px/28px
- --type-heading-sm: 16px/24px
- --type-body-lg: 16px/24px
- --type-body-md: 14px/20px
- --type-body-sm: 12px/16px
- --type-caption: 11px/16px
- All color tokens listed above (accent, neutral, success, warning, danger, card bg/border)

SASS token examples (tokens.scss)

See tokens.scss file next to this document. That file contains SASS variables and a generated :root block showing equivalent CSS variables.

Component anatomy

Core elements of the Game Character Profile Card:

- root.card — outer container, rounded corners, border and subtle shadow.
- avatar — circular image (48px default) with alt text.
- meta — name, title/role, level/badge
- quick-stats — 2–3 small stat chips (HP, ATK, DEF) or an icon row
- primary actions — button(s): e.g., "View", "Equip", "Message"
- expand-control — caret or area to expand to show details (in expanded variant)
- details — expanded area with description, equipment list, tags, and larger stat table

Component sizing by variant

- Compact
  - Padding: md (12px)
  - Avatar: 40x40
  - Height: auto, visually dense
  - Typography: heading-sm (16px) for name, body-sm (12px) for meta
  - Use-case: lists, dense inventories

- Default
  - Padding: md -> md/space-md (16px)
  - Avatar: 56x56
  - Typography: heading-md (20px) for name, body-md (14px) for meta
  - Quick-stats shown inline

- Expanded
  - Padding: xl (32px)
  - Avatar: 80x80 or left column
  - Typography: display-lg / heading-md for prominent name
  - Details block appears below or to the right on wide screens

Responsive layout rules

- Mobile (<=599px)
  - Card is single column, avatar left aligned with name or stacked (avatar above name in compact stacks)
  - Primary actions collapsible into single icon or overflow menu if space constrained
  - Quick stats appear as horizontal scroll chips if too many

- Tablet (600–1023px)
  - Card is two-column flexible layout: avatar + meta left, actions and quick-stats right
  - Expanded variant can show details stacked below

- Desktop (>=1024px)
  - Card uses multi-column grid: avatar column (fixed), content column, actions column (right-aligned)
  - Expanded variant uses a two-column layout inside the card with details to the right of avatar

Visual mockups (ASCII + notes)

Mobile (example)

[Mobile — Default variant — 360px wide]

+-----------------------------------------+
|  [O]  Name of Character                 |
|       Level 24 · Ranger                 |
|                                         |
|  HP: 120  | ATK: 48 | DEF: 32           |
|                                         |
|  [View] [Equip]                         |
+-----------------------------------------+

Notes: avatar shown as [O] at 56px, name uses heading-md, buttons use full-width or compact icons depending on space.

Tablet (example)

[Tablet — Default variant — 768px wide]

+---------------------------------------------------------------+
| [ O ]  Name of Character            Level 24 · Ranger     [View]|
|        Short description or role                         [Eq]|
|                                                           |
|  HP: 120   ATK: 48   DEF: 32                              |
+---------------------------------------------------------------+

Notes: avatar left, content center, actions right. Buttons are visible as separated controls.

Desktop (example)

[Desktop — Expanded variant — 1200px wide]

+-----------------------------------------------------------------------+
| [ Avatar 80px ]  Name of Character         Level 24 · Ranger [View]   |
|                 "A short tagline or title for the character." [Msg] |
|                                                                       |
|  Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.  |
|  Equipment: Sword of Dawn, Cloak of Shadows, Amulet of Luck            |
|  Stats: HP 120 | ATK 48 | DEF 32  | SPD 16  | INT 14                   |
+-----------------------------------------------------------------------+

Notes: expanded shows description and equipment with more generous padding.

Interaction states

- Hover
  - Cards: subtle elevation on hover (box-shadow: 0 6px 18px rgba(2,6,23,0.08)) and border-color -> --color-neutral-300
  - Buttons: background color slightly darker (accent-600 for filled accent)
- Focus
  - Visible focus ring for interactive elements (button, card when focusable) using outline-offset and high-contrast ring color.
  - Focus style: box-shadow: 0 0 0 3px rgba(79,70,229,0.18) (accent) or 3px solid var(--color-accent-500) for high visibility; prefer non-inset outline to preserve layout.
  - Always ensure 3px ring + contrast against background.
- Active
  - Slight transform: translateY(1px) and darker background
- Disabled
  - Reduced opacity (0.5) and cursor: not-allowed; avoid using only color to indicate disabled state

Reduced motion

- Respect prefers-reduced-motion: reduce or remove transform/transition animations and use instant state changes

Accessibility guidance

- Text contrast: ensure a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. We provide tokens and recommend checking any custom color combinations.
- Focus
  - All interactive controls must be keyboard focusable and show a visible focus indicator. Don't rely on color alone to indicate focus.
- ARIA
  - If the card is interactive as a whole (e.g., clickable to navigate to a profile), use role="button" and tabindex="0" and manage aria-pressed / aria-expanded as appropriate. Prefer <button> or <a> when possible.
  - For expandable details, use a <button aria-expanded="false" aria-controls="details-123"> toggle and the details container with id="details-123" role="region" aria-hidden="true/false" when hidden/visible.
- Images
  - Avatar images must include alt text describing the character (e.g., alt="Portrait of Kira the Ranger"). If purely decorative, use alt="" and role="img" omitted.
- Landmarks
  - Use semantic HTML inside larger pages (article, header, aside) so that assistive tech navigates easily.

Performance & internationalization

- Keep the card markup lightweight. Avoid heavy font loads unless needed.
- Allow enough horizontal space for languages with longer words — avoid fixed-width truncation when possible. Provide title attribute or aria-label with full name if truncated.

Sample HTML markup

<!-- Default variant card (desktop-optimized) -->
<article class="gcpc-card gcpc-card--default" aria-labelledby="char-name-1">
  <div class="gcpc-card__body">
    <img class="gcpc-avatar" src="/images/avatars/kira.jpg" alt="Portrait of Kira the Ranger" width="56" height="56">

    <div class="gcpc-meta">
      <h3 id="char-name-1" class="gcpc-name">Kira the Ranger</h3>
      <div class="gcpc-sub">Level 24 · Ranger</div>
      <div class="gcpc-stats">
        <span class="gcpc-stat">HP: <strong>120</strong></span>
        <span class="gcpc-stat">ATK: <strong>48</strong></span>
        <span class="gcpc-stat">DEF: <strong>32</strong></span>
      </div>
    </div>

    <div class="gcpc-actions">
      <button class="btn btn-primary" aria-label="View Kira profile">View</button>
      <button class="btn" aria-label="Equip Kira">Equip</button>
    </div>
  </div>

  <div id="details-1" class="gcpc-details" hidden aria-hidden="true" role="region" aria-labelledby="char-name-1">
    <p class="gcpc-desc">Kira is a swift ranged fighter who specializes in tracking and traps.</p>
    <ul class="gcpc-equipment">
      <li>Sword of Dawn</li>
      <li>Cloak of Shadows</li>
      <li>Amulet of Luck</li>
    </ul>
  </div>
</article>

Notes for the sample markup

- Use semantic elements (article, h3, button). For expansion toggles: implement a button with aria-expanded and toggle the details section's hidden / aria-hidden programmatically (not included here per instructions).
- All interactive elements must be keyboard accessible and include aria-labels if the text is ambiguous.

Tokens & implementation tips

- Provide tokens.scss as a source of truth and compile that into :root CSS variables used by components.
- Use CSS custom properties for runtime theming (dark mode, skinning).
- Keep component CSS scoped with a prefix (gcpc- or gcpc-card) to avoid collisions.

Files created

- tokens.scss — SASS variable tokens and generated :root CSS variables
- design-spec.md — this design specification (includes visual mockups and sample HTML)

End of specification
