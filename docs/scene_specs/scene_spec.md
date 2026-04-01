# Scene: Pedestal Cube Display

Version: 1.0
Lead Designer Agent Approval: APPROVED

---

## Overview
A minimal display scene using engine primitives only. The centerpiece is a unit cube precisely positioned at world origin and placed on a simple pedestal. The scene is intentionally minimal — no external assets, only built-in geometry, materials, and lights.

Scene purpose: presentation / lighting and camera composition test for a single object.

---

## Scene Elements

- Scene name: Pedestal Cube Display

### Cube
- Type: unit cube (engine primitive)
- World position (exact): [0, 0, 0]
- Size: 1.0 unit (width=1, height=1, depth=1)
- Primary color (hex): #4CAF50
- Material: physically-based material with default roughness=0.45, metalness=0.0 (subtle matte)
- Spawn parameters (exact):
  - position: { x: 0, y: 0, z: 0 }
  - rotation: { x: 0, y: 0, z: 0 }
  - scale: { x: 1, y: 1, z: 1 }
  - color: "#4CAF50"

### Pedestal
- Geometry: cylinder (engine primitive) — short pedestal to ground the cube
- Exact transform (recommended):
  - position: { x: 0, y: -0.6, z: 0 }
  - rotation: { x: 0, y: 0, z: 0 }
  - scale: { x: 0.6, y: 0.4, z: 0.6 }  // radius ~0.6, height ~0.8 (centered so top surface is at y = -0.2)
- Material color (hex): #2E2E2E (neutral dark grey)
- Material: low-metalness, roughness ~0.6

Notes on positioning: the cube center sits at world y = 0. With the pedestal positioned at y = -0.6 and scaled as above, the cube will visually sit slightly above the pedestal top; adjust pedestal scale.y to raise/lower the top surface so cube sits flush if engine places primitives from base instead of center.

---

## Camera
- Example camera parameters (recommended for a balanced portrait of the cube):
  - position: { x: 0, y: 2.5, z: -4 }
  - lookAt / target: { x: 0, y: 0, z: 0 }
  - FOV: 55 degrees (recommended range: 50–60)
  - projection: perspective
  - near clip: 0.1, far clip: 1000

Rationale: this framing yields a slightly elevated, frontal view with enough negative z distance to include the pedestal and allow room for rim/backlights.

---

## Lighting
Keep lighting simple and neutral for presentation tests.

1) Main directional (key) light
- Type: directional
- Direction: normalized vector pointing from (0.5, 1.0, -0.5) toward origin (i.e., down-and-front-right)
- Intensity: 1.0 (or 100% depending on engine units)
- Color: #FFFFFF (neutral white)
- Shadow: enabled, soft shadows recommended

2) Fill light
- Type: ambient or hemisphere (engine dependent) or a second low-intensity directional
- Direction (if directional): from (-0.5, 0.5, 0.5)
- Intensity: 0.25–0.4
- Color: #FFFFFF (slightly warm tint optional, e.g., #FFF8EE)

3) Optional rim/back light
- Type: directional or point
- Position/direction: from (0, 1.5, 2.5) toward the cube's rear edge
- Intensity: 0.2–0.5
- Color (accent): #FFC107 (warm amber) — used sparingly to create separation

Lighting notes: keep contrasts soft for product-like presentation. Tweak intensities for your engine's unit system.

---

## Color Palette
- Primary: #4CAF50 (cube) — vivid, mid-saturated green used as the object color
- Secondary: #2E2E2E (pedestal / neutrals) — dark neutral for base
- Accent: #FFC107 (rim light / small accents) — warm amber for visual separation and highlights

Restrictions: only these hex codes should be used for the specified primitives. No external textures or image maps.

---

## Spawn Parameters (exact)
Provide these as a copy-pasteable JSON snippet for development and automated spawn scripts.

Cube spawn (exact JSON):

{
  "type": "cube",
  "id": "display-cube-001",
  "transform": {
    "position": { "x": 0, "y": 0, "z": 0 },
    "rotation": { "x": 0, "y": 0, "z": 0 },
    "scale": { "x": 1, "y": 1, "z": 1 }
  },
  "material": {
    "color": "#4CAF50",
    "metalness": 0.0,
    "roughness": 0.45
  }
}

Pedestal spawn (exact JSON):

