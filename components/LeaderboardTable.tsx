"use client";

import { useMemo, useState } from "react";
import { TOKENS_PER_TASK, USE_CASE_LABELS, type UseCaseKey } from "@/lib/valueScore";
import { CATEGORY_LABELS, CATEGORY_ORDER, type CategoryKey } from "@/lib/universe";
import styles from "./LeaderboardTable.module.css";

export interface LeaderboardDatum {
  id: string;
  provider: string;
  plan: string;
  category: CategoryKey;
  listPrice: string;
  apiIn: number;
  apiOut: number;
  blended: number; // $/M tokens
  batch: number | null; // computed batch $/M, null when no published modifier
  batchApprox: boolean;
  /** Short published cache-read note, when the provider has one. */
  cacheNote: string | null;
  offer: string | null;
  caveats: string[];
  label: "DIRECT" | "EXCERPT" | "UNCERTAIN";
  sourceUrl: string;
  accessed: string;
  intel: { index: number; estimate: boolean; citation: string; sourceUrl: string; accessed: string } | null;
}

type SortKey = "blended" | "intel" | "name";

const PRESETS: UseCaseKey[] = ["chat", "coding", "reasoning", "agentic", "baseline"];

const SORTS: { key: SortKey; label: string }[] = [
  { key: "blended", label: "Blended cost" },
  { key: "intel", label: "AA score" },
  { key: "name", label: "Name" },
];

function fmtPerM(v: number): string {
  if (v < 0.01) return `$${v.toFixed(4)}`;
  if (v < 1) return `$${v.toFixed(3)}`;
  return `$${v.toFixed(2)}`;
}

function fmtTask(v: number): string {
  return v < 0.01 ? `$${v.toFixed(4)}` : `$${v.toFixed(3)}`;
}

const LABEL_STYLES: Record<LeaderboardDatum["label"], string> = {
  DIRECT: "text-teal-deep",
  EXCERPT: "text-ink-soft",
  UNCERTAIN: "text-ink-mute",
};

