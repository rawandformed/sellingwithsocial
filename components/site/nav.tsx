import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";

const links = [
  { href: "#story", label: "How it works" },
  { href: "#compare", label: "Why in-house" },
  { href: "#founders", label: "Who we are" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <nav
      aria-label="Primary"
      className="glass fixed left-1/2 top-[calc(16px+env(safe-area-inset-top,0px))] z-50 flex w-max max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-4 sm:gap-7 rounded-full py-[7px] pl-5 pr-[7px]"
    >
      <a href="#top" aria-label="Selling with Social" className="flex shrink-0 items-center">
        <Image
          src="/assets/logo.png"
          alt=""
          width={360}
          height={169}
          loading="eager"
          className="h-[38px] w-auto"
        />
      </a>
      <ul className="m-0 hidden list-none gap-[22px] p-0 min-[901px]:flex">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[15px] font-medium text-ink-2 no-underline hover:text-ink"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <ButtonLink href="#story" variant="ink" size="sm">
        Show me how
      </ButtonLink>
    </nav>
  );
}
