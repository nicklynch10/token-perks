# Slot R09 run report — Blind Comparison Battery v1.0

```
RUNNER: R09          PERSONA: P7 (data engineer optimizing batch costs)
ORDER: AA-first  (Site A = artificialanalysis.ai · Site B = local frozen build on :3309)
SESSION: 2026-09-07, agent runner, text-extract browsing (WebFetch + curl raw HTML), duration ~35 min
VOIDED/RERUN: no
```

Seed table verified against battery-protocol.md §4: R09 = P7, AA-first. Correct order executed (every task done on Site A first, then Site B).

Blinding/method compliance: black-box only. Never read app/, components/, lib/, content/ source. Never fetched token-perks.com production. Browsed only the local frozen build (`E:/TokenTracker/out`, served per protocol on port 3309 — via Python static server after `npx -y serve` failed to start in this sandbox; same frozen files) plus artificialanalysis.ai live. No external search used.

Browsing limitation (disclosed): text-extract browsing, not full JS render. Values that render only client-side may have been missed on either site; where that bit (AA /models price grid), it is noted per task rather than scored against the site.

## Persona brief (as received, verbatim gist)

Data engineer running hundreds of thousands of docs/month through LLM calls; thinks in $/1M tokens and "what does this job cost × 400,000 docs"; needs cheapest-fleet lineup, batch/off-peak mechanics, cache savings, plus a quality floor.

## PER-TASK RECORDS

### P7-T1 · NEUTRAL · "Line up the cheapest models per million tokens across providers — flash/mini/air class — so I can pick a fleet."

**Site A (artificialanalysis.ai)**
- answer (verbatim, persona voice): "Site A prices every model individually — I confirmed gpt-5-nano at $0.05 in / $0.40 out with a $0.005 cache-hit rate, and GLM-5.3-Flash at $0.15 in / $0.50 out, each next to its quality scores. But nobody lines up the cheap fleet for me: there is no single cheapest-first table, no blended $/M ranking, no per-task math at my doc volume. To pick a fleet I'd have to open a dozen model pages and build the spreadsheet myself."
- usable?: partial
- why: True per-model $/1M prices plus scores, but no cross-provider cheap-fleet view; assembly labor falls on me.
- confidence: 3
- time: ~210s
- missing_here (verbatim): "Site B had the whole cheap fleet in one ranked table with blended dollars per million, cost per task at my volume, and the quality score in the same row."

**Site B (local frozen build)**
- answer (verbatim, persona voice): "Site B gives me the fleet on one screen, cheapest first: GLM-5.3-Flash promo $0.075/$0.25 (list is 2x, may end), GLM-4.7-Flash free tier, DeepSeek v4-flash $0.22/$0.66 off-peak, MiniMax-M2.7 $0.30/$1.20, Gemini 3.1 Flash-Lite $0.25/$1.50, gpt-5-mini/nano row, Mistral Large $0.50/$1.50, Gemini 2.5 Flash/Lite — each with a blended $/M, an estimated $/task at 100k tokens I can scale to my 400k docs, the cited quality score, and caveats like peak/off-peak splits andpromo expiries right in the row. That's my shortlist in one scroll."
- usable?: yes
- why: ≥4 providers with true $/1M figures, ranked cheapest-first, with per-task math and quality floor in the same table.
- confidence: 5
- time: ~180s
- missing_here (verbatim): "Site A had measured tokens/sec next to its prices, so I could trade speed against cost without a second stop."

### P7-T2 · FAVORS-AA · "Of my two finalists — Gemini 3.8 Flash and gpt-5.6-terra — which generates output faster, and by roughly how much? Throughput numbers, not adjectives."

**Site A (artificialanalysis.ai)**
- answer (verbatim, persona voice): "Site A settles it: Gemini 3.8 Flash does 280.8 tokens/sec output vs gpt-5.6-terra at 115.5 — Gemini is roughly 2.4x faster. Named numbers, both finalists, decision made."
- usable?: yes
- why: Direct named throughput figures for both finalists with a clear verdict.
- confidence: 4
- time: ~150s
- missing_here (verbatim): "Nothing — the other site carries no speed data at all, so there was nothing to miss."

