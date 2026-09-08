import type { Metadata } from "next";

export const SITE_NAME = "Token Perks";
export const SITE_TAGLINE = "AI subscription offers, compared on effective cost per task.";
export const SITE_URL = "https://token-perks.com";

/** Site-wide <title> default and template — single-sourced like every other meta string. */
export const SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE.replace(/\.$/, "")}`;
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;
export const SNAPSHOT_DATE = "Sep 6–7 2026";
/** ISO form of the snapshot date — shared by feeds, sitemap, and stamps. */
export const SNAPSHOT_ISO = "2026-09-06";
export const SNAPSHOT_LINE =
  "Research snapshot Sep 6–7 2026 — re-verify at official terms before paying.";

/** Trailing-slash canonicals per SEO spec. */
export function canonical(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = p.endsWith("/") ? p : `${p}/`;
  return `${SITE_URL}${withSlash}`;
}

export const OG_HOME_IMAGE = "/img/og/og-home.png";

/**
 * Mirror one title/description pair into BOTH openGraph and twitter blocks.
 * The historical drift bug was page metadata overriding `openGraph` while
 * `twitter` stayed at the root-layout copy; building the pair from this one
 * call makes twitter:title/description equal the og equivalents by
 * construction. All share meta strings come from here, so no route writes
 * its own twitter block.
 */
export function social(opts: {
  /** og/twitter title (falls through as twitter:title). */
  title: string;
  /** og/twitter description — the same string is used for both. */
  description: string;
  /** Route path for the canonical share URL, e.g. "/best/". */
  path: string;
  type?: "website" | "article";
  /** Absolute-path OG image; omit for pages without a dedicated card. */
  image?: string;
  imageAlt?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const { title, description, path, type = "website", image, imageAlt } = opts;
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }]
    : undefined;
  return {
    openGraph: { title, description, url: canonical(path), type, ...(images ? { images } : {}) },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}

/**
 * Homepage meta strings — single-sourced here, with counts passed in from
 * live data (lib/universe) at render time. site.ts must stay a leaf module
 * (client components import it), so numbers arrive as arguments; hard-coding
 * a count in any consumer is the drift this builder exists to prevent.
 */
export function homeMeta(n: { routes: number; snapshot: string }) {
  const title = "Token Perks — AI cost leaderboard";
  const description = `${n.routes} tracked AI access routes — subscriptions, API per-token pricing, credits, coding tools, and free tiers — ranked on effective cost, with a cost-vs-intelligence frontier chart and cited Artificial Analysis scores. Snapshot ${n.snapshot}.`;
  return {
    /** <title> content (TITLE_TEMPLATE appends the site name). */
    pageTitle: "AI cost leaderboard — every access route, priced and ranked",
    title,
    description,
  };
}

export const AFFILIATE_NOTICE =
  "We may earn a commission from some future links.";
export const AFFILIATE_V0_STATE =
  "This version contains no affiliate links. Every outbound link goes directly to an official provider page.";

export const MONEY_PAGE = "/how-we-make-money/";
