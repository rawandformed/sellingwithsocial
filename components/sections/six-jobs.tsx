import {
  ArrowRight,
  FileText,
  Lightbulb,
  Palette,
  RefreshCw,
  Rocket,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

import { ExampleTag } from "@/components/ui/example-tag";
import { cn } from "@/lib/utils";

/*
  Section 3. Why it works in-house: the six jobs.

  Six large cards, one per job, each mostly a product-style visual. The cards
  are position: sticky, so each one slides up and rests over the last as the
  page scrolls. It is CSS only, and with reduced motion they simply stack.
  Every visual is an example and is tagged as one.
*/

function Window({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "w-full max-w-[540px] rounded-[18px] border border-line bg-white shadow-[0_24px_50px_-28px_rgba(20,48,96,.35),0_1px_2px_rgba(16,20,25,.05)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <b className="font-display text-[15px] font-bold tracking-[-.01em]">{title}</b>
        <ExampleTag />
      </div>
      <div className="grid gap-2 p-3 sm:p-4">{children}</div>
    </div>
  );
}

const rowClass =
  "flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5 text-[13.5px] leading-5 sm:text-[14.5px]";

function Status({ tone, children }: { tone: "ok" | "warn" | "bad" | "info"; children: React.ReactNode }) {
  const tones = {
    ok: "bg-[#e3f5ea] text-success",
    warn: "bg-yellow-soft text-yellow-ink",
    bad: "bg-[#fdecea] text-hot",
    info: "bg-blue-soft text-blue-strong",
  };
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-1 text-[11px] font-bold uppercase leading-none tracking-[.06em]",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

function IdeasVisual() {
  const ideas = [
    "Before and after: the bathroom reno",
    "Three signs your water heater is failing",
    "Meet the crew behind the van",
  ];
  return (
    <Window title="Ideas this week">
      {ideas.map((t, i) => (
        <div key={t} className={cn(rowClass, i === 0 && "border-blue/50 bg-blue-soft/60")}>
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-yellow-soft text-yellow-ink">
            <Lightbulb className="size-4" strokeWidth={1.75} />
          </span>
          <span className="min-w-0 flex-1 font-medium">{t}</span>
          {i === 0 ? <Status tone="info">Picked</Status> : <Status tone="warn">New</Status>}
        </div>
      ))}
    </Window>
  );
}

function CreatingVisual() {
  return (
    <Window title="Ad, made for you">
      <div className="grid grid-cols-[1fr_76px] gap-3 sm:grid-cols-[1fr_96px]">
        <div className="overflow-hidden rounded-xl border border-line">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <span className="size-7 rounded-full bg-blue" />
            <span className="text-[13px] font-semibold leading-4">
              Peak Plumbing
              <span className="block text-[11px] font-normal text-muted-foreground">Sponsored</span>
            </span>
          </div>
          <div className="grid h-[150px] place-items-center bg-linear-to-br from-[#cfe0fb] to-[#86b4ff] px-4 text-center sm:h-[170px]">
            <span className="font-display text-[22px] font-bold leading-[1.1] tracking-[-.02em] text-navy sm:text-[26px]">
              Water heater out?
              <br />
              Fixed today.
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 px-3 py-2.5">
            <span className="text-[13px] font-medium">Same-day water heater fix</span>
            <span className="shrink-0 rounded-md bg-ink/[.06] px-2.5 py-1.5 text-[12px] font-semibold">
              Get a quote
            </span>
          </div>
        </div>
        <div className="grid content-start gap-2">
          {["from-[#cfe0fb] to-[#86b4ff]", "from-[#fff1bf] to-[#ffd95a]", "from-[#d9efe2] to-[#8fd6ad]"].map(
            (g, i) => (
              <span
                key={g}
                className={cn(
                  "block aspect-[4/3] rounded-lg bg-linear-to-br",
                  g,
                  i === 0 && "outline-2 outline-offset-2 outline-blue-strong",
                )}
              />
            ),
          )}
        </div>
      </div>
    </Window>
  );
}

function ScriptingVisual() {
  const lines = [
    { t: "0:00", part: "Hook", text: "Is your water heater making this noise?" },
    { t: "0:05", part: "Problem", text: "That sound means it is close to failing." },
    { t: "0:15", part: "Fix", text: "We swap it the same day." },
    { t: "0:25", part: "Ask", text: "Tap below for a free quote." },
  ];
  return (
    <Window title="Video script">
      {lines.map((l) => (
        <div key={l.part} className={rowClass}>
          <span className="w-9 shrink-0 font-mono text-[12px] text-muted-foreground">{l.t}</span>
          <span className="w-[62px] shrink-0 text-[12px] font-bold uppercase tracking-[.06em] text-blue-strong">
            {l.part}
          </span>
          <span className="min-w-0 flex-1 font-medium">{l.text}</span>
        </div>
      ))}
      <div className="flex justify-end pt-1">
        <Status tone="ok">Ready to film</Status>
      </div>
    </Window>
  );
}

function LaunchingVisual() {
  return (
    <Window title="Launch">
      <div className={cn(rowClass, "bg-ink/[.03]")}>
        <span className="h-9 w-12 shrink-0 rounded-md bg-linear-to-br from-[#cfe0fb] to-[#86b4ff]" />
        <span className="min-w-0 flex-1 font-medium">Same-day water heater fix</span>
        <Status tone="info">Approved by you</Status>
      </div>
      {["Facebook", "Instagram", "Google"].map((p) => (
        <div key={p} className={rowClass}>
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-soft text-blue-strong">
            <Rocket className="size-4" strokeWidth={1.75} />
          </span>
          <span className="flex-1 font-medium">{p}</span>
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase leading-none tracking-[.06em] text-success">
            <span className="size-1.5 rounded-full bg-success" />
            Live
          </span>
        </div>
      ))}
    </Window>
  );
}

function ManagingVisual() {
  const ads = [
    { name: "Same-day water heater fix", w: "w-[88%]", best: true },
    { name: "Before and after: bathroom reno", w: "w-[46%]" },
    { name: "Meet the crew", w: "w-[18%]" },
  ];
  return (
    <Window title="Budget">
      {ads.map((a) => (
        <div key={a.name} className="grid gap-2 rounded-xl border border-line bg-white px-3 py-3">
          <div className="flex items-center justify-between gap-3 text-[13.5px] font-medium leading-5 sm:text-[14.5px]">
            <span className="min-w-0 truncate">{a.name}</span>
            {a.best && <Status tone="ok">Best</Status>}
          </div>
          <span className="block h-2 rounded-full bg-ink/[.06]">
            <span className={cn("block h-full rounded-full", a.w, a.best ? "bg-blue-strong" : "bg-blue/45")} />
          </span>
        </div>
      ))}
      <div className="flex items-center gap-2 px-1 pt-1 text-[13px] font-medium text-ink-2">
        <ArrowRight className="size-4 text-blue-strong" strokeWidth={2} />
        Budget moved to the best ad
      </div>
    </Window>
  );
}

function MaintainingVisual() {
  return (
    <Window title="Ad health">
      <div className={rowClass}>
        <span className="flex-1 font-medium">Same-day water heater fix</span>
        <Status tone="ok">Fresh</Status>
      </div>
      <div className={rowClass}>
        <span className="flex-1 font-medium">Before and after: bathroom reno</span>
        <Status tone="warn">Getting tired</Status>
      </div>
      <div className={cn(rowClass, "text-muted-foreground line-through decoration-hot/60")}>
        <span className="flex-1 font-medium">Meet the crew</span>
        <Status tone="bad">Tired</Status>
      </div>
      <div className={cn(rowClass, "border-blue/50 bg-blue-soft/60")}>
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-blue-strong">
          <RefreshCw className="size-4" strokeWidth={1.75} />
        </span>
        <span className="flex-1 font-medium">Swapped in: A day on the job</span>
        <Status tone="ok">Fresh</Status>
      </div>
    </Window>
  );
}

const jobs: { icon: LucideIcon; name: string; line: string; Visual: () => React.ReactNode; glow: string }[] = [
  { icon: Lightbulb, name: "Ideas", line: "Fresh ad ideas, every week.", Visual: IdeasVisual, glow: "from-[#fff6d6]" },
  { icon: Palette, name: "Creating", line: "The ads get made for you.", Visual: CreatingVisual, glow: "from-[#eef4fd]" },
  { icon: FileText, name: "Scripting", line: "Video scripts, ready to film.", Visual: ScriptingVisual, glow: "from-[#fff6d6]" },
  { icon: Rocket, name: "Launching", line: "You approve. It goes live.", Visual: LaunchingVisual, glow: "from-[#eef4fd]" },
  { icon: SlidersHorizontal, name: "Managing", line: "Budget follows what works.", Visual: ManagingVisual, glow: "from-[#fff6d6]" },
  { icon: RefreshCw, name: "Maintaining", line: "Tired ads get swapped out.", Visual: MaintainingVisual, glow: "from-[#eef4fd]" },
];

export function SixJobs() {
  return (
    <section id="jobs" aria-labelledby="jobs-title" className="relative py-20 sm:py-[120px]">
      <div className="wrap">
        <div className="mb-10 grid gap-3.5 sm:mb-14">
          <span className="eyebrow">Why it works in-house</span>
          <h2
            id="jobs-title"
            className="max-w-[16ch] text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]"
          >
            Six jobs. One <span className="hl">system.</span>
          </h2>
          <p className="max-w-[40ch] text-[18px] leading-7 text-ink-2 sm:text-[20px] sm:leading-[30px]">
            Everything your agency did, now running in-house.
          </p>
        </div>

        <div className="grid gap-5">
          {jobs.map((j, i) => (
            <article
              key={j.name}
              style={{ top: `calc(88px + ${i * 10}px)` }}
              className="sticky grid overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_-12px_40px_-24px_rgba(20,48,96,.25),0_1px_2px_rgba(16,20,25,.05)] motion-reduce:static lg:min-h-[500px] lg:grid-cols-[300px_1fr]"
            >
              <div className="flex items-center gap-4 p-5 sm:p-8 lg:flex-col lg:items-start lg:justify-center lg:gap-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-soft text-blue-strong lg:size-12">
                  <j.icon className="size-5 lg:size-6" strokeWidth={1.75} />
                </span>
                <div className="grid gap-1 lg:gap-2.5">
                  <h3 className="text-[24px] leading-[1.1] tracking-[-.02em] lg:text-[36px]">{j.name}</h3>
                  <p className="text-[15px] leading-[22px] text-ink-2 lg:text-[17px] lg:leading-[26px]">
                    {j.line}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  "grid place-items-center border-t border-line bg-linear-to-br to-white p-4 sm:p-8 lg:border-l lg:border-t-0 lg:p-12",
                  j.glow,
                )}
              >
                <j.Visual />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

