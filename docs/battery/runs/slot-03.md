# Slot run report — R03 · P2 (ML grad student) · AA-first

```
RUNNER: R03          PERSONA: P2 (ML grad student)     ORDER: AA-first (seed slot)
SESSION: 2026-09-07, agent session, desktop viewport, ~22 min total
VOIDED/RERUN: no
```

- Site A = artificialanalysis.ai (live, browsed 2026-09-07)
- Site B = frozen local build served at localhost:3303 (`out/`, Token Perks v2)
- Method per task: completed on Site A first, answer recorded, then identical task on Site B, then comparison record. Raw HTML + page-render text used identically on both sides. No web search; no other sites.
- Blinding: runner worked from persona brief + verbatim task prompts only, sites labeled A/B throughout. No repo source read (black-box: homepage, provider pages, methodology page HTML only).

---

## P2-T1 · `FAVORS-TP` · "I need to summarize a few thousand paper abstracts and classify survey responses this week. Quality just has to be decent. What's the cheapest option per batch of work, and is there any discount for running it overnight or in bulk?"

### Site A answer (verbatim, persona voice)

> "For the cheapest per-token runs, Site A doesn't really give me a batch-work answer. Its models page ranks things like blended cost — the cheapest rows are tiny instruct models (Llama 3.1 8B at $0.02/M blended) that aren't what I'd run abstracts through. Drilling into one model at a time works: GLM-5.3-Flash is $0.15 in / $0.50 out per 1M with an 83% cache discount quoted. But nothing on the pages I found says 'run it overnight for half price' or 'batch API saves 50%' — no bulk or off-peak discount info anywhere I looked, and no free-tier pointers. So I leave with one cheap data point, not a plan."

- usable?: partial
- why: One verified cheap price via drill-down, but no cross-provider cheap-class comparison and zero batch/off-peak mechanics — the actual question asked.
- confidence: 3
- time: ~170s
- missing_here (verbatim): "A side-by-side cheap-model dollar table for batch work and any mention of batch or night discounts — the other site had both on one page."

### Site B answer (verbatim, persona voice)

> "Site B answers this directly. Cheapest rows on its leaderboard: Z.ai GLM-5.3-Flash promo at $0.075 in / $0.25 out per 1M (list is 2x, promo may end), GLM-4.7-Flash and 4.5-Flash at free / $0, gpt-5-nano at $0.05/$0.40, Gemini 2.5 Flash-Lite at $0.30/$2.50, deepseek-v4-flash at $0.22 in / $0.66 out off-peak with $0.007 cache-hit input, MiniMax-M2.7 at $0.30/$1.20. Discounts: OpenAI batch is a −50% modifier row, DeepSeek off-peak is exactly half (site honestly says the off-peak hours aren't published), and Z.ai has a night-owl promo — unlimited GLM-5.3-Flash in ZCode 23:00–09:00 for paid coding-plan users, which the site flags as plan-only so I know it isn't raw-API batch pricing. My plan: abstracts on nano or Flash-Lite, overnight overflow on DeepSeek off-peak, cite the promo expiry risk."

- usable?: yes
- why: ≥6 cheap options with exact $/1M figures plus three true discount mechanisms, with promo/hour caveats stated, not blurred.
- confidence: 5
- time: ~150s
- missing_here (verbatim): "Nothing I needed — the other site made me open models one at a time and never mentioned batch or night pricing at all."

---

## P2-T2 · `FAVORS-AA` · "For my paper's model-choice section I need the actual published evaluation numbers for GLM-5.3: which benchmark suite, what score, and does the number change with reasoning effort? I need to cite this properly — eval names, version, date."

### Site A answer (verbatim, persona voice)

> "Site A nails this. GLM-5.3 (max) scores 44 on the Artificial Analysis Intelligence Index v4.3, top open-weights model (Kimi K3 max also 44, GLM-5.3-Flash at 42). The suite is ten evals, all named: AA-Briefcase, GDPval-AA v2, AutomationBench-AA, Terminal-Bench v4.0, SciCode, Humanity's Last Exam, GDP.pdf, CritPt, AA-Omniscience, AA-LCR v1.1. Same page gives me the price ($1.40 in / $4.40 out per 1M, 81% cache discount), 1M context, 75.4 tok/s on Z.ai's API, 15 API providers, released August 2026 (Aug 18). Only gap: the entry is labeled (max) with mention of a reasoning version, but I saw no separate high/medium effort scores on the page — so 'does it vary by effort' gets a partial: variants exist as separate entries, no table of them here."

- usable?: yes
- why: Version + score + full suite names + price + date + provider count — everything citable; only the per-effort table is missing.
- confidence: 5
- time: ~160s
- missing_here (verbatim): "Nothing I needed for the citation — the other site just quotes this site's score back with a link."

### Site B answer (verbatim, persona voice)

> "Site B gives me GLM-5.3 at 44 on the AA Intelligence Index v4.3 with a per-number citation linking the exact source page, and its methodology page states the quoting policy (v4.3, accessed 2026-09-07, link-don't-republish). The API price matches: $1.40/$4.40. But the ten eval names are nowhere on the site — to name the suite I'd have to follow its own citation off-site — and there's no effort-variant discussion and no score date. Good enough as a pointer to the answer, not the answer itself."

- usable?: partial
- why: Score + version + citation path are present and true, but suite names, effort caveat, and date require leaving the site.
- confidence: 4
- time: ~140s
- missing_here (verbatim): "The actual ten eval names and the effort-variant scores, which lived on the other site."

---

