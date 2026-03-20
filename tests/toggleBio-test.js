// Lightweight tests for toggleBio()
// Exposed function: window.__runToggleBioTests()

(function(){
  function mockToggleBio(id) {
    try {
      const btn = document.getElementById('bio-toggle-1');
      const content = document.getElementById(id);
      if(!btn || !content) return false;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if(expanded) content.hidden = true; else content.hidden = false;
      return true;
    } catch(e){ return false; }
  }

  async function run() {
    console.group('toggleBio-tests');
    const globalToggle = window.toggleBio || mockToggleBio;

    // Ensure initial state
    const btn = document.getElementById('bio-toggle-1');
    const content = document.getElementById('bio-1');
    console.assert(btn, 'bio toggle button exists');
    console.assert(content, 'bio content element exists');
    console.assert(btn.getAttribute('aria-expanded') === 'false', 'initial aria-expanded should be false');
    console.assert(content.hidden === true, 'initial content should be hidden');

    // Test 1: toggle open
    console.log('Test 1: toggle opens the bio');
    const ok1 = globalToggle('bio-1');
    console.assert(ok1 === true, 'toggleBio should return true for valid id');
    console.assert(btn.getAttribute('aria-expanded') === 'true', 'aria-expanded should be true after toggle');
    console.assert(content.hidden === false, 'content should be visible after toggle');

    // Test 2: toggle close (back to initial)
    console.log('Test 2: toggle closes the bio');
    const ok2 = globalToggle('bio-1');
    console.assert(ok2 === true, 'toggleBio should return true on second toggle');
    console.assert(btn.getAttribute('aria-expanded') === 'false', 'aria-expanded should be false after second toggle');
    console.assert(content.hidden === true, 'content should be hidden after second toggle');

    console.groupEnd();
  }

  window.__runToggleBioTests = run;
})();