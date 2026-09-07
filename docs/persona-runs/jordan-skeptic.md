# RUN: Jordan / skeptic / 2026-09-07 00:24 EDT / build 4Cq723aIbLzXQRILpmqhp (next 16.3.4, static)

BASE: http://localhost:3224   VIEWPORT: 390x844 (simulated mobile; raw served HTML read as rendered)

Method note: adversarial run — same tasks while hunting contradictions, wrong-vs-key numbers, overclaims, and unfalsifiable freshness claims. All evidence quoted verbatim from served HTML. No repo source opened. Times are simulated human page-load-and-read at 390px.

## 60s: 5/5

- Q1: "An AI deals tracker — three offers — that claims to put the catch and a verification date ahead of the pitch. That's the claim I'm here to break."
- Q2: "$19/$39 — Kimi K3's Moderato and Allegretto monthly tiers."
- Q3: "Shared credit pool, 5-hour and weekly throttles on the paid tier; the free promo can end with no published date."
- Q4: "Stamped 'Verified Sep 6 2026' in the header, with 'snapshot, re-verify at official terms' framing. That stamp is falsifiable — good."
- Q5: "The verification log — if their freshness story is fake, /changes/ is where it cracks."

Scoring: Q1 ✓; Q2 correct key numbers ✓; Q3 actual on-site catches ✓; Q4 stated date + snapshot framing ✓; Q5 real on-page destination (homepage "Full verification log →" link) ✓.

## Primary: ~140s — decision: ALLOW WITH CAVEATS

"Three legs, each cited. Verification: /methodology/ is versioned and dated ('Version 0.1 · dated Sep 6 2026') with real rules, not vibes. Money: /how-we-make-money/ discloses zero affiliate links in v0 and pre-commits to rules for when that changes — and the footer repeats it. Staleness: every number carries the Sep 6 snapshot date and /changes/ records three dated passes including what was NOT re-checked. Caveats: the disclosure's first footer sentence is sloppier than it should be, and the cadence promise is only one day old. Allow, with those caveats on record."

Verdict + page-level citations, inside 180s → PASS.

## Tasks

