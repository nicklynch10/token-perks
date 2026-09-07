# Provider Universe — every meaningful way people pay for frontier-LLM access

Research pass for the Token Perks leaderboard. Access date **2026-09-07**.
Method: official pricing pages fetched live (WebFetch / web reader). Where a page blocked
robots (403/429), redirected, or rendered client-side, the row is labeled accordingly —
**no price in this file is guessed.** Figures carried forward from the site's Sep 6 2026
research snapshot (`content/offers/*.json`) are marked as snapshot data.

Labels:

- **DIRECT** — read from the official page in this pass (full render).
- **EXCERPT** — from the official page via reader/search-indexed copy or partial render.
- **UNCERTAIN** — could not confirm; row states exactly what could and could not be verified.

Shared column shape: Provider | Plan/Model | Price | Unit | Effective-cost notes | Source URL | Accessed | Label

---

## (a) Direct LLM subscriptions

| Provider | Plan/Model | Price | Unit | Effective-cost notes | Source URL | Accessed | Label |
|---|---|---|---|---|---|---|---|
| Anthropic | Claude Free | $0 | per month | Entry tier; 200k ctx; Sonnet + Haiku only (no Opus/Fable) | https://claude.com/pricing | 2026-09-07 | DIRECT |
| Anthropic | Claude Pro | $17/mo annual ($200 upfront) or $20 monthly | per month | Includes Claude Code, Cowork, Design, Science; "usage credits" unlock Fable; at least 5x Free usage per 5-hr session | https://claude.com/pricing | 2026-09-07 | DIRECT |
| Anthropic | Claude Max 5x | From $100 | per month | 5x Pro usage per 5-hr session; Fable capped at 50% of weekly limits | https://claude.com/pricing | 2026-09-07 | DIRECT (price point); UNCERTAIN (5x/20x dollar split not itemized) |
| Anthropic | Claude Max 20x | Not itemized on page (Max "From $100") | per month | 20x Pro usage; same pool; page does not break out the 20x figure | https://claude.com/pricing | 2026-09-07 | UNCERTAIN (price) |
| Anthropic | Claude Team — Standard seat | $20/seat/mo annual ($25 monthly) | per seat/month | More usage than Pro; Claude Code included; 2–150 seats | https://claude.com/pricing | 2026-09-07 | DIRECT |
| Anthropic | Claude Team — Premium seat | $100/seat/mo annual ($125 monthly) | per seat/month | 5x Standard-seat usage; mix-and-match with Standard seats | https://claude.com/pricing | 2026-09-07 | DIRECT |
| Anthropic | Claude Enterprise | $20/seat + usage at API rates | per seat/month + usage | Billed annually; self-serve or sales-assisted; 500k ctx on default model | https://claude.com/pricing | 2026-09-07 | DIRECT |
| OpenAI | ChatGPT Free / Plus / Pro / Team | Not verified this pass | per month | Page renders plan ladder (Free, Plus, Pro, Team/Enterprise) but dollar values render client-side; direct fetches 403 | https://openai.com/chatgpt/pricing/ | 2026-09-07 | UNCERTAIN (structure confirmed; prices not) |
| Google | Google AI Plus | $4.99 | per month | 400 GB storage; entry AI plan | https://one.google.com/intl/en_us/about/google-ai-plans/ | 2026-09-07 | EXCERPT (official page via search copy; direct fetch 403) |
| Google | Google AI Pro | $19.99 | per month | 5 TB storage; ~4x free Gemini usage; Gemini in Gmail/Docs | https://one.google.com/intl/en_us/about/google-ai-plans/ | 2026-09-07 | EXCERPT |
| Google | Google AI Ultra | $99.99 | per month | 20 TB+ storage; highest limits; early-access features. (2025 launch price was $249.99 per third-party retrospectives — current official figure above) | https://one.google.com/intl/en_us/about/google-ai-plans/ | 2026-09-07 | EXCERPT |
| xAI (SpaceXAI branding) | Grok Free | $0 | per month | "Free to try on the web and in the apps" | https://x.ai/grok | 2026-09-07 | DIRECT |
| xAI | SuperGrok | $30 | per month | "Higher rate limits and access to frontier models" | https://x.ai/pricing | 2026-09-07 | EXCERPT (official page via search snippet; direct fetch 403) |
| xAI | SuperGrok Plus | $100 | per month | Higher weekly usage, 1080p video, priority access | https://x.ai/pricing | 2026-09-07 | EXCERPT |
| xAI | SuperGrok Lite | $10 | per month | 2x longer conversations; basic image/video; 1 Expert-mode agent | https://x.ai/pricing | 2026-09-07 | UNCERTAIN (third-party-reported; official page blocked) |
| xAI | SuperGrok Heavy | $300 | per month | Multi-agent "Heavy" model access; third parties report annual ≈ $250/mo effective | https://x.ai/pricing | 2026-09-07 | UNCERTAIN (third-party-reported; official page blocked) |
| Mistral | Vibe Free (consumer; Le Chat appears rebranded) | $0 + "$10 /mo in API credits" | per month | Free consumer agent tier with bundled platform credits | https://mistral.ai/pricing | 2026-09-07 | EXCERPT (page rendered; Vibe branding) |
| Mistral | Vibe Pro | $14.99 | per month | "$30 /mo in API credits"; students $5.99/mo ("Mistral Pro") | https://mistral.ai/pricing | 2026-09-07 | EXCERPT |
| Mistral | Vibe Team | $24.99 | per user/month | Collaborative workspace tier | https://mistral.ai/pricing | 2026-09-07 | EXCERPT |
| Mistral | Vibe Enterprise | Custom | per org | Private deployments; contact sales | https://mistral.ai/pricing | 2026-09-07 | EXCERPT |
| Moonshot AI | Kimi K3 Membership — Moderato | $19 (annual ≈ $15 eff.) | per month | Snapshot Sep 6 2026 from official pricing page; live fetch JS-gated this pass | https://www.kimi.ai/membership/pricing | 2026-09-07 | EXCERPT (snapshot) |
| Moonshot AI | Kimi K3 Membership — Allegretto | $39 (annual ≈ $31 eff.) | per month | Break-even ≈ 49 tasks/mo vs $0.80/task reference (site calc) | https://www.kimi.ai/membership/pricing | 2026-09-07 | EXCERPT (snapshot) |
| Moonshot AI | Kimi K3 Membership — Allegro | $99 (annual ≈ $79 eff.) | per month | 2.5x step from Allegretto | https://www.kimi.ai/membership/pricing | 2026-09-07 | EXCERPT (snapshot) |
| Moonshot AI | Kimi K3 Membership — Vivace | $199 (annual ≈ $159 eff.) | per month | Top tier; coding route is api.kimi.com/coding/ (separate from PAYG key) | https://www.kimi.ai/membership/pricing | 2026-09-07 | EXCERPT (snapshot) |
| Z.ai (Zhipu) | GLM Coding Plan — Lite | $18 ("Starting at just 18 USD per month") | per month | 2,000 credits per 5-hr cycle / 10,000 weekly; GLM-5.3 + GLM-5.3-Flash; works with Claude Code, Cline, OpenCode | https://docs.z.ai/devpack/overview | 2026-09-07 | DIRECT (quote from official docs; z.ai/subscribe checkout JS-gated) |
| Z.ai (Zhipu) | GLM Coding Plan — Pro | Not published on official docs page | per month | 12,000 credits per 5-hr / 60,000 weekly. Community reports ~$72–80/mo — unverified, do not rely | https://docs.z.ai/devpack/overview | 2026-09-07 | UNCERTAIN (price) |
| Z.ai (Zhipu) | GLM Coding Plan — Max | Not published on official docs page | per month | 28,000 credits per 5-hr / 140,000 weekly. Community reports ~$160–168/mo — unverified | https://docs.z.ai/devpack/overview | 2026-09-07 | UNCERTAIN (price) |
| MiniMax | Token Plan — Plus | $22 (promo ≈ $20) | per month | ~34k calls/mo; Subscription Key route; weekly token quotas (recently moved off 5-hr resets per community) | https://platform.minimax.io/docs/guides/pricing-token-plan | 2026-09-07 | EXCERPT (official docs via search copy) |
| MiniMax | Token Plan — Max | $55 (promo ≈ $50) | per month | ~102k calls/mo; daily coding + multimodal | https://platform.minimax.io/docs/guides/pricing-token-plan | 2026-09-07 | EXCERPT |
| MiniMax | Token Plan — Ultra | $132 (promo ≈ $120) | per month | ~250k calls/mo; heavy agent usage | https://platform.minimax.io/docs/guides/pricing-token-plan | 2026-09-07 | EXCERPT |
| DeepSeek | (no consumer subscription — API only) | n/a | n/a | DeepSeek sells no chat subscription in this pass; all access is API PAYG (see category b) | https://api-docs.deepseek.com/quick_start/pricing | 2026-09-07 | DIRECT (structural note) |
| Perplexity | Perplexity Pro | $20/mo or $200/yr | per month/year | Frontier models + extended Deep Research; direct page fetch 403 | https://www.perplexity.ai/pro | 2026-09-07 | EXCERPT (official pages via search copy) |
| Perplexity | Perplexity Max | $200 | per month | Highest limits; ~10k monthly credits + 35k bonus | https://www.perplexity.ai/hub/pricing | 2026-09-07 | EXCERPT |
| Perplexity | Education Pro | $10 | per month | Student verification required | https://www.perplexity.ai/hub/pricing | 2026-09-07 | EXCERPT |
| Meta | (no first-party consumer subscription verified) | n/a | n/a | Llama ships open weights; hosted access seen only via third parties (Together rows, category b). First-party Llama API pricing not verified this pass | https://www.together.ai/pricing | 2026-09-07 | UNCERTAIN (first-party route) |

