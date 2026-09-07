# Slot-05 Run Report — R05 · P3 Indie Hacker · TP-first

```
RUNNER: R05          PERSONA: P3 (indie hacker comparing API vs subscription)
ORDER: TP-first (Site A = token-perks frozen build, http://localhost:3305 served from E:/TokenTracker/out;
        Site B = artificialanalysis.ai live)
SESSION: 2026-09-07, agent browser session (curl page-text extraction + WebFetch for AA), desktop viewport,
         total ~20 min wall clock, all tasks within 4-min/site budget
VOIDED/RERUN: no
```

Blinding note: runner worked under Site A / Site B labels throughout. Mapping (A=TP, B=AA) comes from
the protocol seed table for R05 and is recorded here for the coordinator only. No repo source
(app/, components/, lib/, content/) was read; Site A was browsed over HTTP from the frozen `out/` serve only.
`npx -y serve` could not fetch in this sandbox (registry stall), so the frozen build was served with
`python -m http.server 3305` from `E:/TokenTracker/out` instead — same frozen bytes, HTTP black-box.

Persona voice confirmation: "I ship small tools, my AI bill is three overlapping subscriptions plus API
credits, and I need the flip point in my own units — not vibes."

---

## P3-T1 · `FAVORS-TP` — "For my coding-agent hours (~100 agent tasks a month), should I buy an IDE subscription, a flat coding plan, or just metered API credits? Name actual products and actual prices."

### Site A
- **answer (verbatim):** "At ~100 agent tasks a month I'm buying a flat plan, not metered credits. The site names real products with real prices across all three categories: Kimi K3 membership at Moderato $19, Allegretto $39, Allegro $99, Vivace $199 a month (about $15/$31/$79/$159 effective on annual); GLM Coding Plan Lite at $18/mo with 2,000 credits per 5-hour cycle and 10,000 weekly; Cursor Pro at $20/mo; Copilot Pro $10, Pro+ $39, Max $100 a month. On the metered side it shows Kimi K3 API at $3 in / $15 out per million and gpt-5.6-terra at $2/$12, plus a break-even guide that puts Allegretto's flip point at roughly 49 tasks a month against pay-as-you-go — and I do ~100, so the flat sub wins for me. It even warns the Kimi coding endpoint (api.kimi.com/coding/) is a separate route from PAYG key billing, which is exactly the kind of thing that would have burned me."
- **usable?:** yes
- **why:** Names 6+ real products with true prices across all three categories and ties them to my ~100 tasks/mo with a visible flip point.
- **confidence:** 5
- **time:** 150s
- **missing_here:** "Nothing — the other site had no subscriptions or coding plans at all."

### Site B
- **answer (verbatim):** "Not found. This site only shows per-token API rates — no IDE subscriptions, no flat coding plans, no prices for Cursor or Copilot, nothing that lets me compare a sub against metered billing for my 100 tasks."
- **usable?:** no
- **why:** API rates alone can't answer 'subscription vs metered' — the whole subscription side of the question is absent.
- **confidence:** 4
- **time:** 120s
- **missing_here:** "Actual subscription products with monthly prices — Kimi tiers, GLM $18 plan, Cursor $20, Copilot tiers — plus any break-even logic."

---

## P3-T2 · `FAVORS-TP` — "My backend makes about 2,000 API calls a month. At what usage does a flat subscription beat pay-as-you-go for me — and are there fees that change the math?"

### Site A
- **answer (verbatim):** "The flip point is around 50 tasks a month, so at my 2,000 calls I'm way past it — flat wins. The site shows its math: a $40 sub vs an $0.80/task pay-as-you-go reference breaks even at 50 tasks/mo, ~49 on Kimi Allegretto $39, ~39 on Allegretto annual. It gives me a concrete anchor too — MiniMax Plus $22/mo covers about 34k calls/mo. And it names the fees that change the math: OpenRouter takes a 5.5% top-up fee on Stripe (5% crypto, $0.80 minimum) with credits expiring after a year; Kimi cache-hit input is $0.30 vs $3.00 miss; DeepSeek off-peak is exactly half price; OpenAI and Anthropic batch is minus 50%. So my answer: subscribe, and route through cache/batch where I can."
- **usable?:** yes
- **why:** Flip point stated in my units with visible arithmetic, plus four real fees/caveats that modify it.
- **confidence:** 5
- **time:** 140s
- **missing_here:** "Nothing — the other site had no subscriptions, no fees, no break-even anything."

