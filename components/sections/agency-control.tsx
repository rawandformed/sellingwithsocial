import { Check, CreditCard, KeyRound, Megaphone, Receipt, ShieldAlert, X, type LucideIcon } from "lucide-react";

/*
  Section 2. Why fire them: who holds the keys.

  A plain us-versus-them. Each row is one thing an agency controls, with what
  that means on the left and what in-house means on the right.
*/

const rows: { icon: LucideIcon; label: string; them: string; us: string }[] = [
  {
    icon: KeyRound,
    label: "Your ad account",
    them: "They own it. If you leave, it can leave with them.",
    us: "It is yours. It stays yours.",
  },
  {
    icon: Megaphone,
    label: "Your ads",
    them: "They decide what runs and when.",
    us: "You see and approve every ad.",
  },
  {
    icon: CreditCard,
    label: "Your spend",
    them: "Your money goes through them.",
    us: "You pay the ad platforms directly.",
  },
  {
    icon: Receipt,
    label: "The cost",
    them: "A retainer on top of your ad spend.",
    us: "One flat monthly price.",
  },
  {
    icon: ShieldAlert,
    label: "Security",
    them: "Their staff hold your logins.",
    us: "Only you hold the keys.",
  },
];

export function AgencyControl() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="relative overflow-hidden border-t border-line bg-surface py-20 sm:py-[120px]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="orb left-[calc(50%+120px)] top-[200px] size-[560px] bg-[#86b4ff] opacity-30" />
        <span className="orb left-[calc(50%+420px)] top-[560px] size-[320px] bg-[#ffd95a] opacity-35" />
      </div>

      <div className="wrap">
        <div className="mb-10 grid gap-3.5 sm:mb-14">
          <span className="eyebrow">Why fire them</span>
          <h2
            id="story-title"
            className="max-w-[18ch] text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]"
          >
            With an agency, they hold the <span className="hl">keys.</span>
          </h2>
          <p className="max-w-[44ch] text-[18px] leading-7 text-ink-2 sm:text-[20px] sm:leading-[30px]">
            Your ad account, your spend and your logins sit in someone else&rsquo;s hands.
          </p>
        </div>

        {/* Column titles (desktop) */}
        <div className="mb-3 hidden grid-cols-[220px_1fr_1fr] gap-4 px-2.5 lg:grid">
          <span />
          <span className="eyebrow pl-5 text-hot">With an agency</span>
          <span className="eyebrow pl-5">In-house, with the system</span>
        </div>

        <div className="grid gap-3 sm:gap-4">
          {rows.map((r) => (
            <div key={r.label} className="glass rounded-[22px] p-2 sm:rounded-[26px] sm:p-2.5">
              <div className="grid gap-2 lg:grid-cols-[220px_1fr_1fr] lg:items-stretch lg:gap-4">
                <div className="flex items-center gap-3 px-3 py-2.5 lg:px-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-soft text-blue-strong">
                    <r.icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-[19px] leading-[1.15] tracking-[-.015em] sm:text-[21px]">{r.label}</h3>
                </div>

                <div className="flex items-start gap-3 rounded-[14px] bg-[#fdecea] px-4 py-4 sm:rounded-[18px] sm:px-5 sm:py-5">
                  <X className="mt-[5px] size-4 shrink-0 text-hot" strokeWidth={2.5} />
                  <p className="text-[15.5px] leading-6 text-ink sm:text-[17px] sm:leading-[26px]">
                    <span className="eyebrow mb-1 block text-[11px] text-hot lg:hidden">With an agency</span>
                    {r.them}
                  </p>
                </div>

                <div className="flex items-start gap-3 rounded-[14px] border border-white/80 bg-white/80 px-4 py-4 shadow-card sm:rounded-[18px] sm:px-5 sm:py-5">
                  <Check className="mt-[5px] size-4 shrink-0 text-success" strokeWidth={2.75} />
                  <p className="text-[15.5px] font-semibold leading-6 sm:text-[17px] sm:leading-[26px]">
                    <span className="eyebrow mb-1 block text-[11px] lg:hidden">In-house</span>
                    {r.us}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
