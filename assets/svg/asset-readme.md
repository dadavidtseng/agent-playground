Cat pixel-art SVG assets

Files:
- cat-neutral-64.svg
- cat-neutral-128.svg
- cat-neutral-256.svg
- cat-happy-64.svg
- cat-happy-128.svg
- cat-happy-256.svg
- cat-inline-optimized.svg (inline-ready, supports toggling eyes via display)

Notes:
- All SVGs are created on a 32x32 pixel grid using <rect> elements for crisp pixel-art scaling.
- Transparent background: no <rect> background element is used; the SVG canvas is transparent by default.
- CSS variables available for quick color overrides (set on the svg element):
  --cat-main: main fur color (default #E3A76F)
  --cat-outline: outline/feature color (default #2B2B2B)
  --cat-accent: inner ear/ear highlight (default #F7D3B0)
  --eye: eye color (default #083E2B)
  --blush: cheek accent (default #FFB6C1)

Optimization steps taken:
- Artwork drawn using integer-based viewBox (0 0 32 32) and rect positions to avoid fractional coordinates.
- No metadata, comments minimized, and no filters used to keep SVG vector-native and small.
- Inline-optimized SVG groups neutral/happy eye variants; by default neutral is visible. Toggle via CSS or script (e.g., document.querySelector('#eyes-neutral').style.display='none'; document.querySelector('#eyes-happy').style.display='inline';).

Usage examples:
- Inline embed and override colors: <svg ... style="--cat-main:#C19B6A; --eye:#000;">...</svg>
- For swapping expression when inlined, toggle display on groups #eyes-neutral and #eyes-happy.

License: CC0 (public domain) - free to use and modify.
