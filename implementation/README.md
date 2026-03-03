KĀDI — Implementation README

Purpose

This document (implementation/README.md) is authored by the Designer Agent and provides run guidance for front-end designer assets, component usage examples (JSON-driven), a verification checklist that maps to the project acceptance criteria, cross-browser SVG rendering steps (Chrome / Firefox / Safari), accessibility (a11y) testing steps, and asset provenance/licensing details taken from art/manifest.json.

Note about run instructions

The project may include a root README.md created by the Programmer with authoritative run/build instructions. To avoid duplicating or contradicting those instructions, consult the repository root README.md first. If a root README is not present or does not contain front-end run steps, the following default developer steps are provided.

Default run (developer) steps

- Prerequisites: Node.js 16+ and npm or yarn installed, modern browser (Chrome/Firefox/Safari).
- Install dependencies: run either
  - npm install
  or
  - yarn install
- Start local development server (if a frontend exists):
  - npm run dev
  or
  - yarn dev
- Build for production (if applicable):
  - npm run build
  or
  - yarn build
- Run tests (if any are present):
  - npm test
  or
  - yarn test

If your project uses a specific framework or custom scripts, replace the above with commands from the repo root README.md. Programmer: please confirm these commands and update this document where needed.

Component usage examples (JSON-driven)

Design components in this project expect configuration via JSON. Below are examples showing how to populate components with JSON payloads.

1) Header / Brand component

Example JSON (header-config.json):

{
  "brand": {
    "title": "KĀDI Project",
    "logo": "./art/logo.svg",
    "alt": "KĀDI logo"
  },
  "nav": [
    { "label": "Home", "href": "/" },
    { "label": "Docs", "href": "/docs" },
    { "label": "About", "href": "/about" }
  ]
}

Usage: the Header component should accept a JSON object with a brand block (title, logo path, alt) and a nav array. Load this JSON at runtime or compile-time, then pass values into the component.

2) Hero illustration component

Example JSON (hero-config.json):

{
  "title": "Design with KĀDI",
  "subtitle": "Aesthetic systems for thoughtful interfaces",
  "illustration": {
    "src": "https://example.com/illustration-hero.svg",
    "alt": "Hero illustration",
    "credit": "Jane Doe"
  }
}

Usage: the Hero component should accept title, subtitle, and an illustration object. Where possible, inline SVGs for accessibility and crisp rendering; otherwise use <img> with correct alt text.

Verification checklist — maps to acceptance criteria

The following checklist is provided for design QA and acceptance testing. Each item maps to the acceptance tests described in the planning phase. Designer and Programmer should verify together.

1) File presence and content
- [ ] implementation/README.md exists and contains: run instructions, verification checklist, and asset provenance. (Acceptance test A1)

2) Run instructions
- [ ] The repository can be started using the documented run steps or root README (Acceptance test A2)

3) Component usage
- [ ] Components accept JSON configuration examples and render correctly when populated (Acceptance test A3)

4) Visual correctness
- [ ] Logo and illustration render with correct sizing, positioning, and colors across major browsers (Chrome, Firefox, Safari) (Acceptance test A4)

5) Cross-browser SVG rendering
- [ ] Inline or external SVGs render consistently in Chrome, Firefox, and Safari (Acceptance test A5)

6) Accessibility
- [ ] All interactive components are reachable and operable via keyboard (tab order, focus states) (Acceptance test A6)
- [ ] Semantic HTML or appropriate ARIA attributes are present where needed (Acceptance test A7)
- [ ] Automated a11y checks (axe/lighthouse) pass with zero or documented, acceptable violations (Acceptance test A8)

7) Asset provenance and licensing
- [ ] art/manifest.json is referenced and each asset has author, license, source, and checksum info included in project documentation (Acceptance test A9)

8) Documentation review
- [ ] Designer and Programmer have reviewed and agreed on final run steps to avoid duplication (Acceptance test A10)

How to run the verification checklist

- For each checked item, mark it in your issue tracker or PR checklist and attach evidence (screenshots, logs, axe reports, browser screenshots, and test outputs).
- Where automatic tests exist (unit/visual regression), link the test run or artifact.

