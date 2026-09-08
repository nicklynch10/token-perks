/**
 * Team/seat SKU catalog — derived exclusively from verified rows in
 * content/leaderboard/universe.json (the 129-row snapshot). Every number is
 * either a row's `priceMonthly` or a figure parsed verbatim out of the row's
 * `listPrice` string; if the regex misses, the field stays null and the UI
 * renders "not published" — never a guess. Consumers: the seat mode on
 * /cost-calculator/, the "For teams" table on /best/, and
 * /guides/ai-seats-for-teams/. All fields are plain data (client-safe).
 */

import { UNIVERSE, providerIdOf, type UniverseRow } from "@/lib/universe";

export interface TeamSeatSku {
  /** Stable catalog id (used in URLs: ?tsku=). */
  id: string;
  /** Universe row this SKU mirrors — the traceability anchor. */
  rowId: string;
  provider: string;
  providerSlug: string;
  plan: string;
  /** Verified list-price string, quoted exactly as the row carries it. */
  listPrice: string;
  /** Verified per-seat rate (row `priceMonthly`; annual-billed where the row bills annually). */
  perSeatMonthly: number | null;
  /** Monthly-billed rate parsed from "($X monthly)" wording, when the row publishes one. */
  perSeatMonthlyAlt: number | null;
  /** Fixed base fee independent of headcount (e.g. Devin "Teams $80 + $40/seat/mo"). */
  baseFee: number | null;
  seatsMin: number | null;
  seatsMax: number | null;
  /** Row's billing-unit wording, e.g. "per seat/month". */
  unit: string;
  /** True when usage bills on top of the seat fee ("per-seat + usage" structure). */
  seatPlusUsage: boolean;
  caveats: string[];
  notes: string;
  /** Overage rate quoted from the row, its exact "not published" string, or null when absent. */
  overageRate: string | null;
  /** Included-usage phrasing parsed from notes (e.g. Copilot's credits line), when present. */
  includedUsage: string | null;
  /** Mix-and-match note (Claude Team rows state it; null otherwise). */
  mixNote: string | null;
  accessed: string;
  sourceUrl: string;
  label: UniverseRow["label"];
}

function rowById(id: string): UniverseRow {
  const r = UNIVERSE.rows.find((x) => x.id === id);
  if (!r) {
    // Build-time guard: catalog ids must exist in the verified universe.
    throw new Error(`team-seats: universe row missing for "${id}" — re-point the catalog`);
  }
  return r;
}

/** "$20/seat/mo annual ($25 monthly)" -> 25; returns null when no monthly figure is stated. */
function monthlyAltFrom(s: string): number | null {
  const m = s.match(/\(\$([\d,]+(?:\.\d+)?)\s*(?:\/(?:seat|user)\/mo)?\s*monthly\)/i);
  if (!m) return null;
  return parseFloat(m[1].replace(/,/g, ""));
}

/** "Teams $80 + $40/seat/mo" -> { base: 80, perSeat: 40 }; nulls when the pattern is absent. */
function basePlusSeatFrom(s: string): { base: number | null; perSeat: number | null } {
  const m = s.match(/Teams \$([\d,]+(?:\.\d+)?)\s*\+\s*\$([\d,]+(?:\.\d+)?)\/seat\/mo/i);
  if (!m) return { base: null, perSeat: null };
  return {
    base: parseFloat(m[1].replace(/,/g, "")),
    perSeat: parseFloat(m[2].replace(/,/g, "")),
  };
}

/** "...; $120/user/mo (Premium)" -> 120. */
function premiumUserMoFrom(s: string): number | null {
  const m = s.match(/\$([\d,]+(?:\.\d+)?)\/user\/mo\s*\(Premium\)/i);
  return m ? parseFloat(m[1].replace(/,/g, "")) : null;
}

/** "More usage than Pro; Claude Code included; 2-150 seats." -> { min: 2, max: 150 }. */
function seatRangeFrom(s: string): { min: number | null; max: number | null } {
  const m = s.match(/(\d+)\s*[–-]\s*(\d+)\s+seats/i);
  return m ? { min: Number(m[1]), max: Number(m[2]) } : { min: null, max: null };
}

/** "Includes 1,900 AI credits per user per month (…)" -> "1,900 AI credits per user per month". */
function includedUsageFrom(s: string): string | null {
  const m = s.match(/(\d[\d,]*\s+AI credits per user per month|\d[\d,]*\s*credits[^;.]*)/i);
  return m ? m[1].trim() : null;
}

/** "…mix-and-match with Standard seats." -> that clause; null when absent. */
function mixNoteFrom(s: string): string | null {
  const m = s.match(/mix-and-match with [^;]+/i);
  return m ? m[0] : null;
}

