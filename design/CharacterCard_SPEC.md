CharacterCard Design Specification

Overview

This document defines the visual system, responsive rules, tokens and SVG constraints for the CharacterCard component used in the KĀDI multi-agent system. It provides guidance for designers and engineers implementing a pixel-art style character card (example asset: assets/warrior.svg).

Goals

- Pixel-art friendly, crisp rendering at small sizes
- Responsive layout for mobile, tablet, desktop
- Clear tokens for colors, spacing, typography and interactions
- SVG constraints and tokens so artists export assets that align with the UI grid

Responsive breakpoints

- Mobile (M): 0 — 599px
  - Card width: 100% (edge-to-edge with container padding)
  - Avatar (SVG) size: 56px
  - Padding: 12px (token: spacing-3)
  - Typography: small scale (see typography scale)

- Tablet (T): 600 — 1023px
  - Card width: 320px (default) / 100% if container smaller
  - Avatar (SVG) size: 80px
  - Padding: 16px (token: spacing-4)

- Desktop (D): 1024px and up
  - Card width: 360px (recommended) / grid-aware
  - Avatar (SVG) size: 112px
  - Padding: 20px (token: spacing-5)

Layout rules

- Card uses a vertical layout by default: Avatar on top, name/title, metadata, actions.
- At Desktop, optional horizontal variant: avatar on left (fixed), text block on right. Avatar to text gap: spacing-4 (16px).
- Avatar should be centered in mobile/tablet card top band. Avatar should not be cropped by card padding.
- All spacing follows the spacing scale tokens in this spec.

Typography scale

Use a modular scale tuned for small pixel-art UI. Tokens included for CSS variables, platform-agnostic names and recommended line-heights.

- type-xxs: 10px / 12px line-height (caps and micro labels)
- type-xs: 12px / 16px (metadata, secondary)
- type-sm: 14px / 18px (body)
- type-md: 16px / 20px (primary body)
- type-lg: 18px / 22px (card headings)
- type-xl: 20px / 24px (large headings)

Token examples (CSS custom properties)

:root {
  --type-xxs: 10px;
  --type-xs: 12px;
  --type-sm: 14px;
  --type-md: 16px;
  --type-lg: 18px;
  --type-xl: 20px;
}

Color palette

A restrained palette optimized for legibility and pixel-art contrast. All colors are provided with hex and recommended usage.

- Neutral / Surface
  - surface-00: #0F1724 (dark background) — app background (optional)
  - surface-10: #111827 — card background (dark mode)
  - surface-20: #1F2937 — elevated surfaces
  - border: #374151 — default borders and separators

- Text
  - text-primary: #E5E7EB
  - text-secondary: #9CA3AF
  - text-muted: #6B7280

- Accents
  - accent-primary: #FFB020 — primary accent (gold)
  - accent-secondary: #60A5FA — secondary (blue)
  - success: #34D399
  - danger: #F87171

- Shadows & overlays
  - shadow-1: rgba(2,6,23,0.6) (for subtle depth in dark themes)

Note: This spec uses a dark theme by default to match pixel-art warrior aesthetics. If used in a light theme, invert colors and ensure sufficient contrast.

Spacing scale

We use a 4px baseline grid tuned for pixel-art crispness. Tokens:

- spacing-1: 4px
- spacing-2: 8px
- spacing-3: 12px
- spacing-4: 16px
- spacing-5: 20px
- spacing-6: 24px
- spacing-7: 32px
- spacing-8: 40px

Interaction states

Define visual states and tokens for accessible interactive elements (e.g., card hover, actions, buttons).

- default: card background = surface-10, border = transparent (or thin border token)
- hover: elevate with subtle outline or shadow: box-shadow: 0 2px 8px var(--shadow-1); transform: translateY(-2px) on desktop
- focus: 2px solid accent-primary outline (use outline to avoid layout shift), outline-offset: 2px
- active: quick shrink: transform: translateY(0) scale(0.99), darker background: surface-20
- disabled: opacity: 0.5; pointer-events: none

