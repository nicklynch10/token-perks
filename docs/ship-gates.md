# Ship gates

Permanent pre-ship validation for the **rendered** static export (`out/`). These gates read the
artifact that actually ships — not page source, not components. They exist because an
schema.org/Offer block once existed in page source but never appeared in the rendered HTML of
`/best/muse-spark-zen-free/` and `/best/nvidia-k3-free/`, and it slipped through every review:
nothing validated JSON-LD in the export. Fixed in `db93a79` ("round 5.5 … offer schema"); the
JSON-LD gate below now guards that class of bug permanently (proof below).

All three scripts are zero-dependency Node (>= 18) except the a11y gate, which uses `axe-core`
(plus `jsdom`, bootstrapped into a scratch prefix — never into `package.json`).

## Running

Rebuild first — the gates validate `out/`, so a stale export validates stale truth:

```
npm run build
node scripts/validate-jsonld.mjs   # gate 1 — structured data in rendered HTML
node scripts/validate-feeds.mjs    # gate 2 — machine feeds (offers.json, RSS, sitemap, llms.txt)
node scripts/a11y-check.mjs        # gate 3 — axe-core audit of key pages
```

Each gate prints `RESULT: PASS` or `RESULT: FAIL …` and exits:

| Exit | Meaning                                   |
| ---- | ----------------------------------------- |
| 0    | PASS — no ERROR-level findings            |
| 1    | FAIL — fix before shipping                |
| 2    | setup error (e.g. `out/` missing, deps)   |

All three accept an optional `[outDir]` argument (default `<repo>/out`).

## Gate 1 — `scripts/validate-jsonld.mjs` (structured data, rendered)

Catches:

- **Offer/AggregateOffer missing from a rendered offer route.** Every `/best/<slug>/` page must
  contain at least one `Offer` or `AggregateOffer` node in its rendered HTML. This is the exact
  shape of the known defect (markup present in source, absent from export) and the reason this
  gate exists.
- **Page with zero JSON-LD.** Every expected page (root `index.html` plus one `index.html` per
  route directory in the `out/` listing) must carry at least one
  `<script type="application/ld+json">` block. Exempt: `/404.html`, `/404/`, `/_not-found/`
  (framework error pages — see `EXEMPT_ROUTES` in the script).
- **Unparseable JSON-LD** (JSON.parse failure = ERROR, with the offending excerpt).
- **Per-type required properties** (ERROR when missing/empty):
  `Organization`/`WebSite` → `name`, `url` · `ItemList` → non-empty `itemListElement` ·
  `Dataset` → `name`, `url`, `creator` · `BreadcrumbList` → non-empty `itemListElement` ·
  `FAQPage` → non-empty `mainEntity` · `Article` → `headline`, `datePublished` ·
  `Offer`/`AggregateOffer` → `price` or `lowPrice`+`highPrice`, plus `priceCurrency`, plus
  `availability` or `url`.
- Duplicated `@type` on a page is fine; per-page and build-wide counts are reported.

Baseline (`node scripts/validate-jsonld.mjs`, 2026-09-07, 39 pages): **PASS, 0 errors, 0 warnings.**
`@type` counts: BreadcrumbList×36, ItemList×26, FAQPage×6, Dataset×5, Article×4, Offer×2,
AggregateOffer×1, CollectionPage×1, WebSite×1.

### Known-defect-caught proof

The defect was already fixed in the working tree when this gate was written, so the proof runs the
gate against a copy of `out/` with the fix reverted — the Offer node stripped from the rendered
JSON-LD of both `$0` routes (page keeps Dataset/FAQ/Breadcrumb, loses only the Offer — exactly how
the bug looked):

```sh
cp -r out .ship-gate-proof
node -e "
const fs=require('fs');
for (const slug of ['muse-spark-zen-free','nvidia-k3-free']) {
  const f='.ship-gate-proof/best/'+slug+'/index.html';
  let html=fs.readFileSync(f,'utf8').replace(
    /(<script[^>]*application\/ld\+json[^>]*>)([\s\S]*?)(<\/script>)/,
    (_,o,body,c)=>o+JSON.stringify(JSON.parse(body).filter(n=>!['Offer','AggregateOffer'].includes(n['@type'])))+c);
  fs.writeFileSync(f,html);
}"
node scripts/validate-jsonld.mjs .ship-gate-proof   # expect exit 1, the two ERRORs below
rm -rf .ship-gate-proof
```

