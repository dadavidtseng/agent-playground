Project README

Preview instructions:

- To preview components, open src/components/character-card.html in a browser. The component consumes design tokens from src/styles/design-tokens.css. If your local server doesn't auto-reload, refresh the page after making style changes.

How to use design tokens:

1) Ensure design tokens are included in your app. Example import at the top of a component stylesheet:

   @import "../styles/design-tokens.css";

2) Apply tokens in components using var(--token-name). Example for .character-card:

   .character-card {
     background: var(--color-card);
     color: var(--color-primary-text);
     padding: var(--space-md);
     border-radius: var(--radius-md);
     box-shadow: var(--elevation-1);
     font-size: var(--type-md);
   }

3) Compact / expanded variants:

   .character-card.variant-compact { padding: var(--space-sm); font-size: var(--type-sm); }
   .character-card.variant-expanded { padding: var(--space-lg); font-size: var(--type-md); }

Conflict resolution notes (how to coordinate with Programmer):

- Token names expected by code: --type-xxl, --type-xl, --type-lg, --type-md, --type-sm; --color-bg, --color-card, --color-accent, --color-primary-text, --color-muted, --color-success, --color-danger; --space-xxl, --space-xl, --space-lg, --space-md, --space-sm; --radius-sm, --radius-md; --focus-ring, --elevation-1, --elevation-2.

- If you need to change token names/semantics, create aliases first and communicate planned deprecations in PR descriptions. Example:

  :root {
    --color-primary-text: #0F172A;
    --color-text: var(--color-primary-text); /* alias for migration */
  }

- When merging branches, rebase frequently and resolve token conflicts by keeping main authoritative, documenting changes, and creating migration aliases as needed.

Notes for reviewers:
- This change adds only style assets: src/styles/design-tokens.css and src/styles/DESIGN_SPEC.md, and updates README.md with preview instructions.

