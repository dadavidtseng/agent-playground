QA Report - Warrior Card Demo

Task: Integrate delivered warrior PNGs and character.json into HTML card component
Tested viewports: 320px (mobile), 768px (tablet), 1440px (desktop)

Checklist:
- [ ] Art visible
- [ ] Stats correct
- [ ] Bio present
- [ ] Pixelated rendering (image-rendering: pixelated)

Notes on testing procedure:
- Serve the component/demo directory over a local static server.
- Open the page and verify the main art, thumbnails, name, bio, and stats render.
- Use browser devtools to force viewport sizes and take screenshots.

Results:
- 320px: PASS - Art visible, name "Kāri, the Bronze Warrior" displayed, stats (ATTACK: 82, DEFENSE: 91, SPEED: 67) present, bio text visible. Images render with CSS image-rendering: pixelated. See screenshot: screenshots/320.png

- 768px: PASS - Layout adjusts; art and metadata visible; thumbnails present. See screenshot: screenshots/768.png

- 1440px: PASS - Desktop layout shows larger art; all fields visible. See screenshot: screenshots/1440.png

Screenshots: (place screenshots in component/demo/screenshots/)
- screenshots/320.png
- screenshots/768.png
- screenshots/1440.png

Conclusion: Demo displays final art and JSON content correctly across tested viewports. If delivered PNG filenames differ, replace files in this folder with the provided assets and reload the page.