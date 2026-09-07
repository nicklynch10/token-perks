# TOKEN PERKS — PERSONA-PANEL TEST KIT v1.0

Hand this document verbatim to fresh tester agents. Testers: follow it exactly, change nothing, write no files.

## 0. Tester instructions (read first)

**What you are testing.** Token Perks (token-perks.com), a deals-first AI publication: "The best AI offers. The catches, upfront." It tracks exactly 3 offers (Kimi K3 membership, Zen Muse Spark free promo, NVIDIA K3 free dev access), 2 guides, and 6 core pages: home `/`, `/best/`, offer pages `/best/<slug>/`, `/guides/` (+2 guides), `/methodology/`, `/how-we-make-money/`, `/changes/`.

**How to run the site.** Build and serve it yourself: static export served on your own port (e.g. `npx serve out -l 4173`). Never judge from source files or reader-mode renderings — for anything that could live in structured data or JS-hydrated content, `curl` the raw HTML from your served port.

**How to test.** Mobile viewport only: 390×844. Fresh profile/incognito per run, cold cache. Each persona gets TWO runs by independent agents:

- **Naive run** — you are the persona. Speak/write in persona voice. Follow the entry task naturally, then the numbered tasks in order. Record honest confusion; do not use knowledge the persona wouldn't have. Never open the repo.
- **Skeptic run** — adversarial mode. Execute the same tasks while hunting for contradictions between pages, numbers that don't match the answer keys below, overclaims, and stale or unfalsifiable freshness claims. Your job is to make tasks fail *with evidence*.

Both runs score independently. A persona fails a task if either run fails it. Disputes are settled only by exact quoted text + path.

**Timing.** Run a visible stopwatch. Record time per task (each has a budget) and time-to-primary-decision. A task exceeding its budget is a dead-end (see codes), even if you eventually find it.

**Scope discipline — no styling judgment.** A round-2 visual pass is in flight. Judge structure and copy only. Note aesthetic problems in one line at the end ("notes for visual pass") but score nothing on them. The sole visual exception: if styling actively blocks comprehension (text unreadable, control unusable at 390px), that is a structure failure — fail the task it blocks.

**Fail codes.**

- **F1 wrong-fact** — tester finds/derives a number or claim that contradicts this kit's answer key or another page on the site.
- **F2 dead-end** — fact not findable on-site within the task budget, though the site elsewhere claims to provide that kind of information.
- **F3 contradiction** — two on-site statements disagree on the same fact.
- **F4 misleading** — statement is technically present but overclaims, buries the load-bearing caveat, or would send the persona into a wrong decision.
- **F5 broken route** — link, path, or interactive control doesn't work as described.
- **F6 unverifiable** — answer exists only in an image, or vanishes in raw HTML / JS-stripped render.
- **F7 persona-voice failure** — fact is present but phrased so the persona (not an expert) can't use it.

Task flags: **[S]** = safety-critical task; any F-code on it is an automatic panel fail. **[G-t]** = gap-tolerant: the site honestly lacking a feature is a PASS if the persona can still complete the decision; an implied or fake version of the feature is a FAIL.

**A factual dead-end (binding definition).** During a rubric task, the persona (a) cannot find the fact on-site within budget although the site claims to provide that kind of information, (b) finds two on-site statements that contradict each other on it, or (c) finds an on-site statement checkably false against the site's own data (`content/offers/*.json`) or its own cited official source. Any of (a)–(c) = one dead-end event, coded F2/F3/F1 respectively.

---

## 1. Shared instruments

### 1.1 60-second first-impression protocol (every persona, both runs)

Setup: mobile viewport 390×844, cold cache, stopwatch ready. Load the homepage; start the timer at first paint. The persona browses freely for exactly 60 seconds (no site search — the site has none anyway). At 60s, device face-down / eyes off screen. From memory, answer five questions in persona voice, recorded verbatim:

1. In one sentence, what does this site do?
2. Name one concrete price you saw — with the actual number.
3. Name one thing the site warned you could go wrong.
4. How fresh does the site say its information is?
5. What would you click next, and why?

