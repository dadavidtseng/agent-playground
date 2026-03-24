# PedestalCubeScene — Scene Specification

Overview

This document defines the PedestalCubeScene: a simple, engine-agnostic scene containing a central cube (PedestalCube) and an optional Pedestal. Transforms are kept simple (position, rotation, scale) and there are no animations or external asset pipelines.

Entities

- PedestalCube (required)
  - type: "Cube"
  - position: centered above the pedestal
  - rotation: small Y rotation for visual interest
  - scale: modest uniform scale
  - material.color: uses the palette accent color by default

- Pedestal (optional)
  - type: "Pedestal"
  - position: origin (0,0,0)
  - rotation: (0,0,0)
  - scale: wider, shorter base
  - material.color: uses the palette primary color by default

Palette

A simple 3-color palette in sRGB hex (#RRGGBB) format:
- primary: #2E86AB
- accent:  #F2A541
- highlight: #D7263D

Note: The Pedestal entity is optional. If omitted, the PedestalCube should be positioned at ground level (y = 0) or as your engine convention requires.

JSON Schema

The following JSON Schema can be used to validate machine-readable scene snippets for this spec:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PedestalCubeScene",
  "type": "object",
  "required": ["sceneName", "entities", "palette"],
  "additionalProperties": false,
  "properties": {
    "sceneName": { "type": "string" },
    "palette": {
      "type": "object",
      "required": ["primary", "accent", "highlight"],
      "additionalProperties": false,
      "properties": {
        "primary": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "accent": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" },
        "highlight": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" }
      }
    },
    "entities": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["name", "type", "position", "rotation", "scale", "material"],
        "additionalProperties": false,
        "properties": {
          "name": { "type": "string" },
          "type": { "type": "string" },
          "position": {
            "type": "array",
            "items": { "type": "number" },
            "minItems": 3,
            "maxItems": 3
          },
          "rotation": {
            "type": "array",
            "items": { "type": "number" },
            "minItems": 3,
            "maxItems": 3
          },
          "scale": {
            "type": "array",
            "items": { "type": "number" },
            "minItems": 3,
            "maxItems": 3
          },
          "material": {
            "type": "object",
            "required": ["color"],
            "additionalProperties": false,
            "properties": {
              "color": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" }
            }
          }
        }
      }
    }
  }
}
```

Sample JSON Snippet

Below is a machine-readable JSON example that follows the above schema and matches the human-readable fields in this document.

```json
{
  "sceneName": "PedestalCubeScene",
  "palette": {
    "primary": "#2E86AB",
    "accent": "#F2A541",
    "highlight": "#D7263D"
  },
  "entities": [
    {
      "name": "Pedestal",
      "type": "Pedestal",
      "position": [0.0, 0.0, 0.0],
      "rotation": [0.0, 0.0, 0.0],
      "scale": [1.2, 0.5, 1.2],
      "material": { "color": "#2E86AB" }
    },
    {
      "name": "PedestalCube",
      "type": "Cube",
      "position": [0.0, 0.85, 0.0],
      "rotation": [0.0, 30.0, 0.0],
      "scale": [0.6, 0.6, 0.6],
      "material": { "color": "#F2A541" }
    }
  ]
}
```

Validation Notes

- The included JSON Schema enforces that colors are valid 6-digit hex strings with a leading '#'.
- Keep transforms simple: positions are 3-number arrays (x, y, z), rotations are Euler angles (degrees), and scales are 3-number arrays.
- If you choose to omit the Pedestal entity, update the PedestalCube.position.y accordingly (e.g., y = 0.0 for ground contact).

End of specification.
