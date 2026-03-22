# PedestalCube

## Object name
PedestalCube

## Transform
- Position: [0,0,0]
- Rotation: [0,0,0]
- Scale: [1,1,1]

## Color palette
- Primary: #1E90FF
- Accent:  #FFD700
- Highlight: #FF6F61

## Pedestal description
- Height: 0.5 units
- Material: matte stone (e.g., painted concrete)

(If no pedestal is required, write: none)

## Materials / Textures notes
- Cube: flat, low-specular diffuse finish (non-metallic)
- Pedestal: rough matte stone texture, slight micro-roughness
- Avoid high reflectivity or emissive materials so colors remain true under neutral lighting

## Verification steps
1. Place the cube at the scene origin and confirm the Transform values are exactly:
   - Position: [0,0,0]
   - Rotation: [0,0,0]
   - Scale: [1,1,1]
2. Visually confirm the cube is centered on the pedestal top and sits flush (no penetration or gap).
3. Confirm the cube color matches the Primary hex: #1E90FF.
   - Use an in-editor color picker or a screen color-sampling tool to sample the cube surface and compare the hex value.
4. Verify Accent and Highlight colors (#FFD700 and #FF6F61) are available in the scene palette for UI overlays or small details.
5. Check materials under neutral lighting:
   - Cube should appear flat/non-metallic with no strong specular highlights.
   - Pedestal should show a rough matte finish and not reflect environment strongly.
6. Optional: Measure pedestal height relative to cube (recommended 0.5 units) to ensure intended proportions.

## Notes
- This specification is engine-agnostic and intentionally omits animation and engine-specific implementation details.

## Recommended filename
specs/PedestalCube_spec.md
