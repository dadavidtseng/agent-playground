Cross-browser Visual Checks

Browsers: Chrome (latest), Firefox (latest), Safari (macOS latest)

Scope
- Demo pages in dist/demo
- Key UI components and SVG rendering

Procedure
1. Open each demo page in the three browsers.
2. Capture full-page screenshots.
3. Note layout shifts, font rendering, SVG rendering differences, and color mismatches.

Documenting results
- For each page, include browser, OS, screenshot path, and notes.

Example entry
- demo/index.html
  - Chrome (Windows 10) — screenshots/visuals/demo-chrome.png — Notes: OK
  - Firefox (Windows 10) — screenshots/visuals/demo-firefox.png — Notes: Minor font rendering difference; check font-weight fallback
  - Safari (macOS) — screenshots/visuals/demo-safari.png — Notes: SVG stroke alignment appears slightly heavier; verify vector hints

Automated tools
- Use Playwright or Puppeteer to capture screenshots (not included in this commit but recommended for CI).

Known issues
- Safari may render strokes/fill rules differently for certain SVGs. When necessary, provide simplified paths and explicit stroke-linejoin/linecap attributes.
