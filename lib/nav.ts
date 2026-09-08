/** Shared primary-navigation data — used by the desktop nav row and the
 *  mobile menu dialog so the two can never drift apart. */
export interface NavLink {
  href: string;
  label: string;
  /** Match "/" exactly instead of by prefix. */
  exact: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home", exact: true },
  { href: "/best/", label: "Offers", exact: false },
  { href: "/providers/", label: "Providers", exact: false },
  { href: "/guides/", label: "Guides", exact: false },
  { href: "/cost-calculator/", label: "Calculators", exact: false },
  { href: "/methodology/", label: "Methodology", exact: false },
];

export function isNavActive(pathname: string, href: string, exact: boolean): boolean {
  if (exact) return pathname === "/" || pathname === "";
  return pathname === href || pathname.startsWith(href);
}

export const HEADER_CTA = { href: "/best/", label: "Compare the tracked offers" };
