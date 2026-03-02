Warrior SVG layers and usage

Files:
- warrior.svg : Pixel-art warrior with logical layers and scalable viewBox (32x32 grid). 

Layer IDs/classes:
- #body / .body : base clothing and limbs (fillable)
- #armor / .armor : helmet and chestplate (fillable)
- #weapon / .weapon : sword and hilt (fillable)
- .skin : skin pixels

Usage notes:
- The SVG uses viewBox="0 0 32 32" and scales cleanly. To get 32x32, 64x64, or 128x128 variants, set the width/height when embedding or call with CSS, e.g.:
  <img src="warrior.svg" width="32" height="32" alt="Warrior"> or
  <img src="warrior.svg" width="64" height="64" alt="Warrior"> or
  <img src="warrior.svg" width="128" height="128" alt="Warrior">

- Suggested CSS hooks:
  svg .body { fill: #6b3e1d; }
  svg .armor { fill: #4a5568; }
  svg .weapon { fill: #bdbdbd; }
  svg .skin { fill: #f1c27d; }

- Accessibility: the SVG includes <title> and <desc> elements.

Notes:
- File contains only vector <rect> elements (no raster). Palette limited to a few colors for clarity and small file size.