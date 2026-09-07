# Provider Universe — coverage-gap follow-up pass

Closes out the "Coverage gaps" section of `provider-universe.md` (universe file read
2026-09-07; this pass is the same day). **No rows in the universe file were edited** —
everything here is new evidence intended to be merged later.

Method: **alternative official routes only** — vendor help centers, vendor docs subdomains
(including Mintlify `.md` doc endpoints), official app-store listings (Apple App Store /
Google Play in-app-purchase rows), vendor blogs, and web.archive.org snapshots of the
vendor's own pages (snapshot URL + date cited, labeled **ARCHIVE**). No third-party price
tracker is a primary source. **Nothing is guessed; still-unverifiable rows keep UNCERTAIN
and record exactly what was tried.**

Access date for every row: **2026-09-07**, except ARCHIVE rows, which carry their snapshot
date (accessed = when the snapshot was fetched: 2026-09-07).

Labels: **DIRECT** (official page fetched live, full render) · **EXCERPT** (official
content via partial render or search-indexed copy) · **ARCHIVE** (vendor's own page via
web.archive.org) · **UNCERTAIN** (not verifiable; attempts listed).

Shared column shape (mirrors provider-universe.md):
Provider | Plan/Model | Price | Unit | Effective-cost notes | Source URL | Accessed | Label

---

## Scoreboard (13 documented gaps)

| # | Gap (universe file) | Status this pass |
|---|---|---|
| 1 | ChatGPT Plus/Pro/Team dollar figures | **Mostly closed.** Plus $19.99, Go $8.00, Pro 5x $100, Pro 20x $200 verified via official App Store IAP list + Wayback breadcrumb. Team/Business per-seat dollar remains unlisted (credit-based contracts) — still open. |
| 2 | Claude Max 5x vs 20x split | **Closed.** 5x $100 / 20x $200 from official help center. |
| 3 | GLM Coding Pro/Max prices | **Still open.** Official checkout client-gated; fresh Wayback snapshot contains zero price strings. |
| 4 | Qwen first-party API prices | **Closed.** Official Alibaba Model Studio pricing page fetched (per-region tables). |
| 5 | Llama 4 pricing | **Still open.** |
| 6 | Groq per-model API prices | **Closed.** Official console docs table fetched live. |
| 7 | Devin/Windsurf post-merge pricing | **Closed (ARCHIVE).** Full ladder from Wayback 2026-08-14. |
| 8 | Cursor Pro+/Ultra/Teams Premium; Copilot Business/Enterprise | **Closed.** Cursor help center + GitHub docs, both DIRECT. |
| 9 | DeepSeek context windows + peak/off-peak hours | **Closed.** Official page fetched live (trailing-slash URL). |
| 10 | Kimi K2.7 Code / K2.6 API prices | **Closed.** Official `.md` doc endpoints. |
| 11 | SuperGrok Lite / Heavy prices | **Closed.** Grok app official App Store IAP list. |
| 12 | FirePass list price and duration | **Still open** (re-verified unpublished; doc re-read DIRECT today). |
| 13 | MiniMax M3 / GPT-6 Astra subscription-side / Jules pricing | **Closed structurally.** M3 confirmed on MiniMax token plans; Astra confirmed rolling out in ChatGPT plans; Jules = free tier + Google AI Pro/Ultra bundles with exact task counts. |

Tally: **9 of 13 closed** (incl. 3 closed structurally where no standalone price exists),
**1 partially closed** (ChatGPT consumer closed, Business/Team seat open), **3 still open**
(GLM Pro/Max, Llama 4, FirePass price) plus the ChatGPT Business/Team seat residual.

---

## (a) Direct LLM subscriptions — gap closures

