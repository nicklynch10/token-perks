import { SNAPSHOT_DATE } from "@/lib/site";

/**
 * Provenance box — facts only. The reader-facing "re-verify at official terms"
 * hedge now appears exactly once per page, in the site-wide footer (V3.5 hedge
 * pass); this box previously doubled it right above the footer.
 */
export default function ResearchSnapshot({ extra }: { extra?: string }) {
  return (
    <aside aria-label="Research snapshot notice" className="border-t border-dashed border-line-strong pt-3">
      <p className="asof">As of {SNAPSHOT_DATE}</p>
      <p className="data mt-1.5 text-xs leading-relaxed text-ink-mute">
        Research snapshot {SNAPSHOT_DATE} — every figure was read from an official source on its
        cited date. Prices, limits, and promo windows change.
        {extra ? ` ${extra}` : ""}
      </p>
    </aside>
  );
}
