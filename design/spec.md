# Character Profile Card — Design System Specification

Version: 1.0.0
Component: Character Profile Card
Task: 21689dac-4b4b-4ea9-bec6-304dda4a22de

---

## Overview

The Character Profile Card is a compact, accessible UI component for displaying a user or fictional character's portrait, name, short metadata (role/status), and a set of stats or badges. This spec defines the component anatomy, responsive layout rules, the complete token set (CSS variables prefixed with `--card-`), interaction states, accessibility guidance, and example markup + CSS snippets for two variants:

- Compact: minimal information for lists or grids.
- Detailed: expanded layout with additional metadata and stat bars.

Note: This spec intentionally excludes artwork (SVGs) and JavaScript behavior; it focuses on tokens, layout, and markup.

---

## Anatomy

- Root (card): container element for the whole component (recommended role: group).
- Media: avatar / portrait area (image element or background-image).
- Header: name + primary metadata (role/title/status).
- Body: description or short bio (optional, mostly in detailed variant).
- Stats / Badges: list of compact badges or visual stat bars (progress-like UI).
- Actions (optional): inline action buttons or menu.

Structure (semantic outline):

- article.card (role="group")
  - figure.card__media > img.card__avatar
  - header.card__header
    - h3.card__name
    - p.card__meta
  - div.card__body (detailed variant)
    - p.card__desc
    - ul.card__stats
      - li.stat (contains label + stat bar or badge)
  - footer.card__actions (optional)

---

## Responsive breakpoints & layout rules

Tokens for breakpoints:
- --card-breakpoint-mobile: 480px
- --card-breakpoint-tablet: 768px
- --card-breakpoint-desktop: 1024px

Layout rules (recommended):

Mobile (<= --card-breakpoint-mobile)
- Variant: stacked, single column
- Avatar: left-aligned small circle or top-centered large avatar for detailed cards
- Spacing: tight; prioritize compactness
- Example: grid item or list item

Tablet (between mobile and --card-breakpoint-desktop)
- Variant: compact uses left aligned avatar + content to the right; detailed uses two-row layout with avatar on left and details to the right

Desktop (>= --card-breakpoint-desktop)
- Variant: detailed card displays avatar and header on top, body and stats on same row or split columns
- Enough horizontal space to show stat bars with labels

Responsive example CSS (conceptual):

- Mobile: .card { padding: var(--card-space-sm); font-size: var(--card-font-size-sm) }
- Tablet: .card { padding: var(--card-space-md); font-size: var(--card-font-size-md); display: flex; align-items: center }
- Desktop: .card { padding: var(--card-space-lg); font-size: var(--card-font-size-md); grid-template-columns: 128px 1fr }

---

## Token list

All tokens are CSS custom properties and MUST be namespaced with `--card-`.
The token table below provides recommended example values. Implementers can adapt values to brand design, but token names must be honored for consistent API.

Typography scale tokens

- --card-font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif
- --card-font-weight-regular: 400
- --card-font-weight-semibold: 600
- --card-font-weight-bold: 700
- --card-font-size-xs: 12px
- --card-font-size-sm: 14px
- --card-font-size-md: 16px
- --card-font-size-lg: 18px
- --card-font-size-xl: 20px
- --card-line-height-tight: 1.1
- --card-line-height-normal: 1.4

Spacing & sizing tokens

- --card-space-xxs: 4px
- --card-space-xs: 8px
- --card-space-sm: 12px
- --card-space-md: 16px
- --card-space-lg: 20px
- --card-space-xl: 24px
- --card-border-radius-sm: 6px
- --card-border-radius-md: 12px
- --card-avatar-size-compact: 40px
- --card-avatar-size-regular: 64px
- --card-avatar-size-large: 96px
- --card-max-width-compact: 320px
- --card-max-width-detailed: 540px

Color tokens (examples aligned to accessible palette)

