SVG Inline Snippets and Usage

Files added
- inline-snippets/warrior-32.inline.svg  (32px inline example)
- inline-snippets/warrior-64.inline.svg  (64px scaled example)
- inline-snippets/warrior-64.animated.inline.svg  (64px example with simple blink animation)
- warrior-32.opt.svg (optimized file version)

How to inline
1. Copy the contents of the .inline.svg file and paste directly into your HTML where you want the avatar to appear.
2. Example:
   <svg ...>...</svg>

Scaling recommendations for pixel-art avatars
- Keep the original viewBox width/height as the design grid (here 32). When scaling, set the SVG width/height to an integer multiple of the original grid (e.g., 64, 96, 128 for 2x, 3x, 4x). This preserves crisp, blocky pixels.
- Use style attribute: image-rendering:pixelated and shape-rendering:crispEdges to enforce nearest-neighbor scaling in modern browsers.
- Example: <svg viewBox="0 0 32 32" width="128" height="128" style="image-rendering:pixelated; shape-rendering:crispEdges">...

ViewBox and grid alignment
- Keep viewBox matching the original grid (0 0 32 32). All rectangles are positioned on integer coordinates. Avoid non-integer scaling (e.g., 1.5x) which causes blurring.

Animation note
- The animated snippet uses a simple SMIL <animate> element which works in most browsers but may be restricted in some contexts. For maximum compatibility, convert to CSS animations or animate via JavaScript if needed.

Limitations
- Snippets are pure vector using <rect> elements; no raster data URIs are embedded.
- Browser behavior for image-rendering may vary; test in target environments.
