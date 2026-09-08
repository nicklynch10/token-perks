"use client";

import { useMemo, useState } from "react";

export interface ParetoDatum {
  id: string;
  label: string;
  provider: string;
  cost: number; // blended $/M tokens; 0 = free (cost floor)
  intelligence: number;
  estimate: boolean;
  citation: string;
  sourceUrl: string;
  /** Date the quoted AA score was accessed — travels with the figure. */
  accessed: string;
  offer: string | null;
  free: boolean;
}

interface Props {
  points: ParetoDatum[];
  frontierIds: string[];
  dominatedBy: Record<string, { id: string; label: string }>;
}

const W = 860;
const H = 460;
const M = { top: 24, right: 28, bottom: 52, left: 62 };
const X_MIN = 0.05;
const X_MAX = 40;
const Y_MAX = 60;
const FLOOR_X = 0.028; // plotted position for free routes (below the log axis start)

function xScale(cost: number): number {
  const v = cost <= 0 ? FLOOR_X : cost;
  const t = (Math.log10(v) - Math.log10(X_MIN)) / (Math.log10(X_MAX) - Math.log10(X_MIN));
  return M.left + t * (W - M.left - M.right);
}

function yScale(intel: number): number {
  return H - M.bottom - (Math.max(0, Math.min(intel, Y_MAX)) / Y_MAX) * (H - M.top - M.bottom);
}

const X_TICKS = [0.1, 0.25, 0.5, 1, 2.5, 5, 10, 25];

