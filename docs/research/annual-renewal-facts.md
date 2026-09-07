# Annual / Renewal / Refund Facts — Wave-2 Evidence Base

- Captured: 2026-09-06 (all fetches this date unless noted)
- Method: official vendor pages fetched directly (WebFetch). Two labeled exceptions: (a) OpenAI plan prices where the page JS-renders prices — taken from search-indexed snippets of official `chatgpt.com` / `help.openai.com` / `openai.com` pages captured 2026-09-06; (b) Windsurf list prices — official pricing page unreachable (HTTP 429 on 6 attempts), marked UNKNOWN. No third-party benchmark data is used; all numbers are prices/terms/limits.
- Compliance: every price carries the as-of date; anything unconfirmed is marked UNCERTAIN/UNKNOWN.

---

## A. Cursor (cursor.com)

| Plan | Price (monthly) | Notes |
|---|---|---|
| Hobby | Free | "Limited Agent requests", Composer access, "No credit card required" |
| Start | ₹649/mo tax incl. | India only |
| Pro | $20/mo | — |
| Pro+ | $60/mo | "3x Pro limits on Agent" |
| Ultra | $200/mo | "20x Pro limits on Agent" |
| Teams Standard | $40/user/mo | — |
| Teams Premium | $120/user/mo | "5x Standard limits on Agent", SAML/OIDC SSO |
| Enterprise | Custom | Pooled usage, invoice/PO, SCIM |

- Sources: https://cursor.com/pricing ; https://cursor.com/help/account-and-billing/pricing (both fetched 2026-09-06)
- Annual: Monthly/Yearly toggle exists and yearly is selectable in the dashboard, but NO annual rate is published anywhere; checkout links render `yearly=false`. Annual discount: UNKNOWN / not published. https://cursor.com/pricing (2026-09-06)
- Resale: subscriptions "only sold directly through cursor.com". https://cursor.com/pricing (2026-09-06)
- Free tier: no numeric quotas published. Two monthly pools — "Cursor Models" (Cursor Grok 4.6/4.5, Composer 2.5) and "Other Models" (provider prices). "Usage resets monthly with your billing cycle. Unused usage does not roll over." At limit: enable on-demand or upgrade. https://cursor.com/help/models-and-usage/usage-limits (2026-09-06)
- Overage: opt-in only ("On-demand usage must be explicitly enabled in your settings"); "additional requests are billed at API rates with no markup"; separate invoices; spend limits with credited pre-enforcement overage; legacy Max Mode = "model's API rate plus 20%". https://cursor.com/help/account-and-billing/overages ; https://cursor.com/help/models-and-usage/usage-limits (2026-09-06)
- BYOK: allowed — OpenAI (standard non-reasoning chat), all Claude via Anthropic API, Gemini, Azure OpenAI, Bedrock. "Custom API keys only work with chat models. Tab completion continues using Cursor's built-in models." BYOK messages don't count against plan usage; ZDR does not apply. https://cursor.com/help/models-and-usage/api-keys (2026-09-06)
- Student: "Cursor discontinued new sign-ups for the legacy student discount on June 25, 2026" (fraud). Existing subscribers keep rate until plan expires; after the "student discount year," Pro continues "at the regular $20/month rate unless you cancel." New paths: event credits "starting this fall"; form for master's/PhD/researchers/educators. https://cursor.com/help/account-and-billing/student-discount ; https://cursor.com/students (2026-09-06)
- Cancel: via Stripe portal; cancel >=24h before renewal; "You keep access to your paid plan features until the end of your current billing period," then revert to Hobby. https://cursor.com/help/account-and-billing/cancel (2026-09-06)
- Refund: requires BOTH "the charge was made within the last 14 days" AND "you have not used the subscription during that billing period"; 5–10 business days. No prorated downgrade refunds; consumed on-demand charges non-refundable; iOS via Apple. https://cursor.com/help/account-and-billing/refunds (2026-09-06)
- Proration: not documented — UNKNOWN (only upgrade credits "based only on unused included usage").

