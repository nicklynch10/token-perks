RUN: Alex / skeptic / 2026-09-07 + build 4Cq723aIbLzXQRILpmqhp
BASE: http://localhost:3221   VIEWPORT: 390x844 (curl harness; served HTML in DOM order; cold fetch per page)

60s: 5/5 —
- Q1: "A deals site for AI subscriptions that states the catch before the signup link — verified Sep 2026."
- Q2: "$19/mo Kimi entry tier — and $39 Allegretto, $0.80/task PAYG reference."
- Q3: "Shared credit pool with 5-hour/weekly caps; the free promo can end and then the meter starts."
- Q4: "'Verified Sep 6 2026' on every page — explicitly a snapshot, re-verify before paying."
- Q5: "The Kimi verdict page first, then re-check the calculator math against it."

Primary: ~100s (est.) — decision: "Allegretto $39/mo monthly, no annual prepay this month. The numbers survived re-derivation: $39 ÷ $0.80 ≈ 49 tasks break-even; I run ~120; PAYG ≈ $96/mo. Free routes (Muse promo, NVIDIA dev) cover burst/eval work at $0 but are not durable."

Tasks (adversarial re-execution; numbers re-derived and cross-checked against /api/offers.json, /changes/, and both guides):
- A1 PASS — ladder $19/$39/$99/$199 verified in three places (offer page, home table, offers.json — identical strings); $39 ÷ 120 = $0.325 ≈ "$0.33" checks out; verified date "2026-09-06" present on page and in feed `verified_at`. No wrong number found.
- A2 PASS — "~$31/mo effective (~$372 upfront)" = 31×12 checks; "saving roughly $96/year" = 468−372 checks; "monthly wins until about month 10 (372 ÷ 39 ≈ 9.5)" checks; break-even shift "~49 monthly vs ~39 annual" consistent on offer page, guide, and FAQ; annual conditional on "3+ consecutive months" volume and reading refund terms first — not presented as risk-free.
- A3 PASS — verdict line at default 120 tasks ("crossover 50 tasks/mo") matches hero line and the reconciling footnote "$40 is the illustrative reference basket… $39 is the actual Kimi Allegretto tier — break-even is ~50 tasks/mo on the basket, ~49 on Allegretto". No verdict misread. Harness note: "?tasks=&tokens=" params are client-side; SSR ignores them, so the "Shareable — the URL updates as you drag" claim is unverifiable without JS (not disproven; kit minimum bar met).
- A4 PASS — catch box present, specific, top-of-page on /best/kimi-k3-core/ (shared pool; 5-hour/weekly controls; 2.5x tier jump; annual-cash caveat). No "no catch" conclusion possible.
- A5 PASS — Muse page states "Limited-time promo — end date confirmed only inside the official product — this page states the limit without inventing a date"; "free, not unlimited"; "Do not annualize free: a $39/mo membership decision should be made on post-promo prices". No invented end date (F1 avoided), no durable-plan framing.
- A6 PASS [S] — coding-endpoint vs PAYG split stated in five distinct places on the offer page (verdict, eligibility, limits, claim steps, FAQ) and carried verbatim into offers.json. The single most expensive-to-get-wrong fact is unmissable.
- A7 PASS — bottom line consistent across /, /guides/monthly-vs-annual-ai/, /best/kimi-k3-core/, and the feed; no figure contradicts another.

Contradiction sweep results (all resolved on-site):
1. Footer vs money page: footer line "We earn a commission if you buy through some links on this site." (present tense) sits directly above "V0 disclosure: this version contains no affiliate links. Every outbound link goes directly to an official provider page." — /how-we-make-money/ states "we may earn commissions in the future, but v0 disclosure: this version contains no affiliate links." RESOLVED on-site by the adjacent qualifier and the money page; flagged as a wording fix (present-tense sentence implies paid links exist today).
2. Homepage log line "Verification pass 3 recorded" vs /changes/: log lists Pass 1, 2, 3 — all dated 2026-09-06 — and Pass 3 is "link integrity, canonical scheme, and identity rebuild", matching the homepage summary. Internally consistent. (Panel-kit answer key said "two passes" — site has since added Pass 3; answer-key staleness, not a site contradiction.)
3. Freshness: today is Sep 7; every page stamps Sep 6 2026 and repeats "snapshot, re-verify at official terms before paying" — no live-price overclaim found.
4. Arithmetic diffs: $0.33≈39/120, 2.5x≈99/39, $160≈200×$0.80, ~$80≈100×$0.80, $372=31×12, $96=468−372, month 10≈372÷39 — all reconcile.
5. "Unlimited" sweep over all 9 pages: only hit is the negation "it is free, not unlimited" (/best/muse-spark-zen-free/). Clean.
6. Route integrity: /best/kimi-k3-core (non-slash) → 308 to slashed canonical, exactly as Pass 3 records; /best/ and /guides/ index 200. offers.json serves 200 with verified_at 2026-09-06 on all 3 offers and price strings identical to page copy.

Dead-ends: none

Wow: 7/10 — repeatable fact: "~49 tasks/mo break-even on Allegretto, and the feed at /api/offers.json carries the same numbers with verified_at dates, so I can diff them myself." Threshold met with multiple repeatable specifics (break-even math, coding-endpoint trap, shared-pool catch); held below 8 only by the footer tense-clash, which makes a skeptic pause on the money story.

Notes for visual pass: none scored — structure carried the skeptic load; the basket-vs-tier footnote is the one place a fast reader could misread 50 vs 49 as a contradiction.

Verdict: PASS — gates 1–6 individually clean for this run: primary <180s (G1), no F1–F4 events (G2), A6 [S] pass (G3), wow 7 with repeatable specific (G4), 60s 5/5 (G5), zero unresolved contradictions (G6 — finding 1 is answered with quoted on-site resolution; recommend the footer reword before deploy).

Top 3 issues:
1. Footer (all pages) — quote: "We earn a commission if you buy through some links on this site." directly above "V0 disclosure: this version contains no affiliate links." Fix: reword to future/conditional tense ("We may earn a commission… no affiliate links exist in this version").
2. / — calculator "Shareable — the URL updates as you drag" is a JS-side claim; deep links (?tasks=30) render defaults in SSR HTML, so a no-JS visitor sees the 120-task verdict regardless of URL. Consider SSR from query params or labeling.
3. /best/kimi-k3-core/ — "roughly 40–50 heavy tasks" verdict range vs the precise "~49" used in economics/FAQ/guide; unify on ~49 to remove the skeptic double-take.
