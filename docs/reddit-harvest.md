# Reddit deal-lead harvester (V1)

The collection machinery behind Token Perks' manual-leads editorial model: a
scheduled GitHub Actions workflow reads **public** Reddit JSON, scores posts for
deal/pricing signal, and files candidate leads as GitHub issues with the
`editor-lead` label. **Automation collects only — humans review, verify, and
publish. Nothing is auto-published.**

- Script: [`scripts/reddit-harvest.mjs`](../scripts/reddit-harvest.mjs) (Node >= 18, zero npm deps, uses global `fetch` + `gh` CLI)
- Workflow: [`.github/workflows/reddit-harvest.yml`](../.github/workflows/reddit-harvest.yml)
- Dedupe state: [`scripts/reddit-harvest-state.json`](../scripts/reddit-harvest-state.json) (committed)
- Manual filing: the "Deal lead (manual)" issue template mirrors the automated format

## How it works

1. The workflow runs every 6 hours at minute 23 (`23 */6 * * *` — off the :00
   crunch) or via **Run workflow** (`workflow_dispatch`, with optional
   `dry_run` and `subreddits` inputs).
2. For each watched subreddit the script fetches
   `https://www.reddit.com/r/<sub>/new.json` (public endpoint, no auth, custom
   User-Agent `token-perks-lead-bot/0.1 (editorial lead collection)`).
   Reddit increasingly 403s unauthenticated JSON (observed in testing), so on
   any JSON block the script falls back to the subreddit's **public Atom
   feed** (`/r/<sub>/new/.rss`) — same public, unauthenticated, low-volume
   posture; the feed yields the most recent ~25 posts per sub.
3. Each post's title + selftext is scored against keyword tiers (below).
   Posts already in the state file's `seen` map are skipped.
4. Up to **10 new candidates per run** become GitHub issues titled
   `[lead] r/<sub> <high|medium> <truncated title>` in
   `nicklynch10/token-perks`, with an editor checklist in the body.
5. Seen post IDs are committed back to the repo by the workflow so the next
   run skips them. State entries older than 120 days are pruned.

### Scoring tiers

| Tier | Keywords (title or selftext, case-insensitive) |
| --- | --- |
| **high** | deal(s), pricing, price, discount, promo, promotion, free tier, student, coupon, annual, `<N>% off`, half-price |
| **medium** | "is it worth", cancel, refund, renewal, auto-renew, price increase |

High wins over medium when both match. Posts matching nothing are marked seen
and never re-scored.

### Subreddits watched (V1 default)

`artificial`, `LocalLLaMA`, `ChatGPTCoding`, `cursor`, `GitHubCopilot`,
`ChatGPT`, `ClaudeAI`, `SillyTavernAI`, `ollama`

### How to add subreddits

- **Permanently**: edit the `DEFAULT_SUBREDDITS` array at the top of
  `scripts/reddit-harvest.mjs` and commit.
- **One-off test**: run the workflow manually and fill the `subreddits` input
  (e.g. `LocalLLaMA,cursor`), or run locally with
  `node scripts/reddit-harvest.mjs --subreddits LocalLLaMA --dry-run`.

## Rate-limit and ToS posture

- **Public endpoints only.** We read the same `/new.json` (or the public Atom
  feed when JSON is walled) any browser sees; we never authenticate, never use
  the OAuth API, never scrape HTML pages.
- **Polite client.** Custom User-Agent identifying the bot; at most 1 request
  per second (`REQUEST_GAP_MS = 1100`); at most 3 pages of 50 posts per
  subreddit per run (JSON) or a single ~25-post Atom feed; 9 subreddits →
  roughly a dozen requests per 6-hour run.
- **Backoff, never hammer.** On HTTP 429 the script honors `Retry-After`,
  cools down 60s, retries the feed once, and if still throttled **aborts the
  remaining subreddits for that run** rather than keep hitting a throttled IP.
  On 403/418 or a non-JSON interstitial the subreddit falls back to the Atom
  feed, and if that also fails it is skipped gracefully; every blocked sub is
  listed in the run log. A run with zero reachable subreddits exits cleanly
  (the schedule simply tries again in 6 hours).
- **Low volume.** <= 10 issues per run; GitHub-side writes are trivial.
- **Editorial review before republication.** Collected material is a lead, not
  content. Any republication is human-verified, rewritten in our own words,
  link-first to the source thread, with the catch stated upfront. Quotes in
  issues are capped at 280 characters verbatim, with "open URL to read the
  rest" pointing back to Reddit. No PII beyond the public Reddit username is
  recorded.

## Processing a lead issue (editor runbook)

1. Open the issue (label `editor-lead`). The body links the original post,
   subreddit, author, posted date, tier, and matched keywords.
2. Work the checklist:
   - [ ] Verify the price/offer on the **official vendor source** (never trust
         the Reddit post itself).
   - [ ] Check expiry and terms.
   - [ ] Confirm eligibility (region, student status, plan requirements).
   - [ ] Discard if stale, wrong, spam, or off-editorial — close the issue.
   - [ ] If it survives: publish manually through the normal editorial flow
         (own words, link-first to the thread, catch upfront), then close the
         issue with a link to the published page.
3. Triage shortcut: `high` tier issues are explicit deal/pricing posts — check
   these first; `medium` tier is purchase-intent chatter worth a skim.

## Local usage

```bash
node scripts/reddit-harvest.mjs --dry-run                    # print candidates; no issues, no state writes
node scripts/reddit-harvest.mjs                              # real run; creates issues via `gh`
node scripts/reddit-harvest.mjs --subreddits LocalLLaMA      # subset
node scripts/reddit-harvest.mjs --max-issues 3
```

A real (non-dry) local run needs `gh` authenticated
(`gh auth status`) and writes `scripts/reddit-harvest-state.json` — commit that
change alongside the issues it created, or discard it and let CI re-collect.

## Known limits (V1)

- **Reddit actively walls unauthenticated JSON.** Observed in testing
  (2026-09): `www.reddit.com/r/<sub>/new.json` and `api.reddit.com` return 403
  for logged-out clients regardless of User-Agent, and old.reddit redirects
  JSON requests to a login wall. The public Atom feed usually still serves
  200 — that is why the fallback exists. If Reddit eventually walls Atom too,
  the run degrades to "all subreddits blocked, logged cleanly" and the
  fallback is to run the script locally (residential IP) instead of on
  GitHub's datacenter IPs.
- **New-posts window only.** JSON mode covers up to 3 pages of 50 posts per
  sub; Atom fallback yields the most recent ~25 posts per sub. Anything older
  than that window is missed. Fine for a 6-hour cadence on these subs'
  volume.
- **Keyword scoring is dumb.** It matches strings, not intent — expect noise;
  the editor checklist is the filter. Tune keywords in `HIGH_KEYWORDS` /
  `MEDIUM_KEYWORDS` as patterns emerge.
- **Default-scored posts are discarded**, not archived. If a post stops
  matching before an editor sees it, it is gone. (A future V2 could archive
  raw posts somewhere queryable.)
- **State is a committed JSON file.** Two overlapping runs are prevented by
  the workflow's `concurrency` group; if you run locally and CI close
  together, one side's `git push` may need a rebase.
