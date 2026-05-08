import { useState } from "react";

const LIVE_SKILLS = [
  "React.js", "AWS", "Kubernetes", "TypeScript", "PostgreSQL", "Docker",
  "Kafka", "GraphQL", "Terraform", "PyTorch", "Next.js", "Redis",
  "Snowflake", "Rust", "gRPC", "Airflow", "Tailwind", "Spark",
];

export function HeroSection() {
  const [imageMissing, setImageMissing] = useState(false);

  return (
    <section className="relative hairline-b overflow-hidden bg-gradient-to-b from-[#fbfbff] via-background to-background">
      <div className="absolute inset-0 grid-bg opacity-[0.12] pointer-events-none" />
      <div className="mx-auto max-w-[1380px] px-6 md:px-10 pt-16 pb-20 md:pt-20 md:pb-24 grid lg:grid-cols-12 gap-10 items-center relative">
        {/* LEFT */}
        <div className="lg:col-span-7 fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-deep-sage animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-sage">
              Live · scraping naukri.com
            </span>
          </div>

          <h1 className="text-[30px] md:text-[38px] lg:text-[46px] leading-[1.08] tracking-[-0.015em] text-ink font-semibold">
            Turn your{" "}
            <span className="font-mono text-[0.66em] align-middle rounded-xl border border-[#d9dced] bg-white/85 px-2.5 py-1 mx-1 text-deep-sage">
              syllabus.pdf
            </span>
            <br />
            into a{" "}
            <span className="italic font-serif text-deep-sage">job-ready</span> curriculum.
          </h1>

          <p className="mt-6 max-w-xl text-[14px] md:text-[15px] leading-relaxed text-muted-foreground">
            We extract the skills you teach, compare them to live hiring demand,
            and quantify your curriculum gap in minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2.5 rounded-xl bg-deep-sage text-background font-mono text-[11px] px-4 py-2.5 border border-deep-sage shadow-[0_6px_16px_rgba(71,110,102,0.22)] hover:brightness-95 transition-all"
            >
              Start a free pilot
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#evidence"
              className="inline-flex items-center gap-2 rounded-xl font-mono text-[11px] px-4 py-2.5 border border-[#d9dced] bg-white/80 text-ink hover:bg-white transition-colors"
            >
              See a sample report
            </a>
          </div>

          {/* live ticker */}
          <div className="mt-10 border border-[#d9dced] bg-white/80 rounded-2xl max-w-[760px] shadow-[0_8px_24px_rgba(60,62,120,0.08)]">
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#e6e9f2]">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
                live feed · cse · last 24h
              </span>
              <span className="ml-auto font-mono text-[9px] text-sage">
                12,847 listings
              </span>
            </div>
            <div className="overflow-hidden py-3">
              <div className="ticker-track">
                {[...LIVE_SKILLS, ...LIVE_SKILLS].map((s, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] text-[#6b70a6] whitespace-nowrap flex items-center gap-3"
                  >
                    <span className="text-[#c8cde7]">▮</span> {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex lg:col-span-5 justify-end items-center">
          <div className="w-full max-w-[900px]">
            {imageMissing ? (
              <div className="min-h-[420px] rounded-2xl border border-[#d9dced] bg-white/80 flex items-center justify-center text-center px-6">
                <p className="font-mono text-[11px] text-muted-foreground">
                  Add your hero image at
                  <br />
                  <span className="text-ink">frontend/public/hero-illustration.png</span>
                </p>
              </div>
            ) : (
              <img
                src="/hero-illustration.png"
                alt="Employability Gap Mapper dashboard illustration"
                className="block w-full h-auto drop-shadow-[0_24px_30px_rgba(88,90,160,0.18)] saturate-[0.92] contrast-[0.96]"
                loading="eager"
                onError={() => setImageMissing(true)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
