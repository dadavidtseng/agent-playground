#!/usr/bin/env node
// Lightweight smoke test using jsdom to assert basic DOM structure and ARIA attributes.
// Exits 0 on success, 1 on failure.

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function findDemoHtml(dir) {
  const candidates = ['index.html', 'index.htm', 'demo.html', 'demo/index.html'].map(f => path.join(dir, f));
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  // fallback: look for first .html file in demo dir
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') || f.endsWith('.htm'));
  if (files.length) return path.join(dir, files[0]);
  return null;
}

async function run() {
  const repoRoot = path.resolve(__dirname, '../../');
  const demoDir = path.join(repoRoot, 'demo');
  if (!fs.existsSync(demoDir)) {
    console.error('demo directory not found at', demoDir);
    process.exit(1);
  }

  const htmlPath = findDemoHtml(demoDir);
  if (!htmlPath) {
    console.error('No HTML file found in demo directory. Expected index.html or similar.');
    process.exit(1);
  }

  console.log('Using HTML file:', htmlPath);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const dom = new JSDOM(html);
  const { document } = dom.window;

  let failed = false;
  function assert(cond, msg) {
    if (!cond) {
      console.error('FAIL:', msg);
      failed = true;
    } else {
      console.log('OK: ', msg);
    }
  }

  // 1) main element
  assert(Boolean(document.querySelector('main')), '<main> element present');

  // 2) meta viewport
  const metaViewport = Array.from(document.querySelectorAll('meta[name="viewport"]'));
  assert(metaViewport.length > 0, 'meta viewport tag present');

  // 3) inline svg presence
  const svgs = document.querySelectorAll('svg');
  assert(svgs.length > 0, 'At least one inline <svg> present');

  // 4) interactive elements have accessible names
  const interactiveSelectors = ['button', '[role="button"]', 'a[href]'];
  const interactive = Array.from(document.querySelectorAll(interactiveSelectors.join(',')));
  if (interactive.length === 0) {
    console.warn('WARN: No interactive elements (buttons/links) found to check for accessible names.');
  } else {
    let unnamed = [];
    for (const el of interactive) {
      const hasName = (el.textContent && el.textContent.trim().length > 0) || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.getAttribute('title');
      if (!hasName) unnamed.push(el);
    }
    assert(unnamed.length === 0, `Interactive elements have accessible names (${interactive.length} checked, ${unnamed.length} unnamed)`);
  }

  // 5) check for animations in linked CSS (basic)
  const linkHrefs = Array.from(document.querySelectorAll('link[rel="stylesheet"][href]')).map(l => l.getAttribute('href')).filter(Boolean);
  let animationFound = false;
  for (const href of linkHrefs) {
    // only examine local CSS files
    if (href.startsWith('http') || href.startsWith('//')) continue;
    const cssPath = path.join(path.dirname(htmlPath), href);
    if (fs.existsSync(cssPath)) {
      const css = fs.readFileSync(cssPath, 'utf8');
      if (/@keyframes|animation\s*:/i.test(css)) animationFound = true;
    }
  }
  if (animationFound) {
    console.log('INFO: Animation-related CSS detected in linked stylesheets.');
  } else {
    console.log('INFO: No animation-related CSS detected in linked stylesheets (check may be incomplete).');
  }

  if (failed) {
    console.error('\nOne or more assertions failed.');
    process.exit(1);
  }
  console.log('\nAll smoke-test assertions passed.');
  process.exit(0);
}

run().catch(err => {
  console.error('Error running smoke tests:', err);
  process.exit(1);
});
