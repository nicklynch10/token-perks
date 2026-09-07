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

/* ------------------------------------------------------------------ */
/* Team-size math (v2.1). Tasks/tokens are team totals; per-seat plans  */
/* multiply by seats. List prices mirror the verified universe rows    */
/* (snapshot 2026-09-07); single-user consumer tiers are excluded, so  */
/* the recommendation is the cheapest multi-seat-compliant setup.      */
/* ------------------------------------------------------------------ */

export interface SeatPlan {
  id: string;
  name: string;
  /** List price per granted seat, monthly billing, USD. */
  perSeatMonthly: number;
  note: string;
  /** Universe row id this price mirrors (traceability). */
  rowId: string;
}

export const MAX_SEATS = 50;

export const TEAM_SEAT_PLANS: SeatPlan[] = [
  {
    id: "copilot-business",
    name: "Copilot Business",
    perSeatMonthly: 19,
    note: "1,900 AI credits per user/mo included",
    rowId: "github--tool--copilot-business",
  },
  {
    id: "claude-team-standard",
    name: "Claude Team Standard",
    perSeatMonthly: 25,
    note: "Monthly rate ($20 annual)",
    rowId: "anthropic--sub--team-standard",
  },
  {
    id: "copilot-enterprise",
    name: "Copilot Enterprise",
    perSeatMonthly: 39,
    note: "3,900 AI credits per user/mo included",
    rowId: "github--tool--copilot-enterprise",
  },
  {
    id: "reference-flat",
    name: "Reference flat",
    perSeatMonthly: COMPARE_SUB_PRICE,
    note: "Illustrative reference, not a sold plan",
    rowId: "",
  },
  {
    id: "cursor-teams-standard",
    name: "Cursor Teams Standard",
    perSeatMonthly: 40,
    note: "Standard Agent limits",
    rowId: "cursor--tool--teams",
  },
  {
    id: "cursor-teams-premium",
    name: "Cursor Teams Premium",
    perSeatMonthly: 120,
    note: "5x Standard Agent limits",
    rowId: "cursor--tool--teams",
  },
  {
    id: "claude-team-premium",
    name: "Claude Team Premium",
    perSeatMonthly: 125,
    note: "Monthly rate ($100 annual)",
    rowId: "anthropic--sub--team-premium",
  },
];

export interface TeamOption {
  kind: "payg" | "plan";
  id: string | null;
  name: string;
  perSeat: number | null;
  monthly: number;
  note: string;
}

export interface TeamComparison {
  seats: number;
  teamTasks: number;
  perTask: number;
  paygMonthly: number;
  /** Every candidate, cheapest first. */
  options: TeamOption[];
  cheapest: TeamOption;
}

export function clampSeats(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.min(MAX_SEATS, Math.max(1, Math.round(n)));
}

/** Cheapest compliant team setup: team PAYG total vs each seat plan x seats. */
export function compareTeamOptions(
  teamTasks: number,
  tokensPerTask: number,
  seats: number,
): TeamComparison {
  const s = clampSeats(seats);
  const t = Number.isFinite(teamTasks) ? Math.max(0, Math.round(teamTasks)) : 0;
  const perTask = paygPerTask(tokensPerTask);
  const paygMonthly = t * perTask;
  const options: TeamOption[] = [
    {
      kind: "payg" as const,
      id: null,
      name: "Pay-as-you-go",
      perSeat: null,
      monthly: paygMonthly,
      note: "Metered at the reference per-task rate",
    },
    ...TEAM_SEAT_PLANS.map((p) => ({
      kind: "plan" as const,
      id: p.id,
      name: p.name,
      perSeat: p.perSeatMonthly,
      monthly: p.perSeatMonthly * s,
      note: p.note,
    })),
  ].sort((a, b) => a.monthly - b.monthly);
  return { seats: s, teamTasks: t, perTask, paygMonthly, options, cheapest: options[0] };
}
