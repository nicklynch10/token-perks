#!/usr/bin/env node
/**
 * Traffic + uptime monitor V1 — token-perks.com (CloudFront distribution E35NUFJX0GCO4P)
 *
 * What it does, in order:
 *   1. UPTIME  — GET https://<cf-domain>/ , /best/ , /api/offers.json
 *                (redirects are recorded, never followed — a 308 trailing-slash
 *                normalization shows up as its own status + Location).
 *   2. TRAFFIC — CloudWatch GetMetricData, last 7 days (plus the prior 7 for
 *                week-over-week): Requests, BytesTransferred, CacheHitRate,
 *                4xxErrorRate, 5xxErrorRate. Namespace AWS/CloudFront,
 *                dimensions DistributionId + Region=Global.
 *   3. REPORT  — one markdown doc to stdout (pipe into $GITHUB_STEP_SUMMARY).
 *   4. ISSUE   — create (or comment on) the ONE rolling GitHub issue titled
 *                "[monitor] weekly traffic + uptime — week of <date>" via gh CLI.
 *
 * Privacy: aggregate counts only. No cookies, no client-side analytics JS,
 * no IPs, no user identifiers, no PII — see docs/traffic-monitor.md.
 *
 * Dependencies: none (global fetch + AWS CLI via child_process + gh CLI).
 *
 * Environment (all optional):
 *   CF_DOMAIN            override CloudFront domain
 *                        (default d137cbb3frxl9a.cloudfront.net)
 *   CF_DISTRIBUTION_ID   override distribution id (default E35NUFJX0GCO4P)
 *   GITHUB_REPOSITORY /  repo for the issue (GitHub sets GITHUB_REPOSITORY in
 *   GH_REPO              CI; default nicklynch10/token-perks)
 *   SITE_LAUNCHED=1      set after DNS cutover — drops the pre-launch banner
 *   MONITOR_SKIP_ISSUE=1 report to stdout only, do not touch GitHub issues
 */

import { execFile } from 'node:child_process';
import { mkdtemp, writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

// --- configuration -----------------------------------------------------------

const DISTRIBUTION_ID = process.env.CF_DISTRIBUTION_ID || 'E35NUFJX0GCO4P';
const CF_DOMAIN = process.env.CF_DOMAIN || 'd137cbb3frxl9a.cloudfront.net';
const SITE = 'token-perks.com';
const REPO = process.env.GITHUB_REPOSITORY || process.env.GH_REPO || 'nicklynch10/token-perks';
const AWS_REGION = 'us-east-1';
const NAMESPACE = 'AWS/CloudFront';
const TITLE_PREFIX = '[monitor] weekly traffic + uptime';
const UPTIME_PATHS = ['/', '/best/', '/api/offers.json'];
const TIMEOUT_MS = Number(process.env.MONITOR_TIMEOUT_MS) || 15000;
const DAY_MS = 86_400_000;
const LAUNCHED = ['1', 'true', 'yes'].includes((process.env.SITE_LAUNCHED || '').toLowerCase());
const SKIP_ISSUE = ['1', 'true', 'yes'].includes((process.env.MONITOR_SKIP_ISSUE || '').toLowerCase());

// --- helpers -----------------------------------------------------------------

/** truthy check on numbers that may be null/undefined */
const hasData = (values) => Array.isArray(values) && values.length > 0;
const sum = (a) => a.reduce((x, y) => x + y, 0);
const mean = (a) => (a.length ? sum(a) / a.length : null);

const fmtInt = (n) => (n == null ? 'no data' : Math.round(n).toLocaleString('en-US'));
const fmtPct = (n) => (n == null ? 'no data' : `${n.toFixed(1)}%`);
function fmtBytes(n) {
  if (n == null) return 'no data';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let v = n;
  let u = 0;
  while (v >= 1024 && u < units.length - 1) {
    v /= 1024;
    u += 1;
  }
  return `${u === 0 || v >= 100 ? Math.round(v) : v.toFixed(1)} ${units[u]}`;
}
/** signed % change; null on either side → '—' */
function fmtDelta(cur, prev) {
  if (cur == null || prev == null) return '—';
  if (prev === 0) return cur === 0 ? '±0' : 'new';
  const pct = ((cur - prev) / prev) * 100;
  return `${pct > 0 ? '+' : ''}${pct.toFixed(1)}%`;
}

const isoDay = (d) => d.toISOString().slice(0, 10);

/**
 * execFile does not do PATHEXT resolution on Windows, so bare 'aws'/'gh' can
 * fail with ENOENT even when aws.exe/gh.exe are on PATH. Probe candidates once.
 */
const cmdCache = new Map();
async function resolveCmd(name) {
  if (cmdCache.has(name)) return cmdCache.get(name);
  const extra =
    process.platform === 'win32'
      ? [`${name}.exe`, `C:\\Program Files\\${name === 'aws' ? 'Amazon\\AWSCLIV2' : 'GitHub CLI'}\\${name}.exe`]
      : [];
  for (const candidate of [name, ...extra]) {
    try {
      await run(candidate, ['--version'], { timeout: 20_000 });
      cmdCache.set(name, candidate);
      return candidate;
    } catch (err) {
      if (err && err.code !== 'ENOENT') {
        cmdCache.set(name, candidate); // found; probe failure is not our problem
        return candidate;
      }
    }
  }
  throw new Error(`${name} CLI not found on PATH`);
}

// --- uptime -------------------------------------------------------------------

/** One GET; records status/body-bytes/TTFB. Redirects are NOT followed. */
async function checkPath(p) {
  const url = `https://${CF_DOMAIN}${p}`;
  const started = performance.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: 'manual',
      signal: controller.signal,
      headers: { 'user-agent': 'token-perks-uptime-monitor/1.0' },
    });
    const ttfbMs = Math.round(performance.now() - started); // DNS+TLS+request → headers
    const body = await res.arrayBuffer();
    return {
      path: p,
      url,
      status: res.status,
      location: res.headers.get('location'),
      bytes: body.byteLength,
      ttfbMs,
      error: null,
    };
  } catch (err) {
    const msg =
      err && err.name === 'AbortError'
        ? `timeout after ${TIMEOUT_MS}ms`
        : (err && (err.cause?.message || err.message)) || String(err);
    return { path: p, url, status: null, location: null, bytes: null, ttfbMs: null, error: msg };
  } finally {
    clearTimeout(timer);
  }
}

