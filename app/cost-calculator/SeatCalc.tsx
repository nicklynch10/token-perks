"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TEAM_SEAT_SKUS,
  seatBreaksBullets,
  seatRate,
  skuById,
  type TeamSeatSku,
} from "@/app/cost-calculator/team-seats";
import { fmtUSD } from "@/lib/effectiveCost";

/**
 * Seat mode: pick a tracked Team/seat SKU, set headcount, see the monthly
 * total and what the row's own terms say happens as seats fill. Every figure
 * is mirrored from a dated universe row (see team-seats.ts) — rows without a
 * published per-seat dollar render "not published" instead of a number.
 *
 * URL-shareable via ?tsku= & ?theads= & ?tbilling= (deliberately distinct
 * from the break-even panel's ?seats=), adopted post-hydration so the static
 * prerender stays deterministic.
 */

const HEADCOUNT_MIN = 1;
const HEADCOUNT_MAX = 500;

function clampHeads(n: number): number {
  if (!Number.isFinite(n)) return 3;
  return Math.min(HEADCOUNT_MAX, Math.max(HEADCOUNT_MIN, Math.round(n)));
}

function Inner({ defaultSkuId }: { defaultSkuId?: string }) {
  const pathname = usePathname();
  const initial = skuById(defaultSkuId) ?? TEAM_SEAT_SKUS[0];
  const [skuId, setSkuId] = useState<string>(initial.id);
  const [headcount, setHeadcount] = useState(3);
  const [billing, setBilling] = useState<"annual" | "monthly">("annual");

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const s = sp.get("tsku");
    const h = Number(sp.get("theads"));
    const b = sp.get("tbilling");
    // Intentional post-hydration adoption of URL params: initializing state
    // from window.location would mismatch the static prerender.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (skuById(s)) setSkuId(s as string);
    if (h) setHeadcount(clampHeads(h));
    if (b === "monthly" || b === "annual") setBilling(b);
  }, []);

  const sku = skuById(skuId) ?? TEAM_SEAT_SKUS[0];
  const hasBillingChoice = sku.perSeatMonthly != null && sku.perSeatMonthlyAlt != null;

  function syncUrl(patch: Record<string, string>) {
    const next = new URLSearchParams(window.location.search);
    for (const [k, v] of Object.entries(patch)) next.set(k, v);
    window.history.replaceState(null, "", `${pathname}?${next.toString()}`);
  }

  function pick(id: string) {
    setSkuId(id);
    syncUrl({ tsku: id });
  }
  function setHeads(n: number) {
    const v = clampHeads(n);
    setHeadcount(v);
    syncUrl({ theads: String(v) });
  }
  function setTerm(b: "annual" | "monthly") {
    setBilling(b);
    syncUrl({ tbilling: b });
  }

  const perSeat = seatRate(sku, billing);
  const monthly = useMemo(
    () => (perSeat == null ? null : (sku.baseFee ?? 0) + perSeat * headcount),
    [perSeat, sku.baseFee, headcount],
  );

  return (
    <div className="rounded-xl border border-line-strong bg-card p-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="seat-sku" className="block text-sm font-semibold">
            Team/seat SKU
          </label>
          <select
            id="seat-sku"
            value={skuId}
            onChange={(e) => pick(e.target.value)}
            className="mt-2 min-h-[44px] w-full rounded-lg border border-line-strong bg-paper px-3 py-2 text-sm"
          >
            {TEAM_SEAT_SKUS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.provider} — {s.plan}
              </option>
            ))}
          </select>
          <p className="mt-2 text-[11px] leading-snug text-ink-mute">
            {sku.listPrice} · {sku.unit} · verified {sku.accessed} ({sku.label})
          </p>
        </div>
        <div>
          <label htmlFor="seat-heads" className="flex justify-between text-sm font-semibold">
            <span>Headcount (seats)</span>
            <span className="data">{headcount}</span>
          </label>
          <input
            id="seat-heads"
            type="number"
            inputMode="numeric"
            min={HEADCOUNT_MIN}
            max={HEADCOUNT_MAX}
            step={1}
            value={headcount}
            onChange={(e) => setHeads(Number(e.target.value))}
            className="data mt-2 min-h-[44px] w-full rounded-lg border border-line-strong bg-paper px-3 py-2 text-sm"
          />
          <input
            id="seat-heads-range"
            aria-label="Headcount slider"
            type="range"
            min={HEADCOUNT_MIN}
            max={150}
            step={1}
            value={Math.min(150, headcount)}
            onChange={(e) => setHeads(Number(e.target.value))}
            className="mt-1 min-h-[44px] w-full accent-teal"
          />
        </div>
      </div>

      {hasBillingChoice && (
        <fieldset className="mt-4">
          <legend className="text-sm font-semibold">Billing term (rates differ per row)</legend>
          <div className="mt-1.5 flex gap-2">
            {(["annual", "monthly"] as const).map((b) => {
              const rate = seatRate(sku, b);
              return (
                <button
                  key={b}
                  type="button"
                  aria-pressed={billing === b}
                  onClick={() => setTerm(b)}
                  className={`min-h-[44px] rounded-lg border px-3 text-sm ${
                    billing === b
                      ? "border-teal bg-teal-wash font-semibold text-teal-deep"
                      : "border-line-strong text-ink-soft hover:border-ink-mute"
                  }`}
                >
                  {b === "annual" ? "Annual rate" : "Monthly rate"}
                  {rate != null && ` ($${rate})`}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="mt-5 rounded-lg bg-paper-deep p-4" aria-live="polite">
        <p className="eyebrow">
          {sku.provider} {sku.plan} · {headcount} seat{headcount === 1 ? "" : "s"}
          {hasBillingChoice ? ` · ${billing} rate` : ""}
        </p>
        {monthly != null ? (
          <>
            <p className="data mt-1.5 text-xl font-semibold">
              {fmtUSD(monthly)}/mo total{" "}
              <span className="text-sm font-normal text-ink-soft">
                = {sku.baseFee != null ? `$${sku.baseFee} base + ` : ""}
                {fmtUSD(perSeat as number)}/seat × {headcount}
              </span>
            </p>
            <p className="data mt-1 text-sm text-ink-soft">
              Per seat {fmtUSD(perSeat as number)}/mo
              {sku.baseFee != null && " plus a fixed base fee"} · 12 months at this rate:{" "}
              {fmtUSD(monthly * 12)}
            </p>
          </>
        ) : (
          <p className="data mt-1.5 text-xl font-semibold">
            Per-seat price: not published — no total to compute
          </p>
        )}
        <p className="data mt-2 text-[11px] leading-snug text-ink-mute">
          Total is list-price multiplication of the row&apos;s verified rate (ours, not a provider
          quote). Source:{" "}
          <a
            href={sku.sourceUrl}
            className="u-draw text-teal-deep"
            target="_blank"
            rel="noopener noreferrer"
          >
            {sku.sourceUrl.replace(/^https?:\/\//, "").slice(0, 48)}
          </a>{" "}
          ({sku.label}, accessed {sku.accessed}).
        </p>
      </div>

      <div className="mt-5">
        <p className="eyebrow">What breaks when seats fill</p>
        <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-ink-soft">
          {seatBreaksBullets(sku, headcount).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <p className="mt-2 text-[11px] leading-snug text-ink-mute">Row notes, quoted: {sku.notes}</p>
      </div>

      {sku.mixNote && (
        <p className="mt-3 text-sm text-ink-soft">
          Mixing seat classes on one team is stated for this plan. The worked mixed-seat math (2
          Standard + 1 Premium) is in{" "}
          <Link href="/guides/ai-seats-for-teams/" className="u-draw text-teal-deep">
            AI seats for teams
          </Link>
          .
        </p>
      )}

      <p className="mt-3 text-[11px] leading-snug text-ink-mute">
        Single-user consumer tiers stay listed on the{" "}
        <Link href="/best/" className="u-draw text-teal-deep">
          offers
        </Link>{" "}
        side; only seat-priced rows are selectable here. ChatGPT Business is listed with its
        structure only because its per-seat dollar is not published.
      </p>
    </div>
  );
}

export default function SeatCalc(props: { defaultSkuId?: string }) {
  return <Inner {...props} />;
}

/** Exported for typing convenience in the server page. */
export type { TeamSeatSku };
