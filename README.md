CharacterCard Component

Files added:
- src/components/CharacterCard/index.html
- src/components/CharacterCard/style.css
- src/components/CharacterCard/script.js

Overview:
This component is a self-contained character card UI designed for integration into the KĀDI multi-agent system frontend. It uses design tokens (CSS variables) from design/tokens/colors.css when available; fallback variables are defined in style.css.

Features:
- Responsive layout: horizontal on wide screens, stacked on small screens
- Animated stat bars with CSS transitions; animations respect prefers-reduced-motion
- Accessible stat bars implemented with role="progressbar", aria-valuemin/max/now, and keyboard controls (Arrow keys to adjust values)
- Inline SVG avatar for controllable styling without rasterization
- Buttons are keyboard-focusable and have visible focus styles

Integration & Usage:
1. Copy the CharacterCard folder into your project and include index.html content where desired. Ensure style.css and script.js are referenced relative to that HTML file.
2. If your project provides design/tokens/colors.css, include it before the component's style.css so that the token variables are available and override the fallback ones.

Notes on design/tokens/colors.css merge:
- No design/tokens/colors.css file was present in the repository at the time of implementing this component.
- Per contributor guidelines, if a colors.css exists in a different branch or later addition and causes merge conflicts, prefer the canonical variable names (e.g., --accent-500, --accent-700, --card-bg) and preserve the Designer's provided values. If you must resolve conflicts, document the decision in the PR description and keep the Designer's color values when possible.

Accessibility considerations:
- Stat bars are focusable and respond to ArrowUp/ArrowRight to increase and ArrowDown/ArrowLeft to decrease. Shift+Arrow adjusts in steps of 10.
- Buttons use :focus-visible and have an explicit focus outline for keyboard users.
- SVG includes title/desc for screen readers.

Developer notes:
- The component intentionally does not include backend integration.
- Animated fills initialize on DOMContentLoaded and will animate again when stats change via the Randomize button or keyboard input.
- The component uses inline SVG to allow theming via CSS variables. SVG shapes remain vector.

If you want me to also create a small demo page or integrate token imports (e.g., @import "../../design/tokens/colors.css"), tell me where to place it and I will update the files.
