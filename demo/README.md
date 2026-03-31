Character Card Demo

This demo provides a simple, dependency-free component scaffold for character/profile cards.

Files:
- index.html — demo page that mounts the cards
- styles.css — component and demo styles using CSS variable tokens and breakpoints
- script.js — JS initializer and API for populating cards

Usage

Open demo/index.html in a modern browser (Chrome/Firefox/Safari). The demo auto-initializes when the #character-root element has data-init="true" and uses inline JSON in a script#demo-sample-data.

API

CharacterCard.init(options)
- options.root: DOM element or selector string for the container (defaults to #character-root)
- options.data: array of character objects { name, class, level, bio, avatarTitle, stats }

Example:

<script>
  // programmatically initialize with custom data
  CharacterCard.init({ root: '#character-root', data: [ { name: 'X', class: 'Y', level: 2, bio: '', stats: { HP: 10, STR: 8 } } ] });
</script>

Accessibility & Preferences
- Stat animations respect prefers-reduced-motion (no transitions if set).
- Semantic markup uses article and headings where appropriate.

Notes
- Placeholder SVGs are inlined for avatars. Replace with real artwork as needed.
- Tokens in :root are placeholders; swap with real design tokens if available.
