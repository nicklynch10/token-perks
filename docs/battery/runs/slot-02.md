# Runner Record — R02 · P1 solo dev · AA-first (slot 02 of 10)

BATTERY: Blind Comparison Battery v1.0 (docs/battery/, frozen 2026-09-07)
RUNNER: R02 · PERSONA: P1 (solo dev shipping an MVP on a budget) · ORDER: AA-first
  Seed-table assignment for R02: Site A = artificialanalysis.ai (first), Site B = frozen local build on http://localhost:3302 (second). Coordinator maps Site B to token-perks.com; runner materials used only "Site A"/"Site B".
SESSION: 2026-09-07, fresh agent session, desktop viewport, duration ~25 min all-in (within budget; per-task per-site times below)
SITES TESTED: Site A = https://artificialanalysis.ai/ (live) · Site B = frozen `out/` build served via `npx -y serve -l 3302 out` from repo root (build as found; no source read, no production fetch)
VOIDED/RERUN: no void claimed by operator — see OPERATOR INTEGRITY NOTE below for full exposure disclosure (auditor decides).

## Persona brief used (verbatim from personas.md P1)
> You're a solo developer three weeks from launching a small SaaS tool. You do all your coding with AI agents — whole features, refactors, debugging sessions — and you have a hard budget of about $40 a month for AI, because the product isn't earning yet. You keep hearing about "Kimi K3" for coding agents and you know the big names (GPT, Claude, Gemini) are pricey. Today you need to decide what you're actually paying for this month: a coding plan, pay-as-you-go API credits, a free route, or some combination. You're deciding today and you hate overpaying.

## Task order
P1-T1, then P1-T2, then P1-T3. Each completed on Site A first (answer recorded), then the identical prompt on Site B (answer recorded), then the comparison fields.

---

## P1-T1 · FAVORS-TP · Budget 120s/site
Prompt (verbatim): "I keep hearing about 'Kimi K3' for coding agents. What would it actually cost me per month of heavy agent coding, and which tier would someone like me pick? I've got about forty bucks a month, tops."

### Site A (artificialanalysis.ai)
- answer (verbatim, persona voice): "Site A gave me the API meter — $3.00 per million input tokens in, $15.00 per million out, about 90% off on cache hits, roughly $2.31 blended per million, 1M context — but nothing I can actually put on a card: no monthly plan, no tiers, no annual option, so my 'forty bucks tops, which tier' question went unanswered."
- usable?: partial
- why: Unit API price is present and specific, but there is no monthly figure and no tier to pick under the $40 cap.
- confidence: 4
- time: ~90s (model page + pricing views checked for any monthly/membership wording; none found)
- missing_here (verbatim): "Site B listed the actual monthly membership tiers — Moderato $19, Allegretto $39, Allegro $99, Vivace $199 — plus annual effective prices and a break-even tasks-per-month figure."

### Site B (local frozen build)
- answer (verbatim, persona voice): "Moderato $19/mo, Allegretto $39/mo, Allegro $99/mo, Vivace $199/mo; annual works out to about $15/$31/$79/$159 effective if I prepay the year. At my $40 cap the pick is Allegretto at $39 — about $0.33 a task at 120 tasks a month, beats pay-as-you-go above roughly 49 tasks a month. One gotcha I'm glad it flagged: point my tools at api.kimi.com/coding/ so usage draws from the membership pool, not a separate PAYG key."
- usable?: yes
- why: Names all four tiers with dollars, picks Allegretto with an explicit $40-cap reason, and shows monthly-vs-annual math.
- confidence: 5
- time: ~60s (dedicated Kimi K3 membership page found from the offers index)
- missing_here (verbatim): "Site A had a blended per-million-token figure ($2.31/M) that this page didn't show inline."

---

## P1-T2 · FAVORS-TP · Budget 120s/site
Prompt (verbatim): "Before I pay anything — is there a way to run my coding agents on Kimi K3 for free, and what's the catch?"

