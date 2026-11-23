"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Link2 } from "lucide-react";

import { ExampleTag } from "@/components/ui/example-tag";
import { cn } from "@/lib/utils";

/*
  Example product screen for the hero frame: the system as a sequence, start
  to finish. Each step is a layered scene built from true-to-life interface
  pieces (a browser window, finished ads, a phone feed, notifications), and
  the steps light up from grey to full colour, one at a time, as the page
  scrolls. No photos are used.

  Scroll position is written to the CSS variable --s (1 to 4, the step
  reached). Each step works out how lit it is from that in CSS. With no
  script or reduced motion --s is 4, so every step is lit.
*/

const lift = "shadow-[0_18px_36px_-14px_rgba(16,32,64,.45),0_2px_6px_rgba(16,32,64,.12)]";

type Creative = { bg: string; kicker: string; line: string; accent: string };

const creative: Record<"reno" | "tap" | "crew", Creative> = {
  reno: { bg: "bg-linear-to-br from-[#0f2038] to-[#356ec6]", kicker: "Before and after", line: "Bathroom reno, done right.", accent: "text-yellow" },
  tap: { bg: "bg-linear-to-br from-[#ffcf34] to-[#ffb020]", kicker: "Same-day fix", line: "Leaking tap? Fixed today.", accent: "text-navy/70" },
  crew: { bg: "bg-linear-to-br from-[#1f8a4c] to-[#0f5a30]", kicker: "Local and licensed", line: "Meet the crew behind the van.", accent: "text-white/75" },
};

/** The ad artwork itself: a designed graphic, the way most local ads are made. */
function Artwork({ c, className }: { c: Creative; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", c.bg, className)}>
      <span className="absolute -right-6 -top-8 size-24 rounded-full bg-white/15" />
      <span className="absolute -bottom-10 -left-4 size-28 rounded-full bg-black/10" />
      <div className={cn("relative flex h-full flex-col justify-end p-2.5", c === creative.tap ? "text-navy" : "text-white")}>
        <span className={cn("text-[8px] font-bold uppercase tracking-[.08em]", c.accent)}>{c.kicker}</span>
        <b className="font-display text-[15px] font-bold leading-[1.05] tracking-[-.02em]">{c.line}</b>
      </div>
    </div>
  );
}

/** A small sponsored post, the way it looks in a feed. */
function AdCard({ c, headline, className }: { c: Creative; headline: string; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl bg-white", lift, className)}>
      <div className="flex items-center gap-1.5 px-2 py-1.5">
        <span className="grid size-5 place-items-center rounded-full bg-blue-strong text-[9px] font-bold text-white">
          P
        </span>
        <span className="text-[10px] font-semibold leading-3">
          Peak Plumbing
          <span className="block text-[8.5px] font-normal text-muted-foreground">Sponsored</span>
        </span>
      </div>
      <Artwork c={c} className="h-[92px] w-full" />
      <div className="flex items-center justify-between gap-1.5 bg-[#f3f4f6] px-2 py-1.5">
        <span className="text-[10px] font-semibold leading-[13px]">{headline}</span>
        <span className="shrink-0 rounded-[5px] bg-ink/10 px-1.5 py-1 text-[8.5px] font-bold">Get quote</span>
      </div>
    </div>
  );
}