export default function ParetoChart({ points, frontierIds, dominatedBy }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  // Roving keyboard index into the cost-ordered point list (-1 = none). The
  // chart container is the ONLY tab stop; arrows move, Enter/Space pins.
  const [kbIndex, setKbIndex] = useState(-1);

  // Keyboard traversal order: cost ascending (left to right on the x-axis).
  const order = useMemo(
    () => [...points].sort((a, b) => a.cost - b.cost || b.intelligence - a.intelligence),
    [points],
  );

  const staircase = useMemo(() => {
    const f = points
      .filter((p) => frontierIds.includes(p.id))
      .sort((a, b) => a.cost - b.cost);
    if (f.length === 0) return "";
    let d = `M ${xScale(0)} ${yScale(f[0].intelligence + 4)}`;
    for (const p of f) {
      d += ` L ${xScale(0)} ${yScale(p.intelligence)} L ${xScale(p.cost)} ${yScale(p.intelligence)}`;
    }
    return d;
  }, [points, frontierIds]);

  const kbActive = kbIndex >= 0 && kbIndex < order.length ? order[kbIndex] : null;
  const selectedId = pinned ?? active ?? kbActive?.id ?? null;
  const selected = points.find((p) => p.id === selectedId) ?? null;

  function onChartKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const last = order.length - 1;
    let next: number | null = null;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = Math.min(kbIndex + 1, last);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = Math.max(kbIndex - 1, -1);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      case "Enter":
      case " ":
        if (kbActive) setPinned((cur) => (cur === kbActive.id ? null : kbActive.id));
        e.preventDefault();
        return;
      case "Escape":
        setPinned(null);
        setKbIndex(-1);
        e.preventDefault();
        return;
      default:
        return;
    }
    e.preventDefault();
    setKbIndex(next);
  }

  function describe(p: ParetoDatum): string {
    const pos = frontierIds.includes(p.id)
      ? "on the frontier"
      : `dominated by ${dominatedBy[p.id]?.label ?? "a frontier point"}`;
    return `${p.label}: ${p.intelligence} intelligence${p.estimate ? " (AA estimate)" : ""}, ${
      p.free ? "free route" : `$${p.cost.toFixed(2)} per million tokens`
    }, ${pos}. ${p.citation}`;
  }

  return (
    <div>
      {/* ONE tab stop: roving-index keyboard navigation over the points */}
      <div
        tabIndex={0}
        role="group"
        aria-label="Cost versus intelligence chart. Use the arrow keys to move between routes, Enter to pin a route, Escape to unpin."
        onKeyDown={onChartKeyDown}
        onFocus={() => {
          if (kbIndex === -1) setKbIndex(0);
        }}
        className="hidden md:block rounded-xl outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-deep"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Scatter of AI access routes: blended effective cost per million tokens (log scale) against the Artificial Analysis Intelligence Index v4.3. The staircase marks the cost-intelligence frontier."
          className="w-full h-auto"
        >
          {/* gridlines + x ticks */}
          {X_TICKS.map((t) => (
            <g key={t}>
              <line x1={xScale(t)} x2={xScale(t)} y1={M.top} y2={H - M.bottom} stroke="var(--color-line)" />
              <text x={xScale(t)} y={H - M.bottom + 18} textAnchor="middle" fontSize="10.5" fill="var(--color-ink-mute)" fontFamily="var(--font-mono)">
                ${t}
              </text>
            </g>
          ))}
          {[10, 20, 30, 40, 50, 60].map((t) => (
            <g key={t}>
              <line x1={M.left} x2={W - M.right} y1={yScale(t)} y2={yScale(t)} stroke="var(--color-line)" />
              <text x={M.left - 8} y={yScale(t) + 3.5} textAnchor="end" fontSize="10.5" fill="var(--color-ink-mute)" fontFamily="var(--font-mono)">
                {t}
              </text>
            </g>
          ))}
          <text x={(W + M.left) / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--color-ink-soft)">
            Blended effective cost, $/M tokens — (3 x in + 1 x out) / 4, published prices
          </text>
          <text x={16} y={(H - M.bottom + M.top) / 2} textAnchor="middle" fontSize="11" fill="var(--color-ink-soft)" transform={`rotate(-90 16 ${(H - M.bottom + M.top) / 2})`}>
            AA Intelligence Index v4.3
          </text>

          {/* frontier staircase */}
          <path d={staircase} fill="none" stroke="var(--color-teal)" strokeWidth="1.75" />

          {/* points — mouse interaction only; keyboard access is the container above */}
          {points.map((p) => {
            const onFrontier = frontierIds.includes(p.id);
            const cx = xScale(p.cost);
            const cy = yScale(p.intelligence);
            const dim = selectedId != null && selectedId !== p.id && !onFrontier;
            const highlighted = selectedId === p.id;
            return (
              <g key={p.id} opacity={dim ? 0.35 : 1}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={onFrontier ? 6 : 4.5}
                  fill={p.free ? "var(--color-card)" : onFrontier ? "var(--color-teal)" : "var(--color-ink-soft)"}
                  stroke={p.free ? "var(--color-ink-mute)" : "var(--color-card)"}
                  strokeWidth={p.free ? 1.5 : 1}
                  strokeDasharray={p.free ? "2 1.5" : undefined}
                />
                {highlighted && (
                  <circle cx={cx} cy={cy} r={10} fill="none" stroke="var(--color-teal-deep)" strokeWidth="1.5" />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={12}
                  fill="transparent"
                  onMouseEnter={() => setActive(p.id)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setPinned((cur) => (cur === p.id ? null : p.id))}
                  style={{ cursor: "pointer" }}
                />
                {onFrontier && (
                  <text x={cx + 9} y={cy + 3.5} fontSize="10" fill="var(--color-ink-soft)" fontFamily="var(--font-mono)">
                    {p.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* screen-reader announcement for keyboard navigation */}
      <p role="status" aria-live="polite" className="sr-only">
        {kbActive ? describe(kbActive) : ""}
      </p>

      {/* hover / pin card (shared by mouse, keyboard, and the mobile list) */}
      {selected && (
        <div className="card mt-3 p-4 text-sm" data-testid="pareto-card">
          <p className="font-medium">
            {selected.label} <span className="text-ink-mute">· {selected.provider}</span>
          </p>
          <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-[13px] sm:grid-cols-4">
            <div>
              <dt className="text-ink-mute">Blended $/M</dt>
              <dd className="data">{selected.free ? "0 (free)" : `$${selected.cost.toFixed(2)}`}</dd>
            </div>
            <div>
              <dt className="text-ink-mute">AA Intelligence v4.3</dt>
              <dd className="data">
                {selected.intelligence}
                {selected.estimate ? " (AA estimate)" : ""}
              </dd>
            </div>
            <div>
              <dt className="text-ink-mute">Position</dt>
              <dd>{frontierIds.includes(selected.id) ? "On the frontier" : `Dominated by ${dominatedBy[selected.id]?.label ?? "a frontier point"}`}</dd>
            </div>
            <div>
              <dt className="text-ink-mute">Tracked offer</dt>
              <dd>{selected.offer ? <a className="u-draw text-teal-deep" href={selected.offer}>View offer</a> : "—"}</dd>
            </div>
          </dl>
          <p className="mt-2 text-[12px] text-ink-mute">
            <a className="u-draw" href={selected.sourceUrl} target="_blank" rel="noopener nofollow">
              {selected.citation}
            </a>
          </p>
        </div>
      )}

      {/* mobile frontier list — the quoted score carries its attribution inline */}
      <ul className="md:hidden space-y-2">
        {points
          .filter((p) => frontierIds.includes(p.id))
          .map((p) => (
            <li key={p.id} className="card p-3 text-sm">
              <p className="font-medium">{p.label}</p>
              <p className="data text-[13px] text-ink-soft">
                {p.free ? "free" : `$${p.cost.toFixed(2)}/M`} ·{" "}
                <a
                  className="u-draw"
                  href={p.sourceUrl}
                  target="_blank"
                  rel="noopener nofollow"
                  title={p.citation}
                >
                  {p.intelligence}
                  {p.estimate ? "*" : ""} II · AA, accessed {p.accessed}
                </a>
              </p>
            </li>
          ))}
      </ul>

      <p className="mt-3 text-[12px] text-ink-mute">
        Staircase marks the cost-intelligence frontier: nothing to its lower right offers more intelligence per dollar.
        Hollow markers are $0 routes (quota-limited, unranked). Data: Artificial Analysis (
        <a className="u-draw" href="https://artificialanalysis.ai" target="_blank" rel="noopener nofollow">
          artificialanalysis.ai
        </a>
        ), Intelligence Index v4.3, accessed 2026-09-07; per-point citations link the exact source. Cost arithmetic is ours.
      </p>
    </div>
  );
}
