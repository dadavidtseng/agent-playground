/*
Script: spawn_pedestal_cube.js
Purpose: Read scene_spec.md, extract JSON snippet, validate, and call DaemonAgent spawn APIs to create entities.
Writes spawn_log.txt with created entity names, positions, and applied color hex.

Usage: node Scripts/spawn_pedestal_cube.js

Behavior:
 - Extracts the first JSON fenced block that looks like a scene spec (prefers block containing "entities").
 - Validates minimal structure and value formats (hex colors, transforms). Applies fallbacks and records warnings.
 - Attempts to call DaemonAgent.spawn(...) for each entity. If unavailable, attempts to call global spawn_cube(...) for cubes.
 - On success writes spawn_log.txt with entries: name | position | color
 - On fatal errors exits with non-zero code and prints clear messages.
*/

const fs = require('fs');
const path = require('path');

const WORKTREE_ROOT = path.join(__dirname, '..');
const SPEC_PATH = path.join(WORKTREE_ROOT, 'scene_spec.md');
const LOG_PATH = path.join(WORKTREE_ROOT, 'spawn_log.txt');

function exitWithError(msg, code = 2) {
  console.error('ERROR:', msg);
  process.exit(code);
}

function warn(msg) {
  console.warn('WARN:', msg);
}

function readSpecFile() {
  if (!fs.existsSync(SPEC_PATH)) {
    exitWithError(`scene_spec.md not found at ${SPEC_PATH}`);
  }
  return fs.readFileSync(SPEC_PATH, 'utf8');
}

function extractJsonSnippets(md) {
  // find all ```json ... ``` blocks
  const re = /```json\s*([\s\S]*?)```/gi;
  const snippets = [];
  let m;
  while ((m = re.exec(md)) !== null) {
    snippets.push(m[1].trim());
  }
  return snippets;
}

function pickBestSnippet(snippets) {
  if (!snippets || snippets.length === 0) return null;
  // Prefer the one that contains "entities"
  for (const s of snippets) {
    if (/"entities"\s*:/i.test(s)) return s;
  }
  // otherwise return first
  return snippets[0];
}

function parseJsonSafe(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    exitWithError('Failed to parse JSON snippet: ' + e.message);
  }
}

function isNumberArrayOfLength(arr, length) {
  return Array.isArray(arr) && arr.length === length && arr.every(n => typeof n === 'number' && Number.isFinite(n));
}

function normalizeTransform(transform, warnings, entityName) {
  // defaults
  const def = {
    position: [0, 0, 0],
    rotation: [0, 0, 0, 1],
    scale: [1, 1, 1]
  };
  if (!transform || typeof transform !== 'object') {
    warnings.push(`${entityName}: missing transform — using defaults`);
    return def;
  }
  const position = isNumberArrayOfLength(transform.position, 3) ? transform.position : (warnings.push(`${entityName}: invalid/missing position — using [0,0,0]`), def.position);
  const rotation = isNumberArrayOfLength(transform.rotation, 4) ? transform.rotation : (warnings.push(`${entityName}: invalid/missing rotation — using [0,0,0,1]`), def.rotation);
  const scale = isNumberArrayOfLength(transform.scale, 3) ? transform.scale : (warnings.push(`${entityName}: invalid/missing scale — using [1,1,1]`), def.scale);
  return { position, rotation, scale };
}

function validateHexColor(hex) {
  if (typeof hex !== 'string') return false;
  // strict #RRGGBB
  return /^#([0-9a-fA-F]{6})$/.test(hex);
}

