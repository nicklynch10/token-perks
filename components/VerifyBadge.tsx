const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** ISO dates (2026-09-06) render as the readable ledger form (Sep 6 2026). */
function fmtDate(date: string): string {
  const m = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return date;
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])} ${m[1]}`;
}

export default function VerifyBadge({
  date,
  variant = "chip",
}: {
  date: string;
  variant?: "chip" | "stamp";
}) {
  if (variant === "stamp") {
    return <span className="stamp stamp-teal">Verified · {fmtDate(date)}</span>;
  }
  return (
    <span className="data inline-flex items-center gap-1.5 rounded-full bg-teal-wash px-3 py-1 text-xs font-semibold text-teal-deep">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M5.2 8.2l2 2 3.6-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Verified {fmtDate(date)}
    </span>
  );
}
