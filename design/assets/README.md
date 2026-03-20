Warrior SVG assets

Files:
- warrior-48.svg (48x48 export of pixel-art warrior)
- warrior-128.svg (128x128 export)
- warrior-256.svg (256x256 export)
- sprite.svg (SVG sprite containing <symbol id="warrior-default">...)</n
ViewBox and scaling:
- Each individual SVG uses a viewBox that maps pixel grid to vector coordinates for crisp pixel rendering:
  - warrior-48.svg: viewBox="0 0 16 16" (scaled to 48x48 via width/height)
  - warrior-128.svg: viewBox="0 0 32 32" (scaled to 128x128)
  - warrior-256.svg: viewBox="0 0 64 64" (scaled to 256x256)
- preserveAspectRatio="xMidYMid meet" is used to keep the sprite centered and preserve pixel aspect.
- style includes shape-rendering:crispEdges and image-rendering:pixelated to ensure scaled-up pixel-art remains sharp.

Layer/group naming convention (used inside each SVG):
- base: core filled shapes (skin, armor, cloak, torso, legs)
- shading: darker fills for depth
- outline: black/contrast pixels that define silhouette
- equipment: items (sword, shield, helmet accents)

ID and sprite conventions:
- Sprite symbol ID uses the avatarId naming convention: warrior-default
- Individual SVGs use id attributes like warrior-default-48, warrior-default-128, warrior-default-256
- When referencing the sprite in HTML, use <svg width="48" height="48"><use href="sprite.svg#warrior-default"></use></svg>

Design notes:
- Pixel-art created using <rect> elements aligned to integer grid values. No raster images embedded.
- Palette limited to 8 colors: #000000, #FFFFFF (unused), #556B2F, #2F4F4F, #F2D2B6, #FFD700, #3B2F2F, #C0C0C0
- Paths are minified into rect elements to keep SVG small and web-friendly.

Rendering check:
- The assets should render crisply in modern browsers. To preview, open warrior-128.svg in a browser or include sprite.svg via <use> as shown above.

SVG id conventions:
- symbol IDs: <symbol id="warrior-default"> for sprite
- group IDs: base, shading, outline, equipment
- individual file IDs: warrior-default-<size>
