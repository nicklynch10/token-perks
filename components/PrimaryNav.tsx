"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, isNavActive } from "@/lib/nav";

/**
 * Primary navigation — desktop header row only (below md the header swaps to
 * the MobileMenu dialog). Client-isolated so only this small part of the
 * header reads the pathname (per usePathname static-prerender guidance).
 * Active state is background-only: no font-weight change, so activating
 * a link never shifts layout.
 */
export default function PrimaryNav() {
  const pathname = usePathname() ?? "/";
  return (
    <nav
      aria-label="Primary"
      className="no-scrollbar ml-auto hidden min-w-0 flex-nowrap items-center gap-1 overflow-x-auto text-sm font-semibold md:flex"
    >
      {NAV_LINKS.map((l) => {
        const active = isNavActive(pathname, l.href, l.exact);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-lg px-2.5 sm:px-3 ${
              active ? "bg-paper-deep text-ink" : "text-ink-soft hover:bg-paper-deep hover:text-ink"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
