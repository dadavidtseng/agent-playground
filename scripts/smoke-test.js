// Lightweight smoke test using Playwright
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = 'http://localhost:8000/demo/index.html';
  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // 1) Card loads
    const card = await page.$('.profile-card');
    if (!card) throw new Error('Profile card not found');

    // 2) Stat bars animate to target widths
    // Wait for animation end (give extra time)
    await page.waitForTimeout(800);
    const fills = await page.$$('.stat-fill');
    for (const fill of fills) {
      const target = parseFloat(await fill.getAttribute('data-target')) || 0;
      const width = await page.evaluate(el => {
        return parseFloat(window.getComputedStyle(el).width);
      }, fill);
      const trackWidth = await page.evaluate(el => {
        return parseFloat(window.getComputedStyle(el.parentElement).width);
      }, fill);
      const percent = Math.round((width/trackWidth)*100);
      if (Math.abs(percent - target) > 5) throw new Error(`Stat fill expected ~${target}%, got ${percent}%`);
    }

    // 3) Bio toggles
    const toggle = await page.$('#bio-toggle');
    const bioText = await page.$('#bio-text');
    if (!toggle || !bioText) throw new Error('Bio toggle or text missing');
    const ariaBefore = await toggle.getAttribute('aria-expanded');
    await toggle.click();
    await page.waitForTimeout(100);
    const ariaAfter = await toggle.getAttribute('aria-expanded');
    if (ariaBefore === ariaAfter) throw new Error('Bio toggle did not change aria-expanded');

    // 4) ARIA attributes: ensure card has aria-label
    const ariaLabel = await card.getAttribute('aria-label');
    if (!ariaLabel) throw new Error('Profile card missing aria-label');

    console.log('SMOKE TEST: PASS');
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('SMOKE TEST: FAIL', err.message);
    await browser.close();
    process.exit(2);
  }
})();
