import mark from "@/assets/mark.png";
import { ExampleTag } from "@/components/ui/example-tag";
import { cn } from "@/lib/utils";

/*
  Example product screen for the hero frame, shown until a sales video is set
  in src/lib/config.ts. A lead board: each column is a step, and leads move left to
  right until they are booked. The business and the leads are made up.
*/

type Lead = { name: string; from: string; note: string };

const columns: { title: string; tone: string; dot: string; leads: Lead[] }[] = [
  {
    title: "New leads",
    tone: "bg-blue-soft text-blue-strong",
    dot: "bg-blue",
    leads: [
      { name: "Dana K.", from: "Video ad", note: "Filled in your page" },
      { name: "Chris P.", from: "Static ad", note: "Asked about pricing" },
    ],
  },
  {
    title: "Replied",
    tone: "bg-blue-soft text-blue-strong",
    dot: "bg-blue-strong",
    leads: [
      { name: "Maria L.", from: "Video ad", note: "Reply sent in seconds" },
      { name: "Jo T.", from: "Static ad", note: "Answered her question" },
    ],
  },
  {
    title: "Following up",
    tone: "bg-yellow-soft text-yellow-ink",
    dot: "bg-yellow",
    leads: [{ name: "Alex R.", from: "Old list", note: "Second message sent" }],
  },
  {
    title: "Booked",
    tone: "bg-[#e3f5ea] text-success",
    dot: "bg-success",
    leads: [
      { name: "Sam O.", from: "Video ad", note: "Tuesday 9:00am" },
      { name: "Priya N.", from: "Static ad", note: "Thursday 2:30pm" },
    ],
  },
];

function LeadCard({ l, tone }: { l: Lead; tone: string }) {
  return (
    <div className="grid gap-2 rounded-xl border border-line bg-white p-3 shadow-card">
      <div className="flex items-center gap-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink/[.06] text-[11px] font-bold">
          {l.name[0]}
        </span>
        <b className="min-w-0 flex-1 truncate text-[14px] font-semibold">{l.name}</b>
      </div>
      <span className="text-[13px] leading-[18px] text-ink-2">{l.note}</span>
      <span className={cn("w-max rounded-full px-2 py-1 text-[10.5px] font-bold uppercase leading-none tracking-[.06em]", tone)}>
        {l.from}
      </span>
    </div>
  );
}

export function HeroBoard() {
  return (
    <div className="flex h-full flex-col text-left text-ink">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-5">
        <div className="flex items-center gap-2.5">
          <img src={mark} alt="" width={192} height={205} className="h-6 w-auto" />
          <span className="font-display text-[15px] font-bold tracking-[-.01em]">Harbor Coaching</span>
        </div>
        <ExampleTag />
      </div>

      {/* Phone: one lead per step, top to bottom */}
      <ol className="m-0 grid list-none gap-2 p-3 md:hidden">
        {columns.map((c) => (
          <li key={c.title} className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5">
            <span className={cn("size-2.5 shrink-0 rounded-full", c.dot)} />
            <span className="min-w-0 flex-1">
              <b className="block text-[14px] font-semibold leading-5">{c.leads[0].name}</b>
              <span className="block truncate text-[12.5px] leading-[18px] text-muted-foreground">
                {c.leads[0].note}
              </span>
            </span>
            <span className={cn("shrink-0 rounded-full px-2 py-1 text-[10.5px] font-bold uppercase leading-none tracking-[.06em]", c.tone)}>
              {c.title}
            </span>
          </li>
        ))}
      </ol>

      {/* Desktop: the full board */}
      <div className="hidden grid-cols-4 gap-3.5 p-5 md:grid">
        {columns.map((c) => (
          <div key={c.title} className="flex min-w-0 flex-col gap-2.5 rounded-2xl bg-ink/[.03] p-2.5 pb-4">
            <div className="flex items-center gap-2 px-1.5 pt-1">
              <span className={cn("size-2 rounded-full", c.dot)} />
              <b className="text-[13px] font-bold">{c.title}</b>
              <span className="ml-auto font-mono text-[12px] text-muted-foreground">{c.leads.length}</span>
            </div>
            {c.leads.map((l) => (
              <LeadCard key={l.name} l={l} tone={c.tone} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
