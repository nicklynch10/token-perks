import { OFFERS } from "@/lib/offers";
import { SITE_URL, SNAPSHOT_LINE } from "@/lib/site";
import { CATEGORY_LABELS, blendedPerM, providerGroups, UNIVERSE } from "@/lib/universe";

export const dynamic = "force-static";

export async function GET() {
  const parts: string[] = [
    "# Token Perks — full text",
    SNAPSHOT_LINE,
    "Methodology v2 (Sep 7 2026): blended $/M = (3 x input + 1 x output) / 4 at list price; official sources only; uncertainty labels on every row; benchmarks quoted per datum with attribution, never republished as tables or feeds.",
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
      `Caveats: ${o.catches.join(" | ")}`,
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
    `## Cost universe (${UNIVERSE.rows.length} routes, snapshot ${UNIVERSE.snapshot})`,
    "Every tracked access route follows. Blended $/M = (3 x input + 1 x output) / 4 where both rates are published. Evidence labels: DIRECT = read on the provider's own page; EXCERPT = official copy via snapshot or search index; UNCERTAIN = not verified this pass.",
    "",
  );
  for (const r of UNIVERSE.rows) {
    const perM = blendedPerM(r);
    parts.push(
      `- ${r.provider} | ${CATEGORY_LABELS[r.category]} | ${r.plan} | List: ${r.listPrice}` +
        (perM != null ? ` | Blended $${perM.toFixed(2)}/M` : "") +
        ` | ${r.label} | Source: ${r.sourceUrl}` +
        (r.caveats.length ? ` | Caveats: ${r.caveats.join(" | ")}` : "") +
        ` | Page: ${SITE_URL}/providers/${r.id.split("--")[0]}/`,
    );
  }
  parts.push("");

  parts.push(
    "## Providers",
    ...providerGroups().map((g) => `${g.name}: ${g.rows.length} routes. ${SITE_URL}/providers/${g.slug}/`),
    "",
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
