/**
 * Client-safe half of the universe module: types, taxonomy constants, pure
 * arithmetic. NO JSON imports here.
 *
 * Why this file exists (2026-09-08 payload audit, item 6): `lib/universe.ts`
 * imports the full content/leaderboard/universe.json at module scope. The
 * leaderboard/universe tables are client components that needed only
 * CATEGORY_LABELS/CATEGORY_ORDER — but a module-scope JSON import can't be
 * tree-shaken, so the whole 85KB ledger array was bundled into a client chunk
 * loaded on the homepage (chunk "43-…" was 84.5KB of pure JSON). Client
 * components import from this file; server-only code keeps importing
 * lib/universe (which re-exports everything here, so nothing duplicates).
 */

export type CategoryKey = "a" | "b" | "c" | "d" | "e";
export type RowLabel = "DIRECT" | "EXCERPT" | "UNCERTAIN";

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
  /** Official page where the terms (or its absence) were verified. */
  sourceUrl: string;
  /** Date the cache source was read. */
  accessed: string;
}

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
  overage?: OverageTerms;
  cacheTerms?: CacheTerms;
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
export function blendedPerM(r: Pick<UniverseRow, "apiIn" | "apiOut">): number | null {
  if (r.apiIn == null || r.apiOut == null) return null;
  return (3 * r.apiIn + r.apiOut) / 4;
}

/** Estimated $/task at a tokens-per-task preset. Null when the row has no token price. */
export function estPerTask(r: Pick<UniverseRow, "apiIn" | "apiOut">, tokensPerTask: number): number | null {
  const perM = blendedPerM(r);
  if (perM == null) return null;
  return (perM * tokensPerTask) / 1_000_000;
}

/**
 * Computed batch $/M tokens — blended $/M x (1 - batchDiscount).
 * Only defined where the row carries a published batch modifier;
 * otherwise null (rendered as "—", never guessed).
 */
export function batchPerM(r: Pick<UniverseRow, "apiIn" | "apiOut" | "batchDiscount">): number | null {
  if (r.batchDiscount == null) return null;
  const perM = blendedPerM(r);
  if (perM == null) return null;
  return perM * (1 - r.batchDiscount);
}

/** Estimated batch $/task at a tokens-per-task preset. Null without a published modifier. */
export function batchPerTask(r: Pick<UniverseRow, "apiIn" | "apiOut" | "batchDiscount">, tokensPerTask: number): number | null {
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
export const PROVIDER_NAMES: Record<string, string> = {
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

/** Display name for a seller/provider slug (falls back to the slug itself). */
export function providerDisplayName(slug: string): string {
  return PROVIDER_NAMES[slug] ?? slug;
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