**Scoring:** 1 point per acceptable answer. Q1 must mention deals/offers + the catches angle (or equivalent). Q2 must contain a correct number from the key ($19/$39/$199/$0 are the expected candidates). Q3 must be an actual on-site catch (shared credit pool, 5-hour/weekly caps, promo can end, account-variable limits — not an invented one). Q4 must reference a stated verification date (Sep 6 2026) or "snapshot, re-verify" framing — "it looked recent" scores 0. Q5 must name a real on-page destination. **Pass = 5/5. Weak = 4/5. Fail ≤ 3/5.**

### 1.2 Wow score (0–10, scored once per run, after all tasks)

Score in persona voice with one sentence of justification. Rule: **a 7+ without a repeatable specific fact is invalid — downgrade to 6.**

- **0** — Cannot say what the site is for; leaves confused.
- **2** — "Some AI deals blog." No trust, no use.
- **4** — Understands the offers; feels generic; closes the tab with no takeaway.
- **6** — Got a usable answer; would come back when actually buying; nothing memorable.
- **7 (threshold)** — Learned at least one non-obvious specific they can repeat unprompted (a catch, a break-even task count, a dollar figure); would bookmark or send one link to someone.
- **8** — Would change a real purchase decision from this session; can name the differentiator unprompted ("they lead with the catch").
- **9** — Would recommend it with a specific anecdote; ranks it above how they'd normally research this.
- **10** — Declares it their default first stop before any AI subscription decision; states a future habit, not just an opinion.

---

## 2. PERSONA 1 — ALEX (the core Tokenhacker)

**One-liner.** Alex is an indie developer who codes with AI agents all day, has a hard $40/month ceiling, and is deciding today whether to pay for Kimi K3, use a free route, or both. Alex doesn't read marketing — Alex reads numbers and looks for the trap before the signup link.

**Entry task (as Alex would say it).**
"I write code all day with AI — agent runs, refactors, whole features. I've got maybe $40 a month, tops. I keep hearing about 'Kimi K3.' Figure out what it would actually cost me per month of heavy coding, whether I should pay monthly or yearly, and whether there's a way to spend nothing. I'm deciding today."

**Primary task (3-minute budget).** Decide which route Alex pays for this month — or none — and state the exact monthly cost. PASS if a decision + a correct dollar figure are produced within 180s from a cold homepage load; FAIL if no decision, a wrong figure, or budget blown.

**Tasks (budget each).**

**A1 — Heavy-coding monthly cost (90s).** "What does Kimi K3 actually cost me per month of heavy coding?"
- PASS: Names the tier ladder ($19 Moderato / $39 Allegretto / $99 Allegro / $199 Vivace); selects Allegretto $39 as the steady-coding pick (or Moderato $19 for light use); cites the verified date or snapshot framing; reaches per-task framing (≈$0.33/task at 120 tasks).
- FAIL: Any wrong number (F1); only the "$19/mo" hero line with no tier ladder surfaced (F4 — the headline price is the light tier); verified-date absent from the answer (weak pass at best, not FAIL unless also misstated).

**A2 — Annual vs monthly decision (90s).** "Should I prepay for the year?"
- PASS: Finds annual ≈$31/mo effective / ~$372 upfront (saves ~$96/yr); lands on the site's actual advice — stay monthly until volume is proven stable / cleared break-even 3+ months; mentions break-even shift (~49 tasks/mo monthly vs ~39 annual) or the month-10 payback point; flags that annual's refund terms are the provider's and must be confirmed first.
- FAIL: Recommends prepay without the stability condition (F4); wrong effective prices (F1); presents annual as risk-free (F4).

**A3 — Break-even calculator (120s).** "Run my own numbers: I do about 120 tasks a month."
- PASS: Finds the calculator (home or cost-per-task guide); sets tasks ≈120 and sees subscription side win with the crossover line ("crossover at ~50 tasks/mo"); demonstrates the URL updates with the sliders (shareable ?tasks=&tokens=) or at minimum reads the verdict line correctly; optionally tests a low-volume case (e.g. 30 tasks → PAYG/free wins).
- FAIL: Calculator not found (F2); verdict misread (cheaper bar stated as more expensive — F1); control unusable at 390px (F5).

