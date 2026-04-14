Cat Pixel v1 - Assets

Files included:
- cat_pixel_v1_64.svg (viewBox 0 0 64 64)
- cat_pixel_v1_128.svg (viewBox 0 0 128 128)
- cat_pixel_inline.svg (viewBox 0 0 64 64) - optimized for inline embedding

Palette (6 colors, <=16 requirement satisfied):
1. #6B3E1B - Dark fur / outline
2. #F5D6B4 - Light fur (primary fill)
3. #F7A6B0 - Pink (inner ear / cheeks)
4. #FFFFFF - Eye white
5. #000000 - Pupil / eye detail
6. #FF6B6B - Nose

Layers and structure:
- Ears: dark fur rects with inner pink rects.
- Head outline: dark fur rectangle forming the head border.
- Head inner: lighter fur rectangle inset from outline.
- Eyes: white rectangles with black pupils.
- Nose: small pink rectangle.
- Mouth: small dark rectangle for mouth line.
- Cheeks: small pink rectangles for blush.

Export settings and design notes:
- All assets are vector SVGs composed solely of <rect> elements aligned to integer coordinates to ensure pixel-crisp rendering.
- No filters, blurs, or embedded raster images are used.
- Transparent background maintained (no background rect).
- The 64x64 asset uses a 16x16 conceptual pixel grid where each pixel corresponds to 4 units in the viewBox. Shapes are integer-aligned and sized in multiples of 1.
- The 128x128 asset keeps consistent pixel proportions by scaling the 16x16 conceptual grid so each pixel equals 8 units in the viewBox.
- The inline SVG is optimized for embedding: minimal metadata, cleaned IDs, no external references, and accessibility tags (<title> and <desc>) included. The inline file avoids long IDs and excessive comments.

Optimization steps taken:
1. Limited the color palette to 6 solid colors (well under the 16-color limit).
2. Used only <rect> elements with integer x,y,width,height to ensure sharp pixel rendering and simple DOM structure.
3. Removed external references, stylesheets, and complex metadata from the inline version for safe embedding.
4. Ensured viewBox matches required sizes and included width/height attributes for clarity.

Usage:
- Embed inline by copying contents of cat_pixel_inline.svg into HTML where you need the icon.
- Use the 128x128 version for larger displays; it preserves the same pixel-art proportions.

If you need additional sizes (32x32, 256x256), I can generate them by scaling the conceptual 16x16 grid accordingly while keeping integer alignment and the same palette.