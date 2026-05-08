const LIVE_SKILLS = [
  "React.js", "AWS", "Kubernetes", "TypeScript", "PostgreSQL", "Docker",
  "Kafka", "GraphQL", "Terraform", "PyTorch", "Next.js", "Redis",
  "Snowflake", "Rust", "gRPC", "Airflow", "Tailwind", "Spark",
];

export function HeroSection() {
  return (
    <section className="relative hairline-b overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.35] pointer-events-none" />
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 pt-16 pb-20 md:pt-20 md:pb-24 grid lg:grid-cols-12 gap-10 items-center relative">
        <div className="lg:col-span-7 fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-deep-sage animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-sage">
              Live · scraping naukri.com
            </span>
          </div>

          <h1 className="text-[28px] md:text-[36px] lg:text-[44px] leading-[1.06] tracking-[-0.02em] text-ink font-medium">
            Turn your{" "}
            <span className="font-mono text-[0.7em] align-middle hairline px-2.5 py-1 mx-1 text-deep-sage">
              syllabus.pdf
            </span>
            <br />
            into a <span className="italic font-serif text-deep-sage">job-ready</span> curriculum.
          </h1>

          <p className="mt-6 max-w-xl text-[13px] md:text-[14px] leading-relaxed text-muted-foreground">
            India has 42,000+ engineering colleges; most operate on syllabi designed
            5–10 years ago. We extract the skills you teach, scrape what the market
            hires for, and quantify the gap.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2.5 bg-ink text-background font-mono text-[11px] px-4 py-2.5 hairline border-ink hover:bg-deep-sage hover:border-deep-sage transition-colors"
            >
              Start a free pilot
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#evidence"
              className="inline-flex items-center gap-2 font-mono text-[11px] px-4 py-2.5 hairline text-ink hover:bg-secondary transition-colors"
            >
              See a sample report
            </a>
          </div>

          <div className="mt-10 hairline bg-card max-w-[760px]">
            <div className="flex items-center gap-3 px-4 py-2 hairline-b">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
                live feed · cse · last 24h
              </span>
              <span className="ml-auto font-mono text-[9px] text-sage">12,847 listings</span>
            </div>
            <div className="overflow-hidden py-3">
              <div className="ticker-track">
                {[...LIVE_SKILLS, ...LIVE_SKILLS].map((s, i) => (
                  <span key={i} className="font-mono text-[11px] text-deep-sage whitespace-nowrap flex items-center gap-3">
                    <span className="text-hairline">▮</span> {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-5 justify-end items-center">
          <div className="w-full max-w-[900px]">
            <img
              src="/hero-illustration.png"
              alt="Employability Gap Mapper dashboard illustration"
              className="block w-full h-auto"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
