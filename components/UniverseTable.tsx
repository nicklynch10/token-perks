"use client";

import { useMemo, useState } from "react";
// Client-safe: constants + pure helpers only, so the ledger JSON stays out of the bundle.
import { CATEGORY_LABELS, CATEGORY_ORDER, providerIdOf, type CategoryKey } from "@/lib/universe-meta";

export interface UniverseDatum {
  id: string;
  provider: string;
  category: CategoryKey;
  plan: string;
  listPrice: string;
  /** Numeric monthly price for the price sort — null when no monthly figure exists. */
  priceMonthly: number | null;
  notes: string;
  caveats: string[];
  sourceUrl: string;
  label: "DIRECT" | "EXCERPT" | "UNCERTAIN";
  /** Date this row was read from its source — travels with the figure. */
  accessed: string;
  offer: string | null;
}

const LABEL_STYLES: Record<UniverseDatum["label"], string> = {
  DIRECT: "text-teal-deep",
  EXCERPT: "text-ink-soft",
  UNCERTAIN: "text-ink-mute",
};

type SortKey = "provider" | "category" | "price";

/** Same chip-driven sort pattern as the homepage leaderboard; category-asc mirrors the ledger's own order. */
const SORTS: { key: SortKey; label: string }[] = [
  { key: "category", label: "Category" },
  { key: "provider", label: "Provider" },
  { key: "price", label: "List price" },
];

/** Lowercased haystack per row — provider, plan, category, price, notes, caveats, evidence label. */
function searchKey(r: UniverseDatum): string {
  return [
    r.provider,
    r.plan,
    CATEGORY_LABELS[r.category],
    r.listPrice,
    r.notes,
    r.caveats.join(" "),
    r.label,
  ]
    .join(" ")
    .toLowerCase();
}