## B. GitHub Copilot (github.com)

| Plan | Price | Credits ("1 AI credit = $0.01 USD") |
|---|---|---|
| Free | $0 | Limited allowance |
| Student | Free | Allowance |
| Pro | $10/user/mo | 1,000 base + 500 flex = "$15 monthly total credits" |
| Pro+ | $39/user/mo | 3,900 + 3,100 = $70 total |
| Max | $100/user/mo | 10,000 + 10,000 = $200 total |
| Business | $19/granted seat/mo | 1,900/user/mo, pooled |
| Enterprise | $39/granted seat/mo | 3,900/user/mo; "2x included usage than Business" |

- Sources: https://github.com/features/copilot/plans ; https://github.com/features/copilot ; https://docs.github.com/en/copilot/get-started/plans (all fetched 2026-09-06)
- Free tier (exact): "2000 completions and 50 chat requests (including Copilot Edits)" per month; "Haiku 4.5, GPT-5 mini, and more"; auto model selection only; agent mode + MCP included; "No credit card required"; only for individuals without Copilot via an org. Completions "unlimited" on paid plans and don't consume credits. (2026-09-06)
- Annual billing: not mentioned on plans page, features page, or docs. Third-party $100/yr claims: UNCERTAIN — not verifiable on official pages (2026-09-06).
- Students/maintainers: "Verified students have access to the GitHub Copilot Student plan" (free; third-party agents excluded); "Verified teachers, and maintainers of popular open source projects may be eligible for free access to Copilot Pro." https://docs.github.com/en/copilot/get-started/plans (2026-09-06)
- Business/Enterprise note: new sign-ups "gradually enabled." https://github.com/features/copilot (2026-09-06)

## C. Windsurf (windsurf.com — under Cognition/Devin)

- STRUCTURE: windsurf.com/pricing 308 -> devin.ai/pricing; windsurf.com -> devin.ai/desktop; docs.windsurf.com -> docs.devin.ai/desktop/... (redirect headers, 2026-09-06)
- CURRENT LIST PRICES: UNKNOWN — devin.ai/pricing HTTP 429 on all 6 attempts 2026-09-06. NOTHING PRICE-BEARING PUBLISHABLE from official pages today.
- Plans: Free, Pro, Max, Teams, Enterprise; "Windsurf introduced new usage-based plans for self-serve customers in March 2026." https://docs.devin.ai/desktop/accounts/usage (2026-09-06)
- Quota model: "a daily and weekly usage allowance that refreshes automatically"; "Your daily quota is more than 1/7 of your weekly quota"; "free models don't count against your quota at all"; Free waits for reset; Pro/Teams/Max extra usage "billed at API list prices". Pooled add-on credits "$120 for 1000 pooled credits", auto-refill below 15 credits, $160/mo default cap. Legacy prompt credits did not roll over. https://docs.devin.ai/desktop/accounts/usage ; https://docs.devin.ai/desktop/accounts/quota (2026-09-06)
- Grandfathering: "Pro at $15/mo; Teams at $30/mo per Developer seat" indefinitely; legacy credits at "$0.04/credit"; "Annual-plan migration includes a 7-day extension/refund option" (evidence annual existed; current annual terms UNKNOWN). https://docs.devin.ai/desktop/accounts/quota (2026-09-06)
- Cancel: keeps features "until the end of the current billing period," then Free. https://docs.devin.ai/desktop/accounts/usage (2026-09-06)
- Third-party figures in circulation (free 25 prompt credits; Pro $15–20; Max ~$200): NOT official-verified — do not publish.

## D. Claude (Anthropic)

