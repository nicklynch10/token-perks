# Token Perks v2 — The Value Score: analytical design

**Status:** design spec for implementation · **Snapshot basis:** AA data accessed 2026-09-07, prices verified 2026-09-06
**Scope:** the leaderboard + chart analytical core (`lib/valueScore.ts`, `lib/intelligence.ts`, `app/best/` rework)

> Every AA-sourced number in the shipped product carries: *Source: Artificial Analysis (accessed 2026-09-07)* with a link. The score itself is **our** weighting and is always labeled as such. See §7.

---

## 0. Decisions at a glance

| Decision | Choice |
|---|---|
| Score name | **Token Perks Value Score (TPVS)** |
| Formula | `Score = I × (C_ref / C_eff)^α` |
| Cost axis (primary) | Effective $/task, per-use-case tokens preset |
| Cost axis (secondary) | Effective $/M blended tokens |
| Intelligence axis | AA Intelligence Index (Overall / Coding / Math per tab) |
| α default | **0.5** (slider 0–1, with three named presets) |
| C_ref | Per-tab median effective task cost of the ranked set (display-only; ordering is invariant to it) |
| $0 / free models | Not ranked. Shown on chart at the cost floor with `score = —`; scored at their **graduation price** if one exists |
| Chart cost axis | Log scale. Intelligence axis linear. Rationale in §1.3 |
| Frontier | Upper-left staircase overlay on the scatter; dominated points dimmed with a "dominated by X" tag |

---

## 1. Axes

### 1.1 Cost axis

Two candidates, and we use both — but with different jobs:

**Primary: estimated $/task (effective).** `C_eff = blended $/M × tokensPerTask(useCase) − promo relief`. This is the axis the leaderboard ranks on and the chart plots.

Why $/task wins as primary:

1. **It is the unit our audience buys in.** The v1 site already sells the $0.80/task reference and the 50-tasks/mo break-even (`lib/effectiveCost.ts`, `BASELINE_PAYG_PER_TASK = 0.8`). A score denominated in "per task" inherits that vocabulary instead of forcing readers to convert.
2. **It is the unit subscriptions are judged in.** "Is a $40/mo plan better than PAYG for me?" is a tasks-per-month question. TPVS scores feed directly into that comparison.
3. **It lets use-case tabs do real work.** $/M blended is use-case-invariant; $/task is not — a 250k-token agentic task makes the frontier's premium look very different from a 12k-token chat task. The interesting product behavior (the frontier losing rank as you slide from Chat to Agentic) only exists on the per-task axis.

**Secondary: effective $/M blended tokens.** Shown as a table column and in hover cards. It is the number developers actually compare on price sheets, and it is the *input* to the $/task computation, so showing both keeps the table auditable: reader can check `$/task = $/M × tokens`.

**Use-case tokens/task presets.** The v1 baseline is 100k tokens/task ($0.80 at the $8/M blended reference). Presets (illustrative, documented as our estimates, adjustable in one constant):

| Preset | tokens/task | Derivation note |
|---|---|---|
| Chat | 12,000 | Multi-turn Q&A incl. prompt re-send; short context |
| Coding | 60,000 | Repo context in, diff out; medium context window |
| Reasoning | 120,000 | Long prompt + extended thinking traces (thinking tokens bill as output) |
| Agentic | 200,000 | Many turns, tool results re-read, near-full context reuse |
| (v1 baseline) | 100,000 | Kept for continuity with existing break-even copy |

Preset value lives in one exported const (`lib/valueScore.ts`), flagged in the UI footnote: *"Tokens/task are Token Perks estimates; your mileage varies with prompt size."*

**Subsidy view.** Every offer carries two costs: `C_list` (published $/M) and `C_eff` (after promo / free tier / included quota, per `content/offers/*.json` `price.now`). The score always ranks on `C_eff`; a toggle (§5) shows the list-price world so readers can see what the promo is worth. A point that moves between views gets a delta chip, e.g. "−72% with promo".

### 1.2 Intelligence axis

One source of truth, one snapshot: the **Artificial Analysis Intelligence Index**, pulled 2026-09-07 and cached as data (see §8). Tabs:

| Tab | Axis variable | Source field |
|---|---|---|
| Overall | AA Intelligence Index | `aa.intelligenceIndex` |
| Coding | AA Coding Index | `aa.codingIndex` |
| Math | AA Math Index | `aa.mathIndex` |
| Agentic | AA agentic/tool-use index if published; otherwise AA Coding Index with an on-chart note "agentic proxied by coding index" | `aa.agenticIndex ?? aa.codingIndex` |