{
  "type": "cylinder",
  "id": "display-pedestal-001",
  "transform": {
    "position": { "x": 0, "y": -0.6, "z": 0 },
    "rotation": { "x": 0, "y": 0, "z": 0 },
    "scale": { "x": 0.6, "y": 0.4, "z": 0.6 }
  },
  "material": {
    "color": "#2E2E2E",
    "metalness": 0.0,
    "roughness": 0.6
  }
}

Camera spawn (example JSON):

{
  "type": "camera",
  "id": "display-camera-001",
  "transform": {
    "position": { "x": 0, "y": 2.5, "z": -4 },
    "rotation": null
  },
  "settings": {
    "lookAt": { "x": 0, "y": 0, "z": 0 },
    "fov": 55
  }
}

Lighting spawn (example JSON):

[
  {
    "type": "directional",
    "id": "key-light-001",
    "direction": { "x": 0.5, "y": -1.0, "z": 0.5 },
    "color": "#FFFFFF",
    "intensity": 1.0,
    "shadows": true
  },
  {
    "type": "directional",
    "id": "fill-light-001",
    "direction": { "x": -0.5, "y": -0.5, "z": -0.5 },
    "color": "#FFF8EE",
    "intensity": 0.3
  },
  {
    "type": "directional",
    "id": "rim-light-001",
    "direction": { "x": 0, "y": -0.5, "z": -1.0 },
    "color": "#FFC107",
    "intensity": 0.25
  }
]

---

## Runbook — Re-run spawn in dev environment
Target audience: developer or designer re-populating the scene in a local dev environment or editor console.

1) Open the dev environment or engine editor for the project.
2) Ensure the scene is empty or create a new scene named "Pedestal Cube Display".
3) Use the engine's primitive spawn API (or console) to create the objects. Example JS pseudo-commands:

// Spawn cube
spawnPrimitive({
  type: 'cube',
  id: 'display-cube-001',
  position: { x:0, y:0, z:0 },
  scale: { x:1, y:1, z:1 },
  material: { color: '#4CAF50', metalness: 0.0, roughness: 0.45 }
});

// Spawn pedestal
spawnPrimitive({
  type: 'cylinder',
  id: 'display-pedestal-001',
  position: { x:0, y:-0.6, z:0 },
  scale: { x:0.6, y:0.4, z:0.6 },
  material: { color: '#2E2E2E', metalness: 0.0, roughness: 0.6 }
});

// Spawn camera
setCamera({
  id: 'display-camera-001',
  position: { x:0, y:2.5, z:-4 },
  lookAt: { x:0, y:0, z:0 },
  fov: 55
});

// Spawn lights (example)
spawnLight({ type: 'directional', id: 'key-light-001', direction: { x:0.5, y:-1, z:0.5 }, color: '#FFFFFF', intensity: 1.0, shadows: true });
spawnLight({ type: 'directional', id: 'fill-light-001', direction: { x:-0.5, y:-0.5, z:-0.5 }, color: '#FFF8EE', intensity: 0.3 });
spawnLight({ type: 'directional', id: 'rim-light-001', direction: { x:0, y:-0.5, z:-1.0 }, color: '#FFC107', intensity: 0.25 });

4) Verify placement: confirm cube center at world [0,0,0] and pedestal visually supports the cube. Adjust pedestal scale.y if engine aligns cylinder base to world y=0.
5) Tweak camera FOV or position to match desired framing; recommended FOV=55 as a starting point.
6) Save scene/preset if supported by the editor.

Notes:
- spawnPrimitive and spawnLight are placeholder API calls; replace them with the engine's actual functions or editor commands. The JSON snippets above are intended to be converted to engine-specific calls.

---

## Deliverables Checklist
- [x] docs/scene_specs/scene_spec.md created
- [x] Cube defined with exact world position [0, 0, 0]
- [x] Primary color hex included: #4CAF50
- [x] Pedestal geometry and position provided (#2E2E2E)
- [x] Camera framing provided (pos: 0,2.5,-4; lookAt: 0,0,0; FOV: 55)
- [x] Lighting plan (key, fill, optional rim) provided
- [x] Spawn parameters included (copy-paste JSON)
- [x] Runbook for re-running spawn in dev environment included
- [x] Lead Designer Agent Approval: APPROVED

---

Lead Designer Agent: APPROVED
Signature: Lead Designer Agent (automated approval flag)
Date: 2026-04-01
