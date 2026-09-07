/**
 * Token Perks Value Score (TPVS) — OUR derived score, clearly not an objective
 * measure. FORMULA SHIPS IN CODE; the column is UI-gated pending written
 * consent from Artificial Analysis before merged (intelligence x cost) rankings
 * are rendered (docs/research/aa-benchmark-scores.md 2.5). Cost-side ranking
 * and the AA reference-score column ship without it.
 *
 *   TPVS = I x (C_ref / C_eff)^alpha
 *
 * I      = AA Intelligence Index (cited per-datum)
 * C_eff  = effective cost per task at the active tokens-per-task preset
 * C_ref  = median effective cost of the ranked set (ordering-invariant)
 * alpha  = weighting preset: Performance 0.15, Balanced 0.5, Budget 1.0
 */

export type UseCaseKey = "chat" | "coding" | "reasoning" | "agentic" | "baseline";

export const TOKENS_PER_TASK: Record<UseCaseKey, number> = {
  chat: 12_000,
  coding: 60_000,
  reasoning: 120_000,
  agentic: 200_000,
  baseline: 100_000,
};

export const USE_CASE_LABELS: Record<UseCaseKey, string> = {
  chat: "Chat",
  coding: "Coding",
  reasoning: "Reasoning",
  agentic: "Agentic",
  baseline: "Baseline 100k",
};

export type AlphaKey = "performance" | "balanced" | "budget";

export const ALPHA_PRESETS: Record<AlphaKey, number> = {
  performance: 0.15,
  balanced: 0.5,
  budget: 1.0,
};

export const ALPHA_LABELS: Record<AlphaKey, string> = {
  performance: "Performance first",
  balanced: "Balanced",
  budget: "Budget first",
};

export function valueScore(
  intelligence: number,
  costEff: number,
  costRef: number,
  alpha: number,
): number {
  if (costEff <= 0 || intelligence <= 0) return 0;
  return intelligence * Math.pow(costRef / costEff, alpha);
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/** Display normalization only (max -> 100); ranking uses raw values. */
export function tpvsScale(raw: number[]): number[] {
  const max = Math.max(...raw, 0);
  if (max <= 0) return raw.map(() => 0);
  return raw.map((v) => (v / max) * 100);
}

export interface ParetoPoint {
  id: string;
  label: string;
  cost: number; // effective $/task or $/M — any positive cost axis
  intelligence: number;
  free: boolean; // $0 route: plotted at the cost floor, unranked
}

export interface ParetoResult {
  frontier: ParetoPoint[];
  /** For each dominated point, the frontier point that pins it down. */
  dominatedBy: Record<string, ParetoPoint>;
}

/**
 * Upper-left staircase: sort by cost ascending; a point is on the frontier iff
 * its intelligence exceeds every cheaper point's. Free points sit at the cost
 * floor and are excluded from frontier computation (unranked per design §3.4).
 */
export function paretoFrontier(points: ParetoPoint[]): ParetoResult {
  const ranked = points
    .filter((p) => !p.free && p.cost > 0)
    .sort((a, b) => a.cost - b.cost || b.intelligence - a.intelligence);
  const frontier: ParetoPoint[] = [];
  let bestI = -Infinity;
  for (const p of ranked) {
    if (p.intelligence > bestI) {
      frontier.push(p);
      bestI = p.intelligence;
    }
  }
  const dominatedBy: Record<string, ParetoPoint> = {};
  for (const p of ranked) {
    if (frontier.some((f) => f.id === p.id)) continue;
    const dominators = frontier.filter((f) => f.intelligence >= p.intelligence);
    if (dominators.length) {
      dominatedBy[p.id] = dominators.reduce((a, b) => (a.cost <= b.cost ? a : b));
    }
  }
  return { frontier, dominatedBy };
}
