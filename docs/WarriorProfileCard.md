WarriorProfileCard Component

Location
- src/components/WarriorProfileCard.html
- src/components/WarriorProfileCard.css

Overview
- Presentational profile card for a warrior character.
- Uses <picture> with an SVG primary source and PNG fallbacks located in /assets/icons.
- Accessible markup: image has alt text; SVG should include <title> and <desc> (ensure the SVG file in /assets/icons/warrior.svg contains them).
- Keyboard accessible interactive elements (buttons) and ARIA attributes present.

Usage
1. Ensure the following icon files exist in the repository (under /assets/icons/):
   - warrior.svg
   - warrior@1x.png
   - warrior@2x.png

2. Include the component in your HTML page (relative path example):

   <link rel="stylesheet" href="src/components/WarriorProfileCard.css">
   <!-- Paste the article fragment from src/components/WarriorProfileCard.html where you want the card to appear -->

Markup Snippet
- The component uses a <picture> with the SVG first, then PNG fallbacks. Example:

  <picture>
    <source type="image/svg+xml" srcset="/assets/icons/warrior.svg">
    <source type="image/png" srcset="/assets/icons/warrior@2x.png 2x, /assets/icons/warrior@1x.png 1x">
    <img src="/assets/icons/warrior@1x.png" alt="Portrait illustration of warrior wearing armor" class="wpc-avatar"/>
  </picture>

Accessibility Checklist
- SVG must contain a <title> and <desc> elements for assistive technologies. If not, edit /assets/icons/warrior.svg to include them.
- The <img> fallback has a descriptive alt attribute.
- Buttons are keyboard focusable and include ARIA attributes where helpful (aria-pressed, aria-label).
- The top-level element has role="article" and aria-labelledby/aria-describedby.

Styling & Responsiveness
- Styles are in src/components/WarriorProfileCard.css and use the .wpc- prefix.
- The card adapts from column layout on small screens to horizontal layout on larger screens.

Testing & Verification
1. Visual tests
   - Open an HTML page which includes the component in Chrome, Firefox, and Safari.
   - Resize viewport widths: mobile (375px), tablet (768px), desktop (1280px). Confirm layout changes as expected.
   - Confirm SVG is used when supported (inspect the network panel to see warrior.svg requested). If not supported, PNG fallback will load.

2. Accessibility checks
   - Use browser accessibility inspector or axe-core to run checks. Ensure image has alt text and interactive elements have accessible names.
   - Use a screen reader to verify title and description of the image. If the SVG lacks title/desc, screen readers may not narrate it properly.

3. Keyboard navigation
   - Tab through the card. Buttons should receive focus and be activatable with Enter/Space.

Screenshots
- Place screenshots in docs/screenshots/ named wpc_mobile.png, wpc_tablet.png, wpc_desktop.png to demonstrate responsive rendering.

Customization
- Change text content, colors, or icons as needed. For multiple cards, duplicate the article fragment and ensure unique IDs for aria-labelledby/aria-describedby.

Notes
- Do not rasterize or embed PNGs into the SVG. Keep separate files in /assets/icons.
- Follow project conventions for placement; styles are intentionally namespaced.
