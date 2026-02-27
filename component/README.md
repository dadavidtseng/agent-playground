Warrior Card Component

Usage

This folder contains a self-contained demo of a reusable Warrior Card component that displays pixel art, stats, and a short bio.

Files

- index.html - Demo page showing the component.
- card.css - Styles for the component. Uses image-rendering: pixelated for crisp scaling of pixel art.
- card.js - Minimal JS module that fetches character.json and renders the card into #card-root. Also exports renderCharacter and fetchCharacter for integration.
- character.json - Example JSON schema and placeholder data.
- warrior.png - Placeholder pixel art (not included by default). Replace or add your own.

JSON schema (example)

{
  "name": "Thorn",
  "class": "Warrior",
  "level": 6,
  "hp": 48,
  "attack": 12,
  "defense": 10,
  "bio": "Short biography...",
  "image": "./warrior.png"
}

How to use

1. Open component/index.html in a browser. The demo will try to load character.json from the same folder; if it fails, it falls back to embedded defaults.
2. To swap the art: place your pixel-art PNG in this folder and update the "image" path in character.json (or the default inside card.js).
3. To use the component in your app: copy card.css and card.js. Call fetchCharacter(path) to load JSON and renderCharacter(data, container) to render into any element.

Accessibility & Responsiveness

- Semantic HTML and ARIA attributes are used (role=group, aria-labelledby, aria-label on action buttons).
- Focus styles for keyboard users are included.
- Component is responsive and scales down on small screens.
- image-rendering: pixelated and related properties are set to ensure crisp scaling of pixel art.

No console errors should be produced by the demo. If you see CORS errors when loading character.json locally, serve the folder with a simple static server (e.g., python -m http.server).
