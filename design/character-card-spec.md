# Character Card — Design Spec

Role: Designer Agent
Task ID: e87e8365-eaa6-46c0-84dd-39a7ca6a3c11

This document defines tokens, variants, breakpoints, spacing, type scale, color tokens (light/dark), interaction states, focus-visible rules, ARIA recommendations, CSS variable examples, sample markup for component variants, and SVG authoring guidance including recommended SVGO configuration.

----

## 1. Goals
- Provide a compact, accessible, and themable character-card component for lists and profile summaries.
- Keep markup minimal and framework-agnostic.
- Provide a ready-to-copy CSS variables token set and sample component CSS.

----

## 2. Token System
Use CSS custom properties (variables). Prefix: --kadi-cc- to avoid collisions.

Colors (semantic tokens; each has light / dark variant):
- --kadi-cc-bg: card background
- --kadi-cc-surface: card surface / elevated area
- --kadi-cc-border: card border
- --kadi-cc-ink: primary text
- --kadi-cc-muted: secondary text / metadata
- --kadi-cc-accent: accent (primary action / highlight)
- --kadi-cc-success, --kadi-cc-warning, --kadi-cc-critical: status colors
- --kadi-cc-focus: focus ring color

Palette (example values — keep to the token palette in your system):
- Light mode (default)
  - --kadi-cc-bg: #F7F7FB
  - --kadi-cc-surface: #FFFFFF
  - --kadi-cc-border: #E6E7EE
  - --kadi-cc-ink: #14142B
  - --kadi-cc-muted: #6E7191
  - --kadi-cc-accent: #6C5CE7
  - --kadi-cc-success: #16A34A
  - --kadi-cc-warning: #F59E0B
  - --kadi-cc-critical: #EF4444
  - --kadi-cc-focus: rgba(108,92,231,0.28) /* accent tint */

- Dark mode (prefixed with --kadi-cc-dark- for fallback or override)
  - --kadi-cc-dark-bg: #0F1724
  - --kadi-cc-dark-surface: #0B1220
  - --kadi-cc-dark-border: #1F2A44
  - --kadi-cc-dark-ink: #E6E7EE
  - --kadi-cc-dark-muted: #AAB0D6
  - --kadi-cc-dark-accent: #9A8CFF
  - --kadi-cc-dark-success: #22C55E
  - --kadi-cc-dark-warning: #FBBF24
  - --kadi-cc-dark-critical: #F87171
  - --kadi-cc-dark-focus: rgba(154,140,255,0.16)

Type scale tokens (modular scale, mobile-first):
- --kadi-cc-type-xs: 12px
- --kadi-cc-type-sm: 14px
- --kadi-cc-type-md: 16px
- --kadi-cc-type-lg: 18px
- --kadi-cc-type-xl: 20px
- --kadi-cc-type-xxl: 24px

Type tokens for roles:
- --kadi-cc-heading-size: var(--kadi-cc-type-md)
- --kadi-cc-subhead-size: var(--kadi-cc-type-sm)
- --kadi-cc-body-size: var(--kadi-cc-type-sm)
- --kadi-cc-meta-size: var(--kadi-cc-type-xs)
- --kadi-cc-font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial
- --kadi-cc-font-weight-regular: 400
- --kadi-cc-font-weight-medium: 500
- --kadi-cc-font-weight-strong: 600

Spacing scale (4px base):
- --kadi-cc-space-0: 0px
- --kadi-cc-space-1: 4px
- --kadi-cc-space-2: 8px
- --kadi-cc-space-3: 12px
- --kadi-cc-space-4: 16px
- --kadi-cc-space-5: 24px
- --kadi-cc-space-6: 32px

Radii & elevation:
- --kadi-cc-radius-sm: 6px
- --kadi-cc-radius-md: 12px
- --kadi-cc-shadow-sm: 0 1px 2px rgba(20,20,40,0.04)
- --kadi-cc-shadow-md: 0 6px 16px rgba(20,20,40,0.08)

