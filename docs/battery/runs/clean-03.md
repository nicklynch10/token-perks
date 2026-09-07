# Clean battery run — R03 (P2 ML-student, AA-first)

Seed: R03 = P2, AA-first → Site A = https://artificialanalysis.ai, Site B = https://token-perks.com
Recognition: Site A yes (seen in training data); Site B no (never seen).
Report received inline 2026-09-07. Verbatim runner text below.

---

## SITE A — Task 1: cheapest for big batch summarization

Cheapest option found: $0.00 models — Devstral 2 ($0.00) and North Mini Code ($0.00) listed as cheapest, followed by Gemma 3 4B / 27B. On cost-per-task view: Granite 4.2 3B and gpt-oss-20b (high) at $0.01/task were lowest, followed by Nemotron 3 Nano and MiMo-V2.5 at $0.02/task. FAQ also calls Llama 3.1 Instruct 8B most affordable at $0.02 per 1M tokens (blended), Granite 4.2 3B ($0.02), Nova Micro ($0.03).

Price numbers: mostly per-task or blended-per-M without input/output split in the excerpts I could pull. Example full split only on a single model page: GLM-5.3 at In $1.40 / Out $4.40, Cache Discount 81%, $1.81 per Intelligence Index task.

Batch/off-peak discount + blended math: **not explained clearly**. No batch or off-peak heading found. Only cache pricing is called out — "Price per token for cached prompts (previously processed), typically offering a significant discount" plus a note that cache-write and storage are billed apart and differ by vendor. "Blended" appears as a unit — "USD per 1M tokens (blended)" — with no definition in anything I opened.

Persona note: as someone running hundreds of docs out of pocket, this drove me nuts — Pareto charts everywhere shouting "most attractive quadrant" but I had to hunt model-by-model for input vs output, and still no answer on "do I get 50% off if I batch overnight?"

## SITE A — Task 2: GLM-5.3 benchmarks, citable?

Numbers found: page for GLM-5.3 (max), maker listed as Z AI, launch August 18, 2026, open-weights, Large >150B. Headline gauges: Intelligence Index 44, rank #1 / 112; 75.4 output tok/s (#26); $1.81 per task (#25); 210M output tokens from Index; $2,372.92 total to run the suite. No per-subtest scores in the excerpt — just the suite label: Intelligence Index v4.3 incorporates 10 evaluations: AA-Briefcase, GDPval-AA v2, AutomationBench-AA, Terminal-Bench v4.0, SciCode, Humanity's Last Exam, GDP.pdf, CritPt, AA-Omniscience, AA-LCR v1.1.

Citable? **Yes, as primary.** Methodology page gives version (v4.3), weighting (weighted mean 30% autonomous / 20% coding / 20% science / 30% broad, with sub-splits), run conditions (identical prompts, zero-shot, first-attempt pooled, temp 0 for plain / 0.6 for reasoning, ~16k ceiling for plain, up to 30 retries with manual review), and sources (Hugging Face datasets, GitHub repos, arXiv papers, vendor/community leaderboards). Weakness for a thesis: no access date / run date for the 44 shown in the excerpt, only release date and "Updated" tag.

## SITE A — Task 2: GLM-5.3 benchmarks, citable? (continued)

Citable? **Yes, as primary** (see above).

## SITE A — Task 3: cheapest capable route for 100k+ context

Option: from the leaderboard excerpt, Granite 4.2 3B (131k) at $0.01/task or gpt-oss-20b (high) (131k) at $0.01/task; if you want true 1M headroom, Nemotron 3 Nano (1M) or MiMo-V2.5 (1M) at $0.02/task. GLM-5.3 itself is 1M ("~1500 A4 pages") but pricey at $1.40 in / $4.40 out.

Price / context facts given: context figures appear as a second column next to cost-per-task (e.g. Command A+ 192k $0.00, Gemma 4 31B 256k $0.00, Llama 4 Maverick 1M $0.04). No dedicated context filter or "cheapest for 100k+" view found, no max-output or provider comparison in the excerpt, and cheapest $0.00 rows gave me no input/output split to do my own blended math.

---

## SITE B — Task 1: cheapest for big batch summarization

Cheapest option found: paid — Z.ai GLM-5.3-Flash at $0.119/M blended, note "Promo may end; list is 2x"; then Z.ai GLM-4.7-FlashX / Flash / 4.5-Flash at $0.153/M blended; then DeepSeek v4-flash at $0.330/M blended with peak vs off-peak hours. Free paths tie at $0.00/task: Zen Muse Spark 1.3 free promo ($0 in/cache/out during promo, "ends anytime") and NVIDIA Build Kimi K3 free (dev/prototyping within account limits).