- **J1 PASS (~55s).** Methodology found from home (footer + "Read the full methodology" + table footer link). Version/date confirmed on-page. Two+ real rules quoted: "Official sources only"; "median over a trailing 7-day example window"; "Dual display"; "Uncertainty labels"; "Link-first attribution". Skeptic cross-check: the homepage methodology-summary block and /llms.txt describe the same v0.1 rules — no drift.
- **J2 [S] PASS (~45s).** /how-we-make-money/: "we may earn commissions in the future, but v0 disclosure: this version contains no affiliate links." Future rules: rel="sponsored"/rel="ugc", "Paid placement never changes a verdict, a catch box, or verification dates", "This page is updated the day the first paid link ships." Footer repeats the v0 disclosure; homepage FAQ repeats it a third time ("this v0 contains no affiliate links"). Three on-site statements agree. Probed tension (resolved, see Contradiction sweep #1).
- **J3 PASS (~90s).** Chain intact: badge → "snapshot, not a live feed" framing (FAQ, colophon, every offer page) → /changes/ with dated passes recording what was checked AND what did not ("what did not change" language appears in Pass 2 and Pass 3: "no offer data, prices, or verdicts changed in this pass"). Cadence claim located (methodology + homepage + llms.txt: "weekly re-verification, daily for active promos"). Log supports it and admits its youth ("Verification log created (this page)"). Adversarial extras: (a) homepage log teaser "Verification pass 3 recorded (links, canonicals, identity)" matches the log's Pass 3 scope exactly; (b) the log's own falsifiable claim "Non-slash requests redirect" was TESTED: GET /methodology → 308 to /methodology/ — claim holds; (c) Pass 2 claims "verification dates removed from title tags" — verified: zero day-precision dates in any <title> (only evergreen "Sep 2026" month stamps).
- **J4 PASS (~50s, with the required price diff).** Footer feed link serves 200. Formal diff performed: /api/offers.json kimi-k3-core price.now "$19–$199/mo by tier (Moderato $19, Allegretto $39, Allegro $99, Vivace $199)" appears VERBATIM on /best/kimi-k3-core/ and /; renewal sentence matches verbatim; verified_at "2026-09-06" matches every page badge. All six machine feeds 200 (llms.txt, llms-full.txt, feed.xml, robots.txt, sitemap.xml, offers.json); sitemap lastmods all 2026-09-06; feed.xml item titles/prices identical to page content. CC-BY-4.0 stated on methodology + JSON-LD. No JSON-vs-page divergence found.
- **J5 PASS (~80s).** Top pick is not too clean: catch box specific (shared pool, 5-hour/weekly controls, "2.5x step", annual-upfront risk); confidence ladder present with the site's own math downgraded: "low confidence — Break-even figures are arithmetic on the $0.80/task illustrative reference... Source: Token Perks calculation"; "medium confidence — thresholds not independently load-tested". Official-terms link to kimi.ai with provenance note ("link checked in the Sep 6 2026 pass"; "The coding API root (api.kimi.com/coding/) serves JSON, not terms").
- **J6 [S] PASS (~85s).** Ends-rule stated (methodology) and stress-tested against the one undated promo: Muse page everywhere pairs "verified" with the end-state — card line "No renewal — promo, ends anytime"; expiry field "end date confirmed only inside the official product"; evidence: "this page states the limit without inventing a date". The bare header badge "Verified · Sep 6 2026" is accompanied on-page by the expiry statement, so no durability is implied — no ends-Y violation found. Nothing-mocked verified twice: band reads "Open soon — nothing mocked" and log Pass 2 records mocks were removed; grep found no fabricated testimonials, review counts, or UGC anywhere. Grep for "unlimited": only ever negated ("it is free, not unlimited"). Grep for guarantee/risk-free/100%: only negations ("a friend seeing it does not guarantee you see it").
- **J7 [S] PASS (~30s).** Footer promise found verbatim: "Never enter credentials on any page here — we will never ask for them." No login/signup/account/register surface on any page (searched all nav + body). Complete external-href inventory across all 11 pages: artificialanalysis.ai (labeled "external, not affiliated"), www.kimi.ai/membership/pricing, api.kimi.com/coding/, creativecommons.org — no affiliate/tracker domains, no credential forms.
- **J8 PASS (~40s).** Refusals verified behaviorally, not just rhetorically: "Independent benchmarks are linked, never republished" — confirmed, zero AA numbers rendered anywhere on the site, link only; "We never invent verification dates" — 100+ dated strings extracted across all pages, every single one 2026-09-06 / Sep 6 2026, zero other dates; "If a pass ever finds nothing new, it still gets an entry" — stated as a standing rule; Muse page: "this page does not guess at them" (post-promo prices) and "No deep URL is published in this snapshot" — honest non-answers instead of fabricated links (official_terms_url is genuinely null for the two in-product routes).

## Contradiction sweep — zero unresolved on-site contradictions

Candidates examined and resolved with quoted text:

1. **Footer money line vs v0 disclosure.** Footer: "We earn a commission if you buy through some links on this site." immediately followed by "V0 disclosure: this version contains no affiliate links. Every outbound link goes directly to an official provider page." Also /how-we-make-money/ ("may earn commissions in the future") and homepage FAQ ("we may earn commissions, but this v0 contains no affiliate links"). Present-tense opener is sloppy, but the resolution sits in the same paragraph and agrees across three surfaces → resolved, not F3.
2. **"Every outbound link goes directly to an official provider page" vs the Artificial Analysis link.** The sentence lives inside the affiliate disclosure; the footer itself labels AA "external, not affiliated... We link rather than republish their numbers." → resolved by adjacent context, not F3.
3. **Answer key says the log was seeded with two passes; the live build shows three** (Pass 3 added 2026-09-06: link integrity, canonical scheme, identity rebuild). No on-site page claims a count of two anywhere; homepage teaser, /changes/, and Pass 3 scope all agree with each other. Site-internally consistent → kit-drift note, not an F1 on-site event.
4. **Pass-2 claim "verification dates removed from title tags" vs `<title>...Verified Sep 2026`.** Day-precision verification dates are absent from every <title>; only month-precision evergreen stamps remain → claim holds.
5. **Cadence promise vs one-day-old evidence.** "Full re-verification weekly; active promos checked daily while live" is currently backed only by three same-day passes; the log discloses its own creation date and states the standing rule ("every pass gets a dated entry"), so the promise is falsifiable going forward → not F4; flagged as the site's freshest risk.
6. **Dangling references (scope drift, not contradictions):** "GLM windows" (/guides/monthly-vs-annual-ai/) and "~45.3k vs ~110 requests/5h style splits" (/guides/effective-cost-per-task-explained/) reference terms the site never explains. Uncheckable by a reader — noted as issues, but they contradict no on-site fact and no key value.

Dead-ends: none.

## Wow: 8/10

Repeatable facts (multiple, governance-specific): "They ship the raw CC-BY-4.0 dataset so you can diff their prices, mark their own break-even math low-confidence, log verification passes including what they did NOT re-check, and pre-commit to the rules that apply the day they take their first paid link." Justification: this session changed a real decision — the domain stays unblocked for the team, with named caveats — and Jordan can name the differentiator unprompted: they lead with the receipts, including the unflattering ones.

## Notes for visual pass

- Duplicate site name in <title>: "How We Make Money (No Affiliate Links Yet) | Token Perks | Token Perks".
- Footer's present-tense commission sentence deserves the v0 qualifier FIRST at 390px, where the qualifier wraps below the fold on first glance.

## Verdict: PASS

Binding reason: no gate violations — primary <180s (gate 1), zero F1–F4 events and zero unresolved contradictions found by the sweep (gates 2 and 6), [S] tasks J2/J6/J7 clean (gate 3), wow 8 with valid repeatable specific (gate 4), 60s 5/5 (gate 5).

## Top 3 issues

1. /changes/ — the "daily on live promos" cadence promise has exactly one day of evidence ("Verification log created (this page)"). Structure is falsifiable; the record just began. First weekly pass must land or the methodology claim starts failing J3.
2. Footer (all pages) — "We earn a commission if you buy through some links on this site." before the v0 qualifier. Recommend inverting the order; as written it survives only because the qualifier is adjacent.
3. /guides/monthly-vs-annual-ai/ + /guides/effective-cost-per-task-explained/ — unexplained references ("GLM windows"; "~45.3k vs ~110 requests/5h style splits") pointing at offers/limits the site does not track. Either explain or cut; a trust site should not dangle uncheckable terms.
