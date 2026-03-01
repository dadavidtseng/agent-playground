Release Notes — Accessibility & Visual Audit

Task: 05e94762-dd6a-4a24-9317-81eada71d38a

Summary
- Performed accessibility audits (checklist + smoke script) and keyboard/ARIA improvements to demo.
- Performed manual optimizations on SVG assets and included optimized variants.
- Created demo pages under dist/demo for verification across Chrome/Firefox/Safari.
- Added documentation for visual checks and an accessibility checklist.

What changed
- Added docs/accessibility-checklist.md
- Added docs/visual-checks.md
- Added optimized SVG: assets/svg/illustration.optimized.svg
- Included inlined optimized SVG in dist/demo/index.html
- Added scripts/run_accessibility_tests.sh

Notes and follow-ups
- Color tokens were respected; no token changes were made. Any contrast exceptions are documented in the checklist and should be reviewed by the designer.
- Visual verification screenshots must be added by QA to docs/screenshots/ after cross-browser testing on target OS/browser combos.

How to verify
1. Open dist/demo/index.html in Chrome/Firefox/Safari; perform keyboard navigation and confirm focus states.
2. Run scripts/run_accessibility_tests.sh (install pa11y if desired) to run automated smoke tests.
3. Compare assets/svg/illustration.svg vs assets/svg/illustration.optimized.svg for size improvements.

Prepared by: Programmer agent
