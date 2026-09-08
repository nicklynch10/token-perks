# Confirmation run C1 — gift-buyer, non-technical (TP-first)

Site A = https://token-perks.com, Site B = https://artificialanalysis.ai. Run 2026-09-07, post V3 build.
Verdict: **Site A (Token Perks) preferred, medium confidence.** Wow scores: A 4/10, B 2/10. Neither hit "send to group chat." Recognition: both no.

## Triage (coordinator)
- DEAD LINK reported ("first how-do-I-get-one link gave a 404") → root-caused via full link sweep: zen.baidu.com dead domain on Muse Spark row. FIXED commit eb5bfcb, deployed to production 2026-09-07 (verified serving).
- FIXES for next round: (1) plain-English "Buying a gift? / non-technical?" entry card at top of homepage — judge says it "would be an easy 7"; (2) break-even calculator "buried below four tables" — elevate for consumer personas or add a jump-link from hero; (3) token-jargon in opening line ("129 ways to buy frontier-model tokens") — add parenthetical or reword for lay readers; (4) trust signals praised (no-affiliate note, verification dates, "never enter credentials") — keep.
- AA bounced her in <30s; our consumer price visibility ($19.99 ChatGPT etc.) + guides won the preference even at low wow.

---

## Full runner report (verbatim)

# First-Impression Review — gift-buyer, non-technical, partner-writes-for-a-living

## 1. FIRST IMPRESSION

**Site A (token-perks.com):** My stomach dropped in the first ten seconds. The opening line was "The cost side of AI access, ranked" and it promised "129 ways to buy frontier-model tokens" — I don't know what a token is, and I just want one subscription for my partner. Then it hits me with a scatter plot and a 43-row table of things like "$0.07 / $0.25" per "M tokens." I stayed only because I spotted familiar names with familiar prices — ChatGPT Plus $19.99/mo, Claude Pro $20/mo — and some $0 free options, and because the little footer honesty notes ("no affiliate links," "never enter credentials on any page here") made me trust it. But the very first "how do I actually get one of these" link I clicked gave me a 404, and a dead end from a gift-buyer is a leave-the-site event.

**Site B (artificialanalysis.ai):** "Independent analysis of AI" — nice, sounds legit, like Consumer Reports. And then it's nothing but chart after chart after chart: intelligence indices, Elo scores, Pareto fronts, speed bars, arenas. It's clearly the work of smart people and it is absolutely not for me. There is no price I can pay this site and no subscription I can buy for my partner anywhere on it; the prices it does show are per-million-tokens API rates, which is not how a normal person buys AI. I bounced in well under 30 seconds.

## 2. WHAT YOU FOUND

**Site A — can I answer "what would I buy, for how much, with what catch?" Partially, and that's the difference between a maybe and a no.** I could find the two or three consumer subscriptions a gift is plausible for: "ChatGPT Plus $19.99/mo" and "Claude Pro $20/mo ($17/mo annual)." The catch layer is real — everything is stamped "Verified Sep 6–7 2026" with labels about how confident they are, and there are 14 free/promo routes listed at $0 (e.g., "Muse Spark 1.3 Free," "NVIDIA K3 Free"). The guides were the friendliest part: "Monthly vs annual AI plans" is exactly my situation (it warns the annual discount only helps if usage is steady — that's genuinely useful). Did anything make me stop and admire? Yes, one thing: the break-even calculator. It frames the whole decision as "monthly price ÷ tasks you actually finish" with a worked example ($40 plan beats metered pricing past 50 tasks), and it was the single moment where "effective cost per task" finally meant something to me. I'd poke at that. Everything above it — the leaderboard, the $/M columns — I skimmed past at full speed.

**Site B — I cannot answer the question at all, because the site isn't selling what I'm buying.** It compares models on "Intelligence, Performance & Price," where price means "Price ($ per M tokens)" and "Cost per Intelligence Index Task." There is one small "Writing" task label buried in the tables, but no "get ChatGPT for your spouse" anything — no free trial paths, no consumer plans, no steps. Did I admire the design? Reluctantly, yes — the arena leaderboards with blind-vote Elo scores and the big filterable intelligence chart are beautiful, and tooltips hover under everything. But the tooltips explain the chart, not my life. This is the manual I said I have zero patience for. I tried to find the "just tell me what to pick" tool in their menu (a Model Recommender) and got another 404, which felt like the site shrugging at me.

## 3. WOW SCORE

**Site A: 4/10** — it earns points for actually showing subscription prices, free options, a trustworthy no-affiliate-links stance, and the one calculator a layperson can enjoy, and loses almost everything back on leading with developer tables and a dead-end Offers link.

**Site B: 2/10** — the craft is undeniable, but a gift-buyer cannot buy a gift, and "would you like to filter by reasoning-weighted output speed?" is the opposite of wow for me.

Neither got "sent to the group chat." Site A got one "hm, maybe I'll look at this again when I compare annual plans."

## 4. RECOMMEND

**Site A:** I'd bookmark it, quietly, yes — the monthly-vs-annual guide and break-even math would help me decide between the two real options I'd buy anyway. Public share (Reddit/newsletter)? No — I'd send it to one techy friend privately ("your kind of nerd candy"), but posting it for normal people would require me explaining what a token is, which defeats the purpose.

**Site B:** Bookmark? No — nothing on it answers a question I have. Tell a friend? Only the friend who builds AI apps, and I'd tell them in person, not with a link. Share publicly? No, because I couldn't write the caption in words my friends would understand.

## 5. RECOGNITION

- Site A: **No** — first time seeing it today.
- Site B: **No** — first proper visit today (the name sounds vaguely familiar from my partner mentioning "those benchmark people," but I'd never been here, and nothing about it clicked as familiar once I was on it).

## 6. FINAL VERDICT

**PREFERENCE: Site A. Confidence: medium — this is me picking the better of two sites that didn't really target me.** Site A at least acknowledges my purchase exists (real subscriptions, real dollar-per-month prices, $0 ways to try things first, and guides about monthly vs annual that map onto my actual decision), and its transparency habits — verification dates, "no affiliate links," telling you what's uncertain — made me trust it even where I couldn't understand it. Site B is the more impressive machine, but it doesn't sell me anything, never mentions the subscriptions I'd buy, and speaks entirely in API pricing. If I'm grading for my own errand, A wins; the reason my confidence isn't high is that A's homepage still front-loads charts I skipped, its Offers link broke on me, and the single thing that finally made me lean in — the break-even calculator — is buried below four tables. If Site A put a plain-English "Buying a gift? Here are the two plans normal people get, with how to try them free first" card at the top, this would be an easy 7.
