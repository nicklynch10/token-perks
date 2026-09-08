# Confirmation run C2 — data engineer, batch pipelines (AA-first)

Site A = https://artificialanalysis.ai, Site B = https://token-perks.com. Run 2026-09-07, post V3 build.
Verdict: **Site B (Token Perks) preferred, ~75% confidence.** Wow scores: A 7/10, B 8/10. Recognition: A yes, B no.

## Triage (coordinator)
- WIN MOMENTS: versioned dated feed with batchPerM; "not published ≠ not fetched" epistemics ("a tool I can trust in a pipeline"); staleness pause rule ("I'd copy into our pipelines"); per-row DIRECT/EXCERPT/UNCERTAIN labels.
- FIXES: (1) cache TTLs missing (research deeper — Google/Anthropic TTL docs exist); (2) batch eligibility not enumerated per model; (3) /best/ has only 3 tracked offers — "a placeholder, not a leaderboard" → expand tracked-offer set; (4) guides thin, none cover caching/batch (pairs with wave-2 promotion).
- STRATEGY NOTE: judge recommends AA's "cost per Intelligence Index task" normalization be studied — consistent with our roadmap of borrowing good ideas while citing their scores with consent-gated attribution.

---

## Full runner report (verbatim)

---

# First-Impression Review — data engineer, batch-pipeline buyer (millions of tokens/mo, blended $/M subject to quality floor)

## 1. TASK ANSWERS per site

**Site A (artificialanalysis.ai)**
- **(a) Cheapest batch-eligible route:** Not answerable from the site. The /models leaderboard gives a single "Cost per Intelligence Index task" per model (e.g., MiMo-V2.5 $0.02, GPT-5.6 Luna (xhigh) $0.09, DeepSeek V4 Pro (max) $0.12) and model pages give list input/output ($10.00 in / $50.00 out for Claude Fable 5.1) with a blended figure ($7.17/M at a stated 7:2:1 cache-hit/input/output mix). Batch pricing is absent everywhere I looked. Clicks to reach that conclusion: 3 (leaderboard → model page → provider page).
- **(b) Off-peak:** Not covered. 2 clicks to confirm absence.
- **(c) Cache fees/TTL:** Partial and good. Homepage exposes Price/M for Cache Hit, Input, Output plus "Cache Discount" and stacked-blend views; the model page quantifies it ("Cache Discount 98%") and the provider page notes cache write and cache storage are billed separately. No dollar figure for cache write and no TTL anywhere. 2 clicks for what's there.
- **(d) Above 200k context:** Nothing. Context *window* is shown per model, but no long-context repricing tiers on any page I visited. 2 clicks to confirm absence.

**Site B (token-perks.com)**
- **(a) Cheapest batch-eligible route:** Directly answerable. The provider index states 24 providers / 129 tracked access routes; the Anthropic and OpenAI pages show "batch -50%" modifiers, and `/api/leaderboard.json` has first-class `batchDiscount` / `batchApprox` / `batchPerM` fields across 43 ranked API routes — i.e., I can compute the cheapest batch route by sorting one JSON array. Caveat: "which models are batch-eligible" isn't enumerated per row. Clicks: 2 (homepage → provider page), 1 fetch for the feed.
- **(b) Off-peak:** Yes, best answer of the two sites. DeepSeek page: peak = "Mon-Fri 01:00-04:00 and 06:00-10:00 UTC", everything else "off-peak at exactly half" — with both-window $/M for v4-flash ($0.22/$0.66 vs $0.44/$1.32) and v4-pro ($0.66/$1.98 vs $1.32/$3.96). Clicks: 2.
- **(c) Cache fees/TTL:** Read/write fees per model, yes: Fable 5.1 read $0.25 / write $12.50, Opus 5 $0.50/$6.25, Sonnet 5 $0.20/$2.50, Haiku 4.5 $0.10/$1.25; Gemini cached-input rates on OpenAI/Google pages too. TTL: not present (confirmed no on homepage scan, no on Anthropic/OpenAI/Google pages). Clicks: 2. The feed has a `cacheTerms` convention group but route-level TTL is missing.
- **(d) Above 200k:** Yes, with numbers. Google page: Gemini 3.1 Pro Preview "$2.00 in / $12.00 out (200k and under)" → "$4.00 / $18.00" over 200k (2x in, 1.5x out); Gemini 2.5 Pro "$1.25/$10" → "$2.50/$15". Batch cross-check: 2.5 Pro batch "$0.625/$5.00" vs standard. Clicks: 2.

## 2. DATA QUALITY

