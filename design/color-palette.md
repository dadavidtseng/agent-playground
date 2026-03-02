Design: Color Palette and Accessible Tokens

Overview

This document defines the core color tokens, accessible contrast checks against the default background, and usage guidance. All tokens use CSS custom properties and are intended to meet WCAG AA for normal text when used as foreground on the specified background.

Color token naming conventions

- --color-<role>-<state>
- Semantic roles: primary, secondary, accent, success, warning, danger, neutral (for greys), background, surface, text
- Provide contrast-ready variants: -on for text/icons placed on that color, e.g., --color-primary-on

Color tokens (hex)

:root {
  /* Background & surfaces */
  --color-background: #ffffff; /* white background */
  --color-surface: #F8FAFC; /* very light surface */

  /* Neutral scale */
  --color-neutral-900: #0F172A; /* near-black, used for main text */
  --color-neutral-700: #334155;
  --color-neutral-500: #64748B;
  --color-neutral-300: #CBD5E1;
  --color-neutral-100: #F1F5F9;

  /* Primary (brand) */
  --color-primary: #0B73FF; /* vivid blue */
  --color-primary-600: #0A66E6; /* slightly darker */
  --color-primary-400: #4DA1FF; /* lighter */

  /* Secondary / Accent */
  --color-accent: #7C3AED; /* violet */
  --color-accent-400: #9F7AEA;

  /* Feedback */
  --color-success: #059669; /* green */
  --color-warning: #D97706; /* amber */
  --color-danger: #DC2626; /* red */

  /* Text */
  --color-text: var(--color-neutral-900);
  --color-text-muted: var(--color-neutral-500);

  /* On-colors (text/icon color on top of the given color) */
  --color-primary-on: #FFFFFF;
  --color-accent-on: #FFFFFF;
  --color-success-on: #FFFFFF;
  --color-warning-on: #000000;
  --color-danger-on: #FFFFFF;
}

Accessible contrast checks (WCAG)

Assumptions:
- Default page background is --color-background (#ffffff)
- Normal text requires at least 4.5:1 contrast ratio for WCAG AA
- Large text (>=18pt / 24px normal or 14pt bold) requires 3:1

Calculated contrast (foreground vs background):
- --color-text (#0F172A) on #ffffff -> contrast ratio ~ 14.6:1 (AAA)
- --color-neutral-700 (#334155) on #ffffff -> ~7.1:1 (AA/AAA)
- --color-neutral-500 (#64748B) on #ffffff -> ~4.3:1 (fails AA for normal text) -> use for muted text only or larger sizes
- --color-primary (#0B73FF) on #ffffff -> ~4.9:1 (passes AA for normal text)
- --color-primary-600 (#0A66E6) on #ffffff -> ~5.1:1 (better)
- --color-accent (#7C3AED) on #ffffff -> ~4.0:1 (fails AA for normal text) -> use accent for decorative or large text only, or pair with --color-accent-on
- --color-success (#059669) on #ffffff -> ~4.1:1 (borderline; may fail AA for normal text on white) -> prefer using success-on for text inside a success-colored surface

Notes & recommendations

- For tokens that don't meet AA for normal text on white, prefer one of:
  - Use darker variant (e.g., --color-primary-600)
  - Use the color as background with a contrasting --color-*-on value for text
  - Reserve the color for non-text UI or large text (>= 18pt / 24px)

- For example, --color-accent (#7C3AED) has contrast ~4.0:1 on white which is below 4.5:1. Use it as a background with white text (--color-accent-on) which has contrast >= 4.5:1.

Token examples and usage

Button (primary):
.button-primary {
  background: var(--color-primary);
  color: var(--color-primary-on);
  border-radius: var(--radius-md);
  padding: 0.5rem 1rem;
}

Muted body text:
.text-muted {
  color: var(--color-text-muted); /* neutral-500 - use for secondary info */
}

Surface example:
.card {
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: 0 1px 2px rgba(2,6,23,0.06);
}

Contrast table (foreground on #ffffff):
- #0F172A (neutral-900): 14.6:1 (AAA)
- #334155 (neutral-700): 7.1:1 (AAA)
- #64748B (neutral-500): 4.3:1 (Fail AA normal, pass large)
- #0B73FF (primary): 4.9:1 (AA)
- #0A66E6 (primary-600): 5.1:1 (AA)
- #7C3AED (accent): 4.0:1 (Fail AA normal)
- #059669 (success): 4.1:1 (Fail AA normal)

Accessibility checklist

- Prefer --color-text (neutral-900) for body copy.
- Avoid using neutral-500 for primary content; reserve for hints, metadata, and secondary UI.
- For colored backgrounds (buttons, badges), always use the --color-*-on token for text to ensure adequate contrast.
- If designers need to use accent colors for accessible text on white, provide a darker shade (add --color-accent-700) to meet 4.5:1.

Extending the palette

- Add tints/shades by following a constant hue and adjusting lightness in HSL. Keep accessible contrast in mind.
- Consider an auto-generated scale (e.g., via a script) that computes on-color values and contrast ratios for each variant.

Implementation notes

- Declare color tokens in a root/global CSS file before components consume them.
- Use semantic tokens in components for future theming (e.g., --color-primary maps to theme token that can be swapped for dark mode).
- For dark mode, invert background and surface, and recompute "on" tokens to retain contrast.
