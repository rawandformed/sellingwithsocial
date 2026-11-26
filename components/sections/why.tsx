import { ArrowRight, Check } from "lucide-react";

import { ExampleTag } from "@/components/ui/example-tag";
import { cn } from "@/lib/utils";

/*
  Why we exist: the problem, the fix, and what makes this different.

  The visual is a before and after. On the left, the usual pile of separate
  tools with leads falling through. On the right, one system with a lead
  moving through it. Both are illustrations and the right one is tagged as an
  example.
*/

const lift = "shadow-[0_18px_36px_-16px_rgba(16,32,64,.4),0_2px_6px_rgba(16,32,64,.08)]";

const pile = [
  { name: "Ads manager", pos: "left-[2%] top-[4%] -rotate-6" },
  { name: "Page builder", pos: "left-[40%] top-[0%] rotate-3" },
  { name: "Inbox", pos: "left-[14%] top-[34%] rotate-2" },
  { name: "Spreadsheet", pos: "left-[48%] top-[30%] -rotate-3" },
  { name: "Texting app", pos: "left-[4%] top-[64%] rotate-6" },
  { name: "Calendar", pos: "left-[42%] top-[62%] -rotate-2" },
];

const flow = ["Ad", "Page", "Lead", "Reply", "Booked"];

const usps = [
  { title: "Built for selling services", text: "Not a general CRM bent into shape." },
  { title: "Tools and know-how", text: "The software, plus the scripts and templates to use it." },
  { title: "You stay in control", text: "Your account, your ads, your leads." },
];

function Missed({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "absolute z-10 rounded-full bg-[#fdecea] px-2.5 py-1.5 text-[11px] font-bold uppercase leading-none tracking-[.06em] text-hot",
        lift,
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Why() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="relative overflow-hidden border-y border-line bg-surface py-20 sm:py-[120px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="orb left-[calc(50%+160px)] top-[260px] size-[520px] bg-[#86b4ff] opacity-30" />
      </div>

      <div className="wrap">
        <div className="mb-10 grid gap-3.5 sm:mb-14">
          <span className="eyebrow">Why we built it</span>
          <h2
            id="why-title"
            className="max-w-[20ch] text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]"
          >
            Social gets you attention. Then the leads slip away.
          </h2>
          <p className="max-w-[46ch] text-[18px] leading-7 text-ink-2 sm:text-[20px] sm:leading-[30px]">
            They get lost between separate tools. So we put everything in one system.
          </p>
        </div>

        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* Before: a pile of separate tools */}
          <div className="rounded-[26px] border border-line bg-ink/[.025] p-5 sm:p-7">
            <span className="eyebrow text-hot">Without it</span>
            <div aria-hidden="true" className="relative mt-4 h-[300px] sm:h-[330px]">
              {pile.map((t) => (
                <div
                  key={t.name}
                  className={cn(
                    "absolute w-[50%] rounded-xl border border-line bg-white p-3 grayscale",
                    lift,
                    t.pos,
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <i className="size-1.5 rounded-full bg-ink/25" />
                    <b className="text-[12.5px] font-semibold text-ink-2">{t.name}</b>
                  </div>
                  <i className="mt-2.5 block h-1.5 w-4/5 rounded-full bg-ink/10" />
                  <i className="mt-1.5 block h-1.5 w-3/5 rounded-full bg-ink/[.07]" />
                </div>
              ))}
              <Missed className="left-[30%] top-[24%] -rotate-3">Lead missed</Missed>
              <Missed className="right-[2%] top-[54%] rotate-2">No reply sent</Missed>
              <Missed className="bottom-[2%] left-[26%] -rotate-2">Forgot to follow up</Missed>
            </div>
            <p className="sr-only">
              Six separate tools: ads manager, page builder, inbox, spreadsheet, texting app and calendar.
              Leads get missed, replies are not sent and follow-up is forgotten.
            </p>
          </div>

          <span
            aria-hidden="true"
            className="mx-auto grid size-11 rotate-90 place-items-center rounded-full bg-ink text-white lg:rotate-0"
          >
            <ArrowRight className="size-5" strokeWidth={2.25} />
          </span>

          {/* After: one system */}
          <div className="glass rounded-[26px] p-2.5">
            <div className="rounded-[18px] border border-white/70 bg-white/60 p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="eyebrow">With it</span>
                <ExampleTag />
              </div>

              <div className="mt-6 flex items-center">
                {flow.map((f, i) => (
                  <div key={f} className="flex flex-1 items-center last:flex-none">
                    <span className="grid justify-items-center gap-2">
                      <span className="grid size-9 place-items-center rounded-full bg-blue-strong text-white sm:size-10">
                        <Check className="size-4" strokeWidth={2.75} />
                      </span>
                      <b className="text-[12px] font-semibold sm:text-[13px]">{f}</b>
                    </span>
                    {i < flow.length - 1 && <i className="mx-1 mb-6 h-0.5 flex-1 rounded-full bg-blue-strong/35" />}
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-2.5">
                {[
                  { who: "Maria L.", what: "Asked for a quote", state: "Replied" },
                  { who: "Sam O.", what: "Follow-up sent", state: "Booked" },
                  { who: "Dana K.", what: "Came from your video ad", state: "New" },
                ].map((r) => (
                  <div
                    key={r.who}
                    className="flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3 text-[14px] shadow-card sm:text-[15px]"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-soft text-[12px] font-bold text-blue-strong">
                      {r.who[0]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <b className="font-semibold">{r.who}</b>
                      <span className="block truncate text-[13px] text-muted-foreground">{r.what}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-[#e3f5ea] px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-[.06em] text-success">
                      {r.state}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What makes it different */}
        <div className="mt-10 grid gap-6 border-t border-line pt-9 sm:mt-14 sm:grid-cols-3 sm:gap-10">
          {usps.map((u) => (
            <div key={u.title} className="grid content-start gap-2">
              <h3 className="text-[21px] leading-[1.2] tracking-[-.015em]">{u.title}</h3>
              <p className="text-[16px] leading-[25px] text-ink-2">{u.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