**Attribution is per point, not per page.** Every chart point's hover card, every table cell, and every tab header carries the attribution line and link (§7). If a model lacks an index on a tab, it is absent from that tab, not zero-filled — a zero would be a false claim about the model.

### 1.3 Log vs linear axes

**Cost: log.** The ranked set spans roughly two to three orders of magnitude in C_eff ($0.0018 → $0.054/task in the worked table of §4.5). On a linear axis, every budget model collapses onto the y-axis and the chart communicates nothing. Log also makes the score's iso-value contours (§3.3) visually straight-ish and equal *ratios* occupy equal distances — which matches how the score treats cost (elasticity, not absolute deltas).

**Intelligence: linear.** The AA index is already a constructed scale (0–100-ish); differences between adjacent points are meaningful and the site quotes them ("+24 points"). Ratio-treating intelligence (log axis) would exaggerate gaps at the low end; linear keeps the visual honest about how big the frontier-vs-value gap really is.

**Free models:** plotted at a floor tick (one *minimum nonzero cost* / 10) with a hollow marker and "free / quota-limited" label — visually at $0, analytically unranked (§3.4).

---

## 2. The slope idea: right instinct, wrong estimator

The owner's instinct — "value the tradeoff between cost vs incremental intelligence, like the slope of the Pareto curve" — is the correct *shape* of answer. Marginal analysis is the right frame: a frontier model must justify its premium with marginal intelligence. The question is whether **the local slope of the empirical Pareto frontier between adjacent models** should *be* the score. It should not. It survives as the *criterion*, not the *estimator* (§3.3 shows the connection exactly).

Four failure modes of raw slope-as-score:

1. **It is not defined per model.** A slope belongs to an *edge* between two adjacent frontier points. Dominated models — most of the catalog — have no slope at all and therefore no score. The leaderboard would be undefined for most rows.
2. **Axis-scaling instability.** Slope = ΔI/ΔC depends entirely on whether C is linear or log, dollars per task or dollars per million tokens — and those choices change the *ranking*, not just the units. Worked example, edges of the §4.5 dataset:
   - Frontier-1 → Frontier-Lite edge: ΔI = 12, ΔC = $0.0216/task → **555 I per $** (linear). On log-cost: 12 / log₁₀(0.036/0.0144) = 12 / 0.398 = **30.2 I per decade**.
   - Frontier-Lite → Value edge: ΔI = 12, ΔC = $0.0108/task → **1,111 I per $** (linear). On log-cost: 12 / log₁₀(4) = **19.9 I per decade**.
   - Verdict flips: linear says the Value edge is 2× richer; log says the Frontier-1 edge is 1.5× richer. A "score" whose ordering depends on the chart's axis units is not a score.
3. **Dataset discontinuity.** Adding one mid-priced model re-partitions every adjacent pair and silently rewrites everyone's score. Rankings should be stable under catalog growth.
4. **Degenerate endpoints.** The cheapest paid model has no cheaper neighbor (slope undefined); $0 models divide by zero (slope = ∞) and would immortalize the #1 spot.

**What the instinct gets right, kept:** the score must *reward being close to the frontier and punish paying above the going rate for intelligence*. The estimator that does this per-model, monotonically, and explainably is a tunable ratio — see §3.3 for why it is literally the slope criterion under a constant-elasticity indifference curve.

---

## 3. Candidate formulations

Worked against the three-model core from the brief (illustrative data; chat preset, 12k tokens/task):

| Archetype | I (AA idx) | $/M blended | C_eff ($/task) |
|---|---|---|---|
| Frontier | 64 | 3.00 | 0.0360 |
| Value | 40 | 0.30 | 0.0036 |
| Free | 25 | 0.00 | 0 |

### 3.1 Candidate A — intelligence per dollar: `I / C`

- Frontier: 64/0.036 = **1,778** · Value: 40/0.0036 = **11,111** · Free: ∞.
- **Pros:** dead simple, honest, the purest value statement.
- **Cons:** (i) no tuning — hardcodes "cost matters maximally," so the frontier *never* wins anything, which quietly tells readers intelligence is worthless; (ii) numbers are unit-dependent and huge (11,111 what?); (iii) free = ∞, which is the dishonest #1-forever artifact; (iv) scores are comparable only within one tokens/task preset, and the raw magnitudes don't communicate the preset.

