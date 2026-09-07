import json, io

def R(id, provider, cat, plan, listPrice, pm, ain, aout, unit, notes, caveats, src, label, offer=None, model=None):
    return {"id": id, "provider": provider, "category": cat, "plan": plan,
            "listPrice": listPrice, "priceMonthly": pm, "apiIn": ain, "apiOut": aout,
            "unit": unit, "notes": notes, "caveats": caveats, "sourceUrl": src,
            "label": label, "offer": offer, "modelId": model}

ORFAQ = "https://openrouter.ai/docs/faq"
NB = "https://build.nvidia.com"
FW = "https://fireworks.ai/pricing"
FWP = "https://docs.fireworks.ai/firepass"
TGT = "https://www.together.ai/pricing"
CB = "https://www.cerebras.ai/pricing"
GRQ = "https://groq.com/pricing"
CUR = "https://cursor.com/pricing"
GH = "https://github.com/features/copilot/plans"
DEV = "https://devin.ai/pricing"
AG = "https://antigravity.google"
JUL = "https://jules.google"
OAI = "https://openai.com/chatgpt/pricing/"
KIM = "https://www.kimi.ai/membership/pricing"
ZAI = "https://docs.z.ai/devpack/overview"
GAPI = "https://ai.google.dev/gemini-api/docs/pricing"
MIS = "https://mistral.ai/pricing"
XP = "https://x.ai/grok"
A = "https://claude.com/pricing"
ZPR = "https://docs.z.ai/guides/overview/pricing"

c_rows = [
 R("openrouter--credits--payg","OpenRouter","c","Prepaid USD credits","5.5% top-up fee (Stripe, $0.80 min); 5% via crypto (USDC)",None,None,None,"% of top-up","No markup on inference; credits are deposits; auto top-up supported; BYOK 5% fee above free allowances; unused credits may expire after 1 year.",["Top-up fee","Credit expiry after 1 year"],ORFAQ,"EXCERPT"),
 R("openrouter--credits--free-tier","OpenRouter","c","Free models tier","$0",0,None,None,"per request","About 50 requests/day default; 1,000/day after buying $10+ of credits; free router endpoint auto-selects.",["Daily request caps"],ORFAQ,"EXCERPT"),
 R("nvidia-build--credits--kimi-k3-dev","NVIDIA Build","c","Kimi K3 free (dev/prototyping)","$0 within account limits",0,None,None,"per account","Limits vary by account and change; no published quota table; dev/prototyping scope only.",["Account-variable limits","Dev/prototyping scope only"],NB,"EXCERPT","/best/nvidia-k3-free/","kimi-k3"),
 R("fireworks--credits--payg","Fireworks AI","c","Serverless PAYG + $1 starter credit","Postpaid per token; $1 free credits for new accounts",None,None,None,"$","No credit purchases shown on pricing page; 10 RPM cap without payment method per third-party reports.",["10 RPM cap without payment method"],FW,"DIRECT"),
 R("fireworks--credits--fire-pass","Fireworks AI","c","Fire Pass","No listed price; promo-code activated; invite only",None,None,None,"per pass","Zeroes per-token cost on included open-weight models via the kimi-k3-fast router; non-production coding use only; experimental; expiration visible in Billing.",["Invite-only","Non-production only","Expiration only visible in-account"],FWP,"DIRECT",None,"kimi-k3"),
 R("fireworks--credits--training-gpu","Fireworks AI","c","Training / GPU","LoRA SFT from $0.50 per 1M training tokens (16B and under) to $10 (300B+); H100 $7-8/GPU-hr; B200 $10-13",None,None,None,"per unit","Fine-tune pricing tiered by model size; region-restricted deployments 1.5x.",["Region surcharge 1.5x"],FW,"DIRECT"),
 R("together--credits--payg","Together AI","c","Serverless PAYG (no credit packs)","Per-token postpaid; H100 dedicated $3.99/hr; B200 $8.19/hr",None,None,None,"$/1M tokens; per GPU-hr","Batch API column on the price table; fine-tuning min $4.00/job; no credit-purchase system on the page.",[],TGT,"DIRECT"),
 R("cerebras--credits--developer","Cerebras","c","Free credits + Developer tier","$5 free credits; Developer self-serve from $10",5,None,None,"$","Per-model token prices did not render on the pricing page; 10x rate limits on Developer tier.",["Per-model prices not rendered"],CB,"EXCERPT"),
 R("groq--credits--payg","Groq","c","Pay-as-you-go API","Not verified this pass",None,None,None,"$/1M tokens","groq.com/pricing is a marketing page with no table; console.groq.com/docs/pricing returned 404.",["Prices not fetched"],GRQ,"UNCERTAIN"),
 R("deepinfra--credits--observed","DeepInfra / Hyperbolic / Novita / Lambda","c","Third-party hosting (observed, not rowed)","DeepInfra seen at $1.74/$3.48 for deepseek-v4-pro in search results",None,1.74,3.48,"$/1M tokens","Third-party figure from search results, unverified against its own page.",["Unverified third-party figure"],"https://www.deepinfra.com/","UNCERTAIN",None,"deepseek-v4-pro"),
]

