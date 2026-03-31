Pixel-art warrior SVG assets

Files included:
- assets/warrior-32.svg: 32x32 base pixel-art exported as vector SVG using <rect> per pixel. Transparent background.
- assets/warrior-64.svg: 64x64 output that uses the same 32x32 viewBox so scaling is integer (x2), preserving crisp edges.
- assets/warrior-128.svg: 128x128 output, same viewBox (x4 scale).
- assets/warrior-fullcolor.svg: fuller palette variant with highlights; still built on 32x32 grid.
- assets/warrior-animated.svg: optional idle animation (subtle vertical translation) using animateTransform with discrete steps to keep pixel alignment.

Creation notes:
- Technique: Built all artwork on a 32x32 logical grid. Each visible "pixel" is represented by a <rect> with integer x/y and width/height values. The SVG viewBox is 0 0 32 32; exports at larger sizes (64/128) set width/height while keeping viewBox unchanged so renderers scale cleanly by integer factors.
- Palette: Limited to <=16 colors; I used neutral grays for armor, warm skin tone, crimson tabard, brown shield, silver/gold for weapon. Colors chosen from design token guidance where possible.
- Optimization: Kept DOM shallow — each pixel is a rect; avoided groups except in animated variant. No embedded raster images or filters used. shape-rendering="crispEdges" set on root SVG to encourage sharp pixel edges.
- Animation: The animated SVG moves the whole avatar by small discrete steps (0, 0.5 units) using calcMode="discrete" to emulate a breathing/idle without sub-pixel blurring. This keeps visual crispness when rendered at large sizes. Some viewers may round transforms — test in target environments.

Export considerations and tradeoffs:
- Using viewBox 0 0 32 32 with larger width/height ensures integer scaling (x2, x4) when output size is integer multiples; non-integer scaling may introduce anti-aliasing.
- stroke-based outlines not used to avoid thin blurry lines on scaling; outlines are represented by filled rects for consistent pixel-art look.
- The animated SVG uses translate values of 0.5 which are half-viewBox units; when rendering at small output sizes (32px) sub-pixel translation may be visually subtle or rounded away. It works best at larger rasterized sizes.
- Files are standalone SVGs with transparent backgrounds; they can be embedded inline or referenced via <img> or CSS background-image.

If you want additional poses, color variants, or exported 32/64/128 PNGs rasterized from these vectors, I can generate those as additional assets (note: PNG generation not allowed within this task).