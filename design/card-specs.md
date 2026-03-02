# CharacterCard — Design Specification

File: design/card-specs.md

Contributor Guidelines (file header):
- Maintain canonical ordering: Breakpoints, Typography Scale, Spacing Scale, Interaction States, Responsive Layouts, Accessibility, and Contributor Formatting Rules.
- Use Markdown headings exactly as in this document when adding sections.
- When adding tokens or variants, add a comment line with contributor metadata immediately above changes, e.g.:

  <!-- Contributor: <name> | Date: YYYY-MM-DD | Reason: <short reason> -->

- Keep lists and tables ordered alphabetically when applicable to avoid merge conflicts.
- If a merge conflict occurs: do not reorder existing entries. Re-open the file and insert your additions in the correct alphabetical/section location. Keep contributor comment blocks intact.
- Refer to design/tokens/colors.css for canonical token names. Do not redefine tokens in this file; reference them.

## Purpose
This document defines breakpoints, spacing and typography tokens, and detailed interaction states for the CharacterCard component. It provides responsive mockups descriptions and rules to help implementers and contributors maintain consistent design decisions.

## Breakpoints
Follow these breakpoints for responsive layouts. Use mobile-first CSS.

- small (mobile): min-width: 0px, max-width: 599px
- medium (tablet): min-width: 600px, max-width: 1023px
- large (desktop): min-width: 1024px

Canonical media queries (examples):
- mobile: @media (max-width: 599px)
- tablet: @media (min-width: 600px) and (max-width: 1023px)
- desktop: @media (min-width: 1024px)

## Typography Scale
Reference tokens from design/tokens/colors.css. Use semantic tokens for components.

- Heading (card title): var(--type-xl) — font-weight: var(--font-weight-medium);
- Subheading (role / meta): var(--type-md) — font-weight: var(--font-weight-regular);
- Body (description / stats): var(--type-sm) — font-weight: var(--font-weight-regular);
- Caption (tag / small labels): var(--type-xs) — font-weight: var(--font-weight-regular);

Line heights:
- Heading: 1.2 (preferably clamp to --leading-tight/normal as needed)
- Body: var(--leading-normal)
- Caption: var(--leading-tight)

## Spacing Scale
Follow the 8px grid and reference the tokens in design/tokens/colors.css.

- Card padding: var(--card-padding) (default 32px)
- Gap between avatar and content: var(--space-2) (16px)
- Vertical rhythm between content blocks: var(--space-2) / var(--space-3)
- Outer card margin (when used in lists): var(--space-2)

## Layout & Responsive Mockups
Describe layout variations across breakpoints. Use mobile-first approach.

Mobile (small)
- Card width: 100% (full-bleed within container with horizontal padding applied by page layout)
- Layout: horizontal stack -> Avatar (left) 56px, content (right) flexible. Use a single-column stack if the avatar is above content for very narrow widths.
- Avatar size: 56px (align to 8px grid)
- Title: var(--type-md)
- Actions: condensed to icons only (if present)

Tablet (medium)
- Card width: constrained to container (max-width: 720px typical)
- Layout: Avatar (left) 72px; content area with title, subtitle, and two-line body.
- Avatar size: 72px
- Title: var(--type-lg)
- Actions: show icons with short label

Desktop (large)
- Card width: up to 420px (for CharacterCard as a module), or use column layout in grid with var(--space-4) gutters.
- Layout: Avatar 96px (or larger variant), more spacing between elements.
- Title: var(--type-xl)
- Actions: show full labels and secondary actions

## Component Anatomy
- Container: uses --bg-card as background, --card-radius, and --card-elevation.
- Avatar: circular or rounded image using --card-radius / 2 for subtle rounding.
- Header: title + role/meta
- Body: description / stats
- Footer / Actions: primary action (CTA) and secondary actions

## Interaction States
Use CSS custom properties from tokens. States defined for focus management, keyboard, and pointer interactions.

State: Idle (Default)
- Background: var(--bg-card)
- Box-shadow: var(--card-elevation)
- Cursor: default

State: Hover (pointer)
- Background: slightly lighter overlay using --glass layered over --bg-card (example: background-color: linear-gradient(var(--glass), var(--glass)), or use box-shadow: var(--card-elevation-hover)).
- Box-shadow: var(--card-elevation-hover)
- Transform: translateY(-4px) subtle lift (align to 8px grid: 4px is half-grid — allowed for micro motion)

State: Active (pointer down)
- Transform: translateY(0) (return to resting):
- Box-shadow: var(--card-elevation)
- Opacity: 0.98

State: Focus (keyboard)
- Outline: var(--focus-ring) — semi-opaque accent ring. If using outline-offset, use 4px.
- For internal interactive elements (buttons, links) follow same focus rules.

State: Disabled
- Background: darkened by rgba(2,6,23,0.46) overlay or reduce contrast using var(--muted) for text.
- Cursor: not-allowed
- Pointer-events: none on disabled interactive elements

State: Loading
- Show skeleton blocks using gradients that respect --bg-card and --glass. E.g. background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04), rgba(255,255,255,0.02)); animation: shimmer 1.4s infinite;

## Accessibility
- Color contrast: ensure text on var(--bg-card) uses high contrast. For primary text use near-white (#E6EEF7 or similar). When adding color tokens, check AA/AAA ratios.
- Focus-visible: always provide a visible focus ring (use --focus-ring). Use :focus-visible to avoid noisy outlines on pointer interactions.
- Hit area: interactive targets must be at least 40x40px (8px grid: 5 * 8 = 40px) — use padding tokens if needed.

## Example CSS snippets (references only)
- Card container (mobile-first)

  .character-card {
    background: var(--bg-card);
    border-radius: var(--card-radius);
    box-shadow: var(--card-elevation);
    padding: var(--card-padding);
    transition: box-shadow 180ms ease, transform 120ms ease;
  }

  .character-card:focus-visible {
    outline: var(--focus-ring);
    outline-offset: 4px;
  }

## Contributor Formatting Rules (detailed)
- When contributing to this file, add a contributor comment block above your changes. Example:

  <!-- Contributor: Jane Doe | Date: 2026-03-02 | Reason: add tablet layout notes -->

- Preserve alphabetical ordering in lists and tokens where noted.
- Keep line length to ~100 characters for readability.
- For new breakpoints or tokens, first add them to design/tokens/colors.css, then reference here. Do not duplicate definitions.
- For visual changes, include the expected tokens (e.g., --type-lg, --space-2) rather than hard-coded values.

## Canonical Conflict Test
- This repository uses alphabetical ordering for tokens to minimize merge conflicts. Before submitting a PR that changes tokens, run a local check:
  1. git fetch origin && git merge --no-commit origin/main
  2. If conflicts appear in design/tokens/colors.css or design/card-specs.md, open the file and ensure your changes are inserted in the correct alphabetical location within the appropriate section. Do NOT resolve by moving entire blocks.

## Change Log
- 2026-03-02: Initial creation by Designer Agent for task 5298d637-352d-4a2b-9c6d-a8a25f5c8936.

