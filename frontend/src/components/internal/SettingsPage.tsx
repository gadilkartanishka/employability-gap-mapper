export function SettingsPage() {
  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[22px] font-semibold tracking-tight text-ink">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage profile details shown in reports and dashboard context.</p>
      </header>

      <div className="space-y-4 max-w-3xl">
        <section className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-[14px] font-semibold text-ink">College Profile</h2>
          <div className="mt-3 grid sm:grid-cols-2 gap-3 text-[13px]">
            <Field label="College Name" value="Acharya Institute of Technology" />
            <Field label="Official Email" value="placement@acharya.edu.in" />
            <Field label="City" value="Bengaluru" />
            <Field label="University" value="VTU" />
          </div>
          <button className="mt-4 h-9 px-3.5 text-[11px] bg-ink text-background hover:bg-deep-sage transition-colors">Save Changes</button>
        </section>

        <section className="rounded-xl border border-border bg-card p-4">
          <h2 className="text-[14px] font-semibold text-ink">Branch Scope</h2>
          <div className="mt-3 space-y-2">
            {[
              ["Computer Science & Engineering", true],
              ["Electronics & Communication", false],
              ["Mechanical Engineering", false],
            ].map(([name, active]) => (
              <div key={String(name)} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-[13px]">
                <span className="text-ink">{name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${active ? "bg-deep-sage/15 text-deep-sage" : "bg-secondary text-muted-foreground"}`}>
                  {active ? "Active" : "Coming soon"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input defaultValue={value} className="mt-1 h-9 w-full border border-border bg-background px-3 text-[13px] text-ink focus:outline-none" />
    </label>
  );
}
