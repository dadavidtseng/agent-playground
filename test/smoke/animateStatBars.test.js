// Simple smoke test using JSDOM and Node to assert animateStatBars sets widths/aria
const fs = require('fs');
const path = require('path');
const {JSDOM} = require('jsdom');

const html = fs.readFileSync(path.resolve(__dirname, '../../src/components/card.html'), 'utf8');
const script = fs.readFileSync(path.resolve(__dirname, '../../src/scripts/card.js'), 'utf8');

describe('animateStatBars smoke', () => {
  test('sets width and aria-valuenow for stats', async () => {
    const dom = new JSDOM(html, {runScripts: 'outside-only'});
    const {window} = dom;
    // evaluate the script in the DOM context
    const func = new window.Function('exports', script + '\n\nreturn typeof animateStatBars !== "undefined" ? animateStatBars : module.exports.animateStatBars;');
    const exports = {};
    const animateStatBars = func(exports);

    // Ensure initial aria-valuenow is 0
    const stats = window.document.querySelectorAll('.stat');
    stats.forEach(s => {
      expect(s.getAttribute('aria-valuenow')).toBe('0');
    });

    // invoke function; with JSDOM, prefers-reduced-motion likely false, but animation relies on transitionend
    // We simulate by forcing reduced motion to true to have immediate set
    window.matchMedia = () => ({matches: true});

    animateStatBars(window.document);

    stats.forEach(s => {
      const percent = s.getAttribute('data-stat-percent');
      const fill = s.querySelector('.stat__fill');
      expect(fill.style.width).toBe(`${percent}%`);
      expect(s.getAttribute('aria-valuenow')).toBe(percent);
    });
  });
});
