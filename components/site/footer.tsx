import Image from "next/image";

import { siteConfig } from "@/lib/config";

const links = [
  { href: "#story", label: "How it works" },
  { href: "#jobs", label: "The six jobs" },
  { href: "#compare", label: "Why in-house" },
  { href: "#offer", label: "The offer" },
  { href: "#faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t border-line pb-10 pt-16 text-[15px]">
      <div className="wrap">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <a href="#top" aria-label="Selling with Social" className="inline-block">
              <Image src="/assets/logo.png" alt="" width={360} height={169} className="h-[52px] w-auto" />
            </a>
            <p className="mt-4 max-w-[30ch] text-muted-foreground">
              Everything an agency does, in-house, in one system.
            </p>
          </div>
          <ul className="m-0 grid list-none gap-3 p-0">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="no-underline hover:underline hover:underline-offset-4">
                  {l.label}
                </a>
              </li>
            ))}
            {siteConfig.WEBINAR_URL && (
              <li>
                <a href={siteConfig.WEBINAR_URL} className="no-underline hover:underline hover:underline-offset-4">
                  Free webinar
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[13px] font-medium tracking-[.01em] text-muted-foreground">
          <span>Powered by HighLevel</span>
          <span>© 2026 Selling with Social</span>
        </div>
      </div>
    </footer>
  );
}
