import Link from "next/link";
import { OFFERS } from "@/lib/offers";

interface StripItem {
  date: string;
  label: string;
  text: string;
  href: string;
}

/**
 * Live-publication strip: every verified-at entry this publication has issued,
 * newest first. Mono dateline · dotted leader · title. Boxless by design.
 */
const ITEMS: StripItem[] = [
  ...OFFERS.map<StripItem>((o) => ({
    date: o.verified_at,
    label: o.status === "active" ? "Verified" : "Ended",
    text: `${o.shortTitle} — ${o.price.now}`,
    href: o.canonical_url,
  })),
  { date: "2026-09-07", label: "Log", text: "Verification pass 4 recorded (presentation polish)", href: "/changes/" },
  { date: "2026-09-06", label: "Methodology", text: "Methodology v0.1 published", href: "/methodology/" },
].sort((a, b) => b.date.localeCompare(a.date) || a.label.localeCompare(b.label));

export default function NewChangedStrip() {
  return (
    <div className="border-y border-line py-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="eyebrow eyebrow-ink">Publication log</p>
        <Link href="/changes/" className="u-draw text-xs font-semibold text-teal-deep">
          Full verification log →
        </Link>
      </div>
      <ul className="mt-3 space-y-2">
        {ITEMS.map((it, i) => (
          <li key={i} className="flex items-baseline gap-2 text-sm">
            <span className="data shrink-0 text-xs text-ink-mute">{it.date}</span>
            <span
              className={
                it.label === "Ended"
                  ? "data shrink-0 rounded-full bg-expired-wash px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-expired"
                  : "data shrink-0 rounded-full bg-teal-wash px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-teal-deep"
              }
            >
              {it.label}
            </span>
            <span className="leader" aria-hidden="true" />
            <Link href={it.href} className="min-w-0 font-semibold hover:underline">
              {it.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
