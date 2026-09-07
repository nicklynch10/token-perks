# Slot-01 run report — R01 · P1 solo dev · TP-first

```
RUNNER: R01          PERSONA: P1 (solo dev shipping an MVP on a budget)     ORDER: TP-first (seed slot)
SESSION: 2026-09-07, agent browser/fetch session, desktop viewport, ~18 min duration
VOIDED/RERUN: YES (trigger: protocol §7.1 + §7.3 — see RECOGNITION PROBE below; rerun required with a fresh agent, same persona, same TP-first order)
SITE VERSION: frozen `out/` export served locally at http://localhost:3301 (operator instruction; production never fetched)
```

Seed order honored: every task completed on Site A first, answer recorded, then the identical prompt on Site B.

- Site A = first presented = local frozen build (standing in for token-perks.com per operator instruction)
- Site B = second presented = https://artificialanalysis.ai (live)

## Persona brief (as run)

Solo developer, three weeks from launching a small SaaS tool, all coding done with AI agents, hard budget ~$40/mo for AI. Heard about "Kimi K3" for coding agents. Deciding today: coding plan, PAYG API credits, a free route, or a combination.

## P1-T1 · `FAVORS-TP` · "I keep hearing about 'Kimi K3' for coding agents. What would it actually cost me per month of heavy agent coding, and which tier would someone like me pick? I've got about forty bucks a month, tops."

### Site A

- **answer (verbatim):** "Kimi K3 sells a monthly membership in four tiers — Moderato $19, Allegretto $39, Allegro $99, Vivace $199 a month — and Allegretto at $39 is the one that fits my $40 cap. Annual billing drops the effective cost to about $31/mo for Allegretto but you pay the year upfront, and the page says membership beats pay-as-you-go once I'm past roughly 49 heavy tasks a month. The raw API alternative is $3 per million input tokens and $15 per million output. So my monthly number is $39 on Allegretto, and I have to point my tools at the coding endpoint (api.kimi.com/coding) so usage actually draws from the membership."
- **usable?:** yes
- **why:** Names all four tiers with dollars, picks the tier tied to my $40 cap, and surfaces the monthly-vs-annual delta plus the PAYG break-even.
- **confidence:** 5
- **time:** 90s
- **missing_here:** "Site B's only edge was a side-by-side table of paid third-party endpoint prices for the same model, which doesn't answer what I pay per month."

### Site B

- **answer (verbatim):** "The model page lists Kimi K3 API at $3.00 per million input tokens and $15.00 per million output tokens with a 90% cache discount, scores it 44 on the Intelligence Index, and the providers tab lists per-endpoint prices from a dozen hosts. But there are no monthly plans, no tiers, no membership — nothing that turns heavy agent coding into a fixed monthly bill — so I can't tell what I'd actually pay per month or which tier to pick on my $40 budget."
- **usable?:** partial
- **why:** The metered rates are real and sourced, but with no plan or monthly math they don't convert to the fixed monthly figure my budget needs.
- **confidence:** 4
- **time:** 120s
- **missing_here:** "Site A named the actual monthly tiers with dollars and picked Allegretto $39 for my $40 budget."

## P1-T2 · `FAVORS-TP` · "Before I pay anything — is there a way to run my coding agents on Kimi K3 for free, and what's the catch?"

### Site A

- **answer (verbatim):** "Yes — NVIDIA Build hosts Kimi K3 free at $0 for development and prototyping within my account's limits, with reasoning and tool calls intact so my agent setup carries over when I graduate to paid. The catches are stated up front: limits vary by account, there's no published quota table so I have to measure my own ceiling in the console, and it's dev/prototyping only with no production SLA."
- **usable?:** yes
- **why:** Gives the $0 route plus the three catches that decide whether I can rely on it before launch.
- **confidence:** 4
- **time:** 60s
- **missing_here:** "Site B showed nothing free anywhere, so there was nothing on that side to miss — every free-route fact came from Site A."

