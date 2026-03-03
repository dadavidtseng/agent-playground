SVG Optimization — Task 2026b9b0-9f3b-456d-a7f8-e15346c96c9c

Goals

- Reduce SVG file sizes while preserving visual fidelity.
- Remove unnecessary metadata/IDs and collapse groups where possible.

Recommended tools

- SVGO (https://github.com/svg/svgo) — CLI tool to optimize SVGs.
- svg-sprite — for combining multiple icons into a single sprite.

Sample svgo config (svgo.config.js)

module.exports = {
  plugins: [
    { name: 'removeXMLNS', active: true },
    { name: 'removeDimensions', active: true },
    { name: 'convertStyleToAttrs', active: true },
    { name: 'removeAttrs', params: { attrs: '(data-name)' } },
    { name: 'cleanupIDs', params: { preserveIdPrefixes: ['icon-'] } }
  ]
};

Batch optimization script (npm)

// package.json scripts example:
// "optimize:svgs": "svgo -f src/assets/icons -o dist/assets/icons --config=svgo.config.js"

Practical notes

- Prefer inline SVGs for icons that require CSS interaction (color changes on hover) or use currentColor.
- For purely decorative icons, use <img src> with optimized files and add alt="".

