import { programs, roles, type Program, type Role } from "@/data/internalMockData";

export function AnalysisSetupPage({
  role,
  program,
  compareMode,
  onRoleChange,
  onProgramChange,
  onCompareModeChange,
  onRun,
}: {
  role: Role;
  program: Program;
  compareMode: boolean;
  onRoleChange: (role: Role) => void;
  onProgramChange: (program: Program) => void;
  onCompareModeChange: (value: boolean) => void;
  onRun: () => void;
}) {
  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[22px] md:text-[26px] tracking-[-0.02em] text-ink">Analysis Setup</h1>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          Configure a role-program comparison and run analysis in under one minute.
        </p>
      </header>

      <div className="grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 hairline bg-card p-4 md:p-5">
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">Target Role</span>
              <select
                value={role}
                onChange={(e) => onRoleChange(e.target.value as Role)}
                className="mt-1.5 w-full h-10 hairline bg-background px-3 text-[13px] text-ink focus:outline-none"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">Program</span>
              <select
                value={program}
                onChange={(e) => onProgramChange(e.target.value as Program)}
                className="mt-1.5 w-full h-10 hairline bg-background px-3 text-[13px] text-ink focus:outline-none"
              >
                {programs.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-3.5 flex items-center gap-2 text-[12px] text-muted-foreground">
            <input
              type="checkbox"
              checked={compareMode}
              onChange={(e) => onCompareModeChange(e.target.checked)}
              className="accent-[var(--color-deep-sage)]"
            />
            Compare multiple programs
          </label>

          <button
            type="button"
            onClick={onRun}
            className="mt-5 h-10 px-4 font-mono text-[10px] tracking-[0.08em] uppercase bg-ink text-background hover:bg-deep-sage transition-colors"
          >
            Run Analysis
          </button>
        </div>

        <div className="lg:col-span-4 hairline bg-card p-4 md:p-5">
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">Selection Summary</div>
          <div className="mt-3.5 space-y-2.5 text-[13px]">
            <div className="flex justify-between"><span className="text-muted-foreground">Role</span><span className="text-ink">{role}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Program</span><span className="text-ink">{program}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Mode</span><span className="text-ink">{compareMode ? "Comparison" : "Single"}</span></div>
          </div>
          <div className="mt-5 hairline-t pt-3.5 text-[12px] text-muted-foreground leading-relaxed">
            Output includes gap score, covered/missing/excess counts, top missing skills, and comparison evidence.
          </div>
        </div>
      </div>
    </div>
  );
}
