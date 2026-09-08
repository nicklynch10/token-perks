#!/usr/bin/env node
/**
 * Layout measurement harness for the UI fixes (not a ship gate — a scratch tool).
 * Serves out/ and measures, at 390x844 (touch emulation) and 1440x900:
 *   - header height / sticky-ness
 *   - h1 top offset (first-screen test: promise within first ~120px)
 *   - tap-target heights of chips, sort buttons, and other sub-44 controls
 * Usage: node scripts/tmp/measure-ui.mjs [outDir]
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const REPO = path.resolve(import.meta.dirname, '..', '..');
const OUT = path.resolve(process.argv[2] || path.join(REPO, 'out'));
const require = createRequire(path.join(REPO, 'scripts', 'tmp', 'meas-deps', 'package.json'));
const puppeteer = require('puppeteer-core');

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = path.join(OUT, p === '/' ? 'index.html' : p.replace(/^\/+/, ''));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); res.end('nf'); return; }
  const type = f.endsWith('.css') ? 'text/css' : f.endsWith('.js') ? 'text/javascript' : f.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream';
  res.writeHead(200, { 'content-type': type });
  res.end(fs.readFileSync(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
});

async function measure(label, { width, height, mobile }) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  await page.goto(`${base}/`, { waitUntil: 'networkidle0' });
  const out = await page.evaluate(() => {
    const r = (el) => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { top: +b.top.toFixed(1), height: +b.height.toFixed(1), width: +b.width.toFixed(1) };
    };
    const header = document.querySelector('header');
    const h1 = document.querySelector('main h1');
    const chips = [...document.querySelectorAll('fieldset button, [role="group"] button')].map((b) => ({
      label: b.textContent.trim().slice(0, 24),
      h: +b.getBoundingClientRect().height.toFixed(1),
    }));
    const sortBtns = [...document.querySelectorAll('table thead button')].map((b) => ({
      label: b.textContent.trim().slice(0, 24),
      h: +b.getBoundingClientRect().height.toFixed(1),
      visible: b.getBoundingClientRect().height > 0,
    }));
    const pointerCoarse = matchMedia('(pointer: coarse)').matches;
    const cs = header ? getComputedStyle(header) : null;
    return {
      pointerCoarse,
      header: r(header),
      headerPosition: cs ? cs.position : null,
      h1Top: h1 ? +h1.getBoundingClientRect().top.toFixed(1) : null,
      chips: chips.filter((c) => c.h > 0),
      sortBtns: sortBtns.filter((s) => s.visible),
      sub40: [...document.querySelectorAll('a, button, summary, input[type=range], input[type=number]')]
        .filter((el) => {
          const b = el.getBoundingClientRect();
          if (b.height === 0 || b.width === 0) return false;
          // inline text links inside sentences/cells are exempt (WCAG 2.5.8)
          const cs2 = getComputedStyle(el);
          if (cs2.display === 'inline' && el.closest('p, td, th, li, blockquote, figcaption')) return false;
          return b.height < 40;
        })
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          label: (el.getAttribute('aria-label') || el.textContent.trim()).slice(0, 40),
          h: +el.getBoundingClientRect().height.toFixed(1),
        })),
    };
  });
  console.log(`\n== ${label} (${width}x${height}${mobile ? ', touch' : ''}) ==`);
  console.log(JSON.stringify(out, null, 1));
  await page.close();
}

await measure('MOBILE', { width: 390, height: 844, mobile: true });
await measure('DESKTOP', { width: 1440, height: 900, mobile: false });
await browser.close();
server.close();
