Warrior SVG assets

Files:
- warrior-full.svg       - Full-body pixel-art (viewBox 0 0 64 64). Uses pixel rectangles grouped by layer.
- warrior-head.svg       - Headshot/icon (viewBox 0 0 48 48).
- warrior-variant1.svg   - Alternate color variant (warm red armor).
- warrior-variant2.svg   - Alternate color variant (blue-gray armor).
- warrior-outline.svg    - Monochrome outline for disabled state.
- svgo-config.json       - SVGO configuration for repeated optimization.

Naming conventions:
- Use kebab-case with descriptive parts: <character>-<type>.svg
  - character: warrior
  - type: full | head | variant1 | variant2 | outline
- Example: warrior-full.svg, warrior-variant1.svg

Layer grouping and recoloring guide:
- Each SVG groups pixels into <g> elements with data-layer attributes. Recommended layers:
  - shadow: ground shadow under feet
  - legs: leg base color
  - boots: boot color
  - torso: main armor color
  - arms: arm armor matching torso
  - cloth: skirt/cloth under armor
  - metal: metallic elements like sword and helmet rim
  - skin: face/hand pixels
  - hair: hair pixels
  - accent: small gold/trim details
  - shoulder: shoulder pads

Recoloring workflow:
- For inline SVG recoloring, target the group's fill attribute. Example to change armor color in CSS:
  svg .torso { fill: #RRGGBB }
- For programmatic recolor (JS), query the g[data-layer="torso"] element and set its 'fill' attribute.
- Keep palette limited (<=16 colors) to preserve pixel-art style and optimization.

SVGO config notes:
- svgo-config.json enables multipass optimization and removes unnecessary metadata and comments.
- It preserves explicit fills and simple group structure to keep layers intact for recoloring.
- Recommended command: svgo --config=assets/svg/svgo-config.json assets/svg/*.svg
