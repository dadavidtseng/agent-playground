# Pedestal Cube Scene Specification

Overview
- Scene: Pedestal Cube
- Coordinate convention: Y-up (do not change)
- Cube origin (center): (0, 0, 0)

Core object
- position: (0, 0, 0)
- edgeLength: 1.0  # default

Pedestal
- pedestal: true
- pedestal dimensions:
  - baseCenter: (0, -0.55, 0)
  - height: 0.5
  - notes: Pedestal base is centered below the cube so the cube sits visually on top. Keep Y-up convention when interpreting baseCenter.

Materials
- materialOptions:
  - matte (recommended default)
  - glossy
  - metallic
- recommendedDefault: matte

Color palette (hex)
- palette:
  - #E63946  # warm red
  - #2A9D8F  # teal (recommended chosen color)
  - #264653  # deep blue/teal
  - #F4D35E  # warm accent (optional)

- chosenColorHex: #2A9D8F

Lighting (recommended)
- Use a three-point lighting setup:
  - Key light: soft warm (5600K), ~1.0 intensity, placed above-right at ~45° to the cube.
  - Fill light: cooler, lower intensity (~0.3–0.5), placed above-left to soften shadows.
  - Rim/back light: small bright highlight from behind to separate object from background.
- Optional: add a subtle HDRI environment for reflections and ambient illumination (low intensity) if using glossy/metallic materials.

Camera (suggested)
- camera:
  - type: perspective
  - position: (0, 1.2, 2.5)  # Y-up; camera is above ground, looking down slightly
  - lookAt: (0, 0, 0)  # focus on cube origin
  - focalLength: 50mm (approx)  # natural perspective for product/still-life shots
  - aperture: f/5.6 (adjust for depth-of-field as needed)

Notes
- Keep the cube origin at (0,0,0). Do not change coordinate conventions (Y-up).
- The pedestal is included by default (pedestal: true). To remove the pedestal, set pedestal: false and omit pedestal dimensions.
- All color values must be hex codes from the palette above. The chosen color for this scene is #2A9D8F.

File location: assets/scene-spec.md
