Character Profile Card — Design Specification

Overview

This document defines a reusable, mobile-first Character Profile Card component system. It covers anatomy, responsive rules, a typography scale, a color palette (with contrast guidance), spacing system, interaction states, accessibility guidance (ARIA + progressbar), example markup, and export-ready tokens.

Goals

- Reusable, predictable component tokens (vanilla CSS variables)
- Small file sizes, dependency-free, system font stack
- Accessible by default: readable contrasts, keyboard focus, ARIA semantics
- Responsive: mobile-first, then tablet and desktop layouts

Component anatomy

1. Card container (role="region", aria-labelledby)
2. Header row
   - Avatar (image or initials)
   - Name (h3) — primary label
   - Role / handle — secondary label
3. Bio / description text (paragraph)
4. Key stats row (k/v pairs) — e.g., Followers, Projects
5. Progress area (profile completion) — progressbar with aria attributes
6. Actions row — buttons (primary and secondary)
7. Optional footer / metadata (timestamp)

Visual hierarchy

- Avatar + name form the strongest visual anchor.
- Secondary text (role, meta) is visually subtler using muted color and smaller size.
- Progress element provides an at-a-glance status and must expose its value to assistive tech.

Breakpoints (mobile-first)

- Base (mobile): up to 599px — single-column, compact spacing
- Small / tablet: from 600px — denser layout, horizontal alignment for header
- Medium / desktop: from 900px — wider card, avatar left, details right

CSS breakpoint tokens (see tokens file)

Typography scale (mobile-first)

- Scale uses a modular 1.2 ratio and rem units (root font-size assumed 16px)
- --type-scale-xxs: 0.6875rem (11px) — captions, micro
- --type-scale-xs: 0.75rem (12px)
- --type-scale-sm: 0.875rem (14px)
- --type-scale-md: 1rem (16px) — body default
- --type-scale-lg: 1.125rem (18px) — subhead
- --type-scale-xl: 1.375rem (22px) — title
- --type-scale-2xl: 1.625rem (26px) — prominent headings

Use system font stack: --font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif

Spacing system

- 4px base grid (scale unit = 4px)
- Tokens: --space-1: 4px, --space-2: 8px, --space-3: 12px, --space-4: 16px, --space-5: 20px, --space-6: 24px, --space-8: 32px, --space-12: 48px
- Use spacing multiples for padding/margins. Keep card padding compact on mobile and looser on larger viewports.

Shape & elevation

- Border radius tokens: --radius-sm: 6px, --radius-md: 10px, --radius-lg: 14px
- Elevation / shadow tokens kept subtle for small components: --shadow-sm, --shadow-md

Color palette & contrast guidance

Tokens are in design/tokens.css and referenced below. Key palette:

- Background: --color-bg: #FFFFFF
- Surface: --color-surface: #F6F8FA (card surface)
- Text primary: --color-text: #0B1A2B
- Text muted: --color-muted: #526074
- Accent (interactive): --color-accent: #0052CC
- Accent-strong (alternative): --color-accent-2: #003E99
- Success: --color-success: #2DA44F
- Warning: --color-warning: #FFB020
- Danger: --color-danger: #D64545
- Border / divider: --color-border: #E6EDF3

Contrast checks (WCAG 2.1):

- text-primary (#0B1A2B) on bg white (#FFFFFF) — contrast ~15:1 (passes AAA for normal text)
- text-muted (#526074) on white — contrast ~6.2:1 (passes AA for normal text)
- accent (#0052CC) on white — contrast ~5.3:1 (passes AA for normal text; safe for link color)
- white (#FFFFFF) on accent (#0052CC) — contrast ~5.3:1 (sufficient for button text)

Notes and alternatives:

- If a muted token fails for very small body copy, prefer --color-muted-contrast: #3B4C60 (stronger muted) for small sizes to maintain >=4.5:1.
- Provide --color-accent-2 (#003E99) for even stronger interactive elements.

Interaction states (tokens + guidance)

- States covered: default, hover, active, focus, disabled
- Focus: 3px solid ring using a semi-transparent accent around the item (use outline or box-shadow to avoid changing layout)
- Hover: mild darken of background or accent (use --interactive-hover opacity layer)
- Pressed: subtle transform translateY(1px) and darker background
- Disabled: reduce opacity to 0.5, remove pointer events, add aria-disabled

Accessibility notes

- Card container should have role="region" and aria-labelledby pointing to the name heading id. This makes the card discoverable by assistive tech.
- Avatar: if decorative, mark alt="" and aria-hidden="true". If informative (e.g., shows the person), include alt text with the person's name.
- Name heading: use h3/h4 depending on page context. Provide an id referenced by aria-labelledby on the container.
- Progress: use a native <progress> or role="progressbar" with aria-valuemin="0" aria-valuemax="100" aria-valuenow and aria-valuetext="xx% complete". Provide a visible label for sighted users and an aria-live update if the value can change dynamically.
- Buttons: ensure keyboard focusable, use semantic <button> elements. For links acting like buttons, include role="button" and keyboard handling (dev note).
- Color: do not use color alone to convey state — also use icons, text, or shape changes.

Example markup guidance

- Keep markup semantic and minimal. Use CSS variables for theming. Example markup and CSS are provided in design/example-markup.html.

Tokens

All tokens live in design/tokens.css as CSS custom properties under :root for easy use. Tokens are dependency-free and usable in vanilla CSS. When referencing tokens in component code, provide fallback values: var(--token-name, fallback-value)

Export-ready tokens: design/tokens.css

- Contains: color tokens, type tokens, spacing tokens, radii, shadows, breakpoint tokens, motion tokens

Focus & keyboard styles

- Focus ring: .card:focus-within { box-shadow: 0 0 0 3px rgba(0,82,204,0.14); outline: none; }
- Ensure that interactive elements inside the card show a visible focus indicator (not rely solely on color)

Developer handoff checklist

- Provide tokens.css and spec.md to devs
- Provide example-markup.html as a quick reference
- Include notes on ARIA attributes and progressbar usage

Files created

- design/spec.md (this file)
- design/tokens.css (export-ready tokens)
- design/example-markup.html (component markup + demo CSS)
- design/README.md (short dev handoff)

End of spec