**Site A**
- *Provenance:* Strong on capability (methodology pages per index, changelog entries dated Sept 2–7, 95% CIs on Elo) but weak on pricing: no accessed/as-of dates on price figures, and the provider page links to the Anthropic homepage rather than the pricing URL. Price rows don't say when they were checked — disqualifying for a tool I'd cite in a cost review.
- *Machine-readability:* Poor for free use. No public JSON/API on any page I saw; data exists behind "Data Playground" and a commercial "ProDataPlatform" PDF.
- *Completeness:* Massive breadth (644 models, 16-provider speed/price endpoint tests) but it simply doesn't track the discount mechanics I care about: no batch %, no off-peak, no >200k tiers, no TTL. Honest "--" for missing cost-per-task is appreciated.

**Site B**
- *Provenance:* This is where it won me over. Every route row carries `sourceUrl` (claude.com, api-docs.deepseek.com, ai.google.dev, developers.openai.com) + ISO `accessed` date + an evidence label: DIRECT (read on the provider's own page this pass), EXCERPT (official numbers via snapshot/indexed rendering), UNCERTAIN (not verified this pass). Methodology explicitly distinguishes **"not published"** (docs checked on stated date, no figure exists — a finding) from **"not fetched"** (no check happened — a gap). Weekly re-verify for costs, daily for promos, null results logged. It even holds back its merged intelligence×cost score pending written consent from Artificial Analysis, and sources AA scores with per-datum citations and a "not measured by us" label.
- *Machine-readability:* Excellent: `llms.txt`, `/api/leaderboard.json` (versioned contract `token-perks/leaderboard@2`, snapshot + accessed dates, conventions block, counts, 129 routes / 43 ranked API rows), `/api/offers.json` (null for missing, `verified_at`, `official_terms_url`), plus an RSS-style `feed.xml`, CC-BY-4.0.
- *Completeness:* Narrow universe vs Site A (129 routes vs 644 models; the subscription `/best/` leaderboard holds only 3 offers). Cache TTL absent. Batch eligibility per-model not enumerated. Guides section is thin (2 guides, neither covers caching/batch). It's a discount-mechanics tracker, not a model universe.

## 3. DESIGN ADMIRATION

- **Site A:** The **cost-per-Intelligence-Index-task** normalization is the single best idea I saw either site — one number that answers "what does competent work cost" across reasoning-effort variants, with a stacked per-token-type bar (answer/reasoning/cache-write/cache-hit/input) that makes the cache-discount story visible without reading a table. Screenshot-worthy into "#infra-cost": the blended-stacked view for the Claude Fable 5.1 / GPT-6 Astra effort ladder.
- **Site B:** The **evidence taxonomy rendered as data** made me stop. A public JSON feed that versioning-guards its own schema, timestamps each row, and encodes "not published" ≠ null ≠ "not fetched" is rarer than it should be — and the staleness rule (score-dependent blocks refuse to render after 35 days, "score paused") is the kind of defensive design I'd copy into our pipelines. The providers index surfacing an "Unverified rows" count per provider is also quietly honest. Yes, I'd screenshot the methodology page's label definitions into the team channel.

## 4. WOW SCORE

- **Site A: 7/10.** Unbeatable for quality-floor context and per-task cost across the whole model universe, but it replaces none of my spreadsheet columns that hold discount mechanics.
- **Site B: 8/10.** A versioned, dated, source-linked feed that actually has `batchPerM` — that's the spreadsheet-replacement core; it loses a point because TTL is missing and the universe is small (3 subscription offers is a placeholder, not a leaderboard).

## 5. RECOMMEND

- **Site A: keep, yes shareable.** It's my quality-floor reference and provider speed/price check; I'd share the cost-per-task view, with the warning "this does not know about your batch discount."
- **Site B: keep as the daily routing tool, shareable.** For my actual job — minimizing blended $/M subject to a quality floor — the machine feed plus per-row provenance is the thing I'd pipe into our cost model, and I'd post it in engineering Slack specifically for the citation hygiene, with the caveat "24 providers today, re-verify before you sign anything."

## 6. RECOGNITION

- Site A: **Yes** — long a fixture in model-selection discussions; nothing about it felt new to me today except how little the pricing side tracks discounts.
- Site B: **No** — first time seeing it today.

## 7. FINAL VERDICT

**PREFERENCE: Site B**, confidence ~75%. For the specific job of blended-cost engineering — batch %, off-peak windows in UTC, cache read/write fees, the >200k repricing trap — Site B answers three of four questions with sourced, dated, machine-readable rows while Site A answers none of the discount questions at all and hides its data behind a commercial platform. Site A remains the better *quality* instrument: its cost-per-task normalization and 644-model sweep are something Site B should study, and Site B's narrow 129-route universe means I'd still open Site A when the quality floor is the argument. The deciding factor is epistemics: a feed that distinguishes "not published" from "not fetched" and pauses stale scores is a tool I can trust in a pipeline, and that's worth more than breadth I have to second-guess.
