/* Section 5. Why trust us: the founders. Photos are placeholders for now. */

const founders = [
  { name: "Kai", role: "Co-founder" },
  { name: "Alan", role: "Co-founder" },
];

export function Founders() {
  return (
    <section id="founders" aria-labelledby="founders-title" className="relative py-20 sm:py-[120px]">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-[72px]">
        <div className="grid w-full max-w-[460px] grid-cols-2 gap-4">
          {founders.map((f, i) => (
            <div
              key={f.name}
              className={
                "relative flex aspect-[4/5] items-end rounded-card border border-line bg-[#eeede8] p-[18px]" +
                (i === 1 ? " mt-10" : "")
              }
            >
              <span className="absolute left-[18px] top-4 text-[12px] font-medium text-faint">Photo</span>
              <span>
                <b className="font-display text-[22px] font-bold tracking-[-.02em]">{f.name}</b>
                <small className="ml-1.5 text-[14px] text-muted-foreground">{f.role}</small>
              </span>
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          <span className="eyebrow">Why trust us</span>
          <h2
            id="founders-title"
            className="max-w-[14ch] text-[clamp(32px,4.4vw,52px)] leading-[1.115] tracking-[-.018em]"
          >
            Built by <span className="hl">operators.</span>
          </h2>
          <p className="max-w-[36ch] text-[18px] leading-7 text-ink-2 sm:text-[20px] sm:leading-[30px]">
            We run this system in our own businesses. Now you can too.
          </p>
        </div>
      </div>
    </section>
  );
}