async function spawnEntityWithDaemon(entity, colorHex) {
  // Try to use DaemonAgent.spawn if available
  if (typeof global.DaemonAgent === 'object' && typeof global.DaemonAgent.spawn === 'function') {
    try {
      const payload = {
        name: entity.name,
        type: entity.type,
        transform: entity.transform,
        material: { color: colorHex }
      };
      // Many DaemonAgent APIs are async; support promise
      const res = await global.DaemonAgent.spawn(payload);
      return { success: true, backend: 'DaemonAgent.spawn', response: res };
    } catch (e) {
      return { success: false, error: `DaemonAgent.spawn failed: ${e.message}` };
    }
  }

  // Fallback: if the environment exposes spawn_cube function, use it for cubes
  if ((entity.type && /cube/i.test(entity.type)) && typeof global.spawn_cube === 'function') {
    try {
      // spawn_cube expects color (name or rgb) and position
      const res = await global.spawn_cube({ color: colorHex, position: entity.transform.position });
      return { success: true, backend: 'spawn_cube', response: res };
    } catch (e) {
      return { success: false, error: `spawn_cube failed: ${e.message}` };
    }
  }

  return { success: false, error: 'No DaemonAgent.spawn or spawn_cube API available in runtime' };
}

async function main() {
  const md = readSpecFile();
  const snippets = extractJsonSnippets(md);
  if (!snippets || snippets.length === 0) exitWithError('No JSON fenced snippet found in scene_spec.md');
  const snippet = pickBestSnippet(snippets);
  if (!snippet) exitWithError('No suitable JSON snippet found in scene_spec.md');

  const spec = parseJsonSafe(snippet);

  // Minimal built-in schema validation
  if (!spec || typeof spec !== 'object') exitWithError('Spec JSON is not an object');
  if (!Array.isArray(spec.entities)) exitWithError('Spec JSON must contain an "entities" array');

  const warnings = [];
  const created = [];

  for (const ent of spec.entities) {
    if (!ent || typeof ent !== 'object') {
      warnings.push('Encountered non-object entity entry — skipping');
      continue;
    }
    const name = typeof ent.name === 'string' ? ent.name : (warnings.push('Entity missing name — skipping'), null);
    if (!name) continue;
    const type = typeof ent.type === 'string' ? ent.type : 'Unknown';

    const transform = normalizeTransform(ent.transform, warnings, name);

    // material and color
    const material = ent.material && typeof ent.material === 'object' ? ent.material : {};
    let colorHex = material.color;
    if (!validateHexColor(colorHex)) {
      warnings.push(`${name}: material.color invalid or missing — falling back to #FFFFFF`);
      colorHex = '#FFFFFF';
    }

    // Call spawn
    console.log(`Spawning ${name} (type: ${type}) at ${JSON.stringify(transform.position)} with color ${colorHex}`);
    const spawnResult = await spawnEntityWithDaemon({ name, type, transform }, colorHex);
    if (!spawnResult.success) {
      // treat as fatal
      exitWithError(`Failed to spawn entity ${name}: ${spawnResult.error}`);
    }

    created.push({ name, position: transform.position, color: colorHex, backend: spawnResult.backend });
  }

  // Write spawn_log.txt
  const headerLines = [];
  headerLines.push(`Spawn Log - ${new Date().toISOString()}`);
  if (warnings.length) {
    headerLines.push('WARNINGS:');
    for (const w of warnings) headerLines.push('- ' + w);
    headerLines.push('');
  }
  headerLines.push('CREATED ENTITIES:');
  for (const c of created) {
    headerLines.push(`${c.name} | position: ${JSON.stringify(c.position)} | color: ${c.color} | backend: ${c.backend}`);
  }

  try {
    fs.writeFileSync(LOG_PATH, headerLines.join('\n') + '\n', 'utf8');
    console.log(`Wrote spawn log to ${LOG_PATH}`);
  } catch (e) {
    exitWithError('Failed to write spawn_log.txt: ' + e.message);
  }

  console.log('Spawn completed successfully.');
  process.exit(0);
}

// Run main and catch unhandled
main().catch(err => {
  exitWithError('Unhandled exception: ' + (err && err.stack ? err.stack : String(err)), 3);
});
