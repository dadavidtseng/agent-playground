CharCard Component System — Design Spec

Version: 1.0.0
Task: 000c4a73-5c64-44fa-badd-d35728f174e8

Overview
--------
CharCard is a compact, modular character/profile card used to display a character (or user) thumbnail, primary metadata (name, role, short bio), and actions. It supports three display variants: compact, default, and expanded — allowing usage from listing tiles to detailed inline profiles.

Goals
-----
- Clear visual hierarchy and flexible density.
- Accessible keyboard and screen-reader friendly interactions.
- Tokens-driven styling for easy theming and developer handoff.
- Exportable snippets for inline SVG icons.

Anatomy
-------
- Root (.char-card)
  - Media region (.char-card__media)
    - Avatar image or inline SVG (.char-card__avatar)
  - Content region (.char-card__content)
    - Header (.char-card__header)
      - Name (.char-card__name)
      - Role / subtitle (.char-card__role)
    - Body (.char-card__body)
      - Short bio / description (.char-card__bio)
    - Footer (.char-card__footer)
      - Metadata chips / tags (.char-card__chips)
      - Actions (.char-card__actions)

Props (API surface)
-------------------
Explicit props (presented as component props for frameworks like React / Vue):

- id: string (required) — unique id for the card
- variant: 'compact' | 'default' | 'expanded' (default: 'default')
- name: string (required)
- role: string
- avatar: { type: 'image' | 'svg' | 'initials', src?: string, svg?: string, initials?: string }
- bio: string
- tags: string[]
- actions: Array<{ key: string, label: string, icon?: string, onClick?: function, ariaLabel?: string }>
- interactive: boolean (default: true) — is the card focusable/clickable?
- link: string (optional) — href to make the whole card a link
- condensed: boolean (alias for variant === 'compact')
- ariaLabel: string (optional) — overrides accessible label for root when needed

JSON schema for example data API
--------------------------------
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CharCard Data",
  "type": "object",
  "required": ["id","name"],
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "role": { "type": "string" },
    "avatar": {
      "type": "object",
      "required": ["type"],
      "properties": {
        "type": { "enum": ["image","svg","initials"] },
        "src": { "type": "string" },
        "svg": { "type": "string" },
        "initials": { "type": "string" }
      },
      "additionalProperties": false
    },
    "bio": { "type": "string" },
    "tags": { "type": "array", "items": { "type": "string" } },
    "actions": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["key","label"],
        "properties": {
          "key": { "type": "string" },
          "label": { "type": "string" },
          "icon": { "type": "string" },
          "ariaLabel": { "type": "string" }
        }
      }
    },
    "interactive": { "type": "boolean" },
    "link": { "type": "string" }
  },
  "additionalProperties": false
}

Variants
--------
1) Compact
- Density: small
- Use case: lists, search results, sidebars
- Layout: avatar 36px, one-line name + role truncated, no bio, actions hidden behind overflow menu
- Token usage: --char-card-padding: 8px; --char-card-avatar-size: 36px;

2) Default (base)
- Density: medium
- Use case: user listings, cards in content
- Layout: avatar 56px, name + role, one-line bio (truncate), up to 2 visible actions
- Token usage: --char-card-padding: 12px; --char-card-avatar-size: 56px;

3) Expanded
- Density: relaxed
- Use case: inline profile, detail drawer
- Layout: avatar 96px (larger), multi-line bio, full action set
- Token usage: --char-card-padding: 16px; --char-card-avatar-size: 96px;

Responsive Breakpoints
----------------------
Tokens aligned with common breakpoints. Values use CSS media query naming only — actual breakpoints should match project tokens if available.
- xs: up to 360px — very small screens
- sm: 361px — 640px
- md: 641px — 1024px
- lg: 1025px — 1440px
- xl: 1441px and up

Responsive behavior
- Compact variant for xs/sm lists by default.
- Default for md.
- Expanded for lg/xl or when the card is used in full-screen panels.

Typography Scale
----------------
Use a modular scale. Token names and recommended CSS font-size/line-height:
- --font-family-base: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial
- --type-scale-0: 12px / 16px  (caption)
- --type-scale-1: 14px / 20px  (metadata)
- --type-scale-2: 16px / 24px  (body / default)
- --type-scale-3: 18px / 28px  (heading small)
- --type-scale-4: 20px / 28px  (heading)

