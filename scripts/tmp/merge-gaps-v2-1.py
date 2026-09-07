#!/usr/bin/env python3
"""V2.1 coverage-gap merge: fold docs/research/provider-universe-gaps.md closures
into content/leaderboard/universe.json (+ rows-*.json parts, minus `accessed`).

All new/changed data: accessed 2026-09-07 unless noted. Nothing estimated:
still-open gaps stay UNCERTAIN with listPrice "not fetched".
"""
import json
from collections import OrderedDict

FIELDS = ["id", "provider", "category", "plan", "listPrice", "priceMonthly",
          "apiIn", "apiOut", "unit", "notes", "caveats", "sourceUrl",
          "label", "offer", "modelId", "accessed"]

def R(id, provider, cat, plan, price, monthly, ain, aout, unit, notes,
      caveats, url, label, offer=None, modelId=None, accessed="2026-09-07"):
    return OrderedDict([
        ("id", id), ("provider", provider), ("category", cat), ("plan", plan),
        ("listPrice", price), ("priceMonthly", monthly), ("apiIn", ain),
        ("apiOut", aout), ("unit", unit), ("notes", notes),
        ("caveats", caveats), ("sourceUrl", url), ("label", label),
        ("offer", offer), ("modelId", modelId), ("accessed", accessed),
    ])

APPSTORE_CHATGPT = "https://apps.apple.com/us/app/chatgpt/id6448311069"
APPSTORE_GROK = "https://apps.apple.com/us/app/grok-ai/id6670324846"
CLAUDE_MAX_HELP = "https://support.claude.com/en/articles/11049741-what-is-the-max-plan"
CURSOR_HELP = "https://cursor.com/help/account-and-billing/pricing"
GH_PLANS = "https://docs.github.com/en/copilot/get-started/plans"
DEEPSEEK_PRICING = "https://api-docs.deepseek.com/quick_start/pricing/"
KIMI_K27 = "https://platform.kimi.ai/docs/pricing/chat-k27-code"
ALIBABA_PRICING = "https://www.alibabacloud.com/help/en/model-studio/model-pricing"
GROQ_MODELS = "https://console.groq.com/docs/models"
DEVIN_ARCHIVE = "https://web.archive.org/web/20260814065709/https://devin.ai/pricing"
JULES_LIMITS = "https://jules.google/docs/usage-limits/"
RATECARD_ARCHIVE = "https://web.archive.org/web/20260906/https://help.openai.com/en/articles/11481834-chatgpt-rate-card-business-enterpriseedu-credit-based-pricing"
FLEX_ARCHIVE = "https://web.archive.org/web/20260729/https://help.openai.com/en/articles/11487671-flexible-pricing-for-the-enterprise-edu-and-business-plans"

OPENAI_NEW = [
    R("openai--sub--chatgpt-plus", "OpenAI", "a", "ChatGPT Plus",
      "$19.99/mo", 19.99, None, None, "per month",
      "Itemized in the official US App Store In-App Purchases list.",
      ["App Store price; web may differ"], APPSTORE_CHATGPT, "DIRECT"),
    R("openai--sub--chatgpt-go", "OpenAI", "a", "ChatGPT Go",
      "$8.00/mo", 8.00, None, None, "per month",
      "Offered in the US App Store as an IAP — Go is no longer India-only.",
      [], APPSTORE_CHATGPT, "DIRECT"),
    R("openai--sub--chatgpt-pro-5x", "OpenAI", "a", "ChatGPT Pro 5x",
      "$100/mo", 100.00, None, None, "per month",
      "App Store IAP; corroborated by the server-rendered breadcrumb "
      "\"Consumer > Pro $100\" in the 2026-09-06 Wayback capture of "
      "chatgpt.com/pricing (dollar table itself renders client-side).",
      [], APPSTORE_CHATGPT, "DIRECT"),
    R("openai--sub--chatgpt-pro-20x", "OpenAI", "a", "ChatGPT Pro 20x",
      "$200/mo", 200.00, None, None, "per month",
      "App Store IAP; Google Play IAP band \"$8.00 - $200.00 per item\" "
      "corroborates the top of the ladder.",
      [], APPSTORE_CHATGPT, "DIRECT"),
    R("openai--sub--chatgpt-credits", "OpenAI", "c", "ChatGPT credit packs",
      "100 credits $4.00; 500 credits $20.00; 1,000 credits $40.00",
      None, None, None, "per pack",
      "$0.04 per credit at pack rates; official IAP list.",
      [], APPSTORE_CHATGPT, "DIRECT"),
    R("openai--sub--chatgpt-business", "OpenAI", "a", "ChatGPT Business seat",
      "not fetched", None, None, None, "per seat/month",
      "Structure verified (flexible credit-based pricing: per-seat limits + "
      "shared credit pool; Codex seats closed to NEW Business workspaces from "
      "Jun 24 2026) via the help-center article (snapshot 2026-07-29, fetched "
      "2026-09-07) — but no public per-seat dollar; the checkout figure is "
      "not published. Consumer tiers are itemized in sibling rows.",
      ["Per-seat price not published"], FLEX_ARCHIVE, "UNCERTAIN"),
]

