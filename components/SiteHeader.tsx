import Link from "next/link";
import { HEADER_CTA } from "@/lib/nav";
import { SNAPSHOT_DATE } from "@/lib/site";
import MobileMenu from "./MobileMenu";
import PrimaryNav from "./PrimaryNav";

/**
 * Compact sticky header: 56px (h-14) at every size, solid paper background
 * with a hairline rule — no shadow, no animation (so prefers-reduced-motion
 * is satisfied without an override). Sticky keeps the header in flow, so
 * sticking causes zero layout shift.
 */
export default function SiteHeader({
  siteName,
  tagline,
}: {
  siteName: string;
  tagline: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-x-3 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Token Perks — home"
          className="inline-flex h-full shrink-0 items-center leading-tight"
        >
          <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
            {siteName}
          </span>
          <span className="ml-3 hidden text-xs text-ink-mute 2xl:inline">{tagline}</span>
        </Link>
        <PrimaryNav />
        <span className="data ml-auto hidden items-center rounded-full border border-line-strong px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-ink-mute md:inline-flex">
          Verified {SNAPSHOT_DATE}
        </span>
        <Link
          href={HEADER_CTA.href}
          className="hidden min-h-[40px] shrink-0 items-center rounded-lg bg-teal px-3.5 text-sm font-semibold text-white hover:bg-teal-deep md:inline-flex"
        >
          {HEADER_CTA.label}
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
