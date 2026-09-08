# Confirmation run C4 — independent product designer (TP-first)

Site A = https://token-perks.com, Site B = https://artificialanalysis.ai. Run 2026-09-07, post V3 fix-round build.
Method: instrumented DOM/style/layout review (vision bridge down — no pixel claims, disclosed).
Verdict: **Site B preferred, moderate confidence (~65%)** — first non-TP result of the confirmation pass. Scores: A 7/10, B 8/10 (design craft). Recognition: A no, B yes.

Coordinator triage — fixes assigned for next round:
1. Compact sticky header (≤56px) — ACCEPT, cheap, addresses nav cost on long pages.
2. Mobile first-screen: lift h1 above fold + one plain value sentence ("Subscriptions can undercut per-token API pricing by 10–50x — this ranks how") — ACCEPT; echoes C1's "why care" complaint.
3. Hero charts static (no hover/tabindex) — PARTIAL: the crossover island exists; frontier scatter inspect-on-click worth adding if cheap; table underneath already carries the data.
4. /providers/ thin (422-word directory) — ACCEPT as content work (offer/pricing summaries per provider).
5. Only 2 guides — ACCEPT via wave-2 promotion (docs/content-drafts, verification-gated).
6. Duplicate title tag on one guide listing — ACCEPT, bug.
7. 39/57 tap targets <40px (filter chips 33px) — ACCEPT.
8. Bare "--" vs semantic "not published": we already have semantic states; noted as defended strength.
Judge's own words: "A beats B at the exact thing a data platform's credibility hangs on — tabular-nums aligned figures, semantic 'not published' states, and visible sourcing."

---

## Full runner report (verbatim)

I have everything needed. Here is the review.

---

# Independent Design Review — Site A (token-perks.com) vs Site B (artificialanalysis.ai)

**Method note (stated plainly):** The local vision bridge failed mid-session — screenshots arrived empty — so I did NOT eyeball pixels. To keep this honest, I switched to instrumented review: live computed-style extraction, layout metrics, tap-target measurement, overflow checks, and DOM/text analysis of the rendered pages at 1440px and 390px. Every claim below is backed by measured DOM data, not visual impression. I make no claims about things only eyes can judge (e.g., illustration quality, chart color aesthetics).

## 1. First-screen judgment (subway test)

**Site A:** H1 "The cost side of AI access, ranked", brand tagline "AI subscription offers, compared on effective cost per task", a "Verified Sep 6–7 2026" freshness chip, then immediately the "Cost vs intelligence frontier" SVG chart. What-is-this: passes (a leaderboard/ranking of AI prices). Why-care: partial — nothing in the first 900px says "you're probably overpaying; this saves you money." That has to be inferred from the chart. The h1 sits at y=246px on a 390px viewport — the fold burns real estate before the promise.

**Site B:** 80px serif "Independent analysis of AI" + "Understand the AI landscape to choose the best model and provider for your use case", plus live update banners ("Intelligence Index v4.3 replaces…", a new Search Index) and a changelog ticker. Stronger subway read: authority + purpose in two lines. The word "Independent" is doing positioning work, not just decoration.

## 2. Typography & rhythm

