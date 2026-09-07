import { SNAPSHOT_LINE } from "@/lib/site";

export default function ResearchSnapshot({ extra }: { extra?: string }) {
  return (
    <aside aria-label="Research snapshot notice" className="border-t border-dashed border-line-strong pt-3">
      <p className="asof">As of Sep 6 2026</p>
      <p className="data mt-1.5 text-xs leading-relaxed text-ink-mute">
        {SNAPSHOT_LINE} Prices, limits, and promo windows change. Confirm the current terms on the
        provider&apos;s official page before paying or planning around them.
        {extra ? ` ${extra}` : ""}
      </p>
    </aside>
  );
}
