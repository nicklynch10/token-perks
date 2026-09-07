"use client";

import { useMemo, useState } from "react";
import { TOKENS_PER_TASK, USE_CASE_LABELS, type UseCaseKey } from "@/lib/valueScore";

export interface LeaderboardDatum {
  id: string;
  provider: string;
  plan: string;
  listPrice: string;
  apiIn: number;
  apiOut: number;
  blended: number; // $/M tokens
  batch: number | null; // computed batch $/M, null when no published modifier
  batchApprox: boolean;
  offer: string | null;
  caveats: string[];
  label: "DIRECT" | "EXCERPT" | "UNCERTAIN";
  sourceUrl: string;
  intel: { index: number; estimate: boolean; citation: string; sourceUrl: string } | null;
}

type SortKey = "blended" | "intel" | "name";

const PRESETS: UseCaseKey[] = ["chat", "coding", "reasoning", "agentic", "baseline"];

function fmtPerM(v: number): string {
  if (v < 0.01) return `$${v.toFixed(4)}`;
  if (v < 1) return `$${v.toFixed(3)}`;
  return `$${v.toFixed(2)}`;
}

const LABEL_STYLES: Record<LeaderboardDatum["label"], string> = {
  DIRECT: "text-teal-deep",
  EXCERPT: "text-ink-soft",
  UNCERTAIN: "text-ink-mute",
};

