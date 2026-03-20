Game Character Profile Card — Design Specification

Overview

This document defines the design system tokens, responsive breakpoints, typography scale, color palette, spacing, component anatomy, interaction states, animation guidelines, accessibility requirements, example markup snippets, and an acceptance checklist for the Game Character Profile Card component.

Important constraints
- Framework-agnostic. No component implementation beyond short example markup snippets.
- Tokens are presented as CSS variable names with example values.

1. CSS Variable Tokens (names + example values)

Color palette — base & semantic tokens
- --kd-color-bg: #0f1724; /* page / card background */
- --kd-color-surface: #111827; /* card surface */
- --kd-color-muted: #6b7280; /* muted text */
- --kd-color-text: #e6eef8; /* primary text */
- --kd-color-accent: #7c3aed; /* primary accent (purple) */
- --kd-color-accent-600: #5b21b6; /* accent darker */
- --kd-color-success: #16a34a; /* success / buff */
- --kd-color-danger: #ef4444; /* damage / negative */
- --kd-color-border: rgba(255,255,255,0.06);
- --kd-color-glow: rgba(124,58,237,0.18);

Surface and elevation
- --kd-shadow-1: 0 1px 2px rgba(2,6,23,0.4);
- --kd-shadow-2: 0 6px 18px rgba(2,6,23,0.6);
- --kd-radius-1: 8px; /* card */
- --kd-radius-2: 6px; /* avatar / badges */

Typography scale (CSS variable names + example values)
- --kd-font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
- --kd-type-xxs: 10px; /* captions */
- --kd-type-xs: 12px; /* small labels */
- --kd-type-sm: 13px; /* secondary */
- --kd-type-base: 16px; /* body / primary */
- --kd-type-lg: 18px; /* headings */
- --kd-type-xl: 20px; /* prominent headings */
- --kd-type-2xl: 24px; /* hero */

Font weight tokens
- --kd-fw-regular: 400;
- --kd-fw-medium: 500;
- --kd-fw-semibold: 600;
- --kd-fw-bold: 700;

Spacing scale (modular spacing tokens)
- --kd-space-xxs: 4px;
- --kd-space-xs: 8px;
- --kd-space-sm: 12px;
- --kd-space-md: 16px;
- --kd-space-lg: 24px;
- --kd-space-xl: 32px;

Sizing tokens
- --kd-avatar-compact: 32px;
- --kd-avatar-regular: 56px;
- --kd-avatar-expanded: 96px;
- --kd-icon-xxs: 12px;
- --kd-icon-xs: 16px;
- --kd-icon-sm: 20px;

Interaction & focus tokens
- --kd-focus-ring: 2px solid var(--kd-color-accent);
- --kd-focus-offset: 3px;
- --kd-hover-elevation: var(--kd-shadow-2);
- --kd-disabled-opacity: 0.36;

Animation / motion tokens
- --kd-duration-fast: 120ms;
- --kd-duration-base: 200ms;
- --kd-duration-slow: 320ms;
- --kd-ease-standard: cubic-bezier(.2,.9,.2,1);
- --kd-ease-smooth: cubic-bezier(.25,.1,.25,1);

Z-index tokens
- --kd-z-card: 10;
- --kd-z-popover: 40;
- --kd-z-tooltip: 60;

2. Responsive breakpoints
Provide recommended breakpoints and behavior. Values are example CSS widths.
- mobile (default): up to 599px — single column, compact anatomy by default.
  - --kd-breakpoint-mobile: 0px
- tablet: 600px — 959px — medium layout, regular anatomy.
  - --kd-breakpoint-tablet: 600px
- desktop: 960px and up — two-column / expanded layout and extra details visible.
  - --kd-breakpoint-desktop: 960px

Behavior by breakpoint
- mobile: compact layout, avatar small, primary info only (name, level, 1-2 vital stats), actions collapsed into a single overflow action.
- tablet: regular layout, avatar medium, full stats list visible, primary actions visible as icons + label.
- desktop: expanded layout, large avatar, additional metadata (lore, gear list), secondary actions shown inline.

3. Component anatomy

High level structure (every variant shares these atomic parts)
- root (card container)
- header (avatar + primary identity stack)
  - avatar (image or initials)
  - name (primary heading)
  - subtitle / role (class, title)
  - level / ranking chip
- stats summary
  - stat item (label + value + optional icon/mini-bar)
- badges / modifiers (small tokens showing status: buff/debuff/rarity)
- actions (buttons: view, message, equip, more)
- footer (optional metadata: last-online, power-score)