/* Step 1. The owner's website, with its link dropped into the system. */
function LinkScene() {
  return (
    <div className="relative h-full bg-linear-to-b from-[#dbe8fd] to-[#f4f8ff]">
      <div className={cn("absolute inset-x-[9%] bottom-[-14px] -rotate-2 overflow-hidden rounded-xl bg-white", lift)}>
        <div className="flex items-center gap-1 border-b border-line bg-[#f3f4f6] px-2 py-1.5">
          <i className="size-1.5 rounded-full bg-[#ef6b5e]" />
          <i className="size-1.5 rounded-full bg-[#f5be4f]" />
          <i className="size-1.5 rounded-full bg-[#5fc55a]" />
        </div>
        <div className="flex items-center justify-between px-2.5 py-1.5">
          <b className="font-display text-[10px] font-bold tracking-[-.01em]">Peak Plumbing</b>
          <span className="flex gap-1.5">
            <i className="h-1 w-4 rounded-full bg-ink/15" />
            <i className="h-1 w-4 rounded-full bg-ink/15" />
            <i className="h-1 w-4 rounded-full bg-ink/15" />
          </span>
        </div>
        <div className="grid gap-1.5 bg-linear-to-br from-[#0f2038] to-[#27467a] px-2.5 py-3 text-white">
          <b className="font-display text-[15px] font-bold leading-[1.08] tracking-[-.02em]">
            Bathrooms, heating and repairs.
          </b>
          <span className="w-max rounded-full bg-yellow px-2 py-1 text-[8.5px] font-bold text-ink">
            Get a free quote
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-2.5 pb-5">
          {[0, 1, 2].map((k) => (
            <span key={k} className="grid gap-1 rounded-md border border-line p-1.5">
              <i className="h-4 rounded-sm bg-blue-soft" />
              <i className="h-1 w-4/5 rounded-full bg-ink/15" />
              <i className="h-1 w-3/5 rounded-full bg-ink/10" />
            </span>
          ))}
        </div>
      </div>
      <div
        className={cn(
          "absolute inset-x-[5%] top-5 flex items-center gap-1.5 rounded-full border border-white bg-white py-1.5 pl-2.5 pr-1.5",
          lift,
        )}
      >
        <Link2 className="size-3.5 shrink-0 text-blue-strong" strokeWidth={2.25} />
        <span className="min-w-0 flex-1 truncate text-[11px] font-medium">
          peakplumbing.com
          <i className="ml-px inline-block h-3 w-px translate-y-[2px] animate-pulse bg-ink" />
        </span>
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-strong text-white">
          <ArrowRight className="size-3.5" strokeWidth={2.5} />
        </span>
      </div>
    </div>
  );
}

/* Step 2. Finished ads, fanned out. */
function AdsScene() {
  return (
    <div className="relative h-full bg-linear-to-b from-[#fff0bd] to-[#fffaea]">
      <AdCard
        c={creative.reno}
        headline="Peak Plumbing"
        className="absolute left-[30%] top-6 w-[64%] rotate-6 opacity-95"
      />
      <AdCard
        c={creative.tap}
        headline="Peak Plumbing"
        className="absolute left-[6%] top-12 w-[66%] -rotate-[5deg]"
      />
    </div>
  );
}

