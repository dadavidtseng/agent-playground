# Character Profile Card Component

A fully accessible, responsive character profile card component built with vanilla HTML, CSS, and JavaScript. Features animated stat bars, pixel-art SVG characters, and WCAG 2.1 AA compliance.

## Features

- ✨ **Smooth Animations**: GPU-accelerated stat bar animations with staggered timing
- 🎨 **Pixel-Perfect Design**: Crisp SVG rendering with proper image-rendering settings
- ♿ **Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes and keyboard navigation
- 📱 **Responsive**: Mobile-first design with breakpoints at 320px, 768px, and 1024px
- 🎯 **IntersectionObserver**: Scroll-triggered animations for optimal performance
- 🎭 **Multiple Variants**: Easily customizable for different character types
- 🚀 **Zero Dependencies**: Pure vanilla JavaScript, no frameworks required

## File Structure

```
character-card-system/
├── src/
│   ├── character-card.html    # Main component HTML
│   ├── styles.css              # Complete CSS with design tokens
│   └── script.js               # JavaScript with IntersectionObserver
├── demo/
│   └── index.html              # Demo page with 3 card variants
└── README.md                   # This file
```

## Quick Start

### Basic Usage

1. Include the CSS and JavaScript files:

```html
<link rel="stylesheet" href="src/styles.css">
<script src="src/script.js"></script>
```

2. Add the character card HTML structure:

```html
<article class="character-card" role="article" tabindex="0" aria-labelledby="character-name">
  <!-- Portrait, Info, Stats, and Bio sections -->
</article>
```

3. The component will automatically initialize and animate when scrolled into view.

### Demo

Open `demo/index.html` in a browser to see three character variants:
- **Warrior Knight**: Balanced stats (HP: 80, ATK: 65, DEF: 75)
- **Arcane Mage**: High attack, low defense (HP: 50, ATK: 90, DEF: 40)
- **Iron Guardian**: Tank build (HP: 95, ATK: 45, DEF: 85)

## API

The component exposes a global `CharacterCard` object with the following methods:

### `CharacterCard.animate(cardOrSelector)`

Manually trigger animation for a specific card.

```javascript
// Using selector
CharacterCard.animate('#warrior-card');

// Using element reference
const card = document.querySelector('.character-card');
CharacterCard.animate(card);
```

### `CharacterCard.reset(cardOrSelector)`

Reset animation state for a specific card.

```javascript
CharacterCard.reset('#warrior-card');
```

## Customization

### CSS Custom Properties

All design tokens are defined as CSS custom properties in `:root`:

```css
:root {
  --color-primary: #6366f1;
  --color-hp: #ef4444;
  --color-atk: #f59e0b;
  --color-def: #3b82f6;
  --transition-stat-bar: 1.5s cubic-bezier(0.65, 0, 0.35, 1);
  /* ... and many more */
}
```

### Creating Variants

Add custom classes to modify the appearance:

```css
.character-card--mage .character-card__portrait {
  background: linear-gradient(135deg, #7c3aed, #a78bfa);
}

.character-card--mage .character-card__title {
  color: #a78bfa;
}
```

### Stat Values

Set stat values using data attributes:

```html
<div class="stat-bar" data-stat="hp" data-value="80">
  <!-- Stat bar content -->
</div>
```

## Accessibility Features

- ✅ Semantic HTML5 elements (`<article>`, `<section>`, `<h2>`, etc.)
- ✅ ARIA attributes (`role`, `aria-label`, `aria-labelledby`, `aria-valuenow`)
- ✅ Keyboard navigation support (Tab, Enter, Space)
- ✅ Focus indicators with high contrast
- ✅ Screen reader friendly with `aria-live` regions
- ✅ Reduced motion support via `prefers-reduced-motion`
- ✅ High contrast mode support
- ✅ 4.5:1 minimum contrast ratio for all text

## Browser Support

- Chrome/Edge 58+
- Firefox 55+
- Safari 12.1+
- Opera 45+

**Note**: IntersectionObserver is required for scroll-triggered animations. Fallback behavior displays stats immediately in unsupported browsers.

## Performance

- GPU-accelerated animations using `transform` and `opacity`
- Efficient IntersectionObserver implementation
- No layout thrashing or forced reflows
- Optimized for 60fps animation performance
- Minimal DOM manipulation

## Events

The component emits custom events:

### `charactercard:activated`

Fired when a card is clicked or activated via keyboard.

```javascript
document.addEventListener('charactercard:activated', function(e) {
  console.log('Card activated:', e.detail);
  // e.detail contains: { name, stats }
});
```

## Design Specifications

The component follows a comprehensive design specification with:
- Color palette (primary, neutral, stat colors)
- Typography scale (6 font sizes, 4 weights)
- Spacing system (6 levels)
- Shadow system (5 elevations)
- Transition timings (fast, base, slow)
- Responsive breakpoints (mobile, tablet, desktop)

See `design-spec.md` for complete details.

## License

MIT License - Feel free to use in your projects!

## Credits

Built with ❤️ using vanilla web technologies.
