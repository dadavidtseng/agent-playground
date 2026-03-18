Export Notes for pixel-art warrior SVGs

Overview
- Files created:
  - src/assets/warrior-48.svg (48x48)
  - src/assets/warrior-96.svg (96x96)
  - src/assets/warrior-192.svg (192x192)
  - src/assets/warrior-thumb.svg (48x48 silhouette)

Design approach
- All artwork created as vector pixel-art using <rect> elements aligned to integer coordinates on the viewBox grid.
- Avoided fractional transforms and stroke-based outlines to ensure sharp pixel-aligned edges.
- Used a limited palette (<=16 colors) and reused colors across sizes for consistency.
- Each SVG uses an integer viewBox equal to the pixel dimensions (e.g., viewBox="0 0 48 48") so the coordinate grid maps 1:1 to device pixels at native size.

Export settings and guidelines
- ViewBox and size:
  - Use integer viewBox matching target pixels. Example: viewBox="0 0 48 48" width and height set to the same values.
  - This ensures the SVG units align to pixels and preserves crisp edges when rendered at native size.

- Shapes and transforms:
  - Use only axis-aligned rectangles (<rect>) with integer x/y/width/height values.
  - Avoid fractional positions or transforms (translate, scale with non-integer factors) to prevent anti-aliasing.
  - Do not use strokes for pixel outlines; instead, use filled rectangles.

- Scaling strategy:
  - Create artwork at a base logical grid (e.g., 24x24) and export at integer scale factors (2x -> 48, 4x -> 96, 8x -> 192) OR create directly at target size with integer-aligned pixels.
  - When scaling down in other tools, scale by integer factors only to retain sharpness.

- Accessibility & optimization:
  - Included <title> and <desc> tags for each SVG for assistive technologies.
  - Kept file sizes reasonable by using simple rect primitives and limiting colors.
  - Avoid unnecessary metadata and scripts. Files are minimal and directly editable.

- Thumbnail silhouette:
  - Provided a simplified single-color silhouette (warrior-thumb.svg) suitable as a favicon or thumbnail.
  - Designed to be visually distinct at small sizes; uses bold silhouette blocks to read clearly.

Optimization steps performed
- Simplified shapes to axis-aligned rectangles to reduce path complexity.
- Removed gradients, filters, and strokes to minimize rendering variability and file size.
- Ensured color consistency across assets by reusing hex color values.

Rendering notes
- Display at native sizes (48/96/192) for pixel-perfect results.
- When embedding in HTML/CSS, set width/height to these native values or integer multiples.
- If using CSS to scale icons, scale by integer factors (e.g., 2x) to preserve crispness.

Additional tips
- For more detailed versions, increase the base logical grid and export at integer scales.
- If converting to outlines/paths is necessary, snap path coordinates to integers and avoid anti-aliased joins.

Commit: feat: create artwork for task be5d7ca9-03fa-4a60-b990-9247190f88cf
