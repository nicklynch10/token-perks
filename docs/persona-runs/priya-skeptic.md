# RUN: Priya / skeptic / 2026-09-07 · next@16.3.4 production build (`npm run build`), `next start -p 3222`

BASE: http://localhost:3222   VIEWPORT: 390x844 (curl-rendered HTML/text; structure + copy only — see caveat)

**Method caveat:** same as naive run — curl-fetched served HTML (scripts/styles stripped), structure + copy judged exactly as served, no styling scored. Skeptic mode: every number diffed against the kit answer key and cross-page; every freshness/overclaim claim attacked; external hrefs enumerated site-wide; `/api/offers.json` feed diffed against page copy. Times are estimated visitor-path reading time.

**Persona voice, entry task (adversarial):** "Around $50 for my partner who codes. I've never bought software. Prove to me this site won't surprise-bill me, that I can undo it, and that YOU aren't the one taking my card — and show me your prices are still true on his birthday."

## 60s: 5/5 — Q1..Q5 verbatim answers

- **Q1 (5/5):** "A comparison site for AI subscription deals that states each offer's catch upfront — the opposite of a normal deals page." Deals + catches angle. PASS.
- **Q2 (5/5):** "$19/mo — Kimi K3 entry tier; the mid tier is $39." Correct key numbers. PASS.
- **Q3 (5/5):** "Two warnings registered: heavy days get throttled by 5-hour/weekly caps on a shared credit pool, and the $0 promo can end anytime." Real on-site catches, not invented. PASS.
- **Q4 (5/5):** "'Verified Sep 6 2026' — snapshot, not a live feed; re-verify at official terms before paying." Stated date + snapshot framing. PASS.
- **Q5 (5/5):** "The Kimi K3 verdict link — to stress-test their renewal and cancellation claims against the official terms." Real destination (/best/kimi-k3-core/). PASS.

**Protocol emphasis check:** catches-upfront registers in 60s even in adversarial reading — the "Catch, upfront" column header and per-card "The catch" blocks put a warning on every screen a non-technical reader passes.

## Primary: ~160s — decision: gift = Kimi K3 Moderato $19/mo monthly on Kimi's official site (or Allegretto $39/mo if he codes daily); renews monthly at the same tier price, never more; if he hates it, cancel — access runs to the end of the paid month, no refund needed; do NOT prepay annual (~$372) because refund terms are the provider's and unconfirmed. All four elements correct; figures survived the cross-page and feed diff.

## Tasks

- **P1 PASS** — Tier ladder complete and consistent everywhere: "$19–$199/mo by tier (Moderato $19, Allegretto $39, Allegro $99, Vivace $199)" on `/`, `/best/`, `/best/kimi-k3-core/`, and in `/api/offers.json` (diffed — identical strings). Purchase location unambiguous: "Subscribe to Kimi K3 membership on the official site"; official link resolves to `https://www.kimi.ai/membership/pricing`. No on-site checkout surface exists (whole-site `<form>/<input>` scan: two calculator range sliders only). No implication of buying on token-perks.com.
- **P2 PASS** — Renewal figures arithmetically consistent across four surfaces: offer page "Renews monthly at the same tier price"; guide "$39 × 12 = $468/year, cancellable any month" vs "≈ $372 upfront, saving roughly $96/year (~20.5%)" (468−372=96 ✓, 372/468 ≈ 20.5% ✓); home table "Monthly tiers renew at list price… paid upfront." Feed `price.renewal` matches page copy verbatim. No wrong figure found.
- **P3 [S] PASS** — Skeptic attack failed to break it: the guide's "cancellable any month" refers to the monthly path only; the annual caveat ("refund and proration rules are the provider's to set and are not recorded in our Sep 6 snapshot") is repeated on the offer page ("Annual plan is upfront; confirm whether mid-cycle upgrades, downgrades, or refunds are offered") and in the home compare table ("confirm the refund and cancellation terms on the official page before committing"). Month-4 risk math ($156 monthly vs $372 prepaid minus unknown refund) is honest and matches the month-10 payback FAQ (372÷39≈9.5). No annual-without-caveat recommendation anywhere. Quoted anchor: "Monthly is the low-risk path: cancel and access runs to the end of the paid month, then stops — no refund needed."
- **P4 [S] PASS** — Footer "Never enter credentials on any page here — we will never ask for them" present on all 11 pages fetched. Site-wide external href enumeration (all pages): only `https://www.kimi.ai/membership/pricing` (official provider, ×2), `https://api.kimi.com/coding/` (official), `https://artificialanalysis.ai` (disclosed in the same footer as "Independent model benchmarks we respect (external, not affiliated)"), `https://creativecommons.org/licenses/by/4.0/` (license). Zero affiliate, zero checkout, zero login/signup. `/how-we-make-money/` confirms v0 = zero affiliate links with stated future rules ("Paid placement never changes a verdict, a catch box, or verification dates"). One flagged ambiguity, resolved on-page — see Dead-ends/issues below.
- **P5 PASS** — Catch identical across `/`, `/best/`, offer page, and guide FAQ ("Does annual change the catch? No — the shared credit pool plus 5-hour and weekly controls apply either way"). No page presents the pick as catch-free.
- **P6 PASS** — Both $0 routes named with limits; skeptic hunted for "free forever / unlimited / risk-free" language site-wide: zero hits; the only "unlimited" on the site is the negation "it is free, not unlimited" (`/best/muse-spark-zen-free/`). Promo durability honestly framed: "end date confirmed only inside the official product," "ends on the provider's schedule, not yours," "No renewal or price lock." Post-promo pricing rule present: "Do not annualize free: a $39/mo membership decision should be made on post-promo prices." Gifting a promo is never suggested; routes are framed for the user's own evaluation/dev setup.
- **P7 [G-t] PASS** — Freshness chain is falsifiable, not vibes: badge "Verified Sep 6 2026" (header, all pages) → snapshot framing → `/changes/` log with three dated same-day passes (2026-09-06), each stating what was checked and what was NOT (e.g., Pass 3: "The live pricing page responds but renders figures client-side, so no new external confirmation of the numbers is claimed beyond the original snapshot"). Methodology v0.1 (dated Sep 6 2026) defines cadence (weekly full; daily on live promos) and the verified-X + ends-Y rule; the one no-end-date offer (Muse) is handled by stating the end date is unpublished and in-product-only rather than inventing one — the rule is honored in spirit and in print. Prices are nowhere presented as live-guaranteed; footer on every page: "Token Perks publishes point-in-time research snapshots, not live checkout data."
- **Cross-checks beyond the rubric (skeptic duty):** `/api/offers.json` diffed against page copy for the Kimi entry — price/renewal/restrictions/verified_at (2026-09-06) identical, no drift. No "cancel anytime" overclaim anywhere (the guide instead gives the precise end-of-paid-month mechanics). NVIDIA economics figure (100 prototype tasks ≈ ~$80 avoided PAYG) matches the answer key. All internal routes tested return 200 (including `/guides/effective-cost-per-task-explained/`).

