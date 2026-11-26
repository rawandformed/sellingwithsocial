/* FAQ. Five questions. Anything not yet confirmed is in [brackets]. */

const faqs = [
  {
    q: "What is included?",
    a: "Your own account with the full system: your ads, pages, tracking, automatic replies and follow-up in one place, plus the self-serve library.",
  },
  {
    q: "Do I pay for ad spend separately?",
    a: "Yes. You pay the ad platforms directly. Your plan covers the system, not your ad budget.",
  },
  {
    q: "How long does setup take?",
    a: "[Self-serve accounts are ready the same day.] With Done with you, we set up your account after your onboarding call [within 00 days].",
  },
  {
    q: "Can I cancel anytime?",
    a: "[Yes. Every plan is month to month and you can cancel any time.]",
  },
  {
    q: "What support do I get?",
    a: "Self-serve comes with the library. Supported and Done with you add [24-hour support].",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative border-t border-line bg-surface py-20 sm:py-[120px]">
      <div className="wrap max-w-[calc(var(--container-col-narrow)+48px)]">
        <div className="mb-9 grid gap-3.5 sm:mb-14">
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-title" className="text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]">
            Questions, answered.
          </h2>
        </div>
        <div className="border-t border-line">
          {faqs.map((f, i) => (
            <details key={f.q} open={i === 0} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-[22px] text-[18px] font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <i className="relative size-3.5 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-[1.5px] before:bg-ink after:absolute after:inset-x-0 after:top-1/2 after:h-[1.5px] after:rotate-90 after:bg-ink after:transition-transform after:duration-200 group-open:after:rotate-0" />
              </summary>
              <div className="max-w-[60ch] pb-6 pr-10 text-ink-2">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
