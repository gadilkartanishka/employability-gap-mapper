import { useState } from "react";
import { CloudUpload, FileText, CheckCircle2, Trash2 } from "lucide-react";

type Year = 1 | 2 | 3 | 4;

type UploadState = {
  year: Year;
  uploadedAt: string | null;
  fileName: string | null;
  gapScore: number | null;
};

const initial: UploadState[] = [
  { year: 1, uploadedAt: "2026-01-12", fileName: "CSE_Year1_2025-26.pdf", gapScore: 72 },
  { year: 2, uploadedAt: "2026-01-12", fileName: "CSE_Year2_2025-26.pdf", gapScore: 68 },
  { year: 3, uploadedAt: "2026-02-04", fileName: "CSE_Year3_2025-26.pdf", gapScore: 61 },
  { year: 4, uploadedAt: null, fileName: null, gapScore: null },
];

export function UploadPage() {
  const [rows, setRows] = useState(initial);
  const [activeYear, setActiveYear] = useState<Year>(4);

  const onFile = (file: File) => {
    setRows((prev) =>
      prev.map((r) =>
        r.year === activeYear
          ? {
              ...r,
              uploadedAt: new Date().toISOString().slice(0, 10),
              fileName: file.name,
              gapScore: 65,
            }
          : r,
      ),
    );
  };

  const remove = (year: Year) => {
    setRows((prev) => prev.map((r) => (r.year === year ? { ...r, uploadedAt: null, fileName: null, gapScore: null } : r)));
  };

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[22px] font-semibold tracking-tight text-ink">Upload Syllabus</h1>
        <p className="mt-1 text-sm text-muted-foreground">Upload one PDF per year. We extract skills and update analysis automatically.</p>
      </header>

      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <section className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {([1, 2, 3, 4] as const).map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(y)}
                className={`py-2 rounded-md border text-[12px] transition-colors ${activeYear === y ? "border-deep-sage bg-deep-sage/10 text-deep-sage" : "border-border hover:bg-secondary/60"}`}
              >
                Year {y}
              </button>
            ))}
          </div>

          <label className="block rounded-lg border-2 border-dashed border-border bg-secondary/35 p-8 text-center cursor-pointer hover:bg-secondary/55 transition-colors">
            <input type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
            <div className="mx-auto h-10 w-10 rounded-full bg-deep-sage/15 text-deep-sage flex items-center justify-center">
              <CloudUpload className="h-5 w-5" />
            </div>
            <h3 className="mt-3 text-sm font-medium text-ink">Drop PDF or click to upload</h3>
            <p className="mt-1 text-xs text-muted-foreground">PDF only · max 25 MB</p>
          </label>
        </section>

        <aside className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-[14px] font-semibold text-ink">Upload Status</h3>
          <div className="mt-3.5 space-y-2">
            {rows.map((r) => {
              const ok = !!r.uploadedAt;
              return (
                <div key={r.year} className="rounded-md border border-border p-2.5 flex items-start gap-2.5">
                  <div className={`h-7 w-7 rounded-md flex items-center justify-center ${ok ? "bg-deep-sage/15 text-deep-sage" : "bg-secondary text-muted-foreground"}`}>
                    {ok ? <CheckCircle2 className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-medium text-ink">Year {r.year}</span>
                      {ok ? (
                        <button onClick={() => remove(r.year)} className="text-muted-foreground hover:text-ink">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      ) : null}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{ok ? r.fileName : "No file uploaded"}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