- --card-color-bg: #FFFFFF
- --card-color-bg-muted: #F7F8FA
- --card-color-border: #E6E8EB
- --card-color-accent: #2563EB /* blue 600 */
- --card-color-accent-variant: #1D4ED8 /* blue 700 */
- --card-color-primary-text: #0F1724 /* ~Black 92% */
- --card-color-secondary-text: #475569 /* Slate 600 */
- --card-color-success: #16A34A
- --card-color-warning: #F59E0B
- --card-color-danger: #DC2626
- --card-color-muted-text: #94A3B8
- --card-color-overlay: rgba(2,6,23,0.6) /* for avatar overlays */

Border & elevation tokens

- --card-border-width: 1px
- --card-box-shadow-sm: 0 1px 2px rgba(16,24,40,0.04)
- --card-box-shadow-md: 0 6px 18px rgba(16,24,40,0.08)

Interaction tokens

- --card-focus-ring-color: rgba(37,99,235,0.35)
- --card-focus-ring-width: 3px
- --card-hover-bg: rgba(37,99,235,0.04)
- --card-active-bg: rgba(37,99,235,0.08)
- --card-disabled-opacity: 0.5

Stat bar tokens

- --card-stat-height: 8px
- --card-stat-radius: 6px
- --card-stat-bg: #E6E8EB
- --card-stat-fill: #2563EB
- --card-stat-fill-alt: #10B981

Breakpoint tokens

- --card-breakpoint-mobile: 480px
- --card-breakpoint-tablet: 768px
- --card-breakpoint-desktop: 1024px

Z-index tokens

- --card-z-default: 0
- --card-z-elevated: 10

Example token usage (declared in a root or component scope):

:root {
  --card-font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  --card-font-size-md: 16px;
  --card-color-bg: #FFFFFF;
  --card-color-primary-text: #0F1724;
  --card-border-radius-md: 12px;
}

---

## Interaction states

States to style and tokens to use:

- Default: use --card-color-bg, --card-color-primary-text
- Hover: background highlight at var(--card-hover-bg)
- Focus: outline/focus ring using --card-focus-ring-color and --card-focus-ring-width; use outline-offset: 2px or box-shadow for modern UIs
- Active / Pressed: stronger background tint using --card-active-bg and optional inset shadow
- Disabled: reduce opacity via --card-disabled-opacity and disable pointer-events; ensure contrast of visible text remains >= 4.5:1 where interactive content is required

CSS snippets (conceptual):

.card:focus { box-shadow: 0 0 0 var(--card-focus-ring-width) var(--card-focus-ring-color); border-color: var(--card-color-accent-variant); }
.card:hover { background-color: var(--card-hover-bg); }
.card:active { background-color: var(--card-active-bg); }
.card[aria-disabled="true"] { opacity: var(--card-disabled-opacity); pointer-events: none; }

Stat bar interactions

- When each stat is interactive (e.g., reveals details), ensure the stat element is keyboard focusable (tabindex="0") and has an accessible name.

---

## Accessibility guidelines

- Use semantic markup: root card should be article or section; if the card is interactive (clickable), it may be a button or anchor.
- Provide an accessible name: prefer aria-labelledby referencing the heading. Example:
  - <article class="card" role="group" aria-labelledby="char-anna-name"> ... </article>

Contrast targets

- Body text: >= 4.5:1 (WCAG AA) against the background. Prefer higher contrast for headings (>= 7:1 for small text to meet AAA when required).
- Secondary text: >= 3:1 for non-critical metadata.
- Stat bars: color of the numeric label over the stat bar must meet contrast targets; if numbers are on top of colored fills, use a high-contrast label or place the number outside the colored area.

ARIA usage for stat bars (when they convey progress values)

- Use role="progressbar" or role="meter" depending on semantics.
- Required attributes for progressbar:
  - role="progressbar"
  - aria-valuenow (current value)
  - aria-valuemin (min value, usually 0)
  - aria-valuemax (max value, usually 100)
  - aria-label or aria-labelledby to give a textual name

Example:

<li class="stat" role="progressbar" aria-valuenow="74" aria-valuemin="0" aria-valuemax="100" aria-labelledby="stat-strength-label">
  <span id="stat-strength-label" class="stat__label">Strength</span>
  <div class="stat__bar" aria-hidden="true"> ... </div>
</li>

Keyboard accessibility

- Ensure interactive card roots are reachable by keyboard (tabindex if not natively focusable) and provide a visible focus style.
- If the card is selectable in a list, support aria-pressed or aria-selected attributes as appropriate.