d_rows = [
 R("cursor--tool--hobby","Cursor","d","Hobby","Free",0,None,None,"per month","Limited Agent requests; no credit card required.",[],CUR,"DIRECT"),
 R("cursor--tool--pro","Cursor","d","Pro","$20/mo",20,None,None,"per month","Extended Agent limits; on-demand usage billed in arrears.",["On-demand usage billed in arrears"],CUR,"DIRECT"),
 R("cursor--tool--pro-plus-ultra","Cursor","d","Pro+ / Ultra","Not rendered this pass",None,None,None,"per month","Pro+ = 3x Pro Agent limits; Ultra = 20x Pro + priority. Tabs exist without prices in this render.",["Prices unverifiable in this render"],CUR,"UNCERTAIN"),
 R("cursor--tool--teams","Cursor","d","Teams Standard / Premium","$40/user/mo (Standard); Premium not rendered",40,None,None,"per user/month","Premium = 5x Standard Agent limits; Enterprise custom with pooled usage.",["Premium price not rendered"],CUR,"DIRECT"),
 R("github--tool--copilot-free","GitHub","d","Copilot Free","$0",0,None,None,"per month","2,000 completions + 50 chat requests per month; Haiku 4.5, GPT-5 mini and more; Copilot CLI.",["Monthly request caps"],GH,"DIRECT",None,"claude-4-5-haiku"),
 R("github--tool--copilot-pro","GitHub","d","Copilot Pro","$10/user/mo",10,None,None,"per user/month","Unlimited completions; cloud agent + code review; third-party agents (Claude Code, Codex); $15 monthly total credits.",["Credit-capped premium models"],GH,"DIRECT"),
 R("github--tool--copilot-pro-plus","GitHub","d","Copilot Pro+","$39/user/mo",39,None,None,"per user/month","Premium models including Opus; $70 monthly credits.",["Credit-capped premium models"],GH,"DIRECT",None,"claude-opus-5"),
 R("github--tool--copilot-max","GitHub","d","Copilot Max","$100/user/mo",100,None,None,"per user/month","Priority access to new models; $200 monthly credits.",["Credit-capped premium models"],GH,"DIRECT"),
 R("github--tool--copilot-business-enterprise","GitHub","d","Copilot Business / Enterprise","Not priced on the plans page",None,None,None,"per user/month","Described in FAQ only; checkout values not shown.",["Prices not rendered"],GH,"UNCERTAIN"),
 R("github--tool--ai-credits-unit","GitHub","d","AI Credits unit (cross-cutting)","1 AI credit = $0.01",None,None,None,"per credit","Replaces the premium-requests framing; same model roster on all paid tiers (Claude Sonnet/Opus/Haiku, GPT-5.x/Codex, Gemini Flash, Grok, Kimi).",["Unit definition, not a plan"],GH,"DIRECT"),
 R("devin--tool--devin-pricing","Windsurf / Devin (Cognition)","d","Devin pricing","Not verified this pass",None,None,None,"per month / ACU","windsurf.com/pricing redirects to devin.ai/pricing as of this pass; devin.ai returned 429 on two attempts.",["Prices not fetched"],"https://windsurf.com/pricing","UNCERTAIN"),
 R("antigravity--tool--developer-access","Google","d","Antigravity (agentic IDE/CLI/SDK)","Available at no charge",0,None,None,"per developer","Antigravity 2.0; separate enterprise offering; Gemini 3.8 / 3.7 Flash noted in product blog titles; no tier or limit detail published.",["Limits unpublished"],AG,"DIRECT",None,"gemini-3-8-flash"),
 R("google--tool--jules","Google","d","Jules","Not fetched this pass",None,None,None,"n/a","Pricing unverified; likely tied to Google AI plans but not confirmed.",["Prices not fetched"],JUL,"UNCERTAIN"),
 R("openai--tool--codex-via-chatgpt","OpenAI","d","Codex via ChatGPT plans / API","Not verified this pass",None,None,None,"n/a","Codex appears in Copilot's third-party agent roster; ChatGPT-plan-included Codex limits not verifiable this pass.",["Prices not fetched"],OAI,"UNCERTAIN"),
 R("moonshot--tool--kimi-coding-endpoint","Moonshot AI","d","Kimi coding endpoint (membership route)","Membership tiers $19-199 (category a)",19,None,None,"per month","api.kimi.com/coding/ serves the membership pool, separate from PAYG key billing.",["Shared credit pool"],KIM,"EXCERPT"),
 R("zai--tool--glm-coding-plan","Z.ai","d","GLM Coding Plan (tool coverage)","$18+ (see category a)",18,None,None,"per month","Works with Claude Code, Cline, OpenCode and listed agents; ZCode night promo: unlimited GLM-5.3-Flash 23:00-09:00.",["Credit-cycle caps"],ZAI,"DIRECT",None,"glm-5-3"),
]