CURSOR_NEW = [
    R("cursor--tool--pro-plus", "Cursor", "d", "Cursor Pro+",
      "$60/mo", 60, None, None, "per month",
      "Official help-center pricing table (also lists Hobby Free, India-only "
      "Start, Pro $20, Ultra $200, Teams Standard $40/user, Teams Premium "
      "$120/user).",
      [], CURSOR_HELP, "DIRECT"),
    R("cursor--tool--ultra", "Cursor", "d", "Cursor Ultra",
      "$200/mo", 200, None, None, "per month",
      "20x Pro Agent limits. cursor.com/pricing tabs render client-side "
      "(live + 2026-09-06 archive) and remain unusable as a price source.",
      [], CURSOR_HELP, "DIRECT"),
]

GITHUB_NEW = [
    R("github--tool--copilot-business", "GitHub", "d", "Copilot Business",
      "$19/seat/mo", 19, None, None, "per granted seat/month",
      "Includes 1,900 AI credits per user per month (usage-based billing).",
      [], GH_PLANS, "DIRECT"),
    R("github--tool--copilot-enterprise", "GitHub", "d", "Copilot Enterprise",
      "$39/seat/mo", 39, None, None, "per granted seat/month",
      "Includes 3,900 AI credits per user per month; the enterprise chooses "
      "the plan per organization.",
      [], GH_PLANS, "DIRECT"),
]

META_LLAMA = R("meta--api--llama-4", "Meta", "b", "Llama 4 (hosted/first-party)",
    "not fetched", None, None, None, "$/1M tokens",
    "No Llama 4 row on any fetched page this pass: llama.com redirects to a "
    "JS-gated developer page, the llama-api pricing docs URL 404s, and "
    "Groq's live models table carries no Llama 4 row. Hosted Llama 3.x rows "
    "are under Together AI.",
    ["Not verifiable this pass"], "https://developer.meta.com/ai/", "UNCERTAIN")

GROQ_NEW = R("groq--api--console-list", "Groq", "b", "Groq API (console list)",
    "gpt-oss-120b $0.15/$0.60; 20b $0.075/$0.30; qwen3.6-27b $0.60/$3.00; "
    "qwen3.8-27b $0.80/$4.00", None, None, None, "$/1M tokens",
    "Official console docs table, fetched live. gpt-oss rows at 500-1,000 "
    "tok/s with 131,072 context. Flagship/legacy open-weight rows "
    "(llama-3.1-8b-instant, llama-3.3-70b-versatile, minimax-m2.7, compound) "
    "moved behind \"Enterprise - Contact Sales\". Whisper bills per audio "
    "hour; Orpheus TTS per 1M characters.",
    ["Multi-model row - no single blend", "Flagship rows sales-gated"],
    GROQ_MODELS, "DIRECT")

