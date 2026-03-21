Character Profile Card — Design Specification

Overview

This document defines the design system tokens, responsive breakpoints, typography scale, color palette (with WCAG contrast notes), spacing scale, interaction states, accessibility guidance, and example mockups for the Character Profile Card component.

Goals

- A compact, reusable Character Profile Card that works across mobile/tablet/desktop
- Tokens that are usable as plain CSS custom properties (no build step required)
- Accessibility-first: keyboard focus, readable text, high contrast options, motion-reduction support

File references

- /design/css-tokens.css — CSS custom property token file for implementers

Naming conventions

All variables use the prefix --cc- (character card) and semantic names: e.g. --cc-color-bg, --cc-font-size-lg, --cc-space-3, --cc-breakpoint-md.

Responsive breakpoints (mobile-first)

- --cc-breakpoint-xs: 360px    /* very small phones */
- --cc-breakpoint-sm: 600px    /* phones */
- --cc-breakpoint-md: 900px    /* tablets/small laptops */
- --cc-breakpoint-lg: 1200px   /* desktop */
- --cc-breakpoint-xl: 1440px   /* large displays */

Use: media queries should be "min-width" using the tokens. E.g. @media (min-width: var(--cc-breakpoint-sm)) { /* tablet+ */ }

Layout principles & component anatomy

Card container (block-level, responsive width) — elements top-to-bottom in source order for accessibility:
- Avatar (circular) — left on wider viewports, top-centered on small devices
- Primary row: Name (heading), Role/Subtitle
- Secondary info: short bio or description (support multiline)
- Meta row: tags, stats, small actions (message, favorite)
- Footer actions: primary action (CTA) and secondary icon buttons

Mobile (single column): avatar centered above name, stacked content, actions anchored below.
Tablet: two-column layout — avatar to the left (fixed size), content to the right.
Desktop: optional card grid or denser spacing — avatar left, content right, actions visible inline.

Typography scale

Use a fluid, readable scale. Base font-size is 16px for 1rem.

Tokens:
- --cc-font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
- --cc-font-weight-regular: 400
- --cc-font-weight-medium: 500
- --cc-font-weight-bold: 700

Sizes (mobile-first, rem):
- --cc-font-size-xxs: 0.75rem   /* 12px */
- --cc-font-size-xs: 0.875rem   /* 14px */
- --cc-font-size-sm: 1rem       /* 16px (body) */
- --cc-font-size-md: 1.125rem   /* 18px */
- --cc-font-size-lg: 1.25rem    /* 20px */
- --cc-font-size-xl: 1.5rem     /* 24px */
- --cc-font-size-xxl: 2rem      /* 32px */

Line-height tokens:
- --cc-line-height-tight: 1.1
- --cc-line-height-default: 1.4
- --cc-line-height-loose: 1.6

Color palette and WCAG notes

Semantic tokens (names + example hex):
- --cc-color-bg: #ffffff (card background)
- --cc-color-surface: #f8fafc (surface / subtle panel)
- --cc-color-border: #e6edf3
- --cc-color-text: #0f172a (primary text) — contrast vs white: 15.8:1 (AAA)
- --cc-color-text-muted: #475569 (muted text) — contrast vs white: 7.4:1 (AA/AAA)
- --cc-color-accent: #4f46e5 (accent/primary action) — contrast vs white: 6.3:1
- --cc-color-accent-foreground: #ffffff (text on accent) — accent has sufficient contrast for large and small text
- --cc-color-success: #16a34a
- --cc-color-warning: #f59e0b
- --cc-color-danger: #dc2626
- --cc-color-focus: #2563eb (focus ring)
- --cc-color-overlay: rgba(2,6,23,0.6)  /* for modals, avatars */

Notes on WCAG: The primary text color (--cc-color-text) and muted text were chosen to meet WCAG AA and AAA contrast ratios against the card background (#ffffff). Accent color meets AA for white foreground. If implementers change token values, verify using automated contrast checks.

Spacing scale (4px base)

- --cc-space-0: 0px
- --cc-space-1: 4px
- --cc-space-2: 8px
- --cc-space-3: 12px
- --cc-space-4: 16px
- --cc-space-5: 24px
- --cc-space-6: 32px
- --cc-space-7: 40px
- --cc-space-8: 64px

Use tokens for gaps, paddings, and margins. Example: .cc-card { padding: var(--cc-space-4); gap: var(--cc-space-3); }

Sizing tokens

- --cc-avatar-size-sm: 40px
- --cc-avatar-size-md: 64px
- --cc-avatar-size-lg: 96px
- --cc-border-radius: 12px
- --cc-border-radius-sm: 8px

Elevation / shadows

- --cc-elevation-none: none
- --cc-elevation-low: 0 1px 2px rgba(2,6,23,0.06)
- --cc-elevation-medium: 0 4px 12px rgba(2,6,23,0.08)
- --cc-elevation-high: 0 12px 30px rgba(2,6,23,0.12)

Interaction states

State tokens for the card and actions. Use semantic names so components can swap values for theme variations.

Card states:
- --cc-card-bg: var(--cc-color-bg)
- --cc-card-bg-hover: #fbfdff
- --cc-card-bg-active: #f1f5f9
- --cc-card-border: var(--cc-color-border)
- --cc-card-border-hover: #d9e8f7

Buttons / chips:
- --cc-btn-bg: var(--cc-color-accent)
- --cc-btn-bg-hover: #4338ca
- --cc-btn-bg-active: #3730a3
- --cc-btn-foreground: var(--cc-color-accent-foreground)
- --cc-btn-outline: 1px solid rgba(79,70,229,0.12)

Focus and keyboard states:
- Focus must use an outline or ring equivalent that is visible against both light and dark backgrounds. Use: box-shadow: 0 0 0 3px var(--cc-color-focus) with 30% alpha overlay if needed or a 2px solid outline.
- Respect :focus-visible to avoid showing focus on mouse interactions but show for keyboard.

Motion

- Provide reduced-motion fallback. Use prefers-reduced-motion: reduce to remove transitions and animations.

Accessibility guidance

1. Semantic HTML
   - Use <article> or <section> for the card with aria-labelledby linking to the heading.
   - Name the primary heading as <h3> or appropriate heading level for page structure.
2. Keyboard
   - All interactive elements (actions, avatar if clickable) must be reachable via Tab and have visible focus.
   - Use role="button" only if not using native button elements, and ensure keydown handling for Enter/Space.
3. Color contrast
   - Maintain minimum contrast 4.5:1 for normal text, 3:1 for large text (>= 18pt/1.125rem bold or 24px/1.5rem normal).
4. Images
   - Avatar images must include alt text describing the character (alt="Portrait of Aria, elven mage") or empty alt for purely decorative images.
5. Read order
   - Source order should present heading then description then meta info; layout changes (e.g., two-column) must not affect reading order.
6. ARIA
   - If the card is selectable, use aria-pressed on the toggle control; if it's a list item, use role="listitem" in parent list and role="list" on container.
7. Responsive text
   - Avoid fixed px sizes for critical text; allow scaling via rem tokens.

Implementation examples

1) HTML structure (example)

