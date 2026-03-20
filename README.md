CharCard Component

This repository contains a lightweight Web Component "CharCard" implemented with plain HTML/CSS/JS.

Files created:
- demo/index.html — demo page that loads and shows an example character
- styles/char-card.css — styling for the component and demo
- scripts/char-card.js — ES module implementing the <char-card> web component

Public API
- <char-card> element
- Property: .data — set an object describing the character
  {
    name: string,
    class: string,
    level: number,
    bio: string,
    stats: { hp: number (0-100), attack: number, defense: number, speed: number },
    avatarSvg: string (inline SVG markup),
    variant: string (optional)
  }

Examples
- In demo/index.html the component is used and populated from example JSON. The SVG asset is passed as a string to avatarSvg and inlined into the component.

Accessibility
- Stat bars use role="progressbar" and have aria-valuenow / aria-valuemin / aria-valuemax
- Stat bars are keyboard-focusable (tabindex=0)
- Animation respects prefers-reduced-motion

How to swap SVG
- Provide a new SVG string in the avatarSvg property. The component inlines the SVG and sets width/height to 100% for crisp rendering.

Basic test steps
1. Open demo/index.html in a browser that supports ES modules and Web Components.
2. The CharCard should display with avatar, meta, bio, and four stat bars.
3. On load the stat bars animate filling to their values (unless prefers-reduced-motion is enabled).
4. Tab to stat bars to see focus outline and verify aria-valuenow attributes in devtools.

Design tokens / breakpoints
- Breakpoints are defined in styles/char-card.css as CSS variables (--bp-sm, --bp-md, --bp-lg)
- The component responds to narrow viewports by stacking and resizing avatar
