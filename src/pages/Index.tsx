import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { DetectionSection } from "@/components/DetectionSection";
import { ImmunizeSection } from "@/components/ImmunizeSection";
import { ProvenanceSection } from "@/components/ProvenanceSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <DetectionSection />
      <ImmunizeSection />
      <ProvenanceSection />
      <Footer />
    </div>
  );
};

export default Index;
