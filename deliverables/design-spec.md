Design Spec - KĀDI Component

Overview
- Final SVG assets integrated: logo-final.svg, FinalGraphic.svg
- Design tokens provided in tokens.json and tokens.css

Colors and Accessibility
- Primary: #0055FF (text contrast vs white background: AAA for large text, AA for normal) 
- Primary variant: #003DBA
- Secondary: #00B37E
- Text high: #0A0A0A

Usage
- CSS tokens mapped to CSS variables in src/styles/tokens.css
- Components import tokens via CSS cascade (ensure tokens.css is imported at app root)

SVGs
- logo-final.svg: accessible title included and role=img
- FinalGraphic.svg: decorative graphic with title and role

Responsive
- Header scales using logo height and flex layout. Buttons use spacing tokens.

Notes
- Ensure font Inter is available or fallbacks will be used.
