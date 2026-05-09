function ScannerIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M30 20 L75 20 L90 35 L90 100 L30 100 Z" />
      <path d="M75 20 L75 35 L90 35" />
      <line x1="42" y1="48" x2="78" y2="48" />
      <line x1="42" y1="58" x2="78" y2="58" />
      <line x1="42" y1="68" x2="68" y2="68" />
      <line x1="42" y1="78" x2="74" y2="78" />
      <rect x="38" y="42" width="44" height="44" stroke="currentColor" strokeDasharray="2 3" />
      <line x1="38" y1="64" x2="82" y2="64" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="82" cy="64" r="2" fill="currentColor" />
    </svg>
  );
}

function CrawlerIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="60" cy="60" r="36" />
      <ellipse cx="60" cy="60" rx="36" ry="14" />
      <ellipse cx="60" cy="60" rx="14" ry="36" />
      <line x1="24" y1="60" x2="96" y2="60" />
      <line x1="60" y1="24" x2="60" y2="96" />
      <circle cx="60" cy="60" r="3" fill="currentColor" />
      <circle cx="86" cy="48" r="2" fill="currentColor" />
      <circle cx="38" cy="74" r="2" fill="currentColor" />
      <circle cx="72" cy="86" r="2" fill="currentColor" />
    </svg>
  );
}

function PipelineIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="14" y="34" width="28" height="52" />
      <rect x="78" y="34" width="28" height="52" />
      <path d="M42 60 C 55 60, 65 60, 78 60" />
      <circle cx="60" cy="60" r="6" />
      <line x1="42" y1="48" x2="50" y2="48" strokeDasharray="2 2" />
      <line x1="70" y1="72" x2="78" y2="72" strokeDasharray="2 2" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M20 80 A 40 40 0 0 1 100 80" />
      <line x1="20" y1="80" x2="100" y2="80" />
      <line x1="60" y1="80" x2="84" y2="46" strokeWidth="1.4" />
      <circle cx="60" cy="80" r="3" fill="currentColor" />
      <line x1="32" y1="80" x2="32" y2="74" />
      <line x1="60" y1="46" x2="60" y2="40" />
      <line x1="88" y1="80" x2="88" y2="74" />
    </svg>
  );
}

const FEATURES = [
  {
    n: "01",
    icon: <ScannerIcon />,
    title: "NLP Skill Extraction",
    body: "pdfplumber + spaCy + KeyBERT pipeline reads every syllabus PDF and emits a clean, deduplicated skill graph per semester.",
    tag: "pipeline · python",
  },
  {
    n: "02",
    icon: <CrawlerIcon />,
    title: "Naukri Live Scraper",
    body: "A polite weekly crawler keeps a fresh database of CSE listings — roles, stacks, and frequency weighted by recency.",
    tag: "scheduler · weekly",
  },
  {
    n: "03",
    icon: <PipelineIcon />,
    title: "Deterministic Gap Engine",
    body: "Two pipelines — syllabus and jobs — feed one analyzer that classifies every skill as covered, missing, or excess.",
    tag: "engine · rules",
  },
  {
    n: "04",
    icon: <GaugeIcon />,
    title: "Placement Readiness Score",
    body: "A single composite score per branch / per year that placement officers can track across semesters and pitch decks.",
    tag: "metric · 0–100",
  },
];

export function FeatureGridSection() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.2);

  return (
    <section id="features" className="hairline-b" ref={ref}>
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 py-28 md:py-36">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[10px] text-sage">03</span>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                the engine
              </span>
            </div>
            <h2 className="text-[28px] md:text-[38px] leading-[1.1] tracking-[-0.015em] text-ink max-w-2xl">
              Two pipelines, one analyzer,
              <br />
              zero guesswork.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 hairline">
          {FEATURES.map((f, i) => (
            <div
              key={f.n}
              className={`p-7 md:p-8 group ${i % 2 === 0 ? "md:hairline-r" : ""} ${i < 2 ? "hairline-b" : ""} hover:bg-secondary/70 transition-colors ${inView ? (i % 4 === 0 ? "pop-left" : i % 4 === 1 ? "pop-right" : i % 4 === 2 ? "pop-up" : "pop-down") : "pre-reveal"}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-[10px] text-sage">{f.n}</span>
                <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted-foreground">
                  {f.tag}
                </span>
              </div>
              <div className="w-20 h-20 text-ink mb-6 group-hover:text-deep-sage transition-colors">
                {f.icon}
              </div>
              <h3 className="text-[19px] md:text-[22px] tracking-[-0.01em] text-ink mb-2.5">
                {f.title}
              </h3>
              <p className="text-[14px] leading-[1.8] text-muted-foreground max-w-md">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useInViewOnce } from "@/hooks/useInViewOnce";
