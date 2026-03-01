Warrior SVG asset

Files included:
- warrior-source.svg  (editable, layered, with comments and design tokens)
- warrior-optimized.svg  (minified for production, inline-ready)

Design tokens / palette mapping (from source comments):
  --color-skin:      #F2C38F
  --color-dark-skin: #C79263
  --color-hair:      #332B26
  --color-armor:     #8DA4B6
  --color-armor-dark:#6B8593
  --color-cloth:     #6A2E2E
  --color-metal:     #D8D8D8
  --color-gold:      #C89B3A
  --color-shield-wood:#8B5A2B
  --color-black:     #000000
  --color-white:     #FFFFFF

Animatable element IDs / classes:
- #eye-left, #eye-right  -> eyes (blink, look)
- #shield                -> entire shield group (rotate, bob)
- #sword                 -> sword group (swing, raise)
- #arm-left, #arm-right  -> arms (rotate for attack/defend)
- .anim-shield, .anim-sword, .anim-arm-left, .anim-arm-right -> helper classes included in source for CSS targeting

Usage notes:
- The SVG uses viewBox="0 0 64 64" with a 16x16 grid (cell = 4 units). Scale by setting width/height or with CSS. Because shapes align to a pixel grid and shape-rendering:crispEdges, scaling by integer multiples preserves the pixel look.
- Accessibility: Both SVGs include <title> and <desc> elements. When inlined, ensure aria-labelledby references are preserved or add role="img" and alt text in surrounding markup if needed.
- Editing: Use warrior-source.svg to modify layers, colors, or to add more detailed animation groups. Do not flatten groups you intend to animate.

File sizes (approx):
- warrior-source.svg: ~3.9 KB
- warrior-optimized.svg: ~1.9 KB

Suggested simple animation hooks (CSS examples):
- Blink eyes: #eye-left, #eye-right { transform-origin: center; animation: blink 3s infinite; }
- Sword swing: #sword { transform-origin: 2px 14px; animation: swing 0.6s ease-in-out; }
- Shield bob: #shield { animation: bob 2s infinite; }

License: Free to use and adapt. Keep attribution if redistributed.
