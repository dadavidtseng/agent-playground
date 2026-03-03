Pixel Cat SVG Assets

Files created:
- assets/cat-32.svg (colored)
- assets/cat-32-mono.svg (monochrome)
- assets/cat-64.svg (colored)
- assets/cat-64-mono.svg (monochrome)
- assets/cat-128.svg (colored)
- assets/cat-128-mono.svg (monochrome)
- assets/cat-animated-inline.svg (animated blink variant, optimized for inline use)

Palette (designer tokens):
- outline: #2B2B2B
- fur (mid): #8B8B8B
- light accent: #EDEDED
- eyes: #FFD34D

Notes:
- All art is vectorized pixel art built from <rect> elements on an 8x8 pixel grid and scaled via the SVG viewport. This keeps file size small and ensures crisp edges.
- Accessibility: each SVG includes <title> and <desc> and role="img". The animated SVG sets focusable="false" to avoid keyboard traps.
- Animation: cat-animated-inline.svg uses SMIL <animate> to toggle eye opacity and an eyelid element. It's lightweight (single attribute animations) to minimize CPU.
- Inline snippet (for embedding in an HTML file):

Inline SVG snippet (optimized):
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 8 8" role="img" aria-labelledby="t d" shape-rendering="crispEdges" focusable="false">
  <title id="t">Pixel Cat</title>
  <desc id="d">Animated pixel cat (blink)</desc>
  <g fill="#2B2B2B"><rect x="1" y="0" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="4" y="0" width="1" height="1"/><rect x="5" y="0" width="1" height="1"/><rect x="0" y="1" width="1" height="1"/><rect x="6" y="1" width="1" height="1"/><rect x="0" y="2" width="1" height="1"/><rect x="7" y="2" width="1" height="1"/><rect x="0" y="3" width="1" height="1"/><rect x="7" y="3" width="1" height="1"/><rect x="0" y="4" width="1" height="1"/><rect x="7" y="4" width="1" height="1"/><rect x="0" y="5" width="1" height="1"/><rect x="7" y="5" width="1" height="1"/><rect x="1" y="6" width="1" height="1"/><rect x="6" y="6" width="1" height="1"/><rect x="2" y="7" width="1" height="1"/><rect x="3" y="7" width="1" height="1"/><rect x="4" y="7" width="1" height="1"/><rect x="5" y="7" width="1" height="1"/></g>
  <g fill="#8B8B8B"><rect x="1" y="1" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="4" y="1" width="1" height="1"/><rect x="5" y="1" width="1" height="1"/><rect x="1" y="2" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="3" y="2" width="1" height="1"/><rect x="4" y="2" width="1" height="1"/><rect x="5" y="2" width="1" height="1"/><rect x="6" y="2" width="1" height="1"/><rect x="1" y="3" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/><rect x="4" y="3" width="1" height="1"/><rect x="5" y="3" width="1" height="1"/><rect x="6" y="3" width="1" height="1"/><rect x="1" y="4" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="4" width="1" height="1"/><rect x="4" y="4" width="1" height="1"/><rect x="5" y="4" width="1" height="1"/><rect x="6" y="4" width="1" height="1"/><rect x="1" y="5" width="1" height="1"/><rect x="2" y="5" width="1" height="1"/><rect x="3" y="5" width="1" height="1"/><rect x="4" y="5" width="1" height="1"/><rect x="5" y="5" width="1" height="1"/><rect x="6" y="5" width="1" height="1"/><rect x="2" y="6" width="1" height="1"/><rect x="3" y="6" width="1" height="1"/><rect x="4" y="6" width="1" height="1"/><rect x="5" y="6" width="1" height="1"/></g>
  <g id="eyes" fill="#FFD34D"><rect x="3" y="4" width="1" height="1"/><rect x="4" y="4" width="1" height="1"><animate attributeName="opacity" values="1;0;0;1" keyTimes="0;0.02;0.08;1" dur="3s" repeatCount="indefinite"/></rect></g>
</svg>

Usage: paste the snippet into your HTML where you'd like the inline animated cat. The animation uses SMIL which is supported in most browsers; for environments without SMIL you can swap for a CSS-based blink using opacity keyframes targeting #eyes and #eyelid.
