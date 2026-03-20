// Lightweight tests for setStat()
// Exposed function: window.__runSetStatTests()

(function(){
  function mockSetStat(statName, value) {
    // Simple implementation that finds .stat[data-stat="name"] .stat-value and updates text
    try {
      const el = document.querySelector('.stat[data-stat="' + statName + '"] .stat-value');
      if(!el) return false;
      el.textContent = String(value);
      return true;
    } catch(e) {
      return false;
    }
  }

  async function run() {
    console.group('setStat-tests');
    const globalSetStat = window.setStat || mockSetStat;

    // Test 1: update existing stat
    console.log('Test 1: setStat updates displayed value');
    const statEl = document.querySelector('.stat[data-stat="strength"] .stat-value');
    console.assert(statEl, 'stat element exists');
    const before = statEl ? statEl.textContent : null;
    const ok = globalSetStat('strength', 8);
    console.assert(ok === true, 'setStat should return true for existing stat');
    const after = statEl.textContent;
    console.assert(after === '8', 'stat value should be updated to 8 (was ' + before + ')');
    console.log('-> before:', before, 'after:', after);

    // Test 2: calling setStat on nonexistent stat should fail gracefully
    console.log('Test 2: setStat on nonexistent stat');
    let threw = false;
    try {
      const r = globalSetStat('nonexistent-stat', 3);
      console.assert(r === false, 'setStat should return false when stat not found');
    } catch(e) { threw = true; }
    console.assert(!threw, 'setStat should not throw when stat not found');

    console.groupEnd();
  }

  window.__runSetStatTests = run;
})();