Motion / Reduced motion

- Respect prefers-reduced-motion: when animating stat fills or hover transitions, provide a reduced-motion alternative or disable the animation for users who opt out.

Screen reader hints

- For cards that include badges or special states (e.g., "Legendary"), include a visually-hidden element that concatenates the important attributes for quick scanning.

---

## Example markup and CSS snippets

Below are two full examples (compact and detailed) including recommended token usage. These snippets are intentionally minimal and meant as a starting point for implementers.

1) Compact variant (list/grid item)

HTML:

<pre><code>&lt;article class="card card--compact" role="group" aria-labelledby="char-ada-name" tabindex="0"&gt;
  &lt;img class="card__avatar" src="/img/ada-portrait.jpg" alt="Ada Bright" width="40" height="40"&gt;
  &lt;div class="card__content"&gt;
    &lt;h3 id="char-ada-name" class="card__name"&gt;Ada Bright&lt;/h3&gt;
    &lt;p class="card__meta"&gt;Ranger • Level 12&lt;/p&gt;
  &lt;/div&gt;
&lt;/article&gt;
</code></pre>

CSS (tokens + layout):

<pre><code>/* Tokens scope (example) */
.card {
  font-family: var(--card-font-family);
  background: var(--card-color-bg);
  color: var(--card-color-primary-text);
  border: var(--card-border-width) solid var(--card-color-border);
  border-radius: var(--card-border-radius-md);
  box-shadow: var(--card-box-shadow-sm);
  padding: var(--card-space-sm);
  display: flex;
  gap: var(--card-space-sm);
  max-width: var(--card-max-width-compact);
}

.card__avatar {
  width: var(--card-avatar-size-compact);
  height: var(--card-avatar-size-compact);
  border-radius: 50%;
  object-fit: cover;
}

.card__name {
  font-size: var(--card-font-size-sm);
  font-weight: var(--card-font-weight-semibold);
  margin: 0;
  line-height: var(--card-line-height-tight);
}

.card__meta {
  font-size: var(--card-font-size-xs);
  color: var(--card-color-secondary-text);
  margin: 0;
}

.card:focus { box-shadow: 0 0 0 var(--card-focus-ring-width) var(--card-focus-ring-color); }
</code></pre>

Responsive tweak example (compact):

<pre><code>@media (max-width: var(--card-breakpoint-mobile)) {
  .card--compact { padding: var(--card-space-xs); }
  .card__name { font-size: var(--card-font-size-sm); }
}
</code></pre>

2) Detailed variant (profile with stat bars)

HTML:

<pre><code>&lt;article class="card card--detailed" role="group" aria-labelledby="char-mira-name"&gt;
  &lt;figure class="card__media"&gt;
    &lt;img class="card__avatar" src="/img/mira-portrait.jpg" alt="Mira Solara" width="96" height="96"&gt;
  &lt;/figure&gt;
  &lt;div class="card__main"&gt;
    &lt;header class="card__header"&gt;
      &lt;h3 id="char-mira-name" class="card__name"&gt;Mira Solara&lt;/h3&gt;
      &lt;p class="card__meta"&gt;Alchemist • Guildmaster&lt;/p&gt;
    &lt;/header&gt;
    &lt;div class="card__body"&gt;
      &lt;p class="card__desc"&gt;Inventive alchemist known for explosive potions and pragmatic wit.&lt;/p&gt;

      &lt;ul class="card__stats"&gt;
        &lt;li class="stat" role="progressbar" aria-labelledby="stat-intel-label" aria-valuemin="0" aria-valuemax="100" aria-valuenow="88"&gt;
          &lt;span id="stat-intel-label" class="stat__label"&gt;Intellect&lt;/span&gt;
          &lt;div class="stat__bar" aria-hidden="true"&gt;
            &lt;div class="stat__fill" style="width:88%"&gt;&lt;/div&gt;
          &lt;/div&gt;
        &lt;/li&gt;

        &lt;li class="stat" role="progressbar" aria-labelledby="stat-res-label" aria-valuemin="0" aria-valuemax="100" aria-valuenow="64"&gt;
          &lt;span id="stat-res-label" class="stat__label"&gt;Resolve&lt;/span&gt;
          &lt;div class="stat__bar" aria-hidden="true"&gt;
            &lt;div class="stat__fill stat__fill--alt" style="width:64%"&gt;&lt;/div&gt;
          &lt;/div&gt;
        &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/article&gt;