export default function LeaderboardTable({ rows }: { rows: LeaderboardDatum[] }) {
  const [preset, setPreset] = useState<UseCaseKey>("baseline");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "blended", dir: "asc" });

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      let d = 0;
      if (sort.key === "blended") d = a.blended - b.blended;
      else if (sort.key === "intel") d = (a.intel?.index ?? -1) - (b.intel?.index ?? -1);
      else d = `${a.provider} ${a.plan}`.localeCompare(`${b.provider} ${b.plan}`);
      return sort.dir === "asc" ? d : -d;
    });
    return copy;
  }, [rows, sort]);

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

  function arrowFor(key: SortKey): string {
    if (sort.key !== key) return "";
    return sort.dir === "asc" ? " ▲" : " ▼";
  }

  return (
    <div>
      {/* task-size preset — the ranking column responds to this */}
      <fieldset className="flex flex-wrap items-center gap-2" aria-label="Tokens per task preset">
        <legend className="sr-only">Task size preset (tokens per task)</legend>
        {PRESETS.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={preset === k}
            onClick={() => setPreset(k)}
            className={`rounded-lg border px-3 py-1.5 text-[12.5px] transition-colors ${
              preset === k ? "border-teal bg-teal-wash text-teal-deep" : "border-line-strong bg-card text-ink-soft hover:border-teal"
            }`}
          >
            {USE_CASE_LABELS[k]} <span className="data text-[11px]">{(TOKENS_PER_TASK[k] / 1000).toFixed(0)}k</span>
          </button>
        ))}
      </fieldset>

      {/* desktop table */}
      <div className="mt-4 hidden md:block overflow-x-auto rounded-xl border border-line-strong">
        <table className="spec-table">
          <caption className="sr-only">
            Token access routes ranked by blended effective cost per million tokens. Intelligence scores are quoted from Artificial Analysis with per-row citations. Batch cost per million is shown only where the provider publishes a batch discount; a dash means no published batch modifier.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-10">#</th>
              <th scope="col">
                <button type="button" onClick={() => toggleSort("name")} className="uppercase tracking-wider" aria-label="Sort by route name">
                  Route{arrowFor("name")}
                </button>
              </th>
              <th scope="col" className="num">List in / out, $/M</th>
              <th scope="col" className="num" aria-sort={ariaSortFor("blended")}>
                <button type="button" onClick={() => toggleSort("blended")} aria-label="Sort by blended cost per million tokens">
                  Blended $/M{arrowFor("blended")}
                </button>
              </th>
              <th scope="col" className="num">Batch $/M</th>
              <th scope="col" className="num">Est. $/task @ {USE_CASE_LABELS[preset]}</th>
              <th scope="col" className="num" aria-sort={ariaSortFor("intel")}>
                <button type="button" onClick={() => toggleSort("intel")} aria-label="Sort by Artificial Analysis Intelligence Index">
                  AA II v4.3{arrowFor("intel")}
                </button>
              </th>
              <th scope="col">Caveats</th>
              <th scope="col" className="w-14">Src</th>
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
                  </th>
                  <td className="num text-ink-soft">
                    ${r.apiIn.toFixed(2)} / ${r.apiOut.toFixed(2)}
                  </td>
                  <td className="num">{fmtPerM(r.blended)}</td>
                  <td className="num">
                    {r.batch != null && batchTask != null ? (
                      <>
                        {r.batchApprox ? "~" : ""}
                        {fmtPerM(r.batch)}
                        <span className="block text-[11px] text-ink-mute">
                          ~{batchTask < 0.01 ? `$${batchTask.toFixed(4)}` : `$${batchTask.toFixed(3)}`}/task
                        </span>
                      </>
                    ) : (
                      <span className="text-ink-mute" title="No published batch discount for this route">
                        —
                      </span>
                    )}
                  </td>
                  <td className="num text-ink-soft">
                    {perTask < 0.01 ? `$${perTask.toFixed(4)}` : `$${perTask.toFixed(3)}`}
                  </td>
                  <td className="num">
                    {r.intel ? (
                      <a className="u-draw" href={r.intel.sourceUrl} target="_blank" rel="noopener nofollow" title={r.intel.citation}>
                        {r.intel.index}
                        {r.intel.estimate ? "*" : ""}
                      </a>
                    ) : (
                      <span className="text-ink-mute">—</span>
                    )}
                  </td>
                  <td className="text-ink-mute text-[12px]">{r.caveats.length}</td>
                  <td>
                    <a className="u-draw text-ink-mute text-[12px]" href={r.sourceUrl} target="_blank" rel="noopener nofollow" aria-label={`Source for ${r.provider} ${r.plan} (${r.label})`}>
                      src
                    </a>
                    <span className={`ml-1 text-[10.5px] ${LABEL_STYLES[r.label]}`}>{r.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* mobile cards */}
      <ul className="mt-4 space-y-2 md:hidden">
        {sorted.map((r, i) => {
          const perTask = (r.blended * tokens) / 1_000_000;
          const batchTask = r.batch != null ? (r.batch * tokens) / 1_000_000 : null;
          return (
            <li key={r.id} className="card p-3 text-sm">
              <p className="font-medium">
                {i + 1}. {r.provider} <span className="text-ink-soft">{r.plan}</span>
              </p>
              <p className="data mt-1 text-[13px] text-ink-soft">
                {fmtPerM(r.blended)}/M · ~{perTask < 0.01 ? `$${perTask.toFixed(4)}` : `$${perTask.toFixed(3)}`}/task
                {r.intel ? ` · ${r.intel.index} II` : ""}
              </p>
              {r.batch != null && batchTask != null ? (
                <p className="data mt-1 text-[13px] text-ink-soft">
                  Batch {r.batchApprox ? "~" : ""}
                  {fmtPerM(r.batch)}/M · ~
                  {batchTask < 0.01 ? `$${batchTask.toFixed(4)}` : `$${batchTask.toFixed(3)}`}/task
                </p>
              ) : (
                <p className="mt-1 text-[11.5px] text-ink-mute">Batch price: not published</p>
              )}
              {r.caveats.length > 0 && <p className="mt-1 text-[11.5px] text-ink-mute">{r.caveats[0]}</p>}
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-[12px] text-ink-mute">
        Blended $/M = (3 x input + 1 x output) / 4 at list price — our arithmetic, not a provider figure. The $/task
        column estimates a {tokens.toLocaleString("en-US")}-token task on that blended rate. Batch $/M = blended $/M
        x (1 − the provider&apos;s published batch discount) — −50% halves the blend — with batch $/task at the same
        task size; it appears only where the provider publishes a batch rate, and a dash means no published batch
        modifier, not zero. Cache, off-peak, and residency adjustments stay out of both figures. AA Intelligence Index
        v4.3 values are quoted, not measured, by us: every cell links its exact source row on artificialanalysis.ai
        (accessed 2026-09-07); * marks AA&apos;s own estimate flag. A dash means no public score. Our own weighted
        ranking is deliberately not shown — see{" "}
        <a className="u-draw" href="/methodology/">
          methodology
        </a>
        .
      </p>
    </div>
  );
}
