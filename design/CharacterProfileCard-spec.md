# Character Profile Card — Component Specification

Version: 1.0.0
Author: Designer Agent (KĀDI)
Task: fbb420d4-ace8-480a-8404-7d196385c7c6

Overview
--------
The Character Profile Card is a reusable surface that presents a character's avatar, identity, short bio/tagline, key stats and primary actions. It is responsive across mobile, tablet, and desktop and accessible with explicit ARIA patterns and keyboard interactions.

Files produced
--------------
- design/tokens.css — CSS tokens (exportable variables) and usage examples
- design/CharacterProfileCard-spec.md — this specification
- design/mockups/character-profile-mobile.svg
- design/mockups/character-profile-tablet.svg
- design/mockups/character-profile-desktop.svg

Design tokens summary (exported in tokens.css)
---------------------------------------------
- Color tokens: --color-... (primary, surface, background, text, muted, success, warn, danger)
- Typography tokens: --font-family-base, --fs-xx, --lh-xx, --fw-xx
- Spacing scale: --space-0 ... --space-7 (in rem)
- Radii: --radius-sm/md/lg
- Elevation (shadow) tokens: --elev-1/2
- Motion: --motion-duration-fast/normal/slow, easing tokens

Component anatomy
-----------------
1. Card container (role="group" or landmark depending on context)
2. Media column: Avatar (circular image) and optional media badge
3. Content column:
   - Title (character name)
   - Subtitle (role or short descriptor)
   - Tagline / short bio
   - Stats row (small chips: level, HP, XP, followers)
4. Actions row:
   - Primary action button (e.g., "View")
   - Secondary action (icon button: favorite/share)
5. Decorative/badging elements (status dot, online/offline)

Anatomy diagram (textual)
- .card
  - .card__media
    - img.avatar
    - span.badge
  - .card__content
    - h3.card__title
    - p.card__subtitle
    - p.card__tagline
    - ul.card__stats > li.stat
  - .card__actions
    - button.btn--primary
    - button.btn--icon

Responsive breakpoints
----------------------
All units are in rem (root = 16px).
- Mobile (M): up to 37.5rem (600px) — single column vertical layout
- Tablet (T): 37.5rem — 64rem (600px - 1024px) — compact horizontal layout
- Desktop (D): 64rem and up (1024px+) — richer layout with more spacing and optional extra details

Typography scale (recommended)
-------------------------------
--font-family-base: system fonts stack (see tokens.css)
Headings and body (all sizes in rem):
- fs-xl: 1.5rem  (24px)
- fs-lg: 1.25rem (20px)
- fs-md: 1rem    (16px)
- fs-sm: 0.875rem (14px)
- fs-xs: 0.75rem (12px)
Line-height tokens:
- lh-tight: 1.1
- lh-normal: 1.4
- lh-relaxed: 1.6

Spacing scale (rem)
-------------------
- space-0: 0.25rem
- space-1: 0.5rem
- space-2: 0.75rem
- space-3: 1rem
- space-4: 1.5rem
- space-5: 2rem
- space-6: 3rem
- space-7: 4rem

Radii & Elevation
-----------------
- radius-sm: 0.25rem
- radius-md: 0.5rem
- radius-lg: 1rem
- elev-1: 0 0.125rem 0.25rem rgba(0,0,0,0.06)
- elev-2: 0 0.25rem 0.6rem rgba(0,0,0,0.12)

Color system
------------
Semantic tokens (example values in tokens.css):
- --color-bg: app background
- --color-surface: card background
- --color-primary: brand accent
- --color-text: high-contrast text
- --color-muted: subdued text
- --color-border: subtle outlines
- --color-focus: focus ring color

Interaction states
------------------
For interactive elements (buttons, links, icon buttons, card actionable area):
- Default: visible affordance (e.g., elevated card or outline)
- Hover (pointer): increase elevation, subtle translateY(-0.125rem), color change on primary
- Active: scale down slightly (scale(.98)), darker background shade
- Focus-visible: 3px ring using --color-focus, no outline only
- Disabled: opacity 0.5, pointer-events: none
Motion timing (use tokens in tokens.css)
- fast: 120ms ease-out
- normal: 200ms cubic-bezier(.2,.9,.2,1)
- slow: 320ms cubic-bezier(.2,.9,.2,1)

Card behavior by breakpoint
---------------------------
Mobile (M)
- Vertical stack: avatar centered at top, text centered, actions full-width or stacked.
- Padding: space-3 (1rem)
- Avatar size: 4rem (64px)
- Title: fs-lg

Tablet (T)
- Two-column: avatar left, content right. Avatar larger (5rem). Actions inline.
- Padding: space-4 (1.5rem)
- Title: fs-xl or fs-lg depending on density

Desktop (D)
- Two-column with additional details: show extra stats, more generous spacing
- Avatar: 6rem
- Padding: space-5 (2rem)
- Title: fs-xl

Accessibility: ARIA & keyboard patterns
--------------------------------------
The card can be either a static informational block or an interactive region.

1) Non-interactive (just content)
- Markup: <article class="card" aria-labelledby="char-1-name"> ... </article>
- Use semantic elements (article, h3) and labels.

