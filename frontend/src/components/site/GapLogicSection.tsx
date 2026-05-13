import { useEffect, useRef, useState } from "react";

export function GapLogicSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasEnteredView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  return (
    <section id="logic" className={`hairline-b ${hasEnteredView ? "motion-running" : "motion-paused"}`} ref={sectionRef}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-[11px] text-sage">02</span>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            the gap, defined
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* kinetic typography */}
          <div className={`lg:col-span-5 scene relative h-[320px] lg:h-[380px] hairline bg-card overflow-hidden hover-tilt ${hasEnteredView ? "pop-left" : "pre-reveal"}`}>
            <div className="absolute inset-0 grid-bg opacity-30 drift-bg" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <div className={hasEnteredView ? "reveal-seq" : "reveal-hidden"}>
                <div
                  className="kinetic-word text-[34px] md:text-[54px] leading-none tracking-[-0.03em] text-ink font-medium"
                  style={{ animationPlayState: hasEnteredView ? "running" : "paused" }}
                >
                  Curriculum
                </div>
              </div>
              <div
                className={`font-mono text-[22px] md:text-[34px] text-sage leading-none ${hasEnteredView ? "reveal-seq" : "reveal-hidden"}`}
                style={{ animationDelay: "0.35s" }}
              >
                ≠
              </div>
              <div className={hasEnteredView ? "reveal-seq" : "reveal-hidden"} style={{ animationDelay: "0.7s" }}>
                <div
                  className="kinetic-word b text-[34px] md:text-[54px] leading-none tracking-[-0.03em] text-deep-sage font-medium italic"
                  style={{ animationPlayState: hasEnteredView ? "running" : "paused" }}
                >
                  Industry
                </div>
              </div>
            </div>
          </div>

          {/* formula */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className={`hairline bg-card h-[320px] lg:h-[380px] p-6 md:p-7 flex flex-col hover-lift ${hasEnteredView ? "pop-right" : "pre-reveal"}`} style={{ animationDelay: "0.12s" }}>
              <h2 className="text-[34px] md:text-[44px] leading-[1.05] tracking-[-0.02em] text-ink mb-6">
                One number says it all.
              </h2>
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Curriculum Gap Score</span>
                <span className="text-[44px] md:text-[56px] font-semibold text-destructive leading-none">72%</span>
              </div>
              <p className="mt-3 text-[14px] text-muted-foreground">
                72% of high-demand market skills are currently missing from this sample CSE syllabus.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="hairline p-3 hover-lift">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Covered</div>
                  <div className="mt-1 text-[20px] font-semibold text-ink">28%</div>
                </div>
                <div className="hairline p-3 hover-lift">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Updated</div>
                  <div className="mt-1 text-[20px] font-semibold text-ink">7 days</div>
                </div>
              </div>
              <div className="mt-auto hairline-t pt-4 flex items-center justify-between text-[13px]">
                <span className="text-muted-foreground">Top missing skills</span>
                <span className="text-deep-sage">Docker · Kubernetes · CI/CD</span>
              </div>
            </div>

            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Every uploaded syllabus is reduced to a deterministic score.
              No vibes. No gut feel. Just the percentage of in-demand skills
              your students never see.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
