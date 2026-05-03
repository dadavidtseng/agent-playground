Scene Specification: Pedestal Display

Overview

This document specifies exact transforms, material assignments, export settings, file paths, and verification checks for the "Pedestal" scene. Follow this spec to model and export the scene consistently.

Scene Objects and Exact Transforms

1) Base Plane
- Name: Base_Plane
- Type: Plane (single planar mesh)
- Location (translation): (0.000, 0.000, 0.000)
- Rotation (Euler XYZ, degrees): (0.000, 0.000, 0.000)
- Scale: (1.000, 1.000, 1.000)
- Suggested geometric size (for modeling reference): 2.0 x 2.0 meters (centered at origin). If modeled as a quad plane with 4 vertices, expected plane corner coordinates (object-local, after transform):
  - (-1.0, -1.0, 0.0)
  - ( 1.0, -1.0, 0.0)
  - ( 1.0,  1.0, 0.0)
  - (-1.0,  1.0, 0.0)
- Material: Base_DarkGray

2) Pedestal Sphere
- Name: Pedestal_Sphere
- Type: UV Sphere (or preferred sphere primitive)
- Location (translation): (0.000, 0.000, 1.000)  <-- center positioned 1.0 unit above plane
- Rotation (Euler XYZ, degrees): (0.000, 0.000, 0.000)
- Scale: (0.500, 0.500, 0.500) suggested (optional) OR leave uniform scale (1.0) depending on desired pedestal size. Note: the spec requires the center at z=1.000; choose scale such that sphere visually sits above plane (example scale 0.5 yields radius 0.5 and bottom at z=0.5).
- Suggested sphere parameters (for modeling reproducibility): Segments: 32, Rings: 16 (or equivalent tessellation to produce a smooth sphere)
- Material: Sphere_Orange

Materials

1) Base_DarkGray
- Name: Base_DarkGray
- Shader: PBR Principled / Metallic-Roughness
- Albedo / Base Color: Hex #2f2f2f (RGB 47,47,47)
- Roughness: 0.6
- Metallic: 0.0
- Emission: none
- Normal map: none by default
- Texture files: none (if a texture is later added, include texture path in the export_manifest section below)

2) Sphere_Orange
- Name: Sphere_Orange
- Shader: PBR Principled / Metallic-Roughness
- Albedo / Base Color: Hex #ff8c00 (RGB 255,140,0)
- Roughness: 0.4
- Metallic: 0.0
- Emission: none
- Normal map: none by default
- Texture files: none (see export_manifest if added)

Export Settings (Primary deliverable)

- Format: Wavefront OBJ
- Export features required:
  - Export normals (vertex normals) -> include in OBJ (vn lines)
  - Export UV coordinates -> include in OBJ (vt lines)
  - Triangulate faces -> ensure all faces are triangles in the exported OBJ
  - Include MTL file -> write an accompanying .mtl file and reference it from the .obj
  - Include material names in the exported data so objects reference Base_DarkGray and Sphere_Orange
- Export path (absolute): /tmp/export/pedestal.obj
- Companion MTL path (auto): /tmp/export/pedestal.mtl
- Texture paths: None by default. If textures are later added, embed texture file references in the MTL with absolute or relative paths. Example texture path placeholder (not used now): /tmp/export/textures/sphere_albedo.png
- OBJ export notes:
  - The OBJ will bake geometry positions; transforms must be applied (object transforms applied to mesh data) or the exporter should export with transforms applied so vertex positions reflect the specified translations/scales.
  - Recommended: "Apply Modifiers and Export Transformed Meshes" (Blender: select "Apply Modifiers" and enable "Include Object Transform" / "Apply Object Transform" depending on exporter add-on) so OBJ vertex positions are in world space.

Blender Render Settings (for reference renders)

- Render engine: Cycles or Eevee (choose based on speed/quality needs). This spec does not require a specific engine; ensure material matches PBR when switching engines.
- Resolution: 1280 x 720 (width x height)
- Output format: PNG (RGBA or RGB as preferred)
- Output path (relative to project or absolute): outputs/blender_render_1280x720.png
  - If running from project root (/root/agent-playground-designer), save to: /root/agent-playground-designer/outputs/blender_render_1280x720.png
- Recommended render settings for consistency:
  - Samples: 64 (Eevee: use default with soft shadows enabled; Cycles: 64–128 depending on noise tolerance)
  - Color management: sRGB
  - Ensure the camera frames the sphere centered and slightly above the plane, with the sphere centered in the image.

File and Folder Layout (expected after export/render)

- /tmp/export/pedestal.obj             (primary OBJ export)
- /tmp/export/pedestal.mtl             (material declarations)
- /tmp/export/textures/                (optional folder if textures are created later)
- /root/agent-playground-designer/outputs/blender_render_1280x720.png  (reference render PNG)

Verification and QA Checks

Before concluding the export, perform the following checks. These are written as commands or logical checks you can run manually on the host where files are accessible. Do NOT assume scp or remote transfer; verification is local file checks.

1) File existence
- Check OBJ exists:
  - test -f /tmp/export/pedestal.obj && echo "OK: OBJ exists" || echo "MISSING: /tmp/export/pedestal.obj"
- Check MTL exists:
  - test -f /tmp/export/pedestal.mtl && echo "OK: MTL exists" || echo "MISSING: /tmp/export/pedestal.mtl"
- Check render PNG exists:
  - test -f /root/agent-playground-designer/outputs/blender_render_1280x720.png && echo "OK: render exists" || echo "MISSING: render file"

