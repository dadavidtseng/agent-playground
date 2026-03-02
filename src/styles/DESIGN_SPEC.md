Design System Spec

File: src/styles/DESIGN_SPEC.md
Purpose: Document breakpoints, component variants, accessibility guidelines, and token usage for this project.

1. Breakpoints

We use a simple, responsive breakpoint system to cover common device ranges. These breakpoints are suggestions — components should be designed to be responsive by default.

- Mobile (default): up to 639px
  - Base styles target mobile-first behavior.
- Medium (tablet / small desktops): 640px - 1023px
  - @media (min-width: 640px) { ... }
- Desktop (large screens): 1024px and up
  - @media (min-width: 1024px) { ... }

Notes:
- Prefer fluid layouts and relative units (rem, %) over fixed pixel widths.
- Use the tokens for spacing, typography, and radii to maintain rhythm across breakpoints.

2. Component Variants

Each component should support two primary layout/spacing variants to adapt to different contexts: compact and expanded.

- Compact
  - Use when space is constrained: tighter padding and smaller type scale.
  - Implementation: add class .variant-compact to component root.
  - Example adjustments: padding: var(--space-sm); font-size: var(--type-sm); border-radius: var(--radius-sm);

- Expanded
  - Use when component should provide more emphasis or breathing-room.
  - Implementation: add class .variant-expanded to component root.
  - Example adjustments: padding: var(--space-lg); font-size: var(--type-md);

3. Accessibility Guidelines

This section provides recommended practices and ARIA patterns to ensure accessible components.

- Keyboard focus
  - Always provide a visible focus indicator for interactive elements.
  - Use the design token --focus-ring for a consistent focus style.
  - Example: .component:focus { outline: none; box-shadow: var(--focus-ring); }

- ARIA examples
  - Card with selectable/focusable behavior:
    <div class="character-card" role="button" tabindex="0" aria-pressed="false">
      <!-- card content -->
    </div>
  - Use aria-live for status messages or announcements when content updates dynamically:
    <div aria-live="polite">...</div>

- Reduced motion
  - Honor user preferences. Wrap animations/transitions within @media (prefers-reduced-motion: no-preference) {
    /* animations here */
  }
  - Alternatively, disable transitions when prefers-reduced-motion: reduce.

- Color contrast
  - Ensure text on background tokens meets WCAG AA (4.5:1 for normal text) where possible.
  - When introducing custom brand colors, verify contrast ratios against --color-bg and --color-card.

4. Token Naming & Coordination

To avoid merge conflicts and keep parity between design and development, the following token names are expected and referenced throughout styles and components. Do not rename these tokens without coordinating with the Programmer.

Typography:
  --type-xxl, --type-xl, --type-lg, --type-md, --type-sm

Colors:
  --color-bg, --color-card, --color-accent, --color-primary-text, --color-muted, --color-success, --color-danger

Spacing:
  --space-xxl, --space-xl, --space-lg, --space-md, --space-sm

Radii:
  --radius-sm, --radius-md

Interaction:
  --focus-ring, --elevation-1, --elevation-2

5. Conflict Resolution Guidance with Programmer

- If a Programmer proposes changes to token names or values, prefer:
  1) Adding new tokens for experimental use and keeping existing tokens stable.
  2) Opening a brief PR that updates token names with a clear migration plan (deprecate old tokens, create aliases temporarily).
  3) Use semantic token names (e.g., --color-text-primary) rather than contextual ones tied to components.

- When merging:
  - Rebase feature branches on main to reduce conflicts.
  - If token value conflicts occur, prefer the value in main; communicate via PR comments and update the DESIGN_SPEC.md with rationale.

6. Usage Examples

Import tokens in your component stylesheet or HTML:

@import "../styles/design-tokens.css";

Example: character-card CSS (snippets)

.character-card {
  background: var(--color-card);
  color: var(--color-primary-text);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-1);
  font-size: var(--type-md);
}

.character-card__title {
  font-size: var(--type-lg);
}

.character-card.variant-compact {
  padding: var(--space-sm);
  font-size: var(--type-sm);
  border-radius: var(--radius-sm);
}

7. Breakpoint examples

/* Mobile-first */
.character-card { padding: var(--space-md); }
@media (min-width: 640px) {
  .character-card { padding: var(--space-lg); }
}
@media (min-width: 1024px) {
  .character-card { padding: var(--space-xl); }
}

End of DESIGN_SPEC.md
