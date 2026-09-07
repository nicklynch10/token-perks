# Tasks — Blind Comparison Battery v1.0

20 tasks, 2–3 per persona. Each task is given to the runner **verbatim in the persona's voice** and answered on BOTH sites (order per seed table). Task texts are FROZEN: no rewording between runners or fix rounds (`battery-protocol.md` §0, §9).

**Framing rule (verified line by line at freeze):** no task text contains "leaderboard," "effective cost," "value score," "Token Perks," or the product vocabulary of either site. Personas ask in their own words; if the sites' own vocabulary helps them, they discover it on-site.

**Tags, declared before any run:**

| Tag | Count | Tasks |
|---|---|---|
| `FAVORS-TP` | 15 | P1-T1..T3, P2-T1, P3-T1..T3, P4-T1..T2, P5-T1..T2, P6-T2, P7-T3, P8-T1..T2 |
| `FAVORS-AA` | 3 | P2-T2, P6-T1, P7-T2 |
| `NEUTRAL` | 2 | P2-T3, P7-T1 |

Declared asymmetry: the mix skews toward purchase decisions because that is what these eight buyers show up to do. The three `FAVORS-AA` tasks are genuine AA strengths (benchmark drill-down, per-effort eval detail, speed data). The gate is the bookmark decision, not task points, so the mix cannot mechanically produce a pass — but the report's honesty section must print this table (`report-template.md` §5).

**Answer keys** cite `docs/research/provider-universe.md` (accessed 2026-09-07) with its verification labels: DIRECT (read from official page), EXCERPT (official page via partial/search-indexed copy), UNCERTAIN (not confirmed — key says so). UNCERTAIN rows are "no key": a runner repeating an honest "this couldn't be verified" has not failed. Where the only true answer is "nobody publishes this," that answer is correct.

**Grading:** each site's answer per task is graded `correct / partial / wrong / not-found` against the key (definitions in `scoring.md` §3). "Not-found within budget" on an answerable task is a legitimate and expected outcome for the weaker site — it is exactly the evidence this battery exists to collect.

---

## P1 — Solo dev shipping an MVP on a budget

### P1-T1 · `FAVORS-TP` · Budget 120s/site
**Prompt (verbatim):** "I keep hearing about 'Kimi K3' for coding agents. What would it actually cost me per month of heavy agent coding, and which tier would someone like me pick? I've got about forty bucks a month, tops."

**Key.** Membership tiers (kimi.ai, EXCERPT, snapshot Sep 6 2026): Moderato $19/mo, Allegretto $39/mo, Allegro $99/mo, Vivace $199/mo; annual ≈ $15/$31/$79/$159 effective. API route (platform.kimi.ai, DIRECT): $3.00/M input cache-miss, $0.30 cache-hit, $15.00/M output; 1,048,576-token context. Correct shape: names ≥ 2 tiers with dollars, picks a tier (or API) with a reason tied to the $40 cap — Allegretto $39 is the natural pick; monthly-vs-annual delta surfaced; membership route (api.kimi.com/coding) distinct from PAYG key is a bonus, not required.

**Note.** AA does not cover consumer membership tiers; it prices the API only.

### P1-T2 · `FAVORS-TP` · Budget 120s/site
**Prompt (verbatim):** "Before I pay anything — is there a way to run my coding agents on Kimi K3 for free, and what's the catch?"

**Key.** NVIDIA Build hosts Kimi K3 free for dev/prototyping (EXCERPT, snapshot): account-variable limits, no published quota table, reasoning/tool-calls preserved. Related free routes a good answer may add: Google AI Studio free tier on Flash models (DIRECT); Z.ai free flash API models GLM-4.7-Flash etc. (DIRECT); OpenRouter free tier 50 req/day, 1,000/day after a $10 credit buy (EXCERPT); Fireworks Fire Pass $0/token on included models (DIRECT) but invite-only, promo-code, kimi-k3-fast router, non-production only. Wrong: asserting unlimited free use with no limits statement.

### P1-T3 · `FAVORS-TP` · Budget 150s/site
**Prompt (verbatim):** "Decide for me: this month, what do I pay for, exactly how much, and why in one sentence? I ship in three weeks and I code with agents all day."

