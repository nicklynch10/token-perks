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
  notes: string;
  caveats: string[];
  sourceUrl: string;
  label: RowLabel;
  offer: string | null;
  modelId: string | null;
}

export interface Universe {
  snapshot: string;
  conventions: {
    blendedPerM: string;
    labels: string;
    categories: Record<CategoryKey, string>;
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
