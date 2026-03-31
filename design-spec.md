# Card Component Design Spec (.cc-card)

Version: 1.0
Author: Designer Bot
Task ID: 52418b49-2fdb-4470-95eb-486dd19d2bb2

This document specifies tokens, breakpoints, component anatomy, interaction states, animation specs, CSS variable examples, mobile/desktop layout guidance, example HTML structure, and accessibility checklist for the Card component (.cc-card). Scope is limited to the Card component only.

---

## 1. Design Tokens

Purpose: centralize spacing, color, type and elevation tokens used by .cc-card.

Color tokens (recommended palette):
- --cc-color-primary: #0A66FF;       /* vivid blue */
- --cc-color-surface: #FFFFFF;       /* card surface */
- --cc-color-muted: #F3F4F6;         /* subtle background */
- --cc-color-text: #0F1722;          /* primary text (dark) */
- --cc-color-subtext: #6B7280;       /* secondary text (muted) */
- --cc-color-accent: #00C2A8;        /* accent / success-ish */
- --cc-color-warning: #FFB020;      /* warning */
- --cc-color-danger: #EF4444;       /* danger */
- --cc-color-border: #E6E9EE;       /* subtle border */
- --cc-shadow-1: 0 1px 2px rgba(11, 20, 30, 0.04);
- --cc-shadow-2: 0 8px 24px rgba(11, 20, 30, 0.08);

Spacing tokens:
- --cc-space-2: 4px
- --cc-space-3: 8px
- --cc-space-4: 12px
- --cc-space-5: 16px
- --cc-space-6: 20px
- --cc-space-7: 24px
- --cc-space-8: 32px

Radius tokens:
- --cc-radius-sm: 6px
- --cc-radius-md: 12px
- --cc-radius-lg: 16px

Type tokens (for card):
- --cc-font-size-title: 16px
- --cc-font-size-subtitle: 13px
- --cc-font-size-body: 14px
- --cc-font-weight-regular: 400
- --cc-font-weight-medium: 500

Animation tokens (also repeated in Designer Notes):
- --cc-animation-duration: 700ms
- --cc-animation-easing: cubic-bezier(0.22, 1, 0.36, 1)


## 2. Breakpoints

Define three breakpoints (mobile, tablet, desktop) to guide layout variations.
- small (mobile): up to 599px
- medium (tablet): 600px — 1023px
- large (desktop): 1024px and up

Suggested CSS variable switches per breakpoint (examples in later sections).


## 3. Component Anatomy (.cc-card)

Main structural parts (BEM-like names for clarity):
- .cc-card — root container (role="group" or article)
  - .cc-card__media — optional header image / avatar
  - .cc-card__body — main content container
    - .cc-card__title — primary label / title
    - .cc-card__subtitle — secondary label
    - .cc-card__content — body copy or description
  - .cc-card__footer — action area (buttons, meta, progress)
  - .cc-card__badge — optional small badge / status

Accessibility-ready roles and attributes are described in the Accessibility Checklist section.


## 4. Interaction States

Visual guidance and tokens for state changes.

States to specify:
- default (idle)
- hover
- focus (keyboard focus visible)
- active (pressed)
- selected (if card is selectable)
- disabled

Recommended visual changes per state:
- hover: elevate shadow to --cc-shadow-2, translateY(-2px), border-color darken slightly
- focus: outline (focus ring) using 3px solid color derived from --cc-color-primary with accessible contrast; do NOT use box-shadow-only for focus
- active: transform scale(0.996) and reduce shadow
- selected: subtle outline or 2px inset ring using --cc-color-accent at low alpha
- disabled: reduce opacity to 0.5, disable pointer events

Example visual token mapping:
- --cc-card-shadow-default: var(--cc-shadow-1)
- --cc-card-shadow-hover: var(--cc-shadow-2)
- --cc-card-border: 1px solid var(--cc-color-border)


## 5. Animation Specs

Global animation guidance for the Card's interactive transitions (enter/hover/press/open).
- duration: 700ms (use --cc-animation-duration)
- easing: cubic-bezier(0.22, 1, 0.36, 1) (use --cc-animation-easing)
- properties to animate: transform, box-shadow, opacity
- hardware-accelerated: Use transform and opacity where possible. Avoid animating layout-triggering properties like width/height when possible.

