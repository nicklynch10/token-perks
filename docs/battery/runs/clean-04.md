# Clean battery run — R04 (P3 indie-hacker, AA-first)

Seed: R04 = P3, AA-first → Site A = https://artificialanalysis.ai, Site B = https://token-perks.com
Recognition: Site A yes (familiar from training); Site B no (never seen).
Report received inline 2026-09-07. Verbatim runner text below.

---

SITE A — results (visited first)

TASK 1 — ~100 tasks/mo x ~100k tokens (10M tokens): subscription or PAYG?
- Impression as the persona: ugh, this is per-token land. I see exactly what I feared — lots of $/M tables and I have to do the arithmetic myself.
- What Site A showed: Price ($ per M tokens) + Blended Price, and Cost per Intelligence Index Task defined as weighted average cost per Intelligence Index task, split by Answer / Reasoning / Cache Write / Cache Hit / Input. Examples visible: Devstral 2 $0.00, Llama 3.1 Instruct 8B $0.02/M blended called most affordable, Granite 4.2 3B $0.02, Nova Micro $0.03. Scatter views like Intelligence Index vs Cost per Task with Pareto line / Most attractive quadrant.
- Recommendation: none. No subscription prices, no $20-ish plan comparison, no break-even calculator.
- Break-even math: none for my 100 x 100k workload. I would have to take a blended $/M x 10M myself and go find sub prices elsewhere.
- Who did the math: I would have to. Site A pre-computes only its own benchmark-task averages, not my 100k-token task.

TASK 2 — scale to 2,000 calls/mo (~200M tokens): per-call cost + flip point?
- Numbers: no per-call figure for a custom 100k-token request at 2,000/mo. No volume tiers, no bulk markdown, no subscription crossover.
- To get anything I have to extrapolate: 200M tokens = 200 x the listed $/M blended price. No tool does that scaling for me.
- Flip point vs subscription: none shown.
- Who did the math: me alone.

TASK 3 — lock-ins and fine print?
- Traps found: none shown.
- Annual prepay / renewal / caps / overages: none shown. About positions Site A as an independent benchmarking company covering Agents / Models / Cloud / Chips. No sale of subs or credits, no amounts or tiers for its own tools (Optima, MicroEvals, Model Recommender, Data Playground, Image Lab). Only links to Terms of Use / Data Platform Terms / Privacy with no dollar detail excerpted. Login / email signup visible, no paywall notice seen.

---

SITE B — results (visited second, same three tasks)

TASK 1 — ~100 tasks/month at ~100k tokens each: subscription or pay-as-you-go API — which is cheaper, and at what usage level does the answer flip? Record: the recommendation, the break-even math, and whether the site did the math or you had to.
- Impression as the persona: finally someone speaks cost per completed task. I didn't bounce — the homepage immediately shows $/task and a sub-vs-PAYG verdict.
- What Site B showed: catalog framed as 129 purchase paths (39 subs, 48 API, 10 credits, 18 coding tools, 14 free/promos in counts shown). API table ranks 43 paid routes by blended price where blended $/M = (3x in + 1x out)/4 at list price. Task presets named: Chat 12k, Coding 60k, Reasoning 120k, Agentic 200k, Baseline 100k. $/task column = blended x 100k. Examples: Z.ai GLM-5.3-Flash $0.07 in / $0.25 out, blended $0.119/M, ~$0.012/task; OpenAI gpt-5.6-luna $0.20 / $1.20, $0.45/M, ~$0.045/task; Z.ai GLM-5.3 family $1.40 / $4.40, $2.15/M, ~$0.215/task; Moonshot kimi-k3 $3.00 / $15.00, $6.00/M, ~$0.60/task; OpenAI gpt-5.6-sol $4.00 / $20.00, $8.00/M, ~$0.80/task; Anthropic Opus 5 $5 / $25, $10.00/M, ~$1.00/task; Anthropic Fable 5.1 $10 / $50, $20.00/M, ~$2.00/task.
- Subscription side: tracked offers table with $/100 tasks illustrative on PAYG ref $0.80/task = $80/100 tasks. $20-ish subs listed in full table: Claude Pro $20/mo ($17 annual), ChatGPT Plus $19.99/mo, Google AI Pro $19.99/mo, Kimi Moderato $19/mo (~$15 annual eff.), Cursor Pro $20/mo, Devin Pro $20/mo, Perplexity Pro $20/mo or $200/yr. Worked tier Kimi Allegretto $39/mo (~$31 annual, $372 upfront) at $32.50/100 tasks on Allegretto, -59% vs PAYG ref. Free routes: Muse Spark 1.3 Free $0.00/100 tasks limited-time promo window, NVIDIA K3 Free $0.00/100 tasks dev/prototyping with account-variable quota.
- Recommendation + break-even: interactive calculator with inputs Tasks/mo, Tokens/task, Seats, URL updates for sharing. At defaults 120 tasks / 100k tokens: PAYG $96.00/mo vs $40 flat sub $40.00/mo, crossover 50 tasks/mo, $56.00/mo difference, verdict Flat subscription — $40/mo. Explainer distinguishes $40 illustrative basket vs $39 actual Allegretto tier — ~50 tasks on basket, ~49 on Allegretto at $8 per 1M illustrative. Guide linked for method.
- For my 100 x 100k = 10M: ~$80 PAYG vs ~$39-40 flat, flat wins if I clear ~49-50 tasks.
- Who did the math: the site did it. I just typed tasks/tokens.

