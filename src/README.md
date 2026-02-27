Character Profile Card Demo

This folder contains a self-contained demo component that displays a pixel-art warrior, character details, stats, a short bio, and non-functional action buttons.

Files
- index.html — demo page (uses styles.css, references /assets/warrior.png)
- styles.css — modular CSS with responsive layout and accessible focus styles

Usage
1. Ensure the repository has an assets folder at the project root: /assets/warrior.png (pixel-art warrior image produced by the Artist task).
2. Open src/index.html in a modern browser (Chrome/Firefox). You can serve the directory via a static server or open the file directly.

Verification checklist
- [ ] src/index.html and src/styles.css exist and reference /assets/warrior.png
- [ ] Layout adapts correctly between 320px and 1200px (stacked on small screens, two-column on desktop)
- [ ] Tab navigation reaches both action buttons and focus is visibly indicated
- [ ] The warrior image includes descriptive alt text
- [ ] README contains usage instructions and verification checklist

Preview
- Open src/index.html in your browser to view the component. Resize the window to verify responsiveness.

Notes
- No external JS/CSS frameworks used. Minimal JS is included (none required) to keep the demo accessible and simple.
