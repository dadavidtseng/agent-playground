Title: Pedestal Display — Scene Specification

Description:
This document specifies a simple product-display scene intended for export from Blender as OBJ+MTL. The scene consists of a ground plane (pedestal), a single sphere centered above it, basic materials, a three-point lighting setup, and camera framing instructions. Export target: OBJ with accompanying MTL (no glTF). No proprietary textures are used — materials are solid-color with numeric parameters.

1) Geometry (exact coordinates and scales)
- Plane (pedestal / ground)
  - Object name (recommended): "Pedestal_Plane"
  - Geometry: flat plane primitive
  - Location (Blender world coordinates): (0.000, 0.000, 0.000)
  - Rotation (Euler, degrees): (0.000, 0.000, 0.000)
  - Scale: X = 4.000, Y = 4.000, Z = 1.000 (suggested to achieve a 4x4 meter plane)
  - Note: apply scale/rotation before export (see Export settings)

- Sphere (display object)
  - Object name (recommended): "Display_Sphere"
  - Geometry: UV Sphere
  - Location (Blender world coordinates): (0.000, 0.000, 1.000)
  - Rotation (Euler, degrees): (0.000, 0.000, 0.000)
  - Scale: uniform scale = 1.000 (see radius below)
  - Sphere radius: 0.5 meters (create with radius 0.5 or scale a unit sphere by 0.5)
  - Note: exact center of sphere rests at Z=1.0 so bottom of sphere touches plane at Z=0.5 (if using radius 0.5). Adjust if you prefer a gap or pedestal.

2) Materials (hex colors + numeric parameters)
- Pedestal / Plane Material
  - Material name: "M_Pedestal"
  - Base Color (hex): #2f2f2f
  - Base Color (sRGB): R:47, G:47, B:47
  - Shader: Principled BSDF (or equivalent)
  - Roughness: 0.60
  - Metallic: 0.00
  - Specular: default (0.5) — adjust if needed for sheen
  - Normal map: none (no proprietary texture)

- Sphere Material
  - Material name: "M_Sphere"
  - Base Color (hex): #ff7f00
  - Base Color (sRGB): R:255, G:127, B:0
  - Shader: Principled BSDF (or equivalent)
  - Roughness: 0.20
  - Metallic: 0.00 (set to 0.0 for non-metallic; raise to ~0.1–0.2 for slight metalness if desired)
  - Clearcoat: 0.00 (use only if a glossy lacquer finish is desired)
  - Normal map: none

Notes on colors: enter hex values into Blender color pickers. If linear workflow is used, ensure colors are interpreted in sRGB and let Blender convert to linear for rendering.

3) Camera framing and settings
- Target render resolution: 1280 x 720 (HD, 16:9)
- Camera object name (recommended): "Cam_Main"
- Suggested camera type: Perspective
- Sensor / focal suggestions:
  - Focal length: 35 mm (use 35mm for a modest wide-normal look)
  - Sensor size: 36 mm (default full-frame) or 32 mm for slightly tighter crop — maintain focal length if altering sensor
- Camera location suggestion: (X = 0.000, Y = -3.000, Z = 1.200)
- Camera rotation suggestion (look at origin): point the camera at target (0.000, 0.000, 0.900). Example Euler rotation (approx): (pitch = 12°, yaw = 0°, roll = 0°) — better to use a Track To or Look At constraint targeting (0,0,0.9)
- Framing: position the camera so the sphere fills approximately 25–40% of the vertical frame, leaving room above for composition. Use the camera's focal length to adjust field of view; move the camera along Y for small framing adjustments.
- Depth of field: optional — if used, set focus distance to the sphere center (distance from camera to (0,0,1)). Use small aperture (f/4–f/8) for mild bokeh if desired.

4) Lighting (exact positions & color)
- Use physically plausible lights (area/point/spot) or HDRI (optional). No proprietary HDRI.
- Suggested three-point lighting (Blender units for location):
  - Key light (Area light):
    - Name: "Light_Key"
    - Type: Area
    - Location: (2.000, -2.000, 3.000)
    - Rotation: toward the origin
    - Size: 0.6 m
    - Power / Intensity: 1000 (Watts) — tune to scene exposure
    - Color: #FFFFFF (white)
  - Fill light (Area or Point):
    - Name: "Light_Fill"
    - Type: Area
    - Location: (-2.000, -1.000, 1.500)
    - Size: 0.8 m
    - Power / Intensity: 300 (Watts)
    - Color: #FFFFFF (white, slightly desaturated)
  - Rim light / Back light (Point or Spot):
    - Name: "Light_Rim"
    - Type: Point
    - Location: (0.000, 2.000, 2.000)
    - Power / Intensity: 200 (Watts)
    - Color: #FFEABB (warm rim — hex approx: #ffeabb)

