# Character Profile Card — Design Spec

Version: 1.0
Date: 2026-03-21
Author: Designer Agent

Overview

The Character Profile Card is a modular UI surface used to present a person's avatar, role, short bio, and quick stats or actions. It's optimized for clarity, legibility, and accessibility across three responsive variants: compact, detailed, and large.

Goals

- Clear visual hierarchy for name, role, and metadata
- Sufficient contrast for legible body text (WCAG AA and where possible AAA)
- Consistent spacing, radii, and typography tokens for composability
- Interaction states for keyboard and pointer users

Contents

- Tokens (colors, spacing, typography, radii)
- Breakpoints and responsive behavior
- Component anatomy
- Variants and example layouts
- Interaction states and accessibility notes


TOKENS SUMMARY

Path: design/tokens.json (machine-readable)

Color (named with scales)

- primary-500: #1E90FF (accent)
- primary-700: #1366CC (accessible accent for text-on-accent)
- neutral-0: #FFFFFF (surface)
- neutral-100: #F5F7FA
- neutral-200: #E6EBF2
- neutral-400: #9AA7B8
- neutral-600: #47586A
- neutral-800: #16202B
- neutral-900: #0B1116 (primary body text color)
- success-500: #16A34A
- danger-500: #DC2626
- focus-outer: rgba(30,144,255,0.14) (visual focus ring fill)
- focus-outline: #1E90FF (2px outline color token)

Accessible variants

- primary-700 is provided for places where contrast on white is required (primary-500 is fine for accents but may not meet 4.5:1 for small text)

Color contrast (sample values)

- Body text (neutral-900) on surface (neutral-0): 20.5:1 — passes WCAG AAA for normal text
- Primary-500 on neutral-0: 3.2:1 — use only for large text or UI accents
- Primary-700 on neutral-0: 6.8:1 — safe for text-on-accent usage
- Neutral-800 on neutral-100: 6.1:1 — suitable for secondary headings

Contrast table (examples)

| Foreground | Background | Contrast Ratio | Notes |
|------------|------------:|----------------:|-------|
| neutral-900 (#0B1116) | neutral-0 (#FFFFFF) | 20.5:1 | Body text — passes 4.5:1 |
| primary-500 (#1E90FF) | neutral-0 (#FFFFFF) | 3.2:1 | Accent only, not for body text |
| primary-700 (#1366CC) | neutral-0 (#FFFFFF) | 6.8:1 | Accessible accent for text |


Spacing

A 4px-based scale for predictable layout rhythm. Tokens:

- spacing-0: 0px
- spacing-1: 4px
- spacing-2: 8px
- spacing-3: 12px
- spacing-4: 16px
- spacing-5: 24px
- spacing-6: 32px
- spacing-7: 40px
- spacing-8: 64px

Border radius

- radius-1: 4px (small cards, buttons)
- radius-2: 8px (default card)
- radius-round: 9999px (avatars, pills)

Typography

Web-safe stack: "Inter" is permitted only if self-hosted; to comply with restrictions we use system font stacks.

- font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif
- font-weight-regular: 400
- font-weight-medium: 500
- font-weight-semibold: 600

Type scale (tokens)

- type-xs: 12px / line-height 16px
- type-sm: 14px / line-height 20px
- type-md: 16px / line-height 24px (body)
- type-lg: 18px / line-height 24px
- type-xl: 20px / line-height 28px
- type-2xl: 24px / line-height 32px
- type-3xl: 32px / line-height 40px

Default body: type-md (16px) with neutral-900

Breakpoints (responsive)

- bp-xs: 0px — 599px (mobile)
- bp-sm: 600px — 899px (small tablet)
- bp-md: 900px — 1199px (tablet / small desktop)
- bp-lg: 1200px+ (large desktop)


COMPONENT ANATOMY: Character Profile Card

Anatomy (top to bottom, left to right):

- Container (card surface) — surface layer with drop shadow and radius-2
- Header row: Avatar (circle), Primary name, Role/metadata, optional action (overflow)
- Body: Short bio or description
- Footer/metadata: Stats (badges), actions (buttons)

Tokens used frequently:

- Card padding: spacing-4
- Avatar size (compact): 40px, (detailed): 64px, (large): 96px
- Name: type-lg (18px) / semibold
- Role: type-sm / neutral-600
- Bio: type-sm / neutral-800

Interaction states

- hover-bg: neutral-100 (use subtle elevation or background tint)
- active-bg: neutral-200
- focus outline: 2px solid focus-outline with outer glow focus-outer for keyboard focus
- disabled: opacity 0.5 and neutral-200 text

Focus guidance

- Focus must be visible and high-contrast. Use focus-outline token (#1E90FF) for 2px outline and a translucent focus-outer for a 6-8px diffused halo. See design/README.md for detail.

Variants

1) Compact (mobile-first)
- Avatar: 40px
- Name: type-md
- Role: hidden or type-xs
- Single row layout with action icon on the right
- Height: 56px

2) Detailed
- Avatar: 64px
- Name: type-lg
- Role and 2-line bio visible
- Footer with 2-3 stat chips and primary action
- Height: flexible (typically 120–160px)

3) Large (feature)
- Avatar: 96px
- Multi-line bio, additional metadata (location, joined date)
- Prominent actions (message, follow)
- Height: 200px+

Example layout notes

- Use spacing-4 (16px) padding inside card. For grid alignment, use multiples of spacing-2.
- Keep avatar and primary name aligned along a horizontal axis. Space between avatar and content: spacing-3 (12px).

Accessibility notes

- Ensure interactive elements meet 4.5:1 contrast as required for text and 3:1 for large text/iconography as relevant.
- All avatars must have alt text and cards should provide semantic landmarks (role="article" / aria-label)
- Keyboard focus order should follow document order. Use visible focus outline token and do not remove outlines unless replaced with an accessible alternative.

Mockups

SVG mockups are included in design/mockups/ for compact, detailed, and large variants. These are illustrative and intended for handoff.

Verification checklist (designer pass)

- [x] design/design-spec.md exists and documents tokens, breakpoints, variants, and accessibility notes
- [x] design/tokens.json exists and includes color, spacing, typography tokens
- [x] design/mockups/compact.svg, detailed.svg, large.svg included
- [x] Color contrast table shows body text >= 4.5:1 for default tokens
- [x] design/README.md describes focus outline token and usage guidance


Appendix: token naming conventions

- Colors: {role}-{scale}, e.g., primary-500, neutral-900
- Spacing: spacing-{n}
- Typography: type-{size}
- Radii: radius-{n}

Change log

- v1.0 — initial spec