| Provider | Plan/Model | Price | Unit | Effective-cost notes | Source URL | Accessed | Label |
|---|---|---|---|---|---|---|---|
| OpenAI | ChatGPT Plus | $19.99 | per month | Itemized in official App Store listing's In-App Purchases (US store) | https://apps.apple.com/us/app/chatgpt/id6448311069 | 2026-09-07 | DIRECT (app-store listing) |
| OpenAI | ChatGPT Go | $8.00 | per month | Offered in the US App Store as IAP — Go is no longer India-only | https://apps.apple.com/us/app/chatgpt/id6448311069 | 2026-09-07 | DIRECT (app-store listing) |
| OpenAI | ChatGPT Pro 5x | $100.00 | per month | Matches server-rendered breadcrumb "ChatGPT Pricing > Consumer > Pro $100" in the Wayback capture of the pricing page (see ARCHIVE row below); compare-table id "chatgpt.pro.5x" | https://apps.apple.com/us/app/chatgpt/id6448311069 | 2026-09-07 | DIRECT (app-store listing); ARCHIVE corroboration |
| OpenAI | ChatGPT Pro 20x | $200.00 | per month | Google Play listing corroborates the IAP band: "$8.00 – $200.00 per item" | https://apps.apple.com/us/app/chatgpt/id6448311069 ; https://play.google.com/store/apps/details?id=com.openai.chatgpt&hl=en_US | 2026-09-07 | DIRECT (app-store listing); EXCERPT (Play band) |
| OpenAI | ChatGPT credit packs | 100 credits $4.00; 500 credits $20.00; 1,000 credits $40.00 | per pack | $0.04 per credit at pack rates; official IAP list | https://apps.apple.com/us/app/chatgpt/id6448311069 | 2026-09-07 | DIRECT (app-store listing) |
| OpenAI | ChatGPT Pro $100/$200 (page-side corroboration) | Pro ladder named in rate card: "Pro $100, Pro $200" | per month | Wayback capture of chatgpt.com/pricing renders plan structure but prices client-side; embedded breadcrumb "Consumer > Pro $100" is server-rendered; page payload references template keys prices.chatgpt.team.monthly.2026 etc. (values client-fetched, not captured) | https://web.archive.org/web/20260906040847/https://chatgpt.com/pricing/ | snapshot 2026-09-06 (fetched 2026-09-07) | ARCHIVE (breadcrumb DIRECT-in-snapshot; dollar table still client-side) |
| OpenAI | ChatGPT Business (former Team) seat | Not published | per seat/month | STILL OPEN. Help center documents flexible credit-based pricing (per-seat limits + shared credit pool), no public per-seat dollar; Web + help center + archive all hide the checkout figure | https://web.archive.org/web/20260729/https://help.openai.com/en/articles/11487671-flexible-pricing-for-the-enterprise-edu-and-business-plans | snapshot 2026-07-29 (fetched 2026-09-07) | UNCERTAIN (price; structure verified) |
| OpenAI | Codex via ChatGPT plans (structure) | "≈ $100–$200 per developer per month" average Codex cost quoted; Codex seats closed to NEW Business workspaces from Jun 24 2026 | per month | Rate card also lists credit rates: GPT-5.6 Sol 10 credits/message (Instant unlimited); Agent mode 30; Deep Research 50; Images 5; Voice 5/min | https://web.archive.org/web/20260906/https://help.openai.com/en/articles/11481834-chatgpt-rate-card-business-enterpriseedu-credit-based-pricing | snapshot 2026-09-06 (fetched 2026-09-07) | ARCHIVE |
| Anthropic | Claude Max 5x | $100 | per month | Official help article: "Max 5x: $100 per month"; monthly billing only; web prices (mobile may vary) | https://support.claude.com/en/articles/11049741-what-is-the-max-plan | 2026-09-07 | DIRECT |
| Anthropic | Claude Max 20x | $200 | per month | Same article: "Max 20x: $200 per month"; pricing page itself still shows only a single Max card "From $100" (data-plan="max_5x_monthly") in the 2026-09-07 archive capture — the help center is the only itemized source | https://support.claude.com/en/articles/11049741-what-is-the-max-plan ; https://web.archive.org/web/20260907185646/https://claude.com/pricing | 2026-09-07 | DIRECT (help center); ARCHIVE (pricing page confirms 20x not itemized there) |
| xAI (SpaceXAI) | SuperGrok Lite | $10.00 | per month | Official Grok app In-App Purchases list; live x.ai/pricing fetched same day shows the ladder (Free $0 / SuperGrok $30 / Plus $100) but Lite/Heavy prices render client-side | https://apps.apple.com/us/app/grok-ai/id6670324846 ; https://x.ai/pricing | 2026-09-07 | DIRECT (app-store listing); DIRECT (x.ai ladder, EXCERPT-quality render for Lite/Heavy) |
| xAI (SpaceXAI) | SuperGrok Heavy | $300.00 | per month | Same IAP list; also listed: SuperGrok $30.00, SuperGrok Plus $100.00, and Extra Usage Credits packs $5/$20/$50/$100. Universe file's "annual ≈ $250/mo effective" remains third-party and unconfirmed | https://apps.apple.com/us/app/grok-ai/id6670324846 | 2026-09-07 | DIRECT (app-store listing) |
| Cognition | Devin Free | $0 | per month | Windsurf rows gone from the pricing page post-merge; light agent quota, limited models, unlimited inline edits/Tab | https://web.archive.org/web/20260814065709/https://devin.ai/pricing | snapshot 2026-08-14 (fetched 2026-09-07) | ARCHIVE (live devin.ai/pricing still 429s) |
| Cognition | Devin Pro | $20 | per month | Increased quotas incl. OpenAI/Claude/Gemini frontier models; Devin Cloud; extra usage billed at API pricing | https://web.archive.org/web/20260814065709/https://devin.ai/pricing | snapshot 2026-08-14 | ARCHIVE |
| Cognition | Devin Max (new) | $200 | per month | "Everything in Pro + significantly higher quotas" | https://web.archive.org/web/20260814065709/https://devin.ai/pricing | snapshot 2026-08-14 | ARCHIVE |
| Cognition | Devin Teams | $80/month + $40/mo per full dev seat | per team + per seat/month | Unlimited flex seats; full users get their own quota + Devin Desktop | https://web.archive.org/web/20260814065709/https://devin.ai/pricing | snapshot 2026-08-14 | ARCHIVE |
| Cognition | Devin Enterprise | Custom ("Let's talk") | per org | SAML/OIDC, VPC option, org admin | https://web.archive.org/web/20260814065709/https://devin.ai/pricing | snapshot 2026-08-14 | ARCHIVE |
| Google | Jules (agentic coding) | Free: 15 tasks/day, 3 concurrent; Jules in Pro: 100 tasks/day, 15 concurrent; Jules in Ultra: 300 tasks/day, 60 concurrent | per day | No standalone Jules price — paid tiers are benefits of Google AI Pro / Google AI Ultra subscriptions; free tier on Gemini 2.5 Pro, paid on "latest model (starting with Gemini 3 Pro)" | https://jules.google/docs/usage-limits/ | 2026-09-07 | DIRECT |

