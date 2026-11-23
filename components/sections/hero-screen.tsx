"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Images, Link2, PhoneIncoming, Rocket, Wallet, type LucideIcon } from "lucide-react";

import { ExampleTag } from "@/components/ui/example-tag";
import { cn } from "@/lib/utils";

/*
  Example product screen for the hero frame: the system as a sequence, start
  to finish. The steps light up one colour at a time as the page scrolls.

  Scroll position is written to the CSS variable --s (1 to 5, the step
  reached). Each step works out how lit it is from that in CSS. With no
  script or reduced motion --s is 5, so every step is lit.
*/

type Tone = "blue" | "yellow" | "strong" | "green" | "navy";

const tone: Record<Tone, { chip: string; bar: string }> = {
  blue: { chip: "bg-blue-soft text-blue-strong", bar: "bg-blue" },
  yellow: { chip: "bg-yellow-soft text-yellow-ink", bar: "bg-yellow" },
  strong: { chip: "bg-blue-strong text-white", bar: "bg-blue-strong" },
  green: { chip: "bg-[#e3f5ea] text-success", bar: "bg-success" },
  navy: { chip: "bg-navy text-yellow", bar: "bg-navy" },
};

function LinkMock() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-white p-1.5 pl-2.5">
      <span className="min-w-0 flex-1 truncate text-[12px] text-ink-2">peakplumbing.com</span>
      <span className="grid size-6 shrink-0 place-items-center rounded-md bg-blue-strong text-white">
        <ArrowRight className="size-3.5" strokeWidth={2.5} />
      </span>
    </div>
  );
}
function AdsMock() {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <span className="block aspect-[4/3] rounded-md bg-linear-to-br from-[#cfe0fb] to-[#86b4ff]" />
      <span className="block aspect-[4/3] rounded-md bg-linear-to-br from-[#fff1bf] to-[#ffd95a]" />
    </div>
  );
}
function LaunchMock() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-line bg-white px-2.5 py-2 text-[12px] font-medium">
      Your ads
      <span className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[.06em] text-success">
        <span className="size-1.5 rounded-full bg-success" />
        Live
      </span>
    </div>
  );
}
function LeadsMock() {
  return (
    <div className="grid gap-1.5">
      {["New call", "Quote request"].map((t) => (
        <div
          key={t}
          className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-1.5 text-[12px] font-medium"
        >
          <span className="size-1.5 rounded-full bg-success" />
          {t}
        </div>
      ))}
    </div>
  );
}
function FeeMock() {
  return (
    <div className="grid gap-1.5 text-[12px] font-medium">
      <span className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-muted-foreground line-through decoration-hot/70">
        Agency retainer
      </span>
      <span className="rounded-lg bg-yellow px-2.5 py-1.5 font-semibold text-ink">Stays with you</span>
    </div>
  );
}

const steps: { icon: LucideIcon; title: string; text: string; tone: Tone; Mock: () => React.ReactNode }[] = [
  { icon: Link2, title: "Paste your link", text: "Your website is all it needs.", tone: "blue", Mock: LinkMock },
  { icon: Images, title: "Get your ads", text: "Made for your business.", tone: "yellow", Mock: AdsMock },
  { icon: Rocket, title: "Launch them", text: "You approve. They go live.", tone: "strong", Mock: LaunchMock },
  { icon: PhoneIncoming, title: "Leads come in", text: "Calls and quote requests.", tone: "green", Mock: LeadsMock },
  { icon: Wallet, title: "Keep the fee", text: "No retainer to pay.", tone: "navy", Mock: FeeMock },
];

/** How lit step i is: 0 before the scroll reaches it, 1 once it has. */
const litStyle = (i: number) =>
  ({
    "--lit": `clamp(0, calc(var(--s) - ${i}), 1)`,
    filter: "grayscale(calc(1 - var(--lit)))",
    opacity: "calc(0.38 + 0.62 * var(--lit))",
  }) as React.CSSProperties;

export function HeroScreen() {
  const { scrollY } = useScroll();
  const step = useTransform(scrollY, [0, 380], [1, steps.length], { clamp: true });

  return (
    <motion.div
      style={{ "--s": step } as React.ComponentProps<typeof motion.div>["style"]}
      className="flex h-full flex-col text-left text-ink [--s:5] motion-reduce:![--s:5]"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-5">
        <div className="flex items-center gap-2.5">
          <Image src="/assets/mark.png" alt="" width={192} height={205} className="h-6 w-auto" />
          <span className="font-display text-[15px] font-bold tracking-[-.01em]">The system</span>
        </div>
        <ExampleTag />
      </div>

      {/* Phone: the sequence top to bottom */}
      <ol className="relative m-0 grid flex-1 list-none content-center gap-2 p-3 md:hidden">
        {steps.map((s, i) => (
          <li
            key={s.title}
            style={litStyle(i)}
            className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5"
          >
            <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", tone[s.tone].chip)}>
              <s.icon className="size-[18px]" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <b className="block text-[14.5px] font-semibold leading-5">{s.title}</b>
              <span className="block truncate text-[12.5px] leading-[18px] text-muted-foreground">{s.text}</span>
            </span>
            <span className={cn("h-8 w-1 shrink-0 rounded-full", tone[s.tone].bar)} />
          </li>
        ))}
      </ol>

      {/* Desktop: the sequence left to right */}
      <div className="hidden min-h-0 flex-1 flex-col justify-center gap-6 px-7 py-6 md:flex">
        <div className="flex items-baseline justify-between">
          <b className="font-display text-[22px] font-bold tracking-[-.015em]">Start to finish</b>
          <span className="text-[13px] text-muted-foreground">Scroll to follow it through</span>
        </div>

        {/* Rail that fills as the steps light */}
        <div aria-hidden="true" className="relative mx-[10%] h-1 rounded-full bg-ink/[.07]">
          <span
            style={{ width: `calc((var(--s) - 1) / ${steps.length - 1} * 100%)` }}
            className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-blue via-yellow to-success"
          />
        </div>

        <ol className="m-0 grid list-none grid-cols-5 gap-3 p-0">
          {steps.map((s, i) => (
            <li
              key={s.title}
              style={litStyle(i)}
              className="relative flex min-h-[300px] flex-col gap-3 overflow-hidden rounded-2xl border border-line bg-white p-4 shadow-card"
            >
              <span className={cn("absolute inset-x-0 top-0 h-1.5", tone[s.tone].bar)} />
              <span className={cn("mt-2 grid size-11 place-items-center rounded-xl", tone[s.tone].chip)}>
                <s.icon className="size-5" strokeWidth={1.75} />
              </span>
              <div className="grid gap-1">
                <b className="font-display text-[18px] font-bold leading-[1.15] tracking-[-.015em]">{s.title}</b>
                <span className="text-[13px] leading-[19px] text-muted-foreground">{s.text}</span>
              </div>
              <div className="mt-auto">
                <s.Mock />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
