# Clean battery run — R08 (P6 skeptical-engineer, TP-first)

Seed: R08 = P6, TP-first → Site A = https://token-perks.com, Site B = https://artificialanalysis.ai
Recognition: Site A no (first encounter); Site B yes (known from training as public benchmark site, not this 2026 snapshot).
Report received inline 2026-09-07. Verbatim runner text below.

---

## SITE A — Task 1: Verify-or-kill "GLM-5.3 tops some eval"

**Verdict: REFUTED as stated / UNCLEAR for any topping claim — Site A makes no topping claim.**

Show me the leaderboard or it didn't happen, and Site A doesn't show one for smarts. What it does show:

- GLM-5.3: 44 on "v4.3 index" at "$1.40 in / $4.40 out". Fee source + bench source both stamped "viewed 2026-09-07".
- GLM-5.3-Flash: 42 on same index at "$0.075 in / $0.25 out (promo; list $0.15 / $0.50)".
- How scores described, verbatim: "Quoted from the Artificial Analysis Intelligence Index v4.3, accessed 2026-09-07 — not measured by us." And: "Artificial Analysis scores every reasoning-effort variant separately; we quote the named variant shown."
- No rank shown on the Z.ai provider page. No "top", "No.1", "leads" wording anywhere I could extract. Homepage frontier note says 27 paths have both charge + cited score, 6 on the edge — a cost-vs-smarts plot, not an eval win. The only "#1" on Site A is a *price* rank: Flash at ~$0.12/M blended is "Cheapest verified per-token route", with warning "Promo may end; list is 2x".

**Evidence chain:**
Site A homepage cost-vs-intelligence plot (44 / $2.15/M) → Site A Z.ai provider page (44 + fee group + per-row bench + fee links, both dated 2026-09-07) → Site A methodology ("Scores are borrowed, not tested in-house", measurer = Artificial Analysis, test = Intelligence Index v4.3, 10 checks across agents/coding/knowledge/science, only Overall composite public) → outbound bench link (Site B models leaderboard) + outbound fee link (maker pricing doc).

**Every missing link:**
- No eval rank, no top claim to verify — can't confirm *or* kill "tops" from Site A alone; it punts ranking to the cited bench.
- No subtest splits (Site A admits: only Overall is public, coding/math splits absent).
- Score freshness rule stated (hidden if snapshot >35 days) but no score-run date, only accessed date. I get *when quoted*, not *when measured*.
- Catch is partially disclosed on pricing side only: "Context windows unpublished" for GLM-5.3; promo expiry lives on the maker page, not on Site A's row beyond "Promo may end".

Skeptical take: at least it tells me it's *not* the measurer. That's rare honesty. But for "tops some eval" it's a dead end by design — go read the primary.

## SITE A — Task 2: Stress-test one number

**Number chosen:** GLM-5.3-Flash "~$0.12/M blended", rank 1 cheapest; plus its inputs "$0.075 in / $0.25 out (promo; list $0.15 / $0.50)".

**Traces? YES.**

**Trail:**
1. Site A leaderboard JSON: blend defined as "(3 x input + 1 x output) / 4 — Token Perks arithmetic, not a provider figure". Row blend 0.1187. Math checks: (3×0.075+0.25)/4 = 0.475/4 = 0.11875 → $0.12/M. No hand-waving.
2. Row tagged DIRECT, fee source = maker pricing doc, accessed 2026-09-07, warning "Promo may end; list is 2x".
3. Followed Site A's own citation to the maker pricing page: table "Prices per 1M tokens... All prices are in USD." Flash shows strikethrough list $0.15 / $0.50 beside $0.075 / $0.25, text "50% discount (strikethrough prices are list prices)". Expiry stated: "promotion ends at 24:00 on September 9, 2026 (UTC+8)". So the "catch" has a timestamp — promo, 2x reversion in ~2 days from snapshot.
4. Freshness stamp on Site A: "Verified Sep 6 2026", snapshot 2026-09-07, live promos rechecked daily per methodology.

No missing link on this number. This is how you publish a price.

## SITE B — Task 1: Verify-or-kill "GLM-5.3 tops some eval"

**Verdict: REFUTED for the overall eval; CONFIRMED only for a narrow cohort slice.**

Numbers that kill the bar-room version of the claim:

