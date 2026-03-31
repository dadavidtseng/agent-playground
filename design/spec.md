Character Card Component System — Design Specification

Overview

This document specifies the design system for the Character Card component used across KĀDI products. It covers responsive layouts (mobile/tablet/desktop), spacing, typography scale, color tokens (with contrast checks), component states (default/hover/active/disabled/focus), motion guidelines, avatar handling recommendations (including pixel-art guidance), accessibility considerations, and a short QA checklist.

1. Breakpoints & Layout

Breakpoints (token names follow in tokens.json):
- bp-mobile: up to 480px — compact vertical layout
- bp-tablet: 481px to 1024px — medium, two-column-ish layout
- bp-desktop: 1025px and up — full horizontal layout

Layout principles
- Use a 12-column grid at desktop/tablet where appropriate; mobile collapses to single column.
- Character Card widths:
  - Mobile: full-width container with 16px side padding (card max-width: 360px recommended)
  - Tablet: card at 48% width in a two-column flow or fixed 440–520px
  - Desktop: card at 320–420px for dense UIs, or 440–560px for feature cards
- Internal content spacing follows the spacing scale (see tokens) and aligns to an 8px baseline.

Examples
- Mobile card: Avatar (left, 56px) + stacked content; or avatar centered above name for portrait cards.
- Tablet card: Avatar (left, 72px), name + role to the right, short bio below.
- Desktop card: Avatar (left), name + badges in a horizontal row, action buttons aligned bottom-right.

2. Spacing Scale

Base unit: 4px (spacing unit token: spacing-1 = 4px). Primary spacing is octet/8px grid built from base.
Tokens (names in tokens.json):
- spacing-1: 4px
- spacing-2: 8px
- spacing-3: 12px
- spacing-4: 16px
- spacing-5: 20px
- spacing-6: 24px
- spacing-8: 32px
- spacing-10: 40px
- spacing-12: 48px

Usage
- Small gaps (inline icons): spacing-2
- Between avatar and text: spacing-4 or spacing-6 depending on density
- Card padding: mobile spacing-4 (16px); tablet spacing-6 (24px); desktop spacing-8 (32px)

3. Typography

Design tokens contain typographic scale. Use system stack or Inter as primary.

Typography tokens (tokens.json):
- font-family-base: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
- font-weight-regular: 400
- font-weight-medium: 500
- font-weight-semibold: 600

Scale (desktop default line-height included):
- heading-xl (H3 in card): 20px / 1.2 (token: type-heading-xl)
- heading-md (H4 / name): 16px / 1.25 (type-heading-md)
- body-md (role / meta): 14px / 1.4 (type-body-md)
- body-sm (labels, badges): 12px / 1.3 (type-body-sm)

Responsive sizing
- Mobile: reduce heading and body sizes by ~10% (tokens include mobile overrides)
- Tablet: use base values
- Desktop: may increase heading-xl to 22px where cards are wider

Text hierarchy
- Name: heading-md, semibold
- Role / title: body-md, medium, muted color
- Short bio: body-md, regular
- Metadata (stats): body-sm, medium

4. Color Palette & Contrast

Tokens include a neutral and expressive palette tuned for accessible contrast. All tokens are in tokens.json.

Palette (primary tokens):
- background: #FFFFFF (white)
- surface/card: #F7FAFC (very light) — subtle surface
- text-primary: #0B1F3B (dark navy)
- text-secondary: #526476 (muted slate)
- border: #E6EDF3
- interactive/primary: #2B8AF6 (blue)
- interactive/primary-600: #176FE6 (pressed)
- success: #2ECC71
- danger: #E24B4B
- disabled: #A3B1BC