### 3.2 Candidate B — normalized ratio + Pareto bonus

`Score = 100 × (I/C) / (I/C)_max + 10×1[Pareto member]`

- Max ratio is Value's 11,111 → Frontier: 16.0 + 10 = **26** · Value: 100 + 10 = **110** · Free: ∞ + 10.
- **Pros:** readable 0–100-ish scale; the bonus visibly encodes "frontier membership is worth something."
- **Cons:** (i) the additive bonus is *unprincipled* — 10 points of what? A dominated model with a 9-point ratio deficit outranks a frontier model for no economic reason; the bonus can also make a dominated model "beat" the model that dominates it, which is incoherent; (ii) normalization by the max makes every score jump whenever any cheap model launches (ratio-max moves, all rows rescale); (iii) still no user tuning; (iv) still ∞ for free.

### 3.3 Candidate C — tunable cost-sensitivity exponent (RECOMMENDED)

```
TPVS = I × (C_ref / C_eff)^α        for C_eff > 0
```

- `I` = AA index for the active tab (attributed).
- `C_eff` = effective $/task for the active preset (§1.1).
- `C_ref` = per-tab median C_eff of the ranked set. **Ordering is invariant to C_ref** — it is a constant multiplier, so it only sets display scale. Choosing the median makes the median-cost model score ≈ its own I, which is legible ("this model scores its intelligence because it is the reference price").
- `α` = the cost-sensitivity exponent. **α = 0 → pure intelligence ranking. α = 1 → exactly Candidate A (intelligence per reference-dollar).** α in between interpolates.

**Why this is the slope criterion done right.** Maximize TPVS ⇔ maximize `I / C^α` (C_ref constant). Take indifference curves `I = k·C^α`: a reader is indifferent between two models when `ΔI/I = α·ΔC/C`. The marginal rate of substitution at any point is `dI/dC = α·I/C`. So **α is precisely the reader's required marginal intelligence per marginal dollar, expressed as an elasticity**: at α = 0.5, quadrupling cost must buy ~2× the intelligence to hold value; at α = 1, proportional. The slope-of-Pareto idea survives intact — we maximize where the frontier's local slope equals the indifference slope — but the *local empirical slope* (unstable, §2) is replaced by a smooth indifference family (stable, per-model, total order). The slope is the *condition for optimality*; the ratio score is the *objective function* whose optimum satisfies it.

**Interaction with the chart:** iso-score curves are exactly `I = k·(C/C_ref)^α` — the slider re-draws this family faintly on the log-cost scatter, and the best model is the first one a rising iso-curve touches from below. The slider literally "rotates" the reader's indifference fan. This is the whole product in one picture.

Core example at α = 0.5, C_ref = $0.0144 (median of the §4.5 set):

- Frontier: 64 × (0.0144/0.0360)^0.5 = 64 × 0.632 = **40.5**
- Value: 40 × (0.0144/0.0036)^0.5 = 40 × 2.0 = **80.0**
- Free: unranked (§3.4)

Value wins at the default — the correct honest outcome: 10× the cost for 1.6× the intelligence fails any reasonable value test. Slide α below the crossover `log(64/40)/log(0.036/0.0036) = log 1.6 / log 10 = 0.204` and Frontier takes #1. The slider thus has a *meaningful, derivable* crossover story per pair, and the UI can even annotate it ("frontier overtakes value below α ≈ 0.20").

### 3.4 $0 / free models — decision

A score of ∞ for $0 is a lie the site cannot afford: the free offers we track (NVIDIA Build K3 dev tier, Zen Muse Spark promo) are quota-limited, account-variable, dev-scoped — our own offer pages say so. Therefore:

- **C_eff = 0 → not ranked.** Table shows `Score = —` with badge **"Free — not ranked (quota-limited)"**; chart plots at the cost floor, hollow marker.
- **Graduation pricing:** if the offer JSON carries a post-promo paid price, the model is scored at that price and badged **"scored at graduation price $X"** — this is the honest forward-looking number and matches the existing offer narrative ("budget the graduation").
- Free models never appear in Pareto-frontier computation used for badges, because the frontier badge would then be dominated by quota-limited access rather than by pricing. They get a separate **"Free pick"** callout slot per tab instead — visibility without corrupting the ranking.

---

## 4. Recommendation: Token Perks Value Score — full spec

### 4.1 Formula

```
TPVS(model, tab, preset, α) = I_tab(model) × (C_ref(tab, preset) / C_eff(model, preset))^α
```

