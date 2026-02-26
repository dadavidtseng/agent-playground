Warrior asset export guidelines and filenames

Files included:
- warrior_concept.png : Concept reference sheet (PNG, lossless, transparent background). Shows palette, poses (idle/attack/pose), and close-up detail of head and weapon. Path: /assets/warrior/warrior_concept.png
- palette.txt : Hex color palette (<=16 colors) used for pixel art. Path: /assets/warrior/palette.txt
- pose_references.txt : Written pose references for idle, attack, and heroic pose with suggested canvas sizes. Path: /assets/warrior/pose_references.txt
- bio.txt : Short bio and alt text for JSON entry. Path: /assets/warrior/bio.txt

Export guidelines (pixel-art specific):
- Canvas and scaling:
  - Create at 1x pixel scale. Recommended base canvas: 64x64 px for full-body reference. For close-ups, use 32x32 or 16x16 as needed.
  - Export at integer scale factors only (1x, 2x, 3x, 4x). Do NOT use fractional scaling.

- Outlines and rendering:
  - Use crisp 1px outlines (#000000). No anti-aliasing.
  - No gradients or soft shading. Use flat colors from the provided palette.
  - Use 1-2 tones per material (base + shade) within the palette to keep clarity.

- File format & transparency:
  - Export as lossless PNG with alpha transparency.
  - Ensure background is transparent when exporting (check canvas background layer).
  - Use indexed palette if supported by your editor to lock colors to the 16-color palette.

- Pixel snapping and crispness:
  - Ensure all pixels align to the pixel grid. Use nearest-neighbor scaling for exports.
  - Disable any export smoothing or sub-pixel rendering. Use "Nearest Neighbor" or "Pixel Art" scaling.

- Naming & folder structure:
  - Place final PNG at: assets/warrior/warrior_concept.png
  - Include palette and pose reference text files in same folder.

- Additional notes:
  - Keep palette to 16 or fewer colors. Avoid introducing extra colors during editing/export.
  - Do not anti-alias outlines or color fills. Maintain 1px outline thickness.

Recommended pixel-art export settings (example for Aseprite/Photoshop/GIMP):
- File type: PNG
- Color Mode: RGBA (or Indexed with palette)
- Resize algorithm: Nearest Neighbor
- Bit depth: 8-bit/channel
- Background: Transparent
- Compression: Default (lossless PNG)

Alt text guidelines: Provide concise alt text describing the sheet, palette, and poses. Include character's main visual features.