2) Interactive card (whole card is clickable leading to detail)
- Markup pattern A (preferred): <a class="card card--actionable" href="/characters/1" aria-labelledby="char-1-name"> ... </a>
  - Use <a> as the container for semantics. Ensure inner interactive controls (buttons) are not nested as <a> children that are also interactive; instead convert them to buttons and stop propagation as needed.
- ARIA: Provide aria-labelledby on the container pointing to the title ID.

3) Card with a primary action and secondary controls
- Mark container as <div class="card" role="group" aria-labelledby="char-1-name"> and include an accessible label.
- Primary action: <button class="btn btn--primary" aria-label="View character details">View</button>

Keyboard interaction flows
- Focus order: Logical DOM order — avatar (if interactive), title link/button, subtitle (read-only), stats (read-only), actions (buttons)
- If the entire card is a link, Tab should focus the card container/link, Enter/Space activates (navigate). Secondary controls must be reachable: avoid wrapping buttons in <a>.
- Escape: If card opens a popover/modal (not part of base card), Escape closes it.
- Icon buttons: include aria-pressed where toggle (favorite), aria-label describing action.

ARIA examples
-------------
Non-clickable card (read-only):

<article class="card" aria-labelledby="char-1-name">
  <img id="char-1-avatar" src="..." alt="Portrait of Aria Starfire" class="avatar">
  <div class="card__content">
    <h3 id="char-1-name">Aria Starfire</h3>
    <p class="card__subtitle">Wanderer · Level 12</p>
    <p class="card__tagline">A curious explorer with a quick wit.</p>
  </div>
</article>

Interactive card (link container):

<a class="card card--link" href="/characters/aria" aria-labelledby="char-1-name">
  <img id="char-1-avatar" src="..." alt="Portrait of Aria Starfire" class="avatar">
  <div class="card__content">
    <h3 id="char-1-name">Aria Starfire</h3>
    <p class="card__subtitle">Wanderer · Level 12</p>
    <p class="card__tagline">A curious explorer with a quick wit.</p>
  </div>
</a>

Card with separate actions (group)

<div class="card" role="group" aria-labelledby="char-1-name">
  <img id="char-1-avatar" src="..." alt="Portrait of Aria Starfire" class="avatar">
  <div class="card__content">
    <h3 id="char-1-name">Aria Starfire</h3>
    <p class="card__subtitle">Wanderer · Level 12</p>
  </div>
  <div class="card__actions">
    <button class="btn btn--primary">View</button>
    <button class="btn btn--icon" aria-pressed="false" aria-label="Favorite Aria">★</button>
  </div>
</div>

Notes on focus management:
- Use :focus-visible to show the focus ring only for keyboard users.
- When a control opens a modal, move focus into the modal and restore focus to the triggering element when closed.

Motion & transitions
--------------------
- Use hardware-accelerated transforms (translateZ(0) / translateY) and opacity changes only.
- Avoid layout-triggering transitions on width/height. Prefer transform/opacity.
- Reduce motion: respect prefers-reduced-motion and reduce movement/duration.

prefers-reduced-motion example:
@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}

Developer handoff / README snippet
---------------------------------
Include tokens.css in your build or import it directly into the root stylesheet.

1) Importing tokens
<link rel="stylesheet" href="/design/tokens.css">

2) Example markup + minimal CSS (vanilla) using tokens

<!-- HTML -->
<article class="card" aria-labelledby="char-aria-name">
  <img src="/images/aria.jpg" alt="Aria Starfire" class="avatar" id="char-aria-avatar">
  <div class="card__content">
    <h3 id="char-aria-name">Aria Starfire</h3>
    <p class="card__subtitle">Wanderer · Level 12</p>
    <p class="card__tagline">A curious explorer with a quick wit.</p>
    <div class="card__actions">
      <button class="btn btn--primary">View</button>
      <button class="btn btn--icon" aria-pressed="false" aria-label="Favorite">★</button>
    </div>
  </div>
</article>

/* Minimal CSS usage (import tokens.css first) */
.card { background: var(--color-surface); padding: var(--space-3); border-radius: var(--radius-md); box-shadow: var(--elev-1); }
.avatar { width: 4rem; height: 4rem; border-radius: 50%; }

Export settings
---------------
- Units: rem for spacing/typography/radii; colors in hex or rgba.
- Provide tokens.css as single source of truth. Designers should keep a JSON mapping in their design tool but not rely on proprietary exports alone.

Design notes & accessible color contrast
--------------------------------------
- Ensure text color on surface meets WCAG AA (4.5:1 for normal text) for primary text. Muted text should meet at least 3:1 for larger text.
- Use focus ring color with sufficient contrast to be visible on both dark and light surfaces.

Testing checklist
-----------------
- Keyboard-only navigation: tab through card, buttons, check focus rings
- Screen reader: Verify aria-labelledby and button labels announce correctly
- High-contrast / dark-mode: Verify color tokens invert appropriately or use CSS variables to swap scheme
- Reduced motion: transitions disabled

Appendix: token references and usage
------------------------------------
See design/tokens.css for the canonical token definitions and CSS usage examples.