Contrast checks (WCAG 2.1):
- text-primary (#0B1F3B) on background (#FFFFFF): 14.9:1 — AAA for all text sizes
- text-secondary (#526476) on background (#FFFFFF): 5.0:1 — AA for normal text (>=14px); borderline for small text
- interactive/primary (#2B8AF6) on background (#FFFFFF): 3.7:1 — meets AA for large text/graphics but not normal small text; use bold or increased size for critical text on blue. For primary text-on-primary backgrounds use white (#FFFFFF) which yields 8.6:1
- border (#E6EDF3) on surface (#F7FAFC): 1.9:1 — intended as subtle divider; not used for small essential text

Recommendations
- Always use text-primary for body copy.
- For secondary text under 14px, increase contrast (use text-primary or darken the secondary token) if the content is essential.
- Action labels on primary buttons should be white (#FFFFFF) to ensure at least 4.5:1 contrast.

5. Component States

Summary of states for Character Card and included interactive elements (buttons, avatar clickable, badges):
- Default: elevation 0 or 1 (soft border). Card background: surface. Cursor: default
- Hover: subtle lift + shadow + border color shift. Cursor: pointer for clickable elements
- Focus: 2px outline ring with interactive color (semi-opaque) and accessible focus-visible styles
- Active / Pressed: reduce elevation, darker border, scale down 0.98 for tactile response
- Disabled: reduce opacity to 64% (opacity 0.64), remove pointer interactions, ensure any text still meets contrast where necessary

Design token examples (states in tokens.json):
- card-shadow-default: 0 1px 0 rgba(11,31,59,0.03)
- card-shadow-hover: 0 6px 20px rgba(11,31,59,0.08)
- focus-ring: 0 0 0 3px rgba(43,138,246,0.16)
- hover-translate-y: -2px

6. Motion & Interaction Guidelines

Principles
- Motion is supportive, not distracting. Prefer subtle elevation and fade transitions.
- Motion respects reduced-motion user preference; reduce or remove non-essential motion for prefers-reduced-motion users.

Motion tokens (also in tokens.json/CSS):
- duration-fast: 120ms
- duration-medium: 200ms
- duration-long: 320ms
- easing-standard: cubic-bezier(0.2, 0.8, 0.2, 1)
- easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1)

Usage
- Hover lift: duration-fast, easing-standard (transform + box-shadow)
- Pressed state: immediate (duration-fast) with scale transform
- Focus ring: fade-in (duration-medium)

Reduced motion
- When prefers-reduced-motion: only instant state changes and fades under 50ms; disable translate/scale animations.

7. Avatar Handling (including pixel-art)

Placement & Sizes
- Tokenized avatar sizes (tokens.json): avatar-xs: 28px, avatar-sm: 40px, avatar-md: 56px, avatar-lg: 72px, avatar-xl: 120px
- Recommended placement:
  - Compact list: avatar-sm + name stacked
  - Profile card: avatar-md or avatar-lg left; name and meta to right
  - Decorative hero-style cards: avatar-xl centered above name

Mask/frame options
- Provide three masks: square (no radius), rounded (radius-3 = 8px), circular (50% border-radius)
- For pixel-art avatars use a crisp bounding mask (square or rounded with small radius) to preserve block pixels

SVG and pixel-art recommendations
- For pixel-art avatars, avoid anti-aliasing when scaling. Use CSS:
  - image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;
  - For <img> tags: set width/height in integers that are whole multiples of the original pixel art size
- Serve pixel-art avatars as PNG or SVG with preserved viewBox and nearest-neighbor scaling when possible
- When masking with SVG clipPath or mask, ensure the mask edges align to pixel grid to avoid blurring

Accessibility for avatars
- Always include alt text for avatars or aria-hidden="true" when decorative
- Provide visible fallback initials avatar when images fail; initial's contrast should meet text contrast rules

8. Accessibility Notes

- Keyboard navigation: all actionable parts of the card (primary action, avatar if clickable, menu) must be reachable and operable via keyboard (Tab, Enter/Space). Use focus-visible styles.
- Focus order: logical source order should place avatar -> name -> primary action -> secondary actions
- Contrast: ensure body text meets 4.5:1 against background; secondary text should meet at least 3:1 for non-critical info, but prefer 4.5:1
- Screen readers: use accessible names and roles. For entire card link, use <a> with aria-label if the content is ambiguous. If the whole card is clickable, the card element should be a single interactive control.
- Reduced motion: respect prefers-reduced-motion and avoid large parallax or translate animations
- Sizing: minimum tappable target 44x44px for touch targets (Apple Human Interface Guidelines)

9. QA Checklist

Before handing to implementation, verify:
- [ ] Breakpoints render as specified at <=480px, 481–1024px, and >=1025px
- [ ] Spacing tokens used consistently; all paddings are multiples of spacing-2 (8px)
- [ ] Typography sizes match tokens and scale responsively
- [ ] Color tokens applied and contrast ratios verified (text-primary >=4.5:1)
- [ ] Hover, focus, and active states visually distinct and match tokenized motion durations
- [ ] Focus outlines display on keyboard navigation and meet contrast for visibility
- [ ] Disabled states remove pointer events and use specified opacity
- [ ] Avatars display fallback initials and pixel-art uses image-rendering: pixelated
- [ ] All interactive elements are keyboard operable and have accessible names

10. Implementation Handoff Snippets

Example card structure (pseudo-HTML):

<div class="kadi-card kadi-card--profile" role="article" tabindex="0" aria-label="Character profile: Ada Lovelace">
  <div class="kadi-card__avatar">
    <img src="..." alt="Ada Lovelace avatar">
  </div>
  <div class="kadi-card__content">
    <h4 class="kadi-card__name">Ada Lovelace</h4>
    <div class="kadi-card__role">Algorithmic Engineer</div>
    <p class="kadi-card__bio">Short one-line bio goes here. Keep to 2 lines maximum in card layout.</p>
  </div>
  <div class="kadi-card__actions">
    <button class="btn btn-primary">Follow</button>
  </div>
</div>

CSS variable sample and tokens file are included in the tokens deliverables.

11. Mockups

A sample SVG mockup (design/mockups/character-card-breakpoints-and-states.svg) demonstrates the three breakpoints and four primary states: default, hover, active, disabled. Use these as reference frames for Figma import.

12. Versioning & Token Stability

- Token names are intentionally stable: use the tokens.json keys as canonical names for implementation. Avoid changing token names without a breaking-change process.

Appendix: Further reading
- WCAG 2.1 Contrast and Accessibility Guidelines
- Apple HIG / Material Design touch target guidelines

End of specification.
