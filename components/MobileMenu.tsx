"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { HEADER_CTA, NAV_LINKS, isNavActive } from "@/lib/nav";
import { SNAPSHOT_DATE } from "@/lib/site";

/**
 * Mobile / small-tablet navigation: a <dialog> opened from the header
 * hamburger. Native semantics cover the rest — Escape closes, focus moves
 * into the dialog and returns to the button, the dialog is labelled by its
 * own heading (aria-labelledby="mobile-menu-heading"). A tap on the backdrop
 * also closes it. No animation at any preference (nothing is defined here,
 * so prefers-reduced-motion needs no override).
 */
export default function MobileMenu() {
  const pathname = usePathname() ?? "/";
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Close the menu on navigation (back/forward and client transitions).
    const dlg = ref.current;
    if (!dlg) return;
    if (dlg.open) dlg.close();
  }, [pathname]);

  function onBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    const dlg = ref.current;
    if (!dlg) return;
    const b = dlg.getBoundingClientRect();
    const outside =
      e.clientX < b.left ||
      e.clientX > b.right ||
      e.clientY < b.top ||
      e.clientY > b.bottom;
    if (outside) dlg.close();
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open main menu"
        onClick={() => ref.current?.showModal()}
        className="ml-auto touch:min-h-[44px] inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-line-strong bg-card px-3 text-sm font-semibold text-ink-soft md:hidden"
      >
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <line x1="0.875" y1="1.5" x2="15.125" y2="1.5" />
            <line x1="0.875" y1="6" x2="15.125" y2="6" />
            <line x1="0.875" y1="10.5" x2="15.125" y2="10.5" />
          </g>
        </svg>
        <span>Menu</span>
      </button>
      <dialog
        ref={ref}
        aria-labelledby="mobile-menu-heading"
        onClick={onBackdropClick}
        className="m-4 mt-14 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-line-strong bg-card p-5 text-ink backdrop:bg-ink/30"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="mobile-menu-heading" className="eyebrow">
            Menu
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="touch:min-h-[44px] inline-flex min-h-[40px] items-center rounded-lg px-3 text-sm font-semibold text-ink-mute hover:text-ink"
          >
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-3 flex flex-col gap-1 text-base font-semibold">
          {NAV_LINKS.map((l) => {
            const active = isNavActive(pathname, l.href, l.exact);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                onClick={() => ref.current?.close()}
                className={`inline-flex min-h-[44px] items-center rounded-lg px-3 ${
                  active ? "bg-paper-deep text-ink" : "text-ink-soft hover:bg-paper-deep hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href={HEADER_CTA.href}
          onClick={() => ref.current?.close()}
          className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-teal px-4 text-sm font-semibold text-white"
        >
          {HEADER_CTA.label}
        </Link>
        <p className="data mt-4 text-[11px] uppercase tracking-[0.1em] text-ink-mute">
          Verified {SNAPSHOT_DATE}
        </p>
      </dialog>
    </>
  );
}
