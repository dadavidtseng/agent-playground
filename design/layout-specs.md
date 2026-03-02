Design: Layout Specifications and Breakpoints

Overview

This document defines responsive layout tokens, spacing, radius, and breakpoint guidelines for mobile, tablet, and desktop. It includes CSS variable names, example layouts for 320px (mobile), 768px (tablet), and 1280px+ (desktop), and recommended animation easing/timing.

Token naming conventions

- Spacing: --space-*
- Radii: --radius-*
- Breakpoints: --breakpoint-*
- Container widths: --container-*
- Grid: --grid-columns-*
- Z-index: --z-*
- Animation: --easing-*, --duration-*

Global tokens

:root {
  /* Breakpoints */
  --breakpoint-mobile: 320px; /* baseline small */
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1280px;

  /* Container widths */
  --container-width-mobile: calc(100% - 2rem); /* fluid with 1rem padding */
  --container-width-tablet: 720px;
  --container-width-desktop: 1200px;

  /* Spacing scale (modular) */
  --space-0: 0;
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem;  /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem;    /* 16px */
  --space-5: 1.5rem;  /* 24px */
  --space-6: 2rem;    /* 32px */
  --space-8: 3rem;    /* 48px */

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Grid */
  --grid-columns-mobile: 4;
  --grid-columns-tablet: 8;
  --grid-columns-desktop: 12;

  /* Z-index */
  --z-surface: 10;
  --z-modal: 1000;

  /* Animation */
  --easing-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
  --easing-entrance: cubic-bezier(0, 0, 0.2, 1);
  --easing-exit: cubic-bezier(0.4, 0, 1, 1);
  --duration-fast: 150ms;
  --duration-medium: 300ms;
  --duration-slow: 500ms;
}

Layout patterns and examples

Mobile (320px)

- Viewport: 320px
- Container padding: var(--space-4) (1rem)
- Columns: 4 (use for small card grids)

CSS example:

.container {
  width: 100%;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
  margin-left: auto;
  margin-right: auto;
}

.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}

Card example:
.card {
  border-radius: var(--radius-md);
  padding: var(--space-4);
  background: var(--color-surface);
}

Tablet (768px)

- Viewport: >= 768px
- Container width: var(--container-width-tablet) (720px)
- Columns: 8
- Side gutters increase slightly

@media (min-width: 768px) {
  .container {
    max-width: var(--container-width-tablet);
    padding-left: var(--space-5);
    padding-right: var(--space-5);
  }

  .grid-8 {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: var(--space-4);
  }
}

Desktop (1280px+)

- Viewport: >= 1280px
- Container width: var(--container-width-desktop) (1200px)
- Columns: 12
- More whitespace, larger gutters

@media (min-width: 1280px) {
  .container {
    max-width: var(--container-width-desktop);
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }

  .grid-12 {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--space-5);
  }
}

Topbar & Navigation

- Mobile: collapsed nav (hamburger), height: 56px (3.5rem)
- Tablet: topbar height: 64px, show secondary navigation
- Desktop: topbar height: 72px, persistent nav columns if needed

.header {
  height: 3.5rem; /* mobile */
  display: flex;
  align-items: center;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) { .header { height: 4rem; } }
@media (min-width: 1280px) { .header { height: 4.5rem; } }

Columns & content

- Use CSS Grid for complex layouts, Flexbox for simple row/column arrangements.
- Example 2-column layout that collapses on mobile:

.layout-2col {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}

@media (min-width: 768px) {
  .layout-2col { grid-template-columns: 320px 1fr; }
}

Accessibility & touch targets

- Minimum tappable target: 44px (2.75rem) recommended; use at least var(--space-6) for padding on controls if small.
- Ensure focus states are visible (outline or box-shadow) and use high-contrast colors from the palette.

Animation guidelines

- Use --easing-standard for UI animations that are neither entrance nor exit (e.g., hover transitions).
- Use --easing-entrance and --duration-medium for bringing elements into view.
- Use --easing-exit and --duration-fast for dismissals.

Examples:
.button {
  transition: transform var(--duration-fast) var(--easing-standard), box-shadow var(--duration-fast) var(--easing-standard);
}

.toast-enter {
  animation: toastIn var(--duration-medium) var(--easing-entrance) both;
}

@keyframes toastIn {
  from { transform: translateY(8px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

Developer notes

- Keep CSS tokens in a single global file (e.g., tokens.css) and import into component styles.
- For fluid containers, prefer max-width + horizontal padding rather than percent widths in many apps.
- Test layouts at required breakpoints: 320px, 768px, 1280px+. Provide screenshots or visual regression tests when possible.