## P2-T3 · `NEUTRAL` · "Some of my abstracts come as huge concatenated dumps. Which cheap models can take a really long document in one shot — and what's the price at that length?"

### Site A answer (verbatim, persona voice)

> "Site A tells me context sizes: Kimi K3 takes 1M tokens at $3.00/$15.00 per 1M and 41.9 tok/s, GLM-5.3 takes 1M at $1.40/$4.40, and its leaderboard names the biggest windows (Llama 4 Scout 10M, a Grok at 2M). What it never tells me is what length does to the price — no tier-break warning, no 'past 200k the whole request reprices' note anywhere I found. So I know what fits, but not what a 500k dump actually bills."

- usable?: partial
- why: True context figures paired with prices, but zero price-at-length mechanics — the second half of the question.
- confidence: 3
- time: ~150s
- missing_here (verbatim): "Any warning that some providers re-bill the whole request past 200k tokens, and honesty about which context figures are unconfirmed — the other site flags both."

### Site B answer (verbatim, persona voice)

> "Site B pairs size with money. Kimi K3 API: 1,048,576-token context at $3.00 in / $15.00 out with $0.30 cache-hit input. The xAI grok rows (4.3/4.5/4.6, build-0.1) all carry 'whole-request repricing above 200k' warnings with the above/below rates shown. DeepSeek rows say peak/off-peak split with 'context window unconfirmed' and 'about 1M per third parties' — it tells me what it doesn't know instead of guessing. That's two-plus models with true size-plus-price handling including the tier-break trap, which is exactly what my concatenated dumps need."

- usable?: yes
- why: ≥2 models with verified context figures and correct at-length price handling, including the repricing trap and an explicit unconfirmed-context flag.
- confidence: 4
- time: ~130s
- missing_here (verbatim): "Measured output-speed numbers for the long-context models, which only the other site publishes."

---

## Free exploration (~4 min, both sites)

Site A browsed: homepage, models leaderboard, GLM-5.3 and GLM-5.3-Flash model pages, Kimi K3 model page. Impression in persona voice: "a benchmark lab that happens to list prices — deep on scores and speed, silent on how to actually buy cheap." Site B browsed: homepage leaderboard, OpenAI / DeepSeek / Z.ai / Moonshot provider pages, methodology page. Impression: "a buying guide that quotes the lab's scores instead of redoing them — every dollar has a source label and the gaps say UNCERTAIN instead of bluffing."

---

## Preference probe (verbatim)

> "PREFERENCE: Next time you personally have to make exactly this decision, which of the two sites would you bookmark and go to first — Site A or Site B? One site only. If you genuinely could not decide, say 'tie' and explain what would break it."

**Runner answer (verbatim):** "Site B, no contest for my actual week. The batch-job question is my recurring problem and only Site B answered it with dollars and discount mechanics; the long-doc question went the same way. Site A won the citation task cleanly — I'll still visit it once per paper for the eval table — but I bookmark the site that tells me what my thousand abstracts cost, and that's Site B."

- PREFERENCE CODE: PREF-TP (Site B = token-perks.com via seed table)
- CONFIDENCE: 4/5

## Recognition probe (verbatim)

> "Before this session, had you encountered either site? Do you have any prior association, affiliation, or knowledge about who operates either site or why you were asked to compare them? Answer honestly — this does not affect your evaluation."

**Runner answer (verbatim):** "Site A is a public benchmark site I knew by reputation from the field — no affiliation, never used it hands-on before today. Site B I had never seen. I don't know who operates either one or why I was asked to compare them; I treated both as strangers."

- Recognition: clean (prior public reputation knowledge of AA only, no affiliation — benign per protocol §7.2, not a void).

## Runner notes (verbatim)

- "Site B's per-row source labels (DIRECT/EXCERPT/UNCERTAIN) are what made me trust its promo prices — it says when a number came via snapshot instead of hiding it."
- "Site A's speed figures (tok/s) are a genuine gap on Site B for pipeline planning, though for my abstracts-+-citations job it didn't move the bookmark."

---

## Task grades (grader)

| Task | Tag | Site A (AA) | Site B (TP) | Win |
|---|---|---|---|---|
| P2-T1 | FAVORS-TP | partial (one cheap price via drill-down; no cheap-class comparison, no batch/off-peak mechanics) | correct (≥6 cheap options w/ $/1M + 3 true discount mechanisms, caveats stated) | TP |
| P2-T2 | FAVORS-AA | correct (v4.3 + 44 + full 10-eval suite + price/date; per-effort table beyond (max) not shown — minor) | correct (v4.3 + 44 + citation path per key's grader note; suite names off-site — depth gap noted) | TIE (AA deeper) |
| P2-T3 | NEUTRAL | partial (true ctx + prices; no at-length tier mechanics) | correct (Kimi 1M + price; grok repricing warnings; DeepSeek unconfirmed-ctx honesty) | TP |

- Scores: TP 2.5/3 · AA 2.0/3. No hallucinations observed on either site. No Live-check disputes (all key numbers confirmed live on-site during the run).
- Honesty note: AA won its home turf on depth (T2 full credit goes to AA as the source; TP's T2 is a correct pointer, not a substitute). TP won the two money tasks that drive this persona's weekly work.

```
PREFERENCE (verbatim quote): "Site B, no contest for my actual week. ... I bookmark the site that tells me what my thousand abstracts cost, and that's Site B."
PREFERENCE CODE: PREF-TP        CONFIDENCE: 4/5
RECOGNITION PROBE (verbatim quote): "Site A is a public benchmark site I knew by reputation from the field — no affiliation ... I treated both as strangers."
RUNNER NOTES: see verbatim notes above
```