- World / ambient:
  - Background color (if not using HDRI): very dark gray, hex #0a0a0a, low strength (0.1) to preserve contrast

5) Exact object names and hierarchy (recommended for clarity)
- Root
  - Pedestal_Plane (M_Pedestal)
  - Display_Sphere (M_Sphere)
  - Cam_Main
  - Light_Key
  - Light_Fill
  - Light_Rim

6) Blender OBJ export settings (explicit; export OBJ + MTL)
- Export format: Wavefront OBJ (.obj) with accompanying MTL (.mtl)
- File name expected on server: pedestal_display.obj
- Export location: choose an empty folder; ensure OBJ, MTL, and any textures (none expected) are written to the same folder
- Required export options (explicit):
  - Apply Modifiers: ON (so modifiers like Subdivision Surface are baked)
  - Apply Transforms (Object Transforms -> Apply Scale/Rotation): Export with transforms applied. In Blender's exporter this is the "Apply Modifiers" and "Apply Transform" behavior — ensure that the exported geometry has correct world-space transforms baked.
  - Forward / Up axes: Forward = -Z Forward, Up = Y Up (set in exporter: Forward = -Z, Up = Y)
  - Include Normals: ON (export vertex normals)
  - Include UVs: OFF (no UVs are required; enable only if you add textures)
  - Write Materials (MTL): ON (export MTL file that references material colors)
  - Include Materials (Objects as OBJ groups): ON
  - Triangulate: optional (OFF by default). If target engine requires triangles, triangulate before export or enable triangulate during export.
  - Keep Vertex Order / Smoothing: keep smoothing groups (export smoothing)
  - Write Objects as OBJ groups: ON
  - Path mode for textures: Copy not used; instead ensure any textures (if later added) are exported to the same folder as the OBJ/MTL and referenced with relative paths.

- Post-export check:
  - Confirm pedestal_display.obj and pedestal_display.mtl exist in the export folder.
  - Open MTL and verify material names M_Pedestal and M_Sphere with corresponding Kd (diffuse) values matching the hex colors converted to linear/sRGB as needed.

7) Textures and MTL
- This scene uses no proprietary textures. If you later add textures, export them into the same folder as the OBJ/MTL and use relative paths in the MTL file. Example layout:
  - /export-folder/pedestal_display.obj
  - /export-folder/pedestal_display.mtl
  - /export-folder/M_Pedestal_diffuse.png (if present)
  - /export-folder/M_Sphere_diffuse.png (if present)

8) SCP upload placeholder (replace placeholders before use)
- Expected filename on remote server: pedestal_display.obj
- Recommended upload: upload both .obj and .mtl (and textures if any) into the same remote directory.
- SCP command template (replace <USER>, <HOST>, <REMOTE_DIR> with real values):
  scp /local/export/folder/pedestal_display.obj <USER>@<HOST>:<REMOTE_DIR>/pedestal_display.obj
  scp /local/export/folder/pedestal_display.mtl <USER>@<HOST>:<REMOTE_DIR>/pedestal_display.mtl

- Example placeholder path (DO server) — DO NOT USE THIS literally, replace placeholders with real credentials and host:
  <USER>@<DO_SERVER_HOST>:/var/www/assets/3d/pedestal_display.obj

- Notes: ensure permissions on the DO server directory allow write by the target user. Keep SSH keys or credentials secure. Do not commit credentials into this repo.

9) Additional notes & best practices
- Apply object transforms in Blender (Ctrl-A -> Rotation & Scale) before exporting to avoid scale/rotation mismatches.
- Prefer exporting materials with simple diffuse (Kd) values in MTL; advanced PBR properties may not carry over to all engines — preserve roughness/metallic as notes in README if target engine supports PBR via separate workflows.
- If the target engine supports MTL-only diffuse colors, include a supplementary JSON file with material numeric parameters (roughness, metallic) alongside the OBJ/MTL for accurate reproduction. Example: pedestal_display_materials.json

10) Artifact and repo path
- This specification file: /root/agent-playground-designer/scene_spec.md
- Expected exported files (place into export folder prior to SCP):
  - pedestal_display.obj
  - pedestal_display.mtl
  - (optional) any textures placed in same folder as above

End of specification.