**A4 — The catch before the signup link (60s).** "What's the trap I'll hit in month two?"
- PASS: On `/best/kimi-k3-core/`, quotes the catch box: one shared credit pool + 5-hour and weekly controls throttling heavy sprint days; optionally the 2.5x tier jump ($39→$99).
- FAIL: Catch not found on the page within budget (F2); tester concludes there is no catch (F4 — the whole site brand is catch-upfront; missing it means the page structure failed).

**A5 — The $0 route and its expiration (90s).** "What's free, and when does it stop being free?"
- PASS: Finds Muse Spark promo: $0 for input, cache, and output; identifies it's a limited-time promo with **no published end date** ("end date confirmed only inside the official product"); internalizes "don't build on it" / keep work portable.
- FAIL: Presents the promo as a durable free plan (F4); invents an end date not on the site (F1); states it's unlimited (F1 — the site says free ≠ unlimited).

**A6 — Route-selection trap [S] (90s).** "If I subscribe, why might my usage NOT draw from the membership?"
- PASS: Surfaces the coding-endpoint vs PAYG split: tools must point at `https://api.kimi.com/coding/`; a PAYG key bills separately and the membership doesn't cover it.
- FAIL: Any miss here is F4/F2 — this is the site's single most expensive-to-get-wrong fact for Alex.

**A7 — The dollar answer (60s).** "Bottom line in dollars."
- PASS: Produces a coherent bottom line, e.g.: under ~50 tasks/mo → free route or PAYG; over it → Allegretto $39 (annual only if stable, ~$31/mo effective); consistent with the hero crossover line.
- FAIL: Bottom line contradicts A1–A6 findings (F3); no number in the answer (F7).

**Alex 60s protocol emphasis.** Q2 must be a real price; Q3 should be the catches-upfront brand line or a specific catch; Q5 should be the Kimi verdict link or the calculator.

**Alex wow check.** A 7+ requires repeating, unprompted, one of: ~49 tasks/mo break-even, ~$31/mo effective annual, shared-pool/5-hour catch, or the exact-string/coding-endpoint traps.

---

## 3. PERSONA 2 — PRIYA (the gift-buyer)

**One-liner.** Priya is a non-technical gift-buyer purchasing an AI coding subscription (~$50 budget) for her partner's birthday; she has never bought software, fears surprise auto-renewals, and needs a safe exit path. **Known site gap:** Token Perks has no gift mechanics (no gift cards, gifting flow, or gift FAQ). Priya's script therefore tests whether the site gets her safely to a correct purchase decision using what exists — official links only, renewal/refund guidance, no on-site checkout — and whether it *honestly* declines what it doesn't offer.

**Entry task (as Priya would say it).**
"My partner's birthday is next week. He codes for fun and keeps hitting paywalls on his AI tools. I want to buy him an AI subscription, around $50. I've never bought software before — I don't want a surprise auto-renewal, I want to know how to undo it if he hates it, and I need to be sure this website isn't going to take my card details. Walk me through it."

**Primary task (3-minute budget).** Pick the gift: which plan, its price, when it renews, and how it gets cancelled if he hates it. PASS if all four elements are correct within 180s; FAIL if any element is wrong or the budget blows.

**Tasks (budget each).**

