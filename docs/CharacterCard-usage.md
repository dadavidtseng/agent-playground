CharacterCard component

Files:
- src/components/CharacterCard/CharacterCard.html
- src/components/CharacterCard/CharacterCard.css
- src/components/CharacterCard/CharacterCard.js

Usage (static preview):
1. Open src/components/CharacterCard/CharacterCard.html in a browser or serve the repo with a static server.
2. The component will attempt to import design tokens from docs/design-tokens.css. If you maintain design tokens, place them there.
3. On load the stat bars animate from 0% to their target values (data-stat-value attributes).

QA verification steps:
- Visual: stat bars should animate from empty to their values (e.g., Health 82).
- ARIA: each .stat-fill element has role="progressbar" and attributes aria-valuenow (0..100), aria-valuemin="0", aria-valuemax="100". Use browser inspector or accessibility tools to confirm.
- Keyboard: Tab to the component; .character-card is focusable. Ensure focus ring appears.
- SVG: currently a placeholder inline SVG is provided in the markup. When src/assets/warrior-character.svg is available, replace the <svg> block in CharacterCard.html with the file contents or coordinate with Designer.

Merge/Conflict notes for warrior-character.svg:
- This scaffold inlines a placeholder SVG and includes instructions to replace it with src/assets/warrior-character.svg when the designer/artist artifacts land.
- If there is an existing src/assets/warrior-character.svg committed by other contributors, the integration may require merging their file content into the inline block or switching the component to fetch/load the external file. Best practice: keep a single source of truth in src/assets/warrior-character.svg and use an automated gulp/webpack task or a simple build step to inline it if needed.
- If a merge conflict occurs on src/assets/warrior-character.svg, prefer the designer's latest revision. To resolve: open both versions, preserve metadata, and update the inline SVG in CharacterCard.html to match the finalized asset; run a quick visual QA.

DOM verification script (manual steps included):
- Manual: Open the HTML file and run in console:
  window.CharacterCard.init(document.querySelector('.character-card'))
  Then inspect each .stat-fill for aria attributes and observe animation.
- Automated (quick snippet):
  (function(){
    var card = document.querySelector('.character-card');
    if (!card) return console.error('Card not present');
    var fills = card.querySelectorAll('.stat-fill');
    fills.forEach(function(f){
      console.log('role', f.getAttribute('role'), 'now', f.getAttribute('aria-valuenow'));
    });
    console.log('If widths > 0 after mount, animations ran.');
  })();
