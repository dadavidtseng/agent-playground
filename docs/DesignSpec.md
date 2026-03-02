Design System Specification

This document provides the design tokens and rules needed to style components consistently across the project. Tokens are defined as CSS custom properties and intended to be imported/consumed by component CSS files (for example: src/components/CharacterCard/CharacterCard.css).

1. Design Tokens (CSS custom properties)

--color-primary:         #0A6ED1; /* primary brand */
--color-primary-600:     #095FAF;
--color-primary-400:     #2D8FE6;

--color-secondary:       #FF6A00; /* accent */
--color-secondary-600:   #E55A00;
--color-secondary-400:   #FF8C33;

--color-surface:         #FFFFFF; /* surfaces, cards */
--color-muted:           #F6F7F9; /* subtle surfaces */
--color-border:          #E6E9EF;
--color-shadow:          rgba(12, 18, 28, 0.08);

--color-text:            #0B1220; /* primary text */
--color-text-secondary:  #445166; /* secondary text */
--color-text-muted:      #92A0B0; /* hint text */
--color-success:         #17A056;
--color-warning:         #F2B705;
--color-danger:          #E03E3E;

/* Semantic token examples for accessibility-aware usage */
--bg-page:               var(--color-surface);
--bg-card:               var(--color-surface);
--fg-primary:            var(--color-text);
--fg-on-primary:         #FFFFFF;

/* Transparency utility tokens */
--overlay-50:            rgba(0,0,0,0.5);

2. Spacing scale (in px, scalable values)

--space-xxs: 4px;
--space-xs: 8px;
--space-s: 12px;
--space-m: 16px;
--space-l: 24px;
--space-xl: 32px;
--space-xxl: 48px;

3. Typography scale

--font-family-sans:      "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
--font-family-mono:      "SFMono-Regular", Menlo, Monaco, "Roboto Mono", "Noto Mono", monospace;

--type-xxs: 10px/14px;
--type-xs: 12px/16px;
--type-s: 14px/20px;
--type-m: 16px/24px; /* body */
--type-l: 20px/28px;
--type-xl: 24px/32px;
--type-xxl: 32px/40px;

Use format: font-size/line-height. Example usage in CSS: font: var(--type-m) var(--font-family-sans); or parse into separate tokens if preferred (e.g., --font-size-m, --leading-m).

4. Breakpoints and responsive layout rules

Breakpoints (mobile-first):
--breakpoint-sm: 480px;   /* small phones */
--breakpoint-md: 768px;   /* tablets / small desktops */
--breakpoint-lg: 1200px;  /* large screens */

Responsive rules guidance:
- Mobile (<= 479px): single-column layout, touch targets >= 44px, simplified/stacked content, minimal margins (use --space-s/--space-m).
- Small (480px - 767px): compact multi-block, possible 2-column lists for denser content; increase horizontal padding to --space-m.
- Medium (768px - 1199px): two-column layouts for cards and lists, increase gutters to --space-l; typography moves up one scale step for headers.
- Large (>= 1200px): multi-column grid, larger gutters (--space-xl), generous whitespace, larger type for hero elements.

Example media query snippets (for reference only, do not implement components here):
- @media (min-width: var(--breakpoint-sm)) { ... }
- @media (min-width: var(--breakpoint-md)) { ... }
- @media (min-width: var(--breakpoint-lg)) { ... }

5. Interaction states

Define state tokens to ensure consistent interactions across components.

Hover/Focus/Active/Disabled tokens:
--state-hover-bg:        rgba(10,110,209,0.08);
--state-hover-border:    rgba(10,110,209,0.18);
--state-focus-ring:      0 0 0 4px rgba(10,110,209,0.14); /* use box-shadow or outline */
--state-active-bg:       rgba(10,110,209,0.12);
--state-disabled-bg:     #F1F3F6;
--state-disabled-fg:     #B8C2CE;

Accessibility notes:
- Ensure focus states are visible and high-contrast against background.
- Hover is not a substitute for focus; keyboard users must have the same visual cues as pointer users.
- Disabled controls should have reduced opacity or muted fg color with pointer-events: none.

6. Iconography and SVG export guidelines

Goal: produce crisp, sharp SVG assets that scale cleanly and align to the pixel grid where appropriate.

Basic export settings (from vector tools like Figma/Illustrator/Inkscape):
- Export format: SVG (not SVGZ or rasterized PNG).
- ViewBox: Always set a viewBox attribute matching the artwork bounds: viewBox="0 0 WIDTH HEIGHT".
- Pixel grid alignment: Align strokes and shapes to whole pixels where possible for 1x exports; for icons that will be used at multiple sizes, design at a grid (24px or 32px) and use whole-pixel coordinates when stroke widths are integer values.
- Stroke alignment: Keep strokes inside the path where possible, or use stroke-alignment="inside" (not widely supported) — better: convert stroked paths to filled outlines when exporting icons to avoid inconsistent rendering across browsers.
- Stroke width: Prefer even stroke widths (1, 2) and scale-friendly stroke attributes. If stroke scales, use vector-effect="non-scaling-stroke" for UI icons that must keep stroke width constant across transforms.
- PreserveAspectRatio: Use preserveAspectRatio="xMidYMid meet" for most UI icons to preserve scaling and centering. For responsive illustrations, choose meet or slice based on cropping needs.
- IDs and styles: Avoid tool-generated IDs and inline <style> blocks referencing local IDs. Prefer using class names or export as plain paths with no unnecessary metadata.
- Remove editor-specific metadata: clipPath, inkscape:*, sodipodi:*, etc., unless intentionally used. Strip unneeded comments and defs.
- Use currentColor where appropriate for fill or stroke to allow color inheritance from CSS: e.g., <path fill="currentColor" d="..." />.
- Accessibility in SVG: include role and aria-hidden when necessary (role="img" with aria-label or <title> for meaningful decorative images; aria-hidden="true" for purely decorative icons).

