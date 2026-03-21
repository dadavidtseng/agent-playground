#!/usr/bin/env node
// Lightweight SVG validation script (zero-deps)
// Usage: node validate-svg.js [path/to/file.svg]

const fs = require('fs');
const path = require('path');

const DEFAULT_TARGET = 'art/warrior-avatar.svg';
const MAX_BYTES = parseInt(process.env.SVG_MAX_BYTES || '200000', 10); // 200 KB
const MAX_G_DEPTH = parseInt(process.env.SVG_MAX_G_DEPTH || '6', 10);
const EXPECT_FRAME_COUNT = parseInt(process.env.SVG_EXPECT_FRAME_COUNT || '1', 10);

function readFileSyncSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.error(`Error reading file: ${filePath}`);
    process.exit(1);
  }
}

function checkFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return { ok: stats.size <= MAX_BYTES, size: stats.size };
  } catch (e) {
    return { ok: false, size: null, error: e.message };
  }
}

function findViewBox(svgText) {
  // Very small check: find viewBox attribute on root <svg
  const svgOpenMatch = svgText.match(/<svg[^>]*>/i);
  if (!svgOpenMatch) return false;
  const svgOpen = svgOpenMatch[0];
  return /viewBox\s*=\s*"[^"]+"/i.test(svgOpen) || /viewBox\s*=\s*'[^']+'/i.test(svgOpen);
}

function containsRaster(svgText) {
  const lower = svgText.toLowerCase();
  // Check for <image ...> tags
  if (/<image[\s>]/i.test(svgText)) return { found: true, reason: '<image> tag present' };
  // Check for href/xlink:href referencing data:image or external images
  const hrefRegex = /(href|xlink:href)\s*=\s*['"]([^'">]+)['"]/ig;
  let m;
  while ((m = hrefRegex.exec(svgText)) !== null) {
    const url = m[2].trim();
    if (/^data:image\//i.test(url)) return { found: true, reason: 'data:image URI found' };
    if (/\.(png|jpe?g|gif|webp)([?#]|$)/i.test(url)) return { found: true, reason: 'raster image file referenced: ' + url };
    if (/^https?:\/\//i.test(url) && /\.(png|jpe?g|gif|webp)([?#]|$)/i.test(url)) return { found: true, reason: 'external raster image referenced: ' + url };
  }
  // Also check for <img> tags
  if (/<img[\s>]/i.test(svgText)) return { found: true, reason: '<img> tag present' };
  return { found: false };
}

function maxGroupDepth(svgText) {
  // naive parse: scan tags and track <g> open/close
  const openTagRegex = /<([a-zA-Z0-9_-]+)([^>]*)>/g;
  const closeTagRegex = /<\/([a-zA-Z0-9_-]+)>/g;
  // We'll do a single pass, scanning tokens
  const tokenRegex = /<\/?.+?>/g;
  let depth = 0;
  let maxDepth = 0;
  const stack = [];
  let m;
  while ((m = tokenRegex.exec(svgText)) !== null) {
    const token = m[0];
    if (/^<\//.test(token)) {
      // closing tag
      const tn = token.replace(/<\//, '').replace(/>.*/, '').trim().split(/\s+/)[0];
      // pop until matching tag
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i] === tn) {
          stack.splice(i, 1);
          break;
        }
      }
      if (tn.toLowerCase() === 'g') depth = Math.max(0, depth - 1);
    } else {
      // opening or self-closing
      const tn = token.replace(/[<\/>]/g, '').trim().split(/\s+/)[0];
      // self-closing check
      const selfClosing = /\/>\s*$/.test(token);
      stack.push(tn);
      if (tn.toLowerCase() === 'g' && !selfClosing) {
        depth++;
        if (depth > maxDepth) maxDepth = depth;
      }
      if (selfClosing) {
        // immediate pop
        stack.pop();
      }
    }
  }
  return maxDepth;
}

function findFrameIds(svgText) {
  // Look for id="...frame..." or class="...frame..." (case-insensitive)
  const idRegex = /id\s*=\s*['\"]([^'\"]+)['\"]/ig;
  const classRegex = /class\s*=\s*['\"]([^'\"]+)['\"]/ig;
  const found = [];
  let m;
  while ((m = idRegex.exec(svgText)) !== null) {
    if (/frame/i.test(m[1])) found.push({ type: 'id', value: m[1] });
  }
  while ((m = classRegex.exec(svgText)) !== null) {
    if (/frame/i.test(m[1])) found.push({ type: 'class', value: m[1] });
  }
  return found;
}

function runChecks(filePath) {
  const result = { ok: true, details: [] };
  if (!fs.existsSync(filePath)) {
    result.ok = false;
    result.details.push(`File does not exist: ${filePath}`);
    return result;
  }

  const text = readFileSyncSafe(filePath);

  // File size
  const sizeCheck = checkFileSize(filePath);
  if (!sizeCheck.ok) {
    result.ok = false;
    result.details.push(`File size ${sizeCheck.size} bytes exceeds limit ${MAX_BYTES} bytes`);
  } else {
    result.details.push(`File size OK: ${sizeCheck.size} bytes`);
  }

  // viewBox
  if (!findViewBox(text)) {
    result.ok = false;
    result.details.push('Missing viewBox on root <svg> element');
  } else {
    result.details.push('viewBox present');
  }

  // raster
  const raster = containsRaster(text);
  if (raster.found) {
    result.ok = false;
    result.details.push('Raster embed found: ' + raster.reason);
  } else {
    result.details.push('No raster embeds detected');
  }

  // group depth
  const depth = maxGroupDepth(text);
  if (depth > MAX_G_DEPTH) {
    result.ok = false;
    result.details.push(`Group nesting depth ${depth} exceeds max ${MAX_G_DEPTH}`);
  } else {
    result.details.push(`Group nesting depth OK: ${depth}`);
  }

  // frames
  const frames = findFrameIds(text);
  if (frames.length < EXPECT_FRAME_COUNT) {
    result.ok = false;
    result.details.push(`Found ${frames.length} frame-marked elements, expected at least ${EXPECT_FRAME_COUNT}`);
  } else {
    result.details.push(`Found ${frames.length} frame-marked elements`);
  }

  return result;
}

function main() {
  const arg = process.argv[2];
  const target = arg || DEFAULT_TARGET;
  const filePath = path.resolve(process.cwd(), target);

  console.log(`Validating: ${filePath}`);
  const res = runChecks(filePath);

  for (const d of res.details) console.log('- ' + d);

  if (res.ok) {
    console.log('Result: PASS');
    process.exit(0);
  } else {
    console.error('Result: FAIL');
    process.exit(1);
  }
}

if (require.main === module) main();
