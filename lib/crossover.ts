/**
 * Crossover story — verified figures and shared chart geometry.
 *
 * Every number here is either quoted verbatim from verified content
 * (content/offers/kimi-k3-core.json, the monthly-vs-annual guide) or is
 * first-party arithmetic on the $0.80/task illustrative reference, the same
 * class of arithmetic documented in lib/effectiveCost.ts. Nothing is invented.
 *
 * Sources:
 *  - $39/mo Allegretto monthly, ≈$31/mo effective annual (~$372 upfront),
 *    ≈$96/yr saving ($468 vs $372): content/offers/kimi-k3-core.json
 *    (price, renewal, economics, faq) and app/guides/monthly-vs-annual-ai/.
 *  - $0.80/task PAYG reference (100k-token task), $40 basket / 50-task
 *    break-even: lib/effectiveCost.ts, kimi economics.
 *  - ≈49 tasks/mo monthly break-even ($39 ÷ $0.80), ≈39 annual
 *    (≈$31 ÷ $0.80): kimi economics_rows + economics.
 */

export const PAYG_PER_TASK = 0.8;
export const ALLEGRETTO_MONTHLY = 39;
export const ALLEGRETTO_ANNUAL_EFF = 31;
export const ALLEGRETTO_ANNUAL_UPFRONT = 372;
export const ALLEGRETTO_YEARLY_AT_MONTHLY = 468; // 39 x 12
export const ANNUAL_SAVING = 96; // 468 - 372

/** Exact crossings (displayed rounded with ≈). */
export const CROSS_MONTHLY = ALLEGRETTO_MONTHLY / PAYG_PER_TASK; // 48.75
export const CROSS_ANNUAL = ALLEGRETTO_ANNUAL_EFF / PAYG_PER_TASK; // 38.75

export const DEFAULT_TASKS = 120;
export const TASKS_MIN = 4;
export const TASKS_MAX = 160;
export const TASKS_STEP = 4;

export function paygMonthly(tasks: number): number {
  return tasks * PAYG_PER_TASK;
}

export function fmtMoney(n: number): string {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

/* ── Chart geometry (shared by the static SVG and the client island) ── */

export const CHART = {
  W: 720,
  H: 400,
  M: { top: 18, right: 18, bottom: 46, left: 54 },
  X_MAX: 160, // tasks/mo
  Y_MAX: 140, // $/mo
} as const;

export const X_TICKS = [0, 40, 80, 120, 160];
export const Y_TICKS = [0, 35, 70, 105, 140];

export function xScale(tasks: number): number {
  const { W, M, X_MAX } = CHART;
  return M.left + (Math.max(0, Math.min(tasks, X_MAX)) / X_MAX) * (W - M.left - M.right);
}

export function yScale(cost: number): number {
  const { H, M, Y_MAX } = CHART;
  return H - M.bottom - (Math.max(0, Math.min(cost, Y_MAX)) / Y_MAX) * (H - M.top - M.bottom);
}