---

## (b) API pricing per model — gap closures

| Provider | Plan/Model | Price (in / out) | Unit | Effective-cost notes | Source URL | Accessed | Label |
|---|---|---|---|---|---|---|---|
| Alibaba (Qwen) | qwen3.8-max (Model Studio, Singapore region) | $2.00 / $6.00 | $/1M tokens | Tier 0<token≤1M ctx; context-caching + 50% batch discounts; International-region list price | https://www.alibabacloud.com/help/en/model-studio/model-pricing | 2026-09-07 | DIRECT |
| Alibaba (Qwen) | qwen3.7-max / qwen3.7-max-us | $2.50 / $7.50 | $/1M tokens | Singapore/US regions; 0<token≤1M | https://www.alibabacloud.com/help/en/model-studio/model-pricing | 2026-09-07 | DIRECT |
| Alibaba (Qwen) | qwen3.7-plus | list $0.40 / $1.60 (limited-time 20% off) | $/1M tokens | 0<token≤256K; Singapore region | https://www.alibabacloud.com/help/en/model-studio/model-pricing | 2026-09-07 | DIRECT |
| Alibaba (Qwen) | qwen3.8-flash | $0.15 / $0.47 | $/1M tokens | Singapore region; 0<token≤1M | https://www.alibabacloud.com/help/en/model-studio/model-pricing | 2026-09-07 | DIRECT |
| Alibaba (Qwen) | qwen3.5-plus (older gen, tiered) | $0.40/$2.40 (≤256K); $0.50/$3.00 (≤1M) | $/1M tokens | Singapore region list price | https://www.alibabacloud.com/help/en/model-studio/model-pricing | 2026-09-07 | DIRECT |
| Alibaba (Qwen) | Region arbitrage note: Hong Kong (China) region prices qwen3.8-max at $1.65 / $4.951; night discounts 22:00–08:00 UTC+8; free quota Singapore-only | — | — | HK table is the cheapest first-party Qwen tier found | https://www.alibabacloud.com/help/en/model-studio/model-pricing | 2026-09-07 | DIRECT |
| Alibaba (Qwen) | Effective-cost note | Together resale of qwen3.7-plus ($0.32/$1.28, universe file) undercuts Alibaba's own Singapore list price ($0.40/$1.60) | — | — | (comparison of the two rows above) | 2026-09-07 | DIRECT (both sides) |
| Groq | openai/gpt-oss-120b | $0.15 / $0.60 | $/1M tokens | 500 t/s; 131,072 ctx; 65,536 max out | https://console.groq.com/docs/models | 2026-09-07 | DIRECT |
| Groq | openai/gpt-oss-20b (and gpt-oss-safeguard-20b) | $0.075 / $0.30 | $/1M tokens | 1,000 t/s; 131,072 ctx | https://console.groq.com/docs/models | 2026-09-07 | DIRECT |
| Groq | qwen/qwen3.6-27b | $0.60 / $3.00 | $/1M tokens | Preview model; 131,072 ctx | https://console.groq.com/docs/models | 2026-09-07 | DIRECT |
| Groq | qwen/qwen3.8-27b | $0.80 / $4.00 | $/1M tokens | Preview model; 131,042 ctx (sic — page shows 131,042) | https://console.groq.com/docs/models | 2026-09-07 | DIRECT |
| Groq | meta-llama/llama-prompt-guard-2-22m / -86m | $0.03/$0.03; $0.04/$0.04 | $/1M tokens | Preview; 512 ctx | https://console.groq.com/docs/models | 2026-09-07 | DIRECT |
| Groq | whisper-large-v3 / -v3-turbo | $0.111 / $0.04 per hour | per audio hour | Non-token billing | https://console.groq.com/docs/models | 2026-09-07 | DIRECT |
| Groq | canopylabs/orpheus-v1-english / orpheus-arabic-saudi | $22.00 / $40.00 per 1M characters | per 1M chars | Preview TTS | https://console.groq.com/docs/models | 2026-09-07 | DIRECT |
| Groq | llama-3.1-8b-instant / llama-3.3-70b-versatile / minimaxai/minimax-m2.7 | **"Enterprise — Contact Sales"** (no public per-token price) | — | Surprise: Groq's flagship/legacy open-weight rows moved behind sales; grok/compound & compound-mini also unpriced | https://console.groq.com/docs/models | 2026-09-07 | DIRECT |
| Moonshot AI | kimi-k2.7-code | in $0.19 cache-hit / $0.95 cache-miss; out $4.00 | $/1M tokens | 262,144-token ctx; prices exclude taxes | https://platform.kimi.ai/docs/pricing/chat-k27-code (markdown endpoint: append `.md`) | 2026-09-07 | DIRECT |
| Moonshot AI | kimi-k2.7-code-highspeed | in $0.38 / $1.90; out $8.00 | $/1M tokens | Same model at ~180 t/s (260 t/s short-ctx); 2x K2.7 Code rates | https://platform.kimi.ai/docs/pricing/chat-k27-code | 2026-09-07 | DIRECT |
| Moonshot AI | kimi-k2.6 | in $0.16 cache-hit / $0.95 cache-miss; out $4.00 | $/1M tokens | 262,144-token ctx; web_search tool being updated | https://platform.kimi.ai/docs/pricing/chat-k26 (markdown endpoint) | 2026-09-07 | DIRECT |
| DeepSeek | deepseek-v4-flash | cache-hit in $0.007 off-peak / $0.014 peak; cache-miss in $0.22 / $0.44; out $0.66 / $1.32 | $/1M tokens | ctx 1M, max output 384K; model version DeepSeek-V4-Flash-0731; concurrency limit 2,500 | https://api-docs.deepseek.com/quick_start/pricing/ (trailing slash required — no-slash URL 404s/serves wrong doc) | 2026-09-07 | DIRECT |
| DeepSeek | deepseek-v4-pro | cache-hit in $0.022 / $0.044; cache-miss in $0.66 / $1.32; out $1.98 / $3.96 | $/1M tokens | ctx 1M; version DeepSeek-V4-Pro-0813; concurrency limit 500 | https://api-docs.deepseek.com/quick_start/pricing/ | 2026-09-07 | DIRECT |
| DeepSeek | deepseek-v4-flash-vision-exp | same rates as v4-flash | $/1M tokens | Images converted to tokens per Vision doc; concurrency 2,500 | https://api-docs.deepseek.com/quick_start/pricing/ | 2026-09-07 | DIRECT |
| DeepSeek | Peak/off-peak definition (closes gap 9) | Peak = 01:00–04:00 and 06:00–10:00 UTC, Mon–Fri; all other hours off-peak; off-peak = exactly half peak | — | Anthropic-format base URL https://api.deepseek.com/anthropic confirmed on same page | https://api-docs.deepseek.com/quick_start/pricing/ | 2026-09-07 | DIRECT |
| Groq (corroboration for other providers) | minimaxai/minimax-m2.7 hosted on Groq | Enterprise/Contact Sales | — | 196,608 ctx row on Groq; cross-checks MiniMax's own docs | https://console.groq.com/docs/models | 2026-09-07 | DIRECT |

