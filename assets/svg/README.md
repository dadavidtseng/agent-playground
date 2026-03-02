# Warrior SVG Exports

This folder contains vector pixel-art assets of a warrior designed for crisp rendering at multiple export sizes.

Files:
- warrior.svg - Master SVG containing a single 16x16 pixel-art symbol and previews. Use the <symbol id="warrior-symbol"> for embedding or referencing at any size.
- warrior.inline.svg - Minified inline-friendly SVG sized to the 16x16 pixel grid and optimized for embedding directly into HTML/CSS.

Export settings and notes:
- Pixel grid: artwork is built on a strict 16x16 pixel grid. All shapes are integer-aligned <rect> elements (no transforms) to preserve sharp pixel edges when scaled.
- ViewBox presets: the master symbol uses viewBox="0 0 16 16". For exports, scale to 64px, 128px, and 256px (multiples of 16) to preserve integer pixel scaling (4x, 8x, 16x respectively).
- shape-rendering: set to "crispEdges" on SVG elements to ensure renderer avoids anti-aliasing between pixel rectangles.
- Single layer: the artwork is a single-layer SVG using grouped elements and stable IDs/classes for CSS targeting: .helmet, .skin, .armor, .trim, .cloak, .sword-blade, .sword-handle, .boot, .eye
- Colors: limited palette used (<=16 colors) with hex codes embedded directly in fill attributes.

Optimization steps applied:
1. Converted all shapes to explicit <rect> elements with integer x/y/width/height to represent pixels.
2. Removed metadata and comments from the inline SVG; shortened hex color codes where possible to reduce size.
3. Avoided external fonts and raster images; no filters or effects used to keep file size small and rendering predictable.
4. Ensured classes/IDs are stable and descriptive for targeting.

Usage tips:
- For crisp embedding in HTML, paste the contents of warrior.inline.svg inline into your HTML where you need the icon, and set width/height to desired multiples of 16 (e.g., 64, 128, 256).
- For CSS coloring, target classes like .armor or .trim and use fill rules. Avoid complex selectors that may be brittle when inlined.