/* Step 3. The ad running in a phone feed, switched on. */
function LaunchScene() {
  return (
    <div className="relative h-full bg-linear-to-b from-[#cfdcf6] to-[#eef3fc]">
      <div
        className={cn(
          "absolute left-1/2 top-5 w-[58%] -translate-x-1/2 overflow-hidden rounded-[20px] border-[5px] border-ink bg-white",
          lift,
        )}
      >
        <div className="mx-auto mt-1 h-1 w-8 rounded-full bg-ink/15" />
        <div className="flex items-center gap-1.5 px-2 py-1.5">
          <span className="grid size-4 place-items-center rounded-full bg-blue-strong text-[8px] font-bold text-white">
            P
          </span>
          <span className="text-[8.5px] font-semibold leading-[10px]">
            Peak Plumbing
            <span className="block text-[7.5px] font-normal text-muted-foreground">Sponsored</span>
          </span>
        </div>
        <Artwork c={creative.tap} className="h-[64px] w-full" />
        <div className="grid gap-1 px-2 py-2">
          <span className="h-1.5 w-4/5 rounded-full bg-ink/15" />
          <span className="h-1.5 w-3/5 rounded-full bg-ink/10" />
          <span className="mt-1 h-5 rounded-md bg-ink/[.07]" />
        </div>
      </div>
      <span
        className={cn(
          "absolute right-[7%] top-9 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[.06em] text-success",
          lift,
        )}
      >
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
          <span className="relative size-2 rounded-full bg-success" />
        </span>
        Live
      </span>
      <div className="absolute bottom-3 left-[6%] grid gap-1.5">
        {["Facebook", "Instagram", "Google"].map((p, i) => (
          <span
            key={p}
            style={{ marginLeft: i * 7 }}
            className={cn(
              "flex w-max items-center gap-1.5 rounded-full bg-white px-2 py-1 text-[10px] font-semibold",
              lift,
            )}
          >
            <span className="size-1.5 rounded-full bg-success" />
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Step 4. Leads arriving as phone notifications, stacked. */
function LeadsScene() {
  const notes = [
    { title: "New call", sub: "(303) 555-0142", when: "now" },
    { title: "Quote request", sub: "Water heater · Maria L.", when: "2m" },
    { title: "Booked", sub: "Tuesday 9:00am", when: "9m" },
  ];
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#14553a] to-[#0b2d1f]" />
      <span className="absolute -right-10 -top-10 size-40 rounded-full bg-[#4fc283]/30 blur-2xl" />
      <span className="absolute -bottom-12 -left-8 size-36 rounded-full bg-yellow/20 blur-2xl" />
      <div className="absolute inset-x-[7%] top-7 grid">
        {notes.map((n, i) => (
          <div
            key={n.title}
            style={{
              gridArea: "1 / 1",
              transform: `translateY(${i * 58}px) scale(${1 - i * 0.05})`,
              opacity: 1 - i * 0.16,
              zIndex: notes.length - i,
            }}
            className={cn("flex items-center gap-2 rounded-2xl bg-white/[.94] px-2.5 py-2 backdrop-blur", lift)}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-blue-soft">
              <Image src="/assets/mark.png" alt="" width={192} height={205} className="h-4 w-auto" />
            </span>
            <span className="min-w-0 flex-1 leading-none">
              <b className="block text-[11.5px] font-bold leading-[14px]">{n.title}</b>
              <span className="block truncate text-[10.5px] leading-[14px] text-ink-2">{n.sub}</span>
            </span>
            <span className="self-start text-[9px] text-muted-foreground">{n.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const steps: { title: string; text: string; bar: string; Scene: () => React.ReactNode }[] = [
  { title: "Paste your link", text: "Your website is all it needs.", bar: "bg-blue", Scene: LinkScene },
  { title: "Get your ads", text: "Made for your business.", bar: "bg-yellow", Scene: AdsScene },
  { title: "Launch them", text: "You approve. They go live.", bar: "bg-blue-strong", Scene: LaunchScene },
  { title: "Leads come in", text: "Calls and quote requests.", bar: "bg-success", Scene: LeadsScene },
];

/** How lit step i is: 0 before the scroll reaches it, 1 once it has. */
const litStyle = (i: number) =>
  ({
    "--lit": `clamp(0, calc(var(--s) - ${i}), 1)`,
    filter: "grayscale(calc(1 - var(--lit)))",
    opacity: "calc(0.42 + 0.58 * var(--lit))",
  }) as React.CSSProperties;

/* Scenes are drawn at one size, then scaled down on phones and up on desktop. */
const SCENE_H = 250;

export function HeroScreen() {
  const { scrollY } = useScroll();
  const step = useTransform(scrollY, [0, 380], [1, steps.length], { clamp: true });

  return (
    <motion.div
      style={{ "--s": step } as React.ComponentProps<typeof motion.div>["style"]}
      className="flex h-full flex-col text-left text-ink [--s:4] motion-reduce:![--s:4]"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-5">
        <div className="flex items-center gap-2.5">
          <Image src="/assets/mark.png" alt="" width={192} height={205} className="h-6 w-auto" />
          <span className="font-display text-[15px] font-bold tracking-[-.01em]">The system</span>
        </div>
        <ExampleTag />
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 p-2.5 md:gap-5 md:px-6 md:py-5">
        <div className="hidden items-baseline justify-between md:flex">
          <b className="font-display text-[22px] font-bold tracking-[-.015em]">Start to finish</b>
          <span className="text-[13px] text-muted-foreground">Four steps. The system runs them.</span>
        </div>

        {/* Rail that fills as the steps light */}
        <div aria-hidden="true" className="relative mx-[12%] hidden h-1 rounded-full bg-ink/[.07] md:block">
          <span
            style={{ width: `calc((var(--s) - 1) / ${steps.length - 1} * 100%)` }}
            className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-blue via-yellow to-success"
          />
        </div>

        <ol className="m-0 grid list-none grid-cols-2 gap-2 p-0 md:grid-cols-4 md:gap-3.5">
          {steps.map((s, i) => (
            <li
              key={s.title}
              style={litStyle(i)}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card"
            >
              <div
                style={{ "--scene-h": `${SCENE_H}px` } as React.CSSProperties}
                className="relative h-[calc(var(--scene-h)*var(--k))] overflow-hidden [--k:0.55] md:[--k:1.12]"
              >
                <div className="h-(--scene-h) w-[calc(100%/var(--k))] origin-top-left scale-(--k)">
                  <s.Scene />
                </div>
                <span className={cn("absolute inset-x-0 bottom-0 h-1", s.bar)} />
              </div>
              <div className="grid gap-0.5 px-3 py-2.5 md:gap-1 md:px-4 md:py-4">
                <b className="font-display text-[14px] font-bold leading-[1.15] tracking-[-.015em] md:text-[19px]">
                  {s.title}
                </b>
                <span className="hidden text-[13px] leading-[19px] text-muted-foreground md:block">{s.text}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
