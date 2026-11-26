"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { ExampleTag } from "@/components/ui/example-tag";
import { PeakChart } from "@/components/ui/peak-chart";
import { planAction, siteConfig, usd } from "@/lib/config";
import { cn } from "@/lib/utils";

/*
  Pricing. The only place on the site that shows a price.

  Three glass cards, each with its own buy button. A buy button opens its
  GoHighLevel order form. While that link is empty in lib/config.ts the button
  becomes "Join the waitlist" and opens the waitlist form.

  Below the cards sits the page's one dark accent: PeakChart, showing example
  data that is labelled as an example.
*/

type Tier = {
  name: string;
  line: string;
  price: string;
  per: string;
  then?: string;
  features: string[];
  cta: string;
  url: string;
  note?: string;
  featured?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Self-serve",
    line: "The tools, and you run them.",
    price: usd(249),
    per: "/month",
    features: ["Your own account", "Every tool on this page", "The self-serve library"],
    cta: "Buy Self-serve",
    url: siteConfig.CHECKOUT_249_URL,
  },
  {
    name: "Supported",
    line: "The tools, with help when you get stuck.",
    price: usd(349),
    per: "/month",
    features: ["Everything in Self-serve", "24-hour support"],
    cta: "Buy Supported",
    url: siteConfig.CHECKOUT_349_URL,
    featured: true,
  },
  {
    name: "Done with you",
    line: "We set up your account for your business.",
    price: usd(siteConfig.ONBOARDING_FEE),
    per: "one-off",
    then: `then ${usd(349)}/month`,
    features: ["Everything in Supported", "Your account set up for you", "An onboarding call"],
    cta: "Buy Done with you",
    url: siteConfig.CHECKOUT_ONBOARDING_URL,
    note: "Buy, then book your onboarding call.",
  },
];

/* Example series for the chart. Illustrative only. */
const EXAMPLE: Record<string, { data: number[]; labels: string[]; value: number }> = {
  Weekly: {
    data: [2, 3, 2, 5, 4, 7, 6],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    value: 29,
  },
  Monthly: {
    data: [1, 2, 2, 3, 2, 4, 3, 5, 4, 4, 6, 5, 7, 6, 8, 7],
    labels: Array.from({ length: 16 }, (_, i) => `Day ${i * 2 + 1}`),
    value: 69,
  },
};

/** Chart width follows its column, between 250px and 380px. */
function useChartWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(340);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(Math.max(250, Math.min(380, entry.contentRect.width - 24)));
      setWidth((prev) => (prev === w ? prev : w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

function TierCard({ t }: { t: Tier }) {
  const action = planAction(t.url, t.cta);
  return (
    <div
      className={cn(
        "glass flex rounded-[26px] p-2.5",
        t.featured && "outline-2 outline-offset-[-2px] outline-blue-strong",
      )}
    >
      <div className="flex w-full flex-col rounded-[18px] border border-white/70 bg-white/60 p-6 sm:p-7">
        <div className="h-6">
          {t.featured && (
            <span className="inline-block rounded-full bg-blue-strong px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-[.06em] text-white">
              Recommended
            </span>
          )}
        </div>
        <h3 className="mt-3 text-[26px] leading-[1.15] tracking-[-.015em]">{t.name}</h3>
        <p className="mt-2 min-h-[54px] text-[16px] leading-[26px] text-ink-2">{t.line}</p>

        <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <b className="hl font-mono text-[52px] font-medium leading-none tracking-[-.04em]">{t.price}</b>
          <span className="text-[16px] text-muted-foreground">{t.per}</span>
        </p>
        <p className="mt-2 h-6 font-mono text-[14px] text-ink-2">{t.then}</p>

        <ul className="m-0 mt-5 grid list-none gap-3 border-t border-line p-0 pt-5">
          {t.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[16px] leading-6">
              <Check className="mt-1 size-4 shrink-0 text-success" strokeWidth={2.5} />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto grid gap-3 pt-8">
          <ButtonLink variant={action.kind === "buy" ? "buy" : "ink"} className="w-full" {...action.link}>
            {action.label}
          </ButtonLink>
          <p className="min-h-5 text-center text-[13px] font-medium leading-5 text-muted-foreground">
            {action.kind === "buy" ? t.note : null}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  const [period, setPeriod] = useState("Monthly");
  const { ref: chartCol, width } = useChartWidth();
  const ex = EXAMPLE[period];

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative overflow-hidden py-20 sm:py-[120px]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="orb left-[calc(50%-640px)] top-[140px] size-[520px] bg-[#86b4ff] opacity-35" />
        <span className="orb left-[calc(50%+220px)] top-[320px] size-[460px] bg-[#c6dff0] opacity-60" />
      </div>

      <div className="wrap">
        <div className="mb-10 grid gap-3.5 sm:mb-14">
          <span className="eyebrow">Pricing</span>
          <h2
            id="pricing-title"
            className="max-w-[18ch] text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]"
          >
            Pick how much help you want.
          </h2>
          <p className="max-w-[44ch] text-[18px] leading-7 text-ink-2 sm:text-[20px] sm:leading-[30px]">
            No sales calls. Choose a plan and buy it today.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {tiers.map((t) => (
            <TierCard key={t.name} t={t} />
          ))}
        </div>

        {/* The one dark accent on the page */}
        <div
          data-dark
          className="mt-5 grid items-center gap-8 overflow-hidden rounded-[28px] bg-navy p-7 text-white sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14 lg:p-14"
        >
          <div className="grid gap-4">
            <ExampleTag className="w-max bg-white/10 text-white">Example data</ExampleTag>
            <h3 className="max-w-[16ch] text-[clamp(26px,3.2vw,38px)] leading-[1.12] tracking-[-.018em] text-white">
              See what your ads bring in.
            </h3>
            <p className="max-w-[36ch] text-[17px] leading-[27px] text-navy-ink-2">
              Every plan shows your leads in one place. This chart is an example, not a result.
            </p>
          </div>
          <div ref={chartCol} className="flex min-w-0 justify-center">
            <PeakChart
              width={width}
              accent="#5f92e2"
              data={ex.data}
              labels={ex.labels}
              value={ex.value}
              valueSuffix=""
              title="New leads"
              caption="Example data, not a real result"
              updatedText="Example"
              trend="none"
              periods={Object.keys(EXAMPLE)}
              period={period}
              onPeriodChange={setPeriod}
              formatValue={(v) => `${Math.round(v)} leads`}
              font="var(--font-figtree), system-ui, sans-serif"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
