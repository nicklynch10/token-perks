# Clean battery run — R09 (P7 data-engineer, AA-first)

Seed: R09 = P7, AA-first → Site A = https://artificialanalysis.ai, Site B = https://token-perks.com
Recognition: Site A yes (seen in training, not actively used); Site B no (fresh).
Report received inline 2026-09-07. Verbatim runner text below.

---

SITE A RESULTS

TASK 1 — Cheapest batch-discount route:
Numbers: none shown. No discount %, no batch blended price, no model roster found.
Clicks: ~3-4. Home (1) -> Models / Inference tables (2) -> individual model page e.g. standard-rates model at $1.25 in / $10.00 out (3) -> methodology page (4). Searched homepage text for batch/flex/bulk: zero hits. My pipeline take: if I can't grep a "-50%" in one table scan, it doesn't exist for batch planning.

TASK 2 — Off-peak / off-hours pricing:
Facts: none shown. No hours, no discount, no night/weekend window on home, Models, Inference, model pages, or methodology excerpt.
Clicks: ~2-3, same path as Task 1.

TASK 3 — Prompt-caching economics:
Facts, per-model only, no consolidated provider table:
- Example flagship reasoning model: Input $1.25/M, Output $10.00/M, Cache Discount 90%, Blended $1.34/M on a stated 7:2:1 cache-hit/input/output ratio. 400k context noted, no tier.
- Second flagship model: same $1.25 in / $10.00 out, 90% cache discount, $1.34/M blended, $0.23 mean assignment, $706.89 full Index run cost.
- General explainer only: cached prompts = previously processed, typically significant discount vs regular input; cache write and storage billed separately.
- Which providers: not listed in one place; must open each model page. No TTL, no minimum-token, no write-fee $ except the generic warning.
Clicks: 2-3 to get first cache number. As a batch guy this is annoying: good unit economics, but scattered one model at a time, no bulk export.

SITE B RESULTS

TASK 1 — Cheapest batch-discount route:
Numbers, all inline on the single homepage catalog, no extra page needed:
- Formula stated: Blended $/M = (3x input + 1x output)/4 at LIST price; batch/flex/off-peak/cache kept aside, not averaged in. Must halve manually.
- Anthropic rows: batch -50% across rows, e.g. $10/$50 flagship with Cache read $0.25, write $12.50; batch -50%.
- OpenAI rows: Batch -50%; Fast mode ~2x; +10% residency uplift.
- Google rows: Flash-tier $0.75/$3.75 with batch/flex about half, priority ~1.8x; Pro-tier $1.25/$10 with explicit batch $0.625/$5.00.
- Mistral Large $0.5/$1.5: batch -50%.
- Together AI: Batch API column noted.
- Cheapest batch-eligible by printed blend: mini/nano listing at $0.25/$2 and $0.05/$0.40 with printed list blend ~$0.688/M, ~$0.069 per 100k-unit job; batch halves that, implying nano ~$0.025/$0.20. That's my notebook's winner for volume jobs.
Clicks: 1 to land, catalog already visible; 2 if counting the API/catalog filter. This is what I want: one scan, all modifiers in-row.

TASK 2 — Off-peak / off-hours pricing:
Facts, same page:
- DeepSeek V4 Flash / Pro: Peak = Mon-Fri 01:00-04:00 and 06:00-10:00 UTC; all other hours off-peak at exactly half peak. Flash cache-miss in $0.22 off-peak / $0.44 peak; out $0.66 / $1.32; cache-hit $0.007 / $0.014. Pro cache-miss $0.66 / $1.32; out $1.98 / $3.96; cache-hit $0.022 / $0.044.
- Alibaba region row: Hong Kong prices with night discounts 22:00-08:00 UTC+8, discount % not stated.
- Z.ai coding promo: unlimited flagship-flash model 23:00-09:00 daily, doubled quota on other agents off-peak.
Clicks: 1. Zero hunting, hours + half-price math right in the row. Easy to schedule a cron job around.

TASK 3 — Prompt-caching economics:
Facts, per-row across providers on same page:
- Anthropic ladder: read $0.25 / $0.50 / $0.20 / $0.10 with writes $12.50 / $6.25 / $2.50 / $1.25.
- OpenAI ladder: cached input $0.40 / $0.20 / $0.02, 5.5 ladder ~10x cheaper, mini $0.025 / nano $0.005, legacy reasoning $7.50.
- xAI: $0.50/$1.00, $0.30/$0.60, $0.20/$0.40 by version, contexts 500k-1M stated.
- Kimi / MiniMax / Mistral / DeepSeek: e.g. $0.30 hit with 1M context, $0.19/$0.16, read $0.06 / write $0.375, up to 90% cheaper, $0.007/$0.014 flash hit.
- Discount framing: about 10x cheaper, up to 90% cheaper.
- Catch: methodology says cache discounts excluded from blended; no TTL or minimums listed; promo expiry noted e.g. at least through Nov 21, 2026; prices exclude taxes.
Clicks: 1. One table gives me the whole caching shopping list.

RECOGNITION
- Site A: Yes — seen in training data as a well-known model benchmark/price-comparison hub; not actively used as a buyer in this session before today.
- Site B: No — had not seen or used before this session; evaluated fresh from what it displayed today.

FINAL VERDICT
PREFERENCE: Site B
Confidence: high
Rationale: For minimizing blended $/M at volume, Site B put batch -50% flags, off-peak UTC windows with exact half-price input/output/cache-hit numbers, and per-row cache read/write figures all in one scannable catalog with a stated (3:1) blend formula, taking 1-2 clicks total. Site A gave clean per-model list prices, 90% cache-discount examples, and useful quality/run-cost context for enforcing a quality floor, but showed zero batch routes and zero off-peak hours after 3-4 clicks across home, tables, model pages, and methodology, forcing per-model digging for even basic caching. Site A is better for standardized quality-vs-cost vetting; Site B is decisively better for raw batch/off-peak/cache arithmetic with minimal clicking.

---

## Tally note (coordinator)

Clean R09 = win for Token Perks (Site B). FINAL clean tally: TP 9 — AA 0 across R01, R03, R04, R05, R06, R07, R08, R09, R10.
R02 provisional (brief mismatch, TP-leaning) not needed for the gate.
GATE: 9/10 clean — PASSED. No fix round required.
Fix-list carryovers (runner-confirmed, build regardless): cache TTL/minimums missing; Alibaba night-discount % not stated; batch requires manual halving (no computed batch-price column).