Example exporter command/settings (CLI/svgopt):
- svgo --multipass --input icon.svg --output icon.min.svg --config '{"plugins":[{"removeViewBox":false},{"cleanupIDs":true},{"removeUnknownsAndDefaults":true}]}'
- Inkscape CLI to convert strokes to outlines (if needed):
  inkscape icon.svg --export-plain-svg=icon-outlined.svg --export-area-drawing

SVG naming guidelines:
- Name files by semantic usage: icon-user.svg, illustration-hero-login.svg.
- For set-based icons, include grid size: icon-user-24.svg, icon-close-16.svg.

7. Interaction and motion tokens (timing)

--motion-duration-fast: 120ms;
--motion-duration-base: 200ms;
--motion-duration-medium: 320ms;
--motion-easing-default: cubic-bezier(0.2, 0.8, 0.2, 1);

Use subtle motion for hover/focus transitions and avoid long or jarring animations.

8. Accessibility & ARIA guidance (tokens + practice)

- Color contrast: Ensure text and interactive elements meet WCAG AA (4.5:1 for normal text, 3:1 for large text). Use semantic tokens (e.g., --fg-primary, --fg-on-primary) for consistent checks.
- Focus order: DOM order must match visual tab order. Use tabindex only when necessary.
- Keyboard targets: Interactive elements should be reachable via Tab and actionable via Enter/Space for buttons/links.
- Aria labels: Provide aria-label or aria-labelledby for non-text controls; use role attributes for complex widgets.

9. Manual QA checklist

A. Responsive visual checks (manual steps):
1. Mobile (360x640):
  - Open the CharacterCard component on a mobile viewport (360w). Verify single-column layout, readable type (>= 14px body), sufficient padding (>= --space-s), and tappable targets (>=44px).
  - Inspect image/icon vs text alignment — avatars should remain left/center aligned based on design.
2. Small tablet (480-767px):
  - Verify spacing increases to --space-m for internal card padding. Check that truncated text uses ellipsis and doesn't overflow its container.
3. Tablet/desktop (768-1199px):
  - Confirm two-column layout where expected. Image/illustration scales and maintains aspect ratio; text lines do not wrap awkwardly.
4. Large desktop (>=1200px):
  - Validate multi-column layout, increased gutters (--space-xl), and larger type for headings. Check alignment across cards in a grid.
5. Visual consistency:
  - Verify color usage: primary buttons use --color-primary and on-primary text is white. Disabled controls use --state-disabled-bg and --state-disabled-fg.
  - Ensure shadows and borders use tokens --color-shadow and --color-border.

B. Interaction and accessibility checks (manual steps):
1. Keyboard navigation:
  - Tab through the CharacterCard component and ensure each interactive control receives focus in logical order.
  - Focus states must be visible and meet contrast requirements (use --state-focus-ring). Focus must be usable with keyboard only (no mouse).
  - Activate actions with Enter/Space as appropriate.
2. Screen reader / ARIA checks:
  - Ensure non-text controls include aria-label or aria-labelledby. For example, an avatar action button should have aria-label="Open profile".
  - If CharacterCard is a composite widget, ensure roles (region, listitem, button) and aria-expanded/aria-controls are used correctly.
3. Contrast checks:
  - Use an accessibility tool to verify foreground/background contrast >= 4.5:1 for body text, 3:1 for large headings.
4. Disabled states:
  - Verify disabled elements are not focusable (unless they must be) and visually indicate disabled via tokens.

C. SVG-specific QA checks:
1. Open exported SVGs in a text editor:
  - Confirm presence of viewBox and absence of unnecessary metadata.
  - Confirm use of currentColor where appropriate for icons intended to inherit color.
2. Rendering checks:
  - Place icons at multiple pixel sizes to ensure crispness and alignment.
  - Test stroke rendering in multiple browsers; if inconsistent, convert stroke to filled outlines.

10. Example: Token import snippet for CharacterCard.css

/* src/components/CharacterCard/CharacterCard.css */
/* Example: import tokens (assumes tokens are exposed from tokens.css at project root) */
@import "../../tokens.css"; /* or use :root variables from a bundled CSS file */

/* Example usage in component CSS (conceptual):
.card { background: var(--bg-card); border: 1px solid var(--color-border); box-shadow: 0 4px 16px var(--color-shadow); padding: var(--space-m); }
.card__title { font: var(--type-l) var(--font-family-sans); color: var(--fg-primary); }
.button { background: var(--color-primary); color: var(--fg-on-primary); }
.button:hover { background: var(--state-hover-bg); box-shadow: var(--state-focus-ring); }
*/

Notes: Ensure the tokens file path matches project layout. The code block above is only an example snippet to illustrate variable usage; do not implement component markup or detailed CSS in this specification.

11. Versioning and naming

- Keep tokens stable; when changing token meaning, create new token and deprecate old one.
- Use semantic names (e.g., --bg-card rather than --white-1) to allow theme swapping.

12. FAQ / Implementation tips

- If you need a dark theme, mirror the semantic tokens and keep the same variable names (swap values in a .theme-dark root).
- For third-party icons that don't use currentColor, prefer re-exporting a cleaned version or wrapping them in a container and using mask techniques.

End of DesignSpec
