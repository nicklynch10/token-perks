# Slot 08 run report — R08 · P6 skeptical senior engineer · TP-first (RETRY)

```
RUNNER: R08          PERSONA: P6 (skeptical senior engineer)     ORDER: TP-first (seed slot)
SESSION: 2026-09-07, agent runner, desktop viewport, ~14 min total
SITE A: http://localhost:3318 (frozen build served from E:/TokenTracker/out)
SITE B: https://artificialanalysis.ai (live)
VOIDED/RERUN: RETRY slot — prior runner died before filing (no prior record read).
  CONTAMINATION FLAG FOR AUDITOR: this runner was NOT blind in setup. It was
  launched from inside the project repo with the full battery kit (protocol,
  personas, tasks+keys, scoring, template) and knows Token Perks is the project
  under test. Per protocol s7.1/s7.3 this is a void trigger; the call to accept
  or void this record sits with the grader/auditor, not the runner. Task answers
  below were collected black-box (local serve + AA live only; no app//lib//
  content/ source read; no production token-perks.com fetch; no web search).
```

Serve note: port 3318 was already occupied when this runner started. The bytes on
:3318 were diffed against a fresh `npx -y serve out` instance (this repo): homepage,
/best, /changes, /guides, /api all byte-IDENTICAL (336,884-byte homepage). Testing
was done on :3318 = the frozen build.

## P6-T1 · FAVORS-AA · "Show me the actual evaluation data: what benchmark suite produced the headline number, what's the score, and does it vary by reasoning-effort setting?"

### Site A (TP) — answer (verbatim, persona voice)
"Artificial Analysis Intelligence Index v4.3, accessed 2026-09-07: GLM-5.3 scores 44,
GLM-5.3-Flash 42. The closed models it supposedly matches sit clearly above it —
Claude Fable 5.1 at 53, Opus 5 at 51, GPT-5.6 Sol at 47 — at blended costs of
$20.00/M, $10.00/M and $8.00/M against GLM-5.3's $2.15/M. So the claim dies on the
numbers: cheaper, yes; matching, no, nine points adrift. What I did NOT get here:
the names of the evaluations behind the 44, or any per-effort split. The site's
methodology page says this outright — scores are single quoted reference values,
estimate asterisks are carried, and coding/math/agentic sub-tabs don't exist because
only AA's Overall index is public per model. Every score links out to the AA source
row instead."

- usable?: partial
- why: Headline number, index version, and the gap that kills the claim were all there with dates and per-row source links — but the eval names and effort variants I explicitly asked for are structurally absent; the site hands me a link to the other site instead.
- confidence: 3
- time: ~150s
- missing_here (verbatim): "The named 10-evaluation suite list and the per-effort variant rows the other site carries."

### Site B (AA) — answer (verbatim, persona voice)
"Intelligence Index v4.3, ten named evals: AA-Briefcase, GDPval-AA v2,
AutomationBench-AA, Terminal-Bench v4.0, SciCode, Humanity's Last Exam, GDP.pdf,
CritPt, AA-Omniscience, AA-LCR v1.1. GLM-5.3 (max), by Z AI, scores 44 — listed as
the top open-weights entry; the (max) qualifier is the effort split, shown as a
separate row from Flash at 42. Against Fable 5.1's 53 and Opus 5's 51 the team-chat
claim fails by the site's own table. Same page confirms the price half: $1.40/M in,
$4.40/M out. Methodology page carries the version; model page carries maker, score,
and price together."

- usable?: yes
- why: Named suite, version, score, effort-qualified variant, maker, and the comparison that settles the claim, all on one model page plus one methodology page.
- confidence: 5
- time: ~120s
- missing_here (verbatim): "The side-by-side blended cost per million next to each score, which made the 'fraction of the price' half of the claim instantly checkable."

## P6-T2 · FAVORS-TP · "Same model, money side: verify the price claim from the official sheet — and tell me whether the flat monthly route is cheaper than metered for a heavy user, including any fine print."

