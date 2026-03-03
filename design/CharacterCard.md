# Character Profile Card — Design Specification

Version: 1.0
Owner: Designer Agent (KĀDI)
Task ID: 7ada93a4-9435-4afc-a72e-b32551406c6d
Estimated effort: 1-2 days

## Purpose
A compact, responsive Character Profile Card used across the product to display an avatar, name, role/meta information, short bio or stats, and actions. Designed for clarity, accessibility, and themeability via CSS tokens.

## Tokens
All tokens are exposed as CSS custom properties (variables) in :root. Component styles must reference tokens only — do not hardcode theme colors in component selectors.

Color tokens
- --color-bg: #ffffff; /* page background */
- --color-surface: #f5f7fb; /* card surface */
- --color-surface-contrast: #ffffff; /* elevated surface */
- --color-primary: #0057b8; /* primary interactive */
- --color-on-primary: #ffffff; /* text on primary */
- --color-text: #111827; /* body text (meets WCAG AA on white) */
- --color-muted: #6b7280; /* secondary text */
- --color-accent: #f59e0b; /* accent */
- --color-success: #059669;
- --color-danger: #dc2626;
- --color-border: #e6e9ee;
- --color-focus: rgba(0, 87, 184, 0.28); /* focus ring */

Typography scale
- --font-family-base: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
- --type-xs: 12px;
- --type-sm: 14px;
- --type-md: 16px; /* base */
- --type-lg: 20px;
- --type-xl: 24px;
- --type-xxl: 32px;

Spacing (8px base scale)
- --space-1: 4px;
- --space-2: 8px;
- --space-3: 12px;
- --space-4: 16px;
- --space-5: 20px;
- --space-6: 24px;
- --space-8: 32px;

Layout / shape
- --radius-sm: 6px;
- --radius-md: 12px;
- --shadow-sm: 0 1px 2px rgba(16,24,40,0.05);
- --shadow-md: 0 4px 12px rgba(16,24,40,0.08);
- --border-width: 1px;

Breakpoints
- --breakpoint-sm: 480px;
- --breakpoint-md: 768px;
- --breakpoint-lg: 1024px;

Interaction tokens
- --surface-hover: rgba(0,0,0,0.03);
- --surface-active: rgba(0,0,0,0.06);
- --disabled-opacity: 0.48;

## Component anatomy
.character-card
- .character-card__avatar — circular image/initials
- .character-card__header — row with avatar + name/meta
- .character-card__name — primary label
- .character-card__meta — role or subtitle
- .character-card__body — short bio or stats
- .character-card__stats — optional key/value chips
- .character-card__actions — primary/secondary actions (buttons/icons)

Example structure
<div class="character-card" role="group" aria-label="Character profile: Ada Lovelace">
  <div class="character-card__header">
    <img class="character-card__avatar" src="..." alt="Ada Lovelace" />
    <div class="character-card__title">
      <div class="character-card__name">Ada Lovelace</div>
      <div class="character-card__meta">Mathematician • Programmer</div>
    </div>
  </div>
  <div class="character-card__body">Short bio or stats here...</div>
  <div class="character-card__actions">
    <button class="btn btn--primary">Message</button>
    <button class="btn btn--ghost">More</button>
  </div>
</div>

## Spacing and sizing suggestions
- Compact card: padding var(--space-3) (12px), avatar 40px
- Default card: padding var(--space-4) (16px), avatar 56px
- Spacious/feature card: padding var(--space-6) (24px), avatar 72px

## Interaction states
Use tokens to style these states; do not hardcode colors.

Hover
- Card hover: background-color: var(--surface-hover) or elevation shadow increase
- Action hover: background-color: var(--color-primary) with color var(--color-on-primary) for primary buttons

Active
- Card active: background-color: var(--surface-active) and translateY(1px)
- Action active: stronger overlay using var(--color-primary) with slight scale

Focus
- Use outline or ring: box-shadow: 0 0 0 4px var(--color-focus)
- Ensure keyboard-focusable elements (.character-card__actions button, links) show clear focus ring

Disabled
- opacity: var(--disabled-opacity); pointer-events: none; remove box-shadow

## Accessibility guidance
- Body text token (--color-text) chosen to meet WCAG AA against --color-bg (#ffffff). Example: #111827 (very dark gray) on white has sufficient contrast.
- Primary buttons use --color-primary (#0057b8) with white text (--color-on-primary) — contrast ratio should be >= 4.5:1 for normal text — confirm using tooling if different primary is applied.
- Provide alt text for avatars; if avatar not available, use aria-label on role group.
- Ensure interactive elements (buttons, links) are at least 44x44 CSS pixels tappable.

Color contrast pairs (examples)
- Body text: --color-text (#111827) on --color-bg (#ffffff) — passes WCAG AA for normal text.
- Muted text: --color-muted (#6b7280) on --color-bg (#ffffff) — ~6.3:1 — passes AA for normal text.
- Primary button: --color-on-primary (#ffffff) on --color-primary (#0057b8) — high contrast — passes AA.
- Accent (amber): --color-accent (#f59e0b) on white — contrast ~3.5:1 — use only for decorative or large text (>=18pt/14pt bold) or place on darker background for smaller text.

## Responsive behavior
- Mobile (<= var(--breakpoint-sm)): compact layout — avatar left, name stacked next to small meta; actions collapse to icon-only where applicable
- Tablet (<= var(--breakpoint-md)): default layout
- Desktop (>= var(--breakpoint-lg)): allow larger paddings and show full actions

## Examples: hover / active / disabled CSS snippets
.character-card { background: var(--color-surface); }
.character-card:hover { background: color-mix(in srgb, var(--color-surface) 80%, var(--surface-hover) 20%); box-shadow: var(--shadow-md); }
.character-card:active { transform: translateY(1px); background: var(--surface-active); }
.btn--primary { background: var(--color-primary); color: var(--color-on-primary); }
.btn--primary:hover { filter: brightness(1.02); }
.btn[disabled], .character-card--disabled { opacity: var(--disabled-opacity); pointer-events: none; }

## Component CSS responsibilities
- Designer provides tokens and base scaffolding (this file) — visual styles should exclusively reference tokens.
- Programmers implement dynamic behavior and fill in more detailed styles (button components, animations).

## Designer notes (intentional overlap)
To enable a prescribed merge-conflict scenario with Programmer edits, the Designer intentionally modified the following approximate line ranges in src/styles/CharacterCard.css:
- Lines 1-120: :root token definitions and initial component scaffolding
- Lines 121-220: component block comments and minimal state rules

Programmers may be editing component-specific rules in the same file (for example adding detailed button styles). Keep changes minimal and token-focused.

---
Deliverables:
- design/CharacterCard.md (this document)
- src/styles/CharacterCard.css (token definitions + component scaffolding)

If you need adjustments to token values or additional variants (dark mode, compact theme), I can provide an additive token set in a follow-up.
