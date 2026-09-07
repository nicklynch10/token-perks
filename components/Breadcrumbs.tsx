import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-mute">
      <ol className="flex flex-wrap items-center gap-1">
        {trail.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className="px-1">
                /
              </span>
            )}
            {c.href && i < trail.length - 1 ? (
              <Link
                href={c.href}
                className="inline-flex min-h-[44px] items-center underline decoration-line-strong hover:text-ink"
              >
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