export default function UniverseTable({ rows }: { rows: UniverseDatum[] }) {
  const [cat, setCat] = useState<CategoryKey | "all">("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "category", dir: "asc" });

  const query = q.trim().toLowerCase();
  const filtered = useMemo(() => {
    let out = rows;
    if (cat !== "all") out = out.filter((r) => r.category === cat);
    if (query) out = out.filter((r) => searchKey(r).includes(query));
    return out;
  }, [rows, cat, query]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    const dir = sort.dir === "asc" ? 1 : -1;
    const catRank = (r: UniverseDatum) => CATEGORY_ORDER.indexOf(r.category);
    copy.sort((a, b) => {
      if (sort.key === "category") return (catRank(a) - catRank(b)) * dir;
      if (sort.key === "provider") return `${a.provider} ${a.plan}`.localeCompare(`${b.provider} ${b.plan}`) * dir;
      // price: rows without a monthly figure always sort last, either direction —
      // "unknown" is not a price, it should never top the cheapest-first view.
      const ap = a.priceMonthly;
      const bp = b.priceMonthly;
      if (ap == null || bp == null) return (ap == null ? 1 : 0) - (bp == null ? 1 : 0);
      return (ap - bp) * dir;
    });
    return copy;
  }, [filtered, sort]);

  function toggleSort(key: SortKey) {
    setSort((cur) => (cur.key === key ? { key, dir: cur.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  }

  function ariaSortFor(key: SortKey): "ascending" | "descending" | undefined {
    if (sort.key !== key) return undefined;
    return sort.dir === "asc" ? "ascending" : "descending";
  }

  const chip = (on: boolean) =>
    `inline-flex touch:min-h-[44px] min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-1.5 text-[12.5px] ${
      on ? "border-teal bg-teal-wash text-teal-deep" : "border-line-strong bg-card text-ink-soft hover:border-teal"
    }`;

  const filtering = cat !== "all" || query !== "";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by access-route category">
        <button type="button" aria-pressed={cat === "all"} onClick={() => setCat("all")} className={chip(cat === "all")}>
          All <span className="data text-[11px]">{rows.length}</span>
        </button>
        {CATEGORY_ORDER.map((k) => {
          const n = rows.filter((r) => r.category === k).length;
          return (
            <button key={k} type="button" aria-pressed={cat === k} onClick={() => setCat(k)} className={chip(cat === k)}>
              {CATEGORY_LABELS[k]} <span className="data text-[11px]">{n}</span>
            </button>
          );
        })}
      </div>

      {/* search + sort — one row of controls, same chip pattern as the homepage leaderboard */}
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-3">
        <div className="flex items-center gap-2">
          <label htmlFor="universe-search" className="sr-only">
            Search routes
          </label>
          <input
            id="universe-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search provider, plan, price…"
            className="min-h-[40px] w-full min-w-0 rounded-lg border border-line-strong bg-card px-3 text-[13px] text-ink placeholder:text-ink-mute focus:border-teal touch:min-h-[44px] sm:w-64"
          />
        </div>
        <fieldset className="no-scrollbar flex min-w-0 flex-wrap items-center gap-2 overflow-x-auto md:flex-nowrap" aria-label="Sort rows">
          <legend className="sr-only">Sort rows</legend>
          {SORTS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={sort.key === key}
              onClick={() => toggleSort(key)}
              className={chip(sort.key === key)}
            >
              {label}
              {sort.key === key ? (sort.dir === "asc" ? " ▲" : " ▼") : ""}
            </button>
          ))}
        </fieldset>
      </div>

      {filtering && (
        <p className="data mt-2 text-[11.5px] text-ink-mute">
          {sorted.length} of {rows.length} routes shown
        </p>
      )}

      {/* one table for every breakpoint — stacks into cards below md via .table-reflow */}
      <div className="table-reflow mt-4 overflow-x-auto rounded-xl border border-line-strong">
        <table className="spec-table">
          <caption className="sr-only">
            The full price table — every tracked access route, including routes whose prices could not be verified. Labels: DIRECT read on the provider page; EXCERPT official copy via snapshot; UNCERTAIN not verified. Search and sort are enhancements; without them the complete ledger appears here in category order.
          </caption>
          <thead>
            <tr>
              <th scope="col" aria-sort={ariaSortFor("category")}>Category</th>
              <th scope="col" aria-sort={ariaSortFor("provider")}>Provider</th>
              <th scope="col">Route</th>
              <th scope="col" aria-sort={ariaSortFor("price")}>Price (list)</th>
              <th scope="col">Caveats</th>
              <th scope="col" className="w-24">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id} id={r.id}>
                <td data-label="Category" className="text-ink-mute text-[12px]">{CATEGORY_LABELS[r.category]}</td>
                <th scope="row" className="font-normal font-medium">
                  {r.provider}
                </th>
                <td data-label="Route">
                  <a className="u-draw text-ink-soft hover:text-ink" href={`/providers/${providerIdOf(r)}/`} aria-label={`All tracked routes from ${r.provider}`}>
                    {r.plan}
                  </a>
                  {r.offer && (
                    <>
                      {" "}
                      <a className="u-draw text-[12px] text-teal-deep" href={r.offer}>
                        offer
                      </a>
                    </>
                  )}
                  <span className="block text-[11.5px] text-ink-mute">{r.notes}</span>
                </td>
                <td data-label="Price (list)" className="data text-[12.5px]">
                  {r.listPrice}
                  <span className="block text-[10.5px] font-normal text-ink-mute">read {r.accessed}</span>
                </td>
                <td data-label="Caveats" className="data text-ink-mute text-[12px]">{r.caveats.length}</td>
                <td data-label="Evidence">
                  <a className="u-draw text-ink-mute text-[12px]" href={r.sourceUrl} target="_blank" rel="noopener nofollow" aria-label={`Source for ${r.provider} ${r.plan} (${r.label})`}>
                    src
                  </a>
                  <span className={`ml-1 text-[10.5px] ${LABEL_STYLES[r.label]}`}>{r.label}</span>
                  {r.offer && (
                    <span className="block">
                      <a className="u-draw inline-flex min-h-[28px] items-center rounded-full bg-teal-wash px-2 text-[11px] font-semibold text-teal-deep touch:min-h-[40px]" href={r.offer}>
                        offer page
                      </a>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length === 0 && (
          <p role="status" className="bg-card px-4 py-6 text-sm text-ink-soft">
            No routes match —{" "}
            <button
              type="button"
              onClick={() => {
                setQ("");
                setCat("all");
              }}
              className="u-draw text-teal-deep underline"
            >
              clear search and category
            </button>
            .
          </p>
        )}
      </div>

      <p className="mt-3 text-[12px] text-ink-mute">
        Every tracked route appears here, including routes we could not verify — those are labeled UNCERTAIN and priced
        &ldquo;not fetched&rdquo; rather than guessed. DIRECT = read on the provider&apos;s own page; EXCERPT = official
        copy obtained via a snapshot or search index. Full label definitions on{" "}
        <a className="u-draw" href="/methodology/">
          methodology
        </a>
        .
      </p>
    </div>
  );
}
