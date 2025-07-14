import { HeroSection } from "@/components/ui/hero-section";
import { ProblemsSection } from "@/components/ui/problems-section";
import { DashboardPreview } from "@/components/ui/dashboard-preview";
import { FeaturesSection } from "@/components/ui/features-section";
import { IndustriesSection } from "@/components/ui/industries-section";
import { PricingSection } from "@/components/ui/pricing-section";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ProblemsSection />
      <DashboardPreview />
      <FeaturesSection />
      <IndustriesSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
