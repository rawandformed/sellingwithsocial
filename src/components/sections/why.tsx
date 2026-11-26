import { Check } from "lucide-react";

import { ExampleTag } from "@/components/ui/example-tag";

/*
  Why we built it, told through the result: one lead followed from the ad to a
  booking, with every step handled by the system. The lead and the times are
  an example and the panel is tagged as one.
*/

const journey = [
  { when: "9:02am", step: "Ad", text: "Maria sees your video ad." },
  { when: "9:03am", step: "Page", text: "She fills in your page." },
  { when: "9:03am", step: "Reply", text: "She gets an answer straight away." },
  { when: "Next day", step: "Follow-up", text: "A reminder goes out on its own." },
  { when: "Tuesday", step: "Booked", text: "She books and pays the deposit." },
];

const results = [
  { title: "Every lead gets a reply", text: "In seconds, day or night." },
  { title: "Follow-up runs until they book", text: "Nobody has to remember." },
  { title: "You see which ads pay", text: "So you spend more on what works." },
];

export function Why() {
  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="relative overflow-hidden border-y border-line bg-surface py-20 sm:py-[120px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="orb left-[calc(50%+160px)] top-[200px] size-[520px] bg-[#86b4ff] opacity-30" />
      </div>

      <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-[72px]">
        <div className="grid gap-4">
          <span className="eyebrow">Why we built it</span>
          <h2
            id="why-title"
            className="max-w-[14ch] text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]"
          >
            More of your leads become paying clients.
          </h2>
          <p className="max-w-[36ch] text-[18px] leading-7 text-ink-2 sm:text-[20px] sm:leading-[30px]">
            The system moves every lead to the next step until they book.
          </p>
        </div>

        {/* One lead, from ad to booked */}
        <div className="glass rounded-[26px] p-2.5">
          <div className="rounded-[18px] border border-white/70 bg-white/60 p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="eyebrow">From ad to booked</span>
              <ExampleTag />
            </div>
            <ol className="relative m-0 mt-6 grid list-none gap-2.5 p-0">
              <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-0.5 rounded-full bg-blue-strong/25" />
              {journey.map((j, i) => {
                const last = i === journey.length - 1;
                return (
                  <li key={j.step} className="relative flex items-center gap-3.5">
                    <span
                      className={
                        "relative grid size-10 shrink-0 place-items-center rounded-full text-white " +
                        (last ? "bg-success" : "bg-blue-strong")
                      }
                    >
                      <Check className="size-4" strokeWidth={2.75} />
                    </span>
                    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3 shadow-card">
                      <span className="min-w-0 flex-1">
                        <b className="block text-[12px] font-bold uppercase leading-4 tracking-[.06em] text-blue-strong">
                          {j.step}
                        </b>
                        <span className="block text-[15px] font-medium leading-[22px]">{j.text}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[12px] text-muted-foreground">{j.when}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="mt-10 grid gap-6 border-t border-line pt-9 sm:mt-14 sm:grid-cols-3 sm:gap-10">
          {results.map((r) => (
            <div key={r.title} className="grid content-start gap-2">
              <h3 className="text-[21px] leading-[1.2] tracking-[-.015em]">{r.title}</h3>
              <p className="text-[16px] leading-[25px] text-ink-2">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