// --- traffic (CloudWatch via AWS CLI) ------------------------------------------

function metricQuery(id, metricName, stat) {
  return {
    Id: id,
    MetricStat: {
      Metric: {
        Namespace: NAMESPACE,
        MetricName: metricName,
        Dimensions: [
          { Name: 'DistributionId', Value: DISTRIBUTION_ID },
          { Name: 'Region', Value: 'Global' },
        ],
      },
      Period: 86_400,
      Stat: stat,
    },
    ReturnData: true,
  };
}

/** 14-day GetMetricData split into "this week" (last 7d) and "last week". */
async function fetchTraffic(periodEnd) {
  const weekStart = new Date(periodEnd.getTime() - 7 * DAY_MS);
  const windowStart = new Date(periodEnd.getTime() - 14 * DAY_MS);
  const queries = [
    metricQuery('requests', 'Requests', 'Sum'),
    metricQuery('bytes', 'BytesTransferred', 'Sum'),
    metricQuery('cacheHitRate', 'CacheHitRate', 'Average'),
    metricQuery('e4xx', '4xxErrorRate', 'Average'),
    metricQuery('e5xx', '5xxErrorRate', 'Average'),
  ];
  const awsCmd = await resolveCmd('aws');
  const { stdout } = await run(
    awsCmd,
    [
      'cloudwatch', 'get-metric-data',
      '--metric-data-queries', JSON.stringify(queries),
      '--start-time', windowStart.toISOString(),
      '--end-time', periodEnd.toISOString(),
      '--region', AWS_REGION,
      '--output', 'json',
    ],
    { timeout: 60_000, maxBuffer: 10 * 1024 * 1024 },
  );
  const parsed = JSON.parse(stdout);
  const out = {};
  for (const result of parsed.MetricDataResults ?? []) {
    const current = [];
    const previous = [];
    (result.Timestamps ?? []).forEach((ts, i) => {
      const bucket = new Date(ts).getTime() > weekStart.getTime() ? current : previous;
      bucket.push(result.Values[i]);
    });
    out[result.Id] = { current, previous };
  }
  return out;
}

/** Map CLI failures to an honest, actionable one-liner. */
function humanizeAwsError(err) {
  const text = `${err?.stderr ?? ''}\n${err?.message ?? ''}`;
  if (/AccessDenied/.test(text)) {
    return 'AccessDenied — the CI role lacks cloudwatch:GetMetricData (one-time IAM step, see docs/traffic-monitor.md)';
  }
  if (/unable to locate credentials|could not load credentials|the security token included/i.test(text)) {
    return 'no usable AWS credentials — running uptime-only';
  }
  return String(err?.message || err).split('\n')[0].slice(0, 300);
}

