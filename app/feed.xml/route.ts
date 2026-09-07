import { ACTIVE_OFFERS } from "@/lib/offers";
import { SITE_URL, SNAPSHOT_ISO } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function rfc822(date: string): string {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

export async function GET() {
  const buildDate = new Date(
    Math.max(...ACTIVE_OFFERS.map((o) => Date.parse(`${o.verified_at}T00:00:00Z`))),
  ).toUTCString();
  const items = [
    ...ACTIVE_OFFERS.map((o) => ({
      title: `${o.title} — ${o.price.now} (verified ${o.verified_at})`,
      link: `${SITE_URL}${o.canonical_url}`,
      desc: `${o.verdict} Catch: ${o.catchSummary}`,
      pubDate: rfc822(o.verified_at),
    })),
    {
      title: "What is effective cost per task?",
      link: `${SITE_URL}/guides/effective-cost-per-task-explained/`,
      desc: "$40/120-task/$0.80 example breaks even at 50 tasks.",
      pubDate: rfc822(SNAPSHOT_ISO),
    },
    {
      title: "Should you pay monthly or annually for AI?",
      link: `${SITE_URL}/guides/monthly-vs-annual-ai/`,
      desc: "Annual saves ~20% for stable volume only.",
      pubDate: rfc822(SNAPSHOT_ISO),
    },
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Token Perks</title><link>${SITE_URL}/</link><description>The best AI offers. The catches, upfront. Research snapshot Sep 6 2026.</description><language>en</language><lastBuildDate>${buildDate}</lastBuildDate>${items
    .map(
      (it) =>
        `<item><title>${esc(it.title)}</title><link>${esc(it.link)}</link><guid isPermaLink="true">${esc(it.link)}</guid><description>${esc(it.desc)}</description><pubDate>${it.pubDate}</pubDate></item>`,
    )
    .join("")}</channel></rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
