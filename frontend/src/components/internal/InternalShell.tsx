import {
  BarChart3,
  Bell,
  FileDown,
  HelpCircle,
  LayoutDashboard,
  Search,
  Settings,
  Upload,
} from "lucide-react";

export type InternalPage = "dashboard" | "upload" | "analysis" | "reports" | "settings";

const navItems: { id: InternalPage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "dashboard", label: "Workload", icon: LayoutDashboard },
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
    <main className="internal-soft min-h-screen bg-[#F3F6FA] text-[#0F172A]">
      <div className="flex min-h-screen text-[14px]">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-[#E3E9F1] bg-white md:flex">
          <div className="border-b border-[#E8EDF4] px-4 py-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-md object-contain" />
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Analytics</p>
                <p className="text-[11px] text-[#64748B]">Employability Gap Mapper</p>
              </div>
            </div>
          </div>

          <div className="px-3 py-3">
            <p className="px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[#94A3B8]">Spaces</p>
            <nav className="mt-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChange(item.id)}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] transition ${
                      isActive
                        ? "bg-[#EDF4FF] text-[#155EEF]"
                        : "text-[#334155] hover:bg-[#F4F7FB] hover:text-[#0F172A]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto border-t border-[#E8EDF4] p-3">
            <button className="mb-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[#475569] hover:bg-[#F4F7FB]">
              <HelpCircle className="h-4 w-4" /> Support
            </button>
            <button
              onClick={() => onChange("settings")}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-[#475569] hover:bg-[#F4F7FB]"
            >
              <Settings className="h-4 w-4" /> Settings
            </button>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-[#E3E9F1] bg-[#F9FBFE]/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 lg:px-8">
              <div className="text-sm text-[#64748B]">Internal Dashboard <span className="mx-1">›</span> <span className="font-medium text-[#0F172A]">Gap Intelligence</span></div>
              <div className="flex items-center gap-2">
                <button className="grid h-9 w-9 place-items-center rounded-lg border border-[#DCE5EF] bg-white text-[#64748B]">
                  <Search className="h-4 w-4" />
                </button>
                <button className="grid h-9 w-9 place-items-center rounded-lg border border-[#DCE5EF] bg-white text-[#64748B]">
                  <Bell className="h-4 w-4" />
                </button>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#FFE3B3] text-sm font-semibold text-[#92400E]">TG</div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1400px] px-5 py-5 lg:px-8">{children}</div>
        </section>
      </div>
    </main>
  );
}
