"use client";

import { useMemo, useState } from "react";
import { CATEGORY_LABELS, CATEGORY_ORDER, type CategoryKey } from "@/lib/universe";

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

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by access-route category">
        <button
          type="button"
          aria-pressed={cat === "all"}
          onClick={() => setCat("all")}
          className={`rounded-lg border px-3 py-1.5 text-[12.5px] ${
            cat === "all" ? "border-teal bg-teal-wash text-teal-deep" : "border-line-strong bg-card text-ink-soft hover:border-teal"
          }`}
        >
          All <span className="data text-[11px]">{rows.length}</span>
        </button>
        {CATEGORY_ORDER.map((k) => {
          const n = rows.filter((r) => r.category === k).length;
          return (
            <button
              key={k}
              type="button"
              aria-pressed={cat === k}
              onClick={() => setCat(k)}
              className={`rounded-lg border px-3 py-1.5 text-[12.5px] ${
                cat === k ? "border-teal bg-teal-wash text-teal-deep" : "border-line-strong bg-card text-ink-soft hover:border-teal"
              }`}
            >
              {CATEGORY_LABELS[k]} <span className="data text-[11px]">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 hidden md:block overflow-x-auto rounded-xl border border-line-strong">
        <table className="spec-table">
          <caption className="sr-only">
            The full universe of tracked access routes, including routes whose prices could not be verified. Labels: DIRECT read on the provider page; EXCERPT official copy via snapshot; UNCERTAIN not verified.
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
              <tr key={r.id}>
                <td className="text-ink-mute text-[12px]">{CATEGORY_LABELS[r.category]}</td>
                <th scope="row" className="font-normal font-medium">
                  {r.provider}
                </th>
                <td>
                  <span className="text-ink-soft">{r.plan}</span>
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
                <td className="data text-[12.5px]">{r.listPrice}</td>
                <td className="text-ink-mute text-[12px]">{r.caveats.length}</td>
                <td>
                  <a className="u-draw text-ink-mute text-[12px]" href={r.sourceUrl} target="_blank" rel="noopener nofollow" aria-label={`Source for ${r.provider} ${r.plan} (${r.label})`}>
                    src
                  </a>
                  <span className={`ml-1 text-[10.5px] ${LABEL_STYLES[r.label]}`}>{r.label}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-4 space-y-2 md:hidden">
        {filtered.map((r) => (
          <li key={r.id} className="card p-3 text-sm">
            <p className="font-medium">
              {r.provider} <span className="text-ink-soft">{r.plan}</span>
            </p>
            <p className="data mt-1 text-[13px] text-ink-soft">{r.listPrice}</p>
            <p className="mt-1 text-[11.5px] text-ink-mute">
              {CATEGORY_LABELS[r.category]} · {r.label}
              {r.caveats.length > 0 ? ` · ${r.caveats[0]}` : ""}
            </p>
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
