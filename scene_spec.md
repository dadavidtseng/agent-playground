sceneName: "pedestal_cube_scene"

objects:
  - name: "pedestal"
    type: "box"
    transform:
      position: [0, -0.5, 0]
      rotation: [0, 0, 0]
      scale: [1, 0.2, 1]
    material:
      baseColorHex: "#777777"
      metallic: 0.0
      roughness: 0.9

  - name: "cube"
    type: "cube"
    transform:
      position: [0, 0, 0]
      rotation: [0, 0, 0]
      scale: [1, 1, 1]
    material:
      baseColorHex: "#FF5733"  # primary hex for verification
      metallic: 0.1
      roughness: 0.5

notes:
  - "This file is engine-agnostic. Positions are in meters. Colors are hex."