**Key.** Any defensible decision with a correct dollar figure under the $40 cap and a stated reason — e.g. Allegretto $39 with NVIDIA free route as backup; or NVIDIA free + $0 this month with caps acknowledged; or API PAYG with a monthly estimate at their usage. Grading is on internal consistency (figure matches the chosen route) and correctness of any number quoted against P1-T1/P1-T2 keys, not on which route they pick.

---

## P2 — ML grad student

### P2-T1 · `FAVORS-TP` · Budget 120s/site
**Prompt (verbatim):** "I need to summarize a few thousand paper abstracts and classify survey responses this week. Quality just has to be decent. What's the cheapest option per batch of work, and is there any discount for running it overnight or in bulk?"

**Key.** Cheap classes (all from provider-universe.md): GLM-5.3-Flash promo $0.075/$0.25 per 1M (list $0.15/$0.50) (DIRECT); GLM-4.7-Flash free (DIRECT); gpt-5-nano $0.05/$0.40, gpt-5-mini $0.25/$2.00 (DIRECT); Gemini 2.5 Flash-Lite $0.10/$0.40, free tier available (DIRECT); Gemini 3.1 Flash-Lite $0.25/$1.50 (DIRECT); deepseek-v4-flash $0.22 off-peak in / $0.66 out, cache-hit input $0.007 (EXCERPT); MiniMax-M2.7 $0.30/$1.20 (EXCERPT). Bulk/off-peak mechanics: OpenAI batch −50% (DIRECT); Anthropic batch −50% (DIRECT); Gemini batch ≈ half (DIRECT); DeepSeek off-peak exactly half, hours not published in our research (EXCERPT + honest gap); Z.ai night-owl: unlimited GLM-5.3-Flash in ZCode 23:00–09:00, paid coding-plan users (DIRECT). Correct shape: names ≥ 2 concrete cheap options with $/1M figures and ≥ 1 true discount mechanism. Bonus: Z.ai night promo applies to ZCode coding agent, not raw API batches — a site that blurs that is wrong.

### P2-T2 · `FAVORS-AA` · Budget 150s/site
**Prompt (verbatim):** "For my paper's model-choice section I need the actual published evaluation numbers for GLM-5.3: which benchmark suite, what score, and does the number change with reasoning effort? I need to cite this properly — eval names, version, date."

**Key.** AA Intelligence Index v4.3 (methodology page + data API, DIRECT): 10-eval suite — AA-Briefcase, GDPval-AA v2, AutomationBench-AA, Terminal-Bench v4.0, SciCode, Humanity's Last Exam, GDP.pdf, CritPt, AA-Omniscience, AA-LCR v1.1. GLM-5.3 (max): 44, top open-weights model on the v4.3 list (aa-benchmark-scores.md, accessed 2026-09-07). Per-effort variants exist (e.g. "GLM-5.3 (max)"); AA flags estimated scores with `*`. Correct shape: index version + suite names + the headline score, with the estimate flag explained if surfaced. Grader note: full 10-eval enumeration is an AA-drill-depth answer; a correct v4.3 + 44 + "suite documented on the methodology page, link" is `partial-to-correct` — grader awards `correct` if version + score + citation path are all present, `partial` if any is missing.

### P2-T3 · `NEUTRAL` · Budget 120s/site
**Prompt (verbatim):** "Some of my abstracts come as huge concatenated dumps. Which cheap models can take a really long document in one shot — and what's the price at that length?"

**Key.** Context + price pairs: Kimi K3 API 1,048,576 tokens at $3/$15, $0.30 cache-hit input (DIRECT); grok-4.3 1M ctx at $1.25/$2.50 (<200k rate), whole-request re-billing ≥200k at $2.50/$5.00 (DIRECT); grok-4.6/4.5 500k at $2/$6 (<200k), ≥200k bills whole request at $4/$12 (DIRECT); Gemini 3.1 Pro Preview >200k tier $4/$18 (DIRECT); DeepSeek ~1M per third parties only (UNCERTAIN — honest "not officially published" is correct). Correct shape: ≥ 2 models with true context figures and correct price handling at length, including any tier-break warning.
---

