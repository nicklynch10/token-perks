import { OFFERS } from "@/lib/offers";
import { SITE_URL, SNAPSHOT_LINE } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const lines = [
    "# Token Perks",
    "The best AI offers. The catches, upfront.",
    "",
    SNAPSHOT_LINE,
    "Methodology v0.1 (Sep 6 2026): weekly re-verification, daily for active promos; per-task costs use median over trailing 7-day example window; official sources only.",
    "Independent benchmarks are linked with attribution, never republished.",
    "",
    "## Offers",
    ...OFFERS.map(
      (o) =>
        `- ${o.shortTitle} (${o.status}): ${o.price.now}. Renewal: ${o.renewal} Catch: ${o.catchSummary} Details: ${SITE_URL}${o.canonical_url}`,
    ),
    "",
    "## Guides",
    `- Effective cost per task, explained: ${SITE_URL}/guides/effective-cost-per-task-explained/`,
    `- Monthly vs annual AI plans: ${SITE_URL}/guides/monthly-vs-annual-ai/`,
    "",
    "## Machine feeds",
    `- Full data: ${SITE_URL}/api/offers.json`,
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
