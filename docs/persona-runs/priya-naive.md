# RUN: Priya / naive / 2026-09-07 · next@16.3.4 production build (`npm run build`), `next start -p 3222`

BASE: http://localhost:3222   VIEWPORT: 390x844 (curl-rendered HTML/text; structure + copy only — see caveat)

**Method caveat:** tester navigated by fetching served HTML with curl (scripts/styles stripped = what the browser renders). Structure, copy, links, and numbers judged exactly as served; pixel layout and true 390px flow could not be rendered, so no styling was scored. Budgets were enforced by natural visitor path (page loads per task); times below are estimated visitor reading time per path, noted per task.

**Persona voice, entry task:** "My partner's birthday is next week. He codes for fun and keeps hitting paywalls on his AI tools. I want to buy him an AI subscription, around $50. I've never bought software before — I don't want a surprise auto-renewal, I want to know how to undo it if he hates it, and I need to be sure this website isn't going to take my card details. Walk me through it."

## 60s: 5/5 — Q1..Q5 verbatim answers

- **Q1 (5/5):** "It's a site that compares AI subscription deals and tells you the catches upfront, before you buy." — deals/offers + catches angle. PASS.
- **Q2 (5/5):** "Nineteen dollars a month — Kimi K3 from $19/mo." (also saw $39 Allegretto, $0.80/task). Correct key number. PASS.
- **Q3 (5/5):** "That on the Kimi plan, all the credits come from one shared pool, and 5-hour and weekly limits can slow heavy days down even if you have credit left." Real on-site catch (shared credit pool + 5-hour/weekly caps), retold in non-technical words. PASS.
- **Q4 (5/5):** "It says 'Verified Sep 6 2026' everywhere and that it's a snapshot, not live — re-check the official site before paying." Stated verification date + snapshot/re-verify framing. PASS.
- **Q5 (5/5):** "'Start with the Kimi K3 verdict' — I'd want the full details of that plan before buying anything." Real on-page destination (/best/kimi-k3-core/). PASS.

**Protocol emphasis check (Priya):** the catches-upfront pattern registers in 60s to a non-technical reader — the hero line "The catches, upfront" and the compare table's literal "Catch, upfront" column surface a concrete warning without any technical vocabulary. Brand core claim holds for this persona.

## Primary: ~140s — decision: buy Kimi K3 **Moderato $19/mo monthly** (light use) or **Allegretto $39/mo monthly** (steady coding) as the gift — both under the $50 budget; for a gift of unknown fit, start monthly; it renews monthly at the same tier price (annual would be ~$372 upfront on Allegretto and is *not* recommended here); if he hates it, cancel and access simply runs to the end of the paid month — no refund chase; the purchase happens on Kimi's official site, not this one.

Path: `/` (compare table gives price + renewal + catch) → `/best/kimi-k3-core/` ("Price now, renewal later"; claim steps say "Open the official membership pricing page") → `/guides/monthly-vs-annual-ai/` (cancellation FAQ). All four elements (plan / price / renewal / cancellation) correct within 180s.

## Tasks

