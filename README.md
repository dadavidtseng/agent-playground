KĀDI Agent Integration README

Overview

This package contains a small, framework-agnostic helper library for character-card initialization and stat updates, supporting integration into KĀDI multi-agent workflows. It includes:

- src/ (source code for initCharacterCard and updateStats)
- assets/ (small asset placeholders)
- test-checklist.md (QA test checklist)
- export-notes.md (export and delivery notes)
- src-package.zip (packaged deliverable for handoff)

Files of interest

- src/initCharacterCard.js — function to create/initialize a character card object
- src/updateStats.js — function to update stats on an existing character card
- test-checklist.md — checklist used for manual QA before handoff
- export-notes.md — notes on export format, recommended metadata, and delivery
- src-package.zip — packaged archive with src/, test-checklist.md, export-notes.md, and assets/ for handoff

Integration Instructions

1) Installation

- The package is framework-agnostic. Copy the src/ folder into your project or import individual files where required.
- No runtime dependencies are required beyond a standard JS runtime (Node.js or browser JS).

2) Token Reference

This module uses a small set of tokens for templating and runtime configuration. Treat these as keys/labels used by the integrating system:

- {{CHAR_ID}} — Unique identifier for the character card
- {{CHAR_NAME}} — Display name for the character
- {{LEVEL}} — Numeric level value
- {{HP}} — Hit points / health value
- {{MP}} — Mana / resource pool value
- {{STAT_<name>}} — Generic stat token where <name> is the stat label (e.g., STAT_STR)

Store these tokens in your configuration store or inject them at runtime when building UI or persistence objects.

3) API Usage Examples

Below are minimal, copy-pasteable examples. Paths in the examples assume you placed the provided src/ folder alongside your code.

A) initCharacterCard

// Node-style import example
const { initCharacterCard } = require('./src/initCharacterCard');

const baseData = {
  id: 'char_001',
  name: 'Aurelia',
  level: 1,
  hp: 30,
  mp: 10,
  stats: { STR: 8, DEX: 12, INT: 14 }
};

const card = initCharacterCard(baseData);
console.log('Initialized card:', card);

B) updateStats

const { updateStats } = require('./src/updateStats');

// Apply a delta object to modify stats/hp/mp/level. Deltas can be additive or absolute based on options.
const delta = { hp: -5, stats: { STR: +1 } };
const updated = updateStats(card, delta, { mode: 'add' });
console.log('Updated card:', updated);

4) Example integration flow

- On user creation or import, call initCharacterCard() to construct the canonical card object.
- Persist the returned card to your datastore.
- When receiving an effect/update, call updateStats() with the delta and persist the result.
- Use the token names above when rendering templates in UIs, or when mapping fields from external systems.

Test Checklist

See test-checklist.md included in the repository. The README references the file for quick access.

Export & Handoff Notes

See export-notes.md for details on packaging, required metadata, and delivery checklist. The src-package.zip file is included for handoff; it contains the src/ folder plus the two notes files and the assets/ placeholder folder.

Contact

If you need changes to the API or additional examples (TypeScript, browser-specific bundling snippets, or integration with a specific framework), add an issue to the repository or reach out to the maintainer.
