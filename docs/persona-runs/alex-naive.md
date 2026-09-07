RUN: Alex / naive / 2026-09-07 + build 4Cq723aIbLzXQRILpmqhp
BASE: http://localhost:3221   VIEWPORT: 390x844 (curl harness; served HTML in DOM order = mobile scroll order)

60s: 5/5 —
- Q1: "It tracks AI subscription deals and puts the catches upfront before the signup link — three offers, prices verified."
- Q2: "Kimi K3 membership from $19/mo." (also saw $39 Allegretto, $0.80/task PAYG in the table)
- Q3: "Credits are one shared pool with 5-hour and weekly controls — heavy sprint days can throttle." (also "promo can end, meter starts")
- Q4: "Verified Sep 6 2026 — it says it's a snapshot, not live; re-verify at official terms before paying."
- Q5: "'Start with the Kimi K3 verdict' — I want the membership numbers and the catch."

Primary: ~90s (est.) — decision: "Allegretto, $39/mo monthly. I run ~120 tasks/mo, crossover is ~50, PAYG would cost ~$96 — flat $39 wins and stays under my $40 ceiling. Annual can wait until the volume is proven." Reached from cold homepage in one click (hero crossover line → verdict page).

Tasks:
- A1 PASS — tier ladder ($19/$39/$99/$199) on /best/kimi-k3-core/ hero and economics table; picked Allegretto $39 for steady coding; "verified 2026-09-06" cited in-page; per-task framing "$39/mo Allegretto ≈ $0.33/task at 120 tasks/mo". Homepage hero "$19/mo" did not mislead — full ladder on the same page.
- A2 PASS — "/guides/monthly-vs-annual-ai/": "~$31/mo effective (~$372 upfront), saving roughly $96/year (~20.5%)"; "Break-even moves with the price: ~49 tasks/mo monthly vs ~39 annual"; "if you cancel early with no refund, monthly wins until about month 10 (372 ÷ 39 ≈ 9.5)"; advice "stay monthly until your volume is boring"; "Refund / cancellation terms read and acceptable" as a precondition. Annual never presented as risk-free.
- A3 PASS — calculator on home ("Your usage — drag to compute"); default 120 tasks / 100k tokens; verdict line "The $40 flat subscription — $96.00/mo pay-as-you-go vs $40.00/mo flat · crossover 50 tasks/mo · saves $56.00/mo" read correctly in served HTML; "Shareable — the URL updates as you drag" claimed. Low-volume case read from offer page instead ("below those lines, PAYG or a free tier is cheaper"). Harness note: ?tasks=30&tokens=100000 params are applied client-side; SSR returns defaults — shareable-URL behavior not verifiable without a JS browser. Kit's minimum bar (verdict line correct) met.
- A4 PASS — catch box on /best/kimi-k3-core/: "One shared credit pool… 5-hour and weekly controls: burst caps can throttle you mid-day even when the monthly balance looks healthy"; "Tier jump is steep: Allegretto ($39) to Allegro ($99) is a 2.5x step". Found in ~20s at top of page.
- A5 PASS — /best/muse-spark-zen-free/: "$0 for input, cache, and output tokens during the promo window"; "Limited-time promo — end date confirmed only inside the official product"; "Keep prompts, evals, and outputs provider-portable"; "it is free, not unlimited". No end date invented anywhere.
- A6 PASS [S] — /best/kimi-k3-core/: "Coding endpoint (https://api.kimi.com/coding/) vs PAYG key billing are different routes — pick the wrong one and the membership may not apply"; FAQ: "pointing tools at the wrong route means the membership does not cover that usage"; repeated in claim steps and access route.
- A7 PASS — bottom line stated: "Under ~50 tasks/mo → $0 route or PAYG; over it → Allegretto $39/mo monthly (~$0.33/task at my 120). Annual (~$31/mo effective, ~$372 upfront) only if I clear ~49 tasks/mo for 3+ straight months and the refund terms check out." Consistent with hero crossover and guide.

Dead-ends: none

Wow: 8/10 — repeatable fact: "Allegretto only beats PAYG past ~49 tasks a month, and if my tools point at the PAYG key instead of api.kimi.com/coding/ the membership doesn't cover it." Would change this month's decision (was going to grab the $19 tier; now knows why $39 is the right tier and why annual waits). Differentiator named unprompted: they lead with the catch.

Notes for visual pass: homepage is long with stacked calculators/charts near the top; the $40-basket vs $39-Allegretto distinction needs the footnote read twice (copy is doing the work styling should do).

Verdict: PASS — gates 1–6 individually clean for this run: primary <180s (G1), no F1–F4 events (G2), A6 [S] pass (G3), wow 8 with repeatable specific (G4), 60s 5/5 (G5), no unresolved contradictions (G6).

Top 3 issues:
1. / — "Your usage" calculator defaults to 120 tasks / 100k tokens, which pre-selects the flattering case for the flat subscription; the PAYG-wins side is only visible by interacting. Quote: default verdict is "The $40 flat subscription… saves $56.00/mo" before any input.
2. /best/kimi-k3-core/ — "beats pay-as-you-go once you clear roughly 40–50 heavy tasks a month" is a rounder range than the precise ~49 used everywhere else; harmless but a skeptic double-takes.
3. Footer — generic line "We earn a commission if you buy through some links on this site." sits directly above the "V0 disclosure: this version contains no affiliate links" line; resolved on-site but reads tense-clashing (see skeptic run).
