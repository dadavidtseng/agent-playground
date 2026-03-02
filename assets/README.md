SVG assets for pixel-art warrior character

Files:
- assets/svg/warrior-32.svg  -> 32x32 display (viewBox 0 0 16 16) - best for very small icons / UI
- assets/svg/warrior-64.svg  -> 64x64 display (viewBox 0 0 32 32) - mobile / avatars
- assets/svg/warrior-128.svg -> 128x128 display (viewBox 0 0 64 64) - larger thumbnails / desktop

Usage notes:
- These SVGs are constructed from rect elements on a grid to preserve a pixel-art aesthetic while remaining vector. Use the SVGs directly in <img> tags, <svg> inlined in HTML, or as background images.
- To preserve crisp pixel edges when scaling, use image-rendering: pixelated; in CSS when rendering at non-integer multiples. Example:

  img.pixel-art { image-rendering: pixelated; width: 64px; height: 64px; }

- Recommended display sizes:
  - warrior-32.svg: show at 16-48px
  - warrior-64.svg: show at 48-96px
  - warrior-128.svg: show at 96-256px

Accessibility / alt text suggestions:
- Short: "Pixel-art warrior character"
- Descriptive: "Pixel-art warrior wearing dark helmet and red cape, holding a shield and sword"
- Long (for context): "Pixel-art style warrior facing forward, wearing a dark helmet and gray armor, red cape on both sides, holding a golden shield on left and a sword on the right"

Optimization notes:
- SVGs are minimized: no metadata, only rect elements with a limited palette (<=16 colors) and crispEdges shape-rendering to keep pixel look.
- If you need a single responsive SVG with multiple viewBoxes, consider inlining the largest (warrior-128.svg) and scaling via viewBox and width/height attributes.
