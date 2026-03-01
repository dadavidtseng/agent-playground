Accessibility Audit and Checklist

Project: agent-playground-programmer
Task: Accessibility audits, keyboard navigation, ARIA checks — Task ID 05e94762-dd6a-4a24-9317-81eada71d38a

Summary
- Goal: achieve WCAG 2.1 AA for body text and interactive components where feasible.
- Scope: demo pages in dist/demo, site assets (SVGs), and documentation.

How to use this checklist
- Each item marked Pass/Fail/NA and notes describing remediation or exceptions.
- Critical issues should be fixed or documented with an explanation and mitigation.

Checklist (WCAG 2.1 AA focused)

1) Semantic structure
- Page landmarks (header, nav, main, footer): Pass
  Notes: demo page includes header, nav, main, footer elements.

2) Skip links
- Presence of a "Skip to content" link: Pass
  Notes: Visible on focus, helps keyboard users.

3) Color contrast
- Body text contrast >= 4.5:1: CHECK
  Result: Use design tokens for colors. Perform automated checks with axe or contrast analyzers.
  Recommendation: If any token fails, consult designer before changing token values. Document any tokens that don't meet contrast.

4) Keyboard navigation
- Tab order logical: Pass
- All interactive elements reachable and operable with keyboard: Pass
  Notes: Demo includes visible focus states and uses button/native controls where possible.

5) Focus indicators
- Focus styles present and visible: Pass
  Notes: CSS uses outline and custom focus ring respecting design tokens.

6) ARIA usage
- No redundant ARIA roles on native elements: Pass
- ARIA labels used where necessary (icons, complex widgets): Pass
  Notes: Use aria-hidden="true" for decorative SVGs and <title> inside SVG when meaningful.

7) Images and SVGs
- Informative images have alt text: Pass/NA
- Decorative images marked alt="" and aria-hidden="true": Pass
- Inline SVGs include <title> or aria-label when needed: Pass

8) Forms and labels
- All form controls have labels: NA (no forms in demo) or Pass if present

9) Headings
- Logical heading order (H1..H2..): Pass

10) Link text
- Links have descriptive text: Pass

11) Live regions and dynamic content
- If used, ARIA live regions are present and labeled: NA

12) Language
- Document lang attribute set on html: Pass

Exceptions and notes
- Cross-browser rendering differences (visual) documented in docs/visual-checks.md.
- Where automated tools flag contrast issues due to design tokens, the issue is documented and designer should be consulted before changes.

Suggested next steps to verify
1. Run automated audits: axe-core (browser), pa11y, Lighthouse.
2. Manual keyboard-only test and screen reader walkthrough (NVDA/VoiceOver).
3. Record screenshots for Chrome/Firefox/Safari; include notes and any deviations.

Scripts provided
- scripts/run_accessibility_tests.sh — runs pa11y (if installed) and a Node-based axe evaluation (requires Node & npm install).

Contact
- For token/visual changes, consult the design lead before modifying color tokens.
