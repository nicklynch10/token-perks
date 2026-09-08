import { OFFERS } from "@/lib/offers";
import { SITE_NAME, SITE_URL, SNAPSHOT_LINE } from "@/lib/site";
import { CATEGORY_LABELS, blendedPerM, providerGroups, UNIVERSE } from "@/lib/universe";

export const dynamic = "force-static";

export async function GET() {
  const parts: string[] = [
    `# ${SITE_NAME} — full text`,
    SNAPSHOT_LINE,
    `Methodology v2 (${UNIVERSE.snapshot}): blended $/M = (3 x input + 1 x output) / 4 at each route's current published price (list, or launch-promo price while a promo runs — promo-priced rows caption their list-price blend); official sources only; uncertainty labels on every row; benchmarks quoted per datum with attribution, never republished as tables or feeds.`,
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
    `## Full price table (${UNIVERSE.rows.length} ways to buy tokens, snapshot ${UNIVERSE.snapshot})`,
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
    "Buying AI access as a gift: none of the tracked offers sells a gift card or transferable plan in verified terms — activation, refund windows, and quota reality per offer. /guides/buying-ai-access-as-a-gift/",
    "Effective cost per task, explained: price ÷ tasks done; illustrative $40 basket / 120-task / $0.80 example breaks even at 50 tasks (the calculator itself defaults to the actual $39 Allegretto tier, ≈49).",
    "Monthly vs annual AI plans: annual saves ~20% (Allegretto $39 vs ~$31 effective) for stable volume only.",
    "Cost calculators (/cost-calculator/): break-even with URL-shareable inputs (?tasks=&tokens=&seats=&sub=), one-task cost per priced API route, monthly-vs-annual prepay math, and a 12-month view of every tracked offer.",
    "",
    "V0 contains no affiliate links. Re-verify at official terms before paying.",
    "",
  );
  return new Response(parts.filter((p) => p !== "").join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
