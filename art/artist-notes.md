Artist notes: Warrior SVG export and optimization

Files created:
- /art/warrior.svg (single-frame, 32x32 pixel-art rendered with <rect> grid)
- /art/warrior-idle.svg (two-frame idle animation grouped as #frame1 and #frame2)

Authoring & export steps:
1. Design on a 32x32 grid using only solid-color <rect> elements positioned at integer x/y coordinates with integer widths/heights. This preserves pixel-art crispness.
2. Use viewBox="0 0 32 32" and explicit width/height attributes (e.g., width="320" height="320") so the SVG scales by integer multiples.
3. Add shape-rendering="crispEdges" on the root <svg> and include image-rendering CSS fallbacks to ensure nearest-neighbor-like scaling across browsers.
4. Avoid strokes; use filled rects for outlines and fills to keep geometry simple and file size small.
5. For animations, group frames into separate <g id="frame1"> and <g id="frame2">. Toggle visibility with CSS or JS (e.g., set display or opacity). Do not embed raster frames.

SVGO recommended config (example):
{
  "plugins": [
    { "name": "cleanupAttrs" },
    { "name": "removeDoctype" },
    { "name": "removeXMLProcInst" },
    { "name": "removeComments" },
    { "name": "removeMetadata" },
    { "name": "removeTitle" },
    { "name": "removeDesc" },
    { "name": "removeUselessDefs" },
    { "name": "removeEditorsNSData" },
    { "name": "convertStyleToAttrs" },
    { "name": "cleanupNumericValues", "params": {"floatPrecision": 0} },
    { "name": "convertColors" },
    { "name": "removeUnknownsAndDefaults" },
    { "name": "removeNonInheritableGroupAttrs" },
    { "name": "removeUselessStrokeAndFill" },
    { "name": "collapseGroups" }
  ]
}

Notes on sizes and optimization:
- Use a limited palette (<=16 colors) and favor <rect> elements over complex paths. Rects compress well and keep file size low.
- Set cleanupNumericValues floatPrecision to 0 or 1 to keep integer coordinates.
- Remove comments and metadata before committing for size savings.

How to animate in HTML/CSS (example):
- Use CSS keyframes to toggle visibility:
  @keyframes blink { 0%,49% {display:block} 50%,100% {display:none} }
- Or toggle the groups with JS at 500ms intervals: show #frame1 then #frame2.

Rendering verification:
- Open the SVG in a browser and scale the viewport to 100%, 200%, 300% (or set width/height in CSS to 320px, 640px, 960px). Pixels should remain sharp without blur.

If you want the files further minified, run: svgo --config=svgo-config.json art/warrior.svg art/warrior-idle.svg
