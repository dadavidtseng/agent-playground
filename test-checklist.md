Test Checklist — Manual QA (Design / Accessibility / Responsive)
Task ID: 4277c613-69e6-43d4-88dc-f334074b4ce3
Role: Designer (QA lead)
Date: 2026-03-18

Summary
- Scope: Responsive layout, keyboard navigation, ARIA attributes, color contrast (WCAG AA), animation performance.
- Tools used (manual + automated assist): axe DevTools (browser extension), Lighthouse (Chrome), Colour Contrast Analyser / contrast-checker, Chrome/Firefox/Safari DevTools (mobile emulation), device testing on iOS Safari and Android Chrome where noted.

Breakpoints tested
- Mobile: 360x640 (small phones) and 412x915 (larger phones)
- Tablet: 768x1024 (portrait/landscape)
- Desktop: 1280x800 and 1920x1080

Checklist (each item marked Pass / Fail with notes)

1) Layout & Responsive behavior
- Container widths and gutters
  - Mobile: Pass — main content stacks correctly; minor horizontal padding tightness on 360px noted (Pass with comment)
  - Tablet: Pass
  - Desktop: Pass
  - Notes: At 360px the left/right touch targets are visually tight near the edge; recommend adding 8–12px extra side padding for small devices.

- Grid / component stacking
  - Mobile: Pass — card stacks vertically, images scale down
  - Tablet: Pass
  - Desktop: Pass
  - Notes: Some cards with long metadata (tags/labels) wrap with uneven heights — consider limiting tag count or using a clamp on height with ellipsis for consistency.

- Overflow / horizontal scroll
  - Mobile: Fail — footer social icons row causes 1px horizontal overflow at 360px in Chrome emulation
  - Tablet: Pass
  - Desktop: Pass
  - Suggested fix: add flex-wrap: wrap; or set max-width: 100% and box-sizing; add overflow-x: hidden on body only if safe.

- Sticky headers / fixed elements
  - Mobile: Pass (careful with viewport resize when keyboard opens)
  - Tablet: Pass
  - Desktop: Pass
  - Notes: On iOS Safari sticky inside an overflow container showed inconsistent behavior (see cross-browser notes).

2) Keyboard navigation & focus management
- Tab order (logical source order and visual focus)
  - Mobile (virtual keyboard navigation): N/A (mostly desktop)
  - Tablet: N/A
  - Desktop: Fail (intermittent) — some icon-only buttons (search, profile) are skipped when using Tab; likely missing tabindex or not in DOM order.
  - Suggested fix: Ensure interactive elements are native focusable elements (button, a) or have tabindex="0"; avoid negative tabindex.

- Visible focus indicators
  - Desktop: Fail — custom buttons have very subtle focus styles that do not meet visibility needs.
  - Suggested fix: Implement a clear focus-visible style (outline or box-shadow) and use :focus-visible where appropriate to avoid showing outlines on mouse focus.

- Modal/dialog focus trap
  - Desktop/Tablet/Mobile: Fail — when a modal opens, focus is not consistently trapped inside on all browsers; hitting Tab moves focus behind overlay in some cases.
  - Suggested fix: Implement a robust focus-trap (e.g., using focus-trap or built custom with tabbable elements) and ensure aria-hidden toggles on background content.

- Skip-to-content and landmarks
  - Desktop: Pass (landmarks present) — however skip link is visually hidden but not visible on focus in some breakpoints
  - Suggested fix: Ensure skip link becomes visible on keyboard focus (common CSS pattern).

3) ARIA & semantics
- Landmarks (header, main, nav, footer)
  - Pass — header/main/footer roles present.

- Interactive controls aria attributes
  - Fail — icon-only buttons (share, favorite) missing aria-label or aria-labelledby on multiple pages.
  - Suggested fix: Add aria-label="Share" etc. or include visually-hidden text.

- ARIA states (aria-expanded/toggled)
  - Desktop: Pass where applied — however a collapsible sidebar had aria-expanded not updating in one observed case.
  - Suggested fix: Ensure JS updates aria-expanded synchronously with DOM state change.

4) Color contrast (WCAG AA)
- Body text (normal: >4.5:1)
  - Desktop/Tablet/Mobile: Pass — primary body text meets 4.5:1 in tested pages.

- Large text (>=18pt bold or 24px regular: >3:1)
  - Pass

- Primary CTA (button text)
  - Fail on some variants — secondary CTA (light blue text on white) measured ~3.2:1 which fails 4.5:1 for normal-size text.
  - Suggested fix: Increase text contrast by darkening text color or increasing background saturation/adding a stronger outline.

- Disabled states and placeholders
  - Fail — placeholder labels and disabled form text fall below 3:1 in several components.
  - Suggested fix: Recolor disabled states to meet minimum contrast or use different visual indicator (icon + text) and ensure not relied on for essential info.

Tools/notes: axe flagged contrast failures for .btn--secondary and .form__placeholder on multiple pages. Recommend running automated contrast tools in CI.

5) Animated interactions & performance
- Motion performance (parallax, heavy transforms)
  - Mobile: Fail — parallax hero scroll caused jank on low-powered Android device; high CPU usage on scroll.
  - Tablet: Pass (minor jank in older devices)
  - Desktop: Pass
  - Suggested fix: Offload animations to transform: translateZ(0) where appropriate; prefer CSS transform/opacity only; throttle heavy JS scroll handlers; provide reduced-motion alternatives.

- prefers-reduced-motion support
  - Fail — not all animations respect prefers-reduced-motion; some auto-playing micro-animations persist.
  - Suggested fix: Add @media (prefers-reduced-motion: reduce) { animation: none !important; transition: none !important; } and provide non-animated alternatives.

6) Forms & Inputs
- Labeling and helper text
  - Fail — some inputs rely on placeholder instead of visible labels; screen-reader users may miss context.
  - Suggested fix: Add visible labels or aria-labels and keep placeholders as supplementary only.

- Error states and aria-invalid
  - Pass in most forms, but one page did not set aria-invalid on error fields.
  - Suggested fix: Ensure server/client validation sets aria-invalid="true" and associates error message with aria-describedby.

Overall results summary
- Pass: Responsive stacking, primary layout across breakpoints, most semantics.
- Fail / Needs Fix: horizontal overflow at 360px; missing aria-labels on icon-only buttons; insufficient contrast for secondary CTA and placeholders; inconsistent focus management and visible focus styles; prefers-reduced-motion not respected; modal focus trap issues.

Required fixes (short actionable list for developers)
1. Fix horizontal overflow on footer social icons at <=360px: add flex-wrap or adjust margins. (High)
2. Add aria-label / visually-hidden text to all icon-only buttons and ensure consistent semantics. (High)
3. Improve focus indicators for keyboard users (use :focus-visible, visible outline or focus ring). (High)
4. Ensure modal/dialogs implement a focus trap and set aria-hidden on background content. (High)
5. Correct contrast for secondary CTA and placeholders to meet WCAG AA (adjust colors or font-weight). (Medium)
6. Respect prefers-reduced-motion — add the media query and provide alternatives. (Medium)
7. Ensure form inputs have visible labels and use aria-invalid + aria-describedby for errors. (Medium)

Notes for follow-up verification
- After fixes, re-run axe and contrast checks and test on physical devices: iPhone (latest iOS Safari), Android 12+ (Chrome), Firefox (desktop), Edge (Windows).
- Add automated Lighthouse/axe checks into CI for regressions.

Files produced
- test-checklist.md (this file)

End of checklist