## P3 — Indie hacker comparing API vs subscription

### P3-T1 · `FAVORS-TP` · Budget 150s/site
**Prompt (verbatim):** "For my coding-agent hours (~100 agent tasks a month), should I buy an IDE subscription, a flat coding plan, or just metered API credits? Name actual products and actual prices."

**Key.** Flat/coding plans: Kimi K3 membership $19–$199 tiers (EXCERPT); GLM Coding Plan Lite $18, 2,000 credits/5-hr + 10,000 weekly, GLM-5.3 + Flash, works with Claude Code/Cline/OpenCode (DIRECT); GLM Pro/Max prices NOT published (community $72–80/$160–168 — UNCERTAIN, do not rely); MiniMax Token Plan Plus $22 ≈ 34k calls/mo, Max $55, Ultra $132 (EXCERPT); Kimi coding endpoint served off membership pool, separate from PAYG (EXCERPT). IDE subscriptions: Cursor Pro $20 with extended Agent limits + on-demand overage billed in arrears (DIRECT); Copilot Pro $10 / Pro+ $39 / Max $100, 1 AI credit = $0.01, credits by tier $15/$70/$200 monthly (DIRECT); Copilot Free 2,000 completions + 50 chats/mo (DIRECT). API reference points: gpt-5.6-terra $2/$12, gpt-5.6-sol $4/$20 with promo through Nov 21 2026 (DIRECT); Kimi K3 API $3/$15 (DIRECT). Correct shape: ≥ 3 named products with true prices across at least two categories, and a comparison logic tied to ~100 tasks/mo.

### P3-T2 · `FAVORS-TP` · Budget 150s/site
**Prompt (verbatim):** "My backend makes about 2,000 API calls a month. At what usage does a flat subscription beat pay-as-you-go for me — and are there fees that change the math?"

**Key.** Any defensible break-even computation with correct inputs. Valid inputs: Kimi K3 API $3/$15 vs membership $19+ (EXCERPT); GLM Lite $18 flat vs GLM-5.3 API $1.40/$4.40 (DIRECT); MiniMax Plus $22 ≈ 34k calls ≈ ~1,130/day (EXCERPT); fees: OpenRouter top-up 5.5% via Stripe / 5% crypto (EXCERPT); cache discounts (Kimi cache-hit $0.30 input; OpenAI cached in $0.20 on terra) change per-call cost (DIRECT); DeepSeek off-peak halves input+output (EXCERPT). Correct shape: a flip-point statement in calls/month or $/month with the arithmetic visible, and at least one fee/caveat that modifies it. A bare "subscriptions are better value" with no numbers is `wrong`.

### P3-T3 · `FAVORS-TP` · Budget 120s/site
**Prompt (verbatim):** "Which of these deals actually lock me in or quietly expire? I change setups constantly — where's the fine print?"

**Key.** True catches: gpt-5.6-sol promo pricing "available at least through November 21, 2026" (DIRECT); Gemini 3.8/3.7/3.6 Flash $0.75/$3.75 only through Dec 31 2026, then $1.50/$7.50 (DIRECT); Fireworks Fire Pass invite-only, promo-code, non-production, expiry visible in Billing (DIRECT); NVIDIA K3 free limits account-variable, unpublished (EXCERPT); Muse Spark free promo in-product route only, end date visible only in-product (EXCERPT snapshot); OpenRouter credits top-up fee 5.5% (EXCERPT); annual-vs-monthly deltas (Kimi tiers ≈ 20% off annual; Claude Pro $17 annual vs $20 monthly) (EXCERPT/DIRECT); Cursor on-demand usage billed in arrears (DIRECT). Correct shape: ≥ 3 true expirations/lock-ins with specifics. Vague "promos may end" without naming one is `partial` at best.

---

## P4 — Small-business owner buying seats for 3 staff

### P4-T1 · `FAVORS-TP` · Budget 180s/site
**Prompt (verbatim):** "I need AI for three employees — two writers who'd use it all day, one analyst who'd use it sometimes. Total budget about a hundred fifty a month. What do I buy, and what's my real total per month?"

