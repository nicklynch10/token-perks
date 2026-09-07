import { OFFERS } from "@/lib/offers";
import { SITE_URL, SNAPSHOT_LINE } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const parts: string[] = [
    "# Token Perks — full text",
    SNAPSHOT_LINE,
    "Methodology v0.1 (Sep 6 2026): weekly re-verification, daily for active promos; per-task costs use median over trailing 7-day example window; official sources only; benchmarks linked, never republished.",
    "",
  ];
  for (const o of OFFERS) {
    parts.push(
      `## ${o.title} [${o.status}]`,
      `Provider: ${o.provider} | Plan: ${o.plan}`,
      `Price now: ${o.price.now}`,
      `Renewal: ${o.price.renewal}`,
      o.expiry ? `Expiry: ${o.expiry}` : "",
      `Verified: ${o.verified_at}`,
      `Verdict: ${o.verdict}`,
      `Access: ${o.access_route}`,
      `Catches: ${o.catches.join(" | ")}`,
      `Limits: ${o.limits.join(" | ")}`,
      `Eligibility: ${o.eligibility.join(" | ")}`,
      `Restrictions: ${o.restrictions.join(" | ")}`,
      ...o.economics,
      ...o.faq.map((f) => `Q: ${f.q} A: ${f.a}`),
      `Evidence: ${o.evidence.map((e) => `[${e.confidence}] ${e.point} (Source: ${e.source})`).join(" | ")}`,
      `URL: ${SITE_URL}${o.canonical_url}`,
      "",
    );
  }
  parts.push(
    "## Guides",
    "Effective cost per task, explained: price ÷ tasks done; $40/120-task/$0.80 example breaks even at 50 tasks.",
    "Monthly vs annual AI plans: annual saves ~20% (Allegretto $39 vs ~$31 effective) for stable volume only.",
    "",
    "V0 contains no affiliate links. Re-verify at official terms before paying.",
    "",
  );
  return new Response(parts.filter((p) => p !== "").join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
