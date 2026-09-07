# Clean battery run — R05 (P3 indie-hacker, TP-first)

Seed: R05 = P3, TP-first → Site A = https://token-perks.com, Site B = https://artificialanalysis.ai
Recognition: both no (first visit this session).
Report received inline 2026-09-07. Verbatim runner text below.

---

# Website comparison — indie-hacker cost-per-task lens

I ran all three tasks on Site A first, then the same three on Site B. Voice notes below are in-character as the persona: ~100 automation tasks/month, ~100k tokens each (so ~10M tokens/month), deciding between a ~$20 subscription and pay-as-you-go credits. I think in cost per completed task, not cost per token.

---

## SITE A — Task 1: 100 tasks x 100k tokens — sub or pay-as-you-go?

**Recommendation from the site's own math: a cheap monthly plan beats pay-as-you-go at my volume.**

- The site's break-even calculator (inputs: monthly task count, tokens per task, seats; my session showed e.g. 120 tasks, 100,000 tokens/task, 1 seat) worked an illustrative example: **~$40/mo flat beats ~$96/mo pay-as-you-go at a $0.80/task reference, crossing over at ~50 tasks/mo, a ~$56/mo gap**. It notes $39 is the actual mid-tier price vs. the $40 illustrative basket.
- Its tracked-offer math: tiers at **$19 / $39 / $99 / $199 per month** (annual prepay effective **~$15 / $31 / $79 / $159**), with thresholds of **~24 tasks/mo for the $19 tier and ~49 tasks/mo for the $39 tier at the $0.80/task reference** ("$19 of pay-as-you-go buys about 24 tasks"). Example given: **$39 over 120 tasks is about $0.33/task, ~59% below the pay-as-you-go reference** (also expressed as $32.50 per 100 tasks).
- At my 100 tasks I'm past both the 24- and 49-task flip points, so the site puts me on the subscription side.
- **The site did the math.** It shows a per-100k-token-task cost column derived from a stated blended formula ((3x input + 1x output) / 4 at list price), task-size presets (12k chat / 60k coding / 120k reasoning / 200k agentic / 100k baseline), and the $40 / 120-task / $0.80 / 50-task reference model. I just had to map my 100 x 100k onto its 120-task example — no external arithmetic needed for the verdict, though the exact 100-task total ($80 pay-as-you-go equivalent at the reference rate vs. $19–$39 flat) is my one-line extrapolation.
- *In-character: finally, someone who speaks per-task. I punched in my volume and got a crossover number, not a per-million lecture. This is the first site that didn't make me do unit conversions on a napkin.*

## SITE A — Task 2: 2,000 calls/month — per-call cost and flip point?

- **Per-call/per-task numbers (site-computed, for 100k-token tasks):** cheapest promo row ~$0.012/task; mid-range examples ~$0.215/task at a $2.15 blended rate; $0.80/task at an $8.00 blended rate; ~$2.00/task at $20.00 blended; top row ~$4.125/task at $41.25 blended. General rule visible on the page: per-100k-task cost = blended $/M divided by 10.
- **At 2,000 calls:** even using the site's mid-range (~$0.215 x 2,000 = ~$430/mo) or the $0.80 reference ($1,600/mo), pay-as-you-go is an order of magnitude above the $19–$199 subscription ladder — subscription wins by a mile at that volume.
- **Flip point:** same thresholds as Task 1 — **~24 tasks ($19 tier) / ~49–50 tasks ($39 tier)** at the $0.80/task reference. Past that, every extra task widens the subscription's lead.
- **Who did the math:** the site did per-task normalization; **I did the 2,000x multiplication** — there is no explicit "2,000 calls" view, no per-extra-unit fee table, and no call tally shown for the subscription tiers.

## SITE A — Task 3: lock-ins and fine print?

