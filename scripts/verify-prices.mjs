#!/usr/bin/env node
/**
 * Price re-verification bot (V1) for token-perks.com
 *
 * TRIPWIRE, NOT A TERMS READER: this script fetches each OFFICIAL price-bearing
 * URL registered in scripts/verify-prices-sources.json and runs cheap positive
 * string checks against the page's visible text. A PASS proves "the official
 * page is up and still names the product/prices we expect to see" — nothing
 * more. Humans still read terms and confirm prices before we edit any
 * content/offers/*.json snapshot. This bot NEVER edits content snapshots.
 *
 * Statuses per source:
 *   PASS   page fetched (2xx) and at least `min_hits` of `expect` strings found
 *   DRIFT  page fetched but expected strings absent — needs human look
 *   ERROR  fetch failed (network / non-2xx after one polite retry)
 *   MANUAL no fetchable official URL exists; a human must verify in-product
 *
 * Posture:
 *  - No npm dependencies. Requires Node >= 18 (global fetch) and, only when a
 *    GitHub issue must be filed, the `gh` CLI (authenticated via GH_TOKEN).
 *  - Polite custom User-Agent (token-perks-verifier/0.1), serial requests,
 *    >=1 request/second spacing, ONE retry after a backoff, then give up.
 *  - String checks run against VISIBLE TEXT only: <script>/<style>/<noscript>
 *    blocks and markup are stripped first, so React-flight junk like
 *    "$19:props:children" can never fake a price match.
 *  - On any DRIFT/ERROR it writes the report to the GitHub job summary and,
 *    in GitHub Actions (or with --issue), files ONE issue per run
 *    "[verify] N source(s) drifted — <date>" with the full table. A human
 *    decides; nothing is auto-edited.
 *
 * Usage:
 *   node scripts/verify-prices.mjs                    # run; report to stdout
 *   node scripts/verify-prices.mjs --write-log        # + append docs/verification-log.md
 *   node scripts/verify-prices.mjs --write-log --log <file>  # append a different log (tests)
 *   node scripts/verify-prices.mjs --summary out.md   # + write report file
 *   node scripts/verify-prices.mjs --json             # machine-readable output
 *   node scripts/verify-prices.mjs --strict           # exit 1 on drift/error
 *   node scripts/verify-prices.mjs --issue            # force issue attempt (needs gh)
 *   node scripts/verify-prices.mjs --no-issue         # never file an issue
 *   node scripts/verify-prices.mjs --sources other.json   # override registry (tests)
 *   node scripts/verify-prices.mjs --cache-dir /tmp/vpc   # reuse fetched pages across runs (tests)
 *
 * Docs: docs/verify-prices.md
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, writeFile, appendFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';

const execFileP = promisify(execFile);

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..');
const DEFAULT_SOURCES = path.join(SCRIPT_DIR, 'verify-prices-sources.json');
const DEFAULT_LOG = path.join(REPO_ROOT, 'docs', 'verification-log.md');
const BOT_VERSION = 'verify-prices/0.1';

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = {
    sources: DEFAULT_SOURCES,
    log: DEFAULT_LOG,
    writeLog: false,
    summary: null,
    json: false,
    strict: false,
    issue: null, // null = auto (only in GitHub Actions)
    cacheDir: null,
    timeoutMs: null,
    help: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    switch (a) {
      case '--sources': args.sources = next(); break;
      case '--write-log': args.writeLog = true; break;
      case '--log': args.log = next(); break;
      case '--summary': args.summary = next(); break;
      case '--json': args.json = true; break;
      case '--strict': args.strict = true; break;
      case '--issue': args.issue = true; break;
      case '--no-issue': args.issue = false; break;
      case '--cache-dir': args.cacheDir = next(); break;
      case '--timeout': args.timeoutMs = Number(next()); break;
      case '--help': case '-h': args.help = true; break;
      default: throw new Error(`unknown flag: ${a}`);
    }
  }
  return args;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  copy: '(c)', reg: '(r)', trade: '(tm)', hellip: '...', mdash: '-', ndash: '-',
  rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', middot: '.', bull: '*',
};

function decodeEntities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => safeCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => safeCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m);
}

function safeCodePoint(n) {
  if (!Number.isFinite(n) || n < 0 || n > 0x10ffff) return '';
  try { return String.fromCodePoint(n); } catch { return ''; }
}

/**
 * Visible text only. Strips script/style/noscript blocks, comments, and tags,
 * then decodes entities and collapses whitespace + lowercases. This is what
 * keeps React-server-component payloads (e.g. "$19:props:children") from
 * faking price matches.
 */
