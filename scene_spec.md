# Scene Specification: pedestal_cube_scene

This document describes a minimal, engine-agnostic scene containing a pedestal and a cube. It defines exact transforms, a color palette (hex codes), material property ranges, fallback DaemonAgent parameter names (aliases) for common APIs, and explicit verification steps including a numeric color tolerance.

---

sceneName: "pedestal_cube_scene"

objects:
  - name: "pedestal"
    type: "box"
    description: "Low rectangular pedestal serving as a base for the cube."
    transform:
      position: [0.0, -0.5, 0.0]    # X, Y, Z in scene units
      rotation: [0.0, 0.0, 0.0]     # Euler degrees (pitch, yaw, roll) - defaulted to zero
      scale:    [1.0, 0.2, 1.0]     # X, Y, Z scale
    color_role: "secondary"
    material:
      # Design ranges and recommended defaults
      metallic_range: [0.1, 0.3]    # allowed range; engine should pick a value in this interval
      roughness_range: [0.4, 0.6]
      default_metallic: 0.15        # recommended default (within range)
      default_roughness: 0.5       # recommended default (within range)
      # Example runtime assignment consistent with design guidance
      example_assignment:
        baseColorHex: "#777777"
        metallic: 0.15
        roughness: 0.5
      # Alternate/proposed assignment from an integration variant (preserved for reference)
      alternate_assignment:
        baseColorHex: "#777777"
        metallic: 0.0
        roughness: 0.9

  - name: "cube"
    type: "box"                    # cube represented as a unit box scaled equally; "cube" primitive alias preserved below
    primitive_aliases:
      - "cube"
    description: "Primary object placed on top of the pedestal."
    transform:
      position: [0.0, 0.0, 0.0]
      rotation: [0.0, 0.0, 0.0]
      scale:    [1.0, 1.0, 1.0]
    color_role: "primary"
    material:
      metallic_range: [0.1, 0.3]
      roughness_range: [0.4, 0.6]
      default_metallic: 0.2
      default_roughness: 0.45
      # Example runtime assignment (from an integration variant) preserved
      example_assignment:
        baseColorHex: "#FF5733"  # primary hex for verification (alternate to the design palette)
        metallic: 0.1
        roughness: 0.5

colors:
  # Palette - hex codes are required for deterministic verification. Usage notes indicate intended application.
  primary: "#2B6CB0"   # usage: main cube color (muted saturated blue)
  secondary: "#F6E05E" # usage: pedestal color (warm, desaturated yellow/gold)
  accent: "#E53E3E"    # usage: small decorative highlights, UI accents, or rim-lighting (vibrant red)

  notes:
    - "Primary is intended for the most visually important surface (cube)."
    - "Secondary is intended for supporting geometry (pedestal)."
    - "Accent is reserved for small details, labels, or light tint overlays—avoid full-surface use unless explicitly desired."

materials:
  # Numeric ranges provided to allow different renderers to choose values while remaining within design boundaries.
  metallic:
    allowed_range: [0.1, 0.3]
    guidance: "Prefer a subtle metallic sheen; do not exceed 0.3 or go below 0.1."
  roughness:
    allowed_range: [0.4, 0.6]
    guidance: "A mid-range roughness produces soft speculars that read well in neutral lighting."

fallback_daemonagent_parameters:
  # Common aliases to support various DaemonAgent APIs. These are engine-agnostic parameter/command names the integrator may implement.
  spawn_object:
    - "spawn_box"
    - "spawn_cube"
    - "create_box"
    - "create_cube"
    - "add_mesh_box"
  transform_commands:
    - "set_transform"
    - "transform"
    - "set_position"
    - "set_rotation"
    - "set_scale"
    - "translate"
    - "rotate"
    - "scale"
  material_commands:
    - "set_material"
    - "apply_material"
    - "material_update"
    - "set_metallic"
    - "set_roughness"
  color_commands:
    - "set_color"
    - "apply_color"
    - "set_albedo"
    - "set_diffuse"
  convenience_aliases:
    - "spawn"                # generic spawn command
    - "create"               # generic create command
    - "set_property"         # generic property setter

verification:
  # Explicit instructions for the programmer/integrator to verify the scene is correct.
  checklist:
    - "sceneName must equal the string: \"pedestal_cube_scene\""
    - "There must be exactly two named objects: 'pedestal' and 'cube'."
    - "Each object 'type' must be 'box' (engine-agnostic box/cube primitive)."
    - "Transforms must match exactly (numeric arrays):"
      - "pedestal.position == [0.0, -0.5, 0.0]"
      - "pedestal.scale == [1.0, 0.2, 1.0]"
      - "cube.position == [0.0, 0.0, 0.0]"
      - "cube.scale == [1.0, 1.0, 1.0]"
    - "Rotation arrays may be present; if absent, assume [0.0, 0.0, 0.0]."
    - "Color fields must be valid 7-character hex strings (e.g., '#RRGGBB')."
    - "Material numeric values assigned at runtime must fall within the specified ranges: metallic in [0.1,0.3], roughness in [0.4,0.6]."

  color_tolerance:
    description: "Numeric tolerance for color verification between design hex codes and rendered/sampled color values. Use RGB delta per channel."
    rule: "For each color (primary, secondary, accent), convert both design hex and sampled color to 8-bit RGB. The absolute per-channel difference (|R_design - R_sample|, |G_design - G_sample|, |B_design - B_sample|) must each be <= 10."
    numeric_value: 10

  visual_verification_steps:
    - "Run the scene in the target environment or export a screenshot containing both objects centered similarly to the spec."
    - "Attach the screenshot or a run log that includes object transforms and material values."
    - "If automated: sample the pixel color from a region that clearly shows the object's diffuse/albedo (avoid specular highlights). Compare sampled RGB to design hex using the color_tolerance rule."
    - "If manual: provide the screenshot and a short note confirming the objects' positions/scale match the numeric values above and that materials are within range."

  required_artifacts:
    - "screenshot (PNG or JPG) showing the pedestal and cube with neutral lighting"
    - "or run log (plain text) showing for each object: name, type, position, scale, material.metallic, material.roughness, color hex applied"

notes_and_constraints:
  - "This specification is intentionally engine-agnostic: do not include engine-specific code or binary assets."
  - "When implementing, prefer exact numeric values for transforms to avoid ambiguity."
  - "If a renderer does not support per-object metallic/roughness ranges, choose values close to the recommended defaults but inside the allowed ranges."
  - "This file is engine-agnostic. Positions are in meters. Colors are hex."

---

Prepared by: Designer Agent (KĀDI multi-agent system)
Task ID: 3460cb96-5db4-45ee-a9cd-4a962ccfd2fd