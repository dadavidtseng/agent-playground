SVG Guidelines for Artists and Engineers

Purpose
This document provides clear rules for creating and exporting SVG assets for the KĀDI design system. It covers viewBox and size conventions, pixel grid alignment, required variants, naming conventions, and optimization recommendations.

1) File structure and metadata
- Place all SVG assets under /assets/svg or /design/svg in the repo.
- Include a <title> and <desc> in each SVG for accessibility. Example:
  <svg viewBox="0 0 24 24" role="img" aria-labelledby="titleID descID">
    <title id="titleID">User avatar</title>
    <desc id="descID">Circular user avatar with initials JD</desc>
    ...
  </svg>

2) ViewBox and sizing
- Use viewBox-based SVGs, do not hardcode pixel width/height in the file unless the asset must have fixed dimensions.
- Standard icon grid sizes: 16, 20, 24, 32, 48. Use the closest grid that fits the icon complexity.
- viewBox should start at 0 0 width height (e.g., viewBox="0 0 24 24"). Align shapes to integer pixel boundaries whenever possible to avoid anti-aliasing blur at small sizes.
- If exporting icons for multiple densities, provide vector SVGs and optionally exported PNGs for legacy use (1x, 2x). Prefer SVGs for all modern usages.

3) Pixel grid guidance
- Design icons on a consistent pixel grid (e.g., 24x24 with 2px stroke weights). Keep strokes aligned to a whole pixel when exporting to prevent blurry rendering.
- Use even-numbered stroke widths for even-sized artboards or 1px for odd-sized depending on the grid. Test rendering at target sizes (16, 20, 24).

4) Styling & colors
- Avoid inlining presentation attributes that conflict with theming (e.g., fill/sroke with colors intended for CSS override). Use currentColor when appropriate for single-color icons to allow CSS color inheritance.
- Provide a colored variant for icons that are part of the brand/illustration set. For icons used as controls, prefer monochrome SVGs using currentColor.
- For avatars, provide both a colored art variant and a mono mask variant for system-generated placeholders.

5) Required variants
- Each icon/avatar must have:
  - mono (stroke or filled with currentColor)
  - colored (brand color usage with defined fills)
  - if relevant, inverted or dark-mode friendly variant (or rely on CSS variables to recolor)
- Filenames should include the variant suffix: e.g., avatar-jane.colored.svg, avatar-jane.mono.svg

6) Naming conventions
- Use kebab-case for filenames: component-name.variant.svg
  Examples:
  - avatar-jane.colored.svg
  - icon-edit.mono.svg
  - logo.full-color.svg
- Include a manifest.json in the svg folder mapping logical names to file paths for automated tooling.

7) Optimization & tooling
- Run all SVGs through an optimizer (SVGO) with a config that preserves viewBox, title, desc, and removes unnecessary metadata and hidden layers.
- Keep IDs stable only when necessary. Prefer avoiding generated IDs; if you must use them (for gradients or filters), namespace them (e.g., grad-avatar-jane).
- Avoid embedding fonts in SVGs.

8) Accessibility
- Provide title/desc for non-decorative SVGs and ensure role="img". For decorative images, use aria-hidden="true".
- If using SVG inline in HTML, ensure accessible name is provided either via title/desc or aria-label.

9) Export rules for artists
- Export from vector tool (Figma/Illustrator) with these settings:
  - Format: SVG (SVG Tiny 1.2 not required)
  - Include "Outline text" if fonts are not available to devs; otherwise keep text as text for translations.
  - Preserve viewBox and do not export with unnecessary width/height unless needed.
  - Simplify paths before export and flatten transforms where possible.

10) Performance
- Sprite or inlining: Use SVG sprites or inline critical icons for faster initial rendering. For many icons, consider an icon font or subsetted inline sprites.
- Defer non-critical decorative SVGs or lazy-load large illustrations.

11) Example artist checklist
- [ ] viewBox set to 0 0 W H
- [ ] title and desc present (if not decorative)
- [ ] Colors use currentColor for mono icons
- [ ] File optimized with SVGO (viewBox preserved)
- [ ] Filename follows kebab-case and variant suffix
- [ ] Provide colored and mono variants

12) Example SVG template

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-labelledby="titleID descID">
  <title id="titleID">Edit icon</title>
  <desc id="descID">Pencil representing edit action</desc>
  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" fill="currentColor"/>
</svg>

13) Legacy raster exports
- If PNGs are required, export at 1x, 2x, and 3x sizes from the vector source. Name accordingly: icon-edit@1x.png, icon-edit@2x.png
- Keep raster exports for legacy app bundles only.

Questions
- If you need an alternate naming convention or a custom SVGO config, coordinate with the engineering team to update the manifest and build tooling.