Anatomy variants
- compact
  - Purpose: dense list context (e.g., party list, narrow sidebars)
  - Layout: horizontal, avatar 32px, name truncated to single line, 1 vital stat (HP or power), actions hidden under overflow.
  - Visible elements: avatar, name, level chip, primary stat.
- regular
  - Purpose: standard profile card in lists or overview panels
  - Layout: vertical stack or 2-row grid. avatar 56px, name + role, 3–4 stats visible, primary actions visible.
  - Visible elements: header, stats summary, badges, actions.
- expanded
  - Purpose: detail preview or modal-level card
  - Layout: two-column grid (avatar + main info left, stats/details right). avatar 96px, full stats list, gear & lore, actions inline.
  - Visible elements: full header, stats, badges, actions, footer.

4. Visual design & interaction states

Overview: use tokens above to define visual differences. All visual descriptions reference CSS variables.

Default (rest)
- Background: var(--kd-color-surface)
- Text primary: var(--kd-color-text)
- Border: 1px solid var(--kd-color-border)
- Radius: var(--kd-radius-1)
- Box-shadow: var(--kd-shadow-1)

Hover
- Visual change: slight elevation + accent glow
  - transform: translateY(-2px) (subtle)
  - box-shadow: var(--kd-hover-elevation)
  - outline: none by default
  - subtle glow: box-shadow additional layer using var(--kd-color-glow)
  - transition: transform/box-shadow color using --kd-duration-base and --kd-ease-standard
- Example intent: make the whole card feel liftable and invite click.

Active (pressed / mouse down)
- Visual change: pressed-in
  - transform: translateY(0) scale(0.997)
  - box-shadow: var(--kd-shadow-1) (reduced)
  - overlay: rgba(0,0,0,0.06) to indicate press
  - animation: quick (var(--kd-duration-fast))

Focus (keyboard)
- Visual change: accessible focus ring and increased contrast
  - outline: var(--kd-focus-ring) (2px) applied to a focus ring element or outline-offset set to var(--kd-focus-offset)
  - focus-visible recommended: show ring only when keyboard-focused (match :focus-visible behavior)
  - For high contrast / forced focus: fallback to 3px minimum.

Disabled
- Visual change: muted and non-interactive
  - opacity: var(--kd-disabled-opacity)
  - pointer-events: none
  - remove box-shadow / hover elevation
  - remove focusability (no keyboard focus unless stateful item that should be focusable but inert — then use aria-disabled)

Stat update micro-interaction (live stats)
- When a stat value changes (HP, XP, etc.), animate the numeric change with:
  - color flash: var(--kd-color-accent) for increase or var(--kd-color-danger) for decrease for ~300ms
  - scale: small scale up (1.04) then back
  - transition: using --kd-duration-slow and --kd-ease-smooth
- Avoid auto-scrolling or repositioning that would cause layout shift (prefer transform-based animations).

5. Animation guidelines
- Use transforms and opacity only (avoid animating layout where possible).
- Motion durations: fast for press (120ms), base for micro interactions (200ms), slow for larger reveals (320ms).
- Easing: use --kd-ease-standard for interactive motion, --kd-ease-smooth for narrative reveals.
- Reduced motion: respect user preferences: if prefers-reduced-motion then limit animations to fades only or disable non-essential motion.

6. Accessibility requirements

Roles & semantics
- Root container
  - Recommended: role="group" or role="article" with aria-labelledby referencing the name heading.
  - Example: <div role="article" aria-labelledby="char-name-123"> ... </div>
  - Use role="list" and role="listitem" only when the card is used inside a list grid to preserve semantics of the parent.

Headings & labels
- Name should be a semantic heading (h3/h4 depending on context). If headings are not appropriate, ensure the name has aria-label or aria-labelledby on the root element.

Interactive controls
- Actions must be native interactive elements (button, a) or elements with role="button" plus keyboard handling. Avoid relying on clickable divs alone.

Keyboard behavior
- The card root should be focusable (tabindex="0") only if the whole card is an interaction target (e.g., opens profile). Otherwise, keep focus on the individual interactive controls inside (buttons).
- Expected keyboard interactions:
  - Tab to move between actionable elements inside the card.
  - Enter / Space to activate the focused action.
  - Arrow key navigation recommended only for complex composite widgets (not required for simple cards).

ARIA for dynamic stats (live regions)
- If stats update live (HP, XP, or other values that change without user action), expose them via an aria-live region.
  - Use aria-live="polite" for non-critical updates (e.g., XP tick).
  - Use aria-live="assertive" only for critical updates (e.g., character death) — use sparingly to avoid interrupting assistive tech.
  - Mark the region with aria-atomic="true" to ensure the full value is read when it changes (if that is desired).
  - Example: <div aria-live="polite" aria-atomic="true" id="hp-123">HP: 90 / 100</div>