UPDATES = {
    "anthropic--sub--max-5x": dict(
        listPrice="$100/mo",
        notes="Official help article: \"Max 5x: $100 per month\"; monthly "
        "billing only; web prices (mobile may vary). 5x Pro usage per "
        "5-hour session; Fable capped at 50% of weekly limits.",
        caveats=["Web price; mobile may differ", "Weekly cap on Fable"],
        sourceUrl=CLAUDE_MAX_HELP),
    "anthropic--sub--max-20x": dict(
        listPrice="$200/mo", priceMonthly=200,
        notes="Same help article: \"Max 20x: $200 per month\". The pricing "
        "page itself shows only a single Max card \"From $100\" — the help "
        "center is the only itemized source.",
        caveats=[], sourceUrl=CLAUDE_MAX_HELP, label="DIRECT"),
    "xai--sub--supergrok-lite": dict(
        notes="Official Grok app In-App Purchases list. The x.ai/pricing "
        "ladder (Free $0 / SuperGrok $30 / Plus $100) renders Lite/Heavy "
        "prices client-side.",
        caveats=[], sourceUrl=APPSTORE_GROK, label="DIRECT"),
    "xai--sub--supergrok-heavy": dict(
        notes="Same IAP list; also lists SuperGrok $30, Plus $100, and Extra "
        "Usage Credits packs $5/$20/$50/$100. Third-party \"annual approx "
        "$250/mo effective\" remains unconfirmed.",
        caveats=["Annual-effective figure unconfirmed"],
        sourceUrl=APPSTORE_GROK, label="DIRECT"),
    "cursor--tool--teams": dict(
        listPrice="$40/user/mo (Standard); $120/user/mo (Premium)",
        notes="Premium = 5x Standard Agent limits; Enterprise custom with "
        "pooled usage. Official help-center pricing table.",
        caveats=[], sourceUrl=CURSOR_HELP),
    "deepseek--api--v4-flash": dict(
        listPrice="Cache-miss in $0.22 off-peak / $0.44 peak; out $0.66 / $1.32",
        notes="1M context, 384K max output; model version "
        "DeepSeek-V4-Flash-0731; concurrency limit 2,500. Peak = Mon-Fri "
        "01:00-04:00 and 06:00-10:00 UTC; all other hours off-peak at "
        "exactly half peak. Cache-hit input $0.007 off-peak / $0.014 peak. "
        "Fetched live from the trailing-slash pricing URL (the no-slash URL "
        "serves the wrong doc).",
        caveats=["Peak/off-peak split - see hours"],
        sourceUrl=DEEPSEEK_PRICING, label="DIRECT"),
    "deepseek--api--v4-pro": dict(
        listPrice="Cache-miss in $0.66 off-peak / $1.32 peak; out $1.98 / $3.96",
        notes="1M context; version DeepSeek-V4-Pro-0813; concurrency limit "
        "500. Same peak/off-peak definition as v4-flash. Cache-hit input "
        "$0.022 / $0.044. Fetched live from the trailing-slash pricing URL.",
        caveats=["Peak/off-peak split - see hours"],
        sourceUrl=DEEPSEEK_PRICING, label="DIRECT"),
    "moonshot--api--kimi-k2-7": dict(
        plan="Kimi K2.7 Code / K2.7-highspeed / K2.6 (API)",
        listPrice="K2.7 Code: cache-miss in $0.95 / out $4.00; highspeed "
        "$1.90 / $8.00; K2.6 $0.95 / $4.00",
        apiIn=0.95, apiOut=4.00,
        notes="262,144-token context; prices exclude taxes. Cache-hit input "
        "$0.19 (K2.7) / $0.16 (K2.6). Highspeed serves the same model at "
        "approx 180 tok/s for 2x rates. K2.6 prices from the sibling doc "
        "endpoint /docs/pricing/chat-k26.",
        caveats=["Cache-hit rates differ - see notes"],
        sourceUrl=KIMI_K27, label="DIRECT"),
    "alibaba--api--qwen-official": dict(
        listPrice="qwen3.8-max $2.00/$6.00; qwen3.7-max $2.50/$7.50; "
        "qwen3.7-plus $0.40/$1.60; qwen3.8-flash $0.15/$0.47",
        apiIn=2.00, apiOut=6.00,
        notes="Singapore-region Model Studio list price, 0<token<=1M tiers. "
        "Hong Kong region prices qwen3.8-max at $1.65/$4.951 with night "
        "discounts 22:00-08:00 UTC+8. Together resale of qwen3.7-plus "
        "($0.32/$1.28) undercuts Alibaba's own Singapore list.",
        caveats=["Region/term tiers - see notes"],
        sourceUrl=ALIBABA_PRICING, label="DIRECT"),
    "devin--tool--devin-pricing": dict(
        plan="Devin pricing (post-merge ladder)",
        listPrice="Free $0; Pro $20/mo; Max $200/mo; Teams $80 + $40/seat/mo; "
        "Enterprise custom",
        unit="per month",
        notes="Windsurf rows gone from the pricing page post-merge. Via the "
        "Wayback 2026-08-14 capture of the official devin.ai/pricing (the "
        "live page still 429s); snapshot fetched 2026-09-07. Pro adds "
        "frontier-model quotas and Devin Cloud; extra usage bills at API "
        "pricing.",
        caveats=["Via official-page snapshot - re-verify live"],
        sourceUrl=DEVIN_ARCHIVE, label="EXCERPT", accessed="2026-08-14"),
    "google--tool--jules": dict(
        plan="Jules (agentic coding)",
        listPrice="$0 free tier; paid tiers bundle into Google AI Pro/Ultra",
        notes="Free: 15 tasks/day, 3 concurrent. Jules in Pro: 100/day, 15 "
        "concurrent; in Ultra: 300/day, 60 concurrent. No standalone Jules "
        "price - paid tiers are benefits of Google AI Pro/Ultra. Free tier "
        "runs Gemini 2.5 Pro; paid runs the latest model (from Gemini 3 Pro).",
        caveats=["No standalone price - bundled"],
        sourceUrl=JULES_LIMITS, label="DIRECT"),
    "openai--tool--codex-via-chatgpt": dict(
        listPrice="Bundled in ChatGPT plans (no standalone price)",
        notes="Rate card: \"GPT-6 Pro, powered by GPT-6 Astra, is rolling "
        "out in ChatGPT for Pro $100, Pro $200, Business and Enterprise "
        "plans; Plus plans include GPT-6 Astra in ChatGPT Work and Codex as "
        "it rolls out.\" Codex seats closed to NEW Business workspaces from "
        "Jun 24 2026. Credit rates: Sol 10/message (Instant unlimited), "
        "Agent mode 30, Deep Research 50, Images 5, Voice 5/min. Via the "
        "2026-09-06 help-center rate-card snapshot.",
        caveats=["Availability rolling out - re-verify"],
        sourceUrl=RATECARD_ARCHIVE, label="EXCERPT", accessed="2026-09-06"),
    "zai--tool--glm-coding-pro": dict(
        listPrice="not fetched",
        notes="12,000 credits per 5-hour / 60,000 weekly. The official "
        "checkout is client-gated and the 2026-09-07 Wayback capture of "
        "z.ai/subscribe contains zero price strings; docs say only "
        "\"Starting at just 18 USD per month, with Pro and Max plans\". "
        "Third-party figures conflict and are unverified - not quoted.",
        caveats=["Price not published"]),
    "zai--tool--glm-coding-max": dict(
        listPrice="not fetched",
        notes="28,000 credits per 5-hour / 140,000 weekly. Same verification "
        "attempts as the Pro row: no official dollar found; third-party "
        "figures conflict and are unverified - not quoted.",
        caveats=["Price not published"]),
    "fireworks--credits--fire-pass": dict(
        notes="Zeroes per-token cost on included open-weight models via the "
        "kimi-k3-fast router; non-production coding use only; experimental; "
        "expiration visible in Billing. Full doc re-read 2026-09-07: still "
        "no list price and no duration - officially unpublished, invite "
        "only."),
    "minimax--sub--token-plan-plus": dict(
        notes="About 34k calls/mo; Subscription Key route; weekly token "
        "quotas. Token-plan docs confirm coverage of the full MiniMax lineup "
        "(M3 / M2.7 / image / speech)."),
    "minimax--sub--token-plan-max": dict(
        notes="About 102k calls/mo; daily coding and multimodal. Token-plan "
        "docs confirm coverage of the full MiniMax lineup (M3 / M2.7 / "
        "image / speech)."),
    "minimax--sub--token-plan-ultra": dict(
        notes="About 250k calls/mo; heavy agent usage. Token-plan docs "
        "confirm coverage of the full MiniMax lineup (M3 / M2.7 / image / "
        "speech)."),
}

