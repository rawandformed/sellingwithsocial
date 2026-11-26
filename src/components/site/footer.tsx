import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-line pb-10 pt-16 text-[15px]">
      <div className="wrap">
        <a href="#top" aria-label="Selling with Social" className="inline-block">
          <img src={logo} alt="" width={360} height={169} loading="lazy" className="h-[52px] w-auto" />
        </a>
        <p className="mt-4 max-w-[34ch] text-muted-foreground">
          The system for selling your services with social media.
        </p>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[13px] font-medium tracking-[.01em] text-muted-foreground">
          <span>Powered by HighLevel</span>
          <span>© 2026 Selling with Social</span>
        </div>
      </div>
    </footer>
  );
}