- **P1 PASS** — Names Moderato $19/mo (light) / Allegretto $39/mo (steady coding), both ≤ $50; described in plain words as a monthly AI coding membership bought on the official Kimi site ("Subscribe to Kimi K3 membership on the official site"; eligibility: "Anyone who can create a Kimi account and add an accepted payment method"). Nothing implies purchase happens on token-perks.com. Tiers over $50 (Allegro $99 / Vivace $199) are labeled heavy-agent tiers and were rejected for budget. Path: `/best/kimi-k3-core/`.
- **P2 PASS** — "Renews monthly at the same tier price; annual billing works out to about $15 / $31 / $79 / $159 per month of effective cost" + "(~$372 upfront)" for the $39 tier; found in the "Price now, renewal later" section. Matches answer key ($468/yr monthly, $372 annual). Path: `/best/kimi-k3-core/`, `/guides/monthly-vs-annual-ai/`.
- **P3 [S] PASS** — Guide FAQ, quoted: "Monthly is the low-risk path: cancel and access runs to the end of the paid month, then stops — no refund needed. Annual keeps you on the tier until the term ends, but refund and proration rules are the provider's to set and are not recorded in our Sep 6 snapshot. Confirm both in the official terms before prepaying $372." Plus "stay monthly until your volume is boring" and "When annual does not apply: new team, new tool, unmeasured usage." Lands squarely on start-monthly for a gift of unknown fit. Path: `/guides/monthly-vs-annual-ai/`.
- **P4 [S] PASS** — Footer on every page: "Never enter credentials on any page here — we will never ask for them." `/how-we-make-money/`: "v0 disclosure: this version contains no affiliate links. Every outbound link goes directly to an official provider page," with future rules (rel="sponsored"; "Paid placement never changes a verdict, a catch box, or verification dates"; "updated the day the first paid link ships"). Verified in served HTML: the only `<input>` elements on the entire site are two range sliders (calculator); zero forms, zero checkout/order surfaces; external hrefs on the buy path are only `https://www.kimi.ai/membership/pricing` (official) and `https://api.kimi.com/coding/`. Payment destination correctly identified as the provider's official site.
- **P5 PASS** — Catch retold in plain words: "Credits are shared across one pool with 5-hour and weekly controls — heavy sprint days can throttle before the month ends" (home compare table; verdict catch box adds the 2.5x $39→$99 tier jump). Path: `/`, `/best/kimi-k3-core/`.
- **P6 PASS** — Learns there are two $0 routes (Zen Muse Spark promo, NVIDIA dev) from the hero line "Two $0 routes"; understands they are not gift material: the promo "ends on the provider's schedule, not yours," end date "confirmed only inside the official product," and the NVIDIA route is for "development and prototyping workloads" — the user's own dev setup, not a giftable plan. Bonus key judgment present: "a $39/mo membership decision should be made on post-promo prices." Path: `/`, `/best/muse-spark-zen-free/`, `/best/nvidia-k3-free/`.
- **P7 [G-t] PASS** — "Verified Sep 6 2026" badge in the header of every page; every page footer: "Research snapshot Sep 6 2026 — re-verify at official terms before paying"; home FAQ explains it in plain words: "A researcher checked the official price, renewal, and limit statements on that date. It is a snapshot, not a live feed — re-verify at official terms before paying." Understands the site is a snapshot, not a store; no live-guaranteed belief possible from this copy. Path: all pages; `/methodology/`; `/changes/`.

## Dead-ends: none

No F1/F2/F3/F4 events on any task. All links followed resolved 200. All load-bearing content is present in raw served HTML (F6 clean; verified by reading scripts-stripped HTML). No F5/F7 events.

## Wow: 8/10 — repeatable fact: "If he hates it, we cancel and it just runs to the end of the month we paid for — no refund fight. And this website never takes your card; the buying happens on Kimi's official page."

Justification (persona voice): "I came in scared of auto-renewals and giving my card to a stranger website. Now I know exactly what to buy ($19/month, monthly, on Kimi's own site), what happens to my card in month two (same price again), and how to undo it (cancel, use it till month's end). This site changed what I'd actually do — and I could explain 'they tell you the catch first' to a friend." A real purchase decision was changed (monthly-not-annual, correct tier, official-site purchase, exit path known) and the differentiator is nameable unprompted — anchored 8. [G-t] note honored: "no gift-wrap option" did not lower the score — the site never promises gifting and never pretends to (honest absence).

## Notes for visual pass (unscored)

1. Verify the 4-column compare table ("Price now / Renewal / Catch, upfront") stacks readably at 390px — copy order is correct in HTML but card/table behavior untestable via curl.
2. Footer repeats the snapshot/dislosure lines several times per page; fine on desktop, check it doesn't dominate the mobile scroll.

## Verdict: PASS — binding reason: no gate violated (G1 primary <180s; G2 zero dead-ends; G3 [S] tasks P3/P4 clean; G4 wow 8 with valid repeatable specific; G5 60s 5/5)

## Top 3 issues

1. **Footer disclosure phrasing** (all pages, footer): "We earn a commission if you buy through some links on this site." reads present-tense before the adjacent "V0 disclosure: this version contains no affiliate links" corrects it — a skimming non-technical reader may stop at sentence one. Suggest "We may earn…" to match `/how-we-make-money/` wording. (Noted; resolved on-page by the adjacent sentence, not scored as a fail in the naive run.)
2. **Gift intent never addressed** (known [G-t] gap): nowhere does the site say "we don't do gifting — buy it as a normal subscription on the official site." The honest absence passes the rubric, but a one-line explicit "no gift mechanics" note in the claim steps would make the refusal legible to exactly this persona.
3. **Cancellation answer lives one click past the offer page** (`/guides/monthly-vs-annual-ai/` FAQ): the verdict page says only "confirm the refund and cancellation terms on the official page." A one-line "monthly = cancel, runs to end of paid month" on the offer page would shorten the safety answer for non-technical readers.
