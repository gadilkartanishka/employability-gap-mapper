import { useMemo, useState } from "react";
import { topMissingSkills } from "@/data/internalMockData";

export function SkillDetailsPage() {
  const [selected, setSelected] = useState(topMissingSkills[0]?.skill ?? "Kubernetes");

  const detail = useMemo(() => {
    const found = topMissingSkills.find((s) => s.skill === selected);
    return {
      skill: selected,
      demand: found?.demand ?? 80,
      inCurriculum: false,
      relatedRoles: ["Software Developer", "Cloud Engineer"],
      note:
        selected === "Kubernetes"
          ? "Consider adding a core DevOps module in semester 6 with container orchestration labs."
          : "Introduce this skill through an applied elective and project-based coursework.",
    };
  }, [selected]);

  return (
    <div>
      <header className="mb-5">
        <h1 className="text-[28px] md:text-[34px] tracking-[-0.02em] text-ink">Skill Details</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">Inspect why a skill matters and what action to take.</p>
      </header>

      <div className="grid xl:grid-cols-12 gap-5">
        <aside className="xl:col-span-4 hairline bg-card p-5 md:p-6">
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">Missing Skills</div>
          <div className="mt-4 space-y-2">
            {topMissingSkills.map((s) => (
              <button
                key={s.skill}
                type="button"
                onClick={() => setSelected(s.skill)}
                className={`w-full text-left px-3 py-2.5 text-[13px] ${selected === s.skill ? "bg-ink text-background" : "hover:bg-secondary text-ink"}`}
              >
                {s.skill}
              </button>
            ))}
          </div>
        </aside>

        <section className="xl:col-span-8 hairline bg-card p-5 md:p-6">
          <h2 className="text-[24px] tracking-[-0.01em] text-ink">{detail.skill}</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <Info title="Market Demand" value={`${detail.demand}%`} />
            <Info title="In Curriculum" value={detail.inCurriculum ? "Yes" : "No"} />
          </div>

          <div className="mt-6">
            <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">Related Roles</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {detail.relatedRoles.map((role) => (
                <span key={role} className="text-[12px] px-2.5 py-1 hairline text-ink">{role}</span>
              ))}
            </div>
          </div>

          <div className="mt-6 hairline bg-background p-4">
            <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">Suggested Action</div>
            <p className="mt-2 text-[14px] text-ink leading-relaxed">{detail.note}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div className="hairline bg-background p-4">
      <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">{title}</div>
      <div className="mt-2 text-[26px] leading-none text-ink">{value}</div>
    </div>
  );
}