Breakpoints (mobile-first):
- --kadi-cc-bp-sm: 480px
- --kadi-cc-bp-md: 768px
- --kadi-cc-bp-lg: 1024px
- --kadi-cc-bp-xl: 1280px

----

## 3. Component Variants
Three primary variants with minimal HTML and copy-paste-ready CSS variables usage.

A. Compact (list item)
- Height: 56px
- Uses small avatar (32px), name, and subtle metadata

B. Default (card)
- Height: auto, padding medium, avatar 56px, name, role, actions

C. Expanded (detail)
- Multi-line content, larger image area, full metadata and actions

Common features across variants:
- Clickable whole card (support keyboard activation)
- Hover elevation and border accent
- Clear focus-visible ring

----

## 4. Accessibility & ARIA
- If card is interactive: role="button" or use <button> as wrapper. Provide tabindex="0" when using non-button element.
- Use aria-pressed for toggle-like cards.
- Use aria-labelledby to point to primary heading inside card when card acts as a single interactive unit.
- For purely informational card, prefer role="group" with aria-labelledby.
- Ensure contrast: text tokens chosen should meet AA for body text (>= 4.5:1 ideally). Test with real palette.
- Provide skip links or descriptive alt text for SVG avatars (use <svg role="img" aria-hidden="false" aria-label="Character avatar: NAME"> or provide <title> inside SVG).

Focus behavior
- Use :focus-visible where possible; fallback to :focus for UA that lacks it.
- Visible focus must not rely on outline only — use focus ring and an outline for high contrast.

Keyboard
- Enter / Space activate when role=button applied to non-button elements. Implement behavior in JS.

----

## 5. Interaction States (visual)
Tokenized behaviors:
- Idle: no transform, box-shadow: var(--kadi-cc-shadow-sm)
- Hover: translateY(-2px), box-shadow: var(--kadi-cc-shadow-md), border-color: var(--kadi-cc-accent) at 12% opacity
- Active: translateY(0), box-shadow: var(--kadi-cc-shadow-sm) (pressed look)
- Focus-visible: outline: 3px solid var(--kadi-cc-focus) with 4px offset via box-shadow inset or separate ring element; do not use outline-offset with border-radius inconsistently.
- Disabled: reduce opacity to 0.5, pointer-events:none (if not interactive)

CSS state tokens examples (variables):
- --kadi-cc-hover-elevation: var(--kadi-cc-shadow-md)
- --kadi-cc-active-elevation: var(--kadi-cc-shadow-sm)
- --kadi-cc-hover-border: rgba(108,92,231,0.12)

----

## 6. Sample Markup & Minimal Styles
Note: Keep markup semantic and minimal. Use the CSS variables above.

HTML (Compact variant):

<div class="kadi-cc kadi-cc--compact" role="button" tabindex="0" aria-labelledby="char-1-name">
  <svg class="kadi-cc__avatar" width="32" height="32" viewBox="0 0 32 32" role="img" aria-labelledby="char-1-name svg-desc">
    <title id="char-1-name">Ava Maris</title>
  </svg>
  <div class="kadi-cc__body">
    <div id="char-1-name" class="kadi-cc__name">Ava Maris</div>
    <div class="kadi-cc__meta">Ranger • Level 7</div>
  </div>
</div>

CSS (copy-paste token usage):

:root {
  /* color tokens (light mode) */
  --kadi-cc-bg: #F7F7FB;
  --kadi-cc-surface: #FFFFFF;
  --kadi-cc-border: #E6E7EE;
  --kadi-cc-ink: #14142B;
  --kadi-cc-muted: #6E7191;
  --kadi-cc-accent: #6C5CE7;
  --kadi-cc-focus: rgba(108,92,231,0.28);
  /* type */
  --kadi-cc-font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  --kadi-cc-heading-size: 16px;
  --kadi-cc-subhead-size: 14px;
  --kadi-cc-meta-size: 12px;
  /* spacing */
  --kadi-cc-space-2: 8px;
  --kadi-cc-space-3: 12px;
  --kadi-cc-radius-sm: 6px;
  --kadi-cc-shadow-sm: 0 1px 2px rgba(20,20,40,0.04);
  --kadi-cc-shadow-md: 0 6px 16px rgba(20,20,40,0.08);
}

