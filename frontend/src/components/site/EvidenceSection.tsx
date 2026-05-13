import { useInViewOnce } from "@/hooks/useInViewOnce";

export function EvidenceSection() {
  const covered = 38;
  const missing = 27;
  const excess = 12;
  const total = covered + missing + excess;
  const { ref, inView } = useInViewOnce<HTMLElement>(0.2);

  return (
    <section id="results" className={`relative hairline-b bg-secondary/40 overflow-hidden ${inView ? "motion-running" : "motion-paused"}`} ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(147, 153, 196, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(147, 153, 196, 0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          backgroundPosition: "-1px -1px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 py-24 md:py-32 grid lg:grid-cols-12 gap-14 items-center">
        {/* left — front-facing report card */}
        <div className={`lg:col-span-5 relative h-[380px] md:h-[450px] flex items-center justify-center ${inView ? "pop-left" : "pre-reveal"}`}>
          <div className="relative z-10 w-[240px] h-[320px] hairline bg-card shadow-[0_18px_35px_rgba(65,70,110,0.10)] hover-tilt float-soft">
            <div className="p-5 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="w-2 h-2 bg-deep-sage" />
                <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-muted-foreground">
                  gap report · v1
                </div>
              </div>
              <div className="font-mono text-[8px] text-ink leading-tight">
                CSE · YEAR 4 · 2024–25
              </div>
              <div className="my-3 hairline-t" />
              <div className="space-y-1.5">
                {[80, 60, 70, 45, 55, 65, 40].map((w, k) => (
                  <div key={k} className="flex items-center gap-1.5">
                    <div className="h-1 bg-hairline flex-1">
                      <div className="h-full bg-deep-sage" style={{ width: `${w}%` }} />
                    </div>
                    <span className="font-mono text-[7px] text-muted-foreground w-6 text-right">
                      {w}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex items-baseline justify-between">
                <span className="font-mono text-[8px] text-muted-foreground">GAP</span>
                <span className="font-mono text-[18px] text-destructive">72%</span>
              </div>
            </div>
          </div>
        </div>

        {/* right — interactive dashboard preview */}
        <div className={`lg:col-span-7 ${inView ? "pop-right" : "pre-reveal"}`} style={{ animationDelay: "0.12s" }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] text-sage">04</span>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
              the evidence
            </span>
          </div>
          <h2 className="text-[34px] md:text-[48px] leading-[1.05] tracking-[-0.02em] text-ink mb-10">
            A printable PDF your
            <br />academic council can't argue with.
          </h2>

          <div className="hairline bg-card hover-lift">
            {/* top bar */}
            <div className="hairline-b px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full" />
                <div className="w-2 h-2 bg-hairline rounded-full" />
                <div className="w-2 h-2 bg-hairline rounded-full" />
                <span className="ml-3 font-mono text-[11px] text-muted-foreground">
                  dashboard · cse-y4.pdf
                </span>
              </div>
              <span className="font-mono text-[11px] text-deep-sage">↓ Download report</span>
            </div>

            <div className="grid sm:grid-cols-3 hairline-b">
              <Stat label="Gap Score" value="72%" tone="bad" inView={inView} delay="0.16s" />
              <Stat label="Skills covered" value={`${covered}/${total}`} tone="good" inView={inView} delay="0.24s" />
              <Stat label="Missing skills" value={`${missing}`} tone="warn" inView={inView} delay="0.32s" />
            </div>

            {/* gauge + tags */}
            <div className="grid md:grid-cols-5 gap-0">
              <div className="md:col-span-2 p-6 md:hairline-r">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-4">
                  readiness gauge
                </div>
                <div className="flex items-end gap-3 h-44">
                  {[
                    { y: "Y1", h: 40, c: "bg-sage" },
                    { y: "Y2", h: 55, c: "bg-sage" },
                    { y: "Y3", h: 48, c: "bg-deep-sage" },
                    { y: "Y4", h: 28, c: "bg-destructive" },
                  ].map((b) => (
                    <div key={b.y} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full h-full hairline relative overflow-hidden bg-background">
                        <div
                          className={`absolute bottom-0 inset-x-0 ${b.c} gauge-fill`}
                          style={{ height: `${b.h}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">{b.y}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 p-6">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-4">
                  top missing skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    ["Kubernetes", "missing"],
                    ["System Design", "missing"],
                    ["AWS", "missing"],
                    ["Docker", "missing"],
                    ["TypeScript", "missing"],
                    ["DSA", "covered"],
                    ["OS", "covered"],
                    ["DBMS", "covered"],
                    ["FORTRAN", "excess"],
                    ["Pascal", "excess"],
                    ["GraphQL", "missing"],
                    ["Kafka", "missing"],
                  ].map(([s, t]) => (
                    <span
                      key={s}
                      className={`font-mono text-[11px] px-2.5 py-1 hairline chip-pop ${
                        t === "missing"
                          ? "border-destructive/40 text-destructive"
                          : t === "covered"
                          ? "border-deep-sage/40 text-deep-sage"
                          : "border-hairline text-muted-foreground line-through"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, tone, inView, delay }: { label: string; value: string; tone: "good" | "warn" | "bad"; inView: boolean; delay: string }) {
  const color =
    tone === "bad" ? "text-destructive" : tone === "warn" ? "text-ink" : "text-deep-sage";
  return (
    <div className={`p-5 md:hairline-r ${inView ? "pop-up" : "pre-reveal"}`} style={{ animationDelay: delay }}>
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
        {label}
      </div>
      <div className={`mt-2 text-[32px] tracking-[-0.02em] ${color}`}>{value}</div>
    </div>
  );
}
