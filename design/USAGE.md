Design tokens and responsive guidelines

Files created:
- design/spec.json  -> JSON design spec with tokens, breakpoints, motion, and component guidance
- design/tokens.css -> :root CSS variables and example .character-card styles and responsive rules

WCAG contrast
- Body text color --color-text-primary (#111827) on --color-background (#FFFFFF) has contrast ratio ~15.3:1 (meets WCAG AA and AAA for normal text).
- Secondary text --color-text-secondary (#374151) has ~7.2:1 contrast vs white (meets WCAG AA).

Typography
- Base font-size: 16px. Scale provided for headings, body, small body, and caption. Line-heights chosen to respect 8px baseline where possible.

Spacing
- 8px baseline. Spacing tokens provided as --space-1..--space-10.

Breakpoints and responsive layout rules for Character Card
- Mobile (<=599px): stacked layout. Avatar left, name and metadata stacked. Actions appear to the right or below as icons. Use .character-card default styles.
- Tablet (600px-1023px): horizontal layout: increased padding and avatar size. Use media query @media (min-width: 600px)
- Desktop (>=1024px): expanded layout: larger avatar, more padding; actions become text buttons to the right. Use @media (min-width: 1024px)

Example usage for developers
- Import design/tokens.css in a global stylesheet and use variables directly, e.g. background: var(--color-background);
- Typography example: .body { font-size: var(--font-size-body); line-height: var(--line-height-body); }
- Motion example: .fade-in { transition: opacity var(--motion-normal) var(--easing-standard); }

Notes
- Only CSS variables are used. No preprocessor features.
- Use transform + opacity for performant animations.
