# Blind Comparison Battery — Protocol v1.0

**Status:** FINAL acceptance gate for the Token Perks v2 build. Nothing ships as "validated" until this battery passes.
**Question the battery answers:** when real, decision-carrying users are handed both sites blind — token-perks.com and artificialanalysis.ai — which one do they keep?
**Pass condition:** at least **9 of 10 runner agents prefer token-perks.com**, with ties counted AGAINST Token Perks, under the blinding and randomization rules below. 9/10 is the floor, not the target aspiration; 10/10 with clean audit is the only unambiguous result.

Companion files (this directory): `personas.md` (who runs), `tasks.md` (what they're asked, verbatim + answer keys), `scoring.md` (how records become a verdict), `report-template.md` (how the run is written up).

---

## 0. Design principles (why each rule exists)

| # | Rule | Failure it prevents |
|---|---|---|
| 1 | Every runner gets BOTH URLs, order randomized from a fixed seed table | Presentation-order bias ("I liked the last thing I saw") |
| 2 | Identical task prompts for both sites, copy-paste verbatim | Subtly easier phrasing for one side |
| 3 | Runner is never told which site is "ours"; never sees the repo or this kit | Loyalty / demand-compliance bias |
| 4 | Collected per site: answer, why, confidence 1–5, what the other site lacked (verbatim) | Unfalsifiable "it felt better" verdicts |
| 5 | A tie counts AGAINST Token Perks | Inflating the pass rate with non-decisions |
| 6 | Any runner exposed to project context is voided and rerun | Contaminated runners voting with sympathy |
| 7 | Preference = the site they'd bookmark for the stated decision, not the prettier one | Style noise; our design taste (calm, dense) is not the test |

**Fixed scope.** The task texts in `tasks.md` are FROZEN at battery v1.0. A failing battery may trigger build changes to the site; it may never trigger task rewording, key softening, or persona changes (see §9, fix loop). This is what makes a rerun mean anything.

---

## 1. Unit of analysis and the 10-runner panel

- The unit of preference is the **runner** (one persona brief, executed start-to-finish by one fresh agent). Each runner performs its persona's 2–3 tasks **once per site** (both sites, same prompts), then gives ONE final bookmark decision. That final decision is the gated metric.
- Task-level outcomes (which site produced a correct, usable answer per task) are collected as supporting evidence and for the fix loop. They do not by themselves pass or fail the battery.
- The panel is **10 runner slots filled by 8 persona briefs**: briefs P1 (solo dev) and P3 (indie hacker) each field two independent runners (R01/R02 and R04/R05) because they are the two highest-intent purchase-decision audiences. The doubling is declared here, before any results exist.
- Gate arithmetic with 10 slots: `prefer(TP) ≥ 9`. Ties and voids consume slots. A voided runner is **rerun in the same slot** (same persona, same presentation order), so the denominator stays 10.

---

## 2. Roles

**Coordinator** (a project-side agent or human): prepares runner sessions from the verbatim brief in Appendix A, applies the seed table, collects records, grades task answers against the keys in `tasks.md`, fills `scoring.md` tallies, writes the report. The coordinator NEVER edits task text, never hints at which site is "ours," and never tells the runner the pass threshold.

**Runner** (independent agent): receives ONLY the runner brief (Appendix A) + its persona brief (from `personas.md`) + the task prompts (from `tasks.md`). It has a browser (or fetch tooling) and nothing else. It writes answers in persona voice and the comparison records. It does not know Token Perks is the project under test, does not know a pass threshold exists, does not know the other runners' identities.

**Grader** (may be the coordinator): scores runner answers against the answer keys. Grading is mechanical (correct / partial / wrong / not-found per `scoring.md`). If the coordinator grades, a separate reviewer spot-checks ≥3 records per report.

---

## 3. Runner environment controls

For every runner session:

1. **Fresh session, clean slate.** New agent session (no conversation history), working directory OUTSIDE this repository (empty temp dir). The runner is never given repo access — no file tools pointed at the project, no `E:\TokenTracker` in cwd.
2. **Minimal system prompt.** No project memory files, no CLAUDE.md/AGENTS.md content, no skills that reference this project. If the harness injects project context, the runner is **void** (§7).
3. **No external search.** Tasks are answered using ONLY the two sites. This restriction applies equally to both sites and is stated in the runner brief. (Rationale: search results would inject identical-but-third-party framing asymmetrically across tasks; both sites stand on their own pages.)
4. **Read-only access, equal for both sites.** Browser render, curl/raw HTML, reader-mode — any means the runner already has, used identically for both sites. No site is more JS-dependent than the other by construction of the test; if one site's answer exists only in JS-hydrated content for one runner, that is a legitimate finding for that site (record it, F6-style, in the record).
5. **Same conditions per runner.** One browser profile per runner, same viewport (desktop 1280×800 default; a mobile persona is not simulated — these are real purchase decisions researched on the device the persona plausibly uses: desktop for P1/P2/P3/P6/P7, tablet/desktop for P4/P8, mobile OK for P5), cold cache per site load.
6. **Session budget.** Each runner: ≤ 25 minutes wall clock, ≤ 4 minutes per task per site. A blown per-site budget is recorded as `not-found within budget` for that site on that task — it is evidence, not a void.

---

## 4. Presentation order — fixed seed table

**Algorithm (auditable, reproducible in any language):** rank the 10 runner IDs by the first 16 hex chars of `SHA-256("tokenperks-blind-battery-v1.0|20260907|" + runner_id)`. The lowest 5 hashes present **TP first**; the highest 5 present **AA first**. No RNG, no shuffle — anyone can recompute the table below and must get the identical assignment.

| Runner | Hash (first 16) | Persona brief | Site presented FIRST | Site presented SECOND |
|---|---|---|---|---|
| R01 | `30cbaf482dc6fa56` | P1 solo dev | token-perks.com | artificialanalysis.ai |
| R02 | `c54a183b62ecfd53` | P1 solo dev | artificialanalysis.ai | token-perks.com |
| R03 | `906c05568b9f80b1` | P2 ML grad student | artificialanalysis.ai | token-perks.com |
| R04 | `b95c795af10d2c5f` | P3 indie hacker | artificialanalysis.ai | token-perks.com |
| R05 | `421161e93650658c` | P3 indie hacker | token-perks.com | artificialanalysis.ai |
| R06 | `6835ad0e67b462f5` | P4 small-biz owner | token-perks.com | artificialanalysis.ai |
| R07 | `2a204be7cc44e4ee` | P5 gift-buyer | token-perks.com | artificialanalysis.ai |
| R08 | `11880e89678bce37` | P6 skeptical senior engineer | token-perks.com | artificialanalysis.ai |
| R09 | `c8881d7cb4d84d57` | P7 data engineer | artificialanalysis.ai | token-perks.com |
| R10 | `e11903d5f07409f1` | P8 operations manager | artificialanalysis.ai | token-perks.com |

Balance check: 5 TP-first, 5 AA-first. The doubled personas get opposite orders across their two runners (P1: R01 TP-first / R02 AA-first; P3: R04 AA-first / R05 TP-first), so persona and order are not confounded for the doubled briefs.

**Why "first/second" matters:** each task is executed on the first-assigned site, answer recorded, THEN the identical task on the second site, answer recorded (complete-with-one-then-the-other, per task — §5). The final bookmark decision happens after all tasks, with both sites still explorable.

**In the runner's materials the sites are called Site A and Site B** — A = first presented, B = second presented. The mapping table above lives with the coordinator only.

---

## 5. Run flow (per runner)

1. Coordinator launches a fresh agent with Appendix A verbatim + persona brief + task prompts.
2. Runner reads persona, confirms persona voice, loads Site A.
3. For each task in the persona's fixed order: complete on Site A → write the answer in persona voice → complete the SAME task on Site B → write the answer → fill one comparison record (§6).
4. After all tasks: the runner explores both sites freely (≤ 5 minutes), then answers the **preference probe** verbatim:
   > "Next time you personally have to make exactly this decision, which of the two sites would you bookmark and go to first — Site A or Site B? One site only. If you genuinely could not decide, say 'tie' and explain what would break it."
5. Runner answers the **recognition probe** verbatim (§7.3).
6. Runner outputs the completed record file. Session ends. No debrief yet; debrief (revealing the study) happens only after the full panel's report is written, and only if the operator wants to.

Runner answers the probes in persona voice. The runner is never asked "which site is better" in the abstract — only the bookmark question, which is decision-anchored.

---

## 6. Collection instrument (identical for every task, every site)

Per task, per site, the record captures:

| Field | Definition |
|---|---|
| `task_id` | e.g. `P1-T2` |
| `site` | A or B |
| `answer` | The persona-voice answer, verbatim |
| `usable?` | Could the persona actually decide from this answer? (yes / partial / no) |
| `why` | One or two sentences: what made this answer usable or not |
| `confidence` | 1–5 (anchors in `scoring.md`) |
| `time` | Seconds to answer |
| `missing_here` | What the OTHER site had that this one lacked — one sentence, **verbatim from the runner**, no paraphrase. This is the field the fix loop mines. |

The `missing_here` field is collected per site, so both directions are captured (what TP lacked on AA-favored tasks AND what AA lacked on TP-favored tasks). Verbatim capture is mandatory: the fix loop (§9) ranks these strings; paraphrase would let the coordinator's priors do the ranking.

---

## 7. Voiding and reruns

### 7.1 Contaminating exposure (void + rerun, same slot)
- The runner sees this kit, the repo, any `docs/` content, or a file tree containing `TokenTracker`/`token-perks` project paths.
- The coordinator's materials name either site as "ours" (e.g., "our site," "the site we're validating").
- The task materials, prompts, or runner brief contain the string "Token Perks" anywhere except the runner's own live visit to the public site.
- The runner's session starts with project context injected by the harness (memory files, project instructions).

### 7.2 Benign exposure (NOT a void)
- Encountering either site's own branding, navigation, footer, or self-description while doing the tasks — that is just the web.
- Third-party mentions encountered through ordinary site reading (a site citing its sources) — but if the runner then goes hunting for who built the site, that runner is voided (curiosity about authorship is contamination risk).
- The runner's prior training knowledge of either domain, if unaccompanied by any project affiliation — note it in the recognition probe record; do not void.

### 7.3 Recognition probe (mandatory, end of every run)
> "Before this session, had you encountered either site? Do you have any prior association, affiliation, or knowledge about who operates either site or why you were asked to compare them? Answer honestly — this does not affect your evaluation."

Any answer indicating knowledge of the project (operator, purpose, "this is someone's product being tested") → **void that runner, rerun the slot with a fresh agent.** A runner that merely recognizes the sites from public life continues, with the fact logged.

### 7.4 Void hygiene
- Voids are logged with the trigger and the probe quote. A panel with more than 2 voids is itself an audit finding: something in the operator's setup leaks, and the report must say where before results are read.
- Reruns reuse the slot's persona AND its presentation order from the seed table. No re-rolling order for convenience.

---

## 8. Task fairness commitments (declared before results)

- `tasks.md` tags every task `FAVORS-TP`, `FAVORS-AA`, or `NEUTRAL` **up front**, with a one-line rationale. The battery includes ≥ 3 `FAVORS-AA` tasks (raw benchmark lookup; per-model eval drill-down; speed/latency lookup) because a battery we can only win is a battery that proves nothing.
- If Token Perks passes 9/10 while going 0-for-3 on `FAVORS-AA` tasks, the report must say so plainly (honesty section, `report-template.md`). The gate can still pass — the gate measures the bookmark decision, not per-task wins — but the honesty section is part of the acceptance package, not decoration.
- AA's acknowledged strengths that this battery does NOT test: benchmark methodology documentation depth, per-reasoning-effort score variant tables at full resolution, and its 640+ model catalog coverage. These are recorded in the report so the claim "preferred for the stated decisions" stays scoped to the decisions tested.

---

## 9. If the battery fails — the fix loop

1. Rank the verbatim `missing_here` strings from every record where Token Perks lost (task level and runner level). Cluster them; the **top losing reason** is the largest cluster. No coordinator judgment about "what would be easy to fix" — the ranking is by frequency, tie-broken by which cluster appears in higher-confidence losses.
2. One build round addresses the top losing reason. Nothing else about the battery changes: same tasks, same keys, same seed table, same personas.
3. Rerun **only the runner slots that failed** (their persona re-run by a fresh agent, same slot order). Passing runners carry their result.
4. Recompute the tally with carried + rerun results. Gate: `prefer(TP) ≥ 9` of 10.
5. **Maximum two fix rounds.** If round 3 still fails, the battery is reported as failed and the V2 launch claim is withdrawn — no third fix attempt, no panel redesign. Three honest failures are a product answer, not a testing problem.

---

## 10. What invalidates the entire battery (restart from scratch, new report)

- Seed table deviated from (any runner's order changed post-hoc).
- Any task text edited after the first runner ran.
- More than 2 voids (setup leak).
- A runner's records show it visited only one site before the preference probe.
- Grading keys changed between runners.

---

## Appendix A — Runner brief (verbatim; coordinator pastes this into the fresh session)

```
WEBSITE COMPARISON STUDY — RUNNER BRIEF

You are comparing two websites to answer a set of practical questions. You will
answer every question TWICE — once using each site — and then give one final
recommendation. This is a straight comparison study. Both sites are equally
valid sources; your job is honest answers, not a verdict anyone wants.

Rules:
1. You are [PERSONA NAME / ROLE — inserted from personas.md]. Adopt this
   perspective fully. Answer in your own voice, for your own decision.
2. Your persona brief and your questions follow below. The questions are yours;
   answer them as you would if you found these sites yourself.
3. Use ONLY the two sites to answer. No web search, no other sites, no prior
   knowledge presented as fact — if a site doesn't tell you, say so.
4. For each question: complete it on Site A first, write your answer, then
   complete it on Site B, write your answer, then fill the record below.
   Budget: 4 minutes per site per question. If you can't find it, write
   "not found" — that is a valid and useful answer.
5. Judge usefulness for YOUR decision, not beauty. A prettier site that
   doesn't answer you has failed you.

Sites:
  Site A: [first URL from the seed table]
  Site B: [second URL from the seed table]

[PERSONA BRIEF — pasted verbatim from personas.md]

[TASK PROMPTS — pasted verbatim from tasks.md, in the listed order]

After all questions, explore both sites briefly (max 5 minutes) and answer:

PREFERENCE: Next time you personally have to make exactly this decision,
which of the two sites would you bookmark and go to first — Site A or Site B?
One site only. If you genuinely could not decide, say "tie" and explain what
would break it.

RECOGNITION: Before this session, had you encountered either site? Do you have
any prior association, affiliation, or knowledge about who operates either
site or why you were asked to compare them? Answer honestly — this does not
affect your evaluation.

For each question on each site, record:
  task_id / site / answer (verbatim) / usable? (yes|partial|no) /
  why / confidence (1-5) / time (s) /
  missing_here (what the OTHER site had that this one lacked — one sentence)
```

The bracketed slots are the ONLY things the coordinator fills in. The brief never says which site belongs to whom, never mentions a threshold, never mentions AI-subscription deal coverage as a topic before the runner sees the sites.
