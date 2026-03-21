Artist README snippet: usage and groups

Files created:
- art/warrior-32.svg  (viewBox="0 0 32 32")
- art/warrior-64.svg  (viewBox="0 0 64 64")

Groups (IDs) available for styling and editing:
- #head    : head pixels (skin, hair, eyes, mouth)
- #body    : cloth and main torso pixels
- #armor   : separate armor pieces (shoulders, helmet rim)
- #weapon  : sword blade, hilt, and handle

CSS variables exposed in each SVG (defined in <style>):
- --skin-color    : base skin tone
- --hair-color    : hair/helmet dark color
- --armor-color   : main armor plate color (change to recolor armor)
- --accent-color  : emblem or trim color on armor
- --cloth-color   : cloak/cloth under armor
- --weapon-color  : blade/metal color
- --outline-color : black/outline pixels

Usage example (override colors):

Open the SVG in a text editor or embed inline and override variables, e.g.:

<style>
  :root{
    --armor-color: #4b7a90; /* new armor color */
  }
</style>

Alternatively, when embedding inline in HTML you can set styles on the SVG element:

<svg ... style="--armor-color:#b33; --accent-color:#ffd700"> ...</svg>

Notes:
- All shapes are built with <rect> elements aligned to integer grid units so they are easy to edit pixel-by-pixel.
- viewBox matches the pixel grid (32x32 and 64x64) and preserveAspectRatio is set to keep crisp scaling.
- Groups are named and ID'd for editing in vector editors or via CSS/JS.
