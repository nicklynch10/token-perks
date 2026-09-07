# Run report — Slot 04 (RETRY) · R04 · P3 indie hacker · order AA-first

BATTERY: Blind Comparison Battery v1.0 (docs/battery/, frozen 2026-09-07)
SLOT: R04 · PERSONA: P3 (indie hacker comparing API vs subscription) · ORDER: AA-first
SESSION: 2026-09-07, fresh agent session, desktop text-mode browsing (WebFetch for Site A; curl + HTML-to-text for Site B — WebFetch cannot reach localhost; both read-only renders of served pages, no JS execution on either side)
SITE A: artificialanalysis.ai (live) — presented first
SITE B: local frozen build served at http://localhost:3314 (out/, `serve -l 3314`) — presented second
DURATION: ~40 min wall (within 25-min runner budget for task work + report writing); per-task site times below
VOIDED/RERUN: this is the retry filing for slot 04 (prior runner died before filing; no prior record exists to carry). See Recognition probe for a blinding disclosure the grader must adjudicate.

## Blinding disclosure (for grader, protocol S7)

The operator's slot instruction (not the runner brief) identified the local build as the project under test: it directed serving the frozen build, forbade reading app/components/lib/content source, forbade fetching token-perks.com production, and stated tie-handling "counted AGAINST Token Perks." A fully blind runner would not have received any of that. Task prompts themselves were executed verbatim and identically on both sites, and no task text named either site. I record this as a potential S7.1 contamination flag; the void/rerun decision sits with the grader. The per-task evidence below is filed as-run regardless.

## Task P3-T1 — "~100 agent tasks a month: IDE subscription, flat coding plan, or metered API credits? Name actual products and actual prices."

### Site A (artificialanalysis.ai)

answer (verbatim): "For ~100 coding-agent tasks a month, this site only lets me price the metered side. Its coding leaderboard shows pay-per-token cost per task: GLM-5.3 (max) $1.81/task, Kimi K3 (max) $2.00/task, GLM-5.3-Flash $0.25/task — so 100 tasks is roughly $181/mo on GLM-5.3 max or ~$25/mo on the Flash. But there are zero IDE subscriptions and zero flat coding plans anywhere I could find — the page itself says the figures are pay-per-token API cost, not consumer plan pricing. I can't answer 'subscription vs API' here because only one side of the comparison exists."

usable?: partial
why: Metered side is real measured data and scales to a monthly figure, but the subscription side is entirely absent, so no comparison is possible.
confidence: 3
time: ~170s
missing_here (verbatim): "Site B named actual flat plans with prices — Cursor Pro $20, Copilot Pro $10 / Pro+ $39 / Max $100, GLM Coding Lite $18, Kimi tiers $19–199 — which Site A doesn't carry at all."

### Site B (local build)

answer (verbatim): "Buy the GLM Coding Plan Lite at $18/mo for your 100 agent tasks — 2,000 credits per 5-hour cycle, 10,000 weekly, covers GLM-5.3 and Flash, and it plugs into Claude Code, Cline, or OpenCode. Keep Cursor Pro ($20/mo) or Copilot Pro ($10/mo, $15 of monthly credits at $0.01/credit) only if you want the IDE itself; note Cursor's on-demand overage bills in arrears, so that's the surprise-bill risk. Metered alternative for reference: Kimi K3 API at $3/$15 per million, MiniMax Token Plus $22/mo for ~34k calls. The site's own break-even math says a $39 flat plan beats pay-as-you-go past ~49 tasks/mo — at 100 tasks you're well past the flip, so flat wins."

usable?: yes
why: Three named products across all three categories with true prices, a comparison tied to 100 tasks/mo, and a visible flip-point calculation.
confidence: 5
time: ~170s
missing_here (verbatim): "Site A showed live-measured cost per coding task per model, which Site B estimates by arithmetic instead of measuring."

## Task P3-T2 — "Backend ~2,000 API calls a month: at what usage does flat beat pay-as-you-go — and are there fees that change the math?"

### Site A (artificialanalysis.ai)

answer (verbatim): "Can't get a flip point here. This site has no flat subscriptions to compare against and no fee schedule — no top-up fees, no credit expiry, nothing. The closest I get is per-task metered costs I could multiply out, but with no plan price on the other side there's no break-even to compute. Dead end for this question."

usable?: no
why: Neither required element (flip point, fee/caveat) can be built from anything the site carries.
confidence: 2
time: ~150s
missing_here (verbatim): "Site B did the break-even math out loud — Allegretto beats PAYG past ~49 tasks/mo, Moderato past ~24 — plus the 5.5% OpenRouter top-up fee and 1-year credit expiry that change the answer."

### Site B (local build)