e_rows = [
 R("google--promo--gemini-api-free-tier","Google","e","Gemini API free tier (AI Studio)","$0",0,None,None,"per request","Free of charge on most Flash models (2.5 Flash/Lite, 3 Flash Preview, 3.5/3.6/3.7/3.8 Flash); Pro Preview tiers excluded.",["Request-rate caps"],GAPI,"DIRECT",None,"gemini-3-8-flash"),
 R("nvidia-build--promo--kimi-k3-dev","NVIDIA Build","e","Kimi K3 dev/prototyping","$0",0,None,None,"per account","Account-variable limits; reasoning and tool calls preserved.",["Account-variable limits"],NB,"EXCERPT","/best/nvidia-k3-free/","kimi-k3"),
 R("muse-spark--promo--contributor-free","Muse Spark (via Zen)","e","Muse Spark 1.3 Contributor Free","$0 for input, cache, and output",0,None,None,"per token, promo window","In-product route only: /connect, then Zen, then /models; exact-string match required; limited-time, end date visible only in-product.",["In-product activation","End date unpublished"],"https://zen.baidu.com/","EXCERPT","/best/muse-spark-zen-free/","muse-spark-1-3"),
 R("mistral--promo--vibe-free","Mistral","e","Vibe Free","$0 + $10/mo API credits",0,None,None,"per month","Bundled platform allowance renews monthly on the free tier.",[],MIS,"EXCERPT"),
 R("mistral--promo--student-pro","Mistral","e","Student Pro pricing","$5.99/mo (normally $14.99)",5.99,None,None,"per month","Verified students.",["Student verification"],MIS,"EXCERPT"),
 R("openrouter--promo--new-user-free","OpenRouter","e","New-user allowance + free models","$0",0,None,None,"per request","Small free allowance for all new users; free models capped at 50 requests/day (1,000 with a $10 credit purchase).",["Daily request caps"],ORFAQ,"EXCERPT"),
 R("cerebras--promo--free-trial","Cerebras","e","Free trial","$5 free credits",5,None,None,"per account","All Cerebras-powered models; community support.",["One-time credit"],CB,"EXCERPT"),
 R("fireworks--promo--starter-credit","Fireworks AI","e","Starter credit","$1 free credits",1,None,None,"per account","Serverless inference only.",["One-time credit"],FW,"DIRECT"),
 R("fireworks--promo--fire-pass","Fireworks AI","e","Fire Pass","$0 per-token on included models (invite-only pass)",0,None,None,"per pass","Promo-code activation; kimi-k3-fast router; non-production only.",["Invite-only","Non-production only"],FWP,"DIRECT",None,"kimi-k3"),
 R("xai--promo--grok-free","xAI","e","Grok free tier","$0",0,None,None,"per month","Free to try on the web and in the apps.",["Rate limits unpublished"],XP,"DIRECT"),
 R("anthropic--promo--claude-free","Anthropic","e","Claude Free","$0",0,None,None,"per month","Full consumer feature surface with throttled usage.",["Throttled usage"],A,"DIRECT"),
 R("zai--promo--free-api-models","Z.ai","e","Free API models","$0",0,None,None,"$/1M tokens","GLM-4.7-Flash, GLM-4.5-Flash, GLM-4.6V-Flash priced Free.",["Zero-priced models"],ZPR,"DIRECT",None,"glm-4-6"),
 R("zai--promo--night-owl","Z.ai","e","Night-owl promo (coding plans)","$0 within plan window",None,None,None,"per day","Unlimited GLM-5.3-Flash in ZCode 23:00-09:00 daily; paid coding-plan users only; doubled quota on other agents off-peak.",["Paid-plan requirement","Time-windowed"],ZAI,"DIRECT",None,"glm-5-3-flash"),
 R("antigravity--promo--developer-access","Google","e","Antigravity developer access","$0 (available at no charge)",0,None,None,"per developer","Enterprise tier separate.",["Limits unpublished"],AG,"DIRECT"),
]

all_rows = c_rows + d_rows + e_rows
io.open('content/leaderboard/rows-c.json','w',encoding='utf-8').write(json.dumps(c_rows,ensure_ascii=False,indent=1))
io.open('content/leaderboard/rows-d.json','w',encoding='utf-8').write(json.dumps(d_rows,ensure_ascii=False,indent=1))
io.open('content/leaderboard/rows-e.json','w',encoding='utf-8').write(json.dumps(e_rows,ensure_ascii=False,indent=1))
print("c:", len(c_rows), "d:", len(d_rows), "e:", len(e_rows))
