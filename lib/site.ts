export const SITE_NAME = "Token Perks";
export const SITE_TAGLINE = "AI subscription offers, compared on effective cost per task.";
export const SITE_URL = "https://token-perks.com";
export const SNAPSHOT_DATE = "Sep 6 2026";
/** ISO form of the snapshot date — shared by feeds, sitemap, and stamps. */
export const SNAPSHOT_ISO = "2026-09-06";
export const SNAPSHOT_LINE =
  "Research snapshot Sep 6 2026 — re-verify at official terms before paying.";

/** Trailing-slash canonicals per SEO spec. */
export function canonical(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = p.endsWith("/") ? p : `${p}/`;
  return `${SITE_URL}${withSlash}`;
}

export const AFFILIATE_NOTICE =
  "We may earn a commission from some future links.";
export const AFFILIATE_V0_STATE =
  "This version contains no affiliate links. Every outbound link goes directly to an official provider page.";

export const MONEY_PAGE = "/how-we-make-money/";