---

## (d) Coding-tool plans — gap closures

| Provider | Plan/Model | Price | Unit | Effective-cost notes | Source URL | Accessed | Label |
|---|---|---|---|---|---|---|---|
| Cursor | Pro+ | $60 | per month | Official help-center pricing table (page also shows: Hobby Free; Start India-only ₹649/mo tax-inclusive; Pro $20; Ultra $200; Teams Standard $40/user; Teams Premium $120/user) | https://cursor.com/help/account-and-billing/pricing | 2026-09-07 | DIRECT |
| Cursor | Ultra | $200 | per month | 20x Pro Agent limits; help table DIRECT; cursor.com/pricing tabs still render client-side (live + Wayback 2026-09-06) and remain unusable as a price source | https://cursor.com/help/account-and-billing/pricing ; https://web.archive.org/web/20260906153300/https://cursor.com/pricing | 2026-09-07 | DIRECT (help); ARCHIVE (marketing page still gated) |
| Cursor | Teams Premium | $120 | per user/month | 5x Standard Agent limits | https://cursor.com/help/account-and-billing/pricing | 2026-09-07 | DIRECT |
| GitHub | Copilot Business | $19 | per granted seat/month | Includes 1,900 AI credits per user per month (usage-based billing model) | https://docs.github.com/en/copilot/get-started/plans ; https://docs.github.com/en/billing/concepts/product-billing/github-copilot-licenses | 2026-09-07 | DIRECT |
| GitHub | Copilot Enterprise | $39 | per granted seat/month | Includes 3,900 AI credits per user per month; enterprise chooses plan per organization | https://docs.github.com/en/copilot/get-started/plans | 2026-09-07 | DIRECT |