Cross-browser SVG rendering checklist (Chrome / Firefox / Safari)

1) General preparation
- Use up-to-date browsers (latest stable releases of Chrome, Firefox, Safari).
- Use a clean profile or private window to avoid cache-related differences.
- Ensure the viewport/device pixel ratio is set consistently when comparing.

2) Rendering tests
- Open the page containing the SVGs in each browser.
- Verify the SVG appears at the expected size, with correct colors and no visual artifacts.
- Inspect the DOM to confirm whether SVG is inline (<svg> in DOM) or external (<img>, background-image). Prefer inlining for better control and accessibility.

3) Interactivity and scripts
- If the SVG relies on <script> or CSS animations, confirm they run in all browsers.
- For inline SVG using CSS variables or external stylesheets, verify computed styles in each browser.

4) Fonts and text in SVG
- If SVG includes text nodes, ensure fonts are available or embedded. Verify fallback fonts do not alter layout across browsers.

5) Edge cases
- Check SVG viewBox and preserveAspectRatio to ensure scaling is consistent.
- Test high DPI (retina) displays to ensure sharpness.

6) Known Safari quirks
- Safari may not load external fonts referenced inside an external SVG loaded via <img>. Inline the SVG or use <object> if fonts are required.
- SVGs with external <use> references may need CORS headers when loaded from another origin.

Accessibility testing steps (keyboard & a11y tools)

1) Keyboard testing
- Navigate the UI using Tab, Shift+Tab, Enter, Space, Arrow keys (where applicable).
- Confirm focus order is logical and focusable controls have visible focus styles.
- Verify all interactive elements are reachable and usable by keyboard alone.

2) Screen reader basics
- Use VoiceOver (macOS), NVDA (Windows), or JAWS to perform a smoke test: ensure main landmarks, headings, and buttons are read correctly.

3) Automated tooling
- Run axe-core (Chrome extension or axe CLI) and fix violations where feasible.
- Run Lighthouse accessibility audit (Chrome DevTools) and target score of 90+ where practical.

4) Color contrast
- Verify text and UI elements meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text). Use contrast checkers (Sim Daltonism, axe, or Contrast Checker sites).

5) Focus and skip links
- Provide skip-to-content links and verify they work with keyboard navigation.

Asset provenance and licensing (from art/manifest.json)

Below is the canonical asset provenance information extracted from art/manifest.json (current snapshot in repo):

- filename: logo.svg
  - description: Primary project logo used in headers and marketing
  - author: KĀDI Design Team
  - source: ./art/logo.svg
  - license: CC BY 4.0
    - url: https://creativecommons.org/licenses/by/4.0/
    - notes: Attribution required: KĀDI Design Team
  - checksum: sha256:PLACEHOLDER_CHECKSUM_1

- filename: illustration-hero.svg
  - description: Hero illustration for landing page
  - author: Contractor: Jane Doe
  - source: https://example.com/illustration-hero.svg
  - license: CC0 1.0 Universal
    - url: https://creativecommons.org/publicdomain/zero/1.0/
    - notes: Public domain dedication by author
  - checksum: sha256:PLACEHOLDER_CHECKSUM_2

Recommendations for asset handling

- Keep art/manifest.json up to date whenever an asset is added, replaced, or modified. Update checksum after publishing the final optimized asset.
- For third-party or externally sourced assets, keep a copy in the repository (or an immutable storage) and reference the source URL, author, and license in the manifest.
- When using CC BY assets, include attribution in the appropriate credits area (e.g., an About or Credits page) stating the author and license.

Designer/Programmer coordination

- Programmer: please confirm the exact run/build/test commands and update the run steps in the repository root README.md or coordinate here so this document does not duplicate conflicting instructions.
- Designer: use this file as the design-oriented guidance for verification, accessibility, and licensing.

Change log

- 2026-03-03: Created implementation/README.md and added art/manifest.json snapshot for asset provenance.

Contact

- KĀDI Designer Agent (design metadata author)
- Programmer: please update this file where necessary to match project scripts or CI steps.
