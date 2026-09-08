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

export default function UniverseTable({ rows }: { rows: UniverseDatum[] }) {
  const [cat, setCat] = useState<CategoryKey | "all">("all");

  const filtered = useMemo(() => (cat === "all" ? rows : rows.filter((r) => r.category === cat)), [rows, cat]);

  const chip = (on: boolean) =>
    `inline-flex touch:min-h-[44px] min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-1.5 text-[12.5px] ${
      on ? "border-teal bg-teal-wash text-teal-deep" : "border-line-strong bg-card text-ink-soft hover:border-teal"
    }`;

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

      <div className="mt-4 hidden md:block overflow-x-auto rounded-xl border border-line-strong">
        <table className="spec-table">
          <caption className="sr-only">
            The full price table — every tracked access route, including routes whose prices could not be verified. Labels: DIRECT read on the provider page; EXCERPT official copy via snapshot; UNCERTAIN not verified.
          </caption>
          <thead>
            <tr>
              <th scope="col">Category</th>
              <th scope="col">Provider</th>
              <th scope="col">Route</th>
              <th scope="col">Price (list)</th>
              <th scope="col">Caveats</th>
              <th scope="col" className="w-24">Evidence</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} id={r.id}>
                <td className="text-ink-mute text-[12px]">{CATEGORY_LABELS[r.category]}</td>
                <th scope="row" className="font-normal font-medium">
                  {r.provider}
                </th>
                <td>
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
                <td className="data text-[12.5px]">
                  {r.listPrice}
                  <span className="block text-[10.5px] font-normal text-ink-mute">read {r.accessed}</span>
                </td>
                <td className="text-ink-mute text-[12px]">{r.caveats.length}</td>
                <td>
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
      </div>

      <ul className="mt-4 space-y-2 md:hidden">
        {filtered.map((r) => (
          // "m-" prefix keeps ids unique against the desktop table's row anchors.
          <li key={r.id} id={`m-${r.id}`} className="card p-3 text-sm">
            <p className="font-medium">
              <a className="u-draw hover:underline" href={`/providers/${providerIdOf(r)}/`} aria-label={`All tracked routes from ${r.provider}`}>
                {r.provider}
              </a>{" "}
              <span className="text-ink-soft">{r.plan}</span>
            </p>
            <p className="data mt-1 text-[13px] text-ink-soft">{r.listPrice}</p>
            <p className="mt-1 text-[11.5px] text-ink-mute">
              {CATEGORY_LABELS[r.category]} · {r.label} · price read {r.accessed}
              {r.caveats.length > 0 ? ` · ${r.caveats[0]}` : ""}
            </p>
            {r.offer && (
              <p className="mt-1">
                <a className="u-draw inline-flex min-h-[40px] items-center rounded-full bg-teal-wash px-3 text-[12px] font-semibold text-teal-deep touch:min-h-[44px]" href={r.offer}>
                  Offer page →
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>

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
