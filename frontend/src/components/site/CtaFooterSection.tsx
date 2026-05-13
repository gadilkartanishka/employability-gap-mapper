import { useState } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

export function CtaFooterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { ref, inView } = useInViewOnce<HTMLElement>(0.2);

  return (
    <section id="cta" ref={ref} className={`relative ${inView ? "motion-running" : "motion-paused"}`}>
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none drift-bg" />
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 relative">
        <div className="max-w-3xl fade-up">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-sage mb-6">
            06 · onboarding
          </div>
          <h2 className="text-[40px] md:text-[64px] leading-[1.0] tracking-[-0.025em] text-ink">
            Find your gap in
            <br />
            <span className="italic font-serif text-deep-sage">under five minutes.</span>
          </h2>
          <p className="mt-8 max-w-xl text-[16px] text-muted-foreground leading-relaxed">
            Drop your official college email below. We'll provision a sandbox,
            walk you through your first syllabus upload, and hand you a branded
            PDF report — free for the pilot cohort.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
            className="mt-12 hairline bg-card flex flex-col sm:flex-row hover-lift"
          >
            <div className="flex items-center gap-3 px-5 py-4 sm:hairline-r flex-1">
              <span className="font-mono text-[11px] text-sage tracking-[0.18em] uppercase">
                @college
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="placement@yourcollege.edu.in"
                className="flex-1 bg-transparent outline-none font-mono text-[14px] text-ink placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              className="bg-ink text-background font-mono text-[13px] px-7 py-4 hover:bg-deep-sage transition-colors flex items-center justify-center gap-2 glow-pulse"
            >
              {submitted ? "Request received ✓" : "Request pilot access →"}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-6 font-mono text-[11px] text-muted-foreground">
            <span>· no credit card</span>
            <span>· first report in &lt; 5 min</span>
            <span>· cse branch · mvp</span>
          </div>
        </div>
      </div>

      <footer className="hairline-t">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-8 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="GapMapper logo" className="h-6 w-6 object-contain logo-bob" />
            <span className="font-mono text-[11px] text-muted-foreground ml-3">
              v1.0 · mvp · 2026
            </span>
          </div>
          <div className="flex gap-6 font-mono text-[11px] text-muted-foreground">
            <a href="#" className="hover:text-ink cta-link">Privacy</a>
            <a href="#" className="hover:text-ink cta-link">Terms</a>
            <a href="#" className="hover:text-ink cta-link">Docs</a>
            <a href="#" className="hover:text-ink cta-link">contact@gapmapper.edu</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
