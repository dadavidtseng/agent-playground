Project: Front-end Visual QA & SVG Optimization Demo

Overview

This repository contains a front-end demo and documentation for performing visual and accessibility QA across responsive breakpoints, optimizing SVG avatar assets, and suggested CI steps for optional minification and SVG optimization.

Scope

- Front-end demo and documentation only. No backend integration is performed.
- Optimized SVG assets are provided in assets/avatars/.
- README includes usage, integration notes, and asset licensing information (see license section).

Installation (local)

1. Clone the repository.
2. Serve the front-end files with a simple static server (examples):
   - Python 3: python -m http.server 8000
   - node: npx http-server -p 8000
3. Open http://localhost:8000 in your browser.

Assets

All avatar SVGs are located in assets/avatars/. Optimized SVGs have filenames prefixed with "avatar-optimized-".

License for assets

IMPORTANT: The original artwork and avatar assets are provided by the artist. The license text below is a placeholder and must be replaced by the actual license supplied by the artist before any redistribution or production use.

Example (placeholder) license:

- Artwork: "Artist Name" (replace with actual name)
- License: Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)
- Terms: You may use and adapt the artwork for non-commercial purposes with attribution to the artist. Commercial use requires explicit permission from the artist.

If you are the project maintainer, update this README with the exact license text provided by the artist and include contact details.

Usage and integration notes

- This demo is front-end only. To integrate in your own app:
  - Copy optimized SVGs from assets/avatars/ into your project.
  - Use <img src="/path/to/avatar.svg" alt="User avatar"> or inline the SVG for better control over styling and accessibility.
  - Prefer inline SVGs when you need to change colors via CSS or support high-DPI scaling.

Accessibility recommendations

- Provide meaningful alt text for each avatar (e.g., alt="Photo of Jane Doe"). If the avatar is purely decorative, use role="img" aria-hidden="true" or alt="" as appropriate.
- If avatars convey status (online/offline), provide a textual label or ARIA description for screen readers.

Performance and optimization

- SVGs are already minified and cleaned. For larger projects use tools like SVGO (https://github.com/svg/svgo) in CI to automatically optimize new assets.
- Consider using HTTP caching headers and serving optimized images through a CDN for production.

Suggested CI steps (optional)

Below is a sample GitHub Actions workflow that can run SVGO on the assets/avatars/ directory and commit optimized files back to the repository. Treat this as a suggested starting point and adapt to your CI policies.

File: .github/workflows/optimize-assets.yml
- Checks out the repo
- Runs svgo to optimize SVGs in assets/avatars/
- Commits optimized files back using the GITHUB_TOKEN

Note: This workflow is optional. If you enable automatic commits from CI, ensure you have safeguards to avoid infinite commit loops.

Cross-browser visual QA

Manual checks performed (document results in test-checklist.md). Recommended browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest macOS)
- Edge (latest)
- Mobile: Safari iOS, Chrome Android

Breakpoints to verify

- 320px (small mobile)
- 375px (mobile)
- 768px (tablet)
- 1024px (small desktop)
- 1440px (large desktop)

Contributing

- If you add or replace SVGs, run svgo locally or rely on CI to keep the assets optimized.

Contact / Credits

- Artwork / avatars provided by the artist. Update the license block above with the correct artist name and license text.