Mapping to elements:
- Name (.char-card__name) = --type-scale-3 (default) — bold 600
- Role (.char-card__role) = --type-scale-1 — semibold 500, uppercase optional
- Bio (.char-card__bio) = --type-scale-2 — regular 400
- Actions (.char-card__actions button) = --type-scale-1

Color Palette & Tokens
----------------------
Stable token names (CSS variables) — exported also in design/tokens/char-card-tokens.css

Color core:
- --color-bg: #FFFFFF (card background)
- --color-surface: #F7F8FA (surface / subtle container)
- --color-primary: #0055FF (brand primary)
- --color-primary-600: #0041CC
- --color-text: #0F1724 (body text)
- --color-muted: #6B7280 (secondary text)
- --color-border: #E6E9EE
- --color-success: #12B76A
- --color-warning: #F59E0B
- --color-danger: #EF4444
- --color-focus: #B6D4FF

Avatar placeholders:
- --avatar-bg-1: #EDEFFB
- --avatar-bg-2: #FFF4E6
- --avatar-bg-3: #F0FDF4

Elevation & shadow tokens:
- --elevation-0: none
- --elevation-1: 0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)
- --elevation-2: 0 4px 12px rgba(16,24,40,0.08)

Spacing tokens (examples used by variants):
- --char-card-padding-compact: 8px
- --char-card-padding-default: 12px
- --char-card-padding-expanded: 16px
- --char-card-avatar-size-compact: 36px
- --char-card-avatar-size-default: 56px
- --char-card-avatar-size-expanded: 96px

Interaction States
------------------
- default (idle)
- hover: subtle uplift + border color change
  - outline: none
  - transform: translateY(-2px)
  - box-shadow: var(--elevation-1)
  - border-color: --color-primary-600
- focus: 2px solid --color-focus (use focus ring box-shadow for accessibility)
- active / pressed: scale down to 0.995, slightly darker background
- disabled: opacity 0.5, pointer-events: none

Token examples for states
- --char-card-hover-bg: rgba(0,85,255,0.03)
- --char-card-active-bg: rgba(0,85,255,0.06)

Accessibility Guidance
----------------------
ARIA & Roles
- Root card can be:
  - an article when representing a single independent piece of content: <article class="char-card" aria-labelledby="nameId">
  - a link if the whole card navigates: <a class="char-card" href="..." role="link" aria-labelledby="nameId">...
  - a button if clickable but not navigation: <button class="char-card" aria-labelledby="nameId">...
- Provide aria-labelledby on the root that points to the name element id.
- Avatar <img> should have alt text; when decorative use alt="".
- Action buttons must have aria-label when the visible text is not descriptive.

Keyboard Flow
- Tab sequence should be predictable and linear: entire card (if interactive) -> actions -> overflow menu -> next focusable item.
- If the card is interactive as a whole (link/button), pressing Enter/Space activates primary action.
- For composite cards where actions are separate, use roving tabindex only if complex keyboard interactions required. Otherwise keep normal tab order.

Screen Reader Examples
- Non-interactive card:
  <article class="char-card" aria-labelledby="char-1-name">
    <h3 id="char-1-name">Astra Nova</h3>
    <p class="sr-only">Role: Pilot</p>
  </article>

- Interactive card as link:
  <a class="char-card" href="/profile/astra" aria-labelledby="char-1-name" role="link">
    ...
  </a>

Contrast
- Ensure name and primary text meet AA (4.5:1) where possible for body text; headings should aim for 3:1.
- Use --color-text for primary, --color-muted for secondary. If role text sits on brand primary backgrounds, adjust to meet contrast.

Design Tokens (CSS variable names)
---------------------------------
List of tokens to be exported. All tokens are prefixed or maintained as global variables; prefer stable names:

:root {
  --color-bg: #FFFFFF;
  --color-surface: #F7F8FA;
  --color-primary: #0055FF;
  --color-primary-600: #0041CC;
  --color-text: #0F1724;
  --color-muted: #6B7280;
  --color-border: #E6E9EE;
  --color-success: #12B76A;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
  --color-focus: #B6D4FF;

  --avatar-bg-1: #EDEFFB;
  --avatar-bg-2: #FFF4E6;
  --avatar-bg-3: #F0FDF4;

  --elevation-0: none;
  --elevation-1: 0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06);
  --elevation-2: 0 4px 12px rgba(16,24,40,0.08);

  --char-card-padding-compact: 8px;
  --char-card-padding-default: 12px;
  --char-card-padding-expanded: 16px;

  --char-card-avatar-size-compact: 36px;
  --char-card-avatar-size-default: 56px;
  --char-card-avatar-size-expanded: 96px;

  --char-card-hover-bg: rgba(0,85,255,0.03);
  --char-card-active-bg: rgba(0,85,255,0.06);
}