TASK 2 — 2,000 calls/mo x ~100k (200M tokens):
- Listing page alone only snapshots the 120-job baseline (~$0.33/task at 120 tasks/mo) with no 2,000-load calc, no bulk markdown described. I have to go one click deeper to the offer deep-dive for scale math.
- Offer page (/best/kimi-k3-core/) gives the ladder: Moderato $19, Allegretto $39, Allegro $99, Vivace $199; yearly effective ~$15 / $31 / $79 / $159. Break-even = fee / $0.80: ~24 jobs/mo Moderato, ~49 jobs/mo Allegretto monthly, ~39 jobs/mo Allegretto yearly effective ~$31.
- Applied numbers on page: at 100 jobs PAYG ref $80 — $19 = $0.19/job wins, $39 = $0.39/job wins, $99 = $0.99/job loses, $199 = $1.99/job loses. At 2,000 jobs PAYG ref $1,600 — $199 = ~$0.10/job on paper ~8x cheaper, $99 = ~$0.05/job, $39 = ~$0.02/job on paper — but page explicitly warns paper math will not hold for bursts at 2,000 scale due to throttles below.
- Who did the math: site does it if I use the calculator / deep-dive (params like ?tasks=120&tokens=100000#verdict shareable); listing alone leaves me to extrapolate.

TASK 3 — lock-ins and fine print?
- Traps found — unusually explicit:
  1. Annual lock: full-year cash upfront for ~20% saving (Allegretto ~$372 upfront, ~$31 eff vs $39 monthly, ~$96/yr saving ~20.5%; same proportional drop $19 to $15, $99 to $79, $199 to $159). No refund / cancel / mid-cycle upgrade/downgrade promise in Sep 6 snapshot — must confirm before paying. Guidance: stay monthly until volume clears break-even 3+ consecutive months with no seasonal dip; with no reimbursement monthly is cheaper until about month 10; if usage collapses in month 4 monthly user spent $156.
  2. Renewal: renews monthly at same tier; annual stays on tier until term ends, monthly access to end of paid month then stops. Checklist says set calendar reminder 30 days before annual renewal. Auto-renew charge / price-lock / proration formula: none shown.
  3. Usage caps: one shared credit pool plus 5-hour and weekly usage controls; yearly does not raise caps. Burst caps with no numeric allowance published can pause me mid-day even with monthly balance left; weekly reset follows provider timetable; extreme patterns face fair-use style gating. Advice to test against heaviest week before prepaying. Tier gap $39 to $99 is 2.5x jump, usage between tiers prices poorly.
  4. Overage charges: none shown in dollars — constraint is throttling/stalling, not extra billing.
  5. Consumption/route traps: served as k3-256k with high thinking-on, long sessions burn materially more than short completions so my tokens/job will differ; coding endpoint draws from membership but PAYG API key bills separately — wrong target = membership does not apply.
- Hygiene: Verified Sep 6 2026 / re-check official terms before paying, re-checked weekly per Methodology; no affiliate links in this version, outbound direct to official pages, may earn commission from future links.

---

RECOGNITION PROBE (answered after all tasks, before preference)
- Site A: Yes — familiar from training as a public independent AI benchmark/leaderboard site.
- Site B: No — never seen or used before this session.

---

FINAL VERDICT
- PREFERENCE: Site B
- Confidence: high
- Rationale: For my 100 x 100k decision Site B answered in $/task while Site A only speaks $/M and $/benchmark-task and left me to multiply by 10M myself. Site B's interactive tasks/tokens calculator gave a direct verdict with crossover (~49-50 tasks on Allegretto/basket) and $/100-tasks column plus named $20 subs, where Site A offered no subscription comparison at all because it sells nothing. On scale and traps Site B again did the work — 2,000-job paper math with an honest throttle warning, and explicit annual-upfront, shared-pool plus 5-hour/weekly caps, and route-trap notes — where Site A showed none shown on every lock-in line. Site A is better only at breadth of independent intelligence/speed benchmarking across 600+ models and provider endpoint comparisons; for choosing sub vs PAYG per completed task it made me want to bounce.

---

## Tally note (coordinator)

Clean R04 = win for Token Perks (Site B). Running tally: TP 3 — AA 0 (3 of 10 reporting: R04, R07, R10).
Note: runner's paraphrase of TASK prompts ("Record: ...") differs slightly from frozen wording but tasks executed match the frozen set.
