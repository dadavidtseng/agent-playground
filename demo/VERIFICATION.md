Verification Checklist for demo

This file contains manual verification steps and pass/fail criteria for the demo, and describes the lightweight automated smoke tests and linter configuration included in the repo.

Manual verification checklist

1) Responsiveness
- Steps:
  - Open demo/index.html (or demo/index.htm / demo/demo.html) in a desktop browser window.
  - Resize the browser window to a narrow width (e.g. 320px) and a wide width (e.g. 1920px).
  - Inspect layout at several intermediate widths (mobile/tablet/desktop).
- Pass criteria:
  - Page content adapts without horizontal scrolling at common viewport widths.
  - Navigation and primary controls remain visible and usable at small widths.
- Fail criteria:
  - Horizontal scrollbar appears and important content is clipped or unreachable.
  - Controls overlap or become unusable at small widths.

2) Accessibility
- Steps:
  - Check for a meta viewport tag in <head> (responsive requirement).
  - Use browser devtools accessibility inspector (or Lighthouse) to get a quick accessibility overview.
  - Manually confirm the following for interactive controls:
    - Buttons/links/controls have accessible names (visible text, aria-label, or aria-labelledby).
    - Elements with roles (role="button", role="dialog", etc.) have appropriate aria attributes.
- Pass criteria:
  - Interactive controls expose accessible names.
  - No obvious missing ARIA labels for elements with roles.
- Fail criteria:
  - Role-bearing elements lack accessible names.
  - Essential controls are not reachable via keyboard.

3) Inline SVG presence
- Steps:
  - View page source or use Elements inspector.
  - Confirm that at least one <svg> element is included directly in the HTML (inline), not only as an external image.
- Pass criteria:
  - At least one inline <svg> element exists in the page DOM.
- Fail criteria:
  - No inline SVGs are present (only <img src="..."> or background images).

4) Animation behavior
- Steps:
  - Identify animated elements (spinners, transitions, motion UI).
  - Observe animations on load and during user interactions.
  - Ensure animation timing and visual behavior are smooth and not disruptive.
- Pass criteria:
  - Animations are present only where expected.
  - Animations do not block interaction or cause layout jank at typical device sizes.
  - There is a way to reduce motion (prefers-reduced-motion respected) if motion is non-trivial.
- Fail criteria:
  - Unexpected or gratuitous motion that hinders use.
  - Animations cause elements to jump or remain in broken states.

5) Keyboard interactions
- Steps:
  - Tab through the page using the keyboard (Tab / Shift+Tab).
  - Attempt to activate interactive elements using Enter and Space where appropriate.
- Pass criteria:
  - All interactive controls are reachable via Tab and activate with keyboard.
  - Focus states are visible and understandable.
- Fail criteria:
  - Interactive elements are not focusable.
  - Role=button elements lack tabindex or keyboard handlers.

Automated checks included (lightweight)

Files added:
- tools/smoke-test/run-smoke.js — Node script using jsdom to perform basic DOM and ARIA assertions.
- tools/smoke-test/package.json — minimal package file declaring jsdom dependency and run script.
- .htmlhintrc — basic HTMLHint configuration to catch common HTML problems.
- .stylelintrc — basic Stylelint configuration for core CSS rules.

How to run automated smoke tests

1) Install dependencies for the smoke-test tool (only required if you want to run the script locally):
   cd tools/smoke-test
   npm install

2) Run the smoke-test script:
   npm run test

The script will attempt to locate an HTML file in the demo directory (demo/index.html, demo/index.htm, demo/demo.html) and run a set of assertions. It exits with code 0 on success and non-zero on failure.

Key assertions performed by the smoke-test script
- Page includes a <main> element.
- Page includes a meta viewport tag for responsiveness.
- Page includes at least one inline <svg> element.
- Interactive elements (buttons, role="button") have accessible names (aria-label / aria-labelledby / visible text).
- If CSS files are referenced locally, the script checks for presence of @keyframes or animation properties (indicating animations) and reports accordingly. If no animation is present, the check is informational.

Linter configuration provided
- .htmlhintrc — basic rules enabled to detect missing alt attributes, duplicate attributes, and unclosed tags.
- .stylelintrc — basic rules for indentation, color format, and unknown properties.

Notes and limitations
- The automated smoke test uses jsdom to parse and inspect the DOM. It does not execute page JavaScript in a browser environment, so dynamic DOM modifications that rely on runtime scripts may not be visible to the smoke test. The manual checklist covers interactive checks that require a real browser.
- The automated checks are intentionally minimal and lightweight; they are intended as a quick safety net for reviewers.

If anything in the demo fails these checks, please document the failure and include screenshots or steps to reproduce when creating an issue or PR comment.