---

## (e)/(c) Free tiers, promos, credit systems — gap closures

| Provider | Plan/Model | Price | Unit | Effective-cost notes | Source URL | Accessed | Label |
|---|---|---|---|---|---|---|---|
| Fireworks AI | Fire Pass (gap 12 re-check) | Still **no list price**; invite-only ("Do I need an invite code? Fire Pass is currently by invite only") | per pass | Full official doc re-read today: $0 per-token on included open-weight models via router `accounts/fireworks/routers/kimi-k3-fast`; non-production coding only; violation → revocation; expiration visible only on Billing page. Price and duration remain UNCERTAIN | https://docs.fireworks.ai/firepass (markdown endpoint `.md` verified) | 2026-09-07 | DIRECT (doc); UNCERTAIN (price/duration) |
| MiniMax | Credits system | 1,000 credits = $1; packs: $5 = 5,000; $25 = 25,000; $100 = 100,000 | per pack | Credits deduct at PAYG list price | https://platform.minimax.io/docs/guides/pricing-token-plan (markdown endpoint) | 2026-09-07 | DIRECT |
| MiniMax | MiniMax M3 availability (gap 13a) | No standalone price change | — | Official token-plan docs: coverage = "full MiniMax lineup (M3 / M2.7 / image / speech)"; a small set (H3, voice design, rapid voice cloning) excluded. M3 confirmed on subscription plans — chatter→verified | https://platform.minimax.io/docs/guides/pricing-token-plan | 2026-09-07 | DIRECT |
| OpenAI | GPT-6 "Astra" subscription-side availability (gap 13b) | n/a (availability, not price) | — | Rate card: "GPT‑6 Pro, powered by GPT‑6 Astra, is rolling out in ChatGPT for Pro $100, Pro $200, Business and Enterprise plans… Plus plans include GPT‑6 Astra in ChatGPT Work and Codex as it rolls out." Astra needs Codex CLI ≥ 0.153.0; o3 retired from ChatGPT Aug 26 2026 | https://web.archive.org/web/20260906/https://help.openai.com/en/articles/11481834-chatgpt-rate-card-business-enterpriseedu-credit-based-pricing | snapshot 2026-09-06 | ARCHIVE |
| Google | Jules free tier (gap 13c) | $0 | per month | 15 tasks/day, 3 concurrent; paid tiers bundle into Google AI Pro/Ultra (see category a) | https://jules.google/docs/usage-limits/ | 2026-09-07 | DIRECT |