2) OBJ content: object group / object names
- OBJ should contain object/group declarations matching the scene names. Verify with grep:
  - grep -e "^o Base_Plane" -n /tmp/export/pedestal.obj
  - grep -e "^o Pedestal_Sphere" -n /tmp/export/pedestal.obj
- Expected: there should be at least one line 'o Base_Plane' and one line 'o Pedestal_Sphere'. If using 'g' groups, search for those too.

3) OBJ content: vertex (v) position checks for transforms
- The exported vertex coordinates are world-space positions if transforms were applied. Use the below checks as guidelines.

- Base_Plane expected geometry (vertex lines should include z=0.0 for the plane corners). Example checks (approximate):
  - grep "^v " /tmp/export/pedestal.obj | awk '{print $2, $3, $4}' | grep " 0$" - this will match vertices with z coordinate exactly 0.0 (note: floating precision may vary; grep for values near 0.0 or 0.000)
  - Alternatively, inspect the first few vertex lines and look for entries with z coordinate close to 0.0.
- Pedestal_Sphere expected geometry: all sphere vertex z coordinates should be near 1.0 +/- radius. Check center of mass approximate by averaging vertices (simple Python snippet):
  - python3 - <<'PY'
import sys
from statistics import mean
vs=[]
with open('/tmp/export/pedestal.obj') as f:
    for line in f:
        if line.startswith('v '):
            _,x,y,z = line.split()[:4]
            vs.append((float(x),float(y),float(z)))
if not vs:
    sys.exit('no vertices')
mx = mean([v[0] for v in vs])
my = mean([v[1] for v in vs])
mz = mean([v[2] for v in vs])
print('avg vertex pos:',mx,my,mz)
PY
  - Expected average Z (mz) will be between ~0.5 and ~1.0 depending on how vertex list mixes plane and sphere vertices. To locate sphere-only vertices, filter by object groups or compare vertex ranges. A simpler targeted check: locate 'o Pedestal_Sphere' in the OBJ and inspect the vertex/face block following it.

4) MTL content
- Open /tmp/export/pedestal.mtl and verify it contains the expected material names:
  - grep -E "^newmtl Base_DarkGray|^newmtl Sphere_Orange" /tmp/export/pedestal.mtl
- Verify that newmtl entries reference map_Kd (diffuse texture) only if a texture exists. Since no textures are specified now, map_Kd should be absent (or present with a placeholder if added intentionally).

5) Verification of normals and UVs in OBJ
- OBJ should contain lines beginning with "vn " (vertex normals) and "vt " (vertex UVs). Quick checks:
  - grep -m 1 "^vn " /tmp/export/pedestal.obj && echo "Normals present" || echo "Missing normals"
  - grep -m 1 "^vt " /tmp/export/pedestal.obj && echo "UVs present" || echo "Missing UVs"

6) Triangulation check
- Because faces are triangulated, every face entry (lines starting with 'f ') should contain exactly 3 vertex indices. Example check:
  - awk '/^f /{if(NF!=4) print "non-tri face",$0}' /tmp/export/pedestal.obj
  - Explanation: The OBJ face line has the form "f v1/vt1/vn1 v2/vt2/vn2 v3/vt3/vn3" which splits into 4 fields in awk (the 'f' plus three vertex groups). If any face has more than 3 vertices it will be flagged.

Expected Vertex Count Estimate (for QA planning)

- Base Plane (quad): 4 unique vertices (v lines) if created as a single quad. After triangulation, faces: 2 triangles.
- Pedestal Sphere (typical UV sphere tessellation):
  - Low detail sphere (segments 16, rings 8): ~130-300 vertices
  - Medium detail (segments 32, rings 16): ~600-1200 vertices
  - High detail (segments 64, rings 32): multiple thousands
- Combined scene vertex count estimate (OBJ v lines): commonly in the range 500 - 2000 depending on sphere tessellation. Use the following heuristic to check:
  - wc -l /tmp/export/pedestal.obj | grep -E "^([0-9]+)" and count lines starting with 'v ' specifically:
    - grep "^v " /tmp/export/pedestal.obj | wc -l

Example: If using a medium-detail sphere (32x16) + 4-plane vertices: expect roughly 600–1200 'v ' lines.

Export Manifest (for record)

- OBJ: /tmp/export/pedestal.obj
- MTL: /tmp/export/pedestal.mtl
- Render PNG: /root/agent-playground-designer/outputs/blender_render_1280x720.png
- Textures (none by default)

Modeling & Export Hints / Best Practices

- Apply object transforms before export, or use an exporter option that bakes transforms into vertex positions.
- Use the exact material names given to avoid mismatch: Base_DarkGray and Sphere_Orange. Set the PBR properties to the numeric values above.
- Triangulate prior to export or enable triangulation in the exporter settings.
- Keep UVs consistent and non-overlapping for the sphere if texturing later.

Acceptance / Sign-off Checklist (for reviewer)

- [ ] scene_spec.md present at project_root/specs/scene_spec.md
- [ ] /tmp/export/pedestal.obj specified and generated
- [ ] /tmp/export/pedestal.mtl specified and generated
- [ ] outputs/blender_render_1280x720.png specified and generated
- [ ] OBJ contains 'o Base_Plane' and 'o Pedestal_Sphere'
- [ ] OBJ contains 'vn' and 'vt' lines
- [ ] Faces in OBJ are triangulated (3 indices per face)
- [ ] MTL contains newmtl entries for Base_DarkGray and Sphere_Orange

Notes

- This specification intentionally avoids embedding texture files and avoids any network transfer method (scp). It focuses on local file exports and verification checks.
- If a different exporter is used that produces different whitespace or ordering, the verification checks that search for key markers (o, v, vt, vn, newmtl, map_Kd) remain valid.

End of specification
