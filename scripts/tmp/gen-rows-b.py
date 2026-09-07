import json, io

def R(id, provider, cat, plan, listPrice, pm, ain, aout, unit, notes, caveats, src, label, offer=None, model=None):
    return {"id": id, "provider": provider, "category": cat, "plan": plan,
            "listPrice": listPrice, "priceMonthly": pm, "apiIn": ain, "apiOut": aout,
            "unit": unit, "notes": notes, "caveats": caveats, "sourceUrl": src,
            "label": label, "offer": offer, "modelId": model}

A = "https://claude.com/pricing"
OAI = "https://developers.openai.com/api/docs/pricing"
GAPI = "https://ai.google.dev/gemini-api/docs/pricing"
XDOCS = "https://docs.x.ai/docs/models"
DSC = "https://api-docs.deepseek.com/quick_start/pricing"
KP = "https://platform.kimi.ai/docs/pricing/chat-k3"
ZPR = "https://docs.z.ai/guides/overview/pricing"
TGT = "https://www.together.ai/pricing"
MIS = "https://mistral.ai/pricing"
MMP = "https://platform.minimax.io/docs/guides/pricing-paygo"

b_rows = [
 R("anthropic--api--fable-5-1","Anthropic","b","Fable 5.1","$10 in / $50 out",None,10,50,"$/MTok","Cache read $0.25, write $12.50; batch -50%.",["High output rate"],A,"DIRECT",None,"claude-fable-5-1"),
 R("anthropic--api--opus-5","Anthropic","b","Opus 5","$5 in / $25 out",None,5,25,"$/MTok","Cache read $0.50, write $6.25; fast mode at 2x standard pricing.",[],A,"DIRECT",None,"claude-opus-5"),
 R("anthropic--api--sonnet-5","Anthropic","b","Sonnet 5","$2 in / $10 out",None,2,10,"$/MTok","Cache read $0.20, write $2.50.",[],A,"DIRECT",None,"claude-sonnet-5"),
 R("anthropic--api--haiku-4-5","Anthropic","b","Haiku 4.5","$1 in / $5 out",None,1,5,"$/MTok","Cache read $0.10, write $1.25.",[],A,"DIRECT",None,"claude-4-5-haiku"),
 R("anthropic--api--legacy-ladder","Anthropic","b","Legacy page ladder (Fable 5; Opus 4.x; Sonnet 4.x)","$10/$50; $5/$25; $3/$15; $15/$75 as listed",None,None,None,"$/MTok","One legacy page: Fable 5 $10/$50; Opus 4.8/4.7/4.6/4.5 $5/$25; Sonnet 4.6/4.5 $3/$15; Opus 4.1 $15/$75. Batch -50% across rows.",["Superseded ladder; per-model rows not split"],"https://artificialanalysis.ai/leaderboards/models" if False else A,"DIRECT"),
 R("openai--api--gpt-5-6-sol","OpenAI","b","gpt-5.6-sol","$4.00 in / $20.00 out",None,4,20,"$/1M tokens","Cached input $0.40; promo pricing available at least through November 21, 2026.",["Promo expiry 2026-11-21"],OAI,"DIRECT",None,"gpt-5-6-sol"),
 R("openai--api--gpt-5-6-terra","OpenAI","b","gpt-5.6-terra","$2.00 in / $12.00 out",None,2,12,"$/1M tokens","Cached input $0.20.",[],OAI,"DIRECT",None,"gpt-5-6-terra"),
 R("openai--api--gpt-5-6-luna","OpenAI","b","gpt-5.6-luna","$0.20 in / $1.20 out",None,0.2,1.2,"$/1M tokens","Cached input $0.02.",[],OAI,"DIRECT",None,"gpt-5-6-luna"),
 R("openai--api--gpt-6-astra","OpenAI","b","gpt-6-astra (newest flagship)","$10.00 in / $50.00 out",None,10,50,"$/1M tokens","Positioned above the 5.6 trio.",["Newest flagship; premium rate"],OAI,"DIRECT",None,"gpt-6-astra"),
 R("openai--api--gpt-5-5","OpenAI","b","gpt-5.5 / 5.4 / 5.4-mini / 5.4-nano","$5/$30; $2.50/$15; $0.75/$4.50; $0.20/$1.25",None,5,30,"$/1M tokens","Cached input about 10x cheaper on each row.",["Ladder row; models not split"],OAI,"DIRECT",None,"gpt-5-5-instant"),
 R("openai--api--gpt-5-2","OpenAI","b","gpt-5.2 / gpt-5.1","$1.75/$14; $1.25/$10",None,1.75,14,"$/1M tokens","Cached input $0.175 / $0.125.",["Two models on one row"],OAI,"DIRECT"),
 R("openai--api--gpt-5-mini","OpenAI","b","gpt-5-mini / gpt-5-nano","$0.25/$2; $0.05/$0.40",None,0.25,2,"$/1M tokens","Cached in $0.025 / $0.005; nano is the cheapest frontier-family token on the page.",["Two models on one row"],OAI,"DIRECT",None,"gpt-5-mini"),
 R("openai--api--gpt-5-pro","OpenAI","b","gpt-5-pro / 5.2-pro / 5.5-pro","$15/$120; $21/$168; $30/$180",None,15,120,"$/1M tokens","Pro tiers; no cached-input rate shown.",["Three models on one row; no cache rate"],OAI,"DIRECT"),
 R("openai--api--o3","OpenAI","b","o-series (o3 / o3-pro / o4-mini / o1 / o1-pro)","$2/$8; $20/$80; $1.10/$4.40; $15/$60; $150/$600",None,2,8,"$/1M tokens","Legacy reasoning family still priced; o1 cached input $7.50.",["Five models on one row"],OAI,"DIRECT",None,"o3"),
 R("openai--api--gpt-4-1","OpenAI","b","gpt-4.1 / 4.1-mini / 4.1-nano","$2/$8; $0.40/$1.60; $0.10/$0.40",None,2,8,"$/1M tokens","Cached in $0.50 / $0.10 / $0.025.",["Three models on one row"],OAI,"DIRECT"),
 R("openai--api--embeddings","OpenAI","b","Embeddings (3-small / 3-large / ada-002)","$0.02; $0.13; $0.10",None,0.02,None,"$/1M input tokens","Input-only embedding models.",["Input-only; not chat models"],OAI,"DIRECT"),
 R("openai--api--batch-fast","OpenAI","b","Batch / Fast mode / residency modifiers","Batch -50%; Fast mode ~2x; +10% residency uplift",None,None,None,"%","Cross-cutting modifiers on rows above; residency applies to models released after March 5, 2026.",["Modifiers, not standalone access"],OAI,"DIRECT"),
 R("google--api--gemini-3-8-flash","Google","b","Gemini 3.8 / 3.7 / 3.6 Flash","$0.75 in / $3.75 out (thru Dec 31 2026); $1.50 / $7.50 from Jan 1 2027",None,0.75,3.75,"$/1M tokens","Free tier available; batch/flex about half; priority about 1.8x. Price rises 2027-01-01.",["Scheduled price increase 2027-01-01"],GAPI,"DIRECT",None,"gemini-3-8-flash"),
 R("google--api--gemini-3-5-flash","Google","b","Gemini 3.5 Flash / 3.5 Flash-Lite","$1.50/$9.00; $0.30/$2.50",None,1.5,9,"$/1M tokens","Free tier available on both.",["Two models on one row"],GAPI,"DIRECT",None,"gemini-3-5-flash"),
 R("google--api--gemini-3-1-flash-lite","Google","b","Gemini 3.1 Flash-Lite","$0.25 in / $1.50 out",None,0.25,1.5,"$/1M tokens","Text/image/video input at listed rates; audio $0.50. Free tier available.",[],GAPI,"DIRECT"),
 R("google--api--gemini-3-1-pro-preview","Google","b","Gemini 3.1 Pro Preview","$2.00 in / $12.00 out (200k and under)",None,2,12,"$/1M tokens","Over 200k context: $4.00 / $18.00. No free tier.",["Long-context surcharge above 200k","No free tier"],GAPI,"DIRECT",None,"gemini-3-1-pro-preview"),
 R("google--api--gemini-3-flash-preview","Google","b","Gemini 3 Flash Preview","$0.50 in / $3.00 out",None,0.5,3,"$/1M tokens","Audio input $1.00. Free tier available.",["Preview tier"],GAPI,"DIRECT"),
 R("google--api--gemini-2-5-pro","Google","b","Gemini 2.5 Pro","$1.25 in / $10 out (200k and under)",None,1.25,10,"$/1M tokens","Over 200k: $2.50 / $15. Free tier available; batch $0.625/$5.00.",["Long-context surcharge above 200k"],GAPI,"DIRECT",None,"gemini-2-5-pro"),
 R("google--api--gemini-2-5-flash","Google","b","Gemini 2.5 Flash / 2.5 Flash-Lite","$0.30/$2.50; $0.10/$0.40",None,0.3,2.5,"$/1M tokens","Audio input $1.00 / $0.30; free tier on both.",["Two models on one row"],GAPI,"DIRECT"),
 R("xai--api--grok-4-6","xAI","b","grok-4.6","$2.00 in / $6.00 out (under 200k)",None,2,6,"$/1M tokens","At or above 200k prompt: $4.00 / $12.00; cached input $0.50 / $1.00; 500k context. Prompt over threshold bills the whole request at the higher rate.",["Whole-request repricing above 200k"],XDOCS,"DIRECT",None,"grok-4-6"),
 R("xai--api--grok-4-5","xAI","b","grok-4.5","$2.00 in / $6.00 out (under 200k)",None,2,6,"$/1M tokens","At or above 200k: $4.00 / $12.00; cached input $0.30 / $0.60; 500k context.",["Whole-request repricing above 200k"],XDOCS,"DIRECT"),
 R("xai--api--grok-4-3","xAI","b","grok-4.3","$1.25 in / $2.50 out (under 200k)",None,1.25,2.5,"$/1M tokens","At or above 200k: $2.50 / $5.00; cached input $0.20 / $0.40; 1M context.",["Whole-request repricing above 200k"],XDOCS,"DIRECT"),
 R("xai--api--grok-4-20","xAI","b","grok-4.20-0309 (reasoning / non-reasoning / multi-agent)","Same tiers as grok-4.3",None,1.25,2.5,"$/1M tokens","1M context; logprobs unsupported on 4.20+.",["Logprobs unsupported"],XDOCS,"DIRECT"),
 R("xai--api--grok-build-0-1","xAI","b","grok-build-0.1 (coding)","$1.00 in / $2.00 out (under 200k)",None,1,2,"$/1M tokens","At or above 200k: $2.00 / $4.00; cached input $0.20 / $0.40; 256k context.",["Whole-request repricing above 200k"],XDOCS,"DIRECT"),
 R("xai--api--imagine","xAI","b","Imagine images / video / voice","$0.02-0.05 per image; $0.05-0.08 per sec; $0.08 per min",None,None,None,"per unit","Non-token billing.",["Non-token billing"],XDOCS,"DIRECT"),
 R("deepseek--api--v4-flash","DeepSeek","b","deepseek-v4-flash","In $0.22 off-peak / $0.44 peak; out $0.66 / $1.32",None,0.22,0.66,"$/1M tokens","Off-peak exactly half; cache-hit input $0.007. Direct fetch blocked (404); figures from search-indexed official copy.",["Peak/off-peak split","Hours unpublished in snapshot"],DSC,"EXCERPT",None,"deepseek-v4-flash"),
 R("deepseek--api--v4-pro","DeepSeek","b","deepseek-v4-pro","In $0.66 off-peak / $1.32 peak; out $1.98 / $3.96",None,0.66,1.98,"$/1M tokens","Cache-hit input $0.022. Trackers note an Aug 16 2026 repricing; about 1M context per third parties.",["Peak/off-peak split","Context window unconfirmed"],DSC,"EXCERPT",None,"deepseek-v4-pro"),
 R("moonshot--api--kimi-k3","Moonshot AI","b","kimi-k3 (API)","$3.00 in (cache-miss) / $15.00 out",None,3,15,"$/1M tokens","Cache-hit input $0.30; 1,048,576-token context; prices exclude taxes.",["Taxes excluded"],KP,"DIRECT",None,"kimi-k3"),
 R("moonshot--api--kimi-k2-7","Moonshot AI","b","Kimi K2.7 Code / K2.6 (API)","Not fetched this pass",None,None,None,"$/1M tokens","Listed on the platform pricing index with per-model subpages.",["Prices not fetched"],"https://platform.kimi.ai/docs/pricing","UNCERTAIN",None,"kimi-k2-7-code"),
 R("zai--api--glm-5-3","Z.ai","b","GLM-5.3 / GLM-5.2 / GLM-5.1","$1.40 in / $4.40 out",None,1.4,4.4,"$/1M tokens","Context windows not listed on the pricing page.",["Context windows unpublished"],ZPR,"DIRECT",None,"glm-5-3"),
 R("zai--api--glm-5-3-flash","Z.ai","b","GLM-5.3-Flash","$0.075 in / $0.25 out (promo; list $0.15 / $0.50)",None,0.075,0.25,"$/1M tokens","50% discount with strikethrough list prices shown.",["Promo may end; list is 2x"],ZPR,"DIRECT",None,"glm-5-3-flash"),
 R("zai--api--glm-5-ladder","Z.ai","b","GLM-5 / 4.7 / 4.6 / 4.5 ladder","$1/$3.2; $0.6/$2.2 (4.7/4.6/4.5)",None,1,3.2,"$/1M tokens","GLM-4.5-X $2.2/$8.9; GLM-4.5-Air $0.2/$1.1; GLM-4.5-AirX $1.1/$4.5.",["Ladder row; models not split"],ZPR,"DIRECT"),
 R("zai--api--glm-flash-free","Z.ai","b","GLM-4.7-FlashX / Flash / 4.5-Flash","$0.07/$0.4; Free; Free",None,0.07,0.4,"$/1M tokens","Flash variants are zero-priced API models.",["Zero-priced tiers"],ZPR,"DIRECT",None,"glm-4-6"),
 R("zai--api--glm-vision","Z.ai","b","GLM-4.6V / 4.5V / GLM-OCR / 4.6V-Flash","$0.3/$0.9; $0.6/$1.8; $0.03/$0.03; Free",None,0.3,0.9,"$/1M tokens","Vision ladder; GLM-4.6V-FlashX $0.04/$0.4.",["Ladder row; models not split"],ZPR,"DIRECT"),
 R("alibaba--api--qwen-official","Alibaba (Qwen)","b","Qwen official API (Model Studio)","Not verified this pass",None,None,None,"$/1M tokens","Catalog renders model names only (qwen3.8-max, qwen3.7-plus, qwen3.8-flash); per-model pricing pages not fetched.",["Prices not fetched"],"https://www.alibabacloud.com/help/en/model-studio/models","UNCERTAIN",None,"qwen3-8-max"),
 R("together--api--qwen-resale","Alibaba (Qwen) via Together AI","b","Qwen3.8-2.4T-A95B / Qwen3.8 Flash / Qwen3.7-Max / Qwen3.7-Plus","$2.00/$6.00; $0.15/$0.47; $1.25/$3.75; $0.32/$1.28",None,2,6,"$/1M tokens","Resale prices on Together, not Alibaba list.",["Resale pricing, not first-party"],TGT,"DIRECT",None,"qwen3-8-2-4t"),
 R("together--api--qwen-value","Alibaba (Qwen) via Together AI","b","Qwen3.6-Plus / Qwen3.5-397B-A17B / Qwen3.5-9B / Qwen3-235B-A22B","$0.50/$3.00; $0.60/$3.60; $0.17/$0.25; $0.20/$0.60",None,0.5,3,"$/1M tokens","Value ladder for open Qwen checkpoints.",["Resale pricing, not first-party"],TGT,"DIRECT"),
 R("together--api--llama-resale","Meta (Llama) via Together AI","b","Llama 3.3 70B / Llama 3 8B Instruct Lite","$1.04/$1.04; $0.14/$0.14",None,1.04,1.04,"$/1M tokens","No Llama 4 row appeared on any page fetched this pass - Llama 4 pricing unverified anywhere.",["Llama 4 pricing unverified"],TGT,"DIRECT",None,"llama-4-maverick"),
 R("mistral--api--mistral-large","Mistral","b","Mistral Large (API)","$0.5 in / $1.5 out",None,0.5,1.5,"$/1M tokens","Batch work reduces price by 50%; cached input up to 90% cheaper; full per-model table not rendered.",["Full table not rendered"],MIS,"EXCERPT",None,"mistral-large-3"),
 R("minimax--api--m2-7","MiniMax","b","MiniMax-M2.7","$0.30 in / $1.20 out",None,0.3,1.2,"$/1M tokens","Cache read $0.06, cache write $0.375.",[],MMP,"EXCERPT",None,"minimax-m3"),
 R("minimax--api--m2-7-highspeed","MiniMax","b","MiniMax-M2.7-highspeed","$0.60 in / $2.40 out",None,0.6,2.4,"$/1M tokens","Cache read $0.06; priority multipliers 1.5-2x per docs.",["Priority multipliers raise price"],MMP,"EXCERPT"),
]
io.open('content/leaderboard/rows-b.json','w',encoding='utf-8').write(json.dumps(b_rows,ensure_ascii=False,indent=1))
print("b rows:", len(b_rows))
