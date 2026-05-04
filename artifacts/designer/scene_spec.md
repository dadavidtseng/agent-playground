title: Pedestal display - machine-readable scene spec
export_format: OBJ
render_resolution: [1280, 720]

artifacts:
  spec: artifacts/designer/scene_spec.md
  export_obj: artifacts/exports/scene.obj
  render_preview: artifacts/renders/preview_1280x720.png

units: meters

scene:
  - name: base_plane
    type: plane
    position: [0, 0, 0]
    rotation: [0, 0, 0]
    scale: [10, 10, 1]  # large enough to serve as a visible base
    color: "#2f2f2f"

  - name: display_sphere
    type: sphere
    position: [0, 0, 1]
    radius: 1.0          # radius chosen so sphere center at z=1 rests on plane at z=0
    segments: 64         # suggested tessellation for smooth appearance
    color: "#ff8c00"

notes:
  - The plane is centered at coordinates (0,0,0).
  - The sphere is centered at coordinates (0,0,1) with radius 1.0 so it visibly rests on the plane.
  - Colors (hex): base #2f2f2f, sphere #ff8c00 (exact values required).
  - Export format: OBJ
  - Render resolution: 1280x720

restrictions:
  - Tool-agnostic specification. No engine- or import-specific instructions are included.
  - This file is text-only; no binary artifacts are created in this step.
