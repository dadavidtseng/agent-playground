ARTNOTES for warrior assets

Overview:
- Designed a classic RPG pixel-art warrior character at 128x128, with 64x64 and 32x32 variants.
- Assets include a transparent-background primary PNG, an in-card-shadow variant for UI display, and an optional small spritesheet (up to 4 frames) for an idle animation.
- Palette limited to 16 colors to preserve a cohesive retro look and small file sizes.

Palette (16 colors):
1. #000000 - pure black (outlines)
2. #2B2B2B - dark gray (secondary outlines)
3. #FFFFFF - white (highlights)
4. #C8D0D8 - light gray (metal highlights)
5. #7B7B7B - mid gray (metal base)
6. #4A4A4A - dark metal shade
7. #603020 - brown (leather)
8. #A05030 - light brown (leather highlight)
9. #8C1A1A - deep red (cloth)
10. #D84A4A - red highlight
11. #244E1A - dark green (accessory)
12. #4F8A3D - green highlight
13. #F0C86A - skin tone
14. #EDB85A - skin highlight
15. #FFD166 - gold accent
16. #B5812F - gold shade

Layers (recommended in editor):
- Background: transparent (or plain background for alternate export)
- Ground/base shadow: subtle soft shadow layer for in-card-shadow variant
- Character base: main silhouette and flat colors
- Armor/shield/weapons: separate layer for quick edits
- Highlights: small pixel highlights and rim lighting
- Outlines: black/dark outlines layer (keep separate for outline tweaks)

Export settings and optimization:
- Export formats: PNG-8 or PNG-24 depending on palette needs. Aim for PNG-8 with palette reduced to 16 colors to minimize file size.
- Dithering: avoid heavy dithering to keep crisp pixel look. Use 0-10% ordered dithering only if necessary at smaller sizes.
- Transparency: use binary transparency (fully transparent or fully opaque) when possible to avoid semi-transparent edges which can cause jaggies in pixel art.
- Compression: run pngquant (e.g., pngquant --quality=60-90 --speed 1) and then zopflipng or optipng for further size reduction. This keeps file sizes small while preserving visual fidelity.
- Target file sizes: 128x128 <= ~40KB preferred, 64x64 and 32x32 much smaller (a few KBs). Spritesheet size depends on frames but aim to keep total <= ~50KB.

Scaling notes:
- For 64x64 and 32x32 variants, use nearest-neighbor scaling (no smoothing) from the 128x128 original to preserve pixels.
- After scaling, manual retouching is recommended: adjust silhouette and remove cramped details at smaller sizes, increase contrast on outlines/highlights as needed.

Sprite sheet:
- If included, provide up to 4 frames laid out horizontally in a single PNG (e.g., 128x32 for four 32x32 frames, or 128x128 with 4 128x128 frames depending on chosen frame size).
- Each frame should align to the same baseline for consistent animation.
- Keep small motion for idle: breathing (chest), slight weapon sway, or blink.

Preview screenshots:
- Provide two preview images showing the 128x128 (with shadow variant) placed inside a card layout at desktop and mobile sizes.
- Card layout suggestions: 320x180 for desktop mock, 360x640 for mobile mock. Place the sprite centered with padding and a subtle drop shadow for the in-card variant.

Files included (placeholders in this commit):
- /assets/warrior-128.png
- /assets/warrior-64.png
- /assets/warrior-32.png
- /assets/warrior-shadow-128.png
- /assets/warrior-spritesheet.png (optional)
- /assets/ARTNOTES.md
- /assets/preview-desktop.png (not included in this commit) - replace with actual preview
- /assets/preview-mobile.png (not included in this commit) - replace with actual preview

Notes on this commit:
- Due to environment constraints, placeholder PNG files were created. Replace them with the actual pixel-art PNGs following the palette and export guidelines above.
- When replacing, ensure to re-run the optimizer steps (pngquant, zopflipng/optipng) and keep the ARTNOTES.md updated with actual file sizes and final palette if changes are made.

Author: KĀDI artist agent
Task ID: 284bf276-f59c-4df7-9b96-c7dbecbfb222
Date: 2026-02-27