**Traps found (quoted/paraphrased from the site's own caveats):**

- **Annual prepay:** yearly tiers are "year prepaid upfront" — money down now for the ~$15–$159 effective monthly rates.
- **Renewal:** "monthly tiers renew at list price."
- **Throttling inside the cap:** "one shared credit pool" plus "5-hour and weekly usage controls"; "burst caps can throttle you mid-day even when the monthly balance looks healthy." As the persona: this is the trap that matters most — 2,000 calls won't fit in a bursty afternoon even if the monthly headline looks fine.
- **Promo fragility:** cheapest API row carries "promo may end; list is 2x." The $0 offer's "promo window" is "not published — visible inside the official product only," "can end without notice," with "no grandfathering to assume," plus a near-identical paid entry sitting one row away and access only through one exact in-product path.
- **Free-tier scope locks:** the $0 hardware-vendor route is "development/prototyping scope," "account-variable quota," "no production SLA," "no published quota table."
- **What's missing:** no overage $/unit schedule or call tally for the subscription ladder; the site's blanket caveat is "re-verify at official terms before paying — prices, limits, and promo windows change."

---

## SITE B — Task 1: 100 tasks x 100k tokens — sub or pay-as-you-go?

**No recommendation possible from the site. It doesn't answer this question.**

- Across the homepage, leaderboard, methodology, a model page, and the about page, I found **no subscription plans, no ~$20 plans, no subscription-vs-pay-as-you-go comparison, and no break-even calculator**.
- What it shows instead is API token economics only: per-million-token input/output/cache prices, a blended rate (fixed 7:2:1 cache-hit/input/output mix), and a "cost per benchmark task" metric (weighted-average cost to complete one of *its* benchmark tasks, e.g. ~$7.63 for one flagship, ~$3.26 for another, ~$0.01 for small ones).
- Its benchmark task is not my task — the methodology says models with longer answers/reasoning score a higher cost per task — so I can't read my 100k-token cost off its per-task column, and with no subscription price on the site there's nothing to break even against.
- **I would have had to do 100% of the math** (convert token rates to 100k-token jobs, invent a subscription price, compute a crossover). Nothing to work with.
- *In-character: bounced. It's all per-token tables and per-benchmark-task scores for someone else's workload. I need "your 100 jobs cost $X flat vs $Y metered, flip at Z jobs" and this site never once says the word subscription.*

## SITE B — Task 2: 2,000 calls/month — per-call cost and flip point?

- **Numbers:** only convertible raw material, e.g. one model page showed **$1.25 per 1M input / $4.25 per 1M output, $0.78 blended per 1M, $1.60 per benchmark task**, plus a $2,000.35 full-evaluation-run total. A provider comparison showed ~16 endpoints for one open model with per-endpoint blended rates and speed. No volume tiers, no 2,000-call pricing, no per-call unit.
- **Flip point vs. subscription: none shown** — there is no subscription side of the comparison anywhere I looked.
- **Who did the math:** entirely me, and unreliably — I'd have to assume my input/output mix maps onto its 7:2:1 blend and that its benchmark-task token counts resemble my 100k jobs, which the site itself warns against (reasoning length moves the number).

## SITE B — Task 3: lock-ins and fine print?

**None shown.**

- No annual prepay terms, no renewal behavior, no usage caps, no overage charges anywhere in the excerpts I checked. The methodology defines pay-per-use only in the abstract ("pay for usage, not a fixed rate," native-tokenizer billing, first-party-or-median rate sourcing). The about page is a company overview (coverage areas, scale figures, founders/backers, hiring) with zero billing terms.

---

## RECOGNITION PROBE

- Site A: No — first visit was this session, for these tasks.
- Site B: No — first visit was this session, for these tasks.

---

## FINAL VERDICT

- **PREFERENCE: Site A**
- **Confidence: high**

Site A is the only one of the two that serves this persona: it normalizes everything to cost per completed task at selectable sizes including 100k tokens, and its calculator states a crossover (~50 tasks at the $0.80/task reference; ~24/~49 tasks for the $19/$39 tiers) that directly answers "which is cheaper and when does it flip." Site B is stronger as an independent benchmark lab — transparent test-suite methodology, per-endpoint blended pricing across many hosts, and honest warnings that reasoning length drives cost — but for my three tasks it is all raw material and no answer: no subscription prices, no break-even tool, a benchmark-task metric that isn't my task, and no fine print on caps or overages. The gap that seals it: Site A also surfaces the traps I'd actually hit (shared pool with 5-hour/weekly burst caps, prepaid-upfront annuals, unpublished promo windows with no grandfathering), while Site B shows none.

---

## Tally note (coordinator)

Clean R05 = win for Token Perks (Site A). Running tally: TP 6 — AA 0 (6 of 10 reporting).
Fix-list item confirmed again: no explicit 2,000-call view (runner did the 2,000x multiplication); no overage $/unit schedule on subscription ladder.