### Site A (TP) — answer (verbatim, persona voice)
"API verified at $1.40 in / $4.40 out per million, labeled DIRECT and linked to Z.ai's
official pricing sheet. The flat route exists and it's cheap: GLM Coding Plan Lite,
$18/mo, 2,000 credits per 5-hour cycle plus 10,000 weekly, covers GLM-5.3 and Flash,
works with Claude Code, Cline and OpenCode — for a heavy daily user that beats
metered money. Fine print, all stated: Pro ($72-80) and Max ($160-168) prices are NOT
officially published, community numbers only, flagged UNCERTAIN instead of quoted as
fact; night-owl unlimited Flash runs 23:00-09:00 daily for paid plan users only;
context windows aren't on the pricing page. That Pro/Max honesty flag is exactly the
kind of thing that earns a skeptic's trust."

- usable?: yes
- why: Verified API numbers with an official-sheet link, the $18 flat anchor with quota math, the unpublished-price honesty flag, and two time/cap caveats — the complete heavy-user verdict.
- confidence: 4
- time: ~90s
- missing_here (verbatim): "Nothing on the money side — the other site had no flat plan and no fine print at all."

### Site B (AA) — answer (verbatim, persona voice)
"API price confirmed: $1.40/M in, $4.40/M out, plus an 81% cache discount and a
computed $1.81 per index task. But the flat route is simply not here — no coding
plan, no $18 tier, no credit caps, no promos. The coding-agents page says it out
loud: its dollar figure is 'Average pay-per-token API cost per task' and 'not
consumer plan pricing or the full operational cost.' So the price half checks out
and the subscription question is unanswerable on this site."

- usable?: partial
- why: The metered price verified cleanly, but the flat-vs-metered question — the actual question — cannot be answered here by the site's own admission.
- confidence: 3
- time: ~120s
- missing_here (verbatim): "The $18 flat coding plan, the unpublished-Pro-price honesty flag, and every line of fine print."

## Free exploration (~2 min, both sites)
Site A: leaderboard table (41 paid routes, blended $/M, per-row AA II v4.3 values with
src labels), footer "Independent model benchmarks we respect (external, not
affiliated): Artificial Analysis — we link rather than republish," no-affiliate-links
money page. Consistent verification-label discipline throughout. Site B: model pages
carry maker + score + price + eval cost ($2,372.92 to evaluate GLM-5.3 max); eval
glossary pages per benchmark (Terminal-Bench v4.0, SciCode have own URLs).

## Preference probe (verbatim)
Q: "Next time you personally have to make exactly this decision, which of the two
sites would you bookmark and go to first — Site A or Site B? One site only. If you
genuinely could not decide, say 'tie' and explain what would break it."
A (verbatim): "Site B. The decision I keep making is adjudicating a model claim
against the data, and the eval evidence — suite names, versions, effort splits —
lives on Site B as the primary source; Site A says so itself and links there. Site A
won the money question outright and its honesty flags (UNCERTAIN instead of a guess,
carried estimate asterisks) earned real respect, but a price sheet I can read on the
vendor's own docs while the benchmark drill-down exists in exactly one of these two
places. I'd bookmark Site B and check prices at the source."

PREFERENCE CODE: PREF-AA · CONFIDENCE: 4/5

## Recognition probe (verbatim)
Q: "Before this session, had you encountered either site? Do you have any prior
association, affiliation, or knowledge about who operates either site or why you
were asked to compare them? Answer honestly — this does not affect your evaluation."
A (verbatim): "Flagging honestly: I was launched from inside the project repository
with the study's own protocol and task files, so I know one of these sites is the
project under test and which one it is. I did not let that shape the answers above —
the eval drill-down gap on Site A is structural and stated on its own methodology
page — but the auditor should treat this record as setup-exposed per the void rules."

RUNNER NOTES (verbatim): "Task split 1-1 at the task level: Site B took the eval
drill-down (my signature question), Site A took the money side (the complete
flat-vs-metered verdict with fine print). Bookmark follows the harder-to-replace
half. If Site A ever carried the named suite list and effort variants with the same
citation discipline it already applies to prices, this bookmark flips."
```

## For the coordinator (reply line)
PREFERENCE: AA
