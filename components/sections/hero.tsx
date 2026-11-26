import { ButtonLink } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { VslPlayer } from "@/components/ui/vsl-player";
import { HeroBoard } from "@/components/sections/hero-board";
import { PRICING_ANCHOR, proofStats, siteConfig } from "@/lib/config";

/* The frame's glass shadow. Replaces ContainerScroll's default dark shadow. */
const FRAME_SHADOW =
  "inset 0 1px 0 rgba(255,255,255,.95), inset 0 -1px 0 rgba(255,255,255,.3), 0 40px 80px -32px rgba(20,48,96,.35), 0 2px 6px rgba(20,48,96,.05)";

export function Hero() {
  /* With a sales video set, the frame holds the video. Until then it holds an
     example product screen, so there is never an empty video placeholder. */
  const hasVideo = Boolean(siteConfig.VSL_URL);

  return (
    <header id="hero" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <span className="orb left-[calc(50%-120px)] top-[-200px] size-[520px] bg-[#c6dff0] opacity-60" />
        <span className="orb left-[calc(50%-620px)] top-[420px] size-[620px] bg-[#86b4ff] opacity-45" />
        <span className="orb left-[calc(50%+200px)] top-[560px] size-[420px] bg-[#c6dff0] opacity-60" />
      </div>

      <ContainerScroll
        className="z-[1] h-auto pb-6 pt-20 md:h-auto md:py-0"
        mobileScale={[0.96, 1]}
        headerClassName="motion-reduce:!transform-none"
        cardClassName={
          "h-auto md:h-auto border border-white/80 bg-white/50 p-2 md:p-2.5 shadow-none backdrop-blur-xl backdrop-saturate-150 motion-reduce:!transform-none" +
          (hasVideo ? " aspect-video" : "")
        }
        screenClassName="border border-white/90 bg-white/85 dark:bg-white/85 md:p-0 rounded-[22px] md:rounded-[22px]"
        cardShadow={FRAME_SHADOW}
        titleComponent={
          <div className="mx-auto grid max-w-4xl justify-items-center gap-6 px-2 pb-20 md:pb-28">
            <h1 className="max-w-[16ch] text-[clamp(40px,5.6vw,72px)] leading-[1.083]">
              Turn your social ads into booked customers.
            </h1>
            <p className="max-w-[46ch] text-[18px] leading-7 text-ink-2 sm:text-[20px] sm:leading-[30px]">
              One system runs the ad, the page, the reply and the follow-up, so more leads become
              paying clients.
            </p>
            <ButtonLink href={PRICING_ANCHOR} className="mt-2">
              See plans and pricing
            </ButtonLink>
          </div>
        }
      >
        {hasVideo ? <VslPlayer src={siteConfig.VSL_URL} /> : <HeroBoard />}
      </ContainerScroll>

      {/* Proof strip. Values are placeholders until real results are supplied. */}
      <div className="wrap relative z-[1] -mt-6 pb-20 md:-mt-24 md:pb-[120px]">
        <dl className="glass mx-auto grid max-w-[900px] grid-cols-1 rounded-card sm:grid-cols-3">
          {proofStats.map((s, i) => (
            <div
              key={s.label}
              className={
                "grid gap-1.5 px-5 py-6 text-center" +
                (i > 0 ? " border-t border-ink/[.08] sm:border-l sm:border-t-0" : "")
              }
            >
              <dd className="order-1 font-mono text-[34px] font-medium leading-none tracking-[-.03em]">
                {s.value}
              </dd>
              <dt className="order-2 text-[15px] leading-[22px] text-ink-2">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
