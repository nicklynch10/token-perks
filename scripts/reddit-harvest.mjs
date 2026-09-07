#!/usr/bin/env node
/**
 * Reddit deal-lead harvester (V1) for token-perks.com
 *
 * MANUAL-LEADS editorial model: this script COLLECTS candidate leads into
 * GitHub issues; humans review/verify/publish. Nothing is auto-published.
 *
 * Posture:
 *  - Reads Reddit PUBLIC JSON endpoints only (https://www.reddit.com/r/<sub>/new.json)
 *  - Never authenticates with Reddit
 *  - Polite custom User-Agent, <=1 request/sec, backoff on 429, skips on 403/blocks
 *  - At most MAX_PAGES_PER_SUB pages per subreddit per run (spec: ~3)
 *  - At most MAX_ISSUES_PER_RUN new GitHub issues per run (spec: 10)
 *  - Dedupe via scripts/reddit-harvest-state.json (committed to the repo)
 *  - Link-first: only a short verbatim quote (<=280 chars) is placed in the issue
 *  - No PII beyond the public Reddit username
 *
 * Usage:
 *   node scripts/reddit-harvest.mjs                 # harvest; create issues via gh CLI
 *   node scripts/reddit-harvest.mjs --dry-run       # print candidates; create nothing, persist nothing
 *   node scripts/reddit-harvest.mjs --subreddits LocalLLaMA,cursor
 *   node scripts/reddit-harvest.mjs --max-issues 3
 *
 * No npm dependencies. Requires Node >= 18 (global fetch) and the `gh` CLI
 * (authenticated) when running without --dry-run.
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const execFileP = promisify(execFile);

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const STATE_FILE = path.join(SCRIPT_DIR, 'reddit-harvest-state.json');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Subreddits watched. Docs: docs/reddit-harvest.md ("How to add subreddits"). */
const DEFAULT_SUBREDDITS = [
  'artificial',
  'LocalLLaMA',
  'ChatGPTCoding',
  'cursor',
  'GitHubCopilot',
  'ChatGPT',
  'ClaudeAI',
  'SillyTavernAI',
  'ollama',
];

const USER_AGENT = 'token-perks-lead-bot/0.1 (editorial lead collection)';
const REDDIT_BASE = 'https://www.reddit.com';
const POSTS_PER_PAGE = 50;
const MAX_PAGES_PER_SUB = 3; // spec cap; we only paginate when still short of issues
const MAX_ISSUES_PER_RUN = 10; // spec cap
const REQUEST_GAP_MS = 1100; // <=1 request/second
const RATE_LIMIT_BACKOFF_MS = 60_000; // after a 429, cool down before continuing
const SEEN_MAX_AGE_DAYS = 120; // prune dedupe entries older than this

/** HIGH tier: explicit deal/pricing language. */
const HIGH_KEYWORDS = [
  'deal', 'deals',
  'pricing', 'price',
  'discount',
  'promo', 'promotion',
  'free tier',
  'student',
  'coupon',
  'annual',
];

/** MEDIUM tier: buying-intent / offer-lifecycle chatter. */
const MEDIUM_KEYWORDS = [
  'is it worth',
  'cancel',
  'refund',
  'renewal',
];

// Extra regex-only patterns (word-boundary aware).
const HIGH_PATTERNS = [
  { kw: '% off', re: /\b\d{1,3}\s?%\s?off\b/i },
  { kw: 'half price', re: /\bhalf[- ]price\b/i },
];

const MEDIUM_PATTERNS = [
  { kw: 'auto-renew', re: /\bauto[- ]?renew\w*\b/i },
  { kw: 'price increase', re: /\bprice (increase|hike|went up|goes up)\b/i },
];

const REPO = process.env.GITHUB_REPOSITORY || 'nicklynch10/token-perks';
const LABEL = 'editor-lead';

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseArgs(argv) {
  const args = { dryRun: false, subreddits: null, maxIssues: MAX_ISSUES_PER_RUN };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') args.dryRun = true;
    else if (a === '--subreddits') args.subreddits = (argv[++i] || '').split(',').map((s) => s.trim()).filter(Boolean);
    else if (a === '--max-issues') args.maxIssues = Math.max(0, parseInt(argv[++i], 10) || MAX_ISSUES_PER_RUN);
    else if (a === '--help' || a === '-h') args.help = true;
  }
  return args;
}