**Site A** has a disciplined, quietly premium system: Instrument Sans with *variable weights* (body 420, h1 640/41.6px with −0.62px tracking, h2 620/24px) on a warm paper ground (#FAFAF8, text #1C1C1A). Crucially, its data tables are set in **IBM Plex Mono with `font-variant-numeric: tabular-nums`**, uppercase 10.5px/0.84px-tracking column labels, hairline rules (#E5E5E0), 61px rows with 11.2px cell padding. For a pricing site, this is the single most important typographic decision, and Site A got it right: digits will column-align.

**Site B** has the more distinctive voice — Victor Serif display (80px/400 h1) over premium Suisse Intl body — but its flagship 299-row leaderboard fails the numeric test I just praised A for: **`font-variant-numeric: normal` (proportional figures), `text-align: start`** on cells containing values like 266.80 / 2.10 / 274.13. Decimal points don't align in the product's own core table. Also, visible h1s are SEO-stuffed ("LLM Leaderboard - Comparison of AI models from OpenAI, Anthropic, Google, SpaceXAI & others"), which undercuts the editorial serif persona the moment you open a real page.

## 3. Information design

**Site A:** Homepage = 8 sections including a 43-row API leaderboard and a 129-row "every tracked route" table, both in `overflow-x:auto` wrappers. Its culture is evidentiary: source links per row, "Batch price: not published" / "not measured" / "—" as explicit vocabulary, a caption that shows its arithmetic ("$39 ÷ $0.80 ≈ 49 tasks/mo… the arithmetic is ours"), methodology with staleness gates and "our score — documented, withheld", plus machine-readable endpoints (offers.json, leaderboard.json, llms.txt). Weaknesses: the two hero charts are static (measured: zero hover/tabindex interactivity — no inspect-on-click for a 27-point scatter), /providers/ is a thin 422-word link directory, and /guides/ has only two guides — one listing has a duplicated title tag ("… | Token Perks | Token Perks").

**Site B:** The homepage is 14 live mini-dashboards (329 SVGs, 853 paths, 383 controls); the leaderboard has grouped columns, filter pills (Weights/Size/Price/Reasoning/Status), "Expand columns", ⌘K search, sticky thead AND a sticky first column so model names survive horizontal scroll. Best-in-class state design: visiting a retired model shows a lifecycle banner up front — "This model is deprecated… We suggest considering GPT-5.4 mini (xhigh) instead" with links. Missing values render as bare `--` with no inline semantics (no "not published" language found on the board). No breadcrumb on model pages, though mega-nav compensates.

## 4. Mobile (390px)

**Site A:** Zero horizontal overflow; the big tables are display:none and replaced by an honest ranked card-list with the same numbers and caveats — proper table→list degradation, not a shrunken spreadsheet. Main nav links are 44px-tall targets. But 39/57 interactive elements are under 40px (filter chips 33px, inline links 15–18px), no sticky header on very long pages, and h1 pushed below the fold.

**Site B:** Keeps the full 1293px-wide 299-row table in one horizontal scroller with sticky first column (impressive engineering, questionable thumb ergonomics — filtering requires bouncing between a pill row and a side-scrolling grid). Mobile home has **15 separate horizontal scroller strips** (tab pickers 397–1315px wide) — a swipe maze. Tap targets are worse: **463 of 503 under 40px**, including changelog items at 16px tall and nav at 36px.

## 5. Distinctive moment (would I photograph it?)

**Site B:** the homepage's concept itself — an 80px serif broadsheet masthead where every "article" is a live chart, with a model-release changelog ticker running through it. That's the photograph: "newspaper that updates itself." The deprecation-banner-with-successor-link also deserves a screenshot in a pattern library.

**Site A:** the break-even "crossover" chart whose caption does the math in the open ("Metered = tasks × $0.80 reference… ≈ 49 tasks/mo. The arithmetic is ours.") beside a preset-driven calculator (Chat 12k / Coding 60k / Agentic 200k chips + 4 sliders). "Show-your-work" is a genuinely rare design move. It's an idea worth photographing; whether the execution is beautiful, I can't verify without vision — flagging that honestly.

## 6. Navigation

**Site A:** 5-item global nav (Home/Offers/Providers/Guides/Methodology) on every page; everything ≤1 click; offer detail → compare links close the loop. Ambiguity: "Offers" vs the homepage table of offers blurs; guide/offer pages are otherwise light on cross-links (6–7 in-body links). Header not sticky is the real nav cost on 5,000px+ pages.

**Site B:** mega-nav taxonomy (Models/Coding Agents/Media/Inference/Leaderboards/Arenas/About) persists everywhere, ⌘K search, homepage doubles as an anchored table-of-contents. No dead ends; labels like "Arenas" and "Inference" are insider-ambiguous to newcomers.

## 7. Scores (design craft, 1–10)

- **Site A: 7/10** — coherent type system, exemplary numeric/table craft, best-in-class data honesty, correct mobile degradation; deducted for nav stickiness, thin secondary sections, static charts, a title-tag bug, and sub-40px tap targets.
- **Site B: 8/10** — stronger identity, deeper interactive system, real responsive data engineering, superb lifecycle/deprecation UX; deducted for proportional left-aligned figures in its signature table, 92% sub-threshold mobile tap targets, 15 mobile scrollers, and SEO-flattened headlines.
(Caveat: these weights assume my measured proxy categories; visual composition was not directly verifiable this session.)

## 8. Recognition

- Site A: **No** — never seen before today.
- Site B: **Yes** — known from training data / design-community discussion. Disclosed because it biases me *toward* B; if anything, discount my B score slightly for familiarity.

## 9. Verdict

**Preference: Site B, moderate confidence (~65%).** B wins on breadth and identity: a real design language (serif-editorial over live dashboards), interactive data tooling that survives to mobile with sticky axes, and the deprecation-banner as the best single piece of product-state design I found on either site. But it's a narrow call on fundamentals: A beats B at the exact thing a data platform's credibility hangs on — tabular-nums aligned figures, semantic "not published" states, and visible sourcing — where B's flagship leaderboard uses proportional, left-aligned digits and bare "--" placeholders. A is 80% of the way to a great small platform; B is a great big platform with an un-tuned table.

**One improvement each:**
- **Site A:** Make the header compact-sticky (≤56px) and lift the h1 into the first ~120px on mobile, adding one plain sentence of value ("Subscriptions can undercut per-token API pricing by 10–50x — this ranks how") so the first screen answers "why care" without chart interpretation.
- **Site B:** Apply `font-variant-numeric: tabular-nums` and decimal-appropriate alignment to the leaderboard's numeric columns, and raise mobile tap targets (changelog rows, filter pills, nav icons) to ≥40px; replace the keyword-stuffed visible h1 with the clean noun and move the SEO string into the title tag only.
