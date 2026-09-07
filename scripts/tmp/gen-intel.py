import json, io

# AA Intelligence Index v4.3 — per-datum capture, 2026-09-07.
# Shape per docs/design-v2-score.md section 8. codingIndex / mathIndex / agenticIndex
# are null: AA does not publish them publicly (docs/research/aa-benchmark-scores.md 1.3).
# "estimate": true mirrors AA's own estimate marker.
# Every entry carries its own sourceUrl; citation string is built in lib/intelligence.ts.

LB = "https://artificialanalysis.ai/leaderboards/models"

def M(ii, est, src, aaName, variant, note=None):
    d = {"intelligenceIndex": ii, "codingIndex": None, "mathIndex": None,
         "agenticIndex": None, "estimate": bool(est), "sourceUrl": src,
         "aaName": aaName, "aaVariant": variant}
    if note:
        d["sourceNote"] = note
    return d

LB_NOTE = "Score read from the public leaderboard capture; a dedicated AA model page was not verified this pass, so the leaderboard URL is the exact source."

models = {
  "claude-fable-5-1":     M(53, 0, LB, "Claude Fable 5.1", "max with fallback", LB_NOTE),
  "gpt-6-astra":          M(53, 0, LB, "GPT-6 Astra", "max", LB_NOTE),
  "claude-opus-5":        M(51, 0, LB, "Claude Opus 5", "max", LB_NOTE),
  "muse-spark-1-3":       M(48, 0, LB, "Muse Spark 1.3", "max", LB_NOTE),
  "gpt-5-6-sol":          M(47, 0, LB, "GPT-5.6 Sol", "max", LB_NOTE),
  "qwen3-8-max":          M(45, 1, LB, "Qwen3.8 Max", "", LB_NOTE),
  "glm-5-3":              M(44, 0, LB, "GLM-5.3", "max", LB_NOTE),
  "grok-4-6":             M(44, 0, LB, "Grok 4.6", "high", LB_NOTE),
  "kimi-k3":              M(44, 0, LB, "Kimi K3", "max", LB_NOTE),
  "gpt-5-6-terra":        M(42, 0, LB, "GPT-5.6 Terra", "max", LB_NOTE),
  "qwen3-8-flash-next":   M(42, 1, LB, "Qwen3.8-Flash-Next", "", LB_NOTE),
  "glm-5-3-flash":        M(42, 0, LB, "GLM-5.3-Flash", "", LB_NOTE),
  "gemini-3-8-flash":     M(41, 0, LB, "Gemini 3.8 Flash", "high", LB_NOTE),
  "qwen3-8-2-4t":         M(40, 0, LB, "Qwen3.8 2.4T A95B", "", LB_NOTE),
  "gemini-3-7-flash":     M(40, 1, LB, "Gemini 3.7 Flash", "medium", LB_NOTE),
  "claude-sonnet-5":      M(38, 0, LB, "Claude Sonnet 5", "max", LB_NOTE),
  "gpt-5-6-luna":         M(38, 0, LB, "GPT-5.6 Luna", "max", LB_NOTE),
  "deepseek-v4-pro":      M(36, 0, LB, "DeepSeek V4 Pro 0813", "max", LB_NOTE),
  "deepseek-v4-flash":    M(35, 0, LB, "DeepSeek V4 Flash Vision", "max", LB_NOTE),
  "kimi-k2-7-code":       M(29, 1, LB, "Kimi K2.7 Code", "", LB_NOTE),
  "gpt-5-5-instant":      M(27, 0, LB, "GPT-5.5 Instant (June 2026)", "", LB_NOTE),
  "gemini-3-5-flash-lite":M(23, 0, LB, "Gemini 3.5 Flash-Lite", "", LB_NOTE),
  "minimax-m3":           M(30, 0, LB, "MiniMax-M3", "", LB_NOTE),
  "gemini-2-5-pro":       M(17, 0, "https://artificialanalysis.ai/models/gemini-2-5-pro", "Gemini 2.5 Pro", ""),
  "o3":                   M(20, 1, LB, "o3", "", LB_NOTE),
  "claude-4-5-haiku":     M(18, 0, LB, "Claude 4.5 Haiku", "", LB_NOTE),
  "glm-4-6":              M(15, 1, "https://artificialanalysis.ai/models/glm-4-6", "GLM-4.6", "Non-reasoning"),
  "gpt-5-mini":           M(17, 0, "https://artificialanalysis.ai/models/gpt-5-mini", "GPT-5 mini", "high", LB_NOTE),
  "kimi-k2":              M(13, 1, "https://artificialanalysis.ai/models/kimi-k2", "Kimi K2", ""),
  "grok-4":               M(22, 1, "https://artificialanalysis.ai/models/grok-4", "Grok 4", ""),
  "mistral-large-3":      M(10, 0, LB, "Mistral Large 3", "", LB_NOTE),
  "llama-4-maverick":     M(9, 0, LB, "Llama 4 Maverick", "", LB_NOTE),
}

snap = {
  "accessed": "2026-09-07",
  "source": "artificialanalysis.ai",
  "indexVersion": "4.3",
  "terms": "Per-datum brief citation with attribution and outbound link only; no structured or tabular reproduction. Scores are AA's, not ours.",
  "models": models,
}
io.open('content/intelligence/2026-09-07.json','w',encoding='utf-8').write(json.dumps(snap,ensure_ascii=False,indent=1))
print("intel models:", len(models))
