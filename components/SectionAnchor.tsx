/**
 * A quiet "#" affordance next to a section heading. Clicking it puts
 * `#section` in the address bar — the visitor copies the URL to share a
 * deep link to exactly this block (audit item: section anchors on
 * /crossover/ and the teams guide).
 */
export default function SectionAnchor({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      aria-label={`Copy link to: ${label}`}
      title={`Link to “${label}”`}
      className="ml-2 inline-flex min-h-[40px] items-center align-middle text-base font-normal text-ink-mute no-underline hover:text-teal-deep hover:underline focus-visible:text-teal-deep touch:min-h-[44px]"
    >
      #
    </a>
  );
}
