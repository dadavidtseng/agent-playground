Character Profile Card — Developer Handoff

Files included:

- tokens.css — CSS custom properties (export-ready tokens). Use var(--token, fallback) in your styles.
- spec.md — Design specification: anatomy, breakpoints, accessibility notes, contrast guidance.
- example-markup.html — Minimal example demonstrating the component across breakpoints and accessibility attributes.

Usage notes:

- Tokens are plain CSS variables in :root. Import tokens.css before component styles.
- Use semantic HTML: <article role="region" aria-labelledby="..."> with heading inside.
- For progress, prefer the native <progress> element. If you must use a custom progress bar, include role="progressbar" and aria-valuemin/now/max and aria-valuetext.
- Focus styles use --focus-ring; ensure focus is visible for keyboard users.

Colors & contrast:

- Primary text and accent colors meet WCAG 2.1 AA/AAA as documented in spec.md. For small / fine text, use --color-muted-contrast instead of --color-muted.

Token examples:

background: var(--color-bg, #fff);
font-size: var(--type-scale-md, 1rem);
padding: var(--space-4, 16px);

Notes on theming:

- Tokens can be overridden in a theme-specific :root or .theme-dark selector.
- Keep token names stable to allow cross-project consistency.