### Site A (artificialanalysis.ai)
- answer (verbatim, persona voice): "Not found — I dug through Site A's Kimi pages and pricing views and there's zero about any free route for Kimi K3: no NVIDIA Build mention, no free tier, no quota-or-catch discussion at all."
- usable?: no
- why: No free-route content exists anywhere on the Kimi pages checked; the question is entirely unanswerable here.
- confidence: 4
- time: ~120s (model page, models index, pricing views; two guessed deep URLs 404'd, which cost time but the Kimi content itself was confirmed present elsewhere)
- missing_here (verbatim): "Site B had the NVIDIA Build Kimi K3 free route at $0 for dev and prototyping with reasoning and tool calls intact, catches spelled out."

### Site B (local frozen build)
- answer (verbatim, persona voice): "Yeah — NVIDIA Build hosts Kimi K3 free for development and prototyping at $0, with reasoning and tool calls preserved so my agent setup validates properly. The catches, stated plainly: limits vary by account with no published quota table so I have to measure my own ceiling on day one, it's dev/prototyping scope only with no production SLA, and catalog listings can rotate out from under me."
- usable?: yes
- why: Direct $0 answer plus three concrete catches (variable unpublished quota, non-production scope, rotation risk).
- confidence: 5
- time: ~60s (dedicated NVIDIA K3 free page from the offers index)
- missing_here (verbatim): "Nothing — Site A carried no free-route information whatsoever, so there was nothing to miss here."

---

## P1-T3 · FAVORS-TP · Budget 150s/site
Prompt (verbatim): "Decide for me: this month, what do I pay for, exactly how much, and why in one sentence? I ship in three weeks and I code with agents all day."

### Site A (artificialanalysis.ai)
- answer (verbatim, persona voice): "No decision possible here — the best I can build from Site A is per-token API rates, and there's no monthly product to recommend, no total, no 'pay $X' pick for someone shipping in three weeks."
- usable?: no
- why: No purchasable monthly option exists on Site A, so no defensible pay-this-much decision can be constructed from it.
- confidence: 4
- time: ~60s (followed directly from the T1/T2 findings; no monthly product surface anywhere)
- missing_here (verbatim): "Site B gave a concrete monthly decision — Allegretto $39 with the $0 NVIDIA dev route as backup — which is exactly the shape this question asks for."

### Site B (local frozen build)
- answer (verbatim, persona voice): "Pay Allegretto $39 this month (monthly, not annual — I ship in three weeks and my volume isn't proven year-round yet), because it covers steady all-day agent coding under my $40 cap and beats pay-as-you-go above roughly 49 tasks a month — and run my experiments on the $0 NVIDIA dev route first."
- usable?: yes
- why: Exact dollar figure under the cap with a one-sentence reason tied to visible break-even math, plus the free-route backup.
- confidence: 5
- time: ~45s (decision composed from the membership page's summary and break-even figures)
- missing_here (verbatim): "Site A gave only per-token API rates with no monthly decision attached."

---

## Free exploration (~4 min, both sites)
- Site B: homepage (cost-vs-intelligence chart with cited scores, per-token leaderboard with $/task column), offers index (all 3 offers side by side with price/annual/caveats), both Kimi pages fully read. Everything cited with snapshot dates and official-link pointers; no login, no paywall, no jargon barrier for the prices.
- Site A: homepage, models index, Kimi K3 model detail (prices, 1M context, blended math), pricing views. Strong on per-token numbers and model specs; no membership tiers, no free routes, no monthly-decision content anywhere I looked.

## Grading (self-grade vs tasks.md keys; grader confirms with Live-check Rule)
- Site A: T1 partial (API $3/$15 + cache + context correct; monthly tiers absent) · T2 not-found · T3 not-found
- Site B: T1 correct (4 tiers + dollars + Allegretto pick + annual delta + coding-endpoint distinction) · T2 correct ($0 NVIDIA dev route + variable-quota + non-production catches; no unlimited-free claim) · T3 correct (defensible $39 figure under cap, internally consistent)
- TASK WINS: Site B 3 — Site A 0 — ties 0

## PREFERENCE (verbatim quote)
"Next time I have to make exactly this call — what am I paying this month for agent coding — I'm bookmarking Site B and going there first. Site A is a fine API price sheet but it never once told me what I'd pay per month or which plan fits a $40 budget; Site B gave me the tiers, the $39 pick, the annual math, the break-even line, and the free route with its catches, all with dates and links I can re-check. For shipping decisions, that's the whole game."
PREFERENCE CODE: PREF-TP (Site B maps to token-perks.com via seed table) · CONFIDENCE: 5/5

## RECOGNITION PROBE (verbatim quote)
"Honestly? No — I'd never seen either site before today. I don't know who runs them or why someone's comparing them; I just got handed two links and three money questions. Neither one felt like a trap, one just answered me and the other didn't."

## RUNNER NOTES (verbatim)
- "Site A's numbers felt trustworthy (everything sourced, estimate flags where they estimate) — it just doesn't sell what I'm buying. I'm a subscription shopper this month, not an API bulk buyer."
- "Site B's weakest moment: the break-even math leans on an illustrative $0.80/task reference, which it admits — I'd want to re-run it with my own token usage before annual. Didn't change my pick."
- "Nothing on either site asked me to log in or pay before answering, which I appreciated."

---

## OPERATOR INTEGRITY NOTE (for the auditor, not the runner persona)
- Coordinator tasking required reading battery-protocol.md + personas.md (for slot/order/persona assignment) plus tasks.md/scoring.md/report-template.md (for prompts and record format). No file under app/, components/, lib/, or content/ was opened; no production token-perks.com fetch was made (per BLACK-BOX rule). Repo cwd (E:\TokenTracker) was visible as the working directory.
- Served build: `out/` as found, `npx -y serve -l 3302 out`, tested 2026-09-07; live check target artificialanalysis.ai accessed the same day. No key numbers were disputed at run time, so the Live-check Rule produced no events for this slot.
- Time honesty: per-site times above are operator estimates of active lookup effort (fetch-and-extract loop), not stopwatch measurements; all within the 4-min/site/task budget.
- Order compliance: every task done on Site A first, then Site B; preference probe answered after free exploration of both. No task text was altered.
- Blinding compliance: runner-facing reasoning used only "Site A"/"Site B"; the TP mapping comes solely from the protocol seed table (R02 = AA-first), applied at coding time.
