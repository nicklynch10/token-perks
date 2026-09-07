# Scoring — Blind Comparison Battery v1.0

How runner records become a pass/fail verdict. Two levels: **task grading** (mechanical, against `tasks.md` keys) and **preference coding** (the runner's bookmark decision, which is the gated metric). Filled-in versions of every template here go into the report (`report-template.md`).

---

## 1. Preference coding (the gate)

The runner's verbatim answer to the preference probe (`battery-protocol.md` §5, step 4) is coded to exactly one of:

| Code | Trigger | Counts as |
|---|---|---|
| `PREF-TP` | Names token-perks.com (Site A or B, mapped via seed table) as the bookmark | +1 TP |
| `PREF-AA` | Names artificialanalysis.ai | +1 AA |
| `TIE` | Says "tie," "either," "neither," or refuses to pick | **+1 AGAINST TP** |
| `VOID` | Recognition probe or setup leak triggered (protocol §7) | slot rerun; no tally until rerun completes |

**Conservative rules (binding):**
- A tie is NOT half a point, a re-ask, or a judgment call. `TIE` counts in the denominator against Token Perks. If the runner says "tie, but if you forced me — B," it is still `TIE`. Only an explicit single-site bookmark codes as a preference.
- "Which is prettier" reasoning in the runner's justification does NOT change the code — the code follows the bookmark answer — but it is quoted in the report and flagged, because a preference decided on aesthetics is a warning about what actually drove the panel.
- Confidence in the preference is recorded but never weighted: a lukewarm `PREF-TP` counts exactly like an enthusiastic one. Weighting by confidence would be a second, unauditable rubric.

**Gate arithmetic.** With 10 slots: `PASS ⇔ PREF-TP ≥ 9`. Implications, spelled out:
- 9 `PREF-TP` + 1 `PREF-AA` → PASS (barely; report must say which persona dissented and quote them).
- 9 `PREF-TP` + 1 `TIE` → **FAIL** (9/10 preferences, but the tie consumed the tenth slot against us: 9 of 10 against a conservative denominator where the tie is a loss). This is the intended harshness of rule (e).
- 8 `PREF-TP` + anything → FAIL, proceed to fix loop (§5).

**Secondary metrics (reported, not gating):** task-level win counts by tag; mean confidence by site; order crosstab (§4); `missing_here` cluster table.

---

## 2. Confidence scale (1–5, collected per site per task and on the preference)

| # | Anchor |
|---|---|
| 1 | Guessing; answer contradicts itself or the runner says "no idea" |
| 2 | Found something related but couldn't confirm it answers the question |
| 3 | Found an answer but with gaps — had to infer, or a number was missing |
| 4 | Found a direct answer; would act on it with a quick double-check |
| 5 | Found a direct, dated/sourced answer; would act on it now |

---

## 3. Task grading (mechanical)

Per task, per site, one of:

| Grade | Definition |
|---|---|
| `correct` | All key-required elements present, every quoted number/claim true per key (after the Live-check Rule) |
| `partial` | Core present, ≥1 required element missing or one non-load-bearing number soft (e.g. monthly-vs-annual not surfaced where the key lists it as required → partial; as bonus → not penalized) |
| `wrong` | Any load-bearing number/claim contradicts the key or the official source, or the answer would send the persona into a bad decision (trap missed where the key demands it) |
| `not-found` | Nothing usable within the 4-minute budget, or honest "this site doesn't have that" |
| `hallucination` | Fabricated specifics presented as fact. Scored `wrong` AND flagged separately — one hallucination in a persona's session is quoted in the report regardless of grade |

**Grader Live-check Rule** (`tasks.md` §Freezing): a runner may dispute a key number by citing the official source. The grader re-verifies at the cited URL before grading; if the live source changed since 2026-09-07, the key yields and the event is logged in the report (§5 honesty). Research staleness is never charged to a runner.

**Persona-voice rule:** an answer that is technically present but phrased so the persona can't use it (P5/P8 especially) caps at `partial`. Mirror of the v1 kit's F7.

**Task score per site:** `correct=1, partial=0.5, wrong=0, not-found=0, hallucination=0 (and flagged)`.

---

## 4. Bias checks (run before reading the gate as final)

All four must appear in the report:

1. **Order effect crosstab.** `PREF-TP` rate among TP-first runners vs AA-first runners (5/5 by seed table). If every TP-first runner preferred TP while AA-first runners split, an order effect is likely inflating the gate — report it prominently even if the gate still passes. Not an automatic fail; an automatic disclosure.
2. **Prompt symmetry audit.** The coordinator (or reviewer) diffs the materials actually pasted into each runner session against Appendix A + `personas.md` + `tasks.md`. Any accidental editorializing ("this one has a deals section —") is a void trigger (protocol §7.1).
3. **Void log.** Every void with trigger + probe quote; >2 voids invalidates the panel (protocol §7.4, §10).
4. **Task-mix disclosure.** The `FAVORS-TP/AA/NEUTRAL` table from `tasks.md` reprinted next to actual per-tag results, so a reader can see the gate was decided on a mix that included AA's home turf.

---

## 5. Fix loop (failure procedure)

1. **Top losing reason.** Collect every `missing_here` verbatim string from records where the losing site is token-perks.com (i.e., TP lost that comparison), plus `PREF-AA`/`TIE` justifications. Cluster by meaning; rank clusters by frequency; tie-break by higher mean confidence of the loss (a confident loss is a real loss). The top cluster is **the** fix target. The cluster table is printed in the report — no summarizing into vague categories like "UX"; quote the strings.
2. **One build round** addresses that reason. Site changes only. Battery files, tasks, keys, seed table, personas: unchanged (`tasks.md` freezing record).
3. **Rerun only failed slots**: runners coded `PREF-AA` or `TIE`. Each is rerun by a **fresh agent** (same persona brief, same slot order from the seed table), with no knowledge of the prior run. Passing runners carry.
4. Recompute the gate over carried + rerun. PASS ⇔ `PREF-TP ≥ 9`.
5. **Max two fix rounds** (three panel runs total). A third failure = battery failed, V2 launch claim withdrawn (protocol §9).

Fix-loop integrity rules: rerunning a slot twice and keeping the better attempt is forbidden — one rerun per slot per fix round, recorded whichever way it goes. Adding or re-tagging tasks mid-battery is forbidden.

---

## 6. Per-runner record (template — copy per runner)

```
RUNNER: R__          PERSONA: P_ (name)     ORDER: [TP-first | AA-first]  (seed slot)
SESSION: date, agent type, viewport, duration
VOIDED/RERUN: no | yes (trigger: ____ , probe quote: ____)

PER-TASK RECORDS (per site): [repeat the §6 block from battery-protocol.md for
 A and B of each task: answer verbatim / usable? / why / confidence / time /
 missing_here verbatim]

TASK GRADES (grader):  A: T1 __ T2 __ T3 __   B: T1 __ T2 __ T3 __
PREFERENCE (verbatim quote): ""
PREFERENCE CODE: PREF-TP | PREF-AA | TIE        CONFIDENCE: 1–5
RECOGNITION PROBE (verbatim quote): ""
RUNNER NOTES (verbatim, anything else the runner said)
```

## 7. Aggregate tally (template)

```
SEED TABLE VERIFIED: [ ] orders match battery-protocol.md §4 for all 10 slots
                     (initials/date of whoever checked: ____)

RUNNER | PERSONA | ORDER    | PREF CODE | CONF | TASK WINS TP-AA-TIE | NOTES
R01    | P1      | TP-first |           |      |                     |
R02    | P1      | AA-first |           |      |                     |
R03    | P2      | AA-first |           |      |                     |
R04    | P3      | AA-first |           |      |                     |
R05    | P3      | TP-first |           |      |                     |
R06    | P4      | TP-first |           |      |                     |
R07    | P5      | TP-first |           |      |                     |
R08    | P6      | TP-first |           |      |                     |
R09    | P7      | AA-first |           |      |                     |
R10    | P8      | AA-first |           |      |                     |

PREF-TP: __ / 10      PREF-AA: __      TIE (counts against): __
GATE: PASS only if PREF-TP ≥ 9
ORDER CROSSTAB: TP-first PREF-TP __/5 · AA-first PREF-TP __/5
TASK WINS BY TAG: FAVORS-TP __/15 · FAVORS-AA __/3 · NEUTRAL __/2  (site=TP)
HALLUCINATION EVENTS: __ (site, task, quote)
```
