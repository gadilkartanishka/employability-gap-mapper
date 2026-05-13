import {
  coveredSkills,
  marketTopSkills,
  programComparison,
  skillCoverageMatrix,
  summary,
  topMissingSkills,
} from "@/data/internalMockData";

export function ResultsDashboardPage() {
  return (
    <div>
      <header className="mb-4 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[22px] md:text-[26px] tracking-[-0.02em] text-ink">Results Dashboard</h1>
          <p className="mt-1.5 text-[13px] text-muted-foreground">Insight first, detail second.</p>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">Dataset updated: {summary.datasetDate}</div>
      </header>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
        <MetricCard label="Gap Score" value={`${summary.gapScore}%`} tone="bad" />
        <MetricCard label="Covered" value={String(summary.covered)} tone="good" />
        <MetricCard label="Missing" value={String(summary.missing)} tone="bad" />
        <MetricCard label="Excess" value={String(summary.excess)} tone="warn" />
      </div>

      <div className="grid xl:grid-cols-12 gap-4 mb-4">
        <section className="xl:col-span-6 hairline bg-card p-4 md:p-5">
          <h2 className="text-[16px] text-ink">Top Missing Skills</h2>
          <div className="mt-3 space-y-2.5">
            {topMissingSkills.map((s) => (
              <div key={s.skill}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-ink">{s.skill}</span>
                  <span className="text-muted-foreground">{s.demand}% demand</span>
                </div>
                <div className="h-1.5 bg-secondary">
                  <div className="h-full bg-destructive" style={{ width: `${s.demand}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="xl:col-span-6 hairline bg-card p-4 md:p-5">
          <h2 className="text-[16px] text-ink">Program Comparison (Gap %)</h2>
          <div className="mt-3 space-y-2.5">
            {programComparison.map((p) => (
              <div key={p.program}>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="text-ink">{p.program}</span>
                  <span className="text-muted-foreground">{p.gap}%</span>
                </div>
                <div className="h-1.5 bg-secondary">
                  <div className="h-full bg-ink" style={{ width: `${p.gap}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid xl:grid-cols-12 gap-4">
        <section className="xl:col-span-5 hairline bg-card p-4 md:p-5">
          <h2 className="text-[16px] text-ink">Market Top Skills</h2>
          <ul className="mt-3 space-y-1.5 text-[13px]">
            {marketTopSkills.map((s) => (
              <li key={s.skill} className="flex justify-between">
                <span className="text-ink">{s.skill}</span>
                <span className="text-muted-foreground">{s.score}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-[16px] text-ink mt-5">Curriculum Covered Skills</h2>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {coveredSkills.map((s) => (
              <span key={s} className="text-[11px] px-2 py-0.5 hairline text-deep-sage">{s}</span>
            ))}
          </div>
        </section>

        <section className="xl:col-span-7 hairline bg-card p-4 md:p-5 overflow-x-auto">
          <h2 className="text-[16px] text-ink">Skill Coverage Matrix</h2>
          <table className="mt-3 w-full text-[12px] min-w-[560px]">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="pb-1.5">Skill</th>
                <th className="pb-1.5">B.Tech CSE</th>
                <th className="pb-1.5">B.Tech IT</th>
                <th className="pb-1.5">MCA</th>
              </tr>
            </thead>
            <tbody>
              {skillCoverageMatrix.map((row) => (
                <tr key={row.skill} className="hairline-t">
                  <td className="py-2 text-ink">{row.skill}</td>
                  <td className="py-2">{row.cse ? "Covered" : "Missing"}</td>
                  <td className="py-2">{row.it ? "Covered" : "Missing"}</td>
                  <td className="py-2">{row.mca ? "Covered" : "Missing"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

function MetricCard({ label, value, tone }: { label: string; value: string; tone: "good" | "warn" | "bad" }) {
  const color = tone === "good" ? "text-deep-sage" : tone === "warn" ? "text-ink" : "text-destructive";
  return (
    <div className="hairline bg-card p-3.5">
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">{label}</div>
      <div className={`mt-1.5 text-[24px] leading-none ${color}`}>{value}</div>
    </div>
  );
}
