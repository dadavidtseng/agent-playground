Pixel art SVG usage and export notes

Files created:
- art/warrior.svg — 16x20 pixel-art warrior sprite. Uses rect elements and a limited 8-color palette. Includes viewBox and width/height attributes and accessibility title/desc.
- art/fallback-avatar.svg — 16x16 neutral silhouette avatar for fallback use.

Recommended export settings and scaling

- Native viewBox sizes:
  - warrior.svg: viewBox="0 0 16 20" (width="128" height="160" used for file)
  - fallback-avatar.svg: viewBox="0 0 16 16" (width="128" height="128" used for file)

- Scale in integer multiples to preserve the pixel-art look (e.g., 16px, 32px, 48px, 64px, 128px, etc.). When embedding in HTML/CSS, set width/height to exact multiples of the original pixel grid (for warrior: multiples of 16 in height or multiples of 16/20 with consistent aspect ratio). Example sizes for warrior: 32x40, 48x60, 64x80, 128x160.

- Use image-rendering: pixelated (or crisp-edges fallbacks) when scaling in browsers to avoid anti-aliasing. The SVGs include a style rule to prefer pixelated rendering; when inlining, you can also add CSS:

  img.pixel-art, svg.pixel-art { image-rendering: pixelated; image-rendering: crisp-edges; }

Inlining and tinting guidance

- Inline SVGs allow easy recoloring. To support tinting, use currentColor or CSS variables in place of hard-coded colors. Example pattern:

  <svg class="pixel-art" viewBox="0 0 16 20" width="64" height="80" fill="none" style="color: #2A6FB0;">
    <!-- Use fill="currentColor" on elements that should inherit tint -->
  </svg>

- Current files use explicit fills to preserve a fixed palette. To allow tinting of the whole sprite, wrap the sprite in a <g fill="currentColor"> and change child fills to use that, or replace specific fills with currentColor for parts you want tinted (for example tunic). Keep skin and metal colors explicit if you want them unchanged.

- Another method: use CSS mask or filter to recolor a monochrome SVG. Convert the sprite to a single-color silhouette (or use the fallback-avatar) then apply color via background-color on the parent or CSS fill on the SVG.

Accessibility

- Both SVGs include role="img" and title/desc elements for screen readers. When inlining, ensure the title/desc IDs remain unique on the page or remove IDs and rely on aria-label or aria-labelledby referencing page-unique IDs.

- Example inline usage with ARIA:

  <svg role="img" aria-labelledby="warriorTitle warriorDesc" viewBox="0 0 16 20" width="64" height="80" class="pixel-art">
    <title id="warriorTitle">Warrior</title>
    <desc id="warriorDesc">A pixel-art warrior holding a sword.</desc>
    ...
  </svg>

- If using as a purely decorative image, add aria-hidden="true" to prevent screen readers from announcing it.

Notes on editing and tooling

- These are pure-vector SVGs built with <rect> elements to emulate pixel art. They render crisply when scaled at integer multiples. Avoid converting to raster formats unless you need a flat image for legacy platforms.

- To produce alternative color variants, duplicate the SVG and replace fill values with desired palette. For programmatic theming, change fills to CSS variables: fill="var(--accent, #2A6FB0)".

License and attribution

- You may adapt and reuse these assets in your project. No external fonts or raster images are embedded.
