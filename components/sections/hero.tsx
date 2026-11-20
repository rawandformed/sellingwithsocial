import { ButtonLink } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HeroScreen } from "@/components/sections/hero-screen";

/* The frame's glass shadow. Replaces ContainerScroll's default dark shadow. */
const FRAME_SHADOW =
  "inset 0 1px 0 rgba(255,255,255,.95), inset 0 -1px 0 rgba(255,255,255,.3), 0 40px 80px -32px rgba(20,48,96,.35), 0 2px 6px rgba(20,48,96,.05)";

export function Hero() {
  return (
    <header id="hero" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <span className="orb left-[calc(50%-120px)] top-[-200px] size-[520px] bg-[#c6dff0] opacity-60" />
        <span className="orb left-[calc(50%-600px)] top-[380px] size-[620px] bg-[#86b4ff]" />
        <span className="orb left-[calc(50%+180px)] top-[520px] size-[420px] bg-[#ffd95a] opacity-50" />
      </div>

      <ContainerScroll
        className="z-[1]"
        headerClassName="motion-reduce:!transform-none"
        cardClassName="border border-white/80 bg-white/50 p-2 md:p-2.5 shadow-none backdrop-blur-xl backdrop-saturate-150 motion-reduce:!transform-none"
        screenClassName="border border-white/90 bg-white/85 dark:bg-white/85 md:p-0 rounded-[22px] md:rounded-[22px]"
        cardShadow={FRAME_SHADOW}
        titleComponent={
          <div className="mx-auto grid max-w-3xl justify-items-center gap-6 px-2 pb-8 md:pb-28">
            <h1 className="text-[clamp(44px,5.6vw,72px)] leading-[1.083]">
              Fire your <span className="hl">agency.</span>
            </h1>
            <p className="max-w-[40ch] text-[18px] leading-7 text-ink-2 sm:text-[20px] sm:leading-[30px]">
              Everything an agency does, brought <span className="whitespace-nowrap">in-house</span> in one mostly hands-off system.
            </p>
            <ButtonLink href="#story" className="mt-2">
              Show me how
            </ButtonLink>
          </div>
        }
      >
        <HeroScreen />
      </ContainerScroll>
    </header>
  );
}