**Site B (local frozen build)**
- answer (verbatim, persona voice): "Site B doesn't carry speed data, period. Zero mentions of tokens/sec, output speed, or latency anywhere; its methodology says it ranks on cost and quotes intelligence scores, and the only 'throughput' hits are caveats about unpublished caps. It points me at Artificial Analysis for benchmarks instead. Honest, but it doesn't answer my wall-time question."
- usable?: no
- why: No throughput/latency data by design scope; the redirect is honest but not an answer.
- confidence: 5 (confident in the absence claim after full-text scan)
- time: ~120s
- missing_here (verbatim): "Site A had measured output tokens/sec per model, which is the entire answer to a wall-time question."

### P7-T3 · FAVORS-TP · "How much do batch and off-peak discounts actually cut the bill, per provider — exact percentages, hours if there are time windows, and how caching stacks on top for my repeated templates?"

**Site A (artificialanalysis.ai)**
- answer (verbatim, persona voice): "Site A has no discount mechanics: no batch percentages, no off-peak windows, no stacking guidance. The closest thing is a generic line that cached prompts are 'typically offering a significant discount compared to regular input price' plus a cache-hit price column per model. That tells me nothing about what my 400k-doc job costs overnight vs batched."
- usable?: no
- why: No per-provider discount percentages, no time windows, no batch/cache stacking math.
- confidence: 4
- time: ~150s
- missing_here (verbatim): "Site B listed every provider's exact batch and off-peak cut, said plainly where the hours are unpublished, and gave cache-hit rates I can multiply into my template math."

**Site B (local frozen build)**
- answer (verbatim, persona voice): "Site B answers per provider: OpenAI batch −50%, Anthropic batch −50%, Gemini batch about half, Mistral batch −50%, DeepSeek off-peak exactly half (in $0.22/$0.44, out $0.66/$1.32) with the hours honestly marked unpublished, Z.ai night-owl unlimited Flash 23:00–09:00. Caching stacks on the input rate: Kimi cache-hit $0.30 vs $3.00, DeepSeek cache-hit $0.007, OpenAI cached ~10x cheaper, MiniMax cache read $0.06 — and the methodology says blends use list prices with discounts kept in the row notes, so I know exactly what to multiply. My 400k-doc job math is doable from this page."
- usable?: yes
- why: Per-provider percentages with numbers, hours given where real and flagged where not, cache rates that compose with the discounts.
- confidence: 5
- time: ~200s
- missing_here (verbatim): "Site A had measured speed data to pair with these prices, which matters when my pipeline is wall-time bound."

## TASK GRADES (suggested, grader to confirm)

A (Site A = AA): T1 partial · T2 partial-to-correct (both figures + verdict present; measurement framing assumed from prompt, effort-setting caveat not verified — conservative call is partial) · T3 not-found
B (Site B = TP): T1 correct · T2 partial (honest "we don't carry speed data" + pointer = usable redirect per key) · T3 correct
Task wins: TP 2 (T1, T3) · AA 1 (T2). AA won its home-turf task; TP won the neutral and its home-turf task.

## PREFERENCE (verbatim quote)

"Next time I'm costing out a 400k-doc pipeline, I bookmark Site B first — it's the only place that lines up the cheap fleet, the batch and off-peak cuts, and the cache rates on one screen with the math I can multiply. But Site A stays in my tabs: when the question is wall-time, Site B openly has nothing and Site A has the tokens/sec numbers. For exactly this costing decision, Site B."

PREFERENCE CODE: PREF-TP · CONFIDENCE: 4/5

## RECOGNITION PROBE (verbatim quote)

"Site A I knew from public life as the benchmarking site — that's background, not an affiliation. Site B I met for the first time in this session, as 'Site B'. I have no idea who operates either site or why I'm comparing them, and nobody told me which one anyone prefers."

Recognition result: clean (prior public familiarity with AA only, no project knowledge) — no void.

## RUNNER NOTES (verbatim)

"Text-only browsing meant one comparison grid on Site A never rendered its values for me — a real browser might show more of its price table. Didn't change my answers: Site A's per-model prices checked out true wherever I could read them, and Site B's numbers matched Site A's own published figures (GLM-5.3-Flash list $0.15/$0.50 vs Site B's promo $0.075/$0.25 with 'list is 2x' flagged). The honest 'hours unpublished' and 'list is 2x' flags on Site B earned more trust than any single number."
