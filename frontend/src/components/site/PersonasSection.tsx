const PERSONAS = [
  {
    role: "Placement Officer",
    name: "Priya Desai",
    quote: "I need data before placement season — not after.",
    body: "Runs a gap analysis every semester and shares the report with the curriculum team before planning starts.",
    shape: "sphere" as const,
  },
  {
    role: "HOD · CSE",
    name: "Dr. Ramesh Kulkarni",
    quote: "Gut feel doesn't pass the academic council.",
    body: "Walks into curriculum revision meetings with a printable, citable report instead of opinions.",
    shape: "pyramid" as const,
  },
  {
    role: "Principal",
    name: "College Management",
    quote: "Quantify how market-ready we actually are.",
    body: "Uses a single placement-readiness score in marketing decks and accreditation dossiers.",
    shape: "cube" as const,
  },
];

function Shape({ kind }: { kind: "sphere" | "pyramid" | "cube" }) {
  if (kind === "sphere")
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="60" cy="60" r="40" />
        <ellipse cx="60" cy="60" rx="40" ry="14" />
        <ellipse cx="60" cy="60" rx="40" ry="28" />
        <ellipse cx="60" cy="60" rx="14" ry="40" />
        <ellipse cx="60" cy="60" rx="28" ry="40" />
      </svg>
    );
  if (kind === "pyramid")
    return (
      <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M60 18 L20 96 L100 96 Z" />
        <path d="M60 18 L60 96" strokeDasharray="2 3" />
        <path d="M20 96 L100 96" />
        <path d="M60 18 L40 96" />
        <path d="M60 18 L80 96" />
        <ellipse cx="60" cy="96" rx="40" ry="6" strokeDasharray="2 3" />
      </svg>
    );
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M30 38 L60 22 L90 38 L90 86 L60 102 L30 86 Z" />
      <path d="M30 38 L60 54 L90 38" />
      <path d="M60 54 L60 102" />
      <path d="M30 86 L60 70 L90 86" strokeDasharray="2 3" />
    </svg>
  );
}

export function PersonasSection() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.25);

  return (
    <section id="personas" className="hairline-b" ref={ref}>
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 py-28 md:py-36">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[10px] text-sage">05</span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
            built for three desks
          </span>
        </div>
        <h2 className="text-[28px] md:text-[38px] leading-[1.1] tracking-[-0.015em] text-ink max-w-3xl mb-20">
          One platform.
          <br />
          Three different conversations it lets you have.
        </h2>

        <div className="grid md:grid-cols-3 hairline">
          {PERSONAS.map((p, i) => (
            <div
              key={p.role}
              className={`p-7 md:p-8 ${i < 2 ? "md:hairline-r" : ""} ${i === 0 ? "max-md:hairline-b" : ""} ${i === 1 ? "max-md:hairline-b" : ""} ${inView ? (i === 0 ? "pop-left" : i === 1 ? "pop-up" : "pop-right") : "pre-reveal"}`}
              style={{ animationDelay: `${i * 0.14}s` }}
            >
              <div className="w-22 h-22 md:w-24 md:h-24 text-sage mb-6">
                <Shape kind={p.shape} />
              </div>
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                {p.role}
              </div>
              <div className="text-[17px] md:text-[18px] tracking-[-0.01em] text-ink mb-4">{p.name}</div>
              <div className="hairline-t pt-4">
                <p className="text-[14px] leading-[1.75] text-ink italic">
                  "{p.quote}"
                </p>
                <p className="mt-4 text-[13px] leading-[1.8] text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useInViewOnce } from "@/hooks/useInViewOnce";
