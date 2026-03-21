Verification Checklist for Demo Integration

Manual verification steps:

1) Responsive visual checks
- Open demo/index.html in a browser.
- At desktop widths (>= 480px), ensure card layout shows avatar and name side-by-side and two stat columns.
- At mobile widths (< 480px), ensure stats stack into a single column and padding reduces.

2) Inline SVG
- Verify avatar scales crisply when resizing. The SVG uses viewBox and explicit shapes to ensure small file size.

3) Interactivity
- Click the "Show bio" button; the bio should appear and the button aria-expanded toggles to true; clicking again hides it.

Automated smoke test (scripts/smoke-test.js):

- Requirements: Node.js, Playwright installed (npm i -D playwright) and a simple static server (e.g., npm i -D serve) or use 'npx http-server'
- Run a static server at the repo root: npx http-server -p 8000
- In another shell run: node scripts/smoke-test.js

Recorded results (automated run at time of creation):
- Card loads: PASS
- Stat fills animate to ~target widths: PASS
- Bio toggles and aria-expanded changes: PASS
- ARIA attributes exist on card: PASS

Notes and minor fixes applied:
- Ensured stat fills use percent widths so computed pixel widths match expected percentages across breakpoints.
- Kept SVG inline but minimal to balance crispness and file-size.

If any assertion fails, check console output from the smoke test for the failure message.
