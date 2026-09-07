import type { MetadataRoute } from "next";
import { ACTIVE_OFFERS } from "@/lib/offers";
import { SITE_URL, SNAPSHOT_ISO } from "@/lib/site";

export const dynamic = "force-static";

/** Per-URL last-modified: offer pages use their own verified_at (data untouched by polish passes);
 *  static pages use the last pass date that touched them. */
const STATIC_PAGES: { path: string; lastModified: string }[] = [
  { path: "/", lastModified: "2026-09-07" },
  { path: "/best/", lastModified: "2026-09-07" },
  { path: "/guides/", lastModified: SNAPSHOT_ISO },
  { path: "/guides/effective-cost-per-task-explained/", lastModified: "2026-09-07" },
  { path: "/guides/monthly-vs-annual-ai/", lastModified: "2026-09-07" },
  { path: "/methodology/", lastModified: SNAPSHOT_ISO },
  { path: "/changes/", lastModified: "2026-09-07" },
  { path: "/how-we-make-money/", lastModified: SNAPSHOT_ISO },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PAGES.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: new Date(p.lastModified),
    })),
    // Active offers only — ended offers stay published for reference but leave the sitemap.
    ...ACTIVE_OFFERS.map((o) => ({
      url: `${SITE_URL}${o.canonical_url}`,
      lastModified: new Date(o.verified_at),
    })),
  ];
}
