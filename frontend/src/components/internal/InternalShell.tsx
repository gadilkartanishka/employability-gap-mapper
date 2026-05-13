import { BarChart3, FileDown, LayoutDashboard, Settings, Upload } from "lucide-react";

export type InternalPage = "dashboard" | "upload" | "analysis" | "reports" | "settings";

const navItems: { id: InternalPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "upload", label: "Upload Syllabus", icon: Upload },
  { id: "analysis", label: "Gap Analysis", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: FileDown },
  { id: "settings", label: "Settings", icon: Settings },
];

export function InternalShell({
  active,
  onChange,
  children,
}: {
  active: InternalPage;
  onChange: (page: InternalPage) => void;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen text-[14px]">
        <aside className="hidden md:flex w-56 shrink-0 flex-col bg-ink text-background border-r border-white/10">
          <div className="px-4 py-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain" />
              <div className="leading-tight">
                <div className="text-[13px] font-semibold">Gap Mapper</div>
                <div className="text-[10px] text-white/65">Employability Intelligence</div>
              </div>
            </div>
          </div>

          <div className="px-3 py-2.5 border-b border-white/10">
            <div className="px-2 py-2 rounded-md bg-white/8">
              <div className="text-[10px] uppercase tracking-wide text-white/65">College</div>
              <div className="text-[12px] font-medium truncate">Acharya Institute of Technology</div>
              <div className="text-[10px] text-white/65">Computer Science & Engineering</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[12px] transition-colors ${
                    isActive ? "bg-deep-sage text-background" : "text-white/85 hover:bg-white/12 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="px-3 py-2.5 border-t border-white/10">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[12px] text-white/80 hover:bg-white/12">
              Sign out
            </button>
          </div>
        </aside>

        <section className="flex-1 min-w-0">
          <div className="px-5 lg:px-8 py-6 max-w-7xl mx-auto">{children}</div>
        </section>
      </div>
    </main>
  );
}
