# Traffic + uptime monitor (V1)

Weekly, privacy-first monitoring for token-perks.com, served via CloudFront
distribution `E35NUFJX0GCO4P`. Three moving parts, all in this repo:

| File | Role |
|---|---|
| `scripts/traffic-report.mjs` | The monitor. No npm dependencies — global `fetch` + AWS CLI via `child_process` + `gh` CLI. |
| `.github/workflows/traffic-report.yml` | Cron **Mondays 14:17 UTC** + manual `workflow_dispatch`. Writes the report to the job summary and upserts the rolling GitHub issue. |
| `docs/traffic-monitor.md` | This document. |

## What's measured

**Uptime (live smoke test, per run):** `GET` against the CloudFront domain for
`/`, `/best/`, and `/api/offers.json`, recording HTTP status, response body
bytes, and TTFB. Redirects are recorded, never followed — so a 308
trailing-slash normalization (`/best` → `/best/`) shows up as its own status
with its target instead of being silently swallowed.

**Traffic (CloudWatch `GetMetricData`, last 7 days, plus the prior 7 days for
week-over-week deltas):** namespace `AWS/CloudFront`, dimensions
`DistributionId` + `Region: Global`:

- `Requests` (sum)
- `BytesTransferred` (sum)
- `CacheHitRate` (average) — requires CloudFront **additional metrics** to be
  enabled (currently off, optional); until then it reports `no data` even
  after launch
- `4xxErrorRate` / `5xxErrorRate` (averages, already percentages)

## Privacy posture

The whole story is: **aggregate counts only**. The report contains daily
request/byte totals and cache/error-rate percentages per distribution —
nothing else. Specifically:

- No cookies, no client-side analytics JavaScript, no tracking pixels on the
  site — traffic numbers come from CloudFront's server-side metrics.
- No IP addresses, user agents, geographies, or any per-request data leave AWS;
  none are queried, stored, or published by this tooling.
- The weekly smoke tests themselves (3 requests from GitHub runners or a dev
  machine) are included in the totals — visible and accounted for, not hidden.

CloudWatch grants are read-only (`cloudwatch:GetMetricData`); the CI role can
never mutate the distribution or its config through this workflow.

## The weekly issue

The workflow maintains **one rolling issue** per week of
`[monitor] weekly traffic + uptime — week of <Monday date>`, labeled `monitor`:

- No open issue with that title prefix → a new one is created with the report
  as the body.
- An open one exists → the new report is posted as a comment on it.

**How to read it:** the pre-launch banner means DNS hasn't been cut over yet —
traffic is essentially smoke tests and 404s on content paths are expected until
the full build deploys. `no data` means CloudFront hasn't published datapoints.
The `Δ WoW` column carries week-over-week deltas from the second full week of
real traffic onward.

**To start a fresh week's issue**, close the current one; the next run creates
a new one. Multiple open `[monitor]` issues are tolerated (the script comments
on the newest and warns), but closing old ones keeps it clean.

## The one manual IAM step (required for traffic data)

Verified 2026-09-06: the CI role `token-perks-deploy` (account `897025262198`)
has only S3 bucket access + `cloudfront:CreateInvalidation` /
`cloudfront:GetDistribution` (inline policy `token-perks-deploy-inline`). It
**cannot read CloudWatch**, so until this is fixed the workflow runs
uptime-only and says so in the report. The workflow itself does not modify IAM.

One-time fix — attach to the role (console, or CLI as an admin):

```json
{
  "Sid": "CloudWatchReadTrafficMetrics",
  "Effect": "Allow",
  "Action": "cloudwatch:GetMetricData",
  "Resource": "*"
}
```

or via CLI:

```sh
aws iam put-role-policy --role-name token-perks-deploy \
  --policy-name cloudwatch-read-traffic \
  --policy-document '{"Version":"2012-10-17","Statement":[{"Sid":"CloudWatchReadTrafficMetrics","Effect":"Allow","Action":"cloudwatch:GetMetricData","Resource":"*"}]}'
```

`GetMetricData` does not support resource-level scoping, so `Resource: "*"` is
unavoidable — the action is read-only and this is the only CloudWatch permission
the role receives. No change is needed in the repo; the next scheduled run (or
a `workflow_dispatch`) picks traffic data up automatically.

## DNS cutover

Until cutover, the site is reachable only at
`https://d137cbb3frxl9a.cloudfront.net` and the report carries a
**pre-launch baseline** banner. After DNS points token-perks.com at the
distribution:

1. Run the workflow once via `workflow_dispatch` ("Traffic + uptime report" →
   Run workflow) to record the first real baseline.
2. Set the repo variable `SITE_LAUNCHED=1` (Settings → Secrets and variables →
   Actions → Variables). The banner disappears and the week-over-week delta
   narrative starts accumulating from the following week.

## Running locally

```sh
node scripts/traffic-report.mjs                     # full run, writes to GitHub
MONITOR_SKIP_ISSUE=1 node scripts/traffic-report.mjs  # stdout only, no GitHub writes
```

Uses your existing AWS + gh CLI auth. Overrides via env: `CF_DOMAIN`,
`CF_DISTRIBUTION_ID`, `GH_REPO` (or `GITHUB_REPOSITORY` in CI),
`MONITOR_TIMEOUT_MS`.
