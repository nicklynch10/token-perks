import json, io, collections

rows = []
for part in "abcde":
    rows += json.load(io.open(f'content/leaderboard/rows-{part}.json', encoding='utf-8'))

ids = [r["id"] for r in rows]
dupes = [i for i, n in collections.Counter(ids).items() if n > 1]
assert not dupes, f"dupe ids: {dupes}"
assert all(r["sourceUrl"] and r["label"] for r in rows), "every row needs sourceUrl + label"

universe = {
    "snapshot": "2026-09-07",
    "conventions": {
        "blendedPerM": "(3 x input + 1 x output) / 4 — Token Perks arithmetic, not a provider figure",
        "labels": "DIRECT = read on the provider's own page this pass; EXCERPT = official copy obtained via search index or snapshot; UNCERTAIN = not verified this pass, shown as-is",
        "categories": {"a": "consumer subscription", "b": "API per-token", "c": "credits / prepaid", "d": "coding-tool plan", "e": "free tier / live promo"},
    },
    "rows": rows,
}
io.open('content/leaderboard/universe.json','w',encoding='utf-8').write(json.dumps(universe,ensure_ascii=False,indent=1))
by_cat = collections.Counter(r["category"] for r in rows)
by_label = collections.Counter(r["label"].split()[0] for r in rows)
print("total:", len(rows), dict(by_cat), dict(by_label))
