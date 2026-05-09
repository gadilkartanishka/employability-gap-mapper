import { useEffect, useState } from "react";
import { Sun } from "lucide-react";

const THEME_KEY = "egm-theme";

type ThemeMode = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    const initial: ThemeMode =
      stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next: ThemeMode = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(THEME_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="fixed right-5 bottom-5 z-[90] inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 text-[11px] font-mono tracking-[0.14em] uppercase text-ink shadow-[0_10px_24px_rgba(34,38,84,0.16)] backdrop-blur-sm transition hover:bg-card"
    >
      <Sun size={14} className="text-accent-foreground" />
      <span>{theme === "dark" ? "light" : "dark"}</span>
    </button>
  );
}
