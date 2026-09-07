import json, io

def R(id, provider, cat, plan, listPrice, pm, ain, aout, unit, notes, caveats, src, label, offer=None, model=None):
    return {"id": id, "provider": provider, "category": cat, "plan": plan,
            "listPrice": listPrice, "priceMonthly": pm, "apiIn": ain, "apiOut": aout,
            "unit": unit, "notes": notes, "caveats": caveats, "sourceUrl": src,
            "label": label, "offer": offer, "modelId": model}

A = "https://claude.com/pricing"
GG = "https://one.google.com/intl/en_us/about/google-ai-plans/"
XAI = "https://x.ai/pricing"
MIS = "https://mistral.ai/pricing"
KIM = "https://www.kimi.ai/membership/pricing"
ZAI = "https://docs.z.ai/devpack/overview"
MM = "https://platform.minimax.io/docs/guides/pricing-token-plan"
DSC = "https://api-docs.deepseek.com/quick_start/pricing"
TGT = "https://www.together.ai/pricing"

a_rows = [
 R("anthropic--sub--claude-free","Anthropic","a","Claude Free","$0/mo",0,None,None,"per month","Entry tier; 200k context; Sonnet and Haiku models only.",["Throttled usage","No Opus or Fable models"],A,"DIRECT"),
 R("anthropic--sub--claude-pro","Anthropic","a","Claude Pro","$20/mo ($17/mo annual)",20,None,None,"per month","Includes Claude Code, Cowork, Design, Science; Fable requires usage credits; at least 5x Free usage per 5-hour session.",["5-hour session caps","Fable requires usage credits"],A,"DIRECT"),
 R("anthropic--sub--max-5x","Anthropic","a","Claude Max 5x","From $100/mo",100,None,None,"per month","5x Pro usage per 5-hour session; Fable capped at 50% of weekly limits.",["5x and 20x dollar split not itemized","Weekly cap on Fable"],A,"DIRECT"),
 R("anthropic--sub--max-20x","Anthropic","a","Claude Max 20x","Not itemized (Max from $100)",None,None,None,"per month","20x Pro usage, same pool; page does not break out the 20x figure.",["Price not published"],A,"UNCERTAIN"),
 R("anthropic--sub--team-standard","Anthropic","a","Claude Team - Standard seat","$20/seat/mo annual ($25 monthly)",20,None,None,"per seat/month","More usage than Pro; Claude Code included; 2-150 seats.",["Annual billing for the $20 rate"],A,"DIRECT"),
 R("anthropic--sub--team-premium","Anthropic","a","Claude Team - Premium seat","$100/seat/mo annual ($125 monthly)",100,None,None,"per seat/month","5x Standard-seat usage; mix-and-match with Standard seats.",[],A,"DIRECT"),
 R("anthropic--sub--enterprise","Anthropic","a","Claude Enterprise","$20/seat + usage at API rates",20,None,None,"per seat/month + usage","Billed annually; self-serve or sales-assisted; 500k context on default model.",["Usage billed at API rates"],A,"DIRECT"),
 R("openai--sub--chatgpt-ladder","OpenAI","a","ChatGPT Free / Plus / Pro / Team","Not verified this pass",None,None,None,"per month","Plan ladder (Free, Plus, Pro, Team/Enterprise) confirmed; dollar values render client-side; direct fetches returned 403.",["Prices unverified - structure only"],"https://openai.com/chatgpt/pricing/","UNCERTAIN"),
 R("google--sub--ai-plus","Google","a","Google AI Plus","$4.99/mo",4.99,None,None,"per month","400 GB storage; entry AI plan.",[],GG,"EXCERPT"),
 R("google--sub--ai-pro","Google","a","Google AI Pro","$19.99/mo",19.99,None,None,"per month","5 TB storage; about 4x free Gemini usage; Gemini in Gmail and Docs.",[],GG,"EXCERPT"),
 R("google--sub--ai-ultra","Google","a","Google AI Ultra","$99.99/mo",99.99,None,None,"per month","20 TB+ storage; highest limits; early-access features.",[],GG,"EXCERPT"),
 R("xai--sub--grok-free","xAI","a","Grok Free","$0/mo",0,None,None,"per month","Free to try on the web and in the apps.",["Rate limits unpublished"],"https://x.ai/grok","DIRECT"),
 R("xai--sub--supergrok","xAI","a","SuperGrok","$30/mo",30,None,None,"per month","Higher rate limits and access to frontier models.",["Official page blocked; search-snippet copy"],XAI,"EXCERPT"),
 R("xai--sub--supergrok-plus","xAI","a","SuperGrok Plus","$100/mo",100,None,None,"per month","Higher weekly usage, 1080p video, priority access.",["Official page blocked; search-snippet copy"],XAI,"EXCERPT"),
 R("xai--sub--supergrok-lite","xAI","a","SuperGrok Lite","$10/mo",10,None,None,"per month","2x longer conversations; basic image and video; 1 Expert-mode agent.",["Third-party-reported; official page blocked"],XAI,"UNCERTAIN"),
 R("xai--sub--supergrok-heavy","xAI","a","SuperGrok Heavy","$300/mo",300,None,None,"per month","Multi-agent Heavy model access; annual reported near $250/mo effective.",["Third-party-reported; official page blocked"],XAI,"UNCERTAIN"),
 R("mistral--sub--vibe-free","Mistral","a","Vibe Free","$0 + $10/mo API credits",0,None,None,"per month","Free consumer agent tier with bundled monthly platform credits.",[],MIS,"EXCERPT"),
 R("mistral--sub--vibe-pro","Mistral","a","Vibe Pro","$14.99/mo",14.99,None,None,"per month","$30/mo in API credits; students $5.99/mo (Mistral Pro).",[],MIS,"EXCERPT"),
 R("mistral--sub--vibe-team","Mistral","a","Vibe Team","$24.99 per user/mo",24.99,None,None,"per user/month","Collaborative workspace tier.",[],MIS,"EXCERPT"),
 R("mistral--sub--vibe-enterprise","Mistral","a","Vibe Enterprise","Custom",None,None,None,"per org","Private deployments; contact sales.",["Custom pricing"],MIS,"EXCERPT"),
 R("moonshot--sub--kimi-k3-moderato","Moonshot AI","a","Kimi K3 Membership - Moderato","$19/mo (annual ~ $15 eff.)",19,None,None,"per month","Snapshot Sep 6 2026 from the official pricing page; live fetch JS-gated this pass.",["Shared credit pool","5-hour and weekly controls"],KIM,"EXCERPT"),
 R("moonshot--sub--kimi-k3-allegretto","Moonshot AI","a","Kimi K3 Membership - Allegretto","$39/mo (annual ~ $31 eff.)",39,None,None,"per month","Break-even about 49 tasks/mo against the $0.80/task reference (site calculation).",["Shared credit pool","5-hour and weekly controls"],KIM,"EXCERPT","/best/kimi-k3-core/"),
 R("moonshot--sub--kimi-k3-allegro","Moonshot AI","a","Kimi K3 Membership - Allegro","$99/mo (annual ~ $79 eff.)",99,None,None,"per month","2.5x price step from Allegretto.",["Shared credit pool","5-hour and weekly controls"],KIM,"EXCERPT"),
 R("moonshot--sub--kimi-k3-vivace","Moonshot AI","a","Kimi K3 Membership - Vivace","$199/mo (annual ~ $159 eff.)",199,None,None,"per month","Top tier; the coding route is api.kimi.com/coding/ (separate from PAYG key billing).",["Shared credit pool","5-hour and weekly controls"],KIM,"EXCERPT"),
 R("zai--tool--glm-coding-lite","Z.ai","a","GLM Coding Plan - Lite","$18/mo",18,None,None,"per month","2,000 credits per 5-hour cycle / 10,000 weekly; GLM-5.3 and GLM-5.3-Flash; works with Claude Code, Cline, OpenCode.",["Credit-cycle caps"],ZAI,"DIRECT"),
 R("zai--tool--glm-coding-pro","Z.ai","a","GLM Coding Plan - Pro","Not published (community ~$72-80)",None,None,None,"per month","12,000 credits per 5-hour / 60,000 weekly. Community price reports unverified.",["Price not published"],ZAI,"UNCERTAIN"),
 R("zai--tool--glm-coding-max","Z.ai","a","GLM Coding Plan - Max","Not published (community ~$160-168)",None,None,None,"per month","28,000 credits per 5-hour / 140,000 weekly. Community price reports unverified.",["Price not published"],ZAI,"UNCERTAIN"),
 R("minimax--sub--token-plan-plus","MiniMax","a","Token Plan - Plus","$22/mo (promo ~ $20)",22,None,None,"per month","About 34k calls/mo; Subscription Key route; weekly token quotas.",["Weekly quota caps"],MM,"EXCERPT"),
 R("minimax--sub--token-plan-max","MiniMax","a","Token Plan - Max","$55/mo (promo ~ $50)",55,None,None,"per month","About 102k calls/mo; daily coding and multimodal.",["Weekly quota caps"],MM,"EXCERPT"),
 R("minimax--sub--token-plan-ultra","MiniMax","a","Token Plan - Ultra","$132/mo (promo ~ $120)",132,None,None,"per month","About 250k calls/mo; heavy agent usage.",["Weekly quota caps"],MM,"EXCERPT"),
 R("deepseek--sub--none","DeepSeek","a","No consumer subscription","n/a",None,None,None,"n/a","DeepSeek sells no chat subscription in this pass; all access is API pay-as-you-go.",[],DSC,"DIRECT"),
 R("perplexity--sub--pro","Perplexity","a","Perplexity Pro","$20/mo or $200/yr",20,None,None,"per month/year","Frontier models plus extended Deep Research; direct page fetch 403.",[],"https://www.perplexity.ai/pro","EXCERPT"),
 R("perplexity--sub--max","Perplexity","a","Perplexity Max","$200/mo",200,None,None,"per month","Highest limits; about 10k monthly credits plus 35k bonus.",["Credit caps"],"https://www.perplexity.ai/hub/pricing","EXCERPT"),
 R("perplexity--sub--education-pro","Perplexity","a","Perplexity Education Pro","$10/mo",10,None,None,"per month","Student verification required.",["Student verification"],"https://www.perplexity.ai/hub/pricing","EXCERPT"),
 R("meta--sub--none","Meta","a","No first-party consumer subscription","n/a",None,None,None,"n/a","Llama ships open weights; hosted access via third parties (Together rows). First-party Llama API pricing not verified this pass.",["First-party route unverified"],TGT,"UNCERTAIN"),
]
io.open('content/leaderboard/rows-a.json','w',encoding='utf-8').write(json.dumps(a_rows,ensure_ascii=False,indent=1))
print("a rows:", len(a_rows))