**Key.** Seat plans: Claude Team Standard $20/seat/mo annual ($25 monthly), Premium $100/seat annual ($125 monthly), 2–150 seats, mix-and-match (DIRECT) — e.g. 2 Standard + 1 Premium annual = $140/mo, or 3 Standard = $60–75/mo; Google AI Pro $19.99/seat ×3 ≈ $60 (EXCERPT); Perplexity Pro $20/seat (EXCERPT); ChatGPT Team/Plus prices UNCERTAIN in our research (honest gap — a runner saying "ChatGPT's team price couldn't be verified here" is correct); Copilot Pro $10/seat as a writing-tool option (DIRECT). Correct shape: a concrete mix with a total ≤ $150 and per-seat math shown. Wrong: any misstated seat price, or a total that silently exceeds $150.

### P4-T2 · `FAVORS-TP` · Budget 150s/site
**Prompt (verbatim):** "What happens in a month when my heavy writer goes wild — do I get a surprise bill, or does she just hit a wall and stop? I need to know before I put a card on file."

**Key.** True mechanics: Claude Pro/Team = usage walls (5-hour session limits, weekly caps; Max 5x caps Fable at 50% weekly) — hit a wall, not a bill (DIRECT); Cursor Pro on-demand usage billed in arrears = possible surprise bill (DIRECT); Copilot = credit meter ($0.01/credit), tiered monthly credit buckets, runs out then stops unless credits bought (DIRECT); MiniMax weekly token quotas, recently moved off 5-hr resets (EXCERPT); Kimi membership quota per tier (EXCERPT); Google AI tiers by usage multiple of free (EXCERPT). Correct shape: per-plan answer "wall vs bill" with the mechanism named, plus at least one plan flagged as bill-risk.

---

## P5 — Gift-buyer for a partner who writes

### P5-T1 · `FAVORS-TP` · Budget 150s/site
**Prompt (verbatim):** "My partner writes novels and I want to get her a good AI subscription for her birthday. Which plan makes sense for a writer (not a coder), what does it really cost per month, and can I pay for a year up front?"

**Key.** Writer-appropriate options with true prices: Claude Pro $17/mo if billed annually ($200 upfront) or $20 monthly; includes Claude Code/Cowork etc. but the chat itself is the writer-relevant part (DIRECT); Google AI Pro $19.99/mo with Gemini in Gmail/Docs (EXCERPT); Perplexity Pro $20/mo or $200/yr (research-heavy writers) (EXCERPT); ChatGPT Plus price UNCERTAIN in our research (honest gap acceptable); Mistral Vibe Pro $14.99 (EXCERPT). Free baseline a good answer mentions: Claude Free, Gemini free tier, Grok free (DIRECT). Correct shape: 2–3 named options, correct dollars, annual prepay called out where it exists (Claude Pro $200/yr is the cleanest). Wrong: coder-oriented plans (GLM Coding/Kimi coding tiers) pitched as "for a writer."

### P5-T2 · `FAVORS-TP` · Budget 150s/site
**Prompt (verbatim):** "Can I actually gift this stuff — like buy it for someone else? And what does she already get for free, so I don't buy her something she has?"

**Key.** Gifting: none of the researched providers publish a gift-checkout option; the honest answer is "no gift purchase found — prepay annual in her name or use a gift card" (research contains no gift SKU; a site claiming a gift option without a source is WRONG). Annual prepay exists for Claude Pro ($200/yr, DIRECT) and Perplexity Pro ($200/yr, EXCERPT). Free already-got: Claude Free ($0, throttled, DIRECT), Gemini free tier on most Flash models (DIRECT), ChatGPT Free (structure confirmed, DIRECT), Grok free (DIRECT), Mistral Vibe Free + $10/mo API credits (EXCERPT). Correct shape: plain-language "no gift button found, here's the workaround," plus ≥ 2 free-tier facts. This task doubles as the battery's plain-language audit: an answer a non-technical gift-buyer can't act on is `not-found` even if technically present.
---

