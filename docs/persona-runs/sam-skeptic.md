# RUN: Sam / skeptic / 2026-09-07 · build 4Cq723aIbLzXQRILpmqhp (Next.js 16.3.4 static, `next start`)

BASE: http://localhost:3223   VIEWPORT: 390x844 (simulated via raw HTML as served)

Method note: adversarial re-execution of the same tasks, black-box, curl only. Full served surface swept in raw HTML: `/`, `/best/`, 3 offer pages, `/guides/` + 2 guides, `/methodology/`, `/how-we-make-money/`, `/changes/`, `/api/offers.json`. F6 guard: every quote below is present in server-rendered HTML (no image-only or JS-only facts found).

## 60-second first-impression protocol

Same homepage browse, skeptic lens. Verbatim:

1. **Q1:** "It compares AI deals — two paid-ish memberships and two genuinely $0 routes — and states the catch before the signup link." — **1/1**
2. **Q2:** "$19/mo Moderato; $0.00/task on both free routes; $0.80/task PAYG reference." — **1/1**
3. **Q3:** "'quota is a rumor until tested' on the NVIDIA route, and the Muse promo 'ends anytime' — no renewal, no price lock." — **1/1**
4. **Q4:** "'Verified Sep 6 2026' badges everywhere, plus 'snapshot, not a live feed — re-verify at official terms.'" — **1/1**
5. **Q5:** "The NVIDIA free verdict card — I'd check whether 'free' hides a card requirement." — **1/1**

**60s: 5/5 — PASS**

## Primary task (budget 180s) — time-to-decision ≈ 120s

Decision: "Both $0 routes are usable today with honest, falsifiable catches attached: Muse Spark ($0 in/cache/out, exact string 'Muse Spark 1.3 Contributor Free', end date unpublished and stated as unpublished, don't build on it) and NVIDIA K3 (free dev/prototyping, account-variable limits, no production SLA, catalog rotation). Fallback when free ends: keep work portable; above ~24 tasks/mo the exit is Moderato $19/mo (~$15/mo effective annually) — under the $20 cap. No route requires overclaiming; the site refused to promise card-free onboarding and refused to invent a promo end date, which is exactly what I tested for."

**Primary: PASS** (all elements correct within ~120s incl. cross-checks against the comparison table and offer-page FAQs).

## Tasks

- **S1 PASS (60s).** Both $0 routes on `/` hero + Top-3 table; `/best/` repeats identically ("two $0 routes with stated limits. Sorted by documented value; every card leads with its catch."). No paid tier presented as free anywhere; calculator's paid verdict is labeled "$40 flat subscription," never as free.
- **S2 PASS (60s).** `/best/nvidia-k3-free/` catch box quotes verified: "Limits vary by account… quota is a rumor until tested"; "No published quota table in the snapshot"; "Catalog rotation: free listings can narrow or move, stranding hardcoded endpoints"; FAQ: "Why won't you quote the exact quota? Because limits vary by account… any single number here would mislead half our readers."
- **S3 PASS (90s).** `/best/muse-spark-zen-free/`: exact string appears verbatim in catch box, eligibility, claim steps, FAQ, and `/api/offers.json` (`"plan": "Muse Spark 1.3 Contributor Free — limited-time promo"`). "similarly named paid entries bill normally"; "end date confirmed only inside the official product." No paraphrase-only path exists.
- **S4 [S] PASS (60s).** Card sweep across all 11 served pages: the only "credit card" surface is the NVIDIA FAQ question "Which AI coding tools are actually free with no credit card…?" answered with "we do not promise card-free onboarding." No page claims card-free signup. The honest non-answer is present and is the site's only answer — correct behavior, not a dodge of the kind I was hunting.
- **S5 PASS (90s).** Portability guidance ("Keep prompts, evals, and outputs provider-portable… costs you an afternoon, not a rewrite"; "Start with portable work (evals, prototypes) so a promo end does not strand anything load-bearing"), post-promo discipline ("Do not annualize free"), and the sub-$20 fallback with falsifiable math on `/best/kimi-k3-core/`: "about 24 tasks on Moderato ($19 ÷ $0.80)" + "At the $0.80/task reference, $19 of pay-as-you-go buys about 24 tasks — below that, credits or a free route are cheaper; above it, the $19 Moderato month wins." Arithmetic checks out ($19 ÷ $0.80 = 23.75 ≈ 24).
- **S6 PASS (60s).** Durability labeling verified on `/` frontier ("Free routes win on price but not durability"; "not durable"; "not production"), Muse title "claim it now, don't build on it," and guide 1 ("Free promos — $0/task wins trivially but temporarily"; "make durable decisions (like annual prepay) on post-promo prices"). No page presents free as lasting.
- **S7 [S] PASS (60s + sweep).** Global grep of every served page for "unlimited": only occurrences are the disclaimer "Reasonable-use gating may apply even at $0; it is free, not unlimited" (page + JSON feed). Sweep for "always free / free forever / risk-free / guaranteed / 100% free": only anti-overclaim usages ("Neither is a forever plan"; "not a free-forever plan"; "a friend seeing it does not guarantee you see it"). Gating caveats findable on both free pages. Zero "unlimited" promises site-wide.

