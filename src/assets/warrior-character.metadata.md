# Warrior Character SVG Metadata

Files:
- warrior-character.svg (primary 32x32 pixel-art inline-friendly SVG)
- warrior-character@2x.svg (64x64 integer-scaled variant for high-DPI)
- warrior-character.svg.artist.svg (artist backup copy for conflict resolution)

Export / rendering guidance:
- Base viewBox: 0 0 32 32. Use integer scaling (2x, 3x) when exporting to maintain pixel-art fidelity.
- For inline use, set width/height to multiples of 32 (e.g., 128px for 4x) or leave unset to scale with CSS.
- preserveAspectRatio: xMidYMid meet recommended.
- shape-rendering: crispEdges and image-rendering: pixelated help preserve sharp pixels in browsers.
- When creating raster exports (PNG), export at integer multiples: 32*scale (e.g., 64, 96, 128) and disable anti-aliasing.

Palette (used):
- #000000 (outline)
- #F1C27D (skin)
- #4B2E1E (hair)
- #8FB5C7 (armor)
- #D9D9D9 (metal)
- #6B4A2A (leather)
- #B33A3A (cape)
- #8B5A2B (shield)

DesignSpec visual check checklist:
- [x] Uses vector shapes only (rect elements)
- [x] Integer-aligned pixel grid (32x32 viewBox)
- [x] shape-rendering set to crispEdges
- [x] High-DPI variant provided (@2x)
- [x] Backup artist file present

Commit note: Created by Artist Agent for task 6b95ea5c-a5d5-4045-805b-f829544b2247
