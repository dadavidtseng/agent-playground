# Character Card Design Specification

## Color Palette

### Primary Colors
- `--color-primary`: #6366f1 (Indigo)
- `--color-primary-dark`: #4f46e5
- `--color-primary-light`: #818cf8

### Neutral Colors
- `--color-background`: #1f2937 (Dark Gray)
- `--color-surface`: #374151
- `--color-text-primary`: #f9fafb
- `--color-text-secondary`: #d1d5db
- `--color-border`: #4b5563

### Stat Colors
- `--color-hp`: #ef4444 (Red)
- `--color-atk`: #f59e0b (Amber)
- `--color-def`: #3b82f6 (Blue)

### Interaction States
- `--color-focus`: #06b6d4 (Cyan)
- `--color-hover-overlay`: rgba(255, 255, 255, 0.05)
- `--color-disabled`: #6b7280

## Typography

### Font Families
- `--font-primary`: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- `--font-display`: 'Poppins', sans-serif

### Font Sizes
- `--font-size-xs`: 0.75rem (12px)
- `--font-size-sm`: 0.875rem (14px)
- `--font-size-base`: 1rem (16px)
- `--font-size-lg`: 1.125rem (18px)
- `--font-size-xl`: 1.25rem (20px)
- `--font-size-2xl`: 1.5rem (24px)
- `--font-size-3xl`: 1.875rem (30px)

### Font Weights
- `--font-weight-normal`: 400
- `--font-weight-medium`: 500
- `--font-weight-semibold`: 600
- `--font-weight-bold`: 700

## Spacing

- `--spacing-xs`: 0.25rem (4px)
- `--spacing-sm`: 0.5rem (8px)
- `--spacing-md`: 1rem (16px)
- `--spacing-lg`: 1.5rem (24px)
- `--spacing-xl`: 2rem (32px)
- `--spacing-2xl`: 3rem (48px)

## Layout

### Card Dimensions
- `--card-width-mobile`: 100%
- `--card-width-tablet`: 360px
- `--card-width-desktop`: 400px
- `--card-border-radius`: 1rem (16px)
- `--card-padding`: var(--spacing-lg)

### Portrait
- `--portrait-size-mobile`: 120px
- `--portrait-size-tablet`: 150px
- `--portrait-size-desktop`: 180px

## Shadows

- `--shadow-sm`: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
- `--shadow-md`: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
- `--shadow-lg`: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
- `--shadow-xl`: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
- `--shadow-focus`: 0 0 0 3px var(--color-focus)

## Transitions

- `--transition-fast`: 150ms cubic-bezier(0.4, 0, 0.2, 1)
- `--transition-base`: 300ms cubic-bezier(0.4, 0, 0.2, 1)
- `--transition-slow`: 500ms cubic-bezier(0.4, 0, 0.2, 1)
- `--transition-stat-bar`: 1.5s cubic-bezier(0.65, 0, 0.35, 1)

## Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## Stat Bar Specifications

- Height: 24px
- Background: rgba(255, 255, 255, 0.1)
- Border radius: 12px
- Animation delay stagger: 0.2s
- Animation duration: 1.5s
- Animation easing: cubic-bezier(0.65, 0, 0.35, 1)

## Interaction States

### Hover
- Transform: translateY(-4px)
- Shadow: var(--shadow-xl)
- Transition: var(--transition-base)

### Focus
- Outline: 3px solid var(--color-focus)
- Outline offset: 2px

### Active
- Transform: translateY(-2px)
- Shadow: var(--shadow-lg)

### Disabled
- Opacity: 0.6
- Cursor: not-allowed
- Pointer events: none
