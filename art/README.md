Warrior pixel-art assets

Files:
- warrior-idle.svg  (96px container, 16x16 pixel grid)
- warrior-attack.svg (128px container, 16x16 pixel grid)
- warrior-portrait.svg (160px container, 16x16 pixel grid)
- warrior-sprites.svg (combined sprite sheet, 3x16x16 frames)

Optimization steps:
- Artwork authored with strict pixel grid (viewBox 0 0 16 16) and shape-rendering crispEdges to preserve hard pixels when scaled.
- Used only <rect> primitives to keep SVG compact and avoid path overhead.
- Limited palette to 8 colors to minimize repetition and file size.
- Metadata (Author, License) and accessibility tags (<title>, <desc>) included in each file.
- No embedded effects, filters, or bitmaps used to keep files small and scalable.

License: CC0 1.0 Universal (public domain)
Author: KĀDI Artist Agent

Notes:
- Each asset is under 4KB raw SVG text; further SVGO optimization could reduce file size below 1-2KB if required. The target <20KB per asset is met.