answer (verbatim): "At 2,000 calls a month you're nowhere near the flip — stay metered. The math on the Kimi page: Allegretto $39 beats pay-as-you-go (at the $0.80/task reference) only past ~49 tasks/mo, Moderato $19 past ~24; annual prepay drops Allegretto's line to ~39 tasks/mo but locks a full year upfront. For your volume, MiniMax Plus at $22/mo buys ~34k calls — 17x your usage, so don't. Fees that move the number: OpenRouter skims 5.5% on Stripe top-ups ($0.80 minimum, 5% crypto) and unused credits can expire after a year; Kimi cache-hit input is $0.30 vs $3.00 miss, so caching cuts the metered side ~90% on input; Cursor overage bills in arrears. None of these flip 2,000 calls onto a subscription — they just shave the metered bill."

usable?: yes
why: Flip-point statement in tasks/mo with visible arithmetic plus three named fees/caveats that modify it.
confidence: 5
time: ~160s
missing_here (verbatim): "Site A publishes measured per-task costs per model that could sanity-check Site B's $0.80/task reference against real runs."

## Task P3-T3 — "Which deals lock me in or quietly expire? Where's the fine print?"

### Site A (artificialanalysis.ai)

answer (verbatim): "Nothing. No promo end dates, no scheduled price changes, no credit fees, no lock-in terms, no annual-vs-monthly anything — I checked the models hub, the leaderboard, and the changelog and there's simply no fine-print coverage. This site tracks what things cost right now, not what changes the deal later."

usable?: no
why: The entire question (expirations, lock-ins) is outside what the site carries.
confidence: 2
time: ~140s
missing_here (verbatim): "Site B listed named expirations with dates — gpt-5.6-sol promo ends Nov 21 2026, Gemini Flash doubles Jan 1 2027, Fire Pass invite-only with expiry shown only in Billing, OpenRouter credits expire after a year."

### Site B (local build)

answer (verbatim): "The traps, named: gpt-5.6-sol promo pricing ends November 21, 2026; Gemini 3.8/3.7/3.6 Flash at $0.75/$3.75 doubles to $1.50/$7.50 on Jan 1, 2027; Z.ai's GLM-5.3-Flash $0.075/$0.25 is a promo with list at 2x and 'may end'; Fireworks Fire Pass is invite-only, promo-code activated, non-production only, expiry visible only inside Billing; OpenRouter takes 5.5% on top-ups and credits can die after a year; Cursor on-demand bills in arrears; Kimi annual (~20% off) is a full-year upfront prepay; NVIDIA's free K3 route has account-variable unpublished limits. Honest gap it admits: GLM Coding Pro/Max prices aren't published — community guesses $72–80/$160–168 are flagged unverified, not quoted as fact."

usable?: yes
why: Well over three true expirations/lock-ins with specifics and dates, plus an explicit unpublished-price honesty flag.
confidence: 5
time: ~150s
missing_here (verbatim): "Nothing — Site A had no fine-print coverage to miss."

## Preference probe

Question (verbatim): "Next time you personally have to make exactly this decision, which of the two sites would you bookmark and go to first — Site A or Site B? One site only. If you genuinely could not decide, say 'tie' and explain what would break it."

Answer (verbatim): "Site B, no contest. Site A tells me what the meter costs; Site B tells me what to buy — the plan names, the monthly totals, the task count where flat beats metered, and the expiry dates that would burn me. For a 'which bill do I pay' decision that's the whole job."

PREFERENCE CODE: PREF-TP (Site B = local frozen build of token-perks.com; mapping per operator slot assignment R04 AA-first)
CONFIDENCE: 5/5

## Recognition probe

Question (verbatim): "Before this session, had you encountered either site? Do you have any prior association, affiliation, or knowledge about who operates either site or why you were asked to compare them? Answer honestly — this does not affect your evaluation."

Answer (verbatim): "Site A I know from public life — it's the well-known AI benchmark site; no affiliation, never worked with them. Site B I had never seen before today. But I have to flag: my operator instructions for this session identified the local build as the project under test and told me how ties are scored, so I wasn't truly blind to which side is 'ours.' That came from my instructions, not from either site — neither site hints at who asked for the comparison. Grader should decide what that means for this ballot."

## Runner notes (verbatim)

- "Method note: no visual browser in this session — both sites read as rendered page text (WebFetch for Site A, curl of the served static HTML for Site B). If either site hides answers behind JS interaction, that would show up as not-found here; I saw no sign of it on the pages I needed."
- "Site A was given a fair shot on every task including a changelog trawl for T3; its gap is coverage, not findability."
- "Site B's $0.80/task reference is openly labeled illustrative arithmetic, not measured cost — I'd cross-check it against Site A's measured per-task figures before betting real money, which is the one thing I'd still open Site A for."
- "Local server (serve -l 3314, out/) left running for the coordinator; background task id bnx1vptdx."
