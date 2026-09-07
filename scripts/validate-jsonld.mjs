#!/usr/bin/env node
/**
 * Ship gate 1 of 3 — JSON-LD validation of the RENDERED static export.
 *
 * Why: a schema.org/Offer block once existed in page source but never made it
 * into the rendered HTML of the static export (out/). Source review and
 * component review both missed it, because nothing validated structured data
 * in the artifact that actually ships. This gate reads every .html file under
 * out/ directly so that class of bug can never ship again.
 *
 * What it does:
 *   1. Walks every .html file under out/ and extracts every <script type="application/ld+json">
 *      block; JSON.parse each (parse failure = ERROR).
 *   2. Checks per-type required properties:
 *        Organization / WebSite   -> name, url
 *        ItemList                 -> itemListElement non-empty
 *        Dataset                  -> name, url, creator
 *        BreadcrumbList           -> itemListElement non-empty
 *        FAQPage                  -> mainEntity non-empty
 *        Article                  -> headline, datePublished
 *        Offer / AggregateOffer   -> price OR lowPrice+highPrice, priceCurrency,
 *                                    and (availability OR url)
 *   3. Offer-route rule (the known defect): every offer detail route
 *      (/best/<slug>/) must contain at least one Offer or AggregateOffer node
 *      in its rendered HTML.
 *   4. Expected-page rule: every expected page (index.html at the root, plus
 *      one index.html per route directory in the out/ listing) must contain at
 *      least one ld+json block. Utility/error pages are exempt (EXEMPT_ROUTES).
 *   5. Duplicated @type on the same page is fine; counts are reported.
 *
 * Usage:   node scripts/validate-jsonld.mjs [outDir]     (default: <repo>/out)
 * Exit:    0 = PASS (no ERROR findings), 1 = FAIL, 2 = usage/environment error.
 * Zero dependencies (node >= 18).
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argDir = process.argv[2] || path.join(REPO_ROOT, 'out');
const OUT_DIR = path.isAbsolute(argDir) ? argDir : path.resolve(process.cwd(), argDir);

/** Pages that legitimately ship without structured data (framework error pages). */
const EXEMPT_ROUTES = new Set(['/404.html', '/404/', '/_not-found/']);

const LD_SCRIPT_RE = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

/** Per-type required scalar properties (array/non-empty rules are special-cased). */
const REQUIRED_PROPS = {
  Organization: ['name', 'url'],
  WebSite: ['name', 'url'],
  Dataset: ['name', 'url', 'creator'],
  Article: ['headline', 'datePublished'],
};

/** Per-type required array properties that must be present AND non-empty. */
const REQUIRED_ARRAY_PROPS = {
  ItemList: 'itemListElement',
  BreadcrumbList: 'itemListElement',
  FAQPage: 'mainEntity',
};

const findings = [];
const push = (level, route, msg) => findings.push({ level, route, msg });

function walkHtmlFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_next' || entry.name.startsWith('__next')) continue; // framework assets
      out.push(...walkHtmlFiles(p));
    } else if (entry.name.endsWith('.html')) {
      out.push(p);
    }
  }
  return out;
}

/** Route key like "/", "/best/", "/best/kimi-k3-core/", "/404.html". */
function routeKey(file) {
  const rel = path.relative(OUT_DIR, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'/index.html'.length) + '/';
  return '/' + rel;
}

/** Flatten a parsed ld+json payload into schema nodes (handles arrays and @graph). */
function collectNodes(node, acc = []) {
  if (!node || typeof node !== 'object') return acc;
  if (Array.isArray(node)) {
    for (const n of node) collectNodes(n, acc);
    return acc;
  }
  if (node['@graph']) collectNodes(node['@graph'], acc);
  acc.push(node);
  return acc;
}

function isEmptyProp(v) {
  if (v === undefined || v === null) return true;
  if (typeof v === 'string' && v.trim() === '') return true;
  return false;
}

function checkNode(node, route) {
  const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
  if (!types.length || types.every((t) => !t)) {
    push('ERROR', route, 'ld+json node without @type');
    return;
  }
  if (isEmptyProp(node['@context'])) {
    push('WARN', route, `node @type=${types.join('/')} has no @context (schema.org expected)`);
  }
  for (const type of types) {
    for (const prop of REQUIRED_PROPS[type] || []) {
      if (isEmptyProp(node[prop])) {
        push('ERROR', route, `${type} missing required property "${prop}"`);
      }
    }
    const arrProp = REQUIRED_ARRAY_PROPS[type];
    if (arrProp) {
      const v = node[arrProp];
      if (v === undefined || v === null) {
        push('ERROR', route, `${type} missing required property "${arrProp}"`);
      } else if (!Array.isArray(v)) {
        push('WARN', route, `${type}.${arrProp} is present but not an array`);
      } else if (v.length === 0) {
        push('ERROR', route, `${type}.${arrProp} is empty`);
      }
    }
    if (type === 'Offer' || type === 'AggregateOffer') {
      const hasPrice = !isEmptyProp(node.price);
      const hasRange = !isEmptyProp(node.lowPrice) && !isEmptyProp(node.highPrice);
      if (!hasPrice && !hasRange) {
        push('ERROR', route, `${type} has neither "price" nor "lowPrice"+"highPrice"`);
      }
      if (isEmptyProp(node.priceCurrency)) {
        push('ERROR', route, `${type} missing required property "priceCurrency"`);
      }
      if (isEmptyProp(node.availability) && isEmptyProp(node.url)) {
        push('ERROR', route, `${type} needs "availability" or "url" (has neither)`);
      }
    }
  }
}

