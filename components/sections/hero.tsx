"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const events = [
  { time: "9:02", text: "Missed call from (303) 555-0142", tag: "New", tone: "new" },
  {
    time: "9:02",
    text: 'Text-back sent: "Sorry we missed you. How can we help?"',
    tag: "AI",
    tone: "ai",
  },
  { time: "9:04", text: "Booked: water heater, Tuesday 9:00am", tag: "Booked", tone: "ok" },
  { time: "9:04", text: "$60 deposit paid by text", tag: "Paid", tone: "pay" },
] as const;

const tagTone = {
  new: "bg-navy text-white",
  ai: "bg-blue-soft text-blue-strong",
  ok: "bg-[#e3f5ea] text-success",
  pay: "bg-yellow-soft text-yellow-ink",
} as const;

const stats = [
  { label: "First reply", value: "Under 60 sec" },
  { label: "Set up", value: "Under 7 days" },
  { label: "Open", value: "24/7" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  /* Page scroll drives the glow parallax; hero progress drives the card tilt.
     Reduced motion is handled in CSS (motion-reduce) so server and client markup match. */
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const blueY = useTransform(scrollY, (v) => v * -0.12);
  const yellowY = useTransform(scrollY, (v) => v * -0.22);
  const tilt = useTransform(scrollYProgress, [0, 0.8], [8, 0], { clamp: true });
  const lift = useTransform(scrollYProgress, [0, 0.8], [0, -20], { clamp: true });

  return (
    <header
      ref={ref}
      id="hero"
      className="relative overflow-hidden pb-16 pt-[calc(124px+env(safe-area-inset-top,0px))] sm:pb-[88px] sm:pt-[calc(168px+env(safe-area-inset-top,0px))]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <span className="orb left-[calc(50%-120px)] top-[-200px] size-[520px] bg-[#c6dff0] opacity-60" />
        <motion.span
          style={{ y: blueY }}
          className="orb motion-reduce:!transform-none left-[calc(50%-560px)] top-[300px] size-[620px] bg-[#86b4ff]"
        />
        <motion.span
          style={{ y: yellowY }}
          className="orb motion-reduce:!transform-none left-[calc(50%+140px)] top-[420px] size-[420px] bg-[#ffd95a] opacity-50"
        />
      </div>

      <div className="wrap grid justify-items-center gap-6 text-center">
        <span className="eyebrow">For service businesses that run on the phone</span>
        <h1 className="max-w-[14ch] text-[clamp(40px,5.6vw,72px)] leading-[1.083]">
          Turn missed calls into <span className="hl">booked jobs.</span>
        </h1>
        <p className="mx-auto max-w-[46ch] text-[18px] leading-7 text-ink-2 sm:text-[20px] sm:leading-[30px]">
          We answer every call, book the job, take the deposit and ask for the review. Set up for
          your business in 7 days.
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-6">
          <ButtonLink href="#book">Book a call</ButtonLink>
          <ButtonLink href="#system" variant="link">
            See how it works
          </ButtonLink>
        </div>
        <p className="text-[13px] text-muted-foreground">
          A short call to see if it fits your business.
        </p>

        {/* Product frame. Tilts back at rest and flattens as the page scrolls. */}
        <div className="mt-10 w-full max-w-[720px] [perspective:1200px]">
          <motion.div
            aria-label="Example: one missed call handled by Selling with Social"
            style={{ rotateX: tilt, y: lift }}
            className="glass motion-reduce:!transform-none rounded-[26px] p-2.5"
          >
            <div className="grid gap-2.5 rounded-[18px] border border-white/70 bg-white/45 px-[22px] py-[26px] text-left">
              <div className="mb-3.5 flex items-center gap-2">
                <span className="size-[7px] rounded-full bg-success shadow-[0_0_0_4px_rgba(31,138,76,.14)] animate-[blink_2s_ease-in-out_infinite]" />
                <span className="eyebrow">Live example · Peak Plumbing</span>
              </div>
              {events.map((e, i) => (
                <div
                  key={e.text}
                  style={{ "--i": i - 1 } as React.CSSProperties}
                  className={cn(
                    "grid grid-cols-[44px_1fr] items-center gap-4 rounded-xl border border-white/95 bg-white/[.88] px-4 py-[13px] text-[14px] shadow-[0_1px_2px_rgba(16,20,25,.04)] sm:grid-cols-[56px_1fr_auto] sm:text-[15px]",
                    i > 0 && "settle",
                  )}
                >
                  <time className="font-mono text-[12px] font-medium leading-4 tracking-[.02em] text-muted-foreground">
                    {e.time}
                  </time>
                  <span>{e.text}</span>
                  <span
                    className={cn(
                      "hidden rounded-full px-2 py-[3px] text-[11px] font-bold uppercase leading-[1.2] tracking-[.06em] sm:inline",
                      tagTone[e.tone],
                    )}
                  >
                    {e.tag}
                  </span>
                </div>
              ))}
              <p className="mt-3 text-center text-[13px] font-medium leading-[18px] tracking-[.01em] text-muted-foreground">
                Example flow
              </p>
            </div>
          </motion.div>
        </div>

        <div className="glass mx-auto mt-16 grid max-w-[800px] grid-cols-1 rounded-card sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "grid gap-1.5 px-4 py-6 text-center",
                i > 0 && "border-t border-ink/[.08] sm:border-l sm:border-t-0",
              )}
            >
              <span className="eyebrow">{s.label}</span>
              <b className="font-display text-[26px] font-bold leading-[1.1] tracking-[-.02em]">
                {s.value}
              </b>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
