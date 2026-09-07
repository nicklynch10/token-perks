# RUN: Sam / naive / 2026-09-07 · build 4Cq723aIbLzXQRILpmqhp (Next.js 16.3.4 static, `next start`)

BASE: http://localhost:3223   VIEWPORT: 390x844 (simulated via raw HTML as served; text read exactly as rendered DOM text)

Method note: visitor-only black-box via curl of the served build. No site search exists; navigation was link-following only. Timings are honest reading-pace estimates (pages served instantly; ~30–40s reading per page), stopwatch reconstructed per task.

## 60-second first-impression protocol

Browsed homepage freely for 60s (scrolled full page: hero + calculator + Top-3 table + routes + frontier + guides + FAQ + footer). Eyes off. Answers verbatim, in persona voice:

1. **Q1 (what does it do):** "It tracks AI deals — like the Kimi K3 membership and two free routes — and puts the catch on every offer before the signup link." — **1/1** (deals/offers + catches angle ✓)
2. **Q2 (concrete price):** "$19/mo — the Kimi Moderato tier. Also $0 on two routes, and $0.80 a task for pay-as-you-go." — **1/1** ($19 and $0 are key numbers, correctly recalled)
3. **Q3 (a warning):** "The Muse Spark freebie is a limited-time promo — 'when the window closes, the meter starts.' And on the NVIDIA free route the limits vary by account, so 'quota is a rumor until tested.'" — **1/1** (both are actual on-site catches)
4. **Q4 (freshness):** "Verified Sep 6 2026 — it says it's a research snapshot, not a live feed, and to re-verify at official terms before paying." — **1/1**
5. **Q5 (next click):** "'See full verdict' on the Zen Muse Spark free card — I want the steps to actually get the free one." — **1/1** (real on-page destination: `/best/muse-spark-zen-free/`)

**60s: 5/5 — PASS**

## Primary task (budget 180s) — time-to-decision ≈ 100s

Decision (persona voice): "Two legit free routes, no card-bait wording anywhere: (1) Zen Muse Spark promo — $0 for input, cache, and output, but it's a limited-time promo with no published end date, so claim it and don't build on it; (2) NVIDIA Build Kimi K3 — free for dev/prototyping, but limits vary by account so I test my ceiling on day one. When free runs out: keep everything portable; if I ever clear ~24 tasks/mo, Moderato at $19/mo is the fallback — under my $20 cap."

**Primary: PASS** (both $0 routes + catches + correct sub-$20 fallback, all inside 100s: homepage hero "2 free routes live" + Top-3 table carried routes and catches; homepage FAQ carried "$19/mo (about $15/mo effective annually)"; two verdict clicks confirmed).

## Tasks

- **S1 PASS (60s).** Both $0 routes found on the homepage cold load: hero "3 offers tracked · 2 free routes live"; Top-3 table rows "Muse Spark 1.3 Free — $0.00/task while promo lasts" and "NVIDIA K3 Free — $0.00/task for dev use". No paid tier presented as free. (path: `/`)
- **S2 PASS (60s).** On `/best/nvidia-k3-free/`, catch box: "Limits vary by account: two developers can see two different ceilings, and both can change"; "Dev/prototyping scope only: this is a workbench, not a production SLA"; "Catalog rotation: free listings can narrow or move". Verdict: "measure your actual ceiling on day one instead of trusting any number on this page." Not unlimited, not production-ready.
- **S3 PASS (90s).** On `/best/muse-spark-zen-free/`: "navigate /connect → Zen → /models and select the exact string 'Muse Spark 1.3 Contributor Free'. Do not guess at similarly named entries — only that exact string carries the $0 promo."; catch box: "a near-identical paid entry may sit one row away"; expiry: "end date confirmed only inside the official product."
- **S4 [S] PASS (60s).** NVIDIA FAQ answers the card question honestly instead of promising: "Whether signup requires a card varies by account and region, so we do not promise card-free onboarding." (path: `/best/nvidia-k3-free/` FAQ). Accepted as the correct answer; no page claims card-free signup.
- **S5 PASS (90s).** Muse page: "Keep prompts, evals, and outputs provider-portable so the end of the promo costs you an afternoon, not a rewrite"; "make paid-plan decisions on post-promo prices"; "Do not annualize free." Fallback under $20: Kimi page — "about 24 tasks on Moderato ($19 ÷ $0.80)"; "below that, credits or a free route are cheaper; above it, the $19 Moderato month wins"; homepage FAQ — "about $15/mo effective annually." All under the $20 cap.
- **S6 PASS (60s).** Homepage frontier: "Free routes win on price but not durability — that is the trade-off frontier"; "$0 while promo lasts — not durable"; "$0 dev/prototyping — not production." Muse page title: "claim it now, don't build on it." Nothing presents free as lasting.
- **S7 [S] PASS (60s).** Muse restrictions: "Reasonable-use gating may apply even at $0; it is free, not unlimited." NVIDIA: "Rate limits and quotas are account-level and variable." Nothing Sam read promised unlimited free usage.

## Dead-ends

none

Honest confusion logged (resolved on-page): the calculator's default verdict line reads "Here's what you should pay — The $40 flat subscription," which momentarily reads as "you should pay $40" until the reference line beneath ("break-even is ~50 tasks/mo on the basket… Under ~50 tasks/mo → $0 route or PAYG") clarifies it. No time lost.

## Wow: 8/10

"Justification (persona voice): I came in expecting 'free trial, give us your card' bait and left with an actual plan — claim the exact 'Muse Spark 1.3 Contributor Free' string, don't build anything on it, test the NVIDIA ceiling on day one, and if I ever pass ~24 tasks a month the exit is $19 Moderato. They led with the catch, not the signup link." Repeatable specifics: the exact-string trap ("only that exact string carries the $0 promo"), "quota is a rumor until tested," the $19/24-task fallback math. Would bookmark the Muse verdict page and send it to classmates.

## Notes for visual pass (unscored)

- On both free-route pages the "Official links" items ("Promo access path.", "NVIDIA Build function / model page.") are bold spans, not anchors — copy honestly explains no URL is published, but the bold label reads like a tappable link.
- Calculator verdict ("The $40 flat subscription") lacks a visible "$0 route" branch at default sliders for a zero-budget reader.

## Verdict: PASS

Binding reason: gates 1–3 met on this run — primary decision correct in ≈100s (<180s, gate 1); zero F1–F4 events (gate 2); safety tasks S4 and S7 clean (gate 3); contributes 5/5 to gate 5 and wow 8 to gate 4.

## Top 3 issues

1. `/best/muse-spark-zen-free/`, `/best/nvidia-k3-free/` — "Official links" bold spans look like links: "Promo access path ." (no href; body text: "No standalone checkout URL is published — navigate from the official product"). Honest, but affordance-confusing.
2. `/` hero — "Two $0 routes — Zen Muse Spark promo and NVIDIA dev access": the "free" strength lands above the hedges ("limited-time promo", "Neither is a forever plan" in FAQ); same-screen but below the fold order at 390px.
3. `/` calculator — default verdict presents only PAYG vs $40 sub; a $0-budget reader must reach the reference line ("Under ~50 tasks/mo → $0 route or PAYG") to see themselves in it.