## P6 — Skeptical senior engineer who distrusts marketing sites

### P6-T1 · `FAVORS-AA` · Budget 180s/site
**Prompt (verbatim):** "Someone on my team claims GLM-5.3 matches the big closed models at a fraction of the price. Show me the actual evaluation data: what benchmark suite produced the headline number, what's the score, and does it vary by reasoning-effort setting? I want names and versions, not vibes."

**Key.** AA Intelligence Index v4.3, 10-eval suite named above (P2-T2 key) (DIRECT); GLM-5.3 (max) 44, top open weights (accessed 2026-09-07); per-effort variants exist and are listed separately; AA marks estimated scores `*` and its homepage counter showed 24 of 644 models re-run under v4.3 — a skeptical answer that surfaces "some scores are estimates" is excellent. Price half of the claim: GLM-5.3 API $1.40/$4.40 (DIRECT) vs Fable 5.1 $10/$50, Opus 5 $5/$25, gpt-5.6-sol $4/$20 (DIRECT). Correct shape: suite/version/score with sources, effort-variant caveat, and a verdict on "matches the big closed models" that quotes the actual gap (44 vs Fable 5.1's 53, Opus 5's 51). Grader note: this is the battery's deliberate AA-home-turf drill; TP's honest best is index + coding/math tabs + attribution link — grade what's present, no charity.

### P6-T2 · `FAVORS-TP` · Budget 150s/site
**Prompt (verbatim):** "Same model, money side: verify the price claim from the official sheet — and tell me whether the flat monthly route to this model is cheaper than metered for a heavy user, including any fine print."

**Key.** API: GLM-5.3 $1.40/$4.40 per 1M (DIRECT). Flat route: GLM Coding Plan Lite $18/mo, 2,000 credits/5-hr, 10,000 weekly, GLM-5.3 + Flash included, works with Claude Code/Cline/OpenCode (DIRECT); Pro/Max prices NOT published officially (community ~$72–80/~$160–168, UNCERTAIN — repeating them as fact is WRONG); ZCode night promo: unlimited GLM-5.3-Flash 23:00–09:00 for coding-plan users (DIRECT); Kimi parallel: K3 API $3/$15 cache-miss vs membership $19–$199 (EXCERPT). Correct shape: verified API numbers + the $18 Lite anchor + the unpublished-Pro-price honesty point + at least one promo/caveat. A site that gives the API price but misses the membership/coding-plan route entirely is `partial` — that miss is precisely what the fix loop should hear about from losing-site records.

---

## P7 — Data engineer optimizing batch costs

### P7-T1 · `NEUTRAL` · Budget 150s/site
**Prompt (verbatim):** "I process ~400,000 docs a month through classification and extraction. Line up the cheapest models per million tokens across providers — flash/mini/air class — so I can pick a fleet."

**Key.** Same cheap-class rows as P2-T1 (GLM-5.3-Flash promo $0.075/$0.25; GLM-4.7-Flash free; gpt-5-nano $0.05/$0.40; Gemini 2.5 Flash-Lite $0.10/$0.40; deepseek-v4-flash off-peak $0.22 in/$0.66 out; MiniMax-M2.7 $0.30/$1.20; Mistral Large $0.50/$1.50), all with labels as in P2-T1. Correct shape: a real cross-provider table (≥ 4 providers) with true $/1M numbers. Grader note: AA's per-model price table genuinely answers this; TP's edge is cache/batch-adjusted views. Treat as `NEUTRAL` — grade only number truth and coverage.

### P7-T2 · `FAVORS-AA` · Budget 120s/site
**Prompt (verbatim):** "Wall-time matters for my pipeline: of my two finalists — Gemini 3.8 Flash and gpt-5.6-terra — which generates output faster, and by roughly how much? I need throughput numbers, not adjectives."