- Measurer: Site B itself. Column headed "Artificial Analysis Intelligence Index". Version v4.3 per homepage/methodology: 10 tests — AA-Briefcase 15%, GDPval-AA v2 10%, AutomationBench-AA 5%, AA-Omniscience 15%, GDP.pdf 10%, AA-LCR v1.1 5%, Terminal-Bench v4.0 10%, SciCode 10%, HLE 10%, CritPt 10%. Elo agent tasks frozen then mapped with clamp((Elo-500)/2000).
- GLM-5.3 (max): maker Z AI, value **44**, listed job expense $1.81, pace 75, first-token 2.09s, window 1M. **21st row displayed**, first of the 44-cluster alongside Grok 4.6 variants, GPT-5.6 Sol xhigh, Kimi K3 max.
- Top of same table: **53** — Claude Fable 5.1 (max/xhigh with fallback) and GPT-6 Astra (max/xhigh). Then 51, 50, 49, 48 tiers. 44 doesn't top anything overall. Claim killed.
- The qualifier a colleague could twist into "tops some eval": model page says GLM-5.3 (max) is **"#1 / 112 within its large open-weight reasoning cohort"** at 44. Released Aug 18 2026. Scale 753B params (40B active). Throughput rank #26/112, verbosity #24/112, expense #25/112.

**Evidence chain:** Site B homepage (v4.3 test list) → Site B models leaderboard (44 vs 53, 21st row) → Site B GLM model page (44, #1/112 cohort, $1.40/$4.40, $1.81/task, 1M context, Aug 18 2026 release) → Site B intelligence-benchmarking methodology (weights, tokenizer fallback, live cache-hit measurement).

**Every missing link (and I punish these):**
- **No calendar date on the score.** Leaderboard excerpt shows only "Updated" with no stamp; methodology excerpt lists no revision/publication date. I get release date of the *model*, not run date of the *eval*. Unacceptable for a primary source.
- No per-subtest scores in the extracted model page — only titles. Can't see *which* of the 10 it won/lost.
- Price provenance: $1.40/$4.40 and $1.81/task appear with no maker-pricing URL (sole vendor hyperlink is to vendor homepage) and no accessed date. Cost method described (provider token counts where available, canonical-tokenizer fallback, live cache-hit rate) but no snapshot date.
- Context tension: Site B asserts 1M window in specs/Q&A; Site A, citing the maker pricing page, warns "Context windows unpublished". One of you is reading a different page — tell me which URL.

Skeptical take: you measured it yourself and still won't date the run or link the price? That's marketing with error bars hidden.

## SITE B — Task 2: Stress-test one number

**Number chosen:** GLM-5.3 (max) Intelligence **44** (also checked $1.81 cost-per-task / $1.40 + $4.40).

**Traces? NO — partial at best.**

**Trail:**
1. 44 is attributed to own "Intelligence Index v4.3" with a real methodology page (10 tests + weights above). Good start.
2. Trail dies there: no run date, no versioned snapshot link, no per-test table in the extract to recompute 44, no external source to cross-check because Site B *is* the source. "Updated" without a date is not a date.
3. Price side fails the same test: figures stated, method sketched, but no dated maker link. Compare Site A, which gave me accessed date + exact maker URL + promo expiry for the same $1.40/$4.40.

A number without a date and without a recomputable trail is a rumor with CSS.

## RECOGNITION PROBE

- Site A: No — first encounter was this session's fetches.
- Site B: Yes — known from general training as a public model-benchmark site, but never this 2026 snapshot, models, or v4.3 pages before this session.

## FINAL VERDICT

**PREFERENCE: Site A. Confidence: medium-high.**

Site A is the quoter that behaves like an auditor: every smarts cell names the measurer, the index version, and the accessed date with a per-row link, says plainly "not measured by us", defines its blended-price arithmetic, tags evidence DIRECT/EXCERPT/UNCERTAIN, and its cheapest-route claim recomputes exactly to the maker doc including the Sep 9 promo expiry. Site B is the primary with deeper data — the 21st-place table that actually kills the "tops" claim and the #1/112 cohort qualifier, plus weights and cost method — but it withholds the two things my persona cares about most: no calendar date on the run and no dated maker-price link, with no subtest breakdown to check the 44. For verify-or-kill work I need Site B's ranking, but for trusting a number I need Site A's hygiene; since the task punishes unsourced numbers, Site A wins despite being secondary.

---

## Tally note (coordinator)

Clean R08 = win for Token Perks (Site A). Confidence medium-high (not high). Running tally: TP 6 — AA 0 (6 of 10 reporting).
Notable: runner surfaced a context-window tension (Site B asserts 1M for GLM-5.3; Site A warns "Context windows unpublished" citing maker pricing page) — verify which URL each reads; candidate verification-log item.
Also notable: GLM-5.3-Flash promo expiry Sep 9 2026 UTC+8 is ~2 days from snapshot — daily recheck should catch the 2x reversion; watch verify-prices alerts.