- **α default 0.5.** Justification: it prices intelligence elastically but not punitively — 4× cost must buy ~2× intelligence to break even, which matches how the market actually behaves (people pay premiums for capability, sublinearly). At α = 0.5 the frontier keeps *mid-table* relevance (Frontier-Lite stays top-3 in §4.5) while pure budget models win — which is the truth of this market.
- **Slider range 0–1, continuous, default 0.5**, with three named snap presets:
  | Preset | α | Reads as |
  |---|---|---|
  | Performance first | 0.15 | "Cost barely matters; show me the best" |
  | Balanced (default) | 0.5 | "4× the cost must buy ~2× the intelligence" |
  | Budget first | 1.0 | "Raw intelligence per dollar" (= Candidate A) |
- **C_ref** = median C_eff of the ranked set on the active tab/preset; recomputed per tab; displayed under the formula ("reference price: $0.0144/task, the median here"). Ordering is provably invariant to this choice — stated on the methodology page to preempt "you rigged the reference" objections.
- **Axes inside the score:** cost enters as an elasticity (^α), i.e. log-like; intelligence enters linearly. AA index differences are meaningful absolute quantities; cost differences are meaningful only as ratios.
- **Persistence:** α in URL query (`?a=0.5&tab=coding`) so a ranked view is shareable; localStorage for the reader's last position.

### 4.2 Ranking, dominance, ties

