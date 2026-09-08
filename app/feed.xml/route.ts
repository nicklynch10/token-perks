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
  const items = [
    ...ACTIVE_OFFERS.map((o) => ({
      title: `${o.title} — ${o.price.now} (verified ${o.verified_at})`,
      link: `${SITE_URL}${o.canonical_url}`,
      desc: `${o.verdict} Limits: ${o.catchSummary}`,
      pubDate: rfc822(o.verified_at),
    })),
    {
      title: "Effective cost per task, explained",
      link: `${SITE_URL}/guides/effective-cost-per-task-explained/`,
      desc: "Illustrative $40 basket / 120-task / $0.80 example breaks even at 50 tasks; the calculator defaults to the actual $39 Allegretto tier (≈49).",
      pubDate: rfc822(SNAPSHOT_ISO),
    },
    {
      title: "Monthly vs annual AI plans",
      link: `${SITE_URL}/guides/monthly-vs-annual-ai/`,
      desc: "Annual saves ~20% for stable volume only.",
      pubDate: rfc822(SNAPSHOT_ISO),
    },
    {
      title: "AI cost leaderboard — 129 access routes, ranked on blended $/M",
      link: `${SITE_URL}/`,
      desc: "Cost-side ranking of subscriptions, API pricing, credits, coding tools, and free tiers, with a cost-vs-intelligence frontier chart. Intelligence scores quoted from Artificial Analysis with per-datum citations; machine feed: /api/leaderboard.json (cost side only).",
      pubDate: rfc822("2026-09-07"),
    },
  ];
  const itemDates = items.map((it) => Date.parse(it.pubDate));
  const buildDate = new Date(Math.max(...itemDates)).toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Token Perks</title><link>${SITE_URL}/</link><description>AI access routes ranked on effective cost, with cited intelligence scores. Cost snapshot Sep 6-7 2026.</description><language>en</language><lastBuildDate>${buildDate}</lastBuildDate>${items
    .map(
      (it) =>
        `<item><title>${esc(it.title)}</title><link>${esc(it.link)}</link><guid isPermaLink="true">${esc(it.link)}</guid><description>${esc(it.desc)}</description><pubDate>${it.pubDate}</pubDate></item>`,
    )
    .join("")}</channel></rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
