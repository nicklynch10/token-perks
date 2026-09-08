import universeJson from "@/content/leaderboard/universe.json";

// Types, taxonomy constants, and pure arithmetic live in `lib/universe-meta.ts`
// (a data-free module client components can import without bundling the ledger).
// This file is SERVER-ONLY: it inlines the full universe.json.
export * from "@/lib/universe-meta";

import {
  providerIdOf,
  providerDisplayName,
  blendedPerM,
  PROVIDER_NAMES,
  type Universe,
  type UniverseRow,
} from "@/lib/universe-meta";

export const UNIVERSE = universeJson as unknown as Universe;

export interface ProviderGroup {
  slug: string;
  name: string;
  rows: UniverseRow[];
}

export function providerGroups(): ProviderGroup[] {
  const map = new Map<string, ProviderGroup>();
  for (const r of UNIVERSE.rows) {
    const slug = providerIdOf(r);
    let g = map.get(slug);
    if (!g) {
      g = { slug, name: PROVIDER_NAMES[slug] ?? r.provider, rows: [] };
      map.set(slug, g);
    }
    g.rows.push(r);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Break-even calculator preset chips (design audit item 7). The $0.80/task
 * default silently equals an $8/M premium blend; a K3-class or flash-class
 * user's metered math is 5x–70x cheaper, which skews the crossover toward
 * "flat wins". These chips let the visitor pull the lever with one click.
 *
 * Blends are DERIVED here from ledger rows — (3 x in + 1 x output) / 4 at
 * each row's current published price — never hardcoded. The "premium" entry
 * is the illustrative $8/M reference (the only non-row preset) so the
 * default state is also reachable. Server-only scalars: the calculator
 * receives just these numbers, not rows.
 */
export interface BlendPreset {
  id: string;
  label: string;
  blendPerM: number;
  /** $/task at the 100k-token reference — chip sub-label. */
  perTask100k: number;
  /** "derived from ledger row …, read YYYY-MM-DD" note; null for the illustrative reference. */
  derivation: string | null;
}

export function blendPresets(): BlendPreset[] {
  const byId = (id: string) => UNIVERSE.rows.find((r) => r.id === id);
  const out: BlendPreset[] = [
    {
      id: "premium",
      label: "Premium ref",
      blendPerM: 8,
      perTask100k: (8 * 100_000) / 1_000_000,
      derivation: null,
    },
  ];
  const named: [string, string, string][] = [
    ["k3", "moonshot--api--kimi-k3", "K3-class API"],
    ["flash", "zai--api--glm-5-3-flash", "GLM-5.3-Flash (promo)"],
  ];
  for (const [id, rowId, label] of named) {
    const r = byId(rowId);
    const b = r ? blendedPerM(r) : null;
    if (r && b != null) {
      out.push({
        id,
        label,
        blendPerM: b,
        perTask100k: (b * 100_000) / 1_000_000,
        derivation: `${r.provider} ${r.plan} · blend (3×in+out)/4 of ${r.listPrice} · read ${r.accessed}`,
      });
    }
  }
  return out;
}

export function getProvider(slug: string): ProviderGroup | undefined {
  return providerGroups().find((g) => g.slug === slug);
}

/** API-priced rows with a blended figure — the leaderboard set. */
export function pricedApiRows(): UniverseRow[] {
  return UNIVERSE.rows.filter((r) => blendedPerM(r) != null && r.apiIn != null && r.apiIn > 0);
}

/** A free/promo route that carries one of the provider's models but is sold by someone else. */
export interface HostedFreeRoute {
  row: UniverseRow;
  hostSlug: string;
  hostName: string;
}

/**
 * Free ($0) / promo routes, tracked under OTHER sellers, that serve the models
 * present in `ownRows` (the provider's own tracked rows). Uses the existing
 * model→row mapping (row.modelId) — no new data, no guessing.
 *
 * Why: a provider page that counts only its own rows can say "no free routes"
 * while a third party hosts the same model for $0 (e.g. NVIDIA Build's free
 * Kimi K3 dev route vs Moonshot's own page). These are clearly labeled as
 * third-party hosting wherever they are shown.
 *
 * "Free" here mirrors the on-page rollup definition: priceMonthly === 0.
 */
export function hostedFreeRoutes(slug: string, ownRows: UniverseRow[]): HostedFreeRoute[] {
  const modelIds = new Set(ownRows.map((r) => r.modelId).filter((m): m is string => m != null));
  if (modelIds.size === 0) return [];
  return UNIVERSE.rows
    .filter(
      (r) =>
        providerIdOf(r) !== slug &&
        r.modelId != null &&
        modelIds.has(r.modelId) &&
        r.priceMonthly === 0,
    )
    .map((r) => {
      const hostSlug = providerIdOf(r);
      return { row: r, hostSlug, hostName: providerDisplayName(hostSlug) };
    });
}
