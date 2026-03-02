CharacterCard Component - Verification Steps

Files:
- src/components/CharacterCard.html
- src/components/CharacterCard.css
- src/components/CharacterCard.js

Manual test steps:
1. Open src/components/CharacterCard.html in a browser (or serve project) to view the component.
2. Confirm the warrior portrait loads from assets/warrior.svg (check network panel if missing).
3. On load, observe stat bars animate from 0% to their displayed values (85/70/92). The numeric values to the right should match.
4. Use the browser console to call:
   const el = document.getElementById('character-card-1');
   el.updateStats({ health: 40, stamina: 20, strength: 60 });
   Confirm bars transition smoothly to new widths and aria-valuenow attributes update.
5. Run an accessibility scan (axe) on the page. There should be no critical violations tied to role="progressbar" usage and buttons have accessible names.
6. Resize the browser to mobile/tablet/desktop widths and confirm responsive layout: stacked on mobile, side-by-side on larger viewports.

Automated unit test suggestion (not included but manually testable):
- Verify updateStats updates .stat-fill width and .stat-bar aria-valuenow.

Screenshots required (place in repo manually):
- screenshots/character-card-mobile.png
- screenshots/character-card-tablet.png
- screenshots/character-card-desktop.png

Notes:
- The component exposes animateStats() and updateStats(newStats) via the DOM element and window.CharacterCard for easy testing.
- If assets path differs, update the <img src> path in CharacterCard.html.