- **Dominance is respected for every α > 0.** If A dominates B (I_A ≥ I_B, C_A ≤ C_B, one strict), then `I_A·(C_ref/C_A)^α ≥ I_B·(C_ref/C_B)^α`, strict in the strict term — TPVS_A > TPVS_B. The score can never rank a dominated model above its dominator. (Candidate B's bonus violated this; noted as disqualifying.)
- **Pareto badge vs rank are separate things.** The "On the value frontier" badge marks staircase membership; the rank column is pure TPVS. A dominated model (Reasoner-Pro in §4.5) ranks last *and* carries "dominated by Frontier-1" — the two signals reinforce but don't conflate.
- **Tie-breaking, in order:** (1) higher I; (2) lower C_eff; (3) Pareto member first; (4) model name A→Z. Ties are rare (continuous inputs) but the order must be deterministic for stable screenshots/tests.

### 4.3 Ranking across use-case tabs

Tab switch changes both I (Overall → Coding → Math → agentic-proxy) and C_eff (tokens/task preset per §1.1), so the re-rank is *doubled*: a coding index bump and a 5× token multiplier at once. Expected story the product should surface: frontier models gain rank moving Chat → Agentic (their premium buys fewer ranks per task at 12k tokens, more at 200k). This is the site's core insight and the reason tabs exist.

### 4.4 Edge cases

| Case | Behavior |
|---|---|
| C_eff = 0 | Not ranked; badge per §3.4 |
| Missing AA index on tab | Omitted from tab, message "no AA [tab] index in our 2026-09-07 snapshot" |
| Promo makes C_eff negative (credit > spend) | Floor at 0 → treated as free (§3.4) |
| Single-model set | C_ref undefined → fall back to C_ref = C_eff (score = I) |
| α = 0 | Score = I; label the column "AA index (our score α=0)" so readers see the slider went inert |

### 4.5 Worked example end-to-end (6 models, chat preset, α = 0.5)

Illustrative data. Tokens/task = 12k → C_eff = $/M × 0.012. C_ref = median of the five ranked costs = **$0.0144/task**.

| Model | I (AA) | $/M | C_eff $/task | r = C_ref/C | r^0.5 | **TPVS (α=0)** | **TPVS (α=0.5)** | **TPVS (α=1)** | Pareto |
|---|---|---|---|---|---|---|---|---|---|
| Small-1 | 31 | 0.15 | 0.0018 | 8.00 | 2.828 | 31 | **87.7** (1) | 248.0 | ✓ |
| Value-1 | 40 | 0.30 | 0.0036 | 4.00 | 2.000 | 40 | **80.0** (2) | 160.0 | ✓ |
| Frontier-Lite | 52 | 1.20 | 0.0144 | 1.00 | 1.000 | 52 | **52.0** (3) | 52.0 | ✓ |
| Frontier-1 | 64 | 3.00 | 0.0360 | 0.40 | 0.632 | **64** (1 at α=0) | **40.5** (4) | 25.6 | ✓ |
| Reasoner-Pro | 60 | 4.50 | 0.0540 | 0.267 | 0.516 | 60 | **31.0** (5) | 16.0 | ✗ dominated by Frontier-1 |
| Free-1 | 25 | 0.00 | 0 | — | — | — | — (not ranked) | — | Free pick callout |

Read the three α columns as the product: at α=0 the leaderboard is AA's ranking; at α=1 it is I/C; at 0.5 it is our default editorial position — the frontier *survives* (Frontier-Lite #3, Frontier-1 #4) but raw budget wins, and Reasoner-Pro is exposed as paying Frontier-1 prices for less intelligence. Crossover notes derivable from the table: Frontier-1 overtakes Value-1 below α = 0.204; Frontier-Lite holds #3 for all α (it *is* C_ref, and its I sits between the clusters).

---

## 5. Chart & Pareto interaction

One scatter, replumbed per tab. No other chart on the page.

- **Plot:** x = C_eff, **log** axis; y = I, linear. Point = model; filled + ringed if on the value frontier, dimmed 45% opacity if dominated; hollow at the cost floor if free.
- **Frontier overlay:** the upper-left **staircase** (step line through frontier points: horizontal at I until the next-cheaper frontier model's cost, then vertical drop) — drawn as steps, *not* a smoothed curve; a smooth line would imply interpolated models that don't exist. Label: "Value frontier — no model above-left of this line is cheaper *and* smarter."
- **Hover card (all points):** model + provider; `I 64 · Source: Artificial Analysis (accessed 2026-09-07)` (linked); `Eff. $0.0360/task ($3.00/M) — list $3.00/M` or `—72% with promo`; `TPVS 40.5 · rank #4 at α 0.5`; one-line offer hook if a tracked offer exists.
- **Tabs** (Overall / Coding / Math / Agentic): swap I series *and* tokens preset; the frontier staircase re-computes; tab header carries the AA attribution.
- **Click a point:** filters the leaderboard to that model pinned at top + its ±3 rank neighbors, and highlights its row; click empty canvas to clear. (Not a hard filter that hides everyone else — context matters for value.)
- **α slider (on the chart, not buried):** dragging re-draws the iso-score contour family faintly (§3.3) and live-reranks the table. A small readout names the current preset ("Balanced — 4× cost must buy ~2× intelligence").
- **Cost-basis toggle:** `Effective ▾ / List` — swaps x-values to list price; subsidized models visibly slide right, with the delta chip. Default is Effective (that is the site's thesis).
- **Mobile:** chart becomes an ordered **frontier list** (top-5 frontier models as compact rows with sparkline-ish score bars); scatter is hidden below ~640px, not squeezed — see §6.

---

## 6. Leaderboard UX spec

### 6.1 Columns (desktop)

| # | Column | Notes |
|---|---|---|
| 1 | Rank + Δ | Rank at current α; Δ vs α=0.5 default shown as small arrow after first user drag |
| 2 | Model + provider | Links to offer page if tracked |
| 3 | **TPVS + bar** | 0–100 scale: best-in-set = 100, others proportional (display normalization only; ranking uses raw). Bar gives instant magnitude |
| 4 | Intelligence (tab-scoped) | e.g. "64 · AA [accessed 2026-09-07]" — attribution in cell, per §7 |
| 5 | Eff. $/task | Active preset; sub-line "· $3.00/M" |
| 6 | List $/M | Only when ≠ effective; else "$3.00/M" and the promo chip "−72% promo" |
| 7 | Frontier | ✓ staircase badge / "dominated by Frontier-1" / "Free pick" |
| 8 | Offer | CTA to `/best/<slug>/` |

### 6.2 Sorts and filters

- **Sorts:** TPVS (default) · Intelligence ↓ · Eff. cost ↑ · Name. Column headers 3–5 are click-to-sort; TPVS column follows the slider.
- **Filters:** use-case tabs (shared with chart) · provider multi-select · "frontier only" toggle · free-offers toggle (show/hide the unranked block).

### 6.3 The five interactive elements (hard cap)

1. **Use-case tabs** (Overall/Coding/Math/Agentic) — drives chart + table together.
2. **α slider + 3 snap presets** — live re-rank, contour redraw, URL-persisted.
3. **The chart** — hover cards, click-to-pin filter.
4. **Cost-basis toggle** (Effective/List).
5. **Sort control** (one dropdown on mobile, clickable headers on desktop).

Provider filter and free-offers toggle fold into a single "Filters ▾" popover *inside* the sort row — the cap is visible controls, not capabilities. Everything else is text, and there is deliberately little of it: the interaction explains the model better than prose can (per the site's taste for calm data over editorializing).

### 6.4 Slider ↔ table live behavior

Dragging α: (1) TPVS + bar column recomputes per keystroke-frame (throttle rAF); (2) rows animate to new ranks via FLIP translation — motion ≤200ms, respects `prefers-reduced-motion` (no animation, instant reorder); (3) the α readout sentence updates ("Budget first — intelligence per dollar"); (4) URL debounced-updates `?a=`; (5) Δ-rank arrows fade in after the first drag and reset on release-to-default.

### 6.5 Mobile fallback (≤640px)

- Chart → **frontier list card**: top-5 frontier models as cards (rank, score ring, I, eff. $/task, frontier badge), then a collapsed "show all N" list.
- Table → **cards**: score ring, model, eff. $/task + promo chip, I + attribution micro-line; tap to expand full stats + CTA.
- Tabs + slider stay (they are the product); toggle + sort collapse into one row of two selects. Horizontal scrolling of the table is forbidden; cards instead.

---

## 7. Honesty rules (non-negotiable)

1. **AA attribution per datum.** Exact string on every chart point, table cell, and tab: *"Source: Artificial Analysis (accessed 2026-09-07)"*, linked to the AA model page. Footer attribution does not substitute; a number travels with its source.
2. **The score is ours, loudly.** Wherever TPVS appears — column header, hover card, card ring, meta description — the label form is *"Token Perks Value Score — our weighting of AA intelligence vs effective cost; not an objective measure."* Never "the best model," always "best value under this weighting."
3. **The formula is on the page.** A fixed footer block on the leaderboard renders the live formula with the *current* values substituted (α, C_ref, preset tokens), e.g. `TPVS = I × (0.0144 / C)^0.5 · reference price = median of ranked set · tokens/task 12k (our estimate)`. Linked from every score instance to `/methodology/`.
4. **Illustrative data marked.** Any mock/placeholder numbers in pre-launch builds carry a visible `ILLUSTRATIVE` tag; launch data comes from the §8 snapshot files with real access dates.
5. **Free-tier honesty.** Unranked free models display *why*: "not ranked — $0 is real but quota-limited (account-variable); scored at graduation price where known." Consistent with existing offer-page language.
6. **No commercial influence on the score.** Affiliate presence (present or future) never touches I, C_eff, α, or C_ref. The score is computed from data files only; revenue fields live in a separate layer the scorer never reads.
7. **Stale-data discipline.** Score blocks refuse to render if `intelligence` snapshot age > 35 days (AA indexes move); banner: "Intelligence data older than a month — score paused."

---

## 8. Data model & implementation checklist

```
content/intelligence/2026-09-07.json   # one snapshot file per access date
  { "accessed": "2026-09-07", "source": "artificialanalysis.ai",
    "models": { "<model-id>": { "intelligenceIndex": 64, "codingIndex": 58,
                                 "mathIndex": 66, "agenticIndex": null } } }

lib/intelligence.ts    # load latest snapshot, type IAAIndexes, staleness check (35d)
lib/valueScore.ts      # TOKENS_PER_TASK presets; valueScore(I, cEff, cRef, a);
                       # paretoFrontier(points): upper-left staircase + dominatedBy map
                       # tpvsScale(scores): display normalization (max → 100)
lib/effectiveCost.ts   # extend: per-model C_eff from offer JSON (list, promo, quota)
```

Checklist: (1) snapshot file + loader + staleness gate; (2) `valueScore` + unit tests incl. dominance property, α-invariance of C_ref, tie order; (3) Pareto staircase util + "dominated by" map; (4) chart (scatter, log-x, staircase overlay, contours, hover, click-pin); (5) leaderboard table/cards with FLIP re-rank; (6) slider + URL state; (7) cost-basis toggle; (8) honesty footer + per-cell attribution; (9) methodology page section "Our score, our weighting" (§7.2–7.3 text).

## 9. Open questions (owner input wanted)

1. **Agentic tab proxy** — ship with coding-index proxy + note, or wait for a published AA agentic index?
2. **Presets** — are the §1.1 tokens/task numbers close to what the audience reports? (They drive the tab story harder than α does.)
3. **Score scale** — display-normalize max→100 (proposed) vs raw values (more auditable, uglier)?
4. **Which models** — full AA catalog vs only models with a tracked offer on the site? Proposed: full catalog plotted, tracked offers CTAd; "our offers only" filter if it gets noisy.

