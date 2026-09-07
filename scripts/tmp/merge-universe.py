import json, io, collections

rows = []
for part in "abcde":
    rows += json.load(io.open(f'content/leaderboard/rows-{part}.json', encoding='utf-8'))

# Per-row access date: rows captured from the Sep 6 offer snapshot vs the Sep 7 pass.
SEP6 = {
    "moonshot--sub--kimi-k3-moderato", "moonshot--sub--kimi-k3-allegretto",
    "moonshot--sub--kimi-k3-allegro", "moonshot--sub--kimi-k3-vivace",
    "moonshot--tool--kimi-coding-endpoint",
    "nvidia-build--credits--kimi-k3-dev", "nvidia-build--promo--kimi-k3-dev",
    "muse-spark--promo--contributor-free",
}
for r in rows:
    r["accessed"] = "2026-09-06" if r["id"] in SEP6 else "2026-09-07"

ids = [r["id"] for r in rows]
dupes = [i for i, n in collections.Counter(ids).items() if n > 1]
assert not dupes, f"dupe ids: {dupes}"
assert all(r["sourceUrl"] and r["label"] and r["accessed"] for r in rows), "every row needs sourceUrl + label + accessed"

universe = {
    "snapshot": "2026-09-07",
    "conventions": {
        "blendedPerM": "(3 x input + 1 x output) / 4 — Token Perks arithmetic, not a provider figure",
        "batchPerM": "blended $/M x (1 - published batch discount), shown only where the provider publishes a batch rate; otherwise null (rendered as --)",
        "labels": "DIRECT = read on the provider's own page this pass; EXCERPT = official copy obtained via search index or snapshot; UNCERTAIN = not verified this pass, shown as-is",
        "categories": {"a": "consumer subscription", "b": "API per-token", "c": "credits / prepaid", "d": "coding-tool plan", "e": "free tier / live promo"},
        "overage": "per-unit excess/top-up rate on sub/credit/tool rows, quoted from official docs; 'not published' = checked, no figure; absent = not applicable",
        "cacheTerms": "ttl, minimum tokens, write fee, read discount on API rows, quoted from official docs; 'not published' = checked, no figure; absent = not applicable",
    },
    "rows": rows,
}
io.open('content/leaderboard/universe.json','w',encoding='utf-8').write(json.dumps(universe,ensure_ascii=False,indent=1))
by_cat = collections.Counter(r["category"] for r in rows)
by_label = collections.Counter(r["label"].split()[0] for r in rows)
print("total:", len(rows), dict(by_cat), dict(by_label))