**Key.** Median output speed / latency data is AA-home turf (AA publishes tokens-per-second and latency per model/endpoint; accessed 2026-09-07). TP v2 carries no speed data (design scope: intelligence vs cost axes only). Correct on AA: named throughput figures for both models with measurement framing (median output tokens/s) and any effort-setting caveat. Correct on TP: honest "we don't carry speed data" + pointer to the source that does = `partial` (it's a usable redirect, not an answer). A site inventing or hand-waving speed numbers is `wrong` — this task is also a hallucination tripwire.

### P7-T3 · `FAVORS-TP` · Budget 180s/site
**Prompt (verbatim):** "How much do batch and off-peak discounts actually cut the bill, per provider — exact percentages, hours if there are time windows, and how caching stacks on top for my repeated templates?"

**Key.** OpenAI batch −50% across the table (DIRECT); Anthropic batch −50% across rows (DIRECT); Gemini batch ≈ half (DIRECT); Mistral batch −50% (EXCERPT); DeepSeek off-peak exactly half — in $0.22/$0.44, out $0.66/$1.32 — peak/off-peak HOURS not published in our research (EXCERPT + honest gap); caching: Kimi cache-hit input $0.30 vs $3.00 (90% off, DIRECT); DeepSeek cache-hit input $0.007 vs $0.22 miss (EXCERPT); OpenAI cached input ~10x cheaper per row (e.g. sol $0.40, DIRECT); Anthropic cache read $0.25 on Fable 5.1 (DIRECT); MiniMax cache read $0.06 (EXCERPT); Gemini priority ≈ 1.8x (premium, opposite direction, DIRECT). Correct shape: per-provider discount mechanics with numbers, hours given where real and "unpublished" where not, and cache stacking stated (batch and cache stack on different axes: batch is a job-mode discount, cache is an input-rate discount).

---

## P8 — Non-technical operations manager

### P8-T1 · `FAVORS-TP` · Budget 180s/site
**Prompt (verbatim):** "My boss gave me three hundred dollars a month to get our 20-person office set up with AI. I don't know what a model is and I don't want to. What should I buy, what will it cost, and tell me like I'm five."

**Key.** Sensible shapes (any defensible one): per-seat chat plans for the whole office vs a handful of seats + free tier for the rest — e.g. Google AI Pro $19.99 × 10 seats ≈ $200 (EXCERPT); Claude Team 5 Standard seats annual $100 (DIRECT); ChatGPT Team for the office (price UNCERTAIN in research — honest gap); Perplexity Pro seats for research-heavy staff (EXCERPT). Correct shape: 1–3 options, plain words, correct arithmetic, total ≤ $300, and a recommendation. Jargon tolerance: tokens, context windows, or model-name soup without plain framing caps the grade at `partial` even if numbers are right — this is the persona-voice rule (v1 kit F7) carried into the battery.

### P8-T2 · `FAVORS-TP` · Budget 150s/site
**Prompt (verbatim):** "Before I put the company card on anything — what could go wrong? Surprise charges, running out at month-end, getting locked in for a year. What are the traps?"

**Key.** True traps: annual-commitment discounts mean lock-in (Claude Team/Pro annual rates, Kimi annual ≈ 20% off, DIRECT/EXCERPT); usage walls at month-end or 5-hour bursts (Claude session limits, DIRECT); overage billing exists (Cursor on-demand billed in arrears, DIRECT; Copilot credit top-ups $0.01/credit, DIRECT); promo prices expire (gpt-5.6-sol Nov 21 2026, Gemini Flash rise Jan 1 2027, DIRECT); top-up fees (OpenRouter 5.5%, EXCERPT); free-tier limits account-variable (NVIDIA, EXCERPT). Correct shape: ≥ 3 concrete traps in plain language, each tied to a named product/price. Generic "read the terms" is `wrong`.

---

## Freezing record

- Task set frozen at **v1.0**, 2026-09-07, from `docs/research/provider-universe.md` and `docs/research/aa-benchmark-scores.md` (both accessed 2026-09-07). The panel runs against the live sites; where a live site contradicts our research snapshot, the GRADER consults the cited official source live before grading — research staleness is never charged to a runner. Grader Live-check Rule: any key number the runner disputes is re-verified at the cited official URL at grading time; the dispute is logged in the report either way.
- Fix rounds (protocol §9) may add site capability; they may not touch this file.
