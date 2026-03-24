# Scene Specification

This file contains the scene specification including a JSON snippet describing entities.

```json
{
  "entities": [
    {
      "name": "PedestalCube",
      "type": "Cube",
      "transform": {
        "position": [0, 0, 0],
        "rotation": [0, 0, 0, 1],
        "scale": [1, 1, 1]
      },
      "material": {
        "color": "#1E90FF"
      }
    },
    {
      "name": "Pedestal",
      "type": "Cylinder",
      "transform": {
        "position": [0, -0.5, 0],
        "rotation": [0, 0, 0, 1],
        "scale": [1, 0.5, 1]
      },
      "material": {
        "color": "#CCCCCC"
      }
    }
  ]
}
```
