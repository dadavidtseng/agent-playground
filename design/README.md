Focus Outline Token and Usage Guidance

Purpose

The focus outline tokens provide an accessible, visible focus state for keyboard and assistive technology users. They are intended to be used whenever an interactive element (links, buttons, interactive cards) can receive keyboard focus.

Tokens

- focus-outline: color used for a 2px solid outline (token: focus-outline)
- focus-outer: translucent ring used as a diffused halo behind the outline (token: focus-outer)

Implementation guidance

- Apply a 2px solid border using focus-outline when the element receives :focus-visible.
- Add a box-shadow using focus-outer (e.g., 0 0 0 6px rgba(30,144,255,0.14)) to create a halo that increases the visual target without obscuring content.
- Do not remove focus indicators unless replacing it with an equally visible alternative. Mobile platforms may choose larger touch targets instead.

CSS snippet

.element:focus-visible {
  outline: 2px solid #1E90FF; /* focus-outline */
  box-shadow: 0 0 0 6px rgba(30,144,255,0.14); /* focus-outer */
  outline-offset: 2px;
}

Accessibility notes

- Ensure the focus style contrasts against the element background and adjacent elements.
- For elements on primary-500 backgrounds, consider using focus-outline at full opacity (primary-500 is also #1E90FF) or a white 2px outline depending on contrast results.

Design considerations

- Use the outer glow sparingly on dense UIs to avoid visual clutter.
- For components with rounded corners, keep outline-offset >= 2px so the outline does not clip.
