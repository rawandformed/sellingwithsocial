"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { PRICING_ANCHOR } from "@/lib/config";
import { cn } from "@/lib/utils";

const links = [
  { href: "#why", label: "Why us" },
  { href: PRICING_ANCHOR, label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

/** True while the nav sits over a dark block (any element with data-dark). */
function useOverDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const over = [...document.querySelectorAll("[data-dark]")].some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < 60 && r.bottom > 60;
      });
      setDark((prev) => (prev === over ? prev : over));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return dark;
}

export function Nav() {
  const dark = useOverDark();
  return (
    <nav
      aria-label="Primary"
      className={cn(
        "glass fixed left-1/2 top-[calc(16px+env(safe-area-inset-top,0px))] z-50 flex w-max max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-4 rounded-full py-[7px] pl-5 pr-[7px] transition-[background,border-color] duration-300 sm:gap-7",
        dark && "border-white/15 bg-[linear-gradient(140deg,rgba(255,255,255,.14),rgba(255,255,255,.05))]",
      )}
    >
      <Link href="/#top" aria-label="Selling with Social" className="flex shrink-0 items-center">
        <Image
          src={dark ? "/assets/logo-reversed.png" : "/assets/logo.png"}
          alt=""
          width={360}
          height={169}
          loading="eager"
          className="h-[38px] w-auto"
        />
      </Link>
      <ul className="m-0 hidden list-none gap-[22px] p-0 min-[901px]:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className={cn(
                "text-[15px] font-medium no-underline",
                dark ? "text-white/85 hover:text-white" : "text-ink-2 hover:text-ink",
              )}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <ButtonLink
        href={PRICING_ANCHOR}
        size="sm"
        className={cn(dark && "bg-white text-ink hover:bg-white/90")}
      >
        See pricing
      </ButtonLink>
    </nav>
  );
}