Tokens (examples)

--card-bg: var(--surface-10);
--card-border: 1px solid var(--border);
--card-radius: 8px; /* snap to whole pixels */
--card-padding-mobile: 12px;
--card-padding-tablet: 16px;
--card-padding-desktop: 20px;

SVG tokens and artist guidance

The CharacterCard uses pixel-art SVG avatars. To ensure crisp rendering and consistent sizing, follow these constraints and tokens.

Required SVG properties

- viewBox: Use an integer grid viewBox (recommended 0 0 64 64 or 0 0 128 128). Example: viewBox="0 0 64 64".
- width & height: Do not hard-code fixed px in exported art when embedding; prefer viewBox-only and control size with CSS or the JSX width/height props. For the reference asset provide width/height for preview only.
- shape-rendering: Use "crispEdges" to preserve pixel-art sharpness. Example: <svg shape-rendering="crispEdges">
- image-rendering: For bitmap images embedded, use "pixelated". For vector-only art, ensure shapes align to whole pixels.
- stroke alignment: Prefer filled shapes for pixel art; if using strokes, use vector-effect="non-scaling-stroke" and integer stroke-widths aligned to pixel grid.
- pixel grid alignment: All geometry (rects, lines, paths) should align to integer coordinates in the chosen viewBox. Avoid fractional positions to prevent anti-aliasing.

SVG tokens (CSS variables)

--svg-viewbox: "0 0 64 64";
--avatar-size-mobile: 56px;
--avatar-size-tablet: 80px;
--avatar-size-desktop: 112px;
--svg-crisp: shape-rendering: crispEdges; image-rendering: pixelated;

Export recommendations for artist

- Work at a base grid size: 64x64 or 128x128. Keep all pixel forms aligned to that grid.
- Avoid filters or effects that rely on anti-aliasing. Keep hard edges.
- If multiple frames/sprites will be used, keep consistent viewBox and alignment to swap easily.
- Optimize paths to fill blocks rather than many tiny strokes.

Accessibility

- Provide title and desc elements inside SVG for screen readers (e.g., <title>Warrior avatar</title>).
- Ensure color contrast for text and action icons meets WCAG AA for large text; aim for AAA where practical.
- Focus states must be keyboard-visible (2px accent outline).

Design tokens (export-ready)

JSON token export (example set) — developers can convert to CSS variables or use in JS.

{
  "breakpoints": {"mobile": 0, "tablet": 600, "desktop": 1024},
  "type": {"xxs": "10px", "xs": "12px", "sm": "14px", "md": "16px", "lg": "18px", "xl": "20px"},
  "spacing": {"1": "4px", "2": "8px", "3": "12px", "4": "16px", "5": "20px", "6": "24px"},
  "color": {"surface-00": "#0F1724", "surface-10": "#111827", "surface-20": "#1F2937", "border": "#374151", "text-primary": "#E5E7EB", "text-secondary": "#9CA3AF", "accent-primary": "#FFB020"},
  "svg": {"viewBox": "0 0 64 64", "avatarSizes": {"mobile":"56px","tablet":"80px","desktop":"112px"}}
}

Implementation notes for developers

- Use CSS custom properties driven by the token JSON to theme the CharacterCard component.
- For responsiveness: use breakpoints to switch avatar sizes and layout orientation.
- When in horizontal layout on desktop, align avatar to the left with fixed pixel width matching the chosen avatar-size and ensure the image scales with nearest-neighbor interpolation when rasterized.
- Use the supplied assets/warrior.svg as a reference avatar. It follows the constraints above (viewBox 0 0 64 64, shape-rendering crispEdges).

File references

- assets/warrior.svg — initial pixel-art warrior reference asset
- design/CharacterCard_SPEC.md — this document

Change log

- v0.1 initial design spec and initial warrior SVG reference (pixel-art simplified asset)

Designer contact

If anything is unclear or needs iteration, contact the design owner in the KĀDI system.