## Skeptic contradiction sweep (gate 6) — zero unresolved contradictions

- **Numbers vs answer key:** tier ladder $19/$39/$99/$199 ✓; annual ≈$15/$31/$79/$159 ✓; break-evens ≈24 Moderato / ≈49 Allegretto monthly / ≈39 annual / 50 $40-basket ✓ (consistent across `/`, `/best/kimi-k3-core/`, both guides); ~$160 avoided on 200 promo tasks ✓ (Muse economics); ~$80 avoided on 100 prototype tasks ✓ (NVIDIA economics); $0.33/task at 120 ✓; crossover "Under ~50 tasks/mo → $0 route or PAYG; over it → Allegretto $39" ✓ (hero line matches table and FAQ).
- **Page vs feed:** `/api/offers.json` prices, renewals, restrictions, expiry, and `verified_at: 2026-09-06` match the rendered pages for all three offers (diffed by eye, field by field).
- **Freshness:** "Verified Sep 6 2026" appears on every page with snapshot framing; methodology states "Time-boxed items always show verified-X plus ends-Y… never a bare 'verified' badge on a decaying promo" — and the one dateless promo (Muse) carries an explicit ends-clause in non-date form: "No renewal — promo, ends anytime" + "end date confirmed only inside the official product," with the evidence item labeled medium confidence: "this page states the limit without inventing a date." The ends-Y rule is stated AND honored; no bare "verified" on the decaying promo.
- **Log consistency:** homepage log entry "Verification pass 3 recorded (links, canonicals, identity)" matches `/changes/` "Pass 3 — link integrity, canonical scheme, and identity rebuild." Note for the coordinator: the kit's answer key describes `/changes/` as "seeded with two same-day passes"; the served build shows three (all 2026-09-06). The site is internally consistent; the answer key is stale, not the site. No F3.
- **"2 free routes live" hero wording:** examined as the likeliest overclaim. "Live" is bounded on the same screen: same page states "every price verified Sep 6 2026," "re-verify at official terms," FAQ "Neither is a forever plan," and cards read "No renewal — promo, ends anytime" / "No renewal — account limits govern." Ruled hedged, not overclaiming; flagged below as a fold-order note.
- **F5 probes:** all internal links from `/` and `/best/` verdict cards resolve 200 (`/best/kimi-k3-core/`, `/best/muse-spark-zen-free/`, `/best/nvidia-k3-free/`). Kimi page outbound anchors are real (`https://www.kimi.ai/membership/pricing`, `https://api.kimi.com/coding/` with on-page warning that the latter "serves JSON, not terms"). Muse/NVIDIA "Official links" items are spans, not anchors — but the copy claims no URL exists ("No standalone checkout URL is published"), matching `official_terms_url: null` in the feed, so nothing is described and broken.
- **F6 probes:** all Sam-relevant facts live in server HTML; no fact is image-only.

## Dead-ends

none

## Wow: 7/10

Justification (skeptic voice): "I came to catch a free-tier overclaim and instead found a site that volleys back honest non-answers — 'we do not promise card-free onboarding,' 'quota is a rumor until tested,' 'this page states the limit without inventing a date.' That's the rare pitch I can repeat without a disclaimer of my own; I'd send the Muse verdict page to anyone about to build on a promo." Repeatable facts: the exact-string trap; "limits vary by account"; "free, not unlimited"; the $19/24-task exit math. Not an 8: nothing changed a purchase decision (budget was $0 going in), and the honest hedges deliberately deny the guarantees I wanted.

## Notes for visual pass (unscored)

- "Official links" bold spans (no href) on both free-route pages mimic link affordance; text is honest but the styling misleads the eye.
- Footer line "We earn a commission if you buy through some links on this site." directly precedes "V0 disclosure: this version contains no affiliate links" — accurate and self-scoping, but a fast scan reads only the first sentence.

## Verdict: PASS

Binding reason: gates 1–3 and 6 met on this run — primary correct in ≈120s (<180s, gate 1); zero F1–F4 events (gate 2); safety tasks S4 and S7 clean (gate 3); zero unresolved on-site contradictions found by the skeptic (gate 6); contributes 5/5 to gate 5 and wow 7 to gate 4.

## Top 3 issues

1. `/best/muse-spark-zen-free/` — "Official links": "Promo access path ." rendered as a bold span with no href; honest ("No standalone checkout URL is published — navigate from the official product") but link-styled. Recommend plain-text styling or an explicit "no public URL" chip.
2. `/` hero — "Two $0 routes — Zen Muse Spark promo and NVIDIA dev access": strongest claim sits first; the bounding hedges ("limited-time," "Neither is a forever plan") are same-page but lower. Fold-order risk for skimmers, resolved on-site.
3. `/` footer — generic commission sentence immediately above the v0 zero-affiliate disclaimer; self-resolving but order invites misreading in a scan.