- anthropic.com/pricing 301 -> claude.com/pricing (fetched 2026-09-06).
- Free $0 — Claude Code NOT included.
- Pro: "$20 if billed monthly"; annual "$17" per month, "$200 billed up front" (~16.67/mo effective, ~17% saving).
- Max: "From $100"/mo, "Choose 5x or 20x more usage than Pro"; "Both options are billed monthly" — no annual for Max.
- Claude Code: "included in all paid plans", "shares the same usage limits as the rest of your plan"; "reset on a rolling five-hour session window" + weekly limits on paid; "Pro gives you at least 5x more usage per 5-hour session than Free"; Fable counts against "50% of weekly limits".
- Page: prices/plans "subject to change at Anthropic's discretion"; tax excluded. https://claude.com/pricing (2026-09-06)

Consumer ToS (https://www.anthropic.com/legal/consumer-terms, fetched 2026-09-06):
- Auto-renew: "will automatically charge your Payment Method on each agreed-upon periodic renewal date until you cancel"; fees charged "up front" per term.
- Price change: "we will not make any change to the fees applicable to your Subscription during the current Initial Term or Renewal Term"; increases: "we will inform you at least 30 days in advance of the change"; "You agree to the increase in fees payable by you unless you cancel the Subscription" before the Renewal Term begins.
- Cancel: "at least 24 hours before the last day of the Initial Term or any Renewal Term" (portal, or support@anthropic.com for Claude Pro); "your fees will not be refunded, but your access ... will continue" through the paid term.
- Refunds: "all payments are non-refundable" except by law; 7-day cooling-off with reimbursement within 14 days for Brazil, Mexico, South Korea, Taiwan (proportional retention if used); pro-rata refund if Anthropic terminates without cause.

## E. OpenAI ChatGPT

- openai.com/chatgpt/pricing/ , chatgpt.com/pricing , help.openai.com articles: HTTP 403 on price figures to our fetcher (2026-09-06). One successful fetch captured structure/FAQ; prices are JS-rendered.
- Lineup (fetched page content, 2026-09-06): Free, Go, Plus, Pro (+Business/Enterprise). FAQ: monthly plans for "Go, Plus, Business"; annual plans only for "Business and Enterprise" — NO annual for Plus/Pro.
- Prices (official-domain search snippets, captured 2026-09-06; direct fetch blocked): Plus "$20 / month" (chatgpt.com/pricing snippet); Pro "From $100 / month", "5x or 20x more usage"; help.openai.com article 9793128 ("About ChatGPT Pro tiers"): "$100/month -> 5x higher usage than Plus", "$200/month -> 20x higher usage than Plus"; Business seat "$20/month ($25/month if billed monthly)" (openai.com/business/pricing snippet). Go $8/mo: third-party only — UNCERTAIN.
- Promos on page (fetched 2026-09-06): "ChatGPT for Teachers free for verified U.S. K-12 educators through June 2027"; nonprofits "up to 75%" off Business/Enterprise.
- Cancellation/refund ToS: UNKNOWN — openai.com/policies/terms-of-use/ returned 403 on all attempts 2026-09-06. Do not publish OpenAI renewal/price-change claims.

## F. Gemini (Google One AI plans)

Prices as of 2026-09-06 — https://gemini.google/subscriptions/ (fetched directly; full numbers). https://one.google.com/intl/en_us/about/google-ai-plans/ (fetched; prices JS-blank, structure/credits confirmed).

| Tier | Price | Key inclusions |
|---|---|---|
| Free | $0 | "Access to 3.6 Flash", varying 3.1 Pro, Deep Research, Gemini Live, 15 GB |
| Google AI Plus | $4.99/mo | "2x higher usage access than Free", 200 Flow credits, 400 GB |
| Google AI Pro | $19.99/mo | "4x higher usage access than Free", 1,000 Flow credits, "Deep Research and a 1M token context window", 5 TB, YouTube Premium Lite, "$10 monthly" Google Cloud credits |
| Google AI Ultra | from $99.99/mo (5x Pro, 10,000 Flow credits, 20 TB) or $199.99/mo (20x Pro, 25,000 credits, 30 TB) | Deep Think, Project Genie, YouTube Premium |

- Mechanics: "Your limit refreshes every 5 hours until you reach your weekly limit"; extra AI credits purchasable. (2026-09-06)
- Annual: not shown on either official page — UNKNOWN / not offered as of 2026-09-06.
- Students: "Students get Google AI Pro free for 1 year" — SheerID, "valid for up to 4 years," renews at standard price, school accounts excluded. (2026-09-06)
- Refunds: "In most countries or regions, Google storage plan purchases are non-refundable" (https://support.google.com/googleone/answer/2736362, official snippet 2026-09-06); AI-plan-specific refunds UNCERTAIN. one.google.com/terms-of-service: unused AI credits may be forfeited at cancellation (search-indexed official snippet; not directly fetched).

## G. Kimi (Moonshot)

kimi.com 302 -> kimi.ai. Official pages fetched 2026-09-06: https://www.kimi.ai/help/membership/membership-pricing ; https://www.kimi.ai/resources/kimi-k3-pricing

| Tier | Monthly | Annual (per month) | Annual total | You save |
|---|---|---|---|---|
| Moderato | $19/mo | $15/mo | $180/yr | $48/yr |
| Allegretto | $39/mo | $31/mo | $372/yr | $96/yr |
| Allegro | $99/mo | $79/mo | $948/yr | $240/yr |
| Vivace | $199/mo | $159/mo | $1,908/yr | $480/yr |

- "Annual billing saves you up to $480/year."
- Inclusions: agent credits 60/150/360/720; Kimi Code on ALL tiers with its own "5-hour / weekly rate limit"; one "single credit pool, metered by token usage" (K2.6 chat consumes credits); 1M-token K3 extra-long chat only Allegro+Vivace; concurrent tasks 2/2/4/4.
- API PAYG kimi-k3: input $0.30 (cache hit) / $3.00 (cache miss), output $15.00 per 1M tokens; context "1,048,576 tokens"; cache hits "a 90% reduction". (2026-09-06)
- No Adagio/Andante on the English page (CN-market lineup third-party — UNCERTAIN); no grandfathering notes; no dated promos.

## H. Cross-cutting comparison (all sources fetched 2026-09-06)

| Vendor | Annual billing? | Discount | Refunds | Price protection at renewal |
|---|---|---|---|---|
| Cursor | Toggle exists; no published annual price | UNKNOWN | 14 days + zero usage (individual) | Advance notice via UI; continued use = acceptance — https://cursor.com/terms-of-service |
| Copilot | Not shown on official pages | — | None ("no exceptions") — docs.github.com ToS L.3 | Price locked during payment term; changes at term end; 30-day notice — ToS L.1/R |
| Claude | Pro yes / Max no | Pro ~17% ($200 upfront) | None except 7-day BR/MX/KR/TW — consumer-terms | No change mid-term; 30-day notice — consumer-terms s.6 |
| ChatGPT | Plus/Pro no; Business/Enterprise yes | Business $20 vs $25 seat | UNKNOWN (ToS 403) | UNKNOWN (ToS 403) |
| Gemini | Not shown | — | Storage non-refundable; AI plans UNCERTAIN — support.google.com/googleone/answer/2736362 | UNKNOWN (terms not fetched) |
| Kimi | Yes, all tiers | ~20% ($48–$480/yr) — kimi.ai help | Not stated on fetched pages | Not stated on fetched pages |
| Windsurf | Historical annual (7-day migration remedy); current UNKNOWN | UNKNOWN | UNKNOWN | Legacy Pro $15/Teams $30 grandfathered "indefinitely" — docs.devin.ai/desktop/accounts/quota |

## ToS price-change-at-renewal — verbatim quotes (<=25 words each)

1. Cursor (s.4.2, https://cursor.com/terms-of-service, 2026-09-06): "continued use of the Service after the price change becomes effective constitutes your agreement to pay the changed amount."
2. GitHub (s.L.1, https://docs.github.com/en/site-policy/github-terms/github-terms-of-service, 2026-09-06): "If you agree to a subscription price, that will remain your price for the duration of the payment term."
3. Anthropic (s.6, https://www.anthropic.com/legal/consumer-terms, 2026-09-06): "we will not make any change to the fees applicable to your Subscription during the current Initial Term or Renewal Term."
4. OpenAI: UNKNOWN — https://openai.com/policies/terms-of-use/ returned 403 to our fetcher 2026-09-06.
5. Kimi: UNKNOWN — no terms page located on fetched official pages 2026-09-06.
6. Google: one.google.com/terms-of-service exists; not directly fetched — no quote.

## Strongest verifiable free tiers (exact limits, 2026-09-06)

| Vendor | Free tier | Hard caps | Card required |
|---|---|---|---|
| Copilot | Free plan | "2000 completions and 50 chat requests (including Copilot Edits)" per month | No ("No credit card required") |
| Gemini | Free plan | 3.6 Flash + varying 3.1 Pro, Deep Research, 15 GB | No |
| Cursor | Hobby | Limits unpublished ("Limited Agent requests") | No |
| Windsurf | Free plan exists | Numeric allowance not officially published | UNKNOWN |
| ChatGPT | Free plan exists | Caps not captured (403) | No |
| Claude | Free plan exists | No numbers; Pro = "at least 5x more usage per 5-hour session" | No |
| Kimi | No free paid tier listed (4 paid tiers only) | — | — |

## Visible promos (2026-09-06)

- OpenAI: Teachers free for verified U.S. K-12 educators through June 2027; nonprofits up to 75% off Business/Enterprise (chatgpt.com/pricing content).
- Google: students get Google AI Pro free 1 year (SheerID, up to 4 years) (one.google.com AI plans page).
- Cursor: "promotions at our on-campus and online events starting this fall" (undated) (cursor.com/students); docs note GPT-5.6 Sol "Promotional pricing through November 21, 2026" (cursor.com/docs).
- None displayed: Claude, Kimi, Copilot pricing pages.

## Snapshot-vs-official flags

1. Kimi (content/offers/kimi-k3-core.json): prices, tier names, annual effective figures, 5-hour/weekly controls all CONFIRMED — no drift. New official detail to add: exact annual totals ($180/$372/$948/$1,908) and savings ($48/$96/$240/$480); per-tier agent credits 60/150/360/720. STALE: `official_terms_url` https://api.kimi.com/coding/ no longer serves plan terms — returns only "Welcome to the Kimi For Coding API!" JSON. Re-point official_links to the kimi.ai help pages above.
2. Copilot: any of our content describing "premium requests" or Pro+ as the top individual tier is stale — current model is AI credits (1 credit = $0.01, base+flex) and a new $100 Max tier sits above Pro+. Annual $100/yr claims are NOT official-verified.
3. Windsurf: nothing price-bearing publishable from official pages today (pricing page rate-limited all attempts 2026-09-06); only quota mechanics, grandfathered $15/$30 prices, and the March 2026 plan change are citable.
4. Cursor: any published claim of a student "free year" for new sign-ups is wrong as of 2026-06-25 (program closed to new sign-ups).

## SERP-target mapping

- "Cursor Pro student discount" -> Cursor student facts (A): discontinued for new sign-ups 2026-06-25; legacy terms; event/form alternatives. Must correct any legacy content.
- "Best AI subscription deals" -> H table annual column: Claude Pro $200/yr upfront (~17%), Kimi annual all tiers (~20%, saves up to $480/yr), ChatGPT Business annual ($20 vs $25 seat), Kimi student n/a; student offers: Copilot Student free, Google AI Pro free 1 yr.
- "AI tool lifetime deal" -> NO vendor offers lifetime deals on any fetched official page (2026-09-06). Honest angle: annual prepay (Kimi all tiers, Claude Pro) is the longest lock-in; Windsurf grandfathered pricing is the closest permanence play. Cite the official pages.