// --- report ---------------------------------------------------------------------

function buildReport({ uptime, traffic, trafficError, periodStart, periodEnd, generatedAt }) {
  const lines = [];
  lines.push(`# Traffic + uptime — ${SITE}`);
  lines.push('');
  lines.push(`**Period:** ${isoDay(periodStart)} → ${isoDay(periodEnd)} (UTC, 7 days) · **Generated:** ${generatedAt}`);
  lines.push('');
  if (!LAUNCHED) {
    lines.push(
      `> **Pre-launch baseline** — DNS cutover for ${SITE} is pending, so the site is reachable only via the ` +
        `CloudFront domain (https://${CF_DOMAIN}). Traffic this week is essentially smoke tests only. ` +
        `This banner comes down after cutover (repo variable \`SITE_LAUNCHED=1\`).`,
    );
    lines.push('');
  }

  // Uptime table
  lines.push('## Uptime smoke test');
  lines.push('');
  lines.push(
    `Source: https://${CF_DOMAIN} — redirects are recorded, not followed, so a 308 ` +
      '(trailing-slash normalization such as `/best` → `/best/`) shows as its own status with its target. ' +
      'TTFB is client-side and includes DNS + TLS. Bytes is the response body size.',
  );
  lines.push('');
  lines.push('| Path | Status | Bytes (body) | TTFB (ms) | Notes |');
  lines.push('|---|---:|---:|---:|---|');
  for (const r of uptime) {
    const status = r.error ? 'ERR' : String(r.status);
    const notes = r.error ? `\`${r.error}\`` : r.location ? `redirect → ${r.location}` : '';
    const bytes = r.bytes == null ? '—' : String(r.bytes);
    const ttfb = r.ttfbMs == null ? '—' : String(r.ttfbMs);
    lines.push(`| \`${r.path}\` | ${status} | ${bytes} | ${ttfb} | ${notes} |`);
  }
  const unexpected404 = uptime.filter((r) => !r.error && r.status === 404).map((r) => `\`${r.path}\``);
  if (!LAUNCHED && unexpected404.length > 0) {
    lines.push('');
    lines.push(
      `_Pre-launch: ${unexpected404.join(', ')} currently return 404 — expected until the full build ` +
        'replaces the placeholder page and DNS is cut over._',
    );
  }
  lines.push('');

  // Traffic table
  lines.push(`## Traffic (CloudWatch, distribution \`${DISTRIBUTION_ID}\`)`);
  lines.push('');
  if (trafficError) {
    lines.push(`> ⚠️ Traffic metrics unavailable this run: ${trafficError}.`);
    lines.push('> The report degrades to uptime-only. Fix: allow `cloudwatch:GetMetricData` on the CI role (see docs/traffic-monitor.md).');
    lines.push('');
    return lines.join('\n');
  }
  lines.push('| Metric | This week | Last week | Δ WoW |');
  lines.push('|---|---:|---:|---:|');
  const rows = [
    ['Requests (sum)', 'requests', sum, fmtInt],
    ['Bytes transferred (sum)', 'bytes', sum, fmtBytes],
    ['Cache hit rate (avg of daily)', 'cacheHitRate', mean, fmtPct],
    ['4xx error rate (avg of daily)', 'e4xx', mean, fmtPct],
    ['5xx error rate (avg of daily)', 'e5xx', mean, fmtPct],
  ];
  for (const [label, id, agg, fmt] of rows) {
    const m = traffic?.[id];
    const cur = hasData(m?.current) ? agg(m.current) : null;
    const prev = hasData(m?.previous) ? agg(m.previous) : null;
    const curTxt = cur == null ? 'no data' : fmt(cur);
    const prevTxt = prev == null ? '—' : fmt(prev);
    const delta = cur == null || prev == null ? '—' : fmtDelta(cur, prev);
    lines.push(`| ${label} | ${curTxt} | ${prevTxt} | ${delta} |`);
  }
  lines.push('');
  lines.push(
    '_`no data` = CloudFront has not published datapoints yet — expected pre-launch; standard metrics ' +
      '(Requests, BytesTransferred, 4xx/5xxErrorRate) appear once the distribution serves real traffic. ' +
      '`CacheHitRate` additionally requires CloudFront "additional metrics" to be enabled (currently off; optional). ' +
      'Weekly smoke-test requests are included in the counts._',
  );
  lines.push('');
  lines.push('### Week-over-week');
  lines.push('');
  lines.push(
    '_Δ WoW fills in from the second full week of real traffic (post-cutover). Until then expect `no data` / `—` above — ' +
      'this is the placeholder for the delta narrative._',
  );
  lines.push('');
  lines.push('---');
  lines.push(
    '**Privacy:** aggregate counts only — daily request/byte totals and cache/error-rate percentages per distribution. ' +
      'No cookies, no client-side analytics JavaScript, no IPs, no user identifiers, no PII, by design. Details: `docs/traffic-monitor.md`.',
  );
  return lines.join('\n');
}