**P1 — What to buy under $50 (90s).** "What exactly would I buy for him?"
- PASS: Names a concrete tier ≤$50 with its price — Moderato $19/mo (light use) or Allegretto $39/mo (steady coding) — and says in plain words what it is (a monthly AI coding membership, not the site's own product).
- FAIL: Names a tier over $50 without rejecting it (F4); implies the purchase happens on this site (F4 — critical); cannot name any product (F2).

**P2 — Renewal, precisely (90s).** "What will happen to my card in month two?"
- PASS: States the renewal terms: renews monthly at the same tier price; annual is paid upfront (~$372 for the $39 tier); finds this on the offer page ("Price now, renewal later") or comparison table.
- FAIL: "I'm not sure what renews" after searching (F2); any wrong renewal figure (F1).

**P3 — The refund/cancellation warning [S] (90s).** "If he hates it, how do we get out?"
- PASS: Finds the monthly-vs-annual guidance: monthly is the low-risk path — cancel and access runs to the end of the paid month, no refund needed; annual refund/proration rules are the provider's and must be confirmed before prepaying; lands on "start monthly" for a gift of unknown fit.
- FAIL: Recommends annual prepay with no cancellation caveat (F4 — safety-relevant); cancellation info unfindable (F2).

**P4 — Payment safety [S] (90s).** "Is this site going to touch my card?"
- PASS: Establishes, with on-site text, that the site never takes payment or credentials: every outbound link goes to an official provider page; footer line "Never enter credentials on any page here — we will never ask for them"; how-we-make-money page confirming v0 has zero affiliate links. Names the actual payment destination as the provider's official site.
- FAIL: Any on-site element implying a checkout, order form, or payment capture on token-perks.com (F4 — automatic task fail and panel-level flag); safety footer unfindable (F2).

**P5 — The catch to warn him about (60s).** "Is there anything he won't like?"
- PASS: Retells a catch in plain words: heavy sessions can get throttled by 5-hour/weekly limits even with credit left (shared pool).
- FAIL: No catch recalled (F2/F4).

**P6 — When the free options make more sense (60s).** "Is there a cheaper way to try the idea first?"
- PASS: Learns there are two $0 routes (Zen promo, NVIDIA dev) and — the key judgment — that they're not gift material: promos end, routes are for the user's own dev setup. Optional but strong: states the site says to make paid decisions on post-promo prices.
- FAIL: Recommends gifting a time-limited promo as the gift itself (F4).

**P7 — Freshness before paying [G-t] (60s).** "How do I know these prices are still good on his birthday?"
- PASS: Finds the verified Sep 6 2026 badge/snapshot line and its instruction to re-verify at official terms before paying; understands the site is a snapshot, not a store.
- FAIL: Believes prices are live-guaranteed (F4); no date found (F2).

**Priya 60s protocol emphasis.** Q1 must land as "a site comparing AI deals, telling you the downsides." Q3 should surface a warning even for a non-technical reader; if the catches-upfront pattern doesn't register in 60s to a non-technical persona, note it — it's the brand's core claim under test.

**Priya wow check.** A 7+ requires a repeatable specific: "renews at the same price monthly," "cancel runs to end of month," "they never take your card — links go to the official provider," or a dollar figure. **[G-t] note:** "no gift-wrap option" must NOT lower the wow score; the site never promises gifting. It lowers wow only if its absence is *hidden* or the site pretends otherwise.

---

## 4. PERSONA 3 — SAM (the zero-budget CS student)

**One-liner.** Sam is a CS student with literally $0 to spend who wants the maximum amount of legitimate free AI coding access — real free, not free-trial bait — and a fallback plan for when the free runs out (hard cap $20 if ever).

**Entry task (as Sam would say it).**
"I'm a CS student. My budget is literally zero dollars. Find me every legit way to use a strong AI coding model for free — actual free, not 'free trial, give us your card' — tell me the catch on each one, and what I'm supposed to do when the free runs out. If I ever have to pay, it has to be under $20."

**Primary task (3-minute budget).** List the free routes Sam would actually use today, each with its catch, plus the named fallback for when free ends. PASS if both $0 routes + their catches + a correct sub-$20 fallback appear within 180s; FAIL otherwise.

**Tasks (budget each).**

**S1 — Inventory of free (60s).** "What's actually free here?"
- PASS: Finds both $0 routes: Zen Muse Spark 1.3 promo ($0 input/cache/output) and NVIDIA Build Kimi K3 (free for dev/prototyping). Hero line "2 free routes live" or equivalent is acceptable discovery.
- FAIL: Either route missed (F2); a paid tier presented as free (F1).

**S2 — NVIDIA route catch (60s).** "What's the catch on the free NVIDIA route?"
- PASS: Quotes the substance: free for development/prototyping only, limits vary by account (quota is "a rumor until tested"), no production use, listings can rotate. Internalizes "measure your ceiling on day one."
- FAIL: Believes it's unlimited or production-ready (F4); no catch found (F2).

**S3 — Muse Spark access steps and the exact-string trap (90s).** "How do I actually get the free one?"
- PASS: Reproduces the access path: /connect → Zen → /models, select the exact string "Muse Spark 1.3 Contributor Free"; flags that near-identical paid entries sit one row away and bill normally; knows the end date is visible only in-product.
- FAIL: Paraphrases to "just search for Muse Spark" (F4 — the exact-string warning is the point); path unfindable (F2).

**S4 — The card question [S] (60s).** "Do these free routes need a credit card?"
- PASS: Finds the site's honest non-answer in the NVIDIA FAQ: two routes are free at the point of use, but whether signup requires a card varies by account/region — "we do not promise card-free onboarding." Accepts that as the correct, honest answer.
- FAIL: Site claims card-free signup outright (F1/F4); tester leaves without any answer (F2).

**S5 — When free ends (90s).** "What do I do when the free runs out?"
- PASS: States the site's actual guidance: keep work portable, don't build on the promo; if paying, the cheapest durable fallback is Moderato $19/mo (~$15/mo effective annually) — under Sam's $20 cap — with break-even ~24 tasks/mo against the $0.80/task reference (below that, stay free/PAYG).
- FAIL: Names a fallback over $20 as the primary option (F4); "nothing, it just ends" (F2 — the offer pages are explicit about portability and post-promo pricing).

**S6 — Durability honesty (60s).** "Does the site admit free stuff ends?"
- PASS: Points to the frontier framing: free routes "win on price but not durability" — labeled "not durable" / "not production"; the Muse page verdict "claim it now, don't build on it."
- FAIL: Anywhere the free routes are presented as lasting options (F4).

**S7 — Unlimited honesty [S] (60s).** "Is free actually unlimited?"
- PASS: Site states free ≠ unlimited (reasonable-use gating; account-variable quotas; unpublished throughput). Tester confirms no page promises unlimited free usage.
- FAIL: Any "unlimited" claim found (F1 — skeptical sweep should grep for it); gating caveats unfindable (F2).

**Sam 60s protocol emphasis.** Q2 should be "$0" or "$19"; Q3 any stated free-route catch; Q5 likely the Muse Spark or NVIDIA card — a non-click on any free-route card is a red flag for the whole value proposition.

**Sam wow check.** A 7+ requires repeating: the exact-string trap, "limits vary by account," $19/24-task fallback math, or "free ≠ unlimited." Sam is the hardest wow: skeptical of anything that sounds like marketing.

---

## 5. PERSONA 4 — JORDAN (the skeptical IT admin)

**One-liner.** Jordan runs IT for a small team whose engineers keep pasting token-perks.com links into chat; Jordan evaluates whether the site itself is trustworthy — verification methodology, monetization and disclosure, data freshness, and exit hatches — and will block the domain if the site can't answer for itself.

**Entry task (as Jordan would say it).**
"Before I let my team keep using links from this site, I need three things: how they actually verify the prices they publish, whether they get paid when my engineers click through and buy, and how I can tell how stale any given number is. If I can't answer those from the site itself in a few minutes, we block the domain."

**Primary task (3-minute budget).** Issue a verdict — allow, allow-with-caveats, or block — where each leg of the reasoning cites a specific page. PASS if a verdict + page-level citations exist within 180s; FAIL if no verdict or verdict is citation-free.

**Tasks (budget each).**

**J1 — Methodology, found and understood (90s).** "How do they verify prices?"
- PASS: Finds `/methodology/`, states its version and date (Methodology v0.1, dated Sep 6 2026) and at least two real rules: official sources only; trailing-7-day median windows; dual unit+per-task display; uncertainty/confidence labels; link-first benchmark attribution.
- FAIL: Methodology page unfindable from home/footer (F2); describes rules not on the page (F1).

**J2 — The money story [S] (90s).** "Do they get paid when my engineers buy?"
- PASS: Finds `/how-we-make-money/`: v0 contains zero affiliate links, every outbound link goes to an official provider page; future rules stated (rel="sponsored", paid placement never changes verdicts/catches/dates, page updated the day the first paid link ships); cross-checks the same disclosure in the footer.
- FAIL: Cannot find any monetization disclosure (F2); disclosure contradicts footer or offer pages (F3).

**J3 — Freshness audit trail (90s).** "How stale could a number be, and how would I know?"
- PASS: Traces the chain: "Verified Sep 6 2026" badge on a page → snapshot framing ("not a live feed, re-verify") → `/changes/` verification log with dated passes recording what was checked and what did not. States the claimed cadence (weekly full re-verification; daily on live promos) and confirms the log currently supports it (two passes, both dated 2026-09-06 — the log is young, and the site says so).
- FAIL: Badges with no discoverable log (F2); log entries undated or vague (F4); cadence claim presented with no falsifiable record (F4).

**J4 — Data portability and licensing (60s).** "Can I audit their raw data myself?"
- PASS: Finds the machine-readable dataset `/api/offers.json` (footer link) and the CC-BY-4.0 license statement; ideally verifies the JSON actually serves and contains the offers with verified_at dates (curl it).
- FAIL: Feed link broken or 404 (F5); JSON contradicts page prices (F3 — skeptic run must actually diff one price).

**J5 — Conflict-of-interest probes on a paid pick (90s).** "Is the top recommendation too clean?"
- PASS: On `/best/kimi-k3-core/` finds: the catch box present and specific; evidence items carrying low/medium confidence labels (e.g., break-even figures labeled "illustrative," "Token Perks calculation"); official-terms link back to the provider. Concludes the site publishes negative facts about its own top pick.
- FAIL: Top pick presented without catches or with only high-confidence claims (F3/F4).

**J6 — Falsifiability sweep [S] (90s).** "Try to catch them overclaiming."
- PASS: Checks the "verified-X plus ends-Y" rule (methodology: time-boxed items always show an end, never a bare "verified" on a decaying promo) and finds the site's honest handling of the one offer with no published end date (Muse Spark: end date stated as not published, confirmed only in-product). Checks the "nothing mocked" claims: reader-reports band explicitly empty, no fake UGC.
- FAIL: Any mocked/fabricated social proof found (F1 — automatic panel fail); ends-Y rule stated but violated by a live offer (F3).

**J7 — Trust and security signals [S] (60s).** "Any reason to distrust the domain itself?"
- PASS: Finds the footer commitment: "Never enter credentials on any page here — we will never ask for them"; no login/signup/account surface anywhere on the site; outbound links to official domains only.
- FAIL: Any credential-collecting surface (F4 — automatic panel fail); footer promise unfindable (F2).

**J8 — What the site refuses to do (60s).** "Where do they draw lines?"
- PASS: Cites at least one refusal: benchmarks linked, never republished (Artificial Analysis attributed as external, not affiliated); no invented verification dates; "if a pass finds nothing new, it still gets an entry."
- FAIL: Refusal claims unfindable (F2); a refusal contradicted by page behavior (F3).

**Jordan 60s protocol emphasis.** Q4 is decisive: the verified date must be recalled from the first screen (header badge is visible at 390px without scrolling — if Jordan can't name it, that's a header failure, note it explicitly). Q1 should already contain "catches" or "verified."

**Jordan wow check.** A 7+ requires repeating a governance specific: "zero affiliate links today, with stated rules for when that changes," "dated verification log," "CC-BY dataset you can diff," or "they mark their own math as low confidence." Jordan's wow ceiling is trust-through-falsifiability, not delight.

---

## 6. Panel pass bar (binding)

The panel is 4 personas × 2 runs (naive + skeptic) = 8 runs. Deploy is gated on ALL of:

1. **Primary task < 3 min, every persona.** Each persona's primary decision lands correctly in <180s in BOTH its runs; no single run exceeds 300s (hard cap — a correct-but-slow decision still fails the gate).
2. **Zero factual dead-ends.** No F1/F2/F3/F4 event on any task in any run. F5/F6/F7 events: at most 1 across the panel, with a mandatory fix and a re-run of the affected persona (both runs).
3. **Safety tasks clean.** Every [S] task (A6, P3, P4, S4, S7, J2, J6, J7) passes in all 8 runs. Any [S] fail is an automatic panel fail regardless of everything else.
4. **Wow ≥ 7 on at least 3 of 4 personas**, mean of that persona's two runs, using the anchored scale with the repeatable-fact validity rule; and no persona mean below 5.
5. **60-second comprehension.** ≥4/5 questions correct on at least 3 of 4 personas (mean of both runs); no persona below 3/5.
6. **Skeptic contradiction sweep.** The skeptic runs find zero unresolved on-site contradictions; each skeptic-found issue is either fixed or answered with a quoted on-site resolution before deploy.

**Re-run rule:** after any content fix, re-run all 8 (content changes can shift any persona's path). After a purely visual fix, re-run only the 60-second protocols. Round-3 sequencing: the visual pass may land first or second, but this panel must pass on the code that ships.

---

## 7. Per-run report template (every run files one)

```
RUN: <Alex|Priya|Sam|Jordan> / <naive|skeptic> / run date + build id
BASE: http://localhost:<port>   VIEWPORT: 390x844
60s: _/5 — Q1..Q5 verbatim answers
Primary: _s — decision: <one line>
Tasks: <id> PASS|FAIL (<F-code + exact quoted evidence + path for every FAIL>)
Dead-ends: none | <task id, code, quote>
Wow: _/10 — repeatable fact: "<verbatim>"
Notes for visual pass: <max 2 lines, unscored>
Verdict: PASS | FAIL — binding reason: <gate number(s) from section 6>
Top 3 issues: <ranked, each with path + quote>
```

Panel-level result: compile the 8 runs against section 6, list every violated gate, and state DEPLOY / FIX-FIRST with the specific fix per violated gate.

---

## 8. Answer key summary (known content facts the rubrics rely on)

For grader reference — all values verified against `content/offers/*.json` and page sources on 2026-09-06.

- **Kimi K3:** $19/$39/$99/$199 monthly (Moderato/Allegretto/Allegro/Vivace); annual ≈$15/$31/$79/$159; break-evens ≈24 (Moderato) / 49 (Allegretto monthly) / 39 (annual) / 50 ($40 basket) tasks/mo vs the $0.80/task reference; month-10 annual payback (372÷39≈9.5); ~$96/yr saved on Allegretto annual; catch = one shared credit pool + 5-hour and weekly controls; 2.5x tier jump $39→$99; coding endpoint `https://api.kimi.com/coding/` vs separate PAYG key — wrong route means the membership doesn't cover usage; Allegretto ≈$0.33/task at 120 tasks.
- **Muse Spark Zen:** $0 input/cache/output during promo; exact string "Muse Spark 1.3 Contributor Free" via /connect → Zen → /models; end date unpublished (confirmed only in-product); "claim it now, don't build on it"; 200 promo tasks ≈ ~$160 avoided PAYG; post-promo price unpublished.
- **NVIDIA K3 Free:** $0 for dev/prototyping; limits vary by account (quota "a rumor until tested"); no production SLA; catalog rotation; 100 prototype tasks ≈ ~$80 avoided PAYG; FAQ honestly declines to promise card-free signup ("we do not promise card-free onboarding").
- **Global:** research snapshot Sep 6 2026 everywhere; Methodology v0.1 (official sources only; trailing-7-day median windows; dual unit+per-task display; Pareto framing; link-first benchmarks; confidence labels; weekly re-verification, daily on live promos; verified-X plus ends-Y rule); verification log at `/changes/` seeded with two same-day passes (2026-09-06); how-we-make-money: zero affiliate links in v0, rel="sponsored" rules for the future, paid placement never changes verdicts; footer: "Never enter credentials on any page here — we will never ask for them", machine feeds (llms.txt, offers.json, feed.xml, llms-full.txt), Artificial Analysis linked not republished; CC-BY-4.0 dataset at `/api/offers.json`; hero crossover "Under ~50 tasks/mo → $0 route or PAYG; over it → Allegretto $39"; reader-reports band explicitly empty ("Open soon — nothing mocked").
- **Known gaps (drive [G-t] handling):** no gift mechanics anywhere; no site search; no login/signup; exactly 3 offers / 2 guides — anything beyond scope is expected to be absent, and rubrics tolerate honest absence only.

---

## 9. Panel design rationale (coordinator notes — testers may skip)

Alex stress-tests the revenue path and the math chain; Priya stress-tests safety framing and non-technical legibility of the catches brand; Sam stress-tests honesty of the free routes — the most likely place to overclaim; Jordan stress-tests falsifiability of every trust claim. Round 1 validation scored wow 4/10: the wow validity rule (no 7+ without a repeatable specific) exists so this panel can't be gamed by polish, and the 60-second protocol directly re-tests the comprehension failure that score implies.