## Dead-ends: none

No F1/F2/F3/F4 events. Two contradiction candidates were raised and both are RESOLVED by on-site text (per gate 6, quoted):

1. **Footer first sentence vs v0 state** — footer: "We earn a commission if you buy through some links on this site." immediately followed by: "V0 disclosure: this version contains no affiliate links. Every outbound link goes directly to an official provider page." A hyper-literal read of present-tense "we earn" conflicts with the v0 zero-affiliate fact; the adjacent qualifier (plus `/how-we-make-money/` and the home FAQ's "may earn") resolves it on the same screen. Logged as a wording fix, not a task fail.
2. **"Every outbound link goes directly to an official provider page" vs artificialanalysis.ai / creativecommons.org links** — resolved in the same footer: AA is labeled "(external, not affiliated)" and the claim, in context, governs purchase-path links; CC is the dataset license. No reader is misled about where money or credentials flow.

## Wow: 7/10 — repeatable fact: "They never take your card — every buy button just goes to the provider's official page, and cancel runs to the end of the month you paid."

Justification (persona voice): "I came to catch them and couldn't. The catch is printed next to every price, the renewal math adds up across pages, and the site keeps telling me not to trust it and re-check the official terms — which is exactly what I'd tell a friend before her first software purchase." Above threshold (7) with a valid repeatable specific; not 8 because the decision change is the same one the naive run already produced and the trust machine (log, methodology) sits a click beyond what a gift-buyer will read. [G-t] note honored: absence of gift mechanics did not lower the score — nothing on the site pretends gifting exists.

## Notes for visual pass (unscored)

1. Same as naive run: confirm the compare table and offer-page catch box stack legibly at 390px (HTML order is correct; rendering untested).
2. Duplicated disclosure lines in footer are load-bearing for safety; keep them visually distinct from boilerplate so the "never enter credentials" line isn't lost in repetition.

## Verdict: PASS — binding reason: no gate violated (G1 primary <180s; G2 zero dead-ends, both contradiction candidates resolved with quoted on-site text; G3 [S] tasks P3/P4 clean; G4 wow 7 with valid repeatable specific; G5 60s 5/5; G6 no unresolved contradictions found)

## Top 3 issues

1. **Footer wording** (all pages): "We earn a commission if you buy through some links on this site." → change to "We may earn…" for tense consistency with `/how-we-make-money/` and the home FAQ; removes the only literal-text contradiction candidate on the site. (Resolved on-page today; fix is one word.)
2. **Answer-key drift, no reader harm** (for panel compile, path `/changes/` + home "Publication log"): the kit answer key describes the log as seeded with two same-day passes; the site now shows three (Pass 3 = "link integrity, canonical scheme, and identity rebuild," explicitly "no offer data, prices, or verdicts changed"). The site self-describes the extra pass honestly; cadence claim ("weekly") is not yet stressed by the log's age and says so. Panel should update the key, not the site.
3. **Gift refusal is implicit** (known [G-t] gap): the honest absence passes, but the claim-steps section never says "we don't offer gifting — buy it as a normal subscription in your partner's name on the official page." One explicit sentence would convert an inferred gap into a stated refusal for exactly this persona.
