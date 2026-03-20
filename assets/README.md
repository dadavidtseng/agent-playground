Assets README

This folder contains optimized SVGs and other images used by the profile card component, including a set of warrior pixel-art SVG assets and general optimization/licensing guidance.

Warrior SVG assets and optimization notes

Files:
- assets/warrior-thumb.svg: 16x16 pixel-art warrior (viewBox 0 0 16 16). Thumbnail optimized for crisp scaling.
- assets/warrior-full.svg: 48x64 pixel-art warrior (viewBox 0 0 48 64). Full-card asset.
- assets/warrior-anim.svg: Same as full but with an animation group (id="anim-group"). Includes SMIL animateTransform and a CSS keyframe fallback for browsers that support CSS animations.

Design principles and constraints followed:
- No raster images, all shapes are <rect> elements placed on integer coordinates to preserve pixel-art aesthetic.
- Limited palette used (<=16 colors) and explicit comments list palette colors.
- shape-rendering="crispEdges" set on SVG root to preserve crisp rendering on scaling.
- No filters or raster effects used.
- Accessibility: each SVG includes <title> and <desc> with unique ids.

Inline-ready variant and embedding notes:
- These SVGs are safe to inline into HTML. Because they use integer coordinates and the viewBox values match the intended pixel grid, embedding the raw SVG into HTML will not cause layout shifts if you explicitly set width/height on the <svg> or the containing element.
- Example inline usage:

  <div style="width:96px; height:128px;">
    <!-- paste full content of assets/warrior-full.svg here -->
  </div>

- To ensure no layout shift, set width and height (or use CSS to enforce aspect-ratio) prior to injecting the SVG.

Optimization steps to minimize file size and ensure crisp edges:
1) Remove unnecessary metadata and comments before production. Comments are present here for clarity but can be stripped for the final build.
2) Minify by removing extraneous whitespace and collapsing attribute order. Tools: svgo, svgo-config with plugins: removeMetadata, removeComments, collapseGroups (but ensure you don't collapse groups used for animation), convertShapeToPath: false (keep rects), removeViewBox: false.
3) Keep shape-rendering="crispEdges" and ensure alignment to integer coordinates. Avoid sub-pixel transforms (e.g., translate(0.5,0)) which cause anti-aliasing.
4) Prefer SMIL animateTransform for group transforms; if targeting environments without SMIL, add equivalent CSS keyframes with transform-origin set in px units matching the viewBox.
5) If using SVG sprites or symbol reuse, <use> can reduce duplication. For these small assets the benefit is minimal.
6) Combine adjacent same-color rects into larger rects when possible to reduce element count (but only if the combined rect remains axis-aligned and on integer bounds).
7) For inlining into CSS backgrounds, convert to data URI and URL-encode; remove line breaks and unnecessary spaces.

Fallback recommendations for environments that don't support SMIL:
- The assets include a CSS keyframe animation in warrior-anim.svg that works in browsers supporting CSS animations on SVG elements (modern WebKit/Blink/Gecko). For environments without either, the SVG will simply render static without animation — design remains readable.

Accessibility and rendering checks:
- Ensure each SVG has unique title/desc ids when multiple SVGs are embedded on the same page to prevent duplicate id collisions.
- When inlining many copies, consider changing ids or using <title> without id and wrapping with <svg aria-labelledby=""> appropriately.

Export checklist performed:
- All shapes on integer coordinates.
- Colors limited and documented.
- No filters used.
- Animation group present and animates via SMIL and CSS.

Suggested next steps:
- Run svgo (keeping animateTransform and IDs) to minify. Example config: {"plugins":[{"removeComments":true},{"removeMetadata":true},{"convertShapeToPath":false},{"collapseGroups":false}]}.
- Test on target devices at intended thumbnail/full sizes (e.g., thumbnail: 64px, full: 300x420) and check for crisp pixels and no anti-aliasing.

General assets guidance

Optimization notes:
- SVGs have been optimized using SVGO with default recommended plugins.
- Raster images (if any) should be provided in multiple sizes and webp where appropriate.

Usage:
- Place SVGs in assets/ and reference them via <img src="/assets/icon.svg" alt="..."> or inline the SVG for color control.
- When inlining many SVGs, ensure unique ids or use aria-labelledby patterns to avoid collisions.

Licensing:
- All icons are from open-source icon sets or created for this project. Confirm license in each file header.

For more details, see docs/design.md for how icons are used in the component and recommended sizes.