</code></pre>

CSS (tokens + key rules):

<pre><code>.card--detailed {
  display: grid;
  grid-template-columns: var(--card-avatar-size-large) 1fr;
  gap: var(--card-space-md);
  padding: var(--card-space-md);
  max-width: var(--card-max-width-detailed);
  background: var(--card-color-bg);
  border-radius: var(--card-border-radius-md);
  border: var(--card-border-width) solid var(--card-color-border);
}

.card__avatar { width: var(--card-avatar-size-large); height: var(--card-avatar-size-large); border-radius: var(--card-border-radius-md); object-fit: cover; }

.card__name { font-size: var(--card-font-size-lg); font-weight: var(--card-font-weight-bold); color: var(--card-color-primary-text); }
.card__meta { color: var(--card-color-secondary-text); font-size: var(--card-font-size-sm); }
.card__desc { color: var(--card-color-secondary-text); font-size: var(--card-font-size-sm); margin-top: var(--card-space-xs); }

/* Stat bar */
.stat__bar { background: var(--card-stat-bg); height: var(--card-stat-height); border-radius: var(--card-stat-radius); overflow: hidden; margin-top: var(--card-space-xs); }
.stat__fill { height: 100%; background: var(--card-stat-fill); border-radius: var(--card-stat-radius); transition: width 320ms cubic-bezier(.2,.8,.2,1); }
.stat__fill--alt { background: var(--card-stat-fill-alt); }

@media (max-width: var(--card-breakpoint-tablet)) {
  .card--detailed { grid-template-columns: 1fr; grid-template-rows: auto auto; }
  .card__avatar { margin: 0 auto; }
}
</code></pre>

Accessibility-focused CSS examples:

<pre><code>/* Focus visible for keyboard users */
.card:focus-visible { outline: 3px solid var(--card-focus-ring-color); outline-offset: 2px; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .stat__fill { transition: none; }
}
</code></pre>

---

## Example mockups (ASCII)

Compact:

+------------------------------------------------+
| (avatar)  Ada Bright                           |
|           Ranger • Level 12                    |
+------------------------------------------------+

Detailed:

+--------------------------------------------------------------+
| (avatar)   Mira Solara            Alchemist • Guildmaster     |
|            Inventive alchemist known for explosive potions...  |
|                                                              |
|  Intellect  [████████████████████████████████████ 88% ]      |
|  Resolve    [██████████████████████            64% ]         |
+--------------------------------------------------------------+

---

## Usage & props

When mapping to a web component or a React/Vue prop API, the following props/attributes are recommended:

- variant: "compact" | "detailed" (maps to CSS class .card--compact or .card--detailed)
- avatar-src: URL for the image (use alt text for accessibility)
- name: Primary label (used in heading, required)
- subtitle/meta: short metadata string (role, class, level)
- description: short body text (detailed only)
- stats: array of { id, label, value (0-100), color? }
- interactive: boolean (if true, card is keyboard-focusable & clickable)
- disabled: boolean (sets aria-disabled="true")

Expected HTML structure summary

- Root: article.card[role="group"]
- Heading: h3.card__name (id referenced by aria-labelledby on the root)
- Avatar: img.card__avatar with alt attribute
- Stats: ul.card__stats > li.stat (role="progressbar" + aria-valuenow/min/max + aria-labelledby)

---

## Notes & implementation guidance

- Keep tokens in a central variables file and import into component-specific styles.
- Ensure token naming is not changed to maintain API contract for projects consuming the design system.
- Do not place text directly on top of colored stat fills unless contrast is tested and proven >= 4.5:1.
- For animations (e.g., stat bar fill), prefer transitions on width and respect prefers-reduced-motion.

---

## Changelog

- 1.0.0 — Initial token set, responsive rules, accessibility guidelines, and markup examples.



