# Game Character Profile Card — Design Spec

Version: 1.0
Lead designer: (sign-off required below)
Task ID: dd7e5a1a-5a4f-45c5-805e-ba416320e67c

---

## Component overview

The Game Character Profile Card is a reusable UI component that displays a player's character information: avatar (SVG), name, role/class, short bio, level & XP, and stat bars (HP, Mana, Strength, Agility, etc.). The component has three variants (compact, standard, expanded) and is responsive across mobile/tablet/desktop breakpoints.

Goals:
- Clear hierarchy of information
- Pixel-consistent SVG avatar exports
- Accessible interaction patterns for toggles and stat bars
- Developers get vanilla CSS variable tokens and an HTML example for handoff

---

## Variants

1. Compact
- Minimal layout optimized for lists or narrow sidebars.
- Shows avatar (small), name, role, level.
- No bio, collapsed stats.

2. Standard (default)
- Avatar (medium), name, role, level, short bio (1–2 lines), 3 primary stat bars.
- Primary use in profile panes and dialogs.

3. Expanded
- Large avatar, extended bio, full stat list, action buttons (e.g., Edit, Equip), key items or tags.
- Used on full profile pages or overlays.

Design tokens and layout rules below ensure each variant scales consistently.

---

## Breakpoints and responsive rules

Breakpoints (CSS variables not strictly required but provided as guidance):
- Mobile: up to 599px — stack vertically; compact/standard become single-column.
- Tablet: 600px–1023px — two-column layout for standard/expanded (avatar left, details right).
- Desktop: 1024px and up — multi-column grid; expanded variant can show avatar and stats side-by-side.

Responsive layout rules:
- Mobile: shrink avatar to --kadi-avatar-size-sm, show condensed text; truncate long bio to 2 lines with ellipsis.
- Tablet: avatar medium (--kadi-avatar-size-md), bio allowed up to 3 lines; stat bars inline below details.
- Desktop: avatar large (--kadi-avatar-size-lg), full bio shown in expanded; action buttons visible inline.

Example CSS media-query breakpoints (semantic variables used in examples below):
- --kadi-breakpoint-sm: 600px
- --kadi-breakpoint-md: 1024px

---

## Tokens

Naming convention: --kadi-<category>-<name>
All measurements use rem for scalability (1rem = base font-size), except SVG export notes that use integer px coordinates for art.

Colors, spacing, sizes, and typography tokens are provided as CSS variable examples in the Developer Handoff section.

---

## Typography scale

Base: 16px (1rem). Scale uses modular steps.

- --kadi-type-scale-xxl: 2rem (32px) — display / large headings (expanded name)
- --kadi-type-scale-xl: 1.5rem (24px) — primary name in standard/expanded
- --kadi-type-scale-lg: 1.125rem (18px) — role/class, section headings
- --kadi-type-scale-md: 1rem (16px) — body / bio text
- --kadi-type-scale-sm: 0.875rem (14px) — secondary info (level label, small meta)
- --kadi-type-scale-xs: 0.75rem (12px) — micro text, tags

Line-height recommendations:
- Headings: 1.1–1.25
- Body: 1.3–1.6

Weight suggestions:
- Name: 600–700
- Role: 500
- Body: 400

---

## Color palette (tokens + notes)

Core brand / UI colors (examples):
- --kadi-color-bg: #0F1724 (Dark slate)
- --kadi-color-surface: #121826 (Card surface)
- --kadi-color-muted: #94A3B8 (Muted text)
- --kadi-color-text: #E6EEF6 (Primary text)
- --kadi-color-accent: #60A5FA (Accent / primary action)
- --kadi-color-success: #34D399 (Success / heal)
- --kadi-color-danger: #F87171 (Damage / negative)
- --kadi-color-warning: #FBBF24 (Warning / caution)
- --kadi-color-border: rgba(230,238,246,0.08)

Stat bar colors (semantic):
- --kadi-stat-hp: #EF4444 (HP red)
- --kadi-stat-mana: #3B82F6 (Mana blue)
- --kadi-stat-energy: #F59E0B (Energy amber)
- --kadi-stat-buffer: rgba(230,238,246,0.12) (background track)

