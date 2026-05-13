import { HeroSection } from "@/components/site/HeroSection";
import { GapLogicSection } from "@/components/site/GapLogicSection";
import { FeatureGridSection } from "@/components/site/FeatureGridSection";
import { EvidenceSection } from "@/components/site/EvidenceSection";
import { PersonasSection } from "@/components/site/PersonasSection";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CtaFooterSection } from "@/components/site/CtaFooterSection";

export function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <HeroSection />
      <GapLogicSection />
      <FeatureGridSection />
      <EvidenceSection />
      <PersonasSection />
      <CtaFooterSection />
      <ThemeToggle />
    </main>
  );
}
