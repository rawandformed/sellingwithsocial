"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { PeakChart } from "@/components/ui/peak-chart";
import { checkoutHref, siteConfig } from "@/lib/config";

/*
  Section 6. Why now / the offer.

  Part one is the cost calculator on a light background. It only shows the
  visitor's own agency cost. Part two is the one dark section on the page:
  PeakChart, fed by the calculator, beside the glass price card. The price
  appears here and nowhere else on the site.
*/

const PRICE = 297;
const MIN = 500;
const MAX = 10000;
const STEP = 100;
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const PERIOD = "12 months";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

const included = ["Ideas", "Creating", "Scripting", "Launching", "Managing", "Maintaining"];

/** Chart width follows its column, between 260px and 420px. */
function useChartWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(380);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(Math.max(260, Math.min(420, entry.contentRect.width - 24)));
      setWidth((prev) => (prev === w ? prev : w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

export function Offer() {
  const [agency, setAgency] = useState(2500);
  const { ref: chartCol, width } = useChartWidth();

  const keptMonthly = Math.max(0, agency - PRICE);
  const keptYearly = keptMonthly * 12;
  const series = MONTHS.map((m) => keptMonthly * m);

  const buyHref = checkoutHref();
  const external = Boolean(siteConfig.CHECKOUT_URL);

  return (
    <>
      {/* Cost calculator */}
      <section id="calculator" aria-labelledby="calc-title" className="relative overflow-hidden pb-20 sm:pb-[120px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="orb left-[calc(50%-80px)] top-[60px] size-[520px] bg-[#86b4ff] opacity-35" />
          <span className="orb left-[calc(50%+300px)] top-[280px] size-[320px] bg-[#ffd95a] opacity-40" />
        </div>
        <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-[72px]">
          <div className="grid gap-4">
            <span className="eyebrow">Why now</span>
            <h2
              id="calc-title"
              className="max-w-[14ch] text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]"
            >
              What does your agency <span className="hl">cost?</span>
            </h2>
          </div>

          <div className="glass rounded-[26px] p-2.5">
            <div className="grid gap-6 rounded-[18px] border border-white/70 bg-white/55 p-5 sm:p-7">
              <label htmlFor="agency-cost" className="grid gap-2">
                <span className="eyebrow">Your agency, each month</span>
                <span className="font-mono text-[clamp(44px,6vw,64px)] font-medium leading-none tracking-[-.03em]">
                  {usd(agency)}
                </span>
              </label>
              <input
                id="agency-cost"
                type="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={agency}
                onChange={(e) => setAgency(Number(e.target.value))}
                aria-valuetext={`${usd(agency)} a month`}
                className="h-2 w-full cursor-pointer accent-[var(--blue-strong)]"
              />
              <div className="flex justify-between font-mono text-[12px] text-muted-foreground">
                <span>{usd(MIN)}</span>
                <span>{usd(MAX)}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 rounded-xl border border-line bg-white px-4 py-4 shadow-card">
                <span className="text-[15px] font-semibold text-ink-2">A year with your agency</span>
                <span className="font-mono text-[26px] font-medium leading-none tracking-[-.02em]">
                  {usd(agency * 12)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The offer. The page's one dark section. */}
      <section
        id="offer"
        data-dark
        aria-labelledby="offer-title"
        className="relative overflow-hidden bg-navy py-20 text-white sm:py-[120px]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="orb left-[calc(50%-620px)] top-[20%] size-[460px] bg-[#ffd95a] opacity-[.14]" />
          <span className="orb left-[calc(50%+60px)] top-[-10%] size-[560px] bg-[#86b4ff] opacity-25" />
        </div>
        <div className="wrap">
          <div className="mb-10 grid gap-3.5 sm:mb-14">
            <span className="eyebrow text-yellow">The offer</span>
            <h2
              id="offer-title"
              className="max-w-[16ch] text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em] text-white"
            >
              Keep the work. <span className="text-yellow">Drop the retainer.</span>
            </h2>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
            <div ref={chartCol} className="flex min-w-0 justify-center">
              <PeakChart
                width={width}
                accent="#5f92e2"
                data={series}
                labels={MONTHS.map((m) => `Month ${m}`)}
                value={keptYearly}
                valueSuffix=""
                title="Dollars you keep in a year"
                caption="Example, from the agency cost you entered"
                updatedText="Example"
                trend="up"
                periods={[PERIOD]}
                period={PERIOD}
                formatValue={usd}
                font="var(--font-figtree), system-ui, sans-serif"
              />
            </div>

            <div className="glass-dark rounded-[26px] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="eyebrow text-yellow">The system</span>
                <span className="rounded-full bg-yellow/15 px-3 py-1.5 text-[12px] font-bold uppercase leading-none tracking-[.06em] text-yellow">
                  No setup fee
                </span>
              </div>
              <p className="mt-6 flex items-baseline gap-2">
                <b className="font-mono text-[clamp(60px,8vw,84px)] font-medium leading-none tracking-[-.04em] text-white">
                  ${PRICE}
                </b>
                <span className="text-[17px] text-navy-ink-2">/month</span>
              </p>
              <ul className="mt-7 grid list-none grid-cols-2 gap-x-4 gap-y-3 border-t border-white/10 p-0 pt-6">
                {included.map((j) => (
                  <li key={j} className="flex items-center gap-2.5 text-[15px] text-white">
                    <Check className="size-4 shrink-0 text-yellow" strokeWidth={2.5} />
                    {j}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={buyHref}
                className="mt-8 w-full"
                {...(external ? { target: "_blank", rel: "noopener" } : {})}
              >
                Get the system
              </ButtonLink>
              {siteConfig.WEBINAR_URL && (
                <p className="mt-4 text-center text-[14px] text-navy-ink-2">
                  <a href={siteConfig.WEBINAR_URL} className="underline underline-offset-4">
                    Or join the free webinar
                  </a>
                  {siteConfig.NEXT_WEBINAR && <span>: {siteConfig.NEXT_WEBINAR}</span>}
                </p>
              )}
              <p className="mt-5 text-center text-[13px] font-medium tracking-[.01em] text-navy-ink-2">
                Powered by HighLevel
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