.kadi-cc{
  display:flex;
  align-items:center;
  gap: var(--kadi-cc-space-2);
  background: var(--kadi-cc-surface);
  border: 1px solid var(--kadi-cc-border);
  padding: 8px 12px;
  border-radius: var(--kadi-cc-radius-sm);
  box-shadow: var(--kadi-cc-shadow-sm);
  color: var(--kadi-cc-ink);
  font-family: var(--kadi-cc-font-family);
}
.kadi-cc:focus-visible{
  outline: 3px solid var(--kadi-cc-focus);
  outline-offset: 2px;
}
.kadi-cc:hover{
  transform: translateY(-2px);
  box-shadow: var(--kadi-cc-shadow-md);
  border-color: rgba(108,92,231,0.12);
}
.kadi-cc--compact{ height:56px; padding:8px; }
.kadi-cc__avatar{ border-radius:50%; flex: 0 0 32px; width:32px; height:32px; background: linear-gradient(135deg,var(--kadi-cc-accent), #9A8CFF); }
.kadi-cc__name{ font-size: var(--kadi-cc-heading-size); font-weight:600; }
.kadi-cc__meta{ font-size: var(--kadi-cc-meta-size); color: var(--kadi-cc-muted); }

/* Disabled state example */
.kadi-cc[aria-disabled="true"]{ opacity:.5; pointer-events:none; }

/* Dark mode override (optional) */
@media (prefers-color-scheme: dark){
  :root{
    --kadi-cc-surface: #0B1220;
    --kadi-cc-border: #1F2A44;
    --kadi-cc-ink: #E6E7EE;
    --kadi-cc-muted: #AAB0D6;
    --kadi-cc-accent: #9A8CFF;
    --kadi-cc-focus: rgba(154,140,255,0.16);
  }
}

----

## 7. Focus-visible notes
- Prefer :focus-visible over :focus. Provide a fallback rule for browsers that lack :focus-visible, e.g.
  .kadi-cc:focus{ outline: none; } then .kadi-cc:focus-visible{ outline: 3px solid var(--kadi-cc-focus); }
- The focus ring should be at least 3px and use a semi-transparent fill that works on both light and dark surfaces.

----

## 8. ARIA & semantics quick reference
- Interactive card (single action):
  - element: <div role="button" tabindex="0" aria-labelledby="title-id"> ... </div>
  - add keydown handler for Enter/Space
- Toggle card (selectable):
  - role="button" aria-pressed="false" (toggle to true on selection)
- Non-interactive grouped content:
  - role="group" aria-labelledby="group-label-id"

----

## 9. SVG Authoring Guidelines (to pass to Artist)
Purpose: ensure SVGs are crisp at small avatar sizes and optimize safely with SVGO.

1) Canvas & viewBox
- Always define viewBox (minX minY width height) to enable scaling. Example: viewBox="0 0 64 64".
- Choose viewBox dimensions that map 1:1 to the base pixel grid used in production: prefer even integers (32, 64, 128). For avatars: use 32x32 or 64x64 viewBox.
- Width & height attributes: include explicit width/height values in pixels for authoring and fallbacks (e.g., width="64" height="64"). When embedding, set CSS width/height separately.

2) Pixel grid & integer multiples
- Design shapes to align to whole pixel positions when the rendered size is an integer multiple of the viewBox (e.g., viewBox 32 with display at 32, 64, 96 px — multiples of 32/1). Avoid half-pixel strokes.
- Keep stroke widths on integer values when targeting integer-pixel output; if logical subpixel antialiasing is desired, use stroke-alignment consistent across shapes.

3) Shape rendering
- Use shape-rendering="crispEdges" for iconography intended to be pixel-perfect at small sizes. For smoother icons, omit this property.
- Prefer filled shapes over strokes for small icons; strokes can blur if not aligned to pixel grid.

