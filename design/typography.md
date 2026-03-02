Design: Typography Scale and Tokens

Overview

This document defines the responsive typography scale, tokens, and usage guidance for mobile, tablet, and desktop breakpoints. Tokens are implemented as CSS custom properties (variables) with consistent naming so designers and developers can use them directly in stylesheets.

Token naming conventions

- Font family tokens: --font-family-*
- Font size tokens: --font-size-*
- Line-height tokens: --line-height-*
- Font weight tokens: --font-weight-*
- Letter spacing tokens: --letter-spacing-*
- Utility tokens for responsive scale using clamp and breakpoint overrides: --font-base, --font-scale-ratio

Notes about merge

This file was reviewed and merged with contributions from the Artist. Where the Artist proposed shorthand token names (for example: --fs-*, --fw-*), those were standardized to the full, descriptive form above (--font-size-*, --font-weight-*). The Artist also suggested adding a serif family token for decorative headings; that token is included below as optional.

Base tokens (global)

:root tokens (finalized)

- --font-family-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
- --font-family-serif: "Merriweather", Georgia, "Times New Roman", serif; /* optional — recommended for display/heading use */
- --font-family-mono: "Source Code Pro", ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
- --font-weight-regular: 400;
- --font-weight-medium: 500;
- --font-weight-semibold: 600;
- --font-weight-bold: 700;
- --font-base: 1rem; /* 16px baseline */
- --font-scale-ratio: 1.25; /* modular scale */

Scale tokens (mobile-first)

We provide explicit size tokens. These map to typical usage roles (UI, body, headings). Values are mobile-first; larger breakpoints override if needed.

- --font-size-xs: clamp(0.6875rem, 0.6rem + 0.2vw, 0.75rem); /* ~11px - 12px */
- --font-size-sm: clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem); /* ~13px - 14px */
- --font-size-base: clamp(0.9375rem, 0.9rem + 0.3vw, 1rem); /* ~15px - 16px */
- --font-size-lg: clamp(1.125rem, 1.05rem + 0.4vw, 1.125rem); /* ~18px */
- --font-size-xl: clamp(1.375rem, 1.25rem + 0.6vw, 1.5rem); /* ~22px - 24px */
- --font-size-2xl: clamp(1.75rem, 1.6rem + 0.8vw, 2rem); /* ~28px - 32px */
- --font-size-3xl: clamp(2.25rem, 2rem + 1vw, 2.5rem); /* ~36px - 40px */

Line-height tokens

- --line-height-none: 1;
- --line-height-tight: 1.15;
- --line-height-default: 1.5;
- --line-height-loose: 1.75;

Letter spacing tokens

- --letter-spacing-tight: -0.01em;
- --letter-spacing-normal: 0;
- --letter-spacing-wide: 0.02em;

Role-based mapping (examples)

- Body copy
  - font-family: var(--font-family-sans)
  - font-size: var(--font-size-base)
  - line-height: var(--line-height-default)
  - font-weight: var(--font-weight-regular)

- Small UI text / captions
  - font-size: var(--font-size-sm)
  - line-height: var(--line-height-default)
  - font-weight: var(--font-weight-medium)

- H1 (page title)
  - font-family: var(--font-family-serif) /* optional */
  - font-size: var(--font-size-3xl)
  - line-height: var(--line-height-tight)
  - font-weight: var(--font-weight-bold)

- H2
  - font-size: var(--font-size-2xl)
  - line-height: var(--line-height-tight)
  - font-weight: var(--font-weight-semibold)

- H3
  - font-size: var(--font-size-xl)
  - line-height: var(--line-height-tight)
  - font-weight: var(--font-weight-semibold)

Finalized token list (for developers)

Use these tokens as the canonical set. The Artist proposed a shorthand mapping; we converted those into the canonical names below and documented the mapping in the changelog.

Font families
- --font-family-sans
- --font-family-serif (optional)
- --font-family-mono

Font sizes
- --font-size-xs
- --font-size-sm
- --font-size-base
- --font-size-lg
- --font-size-xl
- --font-size-2xl
- --font-size-3xl

Font weights
- --font-weight-regular
- --font-weight-medium
- --font-weight-semibold
- --font-weight-bold

Line heights
- --line-height-none
- --line-height-tight
- --line-height-default
- --line-height-loose

Letter spacing
- --letter-spacing-tight
- --letter-spacing-normal
- --letter-spacing-wide

Example CSS snippet

:root {
  --font-family-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  --font-family-serif: "Merriweather", Georgia, "Times New Roman", serif;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --font-size-xs: clamp(0.6875rem, 0.6rem + 0.2vw, 0.75rem);
  --font-size-sm: clamp(0.8125rem, 0.75rem + 0.2vw, 0.875rem);
  --font-size-base: clamp(0.9375rem, 0.9rem + 0.3vw, 1rem);
  --font-size-lg: clamp(1.125rem, 1.05rem + 0.4vw, 1.125rem);
  --font-size-xl: clamp(1.375rem, 1.25rem + 0.6vw, 1.5rem);
  --font-size-2xl: clamp(1.75rem, 1.6rem + 0.8vw, 2rem);
  --font-size-3xl: clamp(2.25rem, 2rem + 1vw, 2.5rem);

  --line-height-default: 1.5;
  --line-height-tight: 1.15;
}

/* Usage example */
body {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-default);
  color: var(--color-text);
}

h1 { font-family: var(--font-family-serif); font-size: var(--font-size-3xl); line-height: var(--line-height-tight); font-weight: var(--font-weight-bold); }
h2 { font-size: var(--font-size-2xl); line-height: var(--line-height-tight); font-weight: var(--font-weight-semibold); }

Accessibility notes

- Use rem-based tokens (as above) so user zoom and browser settings scale correctly.
- Maintain sufficient line-height for body/copy: at least 1.4 for long-form content.
- Avoid using very small text for interactive controls; 13-14px is recommended minimum on mobile for tappable labels.
- For headings, prefer tighter line-height (1.15 - 1.25) but allow breathing room with margin.

Breakpoint overrides

If a project prefers explicit overrides instead of clamp(), provide rules per breakpoint:

@media (min-width: 768px) {
  :root {
    --font-size-base: 1rem; /* 16px */
    --font-size-xl: 1.5rem; /* 24px */
    --font-size-2xl: 2rem; /* 32px */
  }
}

@media (min-width: 1280px) {
  :root {
    --font-size-base: 1.0625rem; /* 17px */
    --font-size-3xl: 2.5rem; /* 40px */
  }
}

Notes for developers

- Tokens above reference color tokens (e.g., var(--color-text)). Ensure color tokens are imported before typography tokens in global CSS.
- When integrating web fonts, use font-display: swap to avoid FOIT.

References

- Adopt a consistent token naming scheme to avoid friction between design and engineering. This file is the authoritative source for typography tokens in the repository.