Exportable CSS tokens file (design/tokens/char-card-tokens.css)
- The tokens file includes the :root block above as a single-source import for implementers.

Example Markup Snippets
-----------------------
1) Basic default card (non-interactive)

<article class="char-card" aria-labelledby="char-1-name">
  <div class="char-card__media">
    <img class="char-card__avatar" src="/images/astra.jpg" alt="Astra Nova" width="56" height="56" />
  </div>
  <div class="char-card__content">
    <div class="char-card__header">
      <h3 id="char-1-name" class="char-card__name">Astra Nova</h3>
      <div class="char-card__role">Pilot</div>
    </div>
    <div class="char-card__body">
      <p class="char-card__bio">Expert in interstellar navigation and survey operations.</p>
    </div>
    <div class="char-card__footer">
      <div class="char-card__chips"><span>Recon</span><span>Navigator</span></div>
      <div class="char-card__actions"><button aria-label="Message Astra">Message</button></div>
    </div>
  </div>
</article>

2) Interactive card as a link (default)

<a class="char-card" href="/profile/astra" aria-labelledby="char-1-name">
  <!-- same inner structure -->
</a>

3) Compact variant (example with initials avatar)

<article class="char-card char-card--compact" aria-labelledby="char-2-name">
  <div class="char-card__media">
    <div class="char-card__avatar" role="img" aria-label="NV">NV</div>
  </div>
  <div class="char-card__content">
    <div class="char-card__header">
      <h4 id="char-2-name" class="char-card__name">Nova Voss</h4>
      <div class="char-card__role">Scout</div>
    </div>
  </div>
</article>

Inline SVG Icon Examples
------------------------
Provide artist-friendly SVGs inline so the programmer can style them with currentColor or CSS variables.

1) Small chevron (used for disclosure / expand)

<svg class="icon icon--chev" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>

2) Message / chat icon

<svg class="icon icon--message" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>

Guidance: use stroke="currentColor" or fill="currentColor" so icons pick up text color tokens. If the artist supplies colored SVGs, prefer to flatten them to a single hue or provide CSS variables inside the SVG for theming.

Example CSS snippet demonstrating tokens and variants (implementer-level)

.char-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: var(--char-card-padding-default);
  box-shadow: var(--elevation-0);
  color: var(--color-text);
}
.char-card:hover {
  background: var(--char-card-hover-bg);
  box-shadow: var(--elevation-1);
  transform: translateY(-2px);
}
.char-card:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px var(--color-focus);
}
.char-card__avatar {
  width: var(--char-card-avatar-size-default);
  height: var(--char-card-avatar-size-default);
  border-radius: 8px;
  object-fit: cover;
}

JSON example (concrete)
-----------------------
{
  "id": "char-1",
  "name": "Astra Nova",
  "role": "Pilot",
  "avatar": { "type": "image", "src": "/images/astra.jpg" },
  "bio": "Expert in interstellar navigation and survey operations.",
  "tags": ["Recon","Navigator"],
  "actions": [{ "key":"msg","label":"Message","icon":"message" }]
}

Developer Handoff Notes
----------------------
- Keep token names stable: do not rename --color-primary, --char-card-avatar-size-default, etc., without coordinating with Artist and Programmer.
- Provide SVGs as symbols or inline where sizes are small; prefer inline to allow CSS styling.
- Export tokens file (design/tokens/char-card-tokens.css) as single import for implementation teams.

Change Log
----------
- 1.0.0 — initial spec and token export

Appendix: Quick ARIA patterns and keyboard examples
--------------------------------------------------
1) Card as actionable region (Enter/Space)
- Markup: <div role="button" tabindex="0" aria-labelledby="char-1-name">...
- Keyboard: Enter/Space trigger the click handler

2) Card with internal focusable actions
- Tab -> Link/Button in card -> Tab -> next action
- Avoid using role="application" or custom roving unless necessary

End of spec
