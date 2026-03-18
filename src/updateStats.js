// updateStats.js
// Apply deltas to an existing character card. Supports additive and absolute modes.

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function applyStatDelta(currentStats, deltaStats, mode) {
  const out = clone(currentStats || {});
  if (!deltaStats) return out;
  for (const k of Object.keys(deltaStats)) {
    const d = deltaStats[k];
    const cur = typeof out[k] === 'number' ? out[k] : 0;
    if (mode === 'absolute') {
      out[k] = typeof d === 'number' ? d : Number(d) || 0;
    } else {
      // additive
      out[k] = cur + (typeof d === 'number' ? d : Number(d) || 0);
    }
  }
  return out;
}

function updateStats(card, delta, options) {
  if (!card || typeof card !== 'object') throw new Error('card object required');
  if (!delta || typeof delta !== 'object') throw new Error('delta object required');
  const mode = (options && options.mode) === 'absolute' ? 'absolute' : 'add';
  const out = clone(card);

  if ('hp' in delta) {
    const hv = Number(delta.hp);
    out.hp = mode === 'absolute' ? (Number.isFinite(hv) ? hv : 0) : ( (typeof out.hp === 'number' ? out.hp : Number(out.hp)||0) + (Number.isFinite(hv) ? hv : 0) );
  }
  if ('mp' in delta) {
    const mv = Number(delta.mp);
    out.mp = mode === 'absolute' ? (Number.isFinite(mv) ? mv : 0) : ( (typeof out.mp === 'number' ? out.mp : Number(out.mp)||0) + (Number.isFinite(mv) ? mv : 0) );
  }
  if ('level' in delta) {
    const lv = Number(delta.level);
    out.level = mode === 'absolute' ? (Number.isFinite(lv) ? lv : out.level) : ( (typeof out.level === 'number' ? out.level : Number(out.level)||0) + (Number.isFinite(lv) ? lv : 0) );
  }

  if ('stats' in delta) {
    out.stats = applyStatDelta(out.stats, delta.stats, mode);
  }

  out.updatedAt = new Date().toISOString();
  return out;
}

module.exports = { updateStats };
