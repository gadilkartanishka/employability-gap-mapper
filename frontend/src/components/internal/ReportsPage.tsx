import { reportExports, summary } from "@/data/internalMockData";

export function ReportsPage() {
  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[22px] md:text-[26px] tracking-[-0.02em] text-ink">Reports & Export</h1>
        <p className="mt-1.5 text-[13px] text-muted-foreground">Share decision-ready outputs with leadership and curriculum teams.</p>
      </header>

      <section className="hairline bg-card p-4 md:p-5 mb-4">
        <h2 className="text-[16px] text-ink">Report Summary</h2>
        <div className="mt-3 grid sm:grid-cols-3 gap-3 text-[13px]">
          <div className="hairline bg-background p-3.5">
            <div className="text-muted-foreground">Gap Score</div>
            <div className="mt-1 text-[22px] text-destructive">{summary.gapScore}%</div>
          </div>
          <div className="hairline bg-background p-3.5">
            <div className="text-muted-foreground">Missing Skills</div>
            <div className="mt-1 text-[22px] text-ink">{summary.missing}</div>
          </div>
          <div className="hairline bg-background p-3.5">
            <div className="text-muted-foreground">Dataset Date</div>
            <div className="mt-1 text-[22px] text-ink">{summary.datasetDate}</div>
          </div>
        </div>
      </section>

      <section className="hairline bg-card p-4 md:p-5">
        <h2 className="text-[16px] text-ink">Export Options</h2>
        <div className="mt-3 grid md:grid-cols-3 gap-3">
          {reportExports.map((exp) => (
            <article key={exp.id} className="hairline bg-background p-3.5">
              <h3 className="text-[14px] text-ink">{exp.label}</h3>
              <p className="mt-1.5 text-[12px] text-muted-foreground leading-relaxed">{exp.description}</p>
              <button type="button" className="mt-3 h-9 px-3.5 font-mono text-[10px] tracking-[0.08em] uppercase bg-ink text-background hover:bg-deep-sage transition-colors">
                Export
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
