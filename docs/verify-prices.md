# Price re-verification bot (V1)

This is the automation behind the editorial claim that Token Perks re-verifies its
published prices. A judge — or a reader — should not have to take a cadence claim on
trust: the bot produces a dated, committed trail (`docs/verification-log.md`) and,
when a source stops matching, files one GitHub issue with the evidence.

The bot is a **tripwire, not a terms reader**. See [Honest limits](#honest-limits).

## What it does

- Reads `scripts/verify-prices-sources.json`: each offer in `content/offers/` is mapped
  to 1–3 **official** price-bearing URLs (provider-owned domains only) with the exact
  strings a healthy page should still contain.
- Fetches each URL with global `fetch` (no npm dependencies), identifying as
  `token-perks-verifier/0.1`, at most one request per second, one retry after a
  backoff, then it gives up. It never hammers.
- Strips `<script>`/`<style>`/`<noscript>` and markup and matches expected strings
  against **visible text only**, so framework payloads can never fake a price.
- Emits a markdown report (stdout, plus `$GITHUB_STEP_SUMMARY` in CI, plus an
  artifact), appends one dated row to `docs/verification-log.md` with `--write-log`,
  and — only on DRIFT/ERROR, only in GitHub Actions — files **one** issue
  `[verify] N source(s) drifted — <date>` via the `gh` CLI with the full table.
  A human decides what happens next. **The bot never edits content snapshots.**

## Statuses

| Status | Meaning |
|--------|---------|
| `PASS` | Page fetched (2xx); at least `min_hits` of the `expect` strings appear in visible text. |
| `DRIFT` | Page fetched but expected strings are absent — needs human look. |
| `ERROR` | Fetch failed (network, timeout, non-2xx after one polite retry) — often bot-blocking or a geo redirect; also needs human look. |
| `MANUAL` | No fetchable official URL exists (registered with `"manual": true`); a human verifies in-product. |

`soft` strings are price figures the registry wants to see but which currently render
client-side on that page. Their absence is recorded in the report and does **not**
flip the status — alarming on them would produce a permanent false DRIFT.

## Current coverage (registered 2026-09-06)

| Offer (`content/offers/`) | Sources | What a PASS proves | What it cannot prove |
|---|---|---|---|
| `kimi-k3-core` | `www.kimi.com/coding` (product page), `api.kimi.com/coding/` (the offer's `official_terms_url`; returns a small JSON body), `kimi.ai/help` (membership/billing section) | The Kimi Code membership product page, coding-endpoint route, and help centre are live and still name the membership and K3. | Tier dollar figures ($19/$39/$99/$199) and tier names (Moderato…Vivace) — these load client-side, so they are registered as `soft` only. |
| `nvidia-k3-free` | `build.nvidia.com/moonshotai/kimi-k3` (model page), `build.nvidia.com/` (catalog root) | The K3 listing still exists in NVIDIA's official catalog and the free-endpoint wording is present. | Account-level quota (never published) — the offer itself says quota is "a rumor until tested". |
| `muse-spark-zen-free` | none fetchable (`MANUAL`) | Nothing automated — by design. The snapshot states the promo is reachable only in-product, so the bot reports MANUAL every run as the recurring human reminder. | Everything; the in-product check is the verification. |

## Running it

```bash
node scripts/verify-prices.mjs --write-log        # canonical run: report + log row
node scripts/verify-prices.mjs --json             # machine-readable
node scripts/verify-prices.mjs --strict           # exit 1 on any DRIFT/ERROR (default: exit 0)
node scripts/verify-prices.mjs --issue            # force issue filing outside Actions (needs gh)
```

Requires Node ≥ 18. `gh` is needed only when an issue is actually filed.

### Proving drift detection works (planted failure)

Point the bot at a copy of the registry with a deliberately wrong expectation:

```bash
node -e 'const fs=require("fs"),os=require("os"),path=require("path");
const r=JSON.parse(fs.readFileSync("scripts/verify-prices-sources.json","utf8"));
const s=r.sources.find(s=>s.id==="kimi-code-product");
s.expect=["$999"]; s.soft=[];
fs.writeFileSync(path.join(os.tmpdir(),"vp-plant.json"),JSON.stringify(r,null,2));'
node scripts/verify-prices.mjs --sources "$(node -e 'process.stdout.write(require("os").tmpdir())')/vp-plant.json" --no-issue --strict
```

Expected: `kimi-code-product` reports **DRIFT** with “Missing expected strings: $999”,
the other sources are unchanged, and `--strict` exits 1. Verified locally on
2026-09-06 against the live page (reusing cached fetches, so no extra traffic).

## Schedule and permissions

`.github/workflows/verify-prices.yml`: cron `23 13 * * 1` (Mondays 13:23 UTC — the odd
minute is deliberate, avoiding the :00/:30 cron crush) plus `workflow_dispatch`.
Permissions are minimal: `contents: write` to append and commit the log,
`issues: write` for the one drift issue. The job stays **green on DRIFT by design** —
the alert surfaces are the job summary, the log row, and the issue. Add `--strict` to
the run step if you ever prefer red builds.

## Honest limits

- **String presence is not a terms read.** PASS means the page is up and still says
  what we expect at the string level. It does not mean a human read the terms, checked
  quotas, or confirmed renewal/refund wording. `content/offers/*.json` still carries a
  human `verified_at` date, and that is the date that counts editorially.
- **Client-rendered prices are invisible.** Kimi's tier dollars are `soft` for exactly
  this reason; if the provider ever serves them statically, move them into `expect`.
- **CI runners see different pages than you do.** Bot-blocking, geo/currency variants
  and consent redirects can produce honest DRIFT/ERROR noise. That noise is the
  tripwire working; the escalation path exists precisely so a human resolves it.
- **Cadence gap, stated plainly.** V1 automates the weekly check for all sources. The
  editorial promise of *daily* re-verification for active promos is covered by humans
  today (the only active promo, Muse Spark, is MANUAL anyway). To automate it, add a
  second schedule entry to the workflow (e.g. `cron: "41 13 * * *"`) — the registry and
  log need no change.
- **Issue filing is not local-by-default.** Outside GitHub Actions the bot prints the
  report and skips `gh`; pass `--issue` to force it.

## Escalation path

1. Bot reports DRIFT/ERROR → job summary + one issue with the full table.
2. A human opens the flagged URL in a browser (to rule out bot-blocking or a geo page)
   and compares it against `content/offers/<offer_id>.json`.
3. If prices or terms really changed: a human edits the snapshot, sets a fresh
   `verified_at`, and updates the registry's `expect`/`soft`/`notes` for that source.
4. Close the issue with a one-line resolution (what changed, what was checked). The
   log keeps the run row either way — an ERROR week followed by a clean week is itself
   part of the trail.

## How to add a source

1. Edit `scripts/verify-prices-sources.json`. Fields per source:

   | Field | Meaning |
   |---|---|
   | `id` | Stable slug, used in reports and tests. |
   | `offer_id` | Basename of the `content/offers/*.json` snapshot it verifies. |
   | `url` | Official provider URL only (no affiliates/mirrors). `null` with `"manual": true` for in-product offers. |
   | `expect` / `min_hits` | Strings that must appear in visible text; PASS needs `min_hits` of them. Register what the page **statically** contains — verify by fetching first. |
   | `soft` | Price strings that load client-side; reported, never fatal. |
   | `notes` | Page structure, what was probed and when, why the strings were chosen. |

2. Probe before registering: `curl -A "token-perks-verifier/0.1" -L <url>` and check
   the strings you intend to require are in the HTML a plain fetch receives — beware
   `<script>` payloads that happen to contain look-alike text (React flight data
   formats numbers like `$19:props`; the bot strips scripts, your curl eye will not).
3. Run `node scripts/verify-prices.mjs --write-log` and confirm PASS before committing.
4. Bump the registry's `checked_on`.

## Files

- `scripts/verify-prices.mjs` — the bot (no dependencies).
- `scripts/verify-prices-sources.json` — the sources registry.
- `.github/workflows/verify-prices.yml` — weekly schedule + dispatch.
- `docs/verification-log.md` — the committed dated trail; one row per run.
- `content/offers/*.json` — read-only snapshots; only humans edit these.
