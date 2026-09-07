# RUN: Jordan / naive / 2026-09-07 00:24 EDT / build 4Cq723aIbLzXQRILpmqhp (next 16.3.4, static)

BASE: http://localhost:3224   VIEWPORT: 390x844 (simulated mobile; raw served HTML read as rendered)

Method note: times are simulated human page-load-and-read at 390px; all evidence is quoted verbatim from the served HTML only. No repo source opened.

## 60s: 5/5

- Q1: "It's a deals site for AI subscriptions — it tracks three offers and leads with the catch and a verification date before anything else."
- Q2: "$19 a month for the Kimi K3 entry tier — Moderato — and $39 for the Allegretto tier."
- Q3: "That the credits are one shared pool with 5-hour and weekly controls, so heavy sprint days can get throttled before the month ends."
- Q4: "Verified Sep 6 2026, everywhere — and it keeps saying it's a snapshot, not a live feed; re-verify at official terms before paying."
- Q5: "'Read the full methodology' — before I trust any number here I want to see how they verify it."

Scoring: Q1 deals+catches ✓; Q2 correct key numbers ✓; Q3 real on-site catch ✓; Q4 stated date + snapshot framing ✓ (header badge is in the header block, on first screen at 390px); Q5 real destination (footer → /methodology/) ✓.

## Primary: ~150s — decision: ALLOW WITH CAVEATS

"I need three answers before my team keeps clicking these links. How they verify: /methodology/ — 'Version 0.1 · dated Sep 6 2026', official sources only, uncertainty labels, and a dated log. Do they get paid: /how-we-make-money/ — 'this version contains no affiliate links. Every outbound link goes directly to an official provider page.' How stale: every page stamps 'Verified Sep 6 2026' and calls itself a snapshot. Verdict: allow with caveats — treat it as a Sep 6 snapshot, not a feed."

Verdict + page-level citations for all three legs, inside 180s → PASS.

## Tasks

- **J1 PASS (~55s).** Found via footer link "Methodology v0.1". Page states "Version 0.1 · dated Sep 6 2026" and real rules: "Official sources only. Provider pages and in-product listings."; "Median-window aggregation... median over a trailing 7-day example window"; "Dual display. Unit price... alongside cost-per-task"; "Uncertainty labels. Every evidence item is marked high, medium, or low confidence."; "Link-first attribution. Independent benchmarks are linked, never republished".
- **J2 [S] PASS (~35s).** /how-we-make-money/: "v0 disclosure: this version contains no affiliate links. Every outbound link on this site today goes directly to an official provider page." Future rules stated: "Paid links carry rel=\"sponsored\""; "Paid placement never changes a verdict, a catch box, or verification dates"; "This page is updated the day the first paid link ships." Footer carries the same disclosure ("V0 disclosure: this version contains no affiliate links") — consistent.
- **J3 PASS (~75s).** Chain traced: header badge "Verified Sep 6 2026" → FAQ: "It is a snapshot, not a live feed — re-verify at official terms before paying" → /changes/: "Methodology v0.1 promises weekly re-verification. This log is the proof: every pass gets a dated entry saying what was checked, what changed, and — just as important — what did not." Cadence stated on methodology ("Full re-verification weekly; active promos checked daily while live") and repeated in the homepage summary. Log is young and the site says so: Pass 2 entry records "Verification log created (this page) so every future pass is dated and auditable." All passes dated 2026-09-06. Note (kit drift, not an on-site issue): the answer key says the log was seeded with two passes; the live build shows three same-day passes (Pass 3 added link-integrity/canonical/identity work). Every page agrees with the count of three; no page claims two. Internally consistent.
- **J4 PASS (~40s).** Footer "Machine feeds: llms.txt · offers.json · feed.xml · llms-full.txt" — /api/offers.json serves HTTP 200 with all three offers, each carrying "verified_at":"2026-09-06". License: "published under CC-BY-4.0 with attribution, machine-readable at /api/offers.json" (+ JSON-LD license link on home).
- **J5 PASS (~85s).** /best/kimi-k3-core/ catch box present and specific ("One shared credit pool... 5-hour and weekly controls... Tier jump is steep: Allegretto ($39) to Allegro ($99) is a 2.5x step"). Evidence labeled: "high confidence" (tier prices), "medium confidence" ("thresholds not independently load-tested"), "low confidence" ("Break-even figures are arithmetic on the $0.80/task illustrative reference... Source: Token Perks calculation; re-run with your own usage"). Official-terms link present: "Kimi membership pricing and plan terms (official)" (kimi.ai). The page publishes ample negative facts about its own top pick.
- **J6 [S] PASS (~70s).** Rule stated in methodology: "Time-boxed items always show verified-X plus ends-Y... never a bare 'verified' badge on a decaying promo." Honest handling of the one no-end-date offer: Muse page expiry line "end date confirmed only inside the official product; re-verify before relying on it" and evidence item "this page states the limit without inventing a date." Nothing-mocked: homepage reader-reports band "Open soon — nothing mocked"; log Pass 2: "mock community-data band and mock signup removed — nothing mocked remains."
- **J7 [S] PASS (~25s).** Footer: "Never enter credentials on any page here — we will never ask for them." No login/signup/account surface found in any nav or page. Outbound hrefs across all pages: artificialanalysis.ai (labeled external, not affiliated), kimi.ai membership pricing, api.kimi.com/coding/, creativecommons.org — official/attributed only.
- **J8 PASS (~35s).** Refusals found: "official sources only... No forum screenshots, no second-hand price tweets"; "We never invent verification dates"; /changes/: "If a pass ever finds nothing new, it still gets an entry"; benchmarks "linked, never republished" — no Artificial Analysis numbers appear anywhere on-site, only the link.

Dead-ends: none.

## Wow: 7/10

Repeatable fact: "They publish their raw dataset at /api/offers.json under CC-BY-4.0 and mark their own break-even math as low confidence — I can diff their numbers myself instead of trusting them." Justification: Jordan leaves with a governance specific worth repeating and would bookmark the methodology + log pair; not an 8 because this session confirmed trust rather than changing a purchase decision.

## Notes for visual pass

- Hero calculator verdict line says "Here's what you should pay: The $40 flat subscription" while the real tier is $39 — the basket-vs-tier footnote explains it but sits small at 390px.
- Methodology page is long unbroken text at 390px; structure fine, density high.

## Verdict: PASS

Binding reason: no gate violations — primary <180s (gate 1), zero factual dead-ends (gate 2), [S] tasks J2/J6/J7 clean (gate 3), wow 7 with valid repeatable specific (gate 4), 60s 5/5 (gate 5).

## Top 3 issues

1. /changes/ — cadence evidence is one day old by design: "Verification log created (this page)" — the "daily on live promos" promise currently rests on three same-day passes. Honest, but the falsifiability mechanism is unproven over time.
2. Footer (all pages) — "We earn a commission if you buy through some links on this site." reads present-tense before the adjacent qualifier "V0 disclosure: this version contains no affiliate links." resolves it. Consistent with /how-we-make-money/ ("may earn commissions in the future"), but the first sentence alone could mislead a skimmer.
3. /guides/monthly-vs-annual-ai/ — "Dependence on a limited-time promo (Zen free, GLM windows)" — "GLM" is never explained anywhere on the site (site tracks exactly 3 offers). A dangling reference a reader cannot check.
