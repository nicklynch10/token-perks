#!/usr/bin/env node
/**
 * V3.2 static-export audit — internal link & anchor integrity over out/.
 *
 * Every same-origin href in every exported HTML file must resolve to a file
 * under out/ (directory routes as <dir>/index.html, matching trailingSlash),
 * and every #anchor must exist as an id in the resolved document. Catches
 * the classic density-refactor regressions: sections moved to their own page
 * while old /#section links stay behind.
 *
 * Usage:   node scripts/tmp/export-audit.mjs [outDir]
 * Exit:    0 = PASS, 1 = dead links/anchors found, 2 = environment error.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:\/)/, '$1')), '..', '..');
const OUT = path.resolve(process.argv[2] || path.join(REPO_ROOT, 'out'));

if (!fs.existsSync(OUT)) {
  console.error(`out dir not found: ${OUT} — run "npm run build" first`);
  process.exit(2);
}

function* walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '_next' || e.name.startsWith('__next')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}

const files = [...walk(OUT)];
const idsByFile = new Map();
const byRoute = new Map(); // normalized route -> file
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  idsByFile.set(f, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  const rel = '/' + path.relative(OUT, f).replace(/\\/g, '/');
  byRoute.set(rel === '/index.html' ? '/' : rel.replace(/\/index\.html$/, '/'), f);
  if (rel !== '/index.html') byRoute.set(rel, f); // raw file paths (/sitemap.xml etc. are not html; kept for completeness)
}

function resolveFile(hrefPath) {
  // Direct route forms under trailingSlash: /x/ -> /x/index.html ; /x.html ; /file.ext
  const clean = decodeURIComponent(hrefPath.replace(/[?#].*$/, ''));
  const cands = [clean, clean.endsWith('/') ? clean + 'index.html' : clean + '/index.html', clean.replace(/\/$/, '.html'), clean + '.html'];
  for (const c of cands) {
    const f = path.join(OUT, c);
    if (fs.existsSync(f) && fs.statSync(f).isFile()) return f;
  }
  return null;
}

const dead = [];
let checked = 0;
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)) {
    const [, p, frag] = m;
    if (p.startsWith('//')) continue; // protocol-relative external
    if (/^\/_next\//.test(p)) continue;
    // data feeds / generated non-html endpoints
    const target = resolveFile(p);
    if (!target) {
      // try raw non-html file (sitemap.xml, feed.xml, llms.txt, api json)
      const raw = path.join(OUT, p.replace(/^\//, ''), p.endsWith('/') ? 'index.txt' : '');
      if (fs.existsSync(raw) && fs.statSync(raw).isFile() && (!frag || !frag.length > 1)) continue;
      const rawNoSlash = path.join(OUT, p.replace(/^\//, ''));
      if (fs.existsSync(rawNoSlash) && fs.statSync(rawNoSlash).isFile()) { checked++; continue; }
      dead.push({ from: path.relative(OUT, f), href: p + (frag || ''), why: 'target file missing under out/' });
      continue;
    }
    checked++;
    if (frag && frag.length > 1) {
      const id = frag.slice(1);
      const ids = idsByFile.get(target) ?? new Set([...fs.readFileSync(target, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]));
      idsByFile.set(target, ids);
      if (!ids.has(id)) dead.push({ from: path.relative(OUT, f), href: p + frag, why: `anchor #${id} not found in target` });
    }
  }
}

console.log(`scanned ${files.length} html file(s), ${checked} internal link(s) resolved`);
if (dead.length) {
  for (const d of dead.slice(0, 60)) console.log(`DEAD  ${d.from} -> ${d.href}  (${d.why})`);
  console.log(`RESULT: FAIL — ${dead.length} dead link(s)`);
  process.exit(1);
}
console.log('RESULT: PASS — every internal link and anchor resolves');
