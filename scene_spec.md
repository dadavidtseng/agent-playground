# PedestalCubeScene — Scene Specification

Overview

This document defines the PedestalCubeScene: a simple, engine-agnostic scene containing a central cube (PedestalCube) and an optional Pedestal. Transforms are kept simple (position, rotation, scale) and there are no animations or external asset pipelines.

Entities

- PedestalCube (required)
  - type: "Cube"
  - position: centered above the pedestal (or at ground level if Pedestal omitted)
  - rotation: small Y rotation for visual interest (or quaternion-based rotation if using transform.quaternion)
  - scale: modest uniform scale
  - material.color: uses the palette accent color by default

- Pedestal (optional)
  - type: "Pedestal" (or an engine-specific primitive such as "Cylinder")
  - position: origin (0,0,0)
  - rotation: (0,0,0) or quaternion (0,0,0,1)
  - scale: wider, shorter base
  - material.color: uses the palette primary color by default

Palette

A simple 3-color palette in sRGB hex (#RRGGBB) format (defaults):

- primary: #2E86AB
- accent:  #F2A541
- highlight: #D7263D

Note: Example snippets in this document may use alternate colors (e.g., #1E90FF, #CCCCCC) to demonstrate flexibility.

Note: The Pedestal entity is optional. If omitted, the PedestalCube should be positioned at ground level (y = 0) or as your engine convention requires.

JSON Schema

The following JSON Schema can be used to validate machine-readable scene snippets for this spec. The schema accepts two common entity transform shapes:
- Flat position/rotation/scale arrays (Euler rotation as 3-number array).
- A nested transform object with position, rotation (3-number Euler or 4-number quaternion), and scale.

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
        "required": ["name", "type", "material"],
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
            "anyOf": [
              { "minItems": 3, "maxItems": 3 },
              { "minItems": 4, "maxItems": 4 }
            ]
          },
          "scale": {
            "type": "array",
            "items": { "type": "number" },
            "minItems": 3,
            "maxItems": 3
          },
          "transform": {
            "type": "object",
            "required": ["position", "rotation", "scale"],
            "additionalProperties": false,
            "properties": {
              "position": {
                "type": "array",
                "items": { "type": "number" },
                "minItems": 3,
                "maxItems": 3
              },
              "rotation": {
                "type": "array",
                "items": { "type": "number" },
                "anyOf": [
                  { "minItems": 3, "maxItems": 3 },
                  { "minItems": 4, "maxItems": 4 }
                ]
              },
              "scale": {
                "type": "array",
                "items": { "type": "number" },
                "minItems": 3,
                "maxItems": 3
              }
            }
          },
          "material": {
            "type": "object",
            "required": ["color"],
            "additionalProperties": false,
            "properties": {
              "color": { "type": "string", "pattern": "^#[0-9A-Fa-f]{6}$" }
            }
          }
        },
        "anyOf": [
          { "required": ["position", "rotation", "scale"] },
          { "required": ["transform"] }
        ]
      }
    }
  }
}
```

Sample JSON Snippets

Below are machine-readable JSON examples that follow the above schema and match the human-readable fields in this document. The first snippet uses the flat position/rotation/scale representation (Euler angles in degrees). The second snippet demonstrates a nested transform with quaternion rotation and alternative example colors/types.

Example A — flat position/rotation/scale (matches palette defaults):

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

Example B — nested transform with quaternion rotation (alternate example):

```json
{
  "sceneName": "PedestalCubeScene_Alt",
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
  ],
  "palette": {
    "primary": "#2E86AB",
    "accent": "#F2A541",
    "highlight": "#D7263D"
  }
}
```

Validation Notes

- The included JSON Schema enforces that colors are valid 6-digit hex strings with a leading '#'.
- The schema accepts either:
  - Separate position/rotation/scale arrays (rotation as 3-number Euler), or
  - A nested transform object containing position, rotation (3-number Euler or 4-number quaternion), and scale.
- If you choose to omit the Pedestal entity, update the PedestalCube.position.y accordingly (e.g., y = 0.0 for ground contact).
- Types (e.g., "Pedestal" vs "Cylinder") and material colors in example snippets are illustrative; adapt to your engine's primitives and palette as needed.

End of specification.