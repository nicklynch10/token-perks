#!/usr/bin/env node
/**
 * Ship gate 3 of 3 — rendered accessibility audit (axe-core) of the static export.
 *
 * Serves out/ with a tiny local HTTP server, loads the key pages, and runs
 * axe-core against each page's DOM (via jsdom — no browser needed). Reports
 * violations grouped by impact and FAILS on any serious/critical violation.
 *
 * Audited pages (derived from the out/ listing):
 *   /, /best/, the first offer route (/best/<slug>/), the first guide route
 *   (/guides/<slug>/), /providers/ if it exists (else /changes/), /methodology/.
 *
 * Note: jsdom has no layout engine, so layout-dependent rules (color-contrast)
 * come back "incomplete" rather than as violations. Gate on serious/critical
 * only; treat incomplete counts as a signal to spot-check in a real browser.
 *
 * Dependencies: axe-core (already in the dependency tree) and jsdom. If jsdom
 * is missing, bootstrap it WITHOUT touching the project manifest:
 *   npm install --prefix scripts/tmp/a11y-deps jsdom axe-core
 *
 * Usage:   node scripts/a11y-check.mjs [outDir]     (default: <repo>/out)
 * Exit:    0 = PASS (no serious/critical violations), 1 = FAIL, 2 = setup error.
 */

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argDir = process.argv[2] || path.join(REPO_ROOT, 'out');
const OUT_DIR = path.isAbsolute(argDir) ? argDir : path.resolve(process.cwd(), argDir);
const DEPS_DIR = path.join(REPO_ROOT, 'scripts', 'tmp', 'a11y-deps');

const IMPACT_RANK = { critical: 0, serious: 1, moderate: 2, minor: 3 };
const FAIL_ON = new Set(['serious', 'critical']);

// ---- resolve jsdom + axe-core (project tree first, scratch deps dir second) ----
function loadDeps() {
  for (const base of [REPO_ROOT, DEPS_DIR]) {
    try {
      const require = createRequire(path.join(base, 'package.json'));
      const { JSDOM, VirtualConsole } = require('jsdom');
      const axeDir = path.dirname(require.resolve('axe-core/package.json'));
      const axeSource = fs.readFileSync(path.join(axeDir, 'axe.min.js'), 'utf8');
      return { JSDOM, VirtualConsole, axeSource, from: path.relative(REPO_ROOT, base) || '.' };
    } catch {
      /* try next base */
    }
  }
  console.error('setup error: jsdom/axe-core not resolvable.');
  console.error(`bootstrap them without touching package.json:\n  npm install --prefix ${path.relative(REPO_ROOT, DEPS_DIR) || 'scripts/tmp/a11y-deps'} jsdom axe-core`);
  process.exit(2);
}

// ---- tiny static server for out/ ----
function serve(outDir) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
    let file = path.join(outDir, rel);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('not found');
      return;
    }
    const type = file.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream';
    res.writeHead(200, { 'content-type': type });
    res.end(fs.readFileSync(file));
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

/** Pick the first child route of a section that has an index.html (e.g. first /best/<slug>/). */
function firstChildRoute(section) {
  const dir = path.join(OUT_DIR, section);
  if (!fs.existsSync(dir)) return null;
  const slugs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('__next'))
    .map((e) => e.name)
    .sort()
    .filter((s) => fs.existsSync(path.join(dir, s, 'index.html')));
  return slugs.length ? `/${section}/${slugs[0]}/` : null;
}

function discoverPages() {
  const has = (p) => fs.existsSync(path.join(OUT_DIR, p, 'index.html'));
  const pages = ['/', '/best/'];
  for (const candidate of [firstChildRoute('best'), firstChildRoute('guides'), has('providers') ? '/providers/' : '/changes/', '/methodology/']) {
    if (candidate && !pages.includes(candidate)) pages.push(candidate);
  }
  return pages;
}

async function auditPage(JSDOM, VirtualConsole, axeSource, url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} from local server`);
  const html = await res.text();
  // VirtualConsole with no handlers: swallow jsdom's "Not implemented"
  // noise (e.g. canvas.getContext from axe's color-contrast matcher).
  const virtualConsole = new VirtualConsole();
  const dom = new JSDOM(html, {
    url,
    runScripts: 'outside-only', // don't execute the page's own scripts; we inject axe ourselves
    pretendToBeVisual: true,
    virtualConsole,
  });
  const { window } = dom;
  window.eval(axeSource);
  if (!window.axe) throw new Error('axe failed to initialize in jsdom');
  const results = await window.axe.run(window.document, { resultTypes: ['violations', 'incomplete'] });
  dom.window.close();
  return results;
}

async function main() {
  if (!fs.existsSync(OUT_DIR) || !fs.statSync(OUT_DIR).isDirectory()) {
    console.error(`usage error: export directory not found: ${OUT_DIR}`);
    console.error('run `npm run build` first (static export must exist), or pass the out dir as argv[2].');
    process.exit(2);
  }
  const { JSDOM, VirtualConsole, axeSource, from } = loadDeps();
  const pages = discoverPages();
  const { server, port } = await serve(OUT_DIR);
  const base = `http://127.0.0.1:${port}`;

  console.log(`== Accessibility ship gate (axe-core via jsdom, deps: ${from}) — ${OUT_DIR.split(path.sep).join('/')} ==`);
  console.log(`auditing ${pages.length} key page(s): ${pages.join(' ')}`);

  const totals = { critical: 0, serious: 0, moderate: 0, minor: 0, incomplete: 0 };
  let failed = false;

  try {
    for (const page of pages) {
      const url = base + page;
      let results;
      try {
        results = await auditPage(JSDOM, VirtualConsole, axeSource, url);
      } catch (err) {
        console.log(`\n-- ${page}`);
        console.log(`ERROR  page could not be audited: ${err.message}`);
        failed = true;
        continue;
      }
      const byImpact = { critical: [], serious: [], moderate: [], minor: [] };
      for (const v of results.violations) (byImpact[v.impact] ?? byImpact.minor).push(v);
      console.log(`\n-- ${page}`);
      if (results.violations.length === 0) {
        console.log(`   clean — ${results.passes.length} rule(s) passed, ${results.incomplete.length} incomplete`);
      }
      for (const impact of ['critical', 'serious', 'moderate', 'minor']) {
        for (const v of byImpact[impact]) {
          const nodes = v.nodes.map((n) => n.target[0]).slice(0, 3).join(', ');
          const more = v.nodes.length > 3 ? ` (+${v.nodes.length - 3} more)` : '';
          console.log(`   [${impact}] ${v.id} — ${v.help} (${v.nodes.length} node(s)) e.g. ${nodes}${more}`);
        }
        totals[impact] += byImpact[impact].length;
      }
      totals.incomplete += results.incomplete.length;
    }
  } finally {
    server.close();
  }

  const failing = totals.critical + totals.serious;
  console.log(
    `\nviolations by impact: critical=${totals.critical} serious=${totals.serious} moderate=${totals.moderate} minor=${totals.minor} | incomplete checks (no layout engine): ${totals.incomplete}`
  );
  if (failed || failing > 0) {
    console.log(`RESULT: FAIL — ${failing} serious/critical violation(s)${failed ? ' + unauditable page(s)' : ''}`);
    process.exit(1);
  }
  console.log(`RESULT: PASS — 0 serious/critical violations`);
  process.exit(0);
}

main();