// --- rolling GitHub issue ---------------------------------------------------------

async function upsertIssue(report, periodStart) {
  const gh = await resolveCmd('gh');
  const ghOpts = { timeout: 60_000, maxBuffer: 10 * 1024 * 1024 };

  // Plain list + local prefix filter (issue search indexing can lag and create duplicates).
  const { stdout } = await run(
    gh,
    ['issue', 'list', '-R', REPO, '--state', 'open', '--json', 'number,title,createdAt', '--limit', '100'],
    ghOpts,
  );
  const open = JSON.parse(stdout)
    .filter((i) => i.title.startsWith(TITLE_PREFIX))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (open.length > 1) {
    console.error(`[monitor] ${open.length} open "${TITLE_PREFIX}" issues found; commenting on the newest (#${open[0].number}). Close the older ones to keep this rolling.`);
  }

  const dir = await mkdtemp(path.join(tmpdir(), 'traffic-report-'));
  const bodyFile = path.join(dir, 'body.md');
  try {
    await writeFile(bodyFile, report, 'utf8');
    if (open[0]) {
      await run(gh, ['issue', 'comment', String(open[0].number), '-R', REPO, '--body-file', bodyFile], ghOpts);
      return { action: 'commented on', number: open[0].number, title: open[0].title, url: `https://github.com/${REPO}/issues/${open[0].number}` };
    }
    // New week, no open issue → create one. Label is best-effort.
    let labelArgs = [];
    try {
      await run(
        gh,
        ['label', 'create', 'monitor', '-R', REPO, '--description', 'Weekly traffic + uptime reports', '--color', '1D76DB', '--force'],
        ghOpts,
      );
      labelArgs = ['--label', 'monitor'];
    } catch {
      labelArgs = [];
    }
    const title = `${TITLE_PREFIX} — week of ${isoDay(periodStart)}`;
    const { stdout: issueUrl } = await run(
      gh,
      ['issue', 'create', '-R', REPO, '--title', title, '--body-file', bodyFile, ...labelArgs],
      ghOpts,
    );
    const url = String(issueUrl).trim();
    return { action: 'created', number: Number(url.split('/').pop()), title, url };
  } finally {
    await unlink(bodyFile).catch(() => {});
  }
}

// --- main --------------------------------------------------------------------------

async function main() {
  const periodEnd = new Date();
  const periodStart = new Date(periodEnd.getTime() - 7 * DAY_MS);

  const [uptime, trafficResult] = await Promise.all([
    Promise.all(UPTIME_PATHS.map(checkPath)),
    fetchTraffic(periodEnd)
      .then((traffic) => ({ traffic }))
      .catch((err) => ({ trafficError: humanizeAwsError(err) })),
  ]);

  const report = buildReport({
    uptime,
    traffic: trafficResult.traffic,
    trafficError: trafficResult.trafficError,
    periodStart,
    periodEnd,
    generatedAt: periodEnd.toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
  });

  process.stdout.write(`${report}\n`);

  if (SKIP_ISSUE) {
    console.error('[monitor] MONITOR_SKIP_ISSUE=1 — stdout only, no GitHub writes.');
    return;
  }
  try {
    const result = await upsertIssue(report, periodStart);
    console.error(`[monitor] issue ${result.action} #${result.number}: ${result.url}`);
  } catch (err) {
    console.error(`[monitor] FAILED to update the rolling issue: ${err?.message || err}`);
    process.exitCode = 1; // a silent monitor is a broken monitor
  }
  console.error(`[monitor] uptime: ${uptime.filter((r) => !r.error).length}/${uptime.length} OK · traffic: ${trafficResult.trafficError ? 'degraded' : 'ok'}`);
}

main().catch((err) => {
  console.error(`[monitor] fatal: ${err?.stack || err}`);
  process.exitCode = 1;
});
