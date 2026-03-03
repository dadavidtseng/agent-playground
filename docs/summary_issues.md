Issues Log — Task 2026b9b0-9f3b-456d-a7f8-e15346c96c9c

1) Missing aria-labels on icon-only buttons
   - Severity: low
   - Remediation: Add aria-label attributes or visually-hidden text.

2) Safari focus outline not visible for custom-styled buttons
   - Severity: medium
   - Remediation: Add :focus-visible outline rules; avoid setting outline: none without substitute.

3) Secondary text contrast below 4.5:1
   - Severity: medium (affects small text readability)
   - Remediation: Increase color contrast or change text weight/size.

4) Backdrop-filter performance impact on Safari/mobile
   - Severity: low/medium depending on usage
   - Remediation: Avoid heavy blurs or provide an alternate plain background on mobile.

5) One compact touch target under 44px in mobile emulation
   - Severity: medium
   - Remediation: Increase padding or convert to larger clickable area.

Actions taken

- Documented fixes and recommended CSS snippets in docs/performance.md and docs/accessibility.md.
- Added instructions for adding automated tests (axe-core, Playwright) to CI.

Remaining work

- Implement actual code edits to add aria-labels and focus-visible CSS in the UI source. This task focused on testing and documentation; code changes can be implemented if desired.