Micro interaction examples:
- Hover lift: transform: translateY(-4px) and box-shadow change over 700ms with easing.
- Press: transform: scale(0.996) over 120ms (shorter immediate response) then return to rest using the 700ms easing for smooth easing back.

Reduced motion considerations: If user prefers reduced motion, reduce durations to 0 or 100ms and remove translate/scale animations. See Accessibility Checklist.


## 6. CSS Variable Examples

Copy these into the card-specific stylesheet (scope only to the component root or a :root override that is card-scoped).

:root (or .cc-card {
  --cc-color-primary: #0A66FF;
  --cc-color-surface: #FFFFFF;
  --cc-color-muted: #F3F4F6;
  --cc-color-text: #0F1722;
  --cc-color-subtext: #6B7280;
  --cc-color-accent: #00C2A8;
  --cc-color-border: #E6E9EE;

  --cc-space-2: 4px;
  --cc-space-3: 8px;
  --cc-space-4: 12px;
  --cc-space-5: 16px;
  --cc-space-6: 20px;
  --cc-space-7: 24px;
  --cc-space-8: 32px;

  --cc-radius-md: 12px;

  --cc-font-size-title: 16px;
  --cc-font-size-body: 14px;

  --cc-card-shadow-default: 0 1px 2px rgba(11, 20, 30, 0.04);
  --cc-card-shadow-hover: 0 8px 24px rgba(11, 20, 30, 0.08);

  --cc-animation-duration: 700ms;
  --cc-animation-easing: cubic-bezier(0.22, 1, 0.36, 1);
}


Example CSS for the component (concise, only illustrative):

.cc-card {
  background: var(--cc-color-surface);
  border-radius: var(--cc-radius-md);
  border: 1px solid var(--cc-color-border);
  box-shadow: var(--cc-card-shadow-default);
  padding: var(--cc-space-5);
  color: var(--cc-color-text);
  transition: transform var(--cc-animation-duration) var(--cc-animation-easing),
              box-shadow var(--cc-animation-duration) var(--cc-animation-easing),
              border-color var(--cc-animation-duration) var(--cc-animation-easing);
}

.cc-card:hover {
  box-shadow: var(--cc-card-shadow-hover);
  transform: translateY(-4px);
}

.cc-card:active {
  transform: scale(0.996);
  transition-duration: 120ms; /* faster press feedback */
}

.cc-card:focus {
  outline: 3px solid color-mix(in srgb, var(--cc-color-primary) 80%, transparent);
  outline-offset: 2px;
}


## 7. Layout Guidance (mobile / desktop)

General principles:
- Keep content stacked on mobile for readability; show larger media and condensed footer actions.
- On tablet, allow two-column layout if card content benefits from side-by-side media + text.
- On desktop, preserve generous padding and allow meta/actions to float to the right in the footer.

Breakpoint-specific examples:

Mobile (<=599px)
- padding: var(--cc-space-5) (16px)
- media: full-width above content
- title font-size: var(--cc-font-size-title)
- footer actions: stacked or horizontally scrollable

Tablet (600px–1023px)
- padding: var(--cc-space-6) (20px)
- layout: optional two-column grid: media (40%) | body (60%)
- title: var(--cc-font-size-title) with line-clamp at 2 lines

Desktop (>=1024px)
- padding: var(--cc-space-7) (24px) or var(--cc-space-8) for dense media
- layout: two-column with media left and body right, footer actions aligned right
- max-width: consider an intrinsic max-width for readable measure (e.g., 560–720px for a single column card)

CSS snippet for responsive layout:

@media (max-width: 599px) {
  .cc-card { padding: var(--cc-space-5); }
  .cc-card__media { width: 100%; margin-bottom: var(--cc-space-4); }
}

@media (min-width: 600px) and (max-width: 1023px) {
  .cc-card { padding: var(--cc-space-6); display: grid; grid-template-columns: 40% 60%; gap: var(--cc-space-5); }
  .cc-card__media { width: 100%; height: auto; }
}

@media (min-width: 1024px) {
  .cc-card { padding: var(--cc-space-7); display: grid; grid-template-columns: 320px 1fr; gap: var(--cc-space-6); align-items: start; }
}


## 8. Example HTML Structure (for programmer)

Do not include global app styles. This snippet scopes to the card component only.

<div class="cc-card" role="group" aria-labelledby="card-title-01" tabindex="0">
  <div class="cc-card__media" aria-hidden="true">
    <img src="/path/to/media.jpg" alt="" />
  </div>

  <div class="cc-card__body">
    <h3 class="cc-card__title" id="card-title-01">Card Title</h3>
    <div class="cc-card__subtitle">Subtitle or meta</div>
    <div class="cc-card__content">Primary content — brief description goes here.</div>
  </div>

  <div class="cc-card__footer">
    <div class="cc-card__meta">Meta</div>
    <div class="cc-card__actions">
      <button class="cc-btn">Action</button>
    </div>
  </div>
</div>

Notes for programmers:
- Use role="group" for composite card; use article if the card is a standalone piece of content that can be referenced independently.
- If the card itself is interactive (clickable to open), ensure it is keyboard-focusable (tabindex="0") and that click/keypress behave consistently.
- For purely decorative media images, use alt="" and aria-hidden="true" on the media wrapper.


## 9. Accessibility Checklist

- Keyboard
  - Card container should be keyboard focusable if it is interactive (tabindex="0"), and Enter/Space should trigger primary action.
  - Ensure focus order is logical: media -> title -> content -> footer actions.

- ARIA roles & attributes
  - Use role="article" for standalone content cards, or role="group" for collection items.
  - Use aria-labelledby on the card to point to the visible title element (id on .cc-card__title).
  - If the card includes a status/progress visualization, use role="progressbar" with aria-valuemin, aria-valuemax, aria-valuenow, and aria-valuetext when necessary.
  - For selectable cards, manage aria-pressed or aria-selected accordingly.

- Contrast
  - Ensure text on surface meets WCAG AA: normal text contrast >= 4.5:1; large text >= 3:1.
  - Buttons inside the card should meet contrast thresholds for their background.

- Reduced motion
  - Respect prefers-reduced-motion: reduce or eliminate non-essential animations. Example CSS:
    @media (prefers-reduced-motion: reduce) {
      .cc-card { transition-duration: 0.01ms !important; transform: none !important; }
    }
  - For motion-sensitive transitions (floating, parallax), provide an instant fallback.

- Focus visibility
  - Provide a visible, high-contrast focus ring (not only box-shadow) and avoid using color alone to indicate focus.

- Semantic markup
  - Use headings (h3/h4) for titles where appropriate and ensure heading order is meaningful within each page.

- Live regions
  - If card content updates dynamically (e.g., progress), use aria-live or polite notifications as needed.


## 10. Designer Notes (important)

- Animation:
  - Duration: 700ms for hover and most transitions (variable --cc-animation-duration).
  - Press feedback: use shorter immediate response (120ms) for active/press events.
  - Easing: cubic-bezier(0.22, 1, 0.36, 1) (variable --cc-animation-easing). This creates a slightly springy, natural feel.

- Spacing tokens:
  - Use the spacing tokens provided (--cc-space-*) for padding and internal gaps. Avoid hard-coded pixel values in components.
  - Recommended default internal padding: var(--cc-space-5) (16px) on mobile, increase at larger breakpoints.

- Elevation:
  - Use subtle shadows for default; stronger shadow on hover. Avoid very dark shadows for small UI cards.

- Colors:
  - Palette provided is intentionally neutral and accessible. If brand tokens are available, map brand primary to --cc-color-primary and ensure contrast for text remains sufficient.


## 11. Example: Card with Progress (ARIA example)

<div class="cc-card" role="group" aria-labelledby="card-title-02">
  <div class="cc-card__body">
    <h3 id="card-title-02" class="cc-card__title">Upload</h3>
    <div class="cc-card__content">Uploading assets</div>
    <div class="cc-card__progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45" aria-valuetext="45% complete" style="width:100%;">
      <div class="cc-card__progress-value" style="width:45%"></div>
    </div>
  </div>
</div>

Style note: the progress container should have a semantic role and expose values for assistive tech.


---

Deliverables in this task:
- design-spec.md (this file) containing tokens, breakpoints, animation specs, CSS variable examples, example HTML, and accessibility checklist.

If you need a compact CSS file for direct copy-paste, tell me and I will provide a focused component stylesheet limited to .cc-card rules.
