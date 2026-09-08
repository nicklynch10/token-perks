import universeJson from "@/content/leaderboard/universe.json";

export type CategoryKey = "a" | "b" | "c" | "d" | "e";
export type RowLabel = "DIRECT" | "EXCERPT" | "UNCERTAIN";

export interface UniverseRow {
  id: string;
  provider: string;
  category: CategoryKey;
  plan: string;
  listPrice: string;
  priceMonthly: number | null;
  apiIn: number | null;
  apiOut: number | null;
  unit: string;
  /** Published batch discount as a fraction off list (0.5 = -50%). Absent/null = no published batch modifier. */
  batchDiscount?: number | null;
  /** True when the published modifier is approximate wording (e.g. "about half"). */
  batchApprox?: boolean;
  notes: string;
  caveats: string[];
  sourceUrl: string;
  /** Date this row was read from its source (per-row; rows may predate the snapshot). */
  accessed: string;
  label: RowLabel;
  offer: string | null;
  modelId: string | null;
  /**
   * Per-unit overage / excess / top-up terms for subscription, credit, and
   * tool rows. Optional: absent when not applicable to the row. When present
   * and the official docs state no figure, `rate` is the literal string
   * "not published" — never a guess (see /methodology/).
   */
  overage?: OverageTerms;
  /**
   * Prompt-cache terms for API per-token rows. Optional: absent when not
   * applicable to the row. Unknown sub-fields are the literal string
   * "not published" — never a guess (see /methodology/).
   */
  cacheTerms?: CacheTerms;
}

/** Overage / excess-usage / top-up terms, quoted from official provider docs. */
export interface OverageTerms {
  /** Per-unit excess rate as stated, or "not published". */
  rate: string;
  /** Official page where the rate (or its absence) was verified. */
  sourceUrl: string;
  /** Date the overage source was read. */
  accessed: string;
}

/** Prompt-cache terms, quoted from official provider docs. */
export interface CacheTerms {
  /** Cache TTL as stated (e.g. "5m default, 1h with header"), or "not published". */
  ttl: string;
  /** Minimum cacheable / billable tokens as stated, or "not published". */
  minTokens: string;
  /** Cache-write fee as stated, or "not published". */
  writeFee: string;
  /** Cached-input read discount as stated, or "not published". */
  readDiscount: string;
  /** Official page where the terms (or their absence) were verified. */
  sourceUrl: string;
  /** Date the cache source was read. */
  accessed: string;
}

export interface Universe {
  snapshot: string;
  conventions: {
    blendedPerM: string;
    batchPerM: string;
    labels: string;
    categories: Record<CategoryKey, string>;
    overage?: string;
    cacheTerms?: string;
  };
  rows: UniverseRow[];
}

export const UNIVERSE = universeJson as unknown as Universe;

export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  a: "Subscriptions",
  b: "API (per token)",
  c: "Credits / prepaid",
  d: "Coding tools",
  e: "Free / promos",
};

export const CATEGORY_ORDER: CategoryKey[] = ["a", "b", "c", "d", "e"];

/**
 * Blended $/M tokens — (3 x input + 1 x output) / 4.
 * Token Perks arithmetic, not a provider figure. 3:1 mirrors a write-heavy
 * workload; documented on /methodology/.
 */
export function blendedPerM(r: UniverseRow): number | null {
  if (r.apiIn == null || r.apiOut == null) return null;
  return (3 * r.apiIn + r.apiOut) / 4;
}

/** Estimated $/task at a tokens-per-task preset. Null when the row has no token price. */
export function estPerTask(r: UniverseRow, tokensPerTask: number): number | null {
  const perM = blendedPerM(r);
  if (perM == null) return null;
  return (perM * tokensPerTask) / 1_000_000;
}

/**
 * Computed batch $/M tokens — blended $/M x (1 - batchDiscount).
 * Only defined where the row carries a published batch modifier;
 * otherwise null (rendered as "—", never guessed).
 */
export function batchPerM(r: UniverseRow): number | null {
  if (r.batchDiscount == null) return null;
  const perM = blendedPerM(r);
  if (perM == null) return null;
  return perM * (1 - r.batchDiscount);
}

/** Estimated batch $/task at a tokens-per-task preset. Null without a published modifier. */
export function batchPerTask(r: UniverseRow, tokensPerTask: number): number | null {
  const perM = batchPerM(r);
  if (perM == null) return null;
  return (perM * tokensPerTask) / 1_000_000;
}

export function providerSlug(provider: string): string {
  return provider.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Provider key from the row id's first segment (stable, ASCII). */
export function providerIdOf(row: { id: string; provider: string }): string {
  const seg = row.id.split("--")[0];
  if (seg) return seg;
  return row.provider.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function providerSlugById(id: string): string {
  return id; // id segment is already the slug
}

/** Canonical display names for provider groups (rows may carry qualifying suffixes). */
const PROVIDER_NAMES: Record<string, string> = {
  anthropic: "Anthropic",
  openai: "OpenAI",
  google: "Google",
  xai: "xAI",
  mistral: "Mistral",
  moonshot: "Moonshot AI",
  zai: "Z.ai",
  minimax: "MiniMax",
  deepseek: "DeepSeek",
  perplexity: "Perplexity",
  meta: "Meta (Llama)",
  alibaba: "Alibaba (Qwen)",
  together: "Together AI",
  "nvidia-build": "NVIDIA Build",
  openrouter: "OpenRouter",
  fireworks: "Fireworks AI",
  cerebras: "Cerebras",
  groq: "Groq",
  deepinfra: "Third-party hosting (observed)",
  cursor: "Cursor",
  github: "GitHub",
  devin: "Windsurf / Devin (Cognition)",
  antigravity: "Google Antigravity",
  "muse-spark": "Muse Spark (via Zen)",
};

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

export function getProvider(slug: string): ProviderGroup | undefined {
  return providerGroups().find((g) => g.slug === slug);
}

/** API-priced rows with a blended figure — the leaderboard set. */
export function pricedApiRows(): UniverseRow[] {
  return UNIVERSE.rows.filter((r) => blendedPerM(r) != null && r.apiIn != null && r.apiIn > 0);
}

/** Display name for a seller/provider slug (falls back to the slug itself). */
export function providerDisplayName(slug: string): string {
  return PROVIDER_NAMES[slug] ?? slug;
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

export function fmtPerM(v: number): string {
  if (v === 0) return "0";
  if (v < 0.01) return `$${v.toFixed(4)}`;
  if (v < 1) return `$${v.toFixed(3)}`;
  return `$${v.toFixed(2)}`;
}

export function fmtTask(v: number): string {
  if (v === 0) return "0";
  if (v < 0.01) return `$${v.toFixed(4)}`;
  if (v < 1) return `$${v.toFixed(3)}`;
  return `$${v.toFixed(2)}`;
}
