import { ButtonLink } from "@/components/ui/button";
import { checkoutHref, siteConfig } from "@/lib/config";

/* Section 7. FAQ (five questions at most) and the final button. */

const faqs = [
  {
    q: "What does mostly hands-off mean?",
    a: "The system does the work. You approve ads before they go live and film the short videos it scripts.",
  },
  {
    q: "Do I have to fire my agency first?",
    a: "No. Start the system, watch it run, then decide.",
  },
  {
    q: "Is there a contract?",
    a: "No. It is month to month and you can cancel any time.",
  },
  {
    q: "Do I need to be good with computers?",
    a: "No. If you can approve an ad on your phone, you can run it.",
  },
  {
    q: "What kind of business is it for?",
    a: "Local service businesses that win work by phone, quote or booking.",
  },
];

export function Faq() {
  const external = Boolean(siteConfig.CHECKOUT_URL);
  return (
    <>
      <section id="faq" aria-labelledby="faq-title" className="relative py-20 sm:py-[120px]">
        <div className="wrap max-w-[calc(var(--container-col-narrow)+48px)]">
          <div className="mb-9 grid gap-3.5 sm:mb-14">
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-title" className="text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]">
              Questions, <span className="hl">answered.</span>
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

      <section aria-labelledby="final-title" className="pb-20 sm:pb-[120px]">
        <div className="wrap">
          <div className="relative grid justify-items-center gap-[22px] overflow-hidden rounded-[28px] bg-yellow px-5 py-16 text-center sm:px-8 sm:py-24">
            <span
              aria-hidden="true"
              className="absolute left-[calc(50%-250px)] top-[-200px] size-[500px] rounded-full bg-white opacity-35 blur-[80px]"
            />
            <h2
              id="final-title"
              className="relative max-w-[18ch] text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]"
            >
              Fire your agency.
            </h2>
            <ButtonLink
              href={checkoutHref()}
              variant="ink"
              className="relative"
              {...(external ? { target: "_blank", rel: "noopener" } : {})}
            >
              Get the system
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
