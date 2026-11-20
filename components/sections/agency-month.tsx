"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

/*
  Section 2. Why fire them: what a month with an agency looks like.

  A pinned scene. Scrolling walks through an example month one day at a time.
  The scroll position is written to the CSS variable --d (the current day), and
  every cell and caption works out its own state from it in CSS. Nothing
  re-renders while scrolling.

  Resting state (no script, or reduced motion): --d is 30, so the whole month
  is shown and the section lays out as a normal block.
*/

const DAYS = 30;

type Tone = "pay" | "wait" | "info";

const events: { day: number; label: string; tone: Tone; text: string }[] = [
  { day: 1, label: "Invoice", tone: "pay", text: "The retainer goes out." },
  { day: 4, label: "Kickoff", tone: "info", text: "A kickoff call. Big plans." },
  { day: 11, label: "Chasing", tone: "wait", text: "You ask what is running. No answer yet." },
  { day: 18, label: "Waiting", tone: "wait", text: "“We are testing a few things.”" },
  { day: 26, label: "Report", tone: "info", text: "A report lands. Nobody walks you through it." },
  { day: 30, label: "Invoice", tone: "pay", text: "The next retainer is due." },
];

const toneClass: Record<Tone, string> = {
  pay: "bg-yellow-soft text-yellow-ink",
  wait: "bg-[#fdecea] text-hot",
  info: "bg-blue-soft text-blue-strong",
};

const eventByDay = new Map(events.map((e) => [e.day, e]));

/** Days so far with nothing happening. */
function quietDays(day: number) {
  const d = Math.floor(day);
  return d - events.filter((e) => e.day <= d).length;
}

const fmtDay = (d: number) => `Day ${d}`;

/** 0 before the day arrives, 1 once it has passed. */
const reached = (day: number) => `clamp(0, calc(var(--d) - ${day - 1}), 1)`;

export function AgencyMonth() {
  const ref = useRef<HTMLElement>(null);
  const quietRef = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const day = useTransform(scrollYProgress, [0.04, 0.94], [1, DAYS], { clamp: true });

  const writeQuiet = (d: number) => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (quietRef.current) quietRef.current.textContent = String(quietDays(d));
  };
  useMotionValueEvent(day, "change", writeQuiet);
  useEffect(() => {
    writeQuiet(day.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.section
      ref={ref}
      id="story"
      aria-labelledby="story-title"
      style={{ "--d": day } as React.ComponentProps<typeof motion.section>["style"]}
      className="relative h-[320vh] border-t border-line bg-surface [--d:30] motion-reduce:h-auto motion-reduce:![--d:30]"
    >
      <div className="sticky top-0 flex h-svh items-center overflow-hidden pt-[72px] motion-reduce:static motion-reduce:h-auto motion-reduce:py-[120px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="orb left-[calc(50%+40px)] top-[calc(50%-320px)] size-[560px] bg-[#86b4ff] opacity-40" />
          <span className="orb left-[calc(50%+360px)] top-[calc(50%+40px)] size-[320px] bg-[#ffd95a] opacity-40" />
        </div>

        <div className="wrap grid items-center gap-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-[72px]">
          <div className="grid gap-4">
            <span className="eyebrow">Why fire them</span>
            <h2
              id="story-title"
              className="max-w-[12ch] text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]"
            >
              A month with an <span className="hl">agency.</span>
            </h2>
            <p className="max-w-[30ch] text-[18px] leading-7 text-ink-2 lg:text-[20px] lg:leading-[30px]">
              You pay on day one. After that, mostly silence.
            </p>
          </div>

          {/* The example month */}
          <div className="glass rounded-[26px] p-2.5">
            <div className="grid gap-3 rounded-[18px] border border-white/70 bg-white/50 p-3.5 sm:gap-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue-soft px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-[.06em] text-blue-strong">
                  Example month
                </span>
                <span className="flex items-baseline gap-2 text-[13px] font-semibold text-muted-foreground">
                  Quiet days
                  <span
                    ref={quietRef}
                    className="min-w-[2ch] text-right font-mono text-[20px] font-medium leading-none tracking-[-.02em] text-ink"
                  >
                    {quietDays(DAYS)}
                  </span>
                </span>
              </div>

              <div aria-hidden="true" className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {Array.from({ length: DAYS }, (_, i) => {
                  const d = i + 1;
                  const ev = eventByDay.get(d);
                  return (
                    <div
                      key={d}
                      className="relative aspect-square overflow-hidden rounded-lg border border-line bg-white sm:aspect-[5/4] sm:rounded-[10px]"
                    >
                      <span
                        style={{ opacity: reached(d) }}
                        className={cn(
                          "absolute inset-0 grid place-items-center pt-2.5 text-[11.5px] font-bold leading-none",
                          ev ? toneClass[ev.tone] : "bg-ink/[.05]",
                        )}
                      >
                        {ev && <span className="hidden sm:inline">{ev.label}</span>}
                      </span>
                      <span
                        className={cn(
                          "absolute left-1 top-1 font-mono text-[9.5px] leading-none sm:left-1.5 sm:top-1.5 sm:text-[10px]",
                          ev ? "text-ink/60" : "text-faint",
                        )}
                      >
                        {d}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* What happened on the current day */}
              <div aria-hidden="true" className="relative h-[58px] sm:h-[60px]">
                {events.map((e, i) => {
                  const next = events[i + 1]?.day ?? DAYS + 9;
                  return (
                    <div
                      key={e.day}
                      style={{
                        opacity: `min(clamp(0, calc((var(--d) - ${e.day}) * 3 + 1), 1), clamp(0, calc((${next} - var(--d)) * 3), 1))`,
                      }}
                      className="absolute inset-0 flex items-center gap-3.5 rounded-xl border border-line bg-white px-4 shadow-card"
                    >
                      <span
                        className={cn(
                          "shrink-0 rounded-md px-2 py-1.5 text-[12px] font-bold leading-none",
                          toneClass[e.tone],
                        )}
                      >
                        Day <span className="font-mono font-medium">{e.day}</span>
                      </span>
                      <span className="text-[14.5px] font-medium leading-5 sm:text-[15.5px]">
                        {e.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* The same month for screen readers */}
          <ol className="sr-only">
            {events.map((e) => (
              <li key={e.day}>
                {fmtDay(e.day)}: {e.text}
              </li>
            ))}
            <li>Quiet days in this example month: {quietDays(DAYS)}.</li>
          </ol>
        </div>

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 motion-reduce:hidden">
          <i
            style={{ width: `calc((var(--d) - 1) / ${DAYS - 1} * 100%)` }}
            className="block h-full bg-blue-strong opacity-50"
          />
        </div>
      </div>
    </motion.section>
  );
}