/** Build a word-boundary-aware, case-insensitive RegExp for a keyword. */
function keywordRegex(kw) {
  const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped.replace(/\s+/g, '\\s+')}\\b`, 'i');
}

/** Case-insensitive keyword scan over a text blob; returns matched keywords. */
function matchKeywords(text) {
  const high = [];
  const medium = [];
  for (const kw of HIGH_KEYWORDS) {
    if (keywordRegex(kw).test(text)) high.push(kw);
  }
  for (const kw of MEDIUM_KEYWORDS) {
    if (keywordRegex(kw).test(text)) medium.push(kw);
  }
  for (const { kw, re } of HIGH_PATTERNS) {
    if (re.test(text)) high.push(kw);
  }
  for (const { kw, re } of MEDIUM_PATTERNS) {
    if (re.test(text)) medium.push(kw);
  }
  return { high, medium };
}

/** Score a post. Returns null (not a candidate) or { tier, reason }. */
function scorePost(post) {
  const text = `${post.title || ''}\n${post.selftext || ''}`;
  const { high, medium } = matchKeywords(text);
  if (high.length > 0) return { tier: 'high', reason: 'explicit deal/pricing language', matched: [...new Set(high)] };
  if (medium.length > 0) return { tier: 'medium', reason: 'purchase-intent / offer-lifecycle language', matched: [...new Set(medium)] };
  return null;
}

/** Truncate a verbatim quote to <=max chars on a word boundary. */
function truncate(text, max = 280) {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return { quote: clean, truncated: false };
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return { quote: (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd(), truncated: true };
}

function safeTitle(t, max = 160) {
  const clean = (t || '').replace(/[\r\n]+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

// ---------------------------------------------------------------------------
// State (dedupe) — scripts/reddit-harvest-state.json, committed to the repo
// ---------------------------------------------------------------------------

async function loadState() {
  try {
    const raw = await readFile(STATE_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && parsed.seen && typeof parsed.seen === 'object') return parsed;
  } catch {
    /* missing or corrupt -> start fresh */
  }
  return { version: 1, updated: null, seen: {} };
}

function pruneState(state) {
  const cutoff = Date.now() - SEEN_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  for (const [key, meta] of Object.entries(state.seen)) {
    const t = Date.parse(meta && meta.t ? meta.t : '');
    if (!Number.isFinite(t) || t < cutoff) delete state.seen[key];
  }
}

async function saveState(state) {
  state.updated = new Date().toISOString();
  await writeFile(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

// ---------------------------------------------------------------------------
// Reddit public JSON fetching (polite)
// ---------------------------------------------------------------------------

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
    redirect: 'follow',
  });
  if (res.status === 429) {
    const retryAfter = Number(res.headers.get('retry-after'));
    const waitMs = Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter, 120) * 1000 : RATE_LIMIT_BACKOFF_MS;
    const err = new Error(`429 rate limited (retry-after ${waitMs}ms)`);
    err.status = 429;
    err.waitMs = waitMs;
    throw err;
  }
  if (res.status === 403 || res.status === 418) {
    const err = new Error(`${res.status} blocked by Reddit (datacenter IP or robots)`);
    err.status = res.status;
    throw err;
  }
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  const body = await res.text();
  try {
    return JSON.parse(body);
  } catch {
    const err = new Error('non-JSON response (likely an interstitial/block page)');
    err.status = 0;
    throw err;
  }
}

/**
 * Fetch up to MAX_PAGES_PER_SUB pages of /new for a subreddit.
 * Returns { posts, blocked, via } — blocked means Reddit refused the JSON API.
 * If the public JSON endpoint is blocked (403 / non-JSON wall — increasingly
 * common for logged-out clients), falls back to the public Atom feed
 * (/new/.rss), which is the same public, unauthenticated, no-auth data.
 */
async function fetchNewPosts(sub) {
  const posts = [];
  let after = null;
  let lastError = null;
  for (let page = 0; page < MAX_PAGES_PER_SUB; page++) {
    const params = new URLSearchParams({ limit: String(POSTS_PER_PAGE), raw_json: '1' });
    if (after) params.set('after', after);
    const url = `${REDDIT_BASE}/r/${encodeURIComponent(sub)}/new.json?${params}`;
    let data;
    try {
      data = await fetchJson(url);
    } catch (err) {
      if (err.status === 429) {
        console.error(`  [${sub}] rate limited: ${err.message}. Backing off, skipping remaining pages.`);
        await sleep(err.waitMs);
        return { posts, blocked: '429', via: 'json' };
      }
      lastError = err;
      break; // fall through to RSS fallback
    }
    const children = data && data.data && Array.isArray(data.data.children) ? data.data.children : [];
    if (children.length === 0) break;
    for (const child of children) {
      if (child && child.data && child.data.id) posts.push(child.data);
    }
    after = data.data && data.data.after ? data.data.after : null;
    if (!after) break;
    if (page < MAX_PAGES_PER_SUB - 1) await sleep(REQUEST_GAP_MS);
  }

  if (lastError && posts.length === 0) {
    console.error(`  [${sub}] JSON blocked (${lastError.message}). Trying public Atom feed fallback...`);
    await sleep(REQUEST_GAP_MS);
    try {
      const rssPosts = await fetchNewPostsRss(sub);
      if (rssPosts.length > 0) return { posts: rssPosts, blocked: null, via: 'rss' };
      return { posts, blocked: lastError.status ? String(lastError.status) : 'non-json', via: 'json' };
    } catch (err) {
      if (err.status === 429) {
        // Reddit is throttling this IP globally — back off once, retry once,
        // then give up on the remaining subreddits for this run.
        console.error(`  [${sub}] Atom feed rate limited. Backing off ${RATE_LIMIT_BACKOFF_MS / 1000}s, retrying once...`);
        await sleep(err.waitMs || RATE_LIMIT_BACKOFF_MS);
        try {
          const rssPosts = await fetchNewPostsRss(sub);
          if (rssPosts.length > 0) return { posts: rssPosts, blocked: null, via: 'rss' };
        } catch (retryErr) {
          console.error(`  [${sub}] still rate limited after backoff — aborting remaining subreddits this run.`);
          return { posts, blocked: '429+rss', via: 'rss', abort: true };
        }
        console.error(`  [${sub}] Atom feed returned no entries after backoff. Skipping.`);
        return { posts, blocked: `${lastError.status || 'err'}+rss`, via: 'json' };
      }
      console.error(`  [${sub}] Atom fallback failed too (${(err.stderr || err.message || '').split('\n')[0]}). Skipping subreddit.`);
      return { posts, blocked: `${lastError.status || 'err'}+rss`, via: 'json' };
    }
  }
  return { posts, blocked: null, via: 'json' };
}

// --- Public Atom feed fallback (no auth, same polite posture) -------------

function decodeEntities(s) {
  let out = s;
  for (let i = 0; i < 2; i++) { // Reddit double-escapes some entities
    out = out
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ')
      .replace(/&#(\d+);/g, (m, d) => { const n = Number(d); return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : m; })
      .replace(/&#x([0-9a-f]+);/gi, (m, h) => { const n = parseInt(h, 16); return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : m; })
      .replace(/&amp;/g, '&');
  }
  return out;
}

function stripTags(html) {
  let s = decodeEntities(String(html)); // reveal real markup first
  s = s.replace(/<[^>]*>/g, ' ');       // strip tags
  return decodeEntities(s).replace(/\s+/g, ' ').trim();
}

function pick(block, tag) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return m ? m[1] : '';
}

/**
 * Fetch the subreddit's public Atom "new" feed (single page, ~25 entries).
 * Throws on HTTP errors so the caller can report the sub as blocked.
 */
async function fetchNewPostsRss(sub) {
  const url = `${REDDIT_BASE}/r/${encodeURIComponent(sub)}/new/.rss`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, Accept: 'application/atom+xml, application/xml, text/xml' } });
  if (res.status === 429) {
    const retryAfter = Number(res.headers.get('retry-after'));
    const err = new Error('HTTP 429 on Atom feed');
    err.status = 429;
    err.waitMs = Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter, 120) * 1000 : RATE_LIMIT_BACKOFF_MS;
    throw err;
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const xml = await res.text();
  if (!/<entry[\s>]/i.test(xml)) throw new Error('no <entry> elements (block page?)');
  const entries = xml.split(/<entry[\s>]/i).slice(1);
  const posts = [];
  for (const entry of entries) {
    const block = entry.split('</entry>')[0];
    const id = (pick(block, 'id').match(/t3_(\w+)/) || [])[1];
    const linkHref = (block.match(/<link[^>]*href="([^"]+)"/i) || [])[1] || '';
    if (!id || !linkHref) continue;
    const permalink = linkHref.replace(/^https?:\/\/[^/]+/i, '');
    const title = stripTags(pick(block, 'title'));
    const author = stripTags(pick(block, 'name')).replace(/^\/?u\//i, '');
    const published = pick(block, 'published') || pick(block, 'updated');
    const createdSec = Number.isFinite(Date.parse(published)) ? Date.parse(published) / 1000 : 0;
    const contentMatch = block.match(/<content[^>]*>([\s\S]*?)<\/content>/i);
    const selftext = contentMatch ? stripTags(contentMatch[1]).replace(/\s+/g, ' ').trim() : '';
    posts.push({ id, title, selftext, author, permalink, created_utc: createdSec });
  }
  return posts;
}

// ---------------------------------------------------------------------------
// GitHub issue creation via gh CLI
// ---------------------------------------------------------------------------

async function ensureLabel() {
  try {
    await execFileP('gh', ['label', 'create', LABEL, '--repo', REPO, '--color', '0E8A16', '--description', 'Candidate deal lead; needs human editorial verification']);
  } catch {
    // Label already exists (or auth issue) — creating the issue will surface real errors.
  }
}

function leadIssueBody(lead) {
  const { post, sub, tier, reason, matched } = lead;
  const permalink = `https://www.reddit.com${post.permalink}`;
  const created = new Date((post.created_utc || 0) * 1000).toISOString();
  const { quote, truncated } = truncate(post.selftext || post.title || '');
  const quoteText = quote ? `"${quote}"${truncated ? '\n\n_(Quote truncated to 280 characters — open the URL to read the full post.)_' : ''}` : '_(No post body — open the URL to view the content.)_';
  return [
    '## New deal lead — needs human verification',
    '',
    'Collected automatically from public Reddit JSON. **Nothing is published until an editor verifies and publishes it manually.**',
    '',
    '| Field | Value |',
    '| --- | --- |',
    `| Post URL | ${permalink} |`,
    `| Subreddit | r/${sub} |`,
    `| Author | u/${post.author || '[unknown]'} (public username only) |`,
    `| Posted (UTC) | ${created} |`,
    `| Score tier | **${tier}** — ${reason} |`,
    `| Matched keywords | ${matched.join(', ')} |`,
    '',
    '### Verbatim excerpt (<=280 chars)',
    '',
    quoteText,
    '',
    '## Editor checklist',
    '',
    '- [ ] Verify the price/offer on the official vendor source (not the Reddit post)',
    '- [ ] Check expiry and terms of the offer',
    '- [ ] Confirm eligibility (region, student status, plan requirements, etc.)',
    '- [ ] Discard if stale, incorrect, spam, or off-editorial',
    '- [ ] If publishing: rewrite in our own words, link-first to the Reddit thread, state the catch upfront',
    '',
    '---',
    `_Automated lead via \`scripts/reddit-harvest.mjs\` · manual-leads model (compliance-reviewed) · link-first · no PII beyond public username_`,
  ].join('\n');
}