---

## (b) API pricing per model (USD per 1M tokens unless noted)

| Provider | Plan/Model | Price (in / out) | Unit | Effective-cost notes | Source URL | Accessed | Label |
|---|---|---|---|---|---|---|---|
| Anthropic | Fable 5.1 | $10 / $50 | $/MTok | Cache read $0.25, write $12.50; batch −50% | https://claude.com/pricing | 2026-09-07 | DIRECT |
| Anthropic | Opus 5 | $5 / $25 | $/MTok | Cache read $0.50, write $6.25; fast mode at 2x standard pricing | https://claude.com/pricing | 2026-09-07 | DIRECT |
| Anthropic | Sonnet 5 | $2 / $10 | $/MTok | Cache read $0.20, write $2.50 | https://claude.com/pricing | 2026-09-07 | DIRECT |
| Anthropic | Haiku 4.5 | $1 / $5 | $/MTok | Cache read $0.10, write $1.25 | https://claude.com/pricing | 2026-09-07 | DIRECT |
| Anthropic | Legacy (one page): Fable 5 $10/$50; Opus 4.8 / 4.7 / 4.6 / 4.5 $5/$25; Sonnet 4.6 / 4.5 $3/$15; Opus 4.1 $15/$75 | as listed | $/MTok | Batch −50% available across rows; cache reads ~10% of input rate | https://claude.com/pricing | 2026-09-07 | DIRECT |
| OpenAI | gpt-5.6-sol | $4.00 / $20.00 | $/1M tokens | Cached in $0.40; promo pricing "available at least through November 21, 2026" | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| OpenAI | gpt-5.6-terra | $2.00 / $12.00 | $/1M tokens | Cached in $0.20 | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| OpenAI | gpt-5.6-luna | $0.20 / $1.20 | $/1M tokens | Cached in $0.02 | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| OpenAI | gpt-6-astra (newest flagship) | $10.00 / $50.00 | $/1M tokens | Positioned above the 5.6 trio | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| OpenAI | gpt-5.5 / 5.4 / 5.4-mini / 5.4-nano | $5/$30; $2.50/$15; $0.75/$4.50; $0.20/$1.25 | $/1M tokens | Cached input ~10x cheaper on each row | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| OpenAI | gpt-5.2 / gpt-5.1 and gpt-5 | $1.75/$14; $1.25/$10 | $/1M tokens | Cached in $0.175 / $0.125 | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| OpenAI | gpt-5-mini / gpt-5-nano | $0.25/$2; $0.05/$0.40 | $/1M tokens | Cached in $0.025 / $0.005; nano is the cheapest frontier-family token on the page | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| OpenAI | gpt-5-pro / 5.2-pro / 5.5-pro | $15/$120; $21/$168; $30/$180 | $/1M tokens | Pro tiers; no cached-input rate shown | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| OpenAI | o-series: o3 / o3-pro / o4-mini / o1 / o1-pro | $2/$8; $20/$80; $1.10/$4.40; $15/$60; $150/$600 | $/1M tokens | Legacy reasoning family still priced; o1 cached in $7.50 | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| OpenAI | gpt-4.1 / 4.1-mini / 4.1-nano | $2/$8; $0.40/$1.60; $0.10/$0.40 | $/1M tokens | Cached in $0.50 / $0.10 / $0.025 | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| OpenAI | Embeddings: text-embedding-3-small / 3-large / ada-002 | $0.02; $0.13; $0.10 | $/1M input tokens | Input-only | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| OpenAI | Batch / Fast mode / residency (cross-cutting) | Batch −50%; Fast mode ≈ 2x; +10% data-residency uplift on models released after Mar 5 2026 | % | Applies across the tables above | https://developers.openai.com/api/docs/pricing | 2026-09-07 | DIRECT |
| Google | Gemini 3.8 / 3.7 / 3.6 Flash | $0.75 / $3.75 thru Dec 31 2026; $1.50 / $7.50 from Jan 1 2027 | $/1M tokens | Free tier available; batch/flex ≈ half; priority ≈ 1.8x | https://ai.google.dev/gemini-api/docs/pricing | 2026-09-07 | DIRECT |
| Google | Gemini 3.5 Flash / 3.5 Flash-Lite | $1.50/$9.00; $0.30/$2.50 | $/1M tokens | Free tier available on both | https://ai.google.dev/gemini-api/docs/pricing | 2026-09-07 | DIRECT |
| Google | Gemini 3.1 Flash-Lite | $0.25 / $1.50 (text/image/video in; audio $0.50) | $/1M tokens | Free tier available | https://ai.google.dev/gemini-api/docs/pricing | 2026-09-07 | DIRECT |
| Google | Gemini 3.1 Pro Preview | $2.00 / $12.00 (≤200k); $4.00 / $18.00 (>200k) | $/1M tokens | No free tier | https://ai.google.dev/gemini-api/docs/pricing | 2026-09-07 | DIRECT |
| Google | Gemini 3 Flash Preview | $0.50 / $3.00 (audio in $1.00) | $/1M tokens | Free tier available | https://ai.google.dev/gemini-api/docs/pricing | 2026-09-07 | DIRECT |
| Google | Gemini 2.5 Pro | $1.25 / $10 (≤200k); $2.50 / $15 (>200k) | $/1M tokens | Free tier available; batch $0.625/$5.00 | https://ai.google.dev/gemini-api/docs/pricing | 2026-09-07 | DIRECT |
| Google | Gemini 2.5 Flash / 2.5 Flash-Lite | $0.30/$2.50; $0.10/$0.40 | $/1M tokens | Audio input $1.00 / $0.30; free tier on both | https://ai.google.dev/gemini-api/docs/pricing | 2026-09-07 | DIRECT |
| xAI | grok-4.6 | $2.00 / $6.00 (<200k prompt); $4.00 / $12.00 (≥200k) | $/1M tokens | Cached in $0.50 / $1.00; 500k ctx; prompt over threshold bills the whole request at the higher rate | https://docs.x.ai/docs/models | 2026-09-07 | DIRECT |
| xAI | grok-4.5 | $2.00 / $6.00 (<200k); $4.00 / $12.00 (≥200k) | $/1M tokens | Cached in $0.30 / $0.60; 500k ctx | https://docs.x.ai/docs/models | 2026-09-07 | DIRECT |
| xAI | grok-4.3 | $1.25 / $2.50 (<200k); $2.50 / $5.00 (≥200k) | $/1M tokens | Cached in $0.20 / $0.40; 1M ctx | https://docs.x.ai/docs/models | 2026-09-07 | DIRECT |
| xAI | grok-4.20-0309 reasoning / non-reasoning / multi-agent | same tiers as grok-4.3 | $/1M tokens | 1M ctx; logprobs unsupported on 4.20+ | https://docs.x.ai/docs/models | 2026-09-07 | DIRECT |
| xAI | grok-build-0.1 (coding) | $1.00 / $2.00 (<200k); $2.00 / $4.00 (≥200k) | $/1M tokens | Cached in $0.20 / $0.40; 256k ctx | https://docs.x.ai/docs/models | 2026-09-07 | DIRECT |
| xAI | Imagine images / video / voice | images $0.02–0.05 per image; video $0.05–0.08 per sec; voice $0.08 per min audio | per unit | Non-token billing | https://docs.x.ai/docs/models | 2026-09-07 | DIRECT |
| DeepSeek | deepseek-v4-flash | in $0.22 off-peak / $0.44 peak; out $0.66 / $1.32; cache-hit in $0.007 | $/1M tokens | Off-peak exactly half; cache hit ~30x cheaper than miss. Direct fetch blocked (404); figures from search-indexed copy of the official page | https://api-docs.deepseek.com/quick_start/pricing | 2026-09-07 | EXCERPT |
| DeepSeek | deepseek-v4-pro | in $0.66 off-peak / $1.32 peak; out $1.98 / $3.96; cache-hit in $0.022 | $/1M tokens | Trackers note an Aug 16 2026 repricing; ~1M ctx per third parties (not on the fetched copy) | https://api-docs.deepseek.com/quick_start/pricing | 2026-09-07 | EXCERPT |
| Moonshot AI | kimi-k3 (API) | in $3.00 cache-miss / $0.30 cache-hit; out $15.00 | $/1M tokens | 1,048,576-token context; prices exclude taxes | https://platform.kimi.ai/docs/pricing/chat-k3 | 2026-09-07 | DIRECT |
| Moonshot AI | Kimi K2.7 Code / K2.6 (API) | Not fetched this pass | $/1M tokens | Listed on the platform pricing index with per-model subpages | https://platform.kimi.ai/docs/pricing | 2026-09-07 | UNCERTAIN (prices not fetched) |
| Z.ai | GLM-5.3 / GLM-5.2 / GLM-5.1 | $1.40 / $4.40 | $/1M tokens | Context windows not listed on the pricing page | https://docs.z.ai/guides/overview/pricing | 2026-09-07 | DIRECT |
| Z.ai | GLM-5.3-Flash | $0.075 / $0.25 promo (list $0.15 / $0.50) | $/1M tokens | 50% discount, strikethrough list prices shown | https://docs.z.ai/guides/overview/pricing | 2026-09-07 | DIRECT |
| Z.ai | GLM-5 / GLM-4.7 / GLM-4.6 / GLM-4.5 | $1/$3.2; $0.6/$2.2 for 4.7 / 4.6 / 4.5 | $/1M tokens | GLM-4.5-X $2.2/$8.9; GLM-4.5-Air $0.2/$1.1; GLM-4.5-AirX $1.1/$4.5 | https://docs.z.ai/guides/overview/pricing | 2026-09-07 | DIRECT |
| Z.ai | GLM-4.7-FlashX / GLM-4.7-Flash / GLM-4.5-Flash | $0.07/$0.4; Free; Free | $/1M tokens | Flash variants are zero-priced API models | https://docs.z.ai/guides/overview/pricing | 2026-09-07 | DIRECT |
| Z.ai | Vision: GLM-4.6V / GLM-4.5V / GLM-OCR / GLM-4.6V-Flash | $0.3/$0.9; $0.6/$1.8; $0.03/$0.03; Free | $/1M tokens | GLM-4.6V-FlashX $0.04/$0.4 | https://docs.z.ai/guides/overview/pricing | 2026-09-07 | DIRECT |
| Alibaba (Qwen) | Qwen official API (Model Studio) | Not verified this pass | $/1M tokens | Catalog renders model names only (qwen3.8-max, qwen3.7-plus, qwen3.8-flash); per-model pricing pages not fetched | https://www.alibabacloud.com/help/en/model-studio/models | 2026-09-07 | UNCERTAIN (official price) |
| Alibaba (Qwen) via Together AI | Qwen3.8-2.4T-A95B / Qwen3.8 Flash / Qwen3.7-Max / Qwen3.7-Plus | $2.00/$6.00; $0.15/$0.47; $1.25/$3.75; $0.32/$1.28 | $/1M tokens | Resale prices on Together, not Alibaba list | https://www.together.ai/pricing | 2026-09-07 | DIRECT (Together resale) |
| Alibaba (Qwen) via Together AI | Qwen3.6-Plus / Qwen3.5-397B-A17B / Qwen3.5-9B / Qwen3-235B-A22B | $0.50/$3.00; $0.60/$3.60; $0.17/$0.25; $0.20/$0.60 | $/1M tokens | Value ladder for open Qwen checkpoints | https://www.together.ai/pricing | 2026-09-07 | DIRECT (Together resale) |
| Meta (Llama) via Together AI | Llama 3.3 70B / Llama 3 8B Instruct Lite | $1.04/$1.04; $0.14/$0.14 | $/1M tokens | No Llama 4 row appeared on any page fetched this pass — Llama 4 pricing unverified anywhere | https://www.together.ai/pricing | 2026-09-07 | DIRECT (Together resale); Llama 4 UNCERTAIN |
| Mistral | Mistral Large (API) | $0.5 / $1.5 | $/1M tokens | "Batch work reduces the price by 50%"; cached input up to 90% cheaper; full per-model table not rendered on page | https://mistral.ai/pricing | 2026-09-07 | EXCERPT |
| MiniMax | MiniMax-M2.7 | $0.30 / $1.20 | $/1M tokens | Cache read $0.06, cache write $0.375 | https://platform.minimax.io/docs/guides/pricing-paygo | 2026-09-07 | EXCERPT (official docs via search copy) |
| MiniMax | MiniMax-M2.7-highspeed | $0.60 / $2.40 | $/1M tokens | Cache read $0.06; priority multipliers 1.5–2x per docs | https://platform.minimax.io/docs/guides/pricing-paygo | 2026-09-07 | EXCERPT |
---

