import Image from "next/image";
import {
  Check,
  FileText,
  Lightbulb,
  Palette,
  RefreshCw,
  Rocket,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

/* Example product screen for the hero frame. Everything here is illustrative
   and the screen says so in its top bar. */

const jobs: { icon: LucideIcon; name: string; status: string }[] = [
  { icon: Lightbulb, name: "Ideas", status: "New ad ideas, every week" },
  { icon: Palette, name: "Creating", status: "Ads made for you" },
  { icon: FileText, name: "Scripting", status: "Video script, ready to film" },
  { icon: Rocket, name: "Launching", status: "Ads live" },
  { icon: SlidersHorizontal, name: "Managing", status: "Budget moved to the best ad" },
  { icon: RefreshCw, name: "Maintaining", status: "Tired ad swapped for a fresh one" },
];

const board: { title: string; cards: { text: string; tone?: "blue" | "yellow"; live?: boolean }[] }[] = [
  {
    title: "Ideas",
    cards: [
      { text: "Before and after: bathroom reno" },
      { text: "Same-day water heater offer" },
      { text: "Meet the crew" },
    ],
  },
  {
    title: "Created",
    cards: [
      { text: "Before and after: bathroom reno", tone: "blue" },
      { text: "Same-day water heater offer", tone: "yellow" },
    ],
  },
  {
    title: "Scripted",
    cards: [{ text: "Video: three signs your water heater is failing" }],
  },
  {
    title: "Live",
    cards: [
      { text: "Same-day water heater offer", tone: "yellow", live: true },
      { text: "Before and after: bathroom reno", tone: "blue", live: true },
    ],
  },
];

const activity = [
  { job: "Managing", text: "Budget moved to the ad bringing in the most calls" },
  { job: "Maintaining", text: "Tired ad swapped for a fresh one" },
];

function ExampleTag() {
  return (
    <span className="rounded-full bg-blue-soft px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-[.06em] text-blue-strong">
      Example
    </span>
  );
}

export function HeroScreen() {
  return (
    <div className="flex h-full flex-col text-left text-ink">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-5">
        <div className="flex items-center gap-2.5">
          <Image src="/assets/mark.png" alt="" width={192} height={205} className="h-6 w-auto" />
          <span className="font-display text-[15px] font-bold tracking-[-.01em]">
            Peak Plumbing
          </span>
        </div>
        <ExampleTag />
      </div>

      {/* Phone: the six jobs as a simple list */}
      <ul className="m-0 grid flex-1 list-none content-center gap-2 p-3 md:hidden">
        {jobs.map((j) => (
          <li
            key={j.name}
            className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-soft text-blue-strong">
              <j.icon className="size-4" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <b className="block text-[14px] font-semibold leading-5">{j.name}</b>
              <span className="block truncate text-[12.5px] leading-[18px] text-muted-foreground">
                {j.status}
              </span>
            </span>
            <Check className="size-4 shrink-0 text-success" strokeWidth={2.25} />
          </li>
        ))}
      </ul>

      {/* Desktop: rail of the six jobs plus this week's board */}
      <div className="hidden min-h-0 flex-1 grid-cols-[212px_1fr] md:grid">
        <ul className="m-0 grid list-none content-start gap-1 border-r border-line p-3">
          {jobs.map((j, i) => (
            <li
              key={j.name}
              className={cn(
                "flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[14px] font-semibold",
                i === 3 ? "bg-ink/[.05] text-ink" : "text-ink-2",
              )}
            >
              <j.icon className="size-4 shrink-0" strokeWidth={1.75} />
              <span className="flex-1">{j.name}</span>
              <Check className="size-3.5 text-success" strokeWidth={2.5} />
            </li>
          ))}
        </ul>

        <div className="flex min-w-0 flex-col gap-4 p-5">
          <div className="flex items-baseline justify-between">
            <b className="font-display text-[20px] font-bold tracking-[-.015em]">This week</b>
            <span className="text-[13px] text-muted-foreground">Handled by the system</span>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-4 gap-3">
            {board.map((col) => (
              <div key={col.title} className="flex min-w-0 flex-col gap-2 rounded-xl bg-ink/[.03] p-2">
                <span className="eyebrow px-1.5 pt-1 text-[11px]">{col.title}</span>
                {col.cards.map((c) => (
                  <div
                    key={c.text}
                    className="grid gap-2 rounded-[10px] border border-line bg-white p-2.5 shadow-card"
                  >
                    {c.tone && (
                      <span
                        className={cn(
                          "block h-12 rounded-md",
                          c.tone === "blue"
                            ? "bg-linear-to-br from-[#cfe0fb] to-[#86b4ff]"
                            : "bg-linear-to-br from-[#fff1bf] to-[#ffd95a]",
                        )}
                      />
                    )}
                    <span className="text-[12.5px] font-medium leading-[17px]">{c.text}</span>
                    {c.live && (
                      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase leading-none tracking-[.06em] text-success">
                        <span className="size-1.5 rounded-full bg-success" />
                        Live
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="grid gap-2">
            {activity.map((a) => (
              <div
                key={a.job}
                className="flex items-center gap-3 rounded-[10px] border border-line bg-white px-3.5 py-2.5 text-[13.5px]"
              >
                <span className="w-[92px] shrink-0 font-semibold text-blue-strong">{a.job}</span>
                <span className="min-w-0 flex-1 truncate">{a.text}</span>
                <Check className="size-4 shrink-0 text-success" strokeWidth={2.25} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
