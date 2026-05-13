export function SiteHeader({ onStartAnalysis }: { onStartAnalysis?: () => void }) {
  return (
    <header className="sticky top-0 z-50 pt-5 fade-in">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="h-[62px] relative flex items-center justify-between gap-6 rounded-[20px] px-5 md:px-6 bg-white/88 backdrop-blur-sm border border-[#d9dced] shadow-[0_8px_24px_rgba(39,44,82,0.08)]">
        <a href="/" className="flex items-center gap-2.5 hover-lift">
          <img src="/logo.png" alt="GapMapper logo" className="h-8 w-8 object-contain" />
        </a>

        <nav className="hidden md:flex items-center justify-center gap-9 font-medium text-[13px] text-ink/85 absolute left-1/2 -translate-x-1/2">
          <a href="#overview" className="hover:text-ink transition-colors">Overview</a>
          <a href="#logic" className="hover:text-ink transition-colors">Logic</a>
          <a href="#results" className="hover:text-ink transition-colors">Results</a>
          <a href="#reports" className="hover:text-ink transition-colors">Reports</a>
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <button className="text-[13px] px-4 py-2 text-ink/90 hover:text-ink transition-colors">
            Login
          </button>
          {onStartAnalysis ? (
            <button
              type="button"
              onClick={onStartAnalysis}
              className="text-[13px] px-5 py-2 rounded-[14px] bg-ink text-background border border-ink hover:bg-deep-sage hover:border-deep-sage transition-colors glow-pulse"
            >
              Start Analysis →
            </button>
          ) : (
            <a href="#logic" className="text-[13px] px-5 py-2 rounded-[14px] bg-ink text-background border border-ink hover:bg-deep-sage hover:border-deep-sage transition-colors glow-pulse">
              Explore Results →
            </a>
          )}
        </div>
      </div>
      </div>
    </header>
  );
}