REPLACEMENTS = {
    "openai--sub--chatgpt-ladder": OPENAI_NEW,
    "cursor--tool--pro-plus-ultra": CURSOR_NEW,
    "github--tool--copilot-business-enterprise": GITHUB_NEW,
    "groq--credits--payg": [GROQ_NEW],
}

INSERT_AFTER = {
    "meta--sub--none": [META_LLAMA],
}


def main():
    with open("content/leaderboard/universe.json", encoding="utf-8") as f:
        raw = f.read()
    u = json.loads(raw, object_pairs_hook=OrderedDict)
    # round-trip fidelity check before editing
    rt = json.dumps(u, indent=1, ensure_ascii=False)
    assert rt == raw, "round-trip mismatch: adjust dump settings"

    rows = u["rows"]
    by_id = OrderedDict((r["id"], r) for r in rows)
    for rid, patch in UPDATES.items():
        assert rid in by_id, f"missing row {rid}"
        for k, v in patch.items():
            by_id[rid][k] = v

    out = []
    for r in rows:
        if r["id"] in REPLACEMENTS:
            out.extend(REPLACEMENTS[r["id"]])
        else:
            out.append(by_id[r["id"]])
        out.extend(INSERT_AFTER.get(r["id"], []))
    u["rows"] = out

    with open("content/leaderboard/universe.json", "w", encoding="utf-8") as f:
        f.write(json.dumps(u, indent=1, ensure_ascii=False))

    # keep rows-*.json parts in sync (same objects minus `accessed`)
    cats = {}
    for r in out:
        cats.setdefault(r["category"], []).append(r)
    for cat, rs in cats.items():
        parts = []
        for r in rs:
            p = OrderedDict((k, v) for k, v in r.items() if k != "accessed")
            parts.append(p)
        with open(f"content/leaderboard/rows-{cat}.json", "w",
                  encoding="utf-8") as f:
            f.write(json.dumps(parts, indent=1, ensure_ascii=False))

    from collections import Counter
    print("rows:", len(out))
    print("by category:", dict(Counter(r["category"] for r in out)))
    print("by label:", dict(Counter(r["label"] for r in out)))


if __name__ == "__main__":
    main()
