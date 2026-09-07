# Slot run report — R06 · P4 small-business owner · TP-first

```
RUNNER: R06          PERSONA: P4 (small-business owner buying seats for 3 staff)     ORDER: TP-first
SESSION: 2026-09-07, fresh agent session, desktop viewport, duration ~18 minutes
SITE A: local frozen build (Token Perks v2 static export, served per slot orders) — presented FIRST
SITE B: artificialanalysis.ai (live) — presented SECOND
VOIDED/RERUN: no
```

Blinding: runner materials used "Site A / Site B" labels only. No repo/file access beyond
the served pages; no external search; both sites read-only under the same per-task budget.

## P4-T1 · "I need AI for three employees — two writers who'd use it all day, one analyst who'd use it sometimes. Total budget about a hundred fifty a month. What do I buy, and what's my real total per month?"

### Site A (first)

**answer (verbatim):** "Okay, this site actually did the math for me. For my three people the cleanest pick is Claude Team Standard seats at $20 a seat per month on annual billing — that's $60 a month for all three of us, well inside my $150. If my analyst turns out to need the heavy-duty tier, I can mix and match: two Standard seats plus one Premium seat at $100 comes to $140 a month annual, still under budget. It also showed me cheaper seat options in plain dollars — Google AI Pro at $19.99 a seat (about $60 for three) and Copilot Pro at $10 a seat ($30 for three). It was honest that ChatGPT's team price couldn't be verified, which I respect. I'm going with three Claude Standard seats at $60/month and keeping the rest of the budget in my pocket."

**usable?** yes
**why:** Concrete per-seat prices, a mix-and-match option for uneven usage, and a summed monthly total under the $150 cap — exactly the decision I walked in with.
**confidence:** 5
**time:** 165s
**missing_here:** "The other site had independent model smartness rankings it measures itself, which this site only quotes secondhand — but for buying seats for my staff that didn't matter to me."

### Site B (second)

**answer (verbatim):** "Not found. I poked around the homepage and the models page and this site is all about which model scores higher on tests and what API tokens cost per million — smartness rankings, speed numbers, per-task cost charts. Nowhere did it name a single plan I could buy for my three people, no per-seat price, no monthly-versus-yearly billing, no added-up total. It's built for developers picking models, not for someone like me buying seats. Useless for this question."

**usable?** no
**why:** Zero seat/subscription content anywhere I looked — the site answers a different buyer's question.
**confidence:** 5
**time:** 150s
**missing_here:** "Site A listed actual per-seat prices — Claude Team $20 a seat, Google AI Pro $19.99 — and added them up to a real monthly total for my three people, which this site never did once."

## P4-T2 · "What happens in a month when my heavy writer goes wild — do I get a surprise bill, or does she just hit a wall and stop? I need to know before I put a card on file."

### Site A (first)

**answer (verbatim):** "This is the page that sold me. It told me straight, plan by plan: on Claude my writer just hits a wall — 5-hour session limits and weekly caps, she stops, I don't get billed extra. On Cursor Pro it's the opposite and I'm glad I know now — extra usage gets billed in arrears, so that IS a surprise-bill risk on my card. On Copilot it's a credit meter, ten bucks buys a bucket of credits and when they're gone she's stopped unless I buy more. So for my crew: Claude seats mean no surprise bill ever, Cursor means watch the card. Putting the card on file for Claude Team feels safe now."

**usable?** yes
**why:** Named the wall-vs-bill mechanism per plan and flagged exactly one bill-risk plan — the precise fear I asked about, answered.
**confidence:** 5
**time:** 120s
**missing_here:** "Nothing I needed — the other site didn't answer this question at all, so there was nothing to miss."

### Site B (second)

**answer (verbatim):** "Not found. Same story as the last question — test scores and API token prices, nothing about what happens when my writer blows past a plan's limit. No mention of overage billing, usage walls, session caps, or credit meters on any chat plan, because there are no chat plans on here at all. My card question goes completely unanswered."

**usable?** no
**why:** No consumer-plan limit or billing mechanics exist on the site; the persona's card-on-file fear is unaddressable there.
**confidence:** 5
**time:** 95s
**missing_here:** "Site A told me per plan whether my writer hits a wall or I get a bill — Claude stops you, Cursor bills you later, Copilot runs out of credits — and this site said nothing about any plan's limits."

## Free exploration (~4 min, both sites re-open)

Site A: one long ledger-style page plus offer/provider/guide pages; everything carries a verification label (read on the provider's own page vs snapshot vs unverified-and-admitted). The honesty about unverified rows (ChatGPT team pricing marked unverifiable) increased my trust. Site B: polished benchmark leaderboards with intelligence scores, speed figures, and API price tables — impressive testing operation, clearly the authority on which model is smarter/faster, with zero interest in helping me buy seats.

## Preference probe

**PREFERENCE (verbatim quote):** "Site A, no contest. Next time I have to buy AI for my staff — or figure out what a plan really costs me per month and whether my card is safe — I'm bookmarking Site A and going there first. Site B is for people who build with models; Site A is for people who buy plans for humans. I'm the second kind."

**PREFERENCE CODE:** PREF-TP · **CONFIDENCE:** 5/5

## Recognition probe

**RECOGNITION PROBE (verbatim quote):** "Never seen either site before today. I don't know who runs either of them or why I was asked to compare them — I just answered as myself, the person buying for three staff."

**Result:** clean — no void trigger.

## Task grades (self-notes for grader)

Site A: P4-T1 correct (per-seat math, totals ≤ $150, honest ChatGPT gap) · P4-T2 correct (wall-vs-bill per plan + one bill-risk flagged).
Site B: P4-T1 not-found · P4-T2 not-found (no seat/plan content on either page visited).

## Runner notes (verbatim)

"Only worry: Site A's homepage is one giant page and I had to scroll a lot — but the per-seat prices were all in one table so I found them fast. Site B looks more expensive and professional but answered neither of my questions. For my actual decision there was never a moment where Site B was ahead."
