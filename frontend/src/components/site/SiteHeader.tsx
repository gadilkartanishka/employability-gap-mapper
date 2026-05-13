export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 hairline-b fade-in">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 relative flex items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-2.5 hover-lift">
          <img src="/logo.png" alt="GapMapper logo" className="h-8 w-8 object-contain logo-bob" />
        </a>

        <nav className="hidden md:flex items-center justify-center gap-8 font-mono text-[12px] text-muted-foreground absolute left-1/2 -translate-x-1/2">
          <a href="#logic" className="hover:text-ink transition-colors hover-lift">01 · Logic</a>
          <a href="#features" className="hover:text-ink transition-colors hover-lift">02 · Engine</a>
          <a href="#evidence" className="hover:text-ink transition-colors hover-lift">03 · Evidence</a>
          <a href="#personas" className="hover:text-ink transition-colors hover-lift">04 · Personas</a>
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <button className="font-mono text-[12px] px-3.5 py-2 text-ink hover:text-deep-sage transition-colors hover-lift">
            Login
          </button>
          <button className="font-mono text-[12px] px-3.5 py-2 bg-ink text-background hairline border-ink hover:bg-deep-sage hover:border-deep-sage transition-colors hover-lift glow-pulse">
            Pilot Access →
          </button>
        </div>
      </div>
    </header>
  );
}