function build(rowId: string, over?: Partial<TeamSeatSku> & { perSeatMonthlyOverride?: number | null }): TeamSeatSku {
  const r = rowById(rowId);
  const range = seatRangeFrom(r.notes);
  const devin = basePlusSeatFrom(r.listPrice);
  return {
    id: over?.id ?? rowId,
    rowId: r.id,
    provider: r.provider,
    providerSlug: providerIdOf(r),
    plan: r.plan,
    listPrice: r.listPrice,
    perSeatMonthly:
      over?.perSeatMonthlyOverride !== undefined
        ? over.perSeatMonthlyOverride
        : r.priceMonthly,
    perSeatMonthlyAlt: monthlyAltFrom(r.listPrice),
    // Devin-style "base + per-seat" structures only parse on their ladder rows.
    baseFee: over?.baseFee !== undefined ? over.baseFee : (devin.base ?? null),
    seatsMin: over?.seatsMin !== undefined ? over.seatsMin : range.min,
    seatsMax: over?.seatsMax !== undefined ? over.seatsMax : range.max,
    unit: r.unit,
    seatPlusUsage: over?.seatPlusUsage ?? /\+\s*usage/i.test(r.listPrice),
    caveats: [...r.caveats],
    notes: r.notes,
    overageRate: r.overage?.rate ?? null,
    includedUsage: includedUsageFrom(r.notes),
    mixNote: mixNoteFrom(r.notes),
    accessed: r.accessed,
    sourceUrl: r.sourceUrl,
    label: r.label,
  };
}

/**
 * The tracked seat SKUs. Only rows whose unit is seat/user based, or that
 * state a "+ $X/seat" structure, belong here; single-user consumer tiers are
 * excluded (same rule the break-even team view already uses).
 */
export const TEAM_SEAT_SKUS: TeamSeatSku[] = [
  build("github--tool--copilot-business", { id: "copilot-business" }),
  build("anthropic--sub--team-standard", { id: "claude-team-standard" }),
  build("mistral--sub--vibe-team", { id: "mistral-vibe-team" }),
  build("anthropic--sub--enterprise", { id: "claude-enterprise" }),
  build("cursor--tool--teams", { id: "cursor-teams-standard" }),
  build("cursor--tool--teams", {
    id: "cursor-teams-premium",
    // The $120/user/mo (Premium) figure rides in the row's listPrice string.
    perSeatMonthlyOverride: premiumUserMoFrom(rowById("cursor--tool--teams").listPrice),
  }),
  build("anthropic--sub--team-premium", { id: "claude-team-premium" }),
  build("github--tool--copilot-enterprise", { id: "copilot-enterprise" }),
  build("devin--tool--devin-pricing", {
    id: "devin-teams",
    // Ladder row: unit is "per month" and priceMonthly is null; the Teams
    // entry ($80 + $40/seat/mo) is parsed from its listPrice verbatim.
    perSeatMonthlyOverride: basePlusSeatFrom(rowById("devin--tool--devin-pricing").listPrice).perSeat,
  }),
  build("openai--sub--chatgpt-business", { id: "chatgpt-business" }),
];

export function skuById(id: string | null | undefined): TeamSeatSku | undefined {
  if (!id) return undefined;
  return TEAM_SEAT_SKUS.find((s) => s.id === id);
}

/** Effective per-seat rate for the chosen billing term (falls back to the verified rate). */
export function seatRate(sku: TeamSeatSku, billing: "annual" | "monthly"): number | null {
  if (billing === "monthly" && sku.perSeatMonthlyAlt != null) return sku.perSeatMonthlyAlt;
  return sku.perSeatMonthly;
}

/** Headcount-aware list of "what breaks when seats fill", composed only from row fields. */
export function seatBreaksBullets(sku: TeamSeatSku, headcount: number): string[] {
  const out: string[] = [];
  if (sku.seatsMin != null && headcount < sku.seatsMin) {
    out.push(
      `Below the row's published seat range (${sku.seatsMin}${sku.seatsMax != null ? `–${sku.seatsMax}` : "+"} seats): ${headcount} seat${headcount === 1 ? "" : "s"} is outside what this plan states it sells.`,
    );
  }
  if (sku.seatsMax != null && headcount > sku.seatsMax) {
    out.push(
      `Above the row's published seat range (${sku.seatsMin ?? 1}–${sku.seatsMax} seats): this row stops at ${sku.seatsMax}; larger orgs aren't addressed by its terms.`,
    );
  }
  out.push(...sku.caveats);
  if (sku.baseFee != null && sku.perSeatMonthly != null) {
    const flat = (sku.baseFee / (sku.baseFee + sku.perSeatMonthly * Math.max(1, headcount))) * 100;
    out.push(
      `Base fee of $${sku.baseFee}/mo applies at any headcount — ${flat.toFixed(0)}% of the total at ${headcount} seat${headcount === 1 ? "" : "s"}, so small teams pay more per seat.`,
    );
  }
  if (sku.seatPlusUsage) {
    out.push("Seat fee excludes usage: overage terms on the row mean the bill scales with spend, by design.");
  }
  if (sku.includedUsage) {
    out.push(`Included usage is granted per user (${sku.includedUsage}) — it is stated per seat, not as a team pool.`);
  }
  if (sku.overageRate != null) {
    out.push(
      sku.overageRate === "not published"
        ? "Overage rate: not published (checked the row's source; no figure stated)."
        : `Overage term quoted on the row: ${sku.overageRate}.`,
    );
  }
  if (sku.mixNote) out.push(`${sku.mixNote} — seat classes can be combined on one team.`);
  if (sku.perSeatMonthly == null) {
    out.push("No public per-seat dollar figure on this row — a monthly total can't be computed from verified data.");
  }
  return out;
}