export default function LeaderboardTable({ rows }: { rows: LeaderboardDatum[] }) {
  const [preset, setPreset] = useState<UseCaseKey>("baseline");
  const [cat, setCat] = useState<CategoryKey | "all">("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "blended", dir: "asc" });

  const filtered = useMemo(
    () => (cat === "all" ? rows : rows.filter((r) => r.category === cat)),
    [rows, cat],
  );

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let d = 0;
      if (sort.key === "blended") d = a.blended - b.blended;
      else if (sort.key === "intel") d = (a.intel?.index ?? -1) - (b.intel?.index ?? -1);
      else d = `${a.provider} ${a.plan}`.localeCompare(`${b.provider} ${b.plan}`);
      return sort.dir === "asc" ? d : -d;
    });
    return copy;
  }, [filtered, sort]);

  const tokens = TOKENS_PER_TASK[preset];

  function toggleSort(key: SortKey) {
    setSort((cur) =>
      cur.key === key
        ? { key, dir: cur.dir === "asc" ? "desc" : "asc" }
        : { key, dir: key === "name" ? "asc" : key === "intel" ? "desc" : "asc" },
    );
  }

  function ariaSortFor(key: SortKey): "ascending" | "descending" | undefined {
    if (sort.key !== key) return undefined;
    return sort.dir === "asc" ? "ascending" : "descending";
  }

  const chip = (on: boolean) =>
    `inline-flex touch:min-h-[44px] min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-1.5 text-[12.5px] transition-colors ${
      on ? "border-teal bg-teal-wash text-teal-deep" : "border-line-strong bg-card text-ink-soft hover:border-teal"
    }`;

  return (
    <div>
      {/* route-type filter — present from the first screen of the table */}
      <div className="flex flex-wrap items-center gap-2">
        <p className="eyebrow mr-1" id="lb-type-label">
          Route type
        </p>
        <div role="group" aria-labelledby="lb-type-label" className="no-scrollbar flex flex-wrap items-center gap-2 overflow-x-auto md:flex-nowrap">
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
      </div>

      {/* sort + task-size presets — one row of controls, all breakpoints */}
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-3">
        <fieldset className="flex flex-wrap items-center gap-2" aria-label="Sort routes">
          <legend className="sr-only">Sort routes</legend>
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
        <fieldset className="no-scrollbar flex flex-wrap items-center gap-2 overflow-x-auto md:flex-nowrap" aria-label="Task size preset (tokens per task)">
          <legend className="sr-only">Task size preset (tokens per task)</legend>
          {PRESETS.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={preset === k}
              onClick={() => setPreset(k)}
              className={chip(preset === k)}
            >
              {USE_CASE_LABELS[k]} <span className="data text-[11px]">{(TOKENS_PER_TASK[k] / 1000).toFixed(0)}k</span>
            </button>
          ))}
        </fieldset>
      </div>

      {/* one table for every breakpoint — stacks into cards below md via CSS */}
      <div className={`${styles.reflow} mt-4 overflow-x-auto rounded-xl border border-line-strong`}>
        <table className="spec-table">
          <caption className="sr-only">
            Token access routes ranked by blended effective cost per million tokens, filterable by route type.
            Intelligence scores are quoted from Artificial Analysis with per-row citations. Batch cost per
            million is shown only where the provider publishes a batch discount; a dash means no published
            batch modifier.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-10">#</th>
              <th scope="col">Route</th>
              <th scope="col">Type</th>
              <th scope="col">List in / out, $/M</th>
              <th scope="col" aria-sort={ariaSortFor("blended")}>Blended $/M</th>
              <th scope="col">Batch $/M</th>
              <th scope="col">Est. $/task @ {USE_CASE_LABELS[preset]}</th>
              <th scope="col" aria-sort={ariaSortFor("intel")}>AA II v4.3</th>
              <th scope="col">Src</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => {
              const perTask = (r.blended * tokens) / 1_000_000;
              const batchTask = r.batch != null ? (r.batch * tokens) / 1_000_000 : null;
              return (
                <tr key={r.id}>
                  <td className="data text-ink-mute">{i + 1}</td>
                  <th scope="row" className="font-normal">
                    <span className="font-medium">{r.provider}</span>{" "}
                    <span className="text-ink-soft">{r.plan}</span>
                    {r.offer && (
                      <>
                        {" "}
                        <a className="u-draw text-[12px] text-teal-deep" href={r.offer}>
                          offer
                        </a>
                      </>
                    )}
                    {r.caveats.length > 0 && (
                      <span className="block text-[11.5px] text-ink-mute">
                        {r.caveats.slice(0, 2).join(" · ")}
                        {r.caveats.length > 2 ? ` · +${r.caveats.length - 2} more` : ""}
                      </span>
                    )}
                    <span className="block text-[11px] text-ink-mute">
                      {CATEGORY_LABELS[r.category]} · {r.caveats.length} caveat{r.caveats.length === 1 ? "" : "s"}
                    </span>
                  </th>
                  <td data-label="List in / out, $/M" className="text-ink-soft">
                    ${r.apiIn.toFixed(2)} / ${r.apiOut.toFixed(2)}
                  </td>
                  <td data-label="Blended $/M" className="num">
                    {fmtPerM(r.blended)}
                    <span className="block text-[11px] text-ink-soft">{fmtTask(perTask)}/task</span>
                    {r.cacheNote && <span className="block text-[11px] text-ink-mute">cache: {r.cacheNote}</span>}
                  </td>
                  <td data-label="Batch $/M" className="num">
                    {r.batch != null && batchTask != null ? (
                      <>
                        {r.batchApprox ? "~" : ""}
                        {fmtPerM(r.batch)}
                        <span className="block text-[11px] text-ink-mute">~{fmtTask(batchTask)}/task</span>
                      </>
                    ) : (
                      <span className="text-ink-mute" title="No published batch discount for this route">
                        —
                      </span>
                    )}
                  </td>
                  <td data-label="AA II v4.3" className="num">
                    {r.intel ? (
                      <a className="u-draw" href={r.intel.sourceUrl} target="_blank" rel="noopener nofollow" title={r.intel.citation}>
                        {r.intel.index}
                        {r.intel.estimate ? "*" : ""}
                      </a>
                    ) : (
                      <span className="text-ink-mute">—</span>
                    )}
                  </td>
                  <td data-label="Source" className={styles.src}>
                    <a className="u-draw text-ink-mute text-[12px]" href={r.sourceUrl} target="_blank" rel="noopener nofollow" aria-label={`Source for ${r.provider} ${r.plan} (${r.label})`}>
                      src
                    </a>
                    <span className={`ml-1 text-[10.5px] ${LABEL_STYLES[r.label]}`}>{r.label}</span>
                    <span className="block text-[10.5px] text-ink-mute">read {r.accessed}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-[12px] text-ink-mute">
        Blended $/M = (3 x input + 1 x output) / 4 at the route&apos;s current published price —
        list, or launch-promo price while a promo runs, with promo-priced rows captioning their
        list-price blend. Our arithmetic, not a provider figure. The $/task column estimates a{" "}
        {tokens.toLocaleString("en-US")}-token task on that blended rate. Batch $/M = blended $/M
        x (1 − the provider&apos;s published batch discount) — −50% halves the blend — with batch
        $/task at the same task size; it appears only where the provider publishes a batch rate,
        and a dash means no published batch modifier, not zero. Cache, off-peak, and residency
        adjustments stay out of both figures and are noted per row. AA Intelligence Index v4.3
        values are quoted, not measured, by us: every cell links its exact source row on
        artificialanalysis.ai (accessed 2026-09-07); * marks AA&apos;s own estimate flag. A dash
        means no public score. Our own weighted ranking is deliberately not shown — see{" "}
        <a className="u-draw" href="/methodology/">
          methodology
        </a>
        .
      </p>
    </div>
  );
}
