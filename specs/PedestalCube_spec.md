# PedestalCube Scene Specification

- object_name: "PedestalCube"

## Transform
- position: [0, 0, 0]
- rotation: [0, 0, 0]
- scale: [1, 1, 1]

## Color Palette
- Primary: #4F6D7A  (applies to cube surface)
- Accent:  #D98A3C
- Highlight: #F2E8C9

## Pedestal
- height: 0.5
- dimensions: diameter 0.6
- material: matte stone (rough, non-reflective)

## Materials / Texture Notes
- Cube: flat, non-metallic painted surface. Matte finish, minimal specular, slight micro-roughness. No normal detail required — keep surface clean for color emphasis.
- Pedestal: rough matte stone. Low reflectivity, subtle grain/noise normal map to read silhouette under lighting. Avoid glossy finishes.

## Verification Steps
1. In the engine/editor, confirm an entity named "PedestalCube" (or spawn name following project naming conventions, e.g., "PedestalCube_01") is present in the scene hierarchy.
2. Select the entity and verify its Transform values:
   - Position should be exactly [0, 0, 0]
   - Rotation should be [0, 0, 0]
   - Scale should be [1, 1, 1]
3. Inspect the mesh components:
   - Cube mesh uses the Primary color (#4F6D7A) as its base albedo/diffuse color and is set to a matte/non-metallic material.
   - Pedestal mesh has height 0.5 and diameter 0.6 and uses a matte stone material with a subtle roughness/normal texture.
4. In shading view, confirm cube shows flat, even coloration (no metallic sheen). Pedestal should show grain and soft shadowing consistent with rough stone.
5. Spawn test: If the system spawns entities by type, ensure spawned entity name includes the object_name (e.g., "PedestalCube" or "PedestalCube_01").

## Files to Commit
- specs/PedestalCube_spec.md  (this file)
- Optional: design/color_tokens.json (project-wide color token file, if used)

## Notes
- Keep materials simple and performant. Prioritize clear color read at eye height and a low-height pedestal to center focus on the cube.
- This spec is intentionally minimal—suitable for handoff to environment/technical artists.
