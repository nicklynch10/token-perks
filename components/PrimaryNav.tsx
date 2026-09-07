"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home", exact: true },
  { href: "/best/", label: "Offers", exact: false },
  { href: "/providers/", label: "Providers", exact: false },
  { href: "/guides/", label: "Guides", exact: false },
  { href: "/methodology/", label: "Methodology", exact: false },
];

function isActive(pathname: string, href: string, exact: boolean): boolean {
  if (exact) return pathname === "/" || pathname === "";
  return pathname === href || pathname.startsWith(href);
}

/**
 * Primary navigation — client-isolated so only this small part of the
 * header reads the pathname (per usePathname static-prerender guidance).
 * Active state is background-only: no font-weight change, so activating
 * a link never shifts layout.
 */
export default function PrimaryNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav
      aria-label="Primary"
      className="ml-auto flex flex-wrap items-center gap-1 text-sm font-semibold"
    >
      {LINKS.map((l) => {
        const active = isActive(pathname, l.href, l.exact);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-[44px] items-center rounded-lg px-2 py-3 sm:px-3 ${
              active ? "bg-paper text-ink" : "text-ink-soft hover:bg-paper hover:text-ink"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
