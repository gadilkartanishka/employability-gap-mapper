import { useEffect, useRef } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";

const LIVE_SKILLS = [
  "React.js", "AWS", "Kubernetes", "TypeScript", "PostgreSQL", "Docker",
  "Kafka", "GraphQL", "Terraform", "PyTorch", "Next.js", "Redis",
  "Snowflake", "Rust", "gRPC", "Airflow", "Tailwind", "Spark",
];

export function HeroSection({ onStartAnalysis }: { onStartAnalysis?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ref, inView } = useInViewOnce<HTMLElement>(0.35);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const getColor = (name: string, alpha: number) => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      if (!raw) return `rgba(102,110,180,${alpha})`;
      const tmp = document.createElement("div");
      tmp.style.position = "absolute";
      tmp.style.opacity = "0";
      tmp.style.pointerEvents = "none";
      tmp.style.color = `oklch(${raw})`;
      document.body.appendChild(tmp);
      const rgb = getComputedStyle(tmp).color;
      document.body.removeChild(tmp);
      const m = rgb.match(/rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)/);
      if (!m) return `rgba(102,110,180,${alpha})`;
      return `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${alpha})`;
    };

    const waves = [
      { amp: 44, freq: 0.0032, speed: 0.0018, offset: 0, color: getColor("--primary", 0.45) },
      { amp: 58, freq: 0.0024, speed: 0.0022, offset: Math.PI / 2, color: getColor("--sage", 0.38) },
      { amp: 36, freq: 0.0039, speed: 0.0027, offset: Math.PI, color: getColor("--foreground", 0.2) },
      { amp: 52, freq: 0.002, speed: 0.0014, offset: Math.PI * 1.5, color: getColor("--deep-sage", 0.3) },
    ];

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      t += prefersReduced ? 0.2 : 1;

      for (const wave of waves) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y =
            h * 0.74 +
            Math.sin(x * wave.freq + t * wave.speed + wave.offset) * wave.amp +
            Math.sin(x * (wave.freq * 0.48) + t * (wave.speed * 1.5)) * (wave.amp * 0.35);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = wave.color;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      raf = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);
    };
  }, [inView]);

  return (
    <section id="overview" ref={ref} className={`relative hairline-b overflow-hidden bg-gradient-to-b from-[#fbfbff] via-background to-background ${inView ? "motion-running" : "motion-paused"}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 grid-bg opacity-[0.08] pointer-events-none" />
      <div className="mx-auto max-w-[980px] px-6 md:px-10 pt-16 pb-20 md:pt-20 md:pb-24 relative text-center">
        <div className="fade-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-deep-sage animate-pulse" />
            <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-sage">
              Live · scraping naukri.com
            </span>
          </div>

          <h1 className="text-[30px] md:text-[38px] lg:text-[46px] leading-[1.08] tracking-[-0.015em] text-ink font-semibold">
            Turn your{" "}
            <span className="font-mono text-[0.66em] align-middle rounded-xl border border-[#d9dced] bg-white/85 px-2.5 py-1 mx-1 text-deep-sage">
              syllabus.pdf
            </span>
            <br />
            into a{" "}
            <span className="italic font-serif text-deep-sage">job-ready</span> curriculum.
          </h1>

          <p className="mt-6 max-w-xl mx-auto text-[14px] md:text-[15px] leading-relaxed text-muted-foreground">
            We extract the skills you teach, compare them to live hiring demand,
            and quantify your curriculum gap in minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#analysis"
              onClick={(e) => {
                if (!onStartAnalysis) return;
                e.preventDefault();
                onStartAnalysis();
              }}
              className="group inline-flex items-center gap-2.5 rounded-xl bg-deep-sage text-background font-mono text-[11px] px-4 py-2.5 border border-deep-sage shadow-[0_6px_16px_rgba(71,110,102,0.22)] hover:brightness-95 transition-all hover-lift glow-pulse"
            >
              Start Analysis
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#evidence"
              className="inline-flex items-center gap-2 rounded-xl font-mono text-[11px] px-4 py-2.5 border border-[#d9dced] bg-white/80 text-ink hover:bg-white transition-colors hover-lift"
            >
              See a sample report
            </a>
          </div>

          {/* live ticker */}
          <div className="mt-10 border border-[#d9dced] bg-white/80 rounded-2xl max-w-[760px] mx-auto shadow-[0_8px_24px_rgba(60,62,120,0.08)] hover-lift">
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#e6e9f2]">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
                live feed · cse · last 24h
              </span>
              <span className="ml-auto font-mono text-[9px] text-sage">
                12,847 listings
              </span>
            </div>
            <div className="overflow-hidden py-3">
              <div className="ticker-track">
                {[...LIVE_SKILLS, ...LIVE_SKILLS].map((s, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] text-[#6b70a6] whitespace-nowrap flex items-center gap-3"
                  >
                    <span className="text-[#c8cde7]">▮</span> {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
