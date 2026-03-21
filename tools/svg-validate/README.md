SVG Validation Utility

Purpose

This small utility helps reviewers and CI validate incoming SVG assets against common project constraints:
- No raster embeds (no <image> tags or data: URIs)
- viewBox attribute present on the root <svg>
- File size within a configurable limit (default 200 KB)
- Group (<g>) nesting depth limited (default max 6)
- Presence of animation frame markers (ids or classes containing "frame")

Files added

- tools/svg-validate/validate-svg.js — Node.js script to run automated checks
- tools/svg-validate/README.md — this document (manual checklist + usage)

Manual checklist (for reviewers)

1. Open the SVG in a text editor or an XML-aware viewer.
2. Check for raster embeds:
   - Search for <image, <img, or xlink:href/href attributes that reference data:image or external image files.
   - If any <image> or <img> tags are present, ask for a pure SVG alternative.
3. Confirm viewBox is present on the root <svg> element (e.g. viewBox="0 0 512 512").
4. Confirm the file size is reasonable (default guideline: <= 200 KB). Large SVGs may contain unnecessary embedded data.
5. Check group nesting depth:
   - Look at nested <g> elements. Deeply nested groups make animations and maintenance harder. Keep nesting shallow (recommended max: 6).
6. Check for frame elements or IDs/classes used for animation frames:
   - Look for ids or classes containing the word "frame" (e.g. id="frame-0", class="frame").
   - If animation frames are expected but not present, request consistent frame ids.
7. Render the SVG in a browser to visually confirm it looks correct.

Quick decisions

- If raster images are embedded (data URIs or external image references) -> reject and request vector-only SVG.
- If viewBox is missing -> request addition of viewBox (don’t rely solely on width/height).
- If groups are deeply nested -> suggest flattening or reorganizing into named groups.

Automated check with Node (validate-svg.js)

Requirements

- Node.js (no build step). The script uses only built-in Node APIs (fs, path).

Usage

From the repository root run:

  node tools/svg-validate/validate-svg.js [path/to/file.svg]

Examples

- Validate the default example (if present):

  node tools/svg-validate/validate-svg.js

  The script will try to validate art/warrior-avatar.svg by default when no path is provided.

- Validate a specific file:

  node tools/svg-validate/validate-svg.js assets/icons/my-icon.svg

Exit codes

- 0 — all checks passed
- 1 — one or more checks failed (script prints details)

Configuration

The script accepts optional environment variables to tweak thresholds:

- SVG_MAX_BYTES — maximum allowed file size in bytes (default 200000)
- SVG_MAX_G_DEPTH — maximum allowed <g> nesting depth (default 6)
- SVG_EXPECT_FRAME_COUNT — if set to a positive integer, script will expect at least this many frame-marked elements (default: 1)

Notes and limitations

- This utility performs text-based checks (no XML library dependency) to remain zero-config. It works for common, well-formed SVGs but is not a full XML validator.
- For more advanced validation (namespace handling, schema checks), consider adding a small XML parsing dependency.

If you need changes to the rules or extra checks (colors, fonts, allowed attributes), open an issue or a PR with suggested rules and sample files.
