import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { HeroSection } from "@/components/site/HeroSection";
import { GapLogicSection } from "@/components/site/GapLogicSection";
import { FeatureGridSection } from "@/components/site/FeatureGridSection";
import { EvidenceSection } from "@/components/site/EvidenceSection";
import { PersonasSection } from "@/components/site/PersonasSection";
import { CtaFooterSection } from "@/components/site/CtaFooterSection";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Employability Gap Mapper — Syllabus to Job Market" },
      {
        name: "description",
        content:
          "Upload your syllabus. See exactly which skills your students are missing. Download the report. India's first NLP-powered curriculum-to-industry gap analyzer for engineering colleges.",
      },
      { property: "og:title", content: "Employability Gap Mapper" },
      {
        property: "og:description",
        content: "Bridge the gap between college curricula and the real-world job market.",
      },
    ],
  }),
});

function Index() {
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
