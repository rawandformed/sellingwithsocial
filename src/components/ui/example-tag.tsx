import { cn } from "@/lib/utils";

/** Marks a mock screen as illustrative. Every mock on the site carries one. */
export function ExampleTag({ children = "Example", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-blue-soft px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-[.06em] text-blue-strong",
        className,
      )}
    >
      {children}
    </span>
  );
}
