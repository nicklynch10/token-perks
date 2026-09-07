"use client";

import { useEffect, useState } from "react";

export interface AnchorItem {
  href: string;
  label: string;
}

/**
 * Sticky on-page index with active-section highlighting (IntersectionObserver;
 * sections crossing the upper-middle band get aria-current + brand highlight).
 */
export default function AnchorBar({
  items,
  wide = false,
}: {
  items: AnchorItem[];
  wide?: boolean;
}) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.href.slice(1)))
      .filter((el): el is HTMLElement => el != null);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="anchor-bar">
      <div
        className={`data mx-auto flex items-center gap-1 overflow-x-auto px-4 text-xs sm:px-6 ${
          wide ? "max-w-5xl" : "max-w-3xl"
        }`}
      >
        {items.map((a) => {
          const isActive = active === a.href;
          return (
            <a
              key={a.href}
              href={a.href}
              aria-current={isActive ? "true" : undefined}
              className={`min-h-[40px] shrink-0 content-center rounded-lg px-3 font-semibold uppercase tracking-[0.1em] hover:bg-teal-wash hover:text-teal-deep ${
                isActive ? "bg-teal-wash text-teal-deep" : "text-ink-soft"
              }`}
            >
              {a.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