## (c) Indirect credit / prepaid systems

| Provider | Plan/Model | Price | Unit | Effective-cost notes | Source URL | Accessed | Label |
|---|---|---|---|---|---|---|---|
| OpenRouter | Prepaid USD credits | Top-up fee 5.5% via Stripe ($0.80 minimum); 5% via crypto (USDC); no markup on inference | % of top-up | "Credits are simply deposits"; auto top-up supported; BYOK carries a 5% fee above free allowances; unused credits may expire after 1 year | https://openrouter.ai/docs/faq | 2026-09-07 | EXCERPT (fee constants read from page code; template strings unrendered) |
| OpenRouter | Free models tier | $0 | per request | ~50 requests/day default; 1,000/day after buying ≥ $10 of credits; free router endpoint auto-selects | https://openrouter.ai/docs/faq | 2026-09-07 | EXCERPT |
| NVIDIA Build | Kimi K3 free (dev/prototyping) | $0 within account limits | per account | Limits vary by account and change; no published quota table; dev/prototyping scope only | Official NVIDIA Build catalog (no deep URL published; navigate catalog, search "Kimi K3") | 2026-09-07 | EXCERPT (site snapshot Sep 6 2026) |
| Fireworks AI | Serverless PAYG + $1 starter credit | Postpaid per token; "$1 in free credits" for new accounts | $ | No credit purchases shown on pricing page; 10 RPM cap without payment method per third-party reports | https://fireworks.ai/pricing | 2026-09-07 | DIRECT (page); UNCERTAIN (FirePass absent from page) |
| Fireworks AI | Fire Pass | No listed price; promo-code activated; invite only | per pass | Zeroes per-token cost ($0.00) on included open-weight models via the kimi-k3-fast router; non-production coding use only; experimental; expiration visible in Billing | https://docs.fireworks.ai/firepass | 2026-09-07 | DIRECT |
| Fireworks AI | Training / GPU (context for the platform) | LoRA SFT from $0.50 per 1M training tokens (≤16B) up to $10 (300B+); H100 $7–8 per GPU-hr; B200 $10–13 | per unit | Fine-tune pricing tiered by model size; region-restricted deployments 1.5x | https://fireworks.ai/pricing | 2026-09-07 | DIRECT |
| Together AI | Serverless PAYG (no credit packs) | Per-token postpaid; H100 dedicated $3.99/hr, B200 $8.19/hr | $/1M tokens; per GPU-hr | Batch API column on price table; fine-tuning min $4.00/job; no credit-purchase system on the page | https://www.together.ai/pricing | 2026-09-07 | DIRECT |
| Cerebras | Free credits + Developer tier | $5 free credits; Developer self-serve "starting at just $10" | $ | Per-model token prices did not render on the pricing page; 10x rate limits on Developer tier | https://www.cerebras.ai/pricing | 2026-09-07 | EXCERPT (credits DIRECT); UNCERTAIN (per-model prices) |
| Groq | Pay-as-you-go API | Not verified this pass | $/1M tokens | grok.com/pricing is a marketing page with no table; console.groq.com/docs/pricing returned 404 | https://groq.com/pricing | 2026-09-07 | UNCERTAIN |
| DeepInfra / Hyperbolic / Novita / Lambda | Third-party hosting (observed, not rowed) | — | — | DeepInfra seen at $1.74/$3.48 for deepseek-v4-pro in search results — third-party figure, unverified against its own page | (search-only this pass) | 2026-09-07 | UNCERTAIN |

