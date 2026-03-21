Pixel-art Warrior — Style Guide

Palette (hex):
- Armor: #4b6b8a (steel blue)
- Armor highlight: #7fa0bf (light steel)
- Trim (gold): #d1b26f
- Cloak: #7a1730 (deep maroon)
- Skin: #f1c27d
- Sword blade: #cfd8dc (light grey)
- Hilt/shield wood: #5b3a29
- Boots / dark accents: #2b1b0f
- Shield: #8a4b3e
- Black / outlines / eyes: #000000

Layering / IDs / Classes:
- layer_cloak (class="cloak") — Back cloak layer. Place behind armor and lower body. Recolorable via .cloak or #layer_cloak.
- layer_armor (class="armor") — Main armor group. Contains helmet, chest, shoulders. Recolor via .armor or #layer_armor.
- layer_highlight (class="highlight") — Subtle highlights to add sheen; sits above armor.
- head (id="head") — Contains layer_skin (class="skin"), layer_eyes (class="eyes"), and layer_trim (class="trim"). Useful for facial animations or swapping expressions.
- layer_skin (class="skin") — Skin tones; can be replaced or recolored.
- layer_eyes (class="eyes") — Eyes/face details; can be animated (blink) by toggling visibility or translating.
- sword (id="sword", class="weapon") — Entire weapon group; blade and hilt separated visually. Animate rotation/translation using #sword.
- shield (id="shield", class="shield") — Secondary equipment; can be shown/hidden.
- layer_lower (class="lower") — Legs and boots; separate group for walk-cycle animation.

Notes on animation and styling:
- Use CSS to target IDs and classes (e.g., #sword { transform-origin: 200px 80px; } for rotation). SVG transform-origin uses user space — adjust to the group's pivot.
- For recoloring, set fill on the group (e.g., .armor { fill: #8899aa; } ) or target individual rects by ID.
- Each pixel is a rect on a grid (16px cells for portrait, 8px for icon) — keep transforms in multiples of the cell size to preserve crisp edges.
- Both SVGs use viewBox sizes matching the target (0 0 256 256 and 0 0 64 64) and transparent backgrounds.

Export / usage tips:
- Open SVGs in browsers or vector editors; they scale without quality loss.
- For sprite sheets or UI icons, the 64x64 icon is simplified and keeps the same IDs/classes for consistent theming.
