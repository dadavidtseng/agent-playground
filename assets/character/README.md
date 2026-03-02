Warrior SVG Export Notes

Files:
- warrior.svg: Layered, labeled SVG with groups and classes for styling. 128x128 viewBox, integer-aligned rect grid for pixel-art.
- warrior.inline.svg: Optimized inline-ready SVG variant with inline fills and minimal metadata. Both preserve shape-rendering: crispEdges and preserveAspectRatio="xMidYMid meet".

Export steps taken:
1. Designed artwork using only <rect> elements aligned to integer coordinates on a 128x128 grid to ensure pixel-crisp scaling.
2. Limited palette to 14 colors for clarity and compactness.
3. Created layered version with descriptive group IDs and CSS classes for styling.
4. Produced inline-optimized version by inlining fills and removing styles/metadata to reduce file size while keeping visual parity.
5. Verified visual scaling at 32x32, 64x64, and 128x128 in a browser (pixel edges align and remain crisp).

Notes:
- No raster images or embedded fonts were used.
- File sizes: warrior.inline.svg is kept small (<50KB) for embedding.
- To target parts via CSS, use group IDs (e.g., #helmet, #cape, #right-arm) and classes in warrior.svg.