4) Grouping & IDs
- Avoid global IDs unless necessary. When using IDs (for <title>, <clipPath>, <mask>), keep a naming convention or provide unique prefixes per asset to avoid collisions when multiple SVGs are inlined.

5) Text
- Avoid embedded fonts. If text is needed, convert to paths when appropriate, but for accessibility prefer using <title> and aria-labels on the SVG rather than visible text inside the SVG.

6) Color tokens
- Do not hardcode brand colors if the UI supports theming. Use a small neutral palette in the SVG (currentColor friendly). Prefer using fill="currentColor" for glyphs so the host CSS color can control icon color.

7) Export tips
- Provide 1x, 2x grid-aware exports only when raster fallbacks are required (but avoid raster in this project). Keep vector-only.

8) Example minimal avatar SVG (authoring):
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-labelledby="title-id">
  <title id="title-id">Ava Maris avatar</title>
  <rect width="64" height="64" rx="12" fill="#6C5CE7" />
  <!-- foreground shapes aligned to 64-grid; prefer filled shapes -->
</svg>

9) SVGO recommended config (JSON)
- Do NOT remove viewBox
- Do NOT convert shapes in a way that breaks crispEdges or integer alignments
- Keep titles for accessibility unless they are provided elsewhere

Recommended svgo.config.json snippet:
{
  "plugins": [
    { "name": "removeXMLNS", "active": false },
    { "name": "removeViewBox", "active": false },
    { "name": "cleanupIDs", "params": { "minify": false } },
    { "name": "convertPathData", "params": { "applyTransforms": true } },
    { "name": "convertShapeToPath", "active": false },
    { "name": "removeUnknownsAndDefaults", "params": { "keepDataAttrs": true } },
    { "name": "removeTitle", "active": false }
  ]
}

Notes: disabling convertShapeToPath preserves shape semantics and pixel alignment. Keep cleanupIDs minify false to avoid collisions when inlined.

----

## 10. CSS Variable Examples (copy-paste ready)
Place these in a global CSS token file to use across components.

:root{
  /* Colors */
  --kadi-cc-bg: #F7F7FB;
  --kadi-cc-surface: #FFFFFF;
  --kadi-cc-border: #E6E7EE;
  --kadi-cc-ink: #14142B;
  --kadi-cc-muted: #6E7191;
  --kadi-cc-accent: #6C5CE7;
  --kadi-cc-focus: rgba(108,92,231,0.28);
  --kadi-cc-success: #16A34A;
  --kadi-cc-warning: #F59E0B;
  --kadi-cc-critical: #EF4444;

  /* Type */
  --kadi-cc-font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  --kadi-cc-type-xs: 12px; --kadi-cc-type-sm: 14px; --kadi-cc-type-md: 16px; --kadi-cc-type-lg: 18px;

  /* Spacing */
  --kadi-cc-space-1: 4px; --kadi-cc-space-2: 8px; --kadi-cc-space-3: 12px; --kadi-cc-space-4: 16px;

  /* Breakpoints */
  --kadi-cc-bp-sm: 480px; --kadi-cc-bp-md: 768px; --kadi-cc-bp-lg: 1024px;
}

----

## 11. Implementation notes for Engineers
- Keep markup semantic. Prefer <button> when the card is a single action element — this gives built-in keyboard and accessibility behaviors.
- When using non-button interactive wrappers, implement keyboard support (Space/Enter) and ARIA attributes.
- Use prefers-color-scheme to toggle dark token overrides.
- For animations (hover/press), keep transforms and opacity only; avoid layout-triggering property changes.

----

## 12. Review Checklist
- [ ] design/character-card-spec.md present in /design
- [ ] CSS variables example included
- [ ] Variants (compact/default/expanded) documented with sample markup
- [ ] SVG authoring guidelines & SVGO config included
- [ ] ARIA and focus-visible guidance included

----

End of spec.