function visibleText(body) {
  return decodeEntities(
    String(body)
      .replace(/<script\b[\s\S]*?<\/script\s*>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style\s*>/gi, ' ')
      .replace(/<noscript\b[\s\S]*?<\/noscript\s*>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<[^>]*>/g, ' ')
  ).replace(/\s+/g, ' ').toLowerCase();
}

function mdEscape(s) {
  return String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

function nowUtc() {
  return new Date().toISOString().replace('T', ' ').replace(/\..*/, 'Z');
}

function triggerLabel() {
  if (process.env.GITHUB_ACTIONS === 'true') {
    const ev = process.env.GITHUB_EVENT_NAME || 'unknown';
    const url = process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
      ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : '';
    return `github-actions ${ev}${url ? ` ${url}` : ''}`;
  }
  return 'local';
}

// ---------------------------------------------------------------------------
// Fetching (polite)
// ---------------------------------------------------------------------------

async function fetchBody(url, cfg, cacheDir) {
  const cacheKey = createHash('sha1').update(url).digest('hex');
  const cacheFile = cacheDir ? path.join(cacheDir, `${cacheKey}.body`) : null;
  const cacheMeta = cacheDir ? path.join(cacheDir, `${cacheKey}.meta.json`) : null;

  if (cacheFile && cacheMeta) {
    try {
      const body = await readFile(cacheFile, 'utf8');
      const meta = JSON.parse(await readFile(cacheMeta, 'utf8'));
      return { ...meta, body, cached: true };
    } catch { /* cache miss */ }
  }

  const attempt = async () => {
    const t0 = Date.now();
    const res = await fetch(url, {
      headers: {
        'user-agent': cfg.user_agent,
        'accept': 'text/html,application/json;q=0.9,*/*;q=0.5',
        'accept-language': 'en',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(cfg.timeout_ms),
    });
    const body = await res.text();
    return {
      ok: res.ok,
      status: res.status,
      finalUrl: res.url,
      bytes: body.length,
      ms: Date.now() - t0,
      body,
    };
  };

  let out;
  try {
    out = await attempt();
  } catch {
    // Network-level failure or timeout: back off once, retry once, then give up.
    // The retried attempt's error is the one reported if this also fails.
    await sleep(cfg.retry_backoff_ms);
    try {
      out = await attempt();
      out.retried = true;
    } catch (err2) {
      return {
        ok: false, status: 0, finalUrl: url, bytes: 0, ms: 0,
        error: `${err2.name || 'Error'}: ${err2.cause?.code || err2.message || err2}`,
        retried: true,
      };
    }
  }

  // HTTP-level failure (429 / 5xx): back off once, retry once.
  if (!out.ok && (out.status === 429 || out.status >= 500)) {
    await sleep(cfg.retry_backoff_ms);
    try {
      const second = await attempt();
      out = { ...second, retried: true };
    } catch (err2) {
      out = { ...out, error: `${err2.name || 'Error'}: ${err2.cause?.code || err2.message || err2}`, retried: true };
    }
  }

  if (cacheDir) {
    try {
      await mkdir(cacheDir, { recursive: true });
      await writeFile(cacheFile, out.body);
      await writeFile(cacheMeta, JSON.stringify({
        ok: out.ok, status: out.status, finalUrl: out.finalUrl, bytes: out.bytes, ms: out.ms,
        fetched_at: new Date().toISOString(),
      }));
    } catch { /* cache is best-effort */ }
  }
  return { ...out, cached: false };
}

// ---------------------------------------------------------------------------
// Evaluation
// ---------------------------------------------------------------------------

function evaluateSource(source, fetchResult) {
  const text = visibleText(fetchResult.body ?? '');
  const found = (source.expect || []).filter((s) => text.includes(s.toLowerCase()));
  const missing = (source.expect || []).filter((s) => !text.includes(s.toLowerCase()));
  const softFound = (source.soft || []).filter((s) => text.includes(s.toLowerCase()));
  const softMissing = (source.soft || []).filter((s) => !text.includes(s.toLowerCase()));
  const hits = found.length;
  const required = source.min_hits ?? 1;
  const pass = hits >= required;
  return {
    ...source,
    status: pass ? 'PASS' : 'DRIFT',
    found, missing, softFound, softMissing, hits, required,
  };
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

function buildReport(registry, results, runStartedUtc) {
  const counts = { PASS: 0, DRIFT: 0, ERROR: 0, MANUAL: 0 };
  for (const r of results) counts[r.status]++;

  const L = [];
  L.push(`## Price re-verification report`);
  L.push('');
  L.push(`Run started **${runStartedUtc}** with \`${BOT_VERSION}\` (registry \`checked_on ${registry.checked_on}\`).`);
  L.push('');
  L.push(`**What a PASS means (and what it does not):** the official page was reachable and still shows the expected product/price strings in its visible text. It is a tripwire, **not** a terms read — a human still confirms wording, quotas, and renewal terms before any \`content/offers/*.json\` snapshot changes. This bot never edits snapshots.`);
  L.push('');
  L.push(`**Result: ${counts.PASS} PASS, ${counts.DRIFT} DRIFT, ${counts.ERROR} ERROR, ${counts.MANUAL} MANUAL** (${results.length} sources).`);
  L.push('');
  L.push(`DRIFT = page fetched but expected strings absent (needs human look). ERROR = fetch failed after one polite retry (often bot-blocking or a geo redirect — also needs human look). MANUAL = no fetchable official URL exists; a human verifies in-product.`);
  L.push('');
  L.push(`| # | Source | Offer | Status | Expect (hits/req) | Found | Soft (prices) | Checked at (UTC) |`);
  L.push(`|---|--------|-------|--------|-------------------|-------|---------------|------------------|`);
  results.forEach((r, i) => {
    const soft = r.status === 'MANUAL'
      ? 'n/a'
      : (r.soft || []).length
        ? `${(r.softFound || []).length}/${r.soft.length} found${(r.softMissing || []).length ? ` (absent: ${r.softMissing.map(mdEscape).join(', ')})` : ''}`
        : 'none registered';
    L.push([
      i + 1,
      mdEscape(r.label || r.id),
      mdEscape(r.offer_id),
      r.status === 'PASS' ? 'PASS' : `**${r.status}**`,
      r.status === 'MANUAL' ? 'n/a' : `${r.hits ?? 0}/${r.required ?? 1}`,
      r.status === 'MANUAL' ? 'n/a' : ((r.found || []).length ? r.found.map(mdEscape).join(', ') : '(none)'),
      soft,
      r.checked_at || runStartedUtc,
    ].map((c, ci) => (ci === 0 ? c : String(c))).join(' | ').replace(/^/, '| ').concat(' |'));
  });
  L.push('');

  const problem = results.filter((r) => r.status === 'DRIFT' || r.status === 'ERROR');
  if (problem.length) {
    L.push(`### Needs a human look`);
    L.push('');
    for (const r of problem) {
      L.push(`- **${r.status} — ${r.label || r.id}** (\`${r.offer_id}\`, ${r.url || 'no URL'})`);
      if (r.status === 'DRIFT') {
        L.push(`  - Missing expected strings: ${r.missing.map(mdEscape).join(', ')}. Found: ${r.found.length ? r.found.map(mdEscape).join(', ') : 'none'}.`);
      }
      if (r.status === 'ERROR') L.push(`  - Fetch error: ${mdEscape(r.error || `HTTP ${r.status_code}`)}.`);
      L.push(`  - Next step: open the URL in a browser (bot blocking and geo/currency variants are common), compare against \`content/offers/${r.offer_id}.json\`, and if prices/wording changed, have a human update the snapshot with a fresh \`verified_at\`. The bot never edits snapshots.`);
    }
    L.push('');
  }

  const manual = results.filter((r) => r.status === 'MANUAL');
  if (manual.length) {
    L.push(`### Manual (in-product) checks owed`);
    L.push('');
    for (const r of manual) {
      L.push(`- **${r.label || r.id}** (\`${r.offer_id}\`): ${mdEscape(r.manual_reason || '')} How: ${mdEscape(r.how_to_verify || 'see offer page.')}`);
    }
    L.push('');
  }

  L.push(`### Known limits of this bot`);
  L.push('');
  L.push(`- String presence is not a terms read, and client-rendered prices are invisible to it: for Kimi, the tier dollar figures are registered as *soft* strings because the official pages load them client-side; their absence is expected, not drift.`);
  L.push(`- Some providers block datacenter IPs or serve geo/currency variants — expect occasional honest ERRORs/DRIFTs from CI runners. That noise is the point of a tripwire: a human looks, decides, and records the outcome.`);
  L.push(`- Cadence: V1 runs weekly (Monday 13:23 UTC) plus manual runs. The editorial promise of *daily* checks for active promos is covered by humans today — see docs/verify-prices.md for the escalation path and how to enable a daily cron.`);
  L.push('');
  return L.join('\n');
}

// ---------------------------------------------------------------------------
// Log
// ---------------------------------------------------------------------------

async function appendRunLog(logPath, runStartedUtc, results) {
  const counts = { PASS: 0, DRIFT: 0, ERROR: 0, MANUAL: 0 };
  for (const r of results) counts[r.status]++;

  let exists = true;
  try { await readFile(logPath, 'utf8'); } catch { exists = false; }

  if (!exists) {
    const header = [
      '# Price verification log',
      '',
      'Dated re-verification trail for the editorial claim that Token Perks re-verifies prices',
      '(weekly bot runs; humans re-verify active promos and any DRIFT). One row per run — committed.',
      '',
      '| run_utc | sources_checked | pass | drift | error | manual | trigger |',
      '|---------|-----------------|------|-------|-------|--------|---------|',
    ].join('\n');
    await mkdir(path.dirname(logPath), { recursive: true });
    await writeFile(logPath, header + '\n', 'utf8');
  }

  const row = `| ${runStartedUtc} | ${results.length} | ${counts.PASS} | ${counts.DRIFT} | ${counts.ERROR} | ${counts.MANUAL} | ${triggerLabel()} |`;
  await appendFile(logPath, row + '\n', 'utf8');
  return row;
}

// ---------------------------------------------------------------------------
// GitHub issue (via gh CLI)
// ---------------------------------------------------------------------------

async function fileIssue(results, runStartedUtc, report) {
  const counts = { DRIFT: 0, ERROR: 0 };
  for (const r of results) if (counts[r.status] !== undefined) counts[r.status]++;
  const n = counts.DRIFT + counts.ERROR;
  const title = `[verify] ${n} source(s) drifted — ${todayUtc()}`;

  const gh = async (args, input) => {
    const opts = { timeout: 60000 };
    if (input !== undefined) opts.input = input;
    const { stdout } = await execFileP('gh', args, opts);
    return stdout;
  };

  // Dedupe: if an open issue with the exact same title exists, do not re-file.
  // Titles are matched client-side so GitHub search syntax cannot skip a twin.
  try {
    const list = await gh(['issue', 'list', '--state', 'open', '--limit', '100', '--json', 'number,title']);
    const dup = JSON.parse(list || '[]').find((i) => i.title === title);
    if (dup) {
      return { filed: false, skipped: true, title, url: `issue #${dup.number}`, note: 'open issue with identical title already exists' };
    }
  } catch (err) {
    return { filed: false, error: `gh issue list failed: ${err.message.split('\n')[0]}` };
  }

  const body = [
    `Automated price re-verification found **${n} source(s) needing a human look** (run ${runStartedUtc}).`,
    '',
    report,
    '',
    '---',
    `_Filed by \`${BOT_VERSION}\`. A human decides what (if anything) changed: compare each flagged URL against the offer snapshot in \`content/offers/\`, update the snapshot with a fresh \`verified_at\` if needed, then close this issue with a one-line resolution. The bot never edits snapshots._`,
  ].join('\n');

  try {
    const url = (await gh(['issue', 'create', '--title', title, '--body-file', '-'], body)).trim();
    return { filed: true, title, url };
  } catch (err) {
    return { filed: false, error: `gh issue create failed: ${err.message.split('\n')[0]}` };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  let args;
  try {
    args = parseArgs(process.argv);
  } catch (err) {
    console.error(`${BOT_VERSION}: ${err.message}`);
    console.error('See docs/verify-prices.md for usage.');
    process.exit(2);
  }
  if (args.help) {
    console.log(`Usage: node scripts/verify-prices.mjs [--write-log [--log <file>]] [--summary <file>] [--json] [--strict] [--issue|--no-issue] [--sources <file>] [--cache-dir <dir>] [--timeout <ms>]

Statuses: PASS (expected strings found) / DRIFT (page fetched, strings absent) / ERROR (fetch failed) / MANUAL (no official URL; human verifies in-product).
Docs: docs/verify-prices.md`);
    return;
  }

  let registry;
  try {
    registry = JSON.parse(await readFile(args.sources, 'utf8'));
    if (!Array.isArray(registry.sources)) throw new Error('registry has no sources[] array');
  } catch (err) {
    console.error(`${BOT_VERSION}: cannot load registry ${args.sources}: ${err.message}`);
    process.exit(2);
  }

  const cfg = {
    user_agent: registry.user_agent || 'token-perks-verifier/0.1',
    min_delay_ms: registry.policy?.min_delay_ms ?? 1000,
    timeout_ms: args.timeoutMs ?? registry.policy?.timeout_ms ?? 20000,
    max_retries: registry.policy?.max_retries ?? 1,
    retry_backoff_ms: registry.policy?.retry_backoff_ms ?? 4000,
  };

  const runStartedUtc = nowUtc();
  const results = [];

  for (const source of registry.sources) {
    if (source.manual) {
      results.push({ ...source, status: 'MANUAL', checked_at: runStartedUtc });
      continue;
    }
    let fetchResult;
    const prevSameUrl = results.find((r) => r.url === source.url && r._fetch);
    if (prevSameUrl) {
      fetchResult = prevSameUrl._fetch;
    } else {
      // >= 1 req/sec spacing toward the real server; cache hits make no
      // network request, so they do not need to wait.
      const last = results[results.length - 1];
      const lastWasNetwork = last?._fetch && !last._fetch.cached;
      if (lastWasNetwork) await sleep(cfg.min_delay_ms);
      fetchResult = await fetchBody(source.url, cfg, args.cacheDir);
      fetchResult.fetched_at = new Date().toISOString().replace('T', ' ').replace(/\..*/, 'Z');
    }

    if (!fetchResult.ok) {
      const expectAll = source.expect || [];
      const softAll = source.soft || [];
      results.push({
        ...source,
        status: 'ERROR',
        // Normalised so the report table renders without special cases.
        expect: expectAll,
        soft: softAll,
        found: [], missing: expectAll, softFound: [], softMissing: softAll,
        hits: 0, required: source.min_hits ?? 1,
        error: fetchResult.error || `HTTP ${fetchResult.status}`,
        status_code: fetchResult.status,
        final_url: fetchResult.finalUrl,
        checked_at: fetchResult.fetched_at || runStartedUtc,
        _fetch: fetchResult,
      });
      continue;
    }

    const evaluated = evaluateSource(source, fetchResult);
    results.push({
      ...evaluated,
      status_code: fetchResult.status,
      final_url: fetchResult.finalUrl,
      bytes: fetchResult.bytes,
      ms: fetchResult.ms,
      cached: fetchResult.cached,
      checked_at: fetchResult.fetched_at || runStartedUtc,
      _fetch: fetchResult,
    });
  }

  const counts = { PASS: 0, DRIFT: 0, ERROR: 0, MANUAL: 0 };
  for (const r of results) counts[r.status]++;

  const report = buildReport(registry, results, runStartedUtc);

  // Outputs --------------------------------------------------------------
  if (args.json) {
    const payload = {
      bot: BOT_VERSION,
      run_started_utc: runStartedUtc,
      registry_checked_on: registry.checked_on,
      counts,
      results: results.map(({ _fetch, ...r }) => ({ ...r, http_status: _fetch?.status ?? null })),
    };
    console.log(JSON.stringify(payload, null, 2));
  } else {
    console.log(report);
  }

  if (args.summary) {
    await writeFile(args.summary, report + '\n', 'utf8');
    if (!args.json) console.log(`\nReport written to ${args.summary}`);
  }
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, report + '\n', 'utf8');
    if (!args.json) console.log(`Report appended to $GITHUB_STEP_SUMMARY`);
  }

  let logRow = null;
  if (args.writeLog) {
    logRow = await appendRunLog(args.log, runStartedUtc, results);
    if (!args.json) console.log(`Log row appended to ${args.log}:\n  ${logRow}`);
  }

  // Issue (on any DRIFT/ERROR) --------------------------------------------
  const shouldTryIssue =
    args.issue === true ||
    (args.issue === null && process.env.GITHUB_ACTIONS === 'true' && counts.DRIFT + counts.ERROR > 0);
  let issue = null;
  if (counts.DRIFT + counts.ERROR > 0 && args.issue !== false) {
    if (shouldTryIssue) {
      issue = await fileIssue(results, runStartedUtc, report);
      if (!args.json) {
        if (issue.filed) console.log(`Issue filed: ${issue.title} -> ${issue.url}`);
        else if (issue.skipped) console.log(`Issue not duplicated: ${issue.note} (${issue.url})`);
        else console.warn(`Issue not filed: ${issue.error}`);
      }
    } else {
      if (!args.json) console.log(`(DRIFT/ERROR present; issue filing skipped outside GitHub Actions — pass --issue to force.)`);
    }
  }

  // Exit code: 0 unless --strict (then 1 on any DRIFT/ERROR).
  if (args.strict && counts.DRIFT + counts.ERROR > 0) process.exit(1);
}

main().catch((err) => {
  console.error(`${BOT_VERSION}: unexpected failure: ${err?.stack || err}`);
  process.exit(2);
});
