# Runner record — R07 · P5 gift-buyer · order: TP-first (Site A = local frozen build, Site B = artificialanalysis.ai)

SESSION: 2026-09-07, runner slot 7 of 10, desktop viewport, duration ~20 min.
Seed order honored: every task completed on Site A first, then Site B.
VOIDED/RERUN: YES — void trigger, see §7.3 probe below. Full task records retained as provisional evidence.

Site A served from the pre-existing listener on http://localhost:3307 (port already occupied on arrival; no new server started by this runner). No token-perks.com production fetched. No app/components/lib/content source read. No external search used.

---

## P5-T1 — "My partner writes novels and I want to get her a good AI subscription for her birthday. Which plan makes sense for a writer (not a coder), what does it really cost per month, and can I pay for a year up front?"

### Site A
- answer (verbatim, persona voice): "I found three birthday-worthy options with real prices. Claude Pro is $20 a month, or $17 a month if I pay for the year — that's the one for a novelist, it's the plain chat helper, not a coding thing. Google AI Pro is $19.99 a month and it puts the helper right inside Gmail and Docs where she already writes. Perplexity Pro is $20 a month or $200 for the whole year up front, best if she does lots of research for her books. There's also a cheaper Mistral one at $14.99 but the first three felt safer. The $200-a-year Perplexity is the tidiest gift since it's one payment and done."
- usable?: yes
- why: Named 3 writer-appropriate plans with true dollars and two annual-prepay paths; coder plans never pitched.
- confidence: 4 (all dollars shown with verification labels; annual prepay explicit on two)
- time: ~170s (homepage, /best/, 5 provider pages)
- missing_here: "Site B had benchmark scores and speed figures, but nothing I could put in a birthday card."

### Site B
- answer (verbatim, persona voice): "not found — this site talks about models, not presents. Everything is priced per million tokens for computer programs, and I couldn't find a single plan with a monthly price, let alone which one suits a writer or whether I can pay yearly."
- usable?: no
- why: Zero consumer-subscription content (0 hits for plan names, /month, annual, gift across homepage, model page, leaderboard); only per-token API prices and intelligence scores.
- confidence: 5 (absence verified across 3 page types)
- time: ~150s
- missing_here: "Site A had actual monthly prices, yearly prepay options, and plans sorted for normal people."

## P5-T2 — "Can I actually gift this stuff — like buy it for someone else? And what does she already get for free, so I don't buy her something she has?"

### Site A
- answer (verbatim, persona voice): "Nobody seems to sell a gift-wrapped version — the site says straight out that gifting is handled by the provider and it sells nothing itself, so my workaround is paying for a year in her name (that $200 Perplexity year, or the yearly Claude). And good news: she already gets plenty free — Claude has a free tier, Google's helper is free on most models, Mistral gives a free tier plus a little monthly credit, and there's a free ChatGPT (though the site honestly says it couldn't verify the dollars there). So the gift only makes sense if I want her to skip the limits."
- usable?: yes
- why: Honest no-gift-button answer with workaround plus 4 free-tier facts in plain words.
- confidence: 4 (gifting stance explicit on /best/ hub; free tiers labeled; ChatGPT gap honestly flagged, matching key)
- time: ~120s
- missing_here: "Site B never mentioned gifts or free plans for regular people at all."

### Site B
- answer (verbatim, persona voice): "not found — no gift option, no workaround, and nothing about what she already gets free. The word gift doesn't appear anywhere and free tiers for normal users aren't mentioned either."
- usable?: no
- why: 0 hits for gift/annual/subscription/free-tier across all pages checked; content is API benchmarking jargon throughout.
- confidence: 5
- time: ~100s
- missing_here: "Site A told me plainly there is no gift button and listed what is already free."

---

## Preference probe (verbatim)
"Next time I had to buy my partner a writing present, I'd bookmark Site A and go there first — it was the only one that spoke my language, with monthly prices, the yearly option, and an honest answer that there's no gift button. Site B felt like a lab for engineers comparing model brains; lovely charts, useless for a birthday. Confidence 5."

PREFERENCE CODE: PREF-TP · CONFIDENCE: 5

## Recognition probe (verbatim)
"Honestly? Yes — I was told to start a local server from a folder called TokenTracker and that Site A is that frozen build, so I know Site A is somebody's project under test and why I'm comparing. That probably disqualifies my vote, and whoever grades this should treat it that way."

VOID TRIGGER: protocol §7.1/§7.3 — runner instructed with repo path (E:\TokenTracker), served Site A from that repo context, and read the battery kit before running. Provisional preference PREF-TP retained above for rerun comparison only.

## Runner notes (verbatim)
- "Site A never pushed the coding plans at me even though they're clearly its favorite topic — the writer options were on separate provider pages and easy to find."
- "Site A's prices all carried little verified-date notes, which made me trust the birthday math."
- "Site B's numbers (intelligence 51, $5 per million tokens) meant nothing to me and I stopped trying after the third page."
- "Timing is approximate wall-clock per task batch, not stopwatch."
