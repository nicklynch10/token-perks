import { OFFERS } from "@/lib/offers";
import { SITE_URL, SNAPSHOT_LINE } from "@/lib/site";
import { blendedPerM, providerGroups, UNIVERSE } from "@/lib/universe";

export const dynamic = "force-static";

export async function GET() {
  const ranked = UNIVERSE.rows
    .filter((r) => r.apiIn != null && r.apiIn > 0 && r.apiOut != null)
    .map((r) => ({ r, perM: blendedPerM(r) as number }))
    .sort((a, b) => a.perM - b.perM)
    .slice(0, 15);

  const groups = providerGroups();
  const lines = [
    "# Token Perks",
    "AI subscription offers, compared on effective cost per task.",
    "",
    SNAPSHOT_LINE,
    `Cost universe: ${UNIVERSE.rows.length} access routes across ${groups.length} providers (subscriptions, API per-token, credits, coding tools, free tiers), snapshot ${UNIVERSE.snapshot}.`,
    "Methodology v2 (Sep 7 2026): blended $/M = (3 x input + 1 x output) / 4 at each route's current published price (list, or launch-promo price while a promo runs — promo-priced rows caption their list-price blend); uncertainty labels DIRECT / EXCERPT / UNCERTAIN on every row; unverified routes are shown as unverified, never estimated from memory.",
    "Artificial Analysis Intelligence Index values are quoted per datum with source links under AA brief-citation terms; they are absent from this file and all machine feeds by policy.",
    "",
    "## Offers",
    ...OFFERS.map(
      (o) =>
        `- ${o.shortTitle} (${o.status}): ${o.price.now}. Renewal: ${o.renewal} Caveats: ${o.catchSummary} Details: ${SITE_URL}${o.canonical_url}`,
    ),
    "",
    "## Cost leaderboard (blended $/M, cheapest first — cost side only)",
    ...ranked.map(
      ({ r, perM }) =>
        `- ${r.provider} ${r.plan}: $${perM.toFixed(2)}/M blended (${r.label}). ${SITE_URL}/providers/${r.id.split("--")[0]}/`,
    ),
    `- Full ranked table: ${SITE_URL}/ (interactive; also ${SITE_URL}/api/leaderboard.json)`,
    "",
    "## Providers",
    ...groups.map((g) => `- ${g.name}: ${g.rows.length} routes. ${SITE_URL}/providers/${g.slug}/`),
    "",
    "## Guides",
    `- Buying AI access as a gift: ${SITE_URL}/guides/buying-ai-access-as-a-gift/`,
    `- Effective cost per task, explained: ${SITE_URL}/guides/effective-cost-per-task-explained/`,
    `- Monthly vs annual AI plans: ${SITE_URL}/guides/monthly-vs-annual-ai/`,
    `- Cost calculators (break-even, one-task cost, prepay, 12-month view): ${SITE_URL}/cost-calculator/`,
    "",
    "## Machine feeds",
    `- Full route data (cost side): ${SITE_URL}/api/leaderboard.json`,
    `- Offer data: ${SITE_URL}/api/offers.json`,
    `- Full text: ${SITE_URL}/llms-full.txt`,
    `- Verification log: ${SITE_URL}/changes/`,
    `- Methodology: ${SITE_URL}/methodology/`,
    "",
    "Re-verify at official terms before paying. V0 contains no affiliate links.",
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