Contrast and accessibility notes:
- Primary text (--kadi-color-text) on surface (#121826) achieves high contrast (>7:1 depending on exact surface), suitable for body and headings.
- Muted text (#94A3B8) on surface should be checked: expected contrast ~4.5:1 vs surface at 24% lightness; if used for smaller bodies (<14px) prefer stronger contrast or use bold weights.
- Accent #60A5FA on surface has approximate contrast 4.6:1 — good for interactive elements; if used for small text (<14px) ensure additional indication (underline, icon) to meet WCAG.
- HP red #EF4444 on dark surface: confirm contrast for textual values (if overlaying stat number on the bar). If contrast <4.5:1, use white text or a high-contrast label background.

Provide contrast testing per token pair using tools (recommend using axe/contrast checkers during dev handoff). Annotate token pairs that must meet AA/AAA where relevant.

---

## Spacing & layout tokens

Spacing scale (rem):
- --kadi-space-0: 0
- --kadi-space-1: 0.25rem (4px)
- --kadi-space-2: 0.5rem (8px)
- --kadi-space-3: 0.75rem (12px)
- --kadi-space-4: 1rem (16px)
- --kadi-space-5: 1.5rem (24px)
- --kadi-space-6: 2rem (32px)
- --kadi-space-7: 3rem (48px)

Avatar sizes:
- --kadi-avatar-size-sm: 2rem (32px)
- --kadi-avatar-size-md: 3.5rem (56px)
- --kadi-avatar-size-lg: 6rem (96px)

Card sizing:
- --kadi-card-padding-sm: var(--kadi-space-2)
- --kadi-card-padding-md: var(--kadi-space-4)
- --kadi-card-radius: 0.5rem (8px)
- --kadi-card-gap: var(--kadi-space-3)

Layout rules:
- Use CSS grid for two-column arrangements (avatar / content) with responsive column sizes. Example: grid-template-columns: auto 1fr; gap: var(--kadi-card-gap)
- For compact variant, use inline-flex with center-aligned items and reduced padding.

---

## Interaction states

Design tokens for states (colors + shadows):
- --kadi-focus-ring: 0 0 0 3px rgba(96,165,250,0.18) (accent-blue ring)
- --kadi-hover-elevation: 0 4px 18px rgba(2,6,23,0.6)
- --kadi-active-elevation: 0 2px 8px rgba(2,6,23,0.7)
- --kadi-disabled-opacity: 0.4

State behaviors (buttons, card hover, clickable avatar):
- Default: neutral surface, pointer when interactive.
- Hover: increase elevation, apply subtle warm tint (overlay using multiply or alpha of accent), and change cursor to pointer.
- Focus: visible focus ring; do not rely on color alone. Ensure ring is 3px around interactive area.
- Active: slight scale transform (scale(.98)) and reduced elevation.
- Disabled: reduce opacity to --kadi-disabled-opacity, remove pointer events; ensure contrast of visible text remains >=3:1 for disabled text if actionable state is still required to be readable.

Interaction timing:
- Transitions: 150ms–200ms ease for color/transform, 250ms for elevation/shadow changes.

---

## SVG export and artboard guidelines

Purpose: Provide pixel-consistent vector avatars and icons to be used inside cards. Exports must be optimized for crisp display at UI sizes and for animation when needed.

Artboard / canvas:
- Export at 1x with an integer-based viewBox; for multi-resolution, provide 2x/3x raster PNGs generated from the same vector as needed but do not use raster for primary art.
- Recommended viewBox pattern: viewBox="0 0 W H" where W and H are integers representing final pixel grid at 1x (e.g., 96 96 for --kadi-avatar-size-lg at base 1x = 96px).
- Keep important artwork inside a safe area inset of 4px (or 5% of dimension) to avoid clipping in rounded containers. For a 96x96 viewBox, safe area = 88x88 centered (4px padding each side).

Integer coordinates and stroke alignment:
- Use integer coordinates for positions and sizes wherever possible. Do not use half-pixel coordinates when the target is integer pixel grids at 1x.
- For 1px strokes, align them to integer coordinates plus 0.5 when rendering at integer viewBox sizes if you need pixel-hinting; however, to keep art portable, prefer stroke-widths as even numbers in viewBox units and avoid subpixel misalignment. In short: plan to export art at sizes where stroke widths and positions become integers.
- Explicit note: "When exporting for UI use, ensure final path commands snap to integer coordinates or are authored so that exported viewBox units are integer values. Avoid non-integer translations that cause blurry rendering at common screen scales."

Shape-rendering and crisp edges:
- Add shape-rendering attributes where appropriate:
  - For iconography or geometric shapes where crisp edges are desired: shape-rendering="crispEdges" or shape-rendering="geometricPrecision" (pick crispEdges for pixel-style icons).
  - For organic illustrations where anti-aliasing is preferred: do not set shape-rendering (let the renderer default) or use shape-rendering="geometricPrecision".
- Example usage in SVG header:
  - <svg viewBox="0 0 96 96" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg"> ... </svg>

Grouping layers and naming:
- Use top-level groups for semantic separation:
  - <g id="background"> for background shapes
  - <g id="avatar-base"> for base avatar art
  - <g id="avatar-foreground"> for facial details, equipment
  - <g id="badge"> for overlays (level badge)
  - <g id="anim"> for elements that will be animated (keep transforms isolated here)
- Keep layers flat and avoid nested clipPaths that will complicate CSS animation.

Safe area and export padding:
- Keep all critical details inside the safe area described above. Exports should include a 1–2px transparent padding (in viewBox units) to allow for stroke-width and shadows.

Animation group:
- Place items that will be animated (flying ribbons, glow, blinking eyes) into a single group with id="anim". This allows developers to target the group for performant transforms (use transform: translate3d / scale with GPU acceleration).

Optimization:
- Remove metadata and editor-specific attributes before shipping.
- Prefer simple paths over extremely complex ones; simplify where possible.

---

## Developer handoff examples

Provide CSS variables and example minimal HTML structure. Keep vanilla CSS/HTML only.

CSS variable examples (drop-in tokens):

:root {
  /* Breakpoints */
  --kadi-breakpoint-sm: 600px;
  --kadi-breakpoint-md: 1024px;

  /* Colors */
  --kadi-color-bg: #0F1724;
  --kadi-color-surface: #121826;
  --kadi-color-text: #E6EEF6;
  --kadi-color-muted: #94A3B8;
  --kadi-color-accent: #60A5FA;
  --kadi-color-border: rgba(230,238,246,0.08);

  /* Stat colors */
  --kadi-stat-hp: #EF4444;
  --kadi-stat-mana: #3B82F6;
  --kadi-stat-buffer: rgba(230,238,246,0.12);

  /* Typography */
  --kadi-type-xxl: 2rem;
  --kadi-type-xl: 1.5rem;
  --kadi-type-lg: 1.125rem;
  --kadi-type-md: 1rem;
  --kadi-type-sm: 0.875rem;

  /* Spacing */
  --kadi-space-1: 0.25rem;
  --kadi-space-2: 0.5rem;
  --kadi-space-3: 0.75rem;
  --kadi-space-4: 1rem;
  --kadi-space-5: 1.5rem;

  /* Sizes */
  --kadi-avatar-size-sm: 2rem;
  --kadi-avatar-size-md: 3.5rem;
  --kadi-avatar-size-lg: 6rem;

  /* Card */
  --kadi-card-padding: var(--kadi-space-4);
  --kadi-card-radius: 0.5rem;

  /* Interaction */
  --kadi-focus-ring: 0 0 0 3px rgba(96,165,250,0.18);
  --kadi-disabled-opacity: 0.4;
}

Basic layout example (vanilla CSS):

.card {
  background: var(--kadi-color-surface);
  color: var(--kadi-color-text);
  padding: var(--kadi-card-padding);
  border-radius: var(--kadi-card-radius);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--kadi-space-4);
  align-items: center;
}

.avatar {
  width: var(--kadi-avatar-size-md);
  height: var(--kadi-avatar-size-md);
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.name { font-size: var(--kadi-type-xl); font-weight: 700; }
.role { font-size: var(--kadi-type-sm); color: var(--kadi-color-muted); }
.bio { font-size: var(--kadi-type-md); color: var(--kadi-color-text); }

/* Responsive adjustments */
@media (max-width: var(--kadi-breakpoint-sm)) {
  .card { grid-template-columns: 1fr; text-align: left; }
}

Developer-friendly stat bar example CSS (semantic):

.stat {
  background: var(--kadi-stat-buffer);
  height: 0.75rem;
  border-radius: 999px;
  overflow: hidden;
}
.stat > .fill {
  height: 100%;
  background: var(--kadi-stat-hp);
  width: 65%; /* dynamic */
  transition: width 200ms ease;
}

HTML structure example (standard variant):

<div class="card kadi-card" role="group" aria-label="Character profile: Aria Swiftblade">
  <div class="avatar">
    <!-- Inline SVG avatar or <img src="avatar.svg"> -->
    <svg viewBox="0 0 96 96" width="100%" height="100%" role="img" aria-labelledby="avatar-title avatar-desc" focusable="false">
      <title id="avatar-title">Aria Swiftblade avatar</title>
      <desc id="avatar-desc">A warrior with a blue cloak and short hair</desc>
      <g id="avatar-base"> <!-- paths... --> </g>
      <g id="badge"> <!-- level badge --> </g>
      <g id="anim"> <!-- animated details --> </g>
    </svg>
  </div>

  <div class="content">
    <div class="row">
      <div class="name">Aria Swiftblade</div>
      <div class="meta">
        <span class="role">Rogue • Level <strong>12</strong></span>
      </div>
    </div>

    <p class="bio" id="bio-aria">A nimble rogue from the Silver Docks — quick with a blade and quicker with a grin.</p>

    <div class="stats" aria-hidden="false">
      <!-- Example stat bar -->
      <div class="stat-group">
        <label for="hp-aria">HP</label>
        <div id="hp-aria" class="stat" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="65" aria-label="HP 65 of 100">
          <div class="fill" style="width:65%; background:var(--kadi-stat-hp);"></div>
        </div>
      </div>

      <div class="stat-group">
        <label for="mana-aria">Mana</label>
        <div id="mana-aria" class="stat" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40" aria-label="Mana 40 of 100">
          <div class="fill" style="width:40%; background:var(--kadi-stat-mana);"></div>
        </div>
      </div>
    </div>

    <button class="bio-toggle" aria-expanded="true" aria-controls="bio-aria">Show more</button>
  </div>
</div>

Notes on code examples:
- Use inline SVG when possible to enable styling and animation from CSS/JS.
- Keep HTML semantics: labels for stat bars and role descriptions for screen readers.

---

## Accessibility notes (ARIA and semantics)

Bio toggle patterns:
- Use a <button> for the bio toggle. Provide aria-expanded and aria-controls referencing the bio content's id.
  - Example: <button aria-expanded="false" aria-controls="bio-aria">Show more</button>
- The bio container should have an id and be either hidden with CSS (display:none) when collapsed or remain in the flow but visually collapsed. If using `display:none`, ensure focus management returns to the toggle when collapsed.
- If the expansion reveals large content, manage focus by moving focus to the first interactive element inside the expanded panel or keep focus on the toggle and allow screen reader users to navigate.

Stat bars (progress semantics):
- Use role="progressbar" on stat fills or on their containers. Provide aria-valuemin="0" aria-valuemax="N" aria-valuenow="M" and an accessible label (aria-label or associated label).
  - Example: <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="65" aria-label="HP 65 of 100">...
- Do not rely on color alone to convey stat state. Provide numeric text or tooltips for color-blind users.

General accessibility recommendations:
- Keyboard navigable: All interactive elements (toggles, action buttons, avatar if clickable) must be reachable via keyboard (tab) and show visible focus.
- Provide textual alternatives for avatars (title/desc in SVG or alt text for img).
- Ensure contrast ratios meet WCAG AA for normal text (4.5:1) and AA large text (3:1). Prefer AAA for small UI text where practical.
- Motion: provide reduced-motion checks for animated avatars (prefers-reduced-motion) and minimize movement for non-essential animations.

---

## Verification checklist (for designer & developer)

Visual & token checks:
- [ ] docs/design.md exists and includes tokens, breakpoints, typography, color palette, spacing, interaction states, SVG guidelines, and code examples.
- [ ] CSS variable examples are present and reflect token naming convention.
- [ ] Example HTML structure is present and vanilla (no framework-specific code).

Accessibility & behavior checks:
- [ ] Bio toggle uses aria-expanded and aria-controls; keyboard toggling works and focus is managed.
- [ ] Stat bars expose role=progressbar with aria-valuemin/aria-valuemax/aria-valuenow and accessible label.
- [ ] Focus states are visible and not reliant on color alone.
- [ ] Contrast checks performed for all text-on-surface token pairs (tooling verified).

SVG and asset checks:
- [ ] SVG viewBox uses integer coordinates; important art kept within safe area.
- [ ] shape-rendering guidance included (crispEdges for icons) and integer coordinates note is present.
- [ ] Layers and animation groups are named for developer use.

Developer integration:
- [ ] CSS variables added to root in codebase or design tokens file.
- [ ] Example stat bar and HTML structure used as integration reference.

Sign-off
- Lead designer: ____________________  Date: __________

---

## Appendix — quick patterns

Bio toggle JS pattern (pseudocode):
- On .bio-toggle click:
  - const expanded = toggle.getAttribute('aria-expanded') === 'true';
  - toggle.setAttribute('aria-expanded', String(!expanded));
  - document.getElementById('bio-aria').hidden = expanded; // or toggle class to expand/collapse

Reduced motion example (CSS):
@media (prefers-reduced-motion: reduce) {
  .anim { animation: none !important; transition: none !important; }
}

---

End of spec.