function main() {
  if (!fs.existsSync(OUT_DIR) || !fs.statSync(OUT_DIR).isDirectory()) {
    console.error(`usage error: export directory not found: ${OUT_DIR}`);
    console.error('run `npm run build` first (static export must exist), or pass the out dir as argv[2].');
    process.exit(2);
  }

  const files = walkHtmlFiles(OUT_DIR).sort();
  const typeTally = new Map();
  let blockCount = 0;
  let nodeCount = 0;
  let exemptSeen = [];

  const perPageLines = [];

  for (const file of files) {
    const route = routeKey(file);
    const html = fs.readFileSync(file, 'utf8');
    const blocks = [...html.matchAll(LD_SCRIPT_RE)];
    blockCount += blocks.length;

    const nodes = [];
    for (const m of blocks) {
      try {
        collectNodes(JSON.parse(m[1]), nodes);
      } catch (err) {
        push('ERROR', route, `ld+json block fails JSON.parse: ${err.message} (block starts "${m[1].trim().slice(0, 60).replace(/\s+/g, ' ')}…")`);
      }
    }
    nodeCount += nodes.length;

    if (blocks.length === 0) {
      if (EXEMPT_ROUTES.has(route)) {
        exemptSeen.push(route);
      } else {
        push('ERROR', route, 'expected page has ZERO application/ld+json blocks in rendered HTML');
      }
      perPageLines.push(`  ${route}  — no ld+json${EXEMPT_ROUTES.has(route) ? ' (exempt: utility/error page)' : ''}`);
      continue;
    }

    const pageTypes = new Map();
    for (const node of nodes) {
      checkNode(node, route);
      const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
      for (const t of types) {
        if (!t) continue;
        pageTypes.set(t, (pageTypes.get(t) || 0) + 1);
        typeTally.set(t, (typeTally.get(t) || 0) + 1);
      }
    }
    const typeSummary = [...pageTypes.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t, n]) => (n > 1 ? `${t}×${n}` : t))
      .join(' ');
    perPageLines.push(`  ${route}  ${blocks.length} block(s), ${nodes.length} node(s): ${typeSummary}`);
  }

  // Offer-route rule: every /best/<slug>/ detail route must carry an Offer or
  // AggregateOffer in its RENDERED html. This is the exact shape of the known
  // defect (Offer present in page source, absent from the export).
  const bestDir = path.join(OUT_DIR, 'best');
  if (fs.existsSync(bestDir)) {
    for (const entry of fs.readdirSync(bestDir, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name.startsWith('_')) continue;
      const idx = path.join(bestDir, entry.name, 'index.html');
      if (!fs.existsSync(idx)) continue;
      const html = fs.readFileSync(idx, 'utf8');
      const nodes = [];
      for (const m of [...html.matchAll(LD_SCRIPT_RE)]) {
        try {
          collectNodes(JSON.parse(m[1]), nodes);
        } catch {
          /* parse errors already reported by the per-page pass */
        }
      }
      const hasOffer = nodes.some((n) => {
        const t = Array.isArray(n['@type']) ? n['@type'] : [n['@type']];
        return t.includes('Offer') || t.includes('AggregateOffer');
      });
      if (!hasOffer) {
        push(
          'ERROR',
          `/best/${entry.name}/`,
          'offer route has NO Offer/AggregateOffer node in rendered HTML (known defect class: markup in source but missing from export)'
        );
      }
    }
  }

  // ---- report ----
  console.log(`== JSON-LD ship gate — ${OUT_DIR.split(path.sep).join('/')} ==`);
  for (const line of perPageLines) console.log(line);
  console.log(
    `scanned ${files.length} html file(s): ${blockCount} ld+json block(s), ${nodeCount} schema node(s)`
  );
  if (exemptSeen.length) {
    console.log(`exempt (no structured data required): ${exemptSeen.join(', ')}`);
  }
  if (typeTally.size) {
    const tally = [...typeTally.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t, n]) => `${t}×${n}`)
      .join(', ');
    console.log(`@type counts across build (duplicates are fine): ${tally}`);
  }

  const errors = findings.filter((f) => f.level === 'ERROR');
  const warns = findings.filter((f) => f.level === 'WARN');
  for (const f of findings) console.log(`${f.level}  ${f.route}  ${f.msg}`);

  if (errors.length) {
    console.log(`RESULT: FAIL — ${errors.length} error(s), ${warns.length} warning(s)`);
    process.exit(1);
  }
  console.log(`RESULT: PASS — 0 errors, ${warns.length} warning(s)`);
  process.exit(0);
}

main();
