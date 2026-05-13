import { useState } from "react";
import { InternalShell, type InternalPage } from "@/components/internal/InternalShell";
import { AnalysisSetupPage } from "@/components/internal/AnalysisSetupPage";
import { ResultsDashboardPage } from "@/components/internal/ResultsDashboardPage";
import { ReportsPage } from "@/components/internal/ReportsPage";
import { UploadPage } from "@/components/internal/UploadPage";
import { SettingsPage } from "@/components/internal/SettingsPage";
import { type Program, type Role } from "@/data/internalMockData";
import { SiteHeader } from "@/components/site/SiteHeader";
import { HeroSection } from "@/components/site/HeroSection";
import { GapLogicSection } from "@/components/site/GapLogicSection";
import { FeatureGridSection } from "@/components/site/FeatureGridSection";
import { EvidenceSection } from "@/components/site/EvidenceSection";
import { PersonasSection } from "@/components/site/PersonasSection";
import { CtaFooterSection } from "@/components/site/CtaFooterSection";

export function App() {
  const [mode, setMode] = useState<"landing" | "internal">("landing");
  const [activePage, setActivePage] = useState<InternalPage>("dashboard");
  const [selectedRole, setSelectedRole] = useState<Role>("Software Developer");
  const [selectedProgram, setSelectedProgram] = useState<Program>("B.Tech CSE");
  const [compareMode, setCompareMode] = useState(false);

  const runAnalysis = () => setActivePage("dashboard");
  const startInternal = () => setMode("internal");

  const page = (() => {
    if (activePage === "dashboard") return <ResultsDashboardPage />;
    if (activePage === "upload") return <UploadPage />;
    if (activePage === "analysis") {
      return (
        <AnalysisSetupPage
          role={selectedRole}
          program={selectedProgram}
          compareMode={compareMode}
          onRoleChange={setSelectedRole}
          onProgramChange={setSelectedProgram}
          onCompareModeChange={setCompareMode}
          onRun={runAnalysis}
        />
      );
    }
    if (activePage === "reports") return <ReportsPage />;
    return <SettingsPage />;
  })();

  if (mode === "landing") {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <SiteHeader onStartAnalysis={startInternal} />
        <HeroSection onStartAnalysis={startInternal} />
        <GapLogicSection />
        <FeatureGridSection />
        <EvidenceSection />
        <PersonasSection />
        <CtaFooterSection />
      </main>
    );
  }

  return <InternalShell active={activePage} onChange={setActivePage}>{page}</InternalShell>;
}