---

## Still open — exactly what was tried (do not backfill)

| Provider | Plan/Model | Price | Unit | Effective-cost notes | Attempts made (all 2026-09-07) | Label |
|---|---|---|---|---|---|---|
| Z.ai (Zhipu) | GLM Coding Plan — Pro | Not verifiable | per month | Third-party reports still conflict ($72–80 vs $80) and remain unverified | (1) Live z.ai/subscribe JS-gated (universe pass); (2) Wayback snapshot https://web.archive.org/web/20260907174211/https://z.ai/subscribe fetched — **zero** dollar strings, checkout fully client-side; (3) docs.z.ai/devpack/overview re-fetched: only "Starting at just 18 USD per month, with Pro and Max plans designed for high-frequency, complex projects"; (4) web search surfaces only third-party trackers/blogs + old launch promos | UNCERTAIN |
| Z.ai (Zhipu) | GLM Coding Plan — Max | Not verifiable | per month | Community $160–168 conflict stands | Same attempts as Pro row | UNCERTAIN |
| OpenAI | ChatGPT Business (Team) per-seat | Not verifiable | per seat/month | Structure verified (flexible credits, per-seat limits, Codex-seat policy change Jun 24 2026) but no public dollar | (1) chatgpt.com/pricing Wayback 2026-09-06: payload carries template keys `prices.chatgpt.team.monthly.2026` / `.yearly.2026` / `.premium.*` but dollar values are client-fetched; (2) chatgpt.com/business Wayback 2026-09-04: no seat prices; (3) help center "Flexible pricing" article (snapshot 2026-07-29): credit mechanics only; (4) App Store/Play IAP lists exclude team plans | UNCERTAIN |
| Meta | Llama 4 (any first-party or hosted price) | Not verifiable | $/1M tokens | No Llama 4 row seen on any fetched page, now including Groq's full live models table | (1) llama.com 301-redirects to developer.meta.com/ai/ (JS-gated, no server-rendered pricing text); (2) developer.meta.com/ai/docs/llama-api/pricing → 404; (3) Groq live table (no Llama 4); (4) deeper Wayback sweep not possible this pass — Internet Archive went "Temporarily Offline" mid-session | UNCERTAIN |
| Fireworks AI | FirePass list price / duration | Not verifiable | per pass | Officially unpublished; invite-only promo | docs.fireworks.ai/firepass re-read in full DIRECT today (HTML + `.md`); no price, no duration; expiration visible only in-account Billing | UNCERTAIN |

---

## Notable cross-checks from this pass

- **SpaceXAI/xAI**: x.ai/pricing live (via reader) confirms the subscription ladder Free $0 / SuperGrok $30 / SuperGrok Plus $100 and shows SuperGrok Lite + SuperGrok Heavy + Business + Enterprise columns in the compare table; © 2026 SpaceXAI LLC branding confirmed on-page.
- **OpenAI Pro naming**: ChatGPT Pro is now split 5x/20x ($100/$200) — the same 5x/20x naming and dollar points as Claude Max ($100/$200). The rate card names "Pro $100, Pro $200" explicitly.
- **Wayback snapshot dates used**: chatgpt.com/pricing 2026-09-06; claude.com/pricing 2026-09-07; x.ai/pricing 2026-09-05; cursor.com/pricing 2026-09-06; github.com/features/copilot/plans 2026-09-07; z.ai/subscribe 2026-09-07; devin.ai/pricing 2026-08-14; help.openai.com rate card 2026-09-06; help.openai.com flexible pricing 2026-07-29.
- **Mintlify `.md` doc-endpoint technique** worked on platform.kimi.ai, platform.minimax.io, and docs.fireworks.ai (Docusaurus sites like api-docs.deepseek.com need the trailing-slash URL instead).
- **Internet Archive went temporarily offline** during this pass (after the key snapshots above were captured); the Llama 4 archive sweep was cut short.