Actual captured result (exit code 1):

```
ERROR  /best/muse-spark-zen-free/  offer route has NO Offer/AggregateOffer node in rendered HTML (known defect class: markup in source but missing from export)
ERROR  /best/nvidia-k3-free/  offer route has NO Offer/AggregateOffer node in rendered HTML (known defect class: markup in source but missing from export)
RESULT: FAIL — 2 error(s), 0 warning(s)
```

## Gate 2 — `scripts/validate-feeds.mjs` (machine feeds)

Catches, per artifact:

- `out/api/offers.json` — not valid JSON, top level not an array, empty array; any entry missing
  `id`, `status`, `provider`, `title`, `canonical_url`, `price`, `verified_at`; duplicate `id`;
  `verified_at` unparseable or older than 40 days (ERROR) / more than 2 days in the future (WARN).
- `out/feed.xml` — unbalanced tags (structural well-formedness for the elements RSS uses here);
  channel missing `title`/`link`/`description`; zero items; any item missing `title`, `link` or
  `pubDate`.
- `out/sitemap.xml` — root not `<urlset>`; any `<loc>` not on `https://token-perks.com` or not
  resolving to a real file under `out/` (trailing-slash paths map to `index.html`);
  `http://` (insecure — checked outside the required `xmlns` declaration) or `example.com`
  (placeholder) anywhere; duplicate `<loc>` (WARN).
- `out/llms.txt` — missing or empty; does not mention the offers feed URL
  `https://token-perks.com/api/offers.json`.

Baseline (`node scripts/validate-feeds.mjs`, 2026-09-07): **PASS, 0 errors, 0 warnings.**
`api/offers.json: 3 entr(ies) | feed.xml: 6 item(s) | sitemap.xml: 36 url(s) | llms.txt: present`.

## Gate 3 — `scripts/a11y-check.mjs` (rendered accessibility, axe-core)

Serves `out/` with a tiny built-in HTTP server, fetches the key pages, and runs axe-core against
each page's DOM via jsdom (no browser needed). Audits 6 key pages derived from the `out/` listing:
`/`, `/best/`, the first offer route, the first guide route, `/providers/` if it exists (else
`/changes/`), and `/methodology/`.

Fails on any **serious or critical** violation (or a page that cannot be audited); moderate/minor
are reported only.

Dependencies: `axe-core` resolves from the existing dependency tree; `jsdom` is bootstrapped into a
scratch prefix so the site's `package.json`/lockfile are never touched:

```
npm install --prefix scripts/tmp/a11y-deps jsdom axe-core
```

(The script resolves from the project tree first, then `scripts/tmp/a11y-deps`, and prints the
bootstrap command if neither has jsdom. `scripts/tmp/` is local scratch — safe to delete and
re-bootstrap.)

Caveat: jsdom has no layout engine, so layout-dependent checks (color-contrast) come back
"incomplete", not as violations — spot-check contrast in a real browser separately. The gate prints
the incomplete count so the blind spot stays visible.

Baseline (`node scripts/a11y-check.mjs`, 2026-09-07): **FAIL, 1 serious** — the gate caught a live
defect on its first run:

```
-- /
   [serious] nested-interactive — Interactive controls must not be nested (1 node(s)) e.g. svg
-- /best/
   [moderate] heading-order — Heading levels should only increase by one (1 node(s)) e.g. article:nth-child(1) > .p-5.flex-1.flex-col > h3
violations by impact: critical=0 serious=1 moderate=1 minor=0 | incomplete checks (no layout engine): 18
RESULT: FAIL — 1 serious/critical violation(s)
```

Cause: the homepage Pareto/staircase chart SVG declares `role="img"` but its data-point descendants
carry `tabindex` — axe's `nested-interactive` ("Element has focusable descendants"). A `role="img"`
element's children are removed from the accessibility tree, so focusable children are a real bug,
not a false positive. Fix belongs in the chart component (drop the `tabindex` or drop
`role="img"`); until then this gate stays red, by design.

## Notes

- The gates only read `out/` — they cannot break the build and are safe to run anywhere, anytime.
- Gate 1's `EXEMPT_ROUTES` and the `/best/<slug>/` offer-route rule are hardcoded constants at the
  top of `scripts/validate-jsonld.mjs`; update them if the route model changes.
- These scripts are not wired into CI. Minimum bar: run all three locally after `npm run build`
  before every deploy.