- Keep updates concise; avoid announcing every minor frame update. Batch updates when possible.

Focus styles & visibility
- Ensure a visible high-contrast focus style (outline, ring) for all interactive elements. The focus ring must not rely on color alone — include thickness and negative space to be perceivable.
- For clickable images (avatar), include an aria-label describing the action if the image does not have associated text.

Contrast & color accessibility
- Maintain contrast ratios:
  - Primary text on surface: at least 4.5:1 for body text where possible.
  - Large display text (>= 18pt / 24px bold or 24px regular): at least 3:1.
- Do not convey critical information solely by color (pair with icons or text). For example, buff / debuff badges should include an icon or label.

Screen reader patterns
- Provide an accessible name for the card via aria-labelledby or aria-label combining name + key meta (e.g., "Aria, level 45 Paladin").
- When a card is focused and pressing Enter opens a detail view, announce the action on expansion with role="dialog" or proper ARIA on the destination.

7. Example markup snippets (framework-agnostic)

Minimal accessible card (regular)

<div role="article" aria-labelledby="char-name-001" class="kd-card" tabindex="0">
  <header class="kd-card__header">
    <img src="/avatars/aria.png" alt="Aria portrait" class="kd-avatar" width="56" height="56" />
    <div class="kd-identity">
      <h3 id="char-name-001">Aria Silverwind</h3>
      <div class="kd-role">Paladin</div>
    </div>
    <div class="kd-level" aria-hidden="true">Lv. 45</div>
  </header>

  <section class="kd-stats">
    <div class="kd-stat" aria-live="polite" aria-atomic="true" id="hp-001">HP: <span class="kd-stat__value">90 / 100</span></div>
    <div class="kd-stat">XP: <span class="kd-stat__value">12,400</span></div>
    <div class="kd-stat">Power: <span class="kd-stat__value">1,256</span></div>
  </section>

  <footer class="kd-actions">
    <button type="button">View</button>
    <button type="button">Message</button>
    <button type="button" aria-disabled="true">Equip</button>
  </footer>
</div>

Notes on example:
- Buttons are native for keyboard & screen reader compatibility.
- HP stat has aria-live so screen readers will announce updates politely.
- Root uses role="article" + aria-labelledby to provide an accessible name.

Compact (list) example (structure only)

<li role="listitem" class="kd-card kd-card--compact">
  <img alt="Jax avatar" class="kd-avatar kd-avatar--compact"/>
  <div class="kd-compact__meta">
    <div class="kd-name">Jax</div>
    <div class="kd-level">Lv. 8</div>
  </div>
</li>

8. Verification checklist (Acceptance Criteria)

Visual tokens & structure
- [ ] design-spec.md exists at repository root
- [ ] Contains CSS variable tokens for colors, typography, spacing, shadows, radii, motion tokens
- [ ] Responsive breakpoints documented (mobile/tablet/desktop) and behaviors described

Component anatomy & variants
- [ ] Component anatomy described (root, header, avatar, name, stats, badges, actions, footer)
- [ ] Compact / regular / expanded variants documented with visible elements and layout intent

Interaction states & animation
- [ ] Hover / active / disabled states described with visual changes tied to tokens
- [ ] Focus styles documented (keyboard focus ring guidance)
- [ ] Animation guidelines and reduced-motion guidance included

Accessibility
- [ ] ARIA role guidance provided (root role, labels)
- [ ] Live region behavior for stats documented (aria-live, aria-atomic) and best practices
- [ ] Keyboard behavior & focus management documented
- [ ] Contrast & non-color cues guidance included

Examples & checklist
- [ ] Example markup snippet present (regular card + compact example)
- [ ] Verification checklist included (this section)

9. Implementation notes & best practices
- Keep the card's tab order logical: interactive controls first, then expandable content.
- Avoid relying on hover for critical actions (ensure keyboard alternatives exist).
- When using aria-live, batch frequent updates to prevent being noisy to screen reader users.
- Use CSS variables from this document as the single source of truth for theming and runtime overrides.

10. How to test
- Keyboard only: Tab through all interactive elements. Verify focus styles visible and activation (Enter/Space) works.
- Screen reader: Ensure name is announced when card is focused and that HP updates are announced via aria-live.
- Responsive: Resize viewport to the three breakpoints and verify the compact/regular/expanded layouts show/hide expected elements.
- Color contrast: Run automated contrast checks against the token values.
- Reduced motion: With OS-level reduced motion, confirm that motion is minimized to fades only.

End of specification