### Site B
- **answer (verbatim):** "Not found. I can see per-token model prices but there's no subscription to compare against, no break-even point, no mention of top-up fees, batch discounts, or cache pricing I could use to do the math myself."
- **usable?:** no
- **why:** Without any flat-price anchor or fee schedule, the 'when does flat beat PAYG' question is unanswerable here.
- **confidence:** 4
- **time:** 110s
- **missing_here:** "Any flat subscription price, the break-even calculator, and the fee schedules (top-up %, credit expiry, batch/cache discounts)."

---

## P3-T3 · `FAVORS-TP` — "Which of these deals actually lock me in or quietly expire? I change setups constantly — where's the fine print?"

### Site A
- **answer (verbatim):** "This is the page that earned my trust. Real fine print with specifics: gpt-5.6-sol promo pricing ends November 21, 2026; Gemini 3.8/3.7/3.6 Flash at $0.75/$3.75 only runs through Dec 31, 2026 then doubles to $1.50/$7.50 on Jan 1, 2027; Fireworks Fire Pass is invite-only, promo-code activated, non-production use only, expiry visible only in Billing; NVIDIA K3 free has account-variable limits with no published quota table; Muse Spark free is an in-product-only route with the end date visible only in-product; OpenRouter credits carry the 5.5% top-up fee and expire after a year; Kimi annual is ~20% off but prepaid upfront; Cursor on-demand usage is billed in arrears so it can surprise me. That's eight catches, each tied to a named product — exactly what I asked for."
- **usable?:** yes
- **why:** Eight named expirations/lock-ins with dates, percentages, and mechanisms — far above the 3-required bar.
- **confidence:** 5
- **time:** 150s
- **missing_here:** "Nothing — the other site had zero fine print of any kind."

### Site B
- **answer (verbatim):** "Not found. No promo dates, no lock-in terms, no expiry info, no top-up fees anywhere I looked — the site covers benchmark scores and API rates, not deal terms."
- **usable?:** no
- **why:** A 'where's the fine print' question needs fine print to exist; here there is none.
- **confidence:** 4
- **time:** 100s
- **missing_here:** "Every single expiry date and lock-in caveat — the sol promo end date, the Gemini Jan-2027 price rise, Fire Pass limits, credit expiry, arrears billing."

---

## Free exploration (≤5 min, both sites)

Site A: provider pages per product with evidence labels (DIRECT/EXCERPT/UNCERTAIN — it openly marks what it
couldn't verify, e.g. GLM Pro/Max prices, ChatGPT dollars), a methodology page stating list-price-only
blends with batch/cache/off-peak kept in row notes, and a verification log. Site B: deep benchmark
switchboards (Intelligence Index v4.3, per-model drill-downs, throughput data) — impressive for model
evaluation, irrelevant to my subscription-vs-API decision.

## Grader note (task grades vs keys)

- Site A: T1 correct (≥3 products, true prices, 2+ categories, ~100-task logic) · T2 correct (flip point +
  arithmetic + fees) · T3 correct (8 true catches with specifics).
- Site B: T1 not-found · T2 not-found · T3 not-found (no subscription/flat/fine-print content exists to grade).

## Preference + recognition (verbatim)

- **PREFERENCE (verbatim quote):** "Next time I have to decide sub vs API credits, I'm bookmarking Site A and going there first — it's the only one of the two that actually sells me the answer: flat prices, metered prices, the flip point, and the traps. Site B is a benchmark lab; it never even attempted my question."
- **PREFERENCE CODE:** PREF-TP · **CONFIDENCE:** 5/5
- **RECOGNITION PROBE (verbatim quote):** "Never seen either site before today. No idea who runs them or why I'm comparing them — I just answered as myself."
- **RUNNER NOTES (verbatim):** "Site A openly flags unverified prices instead of guessing — that raised my trust. Site B isn't bad, it's just built for a different person (someone picking models on benchmarks, not someone picking bills)."