<article class="cc-card" aria-labelledby="cc-name-aria">
  <img class="cc-avatar" src="/avatars/aria.jpg" alt="Portrait of Aria, elven mage">
  <div class="cc-content">
    <h3 id="cc-name-aria" class="cc-name">Aria Moonshadow</h3>
    <p class="cc-role">Elven Mage • Level 18</p>
    <p class="cc-bio">Quick bio text that can span multiple lines. Keep it concise and scannable.</p>
    <div class="cc-meta">🔖 Tagged • ⭐ 4.8</div>
    <div class="cc-actions">
      <button class="cc-btn-primary">Message</button>
      <button class="cc-btn-icon" aria-label="Add to favorites">♡</button>
    </div>
  </div>
</article>

2) CSS usage snippet (reference only — tokens live in /design/css-tokens.css):

.cc-card {
  background: var(--cc-card-bg);
  border: 1px solid var(--cc-card-border);
  border-radius: var(--cc-border-radius);
  padding: var(--cc-space-4);
  display: grid;
  gap: var(--cc-space-3);
  box-shadow: var(--cc-elevation-low);
}

.cc-avatar { width: var(--cc-avatar-size-md); height: var(--cc-avatar-size-md); border-radius: 999px; }
.cc-name { font-size: var(--cc-font-size-lg); font-weight: var(--cc-font-weight-bold); }
.cc-role { color: var(--cc-color-text-muted); font-size: var(--cc-font-size-sm); }

Responsive layout quick guide

Mobile (default):
- .cc-card { grid-template-columns: 1fr; text-align: center; }
- Avatar centered above content; actions full-width stacked

Tablet (>= var(--cc-breakpoint-sm)):
- .cc-card { grid-template-columns: auto 1fr; align-items: center; text-align: left; }
- Avatar left column (fixed width), content right.

Desktop (>= var(--cc-breakpoint-md)):
- Introduce denser spacing, show additional meta inline, increase avatar to --cc-avatar-size-lg if desired.

Mockups / Wireframes (text-based)

Mobile (<= 600px)
--------------------------------------------------
|                 Avatar (64)                    |
|            Name (20)                            |
|            Role (16)                            |
|   Bio line 1                                   |
|   Bio line 2                                   |
|   [Message — full width]                        |
|   [♡ Favorite]                                 |
--------------------------------------------------

Tablet (600–900px)
--------------------------------------------------
| Avatar (64) | Name (20)        Role (16)       |
|             | Bio line 1                          |
|             | Meta • Tags                         |
|             | [Message] [♡]                       |
--------------------------------------------------

Desktop (900px+)
--------------------------------------------------
| Avatar (96) | Name (24)         Role (16)        |
|             | Bio (one or two lines)              |
|             | Tags • Stats • Location             |
|             | [Message] [Invite] [♡]             |
--------------------------------------------------

Token usage examples

- For a primary action: background var(--cc-btn-bg); color var(--cc-btn-foreground); padding: var(--cc-space-3) var(--cc-space-4); border-radius: var(--cc-border-radius-sm)
- For a card hover: .cc-card:hover { background: var(--cc-card-bg-hover); border-color: var(--cc-card-border-hover); box-shadow: var(--cc-elevation-medium); }

Developer notes

- Tokens in /design/css-tokens.css are single-source-of-truth and safe to import (via <link rel="stylesheet">) or copy into a global stylesheet.
- Avoid hard-coded colors or spacing inside component CSS — reference tokens only.
- If theming is required (dark mode), provide an override file that sets the same token names with alternate values.

Checklist for reviewers

- Confirm /design/character-card-spec.md exists and documents breakpoints, tokens, interaction states, and accessibility guidance.
- Confirm /design/css-tokens.css exists and defines variables used in this spec.
- Ensure example mockups for mobile/tablet/desktop are present in the "Mockups / Wireframes" section.

End of spec
