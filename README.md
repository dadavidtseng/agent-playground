CharacterProfileCard component demo

This repository contains a lightweight demo of a CharacterProfileCard component implemented in plain HTML/CSS/JS.

Files added:
- web/index.html — demo page showing compact, default, and expanded variants
- web/styles.css — component and demo styles; uses design/tokens.css variables when available
- web/script.js — demo interactions: stat animations, expand/collapse, accessibility helpers

Integration & usage

1. Copy the component markup and styles
   - The demo component lives in web/index.html. You can extract the <article class="card"> block(s) and include the related CSS rules from web/styles.css into your project.

2. Design tokens
   - The demo attempts to load ../design/tokens.css if present. If your project exposes design tokens via CSS custom properties, align variable names (e.g. --accent, --primary, --surface) or include design/tokens.css provided in this repository.

3. JavaScript
   - Include web/script.js (or port the logic) to enable animated stat bars and expand/collapse keyboard behavior. The script is framework-free and uses data attributes:
     - Each .stat element should have data-value and data-max attributes.
     - Each expand/collapse button should use aria-controls to reference the details area and aria-expanded to reflect state.

4. Sample data JSON
   - The demo exposes sample data used for the example cards. Example:
{
  "name": "Thora Ironhand",
  "class": "Warrior",
  "level": 7,
  "stats": { "Strength": 78, "Agility": 62, "Intellect": 45 },
  "equipment": ["Iron Axe","Chainmail","Heater Shield"],
  "location": "Frostford",
  "backstory": "Once a blacksmith's daughter, Thora rose through battlefields to protect her clan."
}

5. Accessibility notes
   - Stat bars use role="progressbar" with aria-valuemin, aria-valuemax and aria-valuenow updated by script.
   - Expand/collapse buttons are keyboard operable (Enter/Space) and use aria-expanded.
   - Buttons have focus styles for keyboard navigation.

6. Responsive behavior
   - The demo demonstrates breakpoints at 640px and 1000px (adjust in CSS as needed). Use rem units and CSS variables to align with your design system.

7. No raster assets
   - The demo uses inline SVG art (art/warrior.svg concept) to avoid large raster files. Replace inline SVG with your own vector artwork as needed.

Development

To preview the demo, open web/index.html in a browser. No build step required.

License

Public domain sample for integration and learning purposes.
