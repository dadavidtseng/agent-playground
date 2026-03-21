# Artist portrait assets

This folder contains pixel-art SVG portrait assets and a card-ready SVG optimized for inline embedding.

Files:
- portrait-32.svg — 32x32 viewBox pixel-art portrait (scalable). Uses <rect> pixels with crisp rendering hints.
- portrait-64.svg — 64x64 viewBox variant.
- portrait-128.svg — 128x128 viewBox variant.
- portrait-card-ready.svg — Full card-ready SVG with transparent background and group structure; optimized for embedding.

Layer / Group IDs and data-role attributes
- #portrait (data-role="portrait") — top group wrapping the whole character.
- #hair (data-role="hair") — hair layer; recommend CSS class .hair or target by #hair.
- #body (data-role="body") — face and upper torso area.
- #armor (data-role="armor") — chest/armor layer; has classes .fill-armor and .fill-armor-dark in SVGs.
- #weapon (data-role="weapon") — weapon group (sword over shoulder).
- #eyes (data-role="eyes") — eyes group inside #body; use .fill-eye for eye pixels and .fill-highlight for eye highlights.

Recommended CSS classes for theming (used as class names on <rect> elements in the SVGs):
- .fill-skin — skin tone
- .fill-hair — hair color
- .fill-armor — primary armor color
- .fill-armor-dark — armor accent/shadow
- .fill-shirt — underlying clothing color
- .fill-eye — eye color (usually #000)
- .fill-highlight — small white highlight pixels

Pixel-art Crispness
- Each SVG uses viewBox without fixed width/height so they remain scalable.
- shape-rendering="crispEdges" and style attributes image-rendering:pixelated; image-rendering:crisp-edges; are present to keep pixels crisp when scaled.
- Use CSS to set image-rendering for the embedding element if needed for specific browsers.

Embedding notes
- For inline embedding prefer to paste the SVG content directly into HTML to allow CSS theming via the classes above.
- To recolor armor, target .fill-armor and .fill-armor-dark classes in your stylesheet. Example:
  .card svg .fill-armor { fill: #e0b0ff; }
  .card svg .fill-armor-dark { fill: #b084d6; }

Accessibility
- Each SVG includes role="img" and aria-label describing the asset.

Data attributes
- Each major group also includes data-role attributes (e.g., data-role="armor") to ease selection by JS or CSS.

Notes on optimization
- SVGs are constructed from <rect> elements only (no filters, no embedded metadata), keeping files lightweight and crisp for pixel-art rendering.
- Palette limited to 8 colors in the provided artwork. You can adjust by editing class fill values.
