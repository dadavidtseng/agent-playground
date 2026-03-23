```yaml
# Machine- and human-readable scene specification for Pedestal Cube
scene_name: "PedestalCubeScene"
position: [0, 0, 0]
size: 1
primary_color_hex: "#4A90E2"
complementary_colors:
  - "#E28A4A"
  - "#4AE2A8"
  - "#D24AE2"
pedestal:
  material: "marble"
  height: 0.25
  offset: [0, -0.625, 0]
```

# Notes
- position is a 3-number array [x, y, z] (meters)
- size is edge length in meters (default 1)
- color values use hex format #RRGGBB
- pedestal.offset is relative translation from the cube center to the pedestal top center
