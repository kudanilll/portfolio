import { arrowPath, arrowUpRightPath } from "@/components/svg/arrow";
import { cn } from "@/lib/utils";

const Icon = ({ path, className }: { path: string; className: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={cn("absolute inset-0 m-auto size-[55%]", className)}
  >
    <path d={path} />
  </svg>
);

/**
 * A label and an arrow in a lime square. On the hover/focus of the link around
 * it (`group`), the lime spreads from the square over the whole button, the
 * label rolls up to its dark copy and a new arrow slides in. A <span>, since it
 * always sits inside a link. The copy is a ::after, so it stays out of the page
 * text, and `/ ''` keeps it out of the link's accessible name too.
 */
export function ArrowButton({
  label,
  upRight,
  className,
}: {
  label: string;
  upRight?: boolean;
  className?: string;
}) {
  const path = upRight ? arrowUpRightPath : arrowPath;

  return (
    <span
      className={cn(
        "relative flex h-[calc(var(--square)+2*var(--gap))] items-center justify-between gap-6 overflow-hidden bg-neutral-900 pr-(--gap) pl-4 text-base leading-normal font-medium tracking-tight text-white normal-case [--gap:0.375rem] [--square:2.25rem] motion-reduce:**:transition-none md:pl-5 md:text-lg md:[--square:2.75rem]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-lime-400 transition-[clip-path] duration-300 ease-in-out [clip-path:inset(var(--gap)_var(--gap)_var(--gap)_calc(100%-var(--gap)-var(--square)))] group-hover:[clip-path:inset(0)] group-focus-visible:[clip-path:inset(0)]"
      />

      <span className="relative overflow-hidden">
        <span
          data-text={label}
          className="relative block transition-transform duration-300 ease-in-out group-hover:-translate-y-full group-focus-visible:-translate-y-full after:absolute after:top-full after:left-0 after:text-[#0a0a0a] after:content-[attr(data-text)/'']"
        >
          {label}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="relative size-(--square) shrink-0 overflow-hidden transition-colors duration-300 ease-in-out group-hover:bg-[#0a0a0a] group-focus-visible:bg-[#0a0a0a]"
      >
        <Icon
          path={path}
          className={cn(
            "text-[#0a0a0a] transition-transform duration-300 ease-in-out group-hover:translate-x-[180%] group-focus-visible:translate-x-[180%]",
            upRight &&
              "group-hover:translate-y-[-180%] group-focus-visible:translate-y-[-180%]",
          )}
        />
        <Icon
          path={path}
          className={cn(
            "translate-x-[-180%] text-white transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-focus-visible:translate-x-0",
            upRight &&
              "translate-y-[180%] group-hover:translate-y-0 group-focus-visible:translate-y-0",
          )}
        />
      </span>
    </span>
  );
}
