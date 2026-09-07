#!/usr/bin/env node
/**
 * Ship gate 2 of 3 — machine-feed validation of the static export.
 *
 * Validates the artifacts that agents, readers and crawlers consume:
 *   out/api/offers.json — valid JSON array; every entry has id, status,
 *     provider, title, canonical_url, price, verified_at; ids unique;
 *     verified_at parseable and no older than MAX_AGE_DAYS (40).
 *   out/feed.xml — structurally well-formed RSS 2.0 (balanced tags for the
 *     elements this feed uses); channel has title/link/description; every
 *     <item> has title, link and pubDate.
 *   out/sitemap.xml — valid <urlset>; every <loc> starts with the production
 *     origin (https://token-perks.com) and resolves to an existing file under
 *     out/; no "http://" (insecure) or "example.com" (placeholder) strings
 *     anywhere in the file.
 *   out/llms.txt — non-empty and contains the offers feed URL.
 *
 * Usage:   node scripts/validate-feeds.mjs [outDir]     (default: <repo>/out)
 * Exit:    0 = PASS (no ERROR findings), 1 = FAIL, 2 = usage/environment error.
 * Zero dependencies (node >= 18). XML checks are structural (tag balance +
 * required elements), not a full DTD/schema validation.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argDir = process.argv[2] || path.join(REPO_ROOT, 'out');
const OUT_DIR = path.isAbsolute(argDir) ? argDir : path.resolve(process.cwd(), argDir);

const SITE_URL = 'https://token-perks.com';
const OFFERS_FEED_URL = `${SITE_URL}/api/offers.json`;
const MAX_AGE_DAYS = 40;

const findings = [];
const push = (level, file, msg) => findings.push({ level, file, msg });
const rel = (p) => path.relative(OUT_DIR, p).split(path.sep).join('/');

function tagBalance(xml, file, tags) {
  for (const t of tags) {
    const open = (xml.match(new RegExp(`<${t}(\\s[^>]*)?>`, 'g')) || []).length;
    const close = (xml.match(new RegExp(`</${t}>`, 'g')) || []).length;
    if (open !== close) {
      push('ERROR', file, `unbalanced <${t}> tags (${open} open / ${close} close) — malformed XML`);
    }
  }
}

function firstTag(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}(\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
  return m ? m[2].trim() : '';
}

function checkOffersJson() {
  const file = path.join(OUT_DIR, 'api', 'offers.json');
  if (!fs.existsSync(file)) {
    push('ERROR', 'api/offers.json', 'file missing — build did not emit the offers data feed');
    return;
  }
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    push('ERROR', 'api/offers.json', `invalid JSON: ${err.message}`);
    return;
  }
  if (!Array.isArray(data)) {
    push('ERROR', 'api/offers.json', `top level must be a JSON array, got ${typeof data}`);
    return;
  }
  if (data.length === 0) push('ERROR', 'api/offers.json', 'offers array is empty');
  if (data.length > 500) push('WARN', 'api/offers.json', `unusually large (${data.length} entries) — expected a curated offer list`);

  const REQUIRED = ['id', 'status', 'provider', 'title', 'canonical_url', 'price', 'verified_at'];
  const seenIds = new Map();
  const now = Date.now();
  data.forEach((entry, i) => {
    const label = `api/offers.json[${entry?.id ?? i}]`;
    for (const key of REQUIRED) {
      const v = entry?.[key];
      if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
        push('ERROR', label, `missing required field "${key}"`);
      }
    }
    if (entry?.id !== undefined) {
      if (seenIds.has(entry.id)) {
        push('ERROR', label, `duplicate id "${entry.id}" (first seen at index ${seenIds.get(entry.id)})`);
      } else {
        seenIds.set(entry.id, i);
      }
    }
    const va = entry?.verified_at;
    if (typeof va === 'string' && va.trim() !== '') {
      const t = Date.parse(va);
      if (Number.isNaN(t)) {
        push('ERROR', label, `verified_at "${va}" is not a parseable date`);
      } else {
        const ageDays = Math.floor((now - t) / 86400000);
        if (ageDays > MAX_AGE_DAYS) {
          push('ERROR', label, `verified_at "${va}" is ${ageDays} days old (max ${MAX_AGE_DAYS}) — re-verify before shipping`);
        } else if (ageDays < -2) {
          push('WARN', label, `verified_at "${va}" is in the future by ${-ageDays} days — clock skew or typo?`);
        }
      }
    }
  });
}

function checkFeedXml() {
  const file = path.join(OUT_DIR, 'feed.xml');
  if (!fs.existsSync(file)) {
    push('ERROR', 'feed.xml', 'file missing — build did not emit the RSS feed');
    return;
  }
  const xml = fs.readFileSync(file, 'utf8');
  tagBalance(xml, 'feed.xml', ['rss', 'channel', 'item', 'title', 'link', 'description', 'pubDate', 'guid', 'language', 'lastBuildDate']);

  const channel = xml.match(/<channel>([\s\S]*?)<\/channel>/);
  if (!channel) {
    push('ERROR', 'feed.xml', 'no <channel> element');
    return;
  }
  const head = channel[1].split(/<item[\s>]/)[0]; // channel metadata sits before the first item
  for (const tag of ['title', 'link', 'description']) {
    if (firstTag(head, tag) === '') {
      push('ERROR', 'feed.xml', `channel missing <${tag}>`);
    }
  }

  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  if (items.length === 0) {
    push('ERROR', 'feed.xml', 'feed has zero <item> elements — an empty offers feed is a defect');
  }
  for (const [i, m] of items.entries()) {
    const label = `feed.xml item#${i + 1}`;
    for (const tag of ['title', 'link', 'pubDate']) {
      if (firstTag(m[1], tag) === '') {
        push('ERROR', label, `missing or empty <${tag}>`);
      }
    }
  }
}

function checkSitemap() {
  const file = path.join(OUT_DIR, 'sitemap.xml');
  if (!fs.existsSync(file)) {
    push('ERROR', 'sitemap.xml', 'file missing — build did not emit the sitemap');
    return;
  }
  const xml = fs.readFileSync(file, 'utf8');
  if (!/<urlset[\s>]/.test(xml)) {
    push('ERROR', 'sitemap.xml', 'root element is not a <urlset>');
    return;
  }
  if (!/sitemap/.test(xml.match(/<urlset[^>]*xmlns="([^"]*)"/i)?.[1] || '')) {
    push('WARN', 'sitemap.xml', 'urlset xmlns does not mention the sitemap protocol namespace');
  }
  tagBalance(xml, 'sitemap.xml', ['urlset', 'url', 'loc', 'lastmod']);

  // The protocol namespace declaration (xmlns="http://www.sitemaps.org/…") is
  // required and always http:// — scan everything EXCEPT xmlns attributes.
  const scanned = xml.replace(/\sxmlns(:\w+)?="[^"]*"/g, '');
  if (/http:\/\//.test(scanned)) {
    push('ERROR', 'sitemap.xml', 'contains insecure "http://" URL(s) — every URL must be https');
  }
  if (/example\.com/i.test(xml)) {
    push('ERROR', 'sitemap.xml', 'contains placeholder "example.com" URL(s)');
  }

  const locs = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => m[1].trim());
  if (locs.length === 0) {
    push('ERROR', 'sitemap.xml', 'no <loc> entries');
    return;
  }
  const seen = new Set();
  for (const loc of locs) {
    if (seen.has(loc)) push('WARN', 'sitemap.xml', `duplicate <loc>: ${loc}`);
    seen.add(loc);
    if (!loc.startsWith(SITE_URL)) {
      push('ERROR', 'sitemap.xml', `<loc> ${loc} does not start with ${SITE_URL}`);
      continue;
    }
    let p;
    try {
      p = decodeURIComponent(new URL(loc).pathname);
    } catch {
      push('ERROR', 'sitemap.xml', `<loc> ${loc} is not a valid URL`);
      continue;
    }
    const relFile = p === '/' || p === '' ? 'index.html' : p.replace(/\/$/, '') + (p.endsWith('/') ? '/index.html' : '');
    const candidate = path.join(OUT_DIR, relFile);
    if (!fs.existsSync(candidate)) {
      push('ERROR', 'sitemap.xml', `<loc> ${loc} does not resolve to a file in out/ (looked for ${relFile})`);
    }
  }
}

function checkLlmsTxt() {
  const file = path.join(OUT_DIR, 'llms.txt');
  if (!fs.existsSync(file)) {
    push('ERROR', 'llms.txt', 'file missing — build did not emit llms.txt');
    return;
  }
  const txt = fs.readFileSync(file, 'utf8');
  if (txt.trim() === '') {
    push('ERROR', 'llms.txt', 'file is empty');
    return;
  }
  if (!txt.includes(OFFERS_FEED_URL)) {
    push('ERROR', 'llms.txt', `does not mention the offers feed URL ${OFFERS_FEED_URL}`);
  }
}

function main() {
  if (!fs.existsSync(OUT_DIR) || !fs.statSync(OUT_DIR).isDirectory()) {
    console.error(`usage error: export directory not found: ${OUT_DIR}`);
    console.error('run `npm run build` first (static export must exist), or pass the out dir as argv[2].');
    process.exit(2);
  }

  checkOffersJson();
  checkFeedXml();
  checkSitemap();
  checkLlmsTxt();

  console.log(`== Feed ship gate — ${OUT_DIR.split(path.sep).join('/')} ==`);
  const offersCount = (() => {
    try {
      const d = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'api', 'offers.json'), 'utf8'));
      return Array.isArray(d) ? d.length : '?';
    } catch {
      return '?';
    }
  })();
  const feedItems = (fs.existsSync(path.join(OUT_DIR, 'feed.xml'))
    ? (fs.readFileSync(path.join(OUT_DIR, 'feed.xml'), 'utf8').match(/<item>/g) || []).length
    : 0);
  const sitemapLocs = (fs.existsSync(path.join(OUT_DIR, 'sitemap.xml'))
    ? (fs.readFileSync(path.join(OUT_DIR, 'sitemap.xml'), 'utf8').match(/<loc>/g) || []).length
    : 0);
  console.log(`api/offers.json: ${offersCount} entr(ies) | feed.xml: ${feedItems} item(s) | sitemap.xml: ${sitemapLocs} url(s) | llms.txt: present`);

  const errors = findings.filter((f) => f.level === 'ERROR');
  const warns = findings.filter((f) => f.level === 'WARN');
  for (const f of findings) console.log(`${f.level}  ${f.file}  ${f.msg}`);

  if (errors.length) {
    console.log(`RESULT: FAIL — ${errors.length} error(s), ${warns.length} warning(s)`);
    process.exit(1);
  }
  console.log(`RESULT: PASS — 0 errors, ${warns.length} warning(s)`);
  process.exit(0);
}

main();
