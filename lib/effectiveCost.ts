/**
 * Effective-cost math. All figures are illustrative estimates, not guarantees.
 * Reference model: a $40/mo subscription vs pay-as-you-go billed per task.
 */

export const COMPARE_SUB_PRICE = 40; // $/mo flat reference subscription
export const BLENDED_PER_MTOK = 8; // $ per 1M tokens, illustrative blended in+out
export const BASELINE_TOKENS_PER_TASK = 100_000; // baseline that yields $0.80/task
export const BASELINE_PAYG_PER_TASK = 0.8; // $/task at baseline

/**
 * Shared rounding footnote: the $40 figure is an illustrative reference
 * basket vs pay-as-you-go, while $39 is the actual Kimi Allegretto tier —
 * so break-even reads ~50 tasks/mo on the basket, ~49 on Allegretto.
 */
export const REFERENCE_BASKET_NOTE =
  "$40 is the illustrative reference basket vs pay-as-you-go; $39 is the actual Kimi Allegretto tier — break-even is ~50 tasks/mo on the basket, ~49 on Allegretto.";

export function paygPerTask(
  tokensPerTask: number,
  blendedPerM: number = BLENDED_PER_MTOK,
): number {
  const t = Number.isFinite(tokensPerTask) ? Math.max(0, tokensPerTask) : 0;
  return (t / 1_000_000) * blendedPerM;
}

/** Tasks/mo at which a flat subscription breaks even vs PAYG. */
export function breakEvenTasks(
  subPrice: number,
  perTaskCost: number,
): number {
  if (!Number.isFinite(subPrice) || subPrice <= 0) return Number.NaN;
  if (!Number.isFinite(perTaskCost) || perTaskCost <= 0) return Infinity;
  return subPrice / perTaskCost;
}

export type RouteId = "payg" | "sub";

export interface RouteComparison {
  perTask: number;
  paygMonthly: number;
  subMonthly: number;
  crossover: number;
  cheapest: RouteId;
  savings: number;
}

export function cheapestRoute(
  tasks: number,
  tokensPerTask: number,
  subPrice: number = COMPARE_SUB_PRICE,
): RouteComparison {
  const t = Number.isFinite(tasks) ? Math.max(0, Math.round(tasks)) : 0;
  const perTask = paygPerTask(tokensPerTask);
  const paygMonthly = t * perTask;
  const crossover = breakEvenTasks(subPrice, perTask);
  const cheapest: RouteId = paygMonthly <= subPrice ? "payg" : "sub";
  const savings = Math.abs(paygMonthly - subPrice);
  return {
    perTask,
    paygMonthly,
    subMonthly: subPrice,
    crossover,
    cheapest,
    savings,
  };
}

export function fmtUSD(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}

export function fmtTasks(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === Infinity) return "never (at these inputs)";
  return `${Math.round(n).toLocaleString("en-US")} tasks/mo`;
}

/**
 * Hero bar trio: effective cost per task for the three tracked routes,
 * rendered to scale against BASELINE_PAYG_PER_TASK (the full-width bar).
 * Kimi figure = Allegretto $39/mo ÷ 120 tasks (matches the offer page);
 * both free routes are $0.00 while their windows last.
 */
export const HERO_ROUTE_BARS = [
  {
    id: "kimi-k3-core",
    label: "Kimi K3 (Allegretto)",
    perTask: 39 / 120,
    display: "$0.33",
    paid: true,
  },
  {
    id: "muse-spark-zen-free",
    label: "Zen Muse Spark promo",
    perTask: 0,
    display: "$0.00",
    paid: false,
  },
  {
    id: "nvidia-k3-free",
    label: "NVIDIA K3 (dev)",
    perTask: 0,
    display: "$0.00",
    paid: false,
  },
] as const;
