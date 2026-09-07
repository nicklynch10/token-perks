# Report Template — Blind Comparison Battery v1.0

The report is the acceptance artifact: it is what a hostile reviewer reads to decide whether the "9/10 preferred, zero bias" claim is real. Fill every section; delete nothing — empty sections are findings. One report per panel run; fix rounds append their log (§7) and a fresh tally.

---

## 1. Header

```
BATTERY:        Blind Comparison Battery v1.0 (docs/battery/, files frozen 2026-09-07)
RUN DATES:      panel start - end
SITES:          token-perks.com · artificialanalysis.ai   [blind labels A/B per seed table]
SEED TABLE:     verified against battery-protocol.md §4 — [ ] yes, by ______ (initials/date)
PANEL:          10 slots / 8 persona briefs (P1, P3 doubled; declared up front)
VOIDS:          __ (triggers listed §4; >2 = panel invalid, say so here)
REPORT AUTHOR:  ______   REVIEWER (spot-check >=3 runner records): ______
SITE VERSION:   token-perks.com deploy hash/date tested: ______
                (the report must name what was actually tested — a battery pass
                 attaches to a build, not to the project)
```

## 2. Per-runner summaries

One block per runner, R01-R10 (full records archived; summaries here). Keep verbatim quotes — they are the evidence; no paraphrase.

```
### R__ · P_ (persona) · order: TP-first/AA-first
Bookmark: [PREF-TP | PREF-AA | TIE] · confidence __/5 · quote: "________"
Best task for TP: P_-T_ — why, one line.        Worst task for TP: P_-T_ — why, one line.
What TP lacked (verbatim): "________"
What AA lacked (verbatim): "________"
Grades: TP __/__ · AA __/__     Recognition probe: clean | flagged -> voided/rerun
```

## 3. Aggregate tally

Paste the filled template from `scoring.md` §7 verbatim (runner table, PREF-TP / PREF-AA / TIE counts, order crosstab, task wins by tag, hallucination events). Then the verdict block:

```
GATE: PREF-TP = __ / 10  (ties counted AGAINST per protocol §0 rule 5)
VERDICT: [ PASS — proceed to honesty section | FAIL — fix loop §7 ]
CONDITIONS:    [ ] zero seed deviations   [ ] <=2 voids   [ ] tasks unedited
               [ ] grading spot-check done   [ ] Live-check Rule disputes logged: __
```

## 4. Bias audit (all four from `scoring.md` §4, each with a result, not a checkbox)

1. **Order effect:** TP-first PREF-TP __/5 vs AA-first PREF-TP __/5. Interpret in one sentence: if the TP-first side is materially stronger, state whether the gate survives the weaker side's rate alone (e.g. "gate would still pass if only AA-first results counted: __/5 -> overall __/10").
2. **Prompt symmetry:** diff result of runner materials vs frozen kit; any deviation -> void list.
3. **Void log:** per void — slot, trigger, probe quote, rerun outcome.
4. **Task-mix disclosure:** the FAVORS-TP/AA/NEUTRAL table reprinted with actual per-tag task-win rates.

## 5. Honesty section (mandatory; the battery's credibility lives here)

Written in plain declarative sentences, quoting runners where possible:

- **Where the matchup favored us.** List the FAVORS-TP tasks and say plainly what each tested that the rival structurally does not carry (consumer membership tiers, seat plans, promo expirations, batch/off-peak mechanics, plain-language plan guidance). State the count ("15 of 20 tasks sat on terrain only one side covers") and acknowledge the mix skews our way because the personas' decisions do — the reader can then discount accordingly.
- **Where the matchup favored AA.** The three FAVORS-AA tasks, with results. If AA won all three, print that: "AA won its home turf 3/3; the bookmark preference nevertheless went __/10 the other way because the gated decision was ___."
- **What the battery did NOT test.** AA strengths out of scope: benchmark methodology depth, full per-effort variant tables, 640+ model catalog breadth, per-endpoint provider pricing comparison. TP strengths out of scope: offer catch-verification workflow, changes/disclosure pages, guides. A "preferred for the stated decisions" claim is scoped to the 20 tasks and 8 decisions here.
- **Runner-direction negatives.** Every verbatim `missing_here` where TP lost, unedited — including from passing runners. A passing gate with suppressed negatives is the failure mode this section exists to prevent.
- **Research freshness.** Keys derive from the 2026-09-07 snapshot; list any Live-check Rule disputes and what changed.
- **Limitations runners named themselves** (from recognition probes and runner notes, verbatim).

## 6. Verdict statement (paste-ready, for the launch claim)

```
On [dates], 10 independent blinded evaluators (8 personas, fixed seed order
randomization, ties counted against us) compared token-perks.com with
artificialanalysis.ai on 20 frozen purchase-decision tasks. __/10 preferred
token-perks.com as the site they would bookmark for their decision. The panel
included 3 tasks on the rival's home turf (raw benchmark lookup, per-model eval
drill-down, throughput data), of which we won __. Full methodology, records,
and negative findings: docs/battery/report-[date].md.
```

The claim may be published only with the sentence above scoped exactly as written — no "beats artificialanalysis.ai" without the task-scope qualifier, no "9/10" without "ties counted against."

## 7. Fix-round log (append only on FAIL)

```
FIX ROUND __ of 2
Top losing reason (cluster): ________  — frequency __, mean loss confidence __
  Verbatim evidence (unedited): "..." x__
Build change: ______ (deploy hash/date: ______)
Rerun slots: [list failed slots only] · carried: [list passing slots]
Post-round tally: PREF-TP __ / 10 -> [ PASS | FAIL -> next round or withdraw claim ]
Integrity: [ ] tasks/keys/seed unchanged  [ ] one rerun per slot, kept as-run
```

After round 2's failure the claim is withdrawn (protocol §9.5); the report ends with the withdrawal line and the final tally — no third round, no panel redesign.
