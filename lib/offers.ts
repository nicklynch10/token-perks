import chatgptPlus from "@/content/offers/chatgpt-plus.json";
import claudePro from "@/content/offers/claude-pro.json";
import copilotPro from "@/content/offers/copilot-pro.json";
import cursorPro from "@/content/offers/cursor-pro.json";
import googleAiPro from "@/content/offers/google-ai-pro.json";
import kimiK3Core from "@/content/offers/kimi-k3-core.json";
import museSparkZenFree from "@/content/offers/muse-spark-zen-free.json";
import nvidiaK3Free from "@/content/offers/nvidia-k3-free.json";
import perplexityPro from "@/content/offers/perplexity-pro.json";

export interface OfficialLink {
  label: string;
  url: string | null;
  note?: string;
}

export interface ClaimStep {
  step: string;
  url?: string | null;
}

export interface EvidenceItem {
  point: string;
  confidence: "high" | "medium" | "low";
  source: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface OfferPrice {
  now: string;
  renewal: string;
}

export interface Offer {
  id: string;
  status: "active" | "expired" | "ending-soon";
  provider: string;
  plan: string;
  title: string;
  shortTitle: string;
  badge: string;
  catchSummary: string;
  canonical_url: string;
  official_terms_url: string | null;
  official_links: OfficialLink[];
  price: OfferPrice;
  renewal: string;
  expiry: string | null;
  verified_at: string;
  eligibility: string[];
  restrictions: string[];
  verdict: string;
  catches: string[];
  limits: string[];
  access_route: string;
  claim_steps: ClaimStep[];
  economics_heading: string;
  economics: string[];
  economics_rows: { label: string; value: string }[];
  evidence: EvidenceItem[];
  faq: FaqItem[];
  citation: string;
  slot: "top3" | "also";
  rank: number;
  /** Optional explicit schema.org price for /best/<slug>/ JSON-LD.
   *  Single figure -> { price }; tier ladder -> { lowPrice, highPrice }. USD default. */
  jsonld_price?: { price?: string; lowPrice?: string; highPrice?: string; currency?: string };
}

const REQUIRED = [
  "id",
  "status",
  "provider",
  "plan",
  "title",
  "canonical_url",
  "price",
  "renewal",
  "verified_at",
] as const;

/** Hand-rolled Zod-lite validation: returns error strings, empty = valid. */
export function validateOffer(input: unknown): string[] {
  const errors: string[] = [];
  if (typeof input !== "object" || input === null) return ["offer is not an object"];
  const o = input as Record<string, unknown>;
  for (const key of REQUIRED) {
    if (o[key] === undefined || o[key] === null || o[key] === "") {
      errors.push(`missing required field: ${key}`);
    }
  }
  if (o.price && typeof o.price === "object") {
    const p = o.price as Record<string, unknown>;
    if (!p.now) errors.push("missing required field: price.now");
    if (!p.renewal) errors.push("missing required field: price.renewal");
  }
  if (o.status && !["active", "expired", "ending-soon"].includes(o.status as string)) {
    errors.push(`invalid status: ${String(o.status)}`);
  }
  // Never invent verification dates: must be an explicit YYYY-MM-DD string.
  if (o.verified_at && !/^\d{4}-\d{2}-\d{2}$/.test(String(o.verified_at))) {
    errors.push(`verified_at must be YYYY-MM-DD, got: ${String(o.verified_at)}`);
  }
  if (!Array.isArray(o.faq) || (o.faq as unknown[]).length < 3) {
    errors.push("faq must have at least 3 entries");
  }
  return errors;
}

function parse(json: unknown, file: string): Offer {
  const errors = validateOffer(json);
  if (errors.length > 0) {
    throw new Error(`Invalid offer ${file}: ${errors.join("; ")}`);
  }
  return json as Offer;
}

export const OFFERS: Offer[] = [
  parse(kimiK3Core, "kimi-k3-core.json"),
  parse(museSparkZenFree, "muse-spark-zen-free.json"),
  parse(nvidiaK3Free, "nvidia-k3-free.json"),
  parse(copilotPro, "copilot-pro.json"),
  parse(chatgptPlus, "chatgpt-plus.json"),
  parse(googleAiPro, "google-ai-pro.json"),
  parse(claudePro, "claude-pro.json"),
  parse(cursorPro, "cursor-pro.json"),
  parse(perplexityPro, "perplexity-pro.json"),
];

export const ACTIVE_OFFERS = OFFERS.filter((o) => o.status === "active").sort(
  (a, b) => a.rank - b.rank,
);

export function getOffer(slug: string): Offer | undefined {
  return OFFERS.find((o) => o.id === slug);
}

export function offerSlugs(): string[] {
  return OFFERS.map((o) => o.id);
}

/** Minimal public feed shape for /api/offers.json (active only). */
export function publicFeed() {
  return ACTIVE_OFFERS.map((o) => ({
    id: o.id,
    status: o.status,
    provider: o.provider,
    plan: o.plan,
    title: o.title,
    canonical_url: o.canonical_url,
    official_terms_url: o.official_terms_url,
    price: o.price,
    renewal: o.renewal,
    expiry: o.expiry,
    verified_at: o.verified_at,
    eligibility: o.eligibility,
    restrictions: o.restrictions,
  }));
}
