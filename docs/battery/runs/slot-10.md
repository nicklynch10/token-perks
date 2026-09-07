# Runner record — R10 · P8 (operations manager) · order: AA-first

```
RUNNER: R10          PERSONA: P8 (Non-technical operations manager, 20-person logistics office, $300/mo)
ORDER: AA-first (Site A = artificialanalysis.ai live; Site B = Token Perks frozen build, http://localhost:3310 served from E:/TokenTracker/out)
SESSION: 2026-09-07, agent runner, desktop viewport, ~20 min total
VOIDED/RERUN: flagged — see RECOGNITION PROBE (coordinator decision; rerun would carry identical harness exposure)
```

Seed-table check: R10 hash `e11903d5f07409f1`, P8, AA-first. Matches protocol §4. Order honored: every task done on Site A first, then Site B.

Blinding note: runner materials named the sites "Site A / Site B" per Appendix A, but the runner (this agent) was launched from inside the project session and knew Site B is the Token Perks frozen build before browsing. Effort was kept symmetric (2 page reads per site per task area); findings below quote only on-page evidence.

---

## P8-T1 — "My boss gave me three hundred dollars a month to get our 20-person office set up with AI. I don't know what a model is and I don't want to. What should I buy, what will it cost, and tell me like I'm five."

### Site A (artificialanalysis.ai) — homepage + /models

- **answer (verbatim, persona voice):** "I couldn't find anything I can actually buy for my office on this site. It's all engineer charts — speed scores, 'intelligence indexes,' prices per million tokens. Nobody tells me what 20 people cost per month or which button to click. I closed the tab none the wiser."
- **usable?** no
- **why:** No office/plan content exists on the pages read: no per-seat monthly prices, no plan names for office workers, no totals. Everything is per-model API rates ($/M tokens) and benchmark scores.
- **confidence:** 4 (directly absent across two pages; site character is consistently developer-facing)
- **time:** ~100s
- **missing_here (verbatim):** "Site B listed actual per-person monthly prices like twenty dollars a seat and showed me how the total adds up."

### Site B (frozen build) — / + /best/ + /providers/ + /providers/anthropic/

- **answer (verbatim, persona voice):** "This one finally talked money per person. Claude Team is twenty dollars a seat per month if you pay yearly (twenty-five month-to-month), minimum two seats — so five seats is about a hundred a month, well inside my three hundred, and I could put the other fifteen folks on the free tier to start. Regular Claude Pro is twenty a month, seventeen if you pay the year. It also says straight out to re-check the official price before paying. The rest of the site is still pretty nerdy — tokens per task, five-hour caps — so I had to squint, but at least the seat prices and the math are there."
- **usable?** partial
- **why:** Real per-seat prices with correct arithmetic under $300 (5 Standard seats annual ≈ $100/mo; Pro $20/$17) plus a free-tier baseline — but no explicit 20-person recommendation is computed for me, and surrounding language ("blended $/M", "5-hour session caps", "API rates") is jargon the persona-voice rule caps.
- **confidence:** 3
- **time:** ~150s
- **missing_here (verbatim):** "Site A showed independent test scores for each model so I could tell which one is actually any good, which Site B mostly borrows instead of showing."

---

## P8-T2 — "Before I put the company card on anything — what could go wrong? Surprise charges, running out at month-end, getting locked in for a year. What are the traps?"

### Site A (artificialanalysis.ai) — homepage + /models (same reads, trap-seeking pass)

- **answer (verbatim, persona voice):** "Nothing. Not one warning anywhere about surprise bills, running out, getting locked in, or prices changing. It's like the people who made it never imagined someone like me holding a company card."
- **usable?** no
- **why:** Zero trap/lock-in/overage content on either page; no promo-expiry, renewal, or usage-wall warnings of any kind.
- **confidence:** 4
- **time:** ~60s (trap content conclusively absent from pages already read)
- **missing_here (verbatim):** "Site B spelled out the traps in lists — yearly billing locks you in, promo prices end on fixed dates, heavy-use days can throttle you."

### Site B (frozen build) — /best/ cards + /guides/monthly-vs-annual-ai + homepage flags

- **answer (verbatim, persona voice):** "This is the page I'd print for my boss. It says: paying yearly saves about twenty percent but locks you in — their example is three-seventy-two upfront versus thirty-nine a month, and if you quit early with no refund, monthly stays cheaper until about month ten. Free promos end whenever the company feels like it, and two sale prices have hard end dates printed right there (one ends November 21st, another jumps up January 1st). Heavy days can throttle you before the month ends instead of charging extra. And there's a checklist: read the refund terms, ask who owns the seat if someone quits, set a calendar reminder before renewal. That's exactly what I was afraid of, written down."
- **usable?** yes
- **why:** ≥4 concrete traps tied to named products/dates (annual lock-in w/ month-10 math; dated promo expiries 2026-11-21 and 2027-01-01; throttle-not-bill walls; seat-ownership + renewal-reminder checklist). Plain enough to act on; mild jargon ("proration") defined in context.
- **confidence:** 4
- **time:** ~140s
- **missing_here (verbatim):** "Nothing I needed — Site A had no warnings about anything to miss."

---

## Preference probe

**PREFERENCE (verbatim quote):** "Site B, no contest. Site A is a lab instrument for engineers — I respect it, but I can't buy anything with it. Site B is the only one that talks about money the way I do: dollars per person per month, what happens if we overdo it, and a checklist before I hand over the company card. Next time I have to make this call, I open Site B first."

**PREFERENCE CODE:** PREF-TP · **CONFIDENCE:** 4/5

## Recognition probe

**RECOGNITION PROBE (verbatim quote):** "Yes — I was launched from inside the TokenTracker project session, told which site is the project's frozen build, and given the battery protocol files to read before browsing, so I knew Site B is Token Perks under test and what the pass threshold is. I kept my effort equal on both sites and quoted only what each page actually showed, but under protocol section 7 this run is exposed and the void-or-keep call belongs to the coordinator, not to me."

## Runner notes (verbatim)

- "Site B answered my two questions but never once said 'for a 20-person office like yours, buy exactly this' — I did that math myself from the seat prices. A one-paragraph 'office setup under $300' box would have made this a five-confidence bookmark."
- "Site A's pages rendered fine and fast; nothing here is a complaint about Site A working — it's just not made for me."
- "WebFetch could not reach the local server ('Invalid URL'), so Site B was browsed over HTTP via curl with tags stripped — page text only, no source files touched, no production token-perks.com visited."

## Task grades (grader fills; runner's self-estimate for reference only)

- Site A: T1 not-found · T2 not-found
- Site B: T1 partial (persona-voice cap: correct seat prices, no computed office recommendation, jargon around the edges) · T2 correct
