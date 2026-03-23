---
title: "Pedestal Scene Specification"
object: "PedestalCube"
position: [0, 0, 0]
size: 1  # units (numeric). Default: 1
material: matte
colors:
  primary: "#2E5A88"    # deep steel blue
  accent:  "#F2B84B"    # warm gold
  background: "#F7F9FB" # very light cool gray
---

# Pedestal Scene (Designer Spec)

This document specifies an engine-agnostic pedestal cube used as a display stand in scenes. All transforms and values are provided in simple numeric units. Rotation is intentionally omitted.

Fields:
- position: [0, 0, 0]  (required, exact)
- size: 1              (numeric, default 1 — represents uniform scale of the cube)
- material: matte      (recommended material finish)
- colors: sRGB hex values for primary, accent, and background

Purpose:
- Provide clear spawn parameters and a color/material palette for artists and programmers to instantiate a consistent pedestal cube.

Example spawn snippet (engine-agnostic):

```yaml
# Example: spawn parameters for PedestalCube
spawn:
  name: "PedestalCube"
  transform:
    position: [0, 0, 0]
    scale: [1, 1, 1]   # size = 1 -> uniform scale
  geometry:
    type: cube
    size: 1            # numeric dimension (edge length)
  material:
    type: matte
    baseColor: "#2E5A88"   # primary
    accentColor: "#F2B84B" # accent (for trims/highlights)
  scene:
    backgroundColor: "#F7F9FB"
```

Short verification / expected spawn parameters
- position: [0,0,0] exactly
- size: 1 (uniform scale -> [1,1,1])
- material: matte
- colors present and valid sRGB hex: primary, accent, background

Designer completion note:
- Designer: Task complete. The specification file below is the authoritative source for the pedestal cube parameters.

Programmer verification checklist
- [ ] pedestal_scene.md exists at repository root
- [ ] position field exactly [0, 0, 0]
- [ ] size field is numeric and set to 1
- [ ] material field set to "matte"
- [ ] colors.primary, colors.accent, colors.background are in #RRGGBB format
- [ ] Example spawn snippet is present and follows the template above

If changes are required (alternate colors or scale), update the YAML front-matter fields and re-commit.