async function createIssue(lead) {
  const title = `[lead] r/${lead.sub} ${lead.tier} ${safeTitle(lead.post.title, 140)}`;
  const body = leadIssueBody(lead);
  const res = await execFileP('gh', [
    'issue', 'create',
    '--repo', REPO,
    '--title', title,
    '--body', body,
    '--label', LABEL,
  ], { timeout: 60_000 });
  return { title, url: (res.stdout || '').trim() };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log('Usage: node scripts/reddit-harvest.mjs [--dry-run] [--subreddits a,b,c] [--max-issues N]');
    process.exit(0);
  }

  const subreddits = args.subreddits && args.subreddits.length > 0 ? args.subreddits : DEFAULT_SUBREDDITS;
  console.log(`token-perks reddit-lead harvester — repo ${REPO}${args.dryRun ? ' [DRY RUN: no issues, no state writes]' : ''}`);
  console.log(`Subreddits (${subreddits.length}): ${subreddits.join(', ')}`);

  const state = await loadState();
  pruneState(state);

  const candidates = [];
  const blocked = [];
  let scored = 0;

  for (const sub of subreddits) {
    if (candidates.length >= args.maxIssues) break;
    await sleep(REQUEST_GAP_MS); // polite gap before every request
    console.log(`r/${sub}: fetching /new ...`);
    const { posts, blocked: blockedReason, via, abort } = await fetchNewPosts(sub);
    if (blockedReason) blocked.push(`r/${sub} (${blockedReason})`);
    else if (via === 'rss') console.log(`  [${sub}] served via public Atom feed fallback`);
    let newCount = 0;
    for (const post of posts) {
      const key = `${sub}:${post.id}`;
      if (state.seen[key]) continue;
      newCount++;
      const verdict = scorePost(post);
      if (!verdict) {
        // Not a candidate: nothing to lose by forgetting it — mark seen so we
        // stop re-scoring it on every run.
        state.seen[key] = { t: new Date().toISOString(), tier: 'none' };
        continue;
      }
      scored++;
      if (candidates.length < args.maxIssues) {
        candidates.push({ sub, post, tier: verdict.tier, reason: verdict.reason, matched: verdict.matched });
      }
    }
    console.log(`r/${sub}: ${posts.length} posts, ${newCount} unseen, ${candidates.length}/${args.maxIssues} candidate slots filled`);
    if (abort) break;
  }

  console.log(`\nScored ${scored} new candidate post(s); harvesting ${candidates.length} (cap ${args.maxIssues}).`);
  if (blocked.length > 0) {
    console.log(`Blocked/rate-limited subreddits (skipped gracefully): ${blocked.join(', ')}`);
  }

  if (args.dryRun) {
    for (const c of candidates) {
      const { quote, truncated } = truncate(c.post.selftext || '');
      console.log('\n--- candidate ---');
      console.log(`title     : ${safeTitle(c.post.title)}`);
      console.log(`issue     : [lead] r/${c.sub} ${c.tier} ${safeTitle(c.post.title, 140)}`);
      console.log(`subreddit : r/${c.sub}   author: u/${c.post.author || '[unknown]'}`);
      console.log(`posted    : ${new Date((c.post.created_utc || 0) * 1000).toISOString()}`);
      console.log(`url       : https://www.reddit.com${c.post.permalink}`);
      console.log(`tier      : ${c.tier} (${c.reason})`);
      console.log(`keywords  : ${c.matched.join(', ')}`);
      console.log(`quote     : ${quote || '(no body)'}${truncated ? ' [...]' : ''}`);
    }
    console.log(`\nDRY RUN complete. ${candidates.length} candidate(s) printed; no issues created, state file untouched.`);
    return;
  }

  // Mark every seen-but-unharvested post too, so we never re-scan them.
  // (Done after selection so a crash mid-run can't silently lose candidates:
  // state is only saved once issues have actually been attempted.)
  await ensureLabel();

  const created = [];
  const failed = [];
  for (const c of candidates) {
    try {
      const { title, url } = await createIssue(c);
      console.log(`issue created: ${url} — ${title}`);
      created.push(url);
    } catch (err) {
      const msg = (err.stderr || err.message || '').split('\n')[0];
      console.error(`issue creation FAILED for ${c.post.id}: ${msg}`);
      failed.push(c);
      continue; // keep going with the rest; don't mark seen so next run retries
    }
    state.seen[`${c.sub}:${c.post.id}`] = { t: new Date().toISOString(), tier: c.tier };
  }

  if (created.length === 0 && failed.length > 0 && candidates.length > 0) {
    console.error('\nAll issue creations failed — not saving state (will retry next run). Check `gh auth status`.');
    process.exitCode = 1;
    return;
  }

  await saveState(state);
  console.log(`\nDone. ${created.length} issue(s) created, ${failed.length} failed. State saved to ${STATE_FILE}.`);
}

main().catch((err) => {
  console.error(`fatal: ${err && err.stack ? err.stack : err}`);
  process.exit(1);
});
