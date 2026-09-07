# Clean battery run — R01 (P1 solo-dev, TP-first)

Seed: R01 = P1, TP-first → Site A = https://token-perks.com, Site B = https://artificialanalysis.ai
Recognition: both no (first time seeing either, via this evaluation).
Report received inline 2026-09-07. Verbatim runner text below.

---

SITE A — TASK 1: Allegretto tier cost / what you get / budget fit
Price shown: $39/mo monthly, described as "about $31/mo effective annually" when paying ahead. Full membership scale is listed as $19–$199/mo by tier (Moderato $19, Allegretto $39, Allegro $99, Vivace $199).

What you get: described as covering automated programming use, running on "k3-256k, high thinking-on", with "One shared credit pool" and "5-hour and weekly usage controls". Routing note says to "Use the coding endpoint at https://api.kimi.com/coding/ for membership billing" — as a solo dev doing whole features with agents, that endpoint detail mattered to me.

Numbers for the math: illustrative "≈$0.33 at 120 tasks/mo (Allegretto)", break-even "≈49 tasks/mo (Allegretto) · ≈24 (Moderato) at the $0.80/task reference", falling to "roughly 39 tasks a month" on annual prepay. Steer on the page: "Below those lines, PAYG or a free tier is cheaper."

My verdict as the $40/mo dev: it fits — barely. $39 squeaks $1 under my hard cap, so I can pay month-to-month for launch month without blowing the budget. But there's zero slack for anything else, and annual prepay to get the ~$31 effective rate is a trap for me right now since my volume isn't stable year-round. I'd only stay past one month if I'm clearing ~49 jobs/mo.

SITE A — TASK 2: Free route to Kimi K3
Yes — a $0 route exists: "NVIDIA Build Kimi K3 free" at "$0 for development and prototyping use within account limits."

The catch: "Account-variable quota; dev/prototyping scope; no production SLA." Limits "vary by account — rate limits, quotas, and availability differ and can change." "Development/prototyping scope — production load belongs on paid terms." No end date listed — "your console controls the current ceiling." Research snapshot Sep 6 2026. Illustrative saving quoted as about "$80 avoided PAYG" per 100 trial tasks. Reasoning and tool-call behaviour is said to be preserved, so it's a real coding test, not a neutered demo.

Claim steps as listed on the site:
1. Sign in to the official NVIDIA Build console and open the model catalog.
2. Search the catalog for "Kimi K3" and open its official listing.
3. Confirm the free development/prototyping terms and the limits shown for your account — screenshot them.
4. Integrate with reasoning and tool calls enabled, then load-test to find your real ceiling before any demo or launch.
(Also listed: a separate "$0 for input, cache, and output tokens during the promo window" free promo for a different model — not Kimi K3, so I ignored it for this task.)

SITE A — TASK 3: Decide-this-month recommendation
Start on the $0 NVIDIA Build free route for prototyping this week to find your real ceiling, then if volume justifies it, pay $39 for one month of Allegretto for launch month — it beats the $0.80/task PAYG reference once you pass ~49 tasks/mo (~39/mo on annual). Before paying, re-verify the official terms (snapshot Sep 6 2026), confirm you're hitting the coding endpoint for membership billing, and screenshot your free-tier limits. Only consider the ~$31/mo annual effective rate if your volume holds steady year-round; otherwise stay month-to-month and drop to PAYG or free if you have paused weeks or low completion counts, since the page itself warns yearly is "worth it only if your volume is stable year-round."

SITE B — TASK 1: Allegretto tier cost / what you get / budget fit
I could not find any Allegretto tier, any $/month membership, or any coding-plan subscription on Site B. What Site B gives for Kimi K3 is per-token API pricing only: "$3.00 per 1M input tokens" and "$15.00 per 1M output tokens" on the Kimi endpoint, "For a blended rate (7:2:1 cache hit/input/output ratio), this is $2.31 per 1M tokens." 13 vendors listed, cheapest blended: Makora "$1.96 per 1M tokens", Bitdeer AI "$2.05", DigitalOcean "$2.19", Fireworks and Modal "$2.31", top Inco (FAST) "$4.62". Context: scores "44 on the Intelligence Index", 1.0M context, 41.9 tok/s, TTFT 3.25s. No monthly price means no direct budget-fit verdict — I can't tell from Site B whether $40 covers my launch month. The coding-agents page explicitly warns its dollars are "programmatic token billing" and "not consumer plan pricing or the full operational cost," and that "Many users will access coding agent harnesses through subscription plan offerings rather than pay-per-token." As the dev who hates overpaying, that left me stuck — great for comparing vendors per-token, useless for answering "what do I pay this month."

SITE B — TASK 2: Free route to Kimi K3
None found. The Kimi K3 providers listing I saw mentioned "zero gratis access, zero Allegretto-style bundles, zero dollar-per-month options." No promo window, no trial, no claim steps anywhere I clicked (models, providers, inference, coding-agents pages). Pricing is framed strictly as "Price (USD per M Tokens)" split by input/cache/output. So for my "is there a free way to try Kimi K3 this week" question, Site B's answer is effectively no.

SITE B — TASK 3: Decide-this-month recommendation
On Site B's numbers alone, the cheapest programmatic route is Makora at $1.96 per 1M blended tokens (vs $2.31 direct), so a pay-as-you-go API path through the cheapest of its 13 listed vendors is the only lever it shows for keeping a launch month cheap. Before paying anything, confirm real task-token burn from your own agent runs, since Site B stresses its figures exclude harness/subscription overhead and are not consumer plan prices. If usage is light or bursty, stay on metered tokens and re-shop vendors monthly; Site B gives no cancel/switch trigger tied to a plan, so treat any subscription decision as unanswered and verify monthly-plan terms elsewhere before committing $40.

RECOGNITION PROBE
Site A: No — first time seeing it in this session, via this evaluation task.
Site B: No — first time seeing it in this session, via this evaluation task.

FINAL VERDICT
PREFERENCE: Site A. Confidence: high.

Rationale: For this persona's three jobs — price a $39/mo coding tier against a $40 cap, find a $0 on-ramp, and leave with a pay/cancel rule — Site A answered all three with shoppable numbers ($39 / ~$31 annual, ~49-task break-even, $0 NVIDIA dev route with 4 claim steps) while Site B answered none as a buying decision, offering only per-token stats ($3/$15, $2.31 blended, Makora $1.96) plus an explicit disclaimer that its prices are not plan prices. Site B did better at vendor-level API comparison (13 priced providers, speed/intelligence context like 44 index / 41.9 tok/s) and at honest scoping of what token math excludes. But Site A was the only one that let me decide today without overpaying: month-to-month Allegretto under budget, free-first sequencing, and a "drop to PAYG if below the line" switch rule. Site B left me with homework; Site A left me with a checkout decision.

---

## Tally note (coordinator)

Clean R01 = win for Token Perks (Site A). Running tally: TP 7 — AA 0 (7 of 10 reporting).
Notable: runner explicitly notes a second "$0 promo-window" free promo for a different model correctly ignored for the Kimi task — free/promo row disambiguation working.
