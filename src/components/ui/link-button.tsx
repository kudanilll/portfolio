import { cn } from "@/lib/utils";

/**
 * Text with an underline that draws in from the left and an arrow that fades
 * in on hover/focus.
 * - With `onClick` it renders a <button> that reacts to its own hover.
 * - Without it, it renders a <span> for use inside another link (e.g. a card
 *   wrapped in <a className="group">), since a <button> inside an <a> is
 *   invalid HTML; the parent's hover/focus drives the effect.
 */
export function LinkButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const Tag = onClick ? "button" : "span";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "group relative flex w-fit items-center",
        "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out",
        "hover:before:origin-left hover:before:scale-x-100 focus-visible:before:origin-left focus-visible:before:scale-x-100",
        "group-hover:before:origin-left group-hover:before:scale-x-100 group-focus-visible:before:origin-left group-focus-visible:before:scale-x-100",
        className,
      )}
    >
      {children}
      <svg
        className="ml-[0.3em] mt-0 size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Tag>
  );
}