Price numbers + blended math: explicit formula everywhere: blended $/M = (3 x input + 1 x output) / 4 at list price. Example: flagship GLM-5.3 $1.40 in / $4.40 out = Blended $2.15/M. Leaderboard also shows projected task price at 100k tokens and a 100-task illustrative expense plus break-even calculator (tasks/mo, tokens/task, seats).

Batch/off-peak clarity: **yes, clearly.** Full inventory spells out: OpenAI Batch -50%, Fast mode ~2x; DeepSeek v4-flash/pro peak vs half-price off-peak plus cheaper cache-hit input; Google Flash batch/flex near half, priority ~1.8x; Mistral Large "Batch work reduces price by 50%"; xAI Grok whole-request repricing above 200k; Gemini Pro surcharge over 200k. All figures labeled "Verified Sep 6 2026", point-in-time not live checkout.

Persona note: this is what I wanted — fractions of a cent ranked, math shown, promo vs list flagged so I don't budget $0.12 and get billed $0.24 when the promo dies.

## SITE B — Task 2: GLM-5.3 benchmarks, citable?

Numbers found: GLM-5.3 plotted at 44 on "Cost vs intelligence frontier" (27 routes with both price and cited score, 6 on frontier; neighbors like Claude Fable 5.1 at 53, Opus 5 at 51, GPT-5.6 Sol at 47, Qwen3.8 Max at 45). Flagship pricing row: $1.40 in / $4.40 out, DIRECT from docs pricing page, snapshot 2026-09-07, windows unpublished.

Citable? **No as a source — yes as a finding aid.** Site explicitly does not test; smarts figures are cited from Artificial Analysis Intelligence Index v4.3, accessed 2026-09-07, with a per-row link to the exact source row. Methodology requires the exact template "AA Intelligence Index v4.3 — Source: Artificial Analysis, accessed 2026-09-07", only the Overall composite, provisional marking travels with it, blocks older than 35 days get "score paused." For my thesis I'd still have to cite the original and its method docs, but at least I get access date + direct link without hunting.

## SITE B — Task 3: cheapest capable route for 100k+

Option: deepseek-v4-flash — 1M window, max output 384K, In $0.22 off-peak / $0.44 peak, Out $0.66 / $1.32, Blended $0.33/M. Warnings: peak = weekdays early UTC, off-peak half price, cache-hit input cheaper, 2,500 concurrent limit. Next: v4-pro 1M at $0.99 blended, same split, 500 concurrent.

Context facts given: scattered in price/warning details but specific — xAI 256k/500k/1M by Grok variant with whole-request repricing above 200k spelled out (e.g. grok-build-0.1 $1.00/$2.00 under 200k -> $2.00/$4.00 at/over), Kimi K3 ~1M ($3.00/$15.00 blended $6.00), K2.7/K2.6 262,144 ($0.95/$4.00), Groq console 131,072 rows, Anthropic consumer 200k / Enterprise 500k. Z.ai Flash rows are cheaper overall but explicitly "Context windows not listed on the pricing page" so they can't be confirmed for 100k+ — the site tells me that instead of letting me assume.

---

## RECOGNITION

Site A: Yes — I have seen this benchmark/leaderboard site in training data before this session.
Site B: No — I had not seen this perks/price-comparison site before this session.

## FINAL VERDICT

PREFERENCE: Site B
Confidence: high

Site B did the broke-batch-job math for me: ranked blended $/M with the (3x in + 1x out)/4 formula shown, projected 100k-task prices, and explicit batch/off-peak cuts (OpenAI -50%, DeepSeek half-price off-peak, Mistral batch -50%) plus promo-vs-list warnings, where Site A gave $0.00 teasers and Pareto charts with no batch definition and no input/output split to verify. For long docs Site B named deepseek-v4-flash 1M at $0.33 blended with hours, cache-hit note, and 200k repricing gotchas, while Site A only left me inferring from a cost-per-task + window column. Site A was better only on Task 2 as the primary tester — full v4.3 weighting, temps, retries, and dataset sources I need for methods — while Site B honestly defers with per-row links and an accessed 2026-09-07 stamp, which is exactly what I need to cite properly without misattributing the 44.

---

## Tally note (coordinator)

Clean R03 = win for Token Perks (Site B). Running tally: TP 8 — AA 0 (8 of 10 reporting).
Notable: runner explicitly praises Z.ai Flash rows withholding unconfirmed context windows ("tells me that instead of letting me assume") — honesty-as-feature landing with technical personas.
Gate math: need ≥1 of remaining 2 (R02, R09) for the 9/10 bar.
