import type { FaqItem } from "@/lib/offers";

export default function Faq({ items, id }: { items: FaqItem[]; id: string }) {
  return (
    <div>
      {items.map((f, i) => (
        <details
          key={`${id}-${i}`}
          className={`group py-1 ${i < items.length - 1 ? "border-b border-line" : ""}`}
        >
          <summary className="min-h-[44px] cursor-pointer content-center font-bold hover:text-teal-deep">
            {f.q}
          </summary>
          <p className="pb-2 text-ink-soft">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