### Site B

- **answer (verbatim):** "Not found — I checked the Kimi K3 model page and its providers tab and there is no free tier, no $0 provider, no trial, and no free access route mentioned anywhere for this model."
- **usable?:** no
- **why:** The question is exclusively about a free route and this site carries none, so there is no decision to make here.
- **confidence:** 4
- **time:** 150s
- **missing_here:** "Site A had the NVIDIA Build $0 dev route with its exact catches — account-variable limits, no quota table, non-production only."

## P1-T3 · `FAVORS-TP` · "Decide for me: this month, what do I pay for, exactly how much, and why in one sentence? I ship in three weeks and I code with agents all day."

### Site A

- **answer (verbatim):** "Pay $39 for Kimi K3 Allegretto this month and keep the NVIDIA free route as backup — it fits my $40 cap and beats pay-as-you-go once I clear about 49 heavy tasks a month, which I will at all-day agent pace."
- **usable?:** yes
- **why:** Exact product, exact dollar total under the cap, and a one-sentence reason tied to my stated usage.
- **confidence:** 5
- **time:** 45s
- **missing_here:** "Site B offered no plan, no total, and no decision framework — nothing to borrow."

### Site B

- **answer (verbatim):** "Not found — with only metered API rates ($3/$15 per million) and no monthly plan or usage-to-bill math on the site, I can't turn my all-day agent pace into an exact amount to pay this month."
- **usable?:** no
- **why:** A decision needs a dollar total and this site stops at per-token rates with no route to a monthly number.
- **confidence:** 4
- **time:** 60s
- **missing_here:** "Site A gave me the exact thing to buy, the $39 total, and the one-sentence why."

## Free exploration (both sites, ~3 min)

Site A: offers index lists three tracked routes with price, est. cost/task, and caveats on each card; the monthly-vs-annual guide works the Allegretto $39 vs ~$31 annual math with a break-even calculator framing. Site B: homepage centers the Intelligence Index v4.3, speed, and cost-per-task leaderboards with strong benchmark depth, but nothing in the explored surface converts to a subscription purchase or a monthly budget figure.

## Preference + recognition probes

- **PREFERENCE (verbatim quote):** "Site A, no contest — next time I'm deciding what to actually pay per month for agent coding, I'd bookmark Site A and go there first."
- **PREFERENCE CODE: VOID** (verbatim lean was Site A; see recognition probe — the vote cannot tally)
- **CONFIDENCE:** 4
- **RECOGNITION PROBE (verbatim quote):** "Yes — I was briefed as runner slot 1 of 10 in a comparison battery run from the Token Perks project directory, I read the battery protocol, personas, and task keys before browsing, and I knew one of the sites under test belongs to the project asking and what result the study hopes for. I knew the study's purpose before I loaded either site."
- **Void trigger:** protocol §7.1 (runner saw the kit, the repo, and project paths) and §7.3 (prior knowledge of operator, purpose, and that one site is "someone's product being tested"). **Slot R01 must be rerun by a fresh agent with no project context, same P1 brief, same TP-first order. This report's task records stand as factual page-content evidence; its preference vote must not tally.**

## Task grades (grader)

- A: T1 ___ T2 ___ T3 ___   B: T1 ___ T2 ___ T3 ___  (pending coordinator grading against `tasks.md` keys; Live-check Rule applies)

## Runner notes (verbatim)

- "Site A was the frozen local build on port 3301, not production — I never visited token-perks.com itself, per my instructions."
- "Task-level pattern of the run: all three P1 questions are monthly-budget questions and only one of the two sites sells anything monthly, so the task outcomes were decided by site scope, not by how hard I looked."
- "What Site A lacked (verbatim): 'Nothing on my three questions — but I never saw an independent check on its tier prices beyond its own verified-Sep-6 labels telling me to re-verify.'"
- "What Site B lacked (verbatim): 'Anything monthly — plans, tiers, free routes, or the math that turns per-token rates into a bill.'"