---

## (d) Coding-tool plans exposing frontier models

| Provider | Plan/Model | Price | Unit | Effective-cost notes | Source URL | Accessed | Label |
|---|---|---|---|---|---|---|---|
| Cursor | Hobby | Free | per month | Limited Agent requests; no credit card required | https://cursor.com/pricing | 2026-09-07 | DIRECT |
| Cursor | Pro | $20 | per month | Extended Agent limits; "generous limits for Grok"; on-demand usage billed in arrears | https://cursor.com/pricing | 2026-09-07 | DIRECT |
| Cursor | Pro+ / Ultra | Not rendered this pass (tabs exist, no prices) | per month | Pro+ = 3x Pro Agent limits; Ultra = 20x Pro + priority. Prices unverifiable in this render | https://cursor.com/pricing | 2026-09-07 | UNCERTAIN (price) |
| Cursor | Teams Standard / Premium | $40/user/mo (Standard); Premium not rendered | per user/month | Premium = 5x Standard Agent limits; Enterprise custom with pooled usage | https://cursor.com/pricing | 2026-09-07 | DIRECT (Standard); UNCERTAIN (Premium) |
| GitHub | Copilot Free | $0 | per month | 2,000 completions + 50 chat requests per month; Haiku 4.5, GPT-5 mini and more; Copilot CLI | https://github.com/features/copilot/plans | 2026-09-07 | DIRECT |
| GitHub | Copilot Pro | $10 | per user/month | Unlimited completions; cloud agent + code review; third-party agents (Claude Code, Codex); "$15 monthly total credits" | https://github.com/features/copilot/plans | 2026-09-07 | DIRECT |
| GitHub | Copilot Pro+ | $39 | per user/month | Premium models incl. Opus; "4x+ included usage than Pro"; $70 monthly credits | https://github.com/features/copilot/plans | 2026-09-07 | DIRECT |
| GitHub | Copilot Max | $100 | per user/month | "2.9x+ included usage than Pro+"; priority access to new models; $200 monthly credits | https://github.com/features/copilot/plans | 2026-09-07 | DIRECT |
| GitHub | Copilot Business / Enterprise | Not priced on the plans page | per user/month | Described in FAQ only; checkout values not shown | https://github.com/features/copilot/plans | 2026-09-07 | UNCERTAIN (price) |
| GitHub | AI Credits unit (cross-cutting) | "1 AI credit = $0.01 USD" | per credit | Replaces "premium requests" framing; same model roster on all paid tiers (Claude Sonnet/Opus/Haiku, GPT-5.x/Codex, Gemini Flash, Grok, Kimi) | https://github.com/features/copilot/plans | 2026-09-07 | DIRECT |
| Windsurf / Devin (Cognition) | Devin pricing | Not verified this pass | per month / ACU | windsurf.com/pricing now 308-redirects to devin.ai/pricing (Windsurf folded into Devin's page); devin.ai returned 429 on two attempts | https://devin.ai/pricing | 2026-09-07 | UNCERTAIN (redirect observed DIRECT) |
| Google | Antigravity (agentic IDE/CLI/SDK) | "Available at no charge" for developers | — | Antigravity 2.0; separate enterprise offering "Now Available"; Gemini 3.8 / 3.7 Flash noted in product blog titles; no tier/limit detail published | https://antigravity.google | 2026-09-07 | DIRECT (free-for-developers statement); UNCERTAIN (limits) |
| Google | Jules | Not fetched this pass | — | Pricing unverified; likely tied to Google AI plans but not confirmed | https://jules.google | 2026-09-07 | UNCERTAIN |
| OpenAI | Codex via ChatGPT plans / API | Not verified this pass | — | Codex appears in Copilot's third-party agent roster; ChatGPT-plan-included Codex limits not verifiable this pass (ChatGPT checkout gated) | https://openai.com/chatgpt/pricing/ | 2026-09-07 | UNCERTAIN |
| Moonshot AI | Kimi coding endpoint (membership route) | Membership tiers $19–199 (see category a) | per month | api.kimi.com/coding/ serves the membership pool, separate from PAYG key billing | https://www.kimi.ai/membership/pricing | 2026-09-07 | EXCERPT (snapshot Sep 6 2026) |
| Z.ai | GLM Coding Plan (tool coverage) | $18+ (see category a) | per month | Works with Claude Code, Cline, OpenCode and listed agents; ZCode night promo: unlimited GLM-5.3-Flash 23:00–09:00 | https://docs.z.ai/devpack/overview | 2026-09-07 | DIRECT |
---

## (e) Free tiers and live promos

| Provider | Plan/Model | Price | Unit | Effective-cost notes | Source URL | Accessed | Label |
|---|---|---|---|---|---|---|---|
| Google | Gemini API free tier (AI Studio) | $0 | per request | "Free of charge" on most Flash models (2.5 Flash/Lite, 3 Flash Preview, 3.5/3.6/3.7/3.8 Flash); Pro Preview tiers excluded | https://ai.google.dev/gemini-api/docs/pricing | 2026-09-07 | DIRECT |
| NVIDIA Build | Kimi K3 dev/prototyping | $0 | per account | Account-variable limits; reasoning + tool calls preserved | Official NVIDIA Build catalog | 2026-09-07 | EXCERPT (snapshot Sep 6 2026) |
| Muse Spark (via Zen) | "Muse Spark 1.3 Contributor Free" | $0 for input, cache, and output | per token, promo window | In-product route only: /connect → Zen → /models; exact-string match required; limited-time, end date visible only in-product | In-product (no standalone checkout URL) | 2026-09-07 | EXCERPT (snapshot Sep 6 2026) |
| Mistral | Vibe Free | $0 + $10/mo API credits | per month | Bundled platform allowance renews monthly on free tier | https://mistral.ai/pricing | 2026-09-07 | EXCERPT |
| Mistral | Student Pro pricing | $5.99/mo (normally $14.99) | per month | Verified students | https://mistral.ai/pricing | 2026-09-07 | EXCERPT |
| OpenRouter | New-user allowance + free models | $0 | per request | "Small free allowance" for all new users; free models capped 50 req/day (1,000 with $10 credit purchase) | https://openrouter.ai/docs/faq | 2026-09-07 | EXCERPT |
| Cerebras | Free trial | $5 free credits | per account | All Cerebras-powered models; community support | https://www.cerebras.ai/pricing | 2026-09-07 | EXCERPT |
| Fireworks AI | Starter credit | $1 free credits | per account | Serverless inference only | https://fireworks.ai/pricing | 2026-09-07 | DIRECT |
| Fireworks AI | Fire Pass | $0 per-token on included models (invite-only promo pass) | per pass | Promo-code activation; kimi-k3-fast router; non-production only | https://docs.fireworks.ai/firepass | 2026-09-07 | DIRECT |
| xAI | Grok free tier | $0 | per month | "Free to try on the web and in the apps" | https://x.ai/grok | 2026-09-07 | DIRECT |
| Anthropic | Claude Free | $0 | per month | Full consumer feature surface with throttled usage | https://claude.com/pricing | 2026-09-07 | DIRECT |
| Z.ai | Free API models | $0 | $/1M tokens | GLM-4.7-Flash, GLM-4.5-Flash, GLM-4.6V-Flash priced Free | https://docs.z.ai/guides/overview/pricing | 2026-09-07 | DIRECT |
| Z.ai | Night-owl promo (coding plans) | Unlimited GLM-5.3-Flash in ZCode, 23:00–09:00 daily | per day | Paid coding-plan users only; doubled quota on other agents off-peak | https://docs.z.ai/devpack/overview | 2026-09-07 | DIRECT |
| Google | Antigravity developer access | $0 ("Available at no charge") | per developer | Enterprise tier separate | https://antigravity.google | 2026-09-07 | DIRECT |

---

## Coverage gaps (could not verify — do not backfill with memory)

1. **ChatGPT subscription dollar figures (Plus/Pro/Team).** The plan ladder renders but prices are client-side gated; openai.com and help.openai.com both 403'd; search rate-limited. Structure confirmed, prices not.
2. **Claude Max 5x vs 20x dollar split.** Official page shows only "From $100" for Max.
3. **GLM Coding Plan Pro/Max monthly prices.** Official docs publish only the $18 Lite anchor and credit quotas; community reports conflict ($72–80 Pro, $160–168 Max).
4. **Qwen official first-party API prices** (Alibaba Model Studio per-model pages) — catalog renders names only.
5. **Llama 4** — not seen on any fetched page, first-party or hosted. Only Llama 3.x resale prices verified.
6. **Groq per-model API prices** — pricing pages unreachable this pass.
7. **Devin/Windsurf pricing post-merge** — devin.ai 429 on repeated attempts; the windsurf.com → devin.ai redirect is the only confirmed fact.
8. **Cursor Pro+/Ultra/Teams Premium and Copilot Business/Enterprise dollar figures** — tabs/FAQ exist, values not rendered.
9. **DeepSeek context windows and current peak/off-peak hours** — figures from search-indexed official copy; direct fetch blocked.
10. **Kimi K2.7 Code / K2.6 API prices** — subpages exist but were not fetched.
11. **SuperGrok Lite / Heavy prices** — third-party reported; official x.ai/pricing blocked.
12. **FirePass list price and duration** — invite-only, no published price; expiration visible only in-account.
13. **MiniMax M3, GPT-6 "Astra" subscription-side availability, Jules pricing** — search chatter only; no official confirmation fetched.

## Proposed canonical provider/plan slug scheme

Extends the existing offer-id pattern (`kimi-k3-core`, `nvidia-k3-free`, `muse-spark-zen-free`) into a three-segment scheme:

    <provider>--<surface>--<plan-or-model>

Rules:

- **provider**: one segment, lowercase, hyphenated: `openai`, `anthropic`, `google`, `xai`, `mistral`, `moonshot`, `zai`, `minimax`, `deepseek`, `perplexity`, `meta`, `nvidia-build`, `openrouter`, `fireworks`, `together`, `cerebras`, `groq`, `cursor`, `github`, `devin`, `antigravity`.
- **surface** (how you pay): `sub` (consumer subscription) | `api` (per-token) | `credits` (prepaid/credit systems) | `tool` (coding-tool plan) | `promo` (free tiers, promos).
- **plan-or-model**: lowercase, hyphenated; keep the provider's own tier names (they are the brand); annual variants get an `-annual` suffix; model rows use the exact model id (dots become hyphens: `gpt-5-6-terra`, `gemini-3-1-pro-preview`, `glm-5-3-flash`).
- Segments joined by `--`; within a segment, `-`. ASCII only.

Examples mapping this file:

| Row | Slug |
|---|---|
| Claude Max 5x | `anthropic--sub--max-5x` |
| Claude Opus 5 API | `anthropic--api--opus-5` |
| ChatGPT Pro (pending verification) | `openai--sub--chatgpt-pro` |
| gpt-5.6-terra API | `openai--api--gpt-5-6-terra` |
| Google AI Ultra | `google--sub--ai-ultra` |
| Gemini 3.1 Pro Preview API | `google--api--gemini-3-1-pro-preview` |
| SuperGrok Heavy | `xai--sub--supergrok-heavy` |
| grok-4.6 API (short-context tier) | `xai--api--grok-4-6` |
| Vibe Pro | `mistral--sub--vibe-pro` |
| Kimi K3 Membership Allegretto | `moonshot--sub--kimi-k3-allegretto` (existing offer `kimi-k3-core` maps to the ladder) |
| kimi-k3 API | `moonshot--api--kimi-k3` |
| GLM Coding Pro | `zai--tool--glm-coding-pro` |
| GLM-5.3-Flash API promo price | `zai--api--glm-5-3-flash` |
| MiniMax Token Plan Ultra | `minimax--sub--token-plan-ultra` |
| deepseek-v4-pro API (peak) | `deepseek--api--v4-pro` |
| Perplexity Pro | `perplexity--sub--pro` |
| NVIDIA Build K3 free | `nvidia-build--promo--kimi-k3-dev` (existing `nvidia-k3-free` migrates here) |
| OpenRouter PAYG | `openrouter--credits--payg` |
| Fire Pass | `fireworks--promo--fire-pass` |
| Cursor Pro | `cursor--tool--pro` |
| Copilot Pro+ | `github--tool--copilot-pro-plus` |
| Muse Spark free promo | existing `muse-spark-zen-free` → `muse-spark--promo--contributor-free` |

## Row counts

- (a) Direct subscriptions: **35 rows**
- (b) API pricing: **46 rows**
- (c) Credit/prepaid systems: **10 rows**
- (d) Coding-tool plans: **16 rows**
- (e) Free tiers/promos: **14 rows**

**Total: 121 rows.** Every row carries a source URL, the 2026-09-07 access date, and a DIRECT / EXCERPT / UNCERTAIN label; UNCERTAIN rows state precisely what could not be confirmed.

