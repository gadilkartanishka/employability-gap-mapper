import {
  coveredSkills,
  marketTopSkills,
  programComparison,
  summary,
  topMissingSkills,
} from "@/data/internalMockData";
import { ArrowUpRight, CalendarDays, ChevronDown, Download, Share2 } from "lucide-react";

const gapTrend = [78, 76, 74, 72, 70, 68];
const benchmarkTrend = [73, 72, 71, 70, 69, 67];
const cycles = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];

const roleReadiness = [
  { role: "Software Developer", readiness: 58, demand: 86 },
  { role: "Data Analyst", readiness: 64, demand: 78 },
  { role: "Cloud Engineer", readiness: 43, demand: 82 },
  { role: "QA Automation", readiness: 61, demand: 69 },
];

const pressureWindows = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"];
const skillPressure = topMissingSkills.map((skill, idx) =>
  pressureWindows.map((_, col) => Math.max(1, Math.round((skill.demand - 52) / 10) + ((col + idx) % 3) - 1))
);

export function ResultsDashboardPage() {
  const total = summary.covered + summary.missing + summary.excess;
  const alignment = Math.round((summary.covered / (summary.covered + summary.missing)) * 100);
  const highPriorityGaps = topMissingSkills.filter((s) => s.demand >= 80).length;

  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-[#E7ECF3] bg-white p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-[#0F172A]">Curriculum Gap Intelligence</h1>
            <p className="mt-1 text-sm text-[#64748B]">
              Built for employability mapping, not generic analytics. Last refresh: {summary.datasetDate}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FilterPill icon={<CalendarDays className="h-3.5 w-3.5" />} label="Academic Year 2026" />
            <FilterPill label="B.Tech CSE + IT" />
            <button className="inline-flex items-center gap-1 rounded-xl border border-[#D7E0EA] px-3 py-2 text-sm text-[#475569]">
              <Share2 className="h-4 w-4" /> Share
            </button>
            <button className="inline-flex items-center gap-1 rounded-xl bg-[#1570EF] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#155ad2]">
              <Download className="h-4 w-4" /> Export Report
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Gap Score" value={`${summary.gapScore}%`} delta="-4.2% vs last cycle" tone="down" />
        <MetricCard label="Industry Alignment" value={`${alignment}%`} delta="+6.1% coverage trend" tone="up" />
        <MetricCard label="High-Priority Gaps" value={String(highPriorityGaps)} delta="Needs curriculum action" tone="warn" />
        <MetricCard label="Tracked Skills" value={String(total)} delta={`${summary.covered} covered · ${summary.missing} missing`} tone="up" />
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <section className="xl:col-span-7 rounded-2xl border border-[#E7ECF3] bg-white p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[#0F172A]">Gap Score Trend by Review Cycle</h2>
            <FilterPill label="Gap % vs benchmark" compact />
          </div>
          <GapTrendChart />
        </section>

        <section className="xl:col-span-5 rounded-2xl border border-[#E7ECF3] bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#0F172A]">Skill Mix Composition</h2>
            <FilterPill label="Current snapshot" compact />
          </div>
          <CoverageDonut />
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <section className="xl:col-span-6 rounded-2xl border border-[#E7ECF3] bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold text-[#0F172A]">Role Readiness vs Market Demand</h2>
          <div className="space-y-3">
            {roleReadiness.map((row, idx) => (
              <RoleRow key={row.role} row={row} idx={idx} />
            ))}
          </div>
        </section>

        <section className="xl:col-span-6 rounded-2xl border border-[#E7ECF3] bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#0F172A]">Missing Skill Pressure Across Semesters</h2>
            <FilterPill label="Priority skills" compact />
          </div>
          <PressureHeatmap />
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#E7ECF3] bg-white p-4">
          <h3 className="text-sm font-semibold text-[#0F172A]">Program Comparison (Gap %)</h3>
          <div className="mt-3 space-y-2.5">
            {programComparison.map((row, idx) => (
              <div key={row.program}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-[#0F172A]">{row.program}</span>
                  <span className="text-[#64748B]">{row.gap}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#EFF4FA]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#64A5FF] to-[#1570EF]"
                    style={{ width: `${row.gap}%`, animation: `growBar 900ms ease ${100 * idx}ms both` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#E7ECF3] bg-white p-4">
          <h3 className="text-sm font-semibold text-[#0F172A]">Action Queue: Top Missing Skills</h3>
          <div className="mt-3 space-y-2.5">
            {topMissingSkills.map((skill, idx) => (
              <div key={skill.skill} className="rounded-xl border border-[#ECF1F7] p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#0F172A]">{skill.skill}</p>
                    <p className="text-xs text-[#64748B]">Market demand signal: {skill.demand}%</p>
                  </div>
                  <span
                    className="rounded-full px-2 py-1 text-[11px] font-medium"
                    style={{
                      background: skill.demand >= 85 ? "#FEE2E2" : "#FFF3CD",
                      color: skill.demand >= 85 ? "#B42318" : "#9A6700",
                      animation: `cellIn 450ms ease ${idx * 80}ms both`,
                    }}
                  >
                    {skill.demand >= 85 ? "Critical" : "High"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="rounded-2xl border border-[#E7ECF3] bg-white p-4">
        <h3 className="text-sm font-semibold text-[#0F172A]">Currently Covered Foundation Skills</h3>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {coveredSkills.concat(marketTopSkills.map((s) => s.skill)).map((skill) => (
            <span key={skill} className="rounded-full border border-[#DCE5EF] bg-[#F8FBFF] px-2 py-1 text-[11px] text-[#334155]">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, icon, compact }: { label: string; icon?: React.ReactNode; compact?: boolean }) {
  return (
    <button className={`inline-flex items-center gap-1.5 rounded-lg border border-[#D7E0EA] bg-white text-[#475569] ${compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"}`}>
      {icon}
      {label}
      <ChevronDown className="h-3.5 w-3.5 text-[#94A3B8]" />
    </button>
  );
}

function MetricCard({ label, value, delta, tone }: { label: string; value: string; delta: string; tone: "up" | "down" | "warn" }) {
  const toneClass = tone === "up" ? "text-[#08966A]" : tone === "down" ? "text-[#CA6A04]" : "text-[#B42318]";
  return (
    <div className="rounded-2xl border border-[#E7ECF3] bg-white p-3.5">
      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#64748B]">{label}</p>
      <p className="mt-1.5 text-[30px] font-semibold leading-none tracking-[-0.02em] text-[#0F172A]">{value}</p>
      <p className={`mt-2 inline-flex items-center gap-1 text-xs ${toneClass}`}>
        <ArrowUpRight className={`h-3 w-3 ${tone === "down" ? "rotate-90" : ""}`} />
        {delta}
      </p>
    </div>
  );
}

function GapTrendChart() {
  const max = 80;
  const toPath = (values: number[]) =>
    values
      .map((v, i) => {
        const x = 12 + i * 16;
        const y = 56 - (v / max) * 44;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");

  return (
    <div className="rounded-xl border border-[#ECF1F7] p-3">
      <svg viewBox="0 0 104 60" className="h-60 w-full">
        {[20, 40, 60, 80].map((n) => (
          <line key={n} x1="10" y1={56 - (n / 80) * 44} x2="95" y2={56 - (n / 80) * 44} stroke="#E6EDF5" strokeDasharray="2 3" />
        ))}

        <path d={toPath(benchmarkTrend)} fill="none" stroke="#8EC7F8" strokeWidth="2" strokeLinecap="round" style={{ animation: "pathReveal 1200ms ease both" }} />
        <path d={toPath(gapTrend)} fill="none" stroke="#1570EF" strokeWidth="2.7" strokeLinecap="round" style={{ animation: "pathReveal 1200ms ease 120ms both" }} />

        {cycles.map((label, i) => (
          <text key={label} x={11.5 + i * 16} y="59" fontSize="2.5" fill="#6B7C90">{label}</text>
        ))}
      </svg>
      <div className="mt-2 flex items-center gap-4 text-xs text-[#64748B]">
        <LegendDot color="#1570EF" label="Your institution" />
        <LegendDot color="#8EC7F8" label="Regional benchmark" />
      </div>
    </div>
  );
}

function CoverageDonut() {
  const parts = [
    { label: "Covered", value: summary.covered, color: "#1570EF" },
    { label: "Missing", value: summary.missing, color: "#8EC7F8" },
    { label: "Excess", value: summary.excess, color: "#DCE9F9" },
  ];
  const total = parts.reduce((acc, p) => acc + p.value, 0);
  const circumference = 2 * Math.PI * 70;
  let offsetAcc = 0;

  return (
    <div className="flex flex-col items-center gap-3 pt-2 lg:flex-row lg:items-start lg:justify-between">
      <div className="relative grid h-[220px] w-[220px] place-items-center">
        <svg viewBox="0 0 180 180" className="h-[220px] w-[220px] -rotate-90">
          <circle cx="90" cy="90" r="70" fill="none" stroke="#EAF0F8" strokeWidth="12" />
          {parts.map((part, i) => {
            const arc = (part.value / total) * circumference;
            const dashOffset = circumference - offsetAcc;
            offsetAcc += arc;
            return (
              <circle
                key={part.label}
                cx="90"
                cy="90"
                r="70"
                fill="none"
                stroke={part.color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${arc} ${circumference - arc}`}
                strokeDashoffset={dashOffset}
                style={{ animation: `segmentIn 1000ms ease ${i * 100}ms both` }}
              />
            );
          })}
        </svg>
        <div className="absolute text-center">
          <p className="text-xs text-[#64748B]">Industry alignment</p>
          <p className="mt-1 text-4xl font-semibold tracking-[-0.02em] text-[#0F172A]">{Math.round((summary.covered / (summary.covered + summary.missing)) * 100)}%</p>
          <p className="mt-1 text-xs font-medium text-[#08966A]">Coverage improving</p>
        </div>
      </div>

      <ul className="w-full space-y-2 pt-2 text-sm lg:max-w-[180px]">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#475569]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
              {p.label}
            </div>
            <span className="text-[#0F172A]">{p.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoleRow({ row, idx }: { row: { role: string; readiness: number; demand: number }; idx: number }) {
  return (
    <div className="rounded-xl border border-[#ECF1F7] p-3">
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="font-medium text-[#0F172A]">{row.role}</span>
        <span className="text-[#64748B]">Readiness {row.readiness}% · Demand {row.demand}%</span>
      </div>
      <div className="space-y-1.5">
        <div className="h-2 rounded-full bg-[#EFF4FA]">
          <div className="h-full rounded-full bg-[#1570EF]" style={{ width: `${row.readiness}%`, animation: `growBar 800ms ease ${idx * 90}ms both` }} />
        </div>
        <div className="h-2 rounded-full bg-[#EFF4FA]">
          <div className="h-full rounded-full bg-[#7CC2F9]" style={{ width: `${row.demand}%`, animation: `growBar 800ms ease ${idx * 90 + 80}ms both` }} />
        </div>
      </div>
    </div>
  );
}

function PressureHeatmap() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px]">
        <div className="mb-2 grid grid-cols-[140px_repeat(6,minmax(0,1fr))] gap-1 text-[11px] text-[#64748B]">
          <div />
          {pressureWindows.map((window) => (
            <div key={window} className="text-center">{window}</div>
          ))}
        </div>
        {topMissingSkills.map((skill, row) => (
          <div key={skill.skill} className="mb-1 grid grid-cols-[140px_repeat(6,minmax(0,1fr))] gap-1.5">
            <div className="pt-1 text-xs text-[#475569]">{skill.skill}</div>
            {skillPressure[row].map((value, col) => (
              <div
                key={`${skill.skill}-${col}`}
                className="flex h-7 items-center justify-center rounded-md text-[11px] font-medium text-[#184A7A]"
                style={{
                  background: `rgba(21,112,239,${0.1 + value * 0.12})`,
                  animation: `cellIn 420ms ease ${col * 28 + row * 36}ms both`,
                }}
              >
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </div>
  );
}
