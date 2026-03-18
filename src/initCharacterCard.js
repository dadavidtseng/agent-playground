// initCharacterCard.js
// Framework-agnostic helper to initialize a character card object

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function normalizeStats(stats) {
  const out = {};
  if (!stats || typeof stats !== 'object') return out;
  for (const k of Object.keys(stats)) {
    const v = stats[k];
    out[k] = typeof v === 'number' ? v : Number(v) || 0;
  }
  return out;
}

function initCharacterCard(data) {
  if (!data || typeof data !== 'object') throw new Error('data object required');
  const card = {
    id: String(data.id || data.charId || data.CHAR_ID || `char_${Date.now()}`),
    name: String(data.name || data.charName || data.CHAR_NAME || 'Unnamed'),
    level: Number.isFinite(Number(data.level)) ? Number(data.level) : 1,
    hp: Number.isFinite(Number(data.hp)) ? Number(data.hp) : 0,
    mp: Number.isFinite(Number(data.mp)) ? Number(data.mp) : 0,
    stats: normalizeStats(data.stats || data.STATS || {}),
    createdAt: new Date().toISOString(),
    meta: deepClone(data.meta || {})
  };
  return card;
}

module.exports = { initCharacterCard };
