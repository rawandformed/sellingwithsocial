import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

/* Section 4. Why it is better than an agency: a simple side-by-side. */

const rows = [
  { label: "Ideas", agency: "When they get to it", inhouse: "New ones every week" },
  { label: "Changes", agency: "Wait in a queue", inhouse: "Live when you approve" },
  { label: "What you see", agency: "A monthly report", inhouse: "Everything, any time" },
  { label: "Who knows your business", agency: "A new account manager", inhouse: "You do" },
  { label: "Commitment", agency: "A long contract", inhouse: "Month to month" },
];

function Column({ title, tone, children }: { title: string; tone: "agency" | "inhouse"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-[20px] p-2 sm:rounded-[26px] sm:p-2.5",
        tone === "inhouse" ? "glass" : "border border-line bg-ink/[.025]",
      )}
    >
      <div
        className={cn(
          "h-full rounded-[14px] px-3 py-4 sm:rounded-[18px] sm:px-6 sm:py-6",
          tone === "inhouse" && "border border-white/70 bg-white/60",
        )}
      >
        <h3
          className={cn(
            "mb-2 text-[18px] leading-[1.15] tracking-[-.015em] sm:mb-3 sm:text-[26px]",
            tone === "agency" && "text-muted-foreground",
          )}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

export function Compare() {
  return (
    <section
      id="compare"
      aria-labelledby="compare-title"
      className="relative overflow-hidden border-y border-line bg-surface py-20 sm:py-[120px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="orb left-[calc(50%+80px)] top-[180px] size-[560px] bg-[#86b4ff] opacity-35" />
        <span className="orb left-[calc(50%+380px)] top-[480px] size-[320px] bg-[#ffd95a] opacity-35" />
      </div>
      <div className="wrap">
        <div className="mb-10 grid gap-3.5 sm:mb-14">
          <span className="eyebrow">Why it is better</span>
          <h2
            id="compare-title"
            className="max-w-[16ch] text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]"
          >
            Same work. No <span className="hl">middleman.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
          <Column title="An agency" tone="agency">
            {rows.map((r) => (
              <div key={r.label} className="grid min-h-[112px] content-center gap-1 border-t border-line py-3 sm:min-h-[84px]">
                <span className="text-[11px] font-bold uppercase leading-4 tracking-[.06em] text-faint sm:text-[12px]">
                  {r.label}
                </span>
                <span className="flex items-start gap-2 text-[14px] leading-5 text-muted-foreground sm:text-[17px] sm:leading-[26px]">
                  <X className="mt-[3px] size-3.5 shrink-0 text-hot sm:mt-[5px] sm:size-4" strokeWidth={2.25} />
                  {r.agency}
                </span>
              </div>
            ))}
          </Column>
          <Column title="In-house, with the system" tone="inhouse">
            {rows.map((r) => (
              <div key={r.label} className="grid min-h-[112px] content-center gap-1 border-t border-line py-3 sm:min-h-[84px]">
                <span className="text-[11px] font-bold uppercase leading-4 tracking-[.06em] text-blue-strong sm:text-[12px]">
                  {r.label}
                </span>
                <span className="flex items-start gap-2 text-[14px] font-semibold leading-5 sm:text-[17px] sm:leading-[26px]">
                  <Check className="mt-[3px] size-3.5 shrink-0 text-success sm:mt-[5px] sm:size-4" strokeWidth={2.5} />
                  {r.inhouse}
                </span>
              </div>
            ))}
          </Column>
        </div>
      </div>
    </section>
  );
}
