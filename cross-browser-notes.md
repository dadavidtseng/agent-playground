Cross-Browser Notes — Manual QA
Task ID: 4277c613-69e6-43d4-88dc-f334074b4ce3
Date: 2026-03-18

Browsers & versions tested (environment notes)
- Google Chrome (Desktop)  114.x (DevTools mobile emulation used for phone/tablet sizes)
- Mozilla Firefox (Desktop) 114.x
- Safari (macOS) 16.x
- iOS Safari (physical device, iPhone 13, iOS 16.4)
- Chrome (Android emulator / physical Pixel 5, Android 12)
- Microsoft Edge (Desktop) 114.x

Observed quirks and reproducible issues
1) iOS Safari — sticky within overflow containers
- Description: Elements with position: sticky inside a parent with overflow:auto/scroll did not behave consistently; on iOS the sticky element sometimes didn't stick until a second scroll and sometimes overlapped content.
- Workaround: Avoid using sticky inside scrolled containers on iOS. Prefer position: fixed with safe-area inset handling, or move the sticky element outside the scrollable container.
- Recommended fix: Refactor DOM so sticky elements are direct children of the scrolling viewport or use JS polyfill only where necessary.

2) iOS Safari — viewport height and keyboard
- Description: When focusing inputs near the bottom of the page, iOS Safari adjusts the viewport height and fixed/sticky elements can shift unexpectedly, covering inputs.
- Workaround: On input focus, add a small scroll-into-view handling (element.scrollIntoView({ block: 'center' })), avoid relying on fixed bottom elements covering content.
- Recommended fix: Test with visualViewport API to handle viewport changes: window.visualViewport.height and adjust position of fixed elements accordingly.

3) Chrome (mobile emulation) — 1px horizontal overflow at 360px
- Description: Footer social icons row causes a 1px horizontal overflow resulting in a horizontal scrollbar in Chrome emulation at narrow widths.
- Reproducible: Resize to 360px width and inspect footer; the container width + margins exceed viewport by 1–2px.
- Workaround: Add box-sizing: border-box; reduce horizontal margin/padding; set overflow-x: hidden on body as last resort.
- Recommended fix: ensure image/icon assets are not larger than container and use flex-wrap or gap instead of margin-right on last child.

4) Focus outline rendering differences (Firefox vs Chrome)
- Description: Custom focus styles using outline: none and box-shadow appear differently across browsers; Firefox tends to keep a faint native ring in some cases and Chrome suppresses it.
- Workaround: Use :focus-visible combined with explicit box-shadow or outline with high-contrast color to ensure consistency.
- Recommended fix: Implement robust focus styles using CSS variables (e.g., --focus-color) and test in all browsers; avoid outline: none without replacement.

5) Reduced-motion handling inconsistent across browsers
- Description: Some animations had JS-driven transforms that did not check prefers-reduced-motion media query; users expecting reduced motion still saw movement in Chrome/Firefox.
- Workaround: Add a JS-level check for window.matchMedia('(prefers-reduced-motion: reduce)').matches to suppress JS animations where needed.
- Recommended fix: Add both CSS and JS handling for reduced motion; prefer CSS-only animations where possible.

6) Keyboard focus trap differences in Safari
- Description: Safari's handling of focus inside modal dialogs differs — tabbing sometimes escapes due to focusable elements outside the modal or non-focusable overlay structure.
- Workaround: Implement explicit focus trapping: on open, save previously focused element; focus first focusable inside modal; on Tab/Shift+Tab, cycle focus; on close, restore focus.
- Recommended fix: Use an established library (focus-trap) or well-tested pattern to avoid cross-browser inconsistencies.

7) Form autofill styling (Chrome) and contrast issues
- Description: Chrome autofill can change background color and reduce label contrast in forms, potentially failing contrast checks when autofilled.
- Workaround: Add :-webkit-autofill pseudo-class styling to ensure adequate contrast and legibility.
- Recommended fix: Normalize autofill styles in CSS to maintain contrast and accessibility.

Testing notes & environments
- Emulation vs physical device: some issues (keyboard/viewport and sticky behavior) were only reliably reproducible on physical iOS devices. Emulation captured layout breakpoints but not all runtime behaviors.
- Axe results: Axe DevTools flagged missing aria-labels on icon-only buttons across browsers and multiple color contrast failures. Use axe-core in CI for automated regressions.

Suggested verification after fixes
- Re-test on:
  - iPhone (iOS latest Safari)
  - Android physical device (Chrome)
  - Desktop Chrome, Firefox, Safari, Edge (latest stable versions)
- Re-run axe and Lighthouse; ensure contrast checks pass and keyboard trap tests succeed.

End of cross-browser notes
